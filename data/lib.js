/* Shared registry for both pages (deck + tutor notes) and print.js.
   Concept-card HTML may mark key details as {{blanks}}: they render as click-to-reveal cloze spans.
   CVS.fig(name, caption, pdf, page[, cls]) builds a click-to-zoom course figure from img/<name>.jpg
   (sizes from data/figs.js). */
window.CVS = {
  sections: [],
  dims: {},
  SRC: {
    back: 'Back &amp; vertebral column slides',
    spimg: 'Imaging of vertebral column &amp; spinal cord slides',
    tissue: 'Nervous tissue slides',
    cord: 'Spinal cord &amp; peripheral nerve slides',
    skull: 'Skull slides',
    face: 'Superficial face &amp; neck slides',
    deepface: 'Deep structures of face slides',
    oral: 'Oral cavity &amp; floor of mouth slides',
    neck: 'Deep structures of neck slides',
    cranial: 'Structures within cranial cavity slides',
    memb: 'Membrane potential slides',
    nmj: 'Physiology of nerve &amp; NMJ slides',
    lab: 'Lab nerve &amp; NMJ slides',
    ansphys: 'ANS physiology slides',
    ansreg: 'ANS integration &amp; regulation slides',
    eye: 'Eye &amp; orbit slides',
    reflex: 'Physiology of reflex slides',
    light: 'Light in Medicine slides',
    ac80: 'AC80 NS I MCQ recall',
    ac81: 'AC81 NS I MCQ recall',
    ac81s: 'AC81 NS I spot test recall',
    ac79s: 'AC79 spot II (back, head &amp; neck) recall',
    ear: 'Ear slides',
    anshn: 'ANS of head &amp; neck slides',
    sound: 'Physics of sound &amp; hearing 2026 slides',
    sgd: 'SGD wrap-up slides'
  },

  cloze: function (h) { return String(h).replace(/\{\{([\s\S]*?)\}\}/g, '<span class="cz">$1</span>'); },
  fig: function (name, cap, pdf, page, cls) {
    var d = this.dims[name];
    if (!d) throw new Error('no image ' + name);
    var alt = String(cap).replace(/<[^>]+>/g, '').replace(/"/g, '&quot;');
    return '<figure class="scan' + (cls ? ' ' + cls : '') + '"><div class="paperimg"><img src="img/' + name + '.jpg" width="' + d[0] + '" height="' + d[1] + '" alt="' + alt + '" loading="lazy" decoding="async"></div><figcaption>' + cap + ' <span class="src">' + (this.SRC[pdf] || pdf) + ', p.' + page + '</span></figcaption></figure>';
  },
  /* A figure that gives away the card's blanks: collapsed under a summary line (closed in the PDF too). */
  ans: function (fig, label) { return '<details class="figans"><summary>' + (label || 'The slide (shows the answers)') + '</summary>' + fig + '</details>'; },
  /* Options are written with the answer first; shuffle them once, the same way everywhere (seeded by the item ID).
     Options such as "None ..." or "All ..." stay last. Set keep: true to leave an item's order alone. */
  shuffle: function (it) {
    if (it.t !== 'q' || it.keep) return;
    var h = 2166136261, i;
    for (i = 0; i < it.id.length; i++) { h ^= it.id.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    var rnd = function () { h = (h + 0x6D2B79F5) >>> 0; var t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    var idx = it.o.map(function (o, k) { return k; });
    var free = idx.filter(function (k) { return !/^(None|All |Both |Neither )/.test(it.o[k]); });
    var tail = idx.filter(function (k) { return free.indexOf(k) < 0; });
    for (i = free.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = free[i]; free[i] = free[j]; free[j] = t; }
    var order = free.concat(tail), A = [].concat(it.a);
    it.o = order.map(function (k) { return it.o[k]; });
    var na = A.map(function (a) { return order.indexOf(a); });
    it.a = Array.isArray(it.a) ? na : na[0];
  },
  add: function (sec) {
    sec.items.forEach(function (it) { if (it.html) it.html = window.CVS.cloze(it.html); window.CVS.shuffle(it); });
    this.sections.push(sec);
  },
  /* Past-paper questions (data/past*.js): insert items after concept card cid and any questions already placed after it.
     Past-paper options keep the recalled order (keep: true by default); a is the index of the key. */
  after: function (cid, items) {
    var S = this.sections, s, i, j;
    for (s = 0; s < S.length; s++) { i = S[s].items.map(function (x) { return x.id; }).indexOf(cid); if (i >= 0) break; }
    if (s === S.length) throw new Error('CVS.after: no card ' + cid);
    for (j = i + 1; j < S[s].items.length && S[s].items[j].t !== 'c'; j++);
    items.forEach(function (it) { if (it.t === undefined) it.t = 'q'; if (it.keep === undefined) it.keep = true; window.CVS.shuffle(it); });
    S[s].items.splice.apply(S[s].items, [j, 0].concat(items));
  }
};
