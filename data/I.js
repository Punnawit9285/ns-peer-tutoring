/* Section I: Radiologic anatomy of vertebral column & spinal cord (691009 Imaging of Vertebral column and spinal cord.pdf, 61 pages). */
CVS.add({ id: 'I', short: 'Spine imaging', title: 'Radiologic Anatomy of Vertebral Column &amp; Spinal Cord', kind: 'Lecture',
  blurb: 'Open-mouth and lateral views of C1–C2 with the atlanto-dental interval, cervical lines and joints, the lumbar Scotty dog and pars defects, CT numbers and windows, and T1 versus T2 MRI.',
  items: [
  { t: 'c', id: 'I-C1', title: 'Atlas and axis on plain film', src: 'Spine imaging p.7–11',
    html: CVS.fig('spimg-openmouth', 'C1–C2: AP radiograph.', 'spimg', 8) + CVS.fig('spimg-adi', 'Lateral view: the atlanto-dental interval.', 'spimg', 11) },
  { t: 'c', id: 'I-C2', title: 'Cervical spine: joints, foramina and the four lines', src: 'Spine imaging p.12–16',
    html: CVS.fig('spimg-lines', 'Cervical spine, lateral view: four alignment lines and the ligaments under them.', 'spimg', 15) },
  { t: 'c', id: 'I-C3', title: 'Lumbar spine: pars interarticularis and the Scotty dog', src: 'Spine imaging p.18–29',
    html: CVS.fig('spimg-scotty', 'Lumbar oblique radiograph.', 'spimg', 26) + CVS.fig('spimg-pars', 'Pars defect at L5 (broken neck).', 'spimg', 28) + CVS.fig('spimg-listhesis', 'Slip of one vertebra on the next.', 'spimg', 29) },
  { t: 'c', id: 'I-C4', title: 'CT: Hounsfield units and windows', src: 'Spine imaging p.31–35',
    html: CVS.fig('spimg-hu', 'CT numbers of body tissues.', 'spimg', 33) },
  { t: 'c', id: 'I-C5', title: 'MRI: T1 versus T2, and choosing the study', src: 'Spine imaging p.44–59',
    html: CVS.fig('spimg-t1t2', 'Sagittal spine: T1 (left) and fat-suppressed T2 (right).', 'spimg', 47) }
]});
