/* Section R: Physiology of reflex + reflex exam lab (691019 Physiology of reflex.pdf, 78 pages). */
CVS.add({ id: 'R', short: 'Reflex', title: 'Reflexes: Arc, Spinal Reflexes &amp; the Reflex Exam', kind: 'Lecture + Lab',
  blurb: 'The reflex arc and its classes, muscle spindle versus Golgi tendon organ, flexor and crossed extensor reflexes with their interneuron circuits, hypo- and hyperreflexia and spinal shock, and the deep, superficial and cranial reflexes tested at the bedside.',
  items: [
  { t: 'c', id: 'R-C1', title: 'Reflex arc and the classes of reflex', src: 'Reflex p.3–15',
    html: CVS.fig('rf-arc', 'Reflex arc.', 'reflex', 4) },
  { t: 'c', id: 'R-C2', title: 'Stretch reflex versus tendon reflex', src: 'Reflex p.16–31',
    html: CVS.fig('rf-gto', 'Tendon reflex: the receptor inhibits its own muscle.', 'reflex', 23) },
  { t: 'c', id: 'R-C3', title: 'Flexor and crossed extensor reflexes', src: 'Reflex p.32–42',
    html: CVS.fig('rf-crossed', 'Withdrawal and the opposite-limb response.', 'reflex', 35) + CVS.fig('rf-recip', 'Inhibiting the antagonist.', 'reflex', 39) },
  { t: 'c', id: 'R-C4', title: 'Abnormal reflexes and spinal shock', src: 'Reflex p.44–50',
    html: CVS.fig('rf-abnormal', 'Lesion level and reflex change.', 'reflex', 45) },
  { t: 'c', id: 'R-C5', title: 'Deep tendon reflexes at the bedside', src: 'Reflex p.56–67',
    html: '' },
  { t: 'c', id: 'R-C6', title: 'Superficial and cranial reflexes', src: 'Reflex p.68–77',
    html: CVS.fig('rf-pupil', 'Pupillary light reflex.', 'reflex', 76) + CVS.fig('rf-plantar', 'Plantar reflex.', 'reflex', 74) }
]});
