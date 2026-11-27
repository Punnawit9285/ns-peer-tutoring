/* Find where each part of the PDF landed.
   node tools/pages.js <pdftext.txt> [--tutor] [--check pages.json] */
const fs = require('fs');
global.window = global;
JSON.parse(fs.readFileSync('data/sections.json', 'utf8')).forEach(f => eval(fs.readFileSync('data/' + f + '.js', 'utf8')));
const args = process.argv.slice(2);
const TUTOR = args.includes('--tutor');
const ci = args.indexOf('--check');
const checkFile = ci >= 0 ? args[ci + 1] : null;
const txtFile = args.find((a, i) => a !== '--tutor' && a !== '--check' && (ci < 0 || i !== ci + 1));

const lines = fs.readFileSync(txtFile, 'utf8').split('\n').filter(Boolean).map(l => { const i = l.indexOf('\t'); return { n: +l.slice(0, i), t: l.slice(i + 1) }; });
const first = (re, from) => { const p = lines.find(l => l.n >= (from || 1) && re.test(l.t)); return p ? p.n : 0; };
/* PDF text extraction can split words ("a n d"), so phrases are matched with all spaces removed */
const phrase = (str, from) => { const k = str.replace(/\s+/g, ''); const p = lines.find(l => l.n >= (from || 1) && l.t.replace(/\s+/g, '').includes(k)); return p ? p.n : 0; };
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const out = {};
if (!TUTOR) {
  out.ans = phrase('Answer key', 2);
  out.blk = phrase('Concept blanks', out.ans);
}
out.thx = phrase('Concepts in Thai', 2);

CVS.sections.forEach(s => {
  const cs = s.items.filter(it => it.t === 'c');
  cs.forEach(it => {
    out['k-' + it.id] = first(new RegExp('(^|[^\\w-])' + esc(it.id) + '(?![\\w])'), 2);
    const nq = s.items.slice(s.items.indexOf(it) + 1).findIndex(x => x.t === 'c');
    const hasQ = (nq < 0 ? s.items.length - s.items.indexOf(it) - 1 : nq) > 0;
    if (hasQ) out['z-' + it.id] = phrase('Quiz · ' + it.id + ' ·', out['k-' + it.id]);
  });
  if (TUTOR) {
    /* In the tutor PDF, each section starts on its section intro page right before its first concept */
    const secStart = phrase('Section ' + s.id + s.title.split(' ')[0].replace(/&amp;/g, '&'), 2)
      || first(new RegExp('Section\\s+' + esc(s.id) + '\\b'), 2);
    out['s-' + s.id] = secStart && secStart <= out['k-' + cs[0].id] ? secStart : out['k-' + cs[0].id];
  } else {
    out['s-' + s.id] = out['k-' + cs[0].id];
  }
  const head = label => {
    const re = new RegExp(esc((label + ' · Section ' + s.id).replace(/\s+/g, '')) + '(?=' + esc(s.title.split(' ')[0].replace(/&amp;/g, '&')) + '|' + s.id + '-C\\d)');
    const p = lines.find(l => re.test(l.t.replace(/\s+/g, '')));
    return p ? p.n : 0;
  };
  if (!TUTOR) {
    out['a-' + s.id] = head('Answer key');
    out['b-' + s.id] = head('Concept blanks');
  }
  out['x-' + s.id] = head('Thai explanations');
});

/* every concept page must show the end of its card: a missing tail means the page clipped it */
const plain = h => String(h)
  .replace(/<span class="cz">([\s\S]*?)<\/span>/g, TUTOR ? '$1' : ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\{\{|\}\}/g, '')
  .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n))
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&[a-z]+;/g, '')
  .replace(/\s+/g, '');
const clipped = [];
CVS.sections.forEach(s => s.items.filter(it => it.t === 'c').forEach(it => {
  const tail = plain(it.html.replace(/<details class="(figmore|figans)">[\s\S]*?<\/details>/g, '').replace(/<span class="src">[\s\S]*?<\/span>/g, '')).replace(/[^A-Za-z0-9]/g, '').slice(-14);
  const pgT = (lines.find(l => l.n === out['k-' + it.id]) || {}).t || '';
  if (tail && !pgT.replace(/[^A-Za-z0-9]/g, '').includes(tail)) clipped.push(it.id);
}));
if (clipped.length) { console.error('concept pages that may be clipped:', clipped.join(' ')); process.exitCode = 3; }
const missing = Object.keys(out).filter(k => !out[k]);
if (missing.length) { console.error('not found:', missing.join(' ')); process.exit(1); }
if (checkFile) {
  const want = JSON.parse(fs.readFileSync(checkFile, 'utf8'));
  const bad = Object.keys(out).filter(k => out[k] !== want[k]);
  console.log('pages:', lines.length, '· cross-references', bad.length ? 'MOVED: ' + bad.map(k => k + ' ' + want[k] + '→' + out[k]).join(', ') : 'all correct');
  if (bad.length) process.exit(2);
} else console.log(JSON.stringify(out));
