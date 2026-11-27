/* AC-based learning & Tutor PDF source:
   node print.js [pages.json]          -> dist/print.html       (ns1-anatomy-physiology-physics-ac-based-learning.pdf)
   node print.js --tutor [pages.json]  -> dist/print-tutor.html (ns1-anatomy-physiology-physics-tutor.pdf)
   In deck order: one page per concept card, then the quiz on that concept (two columns).
   All lecture figures — including slides that reveal cloze answers (figans) — are shown open in both PDFs. */
const fs = require('fs');
const rd = f => fs.readFileSync(f, 'utf8');
const args = process.argv.slice(2);
const TUTOR = args.includes('--tutor');
const pagesArg = args.find(a => a !== '--tutor');

global.window = global;
JSON.parse(rd('data/sections.json')).forEach(f => eval(rd('data/' + f + '.js')));
eval(rd('src/thai-data.js'));
eval(rd('src/thai-q.js'));
eval(rd('src/thai-explain.js'));
eval(rd('src/flows.js'));  /* FLOWS.printHtml: static copy of the interactive flowcharts */
if (TUTOR) {
  eval(rd('src/tutor-notes.js'));
  eval(rd('src/tutor-script.js'));
}

const THAI_Q = window.THAI_Q, THAI_CONCEPT = window.THAI_CONCEPT, THAI_SEC = window.THAI_SEC || {};
const TUTOR_NOTES = window.TUTOR_NOTES || {}, SCRIPT = window.TUTOR_SCRIPT || { plan: [], sec: {} };
const S = CVS.sections, LET = 'ABCDEFGH';
const pages = pagesArg && fs.existsSync(pagesArg) ? JSON.parse(rd(pagesArg)) : {};
const pg = k => pages[k] ? String(pages[k]) : '00';
/* print-sized figure copies in dist/pimg/: the PDF embeds each image once per use */
const eager = h => String(h).replace(/ loading="lazy"/g, '').replace(/src="img\/([^"]+\.jpg)"/g, 'src="pimg/$1"');
const isQ = it => it.t === 'q' || it.t === 'tf' || it.t === 'open';
const escHtml = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const AC_PDF = 'ns1-anatomy-physiology-physics-ac-based-learning.pdf';
const TUTOR_PDF = 'ns1-anatomy-physiology-physics-tutor.pdf';

let nQ = 0, nC = 0, nCore = 0;
S.forEach(s => s.items.forEach(it => { if (it.t === 'c') nC++; else { nQ++; if (it.core) nCore++; } }));

/* ---------- concept units: each concept page, then the quiz on that concept ---------- */
const units = [];
S.forEach(s => {
  let cur = null;
  s.items.forEach(it => {
    if (it.t === 'c') { cur = { s: s, c: it, qs: [] }; units.push(cur); }
    else if (cur) cur.qs.push(it);
    else throw new Error(it.id + ' comes before any concept');
  });
});

/* Student PDF: cloze blanks become numbered empty boxes (answers listed at the back).
   Tutor PDF: cloze blanks are revealed inline. */
const BLANKS = {};
function blankify(h, id) {
  const open = '<span class="cz">', ans = [];
  let out = '', i = 0, k;
  while ((k = h.indexOf(open, i)) >= 0) {
    const re = /<span\b|<\/span>/g; let d = 1, m; re.lastIndex = k + open.length;
    while (d && (m = re.exec(h))) d += m[0] === '</span>' ? -1 : 1;
    if (!m) throw new Error('unclosed blank in ' + id);
    const inner = h.slice(k + open.length, m.index);
    ans.push(inner);
    if (TUTOR) {
      out += h.slice(i, k) + '<span class="czr">' + inner + '</span>';
    } else {
      const chars = inner.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, 'x').length;
      const w = Math.min(16, Math.max(2.4, 0.52 * chars + 1.3)).toFixed(1);
      out += h.slice(i, k) + '<span class="czb" style="width:' + w + 'em"><i>' + ans.length + '</i></span>';
    }
    i = m.index + 7;
  }
  BLANKS[id] = ans;
  return out + h.slice(i);
}

/* Interactive flowchart -> static copy; unwrap figans so even answer-revealing lecture slides are visible in PDF */
const forPrint = h => String(h)
  .replace(/<div class="flowx" data-flow="(\w+)"><\/div>/g, (m, n) => FLOWS.printHtml(n))
  .replace(/<details class="figans">[\s\S]*?<\/summary>([\s\S]*?)<\/details>/g, '$1')
  .replace(/<details class="figmore">[\s\S]*?<\/details>/g, '');

function sayLine(sid, id) {
  const sc = (SCRIPT.sec || {})[sid];
  return sc && sc.say ? sc.say[id] || '' : '';
}
function sayBox(text, label) {
  return text ? '<div class="tsay"><div class="tp-head">' + (label || 'พูดในวิดีโอ · SAY') + '</div><p>' + text + '</p></div>' : '';
}
function tutorNotesHtml(id) {
  const n = TUTOR_NOTES[id];
  if (!n) return '';
  return '<div class="tnotes"><div class="tn-head">โน้ตผู้สอน · นอกเหนือจากสไลด์</div>' +
    (n.b && n.b.length ? '<ul>' + n.b.map(x => '<li>' + x + '</li>').join('') + '</ul>' : '') +
    (n.d && n.d.length ? '<pre class="tdiag">' + n.d.map(escHtml).join('\n') + '</pre>' : '') + '</div>';
}

let nB = 0;

/* ---------- cover ---------- */
let h = '';
if (!TUTOR) {
  h += '<section class="cover"><div class="eyebrow"><span class="chip kind">Peer support 82</span><span class="chip">NS I · Anatomy, physiology &amp; physics</span><span class="chip">AC-based learning</span></div>' +
    '<h1>NS I: Nervous System Anatomy, Physiology &amp; Physics</h1>' +
    '<div class="coverline"><div class="counts"><div><b>' + nC + '</b><span>concepts</span></div><div><b>' + nQ + '</b><span>questions</span></div></div>' +
    '<div class="qrs"><a class="qrlink" href="https://punnawit9285.github.io/ns-peer-tutoring/"><small class="qrcap">Scan to open the interactive deck</small><img src="img/qr-site.svg" alt="QR code for punnawit9285.github.io/ns-peer-tutoring"><span>punnawit9285.github.io/ns-peer-tutoring</span></a>' +
    '<a class="qrlink" href="https://punnawit9285.github.io/ns-peer-tutoring/' + AC_PDF + '"><small class="qrcap">Scan to download AC-based learning (PDF)</small><img src="img/qr-pdf.svg" alt="QR code for the NS I AC-based learning PDF"><span>' + AC_PDF + '</span></a></div></div>' +
    '<h3 class="minih">Contents</h3><table class="toc"><thead><tr><th>Section</th><th>Starts</th><th>Concepts · questions</th><th>Quiz answers</th><th>Blank answers</th><th>Thai concept explanations</th></tr></thead><tbody>';
  S.forEach(s => {
    const qn = s.items.filter(isQ).length, cn = s.items.filter(it => it.t === 'c').length;
    h += '<tr><td><span class="tid">' + s.id + '</span>' + s.title + '</td><td>p. ' + pg('s-' + s.id) + '</td><td>' + cn + ' · ' + qn + '</td><td>p. ' + pg('a-' + s.id) + '</td><td>p. ' + pg('b-' + s.id) + '</td><td>p. ' + pg('x-' + s.id) + '</td></tr>';
  });
  h += '</tbody></table><p class="legend"><span class="chip core">core</span> done in the video</p></section>';
} else {
  const bySec = {}; S.forEach(s => { bySec[s.id] = s; });
  const planRows = (SCRIPT.plan || []).map(p => {
    let core = 0; const names = [];
    p[1].forEach(id => {
      if (bySec[id]) {
        core += bySec[id].items.filter(x => isQ(x) && x.core).length;
        names.push('<b>' + id + '</b> ' + bySec[id].short);
      }
    });
    return '<tr><td>' + p[0] + '</td><td>' + names.join(', ') + '</td><td>' + core + '</td><td>' + p[2] + '</td><td>' + p[3] + '</td></tr>';
  }).join('');
  h += '<section class="cover"><div class="eyebrow"><span class="chip kind">Peer support 82</span><span class="chip">NS I · Anatomy, physiology &amp; physics</span><span class="chip core">Tutor guide · all answers revealed</span></div>' +
    '<h1>NS I: Nervous System Anatomy, Physiology &amp; Physics · Tutor</h1>' +
    '<div class="coverline"><div class="counts"><div><b>' + nC + '</b><span>concepts</span></div><div><b>' + nQ + '</b><span>questions</span></div><div><b>' + nCore + '</b><span>core</span></div></div>' +
    '<div class="qrs"><a class="qrlink" href="https://punnawit9285.github.io/ns-peer-tutoring/tutor.html"><small class="qrcap">Scan to open the tutor deck</small><img src="img/qr-tutor.svg" alt="QR code for tutor deck"><span>ns-peer-tutoring/tutor.html</span></a>' +
    '<a class="qrlink" href="https://punnawit9285.github.io/ns-peer-tutoring/' + TUTOR_PDF + '"><small class="qrcap">Scan to download Tutor PDF</small><img src="img/qr-tutor-pdf.svg" alt="QR code for the NS I tutor PDF"><span>' + TUTOR_PDF + '</span></a></div></div>' +
    (planRows ? '<h3 class="minih">Recording plan</h3><table class="tplan"><thead><tr><th>Video</th><th>Sections</th><th>Core</th><th>Covers</th><th>Length</th></tr></thead><tbody>' + planRows + '</tbody></table>' : '') +
    '<h3 class="minih">Contents</h3><table class="toc"><thead><tr><th>Section</th><th>Starts</th><th>Concepts · Qs (core)</th><th>Thai explanations</th></tr></thead><tbody>';
  S.forEach(s => {
    const qn = s.items.filter(isQ).length, cn = s.items.filter(it => it.t === 'c').length, cr = s.items.filter(it => isQ(it) && it.core).length;
    h += '<tr><td><span class="tid">' + s.id + '</span>' + s.title + '</td><td>p. ' + pg('s-' + s.id) + '</td><td>' + cn + ' · ' + qn + ' (' + cr + ' core)</td><td>p. ' + pg('x-' + s.id) + '</td></tr>';
  });
  h += '</tbody></table><p class="legend"><span class="chip core">core</span> done in the video · all blanks, answers, SAY lines and tutor notes revealed in place</p></section>';
}

function ansLine(it) {
  if (it.t === 'q') { const A = [].concat(it.a); return A.map(i => '<span class="alet">' + LET[i] + '</span>').join(' ') + ' <span class="atxt">' + A.map(i => it.o[i]).join(' / ') + '</span>'; }
  if (it.t === 'tf') return '<span class="alet">' + (it.a ? 'T' : 'F') + '</span> <span class="atxt">' + (it.a ? 'True' : 'False') + '</span>';
  return '<span class="atxt">Model answer</span>';
}

function qBlock(it, sid) {
  const A = it.t === 'q' ? [].concat(it.a) : [];
  let b = '<div class="pq' + (it.wide ? ' wide' : '') + '"><div class="pqh"><b>' + it.id + '</b>' + (it.src ? '<span class="src">' + it.src + '</span>' : '') + (it.core ? '<span class="chip core">core</span>' : '') + (it.t === 'tf' ? '<span class="src">True / False</span>' : '') + (it.group ? '<span class="src">' + it.group + '</span>' : '') + '</div>';
  b += '<div class="pstem">' + it.q + '</div>';
  if (it.figRef) b += '<p class="pfigref">Same figure as ' + it.figRef + '</p>';
  else if (it.fig) b += '<div class="pfig">' + eager(it.fig) + '</div>';
  if (it.t === 'q') {
    b += '<ol class="popt">' + it.o.map((o, i) => '<li' + (TUTOR && A.indexOf(i) >= 0 ? ' class="isans"' : '') + '><span class="L">' + LET[i] + '</span><span>' + o + '</span></li>').join('') + '</ol>';
  } else if (it.t === 'tf') {
    b += '<div class="ptf"><span' + (TUTOR && it.a === true ? ' class="isans"' : '') + '><span class="L">T</span>True</span><span' + (TUTOR && it.a === false ? ' class="isans"' : '') + '><span class="L">F</span>False</span></div>';
  } else if (!TUTOR) {
    b += '<div class="plines"><i></i><i></i><i></i><i></i></div>';
  }
  if (TUTOR) {
    const tb = THAI_Q[it.id];
    const say = sayLine(sid, it.id);
    b += '<div class="tqa"><div class="tqans">' + ansLine(it) + '</div>' +
      (it.t === 'open' && it.ans ? '<p class="model">' + it.ans + '</p>' : '') +
      (tb && tb.length ? '<ul>' + tb.map(x => '<li>' + x + '</li>').join('') + '</ul>' : (it.ex ? '<p>' + it.ex + '</p>' : '')) +
      (it.flag ? '<div class="flag"><b>Recall note:</b> ' + it.flag + '</div>' : '') +
      sayBox(say) + '</div>';
  }
  return b + '</div>';
}

units.forEach(u => {
  const s = u.s, it = u.c, first = s.items[0] === it;
  if (TUTOR && first) {
    const sc = (SCRIPT.sec || {})[s.id] || {}, ts = THAI_SEC[s.id] || {};
    h += '<section class="tsecpage" data-sec="' + s.id + '"><div class="eyebrow"><span class="chip kind">' + s.kind + '</span><span class="id">Section ' + s.id + '</span>' + (sc.part ? '<span class="chip core">' + sc.part + ' · ' + sc.time + '</span>' : '') + '</div>' +
      '<h2>' + s.title + '</h2><p class="lede">' + (ts.big || s.blurb) + '</p>' +
      sayBox(sc.open, 'เปิด Section · SAY') +
      (ts.traps && ts.traps.length ? '<div class="ttraps"><div class="tp-head">จุดหลอกข้อสอบที่พบบ่อย (Exam Traps)</div><ul>' + ts.traps.map(t => '<li>' + t + '</li>').join('') + '</ul></div>' : '') +
      (sc.u && sc.u.length ? '<div class="tu80"><div class="tp-head">Understand it: the 80%</div><ol>' + sc.u.map(x => '<li>' + x + '</li>').join('') + '</ol></div>' : '') +
      '</section>';
  }
  const kp = THAI_CONCEPT[it.id] || [];
  const tutorHead = TUTOR
    ? (kp.length ? '<div class="tpoints"><div class="tp-head">สรุปประเด็นสำคัญ (Key Points)</div><ul>' + kp.map(b => '<li>' + b + '</li>').join('') + '</ul></div>' : '') + sayBox(sayLine(s.id, it.id))
    : '';
  const tutorFoot = TUTOR ? tutorNotesHtml(it.id) : '';
  const footLine = TUTOR
    ? 'Thai explanation of this concept: p. ' + pg('x-' + s.id)
    : (BLANKS[it.id] ? '' : '') ;

  const bodyHtml = eager(blankify(forPrint(it.html), it.id));
  nB += BLANKS[it.id].length;

  h += '<section class="cpage" data-id="' + it.id + '"><div class="cfit concept">' +
    (!TUTOR && first ? '<div class="secband"><span class="chip kind">' + s.kind + '</span><span class="id">Section ' + s.id + '</span><b>' + s.title + '</b><span class="muted">' + s.blurb + '</span></div>' : '') +
    '<div class="eyebrow"><span class="id">' + it.id + '</span><span class="chip kind">Concept</span>' + (it.src ? '<span class="chip">' + it.src + '</span>' : '') + '<span class="sp"></span><span>' + s.title + '</span></div>' +
    '<h2>' + it.title + '</h2>' +
    tutorHead +
    '<div class="cbody">' + bodyHtml + '</div>' +
    tutorFoot +
    '<p class="cfoot">' + (TUTOR ? 'All blanks revealed · Thai explanation of this concept: p. ' + pg('x-' + s.id) : (BLANKS[it.id].length ? BLANKS[it.id].length + ' blanks · answers p. ' + pg('b-' + s.id) + ' · ' : '') + 'Thai explanation of this concept: p. ' + pg('x-' + s.id)) + '</p></div></section>';

  if (u.qs.length) {
    h += '<section class="quiz" data-for="' + it.id + '"><header class="quizh"><span class="id">Quiz · ' + it.id + ' ·</span><b>' + it.title + '</b><span class="sp"></span><span class="muted">' + u.qs.length + (u.qs.length === 1 ? ' question' : ' questions') + (TUTOR ? ' · answers revealed' : ' · answers p. ' + pg('a-' + s.id)) + '</span></header><div class="qcols">' + u.qs.map(q => qBlock(q, s.id)).join('') + '</div></section>';
  }
});

/* ---------- answer key & blanks (AC-based learning PDF only; Tutor PDF already shows them inline) ---------- */
if (!TUTOR) {
  h += '<section class="part"><div class="eyebrow"><span class="chip kind">Answer key</span></div><h1>เฉลยและคำอธิบาย</h1><p class="lede">Answers and Thai explanations for all ' + nQ + ' questions, grouped by the concept quiz they belong to.</p></section>';
  S.forEach(s => {
    h += '<section class="aksec"><header class="akhead"><span class="id">Answer key · Section ' + s.id + '</span><b>' + s.title + '</b><span class="muted">section starts p. ' + pg('s-' + s.id) + '</span></header><div class="acols">';
    s.items.forEach(it => {
      if (it.t === 'c') { const u = units.find(x => x.c === it); if (u.qs.length) h += '<div class="akc"><b>' + it.id + '</b>' + it.title + ' <span class="muted">· quiz p. ' + pg('z-' + it.id) + '</span></div>'; return; }
      const tb = THAI_Q[it.id];
      h += '<div class="ak"><div class="akq"><b>' + it.id + '</b>' + ansLine(it) + '</div>' +
        (it.t === 'open' && it.ans ? '<p class="model">' + it.ans + '</p>' : '') +
        (tb && tb.length ? '<ul>' + tb.map(x => '<li>' + x + '</li>').join('') + '</ul>' : (it.ex ? '<p>' + it.ex + '</p>' : '')) +
        (it.flag ? '<div class="flag"><b>Recall note:</b> ' + it.flag + '</div>' : '') + '</div>';
    });
    h += '</div></section>';
  });

  h += '<section class="part"><div class="eyebrow"><span class="chip kind">Concept blanks</span></div><h1>เฉลยช่องว่างใน concept</h1><p class="lede">The ' + nB + ' numbered blanks on the concept pages, concept by concept.</p></section>';
  S.forEach(s => {
    h += '<section class="bksec"><header class="akhead"><span class="id">Concept blanks · Section ' + s.id + '</span><b>' + s.title + '</b></header><div class="bkcols">';
    s.items.filter(it => it.t === 'c' && BLANKS[it.id].length).forEach(it => {
      h += '<div class="bk"><div class="bkh"><b>' + it.id + '</b>' + it.title + ' <span class="muted">· p. ' + pg('k-' + it.id) + '</span></div><p class="bkl">' +
        BLANKS[it.id].map((a, i) => '<span class="bka"><i>' + (i + 1) + '</i>' + a + '</span>').join(' ') + '</p></div>';
    });
    h += '</div></section>';
  });
}

/* ---------- Thai explanation of every concept ---------- */
h += '<section class="part"><div class="eyebrow"><span class="chip kind">Concepts in Thai</span></div><h1>อธิบาย concept เป็นภาษาไทย</h1><p class="lede">The key points and Thai explanation of each of the ' + nC + ' concept pages, in the same order.</p></section>';
S.forEach(s => {
  h += '<section class="xsec"><header class="akhead"><span class="id">Thai explanations · Section ' + s.id + '</span><b>' + s.title + '</b></header><div class="xcols">';
  s.items.filter(it => it.t === 'c').forEach(it => {
    const tx = window.THAI_EXPLAIN[it.id] || [];
    const kp = THAI_CONCEPT[it.id] || [];
    h += '<div class="xc"><div class="xch"><b>' + it.id + '</b>' + it.title + ' <span class="muted">· p. ' + pg('k-' + it.id) + '</span></div>' +
      (kp.length ? '<ul class="xkp">' + kp.map(b => '<li>' + b + '</li>').join('') + '</ul>' : '') + (tx.length ? '<ul class="xtx">' + tx.map(p => '<li>' + p + '</li>').join('') + '</ul>' : '') + '</div>';
  });
  h += '</div></section>';
});

/* ---------- fit each concept on one page ---------- */
const fitJs = `(function () {
  var PH = 0;
  function h(el) { return el.getBoundingClientRect().height; }
  function wide(w) { return w.scrollWidth > w.clientWidth + 1; }
  function unclip(page) {
    var ws = page.querySelectorAll('.tblwrap'), i, g, nS = 0, minZ = 1, nC = 0;
    for (i = 0; i < ws.length; i++) {
      g = ws[i];
      while (wide(ws[i]) && (g = g.parentElement.closest('.two, .cols2, .cols3, .figpair')) && page.contains(g)) { g.classList.add('tstack'); nS++; }
    }
    for (i = 0; i < ws.length; i++) if (wide(ws[i])) {
      var z = Math.floor(ws[i].clientWidth / ws[i].scrollWidth * 1000) / 1000;
      ws[i].style.zoom = z; minZ = Math.min(minZ, z);
    }
    for (i = 0; i < ws.length; i++) if (wide(ws[i])) nC++;
    if (nS) page.setAttribute('data-tstack', nS);
    if (minZ < 1) page.setAttribute('data-tscale', minZ.toFixed(3));
    if (nC) page.setAttribute('data-tclip', nC);
  }
  function fit(page) {
    var inner = page.firstElementChild, lo = 0.35, hi = 1;
    inner.style.zoom = 1;
    unclip(page);
    if (h(page) <= PH) return 1;
    for (var i = 0; i < 12; i++) { var m = (lo + hi) / 2; inner.style.zoom = m; if (h(page) <= PH) lo = m; else hi = m; }
    inner.style.zoom = lo; return lo;
  }
  function run() {
    var probe = document.createElement('div'); probe.style.height = '266mm'; document.body.appendChild(probe); PH = h(probe); probe.remove();
    var ps = document.querySelectorAll('.cpage');
    for (var i = 0; i < ps.length; i++) {
      var z = fit(ps[i]); ps[i].setAttribute('data-zoom', z.toFixed(3));
      var q = ps[i].nextElementSibling;
      if (q && q.classList.contains('quiz')) {
        var used = q.getBoundingClientRect().bottom - ps[i].getBoundingClientRect().top;
        var together = z === 1 && used <= PH * 0.97;
        if (!together) q.style.breakBefore = 'page';
        q.setAttribute('data-place', together ? 'same-page' : 'next-page');
      }
    }
    document.documentElement.setAttribute('data-fitted', '1');
  }
  var go = function () { (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(run); };
  if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
})();`;

const FONTS = fs.existsSync('dist/fonts/fonts.css') ? '<link rel="stylesheet" href="fonts/fonts.css">' :
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Thai:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap">';
const pageOverride = TUTOR ? '\n@page { @bottom-left { content: "NS I Anatomy, Physiology & Physics · Peer support 82 · Tutor guide"; } }\n' : '';
const title = TUTOR
  ? 'NS I Anatomy, Physiology &amp; Physics · Peer support 82 · Tutor guide'
  : 'NS I Anatomy, Physiology &amp; Physics · Peer support 82 · AC-based learning';
const outFile = TUTOR ? 'dist/print-tutor.html' : 'dist/print.html';
const html = '<!doctype html>\n<html lang="en" data-theme="light">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + title + '</title>\n' + FONTS +
  '\n<style>\n' + rd('src/base.css') + '\n' + rd('src/flows.css') + '\n' + rd('src/print.css') + pageOverride + '\n</style>\n</head>\n<body>\n<main class="sheet">\n' + h + '\n</main>\n<script>' + fitJs + '</script>\n</body>\n</html>\n';
if (/<\/script/i.test(h)) throw new Error('script close tag inside content');
fs.writeFileSync(outFile, html);
console.log(outFile, html.length, 'bytes ·', nQ, 'questions ·', nC, 'concepts');
