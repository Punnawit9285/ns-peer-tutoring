/* Section A: ANS physiology (691016 ANS physiology.pdf, 32 pages). */
CVS.add({ id: 'A', short: 'ANS physiology', title: 'Autonomic Nervous System: Pathways, Organs &amp; Receptors', kind: 'Lecture',
  blurb: 'The two-neuron pathway and ganglionic transmission, the transmitter golden rule and its exceptions, the layout of the two divisions, organ-by-organ control, and adrenergic and cholinergic receptor subtypes.',
  items: [
  { t: 'c', id: 'A-C1', title: 'Two-neuron pathway and ganglionic transmission', src: 'ANS physiology p.6–8',
    html: CVS.fig('an-somatic', 'Somatic versus autonomic output.', 'ansphys', 6) + CVS.fig('an-ganglion', 'Fast and slow synaptic potentials.', 'ansphys', 8) },
  { t: 'c', id: 'A-C2', title: 'The golden rule: which transmitter where', src: 'ANS physiology p.9, 30',
    html: '' },
  { t: 'c', id: 'A-C3', title: 'Sympathetic versus parasympathetic layout', src: 'ANS physiology p.11–12',
    html: CVS.fig('an-organiz', 'Organisation of the two divisions.', 'ansphys', 12) },
  { t: 'c', id: 'A-C4', title: 'Organ control I: eye, glands, heart, vessels', src: 'ANS physiology p.13–16',
    html: CVS.fig('an-pupil', 'Pupil muscles.', 'ansphys', 13) + CVS.fig('an-lens', 'Accommodation and the upper eyelid muscles.', 'ansphys', 14) },
  { t: 'c', id: 'A-C5', title: 'Organ control II: bladder, gut, skin, sex organs', src: 'ANS physiology p.18–21',
    html: CVS.fig('an-bladder', 'Nerves of the bladder and urethral sphincters.', 'ansphys', 18) },
  { t: 'c', id: 'A-C6', title: 'Adrenergic and cholinergic receptors', src: 'ANS physiology p.22–28',
    html: CVS.ans(CVS.fig('an-adr', 'Adrenergic receptors.', 'ansphys', 24) + CVS.fig('an-chol', 'Cholinergic receptors.', 'ansphys', 26), 'The receptor tables (show the answers)') }
]});
