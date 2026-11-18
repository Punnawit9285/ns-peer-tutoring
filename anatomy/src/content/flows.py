# Connection flowcharts (nerves, arteries, veins, lymph, airways) shown next to the handout figure on concept cards
# and next to the cadaver photo on cadaver steps. Syntax: see flowsvg.py.  th = what to say (Thai) in the tutor deck.

FLOWS = {}
def F(fid, title, blocks, kind='a', orient='h', links=(), th='', how=''):
    FLOWS[fid] = dict(title=title, blocks=blocks, kind=kind, orient=orient, links=list(links), th=th, how=how)

# ===================================================================== NS I · B back
F('b-nerve', 'Spinal nerve branches to the back and the column', [('out', '''
*Spinal nerve | in the intervertebral foramen
  *Posterior (dorsal) ramus
    Medial branch | facet joint, multifidus, rotatores, interspinales
    Lateral branch | iliocostalis, longissimus, skin of the back
  Anterior (ventral) ramus | plexuses, intercostal nn.
  *Recurrent meningeal (sinuvertebral) n. | back through the foramen
    PLL, annulus of disc, dura {t}
  Rami communicantes | to the sympathetic trunk
''')], kind='n', th='เส้นประสาทไขสันหลังออกจาก intervertebral foramen แล้วแตก 4 ทาง: dorsal ramus ไปกล้ามเนื้อหลังชั้นลึกและ facet joint, ventral ramus ไปแขนขาและผนังลำตัว, sinuvertebral nerve วกกลับเข้า canal ไปเลี้ยง PLL หมอนรองกระดูกและ dura (ที่มาของปวดหลังจาก disc), และ rami communicantes ไป sympathetic trunk')

F('b-vessels', 'Vessels of the vertebral column', [('out', '''
*Segmental a. | vertebral, ascending cervical, posterior intercostal, lumbar
  Dorsal branch
    *Spinal branch | enters the intervertebral foramen
      Vertebral body + laminae {t}
      Radicular + segmental medullary aa. | to the cord
    Deep back muscles {t}
'''), ('in', '''
Segmental veins | vertebral, intercostal, lumbar
  Intervertebral v. | through the foramen
    *Internal vertebral venous plexus {v} #ivp | epidural, valveless
      Basivertebral vv. {v} | from the vertebral body
  External vertebral venous plexus {v} #evp
''')], kind='a', links=[('ivp', 'evp', 'valveless')],
  th='แดง: segmental artery ให้ dorsal branch แล้ว spinal branch เข้า intervertebral foramen เลี้ยงตัวกระดูกและไขสันหลัง. ดำ: basivertebral vein → internal vertebral venous plexus (อยู่ใน epidural space ไม่มีลิ้น) → intervertebral vein → segmental veins; plexus ในและนอกเชื่อมกันจึงเป็นทางแพร่มะเร็งไปกระดูกสันหลัง')

F('vert-a', 'Vertebral artery: four parts', [('out', '''
Subclavian a. (1st part)
  *V1 · pre-foraminal | runs up to the C6 transverse foramen
    *V2 · foraminal | transverse foramina C6–C1
      *V3 · atlantic | groove on the posterior arch of atlas, suboccipital triangle
        *V4 · intracranial | pierces dura, foramen magnum
          PICA + spinal aa.
          *Basilar a. | joins the other vertebral at the pons
''')], kind='a', orient='v',
  th='Vertebral artery แบ่ง 4 ส่วน: V1 จาก subclavian ขึ้นไปเข้า transverse foramen ของ C6, V2 วิ่งใน transverse foramina C6-C1, V3 วนบนร่องของ posterior arch ของ atlas ผ่าน suboccipital triangle (จุดที่เห็นใน spot), V4 แทง dura เข้า foramen magnum แล้วรวมกับอีกข้างเป็น basilar')

F('subocc-n', 'Nerves of the suboccipital region', [('out', '''
*C1 posterior ramus = suboccipital n. | motor only, in the triangle
  Rectus capitis posterior major + minor {t}
  Obliquus capitis superior + inferior {t}
  Semispinalis capitis {t}
*C2 posterior ramus = greater occipital n. | below obliquus capitis inferior
  Semispinalis capitis (pierces it) {t}
  Skin of the back of the scalp {t}
C3 posterior ramus = third occipital n.
  Skin of the lower occiput {t}
''')], kind='n',
  th='C1 dorsal ramus (suboccipital nerve) มีแต่ motor เลี้ยงกล้ามเนื้อ suboccipital ทั้งหมด. C2 dorsal ramus (greater occipital) โผล่ใต้ obliquus capitis inferior แทง semispinalis capitis ขึ้นไปเลี้ยงผิวหนังท้ายทอย. C3 = third occipital ผิวหนังท้ายทอยส่วนล่าง')

# ===================================================================== NS I · S spinal cord
F('spinal-nerve', 'Roots join, rami leave', [('out', '''
Spinal cord segment {t}
  Dorsal rootlets | posterolateral sulcus
    *Dorsal root | carries the dorsal root ganglion (sensory cell bodies)
      *Spinal nerve #sn | mixed, in the intervertebral foramen
        *Dorsal ramus | back muscles + skin
        *Ventral ramus | limbs, trunk wall, plexuses
        Meningeal branch
        White + grey rami communicantes | sympathetic trunk
  Ventral rootlets | anterolateral sulcus
    *Ventral root | motor (+ preganglionic sympathetic T1–L2)
      Spinal nerve #sn
''')], kind='n',
  th='Dorsal root (sensory มีปม DRG) กับ ventral root (motor) รวมกันเป็น spinal nerve ซึ่งเป็นเส้นผสม แล้วแยกทันทีเป็น dorsal ramus (หลัง) และ ventral ramus (แขนขา ลำตัว) — ราก = ทางเดียว, ramus = ผสม')

F('cord-art', 'Arteries of the spinal cord', [('out', '''
*Vertebral aa. (both)
  *Anterior spinal a. (1) | anterior fissure; anterior 2/3
  *Posterior spinal aa. (2) | posterolateral; posterior 1/3 (dorsal columns)
*Segmental aa. | vertebral, ascending cervical, posterior intercostal, lumbar
  Spinal branch | intervertebral foramen
    Radicular aa. | supply the roots only
    *Segmental medullary aa. | reach and reinforce the spinal aa.
      Great radicular a. (Adamkiewicz) | usually left T9–L2
''')], kind='a',
  th='Anterior spinal artery (1 เส้น จาก vertebral สองข้าง) เลี้ยง 2/3 หน้า; posterior spinal arteries (2 เส้น) เลี้ยง 1/3 หลัง. ไปได้ไม่ตลอดความยาว จึงต้องมี segmental medullary arteries จาก segmental arteries มาเติม — เส้นใหญ่สุดคือ Adamkiewicz')

F('cord-vein', 'Veins of the spinal cord', [('in', '''
Segmental veins | vertebral, intercostal, lumbar
  Intervertebral v.
    *Internal vertebral venous plexus | epidural space, valveless
      Radicular vv.
        Anterior + posterior spinal vv. | on the cord
  External vertebral plexus #ext
''')], kind='v',
  th='เลือดดำจากไขสันหลัง: spinal veins → radicular veins → internal vertebral venous plexus ใน epidural space → intervertebral vein → segmental veins และ external plexus')

# ===================================================================== NS I · K skull
F('fossa-am', 'Anterior + middle cranial fossa: what goes through each hole', [('out', '''
Anterior cranial fossa {c}
  Cribriform plate {o}
    *Olfactory nn. (I) {n}
Middle cranial fossa {c}
  Optic canal {o}
    *Optic n. (II) {n}
    Ophthalmic a. {a}
  *Superior orbital fissure {o}
    III, IV, VI {n}
    V1: lacrimal, frontal, nasociliary {n}
    Superior ophthalmic v. {v}
  *Foramen rotundum {o}
    Maxillary n. (V2) {n}
  *Foramen ovale {o}
    Mandibular n. (V3) {n}
    Lesser petrosal n. {n}
    Emissary v. (pterygoid plexus) {v}
  *Foramen spinosum {o}
    Middle meningeal a. {a}
  Carotid canal {o}
    Internal carotid a. + sympathetic plexus {a}
''')], kind='o',
  th='จำรูตามแอ่ง: anterior fossa มีแค่ cribriform plate (CN I). Middle fossa: optic canal (II + ophthalmic a.), superior orbital fissure (III, IV, V1, VI + superior ophthalmic v.), rotundum (V2), ovale (V3), spinosum (middle meningeal a.) — rotundum, ovale, spinosum เรียงเป็นแนวโค้งจากหน้าไปหลัง')

F('fossa-p', 'Posterior cranial fossa: what goes through each hole', [('out', '''
Posterior cranial fossa {c}
  Internal acoustic meatus {o}
    *Facial (VII) + vestibulocochlear (VIII) nn. {n}
    Labyrinthine a. {a}
  *Jugular foramen {o}
    *IX, X, XI {n}
    Sigmoid sinus → internal jugular v. {s}
    Inferior petrosal sinus {s}
  *Hypoglossal canal {o}
    Hypoglossal n. (XII) {n}
  *Foramen magnum {o}
    Medulla → spinal cord {t}
    Vertebral aa. + spinal aa. {a}
    Spinal root of XI (ascending) {n}
''')], kind='o',
  th='Posterior fossa: internal acoustic meatus (VII, VIII), jugular foramen (IX, X, XI + sigmoid sinus กลายเป็น IJV), hypoglossal canal (XII), foramen magnum (medulla, vertebral aa., spinal root ของ XI ที่ขึ้นมา)')

# ===================================================================== NS I · F superficial face & neck
F('facial-a', 'Facial artery and its branches', [('out', '''
External carotid a.
  *Facial a. | under the submandibular gland, over the mandible at masseter
    Tonsillar a. | neck part
    Submental a. | neck part
    Inferior labial a.
    *Superior labial a.
      Septal branch | to Kiesselbach area
    Lateral nasal a.
    *Angular a. #ang | end branch, medial angle of the eye
Internal carotid a.
  Ophthalmic a.
    Dorsal nasal a. #dn
''')], kind='a', links=[('ang', 'dn', 'ICA–ECA anastomosis')],
  th='Facial artery จาก ECA วนใต้ submandibular gland ข้ามขอบล่าง mandible ที่ขอบหน้า masseter (คลำชีพจรได้) ให้ inferior labial, superior labial, lateral nasal แล้วสิ้นสุดเป็น angular artery ซึ่งต่อกับ dorsal nasal ของ ophthalmic (ICA) — เป็นทางเชื่อม ECA กับ ICA')

F('facial-v', 'Facial vein and the danger triangle', [('in', '''
*Internal jugular v.
  Common facial v.
    *Facial v. #fv | no effective valves
      Angular v. #angv | medial angle of the eye
        Supratrochlear + supra-orbital vv.
      Deep facial v. #dfv
    Retromandibular v. (anterior division)
'''), ('in', '''
*Cavernous sinus {s} #cs
  *Superior ophthalmic v. #sov | through the superior orbital fissure
  Emissary v. | through foramen ovale #emv
'''), ('in', '''
Maxillary v.
  *Pterygoid venous plexus #pp | around lateral pterygoid
''')], kind='v', links=[('angv', 'sov', 'connects'), ('dfv', 'pp', 'connects'), ('pp', 'emv', '')],
  th='เลือดจากใบหน้าไหลลง facial vein → common facial → IJV แต่ facial vein ไม่มีลิ้นที่ได้ผล: angular vein ต่อกับ superior ophthalmic vein และ deep facial vein ต่อกับ pterygoid plexus ซึ่งมี emissary vein ผ่าน foramen ovale ไป cavernous sinus — เชื้อจาก danger triangle จึงย้อนเข้า cavernous sinus ได้ 2 ทาง')

F('cn7', 'Facial nerve (CN VII): course and branches', [('out', '''
*Facial n. (VII) | internal acoustic meatus → facial canal
  Greater petrosal n. | at the geniculate ganglion
    Pterygopalatine ganglion {g} | lacrimal, nasal + palatal glands
  Nerve to stapedius
  *Chorda tympani | taste ant. 2/3 + submandibular/sublingual
    Lingual n. (joins V3) #ln
  *Stylomastoid foramen {o} | leaves the skull
    Posterior auricular n. | occipitalis, auricular mm.
    Posterior belly of digastric + stylohyoid {t}
    *Parotid plexus | inside the gland, superficial to the vessels
      Temporal
      Zygomatic
      Buccal
      Marginal mandibular
      Cervical | platysma
''')], kind='n',
  th='CN VII เข้า internal acoustic meatus วิ่งใน facial canal ระหว่างทางให้ greater petrosal (ต่อมน้ำตา), nerve to stapedius, chorda tympani (รส 2/3 หน้า + ต่อมใต้ขากรรไกร/ใต้ลิ้น) แล้วออก stylomastoid foramen ให้ posterior auricular และกิ่งไป posterior belly digastric + stylohyoid ก่อนเข้า parotid แตก 5 กิ่ง T-Z-B-M-C ไปกล้ามเนื้อสีหน้า')

F('parotid-pns', 'Secretomotor supply of the parotid (IX)', [('out', '''
Inferior salivatory nucleus {t}
  *Glossopharyngeal n. (IX) | jugular foramen
    Tympanic n. (Jacobson) | tympanic plexus, middle ear
      *Lesser petrosal n. | leaves via foramen ovale
        *Otic ganglion {g} | synapse; medial to V3 below foramen ovale
          *Auriculotemporal n. (V3) | carries the postganglionic fibres
            Parotid gland {t}
''')], kind='n', orient='v',
  th='ใยประสาทสั่งน้ำลาย parotid เริ่มจาก inferior salivatory nucleus → IX → tympanic nerve → lesser petrosal nerve (ออก foramen ovale) → synapse ที่ otic ganglion → postganglionic อาศัย auriculotemporal nerve (V3) ไปที่ parotid. จำว่า "IX ทำงาน แต่ V3 เป็นรถขนส่ง"')

F('face-sens', 'Sensory nerves of the face and scalp front', [('out', '''
*Trigeminal n. (V) | trigeminal ganglion
  *V1 ophthalmic
    Supra-orbital + supratrochlear
    Infratrochlear, lacrimal
    External nasal
  *V2 maxillary
    *Infra-orbital | infra-orbital foramen
    Zygomaticofacial + zygomaticotemporal
  *V3 mandibular
    Auriculotemporal
    Buccal
    *Mental | mental foramen
Cervical plexus (C2–C3)
  *Great auricular | angle of jaw, over the parotid
  Lesser occipital (C2)
''')], kind='n',
  th='ผิวหนังใบหน้ารับความรู้สึกจาก V1 (หน้าผาก จมูก), V2 (แก้ม ริมฝีปากบน ผ่าน infra-orbital), V3 (ขมับ แก้มล่าง คาง ผ่าน mental). มุมขากรรไกรไม่ใช่ V แต่เป็น great auricular (C2-C3)')

F('ejv', 'Superficial veins: retromandibular split, EJV and IJV', [('in', '''
*Brachiocephalic v.
  *Internal jugular v. #ijv
    Common facial v. #cfv
      Facial v.
      Anterior division #ad
  Subclavian v.
    *External jugular v. #ejv | crosses SCM superficially
      Posterior auricular v.
      Posterior division #pd
'''), ('in', '''
*Retromandibular v. #rmv | inside the parotid
  Superficial temporal v.
  Maxillary v. | from the pterygoid plexus
'''), ('out', '''
Retromandibular v. #rmv
  Anterior division #ad
  Posterior division #pd
''')], kind='v',
  th='Superficial temporal + maxillary vein รวมเป็น retromandibular vein ใน parotid แล้วแยก 2 division: anterior ไปรวม facial vein เป็น common facial → IJV; posterior ไปรวม posterior auricular เป็น EJV ที่ข้ามผิว SCM ลง subclavian vein')

F('cerv-plexus', 'Cervical plexus (C1–C4)', [('out', '''
*Cervical plexus (C1–C4 ventral rami)
  *Cutaneous: emerge at Erb point | midpoint of posterior border of SCM
    Lesser occipital (C2)
    *Great auricular (C2–C3)
    Transverse cervical (C2–C3)
    Supraclavicular (C3–C4)
  *Ansa cervicalis (C1–C3) | strap muscles
  *Phrenic n. (C3–C5) | on anterior scalene → diaphragm
  To SCM + trapezius (C2–C4) | proprioception
''')], kind='n',
  th='Cervical plexus มีกิ่งผิวหนัง 4 เส้นโผล่ที่ Erb point (กึ่งกลางขอบหลัง SCM): lesser occipital, great auricular, transverse cervical, supraclavicular. กิ่ง motor สำคัญคือ ansa cervicalis (กล้ามเนื้อ strap) และ phrenic (C3-C5, กะบังลม)')

F('ansa', 'Ansa cervicalis and the C1 hitch-hikers on XII', [('out', '''
*C1 ventral ramus
  *Joins hypoglossal n. (XII) #xii | C1 fibres ride on XII
    *Superior root of ansa #sr | leaves XII as it hooks round the occipital a.
      *Ansa cervicalis #ansa | loop on the carotid sheath
        Superior + inferior belly of omohyoid {t}
        Sternohyoid {t}
        Sternothyroid {t}
    Nerve to thyrohyoid
      Thyrohyoid {t}
    Nerve to geniohyoid
      Geniohyoid {t}
C2–C3 ventral rami
  Inferior root of ansa
    Ansa cervicalis #ansa
''')], kind='n',
  th='ใย C1 อาศัยวิ่งไปกับ XII แล้วแยกเป็น superior root ของ ansa, nerve to thyrohyoid, nerve to geniohyoid. C2-C3 เป็น inferior root. สองรากรวมเป็นห่วง ansa cervicalis บน carotid sheath เลี้ยง omohyoid, sternohyoid, sternothyroid — thyrohyoid ไม่ได้มาจาก ansa')

F('cn11', 'Accessory nerve (XI): course', [('out', '''
*Spinal root of XI | C1–C5 segments
  Ascends through foramen magnum
    *Jugular foramen {o} | leaves the skull with IX, X
      Deep to posterior belly of digastric
        *Sternocleidomastoid {t} | supplies and pierces it
          *Posterior triangle | superficial on levator scapulae: biopsy risk
            *Trapezius {t}
''')], kind='n', orient='v',
  th='Spinal accessory nerve เกิดจาก C1-C5 ขึ้นทาง foramen magnum ออกทาง jugular foramen ลอดใต้ posterior belly digastric เลี้ยงและแทง SCM แล้ววิ่งตื้นข้าม posterior triangle ไปเลี้ยง trapezius — ตัดต่อมน้ำเหลืองตรงนี้แล้วบาดเจ็บได้ (ไหล่ตก ยักไหล่ไม่ได้)')

F('thy-a', 'Arteries of the thyroid gland', [('out', '''
External carotid a.
  *Superior thyroid a. | 1st anterior branch; runs with external laryngeal n.
    Superior laryngeal a. | pierces thyrohyoid membrane
    Upper pole of thyroid {t}
Subclavian a. (1st part)
  *Thyrocervical trunk
    *Inferior thyroid a. | crosses the recurrent laryngeal n.
      Inferior laryngeal a.
      Lower pole + parathyroids {t}
    Transverse cervical a.
    Suprascapular a.
Brachiocephalic trunk / aortic arch
  Thyroid ima a. | inconstant
''')], kind='a', links=[],
  th='ไทรอยด์ได้เลือดจาก superior thyroid a. (แขนงแรกหน้าของ ECA วิ่งคู่ external laryngeal n.) และ inferior thyroid a. (จาก thyrocervical trunk ไขว้กับ recurrent laryngeal n.) บางคนมี thyroid ima — ผูกหลอดเลือดผิดจุดจึงบาดเส้นประสาทกล่องเสียง')

F('thy-v', 'Veins of the thyroid gland', [('in', '''
*Internal jugular v.
  Superior thyroid v.
    Upper pole {t}
  Middle thyroid v.
    Lateral lobe {t}
*Left brachiocephalic v.
  Inferior thyroid vv. | plexus in front of the trachea
    Lower pole + isthmus {t}
''')], kind='v',
  th='Superior และ middle thyroid veins ลง IJV; inferior thyroid veins เป็นร่างแหหน้าหลอดลมลง brachiocephalic vein (ระวังตอนทำ tracheostomy)')

# ===================================================================== NS I · T infratemporal & TMJ
F('maxa', 'Maxillary artery: three parts', [('out', '''
External carotid a. | behind the neck of the mandible
  Superficial temporal a.
  *Maxillary a.
    *1st part · mandibular | behind lateral pterygoid
      Deep auricular + anterior tympanic
      *Middle meningeal a. | foramen spinosum
      Accessory meningeal a. | foramen ovale
      *Inferior alveolar a. | mandibular foramen → mental a.
    *2nd part · pterygoid | on lateral pterygoid
      Masseteric | mandibular notch
      Deep temporal
      Pterygoid branches
      Buccal
    *3rd part · pterygopalatine | into the pterygopalatine fossa
      Posterior superior alveolar
      Infra-orbital | → middle + anterior superior alveolar
      Descending palatine | → greater + lesser palatine
      A. of pterygoid canal
      Pharyngeal
      *Sphenopalatine | nasal cavity, Kiesselbach
''')], kind='a',
  th='Maxillary artery แยกจาก ECA หลัง neck of mandible ถูก lateral pterygoid แบ่ง 3 ส่วน: ส่วน 1 ให้ middle meningeal (foramen spinosum) และ inferior alveolar (ฟันล่าง); ส่วน 2 เลี้ยงกล้ามเนื้อบดเคี้ยว; ส่วน 3 เข้า pterygopalatine fossa ให้กิ่งไปฟันบน เพดาน และ sphenopalatine (เลือดกำเดาด้านหลัง)')

F('ptery', 'Pterygoid venous plexus and its connections', [('in', '''
*Retromandibular v. #rmv
  Superficial temporal v.
  *Maxillary v. | between neck of mandible and sphenomandibular lig.
    *Pterygoid venous plexus #pp | around lateral pterygoid
      Middle meningeal, deep temporal, masseteric, alveolar vv.
'''), ('in', '''
Facial v. #fv
  Deep facial v. #dfv
'''), ('in', '''
*Cavernous sinus {s} #cs
  Emissary v. | through foramen ovale #emv
''')], kind='v', links=[('pp', 'dfv', 'valveless'), ('pp', 'emv', 'valveless')],
  th='Pterygoid plexus รับเลือดจากกิ่งที่คู่กับ maxillary artery แล้วไหลออกทาง maxillary vein → retromandibular. มันเชื่อมกับ facial vein (deep facial vein) และ cavernous sinus (emissary vein ผ่าน foramen ovale) โดยไม่มีลิ้น → ทางแพร่เชื้อเข้ากะโหลก')

F('v3', 'Mandibular nerve (V3) and its branches', [('out', '''
*Mandibular n. (V3) | foramen ovale; motor + sensory
  Meningeal branch (nervus spinosus)
  Nerve to medial pterygoid | + tensor veli palatini, tensor tympani
  Anterior division | mostly motor
    Masseteric | through the mandibular notch
    Deep temporal
    Nerve to lateral pterygoid
    *Buccal n. | SENSORY to the cheek
  Posterior division | mostly sensory
    *Auriculotemporal n. | two roots around the MMA
    *Lingual n. | general sensation ant. 2/3 tongue
    *Inferior alveolar n. | mandibular foramen
      *Nerve to mylohyoid | mylohyoid + anterior digastric
      Dental branches | lower teeth
      *Mental n. | mental foramen: chin, lower lip
''')], kind='n', links=[],
  th='V3 ออก foramen ovale ให้ meningeal branch และ nerve to medial pterygoid ก่อน แล้วแยก anterior division (ส่วนใหญ่ motor ยกเว้น buccal nerve ที่รับความรู้สึก) และ posterior division (auriculotemporal, lingual, inferior alveolar). กิ่ง motor ที่ซ่อนอยู่ในฝั่ง sensory คือ nerve to mylohyoid')

F('v2', 'Maxillary nerve (V2) and its branches', [('out', '''
*Maxillary n. (V2) | foramen rotundum → pterygopalatine fossa
  *Pterygopalatine ganglion {g} | hangs from V2
    *Greater palatine n. | hard palate behind the canine
    Lesser palatine n. | soft palate
    *Nasopalatine n. | septum → incisive foramen
    Posterior lateral nasal brs
  Zygomatic n. | carries lacrimal secretomotor fibres
    Zygomaticotemporal + zygomaticofacial
  Posterior superior alveolar n. | upper molars
  *Infra-orbital n. | inferior orbital fissure → infra-orbital canal
    Middle + anterior superior alveolar nn.
    Lower eyelid, side of nose, upper lip {t}
''')], kind='n',
  th='V2 ออก foramen rotundum เข้า pterygopalatine fossa ห้อย pterygopalatine ganglion ที่ให้ greater/lesser palatine และ nasopalatine ไปเพดานและจมูก; กิ่ง zygomatic และ posterior superior alveolar; แล้วต่อเป็น infra-orbital nerve ไปฟันบนหน้าและผิวหนังแก้ม')

F('chorda', 'Chorda tympani: submandibular + sublingual secretomotor', [('out', '''
Superior salivatory nucleus {t}
  *Facial n. (VII) | nervus intermedius
    *Chorda tympani | crosses the middle ear, petrotympanic fissure
      *Joins the lingual n. (V3) | in the infratemporal fossa
        *Submandibular ganglion {g} | synapse; hangs from the lingual n.
          Submandibular gland {t}
          Sublingual gland {t}
''')], kind='n', orient='v',
  th='ใย parasympathetic ของต่อมใต้ขากรรไกรและใต้ลิ้น: superior salivatory nucleus → VII → chorda tympani (ผ่านหูชั้นกลาง) → เกาะไปกับ lingual nerve → synapse ที่ submandibular ganglion → ต่อม. chorda ยังพารสชาติ 2/3 หน้าของลิ้นด้วย')

# ===================================================================== NS I · O oral cavity
F('tongue-n', 'Nerves of the tongue', [('out', '''
Mandibular n. (V3)
  *Lingual n. #ln
    *General sensation · anterior 2/3 {t}
Facial n. (VII)
  *Chorda tympani #ct | travels in the lingual n.
    *Taste · anterior 2/3 {t}
*Glossopharyngeal n. (IX)
  *Sensation + taste · posterior 1/3 {t}
Vagus n. (X)
  Internal laryngeal n.
    Root near the epiglottis (vallecula) {t}
  Pharyngeal plexus
    *Palatoglossus {t} | the only tongue muscle not XII
*Hypoglossal n. (XII) | on hyoglossus
  *All other intrinsic + extrinsic muscles {t}
''')], kind='n', links=[('ct', 'ln', 'joins')],
  th='ลิ้นมีเส้นประสาท 4 เส้น: 2/3 หน้า ความรู้สึกทั่วไป = lingual (V3), รส = chorda tympani (VII) ที่อาศัย lingual; 1/3 หลัง ทั้งความรู้สึกและรส = IX; motor = XII ทุกมัดยกเว้น palatoglossus (X)')

F('lingual-a', 'Lingual artery', [('out', '''
External carotid a. | at the greater horn of the hyoid
  *Lingual a. | passes DEEP to hyoglossus (XII lies superficial)
    Suprahyoid branch
    Dorsal lingual aa. | posterior tongue, tonsil
    Sublingual a. | sublingual gland, floor of mouth
    *Deep lingual a. | under the tongue to the tip
''')], kind='a',
  th='Lingual artery แยกจาก ECA ระดับ greater horn ของ hyoid วิ่งลึกต่อ hyoglossus (XII กับ lingual vein อยู่ผิวนอก) ให้ dorsal lingual, sublingual และสิ้นสุดเป็น deep lingual ใต้ลิ้น')

F('palate-n', 'Nerves and arteries of the palate', [('out', '''
Maxillary n. (V2)
  Pterygopalatine ganglion {g}
    *Greater palatine n. | greater palatine foramen: hard palate
    Lesser palatine n. | soft palate
    *Nasopalatine n. | incisive foramen: behind the incisors
Maxillary a. (3rd part)
  Descending palatine a.
    *Greater palatine a. {a} | forward to the incisive canal
    Lesser palatine a. {a}
''')], kind='n',
  th='เพดานแข็งรับความรู้สึกจาก greater palatine nerve (ด้านหลัง canine) และ nasopalatine nerve (หลังฟันตัด ผ่าน incisive foramen) ทั้งคู่มาจาก V2 ผ่าน pterygopalatine ganglion; หลอดเลือดคือ greater palatine artery จาก descending palatine')

F('pharynx-n', 'Pharyngeal plexus and the palate muscles', [('out', '''
*Vagus n. (X) | motor
  *Pharyngeal plexus #pp | on the middle constrictor
    Superior, middle, inferior constrictors {t}
    Palatopharyngeus + salpingopharyngeus {t}
    Levator veli palatini, uvulae, palatoglossus {t}
*Glossopharyngeal n. (IX) | sensory to the pharynx
  Pharyngeal plexus #pp
  *Stylopharyngeus {t} | the only muscle of IX
Mandibular n. (V3)
  *Tensor veli palatini {t} | the only palate muscle not X
''')], kind='n',
  th='กล้ามเนื้อคอหอยและเพดานอ่อนเกือบทั้งหมดเลี้ยงโดย X ผ่าน pharyngeal plexus. ข้อยกเว้นที่ออกสอบ: stylopharyngeus = IX, tensor veli palatini = V3. IX ให้ความรู้สึกของคอหอย (gag reflex ขาเข้า)')

# ===================================================================== NS I · N deep neck
F('carotid', 'Common carotid and the external carotid branches', [('out', '''
*Common carotid a. | R: brachiocephalic trunk · L: aortic arch
  *Internal carotid a. | NO branches in the neck → carotid canal
  *External carotid a. | at upper border of thyroid cartilage (C4)
    *Superior thyroid a. | 1st, anterior
    Ascending pharyngeal a. | medial
    *Lingual a.
    *Facial a.
    Occipital a. | posterior; XII hooks under it
    Posterior auricular a.
    *Maxillary a. | terminal, in the parotid
    Superficial temporal a. | terminal, pulse in front of the ear
''')], kind='a',
  th='CCA แยกที่ขอบบน thyroid cartilage: ICA ไม่มีแขนงในคอ (ใช้แยก ICA กับ ECA ในการผ่าตัด/spot) ส่วน ECA ให้ 8 แขนง เรียงจากล่างขึ้นบน superior thyroid, ascending pharyngeal, lingual, facial, occipital, posterior auricular แล้วสิ้นสุดเป็น maxillary กับ superficial temporal')

F('arch', 'Aortic arch: three branches', [('out', '''
*Aortic arch | begins and ends at the sternal angle (T4/5)
  *Brachiocephalic trunk | right side only
    Right common carotid a.
    Right subclavian a.
  *Left common carotid a.
  *Left subclavian a.
''')], kind='a',
  th='Aortic arch ให้ 3 แขนง: brachiocephalic trunk (มีเฉพาะขวา แตกเป็น right CCA + right subclavian), left CCA, left subclavian — ไม่มี left brachiocephalic artery')

F('subclavian', 'Subclavian artery: three parts, six branches', [('out', '''
*Subclavian a. | R: brachiocephalic trunk · L: aortic arch
  *Vertebral a. | 1st part → C6 transverse foramen
  Internal thoracic a. | 1st part, down behind the costal cartilages
  *Thyrocervical trunk | 1st part, at the edge of anterior scalene
    Inferior thyroid a.
    Transverse cervical a.
    Suprascapular a.
  Costocervical trunk | 2nd part, behind anterior scalene
    Deep cervical + superior intercostal aa.
  Dorsal scapular a. | 3rd part (often)
''')], kind='a',
  th='Anterior scalene แบ่ง subclavian 3 ส่วน: ส่วนที่ 1 (ด้านใน) ให้ vertebral, internal thoracic, thyrocervical trunk; ส่วนที่ 2 (หลังกล้ามเนื้อ) ให้ costocervical trunk; ส่วนที่ 3 (ด้านนอก) ให้ dorsal scapular. Phrenic nerve วางบน anterior scalene ด้านหน้า')

F('ijv', 'Internal jugular vein and the venous angle', [('in', '''
*Brachiocephalic v.
  *Internal jugular v. #ijv | jugular foramen → carotid sheath
    Sigmoid sinus {s} | becomes the IJV at the jugular foramen
    Inferior petrosal sinus {s}
    Pharyngeal vv.
    *Common facial v.
    Lingual v.
    Superior + middle thyroid vv.
  Subclavian v. | in front of anterior scalene
    External jugular v.
  *Thoracic duct {l} | left venous angle
''')], kind='v',
  th='IJV เริ่มที่ jugular foramen (ต่อจาก sigmoid sinus) วิ่งใน carotid sheath รับ common facial, lingual, superior/middle thyroid veins แล้วรวม subclavian vein เป็น brachiocephalic vein ตรง venous angle ซึ่งด้านซ้ายรับ thoracic duct')

F('vagus', 'Vagus nerve (X) in the neck', [('out', '''
*Vagus n. (X) | jugular foramen → carotid sheath (behind, between a. and v.)
  Pharyngeal branch | → pharyngeal plexus
  *Superior laryngeal n.
    *Internal laryngeal n. | pierces thyrohyoid membrane; sensory above the vocal folds
    *External laryngeal n. | with superior thyroid a.; cricothyroid
  Cervical cardiac branches
  *Recurrent laryngeal n. | R: under subclavian a. · L: under aortic arch
    *Inferior laryngeal n. | tracheo-oesophageal groove
      All intrinsic laryngeal muscles except cricothyroid {t}
      Sensation below the vocal folds {t}
  Pulmonary + oesophageal plexuses | thorax
''')], kind='n',
  th='Vagus ในคอให้ pharyngeal branch, superior laryngeal (internal = ความรู้สึกเหนือสายเสียง แทง thyrohyoid membrane; external = cricothyroid วิ่งคู่ superior thyroid a.), cardiac branches และ recurrent laryngeal (ขวาวนใต้ subclavian ซ้ายวนใต้ aortic arch) ขึ้นมาในร่อง tracheo-esophageal กลายเป็น inferior laryngeal เลี้ยงกล้ามเนื้อกล่องเสียงที่เหลือทั้งหมด')

F('horner', 'Sympathetic pathway to the head (and Horner syndrome)', [('out', '''
Hypothalamus {t}
  *Lateral horn T1–T2 | out by ventral root + white ramus
    *Cervical sympathetic trunk | ascends behind the carotid sheath
      *Superior cervical ganglion (C2) {g} | synapse
        *Internal carotid plexus
          *Dilator pupillae {t} | lost → miosis
          *Superior tarsal m. {t} | lost → ptosis
        External carotid plexus
          *Facial sweat glands {t} | lost → anhidrosis
      Middle (C6) + stellate (C7–T1) ganglia {g} | heart, grey rami
''')], kind='n', orient='v',
  th='ทางของ sympathetic ไปศีรษะ: hypothalamus → lateral horn T1-T2 → white ramus → sympathetic trunk ขึ้นคอ → synapse ที่ superior cervical ganglion → ตาม internal carotid plexus ไป dilator pupillae และ superior tarsal และตาม external carotid plexus ไปต่อมเหงื่อ. ตัดตรงไหนก็ได้ Horner: ptosis, miosis, anhidrosis')

F('neck-lymph', 'Lymph drainage of the head and neck', [('in', '''
*Left venous angle {v} | IJV + subclavian
  *Thoracic duct {l} | from the cisterna chyli
  Left jugular trunk {l}
    *Deep cervical nodes {l} #dcn | along the IJV
      *Jugulodigastric {l} | tonsil
      Jugulo-omohyoid {l} | tongue
      Retropharyngeal {l}
      Superficial ring: submental, submandibular, parotid, mastoid, occipital {l}
Right venous angle {v}
  Right lymphatic duct {l}
    Right jugular + subclavian + bronchomediastinal trunks {l}
''')], kind='l',
  th='น้ำเหลืองศีรษะและคอผ่านวงต่อมน้ำเหลืองตื้น (submental, submandibular, parotid, mastoid, occipital) → deep cervical nodes ตาม IJV (jugulodigastric = ทอนซิล, jugulo-omohyoid = ลิ้น) → jugular trunk → thoracic duct (ซ้าย) หรือ right lymphatic duct (ขวา) → venous angle')

# ===================================================================== NS I · C cranial cavity
F('scalp-a', 'Arteries of the scalp: ICA and ECA', [('out', '''
*Internal carotid a.
  Ophthalmic a.
    Supratrochlear a. #sta
    Supra-orbital a. #soa
*External carotid a.
  *Superficial temporal a. #stt | frontal + parietal branches
  Posterior auricular a.
  Occipital a.
''')], kind='a', links=[('soa', 'stt', 'anastomose')],
  th='หนังศีรษะได้เลือดจาก 2 ระบบ: ICA (supratrochlear, supra-orbital ทางหน้าผาก) และ ECA (superficial temporal, posterior auricular, occipital) ซึ่งต่อกันมากมายใน connective tissue layer — แผลหนังศีรษะจึงเลือดออกมากและเส้นเลือดหดไม่ได้')

F('scalp-n', 'Nerves of the scalp', [('out', '''
Trigeminal n.
  V1 → supratrochlear + supra-orbital | forehead
  V2 → zygomaticotemporal | temple
  V3 → auriculotemporal | in front of the ear
Cervical nn.
  *C2 posterior ramus → greater occipital | back of the scalp
  C3 posterior ramus → third occipital
  C2 cervical plexus → lesser occipital | behind the ear
  C2–C3 cervical plexus → great auricular
''')], kind='n',
  th='หนังศีรษะหน้าหูรับความรู้สึกจาก V1, V2, V3; หลังหูจากเส้นประสาทคอ: greater occipital (C2 dorsal ramus), third occipital (C3), lesser occipital และ great auricular (cervical plexus)')

F('mma', 'Middle meningeal artery and the nerves of the dura', [('out', '''
Maxillary a. (1st part)
  *Middle meningeal a. | foramen spinosum; between bone and dura
    *Frontal (anterior) branch | under the pterion → epidural haematoma
    Parietal (posterior) branch
Trigeminal n.
  Meningeal brs of V1, V2, V3 {n} | anterior + middle fossa dura
C2–C3 {n}
  Via X and XII {n} | posterior fossa dura → neck/occipital pain
''')], kind='a',
  th='Middle meningeal artery จาก maxillary a. ผ่าน foramen spinosum วิ่งระหว่างกระดูกกับ dura; frontal branch อยู่ใต้ pterion จึงขาดง่ายเมื่อขมับแตก → epidural haematoma. Dura ด้านหน้า/กลางรับความรู้สึกจาก V; posterior fossa จาก C2-C3 (ปวดร้าวไปท้ายทอย)')

F('willis', 'Arteries of the brain: circle of Willis', [('out', '''
*Internal carotid a. #ica | cervical → petrous → cavernous → cerebral
  Ophthalmic a.
  *Posterior communicating a. #pcom
  Anterior choroidal a.
  *Anterior cerebral a. #aca | medial surface
    *Anterior communicating a. #acom | joins the two ACAs
  *Middle cerebral a. | largest; lateral sulcus
*Vertebral aa. (both) #va | foramen magnum
  PICA
  Anterior + posterior spinal aa.
  *Basilar a. #ba | pontomedullary junction
    AICA
    Labyrinthine a.
    Pontine aa.
    Superior cerebellar a.
    *Posterior cerebral a. #pca
''')], kind='a', links=[('pcom', 'pca', 'circle')],
  th='เลือดเข้าสมอง 2 ระบบ: anterior (ICA → ophthalmic, PComm, anterior choroidal, ACA, MCA) และ posterior (vertebral สองข้าง → basilar → PCA). วงของ Willis = ACA–AComm–ACA–ICA–PComm–PCA ต่อสองระบบเข้าด้วยกัน; aneurysm บนวงแตก → subarachnoid haemorrhage')

F('sinuses', 'Dural venous sinuses: where the blood goes', [('in', '''
*Internal jugular v. {v} #ijv | jugular foramen
  *Sigmoid sinus #sig
    Transverse sinus #ts | attached margin of the tentorium
      *Confluence of sinuses #conf | internal occipital protuberance
        *Superior sagittal sinus #sss | upper margin of falx; arachnoid granulations
          Superior cerebral (bridging) vv. {v} | tear → subdural haematoma
        *Straight sinus #ssn | falx meets tentorium
          Inferior sagittal sinus | free margin of falx
          Great cerebral v. (Galen) {v}
        Occipital sinus
    Superior petrosal sinus #sps
      *Cavernous sinus #cs | beside the sella: ICA + VI inside
        Superior ophthalmic v. {v} | from the face
        Sphenoparietal sinus
  Inferior petrosal sinus #ips
    Cavernous sinus #cs
''')], kind='s',
  th='ไซนัสดำในดูรา: superior sagittal + straight (รับ inferior sagittal และ great cerebral vein) → confluence → transverse → sigmoid → IJV ที่ jugular foramen. Cavernous sinus รับจาก ophthalmic vein (หน้า) แล้วระบายทาง superior petrosal ไป sigmoid และ inferior petrosal ไป IJV')

F('bleeds', 'Which vessel bleeds into which layer', [('out', '''
*Middle meningeal a. {a} | pterion fracture
  *Epidural (extradural) haematoma {c} | lens-shaped; stops at sutures; lucid interval
*Bridging (superior cerebral) vv. {v} | shearing injury, elderly, infants
  *Subdural haematoma {c} | crescent; crosses sutures
*Berry aneurysm on the circle of Willis {a}
  *Subarachnoid haemorrhage {c} | thunderclap headache; blood in CSF
''')], kind='a',
  th='เลือดออก 3 ชั้นจาก 3 แหล่ง: middle meningeal artery → epidural (รูปเลนส์ ไม่ข้าม suture มี lucid interval); bridging veins → subdural (รูปจันทร์เสี้ยว ข้าม suture); aneurysm บน circle of Willis → subarachnoid (ปวดหัวรุนแรงทันที)')

# ===================================================================== RS I · U nose
F('sinus-drain', 'Where each sinus and duct opens', [('in', '''
*Middle meatus {o} #mm | under the middle concha
  *Hiatus semilunaris {o} #hs
    Frontal sinus {c} | frontonasal duct / infundibulum
    Anterior ethmoidal cells {c}
    *Maxillary sinus {c} | ostium high on its medial wall
  Ethmoidal bulla {o}
    Middle ethmoidal cells {c}
Superior meatus {o}
  Posterior ethmoidal cells {c}
*Spheno-ethmoidal recess {o} | above the superior concha
  Sphenoidal sinus {c}
*Inferior meatus {o}
  *Nasolacrimal duct {c} | tears, not a sinus
''')], kind='c',
  th='Frontal, anterior ethmoidal และ maxillary เปิดที่ hiatus semilunaris ใน middle meatus; middle ethmoidal เปิดบน ethmoidal bulla; posterior ethmoidal เปิด superior meatus; sphenoid เปิด spheno-ethmoidal recess; inferior meatus มีแค่ nasolacrimal duct')

F('nose-a', 'Arteries meeting at Kiesselbach area', [('in', '''
*Kiesselbach (Little) area {t} | anterior septum: commonest nosebleed
  Anterior ethmoidal a. #aea
    Ophthalmic a. #oph
      Internal carotid a. #ica
  Posterior ethmoidal a.
    Ophthalmic a. #oph
  *Sphenopalatine a. #spa
    Maxillary a. #max
      External carotid a. #eca
  Greater palatine a. | up through the incisive canal
    Maxillary a. #max
  Septal br. of superior labial a.
    Facial a.
      External carotid a. #eca
''')], kind='a',
  th='บริเวณ Kiesselbach ด้านหน้า septum มีหลอดเลือดมาชนกันจากทั้ง ICA (anterior/posterior ethmoidal ผ่าน ophthalmic) และ ECA (sphenopalatine และ greater palatine จาก maxillary, septal branch จาก facial) — เลือดกำเดาส่วนใหญ่ออกตรงนี้')

F('nose-n', 'Nerves of the nasal cavity', [('out', '''
*Olfactory nn. (I) | cribriform plate: smell, roof of the cavity
Ophthalmic n. (V1)
  Nasociliary n.
    *Anterior ethmoidal n. | front of septum + lateral wall
      External nasal n. | skin of the nose
*Maxillary n. (V2)
  Pterygopalatine ganglion {g}
    *Nasopalatine n. | septum → incisive foramen
    Posterior lateral nasal brs
    Greater palatine n. | posterior inferior lateral wall
  Infra-orbital n. | ala + vestibule
''')], kind='n',
  th='จมูกมีเส้นประสาทพิเศษ CN I (กลิ่น) ที่หลังคา; ความรู้สึกทั่วไปส่วนหน้า-บนจาก V1 (anterior ethmoidal) ส่วนใหญ่ที่เหลือจาก V2 ผ่าน pterygopalatine ganglion (nasopalatine, lateral nasal, greater palatine)')

# ===================================================================== RS I · L larynx
F('larynx-nv', 'Nerves and arteries of the larynx (thyroidectomy map)', [('out', '''
*Vagus n. (X) {n}
  *Superior laryngeal n. {n}
    *Internal laryngeal n. {n} #iln | sensory above the vocal folds
    *External laryngeal n. {n} #eln | motor: cricothyroid only
  *Recurrent laryngeal n. {n} #rln | R: subclavian · L: aortic arch
    *Inferior laryngeal n. {n} | all other intrinsic mm.; sensory below the folds
External carotid a.
  *Superior thyroid a. #sta
    Superior laryngeal a. #sla | through the thyrohyoid membrane
Subclavian a.
  Thyrocervical trunk
    *Inferior thyroid a. #ita
      Inferior laryngeal a.
''')], kind='a', links=[('eln', 'sta', 'runs with'), ('iln', 'sla', 'pierce together'), ('rln', 'ita', 'crosses')],
  th='แผนที่ผ่าตัดไทรอยด์: external laryngeal nerve วิ่งคู่ superior thyroid artery (ผูกสูงเกิน → cricothyroid อ่อน เสียงโทนเดียว), recurrent laryngeal nerve ไขว้ inferior thyroid artery (บาด → เสียงแหบ). Internal laryngeal กับ superior laryngeal artery แทง thyrohyoid membrane ด้วยกัน')

# ===================================================================== RS I · W thoracic wall
F('icos-a', 'Arteries of the thoracic wall', [('out', '''
*Thoracic aorta
  *Posterior intercostal aa. 3–11 #pia
  Subcostal a.
Subclavian a.
  Costocervical trunk
    Superior intercostal a. | posterior aa. of spaces 1–2
  *Internal thoracic a. | ~1 cm lateral to the sternum
    *Anterior intercostal aa. (spaces 1–6) #aia
    Pericardiacophrenic a. | with the phrenic n.
    Musculophrenic a. | anterior intercostals 7–9
    *Superior epigastric a. | into the rectus sheath
''')], kind='a', links=[('pia', 'aia', 'meet in each space')],
  th='ผนังอกได้เลือดจาก 2 ทาง: posterior intercostal arteries จาก aorta (ช่อง 1-2 จาก superior intercostal ของ costocervical trunk) และ anterior intercostal arteries จาก internal thoracic (ช่อง 1-6) และ musculophrenic (ช่อง 7-9) ซึ่งมาต่อกันในแต่ละช่อง')

F('icos-v', 'Azygos system: veins of the thoracic wall', [('in', '''
*Superior vena cava
  *Azygos v. #az | arches over the right lung root (T4)
    Right posterior intercostal vv. 4–11
    Right superior intercostal v. | spaces 2–4
    Right subcostal + ascending lumbar vv.
    Right bronchial vv.
    *Hemiazygos v. #hz | crosses at ~T8
      Left posterior intercostal vv. 9–11
      Left subcostal + ascending lumbar vv.
    *Accessory hemiazygos v. #ahz | crosses at ~T7
      Left posterior intercostal vv. 5–8
      Left bronchial vv.
  Brachiocephalic vv.
    Internal thoracic vv.
      Anterior intercostal vv.
    Left superior intercostal v. | left spaces 2–4
''')], kind='v',
  th='Posterior intercostal veins ด้านขวาเข้า azygos ซึ่งวนข้าม root ปอดขวาเข้า SVC; ด้านซ้ายช่อง 9-11 เข้า hemiazygos ช่อง 5-8 เข้า accessory hemiazygos แล้วข้ามไป azygos; ช่อง 2-4 ซ้ายเข้า left superior intercostal vein. Anterior intercostal veins เข้า internal thoracic vein')

F('icos-n', 'Intercostal nerve: a typical thoracic spinal nerve', [('out', '''
Thoracic spinal nerve T1–T11
  Dorsal ramus | back muscles + skin
  Rami communicantes | sympathetic ganglion
  *Intercostal n. (ventral ramus) | costal groove: V-A-N, between internal and innermost
    Muscular brs | intercostals, transversus thoracis
    Collateral branch | upper border of the rib below
    *Lateral cutaneous branch | mid-axillary line
    *Anterior cutaneous branch | beside the sternum
    T1 → brachial plexus · T7–T11 → abdominal wall {t}
''')], kind='n',
  th='Intercostal nerve คือ ventral ramus ของ T1-T11 วิ่งใน costal groove ใต้ artery และ vein (VAN) ระหว่าง internal กับ innermost intercostal ให้กิ่งกล้ามเนื้อ collateral branch และ lateral/anterior cutaneous branches เป็น dermatome — nerve block ฉีดที่ขอบล่างซี่โครง')

F('phrenic', 'Phrenic nerve and the nerves of the diaphragm', [('out', '''
*C3–C5 ventral rami | "C3, 4, 5 keeps the diaphragm alive"
  *Phrenic n. | on anterior scalene → between subclavian a. and v.
    *In FRONT of the lung root | between fibrous pericardium and mediastinal pleura
      *Diaphragm: all motor {t}
      Central diaphragm, pericardium, mediastinal pleura: sensory {t} | → shoulder-tip pain
Lower 6 intercostal + subcostal nn.
  Peripheral diaphragm: sensory only {t}
''')], kind='n',
  th='Phrenic nerve (C3-C5) วิ่งบน anterior scalene ลอดระหว่าง subclavian artery กับ vein วิ่งหน้า root ปอดระหว่าง pericardium กับ mediastinal pleura ไปสั่งการกะบังลมทั้งหมดและรับความรู้สึกส่วนกลาง (ปวดร้าวไปปลายไหล่); ขอบรอบนอกรับความรู้สึกจาก intercostal ล่าง')

F('diaph-open', 'Openings of the diaphragm and what passes', [('out', '''
Diaphragm {t}
  *Caval opening · T8 {o} | central tendon
    Inferior vena cava {v}
    Branches of the right phrenic n. {n}
  *Oesophageal hiatus · T10 {o} | right crus sling
    Oesophagus {t}
    Anterior + posterior vagal trunks {n}
  *Aortic hiatus · T12 {o} | behind the median arcuate ligament
    Aorta {a}
    Thoracic duct {l}
    Azygos v. {v}
  Crura (pierced) {o}
    Greater + lesser splanchnic nn. {n}
''')], kind='o',
  th='"I 8 10 Eggs At 12": IVC ผ่าน caval opening T8 (ใน central tendon), oesophagus กับ vagal trunks ผ่าน T10, aorta + thoracic duct + azygos ผ่าน aortic hiatus T12 ซึ่งจริงๆ อยู่หลังกะบังลม; splanchnic nerves แทงผ่าน crura')

# ===================================================================== RS I · P lungs
F('pulm-circ', 'Pulmonary circulation (gas exchange)', [('out', '''
Right ventricle {t}
  *Pulmonary trunk | deoxygenated
    Right pulmonary a. | under the arch, behind the SVC
      Lobar + segmental aa. (R) | follow the bronchi
        *Alveolar capillaries {t} #cap | gas exchange
    *Left pulmonary a. | highest structure in the left hilum
      Lobar + segmental aa. (L)
        Alveolar capillaries #cap
'''), ('out', '''
Alveolar capillaries #cap
  Intersegmental vv. {v} | run BETWEEN segments
    *Pulmonary vv. x4 {v} | oxygenated; lowest + most anterior in the hilum
      Left atrium {t}
''')], kind='a', orient='v',
  th='Pulmonary artery นำเลือดดำจาก right ventricle ไปตามหลอดลมจนถึง capillaries รอบถุงลม แลกก๊าซแล้วไหลกลับทาง intersegmental veins ที่วิ่งระหว่าง segment → pulmonary veins 4 เส้น → left atrium. ใน hilum: pulmonary veins อยู่ล่างและหน้าสุด')

F('bronch-v', 'Bronchial vessels: blood supply of the lung itself', [('out', '''
*Descending thoracic aorta | T5–T6
  *Left bronchial aa. (2) | superior + inferior
    Left bronchi, visceral pleura, pulmonary a. wall {t}
*3rd right posterior intercostal a.
  *Right bronchial a. (1)
    Right bronchi, visceral pleura {t}
'''), ('in', '''
*Azygos v. {v}
  Right bronchial vv. {v}
*Accessory hemiazygos v. {v}
  Left bronchial vv. {v}
''')], kind='a',
  th='เนื้อปอดเองได้เลือดแดงจาก bronchial arteries: ซ้าย 2 เส้นจาก descending aorta ระดับ T5-T6, ขวา 1 เส้นจาก posterior intercostal artery ที่ 3 ขวา. Bronchial veins ขวาเข้า azygos ซ้ายเข้า accessory hemiazygos')

F('bronchi', 'Bronchial tree: lobar and segmental bronchi', [('out', '''
*Trachea | C6 → sternal angle (T4/5)
  *Right main bronchus | wider, shorter, more vertical
    *Right superior lobar (eparterial) | above the pulmonary a.
      Apical · posterior · anterior
    *Bronchus intermedius
      Middle lobar
        Lateral · medial
      Right inferior lobar
        Superior · 4 basal (medial, anterior, lateral, posterior)
  Left main bronchus | under the aortic arch
    Left superior lobar
      Upper division: apicoposterior · anterior
      *Lingular: superior + inferior lingular
    Left inferior lobar
      Superior · 3 basal (anteromedial, lateral, posterior)
''')], kind='r',
  th='Trachea แยกที่ sternal angle: ขวามี superior lobar (eparterial) กับ bronchus intermedius ที่แยกเป็น middle และ inferior lobar → 10 segments; ซ้ายมี superior lobar (มี lingular) กับ inferior lobar → 8 segments เพราะ apicoposterior และ anteromedial basal รวมกัน')

F('thor-lymph', 'Lymph drainage of the lungs and thorax', [('in', '''
Right lymphatic duct | → right venous angle
  *Right bronchomediastinal trunk
    *Tracheobronchial nodes | around the bifurcation
      *Bronchopulmonary (hilar) nodes
        Pulmonary nodes | inside the lung
    Anterior + posterior mediastinal nodes
    Parasternal, intercostal, phrenic nodes | parietal
*Thoracic duct | → left venous angle; via the aortic hiatus
  Cisterna chyli (L2) | abdomen + lower limbs
  Left bronchomediastinal trunk
''')], kind='l',
  th='น้ำเหลืองจากปอด: pulmonary nodes → bronchopulmonary (hilar) → tracheobronchial → bronchomediastinal trunk → right lymphatic duct หรือ thoracic duct → venous angle — เป็นทางแพร่กระจายของมะเร็งปอด. Thoracic duct เริ่มที่ cisterna chyli (L2) ผ่าน aortic hiatus ไปเทที่ venous angle ซ้าย')

F('thorax-n', 'Nerves of the thorax: phrenic, vagus, sympathetic', [('out', '''
*Vagus n. #x | passes BEHIND the lung root
  Left recurrent laryngeal n. | hooks under the aortic arch
  Cardiac plexus
  *Pulmonary plexus #pp | on the lung root
    Bronchial muscle + glands {t} | vagus: constrict, secrete · sympathetic: dilate
  Oesophageal plexus
    Anterior + posterior vagal trunks | oesophageal hiatus (T10)
*Thoracic sympathetic trunk | on the heads of the ribs
  T2–T5 ganglia
    Pulmonary plexus #pp
  *Greater splanchnic n. | T5–T9
    Coeliac ganglion {g}
  Lesser splanchnic n. | T10–T11
    Aorticorenal ganglion {g}
  Least splanchnic n. | T12
*Phrenic n. (C3–C5) | passes IN FRONT of the lung root
  Diaphragm + pericardium {t}
''')], kind='n',
  th='แยก 3 เส้นใน mediastinum: phrenic วิ่งหน้า root ปอดไปกะบังลม; vagus วิ่งหลัง root ให้ pulmonary plexus (หลอดลมหด) และ esophageal plexus; sympathetic trunk บนหัวซี่โครงให้กิ่งไป pulmonary plexus (หลอดลมขยาย) และ splanchnic nerves (greater T5-9, lesser T10-11, least T12) ลงช่องท้อง')

# ===================================================================== attach to cards
ATTACH = {
 'B-C6': ['b-nerve', 'b-vessels'], 'B-C10': ['subocc-n', 'vert-a'], 'B-S6': ['vert-a', 'subocc-n'], 'B-S5': ['subocc-n'],
 'S-C5': ['cord-art', 'cord-vein'], 'S-C6': ['spinal-nerve'], 'S-S2': ['spinal-nerve'],
 'K-C3': ['fossa-am', 'fossa-p'], 'K-C5': ['fossa-am', 'fossa-p'], 'K-S3': ['fossa-am', 'fossa-p'], 'K-S4': ['fossa-am', 'fossa-p'], 'K-S5': ['fossa-am', 'fossa-p'],
 'F-C2': ['facial-a', 'facial-v'], 'F-C3': ['cn7', 'parotid-pns'], 'F-C4': ['face-sens'], 'F-C5': ['ejv', 'cerv-plexus'],
 'F-C8': ['ansa', 'cn11', 'thy-a', 'thy-v'], 'F-S1': ['cn7', 'facial-a'], 'F-S2': ['cn7'], 'F-S3': ['cerv-plexus', 'ejv'],
 'F-S5': ['ansa', 'thy-a'], 'F-S6': ['cn11', 'ansa'], 'F-S7': ['ansa', 'cn11'],
 'T-C3': ['maxa'], 'T-C4': ['ptery'], 'T-C5': ['v3'], 'T-C6': ['parotid-pns', 'chorda'], 'T-C8': ['v3'],
 'T-S1': ['v3', 'maxa'], 'T-S2': ['maxa', 'v3'], 'T-S3': ['maxa'], 'T-S4': ['v3', 'v2'], 'T-S5': ['chorda', 'v3'],
 'O-C1': ['palate-n'], 'O-C2': ['pharynx-n'], 'O-C3': ['tongue-n'], 'O-C4': ['tongue-n', 'lingual-a'], 'O-C6': ['chorda'], 'O-C7': ['pharynx-n'],
 'O-S3': ['tongue-n', 'chorda'], 'O-S4': ['chorda', 'lingual-a'], 'O-S5': ['parotid-pns', 'chorda'],
 'N-C1': ['carotid'], 'N-C2': ['arch', 'subclavian'], 'N-C3': ['ijv'], 'N-C4': ['vagus'], 'N-C5': ['horner'], 'N-C6': ['neck-lymph'],
 'N-S1': ['carotid', 'subclavian', 'arch'], 'N-S2': ['vagus', 'horner'], 'N-S3': ['thy-a', 'thy-v'], 'N-S4': ['horner', 'cerv-plexus'],
 'C-C1': ['scalp-a', 'scalp-n'], 'C-C2': ['mma'], 'C-C6': ['fossa-am', 'fossa-p'], 'C-C7': ['willis'], 'C-C8': ['sinuses'], 'C-C9': ['bleeds'],
 'C-S1': ['scalp-a', 'scalp-n'], 'C-S2': ['mma'], 'C-S3': ['sinuses'], 'C-S4': ['fossa-am', 'fossa-p'], 'C-S5': ['willis'], 'C-S6': ['willis', 'fossa-am'],
 'U-C2': ['sinus-drain'], 'U-C3': ['sinus-drain'], 'U-C4': ['nose-a', 'nose-n'], 'U-S1': ['sinus-drain'], 'U-S2': ['sinus-drain'],
 'L-C1': ['pharynx-n'], 'L-C2': ['pharynx-n'], 'L-C5': ['larynx-nv'], 'L-C6': ['larynx-nv'], 'L-S3': ['larynx-nv'], 'L-S4': ['larynx-nv'],
 'W-C3': ['icos-a', 'icos-v', 'icos-n'], 'W-C4': ['icos-n'], 'W-C6': ['phrenic', 'diaph-open'], 'W-S3': ['icos-a'], 'W-S4': ['icos-n', 'icos-v'], 'W-S5': ['diaph-open', 'phrenic'],
 'P-C4': ['pulm-circ'], 'P-C5': ['bronchi'], 'P-C6': ['pulm-circ', 'bronch-v'], 'P-C7': ['icos-v', 'thor-lymph'], 'P-C8': ['thorax-n'],
 'P-S2': ['pulm-circ'], 'P-S3': ['bronchi'], 'P-S5': ['thorax-n'],
}
