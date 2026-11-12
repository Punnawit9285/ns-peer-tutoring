/* Section V: Back: vertebral column & deep back muscles (691009 Deep back muscles and Vertebral column.pdf, 86 pages). */
CVS.add({ id: 'V', short: 'Back', title: 'Vertebral Column &amp; Deep Back Muscles', kind: 'Lecture',
  blurb: 'Vertebral counts and curves, parts of a typical vertebra, regional features (atlas, axis, cervical, thoracic, lumbar, sacrum), ligaments and the intervertebral disc, and the deep back muscle columns down to the suboccipital group.',
  items: [
  { t: 'c', id: 'V-C1', title: 'Counts and curves of the vertebral column', src: 'Back p.4–9',
    html: CVS.fig('back-curves', 'The four curves of the column.', 'back', 5) },
  { t: 'c', id: 'V-C2', title: 'Parts of a typical vertebra', src: 'Back p.10–17',
    html: CVS.fig('back-lumbar', 'Lumbar vertebra, superior view.', 'back', 17) },
  { t: 'c', id: 'V-C3', title: 'Regional features: atlas, axis, cervical, thoracic, sacrum', src: 'Back p.18–47',
    html: CVS.fig('back-atlas', 'Atlas (C1), superior view.', 'back', 25) + CVS.fig('back-thoracic', 'A typical thoracic vertebra.', 'back', 40) },
  { t: 'c', id: 'V-C4', title: 'Ligaments and the intervertebral disc', src: 'Back p.53–62',
    html: CVS.fig('back-ligaments', 'Ligaments of the column and the disc.', 'back', 54) + CVS.fig('back-pressure', 'Intradiscal pressure in various positions (standing = 100%).', 'back', 62) },
  { t: 'c', id: 'V-C5', title: 'Deep back muscles: splenius, erector spinae, transversospinal', src: 'Back p.63–84',
    html: CVS.fig('back-muscles', 'Deep back muscles in cross-section.', 'back', 65) },
  { t: 'c', id: 'V-C6', title: 'Suboccipital muscles', src: 'Back p.85–86',
    html: CVS.fig('back-subocc', 'The suboccipital muscles.', 'back', 86) }
]});
