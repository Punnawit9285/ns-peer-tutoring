/* Section N: Nervous tissue (691009 Nervous tissue.pdf, 57 pages). */
CVS.add({ id: 'N', short: 'Nervous tissue', title: 'Nervous Tissue: Neurons, Glia &amp; Nerve Sheaths', kind: 'Lecture',
  blurb: 'Origin and components of nervous tissue, neuron structure and Nissl bodies, axon versus dendrite, axonal transport and synapses, myelin and neuron classes, glial cells, receptors and the connective tissue sheaths of a nerve.',
  items: [
  { t: 'c', id: 'N-C1', title: 'Origin and components of nervous tissue', src: 'Nervous tissue p.3–7',
    html: CVS.fig('tis-neuropil', 'Grey matter, Nissl stain: neurons, glia and the neuropil between them.', 'tissue', 7) },
  { t: 'c', id: 'N-C2', title: 'The neuron: soma, Nissl bodies, axon and dendrites', src: 'Nervous tissue p.8–18',
    html: CVS.fig('tis-neuron', 'Neurons in Golgi and Nissl stains.', 'tissue', 16) },
  { t: 'c', id: 'N-C3', title: 'Axonal transport and synapses', src: 'Nervous tissue p.17–22',
    html: CVS.fig('tis-synapse', 'Structural types of synapse.', 'tissue', 20) },
  { t: 'c', id: 'N-C4', title: 'Myelin and the classes of neuron', src: 'Nervous tissue p.23–28',
    html: CVS.fig('tis-myelin', 'Myelinated fibre: internodes and nodes.', 'tissue', 24) + CVS.fig('tis-polar', 'Neurons classed by number of processes.', 'tissue', 27) },
  { t: 'c', id: 'N-C5', title: 'Glial cells of the CNS and PNS', src: 'Nervous tissue p.33–44',
    html: CVS.fig('tis-astro', 'Protoplasmic (grey matter) and fibrous (white matter) astrocytes.', 'tissue', 36) + CVS.fig('tis-ependyma', 'Ependyma lining the ventricles and central canal.', 'tissue', 41) },
  { t: 'c', id: 'N-C6', title: 'Sensory endings and the sheaths of a nerve', src: 'Nervous tissue p.29–32, 45–46',
    html: CVS.fig('tis-spindle', 'Muscle and joint proprioceptors.', 'tissue', 31) + CVS.fig('tis-sheath', 'Peripheral nerve: the three connective tissue sheaths.', 'tissue', 45) }
]});
