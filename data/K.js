/* Section K: Skull (691012 Skull.pdf, 61 pages). */
CVS.add({ id: 'K', short: 'Skull', title: 'Skull: Bones, Landmarks, Fossae &amp; Foramina', kind: 'Lecture',
  blurb: 'The 22 bones of the skull, parts of the temporal bone, surface landmarks and fontanelles, the three cranial fossae, where each cranial nerve leaves the skull, and the fractures that injure them.',
  items: [
  { t: 'c', id: 'K-C1', title: 'The 22 bones and the parts of the temporal bone', src: 'Skull p.2–24',
    html: CVS.fig('sk-temporal', 'Temporal bone and its four parts.', 'skull', 10) },
  { t: 'c', id: 'K-C2', title: 'Landmarks, sutures and fontanelles', src: 'Skull p.25–33',
    html: CVS.fig('sk-lateral', 'Lateral view of the skull.', 'skull', 28) + CVS.fig('sk-superior', 'Superior view: sutures and their junctions.', 'skull', 30) + CVS.fig('sk-newborn', 'Cranium of a newborn.', 'skull', 25) },
  { t: 'c', id: 'K-C3', title: 'The three cranial fossae', src: 'Skull p.35–38',
    html: CVS.fig('sk-middle', 'Middle cranial fossa from above.', 'skull', 37) },
  { t: 'c', id: 'K-C4', title: 'Where each cranial nerve leaves the skull', src: 'Skull p.39–53',
    html: CVS.ans(CVS.fig('sk-cn', 'Summary of foramina and their nerves.', 'skull', 53), 'The slide’s summary (shows the answers)') },
  { t: 'c', id: 'K-C5', title: 'Skull fractures and craniosynostosis', src: 'Skull p.55–58',
    html: CVS.fig('sk-pterion', 'Fracture at the pterion.', 'skull', 55) + CVS.fig('sk-raccoon', 'Anterior cranial fossa fracture.', 'skull', 56) + CVS.fig('sk-synostosis', 'Craniosynostosis.', 'skull', 58) }
]});
