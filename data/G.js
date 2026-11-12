/* Section G: ANS integration & regulation (691016 ANS integration and regulation.pdf, 48 pages). */
CVS.add({ id: 'G', short: 'ANS integration', title: 'ANS Integration: Horner, Raynaud &amp; the Rabbit and Dog Labs', kind: 'Lecture + Lab',
  blurb: 'Horner syndrome from the three-neuron pathway to the eye-drop tests, Raynaud phenomenon, the rabbit cervical sympathetic experiment, and reading autonomic drug effects on the dog’s BP, HR and gut.',
  items: [
  { t: 'c', id: 'G-C1', title: 'Horner syndrome: the triad and the three neurons', src: 'ANS integration p.4–7, 11',
    html: CVS.fig('gr-causes', 'Where a lesion can cause Horner syndrome.', 'ansreg', 6) + '<div class="flowx" data-flow="horner"></div>' },
  { t: 'c', id: 'G-C2', title: 'Eye-drop tests for Horner syndrome', src: 'ANS integration p.8–10',
    html: CVS.fig('gr-cocaine', 'Cocaine drop test.', 'ansreg', 9) + CVS.fig('gr-apra', 'Apraclonidine test.', 'ansreg', 10) },
  { t: 'c', id: 'G-C3', title: 'Raynaud phenomenon', src: 'ANS integration p.13–15',
    html: CVS.fig('gr-raynaud', 'Raynaud phenomenon.', 'ansreg', 14) },
  { t: 'c', id: 'G-C4', title: 'Rabbit lab: cutting and stimulating the cervical sympathetic', src: 'ANS integration p.17–28',
    html: CVS.fig('gr-rabbit1', 'Cut, then stimulate the preganglionic (distal) end.', 'ansreg', 19) + CVS.fig('gr-rabbit2', 'Steps 3 and 4 of the rabbit experiment.', 'ansreg', 20) },
  { t: 'c', id: 'G-C5', title: 'Dog lab: autonomic drugs on BP, HR and gut', src: 'ANS integration p.30–42',
    html: CVS.fig('gr-dogsheet', 'Drug sequence on the dog worksheet.', 'ansreg', 34) }
]});
