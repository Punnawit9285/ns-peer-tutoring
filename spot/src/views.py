"""Pick atlas views for each checklist structure and export the photos.
A view = one cadaver photo + the leader path (photo edge -> tip) of one labelled structure.
Vector-labelled figures first: their photo carries no printed numbers or lines. Structures with fewer than 2 such views
also get raster-labelled figures, cleaned by raster.py (numbers cropped or inpainted, traced lines inpainted)."""
import json, os, re
import numpy as np, cv2
import pymupdf
from PIL import Image
import raster

MAXPX = 1400
BLOCK = {(72, 1), (136, 2), (49, 2)}     # illustrations that pass the photo test
# (page, figure, label) checked by eye on the review sheets and found wrong: tip off the structure, label read wrongly,
# or a view too small or ambiguous to learn from
REJECT = {(230, 0, 23), (205, 0, 6), (234, 0, 12), (237, 0, 2), (276, 0, 17), (171, 0, 10), (124, 1, 8), (96, 1, 11), (140, 0, 13), (162, 2, 6),
          (49, 0, 10), (147, 0, 15), (163, 3, 10), (220, 0, 11), (220, 0, 2), (266, 0, 24), (255, 3, 13), (255, 3, 10),
          (148, 1, 27), (148, 1, 29), (220, 0, 13), (255, 2, 10)}
# Hand-checked on the original figure: the printed leader of these numbers turns into a short (or faint, or edge-hugging)
# last piece the tracer cannot tell from tissue. Heading of that piece in degrees (0 = right, 90 = down); the tracer
# still snaps onto the printed line and walks it. (page, figure, number): heading
LEADS = {(155, 2, 18): 251, (164, 1, 16): 20, (254, 0, 13): 313, (84, 0, 21): 251, (55, 0, 10): 248}
TRUSTED = ('text', 'ocr', 'blob')   # raster numbers read directly; sequence-filled ones are not used for targets

def load(d, xref):
    pix = pymupdf.Pixmap(d, xref)
    if pix.alpha: pix = pymupdf.Pixmap(pix, 0)
    if pix.n != 3: pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    return Image.frombytes('RGB', (pix.width, pix.height), pix.samples)

def spread_legend(A, p):
    leg = dict(A[p]['legend']); f = p + 1 if p % 2 == 0 else p - 1
    for k, v in A.get(f, {'legend': {}})['legend'].items(): leg.setdefault(k, v)
    return leg

def photo_stats(im):
    a = np.asarray(im.resize((200, 200))).astype(np.int16)
    return float(((a > 232).all(axis=2)).mean()), float((a.max(axis=2) - a.min(axis=2)).mean())

def is_photo(im):
    """cadaver photos: few pure-white pixels (drawings sit on white) and real colour (not MRI / CT / angiogram)"""
    white, sat = photo_stats(im)
    return white < 0.22 and sat > 16

def multi(name, t):
    """a legend entry that names more than this structure ("X and Y", "X, Y") points at a less specific spot"""
    n = name.lower()
    for pt in t['pat']:
        m = re.search(pt, n)
        if m: return bool(re.search(r'\band\b|,|\bwith\b', n[m.end():]))
    return True

def matches(name, t):
    n = name.lower()
    return any(re.search(pt, n) for pt in t['pat']) and not (t.get('avoid') and re.search(t['avoid'], n))

class Atlas:
    def __init__(self, pdf, data, cache):
        self.d = pymupdf.open(pdf); self.A = {x['page']: x for x in json.load(open(data))}
        self.cache = cache; os.makedirs(f'{cache}/raster', exist_ok=True); self._ph = {}

    def fig_tips(self, p, f): return [t for t in self.A[p]['tips'] if t['fig'] == f]
    def is_vector(self, p, f): return len(self.fig_tips(p, f)) >= 3

    def photo_ok(self, p, f):
        k = (p, f)
        if k in BLOCK: return False
        if k not in self._ph:
            im = load(self.d, self.A[p]['imgs'][f]['xref'])
            if not self.is_vector(p, f):
                x0, y0, x1, y1 = raster.content_box(cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)); im = im.crop((x0, y0, x1, y1))
            self._ph[k] = is_photo(im)
        return self._ph[k]

    def raster_fig(self, p, f):
        """cached: cleaned photo (jpg) + {n: [[x,y] entry, [x,y] tip]} in its px"""
        js = f'{self.cache}/raster/p{p}_{f}.json'
        if os.path.exists(js): return json.load(open(js))
        x = self.A[p]; im = x['imgs'][f]; b = im['bbox']
        pil = load(self.d, im['xref']); img = cv2.cvtColor(np.asarray(pil), cv2.COLOR_RGB2BGR)
        sx, sy = img.shape[1] / (b[2] - b[0]), img.shape[0] / (b[3] - b[1])
        leg = spread_legend(self.A, p); expected = [int(k) for k in leg]
        tb = {}
        for txt, (wx0, wy0, wx1, wy1) in x.get('labels', []):
            n = int(re.match(r'\d+', txt).group(0))
            if b[0] - 40 <= wx0 and wx1 <= b[2] + 40 and b[1] - 6 <= wy0 and wy1 <= b[3] + 6 and not (b[0] + 4 < (wx0 + wx1) / 2 < b[2] - 4 and b[1] + 4 < (wy0 + wy1) / 2 < b[3] - 4):
                tb[n] = ((wx0 - b[0]) * sx, (wy0 - b[1]) * sy, (wx1 - b[0]) * sx, (wy1 - b[1]) * sy)
        clean, paths, how = raster.process(img, expected, tb or None, {n: h for (pp, ff, n), h in LEADS.items() if (pp, ff) == (p, f)})
        cv2.imwrite(f'{self.cache}/raster/p{p}_{f}.jpg', clean, [cv2.IMWRITE_JPEG_QUALITY, 92])
        out = dict(w=clean.shape[1], h=clean.shape[0], paths={str(n): v for n, v in paths.items()}, how={str(n): v for n, v in how.items()})
        json.dump(out, open(js, 'w')); return out

    def candidates(self, t, deck_pages=(), want=4):
        vec, ras = [], []
        for lo, hi in t['pages']:
            for p in range(lo, hi + 1):
                if p not in self.A: continue
                x = self.A[p]; leg = spread_legend(self.A, p)
                hits = [(n, v) for n, v in leg.items() if matches(v, t)]
                if not hits: continue
                for f, im in enumerate(x['imgs']):
                    area = min(1.0, (im['w'] * im['h']) / 900000)
                    if self.is_vector(p, f):
                        for tp in self.fig_tips(p, f):
                            name = leg.get(str(tp['n']))
                            if name and matches(name, t) and good_path(self.vec_px(p, f, tp['path']), *self.vec_size(p, f), 0.0):
                                vec.append(dict(kind='v', page=p, fig=f, n=tp['n'], name=name, src_path=tp['path'],
                                                score=2.0 * (not multi(name, t)) + (1.0 if p in deck_pages else 0) + area))
                    else:
                        ras.append((p, f, hits, area))
        def pick(cands, k, have=()):
            best = {}
            for c in cands:
                key = (c['page'], c['fig'])
                if (c['page'], c['fig'], c['n']) in REJECT: continue
                if key not in best or c['score'] > best[key]['score']: best[key] = c
            ranked = sorted([c for c in best.values() if (c['page'], c['fig'], c['n']) not in REJECT], key=lambda c: -c['score']); out, pages = [], {h['page'] for h in have}
            for c in ranked:
                if not self.photo_ok(c['page'], c['fig']): continue
                if c['page'] in pages and len(ranked) > k: continue
                out.append(c); pages.add(c['page'])
                if len(out) == k: break
            return out
        views = pick(vec, want)
        if len(views) < 2 and ras:
            rc = []
            for p, f, hits, area in ras:
                if not self.photo_ok(p, f): continue
                rf = self.raster_fig(p, f)
                for n, name in hits:
                    pth = rf['paths'].get(n)
                    if pth and rf['how'].get(n) in TRUSTED and good_path(pth, rf['w'], rf['h'], 0.07):
                        rc.append(dict(kind='r', page=p, fig=f, n=int(n), name=name, score=2.0 * (not multi(name, t)) + (1.0 if p in deck_pages else 0) + area))
            views += pick(rc, min(3, want - len(views)), views)
        return views

    def vec_size(self, p, f):
        im = self.A[p]['imgs'][f]; return im['w'], im['h']
    def vec_px(self, p, f, path):
        im = self.A[p]['imgs'][f]; b = im['bbox']
        return clip_path(path, b, (im['w'] / (b[2] - b[0]), im['h'] / (b[3] - b[1])), im['w'], im['h'])

    # ---------- export ----------
    def export(self, v, outdir):
        """write the photo once; return file name, size, the target path in px, and every labelled structure on it"""
        p, f = v['page'], v['fig']; fn = f'p{p}_{f}.jpg'; path = f'{outdir}/{fn}'
        leg = spread_legend(self.A, p)
        if v['kind'] == 'v':
            im = self.A[p]['imgs'][f]; b = im['bbox']; pil = load(self.d, im['xref'])
            if im['tf'][3] < 0: pil = pil.transpose(Image.FLIP_TOP_BOTTOM)
            if im['tf'][0] < 0: pil = pil.transpose(Image.FLIP_LEFT_RIGHT)
            if max(pil.size) > MAXPX: pil.thumbnail((MAXPX, MAXPX))
            W, H = pil.size; sc = (W / (b[2] - b[0]), H / (b[3] - b[1]))
            labels = [dict(n=tp['n'], name=leg[str(tp['n'])], path=clip_path(tp['path'], b, sc, W, H)) for tp in self.fig_tips(p, f) if str(tp['n']) in leg]
        else:
            rf = self.raster_fig(p, f); pil = Image.open(f'{self.cache}/raster/p{p}_{f}.jpg').convert('RGB')
            E = 3   # trim the thin light frame left where the number margin was cropped
            pil = pil.crop((E, E, pil.width - E, pil.height - E))
            k = 1.0
            if max(pil.size) > MAXPX: k = MAXPX / max(pil.size); pil = pil.resize((round(pil.width * k), round(pil.height * k)), Image.LANCZOS)
            W, H = pil.size
            labels = [dict(n=int(n), name=leg[n], path=[[round(min(max(x - E, 0), W / k) * k, 1), round(min(max(y - E, 0), H / k) * k, 1)] for x, y in pth]) for n, pth in rf['paths'].items()
                      if n in leg and (rf['how'].get(n) in TRUSTED and good_path(pth, rf['w'], rf['h'], 0.07) or int(n) == v['n'])]
        src = f'{self.cache}/raster/p{p}_{f}.jpg' if v['kind'] == 'r' else None
        # a raster photo is cleaned again whenever its tracing changes: never keep an older export of it
        if not os.path.exists(path) or (src and os.path.getmtime(src) > os.path.getmtime(path)): pil.save(path, quality=82, optimize=True, progressive=True)
        # one entry per number (a label with two lines keeps the first)
        seen, uniq = set(), []
        for l in labels:
            if l['n'] in seen: continue
            seen.add(l['n']); uniq.append(l)
        target = next((l['path'] for l in uniq if l['n'] == v['n']), None)
        return dict(file=fn, w=W, h=H, path=target, labels=uniq)

def clip_path(path, b, sc, W, H):
    """leader path (page coords, number -> tip) -> px, from where it enters the photo to the tip"""
    P = [((x - b[0]) * sc[0], (y - b[1]) * sc[1]) for x, y in path]
    inside = lambda q: -0.5 <= q[0] <= W + 0.5 and -0.5 <= q[1] <= H + 0.5
    k = next((i for i, q in enumerate(P) if inside(q)), len(P) - 1)
    pts = P[k:]
    if k > 0:
        (x0, y0), (x1, y1) = P[k - 1], P[k]
        for tt in np.linspace(0, 1, 200):
            q = (x0 + (x1 - x0) * tt, y0 + (y1 - y0) * tt)
            if inside(q): pts = [q] + pts; break
    if len(pts) == 1: pts = [pts[0], pts[0]]
    return [[round(min(max(x, 0), W), 1), round(min(max(y, 0), H), 1)] for x, y in pts]

def good_path(path, W, H, min_len):
    """tip well inside the photo (a tip on the border means the line was lost), and a pointer of some length"""
    (x0, y0), (x1, y1) = path[0], path[-1]
    m = 0.015 * max(W, H)
    if not (m < x1 < W - m and m < y1 < H - m): return False
    return sum(((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** 0.5 for a, b in zip(path, path[1:])) >= min_len * max(W, H)
