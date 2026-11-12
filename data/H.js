/* Section H: Ear (691021 Ear.pdf, 41 pages). */
CVS.add({ id: 'H', short: 'Ear', title: 'Ear: External, Middle &amp; Inner', kind: 'Lecture',
  blurb: 'External ear and tympanic membrane, the six walls of the middle ear, ossicles, the two muscles and the Eustachian tube, bony and membranous labyrinths with macula and crista, the cochlear duct and organ of Corti, and hearing loss and otitis media complications.',
  items: [
  { t: 'c', id: 'H-C1', title: 'External ear and tympanic membrane', src: 'Ear p.3–4, 36–37',
    html: CVS.fig('er-tm', 'Tympanic membrane from outside and in section.', 'ear', 4) },
  { t: 'c', id: 'H-C2', title: 'Walls of the middle ear', src: 'Ear p.5–8',
    html: CVS.fig('er-medial', 'Medial wall of the tympanic cavity.', 'ear', 6) + CVS.fig('er-walls', 'Openings on the posterior and anterior walls.', 'ear', 8) },
  { t: 'c', id: 'H-C3', title: 'Ossicles, middle ear muscles and the Eustachian tube', src: 'Ear p.9–13',
    html: CVS.fig('er-tube', 'Pharyngotympanic (Eustachian) tube.', 'ear', 9) + CVS.fig('er-muscles', 'Tensor tympani and stapedius.', 'ear', 12) },
  { t: 'c', id: 'H-C4', title: 'Labyrinth: bony, membranous, macula and crista', src: 'Ear p.15–26',
    html: CVS.fig('er-labyrinth', 'Membranous labyrinth inside the bony labyrinth.', 'ear', 19) + CVS.fig('er-macula', 'Macula: otoliths pulled by gravity.', 'ear', 22) },
  { t: 'c', id: 'H-C5', title: 'Cochlear duct and the organ of Corti', src: 'Ear p.27–34',
    html: CVS.fig('er-corti', 'Cochlear duct between the two scalae.', 'ear', 28) + CVS.fig('er-transmit', 'Transmission of sound into the cochlea.', 'ear', 34) },
  { t: 'c', id: 'H-C6', title: 'Hearing loss and complications of otitis media', src: 'Ear p.38–41',
    html: CVS.ans(CVS.fig('er-com', 'Routes of spread from chronic otitis media.', 'ear', 41), 'The slide (shows the answers)') }
]});
