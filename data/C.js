/* Section C: Spinal cord & peripheral nerve (691009 Spinal cord & peripheral nerve.pdf, 52 pages). */
CVS.add({ id: 'C', short: 'Spinal cord', title: 'Spinal Cord &amp; Peripheral Nerve', kind: 'Lecture',
  blurb: 'Cord levels against vertebrae, meninges and spaces for lumbar puncture and caudal block, grey and white matter, the cord’s arteries and veins, nerve fibre types and receptors, and peripheral nerve injury and repair.',
  items: [
  { t: 'c', id: 'C-C1', title: 'Cord segments against vertebral levels', src: 'Spinal cord p.3–14',
    html: CVS.fig('cord-levels', 'Spinal cord segments and spinal nerves against the vertebrae.', 'cord', 6) },
  { t: 'c', id: 'C-C2', title: 'Meninges, spaces, lumbar puncture and caudal block', src: 'Spinal cord p.8–12, 31–32',
    html: CVS.fig('cord-meninges', 'Sagittal section: meninges and spaces.', 'cord', 11) + CVS.fig('cord-lp', 'Lumbar puncture.', 'cord', 31) + CVS.fig('cord-caudal', 'Caudal epidural block.', 'cord', 32) },
  { t: 'c', id: 'C-C3', title: 'Internal morphology: horns, columns and roots', src: 'Spinal cord p.15–19, 25–30',
    html: CVS.fig('cord-internal', 'Cross-section: grey matter horns and white matter columns.', 'cord', 18) },
  { t: 'c', id: 'C-C4', title: 'Blood supply of the cord', src: 'Spinal cord p.20–24',
    html: CVS.fig('cord-blood', 'Spinal arteries and the territories they supply.', 'cord', 21) },
  { t: 'c', id: 'C-C5', title: 'Nerve fibre types and sensory endings', src: 'Spinal cord p.34–42',
    html: CVS.ans(CVS.fig('cord-fibers', 'Erlanger–Gasser classification.', 'cord', 37), 'The fibre table (sizes and speeds)') },
  { t: 'c', id: 'C-C6', title: 'Peripheral nerve injury and repair', src: 'Spinal cord p.43–51',
    html: CVS.fig('cord-seddon', 'Seddon’s classification of nerve injury.', 'cord', 46) }
]});
