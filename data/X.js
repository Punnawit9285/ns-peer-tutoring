/* Section X: ANS of head & neck and related cranial nerves (691022 ANS of head and neck.pdf, 21 pages). */
CVS.add({ id: 'X', short: 'ANS head & neck', title: 'ANS of the Head &amp; Neck: CN III, VII, IX', kind: 'Lecture',
  blurb: 'Sympathetic and parasympathetic outflow to the head, the three-neuron sympathetic path and Horner syndrome, CN III and the ciliary ganglion, CN VII with the pterygopalatine and submandibular ganglia, facial nerve lesion levels, and CN IX with the otic ganglion and Frey syndrome.',
  items: [
  { t: 'c', id: 'X-C1', title: 'Sympathetic versus parasympathetic outflow to the head', src: 'ANS H&N p.2–3, 7',
    html: CVS.fig('ah-para', 'Parasympathetic nuclei and their four ganglia.', 'anshn', 7) },
  { t: 'c', id: 'X-C2', title: 'Sympathetic path to the face and eye', src: 'ANS H&N p.4–6',
    html: CVS.fig('ah-sym', 'Three neurons from hypothalamus to face.', 'anshn', 4) },
  { t: 'c', id: 'X-C3', title: 'CN III and the ciliary ganglion', src: 'ANS H&N p.8–9',
    html: CVS.fig('ah-cn3', 'CN III: parasympathetic and somatic targets.', 'anshn', 9) },
  { t: 'c', id: 'X-C4', title: 'CN VII: pterygopalatine and submandibular ganglia', src: 'ANS H&N p.10–14',
    html: CVS.fig('ah-ppg', 'Pterygopalatine ganglion and its roots.', 'anshn', 11) },
  { t: 'c', id: 'X-C5', title: 'Facial nerve lesions: level, Bell palsy, crocodile tears', src: 'ANS H&N p.15–16',
    html: CVS.ans(CVS.fig('ah-facial', 'Lesion level and its signs.', 'anshn', 15), 'The slide’s chart (shows the answers)') + CVS.fig('ah-croc', 'Crocodile tears: misdirected regrowth.', 'anshn', 16) + '<div class="flowx" data-flow="facial"></div>' },
  { t: 'c', id: 'X-C6', title: 'CN IX: otic ganglion, lesions and Frey syndrome', src: 'ANS H&N p.17–20',
    html: CVS.fig('ah-otic', 'CN IX parasympathetic path to the parotid.', 'anshn', 17) + CVS.fig('ah-frey', 'Frey syndrome.', 'anshn', 20) }
]});
