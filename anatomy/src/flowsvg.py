"""Connection flowcharts for the anatomy decks: indented-tree text -> laid-out SVG.

A flow is a dict:
  title   short heading
  blocks  list of (direction, tree text). direction 'out' = arrows parent -> child (arteries, nerves);
          'in' = arrows child -> parent (veins, lymph, drainage). Blocks share nodes by id, so a vein tree
          and an artery tree, or roots that join a nerve and rami that leave it, become one graph.
  links   optional extra edges (a, b, label[, type]). type 'conn' (default): a real connection
          (anastomosis, valveless vein, nerve fibres joining), solid magenta with a head at both ends.
          type 'rel': lies next to / runs with, not connected, grey dotted with no heads.
  orient  'h' (default, flow left -> right) or 'v' (top -> bottom, good for chains)
  kind    default node kind: a artery · v vein · n nerve · g ganglion · l lymph · s dural sinus · t target/organ
          · o opening/foramen · c CSF/space

Tree line syntax (2-space indent per level):
  [*]Name [| note] [{k}] [#id]
  *        key node (exam favourite): bold border
  | note   small grey second line
  {k}      kind for this node
  #id      id to share the node between blocks or to target a link; default id = name
"""
import html, os, re
from PIL import ImageFont

_F = {}
def _font(w, sz):
    k = (w, sz)
    if k not in _F: _F[k] = ImageFont.truetype(f'{os.environ.get("W", "/home/claude/work")}/ttf/plex{w}.ttf', sz)
    return _F[k]
def tw(s, w=500, sz=13): return _font(w, sz).getlength(s)

NAME_SZ, NOTE_SZ, PADX, LINE_N, LINE_S = 13, 10.5, 9, 16, 13.5
GAP_MAIN, GAP_CROSS, GAP_ROOT = 38, 7, 14
MAXW_NAME, MAXW_NOTE = 162, 168
KINDS = {'a': 'Artery', 'v': 'Vein', 'n': 'Nerve', 'g': 'Ganglion', 'l': 'Lymph', 's': 'Dural sinus', 't': 'Target', 'o': 'Opening', 'c': 'Space / cavity', 'r': 'Airway'}

def wrap(text, maxw, w, sz):
    words, lines, cur = text.split(' '), [], ''
    for wd in words:
        t = (cur + ' ' + wd).strip()
        if cur and tw(t, w, sz) > maxw: lines.append(cur); cur = wd
        else: cur = t
    if cur: lines.append(cur)
    return lines

def parse_line(s):
    s = s.strip(); key = s.startswith('*'); s = s[1:].strip() if key else s
    nid = k = None
    m = re.search(r'(?:^|\s)#([\w-]+)(?=\s|$)', s)
    if m: nid = m.group(1); s = (s[:m.start()] + ' ' + s[m.end():]).strip()
    m = re.search(r'\s\{(\w)\}(?=\s|$)', s)
    if m: k = m.group(1); s = (s[:m.start()] + ' ' + s[m.end():]).strip()
    name, _, note = s.partition('|')
    name = re.sub(r'\s+', ' ', name).strip(); note = re.sub(r'\s+', ' ', note).strip()
    return dict(name=name, note=note, key=key, kind=k, id=nid or name)

class Flow:
    def __init__(self, fid, d):
        self.fid, self.d = fid, d
        self.orient = d.get('orient', 'h')
        self.N, self.order, self.E, self.kids, self.parent, self.roots = {}, [], [], {}, {}, []
        dk = d.get('kind', 'a')
        for direction, text in d['blocks']:
            stack = []
            for raw in text.strip('\n').split('\n'):
                if not raw.strip(): continue
                ind = (len(raw) - len(raw.lstrip(' '))) // 2
                p = parse_line(raw)
                nid = p['id']
                if nid not in self.N:
                    p['kind'] = p['kind'] or dk
                    self.N[nid] = p; self.order.append(nid); self.kids[nid] = []
                else:
                    n = self.N[nid]
                    if p['key']: n['key'] = True
                    if p['note'] and not n['note']: n['note'] = p['note']
                    if p['kind']: n['kind'] = p['kind']
                stack = stack[:ind]
                if stack:
                    par = stack[-1]
                    if nid not in self.parent and nid not in self.roots:
                        self.parent[nid] = par; self.kids[par].append(nid)
                    self.E.append((par, nid, 'tree', par) if direction == 'out' else (nid, par, 'tree', par))
                elif nid not in self.parent and nid not in self.roots:
                    self.roots.append(nid)
                stack.append(nid)
        self.links = d.get('links', [])
        for a, b, *_ in self.links:
            for x in (a, b):
                if x not in self.N: raise SystemExit(f'flow {fid}: link to unknown node {x}')

    def measure(self):
        for nid, n in self.N.items():
            n['nl'] = wrap(n['name'], MAXW_NAME, 600 if n['key'] else 500, NAME_SZ)
            n['sl'] = wrap(n['note'], MAXW_NOTE, 400, NOTE_SZ) if n['note'] else []
            wmax = max([tw(x, 600 if n['key'] else 500, NAME_SZ) for x in n['nl']] + [tw(x, 400, NOTE_SZ) for x in n['sl']])
            n['w'] = wmax + 2 * PADX + (4 if n['kind'] == 'g' else 0)
            n['h'] = 6 + LINE_N * len(n['nl']) + LINE_S * len(n['sl']) + (6 if not n['sl'] else 4)

    def layers(self):
        succ = {k: [] for k in self.N}; indeg = {k: 0 for k in self.N}
        for a, b, *_ in self.E:
            succ[a].append(b); indeg[b] += 1
        L = {k: 0 for k in self.N}; q = [k for k in self.order if indeg[k] == 0]; seen = 0
        while q:
            u = q.pop(0); seen += 1
            for v in succ[u]:
                L[v] = max(L[v], L[u] + 1); indeg[v] -= 1
                if indeg[v] == 0: q.append(v)
        if seen != len(self.N): raise SystemExit(f'flow {self.fid}: cycle')
        self.L = L

    def layout(self):
        self.measure(); self.layers()
        H = self.orient == 'h'
        ms = lambda n: n['w'] if H else n['h']      # size along the flow
        cs = lambda n: n['h'] if H else n['w']      # size across the flow
        gm = GAP_MAIN if H else 34
        gc = GAP_CROSS if H else 14
        nl = max(self.L.values()) + 1
        colw = [0] * nl
        for k, n in self.N.items(): colw[self.L[k]] = max(colw[self.L[k]], ms(n))
        pos = [0] * nl
        for i in range(1, nl): pos[i] = pos[i - 1] + colw[i - 1] + gm
        self.pos, self.colw = pos, colw
        span = {}
        def sp(u):
            if u in span: return span[u]
            n = self.N[u]
            left = [c for c in self.kids[u] if self.L[c] < self.L[u]]
            right = [c for c in self.kids[u] if self.L[c] > self.L[u]]
            gs = lambda g: sum(sp(c) for c in g) + gc * max(0, len(g) - 1)
            span[u] = max(cs(n), gs(left), gs(right)); return span[u]
        self.cpos = {}
        def place(u, top):
            n = self.N[u]; s = sp(u); mid = top + s / 2
            self.cpos[u] = mid
            for grp in ([c for c in self.kids[u] if self.L[c] < self.L[u]], [c for c in self.kids[u] if self.L[c] > self.L[u]]):
                if not grp: continue
                g = sum(sp(c) for c in grp) + gc * (len(grp) - 1); t = mid - g / 2
                for c in grp: place(c, t); t += sp(c) + gc
        t = 0
        blk = {}
        def mark(u, r):
            if u in blk: return
            blk[u] = r
            for c in self.kids[u]: mark(c, r)
        for r in self.roots: mark(r, r)
        lpairs = set()
        for a, b, *_ in getattr(self, 'links', []) or []:
            if blk.get(a) != blk.get(b): lpairs.add(frozenset((blk.get(a), blk.get(b))))
        for i, r in enumerate(self.roots):
            place(r, t)
            nxt = self.roots[i + 1] if i + 1 < len(self.roots) else None
            t += sp(r) + (GAP_ROOT + 30 if nxt and frozenset((r, nxt)) in lpairs else GAP_ROOT)
        mn = min(self.cpos[k] - cs(self.N[k]) / 2 for k in self.N)
        for k in self.cpos: self.cpos[k] -= mn
        for k, n in self.N.items():
            m0 = pos[self.L[k]] + (colw[self.L[k]] - ms(n) if (H and self._right_align(k)) else (colw[self.L[k]] - ms(n)) / 2 if not H else 0)
            c0 = self.cpos[k] - cs(n) / 2
            n['x'], n['y'] = (m0, c0) if H else (c0, m0)
        V = list(self.N.items())
        for i in range(len(V)):
            for j in range(i + 1, len(V)):
                (ka, A), (kb, B) = V[i], V[j]
                if A['x'] < B['x'] + B['w'] - 1 and B['x'] < A['x'] + A['w'] - 1 and A['y'] < B['y'] + B['h'] - 1 and B['y'] < A['y'] + A['h'] - 1:
                    print(f'WARNING flow {self.fid}: {ka!r} overlaps {kb!r}')
        self.W = max(n['x'] + n['w'] for n in self.N.values()) + 4
        self.Hh = max(n['y'] + n['h'] for n in self.N.values()) + 4

    def optimize(self):
        """For maps with links: try block orders and a few child orders, keep the layout
        where links are shortest and cross the fewest boxes (small penalty for leaving
        the authored order)."""
        import itertools, contextlib, io
        if not self.links or self.d.get('fixed'): return
        ends = set()
        for a, b, *_ in self.links: ends.update((a, b))
        def has_end(u):
            if u in ends: return True
            return any(has_end(c) for c in self.kids[u])
        orig_kids = {k: list(v) for k, v in self.kids.items()}
        orig_roots = list(self.roots)
        opts = {}
        for k, v in orig_kids.items():
            if len(v) < 2: continue
            cand = [tuple(v), tuple(reversed(v))]
            for c in v:
                if has_end(c):
                    rest = [x for x in v if x != c]
                    cand += [tuple([c] + rest), tuple(rest + [c])]
            uniq = []
            for c in cand:
                if c not in uniq: uniq.append(c)
            if len(uniq) > 1: opts[k] = uniq
        keys = list(opts)
        root_perms = list(itertools.permutations(orig_roots)) if len(orig_roots) <= 5 else [tuple(orig_roots)]
        combos = 1
        for k in keys: combos *= len(opts[k])
        if combos * len(root_perms) > 4000: return
        def score():
            N = self.N; s = 0
            for a, b, *_ in self.links:
                A, B = N[a], N[b]
                ax, ay = A['x'] + A['w'] / 2, A['y'] + A['h'] / 2
                bx, by = B['x'] + B['w'] / 2, B['y'] + B['h'] / 2
                s += ((ax - bx) ** 2 + (ay - by) ** 2) ** .5
                for i in range(1, 20):
                    px, py = ax + (bx - ax) * i / 20, ay + (by - ay) * i / 20
                    for kk, o in N.items():
                        if kk in (a, b): continue
                        if o['x'] - 4 <= px <= o['x'] + o['w'] + 4 and o['y'] - 4 <= py <= o['y'] + o['h'] + 4: s += 60
            return s
        best = None
        for rp in root_perms:
            for choice in itertools.product(*[opts[k] for k in keys]):
                self.roots = list(rp)
                for k, c in zip(keys, choice): self.kids[k] = list(c)
                with contextlib.redirect_stdout(io.StringIO()): self.layout()
                pen = (60 if list(rp) != orig_roots else 0) + sum(40 for k, c in zip(keys, choice) if list(c) != orig_kids[k])
                sc = score() + pen
                if best is None or sc < best[0] - 1e-6: best = (sc, list(rp), {k: list(c) for k, c in zip(keys, choice)})
        self.roots = best[1]
        for k, v in best[2].items(): self.kids[k] = v

    def _right_align(self, k):
        # a node that only flows INTO its tree parent (vein tributary) hugs the right side of its column
        p = self.parent.get(k)
        return p is not None and self.L[p] > self.L[k]

    def svg(self):
        self.optimize()
        self.layout()
        H = self.orient == 'h'; N = self.N; out = []
        P = 2
        W, Hh = self.W + 2 * P, self.Hh + 2 * P
        e = lambda s: html.escape(str(s), quote=True)
        out.append(f'<svg class="flowsvg" viewBox="{-P} {-P} {W:.0f} {Hh:.0f}" width="{W:.0f}" height="{Hh:.0f}" style="max-width:{W * 1.1:.0f}px" role="img" aria-label="{e(self.d["title"])}" data-flow="{e(self.fid)}">')
        # edges
        out.append('<g class="fedges">')
        for a, b, typ, par in self.E:
            A, B = N[a], N[b]
            k = N[b]['kind'] if N[b]['kind'] not in 'togc' else N[a]['kind']
            if k in 'togc': k = next((x for x in (N[a]['kind'], N[b]['kind']) if x not in 'togc'), 'n')
            if H:
                x1, y1 = A['x'] + A['w'], A['y'] + A['h'] / 2
                x2, y2 = B['x'] - 1, B['y'] + B['h'] / 2
                bus = (x1 + GAP_MAIN / 2) if par == a else (x2 - GAP_MAIN / 2 + 1)
                d = f'M{x1:.1f},{y1:.1f} H{bus:.1f} V{y2:.1f} H{x2 - 6:.1f}' if abs(y1 - y2) > .5 else f'M{x1:.1f},{y1:.1f} H{x2 - 6:.1f}'
                ah = f'M{x2:.1f},{y2:.1f} l-7,-3.6 v7.2 z'
            else:
                x1, y1 = A['x'] + A['w'] / 2, A['y'] + A['h']
                x2, y2 = B['x'] + B['w'] / 2, B['y'] - 1
                bus = (y1 + 17) if par == a else (y2 - 15)
                d = f'M{x1:.1f},{y1:.1f} V{bus:.1f} H{x2:.1f} V{y2 - 6:.1f}' if abs(x1 - x2) > .5 else f'M{x1:.1f},{y1:.1f} V{y2 - 6:.1f}'
                ah = f'M{x2:.1f},{y2:.1f} l-3.6,-7 h7.2 z'
            out.append(f'<g class="fe k-{k}" data-a="{e(a)}" data-b="{e(b)}"><path class="fl" d="{d}"/><path class="fa" d="{ah}"/></g>')
        import math
        def head(tx, ty, ux, uy, cls):
            # arrowhead with its tip at (tx, ty) pointing along unit vector (ux, uy)
            bx_, by_ = tx - ux * 8, ty - uy * 8
            px_, py_ = -uy * 4, ux * 4
            return f'<path class="{cls}" d="M{tx:.1f},{ty:.1f} L{bx_ + px_:.1f},{by_ + py_:.1f} L{bx_ - px_:.1f},{by_ - py_:.1f} z"/>'
        placed = []; ext = [-P, -P, self.W + P, self.Hh + P]
        for a, b, *rest in self.links:
            A, B = N[a], N[b]
            lab = rest[0] if rest else ''
            typ = rest[1] if len(rest) > 1 else 'conn'
            ax, ay = A['x'] + A['w'] / 2, A['y'] + A['h'] / 2
            bx, by = B['x'] + B['w'] / 2, B['y'] + B['h'] / 2
            # leave/enter from the facing sides
            if H:
                if abs(ay - by) > abs(ax - bx) * .35:
                    ay2 = A['y'] + (A['h'] if by > ay else 0); by2 = B['y'] + (0 if by > ay else B['h'])
                    ax2, bx2 = ax, bx
                else:
                    ax2 = A['x'] + (A['w'] if bx > ax else 0); bx2 = B['x'] + (0 if bx > ax else B['w']); ay2, by2 = ay, by
            else:
                ax2, ay2, bx2, by2 = ax, A['y'] + (A['h'] if by > ay else 0), bx, B['y'] + (0 if by > ay else B['h'])
            mx, my = (ax2 + bx2) / 2, (ay2 + by2) / 2
            dx, dy = bx2 - ax2, by2 - ay2; ln = max(1, (dx * dx + dy * dy) ** .5)
            base = max(26, min(48, ln * .25))
            others = [N[k] for k in N if k not in (a, b)]
            def qpt(t_, cx_, cy_):
                return ((1 - t_) ** 2 * ax2 + 2 * (1 - t_) * t_ * cx_ + t_ * t_ * bx2, (1 - t_) ** 2 * ay2 + 2 * (1 - t_) * t_ * cy_ + t_ * t_ * by2)
            def hits(cx_, cy_):
                c = 0
                for i in range(1, 24):
                    px, py = qpt(i / 24, cx_, cy_)
                    for o in others:
                        if o['x'] - 3 <= px <= o['x'] + o['w'] + 3 and o['y'] - 3 <= py <= o['y'] + o['h'] + 3: c += 1
                return c
            best = None
            for kk in (1, -1, 1.8, -1.8, 2.8, -2.8, 4, -4):
                off = base * kk
                cx_, cy_ = mx - dy / ln * off, my + dx / ln * off
                hv = hits(cx_, cy_)
                if best is None or hv < best[0]: best = (hv, cx_, cy_)
                if hv == 0: break
            cx, cy = best[1], best[2]
            for i in range(0, 25):
                px, py = qpt(i / 24, cx, cy); ext[0] = min(ext[0], px - 6); ext[1] = min(ext[1], py - 6); ext[2] = max(ext[2], px + 6); ext[3] = max(ext[3], py + 6)
            ga = f'<g class="fl-link {typ}" data-a="{e(a)}" data-b="{e(b)}" data-lab="{e(lab)}">'
            if typ == 'conn':
                # two-way: solid line, arrowhead at both ends
                u1x, u1y = ax2 - cx, ay2 - cy; l1 = max(1e-6, math.hypot(u1x, u1y)); u1x, u1y = u1x / l1, u1y / l1
                u2x, u2y = bx2 - cx, by2 - cy; l2 = max(1e-6, math.hypot(u2x, u2y)); u2x, u2y = u2x / l2, u2y / l2
                sx, sy = ax2 - u1x * 6, ay2 - u1y * 6; ex, ey = bx2 - u2x * 6, by2 - u2y * 6
                ga += f'<path class="ll" d="M{sx:.1f},{sy:.1f} Q{cx:.1f},{cy:.1f} {ex:.1f},{ey:.1f}"/>'
                ga += head(ax2, ay2, u1x, u1y, 'la') + head(bx2, by2, u2x, u2y, 'la')
            else:
                ga += f'<path class="ll" d="M{ax2:.1f},{ay2:.1f} Q{cx:.1f},{cy:.1f} {bx2:.1f},{by2:.1f}"/>'
            if lab:
                lw = tw(lab, 500 if typ == 'conn' else 400, 10) + 12
                def free(qx, qy):
                    r = (qx - lw / 2 - 3, qy - 10, qx + lw / 2 + 3, qy + 10)
                    if any(r[0] < o['x'] + o['w'] and r[2] > o['x'] and r[1] < o['y'] + o['h'] and r[3] > o['y'] for o in N.values()): return False
                    if any(r[0] < q[2] and r[2] > q[0] and r[1] < q[3] and r[3] > q[1] for q in placed): return False
                    return True
                lx, ly = qpt(.5, cx, cy); found = False
                # first on the curve itself, then in widening rings around its middle
                for t_ in (.5, .42, .58, .34, .66, .26, .74):
                    qx, qy = qpt(t_, cx, cy)
                    if free(qx, qy): lx, ly, found = qx, qy, True; break
                if not found:
                    mx0, my0 = qpt(.5, cx, cy)
                    for rad in range(8, 200, 6):
                        for ang in range(0, 360, 15):
                            qx = mx0 + rad * math.cos(math.radians(ang)) * 1.6; qy = my0 + rad * math.sin(math.radians(ang))
                            if free(qx, qy): lx, ly, found = qx, qy, True; break
                        if found: break
                if found and math.hypot(lx - qpt(.5, cx, cy)[0], ly - qpt(.5, cx, cy)[1]) > 18:
                    # a thin leader from the label to the middle of its line
                    mx1, my1 = qpt(.5, cx, cy)
                    ga += f'<path class="lk-lead" d="M{mx1:.1f},{my1:.1f} L{lx:.1f},{ly:.1f}"/>'
                placed.append((lx - lw / 2 - 2, ly - 10, lx + lw / 2 + 2, ly + 10))
                ext[0] = min(ext[0], lx - lw / 2 - 4); ext[1] = min(ext[1], ly - 12); ext[2] = max(ext[2], lx + lw / 2 + 4); ext[3] = max(ext[3], ly + 12)
                ga += f'<g class="fl-lab"><rect x="{lx - lw / 2:.1f}" y="{ly - 8:.1f}" width="{lw:.1f}" height="16" rx="8"/><text x="{lx:.1f}" y="{ly + 3.6:.1f}" text-anchor="middle">{e(lab)}</text></g>'
            out.append(ga + '</g>')
        out.append('</g><g class="fnodes">')
        for k in self.order:
            n = N[k]; x, y, w, h = n['x'], n['y'], n['w'], n['h']
            rx = h / 2 if n['kind'] == 'g' else 6
            cls = f'fn k-{n["kind"]}' + (' key' if n['key'] else '') + (' root' if k in self.roots else '')
            out.append(f'<g class="{cls}" data-n="{e(k)}" data-note="{e(n["note"])}" data-name="{e(n["name"])}" tabindex="0"><rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx:.1f}"/>')
            px = x + PADX + (2 if n["kind"] == "g" else 0)
            for i, ln in enumerate(n['nl']):
                out.append(f'<text class="nm" x="{px:.1f}" y="{y + 16.5 + LINE_N * i:.1f}">{e(ln)}</text>')
            for j, ln in enumerate(n['sl']):
                out.append(f'<text class="nt" x="{px:.1f}" y="{y + 16.5 + LINE_N * (len(n["nl"]) - 1) + 14 + LINE_S * j:.1f}">{e(ln)}</text>')
            out.append('</g>')
        out.append('</g></svg>')
        if ext != [-P, -P, self.W + P, self.Hh + P]:
            W2, H2 = ext[2] - ext[0], ext[3] - ext[1]
            out[0] = out[0].replace(f'viewBox="{-P} {-P} {W:.0f} {Hh:.0f}" width="{W:.0f}" height="{Hh:.0f}" style="max-width:{W * 1.1:.0f}px"',
                                    f'viewBox="{ext[0]:.0f} {ext[1]:.0f} {W2:.0f} {H2:.0f}" width="{W2:.0f}" height="{H2:.0f}" style="max-width:{W2 * 1.1:.0f}px"')
            self.W, self.Hh = W2 - 2 * P, H2 - 2 * P
        return ''.join(out)

    def legend(self):
        used = []
        for k in self.order:
            kk = self.N[k]['kind']
            if kk not in used: used.append(kk)
        return used

def render(fid, d):
    f = Flow(fid, d)
    s = f.svg()
    lt = []
    for l in d.get('links', []):
        typ = l[3] if len(l) > 3 else 'conn'
        if typ not in lt: lt.append(typ)
    return dict(id=fid, title=d['title'], svg=s, legend=f.legend(), how=d.get('how', ''), w=round(f.W), h=round(f.Hh),
                links=lt)
