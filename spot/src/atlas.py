"""Rohen 8e PDF -> per page: photos (xref, bbox), legend {num: name}, label tips (num -> polyline in page coords) and label words.
python3 atlas.py atlas.pdf first_page last_page out.json
Leader lines are vector strokes: dark in the white margin, white over the photo, chained end to end from the number to the tip."""
import re, json, sys, math
import pymupdf

OFF = 13   # pdf page index = book page + OFF

def segs_of(page):
    out = []
    for x in page.get_drawings():
        if x['type'] not in ('s', 'fs'): continue
        w = x.get('width') or 0
        if w > 1.2: continue
        col = tuple(x.get('color') or (0, 0, 0))
        # leader lines are near-black or white, not the blue/coloured schematic strokes
        grey = max(col) - min(col) < 0.08
        if not grey: continue
        for it in x['items']:
            if it[0] == 'l':
                a, b = it[1], it[2]
                if abs(a.x - b.x) + abs(a.y - b.y) > 0.5: out.append(((a.x, a.y), (b.x, b.y)))
    return out

def legend_and_labels(page):
    """legend: a number word with a name starting just right of it on the same row (plus continuation rows);
    labels: every other number word (beside or on a figure)"""
    words = page.get_text('words')
    cy = lambda w: (w[1] + w[3]) / 2
    isnum = lambda w: re.fullmatch(r'\d{1,3}', w[4]) is not None
    names, legend_ids = {}, set()
    for w in words:
        if not isnum(w): continue
        right = sorted([v for v in words if abs(cy(v) - cy(w)) < 2 and v[0] > w[2] - 0.5], key=lambda v: v[0])
        if not right or not (1 < right[0][0] - w[2] < 16) or not re.search(r'[A-Za-z]', right[0][4]): continue
        row, last = [], w[2]
        for v in right:
            if v[0] - last > 14: break
            row.append(v); last = v[2]
        x0, y = row[0][0], cy(w); parts = [' '.join(v[4] for v in row)]
        while True:   # continuation rows: start at the name's x, 6-13 pt lower, no number in front
            nxt = [v for v in words if abs(v[0] - x0) < 2.5 and 6 < cy(v) - y < 13.5]
            if not nxt or any(isnum(u) and abs(cy(u) - cy(nxt[0])) < 2 and 0 < x0 - u[2] < 16 for u in words): break
            y = cy(nxt[0]); r2, last = [], nxt[0][0] - 1
            for v in sorted([v for v in words if abs(cy(v) - y) < 2 and v[0] >= x0 - 0.5], key=lambda v: v[0]):
                if v[0] - last > 14: break
                r2.append(v); last = v[2]
            parts.append(' '.join(v[4] for v in r2))
        n = int(w[4])
        if n not in names: names[n] = re.sub(r'\s+', ' ', ' '.join(parts)).replace('- ', '-').strip()
        legend_ids.add(id(w))
    labels = [w for w in words if id(w) not in legend_ids and re.fullmatch(r'\d{1,3}[a-z]?', w[4])]
    return names, labels

def _unit(a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy) or 1.0
    return dx / L, dy / L

def chain(start, segs, used, d0=None, depth=0):
    """follow a leader line from start: extend along every collinear segment that overlaps or continues it
    (dark margin part and white photo part overlap by a few points), then take an elbow if one starts at the reach point.
    Returns a list of polylines (more than one only when the line forks)."""
    reach, d = start, d0
    pts = [start]
    while True:
        best = None
        for i, (a, b) in enumerate(segs):
            if i in used: continue
            for p, q in ((a, b), (b, a)):
                u = _unit(p, q)
                if d is not None:
                    if u[0] * d[0] + u[1] * d[1] < 0.9994: continue          # within ~2 degrees, same direction
                    # p must lie on the current line, near (or behind) the reach point
                    rx, ry = p[0] - reach[0], p[1] - reach[1]
                    along = rx * d[0] + ry * d[1]; perp = abs(-rx * d[1] + ry * d[0])
                    if perp > 0.9 or along > 4.0: continue
                    far = (q[0] - reach[0]) * d[0] + (q[1] - reach[1]) * d[1]
                    if far <= 0.3: continue
                else:
                    if math.dist(p, reach) > 1.0: continue
                    far = math.dist(p, q)
                if best is None or far > best[0]: best = (far, i, q, u)
        if best is None: break
        _, i, q, u = best; used.add(i); reach = q; d = u if d is None else d; pts.append(q)
    if depth < 4:
        forks = []
        for i, (a, b) in enumerate(segs):
            if i in used: continue
            for p, q in ((a, b), (b, a)):
                if math.dist(p, reach) < 1.2 and math.dist(p, q) > 2:
                    u = _unit(p, q)
                    if d is None or abs(u[0] * d[0] + u[1] * d[1]) < 0.9994: forks.append((i, p, q, u))
        if forks:
            out = []
            for i, p, q, u in forks:
                if i in used: continue
                used.add(i)
                for tail in chain(q, segs, used, u, depth + 1): out.append(pts + tail)
            if out: return out
    return [pts]

def tips_for_label(w, segs, used):
    """segments with an endpoint near the number box; follow each to its far end"""
    x0, y0, x1, y1 = w[:4]; cy = (y0 + y1) / 2
    best = []
    for i, (a, b) in enumerate(segs):
        if i in used: continue
        for p, q in ((a, b), (b, a)):
            dx = 0 if x0 - 0.5 <= p[0] <= x1 + 0.5 else min(abs(p[0] - x0), abs(p[0] - x1))
            dy = abs(p[1] - cy)
            if dx < 4.5 and dy < 4.0:
                best.append((dx + dy, i, p, q))
    out = []
    for _, i, p, q in sorted(best):
        if i in used: continue
        used.add(i)
        for path in chain(q, segs, used, _unit(p, q)):
            out.append([p] + path)
    return out

def page_data(d, idx):
    p = d[idx]
    imgs = []
    for info in p.get_image_info(xrefs=True):
        b = info['bbox']
        if (b[2] - b[0]) < 60 or (b[3] - b[1]) < 60: continue
        imgs.append(dict(xref=info['xref'], bbox=[round(v, 2) for v in b], w=info['width'], h=info['height'], tf=[round(v, 4) for v in info['transform']]))
    names, labels = legend_and_labels(p)
    segs = segs_of(p); used = set()
    tips = []
    for w in sorted(labels, key=lambda w: (w[1], w[0])):
        n = re.match(r'\d+', w[4]).group(0)
        for path in tips_for_label(w, segs, used):
            tip = path[-1]
            if math.dist(path[0], tip) < 6: continue
            fig = next((k for k, im in enumerate(imgs) if im['bbox'][0] - 1 <= tip[0] <= im['bbox'][2] + 1 and im['bbox'][1] - 1 <= tip[1] <= im['bbox'][3] + 1), None)
            if fig is None: continue
            tips.append(dict(n=int(n), lab=w[4], fig=fig, path=[[round(x, 2), round(y, 2)] for x, y in path], num=[round(v, 2) for v in w[:4]]))
    words = [[w[4], [round(v, 2) for v in w[:4]]] for w in labels]
    return dict(page=idx - OFF, idx=idx, size=[p.rect.width, p.rect.height], imgs=imgs, legend=names, tips=tips, labels=words)

if __name__ == '__main__':
    d = pymupdf.open(sys.argv[1]); a, b = int(sys.argv[2]), int(sys.argv[3]); out = []
    for bp in range(a, b + 1):
        idx = bp + OFF
        if idx >= d.page_count: break
        try: out.append(page_data(d, idx))
        except Exception as e: print('page', bp, 'error', e, file=sys.stderr)
    json.dump(out, open(sys.argv[4], 'w'))
    print(len(out), 'pages', sum(len(x['tips']) for x in out), 'tips', sum(len(x['legend']) for x in out), 'legend entries')
