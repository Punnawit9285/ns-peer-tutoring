/* Past-paper questions, Video 4: M membrane potential, P nerve & NMJ, L lab, R reflex. */
(function () {
  var ELYTE = ['Action potentials are less frequent and have less amplitude.', 'Action potentials are more frequent and have higher amplitude.', 'Action potentials do not have any changes because they are the same no matter what.', 'Refractory period is prolonged.', 'Action potentials can’t be stimulated at all because cells are desensitized.'];
  var NMO = ['Autoimmune attack on AQP4', 'Pre-existing respiratory infection', 'Internalization of nAChR', 'White blood cell damages myelin causing multiple scarring in CNS', 'Pre-existing gastrointestinal infection'];

  /* ---------- M · Membrane potential ---------- */
  CVS.after('M-C3', [
    { id: 'M1', src: 'AC81', core: true,
      q: 'A 68-year-old woman is brought in with confusion, nausea and mild headache after drinking large amounts of water daily for a week. Serum sodium is 110 mEq/L (normal 135–145). Which of the following is correct?',
      o: ['RMP becomes less negative', 'Potassium equilibrium becomes less negative', 'RMP becomes less positive', 'Sodium equilibrium becomes less positive'], a: 3,
      ex: 'E<sub>Na</sub> = 61 log([Na]<sub>o</sub>/[Na]<sub>i</sub>). Lower outside Na⁺ shrinks the ratio, so E<sub>Na</sub> falls (less positive) and the AP overshoot is smaller. Resting potential barely changes because the resting membrane is mostly permeable to K⁺, and E<sub>K</sub> is untouched.' }
  ]);
  CVS.after('M-C4', [
    { id: 'M2', src: 'AC81',
      q: 'A researcher has accidental contact with a marine toxin. He has delayed muscle relaxation, prolonged contraction and repetitive firing; electrophysiology shows delayed repolarization, with no sodium channel block and no NMJ disorder. Which best describes the toxin’s effect on the action potential?',
      o: ['Calcium excessive influx at presynaptic, leading to massive ACh release', 'Increase Na channel permeability', 'Increase potassium leakage', 'Blockade of voltage-gated K⁺ channel', 'Blockade of non-gated K⁺ channel'], a: 3,
      ex: 'Repolarisation is driven by voltage-gated K⁺ channels opening. Block them and each AP is prolonged, repolarisation is delayed and the membrane fires repetitively.' }
  ]);
  CVS.after('M-C5', [
    { id: 'M3', src: 'AC80', core: true,
      q: 'A 39-year-old teacher was taken to hospital. Plasma potassium is 7.5 mmol/L (normal 3.5–5). Which of the following is true about this patient?', o: ELYTE, a: 4,
      ex: 'High outside K⁺ makes E<sub>K</sub> and the RMP less negative. A small rise brings the cell nearer threshold, but a large sustained rise keeps the membrane depolarised so Na⁺ channels stay inactivated: no AP can fire (depolarisation block).',
      flag: '“Desensitized” in the key means inactivated Na⁺ channels (depolarisation block).' },
    { id: 'M4', src: 'AC80',
      q: 'A 70-year-old woman with low water intake is confused, with flushed skin and low-grade fever. Serum sodium is 167 mEq/L (normal 135–145). Which of the following is true about this patient?', o: ELYTE, a: 1,
      ex: 'More outside Na⁺ → E<sub>Na</sub> more positive → a bigger driving force for Na⁺ entry, so APs rise higher and the cell is more excitable.' },
    { id: 'M5', src: 'AC80',
      q: 'An athlete has muscle weakness, abdominal cramp and muscle cramp. Serum sodium is decreased. Which one happened to the patient?',
      o: ['Sodium equilibrium potential becomes less positive, thus action potential amplitude is decreased', 'Sodium equilibrium potential becomes less positive, thus refractory period is prolonged', 'Sodium equilibrium potential becomes less positive, thus no action potential', 'Sodium equilibrium potential becomes more positive, thus action potential amplitude is decreased', 'Sodium equilibrium potential becomes less negative, thus refractory period is prolonged'], a: 0,
      ex: 'Low outside Na⁺ → smaller Na⁺ gradient → E<sub>Na</sub> less positive → the AP peak (overshoot) is lower. APs still fire.' },
    { id: 'M6', src: 'AC81',
      q: 'A 72-year-old man with confusion, nausea and headache has been drinking excessive water. Serum sodium is 118 mEq/L and potassium 4.0 mEq/L. How will it affect his action potential?',
      o: ['High chance of getting sustained depolarization', 'Higher frequency', 'Higher amplitude', 'Lower frequency and amplitude of action potential'], a: 3,
      ex: 'Hyponatraemia lowers E<sub>Na</sub> and the Na⁺ driving force: APs are smaller and the cell fires less.' },
    { id: 'M7', src: 'AC81',
      q: 'A 65-year-old woman on a thiazide for 3 weeks has muscle weakness, fatigue and palpitations. Serum potassium is 2.8 mEq/L. Which of the following is correct?',
      o: ['RMP less negative and depolarization block', 'Hyperpolarization', 'Prolonged action potential duration', 'Increase excitability'], a: 1,
      ex: 'Low outside K⁺ widens the K⁺ gradient: E<sub>K</sub> and the RMP become more negative (hyperpolarised), further from threshold, so muscle is weak.' }
  ]);

  /* ---------- P · Nerve & NMJ ---------- */
  CVS.after('P-C2', [
    { id: 'P1', src: 'AC81', core: true,
      q: 'A 58-year-old man with 10 years of type 2 diabetes has stocking numbness, decreased vibration sense, reduced ankle reflexes and slowed nerve conduction velocities. Which best explains the slowed conduction?',
      o: ['Decrease membrane resistance leading to increased ion leakage along the axon', 'Increase axial resistance of the axon', 'Upregulation of sodium channels to compensate for demyelination', 'High density of voltage-gated sodium channels in demyelinated segments', 'Increase in myelin sheath thickness'], a: 0,
      ex: 'Myelin is a high membrane resistance (and low capacitance). Demyelination lowers R<sub>m</sub>, so current leaks out between nodes, the length constant shrinks and less current reaches the next node: conduction slows or fails.' },
    { id: 'P2', src: 'AC80 · AC81',
      q: 'A 36-year-old woman has progressive weakness of both legs, numbness, urinary retention and blurred vision in the right eye. There is demyelination and NMO-IgG is positive. Which is correct about the pathophysiology?',
      o: ['Attack on AQP4 causing astrocyte death and secondary demyelination in axons of the central nervous system', 'Direct CD8+ T cell-mediated killing of neurons', 'Peripheral nervous system demyelination', 'Occurs only in NMO patients with negative serum anti-AQP4 antibody', 'Macrophage-mediated damage to central nervous system fibers'], a: 0,
      ex: 'NMO-IgG is anti-aquaporin-4. AQP4 sits on astrocyte end-feet, so the attack kills astrocytes and the CNS myelin is lost secondarily (optic nerve and cord).' },
    { id: 'P3', src: 'AC80',
      q: 'A man previously diagnosed with thymic hyperplasia now has fluctuating muscle weakness, ptosis, diplopia and dysphagia. He was diagnosed with multiple sclerosis. What is the likely underlying cause of the symptoms?', o: NMO, a: 3,
      ex: 'Multiple sclerosis: immune cells attack CNS myelin, leaving many plaques (scars) in the white matter.',
      flag: 'The recalled stem mixes myasthenia gravis (thymic hyperplasia, fatigable ptosis and diplopia → internalised nAChR) with the diagnosis “multiple sclerosis”; the key follows the diagnosis.' }
  ]);
  CVS.after('P-C4', [
    { id: 'P4', src: 'AC80', core: true,
      q: 'Tetrodotoxin interferes with the transmission of signals from nerves to muscles and causes increasing paralysis. What is its possible effect?',
      o: ['Inhibit voltage-gated sodium channel on postsynaptic neuron', 'Inhibit voltage-gated calcium channel on presynaptic neuron', 'Inhibit voltage-gated potassium channel', 'Stimulate voltage-gated potassium channel', 'Inhibit nAChRs on postsynaptic neuron'], a: 0,
      ex: 'TTX (puffer fish) blocks voltage-gated Na⁺ channels, so no AP can be generated in nerve or muscle. LEMS hits presynaptic Ca²⁺ channels; curare-like toxins hit nAChRs.' },
    { id: 'P5', src: 'AC80',
      q: 'A woman bitten by a banded krait has headache, dizziness, unconsciousness, visual and speech disorders and sometimes convulsions. What is the mechanism of the toxin?',
      o: ['Inhibit voltage-gated sodium channel on postsynaptic neuron', 'Inhibit voltage-gated calcium channel on presynaptic neuron', 'Degrade SNARE complex in presynaptic neuron', 'Stimulation of voltage-gated potassium channel', 'Inhibition of nAChRs on postsynaptic neuron'], a: 4,
      ex: 'Krait venom’s α-bungarotoxin binds the postsynaptic nicotinic receptor and blocks it irreversibly → flaccid paralysis. SNARE cleavage is botulinum toxin.',
      flag: 'Krait venom also has a presynaptic toxin (β-bungarotoxin); the key is the postsynaptic nAChR block.' },
    { id: 'P6', src: 'AC81',
      q: 'During surgery with halothane and succinylcholine, a patient develops tachycardia, tachypnoea, hyperthermia (39 °C) and muscle rigidity including the masseter. What is the cause?',
      o: ['Excessive calcium influx due to excess calcium channel', 'Decreased calcium uptake back to SR due to malfunction of SERCA pump', 'Excessive calcium release because of mutation of the gene for ryanodine receptor-1', 'Dysfunction of the neuromuscular junction causing neurotransmitter excess in the synaptic cleft', 'Mitochondrial malfunction with no oxidative phosphorylation'], a: 2,
      ex: 'Malignant hyperthermia: a mutant RyR1 Ca²⁺-release channel in the SR opens uncontrollably with volatile anaesthetics or succinylcholine → sustained contraction, rigidity, heat and hypermetabolism.',
      flag: 'Asked under ANS physiology in AC81; the recalled option C said “calcium influx”, but RyR1 releases Ca²⁺ from the SR.' }
  ]);

  /* ---------- L · Lab ---------- */
  CVS.after('L-C5', [
    { id: 'L1', src: 'AC80', core: true,
      q: 'ทดลองฉีดสารเคมี X และ high dose Y ไปที่ NMJ ของกบ 2 ตัว ตัวละ 1 ชนิด แล้วกระตุ้น gastrocnemius โดยตรง พบว่ามี muscle contraction แต่ถ้ากระตุ้นที่ sciatic nerve ไม่มี muscle contraction สาร X และ Y คืออะไรตามลำดับ (Chemical X and a high dose of Y are each applied to a frog NMJ. Direct muscle stimulation still contracts the muscle; sciatic nerve stimulation does not. What are X and Y?)',
      o: ['Acetylcholine, Succinyl CoA', 'Acetyl CoA, Succinylcholine', 'Succinylcholine, Acetylcholine', 'Succinyl CoA, Acetylcholine'], a: 2,
      ex: 'Both succinylcholine and a high dose of ACh keep the end-plate depolarised, so Na⁺ channels inactivate and nerve stimulation fails, while direct stimulation still works because the muscle itself is fine. Acetyl CoA and succinyl CoA are metabolic intermediates, not NMJ drugs.' }
  ]);

  /* ---------- R · Reflex ---------- */
  CVS.after('R-C2', [
    { id: 'R1', src: 'AC80', core: true,
      q: 'เหตุการณ์ใดที่เกิดขึ้นเพื่อป้องกัน muscle contraction มากเกินไป (Which event occurs to prevent excessive muscle contraction?)',
      o: ['Muscle relaxation', 'Effector organ is Golgi tendon organ', 'Muscle is further contracted', 'Effector organ is muscle spindle', 'Receptor organ is muscle spindle'], a: 0,
      ex: 'Too much tension → Golgi tendon organ (the receptor) → Ib → inhibitory interneuron → the same muscle relaxes (inverse stretch reflex). Spindles and tendon organs are receptors, never effectors.' },
    { id: 'R2', src: 'AC80', q: 'A muscle is rapidly stretched. What happens?',
      o: ['Nuclear bags are more stimulated than nuclear chains', 'Golgi tendon organ senses the stretch.', 'Receptors are in both center and ending of muscle spindles', 'Muscle spindle remains stretched for several minutes after stimulation', 'Depends on degree of change in spindle fiber'], a: 0,
      ex: 'The dynamic response to the rate of stretch comes from the centre of the spindle, mainly nuclear bag fibres (primary Ia endings). The static response to the amount of stretch uses both ends and the nuclear chain fibres.' },
    { id: 'R3', src: 'AC81', q: 'What is correct when adding weight on a loading hand?',
      o: ['Activated by Golgi tendon organ', 'Flexor muscles relax', 'Extensor muscles contract', 'This reflex uses multiple synapse elements', 'Activated by increase in muscle fiber length'], a: 4,
      ex: 'A sudden load stretches the elbow flexors; the spindles sense the increase in length and the monosynaptic stretch reflex makes the flexors contract to hold the hand up.' }
  ]);
  CVS.after('R-C3', [
    { id: 'R4', src: 'AC81', core: true,
      q: 'A first-year medical student crushed his toe on the corner of a table and kept the foot withdrawn from the stimulus for more than 20–30 seconds. Which is the correct explanation of this mechanism?',
      o: ['This effect doesn’t happen in crossed extensor reflex', 'This effect does not require interneurons', 'This duration lasts longer in non-painful stimuli', 'This effect is caused by a reverberating neural circuit', 'Can be inhibited by multisegmental suppression'], a: 3,
      ex: 'Afterdischarge: interneuron chains that loop back on themselves (reverberating circuits) keep the motor neurons firing after the stimulus ends. It needs interneurons, happens in the crossed extensor reflex too, and is longer for stronger, painful stimuli.' },
    { id: 'R5', src: 'AC80', q: 'After stepping on a nail and having a flexor reflex, what causes the prolonged flexion of the muscle after the stimulus is removed?',
      o: ['Amplification', 'Diverging circuit', 'Repetitive discharge', 'Reciprocal inhibition', 'Reduction discharge'], a: 2,
      ex: 'Contraction outlasting the stimulus is afterdischarge: repetitive discharge of the motor neurons driven by reverberating interneuron circuits. Divergence spreads the signal; reciprocal inhibition relaxes antagonists.' }
  ]);
  CVS.after('R-C4', [
    { id: 'R6', src: 'AC80', core: true, q: 'MRI shows a T4–T5 cord injury. What is the first sign after injury?',
      o: ['Weakness in both arms', 'Hyperreflexia of biceps', 'Hyporeflexia of patellar reflex', 'Increased sweating in both legs', 'Increased pain in both legs'], a: 2,
      ex: 'Right after transection comes spinal shock: every reflex below the lesion is lost (areflexia, flaccid), so the knee jerk is depressed. Hyperreflexia appears weeks later. Arms (C5–T1) are above the lesion.' },
    { id: 'R7', src: 'AC81', q: 'Right after an injury a patient has a C5–C6 disc herniation with pain radiating to the right arm. What is correct about his findings?',
      o: ['Positive Babinski sign', 'Hyporeflexia of right biceps reflex', 'Hyperreflexia of right triceps reflex', 'Hyperreflexia of left Achilles tendon reflex', 'Hyporeflexia of left biceps reflex'], a: 1,
      ex: 'The disc presses the root at the level of the biceps reflex arc (C5–C6): a lower motor lesion of the arc → depressed right biceps reflex. Babinski and hyperreflexia need an upper motor neuron lesion.' }
  ]);
  CVS.after('R-C5', [
    { id: 'R8', src: 'AC81', q: 'What is the correct position to use a percussion hammer to examine the reflex for elbow extension?',
      o: ['Two inches above olecranon process', 'Distal one third of radius', 'Just below elbow', 'Head of humerus', 'Cubital fossa'], a: 0,
      ex: 'Elbow extension = triceps reflex (C7–C8): tap the triceps tendon just above the olecranon. Biceps is tapped in the cubital fossa; brachioradialis on the distal radius.' },
    { id: 'R9', src: 'AC81', q: 'When examining a patient’s knee jerk, why does the doctor ask the patient to do the Jendrassik maneuver?',
      o: ['To distract the patient from the examination', 'To increase upper limb stretch reflex', 'To enhance patient–doctor relationship', 'To make quadriceps muscle contract', 'To assess sensation in the lower limb'], a: 0,
      ex: 'Pulling the hooked fingers apart takes the patient’s attention off the leg so he cannot hold it stiff, and boosts the reflex (reinforcement). It is used when the knee jerk seems absent.' }
  ]);
  CVS.after('R-C6', [
    { id: 'R10', src: 'AC81', q: 'A patient with Bell’s palsy has loss of the corneal reflex, but sensation on the cornea remains intact. What explains this?',
      o: ['Motor of trigeminal nerve impaired', 'Impairment of the nerve supplying orbicularis oculi', 'Lost sensation from the ophthalmic branch of trigeminal nerve'], a: 1,
      ex: 'Corneal reflex: afferent V1 (intact, the cornea still feels) → pons → efferent CN VII to orbicularis oculi. Bell’s palsy cuts the efferent, so the eye cannot blink.',
      flag: 'Recalled as “orbicularis oris”; the blink muscle is orbicularis oculi. Only three options were recalled.' }
  ]);
})();
