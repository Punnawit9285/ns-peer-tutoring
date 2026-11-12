/* Short concept cards: each card's body is written here as arrow chains and brief bullets.
   Loaded last (data/sections.json), so it rebuilds the html of every card listed below.
   The card's figures and flow widgets are taken from its original html in the section file;
   the text there is superseded. Block syntax (one string per block):
     '> A → B → C'      cause → effect chain          '- text'   bullet (consecutive bullets form one list)
     '## Heading'        small group label            '! text'   exam trap / past-paper note
     '| a | b |'         table row (first row = head)  '= text'   centered equation
     '@F1' '@F2'         place that figure here; figures not placed go to a column beside the text
     '@X1'               place that flow widget        {{...}}    cloze blank (keep 3–8 per card, key ideas only)
     '@flow:name'        an interactive chart from src/flows*.js
     '---'               what follows goes full width under the text and figure columns */
(function () {
  var C = window.CVS, byId = {};
  C.sections.forEach(function (s) { s.items.forEach(function (it) { byId[it.id] = it; }); });
  function inl(t) { return C.cloze(String(t)).replace(/(→|↔|⇄)/g, '<span class="lt-ar">$1</span>'); }
  function render(blocks, F, X) {
    var out = [], main = out, below = null, ul = null, tb = null, used = {};
    function flush() {
      if (ul) { out.push('<ul class="lt-pts">' + ul.join('') + '</ul>'); ul = null; }
      if (tb) {
        out.push('<div class="tblwrap"><table class="lt-tbl"><thead><tr>' + tb[0].map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
          tb.slice(1).map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inl(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>');
        tb = null;
      }
    }
    blocks.forEach(function (b) {
      b = b.replace(/<(?![A-Za-z\/!])/g, '&lt;');  /* a bare < (as in "< 80") is text, not a tag */
      var k = b.slice(0, 2), t = b.slice(2);
      if (k === '- ') { if (tb) flush(); (ul = ul || []).push('<li>' + inl(t) + '</li>'); return; }
      if (b[0] === '|') { if (ul) flush(); (tb = tb || []).push(b.replace(/^\|\s*|\s*\|\s*$/g, '').split(/\s*\|\s*/)); return; }
      flush();
      if (b === '---') { below = []; out = below; return; }
      if (k === '> ') out.push('<p class="lt-chain">' + inl(t) + '</p>');
      else if (b.slice(0, 3) === '## ') out.push('<h4 class="lt-h">' + b.slice(3) + '</h4>');
      else if (k === '! ') out.push('<p class="lt-trap">' + inl(t) + '</p>');
      else if (k === '= ') out.push('<div class="eqn">' + inl(t) + '</div>');
      else if (/^@F\d+$/.test(b)) { var i = +b.slice(2) - 1; if (!F[i]) throw new Error('no figure ' + b); used[i] = 1; out.push(F[i]); }
      else if (/^@flow:\w+$/.test(b)) out.push('<div class="flowx" data-flow="' + b.slice(6) + '"></div>');
      else if (/^@X\d+$/.test(b)) { var j = +b.slice(2) - 1; if (!X[j]) throw new Error('no flow ' + b); out.push(X[j]); }
      else out.push('<p class="lt-p">' + inl(b) + '</p>');
    });
    flush();
    var rest = F.filter(function (f, i) { return !used[i]; });
    var text = '<div class="lt">' + main.join('') + '</div>';
    var top = rest.length ? '<div class="two lt-two">' + text + '<div class="lt-figs">' + rest.join('') + '</div></div>' : text;
    return below ? '<div class="lt">' + top + below.join('') + '</div>' : top;
  }
  C.short = function (id, blocks, opt) {
    var it = byId[id];
    if (!it || it.t !== 'c') throw new Error('short(): no concept ' + id);
    var F = [], X = [];
    /* figures in document order; a collapsed <details> that holds a figure (answers, extra slides) is kept whole */
    String(it.html).replace(/<details\b[\s\S]*?<\/details>|<figure\b[\s\S]*?<\/figure>/g, function (m) { if (/^<figure/.test(m) || /<figure\b/.test(m)) F.push(m); return m; });
    String(it.html).replace(/<div class="flowx"[^>]*><\/div>/g, function (m) { X.push(m); return m; });
    if (opt && opt.drop) F = F.filter(function (f, i) { return opt.drop.indexOf(i + 1) < 0; });
    it.html = render(blocks, F, X);
  };
})();
var S_ = CVS.short;

/* ---------- V · Back ---------- */
S_('V-C1', [
  '= 7 cervical · 12 thoracic · 5 lumbar · 5 sacral (fused) · 4 coccygeal',
  '| Region | Curve |',
  '| Cervical | {{lordosis}} (concave behind) |',
  '| Thoracic | {{kyphosis}} (concave in front) |',
  '| Lumbar | same as cervical |',
  '| Sacrococcygeal | same as thoracic |',
  '> Thoracic + sacral kyphoses = the fetal ({{primary}}) curves → cervical and lumbar lordoses appear later (holding the head up, standing)'
]);
S_('V-C2', [
  '- Body in front · arch behind = 2 {{pedicles}} + 2 laminae',
  '- Body + arch enclose the vertebral (spinal) canal',
  '- Processes: 1 spinous · 2 transverse · 4 articular',
  '> Inferior articular process of the vertebra above + superior articular process below → {{facet}} (zygapophyseal) joint',
  '> Superior + inferior vertebral notches of neighbours → intervertebral {{foramen}} → spinal nerve exits',
  '- Lumbar only: mamillary + accessory processes'
]);
S_('V-C3', [
  '| Vertebra | Key feature |',
  '| C1 atlas | ring: anterior + posterior arch, {{no body}} |',
  '| C2 axis | {{dens}} (odontoid process) → pivot for C1 |',
  '| C3–C7 | foramen transversarium · uncinate process → uncovertebral joint |',
  '| Thoracic | {{facets}} for the head and tubercle of a rib |',
  '| Sacrum | ala, promontory, sacral foramina, {{sacral hiatus}} + cornua |',
  '! Foramen transversarium = the cervical sign (vertebral artery runs in it)'
]);
S_('V-C4', [
  '- Anterior longitudinal ligament on the front of the bodies · {{posterior}} longitudinal ligament inside the canal',
  '- Ligamentum {{flavum}} joins laminae · interspinous + supraspinous join spines',
  '- Above C7 the supraspinous ligament becomes the ligamentum {{nuchae}}',
  '> Disc = outer {{anulus fibrosus}} (concentric lamellae) + inner nucleus pulposus',
  '> Sitting and bending forward → intradiscal pressure ↑ above standing → lying lowest'
]);
S_('V-C5', [
  '## Splenius (capitis, cervicis)',
  '- Ligamentum nuchae + upper spines → mastoid / upper cervical vertebrae',
  '## Erector spinae: medial → lateral = S · L · I',
  '| Column | Runs |',
  '| {{Spinalis}} (medial) | spine → spine |',
  '| {{Longissimus}} (intermediate) | transverse → transverse process |',
  '| {{Iliocostalis}} (lateral) | iliac crest, ribs → angles of ribs |',
  '## Transversospinal: transverse process → spine above',
  '- Semispinalis {{4–6}} segments up · multifidus 2–4 · rotatores 1–2'
]);
S_('V-C6', [
  '- Rectus capitis posterior {{major}} and minor',
  '- Obliquus capitis {{inferior}} and superior',
  '> They join C1, C2 and the occiput → fine head movements (nodding, turning)',
  '- {{Semispinalis}} capitis = the largest muscle mass on the back of the neck, lying over them'
]);

/* ---------- I · Spine imaging ---------- */
S_('I-C1', [
  '- C1 = ring: anterior arch, posterior arch, lateral masses',
  '- C2 dens sits behind the anterior arch of C1 → {{atlantoaxial}} joint',
  '> AP {{open-mouth}} view → gaps between the dens and the two lateral masses should be symmetric',
  '> Lateral view → atlanto-dental interval (anterior arch ↔ dens)',
  '| Age | Normal ADI |',
  '| Adult | < {{3}} mm |',
  '| Child | < {{5}} mm |'
]);
S_('I-C2', [
  '- Facet joint: inferior articular process above + superior process below',
  '- {{Uncovertebral}} joint: uncinate processes of C3–C7 bodies (seen on AP)',
  '- Transverse foramen → {{vertebral artery}}',
  '- Neural (intervertebral) foramen → nerve root → seen on the {{oblique}} view',
  '> Lateral view: 4 smooth lines → anterior vertebral, posterior vertebral, {{spinolaminar}}, posterior spinous',
  '! A step in any line = malalignment'
]);
S_('I-C3', [
  '- Pars interarticularis = bone between the superior and inferior articular processes',
  '> Oblique view → {{Scotty dog}}: eye = pedicle · nose = transverse process · neck = pars · ear = superior articular process',
  '> Defect in the pars = "broken neck" = {{spondylolysis}}',
  '> Bilateral pars defect → vertebra slips forward = {{spondylolisthesis}}'
]);
S_('I-C4', [
  '- X-ray tube + detectors rotate → cross-sections; better contrast than plain film',
  '> Denser tissue → more attenuation → higher CT number → {{whiter}}',
  '- Air {{−1000}} · fat −100 to −50 · water 0 · compact cortex up to 3000 HU',
  '> Window = which HU range is shown as grey: {{bone}} window for the spine, lung window, mediastinum window',
  '- Cost: high {{radiation}} dose; contrast often needed for soft tissue'
]);
S_('I-C5', [
  '> Strong field aligns H atoms → RF pulse flips them → T1 recovery and T2 decay send signal',
  '| Sequence | CSF |',
  '| T1 | {{dark}} |',
  '| T2 | {{bright}} |',
  '- Best for disc, cord, nerve roots, marrow; {{no}} ionising radiation',
  '- Cons: long scan, cost; contraindicated with {{pacemaker}}, ear implant, claustrophobia',
  '> Bone detail → CT · soft tissue (cord, disc, roots) → MRI'
]);

/* ---------- N · Nervous tissue ---------- */
S_('N-C1', [
  '> Ectoderm → neural {{tube}} → CNS · neural {{crest}} → PNS',
  '- Neurons differentiate first, then neuroglia',
  '- Components: neurons + neuroglia + connective tissue',
  '> Neuropil = axon terminals + dendrites + glial processes between cell bodies → where {{synapses}} form'
]);
S_('N-C2', [
  '- Soma = metabolic centre: {{vesicular}} nucleus + prominent nucleolus',
  '- Nissl bodies = rough {{ER}} → protein synthesis',
  '- Pigments: lipofuscin (age), neuromelanin',
  '> Axon hillock and initial segment → {{no}} Nissl bodies',
  '| | Axon | Dendrite |',
  '| Direction | away from soma | toward soma |',
  '| Number | {{one}} (with collaterals) | many |',
  '| Surface | smooth, often myelinated | spiny, always naked |'
]);
S_('N-C3', [
  '> {{Anterograde}}: soma → terminal → growth, transmitter supply',
  '> Retrograde: terminal → soma → recycling; route of tetanus toxin, herpes, {{rabies}}, polio',
  '- Synapse = presynaptic ending + synaptic {{cleft}} + postsynaptic element',
  '- Structural: axodendritic · axosomatic · axoaxonic',
  '- Functional: excitatory or {{inhibitory}}'
]);
S_('N-C4', [
  '> Myelin: {{oligodendrocyte}} wraps many axons (CNS) · Schwann cell wraps one internode (PNS)',
  '> Node of {{Ranvier}} = gap between internodes, no myelin',
  '| Class | Example |',
  '| {{Pseudounipolar}} | dorsal root ganglion cell |',
  '| Bipolar | retina, special senses |',
  '| Multipolar | most CNS neurons, {{ventral horn}} motor neuron |'
]);
S_('N-C5', [
  '| Glia | Job |',
  '| {{Astrocyte}} | most numerous; end-feet → blood–brain barrier; scars; marker GFAP |',
  '| Oligodendrocyte | CNS myelin |',
  '| {{Microglia}} | CNS immune cell; from the yolk sac |',
  '| Ependyma | lines ventricles; choroid plexus → {{CSF}} |',
  '| Schwann / {{satellite}} | PNS: nerve / ganglion |',
  '- Two types: protoplasmic = grey matter · fibrous = white matter'
]);
S_('N-C6', [
  '- Exteroceptors: {{Pacinian}} corpuscle = vibration · Meissner corpuscle = fine touch',
  '- Proprioceptors: muscle spindle + Golgi {{tendon}} organ → limb position and movement',
  '> Nerve sheaths, inside → out: {{endoneurium}} (each fibre) → perineurium (each fascicle) → epineurium (whole nerve)',
  '- CNS uses meninges instead: dura, arachnoid, pia'
]);

/* ---------- C · Spinal cord & peripheral nerve ---------- */
S_('C-C1', [
  '- Cord: foramen magnum → {{L1/L2}} (conus medullaris)',
  '- Below: cauda equina + filum terminale',
  '- 31 pairs: C8 · T12 · L5 · S5 · Co1 → {{8}} cervical nerves but 7 cervical vertebrae',
  '- Enlargements: cervical C4–T1 (arm) · lumbosacral {{L2–S3}} (leg)',
  '- Dural sac ends at S2'
]);
S_('C-C2', [
  '- Epidural space = fat + {{internal vertebral venous}} plexus, outside the dura',
  '- Space between arachnoid and pia holds {{CSF}}',
  '> Lumbar puncture below the conus (L3/L4 or L4/L5) → needle into the {{subarachnoid}} space → CSF or spinal block',
  '> Caudal epidural block → through the sacral {{hiatus}} between the cornua → labour and post-op pain'
]);
S_('C-C3', [
  '- Dorsal horn = {{sensory}} · ventral horn = motor · lateral horn = autonomic preganglionic',
  '- White matter: dorsal, lateral, ventral columns',
  '> Afferent fibre → dorsal root ({{ganglion}}) → dorsal horn',
  '> Motor: ventral horn → ventral root → spinal nerve',
  '- C1 = motor {{only}}; C2–S5 = mixed'
]);
S_('C-C4', [
  '- {{Anterior}} spinal artery (one) → front 2/3 of the cord',
  '- Posterior spinal arteries (two) → posterior {{1/3}}',
  '- Reinforced by segmental (radicular, medullary) arteries',
  '> Spinal veins → radicular veins → {{internal}} vertebral plexus (epidural) → intervertebral vein → external plexus'
]);
S_('C-C5', [
  '> Bigger fibre + {{myelin}} → faster',
  '- Aα → muscle spindle, α motor neurons (fastest) · Aβ → touch',
  '- Aδ → fast pain, cold · {{C}} → slow pain, unmyelinated (slowest)',
  '- B → sympathetic {{preganglionic}}',
  '| Ending | Senses |',
  '| Free nerve ending | pain |',
  '| Meissner / Merkel | light touch |',
  '| {{Pacinian}} corpuscle | pressure |'
]);
S_('C-C6', [
  '- Mononeuropathy: trauma, entrapment',
  '> Polyneuropathy: symmetric, distal > proximal → {{glove and stocking}} (diabetes, vit B, GBS, HIV, drugs, lead)',
  '- Two mechanisms: axonal degeneration or {{demyelination}}',
  '| Seddon | Damage | Recovery |',
  '| Neurapraxia | myelin only | good |',
  '| {{Axonotmesis}} | axon cut, sheath intact | regrows |',
  '| Neurotmesis | whole nerve cut | needs repair |',
  '> Regrowth ≈ {{1}} mm/day · graft of choice = sural nerve'
]);

/* ---------- K · Skull ---------- */
S_('K-C1', [
  '= Neurocranium 8 + facial bones 14 = 22',
  '- Neurocranium: frontal, 2 parietal, 2 temporal, occipital, {{sphenoid}}, ethmoid',
  '- Facial: 2 maxillae, 2 zygomatic, 2 nasal, 2 lacrimal, 2 palatine, 2 inferior conchae, {{vomer}}, mandible',
  '| Temporal part | Holds |',
  '| Squamous | lateral wall of skull |',
  '| {{Petrous}} | densest bone; middle + inner ear |',
  '| Mastoid | {{mastoid air cells}} |',
  '| Tympanic | external acoustic meatus |'
]);
S_('K-C2', [
  '| Point | Junction |',
  '| {{Pterion}} | frontal + parietal + sphenoid + temporal |',
  '| Asterion | parietal + occipital + temporal |',
  '| {{Bregma}} | sagittal + coronal sutures |',
  '| Lambda | sagittal + {{lambdoid}} sutures |',
  '- Inion = tip of the external occipital protuberance · vertex = top of the head',
  '- Newborn: anterior, posterior, {{mastoid}} and sphenoid fontanelles'
]);
S_('K-C3', [
  '| Fossa | Bones | Holds |',
  '| Anterior | frontal, {{ethmoid}}, lesser wing | frontal lobes |',
  '| Middle | sphenoid + temporal | temporal lobes, {{pituitary}} (sella turcica) |',
  '| Posterior | mainly occipital | brainstem + {{cerebellum}} |',
  '- Posterior fossa = the {{largest}} and deepest'
]);
S_('K-C4', [
  '| Opening | Nerves |',
  '| Cribriform foramina | I |',
  '| Optic canal | II |',
  '| {{Superior orbital fissure}} | III, IV, V1, VI |',
  '| Foramen {{rotundum}} | V2 |',
  '| Foramen {{ovale}} | V3 |',
  '| Internal acoustic meatus | {{VII, VIII}} |',
  '| Jugular foramen | {{IX, X, XI}} |',
  '| Hypoglossal canal | XII |'
]);
S_('K-C5', [
  '> Pterion = thin bone over the anterior branch of the {{middle meningeal}} artery → torn → {{epidural}} haematoma',
  '> Cribriform plate fracture → CN I torn → anosmia + raccoon eyes + CSF {{rhinorrhea}}',
  '> Petrous temporal fracture → CN VII (facial palsy) + CN VIII (hearing loss) ± CSF {{otorrhea}}',
  '> Craniosynostosis = suture closes early → growth stops {{perpendicular}} to that suture → abnormal head shape'
]);

/* ---------- F · Superficial face & neck ---------- */
S_('F-C1', [
  '- Groups: scalp, orbit, nose, mouth, neck (platysma)',
  '> All develop from the 2nd pharyngeal arch → all supplied by {{CN VII}}',
  '- Orbicularis {{oculi}} closes the eye · orbicularis oris closes the lips',
  '- {{Buccinator}} keeps food off the cheek',
  '! Masseter and temporalis are NOT facial muscles → muscles of {{mastication}} (V3)'
]);
S_('F-C2', [
  '- Facial artery (from the external carotid) → pulse over the {{mandible}} in front of masseter',
  '> Danger triangle (between the eyes → corners of the mouth) → facial vein → ophthalmic veins / deep facial vein → {{cavernous}} sinus',
  '| Location | Structures |',
  '| Inside | CN {{VI}} + internal carotid a. |',
  '| Lateral wall | CN III, IV, {{V1, V2}} |',
  '! Thrombophlebitis → eye movement palsy, first CN VI'
]);
S_('F-C3', [
  '- Inside the parotid: {{facial}} nerve, external carotid → maxillary + superficial temporal a., {{retromandibular}} vein, nodes',
  '> CN VII exits the {{stylomastoid}} foramen → 5 branches: temporal, zygomatic, buccal, marginal mandibular, cervical',
  '> Palsy → eye cannot close → corneal ulcer · mouth droops → saliva dribbles',
  '- Superficial temporal pulse = in front of the {{ear}}'
]);
S_('F-C4', [
  '| Division | Skin |',
  '| V1 {{ophthalmic}} | forehead, upper eyelid, nose |',
  '| V2 maxillary | cheek, {{upper lip}}, lower eyelid |',
  '| V3 mandibular | lower lip, chin, temple (auriculotemporal) |',
  '! Angle of the jaw = great auricular nerve ({{C2, C3}}), not trigeminal'
]);
S_('F-C5', [
  '- SCM divides the neck → {{anterior}} triangle (in front) and posterior triangle',
  '- Suprahyoid: digastric, stylohyoid, mylohyoid, geniohyoid · infrahyoid: sternohyoid, omohyoid, sternothyroid, thyrohyoid',
  '> Infrahyoid (strap) muscles ← ansa {{cervicalis}} (C1–C3); thyrohyoid ← C1 fibres riding with CN XII',
  '| Thyroid | From / To |',
  '| Superior thyroid a. | {{external carotid}} |',
  '| Inferior thyroid a. | thyrocervical trunk |',
  '| Superior + middle thyroid v. | internal jugular v. |',
  '| Inferior thyroid v. | {{brachiocephalic}} v. |'
]);

/* ---------- D · Deep face ---------- */
S_('D-C1', [
  '- Temporal fossa: floor = {{pterion}} region · holds temporalis',
  '| Infratemporal fossa wall | Bone |',
  '| Lateral | {{ramus}} of mandible |',
  '| Medial | lateral pterygoid plate |',
  '| Anterior | maxilla |',
  '| Roof | greater wing of sphenoid |',
  '- Contents: temporalis (lower part), both pterygoids, {{maxillary}} artery, pterygoid plexus, {{mandibular}} nerve'
]);
S_('D-C2', [
  '| Muscle | Main action |',
  '| Temporalis | elevate; posterior fibres {{retrude}} |',
  '| Masseter | elevate (close jaw) |',
  '| Medial pterygoid | elevate; with partner protrude |',
  '| {{Lateral}} pterygoid | protrude + open (depress chin); side-to-side |',
  '- It inserts on the neck of mandible and the TMJ {{disc}}',
  '> All four ← motor branches of {{V3}}'
]);
S_('D-C3', [
  '> Maxillary artery (ECA) → 3 parts, divided by the {{lateral pterygoid}}',
  '- 1st (mandibular): middle meningeal (through foramen {{spinosum}}), inferior alveolar, deep auricular, anterior tympanic, accessory meningeal',
  '- 2nd (pterygoid): masseteric, deep temporal, pterygoid, buccal',
  '- 3rd (pterygopalatine): alveolar, infraorbital, palatine, {{sphenopalatine}}',
  '> Maxillary v. + superficial temporal v. → {{retromandibular}} vein',
  '> Pterygoid plexus ↔ facial v. (deep facial v.) · ↔ cavernous sinus (emissary v. through foramen ovale)'
]);
S_('D-C4', [
  '> V3 leaves through foramen {{ovale}}',
  '- Sensory: auriculotemporal, inferior alveolar → {{mental}} nerve, buccal, + the tongue branch below',
  '- Motor: muscles of mastication, tensor veli palatini, tensor tympani, {{mylohyoid}} (+ anterior digastric)',
  '> Chorda tympani (CN VII) joins the {{lingual}} nerve → taste of anterior 2/3 + secretomotor to submandibular ganglion',
  '> CN IX → lesser petrosal → {{otic}} ganglion → auriculotemporal → parotid'
]);
S_('D-C5', [
  '- TMJ = modified hinge: condyle + mandibular fossa + articular tubercle',
  '> Articular {{disc}} splits the joint → superior + inferior compartments',
  '- Lateral ligament + stylomandibular + {{sphenomandibular}} ligaments',
  '> Mandible fracture on one side → look for the {{other}} side',
  '> Inferior alveolar block at the mandibular {{foramen}} → lower teeth, gum, lower lip numb',
  '> Face infection → facial v. → deep facial v. → pterygoid plexus → emissary v. → cavernous sinus → CN III, IV, V1, VI'
]);

/* ---------- O · Oral cavity ---------- */
S_('O-C1', [
  '- Hard palate = palatine processes of {{maxillae}} + horizontal plates of palatine bones',
  '- Incisive fossa → {{nasopalatine}} nerve · greater palatine foramen → greater palatine nerve',
  '> Soft palate muscles ← CN {{X}} (pharyngeal plexus) except tensor veli palatini ← {{V3}}',
  '- Levator veli palatini elevates · palatoglossus elevates the back of tongue',
  '> Teeth ← alveolar arteries (maxillary a.) + {{superior and inferior alveolar}} nerves'
]);
S_('O-C2', [
  '- V-shaped {{terminal sulcus}} → anterior 2/3 (body) vs posterior 1/3 (root, lingual tonsil)',
  '- Foramen cecum at the apex of the V',
  '> All tongue muscles ← CN {{XII}} except palatoglossus ← CN X',
  '| Extrinsic | Action |',
  '| {{Genioglossus}} | protrude, depress |',
  '| Hyoglossus | pulls the sides down and back |',
  '| Styloglossus | {{retract}} |',
  '| Palatoglossus | elevate |'
]);
S_('O-C3', [
  '| Tongue | General sensation | Taste |',
  '| Anterior 2/3 | {{lingual}} n. (V3) | {{chorda tympani}} (VII) |',
  '| Posterior 1/3 | CN {{IX}} | CN IX |',
  '> Tongue artery (ECA branch) runs {{deep}} to hyoglossus',
  '- Hypoglossal nerve runs on the superficial side of hyoglossus'
]);
S_('O-C4', [
  '| Muscle | Nerve |',
  '| {{Mylohyoid}} | V3 |',
  '| Geniohyoid | XII (C1 fibres) |',
  '| Digastric anterior / posterior | V3 / {{VII}} |',
  '| Stylohyoid | VII |',
  '> Submandibular duct opens at the sublingual {{caruncle}}',
  '- Submandibular gland = mixed, mostly {{serous}}',
  '! Platysma covers the anterior belly of digastric'
]);
S_('O-C5', [
  '- Nasopharynx: pharyngeal tonsil, opening of the {{pharyngotympanic}} tube',
  '- Oropharynx: soft palate → epiglottis; palatine tonsils',
  '- Laryngopharynx: {{piriform}} recess beside the larynx → fish bones lodge',
  '> 3 constrictors ← pharyngeal plexus of CN {{X}} → swallowing',
  '! Stylopharyngeus ← CN {{IX}} = the one exception'
]);

/* ---------- J · Deep neck ---------- */
S_('J-C1', [
  '- Right CCA ← {{brachiocephalic}} trunk · left CCA ← aortic arch',
  '> Carotid bifurcation = commonest site of {{plaque}} → cerebral embolism',
  '- ECA branches: superior thyroid, lingual, facial, occipital, maxillary, superficial temporal',
  '> Subclavian a. → 3 parts by {{anterior scalene}}',
  '- 1st: vertebral, internal thoracic, {{thyrocervical}} trunk (inferior thyroid a.) · 2nd: costocervical · 3rd: dorsal scapular',
  '- Phrenic nerve runs down on the front of that muscle'
]);
S_('J-C2', [
  '- IJV drains facial, lingual and thyroid veins',
  '> Central line sites: internal jugular, {{subclavian}}, femoral veins, PICC',
  '- Why: CVP, irritant drugs, high flow, no peripheral access',
  '| Site | Typical complication |',
  '| IJV | {{arterial}} puncture (carotid) |',
  '| Under the clavicle | {{pneumothorax}}, haemothorax |'
]);
S_('J-C3', [
  '- Carotid sheath: carotid a., internal jugular v., {{vagus}} n.',
  '| Nerve | Supplies |',
  '| {{External}} laryngeal | cricothyroid (+ part of the lowest constrictor) |',
  '| Internal laryngeal | mucosa above the {{true vocal cord}}, epiglottis |',
  '| Recurrent laryngeal | rest of larynx; in the tracheoesophageal groove |',
  '> Tie superior thyroid a. → the nerve to cricothyroid at risk',
  '> Tie {{inferior}} thyroid a. → recurrent laryngeal n. at risk'
]);
S_('J-C4', [
  '| Ganglion | Level |',
  '| Superior cervical | {{C2}} |',
  '| Middle cervical | C6 |',
  '| Inferior cervical | C7 |',
  '> Inferior cervical + 1st thoracic = {{stellate}} ganglion',
  '> Trunk damaged → Horner: {{ptosis}} + miosis + anhidrosis (± enophthalmos)'
]);
S_('J-C5', [
  '- Superior nodes: retropharyngeal, deep parotid, jugulodigastric, jugulo-omohyoid · inferior: {{supraclavicular}}',
  '| Fascia | Wraps |',
  '| Investing | SCM + {{trapezius}} |',
  '| Pretracheal | larynx, trachea, thyroid |',
  '| Buccopharyngeal | behind the pharynx and oesophagus |',
  '| {{Prevertebral}} | vertebral muscles |',
  '> Alar fascia splits the space behind → true retropharyngeal space + {{danger}} space'
]);

/* ---------- Z · Cranial cavity ---------- */
S_('Z-C1', [
  '= S · C · A · L · P: skin, connective tissue, aponeurosis (galea), loose connective tissue, pericranium',
  '> Loose {{areolar}} layer = the "danger" layer → infection and blood spread',
  '| Newborn bleed | Layer | Crosses sutures? |',
  '| Caput succedaneum | oedema in skin + connective tissue | yes |',
  '| {{Subgaleal}} haemorrhage | under the aponeurosis | yes |',
  '| {{Cephalohaematoma}} | under the pericranium | {{no}} |'
]);
S_('Z-C2', [
  '- Dura (pachymeninx) = periosteal + meningeal layers → dural venous sinuses between them',
  '- Arachnoid + pia = leptomeninges; CSF in the subarachnoid space; arachnoid {{granulations}} drain CSF',
  '| Bleed | Vessel | Space |',
  '| Epidural | {{middle meningeal}} a. (via foramen spinosum) | skull ↔ dura |',
  '| Subdural | {{bridging}} veins | dura ↔ arachnoid |',
  '| Subarachnoid | {{aneurysm}} of circle of Willis | arachnoid ↔ pia |'
]);
S_('Z-C3', [
  '- {{Falx cerebri}} between the two hemispheres · falx cerebelli between cerebellar hemispheres',
  '> {{Tentorium}} cerebelli roofs the posterior fossa → supra- vs infratentorial',
  '> Midbrain passes the tentorial {{notch}}',
  '- {{Diaphragma}} sellae roofs the pituitary fossa',
  '- Dural pain → referred headache along V and upper cervical nerves'
]);
S_('Z-C4', [
  '| Class | Nerves |',
  '| Purely sensory | I, II, {{VIII}} |',
  '| Purely motor | III, IV, {{VI}}, XI, XII |',
  '| Mixed | {{V, VII, IX, X}} |',
  '| Carry parasympathetic | {{III, VII, IX, X}} |',
  '- CN II is really a CNS tract · intermediate nerve = sensory + parasympathetic part of VII'
]);
S_('Z-C5', [
  '> Anterior circulation = {{internal carotid}} arteries · posterior = vertebral → basilar',
  '- Circle of Willis joins them via communicating arteries',
  '- Sinuses: superior and inferior sagittal, {{straight}}, transverse, sigmoid → internal jugular v.',
  '| Cavernous sinus | Structures |',
  '| Inside | ICA + CN {{VI}} |',
  '| Lateral wall | CN III, IV, V1, V2 |',
  '> Connections: {{pterygoid}} plexus, basilar plexus → internal vertebral venous plexus'
]);

/* ---------- M · Membrane potential ---------- */
S_('M-C1', [
  '- Inside: K⁺ high · outside: Na⁺, Cl⁻ high · inside negative at rest',
  '| Ion | Chemical force | Electrical force | Net |',
  '| Na⁺ | in | in | strongly {{in}} |',
  '| K⁺ | {{out}} | in | small (they oppose) |',
  '> Open many Na⁺ channels → Na⁺ rushes in',
  '> K⁺ forces nearly cancel → K⁺ is {{closer}} to equilibrium at rest'
]);
S_('M-C2', [
  '- Neuronal RMP ≈ {{−70}} mV, inside negative',
  '> 1. Ion gradients (K⁺ in, Na⁺ out)',
  '> 2. Selective permeability: at rest pK ≫ pNa via {{non-gated K⁺}} (leak) channels',
  '> 3. Na⁺/K⁺ ATPase: 3 Na⁺ out, 2 K⁺ in → {{maintains}} the gradients',
  '! Pump stops → Vm stays near normal at first → the pump is not what makes Vm moment to moment'
]);
S_('M-C3', [
  '> Equilibrium potential = Vm where chemical and electrical forces on one ion are equal and opposite → net flux {{zero}}',
  '- Nernst gives it for one ion from [in] and [out]',
  '- [Na⁺]out ≫ [Na⁺]in → E<sub>Na</sub> {{positive}} (≈ +60) · E<sub>K</sub> ≈ −90',
  '> Goldman: Vm depends on concentrations AND relative {{permeability}}',
  '> Vm is pulled toward E of the most permeable ion → at rest {{closer to E<sub>K</sub>}}',
  '! pK ↑ → Vm moves toward E<sub>K</sub>'
]);
S_('M-C4', [
  '> Stimulus → reaches {{threshold}} → voltage-gated Na⁺ open → Na⁺ in → depolarisation',
  '> Voltage-gated {{K⁺}} open → K⁺ out → repolarisation → undershoot → back to rest',
  '- All-or-none: once triggered → same size; amplitude fixed by E<sub>Na</sub> and E<sub>K</sub>',
  '| Period | Second AP? | Why |',
  '| Absolute | {{never}} | Na⁺ channels inactivated |',
  '| Relative | with a {{stronger}} stimulus | some Na⁺ channels recovered |',
  '! The Na⁺/K⁺ pump does not make the spike'
]);
S_('M-C5', [
  '> Mild ↑K⁺ → Vm less negative → closer to threshold → excitability {{↑}}',
  '> Severe, sustained ↑K⁺ → Na⁺ channels stay {{inactivated}} → excitability ↓ (conduction fails)',
  '> ↓K⁺ → Vm more negative → excitability ↓',
  '> ↓Na⁺ → E<sub>Na</sub> less positive → Na⁺ driving force ↓',
  '- K⁺ sets the {{resting}} potential · Na⁺ drives the action potential',
  '> Marathon runner: hyponatraemia → plasma hypotonic → water into brain cells → {{cerebral swelling}} → headache, confusion'
]);

/* ---------- P · Nerve & NMJ ---------- */
S_('P-C1', [
  '= τ = Rm × Cm',
  '> Low membrane {{capacitance}} → voltage changes faster',
  '= λ ∝ √(Rm / Ra)',
  '> High membrane resistance → less current leaks → spreads {{farther}}',
  '> Myelin → Rm {{↑}} + Cm ↓ → faster conduction',
  '> Wider axon → axial resistance (Ra) {{↓}} → faster'
]);
S_('P-C2', [
  '- Unmyelinated → continuous conduction → slow',
  '> Myelinated → current runs fast under myelin → AP regenerated at {{nodes of Ranvier}} (saltatory)',
  '> Demyelination → Rm ↓, Cm ↑ → current leaks → slow → {{conduction block}}',
  '| Disease | Site | Lesion |',
  '| GBS | {{PNS}} | demyelination after infection |',
  '| MS, NMO | CNS | demyelination / astrocytopathy |',
  '| Diabetic neuropathy | PNS | mostly {{axonal}} |'
]);
S_('P-C3', [
  '> AP at terminal → voltage-gated {{Ca²⁺}} channels open → ion entry → ACh released',
  '> ACh → nicotinic receptor → {{end-plate potential}} → threshold → voltage-gated Na⁺ → muscle AP',
  '| | EPP | Muscle AP |',
  '| Channel | nAChR | voltage-gated Na⁺ |',
  '| Type | {{graded}} | all-or-none |',
  '| Propagates? | {{no}} | yes |'
]);
S_('P-C4', [
  '| Failure point | Example |',
  '| Ca²⁺ entry | {{LEMS}} (antibody to VGCC; small-cell lung cancer) |',
  '| ACh release | {{botulinum}} toxin → flaccid paralysis |',
  '| nAChR | myasthenia gravis (thymus antibodies), α-bungarotoxin |',
  '| Nerve Na⁺ channels | {{tetrodotoxin}} |',
  '> MG → fewer receptors → smaller EPP → misses threshold → fatigable, {{ocular}}, bulbar weakness',
  '! Tetanus toxin → blocks GABA/glycine release from inhibitory interneurons → {{spastic}} paralysis',
  '---',
  '@X1'
]);
S_('P-C5', [
  '> AChE inhibited → ACh stays → prolonged depolarisation → Na⁺ channels inactivated → fasciculation → {{weakness}}',
  '- Neostigmine = reversible · organophosphate = essentially {{irreversible}}',
  '| | Atracurium | Succinylcholine |',
  '| Type | {{non-depolarising}} | depolarising |',
  '| At nAChR | antagonist | {{agonist}} |',
  '| Fasciculation | no | yes |',
  '| End | flaccid paralysis | flaccid paralysis |'
]);

/* ---------- L · Lab nerve & NMJ ---------- */
S_('L-C1', [
  '| 2nd stimulus falls | 2nd response |',
  '| After the refractory period of all fibres | normal size |',
  '| In the refractory period of {{some}} fibres | smaller |',
  '| In the refractory period of all fibres | {{none}} |',
  '> Absolute = impossible ({{Na⁺ channels inactivated}}) · relative = possible but needs a stronger stimulus'
]);
S_('L-C2', [
  '> Nerve = many axons with different speeds → recording = {{sum}} of their APs → compound AP',
  '- A CAP is not the AP of one axon',
  '> Peaks in order: Aα → Aβ/Aγ → Aδ → B → {{C}}',
  '> Larger diameter + myelin → {{faster}}',
  '- Fast: motor, touch, proprioception · slow: some pain, temperature, {{postganglionic}} autonomic'
]);
S_('L-C3', [
  '= Velocity = distance ÷ (latency₂ − latency₁)',
  '> Latency also holds fixed delays (NMJ, muscle, electrodes) → stimulate at {{two}} sites → {{subtract}} → delays cancel',
  '> Worked: 40 mm, latencies 3 and 5 ms → 0.04 m ÷ 0.002 s = {{20}} m/s'
]);
S_('L-C4', [
  '- Order: anode → {{cathode}} → recording electrodes → ground',
  '> This negative electrode → local {{depolarisation}} → AP starts here',
  '> Anode placed between it and the recording → hyperpolarises → AP blocked = {{anodal block}}',
  '> Result: latency {{↑}} + amplitude ↓ (fewer fibres get through)'
]);
S_('L-C5', [
  '| Drop on NMJ | Stimulate nerve | Stimulate muscle |',
  '| Saline (control) | ✓ | ✓ |',
  '| Low-dose ACh | {{contracts}} | ✓ |',
  '| High-dose ACh | {{no contraction}} | ✓ |',
  '| Succinylcholine | ✗ (after fasciculation) | {{contracts}} |',
  '> Direct muscle stimulation skips the NMJ → muscle still works → the block is at the {{NMJ}}'
]);

/* ---------- A · ANS physiology ---------- */
S_('A-C1', [
  '> Somatic: 1 neuron → skeletal muscle · ANS: preganglionic → {{ganglion}} → postganglionic → smooth, cardiac muscle, glands',
  '- The synapse there = site of transmission and modulation, not a simple relay',
  '| Potential | Receptor | Role |',
  '| Fast EPSP (ms) | {{nicotinic}} N2 | fires the AP |',
  '| Slow EPSP (min) | muscarinic {{M1}} | sets excitability |',
  '| Slow IPSP (s) | dopamine D2 from SIF cell | sets excitability |'
]);
S_('A-C2', [
  '> Every preganglionic neuron → {{ACh}} → nicotinic receptor',
  '> Parasympathetic postganglionic → ACh → {{muscarinic}}',
  '> Sympathetic postganglionic → usually {{NE}} → adrenergic',
  '! Eccrine sweat glands: sympathetic but {{cholinergic}} (ACh)',
  '! Adrenal medulla = modified ganglion → ACh → nicotinic → adrenaline into blood'
]);
S_('A-C3', [
  '| | Sympathetic | Parasympathetic |',
  '| Mood | fight or flight | rest and digest |',
  '| Spread | fast, {{wide}} | slow, local |',
  '| Outflow | {{thoracolumbar}} | craniosacral |',
  '- Paravertebral chain: cervical 3, thoracic 12, lumbar 4, sacral 4–5',
  '- {{Prevertebral}} ganglia: celiac, superior and inferior mesenteric',
  '- Enteric nervous system runs the gut on its own'
]);
S_('A-C4', [
  '> Sympathetic → superior cervical ganglion → iris {{radial}} (dilator) → mydriasis',
  '> Parasympathetic → Edinger–Westphal → CN III → sphincter → miosis; {{ciliary}} muscle → near focus',
  '- Upper eyelid: superior tarsal (Müller) = sympathetic · levator palpebrae = {{somatic}}',
  '- Lacrimal, nasal glands: parasympathetic strongly ↑ secretion',
  '- Saliva: parasympathetic = watery · sympathetic = {{viscous}}',
  '- Vessels: sympathetic constricts strongly · heart: sympathetic ↑, vagus ↓'
]);
S_('A-C5', [
  '| Organ | Sympathetic | Parasympathetic |',
  '| Bladder | hypogastric n. → detrusor relaxes, internal sphincter {{contracts}} | {{pelvic}} n. → detrusor squeezes |',
  '| Gut | restrains peristalsis | vagus → turns on peristalsis |',
  '| Sweat | eccrine (cholinergic), apocrine (NE) | — |',
  '| Male | emission, ejaculation | {{erection}} (NO vasodilation) |',
  '- External urethral sphincter = skeletal → {{pudendal}} n.',
  '- Myenteric plexus → motility · submucosal plexus → secretion'
]);
S_('A-C6', [
  '| Receptor | Main effect |',
  '| α1 | contracts vessels, iris {{radial}}, urinary sphincter |',
  '| α2 | presynaptic {{autoreceptor}} (↓ NE release); relaxes gut |',
  '| β1 | heart rate and force ↑ |',
  '| β2 | relaxes {{airway}}, vessels, gut, bladder wall |',
  '| N1 / N2 | skeletal muscle / ganglion |',
  '| M2 | heart {{↓}} |',
  '| M3 | glands secrete |'
]);

/* ---------- G · ANS integration ---------- */
S_('G-C1', [
  '= Ptosis + miosis + anhidrosis (± enophthalmos) = loss of {{sympathetic}} supply',
  '| Neuron | Path | Example lesion |',
  '| 1st | hypothalamus → brainstem → C8–T1 | {{lateral medullary}} syndrome, brain tumour |',
  '| 2nd (preganglionic) | T1 → paravertebral chain → superior cervical ganglion | {{lung}} tumour |',
  '| 3rd (postganglionic) | along the {{internal carotid}} → eye | dissection, cavernous sinus tumour |',
  '---',
  '@X1'
]);
S_('G-C2', [
  '> Cocaine blocks NE {{reuptake}} → normal eye dilates · Horner eye: no NE released → {{no change}}',
  '> Apraclonidine: strong α2 → ↓ NE → normal pupil constricts a little',
  '> Horner iris is {{hypersensitive}} → weak α1 effect dilates it → anisocoria reverses',
  '- Paredrine test → localises: preganglionic vs {{postganglionic}}'
]);
S_('G-C3', [
  '> Cold → sympathetic activation → digital {{vasoconstriction}} → flow ↓',
  '| Colour | Means |',
  '| White | {{pallor}}: worst arterial flow ↓ |',
  '| Blue | {{cyanosis}}: deoxygenated blood |',
  '| Red | rubor: reflow |',
  '> Repeated attacks → pain, ulcers, {{necrosis}} = failure of perfusion'
]);
S_('G-C4', [
  '| Step | Result on that side |',
  '| 1. Cut cervical sympathetic | Horner signs (supply {{damaged}}) |',
  '| 2. Stimulate preganglionic (distal stump) | mydriasis, wide fissure |',
  '| 3. Nicotine high dose | {{ganglion block}} → Horner signs return |',
  '| 4. Stimulate beyond the ganglion | {{over-activated}}: mydriasis again |',
  '> Nicotine acts on the ganglion cell bodies only → the {{postganglionic}} fibre still works'
]);
S_('G-C5', [
  '- BP ← vessels ({{α1}}) · HR ← heart (β1) · pupil ← α1 · dog gut ← α2 > β2',
  '> Epinephrine → BP ↑, HR ↑ · after propranolol → only the {{α}} effect is left',
  '> ACh → HR ↓, BP ↓, gut ↑ · after {{atropine}} → no muscarinic effect',
  '> Phentolamine (α-blocker) then epinephrine → β2 vasodilation unmasked → BP {{↓}}',
  '> Isoproterenol (pure β) → HR ↑, BP ↓',
  '! HR ↓ + BP ↓ + gut ↑ + small pupil = {{parasympathetic}} pattern'
]);

/* ---------- E · Eye & orbit ---------- */
S_('E-C1', [
  '- 7 bones, pyramid: apex behind, base = orbital margin',
  '- Medial wall = thin lamina {{papyracea}} (ethmoid) · floor over the maxillary sinus → blowout fracture',
  '| Opening | Transmits |',
  '| Optic canal (lesser wing) | CN II + {{ophthalmic}} artery |',
  '| Superior orbital fissure | CN III, IV, V1, {{VI}} |',
  '| Inferior orbital fissure | V2 (zygomatic n.), orbital veins |',
  '| Groove / canal in the orbital floor | {{infraorbital}} nerve and vessels |'
]);
S_('E-C2', [
  '= LR6 · SO4 · everything else CN III',
  '- Levator palpebrae (CN III) raises the lid · superior tarsal (Müller) = smooth, {{sympathetic}}',
  '> Eye abducted (by LR) → only the {{recti}} elevate / depress → test SR and IR',
  '> Eye adducted (by MR) → only the {{obliques}} elevate / depress → test IO and SO',
  '- Yoke muscles move both eyes together → 6 cardinal directions',
  '! Squint (strabismus) = the yoke pair is out of step'
]);
S_('E-C3', [
  '- Tarsal plate = dense connective tissue frame of the lid · stye = infected lid gland',
  '- Conjunctiva: palpebral + bulbar, meet at the fornix; stratified columnar with {{goblet}} cells',
  '| Tear layer | Source |',
  '| Watery (serous) | lacrimal gland |',
  '| Mucous | conjunctiva |',
  '| Lipid | {{Meibomian}} glands |',
  '> Tears made ← parasympathetic CN {{VII}}',
  '> Drainage: lacrimal {{punctum}} → canaliculi → sac → nasolacrimal duct → nose'
]);
S_('E-C4', [
  '| Tunic | Parts |',
  '| Outer fibrous | cornea (front 1/6) + sclera (back 5/6) |',
  '| Middle vascular (uvea) | iris + ciliary body + {{choroid}} |',
  '| Inner nervous | retina |',
  '- Cornea: transparent, {{avascular}}, refracts',
  '- Lamina {{cribrosa}} = where the optic nerve pierces the sclera',
  '> Optic disc = {{blind spot}} · macula → fovea centralis = cones only, sharpest vision'
]);
S_('E-C5', [
  '| Muscle | Nerve | Effect |',
  '| Dilator pupillae | sympathetic | {{mydriasis}} |',
  '| Sphincter pupillae | parasympathetic (CN III) | miosis |',
  '| Ciliary muscle | parasympathetic (CN III) | lens thickens → {{accommodation}} |',
  '> Ciliary processes → aqueous → posterior chamber → pupil → anterior chamber',
  '> Drains: {{trabecular}} meshwork → canal of Schlemm (80%) · uveoscleral (20%)',
  '! Blocked drainage → pressure ↑ → {{glaucoma}} · cloudy lens = cataract'
]);
S_('E-C6', [
  '- CN II is a CNS tract (meninges around it) → raised ICP → {{papilledema}}',
  '- V1 branches: frontal, lacrimal, {{nasociliary}} (cornea → afferent of the corneal reflex)',
  '> CN III parasympathetic → {{ciliary}} ganglion → its short nerves → sphincter pupillae + the muscle of accommodation',
  '- Sympathetic and sensory fibres pass through the ganglion without synapsing'
]);

/* ---------- R · Reflex ---------- */
S_('R-C1', [
  '> Receptor → afferent → {{centre}} (cord / brainstem) → efferent → effector',
  '| Classed by | Types |',
  '| Receptor site | superficial (skin) · deep (muscle, tendon) · visceral |',
  '| Synapses | mono (stretch) · di (tendon) · {{poly}} (withdrawal, most) |',
  '| Level | spinal · cranial (brainstem) |',
  '| Effector | {{somatic}} (skeletal) · autonomic |',
  '- The brain modulates the arc from above'
]);
S_('R-C2', [
  '| | Stretch reflex | Tendon reflex |',
  '| Receptor | muscle spindle | {{Golgi tendon organ}} |',
  '| Senses | length ↑ | {{tension}} ↑ |',
  '| Afferent | Ia (faster) | Ib |',
  '| Synapses | {{mono}} | di |',
  '| Response | muscle contracts | muscle relaxes |',
  '- Spindle = intrafusal fibres (γ motor) · bulk = extrafusal (α motor)',
  '> Spasticity → clasp knife: early resistance (stretch) → sudden give (tendon)'
]);
S_('R-C3', [
  '> Painful stimulus → flexors contract → limb withdraws = {{flexor}} reflex (polysynaptic)',
  '> 0.2–0.5 s later → opposite limb extends → pushes the body away, keeps balance = crossed {{extensor}} reflex',
  '| Interneuron circuit | Job |',
  '| Divergence | spreads to all the muscles needed |',
  '| {{Reciprocal inhibition}} | relaxes the antagonists |',
  '| Reverberating | {{afterdischarge}}: contraction outlasts the stimulus |'
]);
S_('R-C4', [
  '> Lesion at or below the reflex centre, or in the nerve → {{hyporeflexia}}',
  '> Lesion above the centre → exaggerated reflexes + pathological reflexes (Babinski)',
  '> Acute cord transection → spinal {{shock}}: flaccid, anaesthetic, areflexic below; hypotension, retention',
  '> After days–months (2–3) → stretch reflex returns first → {{hyperreflexia}} + Babinski',
  '- Muscle spasm reflex: broken bone, peritonitis, cramps'
]);
S_('R-C5', [
  '| Reflex | Nerve | Root |',
  '| Biceps | {{musculocutaneous}} | C5–C6 |',
  '| Brachioradialis | radial | C5–C6 |',
  '| Triceps | radial | {{C7–C8}} |',
  '| Patellar | femoral | L2–L4 |',
  '| Achilles | tibial | {{S1–S2}} |',
  '- Grade: 0 none · 1+ low · 2+ normal · 3+ brisk · 4+ {{clonus}}',
  '> Jaw jerk: CN V, pons → normally {{absent}}; brisk = lesion above the pons',
  '- Weak response → reinforce (Jendrassik)'
]);
S_('R-C6', [
  '| Reflex | Afferent → efferent | Centre |',
  '| Corneal | V → {{VII}} (both eyes blink) | pons |',
  '| Gag | IX → X | {{medulla}} |',
  '| Pupillary light | II → III (both pupils) | {{midbrain}} |',
  '- Abdominal T5–T12/L1 · cremasteric L1–L2 · anal (wink) S1–S4',
  '> Plantar: stroke lateral sole → normal flexion · big toe up + fanning = {{Babinski}} sign',
  '- Accommodation: constriction + convergence + lens thickening'
]);

/* ---------- W · Light & laser ---------- */
S_('W-C1', [
  '- Physical optics = wave · geometrical optics = rays · quantum optics = photons',
  '= c = λ × ν',
  '> Into a medium: speed ↓ (v = c/n) · frequency {{unchanged}} · wavelength {{shorter}}',
  '= E = hν',
  '> Higher frequency → more {{energy}} per photon'
]);
S_('W-C2', [
  '= LASER = light amplification by {{stimulated emission}} of radiation',
  '- Needs: active medium + energy {{pumping}} + optical feedback (mirrors)',
  '| Property | Use |',
  '| Monochromatic | focus to a tiny spot |',
  '| {{Directional}} | easy to collect and focus |',
  '| {{Coherent}} | interference (diagnostic interferometry) |',
  '- Sources: solid (ruby, Nd:YAG, diode), liquid (dye), gas (Ar, Kr, CO₂, excimer ArF, HeNe)'
]);
S_('W-C3', [
  '| Interaction | Power density | Example |',
  '| Photochemical | low (~1 W/cm²) + a {{dye}} | PDT (verteporfin), corneal cross-linking (riboflavin + UVA) |',
  '| {{Thermal}} | 10–10⁶ W/cm² | photocoagulation via haemoglobin, melanin |',
  '| Photoablation | 10⁷–10⁸, UV (193 nm excimer) | {{LASIK}}, PRK |',
  '| Plasma-induced | 10¹¹–10¹³, pico/femtosecond | clean cuts |',
  '| Photodisruption | highest pulse energy | {{Nd:YAG}} |',
  '> Shorter, stronger pulses → less heat to the surroundings'
]);
S_('W-C4', [
  '- Diagnosis: slit lamp, autorefraction, direct / indirect ophthalmoscope, {{OCT}}',
  '- Before cataract surgery: partial coherence {{interferometry}} measures the eye for the IOL',
  '> SMILE → femtosecond laser cuts a {{lenticule}} → removed through a small cut, no flap',
  '- Femtosecond laser cataract surgery · laser {{photocoagulation}} of the retina'
]);
S_('W-C5', [
  '| Specialty | Use |',
  '| Dermatology | skin disease, tumours, cosmetic, hair |',
  '| Gynaecology | {{CO₂}} (cut, vaporise), Er:YAG, Nd:YAG / KTP (endoscopic) |',
  '| Urology | tumours, {{stones}}, prostate |',
  '| Neurosurgery | brain and spine tumours |',
  '| Cardiology | open blocked vessels |',
  '| Dentistry | caries, endodontics, {{whitening}} |'
]);

/* ---------- H · Ear ---------- */
S_('H-C1', [
  '- External meatus = S-shaped: outer {{1/3}} cartilage, inner 2/3 bone',
  '- Wax (cerumen) glands only in the outer third',
  '> Examine: pull the pinna up, back and out → straightens the meatus',
  '- Drum: handle of malleus ends at the {{umbo}} → cone of light points down and forward',
  '- Upper thin part = pars {{flaccida}} · rest = pars tensa'
]);
S_('H-C2', [
  '- Lies in the petrous temporal; epitympanic recess above the drum level',
  '| Wall | Features |',
  '| Lateral | tympanic membrane |',
  '| Medial | {{promontory}} (tympanic plexus), oval + round windows, facial canal, lateral canal |',
  '| Roof | tegmen tympani → middle cranial fossa |',
  '| Floor | {{internal jugular}} vein |',
  '| Anterior | Eustachian tube, tensor tympani canal, carotid canal |',
  '| Posterior | aditus → {{mastoid}} antrum, pyramidal eminence, chorda opening |'
]);
S_('H-C3', [
  '> Malleus → incus → stapes → {{oval window}} · drum area ≫ footplate area → amplifies',
  '| Muscle | Nerve |',
  '| Tensor tympani | {{V3}} |',
  '| Stapedius | VII |',
  '> Both damp loud sound → protect the inner ear',
  '- Eustachian tube: upper 1/3 {{bone}}, lower 2/3 cartilage → nasopharynx',
  '> Equalises pressure + drains the middle ear; opened by {{levator}} and tensor veli palatini'
]);
S_('H-C4', [
  '- Bony labyrinth (vestibule, canals, cochlea) holds {{perilymph}}',
  '- Membranous labyrinth (utricle, saccule and the ducts) holds endolymph',
  '- Utricle ↔ semicircular ducts · saccule ↔ {{cochlear duct}}',
  '| Receptor | Where | Senses |',
  '| Macula | utricle, saccule | head position, gravity (otoliths) |',
  '| {{Crista}} ampullaris | ampulla of each duct | rotation (cupula, no otoliths) |',
  '> Stereocilia bend toward / away from the {{kinocilium}} → transmitter release ↑ / ↓'
]);
S_('H-C5', [
  '- Scala vestibuli + scala tympani = perilymph · cochlear duct = endolymph (made by stria vascularis)',
  '> Duct floor = {{basilar}} membrane (holds the organ of Corti) · roof = vestibular membrane',
  '- Organ of Corti: inner + outer hair cells, {{tectorial}} membrane, pillar and phalangeal cells',
  '> Base → {{high}} frequency · apex (helicotrema) → low frequency',
  '> Hair cells → {{spiral}} ganglion → cochlear nerve → CN VIII'
]);
S_('H-C6', [
  '| Type | Site | Examples |',
  '| {{Conductive}} | outer or middle ear | wax, perforated drum, otitis media |',
  '| Sensorineural | inner ear or CN VIII | noise, presbycusis, Ménière, CN VIII tumour |',
  '- Sensorineural may bring tinnitus and vertigo',
  '> Chronic otitis media spreads: up through the {{tegmen}} → meningitis · back → mastoiditis',
  '> Down and back → {{sigmoid}} sinus thrombosis · medial → facial nerve palsy'
]);

/* ---------- X · ANS head & neck ---------- */
S_('X-C1', [
  '| | Preganglionic | Postganglionic |',
  '| Sympathetic | T1–T3 cord | superior {{cervical}} ganglion → carotid plexuses |',
  '| Parasympathetic | brainstem nuclei → cranial nerves | ganglion near the target |',
  '| Nucleus | Nerve | Ganglion | Target |',
  '| Edinger–Westphal | III | {{ciliary}} | sphincter, muscle of accommodation |',
  '| Superior salivatory | VII | pterygopalatine | lacrimal, nasal, palatal glands |',
  '| Superior salivatory | VII | {{submandibular}} | floor-of-mouth salivary glands |',
  '| Inferior salivatory | IX | {{otic}} | parotid |'
]);
S_('X-C2', [
  '> N1 hypothalamus → N2 {{T1}} lateral horn → N3 superior cervical ganglion',
  '> Fibres on the {{internal}} carotid → pupil (pupillomotor)',
  '> Fibres on the external carotid → face sweat glands and vessels ({{sudomotor}}, vasomotor)',
  '> Lesion anywhere → Horner: ptosis (tarsal muscle), miosis ({{dilator}}), facial anhidrosis'
]);
S_('X-C3', [
  '> EW nucleus → CN III → ciliary ganglion → short ciliary nerves → sphincter (constrict) + ciliary muscle (lens {{thickens}})',
  '| CN III lesion | Because |',
  '| Mild ptosis | levator palpebrae weak |',
  '| Eye {{down and out}} | SR, IR, MR, IO weak; LR + SO unopposed |',
  '| {{Mydriasis}} | sphincter pupillae weak |'
]);
S_('X-C4', [
  '> Superior salivatory → intermediate nerve → {{greater petrosal}} n.',
  '> + deep petrosal (sympathetic) → nerve of the {{pterygoid canal}} (Vidian)',
  '> → pterygopalatine ganglion → zygomatic → V1 branch → {{lacrimal}} gland; → nasal, palatal glands',
  '> Other route: chorda tympani → {{lingual}} n. → submandibular ganglion → submandibular + sublingual glands'
]);
S_('X-C5', [
  '- Branches top → bottom: greater petrosal (tears) → stapedial (sound damping) → {{chorda tympani}} (taste, saliva) → motor branches',
  '> The level = just above the highest branch that is lost',
  '> At the stylomastoid foramen → hemifacial {{paralysis}} only',
  '> At the internal acoustic meatus → CN VII + CN {{VIII}}',
  '- Bell palsy = inflammation of the facial nerve due to {{herpes}} virus',
  '> Crocodile tears: injury above the geniculate → regrowing taste (salivary) fibres go to the {{lacrimal}} gland → tears while eating',
  '---',
  '@X1'
]);
S_('X-C6', [
  '> Inferior salivatory → CN IX → tympanic n. → tympanic plexus → {{lesser petrosal}} n.',
  '> → otic ganglion → {{auriculotemporal}} n. (V3) → parotid',
  '| CN IX lesion (same side) | Detail |',
  '| Posterior 1/3 tongue | general + taste lost |',
  '| Gag reflex ↓ | afferent IX, efferent {{X}} |',
  '| Uvula deviates | — |',
  '> Frey syndrome: after parotidectomy → parasympathetic fibres regrow into {{sweat}} glands → sweating while eating'
]);

/* ---------- S · Sound & hearing ---------- */
S_('S-C1', [
  '| Physics | Heard as |',
  '| Amplitude | loudness |',
  '| Frequency | {{pitch}} |',
  '| Phase | not heard directly |',
  '= velocity = wavelength ÷ period · frequency = 1 ÷ period',
  '- Sound in air ≈ 343 m/s (20 °C) · 341 m/s (25 °C)',
  '> Period 10 ms → {{100}} Hz',
  '- Range 20–20,000 Hz · best 1000–{{4000}} Hz (speech) · high frequencies go first with age'
]);
S_('S-C2', [
  '= dB = 10 log (I₁/I₂) = 20 log (P₁/P₂)',
  '| Scale | Reference (0 dB) |',
  '| dB SPL | 20 µPa |',
  '| dB HL | normal threshold at {{that frequency}} |',
  '| dB SL | {{this patient’s}} threshold |',
  '> dB HL = dB SPL − reference threshold (RETSPL) → 60 dB SPL at 1000 Hz = {{52.5}} dB HL',
  '> Threshold 50 dB HL + want 30 dB SL → present {{80}} dB HL',
  '- Up to 140 dB SPL = uncomfortable; threshold → UCL = dynamic range'
]);
S_('S-C3', [
  '- Duplex theory (Rayleigh, 1907)',
  '| Frequency | Cue |',
  '| Low | interaural {{time}} difference |',
  '| High | interaural {{level}} difference (head shadow) |',
  '> Ears 23 cm apart → max ITD = 0.23 ÷ 343 ≈ {{0.67}} ms',
  '> Half a wavelength = 23 cm → λ 0.46 m → ≈ 746 Hz → above this, phase cues get ambiguous',
  '- Pinna → front–back and up–down (head-related transfer function)'
]);
S_('S-C4', [
  '> Ear canal = tube closed by the drum → resonates at λ = {{4}} × length → 4 × 2.3 cm → ≈ 3700 Hz',
  '> Those frequencies are boosted most → noise damage notch at {{3000–4000}} Hz',
  '| Middle-ear mechanism | Gain |',
  '| Area ratio 55 ÷ 3.2 mm² ≈ 17× | {{24.6}} dB (largest) |',
  '| Ossicular lever 1.3× | 2.27 dB |',
  '| Drum buckling 2× | 6 dB |',
  '= Total ≈ 33.9 dB → overcomes the air → fluid {{impedance}} mismatch'
]);
S_('S-C5', [
  '| Basilar membrane | Base | Apex |',
  '| Width | narrow | wide |',
  '| Stiffness | {{stiff}} | flexible |',
  '| Tuned to | {{high}} frequency | low frequency |',
  '> Outer hair cells move → amplify basilar membrane motion → otoacoustic emission ({{OAE}})',
  '> OAE: fast, no cooperation → newborn screening; early sign of damage from noise, age, {{ototoxic}} drugs',
  '> Inner hair cells → turn movement into nerve signals → CN VIII'
]);
S_('S-C6', [
  '| Symbol | Right | Left |',
  '| Air conduction | O (masked △) | {{X}} (masked □) |',
  '| Bone conduction | &lt; (masked [) | &gt; (masked ]) |',
  '> Bone normal, air down → {{conductive}}',
  '> Air ≈ bone, both down → sensorineural',
  '> Bone down + air worse (gap) → {{mixed}}',
  '- Degree: WHO 2019 average of 500, 1000, 2000, 4000 Hz in the better ear',
  '> Read: side → degree → type, e.g. right moderate sensorineural · add the configuration (high-frequency)',
  '- Masking = noise in the better ear so it cannot {{help}}',
  '---',
  '@X1'
]);
S_('S-C7', [
  '> Vertigo = sensory {{mismatch}} between eyes, ears, proprioception and the stored template',
  '| Input | Organ |',
  '| Angular acceleration (turning) | {{semicircular canals}} |',
  '| Linear acceleration, gravity | utricle, saccule |',
  '> Dead canal → head impulse toward it → eyes lose the target → catch-up {{saccade}}',
  '- Canals cannot sense gravity, except in {{BPPV}} (loose otoconia) → Dix–Hallpike',
  '| With hearing loss | Without |',
  '| labyrinthitis, Ménière, AICA stroke | vestibular {{neuritis}}, loose otoconia |'
]);
S_('S-C8', [
  '| Nerve | Supplies |',
  '| Superior vestibular | anterior + lateral canals, {{utricle}}, part of saccule |',
  '| Lower division | posterior canal, saccule |',
  '> Vestibular neuritis spares the {{inferior}} division',
  '| Test | Checks |',
  '| SVV (bucket test) | {{otolith}} function (tilt) |',
  '| cVEMP (neck) / oVEMP (eye) | saccule / the other macula |',
  '| Posturography | overall balance with vision and surface varied |'
]);

/* ---------- Y · SGD cases ---------- */
S_('Y-C1', [
  '- 52-year-old, lifting → low back pain shooting down the back of the right leg to the lateral foot and sole',
  '> Worse sitting, bending forward · better lying down',
  '| Finding | Points to |',
  '| Weak plantarflexion, cannot tiptoe | {{S1}} myotome |',
  '| Numb lateral foot, sole, posterolateral calf | S1 dermatome |',
  '| Absent ankle (Achilles) reflex | S1 reflex arc |',
  '= Right S1 {{radiculopathy}}',
  '! Red flags to ask: bowel, bladder, {{saddle}} numbness → cauda equina = emergency'
]);
S_('Y-C2', [
  '> Most lumbar discs = posterolateral ({{paracentral}}) → hit the traversing (lower) root',
  '> L5–S1 disc → {{S1}} root · L4–L5 disc → L5 root',
  '> Far lateral (foraminal) → hits the {{exiting}} (upper) root → L5–S1 far lateral → L5',
  '- Central disc → back pain only, or cauda equina',
  '! Cervical: C8 has no vertebra → the C6/7 disc hits {{C7}} either way'
]);
S_('Y-C3', [
  '> Straight-leg raise: pain 30–70° → sensitive for L4, L5, S1 but not {{specific}}',
  '- Lasègue: hip flexed, bend the knee → leg pain eases',
  '> Crossed SLR (raise the good leg → pain in the bad) → more {{specific}} (axillary disc)',
  '- Bragard: lower the leg a little, then dorsiflex the ankle → pain returns',
  '> Imaging of choice = {{MRI}}; false positives common → must match the examination',
  '> Surgery if motor weakness progresses, pain persists despite conservative care, or {{cauda equina}} syndrome'
]);
S_('Y-C4', [
  '- 18-year-old, motorcycle crash, brief LOC, GCS 15, bruised swollen right neck',
  '> Right partial ptosis + right miosis + less sweat on the right forehead → {{Horner}} syndrome',
  '> Ptosis is mild: levator (CN III) works; only the {{superior tarsal}} muscle is lost',
  '> Neck trauma beside the carotid → {{3rd-order}} neuron injured',
  '> Vessel = right {{internal carotid}} artery (carotid plexus) → dissection'
]);
S_('Y-C5', [
  '> Light into the left eye → retina → {{CN II}} → midbrain (pretectal → EW) → CN III → ciliary ganglion → sphincter',
  '- Same eye constricts = direct · other eye = {{consensual}}',
  '> Horner removes the sympathetic {{dilator}} tone → small pupil',
  '> The parasympathetic constrictor path is untouched → light reflex {{preserved}}'
]);
