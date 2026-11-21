"""Connection maps for the spot trainer's explanations: every checklist structure -> the flowchart(s) it sits in, with its box lit.
Most maps are the Anatomy 101 deck's (anatomy/src/content/flows.py). The FLOWS below add the structures those maps do not show:
muscles, bones and joints, meninges, the eye, the walls of the nose and larynx. Same tree syntax as the deck (anatomy/src/flowsvg.py),
plus three kinds: m muscle · b bone / cartilage / joint / ligament · d membrane / meninges. Lines between two non-vessel,
non-nerve boxes (a part and its parts) are drawn grey.
MAP: structure id -> [(flow id, box id or [box ids])], the first map is shown first. A box id is its #id, else its name."""

FLOWS = {}
def F(fid, title, blocks, kind='t', orient='h', links=()):
    FLOWS[fid] = dict(title=title, blocks=blocks, kind=kind, orient=orient, links=list(links), pedge='p')

# ===================================================================== NS I · lab 1 back, column, cord
F('sp-back-m', 'Deep (intrinsic) back muscles: three layers, one nerve', [('out', '''
*Posterior (dorsal) rami {n} | of the spinal nerves: every intrinsic back muscle
  Superficial layer · splenius
    *Splenius capitis | C7–T3 spines → mastoid + superior nuchal line
    *Splenius cervicis | T3–T6 spines → C1–C3 transverse processes
  Intermediate layer · erector spinae
    *Iliocostalis | lateral column: iliac crest → angles of the ribs
    Longissimus | middle column → transverse processes, mastoid
    Spinalis | medial column: spine to spine
  Deep layer · transversospinales
    *Semispinalis | spans 4–6 vertebrae; capitis → occipital bone
    *Multifidus | spans 2–4; thickest in the lumbar region
    *Rotatores | span 1–2; best in the thoracic region
''')], kind='m')

F('sp-col-joints', 'Joints and ligaments between two vertebrae', [('out', '''
Two vertebrae
  Bodies · in front
    Intervertebral disc | annulus fibrosus + nucleus pulposus
    Anterior longitudinal lig. | front of the bodies; limits extension
    Posterior longitudinal lig. | back of the bodies, in the canal; limits flexion
  Arches · behind
    *Facet (zygapophysial) joint #fj | synovial: superior + inferior articular processes; its plane sets the movement
    *Ligamentum flavum #lf | lamina to lamina; elastic + yellow; just behind the cord
    Interspinous + supraspinous ligs | spine to spine; ligamentum nuchae in the neck
'''), ('out', '''
Medial branch of the posterior ramus {n} | two levels supply each joint
  Facet (zygapophysial) joint #fj
''')], kind='b')

F('sp-lp', 'Lumbar puncture: what the needle passes (L3/4 or L4/5)', [('out', '''
Skin + subcutaneous fat {t}
  Supraspinous lig.
    Interspinous lig.
      *Ligamentum flavum #lf | the "give" as the needle enters the epidural space
        Epidural space {c} | fat + internal vertebral venous plexus
          Dura mater {d}
            Arachnoid mater {d}
              *Lumbar cistern {c} | subarachnoid space: CSF
                *Cauda equina {n} | floats aside; the cord ended at L1–L2
''')], kind='b', orient='v')

F('sp-drg', 'Spinal nerve: where the dorsal root ganglion sits', [('out', '''
Spinal cord segment {t}
  Dorsal rootlets | posterolateral sulcus
    Dorsal root | sensory only
      *Dorsal root (spinal) ganglion {g} #drg | sensory cell bodies, no synapse; in the intervertebral foramen
        *Spinal nerve #sn | mixed; a few mm long
          Dorsal ramus | back muscles + skin
          Ventral ramus | limbs, trunk wall, plexuses
  Ventral rootlets | anterolateral sulcus
    Ventral root | motor (+ preganglionic sympathetic T1–L2)
      Spinal nerve #sn
''')], kind='n')

F('sp-cord-end', 'Lower end of the spinal cord and its anchors', [('out', '''
*Spinal cord | adult: ends at L1–L2
  *Conus medullaris #conus | the tapered end
    *Filum terminale (internum) {d} #fi | pia only; inside the dural sac down to S2
      Filum terminale externum {d} | wrapped in dura; anchors to the coccyx
  *Cauda equina #ce | roots L2–Co, running down to their own foramina
  *Denticulate ligaments {d} #dl | 21 pairs of pia teeth to the dura, between the ventral + dorsal roots
'''), ('out', '''
Dural sac {d} | ends at S2
  Lumbar cistern {c} #lc | subarachnoid space L2–S2: CSF for lumbar puncture
''')], kind='n', links=[('ce', 'lc', 'float in', 'rel'), ('fi', 'lc', 'runs through', 'rel')])

# ===================================================================== NS I · lab 2 face, superficial neck
F('sp-cheek', 'The cheek: buccinator, parotid duct, buccal nerves', [('out', '''
Facial n. (VII) {n}
  Buccal branches {n} | motor
    *Buccinator {m} #bu | keeps food between the teeth; blowing, sucking
Mandibular n. (V3) {n}
  Buccal n. (V3) {n} #bn | sensory: skin + mucosa of the cheek
Parotid gland
  *Parotid (Stensen’s) duct {o} #pd | across masseter, turns in at its front edge
    Opens opposite the upper 2nd molar {o}
''')], kind='t', links=[('pd', 'bu', 'pierces', 'rel'), ('bn', 'bu', 'pierces, does not supply', 'rel')])

F('sp-neck-veins', 'Superficial veins of the neck: EJV and AJV', [('in', '''
*Subclavian v.
  *External jugular v. #ejv | from behind the angle of the mandible, across SCM, deep to platysma
    Posterior auricular v.
    Posterior division of retromandibular v.
    *Anterior jugular v. #ajv | starts under the chin near the midline; turns out deep to SCM to the EJV (or subclavian v.)
      Submental vv.
      Jugular venous arch | joins the two AJVs above the sternum
''')], kind='v')

F('sp-suprahyoid', 'Suprahyoid muscles: the nerve follows the embryology', [('out', '''
Mandibular n. (V3) · 1st arch
  Inferior alveolar n.
    Nerve to mylohyoid
      *Mylohyoid {m} #mh | floor of the mouth; raises the hyoid + tongue
      *Anterior belly of digastric {m} #ad | digastric fossa of the mandible
Facial n. (VII) · 2nd arch
  *Posterior belly of digastric {m} #pd | mastoid notch
  *Stylohyoid {m} #sh | styloid → hyoid; split by the digastric tendon
C1 fibres riding on XII
  Geniohyoid {m} #gh | mental spine → hyoid
''')], kind='n', links=[('ad', 'pd', 'intermediate tendon, slung to the hyoid', 'rel')])

F('sp-thyroid', 'Thyroid gland: its parts and what lies at each', [('out', '''
*Thyroid gland | C5–T1, in pretracheal fascia: moves on swallowing
  *Right + left lobes #lobes | beside the larynx + trachea
    Upper pole | superior thyroid a. + external laryngeal n.
    Lower pole | inferior thyroid a. + recurrent laryngeal n.
    Parathyroid glands | on the back of each lobe
  *Isthmus #isth | over tracheal rings 2–4
    *Pyramidal lobe #pyr | rises from the isthmus (often left); remnant of the thyroglossal duct
''')], kind='t')

# ===================================================================== NS I · lab 3 infratemporal, TMJ
F('sp-mastication', 'Muscles of mastication: all from V3', [('out', '''
*Mandibular n. (V3) | its motor root joins at foramen ovale
  Nerve to medial pterygoid | from the main trunk
    *Medial pterygoid {m} | closes; sling round the angle with masseter
  Anterior division | mostly motor
    Masseteric n. | through the mandibular notch
      *Masseter {m} | zygomatic arch → ramus; closes
    Deep temporal nn.
      *Temporalis {m} | temporal fossa → coronoid; closes, back fibres retract
    Nerve to lateral pterygoid
      *Lateral pterygoid {m} #lp | the opener: pulls the condyle + disc forward
'''), ('out', '''
Temporomandibular joint {b}
  *Articular disc of TMJ {b} #disc | splits the joint: upper gliding + lower hinge compartment
  Mandibular condyle {b}
  Articular eminence {b} | the condyle slides onto it on wide opening
''')], kind='n', links=[('lp', 'disc', 'upper head pulls it', 'rel')])

# ===================================================================== NS I · lab 4 floor of mouth, tongue
F('sp-tongue-m', 'Extrinsic tongue muscles: XII, except palatoglossus', [('out', '''
*Hypoglossal n. (XII) #xii | runs forward on hyoglossus
  *Genioglossus {m} #gg | mandible → tongue; protrudes. XII palsy: the tip points to the weak side
  *Hyoglossus {m} #hg | hyoid → side of the tongue; depresses
  *Styloglossus {m} #sg | styloid → side of the tongue; pulls it up + back
  Intrinsic muscles {m} | change its shape
Vagus n. (X) · pharyngeal plexus
  Palatoglossus {m} | the exception
Lingual a. {a} #la | from the external carotid
''')], kind='n', links=[('la', 'hg', 'runs deep to it', 'rel')])

F('sp-smg', 'Submandibular gland, its duct and the lingual nerve', [('out', '''
*Submandibular gland {t} #smg | big superficial part + deep part, hooked round the back of mylohyoid
  *Submandibular (Wharton’s) duct {o} #smd | from the deep part, forward on hyoglossus
    Sublingual papilla {o} | beside the frenulum of the tongue
Lingual n. (V3) #ln
  Submandibular ganglion {g} | chorda tympani fibres synapse here
    Submandibular gland #smg
''')], kind='n', links=[('ln', 'smd', 'loops under the duct', 'rel')])

# ===================================================================== NS I · lab 5 deep neck
F('sp-scalene', 'Anterior scalene: the landmark of the root of the neck', [('out', '''
C4–C6 ventral rami {n}
  *Anterior scalene #as | C3–C6 transverse processes → scalene tubercle of the 1st rib
Phrenic n. {n} #ph | runs down on its front
Subclavian v. {v} #sv | in front of it
Subclavian a. {a} #sa | behind it; the muscle marks its 2nd part
Brachial plexus roots {n} #bp | behind it, with the artery
''')], kind='m', links=[('ph', 'as', 'on its front', 'rel'), ('sv', 'as', 'in front', 'rel'), ('sa', 'as', 'behind', 'rel'), ('bp', 'as', 'behind', 'rel')])

# ===================================================================== NS I · lab 6 cranial cavity
F('sp-meninges', 'Cranial meninges and the dural folds', [('out', '''
*Dura mater #dura | two layers; most dural venous sinuses run between them
  Periosteal layer | stuck to the skull; the middle meningeal a. runs in it
  Meningeal layer | folds inward as the dural septa
    Falx cerebri | between the two hemispheres
    *Tentorium cerebelli #tent | roof over the cerebellum; its notch holds the midbrain
    Falx cerebelli
    *Diaphragma sellae #ds | roof of the pituitary fossa; the stalk passes through
Arachnoid mater
  Subarachnoid space {c} | CSF + the cerebral arteries
    *Arachnoid granulations #ag | bulge into the superior sagittal sinus: CSF → venous blood
      Superior sagittal sinus {s}
Pia mater | on the brain surface
''')], kind='d')

# ===================================================================== NS I · lab 7 orbit, eye
F('sp-orbit-n', 'Nerves to the eye muscles: LR6 SO4, the rest III', [('out', '''
*Oculomotor n. (III) #cn3 | superior orbital fissure, inside the tendinous ring
  Superior division
    Superior rectus {m}
    *Levator palpebrae superioris {m} #lps | lifts the upper lid; III palsy → ptosis
  Inferior division
    Medial + inferior rectus, inferior oblique {m}
    Ciliary ganglion {g} | parasympathetic: sphincter pupillae + ciliary m.
*Trochlear n. (IV) #cn4 | the only nerve leaving the back of the brainstem
  *Superior oblique {m} #so | through the trochlea: turns the eye down + out
*Abducent n. (VI) #cn6 | longest course inside the skull; in the cavernous sinus beside the ICA
  *Lateral rectus {m} #lr | abducts
''')], kind='n')

F('sp-v1', 'Ophthalmic nerve (V1) in the orbit', [('out', '''
*Ophthalmic n. (V1) | sensory only; through the superior orbital fissure
  *Frontal n. #fn | runs forward on top of levator palpebrae superioris
    Supra-orbital n. | forehead + scalp to the vertex
    Supratrochlear n. | medial forehead
  Lacrimal n. | lacrimal gland region + lateral upper lid
  Nasociliary n. | the eyeball itself
    Long ciliary nn. #lcn | cornea: sensory limb of the corneal reflex
    Anterior + posterior ethmoidal nn.
    Infratrochlear n.
''')], kind='n')

F('sp-globe', 'Eyeball: three coats and the lens', [('out', '''
Eyeball
  Fibrous coat
    *Sclera #sc | white, back 5/6; the eye muscles insert on it
    *Cornea #co | clear front 1/6; does most of the focusing; no vessels; V1 sensation
  Vascular coat (uvea)
    Choroid | feeds the outer retina
    Ciliary body | ciliary m. (III) rounds the lens for near vision
    *Iris #ir | sphincter pupillae (III) + dilator pupillae (sympathetic)
  Inner coat
    Retina | → optic n. (II)
  *Lens #le | hung from the ciliary body by zonular fibres
''')], kind='t')

# ===================================================================== RS I · lab 1 nose, pharynx, larynx
F('sp-nose-walls', 'Nasal cavity: the septum and the lateral wall', [('out', '''
Nasal cavity {c}
  *Nasal septum #sep | perpendicular plate of ethmoid + vomer + septal cartilage; Kiesselbach area in front
  Lateral wall
    *Superior nasal concha #sc | part of the ethmoid
      Superior meatus {o} #sm | posterior ethmoidal cells
    *Middle nasal concha #mc | part of the ethmoid
      Middle meatus {o} #mm | frontal, maxillary, anterior + middle ethmoidal; bulla + semilunar hiatus
    *Inferior nasal concha #ic | a bone of its own
      Inferior meatus {o} #im | nasolacrimal duct
    Spheno-ethmoidal recess {o} | sphenoidal sinus
''')], kind='b')

F('sp-nasopharynx', 'Nasopharynx: the auditory tube opening and its neighbours', [('out', '''
Nasopharynx {c}
  *Pharyngeal opening of auditory (Eustachian) tube #to | level with the inferior concha, about 1 cm behind it
    Auditory (Eustachian) tube #tube | to the middle ear; evens out the pressure
      Middle ear {c} | throat infections spread up the tube
  *Torus tubarius {b} #tt | bulge of the tube cartilage above + behind the opening
    Salpingopharyngeal fold {m} | over salpingopharyngeus
  *Pharyngeal recess (fossa of Rosenmüller) #pr | behind the torus; nasopharyngeal carcinoma starts here
  Pharyngeal tonsil (adenoid) {t} | roof + back wall; big adenoids block the tube
Tensor veli palatini {m} #tvp | V3; opens the tube when you swallow
''')], kind='o', links=[('tvp', 'tube', 'opens', 'rel')])

F('sp-larynx-m', 'Laryngeal muscles: one opener, one tensor', [('out', '''
*Vagus n. (X)
  Superior laryngeal n.
    External laryngeal n. | runs with the superior thyroid a.
      *Cricothyroid {m} #ct | tilts the thyroid cartilage forward: tenses the vocal folds (pitch)
  Recurrent laryngeal n.
    *Inferior laryngeal n. #inl | the recurrent n. once it passes under the inferior constrictor
      *Posterior crico-arytenoid {m} #pca | the ONLY abductor: opens the rima glottidis
      Lateral crico-arytenoid {m} | adducts
      Transverse + oblique arytenoids {m} | close the back of the rima
      Thyro-arytenoid + vocalis {m} | relax + fine-tune the folds
Rima glottidis {o} #rima
''')], kind='n', links=[('pca', 'rima', 'opens', 'rel')])

F('sp-larynx-in', 'Inside the larynx, from the inlet down', [('out', '''
Laryngeal inlet {o} | rimmed by the aryepiglottic folds
  Vestibule
    *Vestibular fold (false vocal cord) {t} #vest | protective; the rima vestibuli lies between them
      Laryngeal ventricle | recess between the two folds
        *Vocal fold {t} #vf | vocal ligament + vocalis: makes the voice
          *Rima glottidis {o} #rima | gap between the vocal folds; narrowest part of the adult airway
            Infraglottic cavity | down to the trachea
Laryngopharynx
  *Piriform recess {o} #pir | either side of the inlet; fish bones lodge here
Internal laryngeal n. {n} #iln | sensation above the vocal folds; cough reflex
''')], kind='c', orient='v', links=[('iln', 'pir', 'under its mucosa', 'rel')])

# ===================================================================== RS I · lab 2 thoracic wall, mediastinum
F('sp-thor-wall', 'Thoracic wall: the skeleton and the muscles of a space', [('out', '''
*Intercostal n. (ventral ramus) {n} #icn | supplies every muscle of its space
  *External intercostal #eic | fibres down + forward ("hands in pockets"); raises the ribs: inspiration
  *Internal intercostal #iic | fibres down + back; forced expiration
  *Innermost intercostal #inn | same direction as internal; the intercostal bundle runs between the two
  *Transversus thoracis #tt | back of the sternum → costal cartilages 2–6
'''), ('out', '''
Thoracic skeleton {b}
  *Sternum {b} #st | manubrium + body + xiphoid; sternal angle = 2nd costal cartilage (T4/5)
  *Rib / costal cartilage {b} #rib | 1–7 true · 8–10 false · 11–12 floating
    Costal groove {o} #cg | under each rib: intercostal vein, artery, nerve (VAN), top to bottom
''')], kind='m')

F('sp-pericardium', 'Pericardium: the sac around the heart', [('out', '''
*Fibrous pericardium #fp | tough outer sac; fused below to the central tendon of the diaphragm
  Serous pericardium · parietal layer | lines the fibrous sac
    Pericardial cavity {c} | a film of fluid; blood here = tamponade
      Serous pericardium · visceral layer (epicardium) | on the heart surface
        *Heart {t} #heart
Phrenic n. (C3–C5) {n} #ph | runs down on the fibrous pericardium; sensory to it (pain felt at the shoulder)
''')], kind='d', links=[('ph', 'fp', 'runs on + supplies', 'rel')])

# ===================================================================== RS I · lab 3 lungs, posterior mediastinum
F('sp-trachea', 'Trachea, carina and the main bronchi', [('out', '''
*Trachea #tr | C6 → sternal angle; C-shaped cartilages open at the back (trachealis)
  *Bifurcation of trachea #bif | at the sternal angle (T4/5)
    *Carina #car | the keel inside the bifurcation; the most sensitive cough spot
    *Right main bronchus #rmb | shorter, wider, more vertical: inhaled objects go right
      *Eparterial bronchus (right superior lobar) #ep | leaves above the right pulmonary a.
      Bronchus intermedius
        *Hyparterial bronchi (middle + inferior lobar) #hyp | below the pulmonary a.
    *Left main bronchus #lmb | longer; under the aortic arch, in front of the oesophagus
''')], kind='r')

F('sp-pleura', 'Pleura and the pulmonary ligament', [('out', '''
*Parietal pleura #pp | lines the chest wall, mediastinum, diaphragm; pain-sensitive (intercostal + phrenic nn.)
  Root of the lung {t} | the pleura turns back on itself around the hilum
    Visceral pleura | covers the lung; no pain fibres
    *Pulmonary ligament #pl | the empty lower fold of that sleeve, hanging below the hilum
  Pleural cavity {c} | a film of fluid; air = pneumothorax, fluid = effusion
    Costodiaphragmatic recess {c} | the lowest point: fluid collects here
''')], kind='d')

# ===================================================================== structure -> maps
MAP = {
 # NS lab 1
 'splenius-capitis': [('sp-back-m', 'Splenius capitis')], 'splenius-cervicis': [('sp-back-m', 'Splenius cervicis')],
 'semispinalis': [('sp-back-m', 'Semispinalis'), ('subocc-n', ['Semispinalis capitis', 'Semispinalis capitis (pierces it)'])],
 'iliocostalis': [('sp-back-m', 'Iliocostalis')], 'multifidus': [('sp-back-m', 'Multifidus')], 'rotatores': [('sp-back-m', 'Rotatores')],
 'facet-joint': [('sp-col-joints', 'fj')], 'lig-flavum': [('sp-col-joints', 'lf'), ('sp-lp', 'lf')], 'drg': [('sp-drg', 'drg')],
 'denticulate': [('sp-cord-end', 'dl')], 'conus': [('sp-cord-end', 'conus')], 'cauda': [('sp-cord-end', 'ce'), ('sp-lp', 'Cauda equina')],
 'filum': [('sp-cord-end', ['fi', 'Filum terminale externum'])],
 # NS lab 2
 'buccinator': [('sp-cheek', 'bu')], 'zygomatic-br': [('cn7', 'Zygomatic')], 'facial-a': [('facial-a', 'Facial a.'), ('carotid', 'Facial a.')],
 'parotid-duct': [('sp-cheek', 'pd')], 'ajv': [('sp-neck-veins', 'ajv')], 'cn11': [('cn11', ['Spinal root of XI', 'Posterior triangle'])],
 'scm': [('cn11', 'Sternocleidomastoid')], 'sternohyoid': [('ansa', 'Sternohyoid')], 'omohyoid': [('ansa', 'Superior + inferior belly of omohyoid')],
 'sternothyroid': [('ansa', 'Sternothyroid')], 'thyrohyoid': [('ansa', 'Thyrohyoid')], 'digastric-ant': [('sp-suprahyoid', 'ad')],
 'digastric-post': [('sp-suprahyoid', 'pd'), ('cn7', 'Posterior belly of digastric + stylohyoid')],
 'stylohyoid': [('sp-suprahyoid', 'sh'), ('cn7', 'Posterior belly of digastric + stylohyoid')],
 'thyroid-isthmus': [('sp-thyroid', 'isth'), ('thy-v', 'Lower pole + isthmus')], 'pyramidal-lobe': [('sp-thyroid', 'pyr')],
 'thyroid': [('sp-thyroid', 'lobes'), ('thy-a', ['Upper pole of thyroid', 'Lower pole + parathyroids'])],
 'sup-thyroid-a': [('thy-a', 'Superior thyroid a.'), ('carotid', 'Superior thyroid a.')],
 # NS lab 3
 'temporalis': [('sp-mastication', 'Temporalis')], 'masseter': [('sp-mastication', 'Masseter')],
 'med-pterygoid': [('sp-mastication', 'Medial pterygoid')], 'lat-pterygoid': [('sp-mastication', 'lp')],
 'maxillary-a': [('maxa', 'Maxillary a.'), ('carotid', 'Maxillary a.')], 'mma': [('mma', 'Middle meningeal a.'), ('maxa', 'Middle meningeal a.')],
 'auriculotemporal': [('v3', 'Auriculotemporal n.'), ('parotid-pns', 'Auriculotemporal n. (V3)')],
 'chorda': [('chorda', 'Chorda tympani'), ('cn7', 'Chorda tympani')], 'lingual-n': [('v3', 'Lingual n.'), ('tongue-n', 'ln')],
 'ian': [('v3', 'Inferior alveolar n.')], 'tmj-disc': [('sp-mastication', 'disc')],
 # NS lab 4
 'mylohyoid': [('sp-suprahyoid', 'mh')], 'geniohyoid': [('sp-suprahyoid', 'gh'), ('ansa', 'Geniohyoid')], 'genioglossus': [('sp-tongue-m', 'gg')],
 'smg-duct': [('sp-smg', 'smd')], 'smg': [('sp-smg', 'smg'), ('chorda', 'Submandibular gland')], 'hyoglossus': [('sp-tongue-m', 'hg')],
 'lingual-a': [('lingual-a', 'Lingual a.'), ('sp-tongue-m', 'la')], 'cn12-neck': [('sp-tongue-m', 'xii'), ('ansa', 'xii')],
 'styloglossus': [('sp-tongue-m', 'sg')], 'cn9': [('tongue-n', 'Glossopharyngeal n. (IX)'), ('pharynx-n', 'Glossopharyngeal n. (IX)')],
 # NS lab 5
 'ansa': [('ansa', 'ansa'), ('cerv-plexus', 'Ansa cervicalis (C1–C3)')], 'int-sln': [('larynx-nv', 'iln'), ('vagus', 'Internal laryngeal n.')],
 'cca': [('carotid', 'Common carotid a.'), ('arch', ['Right common carotid a.', 'Left common carotid a.'])],
 'ica': [('carotid', 'Internal carotid a.'), ('willis', 'ica')], 'eca': [('carotid', 'External carotid a.')],
 'ijv': [('ijv', 'ijv'), ('sinuses', 'ijv')], 'vagus-neck': [('vagus', 'Vagus n. (X)'), ('larynx-nv', 'Vagus n. (X)')],
 'symp-trunk-neck': [('horner', 'Cervical sympathetic trunk')], 'sup-cerv-gang': [('horner', 'Superior cervical ganglion (C2)')],
 'mid-cerv-gang': [('horner', 'Middle (C6) + stellate (C7–T1) ganglia')], 'ant-scalene': [('sp-scalene', 'as')],
 'phrenic-neck': [('phrenic', 'Phrenic n.'), ('sp-scalene', 'ph')], 'subclavian-a': [('subclavian', 'Subclavian a.'), ('sp-scalene', 'sa')],
 'subclavian-v': [('ijv', 'Subclavian v.'), ('sp-scalene', 'sv')],
 'vertebral-a': [('subclavian', 'Vertebral a.'), ('vert-a', ['V1 · pre-foraminal', 'V2 · foraminal'])],
 'ita-neck': [('subclavian', 'Internal thoracic a.'), ('icos-a', 'Internal thoracic a.')],
 'rln-neck': [('vagus', 'Recurrent laryngeal n.'), ('larynx-nv', 'rln')],
 'inf-thyroid-a': [('subclavian', 'Inferior thyroid a.'), ('thy-a', 'Inferior thyroid a.')],
 # NS lab 6
 'dura': [('sp-meninges', 'dura'), ('mma', 'Meningeal brs of V1, V2, V3')], 'tentorium': [('sp-meninges', 'tent')],
 'diaphragma-sellae': [('sp-meninges', 'ds')], 'arachnoid-gran': [('sp-meninges', 'ag')],
 'cn3': [('sp-orbit-n', 'cn3'), ('fossa-am', 'III, IV, VI')], 'cn4': [('sp-orbit-n', 'cn4'), ('fossa-am', 'III, IV, VI')],
 'cn6': [('sp-orbit-n', 'cn6'), ('fossa-am', 'III, IV, VI')],
 'cn7-brain': [('fossa-p', 'Facial (VII) + vestibulocochlear (VIII) nn.'), ('cn7', 'Facial n. (VII)')],
 'cn8': [('fossa-p', 'Facial (VII) + vestibulocochlear (VIII) nn.')],
 'cn12-brain': [('fossa-p', 'Hypoglossal n. (XII)'), ('tongue-n', 'Hypoglossal n. (XII)')],
 'transverse-sinus': [('sinuses', 'ts')], 'cavernous': [('sinuses', 'cs'), ('facial-v', 'cs')],
 'bridging': [('sinuses', 'Superior cerebral (bridging) vv.'), ('bleeds', 'Bridging (superior cerebral) vv.')],
 'basilar': [('willis', 'ba'), ('vert-a', 'Basilar a.')], 'mca': [('willis', 'Middle cerebral a.')],
 # NS lab 7
 'lat-rectus': [('sp-orbit-n', 'lr')], 'cn6-orbit': [('sp-orbit-n', 'cn6'), ('fossa-am', 'III, IV, VI')], 'lps': [('sp-orbit-n', 'lps')],
 'frontal-n': [('sp-v1', 'fn'), ('fossa-am', 'V1: lacrimal, frontal, nasociliary')], 'sup-oblique': [('sp-orbit-n', 'so')],
 'ophthalmic-a': [('fossa-am', 'Ophthalmic a.'), ('scalp-a', 'Ophthalmic a.')], 'cn2': [('fossa-am', 'Optic n. (II)')],
 'cornea': [('sp-globe', 'co'), ('sp-v1', 'lcn')], 'iris': [('sp-globe', 'ir')], 'lens': [('sp-globe', 'le')], 'sclera': [('sp-globe', 'sc')],
 # RS lab 1
 'septum': [('sp-nose-walls', 'sep'), ('nose-a', 'Kiesselbach (Little) area')], 'frontal-sinus': [('sinus-drain', 'Frontal sinus')],
 'maxillary-sinus': [('sinus-drain', 'Maxillary sinus')], 'sphenoid-sinus': [('sinus-drain', 'Sphenoidal sinus')],
 'ethmoid-sinus': [('sinus-drain', ['Anterior ethmoidal cells', 'Middle ethmoidal cells', 'Posterior ethmoidal cells'])],
 'sup-concha': [('sp-nose-walls', 'sc')], 'mid-concha': [('sp-nose-walls', 'mc')], 'inf-concha': [('sp-nose-walls', 'ic')],
 'sup-meatus': [('sinus-drain', 'Superior meatus'), ('sp-nose-walls', 'sm')], 'mid-meatus': [('sinus-drain', 'mm'), ('sp-nose-walls', 'mm')],
 'inf-meatus': [('sinus-drain', 'Inferior meatus'), ('sp-nose-walls', 'im')], 'hiatus': [('sinus-drain', 'hs')],
 'bulla': [('sinus-drain', 'Ethmoidal bulla')], 'sinus-opening': [('sinus-drain', ['hs', 'Ethmoidal bulla', 'Superior meatus', 'Spheno-ethmoidal recess'])],
 'tube-opening': [('sp-nasopharynx', 'to')], 'torus': [('sp-nasopharynx', 'tt')], 'pharyngeal-recess': [('sp-nasopharynx', 'pr')],
 'cricothyroid': [('sp-larynx-m', 'ct')], 'piriform': [('sp-larynx-in', 'pir')], 'pca': [('sp-larynx-m', 'pca')],
 'inf-laryngeal-n': [('sp-larynx-m', 'inl'), ('vagus', 'Inferior laryngeal n.')], 'vestibular-fold': [('sp-larynx-in', 'vest')],
 'vocal-fold': [('sp-larynx-in', 'vf')], 'rima': [('sp-larynx-in', 'rima'), ('sp-larynx-m', 'rima')],
 # RS lab 2
 'sternum': [('sp-thor-wall', 'st')], 'rib': [('sp-thor-wall', 'rib')], 'ext-ic': [('sp-thor-wall', 'eic')], 'int-ic': [('sp-thor-wall', 'iic')],
 'int-thoracic': [('icos-a', 'Internal thoracic a.'), ('icos-v', 'Internal thoracic vv.')], 'transversus-thoracis': [('sp-thor-wall', 'tt')],
 'innermost-ic': [('sp-thor-wall', 'inn')],
 'post-ic-vessels': [('icos-a', 'pia'), ('icos-v', ['Right posterior intercostal vv. 4–11', 'Left posterior intercostal vv. 5–8', 'Left posterior intercostal vv. 9–11'])],
 'ic-nerve': [('icos-n', 'Intercostal n. (ventral ramus)'), ('sp-thor-wall', 'icn')], 'aortic-arch': [('arch', 'Aortic arch')],
 'bct': [('arch', 'Brachiocephalic trunk')], 'vagus-thorax': [('thorax-n', 'x')],
 'lrln': [('thorax-n', 'Left recurrent laryngeal n.'), ('vagus', 'Recurrent laryngeal n.')],
 'phrenic-thorax': [('phrenic', 'Phrenic n.'), ('thorax-n', 'Phrenic n. (C3–C5)')],
 'thoracic-duct': [('thor-lymph', 'Thoracic duct'), ('neck-lymph', 'Thoracic duct')],
 'heart': [('sp-pericardium', 'heart'), ('pulm-circ', ['Right ventricle', 'Left atrium'])], 'pericardium': [('sp-pericardium', 'fp')],
 # RS lab 3
 'pulm-a': [('pulm-circ', ['Pulmonary trunk', 'Right pulmonary a.', 'Left pulmonary a.'])], 'pulm-v': [('pulm-circ', 'Pulmonary vv. x4')],
 'trachea': [('sp-trachea', 'tr'), ('bronchi', 'Trachea')], 'bifurcation': [('sp-trachea', 'bif')], 'carina': [('sp-trachea', 'car')],
 'main-bronchus': [('sp-trachea', ['rmb', 'lmb']), ('bronchi', ['Right main bronchus', 'Left main bronchus'])], 'pulm-lig': [('sp-pleura', 'pl')],
 'eparterial': [('sp-trachea', 'ep'), ('bronchi', 'Right superior lobar (eparterial)')],
 'hyparterial': [('sp-trachea', 'hyp'), ('bronchi', ['Middle lobar', 'Right inferior lobar'])],
 'symp-trunk-thorax': [('thorax-n', 'Thoracic sympathetic trunk')], 'stellate': [('horner', 'Middle (C6) + stellate (C7–T1) ganglia')],
 'gsn': [('thorax-n', 'Greater splanchnic n.'), ('diaph-open', 'Greater + lesser splanchnic nn.')],
 'azygos': [('icos-v', 'az'), ('bronch-v', 'Azygos v.')],
}
