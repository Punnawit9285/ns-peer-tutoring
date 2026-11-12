/* node tools/kpcheck.js: Thai key points sit above the cloze card in the student deck,
   so none may contain a blank's answer from the same card. Prints each leak. */
const fs = require('fs'), vm = require('vm');
const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
JSON.parse(fs.readFileSync('data/sections.json', 'utf8')).forEach(f => vm.runInContext(fs.readFileSync('data/' + f + '.js', 'utf8'), ctx));
vm.runInContext(fs.readFileSync('src/thai-data.js', 'utf8'), ctx);
const plain = h => String(h).replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').toLowerCase();
let n = 0;
ctx.CVS.sections.forEach(s => s.items.filter(i => i.t === 'c').forEach(it => {
  const kp = plain((ctx.THAI_CONCEPT[it.id] || []).join(' | '));
  (it.html.match(/<span class="cz">([\s\S]*?)<\/span>/g) || []).map(m => plain(m)).forEach(a => {
    const t = a.trim(); if (t.length < 2) return;
    const re = new RegExp('(^|[^a-z0-9])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)');
    if (re.test(kp)) { n++; console.log(it.id + ': "' + t + '"'); }
  });
}));
console.log(n ? n + ' leaks' : 'no leaks');
