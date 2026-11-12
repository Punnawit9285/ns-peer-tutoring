# NS I Anatomy, Physiology & Physics · Peer support 82 deck

Question-first peer-tutoring material for **Nervous System I (NS I)**, MDCU: the back and spine, head and neck anatomy, nervous tissue, neurophysiology, the autonomic nervous system, and the physics of sound and light. It covers all 22 NS I handouts (691009–691022, plus Light in Medicine).

## Open it

| | Link |
|---|---|
| **Student deck** (shown in the video) | https://punnawit9285.github.io/ns-peer-tutoring/student.html |
| **Tutor deck** (second screen: answers, Thai notes, script) | https://punnawit9285.github.io/ns-peer-tutoring/tutor.html |
| **Student handout PDF** | https://punnawit9285.github.io/ns-peer-tutoring/student.pdf?v=d34d88aa |

Open the student and tutor decks in the same browser and tick *Follow student* in the tutor deck: it jumps to whatever card the student deck shows.

## Sections (121 concepts · 301 questions · 460 cloze blanks)

| ID | Section | Source handout |
|---|---|---|
| V | Vertebral Column & Deep Back Muscles | Deep back muscles and vertebral column (86 pages) |
| I | Radiologic Anatomy of Vertebral Column & Spinal Cord | Imaging of vertebral column and spinal cord (61 pages) |
| N | Nervous Tissue: Neurons, Glia & Nerve Sheaths | Nervous tissue (57 pages) |
| C | Spinal Cord & Peripheral Nerve | Spinal cord & peripheral nerve (52 pages) |
| K | Skull: Bones, Landmarks, Fossae & Foramina | Skull (61 pages) |
| Z | Scalp, Meninges, Cranial Nerves & Brain Vessels | Structures within cranial cavity (39 pages) |
| F | Superficial Structures of the Face & Neck | Superficial face and neck (31 pages) |
| D | Deep Face: Temporal & Infratemporal Fossae, V3 & TMJ | Deep structures of face (44 pages) |
| O | Oral Cavity, Floor of Mouth & Pharynx | Oral cavity and floor of mouth (87 pages) |
| J | Deep Structures of the Neck | Deep structures of neck (32 pages) |
| M | Membrane Potential & the Action Potential | Membrane potential (39 pages) |
| P | Physiology of Nerve & the Neuromuscular Junction | Physiology of nerve and NMJ (40 pages) |
| L | Lab: Frog Nerve & Neuromuscular Junction | Lab nerve and NMJ (44 pages) |
| A | Autonomic Nervous System: Pathways, Organs & Receptors | ANS physiology (32 pages) |
| G | ANS Integration: Horner, Raynaud & the Rabbit and Dog Labs | ANS integration and regulation (48 pages) |
| E | Eye & Orbit | Eye and orbit (44 pages) |
| R | Reflexes: Arc, Spinal Reflexes & the Reflex Exam | Physiology of reflex (78 pages) |
| W | Light in Medicine: Optics & Lasers | Light in Medicine 2026 (74 slides) |
| H | Ear: External, Middle & Inner | Ear (41 pages) |
| X | ANS of the Head & Neck: CN III, VII, IX | ANS of head and neck (21 pages) |
| S | Physics of Sound, Hearing & the Vestibular System | Physics of sound and hearing 2026 (115 pages) |
| Y | SGD Wrap-Up: Lumbar Disc Herniation & Traumatic Horner | SGD wrap-up (28 pages) |

## Where the questions come from

The problems are the **past papers**: the AC80 and AC81 NS I MCQ recalls (with the peer-support keys), the AC81 NS I spot test, and the AC79 spot II (back, head & neck, plus the nervous-tissue stations). Each question sits right after the concept card it tests and is tagged with its source (`AC80`, `AC81`, `AC80 · AC81`, `AC81 spot` …). Spot-test photos are cropped from the recall PDFs, one per station, and shared by the station's two questions.

- **Original wording and option order** are kept; a few long AC81 case stems are trimmed to the facts the question uses, and Thai stems carry an English gloss.
- **Recall notes**: where a recalled key or stem disagrees with the lecture, or the recall is incomplete, the item says so in a *Recall note* and teaches the principle.
- **Excluded**: the *Imaging of head and neck* items (that lecture is not one of the NS I handouts here) and items recalled without options (AC81 “mimics a β1 agonist”).
- **Interactive flowcharts**: P-C4 (where the NMJ signal fails: MG, LEMS, toxins, drugs), G-C1 (Horner: which neuron), X-C5 (facial nerve lesion level from the signs) and S-C6 (reading an audiogram: type and WHO degree). Click any box for why that step exists, load a case, or (audiogram) type your own thresholds, then press *Next step*. The PDF prints the charts without the controls.

## Pages

- **`student.html`** (also `index.html`, `dist/deck.html`): Present and Browse modes, *Core only* filter, cloze blanks on every concept card (Space = next blank, Enter = all, R = hide, click a blank to flip it), click an option to see the answer, click a figure to zoom, L opens the Thai explanation, B toggles Browse. Swipe on phones.
- **`tutor.html`** (also `dist/notes.html`): the same cards with every answer and blank revealed, Thai bullets, a SAY line on each concept card and core question, the 6-video plan on the start card, an "Understand it: the 80%" summary on each section card, and Thai tutor notes beyond the slides.
- **`student.pdf`**: A4 handout. Each concept on one page with its blanks empty and numbered, then the quiz on that concept (no answers). At the back: the answer key with Thai explanations, the answers to every numbered blank, and each concept's Thai key points and explanation.

## Building

```bash
tools/crops.sh     # crop figures from src-pdf/*.pdf (the handouts and recalls; not published) into img/
tools/shrink.sh    # cap figures at 1100 px
node check.js      # IDs, answer keys, every Thai / tutor layer keyed to a real card, blanks, images
node build.js all  # student.html, index.html, tutor.html, dist/deck.html, dist/notes.html, dist/img/
tools/pdf.sh       # student.pdf: two headless-Chrome passes for real page numbers (CHROME=... to override)
```

Course material belongs to the Faculty of Medicine, Chulalongkorn University; past-paper recalls to the MDCU peer-support teams. For peer study only.
