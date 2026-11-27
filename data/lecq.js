/* Lecture check-questions: the MCQs the lecturers put in their own NS I handouts ("NeuroChallenge" and
   exam-practice slides), each with the official answer printed on the same or the next slide.
   They sit after the past-paper questions of the concept they test. Options keep the slide's order. */
(function () {
  var MP = 'Membrane potential slides', PN = 'Nerve & NMJ slides', LB = 'Lab nerve & NMJ slides',
      AP = 'ANS physiology slides', AI = 'ANS integration slides', OC = 'Oral cavity slides', DF = 'Deep face slides';
  /* Cite the slide at the end of the explanation, then place the items after their concept card. */
  var put = function (cid, items) {
    items.forEach(function (it) { it.ex += ' (' + it.slide + '.)'; delete it.slide; });
    CVS.after(cid, items);
  };

  /* ---------- M · Membrane potential (NeuroChallenge #1–9 and the final challenge) ---------- */
  put('M-C1', [
    { id: 'M1', src: 'Lecture quiz', slide: MP + ', p.8', core: false,
      q: 'At rest, both the chemical and the electrical force push Na⁺ into the cell. What would happen if we suddenly opened many Na⁺ channels?',
      o: ['Na⁺ moves out', 'Na⁺ moves in', 'Na⁺ does not move', 'It depends only on ATP'], a: 1,
      ex: 'Both forces point inward, so the net electrochemical force drives Na⁺ in as soon as the channels open. No ATP is needed: ions flow down their gradient through channels.' },
    { id: 'M2', src: 'Lecture quiz', slide: MP + ', p.9', core: false,
      q: 'Which ion is closer to electrochemical equilibrium at the resting membrane potential?',
      o: ['Na⁺', 'K⁺', 'Both equally', 'Neither'], a: 1,
      ex: 'For K⁺ the chemical force (out) and the electrical force (in) nearly cancel, because the resting membrane is mostly permeable to K⁺ and Vm sits close to E<sub>K</sub>. For Na⁺ both forces point in, so it is far from equilibrium.' }
  ]);
  put('M-C2', [
    { id: 'M5', src: 'Lecture quiz', slide: MP + ', p.13', core: false,
      q: 'A neuron suddenly loses Na⁺/K⁺ ATPase activity. What happens immediately?',
      o: ['Vm instantly becomes 0 mV', 'Vm remains initially close to normal', 'Vm instantly becomes +70 mV', 'The membrane disappears'], a: 1,
      ex: 'The pump builds and keeps the concentration gradients; it is not the immediate source of Vm. Vm comes from ion permeability plus the gradients that already exist, so it stays close to normal at first and only runs down slowly as the gradients fade.' }
  ]);
  put('M-C3', [
    { id: 'M10', src: 'Lecture quiz', slide: MP + ', p.16', core: false,
      q: 'For Na⁺, [Na⁺]out ≫ [Na⁺]in. What sign would you expect for E<sub>Na</sub>?',
      o: ['Strongly negative', 'Around 0 mV', 'Positive', 'Impossible to predict'], a: 2,
      ex: 'A cation that is much more concentrated outside needs the inside to be positive to hold it back, so E<sub>Na</sub> is positive (about +60 mV in a typical neuron).' },
    { id: 'M11', src: 'Lecture quiz', slide: MP + ', p.19', core: false,
      q: 'Imagine that pK suddenly increases. Where will Vm move?',
      o: ['Toward ENa', 'Toward EK', 'Toward +60 mV', 'It will not change'], a: 1,
      ex: 'Raising the permeability to an ion pulls Vm toward that ion’s equilibrium potential (Goldman equation), so Vm moves toward E<sub>K</sub>: the cell hyperpolarizes.' }
  ]);
  put('M-C4', [
    { id: 'M18', src: 'Lecture quiz', slide: MP + ', p.23', core: false,
      q: 'During the rapid upstroke of the action potential:',
      o: ['Voltage-gated K⁺ channels open first', 'Voltage-gated Na⁺ channels open rapidly', 'Na⁺/K⁺ ATPase produces the spike', 'Cl⁻ channels generate the spike'], a: 1,
      ex: 'The upstroke is fast Na⁺ entry through voltage-gated Na⁺ channels (positive feedback). K⁺ channels open later and repolarize. The pump does not generate the spike.' },
    { id: 'M19', src: 'Lecture quiz', slide: MP + ', p.26', core: false,
      q: 'A neuron is at −70 mV. A stimulus changes Vm to −62 mV. Threshold is −55 mV. What happens?',
      o: ['Action potential occurs', 'No action potential occurs', 'The membrane immediately reaches +30 mV', 'The Na⁺/K⁺ pump stops'], a: 1,
      ex: '−62 mV is a subthreshold depolarization: it never reaches −55 mV, so the Na⁺-channel positive feedback never starts and no action potential fires.' },
    { id: 'M20', src: 'Lecture quiz', slide: MP + ', p.27', core: false,
      q: 'Stimulus A is just above threshold; stimulus B is very strong. Which action potential is larger?',
      o: ['A', 'B', 'Same amplitude', 'Depends on the person’s age'], a: 2,
      ex: 'Action potentials are all-or-none: once threshold is reached the spike has the same size. A stronger stimulus changes how often the neuron fires, not how big each spike is.' },
    { id: 'M21', src: 'Lecture quiz', slide: MP + ', p.31', core: false,
      q: 'Why does the refractory period matter? Which is a major consequence?',
      o: ['It prevents continuous uncontrolled firing', 'It helps establish one-way propagation of the action potential', 'It limits the maximum firing frequency', 'All of the above'], a: 3,
      ex: 'Inactivated Na⁺ channels behind the spike cannot reopen at once. That stops the spike from running backwards, spaces out the spikes (a ceiling on frequency) and prevents runaway firing.' }
  ]);
  put('M-C5', [
    { id: 'M28', src: 'Lecture quiz', slide: MP + ', p.34', core: true,
      q: 'Which patient is more likely to have reduced excitability? Patient A: moderate hyperkalemia, Vm −70 → −60 mV. Patient B: severe hyperkalemia, Vm −70 → −45 mV for a prolonged period.',
      o: ['Patient A', 'Patient B', 'Both equally', 'Cannot predict'], a: 1,
      ex: 'A small depolarization brings Vm closer to threshold, so excitability may rise (patient A). A large, sustained depolarization keeps the Na⁺ channels inactivated, so the cell cannot fire well (patient B).' }
  ]);

  /* ---------- P · Physiology of nerve & NMJ (NeuroChallenge #1, #3–#8) ---------- */
  put('P-C1', [
    { id: 'P5', src: 'Lecture quiz', slide: PN + ', p.7', core: false,
      q: 'Why should myelin make conduction faster?',
      o: ['It makes the action potential larger', 'It increases membrane resistance', 'It decreases axial resistance', 'It increases neurotransmitter release'], a: 1,
      ex: 'Myelin is insulation: it raises membrane resistance (and lowers capacitance), so less current leaks out and it spreads farther along the axon. Axial resistance falls with a wider axon, not with myelin.' },
    { id: 'P6', src: 'Lecture quiz', slide: PN + ', p.11', core: false,
      q: 'Which axon allows depolarizing current to travel farther?',
      o: ['Low Rm', 'High Rm'], a: 1,
      ex: 'λ ∝ √(Rm / Ra). A high membrane resistance means less current leaks out through the membrane, so the depolarization reaches farther.' }
  ]);
  put('P-C2', [
    { id: 'P13', src: 'Lecture quiz', slide: PN + ', p.14', core: false,
      q: 'Suppose myelin is damaged. What happens? <span class="muted">(all that apply)</span>',
      o: ['↓ Rm', '↑ capacitance', 'Current leaks more', 'Conduction becomes slower', 'Conduction may fail'], a: [0, 1, 2, 3, 4],
      ex: 'Demyelination lowers Rm and raises Cm, so current leaks and charges the membrane instead of spreading. Conduction slows, and if too little current reaches the next node it fails (conduction block).' },
    { id: 'P14', src: 'Lecture quiz', slide: PN + ', p.17', core: false,
      q: 'A patient has progressive ascending weakness and areflexia following an infection. Nerve conduction is markedly slowed. Which step in the pathway is primarily impaired?',
      o: ['ACh binding to postsynaptic nAChRs', 'Propagation of the action potential along the peripheral nerve', 'Ca²⁺ binding to troponin C', 'Cross-bridge cycling in skeletal muscle'], a: 1,
      ex: 'This is Guillain–Barré syndrome: post-infectious demyelination of peripheral nerves. The fault is in propagation along the nerve, which is why conduction velocity is slow; the NMJ and the muscle are intact.' }
  ]);
  put('P-C4', [
    { id: 'P31', src: 'Lecture quiz', slide: PN + ', p.29', core: true,
      q: 'Which finding most directly distinguishes LEMS from MG?',
      o: ['Ptosis', 'Diplopia', 'Reduced ACh release from the presynaptic terminal', 'Reduced number of postsynaptic nAChRs'], a: 2,
      ex: 'Both can cause ptosis and diplopia. LEMS is presynaptic (antibodies to voltage-gated Ca²⁺ channels → less ACh released); MG is postsynaptic (antibodies to nAChRs → fewer receptors).' },
    { id: 'P32', src: 'Lecture quiz', slide: PN + ', p.31', core: false,
      q: 'A toxin causes paralysis by blocking voltage-gated Na⁺ channels along peripheral nerves. Which toxin is most likely responsible?',
      o: ['Botulinum toxin', 'Tetanus toxin', 'α-Bungarotoxin', 'Tetrodotoxin'], a: 3,
      ex: 'Tetrodotoxin blocks voltage-gated Na⁺ channels, so no action potential starts or travels. Botulinum blocks ACh release, α-bungarotoxin blocks nAChRs, and tetanus toxin blocks inhibitory transmitter release in the cord.' }
  ]);
  put('P-C5', [
    { id: 'P35', src: 'Lecture quiz', slide: PN + ', p.33', core: false,
      q: 'Why can severe acetylcholinesterase inhibition eventually produce muscle weakness despite increased ACh?',
      o: ['ACh cannot bind nAChRs', 'Persistent depolarization can prevent effective action potential generation', 'ACh cannot enter the nerve terminal', 'Voltage-gated Ca²⁺ channels are permanently closed'], a: 1,
      ex: 'ACh piles up and keeps the end-plate depolarized. The surrounding voltage-gated Na⁺ channels stay inactivated, so no new muscle action potentials fire: a depolarizing block, like succinylcholine.' }
  ]);

  /* ---------- L · Lab nerve & NMJ (NeuroChallenge #1–#7) ---------- */
  put('L-C1', [
    { id: 'L1', src: 'Lab quiz', slide: LB + ', p.11', core: false,
      q: 'Which condition represents the absolute refractory period?',
      o: ['A second AP occurs normally', 'A second AP occurs only with a stronger stimulus', 'A second AP cannot be generated regardless of stimulus strength', 'A second AP is larger than the first'], a: 2,
      ex: 'In the absolute refractory period too many voltage-gated Na⁺ channels are inactivated, so no stimulus, however strong, can fire a second AP. "Only with a stronger stimulus" is the relative refractory period.' }
  ]);
  put('L-C2', [
    { id: 'L2', src: 'Lab quiz', slide: LB + ', p.18', core: false,
      q: 'Which nerve fiber would be expected to have the highest conduction velocity?',
      o: ['Small unmyelinated fiber', 'Small myelinated fiber', 'Large myelinated fiber', 'Small autonomic postganglionic fiber'], a: 2,
      ex: 'A large diameter lowers axial resistance, and myelin raises membrane resistance and lowers capacitance. Both speed conduction, so a large myelinated (Aα) fiber is fastest.' }
  ]);
  put('L-C3', [
    { id: 'L4', src: 'Lab quiz', slide: LB + ', p.22', core: true,
      q: 'A nerve is stimulated at two different sites. Distal stimulation latency = 3 ms; proximal stimulation latency = 5 ms; distance between stimulation sites = 40 mm. What is the approximate conduction velocity?',
      o: ['8 m/s', '20 m/s', '40 m/s', '80 m/s'], a: 1,
      ex: 'Use the difference in latency: Δt = 5 − 3 = 2 ms; velocity = 40 mm ÷ 2 ms = 0.04 m ÷ 0.002 s = 20 m/s. Subtracting the two latencies removes the time taken at the NMJ and the muscle.' }
  ]);
  put('L-C4', [
    { id: 'L7', src: 'Lab quiz', slide: LB + ', p.25', core: false,
      q: 'During nerve stimulation, which electrode is primarily responsible for producing local depolarization of the nerve membrane?',
      o: ['Anode', 'Cathode', 'Recording electrode', 'Ground electrode'], a: 1,
      ex: 'Under the cathode the outside of the membrane becomes negative, which depolarizes it, so the AP starts there. The anode hyperpolarizes.' },
    { id: 'L8', src: 'Lab quiz', slide: LB + ', p.29', core: true,
      q: 'Anodal block is applied to a stimulated nerve. Which change is most likely?',
      o: ['↓ latency and ↑ amplitude', '↑ latency and ↓ amplitude', '↓ latency and ↓ amplitude', '↑ latency and ↑ amplitude'], a: 1,
      ex: 'The anode hyperpolarizes the nerve, so excitation and propagation get harder. Some fibers conduct more slowly (longer latency) and some fail to conduct (smaller compound AP).' }
  ]);
  put('L-C5', [
    { id: 'L12', src: 'Lab quiz', slide: LB + ', p.37', core: false,
      q: 'A low concentration of ACh is applied to an intact neuromuscular preparation. What is the most likely immediate effect?',
      o: ['Muscle relaxation', 'Muscle contraction', 'Complete nerve conduction block', 'Blockade of voltage-gated Na⁺ channels'], a: 1,
      ex: 'A low dose acts like normal transmission: ACh opens nAChRs, makes an end-plate potential and fires a muscle AP, so the muscle contracts.' },
    { id: 'L13', src: 'Lab quiz', slide: LB + ', p.39', core: false,
      q: 'After exposure to a high concentration of ACh, the muscle initially contracts but later becomes unresponsive to further stimulation. What best explains this finding?',
      o: ['Depletion of all ACh receptors immediately', 'Persistent depolarization with Na⁺ channel inactivation', 'Increased membrane resistance causing hyperpolarization', 'Complete inhibition of ACh release'], a: 1,
      ex: 'Strong, lasting nAChR activation keeps the muscle membrane depolarized, so its voltage-gated Na⁺ channels cannot recover from inactivation: first contraction, then paralysis, as with succinylcholine.' }
  ]);

  /* ---------- A · ANS physiology (NeuroChallenge #1–#5) ---------- */
  put('A-C1', [
    { id: 'A2', src: 'Lecture quiz', slide: AP + ', p.5', core: false,
      q: 'A 19-year-old student sitting quietly before an examination suddenly has a faster heart rate, sweaty palms, dilated pupils, a dry mouth and less GI activity. Did the student consciously tell each organ what to do?',
      o: ['Yes', 'No', 'Only the heart', 'Only the pupils'], a: 1,
      ex: 'No. These are involuntary responses run by the autonomic nervous system, here a sympathetic (stress) pattern.' },
    { id: 'A3', src: 'Lecture quiz', slide: AP + ', p.7', core: false,
      q: 'Why does the ANS generally use a two-neuron pathway?',
      o: ['To make conduction faster', 'To allow peripheral integration/modulation', 'To activate skeletal muscle', 'To avoid neurotransmitters'], a: 1,
      ex: 'The ganglion is not a plain relay: it is a synapse where the signal can be integrated and modulated (and spread to many postganglionic neurons) outside the CNS.' }
  ]);
  put('A-C2', [
    { id: 'A8', src: 'Lecture quiz', slide: AP + ', p.9', core: true,
      q: 'A sympathetic preganglionic neuron releases:',
      o: ['NE', 'Dopamine', 'ACh', 'Epinephrine'], a: 2,
      ex: 'Golden rule: every autonomic preganglionic neuron releases ACh onto nicotinic receptors. After the ganglion, sympathetic fibers usually release NE (except to most sweat glands: ACh on muscarinic receptors).' }
  ]);
  put('A-C6', [
    { id: 'A29', src: 'Lecture quiz', slide: AP + ', p.22', core: false,
      q: 'A patient receives a β₁ agonist that stimulates the sympathetic nervous system. What should happen?',
      o: ['Bronchodilation', '↑ Heart rate', 'Vasoconstriction', 'Pupil constriction'], a: 1,
      ex: 'β₁ is the heart receptor: more pacemaker activity and contractility, so heart rate and cardiac output rise. Bronchodilation is β₂, vasoconstriction α₁, pupil constriction muscarinic.' },
    { id: 'A30', src: 'Lecture quiz', slide: AP + ', p.28', core: false,
      q: 'A patient receives a muscarinic receptor agonist. Predict the heart rate.',
      o: ['↑', '↓', 'No change', 'Depends only on ACh concentration'], a: 1,
      ex: 'Muscarinic (M2) activation in the heart slows the pacemaker, so heart rate falls, as with vagal stimulation.' }
  ]);

  /* ---------- G · ANS integration (NeuroChallenge #1–#4) ---------- */
  put('G-C1', [
    { id: 'G3', src: 'Lecture quiz', slide: AI + ', p.11', core: true,
      q: 'A patient has ptosis, miosis and anhidrosis. Which statement is BEST?',
      o: ['Parasympathetic pathway is damaged', 'Sympathetic pathway is damaged', 'Somatic motor pathway is damaged', 'NMJ transmission is impaired'], a: 1,
      ex: 'This is Horner syndrome: a lesion of the sympathetic pathway to the head. It is a pathway disorder, not an eye disease: the ptosis comes from the sympathetic tarsal muscle, not from the somatic levator.' }
  ]);
  put('G-C3', [
    { id: 'G11', src: 'Lecture quiz', slide: AI + ', p.14', core: false,
      q: 'In Raynaud phenomenon (cold exposure → sympathetic activation → vasoconstriction), what is happening to blood flow?',
      o: ['Increased blood flow', 'Reduced blood flow', 'Increased venous return', 'Increased skeletal muscle perfusion'], a: 1,
      ex: 'Cold triggers excessive sympathetic vasoconstriction of the digital arteries, so blood flow to the fingers falls.' },
    { id: 'G12', src: 'Lecture quiz', slide: AI + ', p.14', core: false,
      q: 'Which phase of the Raynaud colour change represents the most severe reduction in arterial blood flow?',
      o: ['White – pallor', 'Blue – cyanosis', 'Red – rubor'], a: 0,
      ex: 'White (pallor) = arteries clamped shut, almost no flow. Blue = slow flow with deoxygenated blood. Red = reactive hyperemia when flow returns.' }
  ]);
  put('G-C4', [
    { id: 'G14', src: 'Lab quiz', slide: AI + ', p.28', core: false,
      q: 'In the rabbit lab, one pupil becomes smaller after interruption of the sympathetic pathway. What is the best explanation?',
      o: ['Increased sympathetic activity', 'Loss of sympathetic function', 'Increased nicotinic transmission', 'Increased skeletal muscle activity'], a: 1,
      ex: 'Cutting the cervical sympathetic removes dilator-pupillae tone, so the unopposed parasympathetic sphincter makes the pupil small (miosis), as in Horner syndrome.' }
  ]);
  put('G-C5', [
    { id: 'G21', src: 'Lab quiz', slide: AI + ', p.42', core: true,
      q: 'In the dog lab, a drug causes HR ↓, BP ↓, GI motility ↑ and pupil constriction. Which autonomic pattern best explains the findings?',
      o: ['Sympathetic activation', 'Parasympathetic activation', 'Somatic motor activation', 'NMJ blockade'], a: 1,
      ex: 'Slow heart, low pressure, active gut and small pupils are all muscarinic, "rest and digest" effects: a parasympathetic (cholinergic) pattern, e.g. ACh or a muscarinic agonist.' }
  ]);

  /* ---------- O · Oral cavity (exam-practice slides 71–85) ---------- */
  put('O-C1', [
    { id: 'O4', src: 'Lecture quiz', slide: OC + ', p.75', core: false,
      q: 'Which artery supplies teeth?',
      o: ['Facial artery', 'Buccal artery', 'Lingual artery', 'Alveolar artery', 'Deep temporal artery'], a: 3,
      ex: 'The superior and inferior alveolar arteries, branches of the maxillary artery, supply the teeth; the superior and inferior alveolar nerves (V2, V3) give their sensation.' },
    { id: 'O5', src: 'AC72 · AC79 · Lecture quiz', slide: OC + ', p.77', core: false,
      q: 'Which nerve passes through the incisive foramen?',
      o: ['Buccal nerve', 'Nasopalatine nerve', 'Lesser petrosal nerve', 'Inferior alveolar nerve', 'Zygomaticotemporal nerve'], a: 1,
      ex: 'The nasopalatine nerve (V2) runs down the nasal septum and through the incisive foramen behind the central incisors to the front of the hard palate.' }
  ]);
  put('O-C2', [
    { id: 'O11', src: 'AC71 · AC79 · Lecture quiz', slide: OC + ', p.71', core: false,
      q: 'Which nerve controls the intrinsic muscles of the tongue?',
      o: ['Vagus nerve', 'Facial nerve', 'Lingual nerve', 'Hypoglossal nerve', 'Glossopharyngeal nerve'], a: 3,
      ex: 'All four intrinsic muscles (superior and inferior longitudinal, transverse, vertical) are supplied by the hypoglossal nerve (XII).' }
  ]);
  put('O-C3', [
    { id: 'O15', src: 'AC71 · Lecture quiz', slide: OC + ', p.73', core: false,
      q: 'Lingual artery enters the tongue deep to which muscle?',
      o: ['Mylohyoid muscle', 'Geniohyoid muscle', 'Hyoglossus muscle', 'Styloglossus muscle', 'Genioglossus muscle'], a: 2,
      ex: 'The lingual artery (from the external carotid) passes deep to hyoglossus; the hypoglossal nerve and the lingual nerve run on its superficial surface.' }
  ]);
  put('O-C4', [
    { id: 'O30', src: 'AC79 · Lecture quiz', slide: OC + ', p.79', core: true,
      q: 'Where does the submandibular duct open?',
      o: ['Sublingual fold', 'Tonsillar crypts', 'Buccal mucosa', 'Foramen cecum', 'Sublingual caruncle'], a: 4,
      ex: 'The submandibular (Wharton’s) duct opens on the sublingual caruncle beside the frenulum. The sublingual gland’s small ducts open along the sublingual fold.' },
    { id: 'O31', src: 'Lecture quiz', slide: OC + ', p.82', core: false,
      q: 'Which nerve lies on the external carotid artery and the hyoglossus muscle?',
      o: ['Lingual nerve', 'Hypoglossal nerve', 'Glossopharyngeal nerve', 'Accessory nerve', 'Vagus nerve'], a: 1,
      ex: 'The hypoglossal nerve hooks forward across the carotid arteries in the submandibular triangle and runs on the superficial surface of hyoglossus to the tongue.' },
    { id: 'O32', src: 'Lecture quiz', slide: OC + ', p.85', core: false,
      q: 'Which muscle covers the superficial surface of the anterior belly of the digastric muscle?',
      o: ['Mylohyoid muscle', 'Platysma muscle', 'Hyoglossus muscle', 'Geniohyoid muscle', 'Masseter muscle'], a: 1,
      ex: 'Platysma lies in the superficial fascia over the submental and submandibular triangles. Mylohyoid lies deep to the anterior belly.' }
  ]);

  /* ---------- D · Deep face (exam-practice slide 37) ---------- */
  put('D-C4', [
    { id: 'D27', src: 'Lecture quiz', slide: DF + ', p.37', core: false,
      q: 'Which of the followings is the motor branch of mandibular nerve?',
      o: ['Auriculotemporal nerve', 'Inferior alveolar nerve', 'Buccal nerve', 'Lingual nerve', 'Mylohyoid nerve'], a: 4,
      ex: 'Auriculotemporal, buccal and lingual are sensory, and the inferior alveolar nerve is mainly sensory to the lower teeth. Its branch, the nerve to mylohyoid, is motor to mylohyoid and the anterior belly of digastric.' }
  ]);
})();
