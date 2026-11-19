#!/usr/bin/env python3
"""Build the NS I & RS I Anatomy 101 site: content/*.py + bank/*.py + videos -> site/{student,tutor,index}.html + img/."""
import importlib.util, json, os, re, glob, shutil, html, sys
from PIL import Image, ImageOps
import pymupdf

W = os.environ.get('W', '/home/claude/work')   # work folder: content/, bank/, app/, src/ PDFs, rohen/, tb/, fz/
COURSE = os.environ.get('COURSE', 'NS')          # NS or RS: one deck per course
PUBLIC = os.environ.get('PUBLIC') == '1'      # GitHub build: no Rohen plates
OUT = os.environ.get('OUT', W + ('/site_pub/' if PUBLIC else '/site/') + COURSE.lower())
sys.path.insert(0, W); import flowsvg
FL = None
ORDER = {'NS': ['B', 'S', 'K', 'F', 'T', 'O', 'N', 'C'], 'RS': ['U', 'L', 'W', 'P']}[COURSE]
os.makedirs(OUT + '/img/h', exist_ok=True); os.makedirs(OUT + '/img/r', exist_ok=True)
os.makedirs(OUT + '/img/pp', exist_ok=True); os.makedirs(OUT + '/img/v', exist_ok=True); os.makedirs(OUT + '/fonts', exist_ok=True); os.makedirs(OUT + '/img/t', exist_ok=True)

def load(path):
    spec = importlib.util.spec_from_file_location(os.path.basename(path)[:-3], path)
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m

# ---------- images ----------
_docs = {}
def doc(name):
    if name not in _docs: _docs[name] = pymupdf.open(f'{W}/src/{name}.pdf')
    return _docs[name]
def handout(h, p, dpi=130):
    fn = f'img/h/{h}_{p:03d}.jpg'
    if not os.path.exists(f'{OUT}/{fn}'):
        pix = doc(h)[p - 1].get_pixmap(dpi=dpi)
        im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        if im.width > 1300: im.thumbnail((1300, 1300))
        im.save(f'{OUT}/{fn}', quality=80, optimize=True)
    return fn
HN = {'ns1_back':'Back & vertebral column','ns2_spinal':'Spinal cord & peripheral nerve','ns3_skull':'Skull','ns4_supface':'Superficial face & neck',
      'ns5_deepface':'Deep structures of face','ns6_oral':'Oral cavity & floor of mouth','ns7_deepneck':'Deep structures of neck','ns8_cranial':'Cranial cavity',
      'rs1_urt_slide':'Upper respiratory tract','rs1_urt_sheet':'URT sheet','rs2_thorax':'Thoracic wall & diaphragm','rs3_lung':'Pleura, lungs & bronchial tree'}
def tbimg(k):
    fn = f'img/t/{k}.jpg'
    if not os.path.exists(f'{OUT}/{fn}'):
        im = Image.open(f'{W}/tb/{k}.jpg').convert('RGB')
        if max(im.size) > 1300: im.thumbnail((1300, 1300))
        im.save(f'{OUT}/{fn}', quality=82, optimize=True)
    return fn
def anyfig(h, pg, own=None):
    if h == 'tb':
        return dict(src=tbimg(pg), cap=f'{COURSE} I tidbits board (peer summary)')
    return dict(src=handout(h, pg), cap=f'Handout p.{pg}' + ('' if h == own else f' · {HN.get(h, h)}'))
def extimg(name):
    fn = 'img/pp/x_' + name.replace(':', '_')
    if not os.path.exists(f'{OUT}/{fn}'):
        repo, _, base = name.rpartition(':'); repo = repo or 'ns'
        im = Image.open(f'{os.environ.get("REPOS", "/home/claude/punnawit9285")}/{repo}-peer-tutoring/img/{base}').convert('RGB')
        if max(im.size) > 1500: im.thumbnail((1500, 1500))
        im.save(f'{OUT}/{fn}', quality=85, optimize=True)
    return fn
def rohen(bp, i):
    if PUBLIC: return None
    fn = f'img/r/R{bp}_{i}.jpg'
    if not os.path.exists(f'{OUT}/{fn}') or os.path.getmtime(f'{OUT}/{fn}') < os.path.getmtime(f'{W}/rohen/R{bp}_{i}.jpg'):
        im = Image.open(f'{W}/rohen/R{bp}_{i}.jpg').convert('RGB')
        if max(im.size) > 1300: im.thumbnail((1300, 1300))
        im.save(f'{OUT}/{fn}', quality=82, optimize=True)
    return fn
def autocrop(im, pad=10):
    g = ImageOps.invert(im.convert('L'))
    bb = g.point(lambda v: 255 if v > 18 else 0).getbbox()
    if not bb: return im
    x0, y0, x1, y1 = bb
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))
def ppage(src, p):
    fn = f'img/pp/{src}_{p:03d}.jpg'
    if not os.path.exists(f'{OUT}/{fn}'):
        pg = doc(src)[p - 1]
        z = 1500 / pg.rect.width
        pix = pg.get_pixmap(matrix=pymupdf.Matrix(z, z))
        im = autocrop(Image.frombytes('RGB', (pix.width, pix.height), pix.samples))
        if im.width > 1400: im.thumbnail((1400, 1400))
        im.save(f'{OUT}/{fn}', quality=80, optimize=True)
    return fn

# ---------- Rohen legends (parsed once, from rohen_extract output) ----------
LEG = {}
cur = None
for l in open(f'{W}/rohen/legends.txt'):
    mm = re.match(r'== R(\d+):', l)
    if mm: cur = int(mm.group(1)); continue
    if cur and l.startswith('    '):
        for part in re.split(r';\s+(?=\d{1,2} )', l.strip()):
            q = re.match(r'(\d{1,2}) (.*)', part)
            if q: LEG.setdefault(cur, {})[int(q.group(1))] = q.group(2)

# ---------- text ----------
def inl(t):
    t = html.escape(str(t), quote=False)
    t = re.sub(r'\{\{(.+?)\}\}', r'<span class="cz">\1</span>', t)
    return re.sub(r'(→|↔|←)', r'<span class="lt-ar">\1</span>', t)
def lite(lines):
    out, ul, tb = [], None, None
    def flush():
        nonlocal ul, tb
        if ul: out.append('<ul class="lt-pts">' + ''.join(ul) + '</ul>'); ul = None
        if tb:
            head, *rows = tb
            out.append('<div class="tblwrap"><table class="lt-tbl"><thead><tr>' + ''.join(f'<th>{inl(c)}</th>' for c in head) + '</tr></thead><tbody>' +
                       ''.join('<tr>' + ''.join(f'<td>{inl(c)}</td>' for c in r) + '</tr>' for r in rows) + '</tbody></table></div>'); tb = None
    for b in lines:
        if b.startswith('- '):
            if tb: flush()
            ul = (ul or []) + [f'<li>{inl(b[2:])}</li>']; continue
        if b.startswith('|'):
            if ul: flush()
            tb = (tb or []) + [[c.strip() for c in b.strip().strip('|').split('|')]]; continue
        flush()
        if b.startswith('> '): out.append(f'<p class="lt-chain">{inl(b[2:])}</p>')
        elif b.startswith('## '): out.append(f'<p class="lt-h">{inl(b[3:])}</p>')
        elif b.startswith('! '): out.append(f'<p class="lt-trap">{inl(b[2:])}</p>')
        elif b.startswith('= '): out.append(f'<div class="eqn">{inl(b[2:])}</div>')
        else: out.append(f'<p class="lt-p">{inl(b)}</p>')
    flush()
    return ''.join(out)
def ts(s): s = int(s); return f'{s // 60:02d}:{s % 60:02d}'

# ---------- videos ----------
V = load(f'{W}/content/videos.py').CLIPS
FRAMES = f'{W}/fz'
import cv2
_sharp = {}
def sharp(f):
    if f not in _sharp:
        g = cv2.imread(f, cv2.IMREAD_GRAYSCALE); _sharp[f] = cv2.Laplacian(g, cv2.CV_64F).var() if g is not None else 0
    return _sharp[f]
def frame(clip, t, win=8):
    d = f'{FRAMES}/{clip}'
    if not os.path.isdir(d): return None
    fs = sorted(glob.glob(f'{d}/*.jpg'))
    if not fs: return None
    tt = lambda f: int(re.search(r'_t(\d+)', f).group(1))
    near = [f for f in fs if abs(tt(f) - t) <= win] or [min(fs, key=lambda f: abs(tt(f) - t))]
    best = max(near, key=sharp)
    fn = f'img/v/{os.path.basename(best)}'
    if not os.path.exists(f'{OUT}/{fn}'):
        im = Image.open(best).convert('RGB'); im.save(f'{OUT}/{fn}', quality=82)
    return fn
def vid_card(clip, c):
    pts, fixes = [], []
    for t, kind, text in c['pts']:
        if kind == 'fix' and 'Correct:' in text:
            heard, fix = text.split('Correct:', 1)
            heard = re.sub(r'^(Heard:\s*|The group also listed\s*)', '', heard.strip())
            fixes.append([ts(t), heard.strip(), fix.strip()])
        else: pts.append([ts(t), text])
    times = sorted(set([t for t, _, _ in c['pts']]))
    frs = []
    for t in times[:4]:
        f = frame(clip, t)
        if f: frs.append(dict(src=f, ts=ts(t)))
    return dict(t='v', id='V-' + clip[4:], clip=clip, title=c['title'], dur=ts(c['dur']), pts=pts, fixes=fixes, frames=frs)

# ---------- assemble ----------
banks = [load(f) for f in sorted(glob.glob(f'{W}/bank/b_*.py'))]
TT = load(f'{W}/content/thai_tutor.py'); FLOWS = load(f'{W}/content/flows.py')
FLR = {}
for _fid, _d in FLOWS.FLOWS.items():
    _r = flowsvg.render(_fid, _d); _r['th'] = _d.get('th', ''); FLR[_fid] = _r
SET_ORDER = ['AC76', 'AC77', 'AC78', 'AC79', 'AC80', 'AC81']
sections = []
stats = dict(c=0, s=0, v=0, p=0, q=0)
for X in ORDER:
    p = f'{W}/content/sec_{X}.py'
    if not os.path.exists(p): continue
    m = load(p); S = dict(m.SEC); items = []
    for c in m.CARDS:
        figs = [anyfig(h, pg, S['handout']) for h, pg in c.get('figs', [])]
        for f_ in figs:
            if f_['cap'].startswith('Handout') and ' · ' not in f_['cap']: f_['cap'] += f' · {S["hname"]}'
        items.append(dict(t='c', id=c['id'], title=c['title'], core=c.get('core', False), figs=figs, body=lite(c['pts']),
                          th=html.escape(c.get('th', ''), quote=False), tn=[html.escape(x, quote=False) for x in c.get('tn', [])], say=c.get('say', '')))
    for st in getattr(m, 'STEPS', []):
        bp, i = st['fig']; bp = int(str(bp).lstrip('R'))
        if st.get('fig2'): st['fig2'] = (int(str(st['fig2'][0]).lstrip('R')), st['fig2'][1])
        cad = dict(src=rohen(bp, i), cap=f'Rohen, Photographic Atlas 8e p.{bp}')
        cad2 = None
        if st.get('fig2') and not PUBLIC: cad2 = dict(src=rohen(*st['fig2']), cap=f'Rohen 8e p.{st["fig2"][0]}')
        fix = st.get('fix', {})
        labels = []
        for n in st['nums']:
            name = fix.get(n) or LEG.get(st.get('legp', bp), {}).get(n) or (LEG.get(st['fig2'][0], {}).get(n) if st.get('fig2') else None)
            if not name: raise SystemExit(f'missing legend {st["id"]} R{bp} #{n}')
            labels.append([str(n), name])
        cmp = [anyfig(h, pg, S['handout']) for h, pg in st.get('cmp', [])]
        vid = None
        if st.get('vid'):
            clip, t = st['vid']; note = ''
            for tt, k, tx in V.get(clip, {}).get('pts', []):
                if tt == t: note = tx; break
            vid = dict(clip=clip, ts=ts(t), note=note, src=frame(clip, t), cap=f'{clip} @ {ts(t)}')
        items.append(dict(t='s', id=st['id'], title=st['title'], instr=st['instr'], cad=cad, cad2=cad2, cmp=cmp, labels=labels,
                          note=st.get('nums_note', ''), rel=st['rel'], refs=st['refs'], vid=vid, tn=st.get('tn', []), say=st.get('say', '')))
    for clip, c in V.items():
        if c['sec'][0] == X: items.append(vid_card(clip, c))
    spots = []
    for b in banks:
        for it in b.ITEMS:
            if it['sec'] != X: continue
            qs = []
            for q in it['qs']:
                qq = dict(q=q['q'], ex=q.get('ex', ''))
                if q.get('o'): qq['o'] = q['o']; qq['a'] = q['a']
                else: qq['o'] = None; qq['a'] = q['a']
                qs.append(qq)
            mcq = getattr(b, 'MCQ', False); sset = it.get('set', b.SET)
            img = extimg(it['img']) if it.get('img') else (None if mcq else ppage(b.SRC, it['page']))
            spots.append(dict(t='p', id=it['id'], set=sset, src=b.SRC, img=img, mcq=mcq, qs=qs,
                              _o=(1 if mcq else 0, SET_ORDER.index(sset[:4]) if sset[:4] in SET_ORDER else 9, it['id'])))
    spots.sort(key=lambda x: x['_o'])
    for s in spots: s.pop('_o')
    items += spots
    for it in items:
        if it['t'] in 'cs':
            it['say'] = it.get('say') or TT.SAY_EN.get(it['id'], '')
            it['say_th'] = TT.SAY_TH.get(it['id'], '')
            if not it['say_th']: raise SystemExit(f'no Thai SAY for {it["id"]}')
            if it['id'] in TT.TN_TH: it['tn'] = [html.escape(x, quote=False) for x in TT.TN_TH[it['id']]] + list(it.get('tn', []))
            fl = [FLR[f] for f in FLOWS.ATTACH.get(it['id'], [])]
            if fl: it['flows'] = fl
        stats[it['t']] += 1
        if it['t'] == 'p': stats['q'] += len(it['qs'])
    S['items'] = items
    sections.append(S)

META = {'NS': dict(title='NS I Anatomy 101', deck='ns', badge='Peer tutoring', sub='Back, spinal cord, skull, head & neck · cadaver ↔ lecture',
            lede='The eight gross-anatomy lectures of NS I as concept cards, cadaver steps (real specimen beside the lecture diagram), the group\'s own lab clips, the NS I tidbits board, and every usable past spot test (AC76-AC81) with keys.'),
          'RS': dict(title='RS I Anatomy 101', deck='rs', badge='Peer tutoring', sub='Nose, pharynx, larynx, thoracic wall & lungs · cadaver ↔ lecture',
            lede='The three gross-anatomy lectures of RS I as concept cards, cadaver steps (real specimen beside the lecture diagram), the RS I tidbits board, and every usable past RS spot test (AC76-AC81) with keys.')}[COURSE]
META.update(
            disc='Cadaver photographs: Rohen, Yokochi & Lütjen-Drecoll, Anatomy: A Photographic Atlas 8e (© Schattauer / Wolters Kluwer). Past spot tests and MCQ recalls: MDCU peer-support teams (AC79 spot II and the MCQ items as edited in the ns- and rs-peer-tutoring decks). ' + COURSE + ' I tidbits board: class summary. Lecture figures: 2026 NS I / RS I handouts, Faculty of Medicine, Chulalongkorn University. For use inside the class only.')
data = dict(meta=META, sections=sections)
json.dump(stats, sys.stdout); print()

# ---------- fonts ----------
FS = os.environ.get('FONTS', '/home/claude/fonts/node_modules/@fontsource')
fonts = [('IBM Plex Sans', 'ibm-plex-sans', 'latin', w, st) for w in (400, 500, 600) for st in ('normal', 'italic')] + \
        [('IBM Plex Sans Thai', 'ibm-plex-sans-thai', 'thai', w, 'normal') for w in (400, 500, 600)] + \
        [('Bai Jamjuree', 'bai-jamjuree', sub, w, 'normal') for sub in ('latin', 'thai') for w in (500, 600, 700)] + \
        [('IBM Plex Mono', 'ibm-plex-mono', 'latin', w, 'normal') for w in (400, 500, 600)]
ff = []
for fam, pkg, sub, w, st in fonts:
    fn = f'{pkg}-{sub}-{w}-{st}.woff2'
    shutil.copy(f'{FS}/{pkg}/files/{fn}', f'{OUT}/fonts/{fn}')
    rng = 'U+0E00-0E7F,U+200C-200D,U+25CC' if sub == 'thai' else 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212,U+2215'
    ff.append(f'@font-face{{font-family:"{fam}";font-style:{st};font-weight:{w};font-display:swap;src:url(fonts/{fn}) format("woff2");unicode-range:{rng}}}')
FONTCSS = '\n'.join(ff)

def page(mode):
    css = FONTCSS + '\n' + ''.join(open(f'{W}/app/{f}').read() for f in ('base.css', 'deck.css', 'tutor.css', 'anat.css', 'flow.css'))
    body = open(f'{W}/app/body.html').read().replace('NS I &amp; RS I Anatomy 101', html.escape(META['title']))
    other = 'rs' if COURSE == 'NS' else 'ns'
    olink = f'https://punnawit9285.github.io/{other}-peer-tutoring/anatomy/' if PUBLIC else f'../{other}/'
    if mode == 'tutor':
        body = body.replace('__SUB__', 'Tutor deck · answers, Thai notes, lab clips').replace('__TUTORCTRL__',
            '<label class="chk" for="follow"><input type="checkbox" id="follow" checked> Follow student</label><a class="btn small" href="student.html" target="_blank" rel="noopener">Student deck ↗</a>' + f'<a class="btn small" href="{olink}tutor.html">{other.upper()} I ↗</a>')
        body = body.replace('__KEYS__', '← → move · B browse · ติ๊ก Follow student แล้วเปิด student.html อีกแท็บ: tutor deck จะเลื่อนตาม')
    else:
        body = body.replace('__SUB__', 'Student deck · AC76–81 spot practice').replace('__TUTORCTRL__', f'<a class="btn small" href="{olink}student.html">{other.upper()} I ↗</a>')
        body = body.replace('__KEYS__', '← → move · Space reveal / next · Enter reveal all · A–E choose · R reset · L Thai · B browse')
    js = 'window.MODE=' + json.dumps(mode) + ';window.ANAT=' + json.dumps(data, ensure_ascii=False) + ';\n' + open(f'{W}/app/app.js').read()
    assert '</script' not in js.lower()
    title = META['title'] + (' (Tutor)' if mode == 'tutor' else '')
    return f'<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>{title}</title>\n<style>\n{css}\n</style>\n</head>\n<body>\n{body}\n<script>\n{js}\n</script>\n</body>\n</html>\n'
open(f'{OUT}/student.html', 'w').write(page('student'))
open(f'{OUT}/index.html', 'w').write(page('student'))
open(f'{OUT}/tutor.html', 'w').write(page('tutor'))
json.dump(data, open(f'{W}/site_data_{COURSE}{"_pub" if PUBLIC else ""}.json', 'w'), ensure_ascii=False)
print('ok', OUT)
