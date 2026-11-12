/* Past-paper questions, Video 1: V back, I spine imaging, N nervous tissue, C spinal cord.
   Sources: AC80 and AC81 NS I MCQ recalls (with keys), AC81 NS I spot test, AC79 spot II (back, head & neck) + tissue stations.
   Options keep the recalled order; a = index of the key. */
(function () {
  var s81 = function (st, page) { return CVS.fig('s81-' + st, 'AC81 spot test, station ' + st.replace(/^0/, '').replace('a', '.1').replace('b', '.2') + '.', 'ac81s', page); };
  var s79 = function (st, page) { return CVS.fig('s79-' + st, 'AC79 spot II, ' + (/^t/.test(st) ? 'tissue station ' + st.slice(1) : 'station ' + st.replace(/^0/, '')) + '.', 'ac79s', page); };
  var ABCD = ['A', 'B', 'C', 'D'];

  /* ---------- V · Back ---------- */
  CVS.after('V-C2', [
    { id: 'V1', src: 'AC80', core: true,
      q: 'Fracture at which structure is less likely to cause injury to the spinal cord?',
      o: ['Transverse process', 'Facet joint', 'Uncovertebral joint', 'Pedicle', 'Interspinous ligament'], a: 0,
      ex: 'The transverse process sticks out sideways, away from the vertebral canal. The pedicle forms the side wall of the canal, and the facet and uncovertebral joints border the canal and the intervertebral foramen, so their fractures can reach the cord or roots. A torn interspinous ligament means the posterior column is unstable.' },
    { id: 'V2', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('07', 8),
      o: ['Spinous process', 'Transverse process', 'Accessory process', 'Mammillary process'], a: 1,
      ex: 'A points to the long bar that projects sideways from the junction of pedicle and lamina: the transverse process.' },
    { id: 'V3', src: 'AC81 spot', q: 'Identify structure B.', fig: s81('07', 8), figRef: 'V2',
      o: ['Pedicle', 'Lamina', 'Pars interarticularis', 'Superior articular process'], a: 1,
      ex: 'B is on the flat plate that runs from the transverse process back to the spinous process and roofs the canal: the lamina.' }
  ]);
  CVS.after('V-C3', [
    { id: 'V4', src: 'AC81', core: true,
      q: 'Which of the following is incorrect about the characteristics of the lumbar spine?',
      o: ['Mamillary process is on the back of superior articular process.', 'The accessory process is at the base of the transverse process.', 'Vertebral canal larger than cervical & thoracic', 'Triangular-liked vertebral canal when viewed superiorly', 'Kidney-liked shaped vertebral body when viewed superiorly'], a: 2,
      ex: 'The lumbar canal is triangular and larger than the thoracic canal, but the cervical canal (which holds the cervical enlargement) is larger still, so “larger than cervical & thoracic” is wrong. The mammillary and accessory processes and the kidney-shaped body are true lumbar features.' },
    { id: 'V5', src: 'AC81 spot', q: 'Identify structure A (no. 9).', fig: s81('06', 7),
      o: ['Spinous process', 'Transverse process', 'Accessory process', 'Mammillary process'], a: 2,
      ex: 'Number 9 is the small knob at the back of the root of the transverse process: the accessory process. The mammillary process sits on the back of the superior articular process.' },
    { id: 'V6', src: 'AC81 spot', q: 'Which level of vertebra is structure B?', fig: s81('06', 7), figRef: 'V5',
      o: ['Cervical vertebra', 'Upper thoracic vertebra', 'Mid thoracic vertebra', 'Lumbar vertebra'], a: 2,
      ex: 'The lateral view shows demifacets for rib heads on the body and a facet on the transverse process for the rib tubercle: a typical (mid) thoracic vertebra.' },
    { id: 'V7', src: 'AC79 spot', q: 'Identify structure A.', fig: s79('04', 12),
      o: ['Lamina', 'Uncinate process', 'Superior articular process'], a: 1,
      ex: 'A marks the raised lips on the lateral edges of the upper surface of the body: the uncinate processes of a cervical vertebra (they form the uncovertebral joints).' },
    { id: 'V8', src: 'AC79 spot', q: 'Identify this spine B.', fig: s79('04', 12), figRef: 'V7',
      o: ['Cervical spine', 'Thoracic spine', 'Lumbar spine'], a: 1,
      ex: 'B has a long spinous process that slopes steeply downward and a heart-shaped body: a thoracic vertebra.' }
  ]);
  CVS.after('V-C4', [
    { id: 'V9', src: 'AC80', core: true, q: 'Which is incorrect?',
      o: ['Nucleus pulposus is located anteriorly to the center in the intervertebral disc', 'Anterior longitudinal ligament runs from the occipital bone to sacrum.', 'Posterior longitudinal ligament begins at C2 and continues to sacrum.', 'The superior vertebral notch is less prominent in thoracic vertebra than in cervical and lumbar.', 'The angle of facet joint is more oblique in thoracic'], a: 0,
      ex: 'The nucleus pulposus lies slightly behind the centre of the disc, which is why discs herniate backwards (posterolaterally) toward the canal and roots. The other statements describe the ligaments and vertebrae correctly.' },
    { id: 'V10', src: 'AC81', q: 'What lies anteriorly to the vertebral canal?',
      o: ['Posterior longitudinal ligament', 'Anterior longitudinal ligament', 'Ligament flavum', 'Interspinous ligament', 'Ligamentum nuchae'], a: 0,
      ex: 'The posterior longitudinal ligament runs on the back of the bodies and discs, inside the canal, so it forms the front wall of the canal. The anterior longitudinal ligament is on the front of the bodies; flavum, interspinous and nuchal ligaments lie behind the canal.' },
    { id: 'V11', src: 'AC79 spot', q: 'Identify structure A.', fig: s79('03', 11),
      o: ['Intervertebral disk', 'Vertebral body', 'Pedicle'], a: 0,
      ex: 'A points to the gap between two bodies: the intervertebral disc.' },
    { id: 'V12', src: 'AC79 spot', q: 'Identify this foramen (B).', fig: s79('03', 11), figRef: 'V11',
      o: ['Intervertebral foramen', 'Vertebral canal', 'Foramen transversarium'], a: 0,
      ex: 'B is the hole seen from the side between two pedicles, bounded by the notches of adjacent vertebrae: the intervertebral foramen.' },
    { id: 'V13', src: 'AC79 spot', q: 'Identify structure A.', fig: s79('02', 10),
      o: ['Transverse process', 'Facet joint', 'Inferior articular process'], a: 1,
      ex: 'A points to the joint between the articular processes of two neighbouring vertebrae seen from behind: the facet (zygapophyseal) joint.' },
    { id: 'V14', src: 'AC79 spot', q: 'Identify structure B.', fig: s79('02', 10), figRef: 'V13',
      o: ['Supraspinous ligament', 'Interspinous ligament', 'Spinous process'], a: 0,
      ex: 'B is the cord running over the tips of the spinous processes: the supraspinous ligament (the interspinous ligament fills the gaps between the spines).' }
  ]);
  CVS.after('V-C5', [
    { id: 'V15', src: 'AC81', core: true,
      q: 'Which muscle attaches from transverse process to spinous process across 3 vertebrae levels?',
      o: ['Spinalis', 'Multifidus', 'Long rotatores', 'Semispinalis', 'Levatores costarum'], a: 1,
      ex: 'Transversospinal muscles run from transverse process to a spine above. Multifidus spans 2–4 segments, semispinalis 4–6 and the rotatores 1–2, so “across 3 levels” is multifidus. Spinalis runs spine to spine.' },
    { id: 'V16', src: 'AC81 spot', q: 'Identify muscle A.', fig: s81('05', 6),
      o: ['Spinalis', 'Longissimus', 'Iliocostalis', 'Multifidus', 'Semispinalis'], a: 3,
      ex: 'A is the thick deep muscle mass right next to the spines in the lumbar region: multifidus.' },
    { id: 'V17', src: 'AC81 spot', q: 'Identify muscle B.', fig: s81('05', 6), figRef: 'V16',
      o: ['Spinalis', 'Longissimus', 'Iliocostalis', 'Multifidus', 'Semispinalis'], a: 2,
      ex: 'B is the most lateral column of erector spinae, running up to the angles of the ribs: iliocostalis.' },
    { id: 'V18', src: 'AC79 spot', q: 'Identify this muscle A.', fig: s79('01', 9),
      o: ['Splenius capitis', 'Splenius cervicis', 'Semispinalis capitis'], a: 0,
      ex: 'A is the bandage-like muscle running from the nuchal ligament up and out to the mastoid region: splenius capitis.' },
    { id: 'V19', src: 'AC79 spot', q: 'Identify this muscle B.', fig: s79('01', 9), figRef: 'V18',
      o: ['Longissimus muscle', 'Multifidus muscle', 'Iliocostalis muscle'], a: 2,
      ex: 'B marks the lateral column of erector spinae with slips to the ribs: iliocostalis.' }
  ]);

  /* ---------- I · Spine imaging ---------- */
  CVS.after('I-C1', [
    { t: 'open', id: 'I1', src: 'AC81', core: true, q: 'What is the structure with the red border?',
      fig: CVS.fig('ac81-dens', 'AC81: lateral cervical radiograph.', 'ac81', 8),
      ans: 'The <b>odontoid process (dens) of C2</b> (axis): it projects up behind the anterior arch of C1.' }
  ]);
  CVS.after('I-C2', [
    { id: 'I2', src: 'AC80', core: true, q: 'Which of the lines locate anteriorly to the spinal canal?',
      fig: CVS.fig('ac80-lines', 'AC80: lateral cervical radiograph with four lines.', 'ac80', 7),
      o: ['A (Anterior vertebral line)', 'B (Posterior vertebral line)', 'C (Spinolaminar line)', 'D (interspinous line)'], a: 1,
      ex: 'The canal lies between the posterior vertebral line (back of the bodies) and the spinolaminar line (front of the spines). The line on the front edge of the canal is the posterior vertebral line.' },
    { id: 'I3', src: 'AC80', q: 'Which of the structures is a facet joint?',
      fig: CVS.fig('ac80-facet', 'AC80: lateral lumbar radiograph.', 'ac80', 8), o: ABCD, a: 3,
      ex: 'The facet joint is the joint line between the inferior articular process above and the superior articular process below, behind the intervertebral foramen: the outlined joint at D.' },
    { id: 'I4', src: 'AC81', q: 'What structure can be seen from a lateral view between adjacent vertebrae?',
      o: ['Neural foramen', 'Spinous process', 'Pedicle', 'Transverse process', 'Pars interarticularis'], a: 0,
      ex: 'On a lateral film the neural (intervertebral) foramen shows as the dark window between the pedicles of two neighbouring vertebrae.',
      flag: 'In the cervical spine the lecture shows the foramina best on the oblique view; in the lumbar spine they are clear on the lateral view.' }
  ]);
  CVS.after('I-C3', [
    { id: 'I5', src: 'AC80', core: true, q: 'Which structure represents the nose of the Scotty dog sign?',
      o: ['Pars interarticularis', 'Lamina', 'Transverse process', 'Superior articular process', 'Inferior articular process'], a: 2,
      ex: 'Scotty dog on the oblique lumbar view: nose = transverse process, eye = pedicle, ear = superior articular process, neck = pars interarticularis, front leg = inferior articular process, body = lamina.' },
    { id: 'I6', src: 'AC81',
      q: 'A 16-year-old male presents with chronic low back pain aggravated by extension and twisting. There is no neurologic deficit. Lumbar spine X-ray shows a fracture at the frontal leg of the Scottie dog on the oblique view. What does the frontal leg in a scotty dog refer to?',
      o: ['Pars interarticularis', 'Superior articular facet', 'Pedicle', 'Inferior articular facet', 'Transverse process'], a: 3,
      ex: 'The front leg of the dog is the inferior articular process (facet). The classic stress fracture of a teenager who arches his back is at the neck of the dog, the pars interarticularis (spondylolysis).',
      flag: 'The recall runs two stems together; the key (inferior articular facet) answers the second one, “what is the front leg”.' },
    { id: 'I7', src: 'AC81', q: 'Based on plain film X-ray on anteroposterior (AP) view, which letter is the pedicle of the bone?',
      fig: CVS.fig('ac81-pedicle', 'AC81: AP lumbar radiograph.', 'ac81', 9),
      o: ['Yellow arrow', 'Pink arrow', 'Red arrow', 'Blue arrow'], a: 2,
      ex: 'On the AP view each pedicle is a paired oval ring just inside the edges of the body (the “owl’s eyes”): the red outlines. Yellow is the body, pink the transverse processes, blue the spinous process.' }
  ]);
  CVS.after('I-C4', [
    { id: 'I8', src: 'AC81', core: true, q: 'Which of the following can be seen white (high attenuation) in CT?',
      o: ['Fat in epidural space', 'Spinal cord in thecal sac', 'Erector spinae muscle', 'Cerebrospinal fluid', 'Cortical bone in vertebra'], a: 4,
      ex: 'Higher density means more attenuation and a higher CT number, so it is whiter. Cortical bone (up to about +1000–3000 HU) is the whitest; fat is dark (−100), CSF near 0, muscle and cord grey.' }
  ]);
  CVS.after('I-C5', [
    { id: 'I9', src: 'AC80', q: 'Which structure is cauda equina?',
      fig: CVS.fig('ac80-caudal', 'AC80: axial lumbar MRI.', 'ac80', 7), o: ['A', 'B', 'C'], a: 1,
      ex: 'Below the conus the thecal sac holds only nerve roots: the dots inside the round sac behind the body (B) are the cauda equina. A points into the vertebral body, C to the posterior elements.' }
  ]);

  /* ---------- N · Nervous tissue ---------- */
  CVS.after('N-C2', [
    { id: 'N1', src: 'AC80', q: 'What is the common method of staining neurons?',
      o: ['Golgi', 'Hematoxylin and Eosin stain', 'Methylene blue', 'Cresyl violet', 'Osmium'], a: 0,
      ex: 'The Golgi silver method blackens a few whole neurons with all their processes, which is how neurons are classically shown. Cresyl violet (Nissl stain) shows Nissl bodies, H&amp;E is the routine stain, osmium shows myelin.',
      flag: 'The key is Golgi. The slides use all of these stains for different jobs, so read “common” as “the classic stain that shows the neuron’s shape”.' },
    { id: 'N2', src: 'AC81 spot', core: true, q: 'Identify axon hillock.', fig: s81('01', 2), o: ABCD, a: 3,
      ex: 'The axon hillock is the pale cone of the soma where the axon starts: it lacks Nissl bodies. D points to that pale region; A is a dendrite, B the Nissl-rich cytoplasm, C the nucleus.' },
    { id: 'N3', src: 'AC81 spot', q: 'Identify dendrite.', fig: s81('01', 2), figRef: 'N2', o: ABCD, a: 0,
      ex: 'A is a tapering process that still contains Nissl substance: a dendrite.' },
    { id: 'N4', src: 'AC81 spot', q: 'Identify lipofuscin pigment.', fig: s81('02', 3), o: ABCD, a: 1,
      ex: 'Lipofuscin is the yellow-brown “wear and tear” pigment clumped in the cytoplasm of old ganglion cells: B.' },
    { id: 'N5', src: 'AC81 spot', q: 'Identify karyon.', fig: s81('02', 3), figRef: 'N4', o: ABCD, a: 2,
      ex: 'Karyon means nucleus: C points to the round vesicular nucleus with its nucleolus.' },
    { id: 'N6', src: 'AC79 spot', q: 'Identify this cell A.', fig: s79('t1', 3),
      o: ['Astrocyte', 'Oligodendrocyte', 'Microglia', 'Neuron'], a: 3,
      ex: 'A large cell body packed with Nissl substance, a big pale nucleus, a prominent nucleolus and several processes: a neuron.' },
    { id: 'N7', src: 'AC79 spot', q: 'Tell its characteristic.', fig: s79('t1', 3), figRef: 'N6',
      o: ['Presence of vascular end-feet', 'Vesicular nucleus', 'Eccentric nucleus', 'Absence of nucleolus'], a: 1,
      ex: 'A neuron has a large, pale (vesicular) nucleus with a prominent nucleolus, usually central. End-feet belong to astrocytes.',
      flag: 'Marked as a modified question in the recall.' }
  ]);
  CVS.after('N-C3', [
    { id: 'N8', src: 'AC81', core: true, q: 'What is the mechanism of transporting neurotransmitters from soma to presynaptic cleft?',
      o: ['Diffusion', 'Exocytosis', 'Transneuronal transport', 'Anterograde axonal transport', 'Retrograde axonal transport'], a: 3,
      ex: 'Moving material from the soma toward the terminal is anterograde axonal transport (kinesin on microtubules). Retrograde transport runs back to the soma; exocytosis is only the final release step.' },
    { id: 'N9', src: 'AC81 spot', q: 'Identify postsynaptic neuron.', fig: s81('04', 5), o: ABCD, a: 3,
      ex: 'The postsynaptic cell lies across the cleft from the vesicle-filled terminal, with the dense postsynaptic membrane: D.' },
    { id: 'N10', src: 'AC81 spot', q: 'Identify vesicle.', fig: s81('04', 5), figRef: 'N9', o: ABCD, a: 1,
      ex: 'B points to the small round synaptic vesicles crowded in the presynaptic terminal.' }
  ]);
  CVS.after('N-C4', [
    { id: 'N11', src: 'AC81 spot', q: 'Identify node of Ranvier.', fig: s81('03', 4), o: ABCD, a: 3,
      ex: 'In a longitudinal section the node is the narrow gap where the myelin of two internodes meets: D.' },
    { id: 'N12', src: 'AC81 spot', q: 'Identify axon.', fig: s81('03', 4), figRef: 'N11', o: ABCD, a: 1,
      ex: 'B points to the central thread inside the myelin sheath: the axon.' },
    { id: 'N13', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('t2', 4),
      o: ['Myelin sheath', 'Node of Ranvier', 'Axon', 'Endoneurium'], a: 1,
      ex: 'A points to the constriction between two myelin segments: a node of Ranvier.' },
    { id: 'N14', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('t2', 4), figRef: 'N13',
      o: ['Myelin sheath', 'Node of Ranvier', 'Axon', 'Endoneurium'], a: 0,
      ex: 'B points to the pale, washed-out space around the axon: the myelin sheath (its lipid dissolves in routine processing).' }
  ]);
  CVS.after('N-C5', [
    { id: 'N15', src: 'AC80', core: true, q: 'Which glia cell is a phagocytic cell in the central nervous system?',
      o: ['Astrocyte', 'Oligodendrocyte', 'Ependymal', 'Schwan cell', 'Microglia'], a: 4,
      ex: 'Microglia are the macrophages of the CNS (from yolk-sac precursors). Astrocytes build the blood–brain barrier and scars, oligodendrocytes make CNS myelin, ependyma lines the ventricles, Schwann cells are PNS.' },
    { id: 'N16', src: 'AC81', q: 'Which of the following is the biomarker of astrocytes?',
      o: ['Glial fibrillary acidic protein', 'S-100', 'Myelin basic protein'], a: 0,
      ex: 'Astrocyte intermediate filaments are made of GFAP, the standard astrocyte marker. Myelin basic protein marks myelin; S-100 stains Schwann cells and other neural-crest cells.',
      flag: 'Only three options were recalled.' },
    { id: 'N17', src: 'AC81', q: 'Which of the following is not the function of Schwann cell?',
      o: ['Release growth factors', 'Protect axon from injury', 'Guide nerve regeneration', 'Differentiate to replace damaged neuron', 'Reduce ion leakage'], a: 3,
      ex: 'Schwann cells myelinate (reducing ion leak), protect axons, release growth factors and form bands that guide regrowing axons. They never turn into neurons.' },
    { id: 'N18', src: 'AC79 spot', q: 'Identify this cell A.', fig: s79('t3', 5),
      o: ['Astrocyte', 'Oligodendrocyte', 'Schwann cell', 'Neuron'], a: 0,
      ex: 'A star-shaped cell with many dark radiating processes (silver/GFAP stain): an astrocyte.' },
    { id: 'N19', src: 'AC79 spot', q: 'Tell a function of structure B.', fig: s79('t3', 5), figRef: 'N18',
      o: ['Blood brain barrier', 'Formation of myelin sheath', 'Phagocytosis', 'Axonal transport'], a: 0,
      ex: 'B is an astrocyte process ending on a vessel (end-foot); end-feet wrap capillaries and help form the blood–brain barrier.' },
    { id: 'N20', src: 'AC79 spot', q: 'Identify this cell A.', fig: s79('t4', 6),
      o: ['Astrocyte', 'Oligodendrocyte', 'Schwann cell', 'Neuron'], a: 2,
      ex: 'Electron micrograph: one cell whose nucleus and cytoplasm wrap a single myelinated axon, with a basal lamina outside: a Schwann cell.' },
    { id: 'N21', src: 'AC79 spot', q: 'Where can cell A be found?', fig: s79('t4', 6), figRef: 'N20',
      o: ['Spinal cord', 'Choroid plexus', 'Blood brain barrier', 'Peripheral nerve'], a: 3,
      ex: 'Schwann cells are PNS glia: they are found in peripheral nerves.' },
    { id: 'N22', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('t5', 7),
      o: ['Gray matter', 'White matter', 'Spinal artery', 'Central canal'], a: 3,
      ex: 'A is the small lumen in the middle of the grey commissure of the cord: the central canal.' },
    { id: 'N23', src: 'AC79 spot', q: 'Tell its content.', fig: s79('t5', 7), figRef: 'N22',
      o: ['Neuronal cytosol', 'Seminal fluid', 'Blood', 'Cerebrospinal fluid'], a: 3,
      ex: 'The central canal is lined by ependyma and continuous with the ventricles, so it holds CSF.' },
    { id: 'N24', src: 'AC79 spot', q: 'Identify this cell A.', fig: s79('t6', 8),
      o: ['Ependymal cell', 'Satellite cell', 'Ganglion cell', 'Mast cell'], a: 2,
      ex: 'A large round neuron in a sensory ganglion: a ganglion cell.' },
    { id: 'N25', src: 'AC79 spot', q: 'Identify this cell B.', fig: s79('t6', 8), figRef: 'N24',
      o: ['Ependymal cell', 'Satellite cell', 'Ganglion cell', 'Mast cell'], a: 1,
      ex: 'B is one of the small flat nuclei forming a ring around the ganglion cell: a satellite cell (PNS glia).',
      flag: 'Marked as a modified question in the recall.' }
  ]);
  CVS.after('N-C6', [
    { id: 'N26', src: 'AC80', q: 'What sensory input does Meissner corpuscle detect?',
      o: ['Pain', 'Pressure', 'Light touch', 'Cold', 'Hot'], a: 2,
      ex: 'Meissner corpuscles in the dermal papillae of hairless skin sense light (discriminative) touch. Pacinian corpuscles sense vibration and deep pressure; free endings sense pain and temperature.' }
  ]);

  /* ---------- C · Spinal cord & peripheral nerve ---------- */
  CVS.after('C-C1', [
    { id: 'C1', src: 'AC80', core: true,
      q: 'A 65-year-old man presents with painful blisters distributed around the umbilical area. Which level of spinal cord is affected?',
      o: ['T10', 'T4', 'T7', 'S1', 'S2'], a: 0,
      ex: 'Shingles erupts along one dermatome. The umbilicus is T10 (nipple T4, xiphoid T7).',
      flag: 'Recalled as “presents without painful blisters”; read it as “with”.' },
    { id: 'C2', src: 'AC81', q: 'Which dermatome is the left side of the xiphoid process?',
      o: ['T4', 'T7', 'T10', 'C8', 'T12'], a: 1,
      ex: 'Landmark dermatomes: nipple T4, xiphoid T7, umbilicus T10.' },
    { id: 'C3', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('09', 10),
      o: ['Lumbar enlargement', 'Conus medullaris', 'Cauda equina', 'End of dural sac'], a: 1,
      ex: 'A points to where the cord tapers to a point: the conus medullaris (about L1–L2 in adults).' },
    { id: 'C4', src: 'AC81 spot', q: 'Identify structure B.', fig: s81('09', 10), figRef: 'C3',
      o: ['Conus medullaris', 'Cauda equina', 'Filum terminale externum', 'Filum terminale internum'], a: 1,
      ex: 'B points to the bundle of lumbar and sacral roots hanging below the conus: the cauda equina.' },
    { id: 'C5', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('05', 13),
      o: ['Cervical enlargement', 'Conus medullaris', 'Thoracolumbar enlargement', 'Lumbosacral enlargement'], a: 3,
      ex: 'A marks the swelling of the lower cord just above the conus, where the roots for the lower limb arise: the lumbosacral enlargement.' },
    { id: 'C6', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('05', 13), figRef: 'C5',
      o: ['Conus medullaris', 'Cauda equina', 'Filum terminale', 'Dural sac'], a: 1,
      ex: 'B circles the leash of roots below the end of the cord: the cauda equina.' }
  ]);
  CVS.after('C-C2', [
    { id: 'C7', src: 'AC80', core: true,
      q: 'Which of the following structures does the needle not pass through during lumbar puncture?',
      o: ['Posterior longitudinal ligaments', 'Ligamentum flavum', 'Interspinous ligament', 'Epidural space', 'Subarachnoid space'], a: 0,
      ex: 'Midline route: skin → supraspinous → interspinous ligament → ligamentum flavum → epidural space → dura and arachnoid → subarachnoid space (CSF). The posterior longitudinal ligament lies on the front wall of the canal, beyond the CSF.',
      flag: 'AC80 asked this twice (back lecture and spinal cord lecture); merged here.' },
    { id: 'C8', src: 'AC81', q: 'Which vertebral level is commonly used for spinal tap?',
      o: ['T11-12', 'L3-L4', 'L1-L2', 'S1-S2', 'S3-S4'], a: 1,
      ex: 'The cord ends at L1–L2 but the dural sac reaches S2, so the needle goes in at L3/L4 or L4/L5, among floating roots.' },
    { id: 'C9', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('10', 11),
      o: ['Dura mater', 'Arachnoid membrane', 'Pia mater', 'Dentate ligament'], a: 0,
      ex: 'A is the thick outer tube opened and pinned back around the cord: the dura mater.' },
    { id: 'C10', src: 'AC81 spot', q: 'Which of the following structures does structure A separate?', fig: s81('10', 11), figRef: 'C9',
      o: ['CSF and dura mater', 'Fat and arachnoid membrane', 'Internal vertebral venous plexus and pia mater', 'External vertebral venous plexus and arachnoid membrane'], a: 1,
      ex: 'The spinal dura has epidural fat (and the internal venous plexus) outside it and the arachnoid lining its inner surface, so it separates fat from arachnoid.' },
    { id: 'C11', src: 'AC79 spot', q: 'Identify this space A.', fig: s79('07', 15),
      o: ['Anterior epidural space', 'Posterior epidural space', 'Subarachnoid space', 'None of above'], a: 1,
      ex: 'Seen from behind with the laminae removed, A lies outside the dural tube, behind it: the posterior epidural space.' },
    { id: 'C12', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('07', 15), figRef: 'C11',
      o: ['Dura mater', 'Arachnoid mater', 'Pia mater', 'White mater'], a: 0,
      ex: 'B is the tough tube containing the cord: the dura mater.' }
  ]);
  CVS.after('C-C3', [
    { id: 'C13', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('08', 9),
      o: ['Ventro median fissure', 'Ventrolateral sulcus', 'Dorso median sulcus', 'Dorsolateral sulcus'], a: 3,
      ex: 'The wide cleft at the top is the ventral median fissure, so the bottom is dorsal. A is where the dorsal horn reaches the surface: the dorsolateral sulcus.' },
    { id: 'C14', src: 'AC81 spot', q: 'Which structure is nearest to structure A?', fig: s81('08', 9), figRef: 'C13',
      o: ['Sensory nerve', 'Motor nerve', 'ANS', 'Choroid plexus'], a: 0,
      ex: 'Dorsal (sensory) rootlets enter the cord along the dorsolateral sulcus.' }
  ]);
  CVS.after('C-C4', [
    { id: 'C15', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('06', 14),
      o: ['Dorsal median sulcus', 'Dorsolateral sulcus', 'Ventrolateral sulcus', 'Ventral median fissure'], a: 3,
      ex: 'A is the deep midline groove on the front of the cord: the ventral median fissure.' },
    { id: 'C16', src: 'AC79 spot', core: true, q: 'Which structure is located in structure A?', fig: s79('06', 14), figRef: 'C15',
      o: ['Anterior radicular artery', 'Anterior spinal artery', 'Posterior radicular artery', 'Posterior spinal artery'], a: 1,
      ex: 'The single anterior spinal artery runs in the ventral median fissure and supplies the front two thirds of the cord.' }
  ]);
  CVS.after('C-C5', [
    { id: 'C17', src: 'AC80', core: true, q: 'Which myelinated nerve fiber has the smallest diameter?',
      o: ['A alpha', 'A beta', 'A gamma', 'B', 'C'], a: 3,
      ex: 'C fibres are the thinnest but unmyelinated. Among myelinated fibres the order is Aα &gt; Aβ &gt; Aγ &gt; Aδ &gt; B, so B (preganglionic autonomic) is the smallest.' },
    { id: 'C18', src: 'AC81', q: 'Which type of nerve fiber conducts signals the fastest?',
      o: ['A-alpha', 'A-beta', 'A-gamma', 'B', 'C'], a: 0,
      ex: 'Speed grows with diameter and myelin: Aα (Ia afferents, α motor neurons) are the thickest and fastest.' }
  ]);
  CVS.after('C-C6', [
    { id: 'C19', src: 'AC80', core: true, q: 'Which structures are injured in neurotmesis?',
      o: ['myelin sheath only', 'myelin sheath and axon', 'myelin sheath, axon, endoneurium', 'myelin sheath, axon, endoneurium, perineurium', 'myelin sheath, axon, endoneurium, perineurium, epineurium'], a: 4,
      ex: 'Neurapraxia = myelin only; axonotmesis = axon (sheaths intact); neurotmesis = the whole nerve including the epineurium is cut, so it needs surgical repair.' },
    { id: 'C20', src: 'AC81',
      q: 'A patient came to the Emergency room with median nerve neurotmesis, about 0.1 mm in length, with two clean-cut ends. Which treatment is the best within the first 24 hours?',
      o: ['Direct nerve repair', 'Supportive treatment', 'Nerve repair with autograft', 'Nerve repair with allograft', 'Nerve repair with artificial nerve graft'], a: 0,
      ex: 'Clean, fresh cut with almost no gap: suture the ends directly (end-to-end, tension-free). Grafts (e.g. sural nerve) are for gaps the ends cannot bridge.' }
  ]);
})();
