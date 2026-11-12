/* Section Y: SGD wrap-up cases (691022 SGD Wrap-Up.pdf, 28 pages). */
CVS.add({ id: 'Y', short: 'SGD cases', title: 'SGD Wrap-Up: Lumbar Disc Herniation &amp; Traumatic Horner', kind: 'Cases',
  blurb: 'Case 1: a 52-year-old with right S1 radiculopathy from an L5–S1 disc, traversing versus exiting roots, special tests and treatment. Case 2: an 18-year-old with Horner syndrome after blunt neck trauma, and why the light reflex is preserved.',
  items: [
  { t: 'c', id: 'Y-C1', title: 'Case 1: localising the root from the examination', src: 'SGD p.2–8',
    html: CVS.fig('sg-derm', 'Dermatomes and myotomes of the lower limb.', 'sgd', 5) },
  { t: 'c', id: 'Y-C2', title: 'Which root a lumbar disc compresses', src: 'SGD p.9–12',
    html: CVS.fig('sg-roots', 'Which root a disc hits.', 'sgd', 11) + CVS.fig('sg-hnp', 'Disc position and the root it hits, lumbar and cervical.', 'sgd', 12) },
  { t: 'c', id: 'Y-C3', title: 'Special tests, imaging and treatment', src: 'SGD p.13–16',
    html: CVS.fig('sg-slr', 'Straight-leg raise and Lasègue test.', 'sgd', 13) + CVS.ans(CVS.fig('sg-mgmt', 'HNP: work-up and treatment.', 'sgd', 16), 'The treatment table') },
  { t: 'c', id: 'Y-C4', title: 'Case 2: Horner syndrome after neck trauma', src: 'SGD p.18–26',
    html: CVS.fig('sg-horner', 'Ptosis, miosis, anhidrosis.', 'sgd', 23) + CVS.fig('sg-ocsym', 'Right oculosympathetic pathway.', 'sgd', 25) },
  { t: 'c', id: 'Y-C5', title: 'Why the light reflex is preserved in Horner', src: 'SGD p.27–28',
    html: CVS.fig('sg-plr', 'Pupillary light reflex pathway.', 'sgd', 27) }
]});
