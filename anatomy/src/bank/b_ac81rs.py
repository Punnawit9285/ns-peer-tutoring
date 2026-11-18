# AC81 RS I spot (Peer Support MDCU81). Short key p18. Stations 4, 15, 16 had no data; 13-14 histology skipped.
SET = "AC81 RS I"
SRC = "pp_ac81_rs"
ITEMS = [
 dict(id="R81-01", sec="U", page=2, qs=[
  dict(q="Identify structure A.", o=["Superior nasal concha","Inferior nasal concha","Hiatus semilunaris","Ethmoidal bulla"], a=2,
       ex="Curved slit in the middle meatus below the ethmoidal bulla."),
  dict(q="Which paranasal sinus opens at B (upper-front end of the groove)?", o=["Frontal sinus","Ethmoid sinus","Maxillary sinus","Sphenoid sinus"], a=0,
       ex="The front-upper end of the hiatus semilunaris (ethmoidal infundibulum) receives the frontonasal duct.")]),
 dict(id="R81-02", sec="L", page=3, qs=[
  dict(q="Identify area A.", o=["Piriform recess","Hiatus semilunaris","Opening of auditory tube","Opening of nasolacrimal duct"], a=2,
       ex="Funnel opening in the lateral nasopharyngeal wall, in front of the torus tubarius."),
  dict(q="Identify the muscle in area B.", o=["Palatoglossus","Stylopharyngeus","Palatopharyngeus","Salpingopharyngeus"], a=3,
       ex="The fold running down from the torus tubarius = salpingopharyngeal fold, raised by salpingopharyngeus (salpinx = tube).")]),
 dict(id="R81-03", sec="L", page=4, qs=[
  dict(q="Identify structure A.", o=["Cricothyroid m.","Thyroarytenoid m.","Lateral cricoarytenoid m.","Posterior cricoarytenoid m."], a=3,
       ex="Posterior surface of the cricoid lamina: the only abductor of the vocal folds."),
  dict(q="Identify fold B (coronal section). [stem reworded]", o=["Vocal fold","Vestibular fold","Ary-epiglottic fold"], a=0,
       ex="Lower of the two folds, below the laryngeal ventricle.")]),
 dict(id="R81-05", sec="W", page=6, qs=[
  dict(q="Identify structure A.", o=["External intercostal m.","Internal intercostal m.","Innermost intercostal m.","Transversus thoracis m."], a=3,
       ex="Anterior wall seen from inside: slips from the lower sternum to costal cartilages 2-6."),
  dict(q="Identify structure B.", o=["Pericardiophrenic vessels","Intercostal vessels","Internal thoracic vessels"], a=2,
       ex="Paired vertical vessels just lateral to the sternum.")]),
 dict(id="R81-06", sec="W", page=7, qs=[
  dict(q="Identify structure A.", o=["Manubrium sterni","Sternal angle","Body of sternum","Xiphoid process"], a=1,
       ex="Transverse ridge between manubrium and body."),
  dict(q="Identify structure B.", o=["2nd rib","3rd rib","4th rib","5th rib"], a=1,
       ex="Official key: 3rd. Count down from the 2nd costal cartilage that meets the sternal angle.")]),
 dict(id="R81-07", sec="W", page=8, qs=[
  dict(q="Identify structure A.", o=["External intercostal m.","Internal intercostal m.","Innermost intercostal m.","Transversus thoracis m."], a=0,
       ex="Outer layer, fibres downward and forward."),
  dict(q="Identify structure B.", o=["Manubrium sterni","Sternal angle","Body of sternum","Xiphoid process"], a=1,
       ex="Manubriosternal junction (T4/T5 level).")]),
 dict(id="R81-08", sec="P", page=9, qs=[
  dict(q="Identify structure A.", o=["Vagus n.","Recurrent laryngeal n.","Phrenic n.","Sympathetic trunk"], a=2,
       ex="Runs on the side of the pericardium, IN FRONT of the lung root, with the pericardiophrenic vessels."),
  dict(q="Which organ makes an impression at B?", o=["Stomach","Liver","Spleen"], a=1,
       ex="Right side: the liver lies under the right dome of the diaphragm.")]),
 dict(id="R81-09", sec="P", page=10, qs=[
  dict(q="Identify structure A.", o=["Lingula","Pulmonary ligament","Hilum"], a=1,
       ex="Pleural sleeve hanging below the hilum."),
  dict(q="Identify layer B. [stem reworded]", o=["Cervical pleura","Mediastinal pleura","Costal pleura","Visceral pleura"], a=3,
       ex="The shiny layer stuck on the lung surface = visceral pleura.")]),
 dict(id="R81-10", sec="P", page=11, qs=[
  dict(q="Which structure delivers oxygenated blood from the lung back to the heart?", o=["A","B","C","D"], a=2,
       ex="Left hilum: artery on top (A), bronchus behind (B), veins in front/below (C) -> C = pulmonary vein."),
  dict(q="Which label is closest to the heart (cardiac impression)? [stem reworded]", o=["A","B","C","D"], a=3,
       ex="D marks the concave cardiac impression in front of the hilum.")]),
 dict(id="R81-11", sec="L", page=12, qs=[
  dict(q="Which structure is at the same vertebral level as X (tracheal bifurcation)?", o=["C6","T1","Carina","Eparterial bronchus","Lingula"], a=2,
       ex="Bifurcation and carina = sternal angle = T4/T5."),
  dict(q="Which is at the same vertebral level as the start of the trachea (conducting part of the bronchial tree)?", o=["C6","T1","Carina","Eparterial bronchus","Lingula"], a=0,
       ex="Trachea starts at the lower border of the cricoid cartilage = C6.")]),
 dict(id="R81-12", sec="P", page=13, qs=[
  dict(q="Which structure delivers deoxygenated blood from the posterior thorax to the heart?", o=["A","B","C","D"], a=2,
       ex="C = azygos vein on the right of the vertebral bodies; drains posterior intercostal veins into the SVC."),
  dict(q="Which structure delivers oxygenated blood to the bronchial tree?", o=["A","B","C","D"], a=1,
       ex="Bronchial arteries: from the descending aorta (left) / 3rd right posterior intercostal artery (right).")]),
]
