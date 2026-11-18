#!/usr/bin/env python3
"""student.pdf for one deck: COURSE=NS|RS python3 printpdf.py
Concepts with numbered empty blanks, cadaver steps with numbered lines, lab-clip myths, past papers without answers;
answer key at the back (blanks, labels, relationships, past-paper keys, Thai explanations)."""
import json, os, re, html, sys, asyncio
COURSE = os.environ.get('COURSE', 'NS'); PUBLIC = os.environ.get('PUBLIC') == '1'
W = '/home/claude/work'; D = json.load(open(f'{W}/site_data_{COURSE}{"_pub" if PUBLIC else ""}.json'))
OUT = f'{W}/{"site_pub" if PUBLIC else "site"}/{COURSE.lower()}'
KN = {'a': 'artery', 'v': 'vein', 'n': 'nerve', 'g': 'ganglion', 'l': 'lymph', 's': 'dural sinus', 't': 'target / organ', 'o': 'opening', 'c': 'space', 'r': 'airway'}
def flows(it):
    out = ''
    for f in it.get('flows', []):
        lg = ''.join(f'<span style="--c:var(--fk-{k});--b:var(--fk-{k}-bg)">{KN[k]}</span>' for k in f['legend'])
        out += f'<div class="pflow"><div class="pfh">Connection map · {esc(f["title"])}</div>{f["svg"]}<div class="flegend">{lg}{"<span class=lk>dashed = connection</span>" if f.get("links") else ""}</div></div>'
    return out
def cadfig(f, style=''):
    if not f.get('src'):
        return f'<div class="fig"><div class="phbox"><b>Cadaver photo</b><br>{esc(f["cap"])}<br><small>Open this page in your Rohen atlas; the numbers below match it.</small></div></div>'
    return f'<div class="fig"><img src="{f["src"]}"{style}><div class="cap">{esc(f["cap"])}</div></div>'
LET = 'ABCDEFGH'
esc = lambda s: html.escape(str(s), quote=False)

def blanks(body, start):
    """replace each cloze span by a numbered gap; return html, answers, next number"""
    ans = []
    def rep(m):
        ans.append(re.sub(r'<[^>]+>', '', m.group(1)))
        n = start + len(ans) - 1
        w = max(18, min(46, int(len(ans[-1]) * 2.1)))
        return f'<span class="gap" style="min-width:{w}mm"><i>{n}</i></span>'
    out = re.sub(r'<span class="cz">(.*?)</span>', rep, body)
    return out, ans, start + len(ans)

fontcss = '\n'.join(l for l in open(f'{OUT}/student.html').read().split('\n') if l.startswith('@font-face'))
CSS = fontcss + open(f'{W}/app/flow.css').read() + r'''
.pflow { break-inside: avoid; margin: 4mm 0 2mm; border: 1px solid #d9dde5; border-radius: 2mm; padding: 2.5mm 3mm; }
.pflow .pfh { font-family: "IBM Plex Mono", monospace; font-size: 8pt; color: #4a5263; margin-bottom: 1.5mm; }
.pflow .flowsvg { width: auto; max-width: 100%; max-height: 165mm; height: auto; }
.pflow .flegend { display: flex; flex-wrap: wrap; gap: 1mm 4mm; font-family: "IBM Plex Mono", monospace; font-size: 7pt; color: #4a5263; margin-top: 1mm; }
.pflow .flegend span::before { content: ""; display: inline-block; width: 2.6mm; height: 2.6mm; border-radius: .8mm; margin-right: 1mm; vertical-align: -.4mm; border: 1.2px solid var(--c); background: var(--b); }
.pflow .flegend .lk::before { border: 0; border-top: 1.2px dashed #7a8190; border-radius: 0; height: 0; width: 5mm; background: none; vertical-align: .8mm; }
.phbox { border: 1.5px dashed #9aa1b0; border-radius: 2mm; padding: 10mm 6mm; text-align: center; color: #4a5263; font-size: 10pt; }
@page { size: A4; margin: 14mm 13mm 15mm 13mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "IBM Plex Sans", "IBM Plex Sans Thai", sans-serif; font-size: 10.6pt; line-height: 1.42; color: #1d2330; margin: 0; }
h1, h2, h3, .disp { font-family: "Bai Jamjuree", "IBM Plex Sans Thai", sans-serif; }
.mono, .tag, .id { font-family: "IBM Plex Mono", monospace; }
.page { page-break-before: always; break-before: page; }
.cover h1 { font-size: 30pt; margin: 18mm 0 2mm; color: #8f1d2c; letter-spacing: -.5px; }
.cover .sub { font-size: 13pt; color: #4a5263; margin: 0 0 8mm; }
.cover p.lede { font-size: 11.5pt; max-width: 165mm; }
.cover table { border-collapse: collapse; width: 100%; margin: 6mm 0; font-size: 10pt; }
.cover td, .cover th { border-bottom: 1px solid #d9dde5; padding: 1.6mm 2mm; text-align: left; vertical-align: top; }
.cover th { font-family: "IBM Plex Mono", monospace; font-size: 8.5pt; color: #6b7385; font-weight: 500; }
.howto { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm 6mm; margin: 6mm 0; font-size: 9.6pt; }
.howto b { display: block; color: #8f1d2c; font-family: "Bai Jamjuree", sans-serif; }
.disc { font-size: 8.4pt; color: #6b7385; margin-top: 10mm; }
.sechead { border-top: 3mm solid #8f1d2c; padding-top: 6mm; }
.sechead .k { font-family: "IBM Plex Mono", monospace; color: #8f1d2c; font-size: 10pt; }
.sechead h1 { font-size: 22pt; margin: 1mm 0 2mm; line-height: 1.15; }
.sechead .meta { color: #4a5263; font-size: 9.6pt; margin-bottom: 5mm; }
.sechead ol { padding-left: 6mm; }
.toc { columns: 2; font-size: 9.2pt; margin-top: 6mm; }
.toc div { break-inside: avoid; padding: .6mm 0; }
.toc .id { color: #8f1d2c; font-size: 8.4pt; margin-right: 2mm; }
.ey { display: flex; gap: 2mm; align-items: baseline; font-family: "IBM Plex Mono", monospace; font-size: 8.6pt; color: #6b7385; margin-bottom: 1mm; }
.ey .id { color: #8f1d2c; font-weight: 600; }
.ey .kind { border: 1px solid currentColor; border-radius: 3px; padding: 0 1.4mm; }
.ey .sec { margin-left: auto; }
h2 { font-size: 15pt; margin: 0 0 3mm; line-height: 1.2; }
.fig { text-align: center; margin: 2mm 0 3mm; }
.fig img { max-width: 100%; max-height: 88mm; object-fit: contain; border: 1px solid #e3e6ec; }
.fig.big img { max-height: 150mm; }
.fig.mid img { max-height: 112mm; }
.cap { font-family: "IBM Plex Mono", monospace; font-size: 7.6pt; color: #6b7385; margin-top: .8mm; }
ul.lt-pts { margin: 1mm 0 2mm; padding-left: 5mm; }
ul.lt-pts li { margin: .8mm 0; }
.lt-chain { background: #f3f5f8; border-left: 1.2mm solid #2f5d8a; padding: 1.4mm 3mm; margin: 2mm 0; }
.lt-trap { background: #fbf1f2; border-left: 1.2mm solid #8f1d2c; padding: 1.4mm 3mm; margin: 2mm 0; }
.lt-trap::before { content: "Trap · "; font-weight: 600; color: #8f1d2c; }
.lt-h { font-weight: 600; margin: 3mm 0 1mm; color: #2f5d8a; }
.eqn { font-weight: 500; background: #f6f3ea; padding: 1.4mm 3mm; margin: 2mm 0; border-radius: 1mm; }
table.lt-tbl { border-collapse: collapse; width: 100%; margin: 2mm 0; font-size: 9.6pt; }
table.lt-tbl th, table.lt-tbl td { border: 1px solid #d9dde5; padding: 1.2mm 2mm; text-align: left; vertical-align: top; }
table.lt-tbl th { background: #f3f5f8; }
.gap { display: inline-block; border-bottom: 1.2px solid #1d2330; height: 1.15em; vertical-align: baseline; position: relative; margin: 0 .6mm; }
.gap i { position: absolute; left: 0; top: -1.6mm; font-style: normal; font-family: "IBM Plex Mono", monospace; font-size: 6.4pt; color: #8f1d2c; }
.instr { background: #f6f1e7; border-left: 1.2mm solid #8a6a2f; padding: 2mm 3mm; margin: 2mm 0 3mm; font-size: 10pt; }
.instr b { color: #8a6a2f; font-family: "IBM Plex Mono", monospace; font-size: 8pt; letter-spacing: .5px; }
.nums { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6mm 8mm; margin-top: 3mm; }
.nums div { display: flex; gap: 2mm; align-items: flex-end; break-inside: avoid; }
.nums .n { font-family: "IBM Plex Mono", monospace; font-weight: 600; color: #fff; background: #8a6a2f; border-radius: 1mm; min-width: 7mm; text-align: center; font-size: 8.6pt; padding: .3mm 0; }
.nums .ln { flex: 1; border-bottom: 1px solid #9aa1b0; height: 5.5mm; }
.twofig { display: grid; grid-template-columns: 1.35fr 1fr; gap: 4mm; align-items: start; }
.twofig .fig img { max-height: 118mm; }
.note { font-size: 9pt; color: #4a5263; }
.pq { break-inside: avoid; margin: 0 0 6mm; padding-bottom: 4mm; border-bottom: 1px dashed #d9dde5; }
.pq .fig img { max-height: 92mm; }
.q { margin: 2mm 0 1mm; font-weight: 500; }
.q .qn { font-family: "IBM Plex Mono", monospace; color: #8f1d2c; margin-right: 1.6mm; }
ol.opts { list-style: none; padding: 0; margin: 1mm 0 2mm 5mm; columns: 2; column-gap: 8mm; font-size: 9.8pt; }
ol.opts li { margin: .6mm 0; break-inside: avoid; }
ol.opts .L { display: inline-block; width: 5mm; font-family: "IBM Plex Mono", monospace; color: #6b7385; }
.saline { border-bottom: 1px solid #9aa1b0; height: 7mm; margin: 1mm 0 2mm 5mm; width: 70%; }
.clip { border: 1px solid #d9dde5; border-radius: 2mm; padding: 3mm 4mm; margin: 0 0 4mm; break-inside: avoid; }
.clip h3 { margin: 0 0 1mm; font-size: 11.5pt; }
.clip ul { margin: 1mm 0; padding-left: 5mm; font-size: 9.6pt; }
.clip .ts { font-family: "IBM Plex Mono", monospace; color: #6b7385; font-size: 8.4pt; margin-right: 1.4mm; }
.myth { background: #fbf1f2; padding: 1.4mm 3mm; margin: 1.4mm 0; font-size: 9.6pt; }
.myth b { color: #8f1d2c; }
.key h1 { font-size: 22pt; color: #8f1d2c; margin: 0 0 4mm; }
.key h2 { font-size: 13pt; margin: 6mm 0 2mm; border-bottom: 1px solid #d9dde5; padding-bottom: 1mm; }
.key h3 { font-size: 10.5pt; margin: 3mm 0 1mm; color: #2f5d8a; }
.key .blk { break-inside: avoid; margin-bottom: 2mm; font-size: 9.4pt; }
.key ol.ba { columns: 2; column-gap: 8mm; padding-left: 7mm; margin: 1mm 0; }
.key ol.ba li { break-inside: avoid; }
.key .th { font-family: "IBM Plex Sans Thai", sans-serif; font-size: 9.2pt; color: #333a48; background: #f7f8fa; padding: 1.6mm 3mm; margin: 1mm 0; }
.key .ans { font-weight: 600; }
.key .ex { color: #4a5263; }
.key .lab { columns: 2; column-gap: 8mm; font-size: 9pt; margin: 1mm 0; }
.key .lab div { break-inside: avoid; }
.key .lab .n { font-family: "IBM Plex Mono", monospace; color: #8a6a2f; font-weight: 600; display: inline-block; width: 7mm; }
'''

def concept(c, sec):
    body, ans, _ = blanks(c['body'], 1)
    f = c['figs'][0] if c['figs'] else None
    h = f'<section class="page"><div class="ey"><span class="id">{esc(c["id"])}</span><span class="kind">Concept{" · core" if c["core"] else ""}</span><span class="sec">{esc(sec["id"])} · {esc(sec["short"])}</span></div><h2>{esc(c["title"])}</h2>'
    if f: h += f'<div class="fig"><img src="{f["src"]}"><div class="cap">{esc(f["cap"])}</div></div>'
    h += body + flows(c) + '</section>'
    return h, ans

def step(s, sec):
    h = f'<section class="page"><div class="ey"><span class="id">{esc(s["id"])}</span><span class="kind">Cadaver step</span><span class="sec">{esc(s["refs"])}</span></div><h2>{esc(s["title"])}</h2>'
    h += f'<div class="instr"><b>DISSECTOR · </b>{esc(s["instr"])}</div>'
    cmp = s['cmp'][0] if s['cmp'] else None
    if cmp:
        h += f'<div class="twofig">{cadfig(s["cad"])}<div class="fig"><img src="{cmp["src"]}"><div class="cap">Lecture: {esc(cmp["cap"])}</div></div></div>'
    else:
        h += cadfig(s['cad'])
    if s.get('cad2'): h += f'<div class="fig"><img src="{s["cad2"]["src"]}" style="max-height:62mm"><div class="cap">{esc(s["cad2"]["cap"])}</div></div>'
    h += '<div class="nums">' + ''.join(f'<div><span class="n">{esc(n)}</span><span class="ln"></span></div>' for n, _ in s['labels']) + '</div>'
    if s.get('note'): h += f'<p class="note">{esc(s["note"])}</p>'
    return h + flows(s) + '</section>'

def clips(vs):
    if not vs: return ''
    h = '<section class="page"><div class="ey"><span class="kind">Lab clips</span></div><h2>From our lab clips</h2><p class="note">Key points the group said at the bench (timestamps) and the statements that were wrong, with the correction.</p>'
    for v in vs:
        h += f'<div class="clip"><h3>{esc(v["title"])} <span class="cap">{esc(v["clip"])} · {esc(v["dur"])}</span></h3><ul>' + ''.join(f'<li><span class="ts">{esc(t)}</span>{esc(x)}</li>' for t, x in v['pts']) + '</ul>'
        for fx in v.get('fixes', []):
            t = fx.get('ts', '') if isinstance(fx, dict) else fx[0]
            heard = fx.get('heard', '') if isinstance(fx, dict) else fx[1]
            corr = fx.get('correct', '') if isinstance(fx, dict) else (fx[2] if len(fx) > 2 else '')
            h += f'<div class="myth"><b>Myth @ {esc(t)} · </b>{esc(heard)} <b>Correct:</b> {esc(corr)}</div>'
        h += '</div>'
    return h + '</section>'

def pastq(items, sec):
    if not items: return ''
    h = f'<section class="page"><div class="ey"><span class="kind">Past papers</span><span class="sec">{esc(sec["id"])} · {esc(sec["short"])}</span></div><h2>Past papers · {esc(sec["short"])}</h2><p class="note">Answers at the back. Spot stations first, then MCQ recalls.</p>'
    for it in items:
        h += f'<div class="pq"><div class="ey"><span class="id">{esc(it["id"])}</span><span class="kind">{"MCQ" if it.get("mcq") else "Spot"}</span><span class="sec">{esc(it["set"])}</span></div>'
        if it.get('img'): h += f'<div class="fig"><img src="{it["img"]}"></div>'
        for k, q in enumerate(it['qs']):
            h += f'<div class="q"><span class="qn">{LET[k]}.</span>{esc(q["q"])}</div>'
            if q.get('o'): h += '<ol class="opts">' + ''.join(f'<li><span class="L">{LET[j]}</span>{esc(o)}</li>' for j, o in enumerate(q['o'])) + '</ol>'
            else: h += '<div class="saline"></div>'
        h += '</div>'
    return h + '</section>'

def main():
    M = D['meta']; secs = D['sections']
    n = {k: 0 for k in 'cspv'}; nq = 0
    for s in secs:
        for it in s['items']:
            n[it['t']] += 1
            if it['t'] == 'p': nq += len(it['qs'])
    out = [f'<section class="cover"><div class="ey"><span class="kind">{esc(M["badge"])}</span><span>Student handout</span></div><h1>{esc(M["title"])}</h1><p class="sub">{esc(M["sub"])}</p><p class="lede">{esc(M["lede"])}</p>',
           f'<p class="mono" style="font-size:9.5pt">{n["c"]} concepts · {n["s"]} cadaver steps · {n["v"]} lab clips · {n["p"]} past-paper items ({nq} questions)</p>',
           '<table><tr><th>ID</th><th>Section</th><th>Lecture</th></tr>' + ''.join(f'<tr><td class="mono">{esc(s["id"])}</td><td><b>{esc(s["title"])}</b></td><td>{esc(s["hname"])}<br><span class="note">{esc(s["lect"])} · {esc(s["date"])}</span></td></tr>' for s in secs) + '</table>',
           '<div class="howto"><div><b>Concept pages</b>Fill each numbered gap; answers are in the key at the back, with a Thai explanation.</div><div><b>Cadaver steps</b>Real specimen (Rohen) beside the lecture figure. Name every number on the lines, then check the key.</div><div><b>Lab clips</b>What our group said in the dissection room, and the myths corrected.</div><div><b>Past papers</b>Spot tests AC76-AC81 and MCQ recalls AC79-AC81 without answers; keys and why at the back.</div></div>',
           f'<p class="disc">{M["disc"]} Online: student.html (present / browse) and tutor.html (answers, Thai notes, SAY lines).</p></section>']
    key = ['<section class="page key"><h1>Answer key</h1><p class="note">Numbered gaps, cadaver labels with relationships, past-paper answers with explanations, and the Thai explanation of every concept.</p>']
    for s in secs:
        items = s['items']
        out.append(f'<section class="page sechead"><div class="k">{esc(s["course"])} · Section {esc(s["id"])}</div><h1>{esc(s["title"])}</h1><div class="meta">{esc(s["hname"])} · {esc(s["lect"])} · {esc(s["date"])}</div><p>{esc(s["blurb"])}</p><p><b>Objectives</b></p><ol>' + ''.join(f'<li>{esc(o)}</li>' for o in s['obj']) + '</ol>'
                   + '<div class="toc">' + ''.join(f'<div><span class="id">{esc(i["id"])}</span>{esc(i["title"])}</div>' for i in items if i['t'] in 'cs') + '</div></section>')
        key.append(f'<h2>{esc(s["id"])} · {esc(s["title"])}</h2>')
        for it in items:
            if it['t'] == 'c':
                h, ans = concept(it, s); out.append(h)
                key.append(f'<div class="blk"><h3>{esc(it["id"])} · {esc(it["title"])}</h3>' + ('<ol class="ba">' + ''.join(f'<li>{esc(a)}</li>' for a in ans) + '</ol>' if ans else '') + (f'<div class="th">{it["th"]}</div>' if it.get('th') else '') + '</div>')
        for it in items:
            if it['t'] == 's':
                out.append(step(it, s))
                key.append(f'<div class="blk"><h3>{esc(it["id"])} · {esc(it["title"])}</h3><div class="lab">' + ''.join(f'<div><span class="n">{esc(a)}</span>{esc(b)}</div>' for a, b in it['labels']) + '</div>'
                           + '<ul style="margin:1mm 0;padding-left:5mm">' + ''.join(f'<li>{esc(r)}</li>' for r in it['rel']) + '</ul></div>')
        out.append(clips([i for i in items if i['t'] == 'v']))
        ps = [i for i in items if i['t'] == 'p']
        out.append(pastq(ps, s))
        if ps:
            key.append('<h3>Past papers</h3>')
            for it in ps:
                for k, q in enumerate(it['qs']):
                    a = (LET[q['a']] + ' · ' + q['o'][q['a']]) if q.get('o') else q['a']
                    key.append(f'<div class="blk"><span class="mono" style="color:#8f1d2c">{esc(it["id"])}{LET[k] if len(it["qs"]) > 1 else ""}</span> <span class="ans">{esc(a)}</span>' + (f' <span class="ex">— {esc(q["ex"])}</span>' if q.get('ex') else '') + '</div>')
    key.append('</section>')
    doc = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{esc(M["title"])} · student handout</title><style>{CSS}</style></head><body>' + ''.join(out) + ''.join(key) + '</body></html>'
    open(f'{OUT}/print.html', 'w').write(doc)
    from playwright.async_api import async_playwright
    async def run():
        async with async_playwright() as p:
            b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--disable-background-networking', '--disable-sync', '--no-first-run'])
            pg = await b.new_page()
            await pg.goto('file://' + f'{OUT}/print.html', wait_until='networkidle', timeout=600000)
            await pg.evaluate('document.fonts.ready')
            foot = f'<div style="font-family:monospace;font-size:7px;color:#888;width:100%;padding:0 13mm;display:flex;justify-content:space-between"><span>{esc(M["title"])} · student handout</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
            await pg.pdf(path=f'{OUT}/student.pdf', format='A4', print_background=True, display_header_footer=True, header_template='<div></div>', footer_template=foot,
                         margin=dict(top='14mm', bottom='15mm', left='13mm', right='13mm'))
            await b.close()
    asyncio.run(run())
    os.remove(f'{OUT}/print.html')
    print('pdf', OUT, os.path.getsize(f'{OUT}/student.pdf') // 1024, 'KB')
main()
