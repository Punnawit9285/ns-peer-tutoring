/* Section P: Physiology of nerve & NMJ (691016 Physiology of nerve and nmj.pdf, 40 pages). */
CVS.add({ id: 'P', short: 'Nerve & NMJ', title: 'Physiology of Nerve &amp; the Neuromuscular Junction', kind: 'Lecture',
  blurb: 'Time and length constants, saltatory conduction and demyelination (GBS), the six steps of neuromuscular transmission, MG versus LEMS, toxins, AChE inhibitors and the two kinds of muscle relaxant, with an interactive "where does the signal fail" chart.',
  items: [
  { t: 'c', id: 'P-C1', title: 'Time constant and length constant', src: 'Nerve & NMJ p.7–11',
    html: CVS.fig('pn-cable', 'Current spreading along an axon decays with Rm and Ra.', 'nmj', 10) },
  { t: 'c', id: 'P-C2', title: 'Saltatory conduction and demyelination', src: 'Nerve & NMJ p.13–17',
    html: CVS.fig('pn-salt', 'Continuous versus saltatory conduction.', 'nmj', 13) + CVS.ans(CVS.fig('pn-demyel', 'Where the conduction pathway is damaged.', 'nmj', 16), 'The slide’s table (shows the answers)') },
  { t: 'c', id: 'P-C3', title: 'Neuromuscular transmission: six steps, EPP versus muscle AP', src: 'Nerve & NMJ p.20–23, 27',
    html: CVS.fig('pn-nmj', 'Structure of the neuromuscular junction.', 'nmj', 21) },
  { t: 'c', id: 'P-C4', title: 'Where the NMJ signal fails: MG, LEMS, toxins and drugs', src: 'Nerve & NMJ p.24–37',
    html: '<div class="flowx" data-flow="nmj"></div>' + CVS.ans(CVS.fig('pn-toxins', 'Neurotoxins and their targets.', 'nmj', 30), 'The toxin table (shows the answers)') + CVS.ans(CVS.fig('pn-blocksite', 'Where NMJ transmission can be blocked.', 'nmj', 36), 'The block-site table (shows the answers)') },
  { t: 'c', id: 'P-C5', title: 'AChE inhibitors and the two muscle relaxants', src: 'Nerve & NMJ p.32–35',
    html: CVS.ans(CVS.fig('pn-relax', 'Atracurium versus succinylcholine.', 'nmj', 34), 'The slide’s table (shows the answers)') }
]});
