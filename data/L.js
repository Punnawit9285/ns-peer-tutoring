/* Section L: Lab nerve & NMJ (691016 lab nerve and nmj.pdf, 44 pages). */
CVS.add({ id: 'L', short: 'Lab nerve & NMJ', title: 'Lab: Frog Nerve &amp; Neuromuscular Junction', kind: 'Lab',
  blurb: 'Reading the frog sciatic traces: paired stimuli and refractory periods, the compound action potential and fibre types, conduction velocity from two latencies, cathode versus anodal block, and NMJ drugs on the nerve–muscle preparation.',
  items: [
  { t: 'c', id: 'L-C1', title: 'Paired stimuli and the refractory period', src: 'Lab p.8–11',
    html: CVS.fig('lb-refract', 'Second action potential at three stimulus intervals.', 'lab', 9) },
  { t: 'c', id: 'L-C2', title: 'Compound action potential and fibre types', src: 'Lab p.13–18',
    html: CVS.fig('lb-cap', 'Compound action potential: peaks from different fibre groups.', 'lab', 14) + CVS.fig('lb-fibers', 'Erlanger–Gasser versus numerical classification.', 'lab', 15) },
  { t: 'c', id: 'L-C3', title: 'Nerve conduction velocity', src: 'Lab p.20–23',
    html: CVS.fig('lb-ncv', 'Two stimulation sites, two latencies.', 'lab', 21) },
  { t: 'c', id: 'L-C4', title: 'Cathode, anode and anodal block', src: 'Lab p.24–29',
    html: CVS.fig('lb-electrode', 'Electrode arrangement on the nerve chamber.', 'lab', 24) + CVS.fig('lb-anodal', 'Swapping the two stimulating electrodes.', 'lab', 27) },
  { t: 'c', id: 'L-C5', title: 'NMJ drugs on the nerve–muscle preparation', src: 'Lab p.31–40',
    html: CVS.ans(CVS.fig('lb-achsux', 'Low-dose ACh versus high-dose ACh / succinylcholine.', 'lab', 38), 'The slide’s table (shows the answers)') }
]});
