/* Section E: Eye & orbit (691019 Eye and orbit.pdf, 44 pages). */
CVS.add({ id: 'E', short: 'Eye & orbit', title: 'Eye &amp; Orbit', kind: 'Lecture',
  blurb: 'Orbital openings and walls, extraocular muscles and how to test them, eyelid, conjunctiva and tear film, the three tunics of the eyeball and the fundus, aqueous humour and the iris and ciliary muscles, and the nerves and ciliary ganglion.',
  items: [
  { t: 'c', id: 'E-C1', title: 'Orbit: walls and openings', src: 'Eye p.3–7',
    html: CVS.fig('ey-orbit', 'Openings of the orbit.', 'eye', 6) },
  { t: 'c', id: 'E-C2', title: 'Extraocular muscles and how to test them', src: 'Eye p.11–15',
    html: CVS.fig('ey-muscles', 'Testing each muscle from the abducted or adducted position.', 'eye', 14) + CVS.fig('ey-cardinal', 'Clinical testing positions and their nerves.', 'eye', 15) },
  { t: 'c', id: 'E-C3', title: 'Eyelid, conjunctiva and the lacrimal apparatus', src: 'Eye p.17–21',
    html: CVS.fig('ey-lacrimal', 'Lacrimal apparatus.', 'eye', 20) },
  { t: 'c', id: 'E-C4', title: 'The three tunics of the eyeball and the fundus', src: 'Eye p.22–32',
    html: CVS.fig('ey-wall', 'Wall and contents of the eyeball.', 'eye', 22) + CVS.fig('ey-fundus', 'Ocular fundus.', 'eye', 32) },
  { t: 'c', id: 'E-C5', title: 'Iris, ciliary body and aqueous humour', src: 'Eye p.26–35',
    html: CVS.fig('ey-ciliary', 'Iris, ciliary body and the chambers.', 'eye', 30) + CVS.fig('ey-aqueous', 'Aqueous humour drainage.', 'eye', 34) },
  { t: 'c', id: 'E-C6', title: 'Nerves of the orbit and the ciliary ganglion', src: 'Eye p.36–39',
    html: CVS.fig('ey-cg', 'The parasympathetic ganglion of the orbit and its roots.', 'eye', 39) }
]});
