#!/usr/bin/env python3
"""Build the spot trainer for one course: COURSE=NS|RS python3 build.py
env  ATLAS   Rohen 8e PDF (not in the repo)
     W       work folder for the atlas index and the raster cache (default ./.work)
     OUT     site folder (default: ns-peer-tutoring/spot or rs-peer-tutoring/spot next to this repo)
     DECK    repo whose anatomy/ deck gives the lecture slides and past spot stations (default: the course repo)
Inputs here: targets.py (checklist -> structures), notes.py (find / why / Thai), app/ (page, css, js)."""
import html, json, os, re, shutil, sys, hashlib
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import targets, notes, views, atlas as ATL

COURSE = os.environ.get('COURSE', 'NS')
NSREPO = os.path.abspath(os.path.join(HERE, '..', '..'))
REPO = NSREPO if COURSE == 'NS' else os.path.join(os.path.dirname(NSREPO), 'rs-peer-tutoring')
ATLAS = os.environ['ATLAS']
W = os.environ.get('W', os.path.join(HERE, '.work')); os.makedirs(W, exist_ok=True)
OUT = os.environ.get('OUT', os.path.join(REPO, 'spot'))
DECK = os.environ.get('DECK', REPO)
for d in ('img/a', 'fonts'): os.makedirs(f'{OUT}/{d}', exist_ok=True)
OCRBIN = os.path.join(HERE, 'ocr')   # Vision OCR for raster-labelled figures (macOS)
if not os.path.exists(OCRBIN) or os.path.getmtime(OCRBIN) < os.path.getmtime(OCRBIN + '.swift'):
    import subprocess; subprocess.run(['swiftc', '-O', '-o', OCRBIN, OCRBIN + '.swift'], check=True)

# ---------- atlas index ----------
AJ = f'{W}/atlas.json'
if not os.path.exists(AJ):
    import pymupdf
    doc = pymupdf.open(ATLAS); pages = []
    for bp in range(1, 321):
        try: pages.append(ATL.page_data(doc, bp + ATL.OFF))
        except Exception as e: print('atlas page', bp, e, file=sys.stderr)
    json.dump(pages, open(AJ, 'w'))
AT = views.Atlas(ATLAS, AJ, f'{W}/cache')

# ---------- deck: lecture slides per card, past spot stations ----------
secs = {'NS': 'BSKFTONC', 'RS': 'ULWP'}[COURSE]
deck_pages = set(int(m) for X in secs for m in re.findall(r"\('R(\d+)'", open(f'{NSREPO}/anatomy/src/content/sec_{X}.py').read()))
ANAT = json.loads(re.search(r'window\.ANAT=(\{.*?\});\n', open(f'{DECK}/anatomy/student.html').read(), re.S).group(1))
CARD = {it['id']: it for s in ANAT['sections'] for it in s['items'] if it['t'] == 'c'}
PAST = [it for s in ANAT['sections'] for it in s['items'] if it['t'] == 'p' and not it.get('mcq') and it.get('img')]
EYE = {  # NS lab 7: the eye is not in Anatomy 101; slides from the main NS deck (Eye and orbit handout)
    'muscles': [('ey-muscles.jpg', 'Eye and orbit handout p.14'), ('ey-cardinal.jpg', 'Eye and orbit handout p.15')],
    'nerves': [('ey-cg.jpg', 'Eye and orbit handout p.39'), ('ey-orbit.jpg', 'Eye and orbit handout p.6')],
    'globe': [('ey-wall.jpg', 'Eye and orbit handout p.22'), ('ey-ciliary.jpg', 'Eye and orbit handout p.30')]}
EYE_OF = {'lat-rectus': 'muscles', 'cn6-orbit': 'muscles', 'lps': 'muscles', 'sup-oblique': 'muscles', 'frontal-n': 'nerves', 'ophthalmic-a': 'nerves',
          'cn2': 'nerves', 'cornea': 'globe', 'iris': 'globe', 'lens': 'globe', 'sclera': 'globe'}

def copy(src, dst):
    if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src): shutil.copy2(src, dst)

def lecture(t):
    if COURSE == 'NS' and t['id'] in EYE_OF:
        out = []
        for fn, cap in EYE[EYE_OF[t['id']]]:
            assert os.path.exists(f'{NSREPO}/img/{fn}'); out.append(dict(src=f'../img/{fn}', cap=cap))
        return out
    out = []
    for k, cid in enumerate(t['cards']):
        c = CARD.get(cid)
        if not c: continue
        for f in c['figs'][:2 if k == 0 else 1]:
            if not f['src'].startswith('img/h/'): continue
            assert os.path.exists(f'{DECK}/anatomy/{f["src"]}'); out.append(dict(src='../anatomy/' + f['src'], cap=f['cap']))
    return out[:3]

def norm(s):
    s = re.sub(r'\(.*?\)', ' ', s.lower().replace('’', '').replace("'", ''))
    s = re.sub(r'\b(the|of|muscle|muscles|nerve|artery|vein|ligament|gland|left|right)\b', ' ', s)
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()

def past_for(t):
    acc = {norm(a) for a in [t['name']] + t['acc']}; out = []
    for it in PAST:
        for j, q in enumerate(it['qs']):
            a = str(q['a'])
            if any(re.search(p, a.lower()) for p in t['pat']) or norm(a) in acc: out.append([it['id'], j]); break
    return out[:4]

# ---------- assemble ----------
LABS, T, I = [], {}, {}
stats = dict(structures=0, views=0, raster=0, photos=0, nophoto=[])
for lab in getattr(targets, COURSE):
    L = dict(lab=lab['lab'], title=lab['title'], items=[])
    for item, ts in lab['items']:
        L['items'].append(dict(name=item, ts=[t['id'] for t in ts]))
        for t in ts:
            if t['id'] in T: continue
            vs = []
            for v in AT.candidates(t, deck_pages):
                e = AT.export(v, f'{OUT}/img/a')
                if not e['path']: continue
                I[e['file']] = dict(w=e['w'], h=e['h'], page=v['page'], labels=[[l['n'], l['name'], l['path']] for l in e['labels']])
                vs.append(dict(img=e['file'], n=v['n'], path=e['path'])); stats['raster'] += v['kind'] == 'r'
            nt = notes.NOTES[t['id']]
            T[t['id']] = dict(name=t['name'], acc=t['acc'], find=nt['find'], why=nt['why'], th=nt['th'], views=vs, lec=lecture(t),
                              card=next((c for c in t['cards'] if c in CARD), ''), past=past_for(t))
            stats['structures'] += 1; stats['views'] += len(vs)
            if not vs: stats['nophoto'].append(t['id'])
    LABS.append(L)
P = {}
for it in PAST:
    assert os.path.exists(f'{DECK}/anatomy/{it["img"]}')
    P[it['id']] = dict(set=it['set'], img='../anatomy/' + it['img'], qs=[[q['q'], str(q['a']), q.get('ex', '')] for q in it['qs']])
stats['photos'] = len(I); stats['past'] = len(P)
for fn in os.listdir(f'{OUT}/img/a'):     # photos of views dropped since an earlier build
    if fn not in I: os.remove(f'{OUT}/img/a/{fn}')

META = {'NS': dict(title='NS I Spot Trainer', sub='Gross lab checklist · cadaver photos', other='https://punnawit9285.github.io/rs-peer-tutoring/spot/', othername='RS I'),
        'RS': dict(title='RS I Spot Trainer', sub='Gross lab checklist · cadaver photos', other='https://punnawit9285.github.io/ns-peer-tutoring/spot/', othername='NS I')}[COURSE]
data = dict(course=COURSE, title=META['title'], labs=LABS, T=T, I=I, P=P, deck='../anatomy/student.html')
js = 'window.SPOT=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n'
open(f'{OUT}/data.js', 'w').write(js)

# ---------- page ----------
FONTS = [('IBM Plex Sans', 'ibm-plex-sans-latin', w, 'normal', 'latin') for w in (400, 500, 600)] + \
        [('IBM Plex Sans Thai', 'ibm-plex-sans-thai-thai', w, 'normal', 'thai') for w in (400, 500, 600)] + \
        [('Bai Jamjuree', 'bai-jamjuree-latin', w, 'normal', 'latin') for w in (600, 700)] + [('Bai Jamjuree', 'bai-jamjuree-thai', 600, 'normal', 'thai')] + \
        [('IBM Plex Mono', 'ibm-plex-mono-latin', w, 'normal', 'latin') for w in (400, 600)]
ff = []
for fam, base, w, stl, sub in FONTS:
    fn = f'{base}-{w}-{stl}.woff2'; copy(f'{NSREPO}/anatomy/fonts/{fn}', f'{OUT}/fonts/{fn}')
    rng = 'U+0E00-0E7F,U+200C-200D,U+25CC' if sub == 'thai' else 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2190-2199,U+2212,U+2713,U+2717'
    ff.append(f'@font-face{{font-family:"{fam}";font-style:{stl};font-weight:{w};font-display:swap;src:url(fonts/{fn}) format("woff2");unicode-range:{rng}}}')
css = open(f'{HERE}/app/app.css').read().replace('__FONTS__', '\n'.join(ff))
appjs = open(f'{HERE}/app/app.js').read(); tutorjs = open(f'{HERE}/app/tutor.js').read()
open(f'{OUT}/app.css', 'w').write(css); open(f'{OUT}/app.js', 'w').write(appjs); open(f'{OUT}/tutor.js', 'w').write(tutorjs)
ver = hashlib.md5((js + css + appjs + tutorjs).encode()).hexdigest()[:8]
foot = ('Cadaver photographs: Rohen, Yokochi &amp; Lütjen-Drecoll, <i>Anatomy: A Photographic Atlas</i> 8e (© Schattauer / Wolters Kluwer); printed numbers removed and the leader line redrawn as an arrow. '
        'Lecture slides: 2026 handouts, Faculty of Medicine, Chulalongkorn University. Past spot stations: MDCU peer-support teams. '
        'Educational, non-profit use inside MDCU only — see <a href="../legal.md">legal.md</a>. Progress is saved in this browser only.')
for c in ('ns', 'rs'): copy(f'{HERE}/app/qr-{c}.svg', f'{OUT}/img/qr-{c}.svg')     # both trainers' QR codes (tools/qr)
for name in ('index.html', 'tutor.html'):     # tutor.html: every item of a lab on one page, with the answers
    page = open(f'{HERE}/app/{name}').read()
    for k, v in (('__TITLE__', html.escape(META['title'])), ('__SUB__', html.escape(META['sub'])), ('__OTHER__', META['other']), ('__OTHERNAME__', META['othername']), ('__FOOT__', foot), ('__V__', ver)):
        page = page.replace(k, v)
    open(f'{OUT}/{name}', 'w').write(page)
print(json.dumps(dict(stats, course=COURSE, out=OUT, version=ver)))
