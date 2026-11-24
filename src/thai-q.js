/* Thai answer bullets for every past-paper question (1–3 bullets each), keyed by question ID.
   Shown under the answer in both decks and printed in the PDF answer key. */
(function (Q) {
  var add = function (o) { for (var k in o) Q[k] = o[k]; };

  /* ---------- V · Back ---------- */
  add({
    V1: ['Transverse process ยื่นออกด้านข้าง <b>ห่างจาก vertebral canal</b> → หักแล้วไม่ค่อยโดน cord', 'Pedicle, facet, uncovertebral joint ล้อมรอบ canal / foramen → หักแล้วกด cord หรือ root ได้'],
    V2: ['Canal ของ lumbar เป็นสามเหลี่ยม ใหญ่กว่า thoracic แต่<b>เล็กกว่า cervical</b> → ข้อนี้ผิด', 'Mammillary process, accessory process, body รูปไต = ลักษณะ lumbar ที่ถูก'],
    V3: ['ปุ่มเล็กด้านหลังโคน transverse process = <b>accessory process</b>', 'Mammillary process อยู่ด้านหลัง superior articular process'],
    V4: ['มี facet ให้หัวซี่โครงบน body + facet ให้ tubercle บน transverse process → <b>thoracic</b> (ช่วงกลาง)'],
    V5: ['Nucleus pulposus อยู่<b>ค่อนไปด้านหลัง</b> ไม่ใช่ด้านหน้า → disc จึงแตกไปด้านหลัง (posterolateral)'],
    V6: ['<b>PLL</b> วิ่งด้านหลัง body ภายใน canal → เป็นผนังหน้าของ canal', 'ALL อยู่หน้า body; flavum, interspinous, nuchae อยู่หลัง canal'],
    V7: ['Transversospinal: transverse → spine ข้างบน', 'Multifidus ข้าม <b>2–4</b> ปล้อง · semispinalis 4–6 · rotatores 1–2 → ข้าม 3 = <b>multifidus</b>']
  });

  /* ---------- I · Spine imaging ---------- */
  add({
    I1: ['โครงที่ยื่นขึ้นจาก C2 อยู่หลัง anterior arch ของ C1 = <b>dens (odontoid process)</b>'],
    I2: ['Canal อยู่ระหว่าง <b>posterior vertebral line</b> (หลัง body) กับ spinolaminar line', 'เส้นที่อยู่หน้า canal = posterior vertebral line'],
    I3: ['Facet joint = รอยต่อ inferior articular process (บน) กับ superior articular process (ล่าง) หลัง foramen → <b>D</b>'],
    I4: ['ภาพ lateral เห็น <b>neural foramen</b> เป็นช่องมืดระหว่าง pedicle ของสองปล้อง', 'Cervical: foramen เห็นชัดสุดใน oblique view'],
    I5: ['Scotty dog: จมูก = <b>transverse process</b> · ตา = pedicle · หู = SAP · คอ = pars · ขาหน้า = IAP'],
    I6: ['ขาหน้าของหมา = <b>inferior articular process</b>', 'แต่วัยรุ่นปวดหลังตอนแอ่น → มักหักที่<b>คอหมา</b> (pars interarticularis, spondylolysis)'],
    I7: ['AP view: pedicle = วงรีคู่ด้านในขอบ body ("ตานกฮูก") = <b>ลูกศรแดง</b>'],
    I8: ['ยิ่งทึบ → HU สูง → ยิ่งขาว', '<b>Cortical bone</b> ขาวสุด · fat ดำ (−100) · CSF ~0'],
    I9: ['ใต้ conus ใน thecal sac มีแต่ nerve root = <b>cauda equina</b> (จุดๆ ใน sac = B)']
  });

  /* ---------- N · Nervous tissue ---------- */
  add({
    N1: ['เฉลย = <b>Golgi</b> (silver) → เห็น neuron ทั้งตัวพร้อม process', 'Cresyl violet = Nissl body · H&amp;E = routine · osmium = myelin'],
    N2: ['ตัวเซลล์ใหญ่ มี Nissl เต็ม nucleus ใหญ่จาง nucleolus ชัด = <b>neuron</b>'],
    N3: ['Neuron มี nucleus แบบ <b>vesicular</b> (จาง) + nucleolus ชัด', 'End-feet = astrocyte'],
    N4: ['ขนส่งจาก soma → terminal = <b>anterograde axonal transport</b> (kinesin)', 'Retrograde = กลับเข้า soma (ทางที่ toxin/virus ใช้)'],
    N5: ['<b>Microglia</b> = macrophage ของ CNS', 'Astrocyte = BBB, scar · oligodendrocyte = myelin CNS · Schwann = PNS'],
    N6: ['Marker ของ astrocyte = <b>GFAP</b>'],
    N7: ['Schwann cell สร้าง myelin, ปกป้อง axon, หลั่ง growth factor, นำทาง regeneration', '<b>ไม่เปลี่ยนเป็น neuron</b>'],
    N8: ['เซลล์รูปดาว มี process ดำแผ่ออกรอบตัว = <b>astrocyte</b>'],
    N9: ['ปลาย process ไปแปะหลอดเลือด (end-feet) → <b>blood–brain barrier</b>'],
    N10: ['EM: เซลล์หนึ่งตัวห่อ axon ที่มี myelin หนึ่งเส้น = <b>Schwann cell</b>'],
    N11: ['Schwann cell = glia ของ PNS → อยู่ใน <b>peripheral nerve</b>'],
    N12: ['รูเล็กกลาง grey commissure = <b>central canal</b>'],
    N13: ['Central canal บุด้วย ependyma ต่อกับ ventricle → มี <b>CSF</b>'],
    N14: ['Meissner = <b>light touch</b> (ผิวไม่มีขน)', 'Pacinian = vibration/pressure · free ending = pain, temperature']
  });

  /* ---------- C · Spinal cord ---------- */
  add({
    C1: ['งูสวัดขึ้นตาม dermatome เดียว', 'สะดือ = <b>T10</b> · หัวนม = T4 · xiphoid = T7'],
    C2: ['Xiphoid = <b>T7</b>'],
    C3: ['เข็ม LP: supraspinous → interspinous → <b>flavum</b> → epidural → dura + arachnoid → subarachnoid (CSF)', '<b>PLL</b> อยู่ผนังหน้า canal → เข็มไม่ผ่าน'],
    C4: ['Cord จบ L1–L2 แต่ dural sac ถึง S2 → แทงที่ <b>L3/L4</b> หรือ L4/L5'],
    C5: ['ท่อหนาด้านนอกที่ถูกเปิดออก = <b>dura mater</b>'],
    C6: ['นอก dura = epidural fat (+ venous plexus) · ใน dura = arachnoid → แยก <b>fat กับ arachnoid</b>'],
    C7: ['ร่องลึกกว้างด้านบน = ventral median fissure → ล่าง = dorsal', 'จุดที่ dorsal horn ถึงผิว = <b>dorsolateral sulcus</b>'],
    C8: ['Dorsal (<b>sensory</b>) rootlet เข้า cord ตาม dorsolateral sulcus'],
    C9: ['ร่องลึกกลางด้านหน้า cord = <b>ventral median fissure</b>'],
    C10: ['<b>Anterior spinal artery</b> (เส้นเดียว) วิ่งใน ventral median fissure → เลี้ยง 2/3 หน้า'],
    C11: ['C เล็กสุดแต่<b>ไม่มี myelin</b>', 'ใน myelinated: Aα &gt; Aβ &gt; Aγ &gt; Aδ &gt; <b>B</b> → B เล็กสุด'],
    C12: ['ใหญ่ + myelin → เร็ว → <b>Aα</b> เร็วสุด'],
    C13: ['Neurapraxia = myelin · axonotmesis = axon · <b>neurotmesis = ขาดทั้งเส้นถึง epineurium</b>'],
    C14: ['ตัดเรียบ สด ช่องว่างแทบไม่มี → <b>เย็บต่อตรง</b> (direct repair)', 'Graft (เช่น sural) ใช้เมื่อปลายสองข้างดึงมาชนไม่ได้']
  });

  /* ---------- K · Skull ---------- */
  add({
    K1: ['กะโหลกชายหนาใหญ่: <b>brow ridge ใหญ่</b>, มุม mandible เหลี่ยม, ขอบ orbit มน, หน้าผากลาด', 'Obtuse angle, ขอบ orbit คม, หน้าผากตั้ง = หญิง'],
    K2: ['Cribriform plate = ส่วนของ <b>ethmoid</b> → CN I ลอดผ่าน'],
    K3: ['<b>Pterion</b> = F + P + S (greater wing) + T มาชนเป็นรูป H', 'Asterion = P + O + T · bregma = coronal ชน sagittal'],
    K4: ['Frontal ↔ parietal = <b>coronal</b> · parietal ↔ parietal = sagittal · parietal ↔ occipital = lambdoid'],
    K5: ['Jugular foramen = <b>IX, X, XI</b> + IJV', '<b>XII</b> ออกทาง hypoglossal canal ของตัวเอง'],
    K6: ['Foramen ovale (OVALE): <b>O</b>tic ganglion, <b>V</b>3, <b>A</b>ccessory meningeal a., <b>L</b>esser petrosal, <b>E</b>missary v.', 'Middle meningeal a. → spinosum'],
    K7: ['V1 = SOF · <b>V2 = rotundum</b> · V3 = ovale'],
    K8: ['รูกลมเล็ก<b>หน้า</b> foramen ovale = <b>foramen rotundum</b>', 'เฉลย recall ให้ ovale แต่ข้อคู่เฉลย maxillary n. → rotundum เข้ากันกว่า'],
    K9: ['Foramen rotundum → <b>maxillary nerve (V2)</b>'],
    K10: ['รูหลัง petrous temporal ปลายร่อง sigmoid = <b>jugular foramen</b>'],
    K11: ['Jugular foramen → <b>IX</b> (+ X, XI)', 'VII, VIII → IAM · XII → hypoglossal canal'],
    K12: ['SOF มี III, IV, V1, VI', '<b>V2</b> ออกทาง rotundum ใต้ fissure → โดนน้อยสุด'],
    K13: ['V1 วิ่งผ่าน SOF = ช่องระหว่าง lesser/greater wing ของ <b>sphenoid</b>']
  });

  /* ---------- Z · Cranial cavity ---------- */
  add({
    Z1: ['Middle meningeal a. อยู่ระหว่างกะโหลกกับ dura → <b>epidural</b> (เหนือ dura)', 'Bridging vein → subdural · aneurysm → subarachnoid'],
    Z2: ['Infratentorial = posterior fossa → มี <b>sigmoid sinus</b>', 'Optic n., superior cerebral v., falx cerebri อยู่เหนือ tentorium'],
    Z3: ['Midbrain = <b>III, IV</b> · pons = V, VI, VII · VIII ที่ pontomedullary junction'],
    Z4: ['Posterior circulation = vertebral → basilar → <b>PCA</b>', 'ICA, ophthalmic, ACA, MCA = anterior'],
    Z5: ['SSS, straight, occipital เข้า confluence · transverse ออกจาก confluence', '<b>Inferior sagittal</b> + great cerebral v. → straight sinus → ถึง confluence ทางอ้อม']
  });

  /* ---------- F · Face & neck ---------- */
  add({
    F1: ['Orbicularis oculi (VII) = <b>ปิดตา/กะพริบ</b> → อัมพาตแล้วกะพริบไม่ได้ เสี่ยง corneal ulcer', 'Ptosis = levator (III) หรือ Müller (sympathetic)'],
    F2: ['กล้ามที่ขยับผิวคอ = platysma = กล้ามแสดงสีหน้า → <b>cervical branch ของ VII</b>', 'Ansa cervicalis → strap muscles'],
    F3: ['หน้าผากด้านใน = supratrochlear/supraorbital a. จาก <b>ophthalmic (ICA)</b> → A'],
    F4: ['ทำหน้ารังเกียจ = ย่นจมูก ยกริมฝีปากบน → <b>levator labii superioris alaeque nasi</b> → D'],
    F5: ['Procerus เกาะต้นจาก <b>nasal bone</b> → B'],
    F6: ['Corrugator เกาะจาก<b>สันคิ้ว (superciliary arch)</b> → A'],
    F7: ['Marginal mandibular (VII) → กล้ามดึงมุมปากลง → <b>มุมปากตก</b>', 'เป็น motor → ไม่ชา (ชา = mental n., V3)'],
    F8: ['ผิวหน้า 3 แถบ: บน V1 · <b>กลาง V2</b> · ล่าง V3', 'แขนง VII เป็น motor'],
    F9: ['กล้ามแบนที่มี hypoglossal n. พาดบนผิว = <b>hyoglossus</b> → เกาะจาก hyoid'],
    F10: ['IAN ให้ nerve to mylohyoid ก่อนเข้า mandibular foramen → <b>mylohyoid + anterior digastric</b> → D']
  });

  /* ---------- D · Deep face ---------- */
  add({
    D1: ['ช่องใต้ zygomatic arch ลึกต่อ ramus = <b>infratemporal fossa</b>'],
    D2: ['ใน infratemporal fossa: pterygoids, maxillary a., pterygoid plexus, V3 + แขนง', '<b>Mental n.</b> = ปลาย IAN ที่คาง → ไม่อยู่ใน fossa'],
    D3: ['ปิดปาก 3 ตัว: <b>temporalis, masseter, medial pterygoid</b>', 'Lateral pterygoid = อ้าปาก + ยื่นคาง'],
    D4: ['ยื่นคาง = <b>lateral + medial pterygoid</b> (+ superficial masseter)', 'Temporalis ใยหลัง = ดึงคางกลับ → ตัดตัวเลือกที่มี temporalis'],
    D5: ['ผิวด้านในของ lateral pterygoid plate = origin ของ <b>medial pterygoid</b>'],
    D6: ['Medial pterygoid เกาะ<b>ผิวด้านในของ ramus</b> (คู่กับ masseter ด้านนอก)'],
    D7: ['กล้ามหนาสี่เหลี่ยมบนผิวนอก ramus = <b>masseter</b>'],
    D8: ['กล้ามบดเคี้ยวทุกตัว ← <b>V3</b>'],
    D9: ['วิ่งตรงขึ้นจาก maxillary a. ส่วนแรกไปฐานกะโหลก = <b>middle meningeal a.</b>'],
    D10: ['Middle meningeal a. → <b>foramen spinosum</b>'],
    D11: ['V3 motor: กล้ามบดเคี้ยว, mylohyoid, ant. digastric, tensor veli palatini, <b>tensor tympani</b>', 'Stapedius = VII'],
    D12: ['ฟันล่าง ← <b>inferior alveolar n.</b> (V3) → จบเป็น mental n.'],
    D13: ['<b>Infraorbital n.</b> = ปลาย V2', 'Lingual, auriculotemporal, IAN, buccal = sensory ของ V3'],
    D14: ['หลอดเลือดเล็กวิ่งคู่ IAN ไป mandibular foramen = <b>inferior alveolar a.</b>'],
    D15: ['IAA เลี้ยง mandible + <b>ฟันล่าง</b>']
  });

  /* ---------- O · Oral cavity ---------- */
  add({
    O3: ['กล้ามรูปพัดจากหลังคางขึ้นไปในลิ้น = <b>genioglossus</b>'],
    O4: ['กล้ามลิ้นทุกตัว ← <b>XII</b> ยกเว้น palatoglossus ← X'],
    O6: ['พื้นปาก: <b>lingual n.</b> อยู่ใต้ mucosa เหนือ mylohyoid บน hyoglossus (วนใต้ submandibular duct)', 'Hypoglossal n. อยู่ต่ำกว่าบน hyoglossus'],
    O7: ['<b>Lingual a.</b> (ECA) วิ่งลึกต่อ hyoglossus → ให้ sublingual a. เลี้ยงพื้นปาก'],
    O9: ['<b>Mylohyoid</b> = พื้นปาก: sublingual gland อยู่บน · submandibular ส่วนตื้นอยู่ล่าง'],
    O10: ['เหนือ submandibular space (อ้อมขอบหลัง mylohyoid) = sublingual space + <b>ลิ้น</b>', 'ติดเชื้อลามขึ้น → ลิ้นถูกดันขึ้น (Ludwig angina)'],
    O11: ['Sublingual gland เปิดด้วย<b>ท่อเล็กหลายท่อ</b>ตาม sublingual fold', 'Wharton = submandibular · Stensen = parotid'],
    O12: ['เฉลย = <b>submandibular triangle</b> (ต่อมทั้งต่อมอยู่ใน triangle)', 'หลายตำราบอกส่วนลึกอยู่เหนือ mylohyoid ใน sublingual space'],
    O13: ['Digastric มีสองเส้นประสาท: <b>posterior belly ← VII</b> · anterior belly ← V3'],
    O14: ['จากหลังมุม mandible ลงมา hyoid = <b>posterior belly of digastric</b>'],
    O15: ['Posterior belly digastric ← <b>facial n.</b>'],
    O16: ['ต่อมใต้ body ของ mandible โอบขอบหลัง mylohyoid = <b>submandibular gland</b>'],
    O17: ['Submandibular → <b>Wharton’s duct</b> → sublingual papilla'],
    O18: ['กล้ามเรียวจาก styloid ไป hyoid มี digastric tendon แทรก = <b>stylohyoid</b>'],
    O19: ['Stylohyoid = กล้าม arch 2 → <b>facial n.</b>'],
    O23: ['Tonsil ระบายไป <b>jugulodigastric node</b> → คลำได้<b>ใต้มุม mandible</b>']
  });

  /* ---------- J · Deep neck ---------- */
  add({
    J1: ['IJV อยู่ใต้ <b>SCM</b> → แทงที่ยอดสามเหลี่ยมระหว่าง sternal กับ clavicular head ด้านนอก carotid'],
    J2: ['ผูก inferior thyroid a. → เสี่ยง <b>RLN</b> → อัมพาตกล้ามกล่องเสียงทุกตัวยกเว้น cricothyroid', '<b>Posterior cricoarytenoid</b> = abductor ตัวเดียว'],
    J3: ['แทง thyrohyoid membrane เข้ากล่องเสียง = <b>internal laryngeal n.</b> (sensory เหนือ vocal cord)'],
    J4: ['Internal laryngeal n. ไปคู่กับ superior laryngeal a. = <b>แขนงของ superior thyroid a.</b>'],
    J5: ['วิ่งลงหน้า anterior scalene = <b>phrenic n.</b> (C3–5)'],
    J6: ['Phrenic → <b>diaphragm</b> อัมพาตข้างนั้น'],
    J7: ['สายหลัง carotid sheath บน vertebral column = <b>sympathetic trunk</b>'],
    J8: ['ตัด cervical sympathetic → ptosis, miosis, anhidrosis = <b>Horner</b>'],
    J9: ['Danger space = ระหว่าง <b>alar กับ prevertebral fascia</b> → ยาวถึง diaphragm → ติดเชื้อลง mediastinum', 'Retropharyngeal = buccopharyngeal กับ alar'],
    J10: ['Investing layer หุ้ม <b>SCM</b> + trapezius (+ parotid, submandibular)', 'Strap muscles อยู่ใน pretracheal layer'],
    J11: ['Zone I: sternal notch → cricoid · II: cricoid → มุม mandible · III: เหนือมุม mandible', '<b>Oesophagus</b> เริ่มที่ cricoid → ไม่อยู่ใน zone III'],
    J12: ['Zone I = thoracic inlet: trachea, oesophagus, thyroid, lung apex, ต้นหลอดเลือดใหญ่', '<b>Pharynx</b> จบที่ cricoid → อยู่ zone II–III']
  });

  /* ---------- E · Eye & orbit ---------- */
  add({
    E1: ['III, IV, VI (กลอกตา) + V1 (หน้าผาก, หนังตาบน, สันจมูก, corneal reflex) ผ่าน <b>SOF</b>', 'ตามองเห็นปกติ → CN II (optic canal) ไม่โดน'],
    E2: ['ผนังในของ orbit = lamina papyracea ของ ethmoid → หลังผนังคือ <b>ethmoidal air cells</b>'],
    E3: ['Optic canal = <b>optic n. + ophthalmic a.</b>'],
    E4: ['ขอบหยักที่ retina หนาหยุดลง = <b>ora serrata</b>'],
    E5: ['ตาหันออก (abducted) → ทดสอบ <b>rectus</b>: มองลง = <b>inferior rectus</b>', 'ตาหันเข้า → ทดสอบ oblique'],
    E6: ['ตาหันออก มองขึ้น = <b>superior rectus</b>'],
    E7: ['มองจากบน เส้นใหญ่บน levator กลาง orbit = <b>frontal n.</b> (V1)'],
    E8: ['เฉลย = <b>medial rectus + III</b>', 'จำ LR6 SO4 ที่เหลือ III → medial rectus ไม่มีทางเป็น abducens'],
    E9: ['บน levator ที่หลังคา orbit = <b>frontal n.</b>'],
    E10: ['เส้นเล็กด้านในหลังคา orbit เข้า superior oblique = <b>trochlear (IV)</b>'],
    E11: ['ทางแสง: cornea → aqueous → lens → vitreous', '<b>Sclera</b> ทึบแสง ไม่อยู่ในทางแสง'],
    E12: ['<b>Choroid</b> = ชั้นหลอดเลือดหลัง retina ไม่อยู่ในทางแสง'],
    E13: ['รอยต่อ cornea–sclera = <b>limbus</b>'],
    E14: ['Aqueous สร้างจาก ciliary process → ออกทาง <b>trabecular meshwork</b> → canal of Schlemm', 'อุดตัน → ความดันลูกตาสูง (glaucoma)'],
    E15: ['Afferent: cornea → long ciliary n. → <b>nasociliary</b> → V1', 'Efferent = VII (orbicularis oculi)'],
    E16: ['ไม่มี nasociliary ในตัวเลือก → เลือกต้นสาย <b>ophthalmic n. (V1)</b>']
  });

  /* ---------- H · Ear ---------- */
  add({
    H1: ['ผนังหน้า: รูเปิด <b>auditory tube</b> + tensor tympani (มี ICA อยู่หลังผนัง)', 'Aditus = ผนังหลัง · promontory, round window = ผนังใน'],
    H2: ['ผนังหลัง (mastoid): aditus, pyramid + stapedius, <b>facial canal ส่วนลง</b>'],
    H3: ['ผนังใน: promontory, <b>oval window</b>, round window, facial canal ด้านบน', 'ผนังนอก = tympanic membrane'],
    H4: ['Facial canal วิ่งผนังใน แล้ว<b>ลงในผนังหลัง (mastoid)</b> → COM ลามไป mastoid ถึงเส้นประสาท'],
    H5: ['ทางเสียง: TM → ossicles → stapes → oval window → perilymph → cochlear duct', '<b>Eustachian tube</b> แค่ปรับความดัน + ระบาย'],
    H6: ['Tensor tympani (V3) → <b>ด้ามของ malleus</b> · stapedius (VII) → คอ stapes'],
    H7: ['Stapedius ← <b>VII</b> → อัมพาต = hyperacusis'],
    H8: ['Crista → hair cell + <b>cupula</b> · macula → otolithic membrane · Corti → tectorial'],
    H9: ['แผ่น hair cell แบน มีชั้นวุ้น + ผลึกด้านบน = <b>macula</b>'],
    H10: ['Macula มี <b>otolithic membrane</b> (otoconia)'],
    H11: ['Stapes ดัน perilymph ของ vestibule เข้า <b>scala vestibuli</b> → helicotrema → scala tympani → round window'],
    H12: ['ได้ยิน = <b>organ of Corti</b>', 'Macula, crista = vestibular · macula lutea = จอตา']
  });

  /* ---------- M · Membrane potential ---------- */
  add({
    M4: ['Na⁺ นอกเซลล์ต่ำ → <b>E<sub>Na</sub> บวกน้อยลง</b> → overshoot ต่ำลง', 'RMP แทบไม่เปลี่ยน เพราะตอนพัก membrane ซึมผ่าน K⁺ เป็นหลัก'],
    M7: ['Repolarization อาศัย <b>voltage-gated K⁺ channel</b> เปิด', 'บล็อก → AP ยาว repolarize ช้า ยิงซ้ำ'],
    M12: ['K⁺ นอกเซลล์สูงมาก → RMP บวกขึ้นค้าง → Na⁺ channel <b>inactivate</b>', 'ยิง AP ไม่ได้เลย = depolarization block'],
    M13: ['Na⁺ นอกเซลล์สูง → E<sub>Na</sub> บวกขึ้น → แรงขับ Na⁺ มากขึ้น → <b>AP สูงขึ้น ถี่ขึ้น</b>'],
    M14: ['Na⁺ ต่ำ → E<sub>Na</sub> บวกน้อยลง → <b>amplitude ลด</b> (ยังยิง AP ได้)'],
    M15: ['Hyponatremia → E<sub>Na</sub> และแรงขับ Na⁺ ลด → AP <b>เล็กลง ยิงน้อยลง</b>'],
    M16: ['K⁺ นอกเซลล์ต่ำ → gradient ห่างขึ้น → RMP ลบมากขึ้น = <b>hyperpolarization</b> → ไกล threshold → อ่อนแรง']
  });

  /* ---------- P · Nerve & NMJ ---------- */
  add({
    P3: ['Myelin = R<sub>m</sub> สูง, C<sub>m</sub> ต่ำ', 'Demyelination → <b>R<sub>m</sub> ลด → กระแสรั่ว</b> → λ สั้น → ถึง node ถัดไปไม่พอ → นำช้า'],
    P4: ['NMO-IgG = anti-<b>AQP4</b> บน astrocyte end-feet', 'Astrocyte ตาย → myelin ใน CNS หายตามมา (optic n. + cord)'],
    P5: ['เฉลยตามคำวินิจฉัย MS: WBC ทำลาย myelin ใน CNS → <b>plaque หลายจุด</b>', 'อาการในโจทย์จริงๆ เป็น MG (thymus, ptosis, diplopia → nAChR ถูกดึงเข้าเซลล์)'],
    P8: ['TTX → บล็อก <b>voltage-gated Na⁺ channel</b> → ไม่เกิด AP'],
    P9: ['α-bungarotoxin จากงูทับสมิงคลา → <b>บล็อก nAChR</b> ด้าน postsynaptic', 'ตัด SNARE = botulinum'],
    P10: ['Malignant hyperthermia: <b>RyR1 กลายพันธุ์</b> → SR ปล่อย Ca²⁺ ไม่หยุด เมื่อได้ halothane / succinylcholine', 'กล้ามเกร็ง ไข้สูง เผาผลาญสูง']
  });

  /* ---------- L · Lab ---------- */
  add({
    L6: ['<b>Succinylcholine</b> และ <b>ACh dose สูง</b> → end-plate depolarize ค้าง → Na⁺ channel inactivate', 'กระตุ้นเส้นประสาทไม่หด แต่กระตุ้นกล้ามโดยตรงยังหด → บล็อกที่ NMJ']
  });

  /* ---------- R · Reflex ---------- */
  add({
    R1: ['Tension มาก → <b>GTO</b> (receptor) → Ib → inhibitory interneuron → <b>กล้ามคลายตัว</b>', 'Spindle, GTO เป็น receptor ไม่ใช่ effector'],
    R2: ['ยืดเร็ว (dynamic) → กลาง spindle, <b>nuclear bag</b> ตอบสนองเด่น', 'ยืดค้าง (static) → nuclear chain'],
    R3: ['น้ำหนักกดมือลง → กล้ามงอศอกถูกยืด → spindle รับ<b>ความยาวที่เพิ่ม</b> → stretch reflex หดกลับ'],
    R4: ['ถอนเท้าค้างนานหลังสิ่งเร้าหาย = afterdischarge จาก <b>reverberating circuit</b>', 'ต้องมี interneuron · ยิ่งเจ็บยิ่งนาน'],
    R5: ['หดค้างหลังสิ่งเร้าหาย = afterdischarge = <b>repetitive discharge</b>'],
    R6: ['หลัง cord ขาดทันที = <b>spinal shock</b> → reflex ใต้รอยโรคหายหมด → knee jerk ลด', 'Hyperreflexia มาทีหลังเป็นสัปดาห์'],
    R7: ['Disc C5–C6 กด root ของ biceps reflex → LMN ของ arc → <b>biceps ข้างขวาลด</b>', 'Babinski, hyperreflexia = UMN'],
    R8: ['เหยียดศอก = <b>triceps reflex</b> → เคาะเหนือ olecranon', 'Biceps → cubital fossa · brachioradialis → ปลาย radius'],
    R9: ['Jendrassik = ดึงมือออกจากกัน → <b>เบี่ยงความสนใจ</b> ไม่ให้เกร็งขา + เสริม reflex'],
    R10: ['Corneal reflex: afferent V1 (ยังรู้สึก) → efferent <b>VII → orbicularis oculi</b>', 'Bell palsy เสีย efferent → กะพริบไม่ได้']
  });

  /* ---------- A · ANS physiology (+ P7) ---------- */
  add({
    P11: ['เฉลยตาม thymus → <b>MG</b>: antibody บล็อก/ดึง <b>nAChR</b> เข้าเซลล์', 'อาการ infection + flaccid + demyelination เป็น GBS (ไม่ใช่ NMJ) → แยกสองโรคให้ออก'],
    A3: ['β receptor ตอบ <b>NE</b> → ใยที่หลั่ง NE = sympathetic postganglionic (การหลั่งน้ำอสุจิ = sympathetic)', 'Preganglionic ทุกเส้น, parasympathetic post, sympathetic ไปต่อมเหงื่อ = ACh'],
    A5: ['น้ำลายใสปริมาณมาก = parasympathetic → ACh บน <b>M3</b> → ให้ <b>muscarinic agonist</b> (pilocarpine)', 'Sympathetic → น้ำลายน้อย เหนียว'],
    A6: ['Catecholamine → <b>α1</b> ที่ <b>internal urethral sphincter</b> → หด', 'Iris sphincter, ลำไส้, detrusor หดด้วย parasympathetic · external sphincter = กล้ามลาย'],
    A7: ['เฉลย = <b>antimuscarinic</b> → detrusor คลาย ลด urge leakage', 'บล็อก α1 จะทำให้ internal sphincter คลาย → รั่วมากขึ้น'],
    A8: ['β2 (β3) → กล้ามเรียบคลาย → <b>detrusor คลาย</b>', 'Internal sphincter หด = α1 · เหงื่อ = muscarinic'],
    A9: ['<b>α2</b> ที่ปลายประสาท = autoreceptor เบรกการหลั่ง NE', 'บล็อก α2 → NE หลั่งมากขึ้น']
  });

  /* ---------- G · ANS integration ---------- */
  add({
    G2: ['ก่อนหยอด: ตาขวา (Horner) รูม่านตาเล็กกว่า', 'Apraclonidine = α1 อ่อน → dilator ที่ denervated มี α1 เพิ่ม → <b>ตาขวาขยาย</b> ตาซ้ายไม่ขยาย → anisocoria <b>กลับข้าง</b> → A']
  });

  /* ---------- X · ANS of head & neck ---------- */
  add({
    X1: ['Carotid plexus = postganglionic จาก <b>superior cervical ganglion</b>', 'Preganglionic อยู่ lateral horn T1–T3'],
    X2: ['Superior salivatory → VII → <b>chorda tympani</b> → lingual n. → submandibular ganglion', 'Greater petrosal → pterygopalatine · lesser petrosal (IX) → otic'],
    X3: ['ใยของ chorda tympani วิ่ง<b>อยู่ใน lingual n.</b> แล้วแยกไป synapse ที่ submandibular ganglion', 'เฉลย = lingual (chorda tympani ก็ถูก)'],
    X4: ['น้ำตา: VII → greater petrosal → n. of pterygoid canal → <b>pterygopalatine ganglion</b> → lacrimal gland'],
    X5: ['VII บาดเจ็บใกล้ geniculate → ใยน้ำลายงอกผิดทางไป greater petrosal → <b>กินแล้วน้ำตาไหล</b>'],
    X6: ['รอยโรคที่ <b>stylomastoid foramen</b> → หน้าอ่อนแรงทั้งซีก แต่น้ำตา รส stapedius ปกติ (แขนงออกไปก่อนแล้ว)'],
    X7: ['Parotid: inferior salivatory → <b>IX</b> → lesser petrosal → otic ganglion → auriculotemporal → parotid', 'VII แค่วิ่งผ่านต่อม'],
    X8: ['IX synapse ที่ <b>otic ganglion</b> (ใต้ foramen ovale)']
  });

  /* ---------- Y · SGD cases ---------- */
  add({
    Y1: ['S1: plantarflexion อ่อน, ชาขอบนอกเท้า, <b>ankle reflex หาย</b>', 'นิ้วโป้งชา / dorsiflexion อ่อน = L5 · knee jerk = L3–L4'],
    Y2: ['Disc L5–S1 แบบ paracentral → กด root ที่<b>วิ่งผ่านลงไป (traversing) = S1</b>', 'L5 ออก foramen เหนือ disc ไปแล้ว']
  });

  /* ---------- S · Sound ---------- */
  add({
    S1: ['เวลา = ระยะ ÷ ความเร็ว = 272.8 ÷ 341 = <b>0.8 s</b>'],
    S2: ['ความดังต่างกันสองหู = <b>ILD</b> (head shadow) → ความถี่สูง', 'ความถี่ต่ำใช้ ITD'],
    S3: ['Pressure: dB = 20 log(20) ≈ <b>26</b>', '20 + 26 = <b>46 dB</b>'],
    S4: ['ท่อปิดปลายหนึ่ง: f = v ÷ 4L = 340 ÷ 0.1 = <b>3400 Hz</b>'],
    S5: ['L = v ÷ 4f = 341 ÷ (4 × 3731) ≈ <b>0.02 m</b>'],
    S6: ['หูชั้นกลางขยายด้วย <b>hydraulic (area ratio)</b> ~25 dB + <b>lever</b> ~2 dB + drum buckling']
  });

  /* ---------- W · Light ---------- */
  add({
    W1: ['ใยแก้วนำแสง: แสงตกกระทบผนังเกิน critical angle → <b>total internal reflection</b>'],
    W2: ['Laser = <b>monochromatic</b>, directional, coherent → "polychromatic" ผิด', 'องค์ประกอบ: active medium + energy input + optical feedback'],
    W3: ['Photocoagulation = <b>thermal</b>: pigment ดูดแสง → ความร้อน → coagulate'],
    W4: ['ยิง <b>photocoagulation</b> รอบรอยฉีก → เกิดแผลเป็นยึด retina'],
    W5: ['ต้อกระจก = <b>femtosecond laser</b> (photodisruption)', 'Excimer = PRK/LASIK · argon = retina'],
    W6: ['<b>RK</b> ใช้มีดกรีด ไม่ใช่ laser และเลิกใช้แล้ว', 'PRK, LASIK = excimer · ReLEx/SMILE = femtosecond']
  });

  /* ---------- Lecture check-questions (data/lecq.js) ---------- */
  add({
    M1: ['ที่ rest ทั้ง chemical และ electrical force ของ Na⁺ ชี้<b>เข้า</b> → เปิด channel แล้ว Na⁺ ไหลเข้า', 'ไหลตาม gradient ผ่าน channel ไม่ต้องใช้ ATP'],
    M2: ['K⁺: chemical ออก vs electrical เข้า เกือบหักล้างกัน → Vm อยู่ใกล้ <b>E<sub>K</sub></b>', 'Na⁺: ทั้งสองแรงชี้เข้า → ห่างจาก equilibrium มาก'],
    M3: ['Pump มีหน้าที่<b>รักษา gradient</b> ไม่ได้สร้าง Vm โดยตรง', 'Vm มาจาก permeability + gradient ที่มีอยู่ → ตอนแรกยังใกล้ปกติ ค่อย ๆ ลดลงเมื่อ gradient หมด'],
    M5: ['[Na⁺] นอก ≫ ใน → ต้องให้ข้างใน<b>เป็นบวก</b>จึงจะดัน Na⁺ ไว้ได้ → E<sub>Na</sub> ≈ +60 mV'],
    M6: ['เพิ่ม permeability ต่อ ion ไหน → Vm ถูกดึงเข้าหา equilibrium potential ของ ion นั้น', 'pK ↑ → Vm → <b>E<sub>K</sub></b> (hyperpolarize)'],
    M8: ['Upstroke = <b>voltage-gated Na⁺ channel</b> เปิดเร็ว (positive feedback)', 'K⁺ channel เปิดทีหลัง → repolarize · pump ไม่ได้สร้าง spike'],
    M9: ['−62 mV ยัง<b>ไม่ถึง threshold</b> (−55 mV) → ไม่เกิด AP'],
    M10: ['AP เป็น <b>all-or-none</b> → ขนาดเท่ากัน', 'Stimulus แรงขึ้น → ความถี่ของ AP เพิ่ม ไม่ใช่ขนาด'],
    M11: ['Na⁺ channel ที่ inactivated ทำให้ AP วิ่ง<b>ทางเดียว</b> + จำกัดความถี่สูงสุด + กันการยิงไม่หยุด → <b>ถูกทุกข้อ</b>'],
    M17: ['Depolarize เล็กน้อย (A) → ใกล้ threshold → excitability อาจ ↑', 'Depolarize มากและนาน (B) → Na⁺ channel <b>inactivated</b> ค้าง → excitability ↓'],
    P1: ['Myelin = ฉนวน → <b>Rm ↑</b> (Cm ↓) → current รั่วน้อย วิ่งไปได้ไกล', 'Ra ↓ มาจาก axon ที่ใหญ่ขึ้น ไม่ใช่ myelin'],
    P2: ['λ ∝ √(Rm/Ra) → <b>Rm สูง</b> → current รั่วน้อย → ไปได้ไกลกว่า'],
    P6: ['Demyelination → Rm ↓, Cm ↑ → current รั่ว → ช้าลง → ถ้าไม่พอถึง node ถัดไป = <b>conduction block</b>', 'ถูก<b>ทุกตัวเลือก</b>'],
    P7: ['หลังติดเชื้อ + ascending weakness + areflexia + NCV ช้า = <b>GBS</b>', 'GBS = demyelination ของ peripheral nerve → เสียที่การ<b>นำ AP ตามเส้นประสาท</b> ไม่ใช่ NMJ'],
    P12: ['Ptosis, diplopia เจอได้ทั้งคู่ → แยกไม่ได้', 'LEMS = <b>presynaptic</b> (anti-VGCC → ACh release ↓) · MG = postsynaptic (anti-nAChR)'],
    P13: ['Block voltage-gated Na⁺ channel = <b>tetrodotoxin</b>', 'Botulinum = ACh release ↓ · α-bungarotoxin = block nAChR · tetanus = ยับยั้ง inhibitory neuron ใน cord'],
    P14: ['AChE inhibitor มาก → ACh ค้าง → end-plate depolarize ค้าง → Na⁺ channel <b>inactivated</b> → ไม่เกิด AP ใหม่ = depolarizing block'],
    L1: ['Absolute refractory = <b>กระตุ้นแรงแค่ไหนก็ไม่เกิด</b> AP ที่ 2 (Na⁺ channel inactivated)', 'ต้องแรงกว่าเดิมจึงเกิด = relative refractory'],
    L2: ['เส้นใหญ่ → Ra ↓ · มี myelin → Rm ↑, Cm ↓ → <b>large myelinated</b> เร็วที่สุด'],
    L3: ['NCV = ระยะทาง ÷ ผลต่าง latency = 40 mm ÷ (5 − 3) ms = <b>20 m/s</b>', 'ลบ latency 2 จุด → ตัดเวลาที่ NMJ และกล้ามเนื้อทิ้ง'],
    L4: ['ใต้ <b>cathode</b> ผิวนอกเป็นลบ → membrane depolarize → AP เริ่มตรงนี้', 'Anode → hyperpolarize'],
    L5: ['Anode hyperpolarize → กระตุ้นและนำยากขึ้น → บาง fiber ช้าลง (<b>latency ↑</b>) บางเส้นนำไม่ผ่าน (<b>amplitude ↓</b>)'],
    L7: ['ACh ขนาดต่ำ = เหมือน transmission ปกติ → EPP → muscle AP → <b>หดตัว</b>'],
    L8: ['ACh ขนาดสูง → nAChR ถูกกระตุ้นค้าง → depolarize ค้าง → Na⁺ channel inactivated → หดก่อนแล้ว<b>อัมพาต</b> (เหมือน succinylcholine)'],
    A1: ['ร่างกายตอบสนองเองโดยไม่ต้องสั่ง = <b>ANS</b> (involuntary) ตรงนี้คือ sympathetic'],
    A2: ['Ganglion ไม่ใช่แค่ relay แต่เป็น synapse ที่<b>ปรับและรวมสัญญาณ</b> นอก CNS ได้'],
    A4: ['Golden rule: preganglionic ทุกเส้น (sympathetic และ parasympathetic) หลั่ง <b>ACh</b> → nicotinic', 'Postganglionic sympathetic ส่วนใหญ่ = NE ยกเว้นต่อมเหงื่อ = ACh → muscarinic'],
    A10: ['β₁ = หัวใจ → <b>HR ↑</b>, contractility ↑', 'Bronchodilation = β₂ · vasoconstriction = α₁ · pupil constriction = muscarinic'],
    A11: ['Muscarinic (M2) ที่หัวใจ → pacemaker ช้าลง → <b>HR ↓</b> (เหมือนกระตุ้น vagus)'],
    G1: ['Ptosis + miosis + anhidrosis = <b>Horner</b> = sympathetic pathway เสีย', 'Ptosis มาจาก tarsal muscle (sympathetic) ไม่ใช่ levator (somatic)'],
    G3: ['เย็น → sympathetic → digital artery หดมากเกิน → <b>blood flow ↓</b>'],
    G4: ['<b>ขาวซีด (pallor)</b> = หลอดเลือดหดสุด flow แทบไม่มี', 'เขียว = flow ช้า เลือดขาด O₂ · แดง = reactive hyperemia ตอนเลือดกลับ'],
    G5: ['ตัด cervical sympathetic → dilator pupillae ไม่ทำงาน → sphincter (parasympathetic) ชนะ → <b>รูม่านตาเล็ก</b> (เหมือน Horner)'],
    G6: ['HR ↓, BP ↓, ลำไส้บีบ ↑, รูม่านตาเล็ก = ผลของ muscarinic ทั้งหมด → <b>parasympathetic</b> pattern'],
    O1: ['ฟันได้เลือดจาก <b>superior และ inferior alveolar artery</b> (แขนง maxillary a.)', 'ความรู้สึกจาก superior / inferior alveolar nerve (V2 / V3)'],
    O2: ['<b>Nasopalatine n.</b> (V2) ลงตาม nasal septum ผ่าน incisive foramen หลังฟันหน้า ไปเลี้ยง hard palate ส่วนหน้า'],
    O5: ['Intrinsic muscle ของลิ้นทั้ง 4 มัด = <b>hypoglossal (XII)</b>'],
    O8: ['Lingual a. วิ่ง<b>ลึกต่อ hyoglossus</b>', 'XII และ lingual n. วิ่งบนผิวด้านนอกของ hyoglossus'],
    O20: ['Wharton’s duct (submandibular) เปิดที่ <b>sublingual caruncle</b> ข้าง frenulum', 'Sublingual gland เปิดตาม sublingual fold'],
    O21: ['<b>Hypoglossal n.</b> โค้งข้าม carotid ใน submandibular triangle แล้ววิ่งบน hyoglossus ไปลิ้น'],
    O22: ['<b>Platysma</b> อยู่ใน superficial fascia คลุม submental และ submandibular triangle', 'Mylohyoid อยู่ลึกกว่า anterior belly'],
    D16: ['Auriculotemporal, buccal, lingual = sensory · inferior alveolar = sensory ไปฟันล่างเป็นหลัก', 'แขนงของมันคือ <b>nerve to mylohyoid</b> = motor ไป mylohyoid + anterior belly ของ digastric']
  });
})(window.THAI_Q = window.THAI_Q || {});
