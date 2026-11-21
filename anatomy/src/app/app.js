/* NS I & RS I Anatomy 101 — one renderer for the student deck and the tutor deck (MODE set by the page). */
(function () {
  'use strict';
  var D = window.ANAT, MODE = window.MODE || 'student', TUTOR = MODE === 'tutor';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var LET = 'ABCDEFGH';
  if (TUTOR) document.documentElement.classList.add('tutor');

  /* ---------- flatten ---------- */
  var ALL = [{ t: 'start', id: 'start' }], BYID = {};
  D.sections.forEach(function (s) {
    ALL.push({ t: 'sec', id: s.id + '-0', sec: s });
    s.items.forEach(function (it) { it.sec = s; ALL.push(it); });
  });
  ALL.forEach(function (it, i) { it.ix = i; BYID[it.id] = it; });
  var KINDS = { c: 'Concepts', s: 'Cadaver', v: 'Lab clips', p: 'Past papers' };
  var state = { i: 0, kind: 'all', view: 'present', q: '' };
  try { var sv = JSON.parse(localStorage.getItem('anat101:' + D.meta.deck + ':' + MODE) || '{}'); if (sv.kind) state.kind = sv.kind; } catch (e) {}
  function save() { try { localStorage.setItem('anat101:' + D.meta.deck + ':' + MODE, JSON.stringify({ kind: state.kind, id: (LIST[state.i] || {}).id })); } catch (e) {} }

  var LIST = [];
  function build() {
    LIST = ALL.filter(function (it) { return it.t === 'start' || it.t === 'sec' || state.kind === 'all' || it.t === state.kind; });
  }

  /* ---------- pieces ---------- */
  function fig(f, cls) {
    if (!f.src) return '<figure class="fig ph ' + (cls || '') + '"><div class="phbox"><b>Cadaver photo</b><span>' + esc(f.cap || '') + '</span><small>Open this page in your Rohen atlas; the numbers below match it. (Atlas plates are not published online.)</small></div><figcaption>' + esc(f.cap || '') + '</figcaption></figure>';
    return '<figure class="fig ' + (cls || '') + '"><img loading="lazy" src="' + esc(f.src) + '" alt="' + esc(f.cap || '') + '" data-cap="' + esc(f.cap || '') + '"><figcaption>' + esc(f.cap || '') + '</figcaption></figure>';
  }
  function eyebrow(it, kindChip, extra) {
    return '<div class="eyebrow"><span class="id">' + esc(it.id) + '</span>' + kindChip + (it.core ? '<span class="chip core">core</span>' : '') + (extra || '') + '<span class="sp"></span><span>' + esc(it.sec ? it.sec.short : '') + '</span></div>';
  }
  function thai(it) {
    if (!it.th) return '';
    return '<details class="thx"' + (TUTOR ? ' open' : '') + '><summary><span class="thx-h">Explanation</span><span class="thx-s">ภาษาไทย · click or press L</span></summary><div class="thx-body"><p>' + it.th + '</p></div></details>';
  }
  function tnotes(it) {
    var h = '';
    if (TUTOR && (it.say || it.say_th)) h += '<div class="saybox"><div class="tp-head">พูดในวิดีโอ · SAY</div>' + (it.say ? '<p>' + esc(it.say) + '</p>' : '') + (it.say_th ? '<p class="say-th">' + esc(it.say_th) + '</p>' : '') + '</div>';
    if (TUTOR && it.tn && it.tn.length) h += '<div class="tnotes"><div class="tn-head">โน้ตผู้สอน · tutor notes</div><ul>' + it.tn.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>';
    return h;
  }

  function cardStart() {
    var nc = 0, ns = 0, nv = 0, np = 0, nq = 0;
    ALL.forEach(function (it) { if (it.t === 'c') nc++; if (it.t === 's') ns++; if (it.t === 'v') nv++; if (it.t === 'p') { np++; nq += it.qs.length; } });
    var secs = D.sections.map(function (s) {
      var n = s.items.length;
      return '<button type="button" class="station" data-go="' + s.id + '-0"><span class="k">' + s.id + ' · ' + esc(s.course) + '</span><b>' + esc(s.short) + '</b><span>' + n + ' cards</span></button>';
    }).join('');
    function qrs() {
      return '<div class="qrs">' + (D.meta.qr || []).map(function (q) {
        return '<a class="qrlink" href="' + esc(q.url) + '"' + (q.dl ? ' download' : '') + ' target="_blank" rel="noopener"><small class="qrcap">' + esc(q.cap) + '</small><img src="' + esc(q.img) + '" width="112" height="112" alt="QR code for ' + esc(q.url) + '"><span>' + esc(q.url.replace('https://punnawit9285.github.io/', '')) + '</span></a>';
      }).join('') + '</div>';
    }
    return '<article class="card secard"><div class="eyebrow"><span class="chip kind">' + esc(D.meta.badge) + '</span><span class="chip">' + esc(D.meta.sub) + '</span></div>' +
      '<h2>' + esc(D.meta.title) + (TUTOR ? ' <span class="muted">(Tutor)</span>' : '') + '</h2>' +
      '<p class="lede">' + esc(D.meta.lede) + '</p>' +
      '<div class="coverline"><div class="counts"><div><b>' + nc + '</b><span>concepts</span></div><div><b>' + ns + '</b><span>cadaver steps</span></div><div><b>' + np + '</b><span>past-paper items</span></div><div><b>' + nq + '</b><span>questions</span></div></div>' + qrs() + '</div>' +
      '<div class="howto"><div><b>Concept</b>Lecture key points with click-to-reveal blanks, next to the handout figure.</div><div><b>Cadaver step</b>Real specimen beside the lecture diagram. Name each number, then reveal.</div><div><b>Lab clip</b>What the group said at the bench, with timestamps; spot the myths.</div><div><b>Past papers</b>Spot tests AC76-AC81 and MCQ recalls AC79-AC81, with keys and why.</div></div>' +
      '<p class="minih">Sections</p><div class="stations">' + secs + '</div>' +
      '<p class="disc">' + D.meta.disc + '</p></article>';
  }
  function cardSec(it) {
    var s = it.sec, cnt = {};
    s.items.forEach(function (x) { cnt[x.t] = (cnt[x.t] || 0) + 1; });
    var toc = s.items.filter(function (x) { return x.t !== 'p'; }).map(function (x) { return '<li><span class="tid">' + esc(x.id) + '</span>' + esc(x.title) + '</li>'; }).join('');
    return '<article class="card secard"><div class="eyebrow"><span class="id">' + s.id + '</span><span class="chip kind">' + esc(s.course) + ' · Lecture</span><span class="sp"></span><span>' + esc(s.date) + '</span></div>' +
      '<h2>' + esc(s.title) + '</h2><p class="meta">' + esc(s.lect) + ' · handout: ' + esc(s.hname) + '</p>' +
      '<p class="lede">' + esc(s.blurb) + '</p>' +
      '<div class="stats"><div><b>' + (cnt.c || 0) + '</b>concepts</div><div><b>' + (cnt.s || 0) + '</b>cadaver steps</div><div><b>' + (cnt.v || 0) + '</b>lab clips</div><div><b>' + (cnt.p || 0) + '</b>spot stations</div></div>' +
      '<p class="minih">By the end you can</p><ul class="objs">' + s.obj.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul>' +
      '<p class="minih">Cards</p><ul class="toc">' + toc + '</ul></article>';
  }
  var KN = { a: 'artery', v: 'vein', n: 'nerve', g: 'ganglion', l: 'lymph', s: 'dural sinus', t: 'target / organ', o: 'opening', c: 'space', r: 'airway', m: 'muscle', b: 'bone / cartilage / joint', d: 'membrane / meninges' };
  function flowLines(lt) {
    lt = lt || [];
    var s = '<span class="ln"><svg width="26" height="10" aria-hidden="true"><path d="M1 5H18" stroke="currentColor" stroke-width="1.6"/><path d="M25 5l-8-4v8z" fill="currentColor"/></svg>one-way: branch or drainage</span>';
    if (lt.indexOf('conn') >= 0) s += '<span class="ln conn"><svg width="34" height="10" aria-hidden="true"><path d="M8 5H26" stroke="currentColor" stroke-width="2.2"/><path d="M1 5l8-4v8z M33 5l-8-4v8z" fill="currentColor"/></svg>two-way connection (anastomosis, valveless vein, fibres join)</span>';
    if (lt.indexOf('rel') >= 0) s += '<span class="ln"><svg width="28" height="10" aria-hidden="true"><path d="M2 5H26" stroke="currentColor" stroke-width="1.8" stroke-dasharray=".1 4.5" stroke-linecap="round"/></svg>dotted: lies next to it, not connected</span>';
    return s;
  }
  function flowBox(it) {
    var F = it.flows || [];
    if (!F.length) return '';
    var tabs = F.length > 1 ? '<div class="ftabs" role="group" aria-label="Flowcharts">' + F.map(function (f, k) { return '<button type="button" data-fk="' + k + '" aria-pressed="' + (k ? 'false' : 'true') + '">' + esc(f.title) + '</button>'; }).join('') + '</div>' : '';
    var tools = '<span class="ftools">' + (TUTOR ? '' : '<button type="button" class="btn small" data-act="fquiz" aria-pressed="false">Hide names</button>') + '<button type="button" class="btn small" data-act="fzoom">Expand</button></span>';
    var panels = F.map(function (f, k) {
      var lg = '<div class="flegend">' + f.legend.map(function (x) { return '<span style="--c:var(--fk-' + x + ');--b:var(--fk-' + x + '-bg)">' + KN[x] + '</span>'; }).join('') + flowLines(f.links) + '</div>';
      return '<div class="fpanel' + (k ? '' : ' on') + '" data-fk="' + k + '">' + (F.length > 1 ? '' : '<p class="ftitle">' + esc(f.title) + '</p>') +
        '<div class="fsvg">' + f.svg + '</div><div class="finfo">Click a box to trace what it comes from and what it gives.</div>' + lg +
        (TUTOR && f.th ? '<div class="fth"><div class="tp-head">อธิบายแผนภาพ · say</div>' + esc(f.th) + '</div>' : '') + '</div>';
    }).join('');
    return '<div class="flowbox"><div class="fhead"><span class="fh">Connection map</span>' + tabs + tools + '</div>' + panels + '</div>';
  }
  function flowWide(it) { return (it.flows || []).some(function (f) { return f.w > 860; }); }
  function cardConcept(it) {
    var F = it.figs || [], figs = '';
    if (F.length) {
      figs = fig(F[0], 'main');
      if (F.length > 1) figs += '<div class="thumbs">' + F.map(function (f, k) { return '<img src="' + esc(f.src) + '" alt="" data-swap="' + k + '"' + (k ? '' : ' class="cur"') + '>'; }).join('') + '</div>';
    }
    if (it.flows && it.flows.length) return '<article class="card concept" data-id="' + esc(it.id) + '">' + eyebrow(it, '<span class="chip kind">Concept</span>') +
      '<h2>' + esc(it.title) + '</h2>' + tnotes(it) + '<div class="fpair' + (flowWide(it) ? ' stack' : '') + '"><div class="figs">' + figs + '</div>' + flowBox(it) + '</div>' +
      '<div class="lt cbody">' + it.body + '</div>' + thai(it) + '</article>';
    return '<article class="card concept" data-id="' + esc(it.id) + '">' + eyebrow(it, '<span class="chip kind">Concept</span>') +
      '<h2>' + esc(it.title) + '</h2>' + tnotes(it) +
      '<div class="cgrid' + (figs ? '' : ' nofig') + '"><div class="lt cbody">' + it.body + '</div>' + (figs ? '<div class="figs">' + figs + '</div>' : '') + '</div>' + thai(it) + '</article>';
  }
  function cardStep(it) {
    var hasF = !!(it.flows && it.flows.length);
    var cad = fig(it.cad, 'cadimg vw-cad') + (it.cad2 ? fig(it.cad2, 'cadimg vw-cad') : '');
    var cmp = (it.cmp || []).map(function (f) { return fig(f, 'vw-cmp'); }).join('');
    var labels = it.labels.map(function (l) { return '<li><span class="no">' + esc(l[0]) + '</span><span class="nm" tabindex="0">' + esc(l[1]) + '</span></li>'; }).join('');
    var vid = it.vid ? '<div class="thumbrow">' + (it.vid.src ? '<img src="' + esc(it.vid.src) + '" alt="" data-cap="' + esc(it.vid.cap) + '">' : '') + '<span class="vlink">Lab clip ' + esc(it.vid.clip) + ' @ ' + esc(it.vid.ts) + ' — ' + esc(it.vid.note || '') + '</span></div>' : '';
    return '<article class="card step" data-id="' + esc(it.id) + '">' + eyebrow(it, '<span class="chip cad">Cadaver step</span>', '<span class="chip src">' + esc(it.refs.split(' · ')[0]) + '</span>') +
      '<h2>' + esc(it.title) + '</h2>' + tnotes(it) + '<p class="instr">' + esc(it.instr) + '</p>' +
      '<div class="viewtabs" role="group" aria-label="Image">' + (hasF ? '<button type="button" data-v="flow" aria-pressed="true">Cadaver + flowchart</button>' : '') + '<button type="button" data-v="side" aria-pressed="' + (hasF ? 'false' : 'true') + '">Cadaver + lecture</button><button type="button" data-v="cad" aria-pressed="false">Cadaver</button><button type="button" data-v="cmp" aria-pressed="false">Lecture diagram</button></div>' +
      '<div class="sgrid' + (hasF ? ' wide' : '') + '"><div class="views' + (hasF ? (flowWide(it) ? ' fstack' : '') : ' side') + '" data-v="' + (hasF ? 'flow' : 'side') + '"><div class="vw-cad figs">' + cad + '</div><div class="vw-cmp figs">' + cmp + '</div>' + (hasF ? '<div class="vw-flow">' + flowBox(it) + '</div>' : '') + '</div>' +
      '<div class="lblside"><div class="lblcol"><p class="side-h">Name each number</p><div class="lbltools"><button type="button" class="btn small" data-act="lblall">Reveal all</button><button type="button" class="btn small" data-act="lblhide">Hide all</button></div><ol class="labels">' + labels + '</ol>' +
      (it.note ? '<p class="refs">' + esc(it.note) + '</p>' : '') + '</div>' +
      '<div class="relcol"><div class="rel"><h4>Important relationships</h4><ul>' + it.rel.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>' + vid + '<p class="refs">' + esc(it.refs) + '</p></div></div></div></article>';
  }
  function cardVid(it) {
    var fr = (it.frames || []).map(function (f) { return '<figure><img loading="lazy" src="' + esc(f.src) + '" alt="" data-cap="' + esc(it.clip + ' @ ' + f.ts) + '"><span class="ts">' + esc(f.ts) + '</span></figure>'; }).join('');
    var kp = it.pts.map(function (p) { return '<li><span class="ts">' + esc(p[0]) + '</span><span>' + esc(p[1]) + '</span></li>'; }).join('');
    var my = it.fixes.map(function (f, k) {
      return '<div class="myth" data-k="' + k + '"><div class="mh">Heard in the lab @ ' + esc(f[0]) + ' · myth or fact?</div><p class="heard">' + esc(f[1]) + '</p><div class="tf"><button type="button" class="btn small" data-tf="1">Fact</button><button type="button" class="btn small" data-tf="0">Myth</button></div><div class="fixtxt"><b>Myth.</b> ' + esc(f[2]) + '</div></div>';
    }).join('');
    return '<article class="card vcard" data-id="' + esc(it.id) + '">' + eyebrow(it, '<span class="chip vid">Lab clip</span>', '<span class="chip src">' + esc(it.clip) + ' · ' + esc(it.dur) + '</span>') +
      '<h2>' + esc(it.title) + '</h2>' + (fr ? '<div class="frames">' + fr + '</div>' : '') +
      '<p class="side-h">Key points (timestamps in the clip)</p><ul class="kp">' + kp + '</ul>' + my +
      '<p class="refs">Transcribed with faster-whisper large-v3 (Thai + English) on the RTX 3070 Ti; quotes paraphrased and corrected against the handouts.</p></article>';
  }
  function cardSpot(it) {
    var qs = it.qs.map(function (q, k) {
      var body;
      if (q.o) {
        body = '<ul class="opts">' + q.o.map(function (o, j) { return '<li><button type="button" class="opt' + (j === q.a ? ' isans' : '') + '" data-j="' + j + '"><span class="L">' + LET[j] + '</span><span>' + esc(o) + '</span><span class="mk"></span></button></li>'; }).join('') + '</ul>' +
          '<div class="explain"><div class="ans">Answer: ' + LET[q.a] + ' · ' + esc(q.o[q.a]) + '</div><p>' + esc(q.ex || '') + '</p></div>';
      } else {
        body = (TUTOR ? '' : '<div class="sa-row"><input type="text" placeholder="Type your answer, then reveal" aria-label="Your answer"><button type="button" class="btn small" data-act="sa">Reveal</button></div>') +
          '<div class="sa-key"><div class="ans">' + esc(q.a) + '</div>' + (q.ex ? '<p>' + esc(q.ex) + '</p>' : '') + '<div class="yours"></div></div>';
      }
      return '<div class="sq" data-k="' + k + '"><div><span class="qn">' + LET[k] + '.</span><span class="qt">' + esc(q.q) + '</span></div>' + body + '</div>';
    }).join('');
    return '<article class="card spot' + (it.mcq ? ' mcq' : '') + '" data-id="' + esc(it.id) + '">' + eyebrow(it, '<span class="chip spot">' + (it.mcq ? 'Past MCQ' : 'Spot station') + '</span>', '<span class="chip src">' + esc(it.set) + '</span>') +
      (it.img ? '<div class="spotimg"><img loading="lazy" src="' + esc(it.img) + '" alt="' + (it.mcq ? 'Question figure' : 'Spot station image') + '" data-cap="' + esc(it.set + ' · ' + it.id) + '"></div>' : '') + qs + '</article>';
  }
  function render(it) {
    if (it.t === 'start') return cardStart();
    if (it.t === 'sec') return cardSec(it);
    if (it.t === 'c') return cardConcept(it);
    if (it.t === 's') return cardStep(it);
    if (it.t === 'v') return cardVid(it);
    if (it.t === 'p') return cardSpot(it);
    return '';
  }

  /* ---------- present mode ---------- */
  var stage = $('#stage');
  function cur() { return LIST[state.i]; }
  function remaining() {
    var c = stage.firstElementChild; if (!c) return 0;
    var it = cur();
    if (it.t === 'c') return c.querySelectorAll('.cz:not(.on)').length;
    if (it.t === 's') return c.querySelectorAll('.labels .nm:not(.on)').length;
    if (it.t === 'p') return c.querySelectorAll('.sq:not(.rev)').length;
    if (it.t === 'v') return c.querySelectorAll('.myth:not(.rev)').length;
    return 0;
  }
  function updPager() {
    var it = cur(), n = remaining();
    var rb = $('#reveal');
    if (rb) {
      rb.disabled = TUTOR || n === 0;
      rb.textContent = n ? (it.t === 'p' ? 'Reveal · ' + n + ' left' : 'Reveal next · ' + n + ' left') : 'Revealed';
      if (TUTOR) rb.textContent = 'Tutor view';
    }
    var secName = it.sec ? it.sec.short : 'Start';
    $('#pos').innerHTML = esc(secName) + ' · ' + (state.i + 1) + ' / ' + LIST.length + (it.id && it.t !== 'start' ? ' · <span>' + esc(it.id) + '</span>' : '');
    $('#progBar').style.width = (100 * (state.i + 1) / LIST.length) + '%';
    $('#prev').disabled = state.i === 0; $('#next').disabled = state.i === LIST.length - 1;
    document.querySelectorAll('.tab').forEach(function (t) { t.setAttribute('aria-current', String(!!(it.sec && t.dataset.sec === it.sec.id))); });
  }
  function show(i, noBroadcast) {
    state.i = Math.max(0, Math.min(LIST.length - 1, i));
    stage.innerHTML = render(cur());
    wire(stage);
    updPager(); save();
    if (location.hash.slice(1) !== cur().id) history.replaceState(null, '', '#' + cur().id);
    if (!noBroadcast && !TUTOR && bc) bc.postMessage({ id: cur().id });
    window.scrollTo(0, 0);
  }
  function revealNext(all) {
    var c = stage.firstElementChild, it = cur(); if (!c) return;
    if (it.t === 'c') { var z = c.querySelectorAll('.cz:not(.on)'); (all ? Array.prototype.slice.call(z) : [z[0]]).forEach(function (e) { if (e) e.classList.add('on'); }); }
    else if (it.t === 's') { var l = c.querySelectorAll('.labels .nm:not(.on)'); (all ? Array.prototype.slice.call(l) : [l[0]]).forEach(function (e) { if (e) e.classList.add('on'); }); }
    else if (it.t === 'p') { var q = c.querySelectorAll('.sq:not(.rev)'); (all ? Array.prototype.slice.call(q) : [q[0]]).forEach(function (e) { if (e) revealQ(e); }); }
    else if (it.t === 'v') { var m = c.querySelectorAll('.myth:not(.rev)'); (all ? Array.prototype.slice.call(m) : [m[0]]).forEach(function (e) { if (e) e.classList.add('rev'); }); }
    updPager();
  }
  function revealQ(sq) {
    sq.classList.add('rev');
    var inp = sq.querySelector('input'); var y = sq.querySelector('.yours');
    if (inp && y) y.textContent = inp.value.trim() ? 'Your answer: ' + inp.value.trim() : '';
  }

  /* ---------- wiring inside a card ---------- */
  function wire(root) {
    root.querySelectorAll('.cz').forEach(function (e) { e.addEventListener('click', function () { e.classList.toggle('on'); updPager(); }); });
    root.querySelectorAll('.labels .nm').forEach(function (e) {
      var f = function () { e.classList.toggle('on'); updPager(); };
      e.addEventListener('click', f); e.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') f(); });
    });
    root.querySelectorAll('[data-act="lblall"]').forEach(function (b) { b.addEventListener('click', function () { b.closest('.card').querySelectorAll('.labels .nm').forEach(function (e) { e.classList.add('on'); }); updPager(); }); });
    root.querySelectorAll('[data-act="lblhide"]').forEach(function (b) { b.addEventListener('click', function () { b.closest('.card').querySelectorAll('.labels .nm').forEach(function (e) { e.classList.remove('on'); }); updPager(); }); });
    root.querySelectorAll('.viewtabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        var card = b.closest('.card'), v = b.dataset.v, views = card.querySelector('.views');
        card.querySelectorAll('.viewtabs button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        views.dataset.v = v; views.classList.toggle('side', v === 'side'); card.querySelector('.sgrid').classList.toggle('wide', v === 'flow');
      });
    });
    root.querySelectorAll('.sq .opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var sq = b.closest('.sq'); if (sq.classList.contains('rev') || TUTOR) return;
        sq.querySelectorAll('.opt').forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); revealQ(sq); updPager();
      });
    });
    root.querySelectorAll('[data-act="sa"]').forEach(function (b) { b.addEventListener('click', function () { revealQ(b.closest('.sq')); updPager(); }); });
    root.querySelectorAll('.sa-row input').forEach(function (inp) { inp.addEventListener('keydown', function (ev) { ev.stopPropagation(); if (ev.key === 'Enter') { revealQ(inp.closest('.sq')); updPager(); } }); });
    root.querySelectorAll('.myth [data-tf]').forEach(function (b) {
      b.addEventListener('click', function () { var m = b.closest('.myth'); m.classList.add('rev'); b.classList.add(b.dataset.tf === '0' ? 'good' : 'bad'); updPager(); });
    });
    root.querySelectorAll('img[data-cap]').forEach(function (im) { im.addEventListener('click', function () { zoom(im.currentSrc || im.src, im.dataset.cap); }); });
    root.querySelectorAll('.thumbs img').forEach(function (t) {
      t.addEventListener('click', function () {
        var card = t.closest('.card'), it = BYID[card.dataset.id], f = it.figs[+t.dataset.swap], m = card.querySelector('.fig.main');
        var im = m.querySelector('img'); im.src = f.src; im.dataset.cap = f.cap; im.alt = f.cap; m.querySelector('figcaption').textContent = f.cap;
        card.querySelectorAll('.thumbs img').forEach(function (x) { x.classList.toggle('cur', x === t); });
      });
    });
    root.querySelectorAll('[data-go]').forEach(function (b) { b.addEventListener('click', function () { go(b.dataset.go); }); });
    root.querySelectorAll('.flowbox').forEach(wireFlow);
  }
  function wireFlow(box) {
    box.querySelectorAll('.ftabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        box.querySelectorAll('.ftabs button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        box.querySelectorAll('.fpanel').forEach(function (p) { p.classList.toggle('on', p.dataset.fk === b.dataset.fk); });
      });
    });
    var q = box.querySelector('[data-act="fquiz"]');
    if (q) q.addEventListener('click', function () {
      var on = !box.classList.contains('fq'); box.classList.toggle('fq', on); q.setAttribute('aria-pressed', String(on)); q.textContent = on ? 'Show names' : 'Hide names';
      box.querySelectorAll('.fn.rv').forEach(function (n) { n.classList.remove('rv'); });
    });
    var z = box.querySelector('[data-act="fzoom"]');
    if (z) z.addEventListener('click', function () { var p = box.querySelector('.fpanel.on'); zoomSvg(p.querySelector('.fsvg').innerHTML, (p.querySelector('.ftitle') || box.querySelector('.ftabs [aria-pressed="true"]') || {}).textContent || ''); });
    box.querySelectorAll('.fpanel').forEach(function (p) {
      var svg = p.querySelector('svg'), info = p.querySelector('.finfo'), E = [];
      if (!svg) return;
      svg.querySelectorAll('.fe').forEach(function (e) { E.push({ a: e.dataset.a, b: e.dataset.b, el: e }); });
      var L = []; svg.querySelectorAll('.fl-link').forEach(function (l) { L.push({ a: l.dataset.a, b: l.dataset.b, lab: l.dataset.lab || '', rel: l.classList.contains('rel'), el: l }); });
      var byId = {}; svg.querySelectorAll('.fn').forEach(function (n) { byId[n.dataset.n] = n; });
      var cur = null;
      function trace(id) {
        var keep = {}; keep[id] = 1;
        var up = [id], dn = [id], k;
        while (up.length) { k = up.pop(); E.forEach(function (e) { if (e.b === k && !keep[e.a]) { keep[e.a] = 1; up.push(e.a); } }); }
        var kd = {}; kd[id] = 1;
        while (dn.length) { k = dn.pop(); E.forEach(function (e) { if (e.a === k && !kd[e.b]) { kd[e.b] = 1; keep[e.b] = 1; dn.push(e.b); } }); }
        return keep;
      }
      function chain(id) {
        var out = [byId[id].dataset.name], k = id, guard = 0;
        while (guard++ < 20) { var e = E.filter(function (x) { return x.b === k; })[0]; if (!e) break; out.unshift(byId[e.a].dataset.name); k = e.a; }
        return out;
      }
      function clear() { cur = null; svg.classList.remove('dim'); svg.querySelectorAll('.hl,.sel,.lkp').forEach(function (x) { x.classList.remove('hl', 'sel', 'lkp'); }); info.textContent = 'Click a box to trace what it comes from and what it gives.'; }
      function pick(n) {
        var id = n.dataset.n;
        if (box.classList.contains('fq') && !n.classList.contains('rv') && !n.classList.contains('root')) { n.classList.add('rv'); }
        if (cur === id) { clear(); return; }
        clear(); cur = id;
        var keep = trace(id);
        svg.classList.add('dim'); n.classList.add('sel');
        Object.keys(keep).forEach(function (k) { if (byId[k]) byId[k].classList.add('hl'); });
        E.forEach(function (e) { if (keep[e.a] && keep[e.b]) e.el.classList.add('hl'); });
        var lk = [];
        L.forEach(function (l) {
          if (!keep[l.a] && !keep[l.b]) return;
          l.el.classList.add('hl');
          var o = keep[l.a] ? l.b : l.a; if (!keep[o] && byId[o]) { byId[o].classList.add('hl'); if (!l.rel) byId[o].classList.add('lkp'); }
          if (l.a === id || l.b === id) { var p = l.a === id ? l.b : l.a; lk.push((l.rel ? '<span class="irl">lies next to <b>' : '<span class="ilk">⇄ two-way with <b>') + esc(byId[p].dataset.name) + '</b>' + (l.lab ? ' (' + esc(l.lab) + ')' : '') + '</span>'); }
        });
        var hidden = box.classList.contains('fq');
        var c = chain(id).map(function (x, i, arr) { return i === arr.length - 1 ? '<b>' + esc(x) + '</b>' : esc(x); });
        info.innerHTML = (hidden ? '' : c.join(' → ')) + (n.dataset.note ? (hidden ? '' : ' · ') + '<span>' + esc(n.dataset.note) + '</span>' : '');
        if (hidden && !n.dataset.note) info.innerHTML = '<b>' + esc(n.dataset.name) + '</b>';
        if (!hidden && lk.length) info.innerHTML += ' · ' + lk.join(' · ');
      }
      svg.querySelectorAll('.fn').forEach(function (n) {
        n.addEventListener('click', function (ev) { ev.stopPropagation(); pick(n); });
        n.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.stopPropagation(); ev.preventDefault(); pick(n); } });
      });
      svg.addEventListener('click', function () { clear(); });
    });
  }

  /* ---------- zoom ---------- */
  var Z = $('#zoom');
  function zoom(src, cap) { var zp = Z.querySelector('.zpaper'); if (!zp.querySelector('img')) zp.innerHTML = '<img alt="">'; Z.querySelector('img').src = src; Z.querySelector('.zcap').textContent = cap || ''; Z.hidden = false; }
  function zoomSvg(svg, cap) { Z.querySelector('.zpaper').innerHTML = svg; Z.querySelector('.zcap').textContent = cap || ''; Z.hidden = false; }
  Z.addEventListener('click', function () { Z.hidden = true; });

  /* ---------- browse ---------- */
  function renderBrowse() {
    var q = state.q.toLowerCase(), out = '', n = 0;
    D.sections.forEach(function (s) {
      var items = s.items.filter(function (it) {
        if (state.kind !== 'all' && it.t !== state.kind) return false;
        if (!q) return true;
        return (it.id + ' ' + (it.title || '') + ' ' + JSON.stringify(it.qs || it.labels || it.pts || it.body || '')).toLowerCase().indexOf(q) >= 0;
      });
      if (!items.length) return;
      n += items.length;
      out += '<section class="bsec"><header id="b-' + s.id + '"><div class="eyebrow"><span class="id">' + s.id + '</span><span class="chip kind">' + esc(s.course) + '</span></div><h2>' + esc(s.title) + '</h2><p>' + esc(s.blurb) + '</p></header>' + items.map(render).join('') + '</section>';
    });
    var bl = $('#blist'); bl.innerHTML = out || '<p>No match.</p>'; wire(bl);
    $('#bcount').textContent = n + ' cards';
  }
  function setView(v) {
    state.view = v;
    $('#present').hidden = v !== 'present'; $('#browse').hidden = v !== 'browse';
    $('#vPresent').setAttribute('aria-pressed', String(v === 'present')); $('#vBrowse').setAttribute('aria-pressed', String(v === 'browse'));
    if (v === 'browse') renderBrowse(); else show(state.i, true);
  }

  /* ---------- nav ---------- */
  function go(id) {
    var k = LIST.findIndex(function (x) { return x.id === id; });
    if (k < 0) { state.kind = 'all'; setKind('all'); k = LIST.findIndex(function (x) { return x.id === id; }); }
    if (state.view !== 'present') setView('present');
    show(k < 0 ? 0 : k);
  }
  function setKind(k) {
    var id = (LIST[state.i] || {}).id; state.kind = k; build();
    document.querySelectorAll('#filt button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === k)); });
    var j = LIST.findIndex(function (x) { return x.id === id; });
    if (j < 0 && id) { var it = BYID[id]; j = LIST.findIndex(function (x) { return x.sec === it.sec && x.t === 'sec'; }); }
    state.i = Math.max(0, j);
    if (state.view === 'browse') renderBrowse(); else show(state.i, true);
  }
  // tabs
  $('#tabs').innerHTML = D.sections.map(function (s) { return '<button type="button" class="tab" data-sec="' + s.id + '"><span class="k">' + s.id + '</span>' + esc(s.short) + '</button>'; }).join('');
  document.querySelectorAll('.tab').forEach(function (t) { t.addEventListener('click', function () { if (state.view === 'browse') { var h = $('#b-' + t.dataset.sec); if (h) h.scrollIntoView({ behavior: 'smooth' }); } else go(t.dataset.sec + '-0'); }); });
  $('#filt').innerHTML = '<button type="button" data-k="all">All</button>' + Object.keys(KINDS).map(function (k) { return '<button type="button" data-k="' + k + '">' + KINDS[k] + '</button>'; }).join('');
  document.querySelectorAll('#filt button').forEach(function (b) { b.addEventListener('click', function () { setKind(b.dataset.k); }); });
  $('#prev').addEventListener('click', function () { show(state.i - 1); });
  $('#next').addEventListener('click', function () { show(state.i + 1); });
  var rv = $('#reveal'); if (rv) rv.addEventListener('click', function () { revealNext(false); });
  $('#vPresent').addEventListener('click', function () { setView('present'); });
  $('#vBrowse').addEventListener('click', function () { setView('browse'); });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value; renderBrowse(); });
  var sa = $('#showAll'); if (sa) sa.addEventListener('change', function () { $('#blist').classList.toggle('showall', sa.checked); });
  $('#themeBtn').addEventListener('click', function () {
    var r = document.documentElement, dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    r.dataset.theme = dark ? 'light' : 'dark'; try { localStorage.setItem('anat101:theme', r.dataset.theme); } catch (e) {}
  });
  try { var th = localStorage.getItem('anat101:theme'); if (th) document.documentElement.dataset.theme = th; } catch (e) {}
  $('#fsBtn').addEventListener('click', function () { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); });
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (!Z.hidden && e.key === 'Escape') { Z.hidden = true; return; }
    if (e.key === 'b' || e.key === 'B') { setView(state.view === 'present' ? 'browse' : 'present'); return; }
    if (state.view !== 'present') return;
    var c = stage.firstElementChild, it = cur();
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { show(state.i + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { show(state.i - 1); e.preventDefault(); }
    else if (e.key === ' ') { if (remaining()) revealNext(false); else show(state.i + 1); e.preventDefault(); }
    else if (e.key === 'Enter') { revealNext(true); e.preventDefault(); }
    else if (e.key === 'r' || e.key === 'R') { show(state.i, true); }
    else if (e.key === 'l' || e.key === 'L') { var d = c && c.querySelector('details.thx'); if (d) d.open = !d.open; }
    else if (it && it.t === 'p' && /^[a-hA-H]$/.test(e.key)) {
      var sq = c.querySelector('.sq:not(.rev)'); if (!sq) return;
      var b = sq.querySelector('.opt[data-j="' + (e.key.toUpperCase().charCodeAt(0) - 65) + '"]'); if (b) b.click();
    }
  });

  /* ---------- follow student (tutor) ---------- */
  var bc = null; try { bc = new BroadcastChannel('anat101-' + D.meta.deck); } catch (e) {}
  if (TUTOR && bc) bc.onmessage = function (m) { var f = $('#follow'); if (f && f.checked && m.data && m.data.id) go(m.data.id); };

  window.addEventListener('hashchange', function () { var h = location.hash.slice(1); if (h && (!cur() || cur().id !== h) && BYID[h]) go(h); });
  /* ---------- start ---------- */
  build();
  var start = location.hash.slice(1);
  var i0 = start ? LIST.findIndex(function (x) { return x.id === start; }) : -1;
  document.querySelectorAll('#filt button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === state.kind)); });
  show(i0 < 0 ? 0 : i0, true);
})();
