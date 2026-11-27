/* English recording script for the tutor deck: the video plan (start card), per-section opening line and
   "Understand it: the 80%" summary, and a SAY line for every concept card and core question. Keys match deck IDs. */
window.TUTOR_SCRIPT = {
  plan: [
    ["Video 1", ["N", "M", "P", "L"], "Nervous tissue, membrane potential, nerve conduction and the NMJ, the frog nerve lab.", "40&#8211;50 min"],
    ["Video 2", ["R", "A", "G"], "Reflexes and the reflex exam, ANS physiology, Horner and Raynaud with the rabbit and dog labs.", "40&#8211;45 min"],
    ["Video 3", ["S", "W"], "Physics of sound, hearing, audiograms and the vestibular system; light and lasers in medicine.", "30&#8211;40 min"],
    ["Video 4", ["V", "I", "C", "K", "Z"], "Back and vertebral column, spine imaging, spinal cord and peripheral nerve, skull and foramina, scalp, meninges and intracranial bleeds.", "50&#8211;60 min"],
    ["Video 5", ["F", "D", "O", "J"], "Superficial face and neck, deep face and V3, oral cavity and pharynx, deep neck.", "40&#8211;50 min"],
    ["Video 6", ["E", "H", "X", "Y"], "Eye and orbit, ear, ANS of head and neck with CN III, VII, IX, and the two SGD cases.", "45&#8211;55 min"]
  ],
  sec: {}
};
var SC = window.TUTOR_SCRIPT.sec;
function sec_(id, part, time, open, u, say) { SC[id] = { part: part, time: time, open: open, u: u, say: say }; }

sec_('V', 'Video 4', '10&#8211;12 min', 'Build the spine from bottom-line numbers: 7, 12, 5, 5, 4, then four curves, then the one feature that names each region, then the ligaments and the deep muscle columns.', [
  '<b>Counts and curves</b>: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral, 4 coccygeal; thoracic and sacral kyphoses are primary, cervical and lumbar lordoses secondary.',
  '<b>Typical vertebra</b>: body in front, arch of two pedicles and two laminae behind; facet joint between articular processes; intervertebral foramen from two notches.',
  '<b>Regional signatures</b>: atlas has no body, axis has the dens, cervicals have a foramen transversarium, thoracics have rib facets, sacrum has the hiatus and cornua.',
  '<b>Ligaments and disc</b>: ALL in front, PLL in the canal, flavum between laminae, nuchae above C7; disc = anulus around nucleus; sitting and bending raise disc pressure.',
  '<b>Deep back muscles</b>: splenius; erector spinae spinalis-longissimus-iliocostalis from medial to lateral; transversospinal semispinalis 4–6, multifidus 2–4, rotatores 1–2.',
  '<b>Suboccipital group</b>: two recti and two obliques under semispinalis capitis.'
], {
  'V-C1': 'Count the column first, then name each curve by which way it is concave, and remember the two that were already there before birth.',
  'V-C2': 'Every vertebra is a body plus an arch; the joints and the holes for nerves always come from two neighbours meeting.',
  'V-C3': 'Learn one signature feature per region, and the region names itself.',
  'V-C4': 'Walk the ligaments from front to back, then open the disc: a tough ring around a soft core.',
  'V-C5': 'Erector spinae from medial to lateral is S, L, I; the transversospinal group just gets shorter as it gets deeper.',
  'V-C6': 'Four small muscles tie the skull to C1 and C2 for the fine head movements.'
});
sec_('I', 'Video 4', '8&#8211;10 min', 'For each modality ask what it shows best: plain film for alignment, CT for bone, MRI for disc, cord and roots.', [
  '<b>C1–C2</b>: open-mouth view for symmetric gaps; atlanto-dental interval under 3 mm in adults and 5 mm in children.',
  '<b>Cervical film</b>: uncovertebral joints on AP, neural foramina on oblique, four smooth lines on the lateral view.',
  '<b>Lumbar oblique</b>: Scotty dog; a broken neck is spondylolysis, which can lead to spondylolisthesis.',
  '<b>CT</b>: denser means whiter; air −1000, water 0, bone up to 3000 HU; choose the window; high radiation.',
  '<b>MRI</b>: CSF dark on T1, bright on T2; best soft tissue, no radiation; pacemaker is a contraindication.'
], {
  'I-C1': 'Two views of C1 and C2: symmetry through the open mouth, and the gap between the atlas and the dens from the side.',
  'I-C2': 'Each joint shows best in a different view; on the lateral film follow four lines and look for a step.',
  'I-C3': 'Find the dog on the oblique film; a collar across its neck is a pars defect.',
  'I-C4': 'CT numbers rise with density, and the window decides which numbers you see as grey.',
  'I-C5': 'Look at the CSF: dark is T1, bright is T2; then pick CT for bone and MRI for soft tissue.'
});
sec_('N', 'Video 1', '10&#8211;12 min', 'Nervous tissue is three things: neurons, glia and connective tissue. Learn the neuron parts, the myelin makers and one job per glial cell.', [
  '<b>Origin</b>: neural tube makes the CNS, neural crest the PNS; neuropil is where synapses form.',
  '<b>Neuron</b>: vesicular nucleus, prominent nucleolus, Nissl bodies (rough ER) absent from the axon hillock; one axon, many dendrites.',
  '<b>Transport and synapses</b>: retrograde transport carries tetanus, herpes, rabies and polio to the soma.',
  '<b>Myelin and neuron classes</b>: oligodendrocyte many axons in the CNS, Schwann one internode in the PNS; pseudounipolar DRG, multipolar motor neuron.',
  '<b>Glia</b>: astrocyte BBB, scars, GFAP; microglia from the yolk sac; ependyma and choroid plexus make CSF; Schwann and satellite cells in the PNS.',
  '<b>Endings and sheaths</b>: Pacinian vibration, Meissner touch; endo-, peri-, epineurium from inside out.'
], {
  'N-C1': 'Two embryonic sources, three components, and the neuropil where neurons talk.',
  'N-C2': 'The soma is a protein factory; the axon starts where the Nissl bodies stop.',
  'N-C3': 'Transport runs both ways, and the backward route is how toxins and viruses reach the cell body.',
  'N-C4': 'Count the axons each myelin cell wraps, then classify neurons by how many processes leave the soma.',
  'N-C5': 'Give every glial cell one job and you have the whole table.',
  'N-C6': 'Match each ending to its stimulus, then wrap the nerve in three sheaths.'
});
sec_('C', 'Video 4', '10&#8211;12 min', 'The cord is shorter than the canal: that one fact explains lumbar puncture, cauda equina and why the levels do not match.', [
  '<b>Levels</b>: cord ends at L1/L2, dural sac at S2; 8 cervical nerves; enlargements C4–T1 and L2–S3.',
  '<b>Spaces</b>: epidural fat and veins, subarachnoid CSF; lumbar puncture below the conus; caudal block through the sacral hiatus.',
  '<b>Inside the cord</b>: dorsal horn sensory, ventral motor, lateral autonomic; C1 is motor only.',
  '<b>Blood</b>: anterior spinal artery to the anterior two thirds, two posterior spinal arteries to the posterior third.',
  '<b>Fibres and endings</b>: bigger and myelinated is faster; Aα fastest, C slowest.',
  '<b>Nerve injury</b>: neurapraxia, axonotmesis, neurotmesis; regrowth about 1 mm a day; sural nerve graft.'
], {
  'C-C1': 'The cord stops at L1–L2, so below that the needle meets only floating roots.',
  'C-C2': 'Go layer by layer and say what fills each space; then place the two needles.',
  'C-C3': 'The butterfly: back horn takes in, front horn sends out, side horn is autonomic.',
  'C-C4': 'One artery in front for two thirds, two behind for one third.',
  'C-C5': 'Size and myelin set the speed; then pair each ending with its stimulus.',
  'C-C6': 'Grade an injury by what is cut: myelin only, axon, or the whole nerve.'
});
sec_('K', 'Video 4', '10&#8211;12 min', 'Learn the skull as an exam map: landmarks where bones meet, three fossae, and which hole each cranial nerve uses.', [
  '<b>22 bones</b>: 8 neurocranial, 14 facial; temporal bone has squamous, petrous, mastoid and tympanic parts.',
  '<b>Landmarks</b>: pterion F-P-S-T, asterion P-O-T, bregma sagittal plus coronal, lambda sagittal plus lambdoid; four fontanelles.',
  '<b>Fossae</b>: anterior for frontal lobes, middle for temporal lobes and pituitary, posterior (largest) for brainstem and cerebellum.',
  '<b>Foramina</b>: I cribriform, II optic canal, III IV V1 VI SOF, V2 rotundum, V3 ovale, VII VIII IAM, IX X XI jugular, XII hypoglossal.',
  '<b>Fractures</b>: pterion and the middle meningeal artery; cribriform and anosmia with CSF rhinorrhea; petrous and VII, VIII with otorrhea.'
], {
  'K-C1': 'Split the skull into the box for the brain and the bones of the face, then open the temporal bone into its four parts.',
  'K-C2': 'Every landmark is a meeting point of bones or sutures.',
  'K-C3': 'Three steps going down and back, each holding a different part of the brain.',
  'K-C4': 'Group the nerves by the hole they share.',
  'K-C5': 'For each fracture ask what runs just under that bone.'
});
sec_('Z', 'Video 4', '10&#8211;12 min', 'From outside in: five scalp layers, then three meninges, and pair every layer with the bleed that lives there.', [
  '<b>Scalp</b>: SCALP; loose areolar is the danger layer; cephalohaematoma stays within sutures.',
  '<b>Bleeds</b>: epidural from the middle meningeal artery, subdural from bridging veins, subarachnoid from an aneurysm.',
  '<b>Dural folds</b>: falx cerebri, tentorium with its notch, falx cerebelli, diaphragma sellae.',
  '<b>Cranial nerve classes</b>: sensory I II VIII; motor III IV VI XI XII; mixed V VII IX X; parasympathetic III VII IX X.',
  '<b>Vessels</b>: carotid and vertebrobasilar systems joined by the circle of Willis; cavernous sinus holds ICA and VI, wall holds III IV V1 V2.'
], {
  'Z-C1': 'Spell SCALP, then place each newborn bleed by the layer it sits under.',
  'Z-C2': 'Three bleeds, three spaces, three culprit vessels.',
  'Z-C3': 'The dura folds into walls and a tent that divide the skull.',
  'Z-C4': 'Sort the twelve nerves by what they carry.',
  'Z-C5': 'Two arterial systems meet in a ring; the cavernous sinus has two inside and four in the wall.'
});
sec_('F', 'Video 5', '10&#8211;12 min', 'The face moves with VII and feels with V; its veins lead to the cavernous sinus; the parotid is where VII branches.', [
  '<b>Muscles of expression</b>: all CN VII; masseter and temporalis are mastication.',
  '<b>Danger triangle</b>: facial vein to ophthalmic veins to the cavernous sinus.',
  '<b>Parotid</b>: facial nerve, external carotid branches, retromandibular vein; palsy causes corneal ulcer and drooling.',
  '<b>Sensation</b>: V1, V2, V3 bands; angle of jaw is great auricular C2–C3.',
  '<b>Neck</b>: triangles, strap muscles by ansa cervicalis, thyroid arteries from ECA and thyrocervical trunk.'
], {
  'F-C1': 'One nerve moves every muscle of facial expression, because they all come from the same arch.',
  'F-C2': 'Follow a pimple’s infection from the face into the skull.',
  'F-C3': 'Open the parotid and name what passes through it, then see the face that loses VII.',
  'F-C4': 'Three trigeminal bands top to bottom, and one patch that is not trigeminal.',
  'F-C5': 'Divide the neck with SCM, then trace the thyroid’s two arteries and three veins.'
});
sec_('D', 'Video 5', '10&#8211;12 min', 'The infratemporal fossa is a box: four chewing muscles, the maxillary artery, a venous plexus and V3 with its hitchhikers.', [
  '<b>Fossae</b>: walls and contents of the temporal and infratemporal fossae.',
  '<b>Mastication</b>: three close the jaw, lateral pterygoid opens and protrudes; all V3.',
  '<b>Maxillary artery</b>: three parts by the lateral pterygoid; middle meningeal through foramen spinosum.',
  '<b>V3</b>: sensory and motor branches; chorda tympani rides the lingual nerve; IX reaches the parotid through the otic ganglion.',
  '<b>Clinic</b>: TMJ disc and ligaments, bilateral mandible fractures, inferior alveolar block, spread to the cavernous sinus.'
], {
  'D-C1': 'Picture a box: bone on every side, and everything for chewing inside.',
  'D-C2': 'Three muscles shut the mouth; only the lateral pterygoid pulls it open.',
  'D-C3': 'Cut the artery into three by the lateral pterygoid, and note the veins that connect to the skull.',
  'D-C4': 'V3 splits into sensory and motor, and carries fibres from VII and IX to their glands.',
  'D-C5': 'A joint with a disc, a ring-shaped bone, and a needle at the mandibular foramen.'
});
sec_('O', 'Video 5', '10&#8211;12 min', 'Every structure here follows one nerve rule with one exception. Learn the rule, then the exception.', [
  '<b>Palate</b>: soft palate muscles X except tensor veli palatini V3; incisive foramen nasopalatine nerve.',
  '<b>Tongue muscles</b>: XII except palatoglossus X; genioglossus protrudes.',
  '<b>Tongue sensation</b>: anterior two thirds lingual V3 and chorda tympani VII; posterior third IX; lingual artery deep to hyoglossus.',
  '<b>Floor of mouth</b>: mylohyoid V3, geniohyoid XII, digastric V3 and VII; submandibular duct to the sublingual caruncle.',
  '<b>Pharynx</b>: three parts; constrictors X; stylopharyngeus IX; fish bones in the piriform recess.'
], {
  'O-C1': 'The soft palate is all vagus except one muscle that belongs to V3.',
  'O-C2': 'The tongue is all hypoglossal except one muscle that belongs to the vagus.',
  'O-C3': 'Ask two questions for each part of the tongue: what feels touch, what feels taste.',
  'O-C4': 'Different origins, different nerves; then find where the submandibular duct opens.',
  'O-C5': 'Three floors of the pharynx, and one muscle that breaks the vagus rule.'
});
sec_('J', 'Video 5', '10&#8211;12 min', 'Deep neck anatomy is always asked with a procedure: carotid plaque, central lines, thyroidectomy, Horner.', [
  '<b>Arteries</b>: right CCA from brachiocephalic, left from arch; subclavian in three parts by anterior scalene.',
  '<b>Central lines</b>: IJV risks carotid puncture, subclavian risks pneumothorax.',
  '<b>Vagus</b>: external laryngeal to cricothyroid, internal laryngeal sensory above the cords, recurrent laryngeal the rest.',
  '<b>Thyroidectomy</b>: superior thyroid artery with the external laryngeal nerve, inferior with the recurrent laryngeal.',
  '<b>Sympathetic trunk</b>: superior C2, middle C6, inferior C7; stellate ganglion; Horner.',
  '<b>Fascia</b>: investing, pretracheal, buccopharyngeal, prevertebral; danger space.'
], {
  'J-C1': 'Left and right carotids start differently; the subclavian is cut into three by a muscle.',
  'J-C2': 'Each central line site has the complication of whatever lies next to it.',
  'J-C3': 'Each thyroid artery travels with a laryngeal nerve, so tie one and you risk the other.',
  'J-C4': 'Three cervical ganglia at three levels; damage the chain and the face loses its sympathetics.',
  'J-C5': 'Fascia wraps the neck into tubes, and the spaces between them carry infection down.'
});
sec_('E', 'Video 6', '12&#8211;15 min', 'Orbit, then the muscles and how to test them, then the eyeball from outside in, then the nerves.', [
  '<b>Openings</b>: optic canal II and ophthalmic artery; SOF III IV V1 VI; IOF V2.',
  '<b>Extraocular muscles</b>: LR6 SO4 rest III; abduct to test recti, adduct to test obliques.',
  '<b>Tears</b>: lacrimal serous, goblet mucous, Meibomian lipid; drainage to the nose.',
  '<b>Eyeball</b>: fibrous, vascular, nervous tunics; optic disc blind spot, fovea cones.',
  '<b>Inside the eye</b>: dilator sympathetic, sphincter and ciliary muscle parasympathetic; aqueous to the trabecular meshwork.',
  '<b>Nerves</b>: papilledema, nasociliary in the corneal reflex, ciliary ganglion.'
], {
  'E-C1': 'A pyramid with holes at its apex; know what passes through each.',
  'E-C2': 'Put the eye where one muscle works alone, then ask it to move up or down.',
  'E-C3': 'Three layers of tear film from three glands, then follow the tears into the nose.',
  'E-C4': 'Three coats from outside in, and the two key spots on the fundus.',
  'E-C5': 'Two pupil muscles from two systems, and the route the aqueous takes out.',
  'E-C6': 'The optic nerve is brain, and the ciliary ganglion is the parasympathetic relay.'
});
sec_('H', 'Video 6', '12&#8211;15 min', 'Follow sound inward: canal, drum, a six-walled middle ear, then two labyrinths filled with two fluids.', [
  '<b>External ear</b>: outer third cartilage; umbo, pars flaccida, cone of light; pull the pinna up and back.',
  '<b>Middle ear walls</b>: tegmen roof, jugular floor, promontory medial, mastoid behind, tube in front.',
  '<b>Ossicles and muscles</b>: tensor tympani V3, stapedius VII; Eustachian tube upper third bone.',
  '<b>Labyrinth</b>: perilymph in bone, endolymph in membrane; macula for gravity, crista for rotation.',
  '<b>Cochlea</b>: organ of Corti on the basilar membrane; base high, apex low frequency.',
  '<b>Clinic</b>: conductive versus sensorineural; otitis media to meninges, mastoid, sigmoid sinus, facial nerve.'
], {
  'H-C1': 'Straighten the S-shaped canal, then read the drum.',
  'H-C2': 'A box with six walls; each wall tells you where infection can spread.',
  'H-C3': 'Big drum to small window amplifies; two muscles damp loud sound.',
  'H-C4': 'A tube inside a tube, two fluids, two kinds of balance receptor.',
  'H-C5': 'Three channels in the cochlea, and position along it sets the pitch.',
  'H-C6': 'Sort hearing loss by where the sound stops, then trace otitis media to its neighbours.'
});
sec_('M', 'Video 1', '10&#8211;12 min', 'Don’t memorise the direction, predict it: two forces on each ion, and Vm goes toward the most permeable ion.', [
  '<b>Forces</b>: Na⁺ chemical in and electrical in; K⁺ out and in, so K⁺ is near equilibrium.',
  '<b>RMP</b>: about −70 mV from gradients plus leak K⁺ permeability; the pump only maintains the gradients.',
  '<b>Nernst and Goldman</b>: E<sub>Na</sub> positive, E<sub>K</sub> negative; Vm pulled toward the most permeable ion.',
  '<b>Action potential</b>: threshold, Na⁺ in, K⁺ out; all-or-none; absolute and relative refractory periods.',
  '<b>Ion disorders</b>: mild high K⁺ raises excitability, sustained high K⁺ lowers it; hyponatremia swells the brain.'
], {
  'M-C1': 'Draw two arrows on each ion and see whether they add or cancel.',
  'M-C2': 'Gradient plus leak channels make the resting potential; the pump only keeps the gradient topped up.',
  'M-C3': 'Each ion has a voltage where its two forces balance; the membrane leans toward the ion it lets through most.',
  'M-C4': 'Sodium in, potassium out, and a recovery time when the sodium channel cannot fire again.',
  'M-C5': 'Change potassium and you move the resting potential; change sodium and you change the drive behind the spike.'
});
sec_('P', 'Video 1', '12&#8211;15 min', 'One signal, one journey: along the nerve, then across the junction. Every disease and drug breaks one step.', [
  '<b>Cable properties</b>: τ = Rm·Cm, λ ∝ √(Rm/Ra); myelin raises Rm and lowers Cm.',
  '<b>Saltatory conduction</b>: regenerated at nodes; demyelination slows and blocks; GBS is PNS.',
  '<b>NMJ</b>: Ca²⁺ entry, ACh release, nAChR, EPP (graded), muscle AP (all-or-none).',
  '<b>Failures</b>: LEMS Ca²⁺, botulinum release, MG receptors, TTX Na⁺ channels; tetanus is spastic.',
  '<b>Drugs</b>: AChE inhibition and succinylcholine depolarise until paralysis; atracurium blocks the receptor.'
], {
  'P-C1': 'Two numbers: how fast the membrane charges and how far the current spreads.',
  'P-C2': 'Current races under myelin and the spike is rebuilt at each node; strip the myelin and it leaks away.',
  'P-C3': 'Electrical to chemical to electrical: six steps from nerve spike to muscle spike.',
  'P-C4': 'Walk the chain on the chart and stop where each disease or drug cuts it.',
  'P-C5': 'Too much acetylcholine paralyses too, and the two relaxants get there by opposite routes.'
});
sec_('L', 'Video 1', '8&#8211;10 min', 'In the lab you are the physiologist: read each trace as a mechanism.', [
  '<b>Paired stimuli</b>: second response normal, smaller or absent depending on how many fibres are refractory.',
  '<b>Compound AP</b>: sum of many fibres; peaks from fast to slow fibres.',
  '<b>NCV</b>: distance over the latency difference; 40 mm over 2 ms is 20 m/s.',
  '<b>Electrodes</b>: cathode depolarises; anodal block raises latency and lowers amplitude.',
  '<b>NMJ drugs</b>: high ACh and succinylcholine stop nerve-evoked contraction while direct muscle stimulation still works.'
], {
  'L-C1': 'The nerve has many fibres, so the second response shrinks step by step as more of them are still recovering.',
  'L-C2': 'The trace is a crowd, not one fibre, so fast and slow groups arrive as separate peaks.',
  'L-C3': 'Stimulate twice and subtract, so the fixed delays cancel.',
  'L-C4': 'The cathode starts the spike; an anode in the way can stop it.',
  'L-C5': 'Stimulate the muscle directly to prove the block is at the junction.'
});
sec_('R', 'Video 2', '12&#8211;15 min', 'Every reflex is the same five-part arc; the exam is about which part and which level.', [
  '<b>Arc and classes</b>: receptor, afferent, centre, efferent, effector; mono, di, poly.',
  '<b>Spindle versus GTO</b>: length, Ia, monosynaptic, contracts; tension, Ib, disynaptic, relaxes.',
  '<b>Withdrawal</b>: flexor reflex then crossed extensor; divergence, reciprocal inhibition, afterdischarge.',
  '<b>Lesion level</b>: at or below the centre gives hyporeflexia, above gives hyperreflexia and Babinski; spinal shock first.',
  '<b>Bedside</b>: biceps C5–6, triceps C7–8, knee L2–4, ankle S1–2; grade 0 to 4+; jaw jerk normally absent.',
  '<b>Cranial and superficial</b>: corneal V to VII, gag IX to X, light II to III; plantar and Babinski.'
], {
  'R-C1': 'Name the five parts, then classify by whichever part differs.',
  'R-C2': 'One receptor senses length and tightens the muscle; the other senses tension and lets it go.',
  'R-C3': 'Pull one leg away, push with the other, and interneurons make it smooth.',
  'R-C4': 'Find the lesion relative to the reflex centre: below means less, above means more.',
  'R-C5': 'Each tendon reflex is one nerve and two roots; grade it and compare the sides.',
  'R-C6': 'For cranial reflexes, name the nerve in, the nerve out and the brainstem level.'
});
sec_('A', 'Video 2', '12&#8211;15 min', 'Follow the pathway, don’t memorise the organ table: two neurons, one golden rule, then receptors.', [
  '<b>Two neurons</b>: ganglion with fast nicotinic and slow muscarinic and dopamine potentials.',
  '<b>Golden rule</b>: all preganglionic ACh nicotinic; parasympathetic post ACh muscarinic; sympathetic post NE; sweat glands and adrenal medulla are exceptions.',
  '<b>Layout</b>: thoracolumbar versus craniosacral; paravertebral and prevertebral ganglia.',
  '<b>Eye and glands</b>: dilator sympathetic, sphincter and ciliary parasympathetic; Müller sympathetic, levator somatic.',
  '<b>Bladder, gut, sex</b>: sympathetic stores, parasympathetic empties; point and shoot.',
  '<b>Receptors</b>: α1 constrict, α2 autoreceptor, β1 heart, β2 relax; M2 slows the heart, M3 glands.'
], {
  'A-C1': 'Two neurons with a ganglion in the middle that can turn the signal up or down.',
  'A-C2': 'One rule for every preganglionic fibre, then two exceptions to remember.',
  'A-C3': 'Fight or flight leaves from the middle of the cord; rest and digest leaves from the brain and the sacrum.',
  'A-C4': 'In the eye, two muscles for the pupil and two for the lid, each pair split between systems.',
  'A-C5': 'Sympathetic holds urine in, parasympathetic pushes it out.',
  'A-C6': 'Know the receptor on the organ and you can predict any drug.'
});
sec_('G', 'Video 2', '12&#8211;15 min', 'When the ANS fails: Horner is a broken sympathetic chain, Raynaud is an overactive one, and the labs prove both.', [
  '<b>Horner</b>: ptosis, miosis, anhidrosis; first, second or third-order neuron.',
  '<b>Drops</b>: cocaine fails to dilate a Horner pupil; apraclonidine reverses the anisocoria.',
  '<b>Raynaud</b>: cold, sympathetic vasoconstriction, white then blue then red.',
  '<b>Rabbit</b>: cut, stimulate preganglionic, block the ganglion with nicotine, stimulate postganglionic.',
  '<b>Dog</b>: BP α1, HR β1, gut α2 over β2; epinephrine before and after blockers.'
], {
  'G-C1': 'Three signs, one system, three possible neurons; walk the chart with each case.',
  'G-C2': 'The drops ask one question: is noradrenaline reaching the iris?',
  'G-C3': 'Cold squeezes the finger arteries, and the colours tell you how much blood is left.',
  'G-C4': 'Cut it, then stimulate each end, then block the ganglion and stimulate past it.',
  'G-C5': 'Read each graph by receptor, and use the blocker to see which receptor is left.'
});
sec_('X', 'Video 6', '12&#8211;15 min', 'Sympathetics climb the carotids; parasympathetics ride III, VII and IX to four ganglia. Use the branches of VII to find a lesion.', [
  '<b>Outflow</b>: T1–3 to superior cervical ganglion; EW, superior and inferior salivatory nuclei.',
  '<b>Sympathetic to face</b>: ICA fibres to the pupil, ECA fibres to sweat glands.',
  '<b>CN III</b>: ciliary ganglion; palsy gives ptosis, down and out, mydriasis.',
  '<b>CN VII</b>: greater petrosal to pterygopalatine ganglion; chorda tympani to submandibular ganglion.',
  '<b>Facial nerve levels</b>: branch lost tells the level; Bell palsy; crocodile tears.',
  '<b>CN IX</b>: lesser petrosal to otic ganglion to parotid; Frey syndrome.'
], {
  'X-C1': 'Pair each nucleus with its nerve, ganglion and gland.',
  'X-C2': 'Three neurons, then two carotid routes: one to the pupil, one to the sweat glands.',
  'X-C3': 'CN III carries both lid and eye movement and the pupil’s constrictor.',
  'X-C4': 'Facial nerve parasympathetics take two roads: to the tears and to the floor-of-mouth glands.',
  'X-C5': 'Walk up the facial nerve on the chart; the highest branch lost marks the lesion.',
  'X-C6': 'Glossopharyngeal reaches the parotid through the otic ganglion, and miswiring after surgery gives Frey syndrome.'
});
sec_('Y', 'Video 6', '10&#8211;12 min', 'Two cases tie the block together: find the root from the exam, and find the neuron from the eye.', [
  '<b>Case 1</b>: weak plantarflexion, S1 numbness, absent ankle reflex: right S1 radiculopathy.',
  '<b>Which root</b>: paracentral disc hits the traversing root, far lateral hits the exiting root.',
  '<b>Tests</b>: SLR sensitive not specific, crossed SLR specific; MRI; surgery for progressive weakness or cauda equina.',
  '<b>Case 2</b>: neck trauma with partial ptosis, miosis, forehead anhidrosis: third-order Horner from the ICA.',
  '<b>Light reflex</b>: CN II in, CN III out, so it survives a sympathetic lesion.'
], {
  'Y-C1': 'Muscle, skin and reflex all point to one root.',
  'Y-C2': 'Where the disc bulges decides which root it hits.',
  'Y-C3': 'Know which test is sensitive and which is specific, then when to operate.',
  'Y-C4': 'The eye gives the system, the neck injury gives the neuron and the vessel.',
  'Y-C5': 'The light reflex runs on parasympathetics, so Horner leaves it intact.'
});
sec_('S', 'Video 3', '15&#8211;20 min', 'Physics first, then the ear as an amplifier, then reading the audiogram, then balance.', [
  '<b>Frequency</b>: f = 1/period; 20–20,000 Hz, best 1000–4000.',
  '<b>Decibels</b>: SPL against 20 µPa, HL against the normal threshold, SL against the patient’s threshold.',
  '<b>Localisation</b>: ITD for low, ILD for high; maximum ITD about 0.67 ms.',
  '<b>Amplification</b>: canal resonance near 3.7 kHz; area ratio 24.6 dB, lever 2.3 dB, buckling 6 dB.',
  '<b>Inner ear</b>: base high, apex low; outer hair cells amplify (OAE), inner hair cells transduce.',
  '<b>Audiogram</b>: side, degree (WHO), type (compare air and bone), configuration.',
  '<b>Vestibular</b>: mismatch causes vertigo; canals for turning, otoliths for gravity; neuritis spares the inferior nerve.'
], {
  'S-C1': 'Period and frequency are inverses; know the range we hear.',
  'S-C2': 'Same formula, three reference points.',
  'S-C3': 'The head blocks high pitches but not low ones, so we use two different cues.',
  'S-C4': 'The canal resonates, and the middle ear wins about 34 decibels to push sound into fluid.',
  'S-C5': 'The basilar membrane is a piano keyboard from treble at the base to bass at the apex.',
  'S-C6': 'Compare bone with air on the chart to name the type, then grade the air average.',
  'S-C7': 'Vertigo is a mismatch; match each symptom to the organ that senses that movement.',
  'S-C8': 'Two vestibular nerves, each with its own organs, and a test for each organ.'
});
sec_('W', 'Video 3', '10&#8211;12 min', 'Light is a wave and a particle; a laser is light made very orderly, and its power and pulse decide what it does to tissue.', [
  '<b>Wave and photon</b>: c = λν; in a medium the frequency stays; E = hν.',
  '<b>Laser</b>: stimulated emission, pumping, feedback; monochromatic, directional, coherent.',
  '<b>Tissue interactions</b>: photochemical with a dye, thermal, photoablation (excimer), plasma, photodisruption (Nd:YAG).',
  '<b>Ophthalmology</b>: slit lamp, ophthalmoscopes, OCT; SMILE, femtosecond cataract surgery, photocoagulation.',
  '<b>Other specialties</b>: skin, gynaecology, urology stones, neuro, cardiology, dentistry.'
], {
  'W-C1': 'Two equations: speed equals wavelength times frequency, and energy grows with frequency.',
  'W-C2': 'Pump the medium, bounce the light between mirrors, and you get one colour in one direction in step.',
  'W-C3': 'Read the chart from bottom to top: more power, shorter pulse, cleaner cut.',
  'W-C4': 'Light to look into the eye, and lasers to reshape it.',
  'W-C5': 'One example per specialty is enough.'
});

/* ---------- SAY lines for the core past-paper questions ---------- */
function sayQ(sid, o) { for (var k in o) SC[sid].say[k] = o[k]; }
sayQ('V', {
  V1: 'Ask what each part borders. Only the transverse process points away from the canal.',
  V4: 'The lumbar canal beats the thoracic, but the cervical canal is bigger still. That one word is the trap.',
  V9: 'The nucleus sits a little behind centre. That is why discs herniate backwards onto the roots.',
  V14: 'Count the segments it crosses: rotatores one or two, multifidus two to four, semispinalis four to six.'
});
sayQ('I', {
  I1: 'Find C1’s anterior arch; the peg just behind it is the dens.',
  I4: 'Name the four lines front to back; the canal sits between the second and the third.',
  I10: 'Draw the dog: nose transverse process, eye pedicle, ear superior facet, neck pars, front leg inferior facet.',
  I16: 'Denser is whiter on CT, and nothing in the spine is denser than cortical bone.'
});
sayQ('N', {
  N10: 'Soma to terminal is forward, so it is anterograde transport.',
  N16: 'One phagocyte in the brain: microglia.'
});
sayQ('C', {
  C1: 'Three landmarks to know cold: nipple T4, xiphoid T7, umbilicus T10.',
  C5: 'Walk the needle in from the skin. The posterior longitudinal ligament is on the far side of the CSF.',
  C17: 'The groove on the front of the cord carries the one anterior spinal artery.',
  C22: 'C is thinnest but has no myelin, so among myelinated fibres the smallest is B.',
  C26: 'Neurotmesis means the whole nerve is cut, epineurium and all.'
});
sayQ('K', {
  K1: 'Male skulls are built heavier: big brow ridges, square jaw, blunt orbital rims.',
  K4: 'Four bones meet at the pterion, and the middle meningeal artery runs just under it.',
  K9: 'Nine, ten and eleven share the jugular foramen. Twelve has its own canal.'
});
sayQ('Z', {
  Z2: 'Arteries outside the dura bleed outside the dura: epidural.',
  Z8: 'Midbrain gives three and four; the pons gives five, six and seven.',
  Z12: 'Posterior circulation: vertebral, basilar, then the posterior cerebrals.'
});
sayQ('F', {
  F1: 'Orbicularis oculi closes the eye; lose it and you cannot blink.',
  F10: 'The marginal mandibular branch is motor, so expect a drooping corner of the mouth, not numbness.',
  F14: 'Three bands down the face: V1, V2, V3. The middle third is maxillary.'
});
sayQ('D', {
  D2: 'List what lives in the fossa; the mental nerve is already out on the chin.',
  D5: 'Three muscles close the jaw. The lateral pterygoid is the only one that opens it.',
  D20: 'V3’s motor list ends with the two tensors; stapedius belongs to the facial nerve.'
});
sayQ('O', {
  O7: 'Every tongue muscle is hypoglossal, except palatoglossus.',
  O12: 'Lift the tongue: right under the mucosa, above mylohyoid, the lingual nerve hooks under the duct.',
  O16: 'Mylohyoid is the floor: sublingual gland above it, submandibular gland below it.'
});
sayQ('J', {
  J7: 'Find the triangle between the two heads of sternocleidomastoid. The vein is under it.',
  J9: 'Tie the inferior thyroid artery and you risk the recurrent nerve. That takes out every abductor, the posterior cricoarytenoid.',
  J19: 'Cut the sympathetic chain in the neck and you get Horner on that side.',
  J22: 'The danger space sits between alar and prevertebral fascia and runs all the way down to the diaphragm.'
});
sayQ('E', {
  E1: 'Eye movements plus V1 with normal vision means the superior orbital fissure.',
  E7: 'Abduct the eye to test the recti: up is superior rectus, down is inferior rectus.',
  E16: 'Follow the light: cornea, aqueous, lens, vitreous. The sclera is off the path.',
  E21: 'Aqueous drains at the angle through the trabecular meshwork.'
});
sayQ('H', {
  H4: 'The stapes plugs the oval window, so that window is on the medial wall.',
  H11: 'The tube equalises pressure; it is not on the sound path.',
  H15: 'Crista has a cupula, macula has otoliths, Corti has a tectorial membrane.',
  H22: 'The stapes pushes into the vestibule and on into the scala vestibuli.'
});
sayQ('M', {
  M6: 'Change outside sodium and you move E-sodium, not the resting potential.',
  M22: 'A huge potassium rise holds the membrane depolarised, sodium channels inactivate, and nothing fires.'
});
sayQ('P', {
  P7: 'Myelin is resistance. Lose it and current leaks out before it reaches the next node.',
  P17: 'Tetrodotoxin plugs the voltage-gated sodium channel, so no action potential starts anywhere.'
});
sayQ('L', {
  L9: 'Nerve stimulation fails, direct muscle stimulation works: the block is at the junction, and both drugs keep the end plate depolarised.'
});
sayQ('R', {
  R3: 'Too much tension, tendon organ fires, the same muscle relaxes.',
  R8: 'Withdrawal that outlasts the stimulus is afterdischarge from reverberating circuits.',
  R13: 'First comes spinal shock, so every reflex below the lesion disappears.'
});
sayQ('A', {
  A4: 'Beta receptors listen to noradrenaline, and only sympathetic postganglionic fibres release it.',
  A11: 'Watery saliva is parasympathetic: give a muscarinic agonist.',
  A14: 'Catecholamines tighten the internal sphincter through alpha-one.'
});
sayQ('G', {
  G4: 'Apraclonidine is a weak alpha-one agonist. Only the denervated, supersensitive pupil dilates, so the anisocoria flips.'
});
sayQ('X', {
  X3: 'The carotid plexus is postganglionic fibres from the superior cervical ganglion.',
  X9: 'Tears go through the pterygopalatine ganglion.',
  X12: 'Salivary fibres that regrow down the tear path: crocodile tears after a facial nerve injury.',
  X15: 'The parotid is supplied by nine, through the otic ganglion, not by seven.'
});
sayQ('Y', {
  Y2: 'A paracentral disc catches the traversing root: at L5–S1 that is S1.'
});
sayQ('S', {
  S1: 'Time is distance over speed: 0.8 seconds.',
  S12: 'Twenty times the pressure is plus 26 decibels, so 20 plus 26 is 46.'
});
sayQ('W', {
  W9: 'A laser is one colour, one direction, in step. Polychromatic is the wrong word.',
  W11: 'Photocoagulation means heat: a thermal interaction.',
  W14: 'Cataract surgery uses the femtosecond laser.'
});

/* SAY lines for the core lecture check-questions (data/lecq.js) */
sayQ('M', { M28: 'Small depolarisation, closer to threshold. Big and lasting depolarisation, sodium channels stay inactivated: less excitable.' });
sayQ('P', { P31: 'Ptosis and diplopia happen in both. The split is where the fault is: LEMS before the synapse, MG after it.' });
sayQ('L', {
  L4: 'Subtract the two latencies, then divide the distance: forty millimetres over two milliseconds is twenty metres per second.',
  L8: 'The anode hyperpolarises, so fibres conduct later or not at all: longer latency, smaller compound action potential.'
});
sayQ('A', { A8: 'Every preganglionic fibre releases ACh. That is the golden rule, sympathetic included.' });
sayQ('G', {
  G3: 'Ptosis, miosis, anhidrosis: a broken sympathetic pathway, not an eye disease.',
  G21: 'Slow heart, low pressure, busy gut, small pupils: everything muscarinic, so a parasympathetic pattern.'
});
sayQ('O', { O30: 'Submandibular duct on the caruncle, sublingual ducts along the fold.' });

/* SAY lines for core AC68–AC79 exam-pool questions (data/past_pool.js) */
sayQ('N', {
  N8: 'Remember that the axon begins where the Nissl bodies stop, so rough ER is absent from the axon and all its proteins have to be shipped down from the soma.',
  N11: 'Axonal transport runs along microtubules, with kinesin walking outward and dynein walking back to the cell body.',
  N12: 'Pathogens like poliovirus, rabies and tetanus toxin hijack retrograde axonal transport on dynein to climb from peripheral terminals into the spinal cord.',
  N14: 'This comes up almost every year: Schwann cells make myelin in the peripheral nervous system, one internode per cell, while oligodendrocytes handle the CNS.',
  N27: 'Ependymal cells line the ventricles and modify into the choroid plexus to produce cerebrospinal fluid.',
  N34: 'Pair the two classic touch corpuscles: Meissner for light touch, and Pacinian deep in the skin for pressure and vibration.'
});
sayQ('M', {
  M3: 'Every normal resting potential starts from the same baseline gradient: potassium is high inside, sodium is high outside.',
  M7: 'The Nernst equation calculates equilibrium potential when the chemical and electrical forces are equal and opposite, using Kelvin—never membrane thickness.',
  M13: 'Repolarization is a two-part switch: voltage-gated sodium channels inactivate while voltage-gated potassium channels open to bring the membrane back down.'
});
sayQ('P', {
  P3: 'When myelin is stripped away in Guillain-Barré syndrome, current leaks right through the membrane, which means membrane resistance drops while capacitance rises.',
  P10: 'Recent infection followed by ascending weakness, lost reflexes and peripheral demyelination is textbook Guillain-Barré syndrome.',
  P15: 'In myasthenia gravis, the nerve fires normally, but with fewer nicotinic receptors on the muscle, the end-plate potential shrinks and fails to reach threshold.',
  P22: 'Botulinum toxin from home-canned food cleaves the SNARE complex, so ACh vesicles cannot fuse and muscle goes flaccid.',
  P25: 'Small cell lung cancer with proximal leg weakness and a presynaptic NMJ block is Lambert-Eaton myasthenic syndrome.',
  P33: 'Organophosphate insecticides like chlorpyrifos are irreversible acetylcholinesterase inhibitors, flooding every cholinergic synapse with ACh.'
});
sayQ('L', {
  L3: 'Always subtract the two distances and divide by the difference in latencies—300 millimeters divided by 6 milliseconds gives 50 meters per second.',
  L5: 'Read the chamber from the distal end: ground, recording electrodes, then cathode closer to recording and anode on the far end.',
  L6: 'Flipping the cathode and anode puts a hyperpolarized barrier in the way—anodal block—so latency goes up and the compound action potential shrinks.'
});
sayQ('R', {
  R1: 'Pulling your foot off a nail runs through chains of interneurons, making it the classic polysynaptic reflex.',
  R6: 'Because the stretch reflex is monosynaptic, there is no interneuron in its core loop—the inhibitory interneuron belongs to the Golgi tendon reflex.',
  R15: 'Spinal shock is temporary and wipes out both somatic and autonomic reflexes at first, then gives way to hyperreflexia once recovery begins.',
  R17: 'Upper motor neuron lesions in the CNS give spasticity and brisk reflexes, while flaccidity, atrophy and lost reflexes point to the lower motor neuron.',
  R19: 'Higher gamma motor neuron drive tightens the muscle spindles and cranks up reflex sensitivity, producing hyperreflexia.',
  R26: 'Stroking the lateral sole tests the plantar reflex; here the big toe extends and the toes fan out—a positive Babinski sign.'
});
sayQ('A', {
  A1: 'Hexamethonium blocks the ganglion itself, and every autonomic ganglion runs on nicotinic receptors.',
  A5: 'Sweat glands are the golden-rule exception: sympathetic fibres, yes, but they release acetylcholine, not noradrenaline.',
  A6: 'Excess acetylcholine speeds up the gut and floods the sweat glands, which are cholinergic too, while slowing the heart.',
  A9: 'The adrenal medulla is a modified sympathetic ganglion whose postganglionic cells dump adrenaline straight into the blood.',
  A12: 'Two muscles lift the lid: levator is somatic, and only the superior tarsal muscle is sympathetic smooth muscle.',
  A16: 'Bladder control takes all three: sympathetic to store, parasympathetic to empty, and somatic pudendal to hold it in.',
  A19: 'Pick the selective beta-two agonist salbutamol: it opens the airways without driving a 130-beat heart even faster.',
  A21: 'Organophosphate floods the synapse with acetylcholine: block it with a muscarinic antagonist, and remember ACh contracts the iris sphincter, not gut sphincters.'
});
sayQ('G', {
  G2: 'A lung-apex tumour hits the second-order sympathetic neuron and produces Horner syndrome, so expect facial anhidrosis.',
  G5: 'Cocaine fails in every Horner eye, while Paredrine still dilates a preganglionic lesion because the third neuron still holds noradrenaline.',
  G6: 'A carotid tumour destroys the third-order postganglionic neuron, so there is no stored noradrenaline left and neither cocaine nor Paredrine dilates the pupil.',
  G8: 'Cut the preganglionic sympathetic fibre, not the postganglionic one, or receptor up-regulation will make the vasospasm worse.',
  G13: 'One percent nicotine blocks the ganglion, so stimulating the preganglionic stump cannot get through and the Horner signs stay.',
  G15: 'Faster heart, dilated pupil, zero gut motility, and added acetylcholine does nothing: that is muscarinic blockade by atropine.',
  G17: 'Pressure falls, pupil shrinks, gut speeds up, and heart rate stays flat: alpha blockade with phentolamine, not a muscarinic drug.',
  G20: 'Norepinephrine alone triggers reflex bradycardia from the huge alpha-one pressure surge; block the ganglion to cut the reflex, and its direct beta-one tachycardia shows through.'
});
sayQ('S', {
  S4: 'Turn milliseconds into seconds first: five hundred milliseconds is half a second, and one over a half is two hertz.',
  S6: 'Hearing level subtracts the normal reference threshold at that frequency: twenty minus seven point five is twelve point five.',
  S7: 'Divide by twenty micropascals to get one hundred, take log base ten for two, and multiply by twenty for forty dB SPL.',
  S8: 'Sensation level is always above the patient’s own threshold, not the normal one: seventy minus forty is thirty dB SL.',
  S10: 'Two ears compare amplitude for high pitches and phase or arrival time for low pitches — amplitude and phase.',
  S16: 'Use the vibrating area, fifty-five square millimetres, not eighty-five: fifty-five over three point two is seventeen-fold.'
});
sayQ('W', {
  W2: 'Short wavelengths scatter far more than long ones — that is why the sky is blue, so the statement saying long wavelengths scatter more is false.',
  W3: 'Anti-reflective coatings cancel glare by destructive thin-film interference.',
  W5: 'Shorter wavelength means higher frequency and energy: X-ray, then UV, then visible, then infrared.',
  W8: 'Convex is plus and concave is minus, but object vergence is only negative for a real object — a virtual object has positive vergence.',
  W10: 'Lasers are monochromatic, coherent, directional and intense — optical light, not ionizing radiation.',
  W13: 'Photoablation belongs to the UV excimer laser; Nd:YAG works by photodisruption.',
  W17: 'Myopia is too much focusing power or too long an eye; losing the lens in aphakia does the opposite and causes severe hyperopia.',
  W18: 'Presbyopia lacks near focusing power, so it needs a plus convex lens, never a concave lens.'
});
sayQ('V', {
  V3: 'To open the vertebral canal from behind, remove its posterior roof: spinous process, laminae, and the ligamentum flavum between them.',
  V7: 'Mammillary and accessory processes belong to the lumbar spine; thoracic vertebrae are named by rib facets, a small round canal and long sloping spines.',
  V11: 'The posterior longitudinal ligament reinforces the midline behind the disc, so a herniating nucleus pulposus escapes posterolaterally.'
});
sayQ('I', {
  I2: 'On the lateral view, check the atlanto-dental interval: under 3 millimetres in adults, under 5 in children.',
  I8: 'Cervical neural foramina face obliquely forward, so you need the oblique view; thoracic and lumbar foramina show on the lateral film.',
  I19: 'For any soft-tissue spine question—disc, cord, or nerve roots—pick MRI first.',
  I21: 'MRI is first-line for a herniated disc, but a pacemaker rules it out—switch to CT myelography.'
});
sayQ('C', {
  C15: 'Match each groove on the cord surface: dorsal roots enter the dorsolateral sulcus, ventral roots leave the ventrolateral sulcus, and the anterior spinal artery sits in the ventral median fissure.',
  C18: 'One anterior spinal artery feeds the front two-thirds—ventral horn and lateral column—while two posterior spinal arteries feed the dorsal columns and dorsal horns.'
});
sayQ('K', {
  K6: 'Every midline point—glabella, nasion, bregma, lambda, inion, gnathion—sits in the median plane; pterion and asterion are the paired ones on the side.',
  K18: 'CSF leaking from the ear with facial palsy and hearing loss points straight to the petrous temporal bone, where CN VII, CN VIII, and the inner ear live.'
});
sayQ('Z', {
  Z3: 'Middle meningeal artery gives an epidural bleed; torn superior cerebral bridging veins bleed beneath the dura into the subdural space.',
  Z5: 'The tentorium cerebelli is the horizontal dural roof separating the cerebral hemispheres above from the cerebellum below.',
  Z10: 'Trochlear—CN IV—is the only cranial nerve that exits from the dorsal surface of the brainstem.',
  Z15: 'The circle of Willis closes around the optic chiasm with ACom, ACA, ICA, PCom and PCA; the middle cerebral artery runs laterally off it and is not part of the ring.'
});
sayQ('F', {
  F21: 'Remember the internal carotid gives no branches in the neck; the thyroid gets arteries from the external carotid and thyrocervical trunk, and drains to the internal jugular and brachiocephalic veins.',
  F23: 'Three strap muscles use ansa cervicalis, but thyrohyoid is the exception—supplied by C1 fibres riding with the hypoglossal nerve.'
});
sayQ('D', {
  D18: 'The deep facial vein links the facial vein straight back into the pterygoid venous plexus.',
  D26: 'Because chorda tympani joins the lingual nerve in the infratemporal fossa, injuring the lingual nerve during dental work knocks out both touch and taste on the anterior two-thirds of the tongue.',
  D28: 'Trace the deep danger-triangle route step by step: facial vein, deep facial vein, pterygoid plexus, emissary vein through foramen ovale, into the cavernous sinus.'
});
sayQ('O', {
  O1: 'Upper and lower teeth both trace back to the maxillary artery via its superior and inferior alveolar branches.',
  O8: 'Genioglossus anchors the tongue to the front of the mandible and pulls it forward—the only protruder of the tongue.',
  O9: 'The tongue deviates toward the weak side because the healthy genioglossus pushes it across—left deviation means a left hypoglossal lesion.',
  O14: 'Split the front two-thirds of the tongue in two: lingual nerve for touch, chorda tympani of CN VII for taste.',
  O34: 'Unlike the tongue, the uvula pulls away from a vagus lesion—rightward deviation means the left vagus nerve is down.'
});
sayQ('J', {
  J1: 'Remember the asymmetry at the arch: only the right side has a brachiocephalic artery; on the left, the carotid and subclavian come straight off the aorta.',
  J2: 'Pair the thyroid arteries by their parents: superior thyroid is external carotid, inferior thyroid is subclavian via the thyrocervical trunk.',
  J3: 'Four classic subclavian branches—vertebral, internal thoracic, thyrocervical and costocervical; superior thyroid belongs to the external carotid.',
  J12: 'Upper pole, superior thyroid artery, external laryngeal nerve; lower pole, inferior thyroid artery, recurrent laryngeal nerve.',
  J13: 'Right behind the thyroid lobe, the recurrent laryngeal nerve crosses the inferior thyroid artery—nick it and the vocal cord is paralysed.',
  J20: 'Ptosis, miosis and anhidrosis after neck or apical lung surgery is textbook Horner syndrome—think cervical sympathetic trunk.',
  J26: 'The thoracic duct drains into the left venous angle, where the left internal jugular meets the left subclavian vein.'
});
sayQ('E', {
  E5: 'III, IV, VI and all three branches of V1 use the superior orbital fissure; CN II has its own optic canal.',
  E13: 'Adduct the eye to line up the obliques—then looking down tests the superior oblique.',
  E15: 'The tarsal plates are the stiff connective-tissue skeleton of the eyelids, housing the lipid-producing Meibomian glands.',
  E18: 'The optic nerve leaves the back of the eye through the fenestrated lamina cribrosa of the sclera.',
  E22: 'Parasympathetic drive contracts the ciliary muscle for near focus and the sphincter for miosis—never dilation or distance focus.',
  E28: 'Both limbs of the corneal blink reflex: nasociliary of V1 feels the cotton, and CN VII closes the lids.'
});
sayQ('H', {
  H1: 'Every landmark of the pinna has elastic cartilage except the lobule—that is why you pierce the earlobe.',
  H14: 'Tensor tympani belongs to the first arch, so it is V3; stapedius is second arch, so it is CN VII.',
  H18: 'Match motion to organ: rotation goes to the crista in the ampulla of a semicircular duct; gravity and linear motion go to the utricle and saccule.',
  H24: 'Remember the three caps: cupula for crista, otolithic membrane for macula, and tectorial membrane over the organ of Corti.',
  H25: 'Base is narrow, stiff and high frequency; apex at the helicotrema is wide, floppy and low frequency.',
  H28: 'Walk the walls of the middle ear for spread: roof to meninges, back to mastoid and sigmoid sinus, medial to labyrinth—never the parotid.',
  H29: 'The back door from the middle ear into the mastoid air cells is the aditus.',
  H30: 'Noise-induced hearing loss is sensorineural—it destroys the cochlear hair cells, not the drum or ossicles.'
});
sayQ('X', {
  X1: 'There are only four cranial parasympathetic ganglia—ciliary, pterygopalatine, submandibular and otic; the trigeminal ganglion is purely sensory.',
  X2: 'Greater and lesser petrosal are preganglionic parasympathetic; deep petrosal and the carotid plexuses are all sympathetic.',
  X4: 'Horner ptosis is mild because levator palpebrae still works—it is the sympathetic superior tarsal muscle that is paralysed.',
  X6: 'Severe ptosis with the eye resting down and out is the unmistakable signature of an oculomotor nerve palsy.',
  X10: 'Greater petrosal feeds the pterygopalatine ganglion; chorda tympani feeds submandibular; lesser petrosal feeds otic.',
  X14: 'CN VII runs right through the parotid gland, yet it never makes parotid saliva—that job belongs to CN IX.',
  X17: 'Trace the parotid route: CN IX becomes the lesser petrosal nerve on its way to the otic ganglion.'
});
sayQ('Y', {
  Y4: 'Watch the trap on Horner signs: losing sympathetic vasoconstrictors actually causes facial vasodilation, and the eye looks sunken—enophthalmos, never exophthalmos.',
  Y5: 'Horner cuts the sympathetic dilator, leaving CN II and parasympathetic CN III untouched—so the direct light reflex stays completely intact.',
  Y6: 'Light in the right eye: right optic nerve carries the signal in, and the right oculomotor nerve drives the direct constriction.'
});
