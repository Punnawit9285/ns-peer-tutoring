/* Past-paper questions, Video 5: A ANS physiology, G ANS integration, X ANS of head & neck, Y SGD cases
   (plus one AC80 ANS-physiology item that tests the NMJ, placed on P-C4). */
(function () {
  var ANTAG = ['β-1 receptor antagonist', 'β-2 receptor antagonist', 'α-1 receptor antagonist', 'α-2 receptor antagonist', 'Muscarinic receptor antagonist'];

  CVS.after('P-C4', [
    { id: 'P7', src: 'AC80',
      q: 'A man presents with respiratory infection, muscle pain, weakness of the lower limbs, decreased muscle tone, flaccidity, tendon reflex changes, facial weakness and demyelination of nerve. He also has congenital thymic hyperplasia. Which of the following mechanisms is inhibited in this patient?',
      o: ['Acetylcholine release', 'Acetylcholinesterase', 'Potassium ion influx', 'Nicotinic acetylcholine receptor', 'Sustained depolarization'], a: 3,
      ex: 'The key follows the thymus clue: myasthenia gravis, where antibodies block and internalise the postsynaptic nicotinic ACh receptor.',
      flag: 'The recalled stem mixes Guillain–Barré (infection, flaccid weakness, demyelination) with myasthenia (thymus). GBS would not be an NMJ problem at all; learn the two apart.' }
  ]);

  /* ---------- A · ANS physiology ---------- */
  CVS.after('A-C2', [
    { id: 'A1', src: 'AC80', core: true,
      q: 'A doctor prescribed isoproterenol (β-receptor agonist). Which of the following releases the same neurotransmitter that normally acts on this receptor?',
      o: ['Sympathetic fiber of eccrine sweat glands', 'Preganglionic fiber that supplies sympathetic chain', 'Postganglionic fiber of parasympathetic nervous system', 'Preganglionic fiber of parasympathetic nervous system', 'Postganglionic fiber controlling ejaculation'], a: 4,
      ex: 'β receptors respond to noradrenaline. Sympathetic postganglionic fibres release NE (ejaculation is sympathetic). Every preganglionic fibre, parasympathetic postganglionic fibres and the sympathetic fibres to sweat glands all release ACh.' }
  ]);
  CVS.after('A-C4', [
    { id: 'A2', src: 'AC80 · AC81', core: true,
      q: 'A patient has decreased watery saliva and dehydrated mucosa. Which drug should the doctor prescribe to directly stimulate salivary acinar cells?',
      o: ['Alpha-1 agonist', 'Alpha-2 agonist', 'Beta-1 agonist', 'Beta-2 agonist', 'Muscarinic agonist'], a: 4,
      ex: 'Watery, copious saliva is the parasympathetic response: ACh on M3 receptors of the acinar cells (e.g. pilocarpine). Sympathetic (α1/β) stimulation gives scant, viscous saliva.' }
  ]);
  CVS.after('A-C5', [
    { id: 'A3', src: 'AC81', core: true,
      q: 'A 33-year-old woman has palpitations, tremor, sweating, headache and high blood pressure; metanephrines are high and a pheochromocytoma is found. Which muscle has increased contractility due to the excess circulating catecholamines?',
      o: ['Iris sphincter muscle', 'Gastrointestinal tract smooth muscle', 'Smooth muscle of bladder', 'Internal urethral sphincter', 'External urethral sphincter'], a: 3,
      ex: 'Catecholamines act on α1 receptors of the internal urethral sphincter → it contracts (urine storage). Iris sphincter, gut wall and detrusor contract with parasympathetic drive and relax with sympathetic; the external sphincter is skeletal muscle (pudendal nerve).' },
    { id: 'A4', src: 'AC80',
      q: 'A 40-year-old woman with multiple births over the past 10 years complains of urinary incontinence. Pelvic floor (Kegel) exercises do not help. Which drug should the doctor prescribe next?', o: ANTAG, a: 4,
      ex: 'Of the antagonists offered, a muscarinic (M3) antagonist relaxes the detrusor and reduces urge leakage, the standard drug step after pelvic floor training. Blocking α1 would relax the internal sphincter and make leakage worse.',
      flag: 'Multiparity suggests stress incontinence, for which no drug in this list is ideal; the key is the antimuscarinic.' }
  ]);
  CVS.after('A-C6', [
    { id: 'A5', src: 'AC81', q: 'A doctor prescribes a β-adrenergic agonist. What is the result of the medication?',
      o: ['Sweat gland secretion', 'Internal urethral sphincter contraction', 'External urethral sphincter contraction', 'Peristalsis and GI tract contraction', 'Urinary bladder muscle relaxation'], a: 4,
      ex: 'β2 (and β3) receptors relax smooth muscle: the detrusor relaxes (storage). Internal sphincter contraction is α1; sweat is muscarinic; the external sphincter is somatic.' },
    { id: 'A6', src: 'AC81',
      q: 'A patient on an antihypertensive that reduces sympathetic outflow from the brainstem has fatigue, dizziness on standing, tachycardia and low blood pressure. Which medication would increase norepinephrine release by blocking the inhibitory autoreceptor on sympathetic nerve terminals?', o: ANTAG, a: 3,
      ex: 'Presynaptic α2 receptors are the autoreceptors: NE acting on them switches off further NE release. Blocking α2 removes the brake and more NE is released.' }
  ]);

  /* ---------- G · ANS integration ---------- */
  CVS.after('G-C2', [
    { id: 'G1', src: 'AC80 · AC81', core: true,
      q: 'A patient has a right lung (apex) tumour causing Horner’s syndrome on the right side. He undergoes an apraclonidine test. Which of the following are his results?',
      fig: CVS.fig('ac80-apra', 'AC80: before and after apraclonidine (the patient’s right eye is on the viewer’s left).', 'ac80', 17),
      o: ['A', 'B', 'C', 'D', 'E'], a: 0,
      ex: 'Before: the right (Horner) pupil is the smaller one. Apraclonidine is a weak α1 agonist; the denervated right dilator has up-regulated α1 receptors, so the right pupil dilates, while the normal left pupil does not (or slightly constricts). The anisocoria reverses: the right becomes the larger pupil. Only row A shows that.' }
  ]);

  /* ---------- X · ANS of head & neck ---------- */
  CVS.after('X-C2', [
    { id: 'X1', src: 'AC81', core: true, q: 'The nerve fibres in the carotid plexus come from which of these?',
      o: ['Superior cervical sympathetic ganglion', 'Middle cervical sympathetic ganglion', 'Inferior cervical sympathetic ganglion', 'Thoracic spinal cord', 'Cervical spinal cord'], a: 0,
      ex: 'The carotid plexus is made of postganglionic fibres from the superior cervical ganglion (their cell bodies). The preganglionic neurons are in the T1–T3 lateral horn.' }
  ]);
  CVS.after('X-C4', [
    { id: 'X2', src: 'AC80', q: 'What is the parasympathetic preganglionic fibre to the submandibular ganglion?',
      o: ['Chorda tympani nerve', 'Greater petrosal nerve', 'Lesser petrosal nerve', 'Auriculotemporal nerve', 'Deep petrosal nerve'], a: 0,
      ex: 'Superior salivatory nucleus → CN VII → chorda tympani → joins the lingual nerve → submandibular ganglion → submandibular and sublingual glands. Greater petrosal goes to the pterygopalatine ganglion, lesser petrosal (IX) to the otic.' },
    { id: 'X3', src: 'AC81', q: 'Which nerve contains the parasympathetic fibres to the submandibular ganglion?',
      o: ['Lingual nerve', 'Auriculotemporal nerve', 'Chorda tympani'], a: 0,
      ex: 'The chorda tympani fibres travel inside the lingual nerve (V3) and leave it to synapse in the submandibular ganglion, which hangs from the lingual nerve.',
      flag: 'Keyed lingual nerve. Chorda tympani is also true (it is where the fibres come from); only three options were recalled.' },
    { id: 'X4', src: 'AC80', core: true, q: 'Which ganglion causes lacrimation?',
      o: ['Otic ganglion', 'Nodose ganglion', 'Trigeminal ganglion', 'Ciliary ganglion', 'Pterygopalatine ganglion'], a: 4,
      ex: 'Lacrimal pathway: superior salivatory nucleus → VII → greater petrosal → nerve of the pterygoid canal → pterygopalatine ganglion → zygomatic → lacrimal gland. Trigeminal and nodose ganglia are sensory.' }
  ]);
  CVS.after('X-C5', [
    { id: 'X5', src: 'AC81', core: true, q: 'Injury to which nerve could lead to gustatory lacrimation (crocodile tear syndrome)?',
      o: ['Facial nerve', 'Mandibular nerve', 'Vagus nerve', 'Hypoglossal nerve', 'Glossopharyngeal nerve'], a: 0,
      ex: 'After a facial nerve injury near the geniculate ganglion, regrowing salivary fibres (meant for the chorda tympani) end up in the greater petrosal path to the lacrimal gland: eating makes the eye water.' },
    { id: 'X6', src: 'AC80', q: 'Where is the tumour located if the patient has Bell’s palsy?',
      o: ['Stylomastoid foramen', 'Foramen ovale', 'Foramen rotundum', 'External acoustic meatus'], a: 0,
      ex: 'A lesion at the stylomastoid foramen hits the facial nerve after all its branches inside the temporal bone: the whole face is weak, but tears, taste and stapedius are spared.' }
  ]);
  CVS.after('X-C6', [
    { id: 'X7', src: 'AC80', core: true, q: 'Injury to which nerve decreases the secretion of the parotid gland?',
      o: ['Facial nerve', 'Hypoglossal nerve', 'Glossopharyngeal nerve', 'Maxillary nerve', 'Mandibular nerve'], a: 2,
      ex: 'Parotid secretomotor path: inferior salivatory nucleus → CN IX → tympanic plexus → lesser petrosal → otic ganglion → auriculotemporal (V3) → parotid. The facial nerve only passes through the gland.' },
    { id: 'X8', src: 'AC81', q: 'Which ganglion mediates the parasympathetic response to the parotid gland?',
      o: ['Otic ganglion', 'Ciliary ganglion', 'Nodose ganglion', 'Trigeminal ganglion', 'Pterygopalatine ganglion'], a: 0,
      ex: 'CN IX fibres synapse in the otic ganglion, below foramen ovale, then ride the auriculotemporal nerve to the parotid.' }
  ]);

  /* ---------- Y · SGD cases ---------- */
  CVS.after('Y-C1', [
    { id: 'Y1', src: 'AC81',
      q: 'A patient complains of right leg pain radiating down the posterior leg after lifting a heavy object. Which of the following examinations confirms S1 nerve root compression?',
      o: ['No sensation around great toe', 'Present of pain when wearing high heel', 'Absent Achilles (ankle) reflex', 'Fully present of sensation around the back of the leg', 'Absent of dorsiflexion'], a: 2,
      ex: 'S1: weak plantarflexion, numb lateral foot and sole, absent ankle (Achilles) reflex. Great-toe numbness and weak dorsiflexion point to L5; the patellar reflex is L3–L4.',
      flag: 'The recall gives the keyed option as “absent of patellar reflex”, which tests L3–L4, not S1. It is shown here as the ankle reflex, the S1 sign.' }
  ]);
  CVS.after('Y-C2', [
    { id: 'Y2', src: 'AC80', core: true,
      q: 'A man has a herniated intervertebral disc between the fifth lumbar and first sacral vertebrae. The disc compresses the nerve roots in the vertebral canal immediately posterior. Which spinal nerve is affected?',
      o: ['L3', 'L4', 'L5', 'S1', 'S2'], a: 3,
      ex: 'A posterolateral (paracentral) L5–S1 disc catches the root that is crossing it on the way down to the next foramen: the traversing S1 root. L5 has already left through the L5–S1 foramen above the disc.',
      flag: 'Recalled as “compresses the spinal cord”; at L5–S1 there is no cord, only the cauda equina.' }
  ]);
})();
