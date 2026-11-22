"""Atlas figures whose numbers and leader lines are part of the photo (raster labels).
Find the numbers (Vision OCR on upscaled edge strips and single blobs, then fill each column's sequence),
follow each leader line from its number to its tip (round its bends, across patches where it cannot be seen,
into a printed arrowhead), erase every line that crosses the number margin (numbers read or not), then crop the
white number margins and inpaint the lines, so the photo is as clean as the vector-labelled ones."""
import json, math, os, re, subprocess, tempfile
import numpy as np, cv2

THR = 18.0    # window-averaged line contrast (grey levels) that still counts as line
BEND = 50.0   # line evidence a bent-off piece of leader line needs over its first 22 px (real bends: 78+;
              # a white rim or a nerve beside the tip: 21 or less, as their two sides differ)
EXTEND = True
OCR = os.environ.get('OCR_BIN', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ocr'))

def samp(g, x, y):
    h, w = g.shape
    if x < 0 or y < 0 or x >= w - 1 or y >= h - 1: return None
    x0, y0 = int(x), int(y); fx, fy = x - x0, y - y0
    a = g[y0, x0] * (1 - fx) + g[y0, x0 + 1] * fx; b = g[y0 + 1, x0] * (1 - fx) + g[y0 + 1, x0 + 1] * fx
    return a * (1 - fy) + b * fy

def resp(g, x, y, dx, dy, off=2.6):
    c = samp(g, x, y); n1 = samp(g, x - dy * off, y + dx * off); n2 = samp(g, x + dy * off, y - dx * off)
    if c is None or n1 is None or n2 is None: return None
    return (n1 + n2) / 2 - c          # > 0: dark line on lighter ground

# ---- the same sampling for many points at once (the build spends its time here) ----
# samp() on a NumPy 2 float32 image computes in float32 when its point is a plain Python number and in float64 when
# it is a NumPy number (NEP 50); _samp_v follows the same rule, so every value, and so every decision, is unchanged.
def _strong(v):
    if isinstance(v, (bool, np.bool_)) or not isinstance(v, (int, float, np.integer, np.floating)): return None
    if isinstance(v, np.floating) and v.dtype != np.float64: return None     # not met in this module: use samp()
    return isinstance(v, np.generic)

def _samp_v(g, X, Y, xs, ys):
    """samp() at float64 arrays of points X, Y (xs / ys: the scalar x / y would be a NumPy number); NaN for None"""
    h, w = g.shape; ok = (X >= 0) & (Y >= 0) & (X < w - 1) & (Y < h - 1)
    X = np.where(ok, X, 0.0); Y = np.where(ok, Y, 0.0)
    x0 = X.astype(np.int64); y0 = Y.astype(np.int64); fx = X - x0; fy = Y - y0
    g00, g01, g10, g11 = g[y0, x0], g[y0, x0 + 1], g[y0 + 1, x0], g[y0 + 1, x0 + 1]
    if xs: a = g00.astype(np.float64) * (1 - fx) + g01.astype(np.float64) * fx; b = g10.astype(np.float64) * (1 - fx) + g11.astype(np.float64) * fx
    else:
        u, v = (1 - fx).astype(np.float32), fx.astype(np.float32); a = g00 * u + g01 * v; b = g10 * u + g11 * v
    if xs or ys: out = a.astype(np.float64) * (1 - fy) + b.astype(np.float64) * fy
    else: out = a * (1 - fy).astype(np.float32) + b * fy.astype(np.float32)
    out[~ok] = np.nan; return out

def _resp_v(g, X, Y, dx, dy, xs, ys, off):
    c = _samp_v(g, X, Y, xs, ys); n1 = _samp_v(g, X - dy * off, Y + dx * off, xs, ys); n2 = _samp_v(g, X + dy * off, Y - dx * off, xs, ys)
    return (n1 + n2) / 2 - c

def _rays(g, sx, sy, angles, r0, r1, off=2.6):
    """resp() along each angle for r0 <= r < r1: one row per angle (rows with a None hold a NaN), or None"""
    xs, ys = _strong(sx), _strong(sy)
    if xs is None or ys is None: return None
    dx = np.array([math.cos(math.radians(a)) for a in angles]); dy = np.array([math.sin(math.radians(a)) for a in angles])
    r = np.arange(r0, r1); X = sx + dx[:, None] * r[None, :]; Y = sy + dy[:, None] * r[None, :]
    return _resp_v(g, X, Y, dx[:, None], dy[:, None], xs, ys, off)

def best_dir(g, sx, sy, r0=4, r1=34, polar=None):
    best = (0, None, None); angles = np.arange(0, 360, 1.0); R = _rays(g, sx, sy, angles, r0, r1)
    for i, a in enumerate(angles):
        if R is None:
            dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
            rs = [resp(g, sx + dx * r, sy + dy * r, dx, dy) for r in range(r0, r1)]
            if any(v is None for v in rs): continue
            rs = np.array(rs)
        else:
            rs = R[i]
            if np.isnan(rs).any(): continue
        for pol in ((1, -1) if polar is None else (polar,)):
            s = float(np.percentile(rs * pol, 25))     # the line must be there along most of the ray
            if s > best[0]: best = (s, a, pol)
    return best

def ray(g, sx, sy, a, n, off=2.8):
    dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a)); xs, ys = _strong(sx), _strong(sy)
    if xs is not None and ys is not None and n > 1:
        r = np.arange(1, n); X = sx + dx * r; Y = sy + dy * r
        C = _samp_v(g, X, Y, xs, ys); N1 = _samp_v(g, X - dy * off, Y + dx * off, xs, ys); N2 = _samp_v(g, X + dy * off, Y - dx * off, xs, ys)
        bad = np.isnan(C) | np.isnan(N1) | np.isnan(N2); k = int(np.argmax(bad)) if bad.any() else len(C)
        if k == 0: return np.array([]), np.array([]), np.array([])      # as np.array([]) from the loop: float64
        return C[:k], N1[:k], N2[:k]
    C, N1, N2 = [], [], []
    for r in range(1, n):
        x, y = sx + dx * r, sy + dy * r
        c = samp(g, x, y); n1 = samp(g, x - dy * off, y + dx * off); n2 = samp(g, x + dy * off, y - dx * off)
        if c is None or n1 is None or n2 is None: break
        C.append(c); N1.append(n1); N2.append(n2)
    return np.array(C), np.array(N1), np.array(N2)

def rays(g, starts, n, off=2.8):
    """ray() for many (sx, sy, a) at once: the same list of (C, N1, N2) as calling ray() on each"""
    st = [(_strong(sx), _strong(sy)) for sx, sy, a in starts]
    if n <= 1 or not starts or any(x is None or y is None for x, y in st) or len(set(st)) > 1: return [ray(g, sx, sy, a, n, off) for sx, sy, a in starts]
    xs, ys = st[0]
    dx = np.array([math.cos(math.radians(a)) for _, _, a in starts])[:, None]; dy = np.array([math.sin(math.radians(a)) for _, _, a in starts])[:, None]
    r = np.arange(1, n)[None, :]; X = np.array([sx for sx, _, _ in starts], np.float64)[:, None] + dx * r; Y = np.array([sy for _, sy, _ in starts], np.float64)[:, None] + dy * r
    C = _samp_v(g, X, Y, xs, ys); N1 = _samp_v(g, X - dy * off, Y + dx * off, xs, ys); N2 = _samp_v(g, X + dy * off, Y - dx * off, xs, ys)
    bad = np.isnan(C) | np.isnan(N1) | np.isnan(N2); out = []
    for i in range(len(starts)):
        k = int(np.argmax(bad[i])) if bad[i].any() else n - 1
        out.append((np.array([]), np.array([]), np.array([])) if k == 0 else (C[i, :k], N1[i, :k], N2[i, :k]))
    return out

def evidence(C, N1, N2, k=7):
    if len(C) < k: return np.zeros(len(C))
    f = np.ones(k) / k; sm = lambda v: np.convolve(v, f, mode='same')
    c, n1, n2 = sm(C), sm(N1), sm(N2)
    return np.abs((n1 + n2) / 2 - c) - 0.4 * np.abs(n1 - n2)

def snap(g, sx, sy, a, offs, das, n=90):
    best = (-1e9, a, sx, sy); starts = []
    for off in offs:
        px, py = -math.sin(math.radians(a)) * off, math.cos(math.radians(a)) * off
        for da in das: starts.append((sx + px, sy + py, a + da))
    for (x, y, b), (C, N1, N2) in zip(starts, rays(g, starts, n)):       # in the same order as one ray at a time
        if len(C) < 20: continue
        m = float(np.mean(np.minimum(evidence(C, N1, N2)[3:], 60)))
        if m > best[0]: best = (m, b, x, y)
    return best

def follow(g, sx, sy, a, pol, s0, maxlen=2000):
    """snap onto the line (offset + angle), then walk it in 60 px chunks, re-snapping a little at each chunk;
    the line ends after a gap of weak evidence (> 14 px, or > 45 px if the line comes back for a while)"""
    _, a, sx, sy = snap(g, sx, sy, a, np.arange(-4, 4.01, 0.5), np.arange(-2.5, 2.51, 0.25), 120)
    pts = [(sx, sy)]; ev_all = []; x, y = sx, sy
    while len(ev_all) < maxlen:
        if len(ev_all) > 0:
            _, a2, x2, y2 = snap(g, x, y, a, np.arange(-1.5, 1.51, 0.5), np.arange(-0.75, 0.76, 0.25), 80)
            if _ > THR: a, x, y = a2, x2, y2
        C, N1, N2 = ray(g, x, y, a, 61)
        if len(C) < 2: break
        e = evidence(*ray(g, x, y, a, 75))[:len(C)] if len(C) >= 7 else np.zeros(len(C))
        dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
        for r in range(1, len(C) + 1):
            pts.append((x + dx * r, y + dy * r)); ev_all.append(float(e[r - 1]) if r - 1 < len(e) else 0.0)
        x, y = pts[-1]
        # stop early if the last 60 px had no line at all
        if len(ev_all) > 120 and max(ev_all[-60:]) < THR: break
    strong = np.array(ev_all) > THR; runs = []; r = 0
    while r < len(strong):
        if strong[r]:
            q = r
            while q < len(strong) and strong[q]: q += 1
            runs.append((r, q - 1)); r = q
        else: r += 1
    last = 0; prev = None
    for r0, r1 in runs:
        if prev is None:
            if r0 > 18: break
        else:
            gap = r0 - prev
            if gap > 45 or (gap > 14 and r1 - r0 < 6): break
        prev = r1; last = r1
    return pts[:last + 2]

def ink(img, x, y, pol=0):
    """printed ink: a near-black or near-white grey pixel, unlike cream nerves, red vessels and brown crevices.
    Rohen's leader lines are black over light tissue and white over dark tissue, often both along one line.
    Looks at the darkest and the lightest pixel within 1 px, so a thin anti-aliased line still counts.
    pol 1: black only, -1: white only, 0: either."""
    xi, yi = int(round(x)), int(round(y)); H, W = img.shape[:2]
    if not (0 <= xi < W and 0 <= yi < H): return False
    q = img[max(yi - 1, 0):yi + 2, max(xi - 1, 0):xi + 2].reshape(-1, 3).astype(int); v = q.sum(1)
    d, l = q[v.argmin()], q[v.argmax()]
    black = d.max() < 95 and d.max() - d.min() < 45; white = l.min() > 190 and l.max() - l.min() < 35
    return bool(black if pol > 0 else white if pol < 0 else black or white)

def inky(img, pts, pol, share=0.75):
    pts = list(pts); return len(pts) > 0 and sum(ink(img, x, y, pol) for x, y in pts) >= share * len(pts)

def across(g, img, x1, y1, ain, maxgap=160):
    """A black line over a dark cavity (or a white one over a bright patch) cannot be seen, so the walk stops at
    the patch; if the same straight line comes out the other side, it goes on there. -> restart point or None"""
    best = None
    for da in np.arange(-2.0, 2.01, 0.5):
        a = ain + da; C, N1, N2 = ray(g, x1, y1, a, maxgap + 30)
        if len(C) < 40: continue
        strong = evidence(C, N1, N2) > 2 * THR
        for r0 in range(6, len(C) - 15):
            if not strong[r0:r0 + 15].all(): continue
            gc, gs = C[2:r0], (N1[2:r0] + N2[2:r0]) / 2
            flat = float(np.abs(gs - gc).mean()) < 12; tone = float((gc + gs).mean() / 2)
            dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
            if flat and (tone < 60 or tone > 200) and inky(img, [(x1 + dx * (r0 + r), y1 + dy * (r0 + r)) for r in range(15)], 0):
                if best is None or r0 < best[0]: best = (r0, a)
            break
    if best is None: return None
    r0, a = best; return x1 + math.cos(math.radians(a)) * r0, y1 + math.sin(math.radians(a)) * r0, a

def bends(g, img, pts, turns=3, forks=None):
    """The straight walk stops where a leader line bends; the rest of the line is still printed on the photo and
    points at the real structure. From the end, look for a straight run of printed ink leaving at another angle
    (not back along the line) and walk it too, up to three bends. Where the line forks (one structure in two
    places), the arrow takes the strongest branch and the others go into `forks`, to be erased."""
    for _ in range(turns):
        x1, y1 = pts[-1]; x0, y0 = pts[max(0, len(pts) - 16)]
        ain = math.degrees(math.atan2(y1 - y0, x1 - x0)); cands = []
        go = across(g, img, x1, y1, ain)
        if go:      # straight on, under a patch where the line cannot be seen
            seg = follow(g, go[0], go[1], go[2], 0, 2 * THR)
            if len(seg) >= 12 and inky(img, seg[3:], 0):
                L = math.hypot(go[0] - x1, go[1] - y1)
                pts = pts + [(x1 + (go[0] - x1) * k / L, y1 + (go[1] - y1) * k / L) for k in range(1, int(L))] + seg; continue
        angles = [a for a in np.arange(0, 360, 1.0) if abs((a - ain + 180) % 360 - 180) <= 150]
        for a, (C, N1, N2) in zip(angles, rays(g, [(x1, y1, a) for a in angles], 26)):
            if len(C) < 25: continue
            sc = float(np.percentile(evidence(C, N1, N2)[2:24], 25))   # a thin line, black or white, the same on both sides
            if sc > BEND: cands.append((sc, a))
        if not cands: break
        cands.sort(reverse=True); keep = []
        for sc, a in cands:          # one per direction
            if all(abs((a - b + 180) % 360 - 180) > 25 for _, b in keep): keep.append((sc, a))
        segs = [follow(g, x1, y1, a, 0, sc) for sc, a in keep]
        segs = [q for q in segs if len(q) >= 12 and inky(img, q[3:], 0)]
        if not segs: break
        if forks is not None: forks.extend(segs[1:])
        pts = pts + segs[0][1:]
    return pts

def arrowhead(img, pts, maxlen=30):
    """A printed black arrowhead at the end of the line: walk on while the pixels are ink, as long as the ink is
    narrow (a head, not a dark background). -> (points, how many of them are the head)"""
    if len(pts) < 6: return pts, 0
    x1, y1 = pts[-1]; x0, y0 = pts[max(0, len(pts) - 12)]
    L = math.hypot(x1 - x0, y1 - y0) or 1; dx, dy = (x1 - x0) / L, (y1 - y0) / L; add = []
    for r in range(1, maxlen):
        x, y = x1 + dx * r, y1 + dy * r
        if not ink(img, x, y, 1): break
        if ink(img, x - dy * 8, y + dx * 8, 1) and ink(img, x + dy * 8, y - dx * 8, 1): add = []; break
        add.append((x, y))
    return (pts + add, len(add)) if len(add) >= 3 else (pts, 0)

def margin_lines(g, img, box):
    """Every leader line coming in from the number margin, its number read or not: dark lines crossing the white
    margin beside the photo, or, where the numbers sit off the image, white lines crossing the black background at
    the photo edge. Only printed lines do either. Walked like a numbered line (bends, patches, arrowhead), so all
    of it can be erased."""
    H, W = g.shape; x0, y0, x1, y1 = box; out = []
    def seeds(side):
        lr = side in 'lr'; n = W if lr else H
        # just outside the photo (the white margin) and just inside its edge (where the numbers sit off the image)
        for at in ((x0 - 3, x1 + 2) if lr else (y0 - 3, y1 + 2))[side in 'rb'], ((x0 + 2, x1 - 3) if lr else (y0 + 2, y1 - 3))[side in 'rb']:
            if not (2 <= at < n - 2): continue
            span = list(range(y0 + 3, y1 - 3) if lr else range(x0 + 3, x1 - 3))
            prof = np.array([g[k, at] if lr else g[at, k] for k in span], np.float32); found = False
            for k in range(12, len(prof) - 12):
                bg = float(np.median(np.r_[prof[k - 12:k - 4], prof[k + 5:k + 13]]))
                if abs(prof[k] - bg) < 60 or abs(prof[k] - bg) < abs(prof[k - 1] - bg) or abs(prof[k] - bg) < abs(prof[k + 1] - bg): continue
                # thin: back to background within 3 px either side; and printed ink
                if abs(prof[k - 3] - bg) > 30 or abs(prof[k + 3] - bg) > 30: continue
                x, y = (at, span[k]) if lr else (span[k], at)
                if ink(img, x, y, 0): found = True; yield x, y
            if found: return
    for side, inward in (('l', 0), ('r', 180), ('t', 90), ('b', 270)):
        for sx, sy in seeds(side):
            best = None; angles = np.arange(inward - 75, inward + 75.1, 1.0); R = _rays(g, sx, sy, angles, 4, 34)
            for i, a in enumerate(angles):
                if R is None:
                    dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
                    rs = [resp(g, sx + dx * r, sy + dy * r, dx, dy) for r in range(4, 34)]
                    if any(v is None for v in rs): continue
                else:
                    rs = R[i]
                    if np.isnan(rs).any(): continue
                sc = float(np.percentile(np.abs(rs), 25))
                if best is None or sc > best[0]: best = (sc, a)
            if best and best[0] > 15:
                pts = follow(g, sx, sy, best[1], 0, best[0])
                if len(pts) >= 40 and inky(img, pts[2:], 0):
                    fk = []; pts, head = arrowhead(img, bends(g, img, pts, forks=fk)); out.append(dict(line=pts, head=head, forks=fk))
    return out

def trace_number(g, box, img=None):
    """box: number bbox in px (x0,y0,x1,y1). Start points: around the box edges; pick the strongest line."""
    x0, y0, x1, y1 = box; cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    best = None
    for sx, sy in ((x1 + 1.5, cy), (x0 - 1.5, cy), (cx, y1 + 1.5), (cx, y0 - 1.5)):
        s, a, pol = best_dir(g, sx, sy)
        if a is None: continue
        # the line must leave the box, not run along it
        dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
        if (sx > x1 and dx < 0.2) or (sx < x0 and dx > -0.2) or (sy > y1 and dy < 0.2) or (sy < y0 and dy > -0.2): continue
        if best is None or s > best[0]: best = (s, a, pol, sx, sy)
    if best is None or best[0] < 8: return None
    s, a, pol, sx, sy = best
    pts = follow(g, sx, sy, a, pol, s)
    if len(pts) < 12: return None
    head = 0; fk = []
    if EXTEND and img is not None: pts, head = arrowhead(img, bends(g, img, pts, forks=fk))
    return dict(path=[pts[0], pts[-1]] if len(pts) < 3 else [pts[0]] + pts[len(pts) // 2:len(pts) // 2 + 1] + [pts[-1]], line=pts, score=s, pol=pol, head=head, forks=fk)

def residue(img, m, tips):
    """Thin straight stubs of printed ink still touching an erased line after inpainting: the branches of a line
    that forks part-way, the end of a bend the walk missed. Kept away from the arrow tips, where the structure is."""
    g8 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY); k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    hi, lo = img.max(2).astype(int), img.min(2).astype(int)
    black = (hi < 95) & (hi - lo < 45); white = (lo > 190) & (hi - lo < 35)
    cand = ((cv2.morphologyEx(g8, cv2.MORPH_BLACKHAT, k) > 35) & black) | ((cv2.morphologyEx(g8, cv2.MORPH_TOPHAT, k) > 35) & white)
    segs = cv2.HoughLinesP(cand.astype(np.uint8) * 255, 1, np.pi / 180, 10, minLineLength=12, maxLineGap=3)
    out = np.zeros_like(m)
    if segs is None: return out
    near = cv2.dilate(m, np.ones((9, 9), np.uint8)) > 0; H, W = m.shape
    for x0, y0, x1, y1 in segs.reshape(-1, 4):
        ends = [(x0, y0), (x1, y1)]
        if not any(near[min(max(y, 0), H - 1), min(max(x, 0), W - 1)] for x, y in ends): continue
        if any(math.hypot(x - tx, y - ty) < 14 for x, y in ends for tx, ty in tips): continue
        cv2.line(out, (int(x0), int(y0)), (int(x1), int(y1)), 255, 3)
    return out

def clean(img, traces, boxes, th=3):
    m = np.zeros(img.shape[:2], np.uint8)
    for t in traces:
        p = np.array(t['line'], np.int32).reshape(-1, 1, 2); cv2.polylines(m, [p], False, 255, th)
        if t.get('head'): cv2.polylines(m, [p[-t['head'] - 4:]], False, 255, 9)      # a printed arrowhead is wider
        for q in t.get('forks', []): cv2.polylines(m, [np.array(q, np.int32).reshape(-1, 1, 2)], False, 255, th)
    for x0, y0, x1, y1 in boxes: cv2.rectangle(m, (int(x0) - 2, int(y0) - 2), (int(x1) + 2, int(y1) + 2), 255, -1)
    out = cv2.inpaint(img, m, 4, cv2.INPAINT_TELEA)
    if EXTEND:
        tips = [t['line'][-1] for t in traces]
        for _ in range(2):          # a stub of a stub
            r = residue(out, m, tips)
            if not r.any(): break
            m = m | r; out = cv2.inpaint(img, m, 4, cv2.INPAINT_TELEA)
    return out, m

def ocr(paths):
    out = subprocess.run([OCR] + paths, capture_output=True, text=True).stdout.splitlines()
    return [json.loads(l) for l in out if l.strip()]

DIG = str.maketrans({'l': '1', 'I': '1', '|': '1', 'i': '1', 'O': '0', 'o': '0', 'S': '5', 's': '5', 'B': '8', 'Z': '2', 'z': '2', 'g': '9', 'q': '9'})
def as_num(t):
    t = t.strip().translate(DIG)
    return int(t) if re.fullmatch(r'\d{1,2}', t) else None

def blobs(img, band=0.09):
    """digit-like blobs near the edges (either polarity), merged into multi-digit numbers"""
    H, W = img.shape[:2]; g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY); out = []
    for pol in (0, 1):
        gg = g if pol == 0 else 255 - g
        th = cv2.adaptiveThreshold(gg, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 21, 25)
        n, lab, st, _ = cv2.connectedComponentsWithStats(th)
        for i in range(1, n):
            x, y, w, h, a = st[i]
            if not (0.009 * H <= h <= 0.03 * H and 2 <= w <= h * 0.95 and a >= 0.18 * w * h): continue
            cx = x + w / 2
            if not (cx < band * W or cx > (1 - band) * W or y < band * H or y + h > (1 - band) * H): continue
            out.append([x, y, x + w, y + h, pol])
    out.sort(key=lambda b: (b[4], b[1], b[0])); merged = []
    for b in out:
        for m in merged:
            if m[4] == b[4] and abs((m[1] + m[3]) / 2 - (b[1] + b[3]) / 2) < 0.5 * (b[3] - b[1]) and -2 <= b[0] - m[2] <= 0.6 * (b[3] - b[1]):
                m[0], m[1], m[2], m[3] = min(m[0], b[0]), min(m[1], b[1]), max(m[2], b[2]), max(m[3], b[3]); break
        else: merged.append(list(b))
    return merged

def find_numbers(img, expected, tmp):
    """{number: box px} for the expected label numbers"""
    H, W = img.shape[:2]; found = {}
    def add(n, box, conf, how):
        if n in expected and (n not in found or conf > found[n][1]): found[n] = (box, conf, how)
    # 1. upscaled edge strips
    sw = max(60, int(0.07 * W)); sh = max(60, int(0.07 * H)); jobs = []
    for k, (x0, y0, x1, y1) in enumerate(((0, 0, sw, H), (W - sw, 0, W, H), (0, 0, W, sh), (0, H - sh, W, H))):
        p = f'{tmp}/s{k}.png'; cv2.imwrite(p, cv2.resize(img[y0:y1, x0:x1], None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)); jobs.append((p, x0, y0, 3))
    p = f'{tmp}/full.png'; cv2.imwrite(p, cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)); jobs.append((p, 0, 0, 2))
    for o, (p, ox, oy, f) in zip(ocr([j[0] for j in jobs]), jobs):
        for it in o['items']:
            n = as_num(it['t'])
            if n is not None:
                b = it['b']; add(n, (ox + b[0] / f, oy + b[1] / f, ox + b[2] / f, oy + b[3] / f), it['c'], 'ocr')
    # 2. single blobs, each upscaled on its own
    bs = [b for b in blobs(img) if not any(_iou(b, f[0]) > 0.3 for f in found.values())]
    paths = []
    for k, (x0, y0, x1, y1, pol) in enumerate(bs):
        c = img[max(0, y0 - 3):y1 + 3, max(0, x0 - 3):x1 + 3]
        if pol: c = 255 - c
        c = cv2.copyMakeBorder(cv2.resize(c, None, fx=6, fy=6, interpolation=cv2.INTER_CUBIC), 40, 40, 40, 40, cv2.BORDER_REPLICATE)
        p = f'{tmp}/b{k:04d}.png'; cv2.imwrite(p, c); paths.append(p)
    blob_num = {}
    for o in ocr(paths) if paths else []:
        k = int(os.path.basename(o['file'])[1:5]); txt = ''.join(i['t'] for i in o['items'])
        n = as_num(txt)
        if n is not None: blob_num[k] = n; add(n, tuple(bs[k][:4]), 0.5, 'blob')
    # 3. columns: unread blobs between two read numbers fill the gap when the count matches
    cols = {}
    for n, (b, c, _h) in found.items(): cols.setdefault(round(((b[0] + b[2]) / 2) / (0.03 * W)), []).append((n, b))
    for key, anchors in cols.items():
        if len(anchors) < 2: continue
        anchors.sort(key=lambda a: (a[1][1] + a[1][3]) / 2)
        cx = np.median([(b[0] + b[2]) / 2 for _, b in anchors]); hh = np.median([b[3] - b[1] for _, b in anchors])
        cand = sorted([b for k, b in enumerate(bs) if k not in blob_num and abs((b[0] + b[2]) / 2 - cx) < 0.6 * hh + 6 and 0.6 * hh < b[3] - b[1] < 1.5 * hh], key=lambda b: b[1])
        bounds = [(0, None)] + [(a[0], (a[1][1] + a[1][3]) / 2) for a in anchors] + [(None, None)]
        for (na, ya), (nb, yb) in zip(bounds, bounds[1:]):
            if na is None or nb is None or ya is None or yb is None: continue
            miss = [n for n in range(na + 1, nb) if n in expected and n not in found]
            if not miss: continue
            between = [b for b in cand if ya < (b[1] + b[3]) / 2 < yb]
            if len(between) == len(miss):
                for n, b in zip(miss, between): add(n, tuple(b[:4]), 0.3, 'seq')
    return {n: (v[0], v[2]) for n, v in found.items()}

def _iou(a, b):
    x0, y0, x1, y1 = max(a[0], b[0]), max(a[1], b[1]), min(a[2], b[2]), min(a[3], b[3])
    if x1 <= x0 or y1 <= y0: return 0.0
    i = (x1 - x0) * (y1 - y0); return i / ((a[2] - a[0]) * (a[3] - a[1]) + (b[2] - b[0]) * (b[3] - b[1]) - i)

def content_box(img, thr=0.55):
    """the photo inside its white number margins"""
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY); nonwhite = g < 236
    cols = np.where(nonwhite.mean(axis=0) > thr)[0]; rows = np.where(nonwhite.mean(axis=1) > thr)[0]
    if len(cols) < 10 or len(rows) < 10: return (0, 0, img.shape[1], img.shape[0])
    return (int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1)

def process(img, expected, text_boxes=None):
    """-> clean image (cropped), {n: path px in the cropped image (start at photo edge -> tip)}, number boxes.
    text_boxes: {n: box px} for numbers printed as text beside the photo (lines baked in, numbers not)."""
    H, W = img.shape[:2]; nums = {}
    for n, (x0, y0, x1, y1) in (text_boxes or {}).items():
        cl_ = lambda v, m: min(max(v, 0), m)
        x0, x1 = cl_(x0, W - 2), cl_(x1, W - 1); y0, y1 = cl_(y0, H - 2), cl_(y1, H - 1)
        if x1 - x0 < 1: x1 = x0 + 1
        if y1 - y0 < 1: y1 = y0 + 1
        nums[n] = ((x0, y0, x1, y1), 'text')
    rest = set(expected) - set(nums)
    if rest and len(nums) < 3:
        with tempfile.TemporaryDirectory() as tmp:
            nums.update(find_numbers(img, rest, tmp))
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32)
    traces = {}
    for n, (box, how) in nums.items():
        t = trace_number(g, box, img)
        if t: traces[n] = t
    x0, y0, x1, y1 = content_box(img)
    extra = margin_lines(g, img, (x0, y0, x1, y1)) if EXTEND else []
    cl, _ = clean(img, list(traces.values()) + extra, [b for n, (b, how) in nums.items() if how != 'text'])
    out = {}
    for n, t in traces.items():
        pts = [(x - x0, y - y0) for x, y in t['line']]
        inside = [p for p in pts if 0 <= p[0] <= x1 - x0 and 0 <= p[1] <= y1 - y0]
        if len(inside) >= 2:      # entry, every bend, tip
            q = cv2.approxPolyDP(np.array(inside, np.float32).reshape(-1, 1, 2), 1.5, False).reshape(-1, 2)
            out[n] = [[round(float(x), 1), round(float(y), 1)] for x, y in q]
    return cl[y0:y1, x0:x1], out, {n: how for n, (b, how) in nums.items()}
