/* Section F: Superficial face & neck (691012 Superficial face and neck.pdf, 31 pages). */
CVS.add({ id: 'F', short: 'Face & neck', title: 'Superficial Structures of the Face &amp; Neck', kind: 'Lecture',
  blurb: 'Muscles of facial expression, facial vessels and the danger triangle, the parotid gland and facial nerve palsy, sensory supply of the face, and the neck: fascia, triangles, hyoid muscles and thyroid vessels.',
  items: [
  { t: 'c', id: 'F-C1', title: 'Muscles of facial expression', src: 'Face p.3–6',
    html: CVS.fig('fa-muscles', 'Muscles of facial expression.', 'face', 3) },
  { t: 'c', id: 'F-C2', title: 'Facial vessels, the danger triangle and the cavernous sinus', src: 'Face p.7–9',
    html: CVS.fig('fa-artery', 'Facial artery and its branches.', 'face', 7) + CVS.fig('fa-cavernous', 'Danger triangle and where its veins drain.', 'face', 9) },
  { t: 'c', id: 'F-C3', title: 'Parotid gland and facial nerve palsy', src: 'Face p.10–15',
    html: CVS.fig('fa-parotid', 'Nerve branches fanning out through the parotid gland.', 'face', 11) + CVS.fig('fa-palsy', 'Right-sided palsy after nerve injury.', 'face', 13) },
  { t: 'c', id: 'F-C4', title: 'Sensory nerves of the face', src: 'Face p.18',
    html: CVS.fig('fa-sensory', 'Cutaneous territories of V1, V2 and V3.', 'face', 18) },
  { t: 'c', id: 'F-C5', title: 'The neck: triangles, hyoid muscles and thyroid vessels', src: 'Face p.20–30',
    html: CVS.fig('fa-triangles', 'Triangles of the neck.', 'face', 23) + CVS.fig('fa-hyoid', 'Supra- and infrahyoid muscles.', 'face', 27) + CVS.fig('fa-thyroid', 'Thyroid gland: arteries and veins.', 'face', 30) }
]});
