/* Spot trainer: checklist structures on cadaver photos.
   window.SPOT = { course, title, labs:[{lab,title,items:[{name,ts:[id]}]}], T:{id:{name,acc,find,why,th,lab,item,views:[{img,n,path}],lec:[{src,cap}],card,past:[[pid,qi]]}},
                   I:{file:{w,h,page,labels:[[n,name,path]]}}, P:{pid:{set,img,qs:[[q,a,ex]]}}, deck,
                   F:{fid:{t,svg,lg,lk}} } -- T[id].fl = [[fid, [box ids]]]: the connection maps, the structure's boxes lit */
(function () {
'use strict';
var D = window.SPOT, T = D.T, I = D.I, P = D.P, F = D.F || {};
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var now = function () { return Date.now(); };
var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
var app = $('#app');

/* ---------------- storage ---------------- */
var KEY = 'spot.' + D.course + '.v1';
var S = (function () { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } })();
S.t = S.t || {}; S.ck = S.ck || {}; S.set = S.set || { ptr: 'short' }; S.set.mode = S.set.mode || 'mc';
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function st(id) { return S.t[id] || (S.t[id] = { v: -1 }); }        // ok: when first named correctly; v: last photo shown
function learned(id) { return !!(S.t[id] && S.t[id].ok); }

/* theme */
(function () {
  var t = S.set.theme; if (t) document.documentElement.dataset.theme = t;
  $('#qrBtn').onclick = showQR;
  $('#themeBtn').onclick = function () {
    var dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    S.set.theme = dark ? 'light' : 'dark'; document.documentElement.dataset.theme = S.set.theme; save();
  };
})();

/* ---------------- helpers ---------------- */
var allIds = [], labOf = {}, itemOf = {};
D.labs.forEach(function (L) { L.items.forEach(function (it, k) { it.ts.forEach(function (id) { if (allIds.indexOf(id) < 0) allIds.push(id); (labOf[id] = labOf[id] || []).push(L.lab); itemOf[id] = itemOf[id] || it.name; }); }); });
function ok(id, views) { return T[id].views.length > 0 || (!views && T[id].past.length > 0); }   // drillable: atlas photo, or a past spot station
var withViews = allIds.filter(function (id) { return ok(id); });
function idsOfLabs(labs, views) { var out = []; D.labs.forEach(function (L) { if (labs.indexOf(L.lab) < 0) return; L.items.forEach(function (it) { it.ts.forEach(function (id) { if (out.indexOf(id) < 0 && ok(id, views)) out.push(id); }); }); }); return out; }
function norm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').replace(/\(.*?\)/g, ' ')
    .replace(/\b(the|of|muscle|muscles|m|nerve|n|artery|a|vein|v|ligament|lig|gland|left|right)\b/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
}
function lev(a, b) { var m = a.length, n = b.length, d = []; for (var i = 0; i <= m; i++) { d[i] = [i]; } for (var j = 1; j <= n; j++) d[0][j] = j;
  for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
function matchAns(input, accepted) {
  var x = norm(input); if (!x) return false;
  return accepted.some(function (a) { var y = norm(a); if (!y) return false; if (x === y) return true; return lev(x, y) <= Math.floor(Math.max(x.length, y.length) / 7); });
}
function accOf(id) { return [T[id].name].concat(T[id].acc || []); }

/* ---------------- pointer drawing ---------------- */
function ptrPath(path, w, h, mode) {
  var p = path.slice(); if (p.length < 2) return p;
  if (mode === 'short') {      // a straight pointer onto the tip, from the point 17 % back along the leader (round its bends)
    var L = Math.max(w, h) * 0.17, tip = p[p.length - 1], acc = 0, from = p[0];
    for (var i = p.length - 1; i > 0; i--) {
      var a = p[i], b = p[i - 1], seg = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (acc + seg >= L) { var t = (L - acc) / seg; from = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; break; }
      acc += seg;
    }
    return [from, tip];
  }
  return p;
}
function arrow(p, w, h, cls) {
  var n = p.length, tip = p[n - 1], prev = p[n - 2], dx = tip[0] - prev[0], dy = tip[1] - prev[1], L = Math.hypot(dx, dy) || 1;
  dx /= L; dy /= L; var s = Math.max(w, h) * 0.024, bx = tip[0] - dx * s, by = tip[1] - dy * s;
  var pts = [tip, [bx - dy * s * 0.42, by + dx * s * 0.42], [bx + dy * s * 0.42, by - dx * s * 0.42]];
  var line = p.slice(0, n - 1).concat([[bx, by]]).map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ');
  return '<polyline class="ptr-halo" points="' + line + '"/><polyline class="ptr ' + (cls || '') + '" points="' + line + '"/>' +
    '<polygon class="head ' + (cls || '') + '" points="' + pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ') + '"/>';
}
function stage(file, ptrs, opts) {
  opts = opts || {}; var im = I[file], w = im.w, h = im.h, svg = '';
  (ptrs || []).forEach(function (q) {
    var pp = ptrPath(q.path, w, h, q.full ? 'full' : S.set.ptr);
    svg += '<g' + (q.id ? ' data-p="' + esc(q.id) + '"' : '') + '>' + arrow(pp, w, h, q.cls) + '</g>';
    if (q.badge) { var s0 = pp[0], r = Math.max(w, h) * 0.022;
      svg += '<g class="badge"><circle cx="' + s0[0] + '" cy="' + s0[1] + '" r="' + r + '" fill="#111" stroke="' + (q.cls === 'alt' ? 'var(--ptr2)' : 'var(--ptr)') + '" stroke-width="2" vector-effect="non-scaling-stroke"/>' +
        '<text x="' + s0[0] + '" y="' + s0[1] + '" fill="#fff" font-size="' + r * 1.25 + '" text-anchor="middle" dominant-baseline="central">' + esc(q.badge) + '</text></g>'; }
  });
  (opts.dots || []).forEach(function (q) { var t = q.path[q.path.length - 1];
    svg += '<circle class="tipdot hit" data-n="' + q.n + '" cx="' + t[0] + '" cy="' + t[1] + '" r="' + Math.max(w, h) * 0.009 + '"/>'; });
  return '<div class="stage" data-file="' + esc(file) + '"><img src="img/a/' + esc(file) + '" width="' + w + '" height="' + h + '" alt="Cadaver photograph"' + (opts.lazy ? ' loading="lazy"' : '') + '>' +
    '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid meet">' + svg + '</svg>' + (opts.nozoom ? '' : '<span class="zoomhint">click to zoom</span>') + '</div>';
}
// some atlas leaders end in a small black arrow or tick; the yellow arrow stops where the leader met it
var ARROWTH = 'ถ้าลูกศรสีเหลืองชี้ลูกศรสีดำเล็ก หรือขีดสีดำอยู่ ให้ยึดตามสีดำเล็ก (ใช้ลูกศรสีเหลืองใหญ่ชี้เลยมันจะเห็นไม่ชัด)';
var ARROWNOTE = '<p class="arrownote" lang="th"><svg viewBox="0 0 30 14" aria-hidden="true"><path d="M12 7H28" stroke="#1d2330" stroke-width="6" stroke-linecap="round"/><path d="M12 7H28" stroke="var(--ptr)" stroke-width="3.5" stroke-linecap="round"/><path d="M1.5 7L13 1V13Z" fill="var(--ptr)" stroke="#1d2330" stroke-width="1.2" stroke-linejoin="round"/></svg><span>' + ARROWTH + '</span></p>';
function srcCap(file) { return 'Rohen, Photographic Atlas 8e p.' + I[file].page + ' · leader line redrawn, labels removed'; }

/* zoom */
var zoom = $('#zoom');
function openZoom(html, cap) {
  zoom.innerHTML = '<div class="zbar"><span class="grow">' + esc(cap || '') + '</span><button data-z="fit">Fit</button><button data-z="1">100%</button><button data-z="x">Close <span class="kbd">Esc</span></button></div><div class="zbody">' + html + '</div>';
  zoom.hidden = false; var body = $('.zbody', zoom), el = body.firstElementChild;
  function fit() { if (!el) return; var img = $('img', el) || el; var W = img.naturalWidth || +img.getAttribute('width'), H = img.naturalHeight || +img.getAttribute('height');
    var k = Math.min((body.clientWidth - 16) / W, (body.clientHeight - 16) / H); img.style.width = Math.round(W * k) + 'px'; }
  function full() { var img = $('img', el) || el; img.style.width = (img.naturalWidth || +img.getAttribute('width')) + 'px'; }
  fit(); var img0 = $('img', el) || el; if (img0 && !img0.complete) img0.onload = fit;
  zoom.onclick = function (e) { var z = e.target.closest('[data-z]'); if (!z) { if (e.target === body) closeZoom(); return; } if (z.dataset.z === 'x') closeZoom(); else if (z.dataset.z === 'fit') fit(); else full(); };
}
/* connection maps (the Anatomy 101 flowcharts): the structure's box lit, tabs for a second map, Expand to full screen */
var KN = { a: 'artery', v: 'vein', n: 'nerve', g: 'ganglion', l: 'lymph', s: 'dural sinus', t: 'organ / part', o: 'opening', c: 'space', r: 'airway', m: 'muscle', b: 'bone / cartilage / joint', d: 'membrane / meninges' };
function mapLines(lk) {
  var s = '<span class="ln"><svg width="26" height="10" aria-hidden="true"><path d="M1 5H18" stroke="currentColor" stroke-width="1.6"/><path d="M25 5l-8-4v8z" fill="currentColor"/></svg>branch, supply or drainage</span>';
  if (lk.indexOf('conn') >= 0) s += '<span class="ln conn"><svg width="34" height="10" aria-hidden="true"><path d="M8 5H26" stroke="currentColor" stroke-width="2.2"/><path d="M1 5l8-4v8z M33 5l-8-4v8z" fill="currentColor"/></svg>two-way connection</span>';
  if (lk.indexOf('rel') >= 0) s += '<span class="ln"><svg width="28" height="10" aria-hidden="true"><path d="M2 5H26" stroke="currentColor" stroke-width="1.8" stroke-dasharray=".1 4.5" stroke-linecap="round"/></svg>dotted: lies next to it</span>';
  return s;
}
function mapHTML(id) {
  var fl = T[id].fl || []; if (!fl.length) return '';
  var tabs = fl.length > 1 ? '<div class="ftabs" role="group" aria-label="Flowcharts">' + fl.map(function (x, k) { return '<button type="button" data-fk="' + k + '" aria-pressed="' + (k ? 'false' : 'true') + '">' + esc(F[x[0]].t) + '</button>'; }).join('') + '</div>' : '';
  return '<div class="flowbox"><div class="fhead"><span class="fh">Connection map</span>' + tabs + '<span class="ftools"><button type="button" class="btn sm" data-fzoom>Expand</button></span></div>' +
    fl.map(function (x, k) { var f = F[x[0]];
      return '<div class="fpanel' + (k ? '' : ' on') + '" data-fk="' + k + '" data-fid="' + esc(x[0]) + '" data-me="' + esc(x[1].join('\n')) + '">' + (fl.length > 1 ? '' : '<p class="ftitle">' + esc(f.t) + '</p>') +
        '<div class="fsvg">' + f.svg + '</div><div class="flegend"><span class="lme">' + esc(T[id].name) + '</span>' +
        f.lg.map(function (c) { return '<span style="--c:var(--fk-' + c + ');--b:var(--fk-' + c + '-bg)">' + KN[c] + '</span>'; }).join('') + mapLines(f.lk) + '</div></div>'; }).join('') + '</div>';
}
function mapLink(id) {      // in the answer panel: jump to the map (under the photo, or under this panel on a phone)
  return (T[id].fl || []).length ? '<button type="button" class="maplink" data-gomap>Connection map: where it sits ↓</button>' : '';
}
function showMap(id) { var d = $('.dmap', app); if (d) { d.innerHTML = mapHTML(id); wireMaps(d); } }
document.addEventListener('click', function (e) { if (e.target.closest('[data-gomap]')) { var m = $('.dmap .flowbox', app); if (m) m.scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
function wireMaps(root) {
  $$('.flowbox', root).forEach(function (box) {
    $$('.fpanel', box).forEach(function (p) {
      var me = p.dataset.me.split('\n');
      $$('g.fn', p).forEach(function (g) { if (me.indexOf(g.dataset.n) >= 0) g.classList.add('me'); });
    });
    var fit = function () {      // text no smaller than 80 %: a wide map scrolls sideways, centred on the lit box
      var p = $('.fpanel.on', box), wrap = $('.fsvg', p), svg = $('svg', wrap), W = +svg.getAttribute('width'), small = W * 0.8 > wrap.clientWidth;
      if (svg.dataset.mw == null) svg.dataset.mw = svg.style.maxWidth;      // its own cap: never more than 110 %
      svg.style.width = small ? Math.round(W * 0.8) + 'px' : ''; svg.style.maxWidth = small ? 'none' : svg.dataset.mw;
      var me = $('g.me', svg); if (small && me) { var r = me.getBoundingClientRect(), wr = wrap.getBoundingClientRect(); wrap.scrollLeft += r.left + r.width / 2 - (wr.left + wr.width / 2); }
    };
    var big = function () { var p = $('.fpanel.on', box), c = $('svg', p).cloneNode(true); c.removeAttribute('style'); openZoom(c.outerHTML, 'Connection map · ' + F[p.dataset.fid].t); };
    $$('.ftabs button', box).forEach(function (b) { b.onclick = function () {
      $$('.ftabs button', box).forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('.fpanel', box).forEach(function (p) { p.classList.toggle('on', p.dataset.fk === b.dataset.fk); }); fit(); }; });
    $('[data-fzoom]', box).onclick = big;
    $$('.fsvg', box).forEach(function (w) { w.onclick = big; });
    fit();
  });
}
function closeZoom() { zoom.hidden = true; zoom.innerHTML = ''; }
/* QR codes of both trainers (this course first): on the home page, and full screen from the header for a shared screen */
var QRS = (D.course === 'NS' ? ['ns', 'rs'] : ['rs', 'ns']).map(function (c) {
  return { name: c.toUpperCase() + ' I Spot Trainer', url: 'https://punnawit9285.github.io/' + c + '-peer-tutoring/spot/', img: 'img/qr-' + c + '.svg' };
});
function qrHTML(cls) {
  return '<div class="' + cls + '">' + QRS.map(function (q) { return '<a class="qr" href="' + q.url + '" target="_blank" rel="noopener"><img src="' + q.img + '" alt="QR code for ' + q.url + '"><b>' + q.name + '</b><span>' + q.url.replace(cls === 'qrbig' ? 'https://' : 'https://punnawit9285.github.io/', '') + '</span></a>'; }).join('') + '</div>';
}
function showQR() {
  zoom.innerHTML = '<div class="zbar"><span class="grow">Scan to open on your phone</span><button data-z="x">Close <span class="kbd">Esc</span></button></div><div class="zbody">' + qrHTML('qrbig') + '</div>';
  zoom.hidden = false;
  zoom.onclick = function (e) { if (e.target.closest('[data-z]') || e.target.classList.contains('zbody')) closeZoom(); };
}
function zoomStage(st) { var c = st.cloneNode(true); var h = $('.zoomhint', c); if (h) h.remove(); openZoom(c.outerHTML, srcCap(st.dataset.file)); }
document.addEventListener('click', function (e) {
  var s = e.target.closest('.stage'); if (s && !s.closest('.zoom') && !e.target.closest('.hit') && !s.dataset.nozoom) { zoomStage(s); return; }
  var f = e.target.closest('[data-zoomsrc]'); if (f) openZoom('<img class="plain" src="' + esc(f.dataset.zoomsrc) + '" alt="">', f.dataset.cap || '');
});

/* ---------------- routing ---------------- */
var view = null, keyHandler = null;
function route() {
  var h = location.hash.replace(/^#\/?/, ''), parts = h.split('?'), path = parts[0].split('/'), q = {};
  (parts[1] || '').split('&').forEach(function (kv) { if (kv) { var a = kv.split('='); q[a[0]] = decodeURIComponent(a[1] || ''); } });
  var tab = path[0] || 'home'; keyHandler = null; closeZoom();
  $$('.tabs a').forEach(function (a) { a.classList.toggle('on', a.dataset.tab === tab); });
  ({ home: home, drill: drill, quiz: quiz, find: findIt, exam: exam, atlas: atlas }[tab] || home)(q, path);
  app.focus({ preventScroll: true }); window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !zoom.hidden) { closeZoom(); return; }
  if (keyHandler) keyHandler(e);
});
function labsParam(q) { return q.labs ? q.labs.split(',').map(Number) : D.labs.map(function (L) { return L.lab; }); }

/* ---------------- checklist ticks ---------------- */
// An item is ticked when every structure in it has been identified correctly at least once (choice, typed answer,
// "Got it" when typing, quiz or find-it). The tick is the student's own record: they can untick or tick by hand.
function itemKey(lab, k) { return lab + '.' + k; }
function ticked(lab, k) { return S.ck[itemKey(lab, k)] === true; }
var toastTimer = null;
function toast(html) {
  var el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.innerHTML = html; el.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('on'); }, 2600);
}
function identified(id) {
  var x = st(id); x.ok = x.ok || now(); var newly = [];
  D.labs.forEach(function (L) { L.items.forEach(function (it, k) {
    if (it.ts.indexOf(id) < 0 || ticked(L.lab, k)) return;
    var dr = it.ts.filter(function (t) { return ok(t); });
    if (dr.length && dr.every(function (t) { return S.t[t] && S.t[t].ok; })) { S.ck[itemKey(L.lab, k)] = true; newly.push('Lab ' + L.lab + ' · ' + (k + 1) + '. ' + it.name); }
  }); });
  save();
  if (newly.length) toast('<b>✓ Ticked on the checklist</b><br>' + newly.map(esc).join('<br>'));
}

/* ---------------- home / checklist ---------------- */
function home() {
  var nLearned = withViews.filter(learned).length, nItems = 0, nTicked = 0;
  D.labs.forEach(function (L) { L.items.forEach(function (it, k) { nItems++; if (ticked(L.lab, k)) nTicked++; }); });
  var h = '<section class="hero"><div class="panel"><div class="kicker">' + esc(D.course) + ' I · gross lab checklist</div><h1>' + esc(D.title) + '</h1>' +
    '<p>Every structure on the lab checklist, on real cadaver photos. A thin arrow points at one structure: pick or type its name, then learn how to find it, why it matters and the lecture slide.</p>' +
    '<div class="stats"><div class="stat"><b>' + nTicked + '<small> / ' + nItems + '</small></b><span>checklist items ticked</span></div><div class="stat"><b>' + nLearned + '<small> / ' + withViews.length + '</small></b><span>structures named correctly</span></div><div class="stat"><b>' + (withViews.length - nLearned) + '</b><span>structures to go</span></div></div>' +
    '<div class="bar" title="' + nTicked + ' of ' + nItems + ' items ticked"><i class="m" style="width:' + (100 * nTicked / nItems) + '%"></i></div>' +
    '<div class="labpick"><span class="kicker">Drill a lab</span><div class="labbtns">' + D.labs.map(function (L) {
      var ids = idsOfLabs([L.lab]), n = ids.filter(learned).length;
      return '<a class="labbtn" href="#/drill?labs=' + L.lab + '"><b>Lab ' + L.lab + '</b><span>' + esc(L.title) + '</span><i>' + n + '/' + ids.length + '</i></a>'; }).join('') + '</div></div>' +
    '<div class="row" style="margin-top:12px"><a class="btn" href="#/drill">Drill every lab (' + withViews.length + ')</a><a class="btn" href="#/quiz">Quick quiz</a><a class="btn" href="#/find">Find it</a><a class="btn" href="#/exam">Past spot exam</a></div></div>' +
    '<div class="panel"><div class="kicker">How it works</div><ol class="how">' +
    '<li><b>Drill a lab</b>: every structure of the lab comes up once, in random order, with a thin arrow on it. Pick its name from four choices (or switch to typing). A miss comes back a few cards later; the round ends when you have named them all.</li>' +
    '<li>Name every structure of a checklist item correctly once and the item is <b>ticked</b>. Tap a tick box to untick or tick it yourself.</li>' +
    '<li lang="th"><b>ลูกศรสีเหลือง</b>: ' + ARROWTH + '</li>' +
    '<li>Each structure has up to four photos from different dissections, so you learn the structure, not one picture.</li>' +
    '<li>After the answer: <b>how to find it</b> on the cadaver, the neighbours on the same photo, the lecture slide and past spot stations.</li>' +
    '<li><b>Spot exam</b> runs past stations against the clock. Progress stays in this browser.</li></ol>' +
    '<div class="setrow"><span class="muted">Answer by</span>' + modeSwitch() + '</div>' +
    '<div class="setrow"><span class="muted">Arrow</span><label class="chip"><input type="radio" name="ptr" value="short"' + (S.set.ptr === 'short' ? ' checked' : '') + '> short arrow</label><label class="chip"><input type="radio" name="ptr" value="full"' + (S.set.ptr === 'full' ? ' checked' : '') + '> full leader line</label>' +
    '<button class="chip" id="reset">Reset progress</button></div>' +
    '<div class="sharebox"><div class="kicker">Open on your phone</div>' + qrHTML('qrs') + '</div></div></section><section class="labs">';
  D.labs.forEach(function (L) {
    var ids = idsOfLabs([L.lab]), nl = ids.filter(learned).length, nt = L.items.filter(function (it, k) { return ticked(L.lab, k); }).length;
    h += '<article class="panel lab"><header><span class="no">LAB ' + L.lab + '</span><h2>' + esc(L.title) + '</h2><span class="grow"></span><span class="mono muted" style="font-size:12px">' + nt + ' / ' + L.items.length + ' ticked</span></header>' +
      '<a class="btn pri drillbig" href="#/drill?labs=' + L.lab + '"><span class="play">▶</span><span><b>Drill Lab ' + L.lab + '</b><small>' + L.items.length + ' items · all ' + ids.length + ' structures · ' + nl + ' named so far</small></span></a>' +
      '<div class="bar"><i class="m" style="width:' + (100 * nt / L.items.length) + '%"></i></div><ul class="items">';
    L.items.forEach(function (it, k) {
      var ts = it.ts, on = ticked(L.lab, k);
      h += '<li class="' + (on ? 'done' : '') + '" data-lab="' + L.lab + '" data-k="' + k + '" title="Drill this item"><button class="tick" role="checkbox" aria-checked="' + on + '" aria-label="Tick ' + esc(it.name) + '" title="' + (on ? 'Untick' : 'Tick') + '">✓</button><span class="nm">' + (k + 1) + '. ' + esc(it.name) + (ts.length > 1 ? '<small>' + ts.length + ' structures</small>' : '') + '</span><span class="dots">' +
        ts.map(function (id) { return '<i class="' + (ok(id) ? (learned(id) ? 'm' : '') : 'x') + '" title="' + esc(T[id].name) + (T[id].views.length ? '' : T[id].past.length ? ' (past spot station only)' : ' (no photo yet: lecture and notes only)') + '"></i>'; }).join('') + '</span></li>';
    });
    h += '</ul><div class="row"><a class="btn sm" href="#/quiz?labs=' + L.lab + '">Quiz</a><a class="btn sm" href="#/find?labs=' + L.lab + '">Find it</a><a class="btn sm" href="#/atlas?labs=' + L.lab + '">Photos</a></div></article>';
  });
  app.innerHTML = h + '</section>';
  $$('.items li', app).forEach(function (li) { li.onclick = function () { location.hash = '#/drill?item=' + li.dataset.lab + '.' + li.dataset.k; }; });
  $$('.items .tick', app).forEach(function (b) { b.onclick = function (e) {
    e.stopPropagation(); var li = b.closest('li'), key = itemKey(li.dataset.lab, li.dataset.k); S.ck[key] = !(S.ck[key] === true); save(); home(); }; });
  wireMode(home);
  $$('input[name=ptr]', app).forEach(function (r) { r.onchange = function () { S.set.ptr = r.value; save(); }; });
  $('#reset', app).onclick = function () { if (confirm('Reset all progress and ticks for ' + D.course + '?')) { S.t = {}; S.ck = {}; save(); home(); } };
}
function modeSwitch() {
  return '<span class="seg" role="group" aria-label="Answer mode"><button data-mode="mc" aria-pressed="' + (S.set.mode !== 'type') + '">Choices</button><button data-mode="type" aria-pressed="' + (S.set.mode === 'type') + '">Typing</button></span>';
}
function wireMode(again) { $$('[data-mode]', app).forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); S.set.mode = b.dataset.mode; save(); again(); }; }); }

/* ---------------- drill ---------------- */
// A round is every structure of the chosen labs (or item, or list), once each, in random order.
// Named correctly: it counts and leaves the round. Missed: it does not count and comes back three cards later.
// The round ends when every structure has been named.
function drill(q) {
  var pool;
  if (q.item) { var a = q.item.split('.'), L = D.labs.filter(function (x) { return x.lab === +a[0]; })[0]; pool = L.items[+a[1]].ts.filter(function (id) { return ok(id); }); }
  else if (q.ids) pool = q.ids.split(',').filter(function (id) { return T[id] && ok(id); });
  else pool = idsOfLabs(labsParam(q));
  var queue = shuffle(pool), total = pool.length, nRight = 0, missed = {}, cur = null, vi = 0, revealed = false, typed = null, self = null, hint = 0, opts = null, chosen = -1;
  var title = q.item ? itemName(q.item) : q.ids ? 'Structures you missed' : (q.labs ? 'Lab ' + q.labs.split(',').join(', ') : 'All labs');
  function itemName(s) { var a = s.split('.'), L = D.labs.filter(function (x) { return x.lab === +a[0]; })[0]; return 'Lab ' + L.lab + ' · ' + L.items[+a[1]].name; }
  function mc() { return S.set.mode !== 'type'; }
  function makeOpts() {
    var t = T[cur], v = t.views[vi], peers = idsOfLabs(labOf[cur]);
    var seen = {}; seen[dkey(t.name)] = 1;
    var others = v ? distractors(cur, v, peers, 3) : shuffle(peers).filter(function (o) { var k = dkey(T[o].name); if (seen[k]) return false; seen[k] = 1; return true; }).slice(0, 3).map(function (o) { return { name: T[o].name, id: o }; });
    opts = shuffle([{ name: t.name, id: cur, n: v ? v.n : null, right: true }].concat(others)); chosen = -1;
  }
  function right() { return typed ? typed.ok : self === true; }
  function finished() {
    var ms = pool.filter(function (id) { return missed[id]; });
    app.innerHTML = '<div class="panel setup done"><div class="kicker">' + esc(title) + '</div><b class="big">' + total + ' / ' + total + '</b><p>Every structure named. ' + (total - ms.length) + ' right the first time' + (ms.length ? '; missed at least once: ' + ms.map(function (id) { return esc(T[id].name); }).join(', ') : '') + '.</p>' +
      '<div class="row" style="justify-content:center">' + (ms.length ? '<a class="btn pri" href="#/drill?ids=' + ms.join(',') + '">Drill the ' + ms.length + ' you missed</a>' : '') + '<button class="btn" id="again">Drill all again</button><a class="btn" href="#/">Back to the checklist</a></div></div>';
    $('#again').onclick = function () { drill(q); }; keyHandler = null;
  }
  function next() {
    if (!queue.length) return finished();
    cur = queue.shift(); var t = T[cur], x = st(cur); revealed = false; typed = null; self = null; hint = 0;
    var nv = t.views.length || t.past.length;
    vi = nv > 1 ? (x.v + 1 + Math.floor(Math.random() * (nv - 1))) % nv : 0; x.v = vi; save();
    makeOpts(); render();
  }
  function advance() {                 // after the answer: count it, or send it back three cards later
    if (!revealed || (!typed && self === null)) return;
    if (right()) nRight++; else { missed[cur] = 1; queue.splice(Math.min(3, queue.length), 0, cur); }
    next();
  }
  function render() {
    var t = T[cur], v = t.views[vi], pq = v ? null : t.past[vi], ps = pq ? P[pq[0]] : null;
    var tag = missed[cur] ? '<span class="pill due">again</span>' : '';
    var nv = t.views.length || t.past.length;
    var pic = v ? stage(v.img, [{ path: v.path }]) : '<div class="stage" data-nozoom="1" style="background:#fff"><img src="' + esc(ps.img) + '" alt="Past spot station" data-zoomsrc="' + esc(ps.img) + '" data-cap="' + esc(ps.set) + '"></div>';
    var h = '<div class="drill"><div>' + pic + '<div class="stagecap"><span>' + esc(v ? srcCap(v.img) : ps.set + ' · past spot station (no clean atlas photo for this structure)') + '</span><span>view ' + (vi + 1) + ' of ' + nv + (nv > 1 ? ' · <a href="#" id="nextView">another photo <span class="kbd">V</span></a>' : '') + '</span></div></div>' +
      '<aside class="panel card"><div class="qtop">' + tag + '<span class="pill">Lab ' + labOf[cur].join(', ') + '</span><span class="grow"></span>' + modeSwitch() + '<span class="mono muted" style="font-size:12px" title="named correctly / structures in this round">' + nRight + ' / ' + total + ' named</span></div>' +
      '<div class="prompt">' + (v ? 'What is at the arrow?' : esc(ps.qs[pq[1]][0])) + '</div>' + (v ? ARROWNOTE : '');
    if (mc()) {
      h += '<div class="opts">' + opts.map(function (o, j) {
        var cls = revealed ? (o.right ? 'right' : j === chosen ? 'wrong' : '') : '';
        return '<button data-j="' + j + '" class="' + cls + '"' + (revealed ? ' disabled' : '') + '><span class="L">' + 'ABCD'[j] + '</span>' + esc(o.name) + '</button>'; }).join('') + '</div>' +
        (revealed ? '' : '<div class="row" style="margin-top:8px"><button class="btn sm" id="hintBtn">Hint <kbd>H</kbd></button><button class="btn sm" id="showBtn">I don’t know <kbd>Space</kbd></button></div>');
    } else {
      h += '<form class="answer-in" id="af" autocomplete="off"><input id="ain" placeholder="Type the name, or leave it empty" aria-label="Your answer"' + (revealed ? ' disabled' : '') + (revealed && typed ? ' value="' + esc(typed.s) + '"' : '') + '><button class="btn pri" type="submit"' + (revealed ? ' hidden' : '') + '>Check</button></form>' +
        (revealed ? '' : '<div class="row" style="margin-top:8px"><button class="btn sm" id="hintBtn">Hint <kbd>H</kbd></button><button class="btn sm" id="showBtn">Show answer <kbd>Space</kbd></button></div>');
    }
    h += (hint ? '<div class="hintbox">' + hintText() + '</div>' : '') +
      (typed !== null ? '<div class="verdict ' + (typed.ok ? 'ok' : 'no') + '">' + (typed.ok ? '✓ Correct' : mc() ? (chosen < 0 ? 'It comes back in a few cards' : '✗ Not quite' + (opts[chosen].n != null ? ': the blue arrow shows where “' + esc(opts[chosen].name) + '” is' : '')) : '✗ You wrote “' + esc(typed.s) + '”') + '</div>' : '') +
      (revealed ? revealHTML() : '') +
      '<div class="progress"><i style="width:' + (100 * nRight / total) + '%"></i></div></aside><div class="dmap">' + (revealed ? mapHTML(cur) : '') + '</div></div>';
    app.innerHTML = h; wire();
    if (revealed && mc() && chosen >= 0 && !opts[chosen].right && opts[chosen].n != null && v) {
      var L = I[v.img].labels.filter(function (x) { return x[0] === opts[chosen].n; })[0];
      if (L) { var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.innerHTML = arrow(ptrPath(L[2], I[v.img].w, I[v.img].h, S.set.ptr), I[v.img].w, I[v.img].h, 'alt'); $('.stage svg', app).appendChild(g); }
    }
  }
  function hintText() {
    var t = T[cur]; var parts = ['Checklist item: <b>' + esc(itemOf[cur]) + '</b>'];
    if (hint > 1) parts.push('Starts with <b>' + esc(t.name.split(/\s+/).map(function (w) { return w[0]; }).join(' ')) + '</b> (' + t.name.split(/\s+/).length + ' words)');
    return parts.join('<br>');
  }
  function neighbours(v) {
    if (!v) return [];
    var im = I[v.img], tip = v.path[v.path.length - 1], seen = {}, out = [];
    im.labels.forEach(function (L) { if (L[0] === v.n) return; var p = L[2][L[2].length - 1], d = Math.hypot(p[0] - tip[0], p[1] - tip[1]); var k = L[1].toLowerCase(); if (seen[k]) return; seen[k] = 1; out.push([d, L]); });
    return out.sort(function (a, b) { return a[0] - b[0]; }).slice(0, 5).map(function (x) { return x[1]; });
  }
  function nextHTML() {
    if (!typed && self === null)      // typing mode, nothing typed: the student marks it
      return '<div class="row selfmark"><button class="btn ok" data-self="1">Got it <kbd>Y</kbd></button><button class="btn no" data-self="0">Missed it <kbd>N</kbd></button></div>';
    return '<div class="row"><button class="btn pri" id="nextBtn">' + (right() ? 'Next' : 'Next (this one comes back)') + ' <kbd>Enter</kbd></button>' +
      (typed && !typed.ok && !mc() ? '<button class="btn sm" id="okBtn">I was right</button>' : '') + '</div>';
  }
  function revealHTML() {
    var t = T[cur], v = t.views[vi], pq = v ? null : t.past[vi], h = '<div class="reveal"><p class="ans">' + esc(t.name) + '</p>' + (pq ? '<div class="ansitem">Station key: ' + esc(P[pq[0]].qs[pq[1]][1]) + (P[pq[0]].qs[pq[1]][2] ? ' · ' + esc(P[pq[0]].qs[pq[1]][2]) : '') + '</div>' : '') + '<div class="ansitem">Lab ' + labOf[cur].join(', ') + ' · ' + esc(itemOf[cur]) + (t.card ? ' · <a href="' + esc(D.deck) + '#' + esc(t.card) + '" target="_blank" rel="noopener">Anatomy 101 ' + esc(t.card) + ' ↗</a>' : '') + '</div>' +
      nextHTML() + '<div class="note"><b>How to find it</b><p>' + esc(t.find) + '</p></div><div class="note"><b>Why it matters</b><p>' + esc(t.why) + '</p></div><div class="note th"><b>ภาษาไทย</b><p class="th">' + esc(t.th) + '</p></div>' + mapLink(cur);
    var nb = neighbours(v);
    if (nb.length) h += '<div class="sub"><h3>Neighbours on this photo · hover or tap</h3><div class="chips">' + nb.map(function (L) { return '<span class="chip" data-nb="' + L[0] + '">' + esc(L[1]) + '</span>'; }).join('') + '</div></div>';
    if (t.views.length > 1) h += '<div class="sub"><h3>Same structure, other photos</h3><div class="thumbs">' + t.views.map(function (w, k) { return '<figure class="' + (k === vi ? 'cur' : '') + '" data-view="' + k + '"><img src="img/a/' + esc(w.img) + '" alt="" loading="lazy"><figcaption>Rohen p.' + I[w.img].page + '</figcaption></figure>'; }).join('') + '</div></div>';
    if (t.lec.length) h += '<div class="sub"><h3>Lecture</h3><div class="thumbs lec">' + t.lec.map(function (f) { return '<figure data-zoomsrc="' + esc(f.src) + '" data-cap="' + esc(f.cap) + '"><img src="' + esc(f.src) + '" alt="" loading="lazy"><figcaption>' + esc(f.cap) + '</figcaption></figure>'; }).join('') + '</div></div>';
    if (t.past.length) h += '<div class="sub"><h3>Past spot stations</h3><div class="thumbs">' + t.past.map(function (pq) { var p = P[pq[0]]; return '<figure data-past="' + esc(pq[0]) + '" data-qi="' + pq[1] + '"><img src="' + esc(p.img) + '" alt="" loading="lazy"><figcaption>' + esc(p.set) + '</figcaption></figure>'; }).join('') + '</div></div>';
    return h + '</div>';
  }
  function reveal() { if (revealed) return; revealed = true; render(); }
  function check() {
    if (revealed) return;
    if (mc()) { typed = { s: '', ok: false }; reveal(); return; }   // "I don't know": a miss
    var s = $('#ain').value.trim(); if (s) { typed = { s: s, ok: matchAns(s, accOf(cur)) }; if (typed.ok) identified(cur); } reveal();
  }
  function choose(j) {
    if (revealed) return; chosen = j; typed = { s: opts[j].name, ok: !!opts[j].right };
    if (typed.ok) identified(cur); reveal();
  }
  function mark(got) { self = got; if (got) identified(cur); render(); }
  function wire() {
    wireMaps(app);
    var f = $('#af'); if (f) f.onsubmit = function (e) { e.preventDefault(); if (!revealed) check(); };
    var inp = $('#ain'); if (inp && !revealed && matchMedia('(pointer:fine)').matches) inp.focus();
    $$('.opts [data-j]', app).forEach(function (b) { b.onclick = function () { choose(+b.dataset.j); }; });
    if (!revealed) { $('#hintBtn').onclick = function () { hint++; render(); }; $('#showBtn').onclick = function () { check(); }; }
    wireMode(function () { if (!revealed) { typed = null; } render(); });
    var nvl = $('#nextView'); if (nvl) nvl.onclick = function (e) { e.preventDefault(); vi = (vi + 1) % (T[cur].views.length || T[cur].past.length); makeOpts(); render(); };
    var nb = $('#nextBtn'); if (nb) nb.onclick = advance;
    var ob = $('#okBtn'); if (ob) ob.onclick = function () { typed.ok = true; identified(cur); render(); };
    $$('[data-self]', app).forEach(function (b) { b.onclick = function () { mark(b.dataset.self === '1'); }; });
    $$('[data-view]', app).forEach(function (fg) { fg.onclick = function () { vi = +fg.dataset.view; render(); }; });
    $$('[data-past]', app).forEach(function (fg) { fg.onclick = function () { showPast(fg.dataset.past, +fg.dataset.qi); }; });
    var v = T[cur].views[vi], sg = $('.stage svg', app);
    if (!v) return;
    $$('[data-nb]', app).forEach(function (ch) {
      var L = I[v.img].labels.filter(function (x) { return x[0] === +ch.dataset.nb; })[0];
      var show = function () { var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'nbp'); g.innerHTML = arrow(ptrPath(L[2], I[v.img].w, I[v.img].h, S.set.ptr), I[v.img].w, I[v.img].h, 'alt'); sg.appendChild(g); };
      var hide = function () { $$('.nbp', sg).forEach(function (g) { g.remove(); }); };
      ch.onmouseenter = show; ch.onmouseleave = hide; ch.onclick = function () { hide(); show(); };
    });
  }
  keyHandler = function (e) {
    var typing = document.activeElement && document.activeElement.id === 'ain' && !revealed;
    if (typing) return;
    if (!revealed && mc()) {
      var i = 'abcd'.indexOf(e.key.toLowerCase()); if (i < 0) i = '1234'.indexOf(e.key);
      if (i >= 0 && i < opts.length) { choose(i); return; }
    }
    if (revealed && !typed && self === null) { if (e.key === 'y' || e.key === 'Y') mark(true); else if (e.key === 'n' || e.key === 'N') mark(false); return; }
    if (e.key === ' ' && !revealed) { e.preventDefault(); check(); }
    else if (revealed && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) { e.preventDefault(); advance(); }
    else if (e.key === 'h' || e.key === 'H') { if (!revealed) { hint++; render(); } }
    else if ((e.key === 'v' || e.key === 'V') && (T[cur].views.length || T[cur].past.length) > 1) { vi = (vi + 1) % (T[cur].views.length || T[cur].past.length); makeOpts(); render(); }
  };
  next();
}
function showPast(pid, qi) {
  var p = P[pid];
  openZoom('<div class="panel" style="max-width:900px;width:100%;padding:16px;line-height:1.5"><img src="' + esc(p.img) + '" style="width:100%;border-radius:8px" alt=""><h3 style="margin-top:10px">' + esc(p.set) + '</h3>' +
    p.qs.map(function (x, k) { return '<div class="q"><b>' + esc(x[0]) + '</b><br><span style="color:var(--ok);font-weight:600">' + esc(x[1]) + '</span>' + (x[2] ? '<br><span class="muted">' + esc(x[2]) + '</span>' : '') + '</div>'; }).join('') + '</div>', p.set);
}

/* ---------------- setup screen for quiz / find ---------------- */
function setup(kind, q, start) {
  var labs = labsParam(q);
  var h = '<div class="panel setup"><div class="kicker">' + (kind === 'quiz' ? 'Quiz' : 'Find it') + '</div><h1>' + (kind === 'quiz' ? 'Name the structure at the arrow' : 'Which arrow is the structure?') + '</h1>' +
    '<p class="muted">' + (kind === 'quiz' ? 'Four choices; the wrong ones are usually other structures on the same photo. A miss shows you where your choice really is.' : 'Four arrows on one photo, A to D. Pick the one that points at the named structure.') + '</p>' +
    '<b>Labs</b><div class="pick">' + D.labs.map(function (L) { return '<label><input type="checkbox" value="' + L.lab + '"' + (labs.indexOf(L.lab) >= 0 ? ' checked' : '') + '> ' + L.lab + '. ' + esc(L.title) + '</label>'; }).join('') + '</div>' +
    '<b>Questions</b><div class="pick">' + [10, 20, 30].map(function (n, k) { return '<label><input type="radio" name="n" value="' + n + '"' + (k === 0 ? ' checked' : '') + '> ' + n + '</label>'; }).join('') + '</div>' +
    '<button class="btn pri" id="go">Start</button></div>';
  app.innerHTML = h;
  $('#go').onclick = function () {
    var ls = $$('.pick input[type=checkbox]:checked', app).map(function (i) { return +i.value; }); if (!ls.length) return;
    start(idsOfLabs(ls, true), +$('input[name=n]:checked', app).value);
  };
  keyHandler = function (e) { if (e.key === 'Enter') $('#go').click(); };
}
function finish(kind, score, n, misses, again) {
  app.innerHTML = '<div class="panel setup done"><div class="kicker">' + kind + '</div><b class="big">' + score + ' / ' + n + '</b><p>' + (misses.length ? 'Missed: ' + misses.map(function (id) { return esc(T[id].name); }).join(', ') : 'No misses.') + '</p>' +
    '<div class="row" style="justify-content:center">' + (misses.length ? '<a class="btn pri" href="#/drill?ids=' + misses.filter(function (id, i) { return misses.indexOf(id) === i; }).join(',') + '">Drill the misses now</a>' : '') + '<button class="btn" id="again">Another round</button><a class="btn" href="#/">Checklist</a></div></div>';
  $('#again').onclick = again; keyHandler = null;
}

/* ---------------- quiz (MCQ) ---------------- */
// one key per name, so near-duplicates never share a set of choices ("Parotid (Stensen's) duct" = "Parotid duct", "Facial a." = "Facial artery")
var ABBR = { m: 'muscle', mm: 'muscles', n: 'nerve', nn: 'nerves', a: 'artery', aa: 'arteries', v: 'vein', vv: 'veins', lig: 'ligament', ligg: 'ligaments' };
function dkey(s) {
  return String(s).toLowerCase().replace(/\(.*?\)/g, ' ').replace(/[’'.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim().split(' ').map(function (w) { return ABBR[w] || w; }).join(' ');
}
function distractors(id, v, pool, k) {
  var im = I[v.img], names = {}, out = [];
  names[dkey(T[id].name)] = 1;
  // other checklist structures on the same photo, then other labels on it, then other structures of the same labs
  var onPhoto = pool.filter(function (o) { return o !== id && T[o].views.some(function (w) { return w.img === v.img; }); });
  shuffle(onPhoto).forEach(function (o) { if (out.length < k && !names[dkey(T[o].name)]) { names[dkey(T[o].name)] = 1; out.push({ name: T[o].name, id: o, n: T[o].views.filter(function (w) { return w.img === v.img; })[0].n }); } });
  shuffle(im.labels).forEach(function (L) { var nm = L[1].replace(/\s*\(.*?\)\s*/g, ' ').trim(); if (out.length < k && L[0] !== v.n && !names[dkey(nm)] && nm.length < 60 && !/ and |,/.test(nm)) { names[dkey(nm)] = 1; out.push({ name: nm, n: L[0] }); } });
  shuffle(pool).forEach(function (o) { if (out.length < k && o !== id && !names[dkey(T[o].name)]) { names[dkey(T[o].name)] = 1; out.push({ name: T[o].name, id: o }); } });
  return out;
}
function quiz(q) {
  setup('quiz', q, function (pool, n) {
    var qs = shuffle(pool); while (qs.length < n && pool.length) qs = qs.concat(shuffle(pool)); qs = qs.slice(0, n);
    var k = 0, score = 0, misses = [];
    function show() {
      if (k >= qs.length) return finish('Quiz', score, qs.length, misses, function () { quiz(q); });
      var id = qs[k], t = T[id], v = pick(t.views), opts = shuffle([{ name: t.name, id: id, n: v.n, right: true }].concat(distractors(id, v, pool, 3))), answered = false;
      app.innerHTML = '<div class="drill"><div>' + stage(v.img, [{ path: v.path }]) + '<div class="stagecap"><span>' + esc(srcCap(v.img)) + '</span></div></div><aside class="panel card"><div class="qtop"><span class="pill">Quiz</span><span class="grow"></span><span class="mono muted" style="font-size:12px">' + (k + 1) + ' / ' + qs.length + ' · score ' + score + '</span></div><div class="prompt">What is at the arrow?</div>' + ARROWNOTE + '<div class="opts">' +
        opts.map(function (o, j) { return '<button data-j="' + j + '"><span class="L">' + 'ABCD'[j] + '</span>' + esc(o.name) + '</button>'; }).join('') + '</div><div id="fb"></div><div class="progress"><i style="width:' + (100 * k / qs.length) + '%"></i></div></aside><div class="dmap"></div></div>';
      function choose(j) {
        if (answered) return; answered = true; var o = opts[j];
        $$('.opts button', app).forEach(function (b, i) { b.disabled = true; if (opts[i].right) b.classList.add('right'); else if (i === j) b.classList.add('wrong'); });
        if (o.right) { score++; identified(id); } else { misses.push(id);
          if (o.n != null) { var L = I[v.img].labels.filter(function (x) { return x[0] === o.n; })[0]; if (L) { var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.innerHTML = arrow(ptrPath(L[2], I[v.img].w, I[v.img].h, S.set.ptr), I[v.img].w, I[v.img].h, 'alt'); $('.stage svg', app).appendChild(g); } } }
        $('#fb').innerHTML = '<div class="verdict ' + (o.right ? 'ok' : 'no') + '">' + (o.right ? '✓ ' + esc(t.name) : '✗ It is the <b>' + esc(t.name) + '</b>' + (o.n != null ? '. The blue arrow shows where your choice is.' : '.')) + '</div>' +
          '<div class="note"><b>How to find it</b><p>' + esc(t.find) + '</p></div><button class="btn pri" id="nx">Next <kbd>Enter</kbd></button>' + mapLink(id);
        showMap(id); $('#nx').onclick = function () { k++; show(); };
      }
      $$('.opts button', app).forEach(function (b) { b.onclick = function () { choose(+b.dataset.j); }; });
      keyHandler = function (e) { var i = '1234'.indexOf(e.key); if (i < 0) i = 'abcd'.indexOf(e.key.toLowerCase()); if (!answered && i >= 0 && i < opts.length) choose(i); else if (answered && e.key === 'Enter') { k++; show(); } };
    }
    show();
  });
}

/* ---------------- find it ---------------- */
function findIt(q) {
  setup('find', q, function (pool, n) {
    var cand = pool.filter(function (id) { return T[id].views.some(function (v) { return I[v.img].labels.length >= 4; }); });
    var qs = shuffle(cand); while (qs.length < n && cand.length) qs = qs.concat(shuffle(cand)); qs = qs.slice(0, n);
    var k = 0, score = 0, misses = [];
    function show() {
      if (k >= qs.length) return finish('Find it', score, qs.length, misses, function () { findIt(q); });
      var id = qs[k], t = T[id], v = pick(t.views.filter(function (w) { return I[w.img].labels.length >= 4; }));
      var im = I[v.img], tip = v.path[v.path.length - 1], seen = {}; seen[v.n] = 1;
      var others = shuffle(im.labels.filter(function (L) { if (seen[L[0]] || L[1].toLowerCase() === t.name.toLowerCase()) return false; var p = L[2][L[2].length - 1]; return Math.hypot(p[0] - tip[0], p[1] - tip[1]) > Math.max(im.w, im.h) * 0.06; })).slice(0, 3);
      var arrows = shuffle([{ n: v.n, path: v.path, right: true, name: t.name }].concat(others.map(function (L) { return { n: L[0], path: L[2], name: L[1] }; })));
      arrows.forEach(function (a, j) { a.badge = 'ABCD'[j]; });
      var answered = false;
      app.innerHTML = '<div class="drill"><div>' + stage(v.img, arrows.map(function (a) { return { path: a.path, badge: a.badge, full: true }; })) + '<div class="stagecap"><span>' + esc(srcCap(v.img)) + '</span></div></div><aside class="panel card"><div class="qtop"><span class="pill">Find it</span><span class="grow"></span><span class="mono muted" style="font-size:12px">' + (k + 1) + ' / ' + qs.length + ' · score ' + score + '</span></div>' +
        '<div class="prompt">Which arrow is the <span style="color:var(--acc)">' + esc(t.name) + '</span>?</div>' + ARROWNOTE + '<div class="opts">' + arrows.map(function (a, j) { return '<button data-j="' + j + '"><span class="L">' + a.badge + '</span>Arrow ' + a.badge + '</button>'; }).join('') + '</div><div id="fb"></div></aside><div class="dmap"></div></div>';
      function choose(j) {
        if (answered) return; answered = true; var ok = arrows[j].right;
        $$('.opts button', app).forEach(function (b, i) { b.disabled = true; b.innerHTML = '<span class="L">' + arrows[i].badge + '</span>' + esc(arrows[i].name); if (arrows[i].right) b.classList.add('right'); else if (i === j) b.classList.add('wrong'); });
        if (ok) { score++; identified(id); } else { misses.push(id); }
        $('#fb').innerHTML = '<div class="verdict ' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓ Correct' : '✗ It was arrow ' + arrows.filter(function (a) { return a.right; })[0].badge) + '</div><div class="note"><b>How to find it</b><p>' + esc(t.find) + '</p></div><button class="btn pri" id="nx">Next <kbd>Enter</kbd></button>' + mapLink(id);
        showMap(id); $('#nx').onclick = function () { k++; show(); };
      }
      $$('.opts button', app).forEach(function (b) { b.onclick = function () { choose(+b.dataset.j); }; });
      keyHandler = function (e) { var i = 'abcd'.indexOf(e.key.toLowerCase()); if (i < 0) i = '1234'.indexOf(e.key); if (!answered && i >= 0 && i < arrows.length) choose(i); else if (answered && e.key === 'Enter') { k++; show(); } };
    }
    show();
  });
}

/* ---------------- spot exam (past stations) ---------------- */
function exam() {
  var pids = Object.keys(P), sets = [];
  pids.forEach(function (p) { if (sets.indexOf(P[p].set) < 0) sets.push(P[p].set); });
  app.innerHTML = '<div class="panel setup"><div class="kicker">Spot exam</div><h1>Past spot stations against the clock</h1><p class="muted">Real past stations from the peer-tutoring decks (photos with the examiners’ pins). Type each answer; you see the keys and explanations at the end and can overrule the auto-marking.</p>' +
    '<b>Sets</b><div class="pick">' + sets.map(function (s) { return '<label><input type="checkbox" value="' + esc(s) + '" checked> ' + esc(s) + '</label>'; }).join('') + '</div>' +
    '<b>Stations</b><div class="pick">' + [10, 20, 40].map(function (n, k) { return '<label><input type="radio" name="n" value="' + n + '"' + (k === 1 ? ' checked' : '') + '> ' + n + '</label>'; }).join('') + '</div>' +
    '<b>Time per station</b><div class="pick">' + [[45, '45 s'], [60, '60 s'], [90, '90 s'], [0, 'no timer']].map(function (x, k) { return '<label><input type="radio" name="tm" value="' + x[0] + '"' + (k === 1 ? ' checked' : '') + '> ' + x[1] + '</label>'; }).join('') + '</div>' +
    '<button class="btn pri" id="go">Start</button></div>';
  $('#go').onclick = function () {
    var on = $$('.pick input[type=checkbox]:checked', app).map(function (i) { return i.value; });
    var list = shuffle(pids.filter(function (p) { return on.indexOf(P[p].set) >= 0; })).slice(0, +$('input[name=n]:checked', app).value);
    if (list.length) run(list, +$('input[name=tm]:checked', app).value);
  };
  function run(list, secs) {
    var k = 0, ans = {}, timer = null, left = 0;
    function show() {
      clearInterval(timer); if (k >= list.length) return review();
      var p = P[list[k]]; left = secs;
      app.innerHTML = '<div class="drill"><div><div class="stage" data-nozoom="1" style="background:#fff"><img src="' + esc(p.img) + '" alt="Spot station" style="max-height:74vh"></div><div class="stagecap"><span>' + esc(p.set) + '</span><a href="#" id="zm">zoom</a></div></div><aside class="panel card"><div class="qtop"><span class="pill">Station ' + (k + 1) + ' / ' + list.length + '</span><span class="grow"></span>' + (secs ? '<span class="timer" id="tm">' + secs + '</span>' : '') + '</div>' +
        '<form id="sf" autocomplete="off">' + p.qs.map(function (x, j) { return '<div class="q"><label for="q' + j + '">' + esc(x[0]) + '</label><input id="q' + j + '"></div>'; }).join('') + '<button class="btn pri" type="submit">' + (k + 1 < list.length ? 'Next station' : 'Finish') + ' <kbd>Enter</kbd></button></form></aside></div>';
      $('#zm').onclick = function (e) { e.preventDefault(); openZoom('<img class="plain" src="' + esc(p.img) + '" alt="">', p.set); };
      var first = $('#q0'); if (first) first.focus();
      $('#sf').onsubmit = function (e) { e.preventDefault(); collect(); k++; show(); };
      if (secs) timer = setInterval(function () { left--; var el = $('#tm'); if (!el) { clearInterval(timer); return; } el.textContent = left; el.classList.toggle('low', left <= 10); if (left <= 0) { collect(); k++; show(); } }, 1000);
    }
    function collect() { var p = P[list[k]]; ans[list[k]] = p.qs.map(function (x, j) { var i = $('#q' + j); return i ? i.value.trim() : ''; }); }
    function review() {
      var rows = [], tot = 0, got = 0;
      list.forEach(function (pid) { var p = P[pid]; p.qs.forEach(function (x, j) { var a = (ans[pid] || [])[j] || '', ok = !!a && matchAns(a, [x[1]].concat(x[1].split(/\s*[\/;(]\s*|\s+or\s+/))); tot++; if (ok) got++; rows.push({ pid: pid, j: j, a: a, ok: ok }); }); });
      var h = '<div class="panel setup" style="max-width:1100px"><div class="kicker">Spot exam · review</div><h1><span id="sc">' + got + '</span> / ' + tot + '</h1><p class="muted">Auto-marked by spelling; tick or untick to overrule. Click a photo to zoom.</p><div class="review">';
      list.forEach(function (pid) { var p = P[pid];
        h += '<div class="panel rv"><img src="' + esc(p.img) + '" data-zoomsrc="' + esc(p.img) + '" data-cap="' + esc(p.set) + '" alt=""><div><div class="kicker">' + esc(p.set) + '</div>' + p.qs.map(function (x, j) { var r = rows.filter(function (r) { return r.pid === pid && r.j === j; })[0];
          return '<div class="q"><b>' + esc(x[0]) + '</b><div class="key">' + esc(x[1]) + '</div><div class="yours">You: ' + (r.a ? esc(r.a) : '<i>blank</i>') + '</div>' + (x[2] ? '<div class="ex">' + esc(x[2]) + '</div>' : '') + '<label><input type="checkbox" class="mk"' + (r.ok ? ' checked' : '') + '> counted correct</label></div>'; }).join('') + '</div></div>'; });
      app.innerHTML = h + '</div><div class="row" style="margin-top:14px"><button class="btn pri" id="again">Another exam</button><a class="btn" href="#/">Checklist</a></div></div>';
      $$('.mk', app).forEach(function (c) { c.onchange = function () { $('#sc').textContent = $$('.mk:checked', app).length; }; });
      $('#again').onclick = exam; keyHandler = null;
    }
    keyHandler = null; show();
  }
}

/* ---------------- atlas ---------------- */
function atlas(q, path) {
  if (path[1]) return plate(path[1]);
  var labs = labsParam(q), h = '<div class="panel setup" style="max-width:none"><div class="kicker">Atlas</div><h1>Every photo, every label</h1><p class="muted">Open a photo to see all its labelled structures. Hide the names and tap the dots to test yourself.</p></div>';
  D.labs.forEach(function (L) {
    if (labs.indexOf(L.lab) < 0) return; var files = [];
    idsOfLabs([L.lab], true).forEach(function (id) { T[id].views.forEach(function (v) { if (files.indexOf(v.img) < 0) files.push(v.img); }); });
    h += '<h2 style="margin:20px 0 10px">Lab ' + L.lab + ' · ' + esc(L.title) + '</h2><div class="grid">' + files.map(function (f) { return '<figure data-plate="' + esc(f) + '"><img src="img/a/' + esc(f) + '" loading="lazy" alt=""><figcaption>Rohen p.' + I[f].page + ' · ' + I[f].labels.length + ' labels</figcaption></figure>'; }).join('') + '</div>';
  });
  app.innerHTML = h; $$('[data-plate]', app).forEach(function (f) { f.onclick = function () { location.hash = '#/atlas/' + f.dataset.plate; }; });
}
function plate(file) {
  var im = I[file]; if (!im) { location.hash = '#/atlas'; return; }
  var targetN = {}; allIds.forEach(function (id) { T[id].views.forEach(function (v) { if (v.img === file) targetN[v.n] = id; }); });
  var hidden = false, sel = null;
  function render() {
    var ptrs = sel != null ? [{ path: im.labels.filter(function (L) { return L[0] === sel; })[0][2] }] : [];
    app.innerHTML = '<div class="drill"><div>' + stage(file, ptrs, { dots: im.labels.map(function (L) { return { n: L[0], path: L[2] }; }) }) + '<div class="stagecap"><span>' + esc(srcCap(file)) + '</span></div></div>' +
      '<aside class="panel card"><div class="qtop"><a class="btn sm" href="#/atlas">← All photos</a><span class="grow"></span><label class="chip"><input type="checkbox" id="hid"' + (hidden ? ' checked' : '') + '> hide names</label></div>' +
      '<div class="prompt">' + (sel != null && (!hidden || revealed[sel]) ? esc(im.labels.filter(function (L) { return L[0] === sel; })[0][1]) : (hidden ? 'Tap a dot, name it, tap again' : 'Hover a name or tap a dot')) + '</div>' + ARROWNOTE +
      '<div class="labels">' + im.labels.map(function (L) { var tg = targetN[L[0]]; return '<div class="' + (tg ? 'tg ' : '') + (sel === L[0] ? 'on' : '') + '" data-n="' + L[0] + '"><span class="n">' + L[0] + '</span>' + (hidden && !revealed[L[0]] ? '•••' : esc(L[1])) + (tg ? ' ✓' : '') + '</div>'; }).join('') + '</div>' +
      '<p class="muted" style="font-size:13px;margin-top:10px">✓ = on the lab checklist. Numbers are Rohen’s legend numbers.</p></aside></div>';
    $('#hid').onchange = function () { hidden = this.checked; revealed = {}; render(); };
    $$('.labels [data-n]', app).forEach(function (d) { d.onmouseenter = function () { if (!hidden) { sel = +d.dataset.n; drawSel(); } }; d.onclick = function () { tap(+d.dataset.n); }; });
    $$('.tipdot', app).forEach(function (c) { c.addEventListener('click', function (e) { e.stopPropagation(); tap(+c.dataset.n); }); });
  }
  var revealed = {};
  function tap(n) { if (hidden && sel === n) revealed[n] = true; sel = n; render(); }
  function drawSel() { var sg = $('.stage svg', app); $$('g.selp', sg).forEach(function (g) { g.remove(); }); var L = im.labels.filter(function (x) { return x[0] === sel; })[0]; if (!L) return; var g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'selp'); g.innerHTML = arrow(ptrPath(L[2], im.w, im.h, S.set.ptr), im.w, im.h); sg.appendChild(g); $('.prompt', app).textContent = L[1]; }
  render(); keyHandler = null;
}

route();
})();
