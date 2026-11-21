/* Tutor answer sheet: every item and structure of one lab on one page (tutor.html#lab=N). Uses the same data.js as the trainer. */
(function () {
'use strict';
var D = window.SPOT, T = D.T, I = D.I, P = D.P;
var $ = function (s, r) { return (r || document).querySelector(s); };
var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var sheet = $('#sheet'), zoom = $('#zoom');
var KEY = 'spot.' + D.course + '.tutor';
var O = (function () { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } })();
if (O.fit == null) O.fit = true;
function save() { try { localStorage.setItem(KEY, JSON.stringify(O)); } catch (e) {} }
if (O.theme) document.documentElement.dataset.theme = O.theme;

/* pointer drawing (as in app.js) */
function ptrPath(path, w, h, full) {
  var p = path.slice(); if (p.length < 2 || full) return p;
  var L = Math.max(w, h) * 0.17, out = [p[p.length - 1]], acc = 0;
  for (var i = p.length - 1; i > 0 && acc < L; i--) {
    var a = p[i], b = p[i - 1], seg = Math.hypot(a[0] - b[0], a[1] - b[1]);
    if (acc + seg >= L) { var t = (L - acc) / seg; out.unshift([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); acc = L; }
    else { out.unshift(b); acc += seg; }
  }
  return out;
}
function arrow(p, w, h) {
  var n = p.length, tip = p[n - 1], prev = p[n - 2], dx = tip[0] - prev[0], dy = tip[1] - prev[1], L = Math.hypot(dx, dy) || 1;
  dx /= L; dy /= L; var s = Math.max(w, h) * 0.03, bx = tip[0] - dx * s, by = tip[1] - dy * s;
  var pts = [tip, [bx - dy * s * 0.42, by + dx * s * 0.42], [bx + dy * s * 0.42, by - dx * s * 0.42]];
  var f = function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); };
  var line = p.slice(0, n - 1).concat([[bx, by]]).map(f).join(' ');
  return '<polyline class="ptr-halo" points="' + line + '"/><polyline class="ptr" points="' + line + '"/><polygon class="head" points="' + pts.map(f).join(' ') + '"/>';
}
function photo(v) {
  var im = I[v.img];
  return '<div class="stage" data-file="' + esc(v.img) + '"><img src="img/a/' + esc(v.img) + '" width="' + im.w + '" height="' + im.h + '" alt="">' +
    '<svg viewBox="0 0 ' + im.w + ' ' + im.h + '" preserveAspectRatio="xMidYMid meet">' + arrow(ptrPath(v.path, im.w, im.h, O.full), im.w, im.h) + '</svg></div>';
}

/* one tile per structure */
var cur = {};   // structure id -> shown view index
function tile(L, it, k, id, j) {
  var t = T[id], num = (k + 1) + (it.ts.length > 1 ? 'abcdefgh'[j] : ''), vi = cur[id] || 0, pic, src;
  if (t.views.length) { var v = t.views[vi % t.views.length]; pic = photo(v); src = 'Rohen p.' + I[v.img].page + (t.views.length > 1 ? ' · photo ' + (vi % t.views.length + 1) + '/' + t.views.length : ''); }
  else if (t.past.length) { var p = P[t.past[0][0]]; pic = '<div class="stage plainpic"><img src="' + esc(p.img) + '" alt=""></div>'; src = p.set + ' · past station: ' + p.qs[t.past[0][1]][1]; }
  else if (t.lec.length) { pic = '<div class="stage plainpic"><img src="' + esc(t.lec[0].src) + '" alt=""></div>'; src = 'lecture slide (no cadaver photo)'; }
  else { pic = '<div class="stage plainpic empty">no photo</div>'; src = ''; }
  return '<figure class="ans" data-id="' + esc(id) + '"><div class="pic">' + pic + (t.views.length > 1 ? '<button class="cyc" data-cyc="' + esc(id) + '" title="Another photo">↻</button>' : '') + '</div>' +
    '<figcaption><span class="num">' + num + '</span><b>' + esc(t.name) + '</b>' + (it.ts.length > 1 ? '<small>' + (k + 1) + '. ' + esc(it.name) + '</small>' : '') +
    (O.notes ? '<p class="f">' + esc(t.find) + '</p><p class="w">' + esc(t.why) + '</p><p class="th">' + esc(t.th) + '</p>' : '') +
    '<span class="src">' + esc(src) + '</span></figcaption></figure>';
}

function labNo() { var m = location.hash.match(/lab=(\d+)/); var n = m ? +m[1] : D.labs[0].lab; return D.labs.some(function (L) { return L.lab === n; }) ? n : D.labs[0].lab; }
function render() {
  var n = labNo(), L = D.labs.filter(function (x) { return x.lab === n; })[0], count = 0;
  $('#labtabs').innerHTML = D.labs.map(function (x) { return '<a href="#lab=' + x.lab + '" class="' + (x.lab === n ? 'on' : '') + '" title="' + esc(x.title) + '">Lab ' + x.lab + '</a>'; }).join('');
  var tiles = '';
  L.items.forEach(function (it, k) { it.ts.forEach(function (id, j) { tiles += tile(L, it, k, id, j); count++; }); });
  sheet.className = (O.fit && !O.notes ? 'fit' : '') + (O.notes ? ' notes' : '');
  sheet.innerHTML = '<div class="sheethead"><h1>Lab ' + L.lab + ' · ' + esc(L.title) + '</h1><span class="muted">' + L.items.length + ' checklist items · ' + count + ' structures · numbered as on the checklist · click a photo to zoom</span></div>' +
    '<ol class="itemlist">' + L.items.map(function (it, k) { return '<li><b>' + (k + 1) + '.</b> ' + esc(it.name) + '</li>'; }).join('') + '</ol>' +
    '<div class="anssheet" id="grid">' + tiles + '</div>';
  document.title = D.title + ' · Lab ' + L.lab + ' answers';
  layout();
}

/* fit every tile in the space left on screen (or on the printed page) */
function layout(W, H) {
  var g = $('#grid'); if (!g) return;
  var tiles = g.children.length, gap = 10, cap = 58;
  if (!(O.fit && !O.notes) && !W) { g.style.gridTemplateColumns = ''; g.style.removeProperty('--ih'); return; }
  W = W || g.clientWidth; H = H || (window.innerHeight - g.getBoundingClientRect().top - 14);
  var best = null;
  for (var c = 1; c <= tiles; c++) {
    var tw = (W - gap * (c - 1)) / c, ih = Math.min(tw * 0.78, 420), rows = Math.ceil(tiles / c), tot = rows * (ih + cap) + gap * (rows - 1);
    if (tot > H) { ih = Math.max(40, (H - gap * (rows - 1)) / rows - cap); }
    var score = Math.min(tw, ih / 0.78);
    if (!best || score > best.s) best = { s: score, c: c, ih: ih };
  }
  g.style.gridTemplateColumns = 'repeat(' + best.c + ', minmax(0, 1fr))'; g.style.setProperty('--ih', Math.floor(best.ih) + 'px');
}
window.addEventListener('resize', function () { layout(); });
window.addEventListener('beforeprint', function () {
  var g = $('#grid'); if (!g) return;
  var head = $('.sheethead').offsetHeight + $('.itemlist').offsetHeight + 16;
  layout(1060, 720 - head);      // A4 landscape, 8 mm margins, at 96 px per inch
});
window.addEventListener('afterprint', function () { layout(); });
window.addEventListener('hashchange', render);

/* controls */
$('#fitBtn').checked = !!O.fit; $('#notesBtn').checked = !!O.notes; $('#fullBtn').checked = !!O.full;
$('#fitBtn').onchange = function () { O.fit = this.checked; save(); render(); };
$('#notesBtn').onchange = function () { O.notes = this.checked; save(); render(); };
$('#fullBtn').onchange = function () { O.full = this.checked; save(); render(); };
$('#printBtn').onclick = function () { window.print(); };
$('#themeBtn').onclick = function () {
  var dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  O.theme = dark ? 'light' : 'dark'; document.documentElement.dataset.theme = O.theme; save();
};
sheet.addEventListener('click', function (e) {
  var c = e.target.closest('[data-cyc]'); if (c) { var id = c.dataset.cyc; cur[id] = (cur[id] || 0) + 1; render(); return; }
  var f = e.target.closest('figure.ans'); if (!f) return;
  var pic = $('.stage', f).cloneNode(true), cap = $('figcaption', f).cloneNode(true);
  zoom.innerHTML = '<div class="zbar"><span class="grow">' + esc($('b', cap).textContent) + '</span><button data-z="x">Close <span class="kbd">Esc</span></button></div><div class="zbody"></div>';
  $('.zbody', zoom).appendChild(pic); var img = $('img', pic);
  var fit = function () { var W = img.naturalWidth || +img.getAttribute('width'), H = img.naturalHeight || +img.getAttribute('height'); var k = Math.min((innerWidth - 40) / W, (innerHeight - 90) / H); img.style.width = Math.round(W * k) + 'px'; img.style.maxHeight = 'none'; };
  if (img.complete) fit(); else img.onload = fit;
  zoom.hidden = false;
});
zoom.addEventListener('click', function (e) { if (e.target.closest('[data-z]') || e.target.classList.contains('zbody')) { zoom.hidden = true; zoom.innerHTML = ''; } });
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { zoom.hidden = true; zoom.innerHTML = ''; }
  var i = D.labs.map(function (L) { return L.lab; }).indexOf(labNo());
  if (e.key === 'ArrowRight' && i < D.labs.length - 1) location.hash = 'lab=' + D.labs[i + 1].lab;
  if (e.key === 'ArrowLeft' && i > 0) location.hash = 'lab=' + D.labs[i - 1].lab;
});
render();
})();
