/* Section O: Oral cavity & floor of mouth (691014 Oral cavity and floor of mouth.pdf, 87 pages). */
CVS.add({ id: 'O', short: 'Oral cavity', title: 'Oral Cavity, Floor of Mouth &amp; Pharynx', kind: 'Lecture',
  blurb: 'Hard and soft palate with their nerves and muscles, the tongue’s parts, muscles and innervation, teeth, the floor-of-mouth muscles and submandibular gland, and the pharynx with its constrictors.',
  items: [
  { t: 'c', id: 'O-C1', title: 'Hard and soft palate, teeth', src: 'Oral p.3–18',
    html: CVS.fig('or-incisive', 'Hard palate: foramina and nerves.', 'oral', 5) + CVS.fig('or-softpal', 'Soft palate.', 'oral', 8) },
  { t: 'c', id: 'O-C2', title: 'Tongue: parts and muscles', src: 'Oral p.19, 34–36',
    html: CVS.fig('or-tongue', 'Dorsum of the tongue.', 'oral', 19) },
  { t: 'c', id: 'O-C3', title: 'Tongue: sensory and taste supply', src: 'Oral p.37',
    html: CVS.fig('or-tongnerve', 'Nerve territories of the tongue.', 'oral', 37) },
  { t: 'c', id: 'O-C4', title: 'Floor of mouth and the submandibular gland', src: 'Oral p.38–56',
    html: CVS.fig('or-submand', 'Submandibular and sublingual glands.', 'oral', 47) },
  { t: 'c', id: 'O-C5', title: 'Pharynx and its muscles', src: 'Oral p.57–66',
    html: CVS.fig('or-pharynx', 'Parts of the pharynx, sagittal section.', 'oral', 57) + CVS.fig('or-constrictor', 'Pharyngeal constrictors, posterior view.', 'oral', 63) }
]});
