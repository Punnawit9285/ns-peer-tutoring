/* Section S: Physics of sound & hearing, with basic vestibular / neuro-otology (691022 Physics of sound and hearing 2026.pdf, 115 pages). */
CVS.add({ id: 'S', short: 'Sound & hearing', title: 'Physics of Sound, Hearing &amp; the Vestibular System', kind: 'Lecture',
  blurb: 'Frequency, period and wavelength, the three decibel scales, sound localisation, ear-canal resonance and middle-ear amplification, basilar membrane tuning and hair cells with OAE, reading an audiogram, and vestibular organs, symptoms and tests.',
  items: [
  { t: 'c', id: 'S-C1', title: 'Frequency, period and wavelength', src: 'Sound p.2–9',
    html: '' },
  { t: 'c', id: 'S-C2', title: 'Decibels: SPL, HL and SL', src: 'Sound p.10–22',
    html: CVS.fig('so-retspl', 'Reference threshold (0 dB HL) in dB SPL for each frequency.', 'sound', 16) },
  { t: 'c', id: 'S-C3', title: 'Sound localisation: ITD, ILD and the pinna', src: 'Sound p.25–43',
    html: CVS.fig('so-itd', 'ITD by direction.', 'sound', 33) },
  { t: 'c', id: 'S-C4', title: 'Ear-canal resonance and middle-ear amplification', src: 'Sound p.44–64',
    html: CVS.fig('so-ossic', 'Area ratio: tympanic membrane to oval window.', 'sound', 53) + CVS.fig('so-noise', 'Noise-induced notch at 4000 Hz.', 'sound', 46) },
  { t: 'c', id: 'S-C5', title: 'Inner ear: basilar membrane, outer and inner hair cells', src: 'Sound p.65–75',
    html: CVS.fig('so-basilar', 'Basilar membrane from base to apex.', 'sound', 69) },
  { t: 'c', id: 'S-C6', title: 'Reading an audiogram', src: 'Sound p.77–92',
    html: '<div class="flowx" data-flow="audio"></div>' + CVS.ans(CVS.fig('so-who', 'WHO 2019 grades of hearing loss.', 'sound', 84), 'The WHO grade table') + CVS.ans(CVS.fig('so-chl', 'Example A.', 'sound', 88) + CVS.fig('so-mixed', 'Example B.', 'sound', 89), 'Two example audiograms (the slides name the type)') },
  { t: 'c', id: 'S-C7', title: 'Vestibular organs and what goes wrong', src: 'Sound p.94–106',
    html: CVS.fig('so-vestinput', 'What each part of the ear senses.', 'sound', 99) + CVS.fig('so-hit', 'Head impulse test.', 'sound', 100) + CVS.fig('so-bppv', 'Otoconia loose in a semicircular canal.', 'sound', 104) },
  { t: 'c', id: 'S-C8', title: 'Vestibular tests and vestibular neuritis', src: 'Sound p.107–114',
    html: CVS.fig('so-vemp', 'cVEMP and oVEMP pathways.', 'sound', 110) + CVS.fig('so-nerves', 'The two vestibular nerves.', 'sound', 111) }
]});
