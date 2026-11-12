/* Section Z: Structures within cranial cavity (691015 Structures within cranial cavity.pdf, 39 pages). */
CVS.add({ id: 'Z', short: 'Cranial cavity', title: 'Scalp, Meninges, Cranial Nerves &amp; Brain Vessels', kind: 'Lecture',
  blurb: 'Layers of the scalp and newborn scalp bleeds, the meninges and the three intracranial bleeds, dural folds, cranial nerve classes, the arterial circle and the dural venous sinuses.',
  items: [
  { t: 'c', id: 'Z-C1', title: 'Scalp layers and scalp bleeds', src: 'Cranial cavity p.3–7',
    html: CVS.fig('cr-scalp', 'Layers of the scalp.', 'cranial', 6) + CVS.fig('cr-scalpclin', 'Three newborn scalp swellings and their layers.', 'cranial', 7) },
  { t: 'c', id: 'Z-C2', title: 'Meninges and the three intracranial bleeds', src: 'Cranial cavity p.9–20, 33, 39',
    html: CVS.fig('cr-epidural', 'Epidural (extradural) haematoma.', 'cranial', 12) + CVS.fig('cr-subdural', 'Subdural haematoma.', 'cranial', 39) },
  { t: 'c', id: 'Z-C3', title: 'Dural folds', src: 'Cranial cavity p.13–16',
    html: CVS.fig('cr-tentorium', 'Dural folds: supra- and infratentorial spaces.', 'cranial', 14) },
  { t: 'c', id: 'Z-C4', title: 'Cranial nerves: sensory, motor, mixed, parasympathetic', src: 'Cranial cavity p.25–29',
    html: CVS.fig('cr-cn', 'Cranial nerves and what they carry.', 'cranial', 25) },
  { t: 'c', id: 'Z-C5', title: 'Arteries of the brain and the dural venous sinuses', src: 'Cranial cavity p.30–38',
    html: CVS.fig('cr-willis', 'Arterial circle of Willis.', 'cranial', 32) + CVS.fig('cr-cavernous', 'Cavernous sinus, coronal section.', 'cranial', 37) }
]});
