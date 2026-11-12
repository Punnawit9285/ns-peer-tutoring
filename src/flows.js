/* Interactive flowcharts on concept cards: a card places <div class="flowx" data-flow="nmj"></div> (P-C4),
   "horner" (G-C1), "facial" (X-C5) or "audio" (S-C6); this file fills it in both decks (a MutationObserver
   mounts every new placeholder). Click a box to read why that step exists; load a case to walk its path
   one step at a time. print.js calls FLOWS.printHtml(name) for a static copy of the chart. */
(function () {
  var F = window.FLOWS = {};
  var ST = {};  /* widget state per flow name, kept while the page is open */
  function ul(a) { return '<ul>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }

  /* ---------- SVG drawing ---------- */
  function wrapText(x, y, lines, cls, lh) {
    return lines.map(function (t, i) { return '<text class="' + cls + '" x="' + x + '" y="' + (y + i * lh) + '" text-anchor="middle">' + t + '</text>'; }).join('');
  }
  function drawNode(n, st) {
    var cls = 'fx-node k-' + n.k + (st.on[n.id] ? ' on' : '') + (st.cur === n.id ? ' cur' : '') + (st.sel === n.id ? ' sel' : '') + (st.dim && !st.on[n.id] ? ' dim' : '');
    var cx = n.x + n.w / 2, t = n.t, s = n.s || [];
    var top = n.ty ? n.y + n.ty : n.y + n.h / 2 - ((t.length - 1) * 18 + (s.length ? 6 + s.length * 15 : 0)) / 2 + 6;
    var h = '<g class="' + cls + '" data-n="' + n.id + '" tabindex="0" role="button" aria-label="' + (t.join(' ') + ' ' + s.join(' ')).replace(/<[^>]+>/g, '') + '">';
    h += '<rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="' + (n.k === 'q' ? 6 : 12) + '"/>';
    h += wrapText(cx, top, t, 'fx-t', 18) + wrapText(cx, top + (t.length - 1) * 18 + 19, s, 'fx-s', 15);
    var v = st.val[n.id];
    if (v) {
      var w = Math.max(48, v.replace(/&[a-z]+;/g, 'x').length * 7.1 + 16), px = n.x + n.w - w - 6, py = n.y - 11;  /* top-right corner, clear of the arrows */
      h += '<g class="fx-pill"><rect x="' + px + '" y="' + py + '" width="' + w + '" height="20" rx="10"/><text x="' + (px + w / 2) + '" y="' + (py + 14.5) + '" text-anchor="middle">' + v + '</text></g>';
    }
    return h + '</g>';
  }
  function drawEdge(e, st) {
    var key = e.f + '>' + e.to, on = st.onE[key];
    var d = 'M' + e.p.map(function (p) { return p[0] + ' ' + p[1]; }).join(' L');
    var h = '<g class="fx-edge' + (on ? ' on' : '') + (st.dim && !on ? ' dim' : '') + (e.dash ? ' dash' : '') + '"><path d="' + d + '" marker-end="url(#fxa-' + st.name + (on ? '-on' : '') + ')"/>';
    if (e.l) h += '<text x="' + e.l[0] + '" y="' + e.l[1] + '" text-anchor="middle">' + e.l[2] + '</text>';
    return h + '</g>';
  }
  function svg(def, st) {
    var h = '<svg class="fx-svg" viewBox="0 0 ' + def.W + ' ' + def.H + '" role="img" aria-label="' + def.label + '"><defs>' +
      ['', '-on'].map(function (sfx) { return '<marker id="fxa-' + st.name + sfx + '" class="fx-mk' + sfx + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker>'; }).join('') + '</defs>';
    def.E.forEach(function (e) { h += drawEdge(e, st); });
    def.N.forEach(function (n) { h += drawNode(n, st); });
    return h + '</svg>';
  }

  /* ================= NMJ: where does the signal fail? (Nerve & NMJ p.36, Lab p.40) ================= */
  var NMJ = { name: 'nmj', W: 900, H: 552, label: 'Where neuromuscular transmission can fail',
    N: [
      { id: 'ap', k: 'q', x: 30, y: 10, w: 380, h: 58, t: ['① Nerve AP runs down the axon?'], s: ['myelin + voltage-gated Na⁺ channels'] },
      { id: 'ca', k: 'q', x: 30, y: 98, w: 380, h: 58, t: ['② Ca²⁺ enters the terminal?'], s: ['voltage-gated Ca²⁺ channels'] },
      { id: 'rel', k: 'q', x: 30, y: 186, w: 380, h: 58, t: ['③ ACh is released?'], s: ['vesicles fuse with the membrane'] },
      { id: 'bind', k: 'q', x: 30, y: 274, w: 380, h: 58, t: ['④ ACh opens enough nAChRs?'], s: ['postsynaptic receptors'] },
      { id: 'epp', k: 'q', x: 30, y: 362, w: 380, h: 58, t: ['⑤ EPP reaches threshold and resets?'], s: ['Na⁺ channels must recover'] },
      { id: 'ok', k: 'leaf', x: 30, y: 452, w: 380, h: 84, t: ['⑥ Muscle AP → contraction'], s: ['normal transmission'] },
      { id: 'f1', k: 'leaf', x: 490, y: 10, w: 390, h: 58, t: ['Conduction fails'], s: ['GBS (demyelination) · tetrodotoxin'] },
      { id: 'f2', k: 'leaf', x: 490, y: 98, w: 390, h: 58, t: ['Ca²⁺ entry ↓ → release ↓'], s: ['Lambert–Eaton (LEMS)'] },
      { id: 'f3', k: 'leaf', x: 490, y: 186, w: 390, h: 58, t: ['Release blocked'], s: ['botulinum toxin'] },
      { id: 'f4', k: 'leaf', x: 490, y: 274, w: 390, h: 58, t: ['Receptors lost or blocked'], s: ['MG · atracurium · α-bungarotoxin'] },
      { id: 'f5', k: 'leaf', x: 490, y: 362, w: 390, h: 58, t: ['Persistent depolarisation'], s: ['succinylcholine · high ACh · AChE excess'] }
    ],
    E: [
      { f: 'ap', to: 'ca', p: [[220, 68], [220, 98]], l: [244, 88, 'yes'] },
      { f: 'ca', to: 'rel', p: [[220, 156], [220, 186]], l: [244, 176, 'yes'] },
      { f: 'rel', to: 'bind', p: [[220, 244], [220, 274]], l: [244, 264, 'yes'] },
      { f: 'bind', to: 'epp', p: [[220, 332], [220, 362]], l: [244, 352, 'yes'] },
      { f: 'epp', to: 'ok', p: [[220, 420], [220, 452]], l: [244, 441, 'yes'] },
      { f: 'ap', to: 'f1', p: [[410, 39], [490, 39]], l: [450, 31, 'no'] },
      { f: 'ca', to: 'f2', p: [[410, 127], [490, 127]], l: [450, 119, 'no'] },
      { f: 'rel', to: 'f3', p: [[410, 215], [490, 215]], l: [450, 207, 'no'] },
      { f: 'bind', to: 'f4', p: [[410, 303], [490, 303]], l: [450, 295, 'no'] },
      { f: 'epp', to: 'f5', p: [[410, 391], [490, 391]], l: [450, 383, 'no'] }
    ]
  };
  var NMJ_STEPS = ['ap', 'ca', 'rel', 'bind', 'epp'];
  var NMJ_CASES = [
    { k: 'gbs', b: 'GBS', src: 'Nerve & NMJ p.5, 15–17', v: { fail: 1, why: 'Antibodies after an infection strip peripheral <b>myelin</b> → current leaks → slow conduction → block → ascending weakness, areflexia.' } },
    { k: 'ttx', b: 'Tetrodotoxin', src: 'Nerve & NMJ p.30–31', v: { fail: 1, why: 'TTX blocks <b>voltage-gated Na⁺ channels</b> → no AP is generated or propagated.' } },
    { k: 'lems', b: 'LEMS', src: 'Nerve & NMJ p.28–29', v: { fail: 2, why: 'Antibodies (often with small-cell lung cancer) against presynaptic <b>voltage-gated Ca²⁺ channels</b> → less Ca²⁺ → less ACh. Proximal weakness that may improve with repeated activity.' } },
    { k: 'botox', b: 'Botulinum', src: 'Nerve & NMJ p.30', v: { fail: 3, why: 'Botulinum toxin blocks <b>ACh release</b> from the terminal → flaccid paralysis.' } },
    { k: 'mg', b: 'Myasthenia gravis', src: 'Nerve & NMJ p.24–25', v: { fail: 4, why: 'Thymus-derived antibodies block, internalise or damage <b>nAChRs</b> → smaller EPP → may miss threshold → fatigable ptosis, diplopia, dysphagia; worse late in the day.' } },
    { k: 'atra', b: 'Atracurium', src: 'Nerve & NMJ p.34', v: { fail: 4, why: 'Non-depolarising relaxant = nAChR <b>antagonist</b> → no EPP → flaccid paralysis, no fasciculation.' } },
    { k: 'sux', b: 'Succinylcholine', src: 'Nerve & NMJ p.34–35; Lab p.33', v: { fail: 5, why: 'Depolarising relaxant = nAChR <b>agonist</b> → fasciculation, then persistent depolarisation keeps Na⁺ channels inactivated → flaccid paralysis.' } },
    { k: 'op', b: 'Organophosphate', src: 'Nerve & NMJ p.32–33', v: { fail: 5, why: 'AChE blocked (essentially irreversibly) → ACh stays in the cleft → sustained depolarisation → fasciculation → weakness → paralysis.' } },
    { k: 'ok', b: 'Low-dose ACh (lab)', src: 'Lab p.34, 37', v: { fail: 0, why: 'A small dose of ACh simply activates nAChRs → EPP → muscle AP → contraction.' } }
  ];
  var NMJ_TXT = {
    ap: { h: 'Nerve action potential', b: ['Myelin raises Rm and lowers Cm → saltatory conduction.', 'Voltage-gated Na⁺ channels regenerate the AP at each node.'], th: 'ถ้าเส้นประสาทนำสัญญาณไม่ได้ (GBS, TTX) → สัญญาณไม่ถึงปลายประสาทเลย' },
    ca: { h: 'Ca²⁺ entry', b: ['AP opens presynaptic voltage-gated Ca²⁺ channels.', 'Ca²⁺ triggers vesicle fusion.'], th: 'LEMS = ปัญหาก่อน synapse → Ca²⁺ เข้าน้อย → ACh หลั่งน้อย' },
    rel: { h: 'ACh release', b: ['ACh vesicles fuse and empty into the cleft.'], th: 'Botulinum toxin ตัดขั้นนี้ → ไม่มี ACh ออกมา' },
    bind: { h: 'ACh binds nAChR', b: ['nAChR = ligand-gated cation channel on the end plate.', 'Fewer working receptors → smaller EPP.'], th: 'MG = ปัญหาหลัง synapse (receptor problem)' },
    epp: { h: 'End-plate potential', b: ['Graded, local, does not propagate.', 'Must reach threshold to open voltage-gated Na⁺ channels.', 'Persistent depolarisation keeps those channels inactivated.'], th: 'EPP คือตัวจุดชนวน ส่วน muscle AP คือสัญญาณที่วิ่งต่อ' },
    ok: { h: 'Muscle AP → contraction', b: ['All-or-none AP spreads over the muscle membrane.'] },
    f1: { h: 'Conduction failure', b: ['GBS: PNS demyelination after infection.', 'TTX: Na⁺ channel blocker.'] },
    f2: { h: 'Presynaptic Ca²⁺ problem', b: ['LEMS: release problem; may improve with repeated activity.'] },
    f3: { h: 'Release blocked', b: ['Botulinum toxin → flaccid paralysis.', 'Contrast tetanus toxin: blocks inhibitory GABA/glycine release → spastic paralysis.'] },
    f4: { h: 'Receptor failure', b: ['MG (autoimmune), atracurium (competitive antagonist), α-bungarotoxin (irreversible).'] },
    f5: { h: 'Too much depolarisation', b: ['Succinylcholine, high-dose ACh, AChE inhibitor excess.', 'Fasciculation first, then paralysis.'] }
  };
  function nmjPath(v) {
    var P = [], f = v.fail;
    for (var i = 0; i < NMJ_STEPS.length; i++) {
      var n = NMJ_STEPS[i];
      if (f === i + 1) { P.push({ n: n, e: 'f' + f, val: 'fails', why: 'Step ' + (i + 1) + ' fails here.' }); P.push({ n: 'f' + f, why: v.why }); return { steps: P, dx: NMJ_TXT['f' + f].h }; }
      P.push({ n: n, e: i < 4 ? NMJ_STEPS[i + 1] : 'ok', val: 'ok', why: NMJ_TXT[n].h + ' works.' });
    }
    P.push({ n: 'ok', why: v.why });
    return { steps: P, dx: 'Normal transmission' };
  }

  /* ================= Horner syndrome (ANS integration p.4–10; ANS H&N p.4–5; SGD case 2) ================= */
  var HOR = { name: 'horner', W: 900, H: 540, label: 'Horner syndrome: confirm, then localise',
    N: [
      { id: 'q1', k: 'q', x: 250, y: 8, w: 400, h: 62, t: ['① Ptosis + miosis + anhidrosis', 'on one side?'] },
      { id: 'cn3', k: 'leaf', x: 8, y: 104, w: 250, h: 74, t: ['Not Horner'], s: ['ptosis + big pupil →', 'think CN III (parasympathetic)'] },
      { id: 'q2', k: 'q', x: 300, y: 104, w: 300, h: 74, t: ['② Unsure? eye drops'], s: ['cocaine: does the small', 'pupil dilate?'] },
      { id: 'notH', k: 'leaf', x: 642, y: 104, w: 250, h: 74, t: ['Dilates →', 'sympathetic intact'], s: ['not Horner'] },
      { id: 'conf', k: 'note', x: 300, y: 212, w: 300, h: 62, t: ['Horner confirmed'], s: ['sympathetic loss to that side'] },
      { id: 'q3', k: 'q', x: 250, y: 310, w: 400, h: 62, t: ['③ Where are the other clues?'], s: ['brainstem · chest / T1 · neck / skull base'] },
      { id: 'n1', k: 'leaf', x: 8, y: 420, w: 280, h: 112, t: ['1st-order neuron'], s: ['hypothalamus → brainstem → cord', 'lateral medullary syndrome,', 'brain tumour'] },
      { id: 'n2', k: 'leaf', x: 310, y: 420, w: 280, h: 112, t: ['2nd-order (preganglionic)'], s: ['T1 → chain → superior', 'cervical ganglion', 'lung tumour, chain injury'] },
      { id: 'n3', k: 'leaf', x: 612, y: 420, w: 280, h: 112, t: ['3rd-order (postganglionic)'], s: ['along the internal carotid', 'carotid dissection,', 'cavernous sinus tumour'] }
    ],
    E: [
      { f: 'q1', to: 'cn3', p: [[300, 70], [300, 88], [133, 88], [133, 104]], l: [216, 82, 'no'] },
      { f: 'q1', to: 'q2', p: [[450, 70], [450, 104]], l: [470, 92, 'yes'] },
      { f: 'q2', to: 'notH', p: [[600, 141], [642, 141]], l: [621, 133, 'yes'] },
      { f: 'q2', to: 'conf', p: [[450, 178], [450, 212]], l: [466, 200, 'no'] },
      { f: 'conf', to: 'q3', p: [[450, 274], [450, 310]] },
      { f: 'q3', to: 'n1', p: [[300, 372], [300, 396], [148, 396], [148, 420]], l: [224, 390, 'brainstem'] },
      { f: 'q3', to: 'n2', p: [[450, 372], [450, 420]], l: [480, 400, 'chest / T1'] },
      { f: 'q3', to: 'n3', p: [[600, 372], [600, 396], [752, 396], [752, 420]], l: [676, 390, 'neck'] }
    ]
  };
  var HOR_CASES = [
    { k: 'lec', b: 'Lecture case (L eye)', src: 'ANS integration p.4–5, 11', v: { triad: 1, story: '40-year-old woman: left ptosis, left miosis, less sweating on the left face. No other clues given.', site: 0 } },
    { k: 'sgd', b: 'SGD: neck trauma', src: 'SGD wrap-up case 2, p.18–26', v: { triad: 1, story: '18-year-old after a motorcycle crash: bruised, swollen right neck; right ptosis 1–2 mm, right pupil 2 mm vs 3 mm, less sweating on the right forehead; light reflexes intact.', site: 3 } },
    { k: 'med', b: 'Lateral medulla', src: 'ANS integration p.7', v: { triad: 1, story: 'Brainstem stroke (lateral medullary syndrome) with Horner signs.', site: 1 } },
    { k: 'lung', b: 'Lung apex tumour', src: 'ANS integration p.7', v: { triad: 1, story: 'Tumour at the lung apex compressing the chain.', site: 2 } },
    { k: 'rab', b: 'Rabbit: cut trunk', src: 'ANS integration p.19, 24', v: { triad: 1, story: 'Rabbit lab: the cervical sympathetic trunk is cut below the superior cervical ganglion.', site: 2 } },
    { k: 'cn3', b: 'CN III palsy', src: 'ANS H&N p.9', v: { triad: 0, story: 'Mild ptosis, eye down and out, dilated pupil.' } }
  ];
  var HOR_TXT = {
    q1: { h: 'The triad', b: ['Ptosis: superior tarsal (Müller) muscle loses sympathetic tone (partial, levator still works).', 'Miosis: dilator pupillae loses tone.', 'Anhidrosis: sweat glands lose sympathetic supply.'], th: 'Horner = ระบบ sympathetic เสีย ไม่ใช่โรคของตา' },
    cn3: { h: 'Not Horner', b: ['CN III palsy: ptosis (levator), eye down and out, dilated pupil (sphincter lost).'], th: 'Horner รูม่านตาเล็ก · CN III รูม่านตาโต' },
    q2: { h: 'Confirm with drops', b: ['Cocaine blocks NE reuptake → normal pupil dilates; Horner pupil does not.', 'Apraclonidine: hypersensitive Horner iris dilates → anisocoria reverses.'] },
    notH: { h: 'Pupil dilates', b: ['NE is being released → sympathetic pathway intact → not Horner.'] },
    conf: { h: 'Horner confirmed', b: ['Next question: which of the three neurons?', 'Paredrine test localises pre- vs postganglionic.'] },
    q3: { h: 'Localise', b: ['Other neurological signs from the brainstem → 1st order.', 'Chest, lung apex, T1 → 2nd order.', 'Neck, internal carotid, cavernous sinus → 3rd order.'] },
    n1: { h: '1st-order neuron', b: ['Hypothalamospinal tract: brainstem and cervical cord.', 'Examples: lateral medullary syndrome, brain tumour.'] },
    n2: { h: '2nd-order (preganglionic)', b: ['Lateral horn T1 → white ramus → chain → superior cervical ganglion.', 'Example: lung (apex) tumour.'] },
    n3: { h: '3rd-order (postganglionic)', b: ['Superior cervical ganglion → plexus on the internal carotid → orbit.', 'Examples: carotid dissection, cavernous sinus tumour.'] }
  };
  var SITE = [null, 'n1', 'n2', 'n3'];
  function horPath(v) {
    var P = [];
    if (!v.triad) { P.push({ n: 'q1', e: 'cn3', val: 'no', why: v.story }); P.push({ n: 'cn3', why: 'Ptosis with a <b>dilated</b> pupil and a down-and-out eye = CN III palsy, not a sympathetic lesion.' }); return { steps: P, dx: 'CN III palsy, not Horner' }; }
    P.push({ n: 'q1', e: 'q2', val: 'yes', why: v.story + ' → <b>the triad is present</b>.' });
    P.push({ n: 'q2', e: 'conf', val: 'not needed', why: 'The clinical triad is clear here; cocaine or apraclonidine drops would confirm it if it were not.' });
    P.push({ n: 'conf', e: 'q3', why: '<b>Horner syndrome</b>: the sympathetic supply to that side of the face is lost.' });
    if (!v.site) { P.push({ n: 'q3', why: 'No localising clue is given, so the answer stops at <b>sympathetic pathway</b>: brain, cord, chain or carotid are all possible.' }); return { steps: P, dx: 'Horner syndrome: sympathetic pathway lesion' }; }
    var leaf = SITE[v.site];
    P.push({ n: 'q3', e: leaf, val: ['', 'brainstem', 'chest / T1', 'neck'][v.site], why: ['', 'Brainstem stroke → the central (hypothalamospinal) neuron.', 'Lesion between T1 and the superior cervical ganglion.', 'Neck injury next to the internal carotid → the postganglionic fibres riding on it.'][v.site] });
    P.push({ n: leaf, why: HOR_TXT[leaf].b.join(' ') });
    return { steps: P, dx: HOR_TXT[leaf].h + ' Horner' };
  }

  /* ================= Facial nerve lesion level (ANS H&N p.14–15) ================= */
  var FAC = { name: 'facial', W: 900, H: 600, label: 'Level of a facial nerve lesion from its signs',
    N: [
      { id: 'q1', k: 'q', x: 20, y: 8, w: 360, h: 62, t: ['① Whole half of the face weak?'], s: ['forehead included'] },
      { id: 'q2', k: 'q', x: 20, y: 118, w: 360, h: 62, t: ['② Taste (ant. 2/3) or saliva lost?'], s: ['chorda tympani'] },
      { id: 'q3', k: 'q', x: 20, y: 228, w: 360, h: 62, t: ['③ Hyperacusis?'], s: ['nerve to stapedius'] },
      { id: 'q4', k: 'q', x: 20, y: 338, w: 360, h: 62, t: ['④ Dry eye (no tears)?'], s: ['greater petrosal nerve'] },
      { id: 'q5', k: 'q', x: 20, y: 448, w: 360, h: 62, t: ['⑤ Hearing loss or vertigo?'], s: ['CN VIII beside it'] },
      { id: 'l0', k: 'leaf', x: 470, y: 8, w: 410, h: 62, t: ['Not a facial nerve (LMN) lesion'] },
      { id: 'l1', k: 'leaf', x: 470, y: 118, w: 410, h: 62, t: ['At / below the stylomastoid foramen'], s: ['hemifacial paralysis only'] },
      { id: 'l2', k: 'leaf', x: 470, y: 228, w: 410, h: 62, t: ['Between stapedial nerve and chorda'], s: ['+ taste, salivation'] },
      { id: 'l3', k: 'leaf', x: 470, y: 338, w: 410, h: 62, t: ['Between greater petrosal and stapedial'], s: ['+ hyperacusis'] },
      { id: 'l4', k: 'leaf', x: 470, y: 448, w: 410, h: 62, t: ['Above the greater petrosal (geniculate)'], s: ['+ dry eye'] },
      { id: 'l5', k: 'leaf', x: 20, y: 540, w: 860, h: 52, t: ['Internal acoustic meatus: CN VII + CN VIII'] }
    ],
    E: [
      { f: 'q1', to: 'l0', p: [[380, 39], [470, 39]], l: [425, 31, 'no'] },
      { f: 'q1', to: 'q2', p: [[200, 70], [200, 118]], l: [220, 98, 'yes'] },
      { f: 'q2', to: 'l1', p: [[380, 149], [470, 149]], l: [425, 141, 'no'] },
      { f: 'q2', to: 'q3', p: [[200, 180], [200, 228]], l: [220, 208, 'yes'] },
      { f: 'q3', to: 'l2', p: [[380, 259], [470, 259]], l: [425, 251, 'no'] },
      { f: 'q3', to: 'q4', p: [[200, 290], [200, 338]], l: [220, 318, 'yes'] },
      { f: 'q4', to: 'l3', p: [[380, 369], [470, 369]], l: [425, 361, 'no'] },
      { f: 'q4', to: 'q5', p: [[200, 400], [200, 448]], l: [220, 428, 'yes'] },
      { f: 'q5', to: 'l4', p: [[380, 479], [470, 479]], l: [425, 471, 'no'] },
      { f: 'q5', to: 'l5', p: [[200, 510], [200, 540]], l: [220, 530, 'yes'] }
    ]
  };
  var FAC_CASES = [
    { k: 'f1', b: 'Face only', src: 'ANS H&N p.15, lesion 1', v: { lv: 1 } },
    { k: 'f2', b: '+ taste loss', src: 'ANS H&N p.15, ME 2.1', v: { lv: 2 } },
    { k: 'f3', b: '+ hyperacusis', src: 'ANS H&N p.15, ME 2.2', v: { lv: 3 } },
    { k: 'f4', b: '+ dry eye', src: 'ANS H&N p.15, IE', v: { lv: 4 } },
    { k: 'f5', b: '+ hearing loss, vertigo', src: 'ANS H&N p.15, IAM', v: { lv: 5 } }
  ];
  var FAC_Q = ['q1', 'q2', 'q3', 'q4', 'q5'];
  var FAC_TXT = {
    q1: { h: 'Lower motor neuron facial palsy', b: ['CN VII supplies every muscle of facial expression → the whole half, forehead included, is weak.'], th: 'อัมพาตทั้งซีก (รวมหน้าผาก) = รอยโรคที่เส้นประสาท VII เอง' },
    q2: { h: 'Chorda tympani', b: ['Leaves CN VII in the facial canal above the stylomastoid foramen.', 'Taste of anterior 2/3 + secretomotor to submandibular and sublingual glands.'] },
    q3: { h: 'Nerve to stapedius', b: ['Stapedius damps loud sound → lost → hyperacusis.'] },
    q4: { h: 'Greater petrosal nerve', b: ['Branches at the geniculate ganglion → pterygopalatine ganglion → lacrimal gland.'] },
    q5: { h: 'CN VIII', b: ['Runs with CN VII through the internal acoustic meatus.'] },
    l0: { h: 'Not LMN CN VII', b: ['Forehead spared → think of a lesion above the facial nucleus.'] },
    l1: { h: 'Stylomastoid foramen and below', b: ['Only motor branches are left → hemifacial paralysis only.', 'Bell palsy = herpes-related inflammation of the nerve.'] },
    l2: { h: 'Above the chorda', b: ['Paralysis + taste + salivation.'] },
    l3: { h: 'Above the stapedial nerve', b: ['Paralysis + taste + salivation + hyperacusis.'] },
    l4: { h: 'Above the greater petrosal', b: ['All of the above + dry eye (lacrimation lost).'] },
    l5: { h: 'Internal acoustic meatus', b: ['CN VII signs + CN VIII: hearing loss, dizziness.'] }
  };
  function facPath(v) {
    var P = [], lv = v.lv;
    P.push({ n: 'q1', e: 'q2', val: 'yes', why: 'Whole half of the face weak → lower motor neuron CN VII.' });
    for (var i = 1; i < 5; i++) {
      var yes = lv > i, q = FAC_Q[i];
      P.push({ n: q, e: yes ? FAC_Q[i + 1] || 'l5' : 'l' + i, val: yes ? 'yes' : 'no', why: FAC_TXT[q].h + (yes ? ' affected → the lesion is above its branch.' : ' spared → the lesion is below its branch.') });
      if (!yes) { P.push({ n: 'l' + i, why: FAC_TXT['l' + i].b.join(' ') }); return { steps: P, dx: FAC_TXT['l' + i].h }; }
    }
    P[P.length - 1].e = 'l5';
    P.push({ n: 'l5', why: FAC_TXT.l5.b.join(' ') });
    return { steps: P, dx: FAC_TXT.l5.h };
  }

  /* ================= Audiogram: type, then degree (Sound p.84–92) ================= */
  var AUD = { name: 'audio', W: 900, H: 560, label: 'Reading a pure-tone audiogram',
    N: [
      { id: 'q1', k: 'q', x: 250, y: 8, w: 400, h: 62, t: ['① Bone conduction normal?'], s: ['BC average ≤ 25 dB HL'] },
      { id: 'q2', k: 'q', x: 20, y: 118, w: 380, h: 62, t: ['② Air conduction normal too?'], s: ['AC average ≤ 25 dB HL'] },
      { id: 'q3', k: 'q', x: 500, y: 118, w: 380, h: 62, t: ['② AC clearly worse than BC?'], s: ['air–bone gap'] },
      { id: 'q4', k: 'q', x: 20, y: 228, w: 380, h: 62, t: ['③ Any frequency well down?'], s: ['configuration, e.g. 4 kHz notch'] },
      { id: 'chl', k: 'leaf', x: 20, y: 338, w: 200, h: 74, t: ['Conductive'], s: ['outer / middle ear'] },
      { id: 'mix', k: 'leaf', x: 500, y: 228, w: 180, h: 74, t: ['Mixed'], s: ['both parts'] },
      { id: 'snhl', k: 'leaf', x: 700, y: 228, w: 180, h: 74, t: ['Sensorineural'], s: ['cochlea / CN VIII'] },
      { id: 'norm', k: 'leaf', x: 240, y: 338, w: 160, h: 74, t: ['Normal'] },
      { id: 'hf', k: 'leaf', x: 240, y: 430, w: 160, h: 74, t: ['High-frequency', 'loss'] },
      { id: 'deg', k: 'note', x: 470, y: 338, w: 410, h: 214, ty: 26, t: ['Degree (WHO 2019, AC average)'], s: [] }
    ],
    E: [
      { f: 'q1', to: 'q2', p: [[300, 70], [300, 94], [210, 94], [210, 118]], l: [262, 88, 'yes'] },
      { f: 'q1', to: 'q3', p: [[600, 70], [600, 94], [690, 94], [690, 118]], l: [640, 88, 'no'] },
      { f: 'q2', to: 'chl', p: [[60, 180], [60, 338]], l: [80, 210, 'no'] },
      { f: 'q2', to: 'q4', p: [[300, 180], [300, 228]], l: [322, 208, 'yes'] },
      { f: 'q4', to: 'norm', p: [[300, 290], [300, 338]], l: [318, 318, 'no'] },
      { f: 'q4', to: 'hf', p: [[390, 290], [420, 290], [420, 430], [400, 430]], l: [432, 360, 'yes'] },
      { f: 'q3', to: 'mix', p: [[590, 180], [590, 228]], l: [610, 208, 'yes'] },
      { f: 'q3', to: 'snhl', p: [[790, 180], [790, 228]], l: [810, 208, 'no'] },
      { f: 'chl', to: 'deg', p: [[220, 375], [235, 375], [235, 520], [470, 520]], dash: true },
      { f: 'mix', to: 'deg', p: [[590, 302], [590, 338]], dash: true },
      { f: 'snhl', to: 'deg', p: [[790, 302], [790, 338]], dash: true }
    ]
  };
  var WHO = [[95, 'Complete', '≥ 95'], [80, 'Profound', '80–94.9'], [65, 'Severe', '65–79.9'], [50, 'Moderately severe', '50–64.9'], [35, 'Moderate', '35–49.9'], [20, 'Mild', '20–34.9'], [-99, 'Normal', '&lt; 20']];
  function who(x) { for (var i = 0; i < WHO.length; i++) if (x >= WHO[i][0]) return WHO[i]; return WHO[WHO.length - 1]; }
  function degRows(st) {
    var n = AUD.N.filter(function (x) { return x.id === 'deg'; })[0], h = '';
    WHO.slice().reverse().forEach(function (g, i) {
      var y = n.y + 50 + i * 23, on = st.grade && st.grade[1] === g[1];
      h += '<g class="fx-sev' + (on ? ' on' : '') + '"><rect x="' + (n.x + 12) + '" y="' + (y - 15) + '" width="' + (n.w - 24) + '" height="21" rx="5"/><text x="' + (n.x + 24) + '" y="' + y + '">' + g[1] + '</text><text x="' + (n.x + n.w - 24) + '" y="' + y + '" text-anchor="end">' + g[2] + ' dB HL</text></g>';
    });
    return h;
  }
  var AUD_CASES = [
    { k: 'n', b: 'Normal (p.86)', src: 'Sound p.86, values read off the chart', v: { ac: 13, bc: 12 } },
    { k: 's', b: 'Sensorineural (p.87)', src: 'Sound p.87, values read off the chart', v: { ac: 43, bc: 42 } },
    { k: 'c', b: 'Conductive (p.88)', src: 'Sound p.88, values read off the chart', v: { ac: 51, bc: 14 } },
    { k: 'm', b: 'Mixed (p.89)', src: 'Sound p.89, values read off the chart', v: { ac: 58, bc: 30 } },
    { k: 'nihl', b: 'Noise notch (p.46)', src: 'Sound p.46, values read off the chart', v: { ac: 9, bc: 9, k4: 28 } }
  ];
  var AUD_FIELDS = [['ac', 'AC average (dB HL)'], ['bc', 'BC average (dB HL)'], ['k4', 'AC at 4000 Hz (optional)']];
  var AUD_TXT = {
    q1: { h: 'Bone conduction first', b: ['The bone vibrator on the mastoid skips the outer and middle ear → BC tests the cochlea and CN VIII.'], th: 'BC ปกติ = หูชั้นในดี' },
    q2: { h: 'Then air conduction', b: ['AC goes the whole way: canal → drum → ossicles → cochlea.'] },
    q3: { h: 'Air–bone gap', b: ['AC worse than BC → something in the outer or middle ear too.', 'No gap → AC and BC fall together → inner ear or nerve only.'] },
    q4: { h: 'Configuration', b: ['An average can look normal while one band is down → say so, e.g. high-frequency sensorineural loss.', 'Noise damage peaks at 3000–4000 Hz (ear-canal resonance).'] },
    chl: { h: 'Conductive hearing loss', b: ['BC normal, AC worse: wax, perforated drum, otitis media.'] },
    mix: { h: 'Mixed hearing loss', b: ['BC worse than 25 and AC worse still.'] },
    snhl: { h: 'Sensorineural hearing loss', b: ['AC ≈ BC, both worse than 25: noise, presbycusis, Ménière, CN VIII tumour.'] },
    norm: { h: 'Normal hearing', b: ['AC and BC both within normal and close together.'] },
    hf: { h: 'High-frequency loss', b: ['Average normal but 4000–8000 Hz down → report the configuration.'] },
    deg: { h: 'Degree (WHO 2019)', b: ['Average of 500, 1000, 2000 and 4000 Hz in the better ear.'] }
  };
  function audPath(v) {
    var P = [], has = function (k) { return typeof v[k] === 'number' && !isNaN(v[k]); };
    if (!has('ac') || !has('bc')) return { steps: [], err: 'Enter both averages.' };
    var g = who(v.ac), leaf;
    if (v.bc <= 25) {
      P.push({ n: 'q1', e: 'q2', val: v.bc + ' → yes', why: 'BC <b>' + v.bc + '</b> ≤ 25 → the cochlea and nerve hear normally.' });
      if (v.ac <= 25) {
        P.push({ n: 'q2', e: 'q4', val: v.ac + ' → yes', why: 'AC <b>' + v.ac + '</b> ≤ 25 too.' });
        var notch = has('k4') && v.k4 > 25;
        P.push({ n: 'q4', e: notch ? 'hf' : 'norm', val: notch ? v.k4 + ' at 4k' : 'no', why: notch ? '4000 Hz is down at <b>' + v.k4 + '</b> dB HL although the average is normal → describe the configuration.' : 'No band stands out.' });
        P.push({ n: notch ? 'hf' : 'norm', why: notch ? 'High-frequency (4 kHz) <b>sensorineural</b> dip, the noise-exposure pattern.' : '<b>Normal hearing</b>.' });
        return { steps: P, grade: null, dx: notch ? 'Normal average, high-frequency sensorineural dip at 4 kHz' : 'Normal hearing' };
      }
      leaf = 'chl';
      P.push({ n: 'q2', e: 'chl', val: v.ac + ' → no', why: 'AC <b>' + v.ac + '</b> &gt; 25 while BC is normal → a gap of ' + (v.ac - v.bc) + ' dB → sound is lost on the way in.' });
    } else {
      var gap = v.ac - v.bc;
      P.push({ n: 'q1', e: 'q3', val: v.bc + ' → no', why: 'BC <b>' + v.bc + '</b> &gt; 25 → the inner ear or nerve is affected.' });
      leaf = gap >= 10 ? 'mix' : 'snhl';
      P.push({ n: 'q3', e: leaf, val: 'gap ' + gap, why: 'AC − BC = <b>' + gap + '</b> dB → ' + (gap >= 10 ? 'a clear air–bone gap as well → <b>mixed</b>.' : 'AC and BC fall together → <b>sensorineural</b>.') + ' (A gap of 10 dB or more is the usual clinical cut-off; the slides show the gap without a number.)' });
    }
    P.push({ n: leaf, e: 'deg', val: g[1].toLowerCase(), why: AUD_TXT[leaf].h + '. Degree by AC average <b>' + v.ac + '</b> → <b>' + g[1] + '</b> (' + g[2] + ' dB HL).' });
    return { steps: P, grade: g, dx: g[1] + ' ' + AUD_TXT[leaf].h.toLowerCase() };
  }

  /* ================= widget ================= */
  var DEFS = {
    nmj: { def: NMJ, cases: NMJ_CASES, fields: [], path: nmjPath, txt: NMJ_TXT, title: 'Where does the signal fail?', hint: 'Click any box to see what it needs. Load a disease or drug, then press Next step.', idle: 'Follow one signal from nerve to muscle: AP → Ca²⁺ → ACh release → nAChR → EPP → muscle AP. Each disease or drug breaks one link.' },
    horner: { def: HOR, cases: HOR_CASES, fields: [], path: horPath, txt: HOR_TXT, title: 'Horner syndrome: confirm, then localise', hint: 'Click any box to see why that step exists. Load a case, then press Next step.', idle: 'Three questions: is it the triad? is it really sympathetic? which of the three neurons?' },
    facial: { def: FAC, cases: FAC_CASES, fields: [], path: facPath, txt: FAC_TXT, title: 'Find the level of a facial nerve lesion', hint: 'Each branch that still works puts the lesion below it. Load a set of signs, then press Next step.', idle: 'Go up the nerve: chorda tympani (taste) → nerve to stapedius (hyperacusis) → greater petrosal (tears) → internal acoustic meatus (CN VIII).' },
    audio: { def: AUD, cases: AUD_CASES, fields: AUD_FIELDS, path: audPath, txt: AUD_TXT, title: 'Read the audiogram: type, then degree', hint: 'Click any box to see why. Load a slide example or type your own averages, then press Next step.', idle: 'Side → type (compare bone with air) → degree (WHO grade of the AC average) → configuration.', extra: degRows }
  };
  function state(name) {
    return ST[name] || (ST[name] = { name: name, caseK: null, v: null, res: null, step: 0, sel: null, form: false });
  }
  function view(name, st) {
    var D = DEFS[name], steps = st.res ? st.res.steps : [], shown = steps.slice(0, st.step);
    var vs = { name: name, on: {}, onE: {}, val: {}, cur: null, sel: st.sel, dim: !!st.res && steps.length > 0, grade: null };
    shown.forEach(function (s, i) {
      vs.on[s.n] = true; if (s.val) vs.val[s.n] = s.val;
      if (i < shown.length - 1 || st.step >= steps.length) { if (s.e) vs.onE[s.n + '>' + s.e] = true; (s.e2 || []).forEach(function (e) { vs.onE[s.n + '>' + e] = true; }); }
    });
    if (shown.length) vs.cur = shown[shown.length - 1].n;
    if (st.res && st.res.grade && shown.some(function (s) { return s.e === 'deg'; })) { vs.grade = st.res.grade; vs.on.deg = true; }
    return vs;
  }
  function render(el) {
    var name = el.getAttribute('data-flow'), D = DEFS[name]; if (!D) return;
    var st = state(name), vs = view(name, st), steps = st.res ? st.res.steps : [];
    var h = '<div class="fx-head"><b>' + D.title + '</b><span>' + D.hint + '</span></div>';
    h += '<div class="fx-cases" role="group" aria-label="Load a case">' + D.cases.map(function (c) { return '<button type="button" class="fx-btn' + (st.caseK === c.k ? ' on' : '') + '" data-a="case" data-k="' + c.k + '">' + c.b + '</button>'; }).join('') +
      (D.fields && D.fields.length ? '<button type="button" class="fx-btn ghost' + (st.form ? ' on' : '') + '" data-a="form">Your numbers</button>' : '') + '</div>';
    if (st.form) {
      var cur = st.v || {};
      h += '<div class="fx-form">' + D.fields.map(function (f) { return '<label><span>' + f[1] + '</span><input type="number" step="any" inputmode="decimal" data-f="' + f[0] + '" value="' + (typeof cur[f[0]] === 'number' ? cur[f[0]] : '') + '"></label>'; }).join('') +
        '<button type="button" class="fx-btn go" data-a="run">Walk it</button></div>';
    }
    if (st.res && D.fields.length) {
      var c = D.cases.filter(function (x) { return x.k === st.caseK; })[0];
      h += '<div class="fx-case"><span class="fx-src">' + (c ? c.src : 'Your numbers') + '</span>' + D.fields.filter(function (f) { return typeof st.v[f[0]] === 'number'; }).map(function (f) { return '<span class="fx-chip">' + f[1].replace(/ \(.*\)/, '') + ' <b>' + st.v[f[0]] + '</b></span>'; }).join('') + '</div>';
    }
    h += '<div class="fx-scroll">' + svg(D.def, vs).replace('</svg>', (D.extra ? D.extra(vs) : '') + '</svg>') + '</div>';
    if (st.res && steps.length) {
      h += '<div class="fx-ctl"><button type="button" class="fx-btn" data-a="back"' + (st.step <= 1 ? ' disabled' : '') + '>◀ Back</button><span class="fx-pos">Step ' + st.step + ' of ' + steps.length + '</span>' +
        '<button type="button" class="fx-btn go" data-a="next"' + (st.step >= steps.length ? ' disabled' : '') + '>Next step ▶</button><button type="button" class="fx-btn ghost" data-a="all"' + (st.step >= steps.length ? ' disabled' : '') + '>Whole path</button><button type="button" class="fx-btn ghost" data-a="clear">Clear</button></div>';
    }
    if (st.res && st.res.err) h += '<p class="fx-err">' + st.res.err + '</p>';
    h += '<div class="fx-panel">' + panel(name, st, vs) + '</div>';
    el.innerHTML = h;
  }
  function panel(name, st, vs) {
    var D = DEFS[name], steps = st.res ? st.res.steps : [], h = '';
    if (st.res && steps.length && st.step) {
      h += '<ol class="fx-trail">' + steps.slice(0, st.step).map(function (s, i) { return '<li' + (i === st.step - 1 ? ' class="now"' : '') + '>' + s.why + '</li>'; }).join('') + '</ol>';
      if (st.step >= steps.length) {
        if (st.res.dx) h += '<p class="fx-dx"><span>Answer</span>' + st.res.dx + '</p>';
      }
    }
    var key = st.sel || vs.cur, t = key && D.txt[key];
    if (t) {
      h += '<div class="fx-explain"><h4>' + t.h + '</h4>' + ul(t.b)  + (t.th ? '<p class="fx-th">' + t.th + '</p>' : '') + '</div>';
    } else if (!st.res) {
      h += '<p class="fx-idle">' + D.idle + '</p>';
    }
    return h;
  }
  function act(el, a, btn) {
    var name = el.getAttribute('data-flow'), D = DEFS[name], st = state(name);
    if (a === 'case') {
      var c = D.cases.filter(function (x) { return x.k === btn.getAttribute('data-k'); })[0];
      st.caseK = c.k; st.v = JSON.parse(JSON.stringify(c.v)); st.res = D.path(st.v); st.step = 1; st.sel = null;
    } else if (a === 'form') { st.form = !st.form; }
    else if (a === 'run') {
      var v = {}, ins = el.querySelectorAll('input[data-f]');
      for (var i = 0; i < ins.length; i++) { var x = parseFloat(ins[i].value); if (!isNaN(x)) v[ins[i].getAttribute('data-f')] = x; }
      st.caseK = null; st.v = v; st.res = D.path(v); st.step = st.res.steps.length ? 1 : 0; st.sel = null;
    }
    else if (a === 'next') { if (st.res) st.step = Math.min(st.res.steps.length, st.step + 1); st.sel = null; }
    else if (a === 'back') { st.step = Math.max(1, st.step - 1); st.sel = null; }
    else if (a === 'all') { if (st.res) st.step = st.res.steps.length; st.sel = null; }
    else if (a === 'clear') { st.caseK = null; st.v = null; st.res = null; st.step = 0; st.sel = null; }
    render(el);
    var again = el.querySelector('[data-a="' + a + '"]' + (a === 'case' ? '[data-k="' + st.caseK + '"]' : ''));
    if (again && !again.disabled) try { again.focus({ preventScroll: true }); } catch (e) { }
  }
  function pick(el, n) {
    var st = state(el.getAttribute('data-flow'));
    st.sel = st.sel === n ? null : n;
    render(el);
    var g = el.querySelector('.fx-node[data-n="' + n + '"]'); if (g) try { g.focus({ preventScroll: true }); } catch (e) { }
  }

  F.add = function (name, d) { DEFS[name] = d; };  /* extra charts (src/flows-anatomy.js) */
  F.paths = DEFS;  /* used by tools/flowtest.js */
  F.mount = function (root) {
    var els = (root || document).querySelectorAll('.flowx');
    for (var i = 0; i < els.length; i++) if (!els[i].getAttribute('data-on')) { els[i].setAttribute('data-on', '1'); render(els[i]); }
  };
  /* static copy for the PDF: the chart only, nothing loaded */
  F.printHtml = function (name) {
    var D = DEFS[name], vs = { name: name + 'p', on: {}, onE: {}, val: {}, cur: null, sel: null, dim: false, grade: null };
    return '<div class="fx fx-print"><div class="fx-scroll">' + svg(D.def, vs).replace('</svg>', (D.extra ? D.extra(vs) : '') + '</svg>') + '</div></div>';
  };

  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target : null; if (!t) return;
      var el = t.closest('.flowx'); if (!el) return;
      var b = t.closest('[data-a]'); if (b && !b.disabled) { act(el, b.getAttribute('data-a'), b); return; }
      var g = t.closest('.fx-node'); if (g) pick(el, g.getAttribute('data-n'));
    });
    document.addEventListener('keydown', function (e) {
      var t = e.target; if (!t || !t.closest) return;
      var el = t.closest('.flowx'); if (!el) return;
      if ((e.key === 'Enter' || e.key === ' ') && t.classList && t.classList.contains('fx-node')) { e.preventDefault(); pick(el, t.getAttribute('data-n')); }
      if (e.key === 'Enter' && t.tagName === 'INPUT') { e.preventDefault(); act(el, 'run', null); }
    });
    var go = function () { F.mount(document); };
    if (document.body) { go(); try { new MutationObserver(go).observe(document.body, { childList: true, subtree: true }); } catch (e) { } }
    else document.addEventListener('DOMContentLoaded', function () { go(); try { new MutationObserver(go).observe(document.body, { childList: true, subtree: true }); } catch (e) { } });
  }
})();
