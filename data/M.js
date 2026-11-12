/* Section M: Membrane potential (691016 Membrane potential.pdf, 39 pages). */
CVS.add({ id: 'M', short: 'Membrane potential', title: 'Membrane Potential &amp; the Action Potential', kind: 'Lecture',
  blurb: 'Chemical and electrical forces on Na⁺ and K⁺, where the resting potential comes from, Nernst and Goldman, the phases and properties of the action potential, and how K⁺ and Na⁺ disorders change excitability.',
  items: [
  { t: 'c', id: 'M-C1', title: 'Chemical and electrical forces on Na⁺ and K⁺', src: 'Membrane p.6–9',
    html: CVS.fig('mb-forces', 'Ion distribution across a membrane with leak K⁺ channels.', 'memb', 6) },
  { t: 'c', id: 'M-C2', title: 'Where the resting membrane potential comes from', src: 'Membrane p.11–13',
    html: CVS.fig('mb-channels', 'Leak and voltage-gated channels.', 'memb', 21) },
  { t: 'c', id: 'M-C3', title: 'Equilibrium potential: Nernst and Goldman', src: 'Membrane p.14–19',
    html: CVS.ans(CVS.fig('mb-table', 'Ion concentrations and equilibrium potentials.', 'memb', 17), 'The slide’s table (shows the values)') },
  { t: 'c', id: 'M-C4', title: 'Action potential: phases, threshold, refractory periods', src: 'Membrane p.20–31',
    html: CVS.fig('mb-ap', 'Phases of the action potential.', 'memb', 22) + CVS.fig('mb-refract', 'Absolute and relative refractory periods.', 'memb', 28) + CVS.fig('mb-nachan', 'Cycle of the voltage-gated Na⁺ channel.', 'memb', 30) },
  { t: 'c', id: 'M-C5', title: 'Ion disorders and excitability', src: 'Membrane p.33–37',
    html: CVS.ans(CVS.fig('mb-ions', 'One membrane, many ways to change excitability.', 'memb', 36), 'The slide’s table (shows the answers)') }
]});
