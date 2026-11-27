/* Past-paper questions: K skull, Z cranial cavity, F face & neck, D deep face. */
(function () {
  var s81 = function (st, page) { return CVS.fig('s81-' + st, 'AC81 spot test, station ' + st.replace(/^0/, '') + '.', 'ac81s', page); };
  var s79 = function (st, page) { return CVS.fig('s79-' + st, 'AC79 spot II, station ' + st.replace(/^0/, '') + '.', 'ac79s', page); };
  var ABCD = ['A', 'B', 'C', 'D'], ABCDE = ['A', 'B', 'C', 'D', 'E'];

  /* ---------- K · Skull ---------- */
  CVS.after('K-C1', [
    { id: 'K1', src: 'AC68 · AC70 · AC72 · AC73 · AC74 · AC75 · AC76 · AC77 · AC78 · AC80', core: true, q: 'What is the difference between male vs female skull?',
      o: ['Large brow ridges', 'Obtuse angle of mandible', 'Round orbital margin', 'Vertical forehead', 'Small nasal aperture'], a: 0,
      ex: 'Male skulls are more robust: large brow (superciliary) ridges, sharp-angled square mandible, blunt orbital margins, sloping forehead, larger nasal aperture. The other options describe a female skull.' },
    { id: 'K2', src: 'AC81', q: 'Cribriform plate is located on which bone?',
      o: ['Sphenoid', 'Frontal', 'Ethmoid', 'Occipital'], a: 2,
      ex: 'The cribriform plate is part of the ethmoid, in the floor of the anterior cranial fossa; the olfactory nerves pass through its holes.' }
  ]);
  CVS.after('K-C2', [
    { id: 'K4', src: 'AC75 · AC77 · AC80', core: true, q: 'Which of the following is the landmark of frontal, sphenoidal, parietal, and temporal bone?',
      o: ['Inion', 'Pterion', 'Asterion', 'Bregma', 'Nasion'], a: 1,
      ex: 'Pterion is the H-shaped junction of frontal, parietal, greater wing of sphenoid and squamous temporal. Asterion joins parietal, occipital and temporal; bregma is coronal meets sagittal.' },
    { id: 'K5', src: 'AC81', q: 'Frontal and parietal bones are separated by which suture?',
      o: ['Sagittal', 'Lambdoid', 'Squamosal', 'Coronal'], a: 3,
      ex: 'Coronal suture: frontal ↔ parietals. Sagittal: between the two parietals. Lambdoid: parietals ↔ occipital. Squamous: parietal ↔ temporal.' }
  ]);
  CVS.after('K-C4', [
    { id: 'K9', src: 'AC80', core: true, q: 'Which one does not pass through the jugular foramen?',
      o: ['Glossopharyngeal nerve', 'Vagus nerve', 'Accessory nerve', 'Hypoglossal nerve', 'Internal jugular vein'], a: 3,
      ex: 'Jugular foramen: CN IX, X, XI and the internal jugular vein (sigmoid + inferior petrosal sinuses). CN XII has its own hypoglossal canal.' },
    { id: 'K10', src: 'AC80', q: 'Which structure passes through foramen ovale?',
      o: ['Pterygoid artery', 'Deep facial vein', 'Sphenopalatine artery', 'Middle meningeal artery', 'Accessory middle meningeal artery'], a: 4,
      ex: 'Foramen ovale carries V3, the accessory (middle) meningeal artery, the lesser petrosal nerve and an emissary vein. The middle meningeal artery uses foramen spinosum.' },
    { id: 'K11', src: 'AC68 · AC81', q: 'Which structure passes through foramen rotundum?',
      o: ['Ophthalmic artery', 'Mandibular nerve', 'Facial nerve', 'Maxillary nerve'], a: 3,
      ex: 'V1 superior orbital fissure, V2 foramen rotundum, V3 foramen ovale. The ophthalmic artery uses the optic canal.' },
    { id: 'K12', src: 'AC79 · AC81 spot', q: 'Identify foramen A.', fig: s81('13', 14),
      o: ['Superior orbital fissure', 'Foramen rotundum', 'Foramen ovale', 'Foramen spinosum'], a: 1,
      ex: 'The arrow points to the small round hole at the front of the middle fossa, in front of the large oval foramen ovale: foramen rotundum.',
      flag: 'The recalled key for this item is foramen ovale, but its partner (“the content”) is keyed maxillary nerve, and the arrow sits on the hole in front of the oval one. Rotundum and V2 fit together.' },
    { id: 'K13', src: 'AC79 · AC81 spot', q: 'What is the content in structure A?', fig: s81('13', 14), figRef: 'K12',
      o: ['Ophthalmic nerve', 'Maxillary nerve', 'Mandibular nerve', 'Abducens nerve'], a: 1,
      ex: 'Foramen rotundum carries the maxillary nerve (V2) to the pterygopalatine fossa.' },
    { id: 'K14', src: 'AC79 spot', q: 'Identify this structure.', fig: s79('09', 17),
      o: ['Internal auditory meatus', 'Stylomastoid foramen', 'Jugular foramen', 'Foramen magnum'], a: 2,
      ex: 'The coloured opening lies at the back of the petrous temporal, at the end of the sigmoid groove: the jugular foramen.' },
    { id: 'K15', src: 'AC79 spot', q: 'Which nerve passes through this structure?', fig: s79('09', 17), figRef: 'K14',
      o: ['Facial nerve', 'Vestibulocochlear nerve', 'Hypoglossal nerve', 'Glossopharyngeal nerve'], a: 3,
      ex: 'Of these, only the glossopharyngeal (with X and XI) uses the jugular foramen. VII and VIII enter the internal acoustic meatus; XII the hypoglossal canal.' },
    { id: 'K16', src: 'AC70 · AC71 · AC81', q: 'A man gets punched on his face leading to superior orbital fissure fracture. Which of these nerves has the least chance of getting damaged?',
      o: ['Maxillary nerve', 'Oculomotor nerve', 'Abducens nerve', 'Ophthalmic nerve', 'Trochlear nerve'], a: 0,
      ex: 'The superior orbital fissure carries III, IV, V1 and VI. The maxillary nerve leaves through foramen rotundum, below the fissure.' }
  ]);
  CVS.after('K-C5', [
    { id: 'K17', src: 'AC73 · AC80', q: 'Fracture of which bone can cause ophthalmic nerve injury?',
      o: ['Sphenoid', 'Ethmoid', 'Frontal', 'Maxilla', 'Zygoma'], a: 0,
      ex: 'V1 runs in the wall of the cavernous sinus and through the superior orbital fissure, a gap between the lesser and greater wings of the sphenoid.' }
  ]);

  /* ---------- Z · Cranial cavity ---------- */
  CVS.after('Z-C2', [
    { id: 'Z2', src: 'AC71 · AC79 · AC80 · AC81', core: true,
      q: 'Rupture of the middle meningeal artery is most likely to cause hemorrhage in which of the following areas?',
      o: ['Superficial to dura mater', 'Subarachnoid space', 'Deep to dura mater', 'Brain parenchyma', 'Perivascular space'], a: 0,
      ex: 'The middle meningeal artery runs between skull and dura, so it bleeds into the epidural (extradural) space, superficial to the dura (pterion fracture). Bridging veins bleed deep to the dura (subdural); aneurysms bleed into the subarachnoid space.' }
  ]);
  CVS.after('Z-C3', [
    { id: 'Z4', src: 'AC80', q: 'Tumor in infratentorial space, which structure is involved?',
      o: ['Optic nerve', 'Superior cerebral vein', 'Falx cerebri', 'Dural venous sinus', 'Sigmoid sinus'], a: 4,
      ex: 'Below the tentorium is the posterior cranial fossa (brainstem, cerebellum) with the sigmoid sinus. The optic nerve, superior cerebral veins and falx cerebri are all above it.',
      flag: '“Dural venous sinus” is too broad to choose; the key is the sigmoid sinus.' }
  ]);
  CVS.after('Z-C4', [
    { id: 'Z8', src: 'AC75 · AC81', core: true, q: 'A lesion located in the midbrain is most likely to affect which of the following cranial nerves?',
      o: ['Abducens nerve', 'Trochlear nerve', 'Trigeminal nerve', 'Facial nerve', 'Vestibulocochlear nerve'], a: 1,
      ex: 'Midbrain nuclei: III and IV. V, VI and VII are pontine; VIII at the pontomedullary junction.' }
  ]);
  CVS.after('Z-C5', [
    { id: 'Z12', src: 'AC70 · AC76 · AC80', core: true, q: 'Posterior circulation is occluded. Which vessel is affected?',
      o: ['Internal carotid artery', 'Ophthalmic artery', 'Posterior cerebral artery', 'Anterior cerebral artery', 'Middle cerebral artery'], a: 2,
      ex: 'Posterior circulation = vertebral → basilar → posterior cerebral arteries. ICA, ophthalmic, ACA and MCA are anterior circulation.' },
    { id: 'Z13', src: 'AC81', q: 'Which dural sinus is not directly connected to the confluence of sinuses?',
      o: ['Straight sinus', 'Transverse sinus', 'Occipital sinus', 'Inferior sagittal sinus', 'Superior sagittal sinus'], a: 3,
      ex: 'The superior sagittal, straight and occipital sinuses drain into the confluence, and the transverse sinuses leave it. The inferior sagittal sinus joins the great cerebral vein to form the straight sinus, so it reaches the confluence only indirectly.' }
  ]);

  /* ---------- F · Face & neck ---------- */
  CVS.after('F-C1', [
    { id: 'F1', src: 'AC81', core: true, q: 'Which could occur if there is paralysis of orbicularis oculi?',
      o: ['Ptosis', 'Diplopia', 'Inability to blink', 'Difficulty in opening eyes'], a: 2,
      ex: 'Orbicularis oculi (CN VII) closes the eye. Paralysis → cannot blink or close the eye (risk of corneal ulcer). Ptosis is levator palpebrae (CN III) or Müller muscle (sympathetic).' },
    { id: 'F2', src: 'AC81', q: 'A doctor has to perform surgery on the anterior neck. He is concerned that he might cut the nerve that is used to move the skin of the neck. Which nerve should he be concerned of?',
      o: ['Cervical branch of facial nerve', 'Ansa cervicalis', 'Hypoglossal nerve', 'Glossopharyngeal nerve'], a: 0,
      ex: 'The muscle that moves the neck skin is platysma, a muscle of facial expression, so it is supplied by the cervical branch of the facial nerve. Ansa cervicalis supplies the strap muscles.' },
    { id: 'F3', src: 'AC81 spot', q: 'Which of the following is NOT supplied by branches from the external carotid artery?', fig: s81('14', 15), o: ABCDE, a: 0,
      ex: 'A is on the medial forehead, the area of the supratrochlear/supraorbital arteries, which come from the ophthalmic artery (internal carotid). The rest of the face is fed by external carotid branches.' },
    { id: 'F4', src: 'AC81 spot', q: 'Botox injection at which of the following makes you unable to make a disgusted expression?', fig: s81('14', 15), figRef: 'F3', o: ABCDE, a: 3,
      ex: 'Disgust wrinkles the nose and lifts the upper lip: levator labii superioris alaeque nasi, beside the nose at D.' },
    { id: 'F5', src: 'AC81 spot', q: 'Which of the following does procerus originate from?', fig: s81('15', 16), o: ABCD, a: 1,
      ex: 'Procerus arises from the nasal bone (B) and inserts into the skin between the eyebrows.' },
    { id: 'F6', src: 'AC81 spot', q: 'Which of the following does corrugator supercilii originate from?', fig: s81('15', 16), figRef: 'F5', o: ABCD, a: 0,
      ex: 'Corrugator supercilii arises from the bone of the superciliary arch above the orbit (A) and pulls the eyebrows together.' }
  ]);
  CVS.after('F-C3', [
    { id: 'F10', src: 'AC80', core: true, q: 'Which of the following is the consequence of the marginal mandibular nerve ligation?',
      o: ['Numbness of lower lip and chin', 'Unable to wrinkle the skin at glabella', 'Drooping mouth corner', 'Difficulty elevating the upper lips', 'Loss of sensation at upper lip'], a: 2,
      ex: 'The marginal mandibular branch of VII supplies the depressors of the lower lip and angle of the mouth: the corner of the mouth droops. It is motor, so there is no numbness (that would be the mental nerve, V3).' }
  ]);
  CVS.after('F-C4', [
    { id: 'F14', src: 'AC80', core: true, q: 'Which nerve innervates the skin of the middle third of the face?',
      o: ['Mandibular n.', 'Maxillary n.', 'Ophthalmic n.', 'Inferior alveolar n.', 'Buccal branch of facial n.'], a: 1,
      ex: 'Skin of the face in three bands: upper V1, middle V2 (maxillary), lower V3. Facial nerve branches are motor.' }
  ]);
  CVS.after('F-C5', [
    { id: 'F19', src: 'AC81 spot', q: 'Which of the following originate from hyoid bone?', fig: s81('16', 17), o: ABCD, a: 0,
      ex: 'A is the flat muscle with the hypoglossal nerve lying on its surface: hyoglossus, which arises from the body and greater horn of the hyoid and pulls the side of the tongue down.' },
    { id: 'F20', src: 'AC81 spot', q: 'Inferior alveolar nerve block would lead to paralysis of which muscles?', fig: s81('16', 17), figRef: 'F19', o: ABCD, a: 3,
      ex: 'The inferior alveolar nerve gives the nerve to mylohyoid before it enters the mandibular foramen, which supplies mylohyoid and the anterior belly of digastric. D is the reflected sheet of mylohyoid under the chin.' }
  ]);

  /* ---------- D · Deep face ---------- */
  CVS.after('D-C1', [
    { id: 'D1', src: 'AC79 spot', q: 'Identify structure A.', fig: s79('19', 27),
      o: ['Pterygoid fossa', 'Pterygopalatine fossa', 'Infratemporal fossa', 'Temporal fossa'], a: 2,
      ex: 'A is the space below the zygomatic arch and deep to the ramus: the infratemporal fossa.',
      flag: 'Marked as a modified question in the recall.' },
    { id: 'D2', src: 'AC79 spot', core: true, q: 'Which is not one of its contents?', fig: s79('19', 27), figRef: 'D1',
      o: ['Maxillary artery', 'Buccal nerve', 'Medial pterygoid muscle', 'Mental nerve'], a: 3,
      ex: 'The infratemporal fossa holds the pterygoids, the maxillary artery, the pterygoid plexus and V3 with its branches (buccal, lingual, inferior alveolar). The mental nerve is the end of the inferior alveolar nerve, out on the chin.' }
  ]);
  CVS.after('D-C2', [
    { id: 'D5', src: 'AC78 · AC80', core: true, q: 'What muscles are used in elevation of the mandible?',
      o: ['Masseter, medial pterygoid, temporalis', 'Masseter, lateral pterygoid, temporalis', 'Lateral pterygoid, medial pterygoid, temporalis', 'Masseter, lateral pterygoid, medial pterygoid', 'Lateral pterygoid, medial pterygoid, masseter, temporalis'], a: 0,
      ex: 'Three muscles close the jaw: temporalis, masseter and medial pterygoid. The lateral pterygoid opens and protrudes.' },
    { id: 'D6', src: 'AC79 · AC81', q: 'Which muscles are used in protrusion of the chin?',
      o: ['Medial pterygoid, Lateral pterygoid, Temporalis', 'Medial pterygoid, Lateral pterygoid, Masseter', 'Medial pterygoid, Temporalis, Masseter', 'Lateral pterygoid, suprahyoid, and infrahyoid muscles', 'Lateral pterygoid, masseter'], a: 1,
      ex: 'The slides: both lateral pterygoids protrude; the medial pterygoids acting together help protrude; superficial masseter fibres assist. The posterior fibres of temporalis retrude, so any option with temporalis is out.' },
    { id: 'D7', src: 'AC81 spot', q: 'Which of the following muscles has an origin at structure A?', fig: s81('18', 19),
      o: ['Masseter', 'Temporalis', 'Medial pterygoid', 'Lateral pterygoid'], a: 2,
      ex: 'A points to the medial surface of the lateral pterygoid plate: origin of the deep head of medial pterygoid.' },
    { id: 'D8', src: 'AC81 spot', q: 'Tell its insertion.', fig: s81('18', 19), figRef: 'D7',
      o: ['Coronoid process of mandible', 'Condylar process of mandible', 'Medial surface of ramus of mandible', 'Lateral surface of ramus of mandible'], a: 2,
      ex: 'Medial pterygoid inserts on the medial surface of the ramus and angle, the mirror of masseter on the outside.' },
    { id: 'D9', src: 'AC79 spot', q: 'Identify this muscle A.', fig: s79('18', 26),
      o: ['Temporalis muscle', 'Medial pterygoid muscle', 'Lateral pterygoid muscle', 'Masseter muscle'], a: 3,
      ex: 'A is the thick quadrilateral muscle on the outer surface of the ramus: masseter.' },
    { id: 'D10', src: 'AC79 spot', q: 'Tell its innervation.', fig: s79('18', 26), figRef: 'D9',
      o: ['Facial nerve', 'Maxillary nerve', 'Mandibular nerve', 'Hypoglossal nerve'], a: 2,
      ex: 'All muscles of mastication are supplied by the mandibular nerve (V3).' }
  ]);
  CVS.after('D-C3', [
    { id: 'D15', src: 'AC81 spot', q: 'Identify structure A (red arrow).', fig: s81('19', 20),
      o: ['Internal carotid artery', 'Middle meningeal artery', 'Accessory meningeal artery', 'Inferior alveolar artery'], a: 1,
      ex: 'A rises straight up from the first part of the maxillary artery toward the skull base: the middle meningeal artery.' },
    { id: 'D16', src: 'AC81 spot', q: 'Which of the following foramen does structure A pass through?', fig: s81('19', 20), figRef: 'D15',
      o: ['Foramen rotundum', 'Foramen ovale', 'Foramen spinosum', 'Carotid canal'], a: 2,
      ex: 'The middle meningeal artery enters the skull through foramen spinosum.' }
  ]);
  CVS.after('D-C4', [
    { id: 'D20', src: 'AC80', core: true, q: 'Which structure is a motor branch of the mandibular nerve?',
      o: ['Buccal nerve', 'Lingual nerve', 'Inferior alveolar nerve', 'Nerve to stapedius', 'Nerve to tensor tympani'], a: 4,
      ex: 'V3 motor: muscles of mastication, mylohyoid, anterior digastric, tensor veli palatini and tensor tympani. Buccal, lingual and inferior alveolar are sensory trunks; stapedius is CN VII.' },
    { id: 'D21', src: 'AC68 · AC80', q: 'Which nerve branch innervates the mandibular teeth?',
      o: ['Inferior alveolar nerve', 'Facial nerve', 'Lingual nerve', 'Greater palatine nerve', 'Hypoglossal nerve'], a: 0,
      ex: 'The inferior alveolar nerve (V3) runs in the mandibular canal to the lower teeth and ends as the mental nerve.' },
    { id: 'D22', src: 'AC79 · AC81', q: 'Which of the following is not a sensory branch of mandibular nerve?',
      o: ['Lingual nerve', 'Auriculotemporal nerve', 'Inferior alveolar nerve', 'Infraorbital nerve', 'Buccal nerve'], a: 3,
      ex: 'The infraorbital nerve is the end of the maxillary nerve (V2). The other four are V3 sensory branches.' },
    { id: 'D23', src: 'AC81 spot', q: 'Identify structure A (red arrow).', fig: s81('17', 18),
      o: ['Lingual nerve', 'Lingual artery', 'Inferior alveolar nerve', 'Inferior alveolar artery'], a: 3,
      ex: 'A points to the thin vessel running with the inferior alveolar nerve toward the mandibular foramen: the inferior alveolar artery.' },
    { id: 'D24', src: 'AC81 spot', q: 'Tell its function.', fig: s81('17', 18), figRef: 'D23',
      o: ['Arterial supply of lower teeth', 'General sensation of lower lip', 'Arterial supply of tongue', 'General sensation of anterior ⅔ of tongue'], a: 0,
      ex: 'The inferior alveolar artery supplies the mandible and the lower teeth.' }
  ]);
})();
