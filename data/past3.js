/* Past-paper questions, Video 3: O oral cavity, J deep neck, E eye & orbit, H ear. */
(function () {
  var s81 = function (st, page) { return CVS.fig('s81-' + st, 'AC81 spot test, station ' + st.replace(/^0/, '').replace('a', '.1').replace('b', '.2') + '.', 'ac81s', page); };
  var s79 = function (st, page) { return CVS.fig('s79-' + st, 'AC79 spot II, station ' + st.replace(/^0/, '') + '.', 'ac79s', page); };
  var ABCD = ['A', 'B', 'C', 'D'], ABCDE = ['A', 'B', 'C', 'D', 'E'];

  /* ---------- O · Oral cavity ---------- */
  CVS.after('O-C2', [
    { id: 'O1', src: 'AC81 spot', q: 'Identify muscle A.', fig: s81('21', 22),
      o: ['Geniohyoid', 'Genioglossus', 'Styloglossus', 'Stylohyoid'], a: 1,
      ex: 'In the midline section, A is the fan of fibres spreading from the back of the chin up into the tongue: genioglossus.' },
    { id: 'O2', src: 'AC81 spot', core: true, q: 'Tell its innervation.', fig: s81('21', 22), figRef: 'O1',
      o: ['Mandibular nerve', 'Facial nerve', 'Glossopharyngeal nerve', 'Hypoglossal nerve'], a: 3,
      ex: 'Every tongue muscle is supplied by CN XII except palatoglossus (CN X).' },
    { id: 'O3', src: 'AC79 spot', q: 'Identify this muscle A.', fig: s79('36', 44),
      o: ['Geniohyoid', 'Genioglossus', 'Stylohyoid', 'Styloglossus'], a: 1,
      ex: 'A is the large fan-shaped muscle filling the tongue in a midline section: genioglossus.' },
    { id: 'O4', src: 'AC79 spot', q: 'Tell its innervation.', fig: s79('36', 44), figRef: 'O3',
      o: ['Glossopharyngeal n.', 'Mandibular n.', 'Hypoglossal n.', 'Facial n.'], a: 2,
      ex: 'Genioglossus is a tongue muscle: hypoglossal nerve.' }
  ]);
  CVS.after('O-C3', [
    { id: 'O5', src: 'AC80', core: true, q: 'What is the nerve between the oral mucosa and the mylohyoid muscle?',
      o: ['Lingual nerve', 'Facial nerve', 'Hypoglossal nerve', 'Auriculotemporal nerve', 'Glossopharyngeal nerve'], a: 0,
      ex: 'In the floor of the mouth the lingual nerve runs just under the mucosa, above mylohyoid and on hyoglossus, looping under the submandibular duct. The hypoglossal nerve is lower on hyoglossus.' },
    { id: 'O6', src: 'AC81', q: 'Which artery supplies the floor of the mouth?',
      o: ['Facial artery', 'Lingual artery', 'Maxillary artery', 'Occipital artery', 'Superior thyroid artery'], a: 1,
      ex: 'The lingual artery (external carotid) runs deep to hyoglossus and gives the sublingual artery to the floor of the mouth and the sublingual gland.' }
  ]);
  CVS.after('O-C4', [
    { id: 'O7', src: 'AC80', core: true, q: 'Which muscle separates the sublingual salivary gland from the superficial part of the submandibular gland?',
      o: ['Digastric muscle', 'Stylohyoid muscle', 'Mylohyoid muscle', 'Geniohyoid muscle', 'Genioglossus muscle'], a: 2,
      ex: 'Mylohyoid is the floor of the mouth: the sublingual gland lies above it, the superficial part of the submandibular gland below it. The gland wraps around its free back edge.' },
    { id: 'O8', src: 'AC80', q: 'An abscess in the submandibular region spreads superiorly. Which structure is most likely involved?',
      o: ['Tongue', 'Carotid artery', 'Mandibular nerve', 'Parotid gland', 'Hyoid bone'], a: 0,
      ex: 'Above the submandibular space, around the back edge of mylohyoid, is the sublingual space and the tongue. Spreading infection lifts the tongue (Ludwig angina).',
      flag: 'AC80 asked this in both the deep-face and the oral-cavity lectures; merged here.' },
    { id: 'O9', src: 'AC81', q: 'The sublingual gland drains into which structure?',
      o: ['Parotid duct', 'Stensen’s duct', 'Wharton’s duct', 'Small ducts to sublingual fold', 'Duct of Blandin-Nuhn'], a: 3,
      ex: 'The sublingual gland opens by many small ducts (of Rivinus) along the sublingual fold. Wharton’s duct is the submandibular duct; Stensen’s is the parotid duct.' },
    { id: 'O10', src: 'AC81', q: 'Where is the deep part of the submandibular gland located?',
      o: ['Submental space', 'Submandibular triangle', 'Sublingual space', 'Carotid sheath', 'Parotid space'], a: 1,
      ex: 'The gland sits in the submandibular triangle and hooks around the back edge of mylohyoid; its deep part lies above mylohyoid beside hyoglossus.',
      flag: 'Keyed submandibular triangle. Many texts place the deep part above mylohyoid, in the sublingual space; read the key as “the gland as a whole sits in the submandibular triangle”.' },
    { id: 'O11', src: 'AC81',
      q: 'A man presents with difficulty elevating his hyoid bone and opening his mouth. The findings suggest paralysis of the posterior belly of the digastric muscle. Which of the following nerves is most likely affected?',
      o: ['Hypoglossal nerve', 'Accessory nerve', 'Glossopharyngeal nerve', 'Facial nerve', 'Vagus nerve'], a: 3,
      ex: 'Digastric has two nerves because it comes from two arches: posterior belly and stylohyoid ← facial nerve (2nd arch); anterior belly and mylohyoid ← V3 (1st arch).' },
    { id: 'O12', src: 'AC81 spot', q: 'Identify muscle A.', fig: s81('20', 21),
      o: ['Posterior belly of digastric', 'Stylohyoid', 'Mylohyoid', 'Geniohyoid'], a: 0,
      ex: 'A runs from behind the angle of the mandible down to the hyoid tendon: the posterior belly of digastric.' },
    { id: 'O13', src: 'AC81 spot', q: 'Tell its innervation.', fig: s81('20', 21), figRef: 'O12',
      o: ['Mandibular nerve', 'Facial nerve', 'Hypoglossal nerve', 'Ansa cervicalis'], a: 1,
      ex: 'Posterior belly of digastric: facial nerve.' },
    { id: 'O14', src: 'AC81 spot', q: 'Identify gland A.', fig: s81('22', 23),
      o: ['Parotid gland', 'Submandibular gland', 'Sublingual gland', 'Von Ebner’s gland'], a: 1,
      ex: 'A is the gland under the body of the mandible, wrapped around the back of mylohyoid: the submandibular gland.' },
    { id: 'O15', src: 'AC81 spot', q: 'Tell its duct.', fig: s81('22', 23), figRef: 'O14',
      o: ['Wharton’s duct', 'Stensen’s duct', 'Bartholin’s duct', 'Rivinus’s duct'], a: 0,
      ex: 'Submandibular gland → Wharton’s duct → sublingual papilla beside the frenulum.' },
    { id: 'O16', src: 'AC79 spot', q: 'Identify this muscle A.', fig: s79('37', 45),
      o: ['Geniohyoid', 'Genioglossus', 'Stylohyoid', 'Styloglossus'], a: 2,
      ex: 'A is the slender muscle from the styloid process to the hyoid, split by the digastric tendon: stylohyoid.' },
    { id: 'O17', src: 'AC79 spot', q: 'Tell its innervation.', fig: s79('37', 45), figRef: 'O16',
      o: ['Glossopharyngeal n.', 'Mandibular n.', 'Hypoglossal n.', 'Facial n.'], a: 3,
      ex: 'Stylohyoid is a 2nd-arch muscle like the posterior digastric: facial nerve.' },
    { id: 'O18', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('38', 46),
      o: ['Submandibular gland', 'Sublingual gland', 'Submaxilary gland', 'Parotid gland'], a: 0,
      ex: 'A is the gland below the mandible: submandibular (“submaxillary” is the old name for the same gland, hence the trap).' },
    { id: 'O19', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('38', 46), figRef: 'O18',
      o: ['Glossopharyngeal n.', 'Mandibular n.', 'Hypoglossal n.', 'Facial n.'], a: 2,
      ex: 'B is the nerve running forward on hyoglossus below the gland and the duct: the hypoglossal nerve.' }
  ]);
  CVS.after('O-C5', [
    { id: 'O20', src: 'AC81', q: 'A patient has an enlarged palatine tonsil. Which area is most affected?',
      o: ['Anterior to the ear', 'Posterolateral of oral cavity', 'Below angle of mandible', 'Posterior to the ear'], a: 2,
      ex: 'The tonsil drains to the jugulodigastric (tonsillar) node of the deep cervical chain, felt just below the angle of the mandible.',
      flag: 'Read the stem as “where is the swollen draining node felt”; the tonsil itself sits in the posterolateral oral cavity.' }
  ]);

  /* ---------- J · Deep neck ---------- */
  CVS.after('J-C1', [
    { id: 'J1', src: 'AC81 spot', q: 'Identify internal carotid A.', fig: s81('23', 24), o: ABCD, a: 0,
      ex: 'The internal carotid is the branch of the common carotid with no branches in the neck, running up behind and lateral to the external: A.' },
    { id: 'J2', src: 'AC81 spot', q: 'Identify subclavian artery.', fig: s81('23', 24), figRef: 'J1', o: ABCD, a: 3,
      ex: 'D is the large artery arching laterally over the first rib at the root of the neck: the subclavian.' },
    { id: 'J3', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('24', 25),
      o: ['Vertebral artery', 'Thyrocervical trunk', 'Subclavian artery', 'Common carotid', 'Costocervical trunk'], a: 0,
      ex: 'A climbs straight up toward the transverse foramen of C6 from the first part of the subclavian: the vertebral artery.' },
    { id: 'J4', src: 'AC81 spot', q: 'Identify structure B.', fig: s81('24', 25), figRef: 'J3',
      o: ['Vertebral artery', 'Thyrocervical trunk', 'Subclavian artery', 'Common carotid', 'Costocervical trunk'], a: 1,
      ex: 'B is the short trunk lateral to the vertebral artery that splits into inferior thyroid, suprascapular and transverse cervical arteries: the thyrocervical trunk.' },
    { id: 'J5', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('20', 28),
      o: ['Brachiocephalic artery', 'Subclavian artery', 'Common carotid artery', 'Aortic arch'], a: 0,
      ex: 'A is the first branch of the arch on the right, which splits into right subclavian and right common carotid: the brachiocephalic trunk.' },
    { id: 'J6', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('20', 28), figRef: 'J5',
      o: ['Brachiocephalic artery', 'Subclavian artery', 'Common carotid artery', 'Aortic arch'], a: 2,
      ex: 'B runs straight up the neck beside the trachea: the common carotid artery.' },
    { id: 'J7', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('21', 29),
      o: ['Costocervical artery', 'Thyrocervical artery', 'Internal thoracic artery', 'Vertebral artery'], a: 3,
      ex: 'A is the first, most medial branch of the subclavian, going up: the vertebral artery.' },
    { id: 'J8', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('21', 29), figRef: 'J7',
      o: ['Costocervical artery', 'Thyrocervical artery', 'Internal thoracic artery', 'Vertebral artery'], a: 1,
      ex: 'B is the short trunk that fans into several branches toward the thyroid and shoulder: the thyrocervical trunk.' }
  ]);
  CVS.after('J-C2', [
    { id: 'J9', src: 'AC80', core: true, q: 'Which structure is the landmark of internal jugular vein catheterization?',
      o: ['Sternocleidomastoid', 'Anterior scalene', '2nd rib', 'External carotid artery', '1st rib'], a: 0,
      ex: 'The IJV lies under sternocleidomastoid; the central approach enters at the apex of the triangle between its sternal and clavicular heads, lateral to the carotid pulse.' }
  ]);
  CVS.after('J-C3', [
    { id: 'J10', src: 'AC80', core: true, q: 'A patient who underwent thyroidectomy experiences hoarseness of voice and vocal cord paralysis. Which muscle has an abnormal function?',
      o: ['Cricothyroid', 'Posterior cricoarytenoid', 'Omohyoid', 'Constrictor', 'Stylohyoid'], a: 1,
      ex: 'Tying the inferior thyroid artery risks the recurrent laryngeal nerve, which supplies every intrinsic laryngeal muscle except cricothyroid, including posterior cricoarytenoid, the only abductor. Cricothyroid is the external laryngeal nerve (superior thyroid artery).' },
    { id: 'J11', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('23', 31),
      o: ['Internal laryngeal nerve', 'External laryngeal nerve', 'Recurrent laryngeal nerve', 'Ansa cervicalis'], a: 0,
      ex: 'A pierces the thyrohyoid membrane to reach the larynx: the internal laryngeal nerve (sensory above the vocal cords).' },
    { id: 'J12', src: 'AC79 spot', q: 'What is adjacent to A?', fig: s79('23', 31), figRef: 'J11',
      o: ['Branch of inferior thyroid artery', 'Branch of superior thyroid artery', 'Superior thyroid artery', 'Inferior thyroid artery'], a: 1,
      ex: 'The internal laryngeal nerve pierces the thyrohyoid membrane with the superior laryngeal artery, a branch of the superior thyroid artery.' },
    { id: 'J13', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('22', 30),
      o: ['Recurrent laryngeal nerve', 'Vagus nerve', 'Sympathetic trunk', 'Phrenic nerve'], a: 2,
      ex: 'A is the chain with ganglia lying on the prevertebral muscles behind the carotid sheath: the sympathetic trunk.' },
    { id: 'J14', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('22', 30), figRef: 'J13',
      o: ['Recurrent laryngeal nerve', 'Vagus nerve', 'Sympathetic trunk', 'Phrenic nerve'], a: 1,
      ex: 'B is the large nerve inside the carotid sheath, between artery and vein: the vagus.' }
  ]);
  CVS.after('J-C4', [
    { id: 'J15', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('25a', 26),
      o: ['Phrenic nerve', 'Recurrent laryngeal nerve', 'Sympathetic trunk', 'Vagus nerve'], a: 0,
      ex: 'In this photo A runs down on the front of anterior scalene: the phrenic nerve (C3–C5).' },
    { id: 'J16', src: 'AC81 spot', q: 'What would happen if structure A were dysfunctional?', fig: s81('25a', 26), figRef: 'J15',
      o: ['Abdominal bloating', 'Diaphragm paralysis', 'Horner’s syndrome', 'Loss of cricothyroid function'], a: 1,
      ex: 'Phrenic nerve → diaphragm. Damage paralyses that half of the diaphragm.' },
    { id: 'J17', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('25b', 27),
      o: ['Phrenic nerve', 'Recurrent laryngeal nerve', 'Sympathetic trunk', 'Vagus nerve'], a: 2,
      ex: 'In this photo A is the chain lying behind the carotid sheath on the vertebral column: the cervical sympathetic trunk.' },
    { id: 'J18', src: 'AC81 spot', core: true, q: 'What would happen if structure A were dysfunctional?', fig: s81('25b', 27), figRef: 'J17',
      o: ['Abdominal bloating', 'Diaphragm paralysis', 'Horner’s syndrome', 'Loss of cricothyroid function'], a: 2,
      ex: 'Cutting the cervical sympathetic trunk removes sympathetic supply to that side of the face and eye: ptosis, miosis, anhidrosis = Horner syndrome.' }
  ]);
  CVS.after('J-C5', [
    { id: 'J19', src: 'AC80', core: true, q: 'What fascial membranes are covering the danger space?',
      o: ['Alar and prevertebral fascia', 'Buccopharyngeal and alar fascia', 'Pretracheal and buccopharyngeal fascia', 'Infrahyoid and pretracheal fascia', 'Infrahyoid and buccopharyngeal fascia'], a: 0,
      ex: 'The danger space lies between the alar fascia (in front) and the prevertebral fascia (behind) and runs from the skull base to the diaphragm, so infection can reach the mediastinum. The retropharyngeal space is in front of it, between buccopharyngeal and alar fascia.' },
    { id: 'J20', src: 'AC81', q: 'Which muscle is surrounded by the investing fascia?',
      o: ['Sternothyroid', 'Sternohyoid', 'Thyrohyoid', 'Omohyoid', 'Sternocleidomastoid'], a: 4,
      ex: 'The investing layer splits to enclose sternocleidomastoid and trapezius (and the parotid and submandibular glands). The strap muscles lie in the pretracheal (muscular) layer.' },
    { id: 'J21', src: 'AC80', q: 'Which structure does not belong to zone III of the neck?',
      o: ['Esophagus', 'CN XII', 'External carotid artery', 'Parotid gland', 'Vertebral artery'], a: 0,
      ex: 'Zone I: sternal notch → cricoid; zone II: cricoid → angle of mandible; zone III: above the angle. The oesophagus starts at the cricoid (C6), below zone III.' },
    { id: 'J22', src: 'AC81', q: 'Which of the following is not located in zone I of the neck?',
      o: ['Pharynx', 'Thyroid gland', 'Trachea', 'Apex of lung', 'Vertebral artery'], a: 0,
      ex: 'Zone I (below the cricoid) holds the thoracic inlet: trachea, oesophagus, thyroid, lung apices, the origins of the great vessels. The pharynx ends at the cricoid, so it lies in zones II–III.' }
  ]);

  /* ---------- E · Eye & orbit ---------- */
  CVS.after('E-C1', [
    { id: 'E1', src: 'AC81', core: true,
      q: 'On examination there are impaired extraocular muscles, absent corneal reflex, and loss of sensation of the root of the nose, upper eyelid, and forehead. Vision is not impaired. The lesion is most likely on which structure?',
      o: ['Optic canal', 'Foramen ovale', 'Superior orbital fissure', 'Inferior orbital fissure', 'Foramen rotundum'], a: 2,
      ex: 'III, IV and VI (eye movements) plus V1 (forehead, upper lid, nose root, corneal sensation) all pass through the superior orbital fissure. Vision is spared because CN II uses the optic canal.' },
    { id: 'E2', src: 'AC80', q: 'Which structure is located at the medial side of the orbit?',
      o: ['Frontal sinus', 'Ethmoidal sinus', 'Maxillary sinus', 'Nasal cavity', 'Sphenoid sinus'], a: 1,
      ex: 'The medial wall of the orbit is the paper-thin lamina papyracea of the ethmoid, with the ethmoidal air cells right behind it. Frontal sinus is above, maxillary below.' },
    { id: 'E3', src: 'AC79 spot', q: 'Identify contents in structure A.', fig: s79('29', 37),
      o: ['Optic n. &amp; Oculomotor n.', 'Optic n. &amp; Ophthalmic n.', 'Optic n. &amp; Ophthalmic a.', 'Oculomotor n. &amp; Ophthalmic n.'], a: 2,
      ex: 'A is the optic canal in the lesser wing: optic nerve and ophthalmic artery.' },
    { id: 'E4', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('29', 37), figRef: 'E3',
      o: ['Fovea centralis', 'Optic disc', 'Ora serrata', 'Macula lutea'], a: 2,
      ex: 'B marks where the thick nervous retina ends abruptly in a serrated edge, continuing as the thin non-visual layer over the ciliary body: the ora serrata.' }
  ]);
  CVS.after('E-C2', [
    { id: 'E5', src: 'AC80', core: true, q: 'What is the muscle used for looking downward when the eye is abducted?',
      o: ['Superior rectus', 'Inferior rectus', 'Medial rectus', 'Superior oblique', 'Inferior oblique'], a: 1,
      ex: 'Abducted, the eye lines up with the pull of the recti, so the recti act purely: down = inferior rectus, up = superior rectus. Adducted, the obliques take over.' },
    { id: 'E6', src: 'AC81', q: 'Which muscle is used to move the eye upwards when the eye is abducted?',
      o: ['Superior oblique', 'Inferior rectus', 'Medial rectus', 'Inferior oblique', 'Superior rectus'], a: 4,
      ex: 'Abducted eye → test the recti: up = superior rectus (CN III).' },
    { id: 'E7', src: 'AC81 spot', q: 'Identify nerve A.', fig: s81('29', 31),
      o: ['Frontal nerve', 'Lacrimal nerve', 'Trochlear nerve', 'Abducens nerve'], a: 0,
      ex: 'From above, A is the large nerve running forward on top of levator palpebrae in the middle of the orbit: the frontal nerve (V1).' },
    { id: 'E8', src: 'AC81 spot', q: 'Identify muscle B (blue arrow) and its innervation.', fig: s81('29', 31), figRef: 'E7',
      o: ['Superior rectus and oculomotor nerve', 'Superior oblique and trochlear nerve', 'Medial rectus and abducens nerve', 'Medial rectus and oculomotor nerve'], a: 3,
      ex: 'Keyed as medial rectus, a CN III muscle. Remember LR6 SO4, the rest III: medial rectus is never abducens.',
      flag: 'The blue arrow is on the medial side of the orbit seen from above, where the superior oblique also runs; the recalled key is medial rectus.' },
    { id: 'E9', src: 'AC79 spot', q: 'Identify this nerve A.', fig: s79('28', 36),
      o: ['Optic nerve', 'Lacrimal nerve', 'Frontal nerve', 'Trochlear nerve'], a: 2,
      ex: 'A runs forward on top of the levator in the roof of the orbit: the frontal nerve.' },
    { id: 'E10', src: 'AC79 spot', q: 'Identify this nerve B and tell its innervation.', fig: s79('28', 36), figRef: 'E9',
      o: ['Superior oblique muscle, Oculomotor nerve', 'Superior oblique muscle, Trochlear nerve', 'Superior rectus muscle, Oculomotor nerve', 'Superior rectus muscle, Abducens nerve'], a: 1,
      ex: 'B is the thin nerve on the medial side of the roof entering the superior oblique: the trochlear nerve (CN IV) to superior oblique.' }
  ]);
  CVS.after('E-C4', [
    { id: 'E11', src: 'AC80', core: true, q: 'Which structure is NOT a part of the refractive media?',
      o: ['Lens', 'Sclera', 'Cornea', 'Vitreous Body', 'Aqueous Humor'], a: 1,
      ex: 'Light passes cornea → aqueous → lens → vitreous to the retina. The sclera is the opaque white coat, not in the light path.' },
    { id: 'E12', src: 'AC81', q: 'What is not a refractive media in the eye?',
      o: ['Lens', 'Cornea', 'Choroid', 'Vitreous humor', 'Aqueous humor'], a: 2,
      ex: 'The choroid is the vascular coat behind the retina, outside the light path. Refractive media: cornea, aqueous, lens, vitreous.' },
    { id: 'E13', src: 'AC80', q: 'What is the area between cornea and sclera?',
      o: ['Limbus', 'Ora serrata', 'Lamina cribrosa', 'Trabecular meshwork', 'Uvea'], a: 0,
      ex: 'The limbus is the corneoscleral junction. Ora serrata is the front edge of the nervous retina; lamina cribrosa is where the optic nerve leaves the sclera.' },
    { id: 'E14', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('30', 32),
      o: ['Cornea', 'Sclera', 'Choroid', 'Retina'], a: 0,
      ex: 'A points to the clear dome at the front of the globe: the cornea.' },
    { id: 'E15', src: 'AC81 spot', q: 'Identify nerve B.', fig: s81('30', 32), figRef: 'E14',
      o: ['Frontal nerve', 'Oculomotor nerve', 'Optic nerve', 'Ophthalmic nerve'], a: 2,
      ex: 'B is the thick nerve leaving the back of the globe: the optic nerve.' },
    { id: 'E16', src: 'AC81 spot', q: 'Identify layer A of cornea.', fig: s81('31', 33),
      o: ['Corneal epithelium', 'Stroma', 'Corneal endothelium', 'Bowman’s layer'], a: 0,
      ex: 'A is the layer of several rows of cells on the surface: the stratified squamous corneal epithelium. The thick fibrous middle is stroma; the endothelium is a single flat layer.' },
    { id: 'E17', src: 'AC81 spot', q: 'Identify structure B.', fig: s81('31', 33), figRef: 'E16',
      o: ['Lens', 'Ciliary body', 'Iris', 'Ora serrata'], a: 2,
      ex: 'B spans the loose stroma resting on a black pigmented epithelium, a flap reaching toward the pupil in front of the lens: the iris. The folded processes below it belong to the ciliary body.' },
    { id: 'E18', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('32', 34),
      o: ['Ciliary body', 'Lens', 'Iris', 'Cornea'], a: 1,
      ex: 'A is the solid biconvex body behind the iris: the lens.' },
    { id: 'E19', src: 'AC81 spot', q: 'Identify structure B.', fig: s81('32', 34), figRef: 'E18',
      o: ['Fovea centralis', 'Optic papilla', 'Ora serrata', 'Limbus'], a: 2,
      ex: 'The dashed line marks where the thick retina stops: the ora serrata.' },
    { id: 'E20', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('30', 38),
      o: ['Cornea', 'Lens', 'Retina', 'Vitreous humor'], a: 0,
      ex: 'A is the clear front window of the cut globe: the cornea.' },
    { id: 'E21', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('30', 38), figRef: 'E20',
      o: ['Cornea', 'Lens', 'Retina', 'Vitreous humor'], a: 1,
      ex: 'B is the yellowish biconvex body in the opened eye: the lens.' }
  ]);
  CVS.after('E-C5', [
    { id: 'E22', src: 'AC81', core: true, q: 'Abnormality in which structure would lead to defects in drainage of aqueous humor?',
      o: ['Trabecular meshwork', 'Ora serrata', 'Ciliary muscle'], a: 0,
      ex: 'Aqueous is made by the ciliary processes and drains through the trabecular meshwork in the iridocorneal angle into the canal of Schlemm. Blockage raises pressure (glaucoma).',
      flag: 'Only three options were recalled.' },
    { id: 'E23', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('31', 39),
      o: ['Cornea', 'Ciliary process', 'Ciliary body', 'Iris'], a: 3,
      ex: 'A is the thin pigmented flap reaching in front of the lens: the iris.' },
    { id: 'E24', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('31', 39), figRef: 'E23',
      o: ['Cornea', 'Ciliary process', 'Ciliary body', 'Iris'], a: 2,
      ex: 'B is the thick triangular muscular ring behind the iris root: the ciliary body.' }
  ]);
  CVS.after('E-C6', [
    { id: 'E25', src: 'AC80', q: 'What is the afferent nerve of the corneal reflex?',
      o: ['Nasociliary nerve', 'Frontal nerve', 'Facial nerve', 'Ophthalmic nerve', 'Supraorbital nerve'], a: 0,
      ex: 'Corneal sensation travels in the long ciliary nerves → nasociliary nerve → V1. The efferent limb is the facial nerve (orbicularis oculi).',
      flag: 'Ophthalmic nerve is also true but less specific; the key is the nasociliary branch.' },
    { id: 'E26', src: 'AC81', q: 'A wisp of cotton is used to touch the limbus, and the normal response is to blink. Which nerve contains the afferent fiber of this reflex?',
      o: ['Oculomotor nerve', 'Ophthalmic nerve', 'Frontal nerve', 'Facial nerve', 'Mandibular nerve'], a: 1,
      ex: 'Here nasociliary is not offered, so pick its parent: the ophthalmic nerve (V1). Facial is the efferent limb.' }
  ]);

  /* ---------- H · Ear ---------- */
  CVS.after('H-C1', [
    { id: 'H1', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('35', 37),
      o: ['Helix', 'Tragus', 'Lobule', 'Concha'], a: 2,
      ex: 'A is the soft bottom of the auricle without cartilage: the lobule.' },
    { id: 'H2', src: 'AC81 spot', q: 'Identify structure B.', fig: s81('35', 37), figRef: 'H1',
      o: ['Helix', 'Antihelix', 'Tragus', 'Antitragus'], a: 2,
      ex: 'B is the small flap in front of the external acoustic meatus: the tragus.' }
  ]);
  CVS.after('H-C2', [
    { id: 'H3', src: 'AC80', q: 'What structure lies anteriorly to the tympanic cavity?',
      o: ['Auditory tube', 'Aditus to mastoid antrum', 'Stapedius muscle', 'Promontory', 'Round window'], a: 0,
      ex: 'Anterior (carotid) wall: opening of the auditory (Eustachian) tube and the canal for tensor tympani, with the internal carotid behind it. The aditus is posterior; promontory and round window are medial.' },
    { id: 'H4', src: 'AC80', q: 'Which structure lies adjacent to the posterior wall of the tympanic cavity?',
      o: ['Auditory tube', 'Pharyngotympanic tube', 'Internal carotid artery', 'Facial nerve'], a: 3,
      ex: 'Posterior (mastoid) wall: aditus to the mastoid antrum, pyramid with stapedius, and the descending facial canal. Auditory tube and carotid are anterior.' },
    { id: 'H5', src: 'AC81', core: true, q: 'The oval window is on which wall of the middle ear?',
      o: ['Superior wall', 'Inferior wall', 'Lateral wall', 'Posterior wall', 'Medial wall'], a: 4,
      ex: 'Medial (labyrinthine) wall: promontory, oval window (stapes footplate), round window, and the facial canal above. Lateral wall = tympanic membrane.' },
    { id: 'H6', src: 'AC81', q: 'A patient with chronic otitis media later develops facial palsy. Through which wall of the middle ear did the infection spread?',
      o: ['Superior wall', 'Inferior wall', 'Lateral wall', 'Posterior wall', 'Medial wall'], a: 3,
      ex: 'The facial canal runs along the medial wall and then turns down inside the posterior (mastoid) wall. Chronic otitis media spreading back into the mastoid reaches the nerve there.',
      flag: 'The facial canal also bulges on the medial wall above the oval window; the key is the posterior wall.' }
  ]);
  CVS.after('H-C3', [
    { id: 'H7', src: 'AC80', core: true, q: 'Which structure is NOT directly involved in the conduction of sound to the auditory receptor?',
      o: ['Oval window', 'Tympanic membrane', 'Eustachian tube', 'Cochlear duct', 'Stapes'], a: 2,
      ex: 'Sound path: tympanic membrane → ossicles → stapes in the oval window → perilymph → cochlear duct. The Eustachian tube only equalises pressure and drains the middle ear.' },
    { id: 'H8', src: 'AC80', q: 'What is the insertion site of the tensor tympani muscle?',
      o: ['Malleus', 'Incus', 'Stapes', 'Tegmen tympani'], a: 0,
      ex: 'Tensor tympani (V3) inserts on the handle of the malleus; stapedius (VII) on the neck of the stapes.' },
    { id: 'H9', src: 'AC81', q: 'Which nerve innervates the stapedius muscle?',
      o: ['Facial nerve', 'Mandibular nerve', 'Chorda tympani nerve'], a: 0,
      ex: 'Stapedius ← nerve to stapedius from the facial nerve; lesion → hyperacusis. Tensor tympani ← V3.',
      flag: 'Only three options were recalled.' },
    { id: 'H10', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('33', 35),
      o: ['Tympanic membrane', 'Semicircular canals', 'Cochlea', 'Stapes'], a: 1,
      ex: 'A points to the three loops on top of the inner ear: the semicircular canals.' },
    { id: 'H11', src: 'AC81 spot', q: 'Identify structure B.', fig: s81('33', 35), figRef: 'H10',
      o: ['Salpingopharyngeus', 'Stapedius', 'Auditory tube', 'External acoustic meatus'], a: 2,
      ex: 'B is the tube running down and forward from the middle ear to the nasopharynx: the auditory (Eustachian) tube.' },
    { id: 'H12', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('32', 40),
      o: ['External acoustic meatus', 'Semicircular canal', 'Vestibule', 'Auditory tube'], a: 3,
      ex: 'A is the tube heading down and forward toward the pharynx: the auditory tube.' },
    { id: 'H13', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('32', 40), figRef: 'H12',
      o: ['External acoustic meatus', 'Semicircular canal', 'Vestibule', 'Auditory tube'], a: 1,
      ex: 'B points to the loops of the inner ear: the semicircular canals.' },
    { id: 'H14', src: 'AC79 spot', q: 'Identify this bone A.', fig: s79('33', 41),
      o: ['Malleus', 'Incus', 'Stapes', 'Cochlea'], a: 0,
      ex: 'A has a rounded head and a long handle: the malleus.' },
    { id: 'H15', src: 'AC79 spot', q: 'Identify this bone B.', fig: s79('33', 41), figRef: 'H14',
      o: ['Malleus', 'Incus', 'Stapes', 'Cochlea'], a: 1,
      ex: 'B has a body with a long and a short process, like a molar tooth: the incus.' },
    { id: 'H16', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('34', 42),
      o: ['External acoustic meatus', 'Semicircular canal', 'Vestibule', 'Auditory tube'], a: 0,
      ex: 'On the dry skull, A is the bony opening behind the TMJ: the external acoustic meatus.' },
    { id: 'H17', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('34', 42), figRef: 'H16',
      o: ['Styloid process', 'Mastoid process', 'Stylomastoid process', 'Mastostyloid process'], a: 1,
      ex: 'B is the rounded bump behind and below the meatus: the mastoid process.' }
  ]);
  CVS.after('H-C4', [
    { id: 'H18', src: 'AC81', core: true, q: 'Which membrane is directly in contact with the hair cells in the crista ampullaris?',
      o: ['Cupula', 'Otolithic membrane', 'Basilar membrane', 'Vestibular membrane', 'Tectorial membrane'], a: 0,
      ex: 'Crista (in the ampulla of a semicircular duct) → hair cells capped by the gelatinous cupula. Macula → otolithic membrane. Organ of Corti → tectorial membrane.' },
    { id: 'H19', src: 'AC81 spot', q: 'Identify structure A (whole slide).', fig: s81('34', 36),
      o: ['Ampulla', 'Macula', 'Cupula', 'Organ of Corti'], a: 1,
      ex: 'A flat patch of hair cells under a gelatinous layer topped with crystals: a macula (utricle or saccule).' },
    { id: 'H20', src: 'AC81 spot', q: 'Which of the following membranes does structure A contain?', fig: s81('34', 36), figRef: 'H19',
      o: ['Otolithic membrane', 'Vestibular membrane', 'Tectorial membrane', 'Basilar membrane'], a: 0,
      ex: 'A macula carries the otolithic membrane with otoconia that drag the hair cells when the head tilts or accelerates.' }
  ]);
  CVS.after('H-C5', [
    { id: 'H21', src: 'AC80', core: true, q: 'Which structure directly continues from the oval window?',
      o: ['Utricle', 'Scala tympani', 'Scala vestibuli', 'Cochlear duct', 'Semicircular duct'], a: 2,
      ex: 'The stapes pushes perilymph of the vestibule into the scala vestibuli, over the helicotrema into the scala tympani, ending at the round window.' },
    { id: 'H22', src: 'AC81', q: 'Which of the following is an auditory receptor?',
      o: ['Macula lutea', 'Macula sacculi', 'Macula utriculi', 'Organ of corti', 'Crista ampullaris'], a: 3,
      ex: 'Hearing: organ of Corti. The maculae and cristae are vestibular; macula lutea is in the retina.' },
    { id: 'H23', src: 'AC81 spot', q: 'Identify structure A.', fig: s81('36', 38),
      o: ['Scala tympani', 'Cochlear duct', 'Scala vestibuli', 'Stria vascularis'], a: 1,
      ex: 'A is the triangular middle chamber between the vestibular and basilar membranes: the cochlear duct (scala media).' },
    { id: 'H24', src: 'AC81 spot', q: 'Which bone is structure B?', fig: s81('36', 38), figRef: 'H23',
      o: ['Temporal bone', 'Cochlea', 'Semicircular canal', 'Stapes'], a: 1,
      ex: 'B is the bony wall around the cochlear turns, keyed as the (bony) cochlea.',
      flag: 'That bony capsule is part of the petrous temporal bone; the recalled key is “cochlea”.' },
    { id: 'H25', src: 'AC79 spot', q: 'Identify this structure A.', fig: s79('35', 43),
      o: ['Scala vestibuli', 'Scala tympani', 'Stria vascularis', 'Cochlear duct'], a: 3,
      ex: 'A is the endolymph chamber sitting on the organ of Corti: the cochlear duct.' },
    { id: 'H26', src: 'AC79 spot', q: 'Identify this structure B.', fig: s79('35', 43), figRef: 'H25',
      o: ['Vestibular membrane', 'Basilar membrane', 'Hair cells', 'Tectorial membrane'], a: 3,
      ex: 'B is the gelatinous flap lying over the hair cells: the tectorial membrane.' }
  ]);
})();
