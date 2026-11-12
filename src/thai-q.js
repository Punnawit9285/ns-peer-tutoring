/* Thai answer bullets for every past-paper question (1–3 bullets each), keyed by question ID.
   Shown under the answer in both decks and printed in the PDF answer key. */
(function (Q) {
  var add = function (o) { for (var k in o) Q[k] = o[k]; };

  /* ---------- V · Back ---------- */
  add({
    V1: ['Transverse process ยื่นออกด้านข้าง <b>ห่างจาก vertebral canal</b> → หักแล้วไม่ค่อยโดน cord', 'Pedicle, facet, uncovertebral joint ล้อมรอบ canal / foramen → หักแล้วกด cord หรือ root ได้'],
    V2: ['แท่งที่ยื่นออกด้านข้างจากรอยต่อ pedicle–lamina = <b>transverse process</b>'],
    V3: ['แผ่นกระดูกแบนจาก transverse process ไปหา spinous process เป็นหลังคา canal = <b>lamina</b>'],
    V4: ['Canal ของ lumbar เป็นสามเหลี่ยม ใหญ่กว่า thoracic แต่<b>เล็กกว่า cervical</b> → ข้อนี้ผิด', 'Mammillary process, accessory process, body รูปไต = ลักษณะ lumbar ที่ถูก'],
    V5: ['ปุ่มเล็กด้านหลังโคน transverse process = <b>accessory process</b>', 'Mammillary process อยู่ด้านหลัง superior articular process'],
    V6: ['มี facet ให้หัวซี่โครงบน body + facet ให้ tubercle บน transverse process → <b>thoracic</b> (ช่วงกลาง)'],
    V7: ['ขอบยกขึ้นด้านข้างของผิวบน body = <b>uncinate process</b> → เฉพาะ cervical (สร้าง uncovertebral joint)'],
    V8: ['Spinous process ยาว ชี้ลงชัน = <b>thoracic</b>'],
    V9: ['Nucleus pulposus อยู่<b>ค่อนไปด้านหลัง</b> ไม่ใช่ด้านหน้า → disc จึงแตกไปด้านหลัง (posterolateral)'],
    V10: ['<b>PLL</b> วิ่งด้านหลัง body ภายใน canal → เป็นผนังหน้าของ canal', 'ALL อยู่หน้า body; flavum, interspinous, nuchae อยู่หลัง canal'],
    V11: ['ช่องระหว่าง body สองอัน = <b>intervertebral disc</b>'],
    V12: ['รูด้านข้างระหว่าง pedicle สองอัน = <b>intervertebral foramen</b> → spinal nerve ออกทางนี้'],
    V13: ['ข้อระหว่าง articular process ของกระดูกบน–ล่าง มองจากด้านหลัง = <b>facet (zygapophyseal) joint</b>'],
    V14: ['เส้นเอ็นพาดบน<b>ปลาย</b> spinous process = <b>supraspinous ligament</b>', 'Interspinous อยู่<b>ระหว่าง</b> spine'],
    V15: ['Transversospinal: transverse → spine ข้างบน', 'Multifidus ข้าม <b>2–4</b> ปล้อง · semispinalis 4–6 · rotatores 1–2 → ข้าม 3 = <b>multifidus</b>'],
    V16: ['กล้ามเนื้อหนาชั้นลึกชิด spine ช่วง lumbar = <b>multifidus</b>'],
    V17: ['Erector spinae แถวนอกสุด ไปเกาะมุมซี่โครง = <b>iliocostalis</b> (S-L-I จากในออกนอก)'],
    V18: ['กล้ามเนื้อเหมือนผ้าพันแผล จาก ligamentum nuchae ขึ้นไป mastoid = <b>splenius capitis</b>'],
    V19: ['แถวนอกสุดของ erector spinae มีแขนงไปซี่โครง = <b>iliocostalis</b>']
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
    N2: ['Axon hillock = ส่วนรูปกรวยของ soma ที่<b>ไม่มี Nissl body</b> (สีจาง) → D'],
    N3: ['Process ที่ยังมี Nissl substance = <b>dendrite</b> → A'],
    N4: ['Lipofuscin = สารสีเหลืองน้ำตาลใน cytoplasm ของ neuron สูงอายุ → B'],
    N5: ['Karyon = <b>nucleus</b> → C'],
    N6: ['ตัวเซลล์ใหญ่ มี Nissl เต็ม nucleus ใหญ่จาง nucleolus ชัด = <b>neuron</b>'],
    N7: ['Neuron มี nucleus แบบ <b>vesicular</b> (จาง) + nucleolus ชัด', 'End-feet = astrocyte'],
    N8: ['ขนส่งจาก soma → terminal = <b>anterograde axonal transport</b> (kinesin)', 'Retrograde = กลับเข้า soma (ทางที่ toxin/virus ใช้)'],
    N9: ['Postsynaptic = เซลล์อีกฝั่งของ cleft ที่มี membrane หนาทึบ → D'],
    N10: ['วงกลมเล็กๆ อัดแน่นใน terminal = <b>synaptic vesicle</b> → B'],
    N11: ['ช่องแคบที่ myelin สอง internode มาชนกัน = <b>node of Ranvier</b> → D'],
    N12: ['เส้นตรงกลางใน myelin = <b>axon</b> → B'],
    N13: ['รอยคอดระหว่าง myelin สองท่อน = <b>node of Ranvier</b>'],
    N14: ['ช่องขาวจางรอบ axon = <b>myelin</b> (lipid ละลายไปตอนเตรียม slide)'],
    N15: ['<b>Microglia</b> = macrophage ของ CNS', 'Astrocyte = BBB, scar · oligodendrocyte = myelin CNS · Schwann = PNS'],
    N16: ['Marker ของ astrocyte = <b>GFAP</b>'],
    N17: ['Schwann cell สร้าง myelin, ปกป้อง axon, หลั่ง growth factor, นำทาง regeneration', '<b>ไม่เปลี่ยนเป็น neuron</b>'],
    N18: ['เซลล์รูปดาว มี process ดำแผ่ออกรอบตัว = <b>astrocyte</b>'],
    N19: ['ปลาย process ไปแปะหลอดเลือด (end-feet) → <b>blood–brain barrier</b>'],
    N20: ['EM: เซลล์หนึ่งตัวห่อ axon ที่มี myelin หนึ่งเส้น = <b>Schwann cell</b>'],
    N21: ['Schwann cell = glia ของ PNS → อยู่ใน <b>peripheral nerve</b>'],
    N22: ['รูเล็กกลาง grey commissure = <b>central canal</b>'],
    N23: ['Central canal บุด้วย ependyma ต่อกับ ventricle → มี <b>CSF</b>'],
    N24: ['Neuron ตัวกลมใหญ่ใน sensory ganglion = <b>ganglion cell</b>'],
    N25: ['Nucleus เล็กแบนล้อมรอบ ganglion cell = <b>satellite cell</b> (glia ของ PNS)'],
    N26: ['Meissner = <b>light touch</b> (ผิวไม่มีขน)', 'Pacinian = vibration/pressure · free ending = pain, temperature']
  });

  /* ---------- C · Spinal cord ---------- */
  add({
    C1: ['งูสวัดขึ้นตาม dermatome เดียว', 'สะดือ = <b>T10</b> · หัวนม = T4 · xiphoid = T7'],
    C2: ['Xiphoid = <b>T7</b>'],
    C3: ['ปลาย cord ที่เรียวแหลม = <b>conus medullaris</b> (~L1–L2)'],
    C4: ['มัด root ใต้ conus = <b>cauda equina</b>'],
    C5: ['ส่วนป่องของ cord ส่วนล่างเหนือ conus (root ไปขา) = <b>lumbosacral enlargement</b>'],
    C6: ['มัด root ใต้ปลาย cord = <b>cauda equina</b>'],
    C7: ['เข็ม LP: supraspinous → interspinous → <b>flavum</b> → epidural → dura + arachnoid → subarachnoid (CSF)', '<b>PLL</b> อยู่ผนังหน้า canal → เข็มไม่ผ่าน'],
    C8: ['Cord จบ L1–L2 แต่ dural sac ถึง S2 → แทงที่ <b>L3/L4</b> หรือ L4/L5'],
    C9: ['ท่อหนาด้านนอกที่ถูกเปิดออก = <b>dura mater</b>'],
    C10: ['นอก dura = epidural fat (+ venous plexus) · ใน dura = arachnoid → แยก <b>fat กับ arachnoid</b>'],
    C11: ['ด้านหลัง นอก dural tube = <b>posterior epidural space</b>'],
    C12: ['ท่อเหนียวที่หุ้ม cord = <b>dura mater</b>'],
    C13: ['ร่องลึกกว้างด้านบน = ventral median fissure → ล่าง = dorsal', 'จุดที่ dorsal horn ถึงผิว = <b>dorsolateral sulcus</b>'],
    C14: ['Dorsal (<b>sensory</b>) rootlet เข้า cord ตาม dorsolateral sulcus'],
    C15: ['ร่องลึกกลางด้านหน้า cord = <b>ventral median fissure</b>'],
    C16: ['<b>Anterior spinal artery</b> (เส้นเดียว) วิ่งใน ventral median fissure → เลี้ยง 2/3 หน้า'],
    C17: ['C เล็กสุดแต่<b>ไม่มี myelin</b>', 'ใน myelinated: Aα &gt; Aβ &gt; Aγ &gt; Aδ &gt; <b>B</b> → B เล็กสุด'],
    C18: ['ใหญ่ + myelin → เร็ว → <b>Aα</b> เร็วสุด'],
    C19: ['Neurapraxia = myelin · axonotmesis = axon · <b>neurotmesis = ขาดทั้งเส้นถึง epineurium</b>'],
    C20: ['ตัดเรียบ สด ช่องว่างแทบไม่มี → <b>เย็บต่อตรง</b> (direct repair)', 'Graft (เช่น sural) ใช้เมื่อปลายสองข้างดึงมาชนไม่ได้']
  });

  /* ---------- K · Skull ---------- */
  add({
    K1: ['กะโหลกชายหนาใหญ่: <b>brow ridge ใหญ่</b>, มุม mandible เหลี่ยม, ขอบ orbit มน, หน้าผากลาด', 'Obtuse angle, ขอบ orbit คม, หน้าผากตั้ง = หญิง'],
    K2: ['Cribriform plate = ส่วนของ <b>ethmoid</b> → CN I ลอดผ่าน'],
    K3: ['<b>Pterion</b> = F + P + S (greater wing) + T มาชนเป็นรูป H', 'Asterion = P + O + T · bregma = coronal ชน sagittal'],
    K4: ['Frontal ↔ parietal = <b>coronal</b> · parietal ↔ parietal = sagittal · parietal ↔ occipital = lambdoid'],
    K5: ['จุดที่กระดูก 4 ชิ้นมาชนกันที่ขมับ = <b>pterion</b>'],
    K6: ['หลังหู P + O + T = <b>asterion</b>'],
    K7: ['มองจากบน รอยต่อพาดขวางด้านหน้า = <b>coronal</b>'],
    K8: ['ด้านหลัง ปลาย sagittal = <b>lambdoid</b>'],
    K9: ['พาดขวางด้านหน้า = <b>coronal</b> (ไม่มี bregmoid suture)'],
    K10: ['ด้านหลังกะโหลก = <b>lambdoid</b>'],
    K11: ['รอยต่อรูป H ที่ขมับ (บางสุด) = <b>pterion</b>'],
    K12: ['หลัง mastoid = <b>asterion</b>', 'Gnathion = จุดต่ำสุดของคาง · inion = external occipital protuberance'],
    K13: ['Jugular foramen = <b>IX, X, XI</b> + IJV', '<b>XII</b> ออกทาง hypoglossal canal ของตัวเอง'],
    K14: ['Foramen ovale (OVALE): <b>O</b>tic ganglion, <b>V</b>3, <b>A</b>ccessory meningeal a., <b>L</b>esser petrosal, <b>E</b>missary v.', 'Middle meningeal a. → spinosum'],
    K15: ['V1 = SOF · <b>V2 = rotundum</b> · V3 = ovale'],
    K16: ['รูกลมเล็ก<b>หน้า</b> foramen ovale = <b>foramen rotundum</b>', 'เฉลย recall ให้ ovale แต่ข้อคู่เฉลย maxillary n. → rotundum เข้ากันกว่า'],
    K17: ['Foramen rotundum → <b>maxillary nerve (V2)</b>'],
    K18: ['รูกลมใต้ SOF ด้านหน้า middle fossa = <b>foramen rotundum</b>'],
    K19: ['Rotundum → <b>V2</b>'],
    K20: ['รูหลัง petrous temporal ปลายร่อง sigmoid = <b>jugular foramen</b>'],
    K21: ['Jugular foramen → <b>IX</b> (+ X, XI)', 'VII, VIII → IAM · XII → hypoglossal canal'],
    K22: ['SOF มี III, IV, V1, VI', '<b>V2</b> ออกทาง rotundum ใต้ fissure → โดนน้อยสุด'],
    K23: ['V1 วิ่งผ่าน SOF = ช่องระหว่าง lesser/greater wing ของ <b>sphenoid</b>']
  });

  /* ---------- Z · Cranial cavity ---------- */
  add({
    Z1: ['Middle meningeal a. อยู่ระหว่างกะโหลกกับ dura → <b>epidural</b> (เหนือ dura)', 'Bridging vein → subdural · aneurysm → subarachnoid'],
    Z2: ['ปุ่มคล้ายดอกกะหล่ำตามแนวกลาง = <b>arachnoid granulation</b> → ระบาย CSF เข้า SSS', 'Granular foveolae = หลุมที่มันทำไว้บนกะโหลก'],
    Z3: ['วิ่งแนวนอนตามขอบ tentorium ด้านหลัง = <b>transverse sinus</b>'],
    Z4: ['ปุ่มข้างแนวกลาง = <b>arachnoid granulation</b>'],
    Z5: ['หลอดเลือดบนผิวสมองวิ่งขึ้นหา SSS = <b>superior cerebral (bridging) vein</b> → ขาดแล้วเกิด subdural'],
    Z6: ['Infratentorial = posterior fossa → มี <b>sigmoid sinus</b>', 'Optic n., superior cerebral v., falx cerebri อยู่เหนือ tentorium'],
    Z7: ['ในขอบ tentorium ที่ occipital = <b>transverse sinus</b>'],
    Z8: ['Dura รูปเต็นท์คลุม posterior fossa = <b>tentorium cerebelli</b>'],
    Z9: ['Midbrain = <b>III, IV</b> · pons = V, VI, VII · VIII ที่ pontomedullary junction'],
    Z10: ['เส้นเล็กออกหน้า brainstem ที่รอยต่อ pons–medulla = <b>abducens</b>'],
    Z11: ['ใต้ pons ที่ vertebral a. มาชน = <b>medulla</b>'],
    Z12: ['แขนง trigeminal อันหลังสุด ลงไป foramen ovale = <b>mandibular n.</b>'],
    Z13: ['หลอดเลือดใหญ่โผล่ข้าง sella จาก cavernous sinus = <b>ICA</b>'],
    Z14: ['เส้นเรียวใกล้แนวกลางที่รอยต่อ pons–medulla = <b>abducens</b>'],
    Z15: ['วิ่งขึ้นกลางหน้า pons = <b>basilar artery</b>'],
    Z16: ['Posterior circulation = vertebral → basilar → <b>PCA</b>', 'ICA, ophthalmic, ACA, MCA = anterior'],
    Z17: ['SSS, straight, occipital เข้า confluence · transverse ออกจาก confluence', '<b>Inferior sagittal</b> + great cerebral v. → straight sinus → ถึง confluence ทางอ้อม'],
    Z18: ['แขนง trigeminal ลง foramen ovale = <b>mandibular n.</b>'],
    Z19: ['ถูกตัดที่ foramen magnum ข้าง medulla = <b>vertebral artery</b>']
  });

  /* ---------- F · Face & neck ---------- */
  add({
    F1: ['Orbicularis oculi (VII) = <b>ปิดตา/กะพริบ</b> → อัมพาตแล้วกะพริบไม่ได้ เสี่ยง corneal ulcer', 'Ptosis = levator (III) หรือ Müller (sympathetic)'],
    F2: ['กล้ามที่ขยับผิวคอ = platysma = กล้ามแสดงสีหน้า → <b>cervical branch ของ VII</b>', 'Ansa cervicalis → strap muscles'],
    F3: ['หน้าผากด้านใน = supratrochlear/supraorbital a. จาก <b>ophthalmic (ICA)</b> → A'],
    F4: ['ทำหน้ารังเกียจ = ย่นจมูก ยกริมฝีปากบน → <b>levator labii superioris alaeque nasi</b> → D'],
    F5: ['Procerus เกาะต้นจาก <b>nasal bone</b> → B'],
    F6: ['Corrugator เกาะจาก<b>สันคิ้ว (superciliary arch)</b> → A'],
    F7: ['กล้ามลึกที่หัวคิ้ว = <b>corrugator supercilii</b>'],
    F8: ['เส้นเล็กออกจากมุมบนด้านในของ orbit = <b>supratrochlear n.</b> (V1)'],
    F9: ['Marginal mandibular (VII) → กล้ามดึงมุมปากลง → <b>มุมปากตก</b>', 'เป็น motor → ไม่ชา (ชา = mental n., V3)'],
    F10: ['ท่อหนาพาดผ่าน masseter ใต้ zygomatic arch = <b>parotid duct</b>'],
    F11: ['กล้ามแก้มชั้นลึกที่ parotid duct แทงผ่าน = <b>buccinator</b>'],
    F12: ['ผิวหน้า 3 แถบ: บน V1 · <b>กลาง V2</b> · ล่าง V3', 'แขนง VII เป็น motor'],
    F13: ['กล้ามแบนที่มี hypoglossal n. พาดบนผิว = <b>hyoglossus</b> → เกาะจาก hyoid'],
    F14: ['IAN ให้ nerve to mylohyoid ก่อนเข้า mandibular foramen → <b>mylohyoid + anterior digastric</b> → D'],
    F15: ['จาก mastoid ลงมา hyoid = <b>posterior belly of digastric</b> (VII)'],
    F16: ['แขนงแรกของ ECA โค้งลงไปขั้วบน thyroid = <b>superior thyroid a.</b>'],
    F17: ['Strap muscle ชั้นตื้น sternum → hyoid ชิดแนวกลาง = <b>sternohyoid</b>'],
    F18: ['แผ่นกล้ามพื้นปากเหนือ hyoid = <b>mylohyoid</b>']
  });

  /* ---------- D · Deep face ---------- */
  add({
    D1: ['ช่องใต้ zygomatic arch ลึกต่อ ramus = <b>infratemporal fossa</b>'],
    D2: ['ใน infratemporal fossa: pterygoids, maxillary a., pterygoid plexus, V3 + แขนง', '<b>Mental n.</b> = ปลาย IAN ที่คาง → ไม่อยู่ใน fossa'],
    D3: ['ปิดปาก 3 ตัว: <b>temporalis, masseter, medial pterygoid</b>', 'Lateral pterygoid = อ้าปาก + ยื่นคาง'],
    D4: ['ยื่นคาง = <b>lateral + medial pterygoid</b> (+ superficial masseter)', 'Temporalis ใยหลัง = ดึงคางกลับ → ตัดตัวเลือกที่มี temporalis'],
    D5: ['ผิวด้านในของ lateral pterygoid plate = origin ของ <b>medial pterygoid</b>'],
    D6: ['Medial pterygoid เกาะ<b>ผิวด้านในของ ramus</b> (คู่กับ masseter ด้านนอก)'],
    D7: ['วิ่งแนวนอนไปข้างหน้าจากคอ mandible = <b>lateral pterygoid</b>'],
    D8: ['Lateral pterygoid ← <b>ผิวนอก</b>ของ lateral pterygoid plate', 'Medial pterygoid ← ผิวใน'],
    D9: ['กล้ามหนาสี่เหลี่ยมบนผิวนอก ramus = <b>masseter</b>'],
    D10: ['กล้ามบดเคี้ยวทุกตัว ← <b>V3</b>'],
    D11: ['วิ่งตรงขึ้นจาก maxillary a. ส่วนแรกไปฐานกะโหลก = <b>middle meningeal a.</b>'],
    D12: ['Middle meningeal a. → <b>foramen spinosum</b>'],
    D13: ['หลอดเลือดขึ้นไปฐานกะโหลก มี auriculotemporal n. โอบรอบ = <b>middle meningeal a.</b>'],
    D14: ['เส้นประสาทที่แยกสองแขนงโอบ MMA แล้ววิ่งไปหู = <b>auriculotemporal n.</b>'],
    D15: ['V3 motor: กล้ามบดเคี้ยว, mylohyoid, ant. digastric, tensor veli palatini, <b>tensor tympani</b>', 'Stapedius = VII'],
    D16: ['ฟันล่าง ← <b>inferior alveolar n.</b> (V3) → จบเป็น mental n.'],
    D17: ['<b>Infraorbital n.</b> = ปลาย V2', 'Lingual, auriculotemporal, IAN, buccal = sensory ของ V3'],
    D18: ['หลอดเลือดเล็กวิ่งคู่ IAN ไป mandibular foramen = <b>inferior alveolar a.</b>'],
    D19: ['IAA เลี้ยง mandible + <b>ฟันล่าง</b>']
  });

  /* ---------- O · Oral cavity ---------- */
  add({
    O1: ['กล้ามรูปพัดจากหลังคางขึ้นไปในลิ้น = <b>genioglossus</b>'],
    O2: ['กล้ามลิ้นทุกตัว ← <b>XII</b> ยกเว้น palatoglossus ← X'],
    O3: ['กล้ามรูปพัดเต็มลิ้นใน midline section = <b>genioglossus</b>'],
    O4: ['Genioglossus = กล้ามลิ้น → <b>hypoglossal</b>'],
    O5: ['พื้นปาก: <b>lingual n.</b> อยู่ใต้ mucosa เหนือ mylohyoid บน hyoglossus (วนใต้ submandibular duct)', 'Hypoglossal n. อยู่ต่ำกว่าบน hyoglossus'],
    O6: ['<b>Lingual a.</b> (ECA) วิ่งลึกต่อ hyoglossus → ให้ sublingual a. เลี้ยงพื้นปาก'],
    O7: ['<b>Mylohyoid</b> = พื้นปาก: sublingual gland อยู่บน · submandibular ส่วนตื้นอยู่ล่าง'],
    O8: ['เหนือ submandibular space (อ้อมขอบหลัง mylohyoid) = sublingual space + <b>ลิ้น</b>', 'ติดเชื้อลามขึ้น → ลิ้นถูกดันขึ้น (Ludwig angina)'],
    O9: ['Sublingual gland เปิดด้วย<b>ท่อเล็กหลายท่อ</b>ตาม sublingual fold', 'Wharton = submandibular · Stensen = parotid'],
    O10: ['เฉลย = <b>submandibular triangle</b> (ต่อมทั้งต่อมอยู่ใน triangle)', 'หลายตำราบอกส่วนลึกอยู่เหนือ mylohyoid ใน sublingual space'],
    O11: ['Digastric มีสองเส้นประสาท: <b>posterior belly ← VII</b> · anterior belly ← V3'],
    O12: ['จากหลังมุม mandible ลงมา hyoid = <b>posterior belly of digastric</b>'],
    O13: ['Posterior belly digastric ← <b>facial n.</b>'],
    O14: ['ต่อมใต้ body ของ mandible โอบขอบหลัง mylohyoid = <b>submandibular gland</b>'],
    O15: ['Submandibular → <b>Wharton’s duct</b> → sublingual papilla'],
    O16: ['กล้ามเรียวจาก styloid ไป hyoid มี digastric tendon แทรก = <b>stylohyoid</b>'],
    O17: ['Stylohyoid = กล้าม arch 2 → <b>facial n.</b>'],
    O18: ['ต่อมใต้ mandible = <b>submandibular</b> (submaxillary = ชื่อเก่าของต่อมเดียวกัน)'],
    O19: ['เส้นประสาทวิ่งไปข้างหน้าบน hyoglossus ใต้ต่อมและท่อ = <b>hypoglossal n.</b>'],
    O20: ['Tonsil ระบายไป <b>jugulodigastric node</b> → คลำได้<b>ใต้มุม mandible</b>']
  });

  /* ---------- J · Deep neck ---------- */
  add({
    J1: ['แขนงของ CCA ที่<b>ไม่มีแขนง</b>ในคอ อยู่หลัง-นอกต่อ ECA = <b>ICA</b>'],
    J2: ['หลอดเลือดใหญ่โค้งออกด้านข้างข้าม rib 1 = <b>subclavian</b>'],
    J3: ['ขึ้นตรงจาก subclavian ส่วนแรกไป transverse foramen C6 = <b>vertebral a.</b>'],
    J4: ['ลำสั้นข้าง vertebral a. แตกเป็น inferior thyroid, suprascapular, transverse cervical = <b>thyrocervical trunk</b>'],
    J5: ['แขนงแรกของ arch ด้านขวา แตกเป็น R subclavian + R CCA = <b>brachiocephalic trunk</b>'],
    J6: ['ขึ้นตรงข้าง trachea = <b>common carotid</b>'],
    J7: ['แขนงแรกในสุดของ subclavian ขึ้นไปบน = <b>vertebral a.</b>'],
    J8: ['ลำสั้นแตกหลายแขนง = <b>thyrocervical trunk</b>'],
    J9: ['IJV อยู่ใต้ <b>SCM</b> → แทงที่ยอดสามเหลี่ยมระหว่าง sternal กับ clavicular head ด้านนอก carotid'],
    J10: ['ผูก inferior thyroid a. → เสี่ยง <b>RLN</b> → อัมพาตกล้ามกล่องเสียงทุกตัวยกเว้น cricothyroid', '<b>Posterior cricoarytenoid</b> = abductor ตัวเดียว'],
    J11: ['แทง thyrohyoid membrane เข้ากล่องเสียง = <b>internal laryngeal n.</b> (sensory เหนือ vocal cord)'],
    J12: ['Internal laryngeal n. ไปคู่กับ superior laryngeal a. = <b>แขนงของ superior thyroid a.</b>'],
    J13: ['สายมี ganglion บนกล้าม prevertebral หลัง carotid sheath = <b>sympathetic trunk</b>'],
    J14: ['เส้นใหญ่ใน carotid sheath ระหว่าง a. กับ v. = <b>vagus</b>'],
    J15: ['วิ่งลงหน้า anterior scalene = <b>phrenic n.</b> (C3–5)'],
    J16: ['Phrenic → <b>diaphragm</b> อัมพาตข้างนั้น'],
    J17: ['สายหลัง carotid sheath บน vertebral column = <b>sympathetic trunk</b>'],
    J18: ['ตัด cervical sympathetic → ptosis, miosis, anhidrosis = <b>Horner</b>'],
    J19: ['Danger space = ระหว่าง <b>alar กับ prevertebral fascia</b> → ยาวถึง diaphragm → ติดเชื้อลง mediastinum', 'Retropharyngeal = buccopharyngeal กับ alar'],
    J20: ['Investing layer หุ้ม <b>SCM</b> + trapezius (+ parotid, submandibular)', 'Strap muscles อยู่ใน pretracheal layer'],
    J21: ['Zone I: sternal notch → cricoid · II: cricoid → มุม mandible · III: เหนือมุม mandible', '<b>Oesophagus</b> เริ่มที่ cricoid → ไม่อยู่ใน zone III'],
    J22: ['Zone I = thoracic inlet: trachea, oesophagus, thyroid, lung apex, ต้นหลอดเลือดใหญ่', '<b>Pharynx</b> จบที่ cricoid → อยู่ zone II–III']
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
    E14: ['โดมใสด้านหน้า = <b>cornea</b>'],
    E15: ['เส้นใหญ่ออกจากหลังลูกตา = <b>optic n.</b>'],
    E16: ['ชั้นเซลล์หลายแถวบนผิว = <b>corneal epithelium</b> (stratified squamous)'],
    E17: ['Stroma หลวมๆ บน pigment epithelium สีดำ ยื่นหน้า lens = <b>iris</b>'],
    E18: ['ก้อนนูนสองด้านหลัง iris = <b>lens</b>'],
    E19: ['เส้นประ = จุดที่ retina หนาหยุด = <b>ora serrata</b>'],
    E20: ['หน้าต่างใสด้านหน้าลูกตาที่ผ่า = <b>cornea</b>'],
    E21: ['ก้อนเหลืองนูนสองด้าน = <b>lens</b>'],
    E22: ['Aqueous สร้างจาก ciliary process → ออกทาง <b>trabecular meshwork</b> → canal of Schlemm', 'อุดตัน → ความดันลูกตาสูง (glaucoma)'],
    E23: ['แผ่นบางมีสียื่นหน้า lens = <b>iris</b>'],
    E24: ['วงกล้ามเนื้อหนารูปสามเหลี่ยมหลังโคน iris = <b>ciliary body</b>'],
    E25: ['Afferent: cornea → long ciliary n. → <b>nasociliary</b> → V1', 'Efferent = VII (orbicularis oculi)'],
    E26: ['ไม่มี nasociliary ในตัวเลือก → เลือกต้นสาย <b>ophthalmic n. (V1)</b>']
  });

  /* ---------- H · Ear ---------- */
  add({
    H1: ['ส่วนล่างนุ่มไม่มีกระดูกอ่อน = <b>lobule</b>'],
    H2: ['ติ่งเล็กหน้ารูหู = <b>tragus</b>'],
    H3: ['ผนังหน้า: รูเปิด <b>auditory tube</b> + tensor tympani (มี ICA อยู่หลังผนัง)', 'Aditus = ผนังหลัง · promontory, round window = ผนังใน'],
    H4: ['ผนังหลัง (mastoid): aditus, pyramid + stapedius, <b>facial canal ส่วนลง</b>'],
    H5: ['ผนังใน: promontory, <b>oval window</b>, round window, facial canal ด้านบน', 'ผนังนอก = tympanic membrane'],
    H6: ['Facial canal วิ่งผนังใน แล้ว<b>ลงในผนังหลัง (mastoid)</b> → COM ลามไป mastoid ถึงเส้นประสาท'],
    H7: ['ทางเสียง: TM → ossicles → stapes → oval window → perilymph → cochlear duct', '<b>Eustachian tube</b> แค่ปรับความดัน + ระบาย'],
    H8: ['Tensor tympani (V3) → <b>ด้ามของ malleus</b> · stapedius (VII) → คอ stapes'],
    H9: ['Stapedius ← <b>VII</b> → อัมพาต = hyperacusis'],
    H10: ['ห่วงสามวงบนหูชั้นใน = <b>semicircular canals</b>'],
    H11: ['ท่อจากหูชั้นกลางลงหน้าไป nasopharynx = <b>auditory tube</b>'],
    H12: ['ท่อลงหน้าไปคอหอย = <b>auditory tube</b>'],
    H13: ['ห่วงของหูชั้นใน = <b>semicircular canal</b>'],
    H14: ['หัวกลม ด้ามยาว = <b>malleus</b>'],
    H15: ['Body + process ยาวและสั้น (เหมือนฟันกราม) = <b>incus</b>'],
    H16: ['รูกระดูกหลัง TMJ บนกะโหลกแห้ง = <b>external acoustic meatus</b>'],
    H17: ['ปุ่มกลมหลังล่างรูหู = <b>mastoid process</b>'],
    H18: ['Crista → hair cell + <b>cupula</b> · macula → otolithic membrane · Corti → tectorial'],
    H19: ['แผ่น hair cell แบน มีชั้นวุ้น + ผลึกด้านบน = <b>macula</b>'],
    H20: ['Macula มี <b>otolithic membrane</b> (otoconia)'],
    H21: ['Stapes ดัน perilymph ของ vestibule เข้า <b>scala vestibuli</b> → helicotrema → scala tympani → round window'],
    H22: ['ได้ยิน = <b>organ of Corti</b>', 'Macula, crista = vestibular · macula lutea = จอตา'],
    H23: ['ช่องกลางรูปสามเหลี่ยมระหว่าง vestibular กับ basilar membrane = <b>cochlear duct</b>'],
    H24: ['เฉลย = <b>cochlea</b> (bony capsule)', 'จริงๆ เป็นส่วนของ petrous temporal bone'],
    H25: ['ช่อง endolymph บน organ of Corti = <b>cochlear duct</b>'],
    H26: ['แผ่นวุ้นคลุม hair cell = <b>tectorial membrane</b>']
  });

  /* ---------- M · Membrane potential ---------- */
  add({
    M1: ['Na⁺ นอกเซลล์ต่ำ → <b>E<sub>Na</sub> บวกน้อยลง</b> → overshoot ต่ำลง', 'RMP แทบไม่เปลี่ยน เพราะตอนพัก membrane ซึมผ่าน K⁺ เป็นหลัก'],
    M2: ['Repolarization อาศัย <b>voltage-gated K⁺ channel</b> เปิด', 'บล็อก → AP ยาว repolarize ช้า ยิงซ้ำ'],
    M3: ['K⁺ นอกเซลล์สูงมาก → RMP บวกขึ้นค้าง → Na⁺ channel <b>inactivate</b>', 'ยิง AP ไม่ได้เลย = depolarization block'],
    M4: ['Na⁺ นอกเซลล์สูง → E<sub>Na</sub> บวกขึ้น → แรงขับ Na⁺ มากขึ้น → <b>AP สูงขึ้น ถี่ขึ้น</b>'],
    M5: ['Na⁺ ต่ำ → E<sub>Na</sub> บวกน้อยลง → <b>amplitude ลด</b> (ยังยิง AP ได้)'],
    M6: ['Hyponatremia → E<sub>Na</sub> และแรงขับ Na⁺ ลด → AP <b>เล็กลง ยิงน้อยลง</b>'],
    M7: ['K⁺ นอกเซลล์ต่ำ → gradient ห่างขึ้น → RMP ลบมากขึ้น = <b>hyperpolarization</b> → ไกล threshold → อ่อนแรง']
  });

  /* ---------- P · Nerve & NMJ ---------- */
  add({
    P1: ['Myelin = R<sub>m</sub> สูง, C<sub>m</sub> ต่ำ', 'Demyelination → <b>R<sub>m</sub> ลด → กระแสรั่ว</b> → λ สั้น → ถึง node ถัดไปไม่พอ → นำช้า'],
    P2: ['NMO-IgG = anti-<b>AQP4</b> บน astrocyte end-feet', 'Astrocyte ตาย → myelin ใน CNS หายตามมา (optic n. + cord)'],
    P3: ['เฉลยตามคำวินิจฉัย MS: WBC ทำลาย myelin ใน CNS → <b>plaque หลายจุด</b>', 'อาการในโจทย์จริงๆ เป็น MG (thymus, ptosis, diplopia → nAChR ถูกดึงเข้าเซลล์)'],
    P4: ['TTX → บล็อก <b>voltage-gated Na⁺ channel</b> → ไม่เกิด AP'],
    P5: ['α-bungarotoxin จากงูทับสมิงคลา → <b>บล็อก nAChR</b> ด้าน postsynaptic', 'ตัด SNARE = botulinum'],
    P6: ['Malignant hyperthermia: <b>RyR1 กลายพันธุ์</b> → SR ปล่อย Ca²⁺ ไม่หยุด เมื่อได้ halothane / succinylcholine', 'กล้ามเกร็ง ไข้สูง เผาผลาญสูง']
  });

  /* ---------- L · Lab ---------- */
  add({
    L1: ['<b>Succinylcholine</b> และ <b>ACh dose สูง</b> → end-plate depolarize ค้าง → Na⁺ channel inactivate', 'กระตุ้นเส้นประสาทไม่หด แต่กระตุ้นกล้ามโดยตรงยังหด → บล็อกที่ NMJ']
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
    P7: ['เฉลยตาม thymus → <b>MG</b>: antibody บล็อก/ดึง <b>nAChR</b> เข้าเซลล์', 'อาการ infection + flaccid + demyelination เป็น GBS (ไม่ใช่ NMJ) → แยกสองโรคให้ออก'],
    A1: ['β receptor ตอบ <b>NE</b> → ใยที่หลั่ง NE = sympathetic postganglionic (การหลั่งน้ำอสุจิ = sympathetic)', 'Preganglionic ทุกเส้น, parasympathetic post, sympathetic ไปต่อมเหงื่อ = ACh'],
    A2: ['น้ำลายใสปริมาณมาก = parasympathetic → ACh บน <b>M3</b> → ให้ <b>muscarinic agonist</b> (pilocarpine)', 'Sympathetic → น้ำลายน้อย เหนียว'],
    A3: ['Catecholamine → <b>α1</b> ที่ <b>internal urethral sphincter</b> → หด', 'Iris sphincter, ลำไส้, detrusor หดด้วย parasympathetic · external sphincter = กล้ามลาย'],
    A4: ['เฉลย = <b>antimuscarinic</b> → detrusor คลาย ลด urge leakage', 'บล็อก α1 จะทำให้ internal sphincter คลาย → รั่วมากขึ้น'],
    A5: ['β2 (β3) → กล้ามเรียบคลาย → <b>detrusor คลาย</b>', 'Internal sphincter หด = α1 · เหงื่อ = muscarinic'],
    A6: ['<b>α2</b> ที่ปลายประสาท = autoreceptor เบรกการหลั่ง NE', 'บล็อก α2 → NE หลั่งมากขึ้น']
  });

  /* ---------- G · ANS integration ---------- */
  add({
    G1: ['ก่อนหยอด: ตาขวา (Horner) รูม่านตาเล็กกว่า', 'Apraclonidine = α1 อ่อน → dilator ที่ denervated มี α1 เพิ่ม → <b>ตาขวาขยาย</b> ตาซ้ายไม่ขยาย → anisocoria <b>กลับข้าง</b> → A']
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
})(window.THAI_Q = window.THAI_Q || {});
