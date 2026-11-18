# AC81 NS I spot (Peer Support MDCU81). Short key p39. Histology st 1-4 and eye/ear st 29-36 skipped.
SET = "AC81 NS I"
SRC = "pp_ac81_spot"
L4 = ["A","B","C","D"]; L5 = ["A","B","C","D","E"]
ITEMS = [
 dict(id="N81-05", sec="B", page=6, qs=[
  dict(q="Identify muscle A.", o=["Spinalis","Longissimus","Iliocostalis","Multifidus","Semispinalis"], a=3,
       ex="Erector spinae removed on this side: the deep lumbar mass hugging the spinous processes = multifidus (transversospinal group, best developed in the lumbar region)."),
  dict(q="Identify muscle B.", o=["Spinalis","Longissimus","Iliocostalis","Multifidus","Semispinalis"], a=2,
       ex="Lateral column of erector spinae, from iliac crest to rib angles = iliocostalis (lumborum).")]),
 dict(id="N81-06", sec="B", page=7, qs=[
  dict(q="Identify structure A (no. 9).", o=["Spinous process","Transverse process","Accessory process","Mammillary process"], a=2,
       ex="Lumbar vertebra: small tubercle on the back of the root of the transverse process = accessory process (mammillary process sits on the superior articular process)."),
  dict(q="Which level of vertebra is specimen B?", o=["Cervical vertebra","Upper thoracic vertebra","Mid thoracic vertebra","Lumbar vertebra"], a=2,
       ex="Costal facets on body and transverse process, long downward spine, heart-shaped body = typical (mid) thoracic.")]),
 dict(id="N81-07", sec="B", page=8, qs=[
  dict(q="Identify structure A.", o=["Spinous process","Transverse process","Accessory process","Mammillary process"], a=1,
       ex="Lateral projection of the vertebral arch."),
  dict(q="Identify structure B.", o=["Pedicle","Lamina","Pars interarticularis","Superior articular process"], a=1,
       ex="Flat plate joining transverse and spinous process; forms the back of the vertebral foramen.")]),
 dict(id="N81-08", sec="S", page=9, qs=[
  dict(q="Identify structure A.", o=["Ventral median fissure","Ventrolateral sulcus","Dorsal median sulcus","Dorsolateral sulcus"], a=3,
       ex="Dorsal side of the cord (shallow median sulcus); lateral groove where dorsal rootlets enter = dorsolateral sulcus."),
  dict(q="Which structure is nearest to structure A?", o=["Sensory nerve","Motor nerve","ANS","Choroid plexus"], a=0,
       ex="Dorsal (sensory) roots enter at the dorsolateral sulcus.")]),
 dict(id="N81-09", sec="S", page=10, qs=[
  dict(q="Identify structure A.", o=["Lumbar enlargement","Conus medullaris","Cauda equina","End of dural sac"], a=1,
       ex="Tapering end of the cord at L1/L2."),
  dict(q="Identify structure B.", o=["Conus medullaris","Cauda equina","Filum terminale externum","Filum terminale internum"], a=1,
       ex="Bundle of lumbosacral roots below the conus.")]),
 dict(id="N81-10", sec="S", page=11, qs=[
  dict(q="Identify structure A.", o=["Dura mater","Arachnoid membrane","Pia mater","Dentate ligament"], a=0,
       ex="Tough outer tube opened and reflected."),
  dict(q="Which spaces/structures does A separate?", o=["CSF and dura mater","Fat and arachnoid membrane","Internal vertebral venous plexus and pia mater","External vertebral venous plexus and arachnoid membrane"], a=1,
       ex="Outside the dura: epidural fat + internal venous plexus; inside: arachnoid (with CSF deeper in the subarachnoid space).")]),
 dict(id="N81-11", sec="K", page=12, qs=[
  dict(q="Identify structure A.", o=["Pterion","Asterion","Bregma","Lambda"], a=0,
       ex="H-shaped junction of frontal, parietal, greater wing of sphenoid and temporal; anterior branch of middle meningeal a. underneath."),
  dict(q="Identify structure B.", o=["Pterion","Asterion","Bregma","Lambda"], a=1,
       ex="Junction of parietal, occipital and temporal (mastoid) bones.")]),
 dict(id="N81-12", sec="K", page=13, qs=[
  dict(q="Identify suture A.", o=["Sagittal suture","Coronal suture","Lambdoid suture","Squamous suture"], a=1,
       ex="Between frontal and parietal bones."),
  dict(q="Identify suture B.", o=["Sagittal suture","Coronal suture","Lambdoid suture","Squamous suture"], a=2,
       ex="Between parietal and occipital bones (posterior).")]),
 dict(id="N81-13", sec="K", page=14, qs=[
  dict(q="Identify foramen A.", o=["Superior orbital fissure","Foramen rotundum","Foramen ovale","Foramen spinosum"], a=1,
       ex="CORRECTED: the arrow is on the small round hole at the front of the crescent (rotundum -> ovale -> spinosum). The printed short key says C, which contradicts its own answer to the next question (maxillary nerve)."),
  dict(q="What is the content of structure A?", o=["Ophthalmic nerve","Maxillary nerve","Mandibular nerve","Abducens nerve"], a=1,
       ex="Foramen rotundum = CN V2.")]),
 dict(id="N81-14", sec="F", page=15, qs=[
  dict(q="Which region is NOT supplied by branches of the external carotid artery?", o=L5, a=0,
       ex="Forehead (A) = supraorbital/supratrochlear branches of the ophthalmic artery (internal carotid)."),
  dict(q="Botox at which point stops you making a 'disgusted' expression?", o=L5, a=3,
       ex="Official key D: muscles beside the nose that lift the upper lip/ala (levator labii superioris alaeque nasi)."),
 ]),
 dict(id="N81-15", sec="F", page=16, qs=[
  dict(q="From which point does procerus originate?", o=L4, a=1, ex="Procerus arises from the nasal bone/lateral nasal cartilage (B) and inserts into the skin between the eyebrows."),
  dict(q="From which point does corrugator supercilii originate?", o=L4, a=0, ex="Medial end of the superciliary arch of the frontal bone (A).")]),
 dict(id="N81-16", sec="O", page=17, qs=[
  dict(q="Which of the labelled structures originates from the hyoid bone?", o=L4, a=0, ex="Official key A. Muscles arising from the hyoid include hyoglossus (greater horn/body -> side of tongue) and the middle constrictor; mylohyoid, geniohyoid and digastric INSERT on it."),
  dict(q="An inferior alveolar nerve block would paralyse which labelled muscle?", o=L4, a=3,
       ex="Official key D. The IAN carries the nerve to mylohyoid (mylohyoid + anterior belly of digastric), which branches just before the mandibular foramen; the block can catch it.")]),
 dict(id="N81-17", sec="T", page=18, qs=[
  dict(q="Identify structure A (red arrow).", o=["Lingual nerve","Lingual artery","Inferior alveolar nerve","Inferior alveolar artery"], a=3,
       ex="Vessel entering the mandibular canal with the IAN (official key)."),
  dict(q="Tell its function.", o=["Arterial supply of lower teeth","General sensation of lower lip","Arterial supply of tongue","General sensation of anterior 2/3 of tongue"], a=0,
       ex="Inferior alveolar artery (1st part of maxillary a.) supplies mandible and lower teeth.")]),
 dict(id="N81-18", sec="T", page=19, qs=[
  dict(q="Which muscle originates at structure A?", o=["Masseter","Temporalis","Medial pterygoid","Lateral pterygoid"], a=2,
       ex="Posterior view: A on the medial surface of the lateral pterygoid plate = deep head of medial pterygoid."),
  dict(q="Tell its insertion.", o=["Coronoid process of mandible","Condylar process of mandible","Medial surface of ramus of mandible","Lateral surface of ramus of mandible"], a=2,
       ex="Medial surface of ramus/angle (mirror image of masseter).")]),
 dict(id="N81-19", sec="T", page=20, qs=[
  dict(q="Identify structure A (red arrow).", o=["Internal carotid artery","Middle meningeal artery","Accessory meningeal artery","Inferior alveolar artery"], a=1,
       ex="Branch of the 1st part of the maxillary a. running straight up, often through a loop of the auriculotemporal nerve."),
  dict(q="Which foramen does structure A pass through?", o=["Foramen rotundum","Foramen ovale","Foramen spinosum","Carotid canal"], a=2,
       ex="Middle meningeal a. -> foramen spinosum.")]),
 dict(id="N81-20", sec="O", page=21, qs=[
  dict(q="Identify muscle A.", o=["Posterior belly of digastric","Stylohyoid","Mylohyoid","Geniohyoid"], a=0,
       ex="From the mastoid notch down-forward to the intermediate tendon at the hyoid."),
  dict(q="Tell its innervation.", o=["Mandibular nerve","Facial nerve","Hypoglossal nerve","Ansa cervicalis"], a=1,
       ex="Posterior belly = CN VII; anterior belly = nerve to mylohyoid (V3).")]),
 dict(id="N81-21", sec="O", page=22, qs=[
  dict(q="Identify muscle A (midsagittal section).", o=["Geniohyoid","Genioglossus","Styloglossus","Stylohyoid"], a=1,
       ex="Fan-shaped muscle from the superior mental spine into the tongue."),
  dict(q="Tell its innervation.", o=["Mandibular nerve","Facial nerve","Glossopharyngeal nerve","Hypoglossal nerve"], a=3,
       ex="All tongue muscles = CN XII except palatoglossus (CN X).")]),
 dict(id="N81-22", sec="O", page=23, qs=[
  dict(q="Identify gland A.", o=["Parotid gland","Submandibular gland","Sublingual gland","Von Ebner's gland"], a=1,
       ex="Gland in the submandibular triangle wrapping around the posterior border of mylohyoid."),
  dict(q="Tell its duct.", o=["Wharton's duct","Stensen's duct","Bartholin's duct","Rivinus's duct"], a=0,
       ex="Submandibular (Wharton's) duct opens at the sublingual caruncle.")]),
 dict(id="N81-23", sec="N", page=24, qs=[
  dict(q="Which label is the internal carotid artery?", o=L4, a=0, ex="ICA has no branches in the neck and lies posterolateral to the ECA."),
  dict(q="Which label is the subclavian artery?", o=L4, a=3, ex="D at the root of the neck.")]),
 dict(id="N81-24", sec="N", page=25, qs=[
  dict(q="Identify structure A.", o=["Vertebral artery","Thyrocervical trunk","Subclavian artery","Common carotid","Costocervical trunk"], a=0,
       ex="First branch of the subclavian, ascending to the transverse foramen of C6."),
  dict(q="Identify structure B.", o=["Vertebral artery","Thyrocervical trunk","Subclavian artery","Common carotid","Costocervical trunk"], a=1,
       ex="Short trunk at the medial border of scalenus anterior giving inferior thyroid, transverse cervical, suprascapular.")]),
 dict(id="N81-25a", sec="N", page=26, qs=[
  dict(q="Identify structure A.", o=["Phrenic nerve","Recurrent laryngeal nerve","Sympathetic trunk","Vagus nerve"], a=0,
       ex="On the front of scalenus anterior, running down (C3-C5)."),
  dict(q="What happens if structure A is dysfunctional?", o=["Abdominal bloating","Diaphragm paralysis","Horner's syndrome","Loss of cricothyroid function"], a=1,
       ex="Phrenic nerve = sole motor supply to the hemidiaphragm.")]),
 dict(id="N81-25b", sec="N", page=27, qs=[
  dict(q="Identify structure A.", o=["Phrenic nerve","Recurrent laryngeal nerve","Sympathetic trunk","Vagus nerve"], a=2,
       ex="Chain behind the carotid sheath on the prevertebral fascia."),
  dict(q="What happens if structure A is dysfunctional?", o=["Abdominal bloating","Diaphragm paralysis","Horner's syndrome","Loss of cricothyroid function"], a=2,
       ex="Ptosis, miosis, anhidrosis (+/- enophthalmos).")]),
 dict(id="N81-26", sec="C", page=28, qs=[
  dict(q="Identify nerve A.", o=["Trochlear nerve","Ophthalmic nerve","Mandibular nerve","Maxillary nerve"], a=2,
       ex="Official key: V3 heading to the foramen ovale (most posterior-lateral division)."),
  dict(q="Identify vessel B.", o=["Internal carotid artery","Vertebral artery","Basilar artery","Middle cerebral artery"], a=1,
       ex="Cut vessel beside the medulla at the foramen magnum = vertebral artery.")]),
 dict(id="N81-27", sec="C", page=29, qs=[
  dict(q="Identify structure A.", o=["Granular foveolae","Arachnoid granulations","Superior sagittal sinus","Middle meningeal artery"], a=1,
       ex="Cauliflower tufts beside the midline on the brain = arachnoid granulations (pits on the skull = granular foveolae)."),
  dict(q="Identify structure B.", o=["Superior sagittal sinus","Transverse sinus","Sigmoid sinus","Occipital sinus"], a=1,
       ex="Runs laterally in the attached edge of the tentorium.")]),
 dict(id="N81-28", sec="C", page=30, qs=[
  dict(q="Identify cranial nerve A.", o=["Oculomotor nerve","Abducens nerve","Trochlear nerve","Ophthalmic nerve"], a=1,
       ex="Thin nerve leaving the pontomedullary junction close to the midline, running up the clivus."),
  dict(q="Identify structure B.", o=["Midbrain","Pons","Medulla","Cerebellum"], a=2,
       ex="Below the pons, with pyramids and olives.")]),
]
