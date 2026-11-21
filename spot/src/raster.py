"""Atlas figures whose numbers and leader lines are part of the photo (raster labels).
Find the numbers (Vision OCR on upscaled edge strips and single blobs, then fill each column's sequence),
follow each leader line from its number to its tip, then crop the white number margins and inpaint the lines,
so the photo is as clean as the vector-labelled ones."""
import json, math, os, re, subprocess, tempfile
import numpy as np, cv2

THR = 18.0    # window-averaged line contrast (grey levels) that still counts as line
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

def best_dir(g, sx, sy, r0=4, r1=34, polar=None):
    best = (0, None, None)
    for a in np.arange(0, 360, 1.0):
        dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
        rs = [resp(g, sx + dx * r, sy + dy * r, dx, dy) for r in range(r0, r1)]
        if any(v is None for v in rs): continue
        rs = np.array(rs)
        for pol in ((1, -1) if polar is None else (polar,)):
            s = float(np.percentile(rs * pol, 25))     # the line must be there along most of the ray
            if s > best[0]: best = (s, a, pol)
    return best

def ray(g, sx, sy, a, n, off=2.8):
    dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
    C, N1, N2 = [], [], []
    for r in range(1, n):
        x, y = sx + dx * r, sy + dy * r
        c = samp(g, x, y); n1 = samp(g, x - dy * off, y + dx * off); n2 = samp(g, x + dy * off, y - dx * off)
        if c is None or n1 is None or n2 is None: break
        C.append(c); N1.append(n1); N2.append(n2)
    return np.array(C), np.array(N1), np.array(N2)

def evidence(C, N1, N2, k=7):
    if len(C) < k: return np.zeros(len(C))
    f = np.ones(k) / k; sm = lambda v: np.convolve(v, f, mode='same')
    c, n1, n2 = sm(C), sm(N1), sm(N2)
    return np.abs((n1 + n2) / 2 - c) - 0.4 * np.abs(n1 - n2)

def snap(g, sx, sy, a, offs, das, n=90):
    best = (-1e9, a, sx, sy)
    for off in offs:
        px, py = -math.sin(math.radians(a)) * off, math.cos(math.radians(a)) * off
        for da in das:
            C, N1, N2 = ray(g, sx + px, sy + py, a + da, n)
            if len(C) < 20: continue
            m = float(np.mean(np.minimum(evidence(C, N1, N2)[3:], 60)))
            if m > best[0]: best = (m, a + da, sx + px, sy + py)
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

def trace_number(g, box):
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
    return dict(path=[pts[0], pts[-1]] if len(pts) < 3 else [pts[0]] + pts[len(pts) // 2:len(pts) // 2 + 1] + [pts[-1]], line=pts, score=s, pol=pol)

def clean(img, traces, boxes, th=3):
    m = np.zeros(img.shape[:2], np.uint8)
    for t in traces:
        p = np.array(t['line'], np.int32).reshape(-1, 1, 2); cv2.polylines(m, [p], False, 255, th)
    for x0, y0, x1, y1 in boxes: cv2.rectangle(m, (int(x0) - 2, int(y0) - 2), (int(x1) + 2, int(y1) + 2), 255, -1)
    return cv2.inpaint(img, m, 4, cv2.INPAINT_TELEA), m

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
        t = trace_number(g, box)
        if t: traces[n] = t
    cl, _ = clean(img, list(traces.values()), [b for n, (b, how) in nums.items() if how != 'text'])
    x0, y0, x1, y1 = content_box(img)
    out = {}
    for n, t in traces.items():
        pts = [(x - x0, y - y0) for x, y in t['line']]
        inside = [p for p in pts if 0 <= p[0] <= x1 - x0 and 0 <= p[1] <= y1 - y0]
        if len(inside) >= 2: out[n] = [[round(inside[0][0], 1), round(inside[0][1], 1)], [round(inside[-1][0], 1), round(inside[-1][1], 1)]]
    return cl[y0:y1, x0:x1], out, {n: how for n, (b, how) in nums.items()}
