/* Past-paper questions, Video 6: S sound & hearing, W light & laser. */
(function () {
  /* ---------- S · Sound & hearing ---------- */
  CVS.after('S-C1', [
    { id: 'S1', src: 'AC80', core: true, q: 'A sound wave travels 272.8 m in air with a velocity of 341 m/s. How long does it take (in seconds)?',
      o: ['0.11', '0.8', '8', '80', '800'], a: 1,
      ex: 'time = distance ÷ speed = 272.8 ÷ 341 = 0.8 s.' }
  ]);
  CVS.after('S-C3', [
    { id: 'S2', src: 'AC81', q: 'Differences in amplitude lead to which value used to determine the direction of sound?',
      o: ['Interaural time difference', 'Interaural level difference', 'Interaural phase difference', 'Doppler', 'Phase'], a: 1,
      ex: 'A difference in amplitude (loudness) between the ears is the interaural level difference, from the head shadow; it works for high frequencies. Low frequencies use the interaural time (phase) difference.' }
  ]);
  CVS.after('S-C4', [
    { id: 'S3', src: 'AC80', core: true,
      q: 'A sound is 20 dB HL at 1000 Hz. The middle ear magnifies sound pressure 20-fold. What is the level (dB) at the inner ear?',
      o: ['12.5', '20', '26', '27.5', '46'], a: 4,
      ex: 'For pressure, gain in dB = 20 log₁₀(ratio) = 20 × log₁₀ 20 = 20 × 1.3 = 26 dB. 20 + 26 = 46 dB.' },
    { id: 'S4', src: 'AC81', q: 'The external acoustic meatus, a tube closed at one end, is 2.5 cm long. What is its lowest resonance frequency (Hz) if the speed of sound is 340 m/s?',
      o: ['1360', '1700', '3400', '6800', '12000'], a: 2,
      ex: 'A tube closed at one end resonates at λ = 4L. f = v ÷ 4L = 340 ÷ (4 × 0.025) = 340 ÷ 0.1 = 3400 Hz.' },
    { id: 'S5', src: 'AC80',
      q: 'จากการทดสอบการได้ยินในหูยักษ์ พบว่ายักษ์ได้ยินเสียงดังที่สุดเป็น resonance frequency ที่ 3731 Hz หูของยักษ์มีความยาวรูหูสั้นที่สุดได้กี่เมตร (กำหนด v = 341 m/s) (A giant’s ear resonates best at 3731 Hz. What is the shortest possible ear-canal length, in metres?)',
      o: ['0.02', '0.08', '0.2', '0.8'], a: 0,
      ex: 'Lowest resonance of a closed tube: L = v ÷ 4f = 341 ÷ (4 × 3731) ≈ 0.023 m ≈ 0.02 m. (The stem’s extra data, 7.5 dB SPL at 1000 Hz, is not needed.)' },
    { id: 'S6', src: 'AC81', q: 'What mechanism is used to amplify sound in the middle ear?',
      o: ['Lever and hydraulics', 'Funnel', 'Doppler shift', 'Otoacoustic emissions', 'Sonar'], a: 0,
      ex: 'Middle-ear gain: the hydraulic (area) ratio of drum to oval window, about 25 dB, plus the ossicular lever (about 2 dB) and drum buckling. Otoacoustic emissions come from outer hair cells in the cochlea.' }
  ]);

  /* ---------- W · Light & laser ---------- */
  CVS.after('W-C1', [
    { id: 'W1', src: 'AC81', q: 'What is the light principle of optic fibre endoscopy used for internal organs?',
      o: ['Refraction', 'Diffraction', 'Scattering', 'Polarization', 'Total internal reflection'], a: 4,
      ex: 'Light hitting the fibre wall at more than the critical angle is totally reflected back into the core, so it travels along a bent fibre with little loss.',
      flag: 'Not on the 2026 slides; know it as a basic optics fact.' }
  ]);
  CVS.after('W-C2', [
    { id: 'W2', src: 'AC81', core: true, q: 'What is INCORRECT about the properties of lasers?',
      o: ['Laser has directionality', 'A good laser has polychromaticity', 'Active medium is one of the elements of laser', 'Optical feedback is one of the elements of laser', 'Energy input is one of the elements of laser'], a: 1,
      ex: 'Laser light is monochromatic (one wavelength), directional and coherent. A laser needs an active medium, an energy input (pumping) and optical feedback (mirrors).' }
  ]);
  CVS.after('W-C3', [
    { id: 'W3', src: 'AC80', core: true, q: 'Which principle is used in the treatment of diabetic retinopathy by photocoagulation?',
      o: ['Thermal interaction', 'Photochemical interaction', 'Photodisruption', 'Photo ablation', 'Plasma induced ablation'], a: 0,
      ex: 'Photocoagulation is a thermal interaction: pigments (melanin, haemoglobin) absorb the light, turn it into heat and coagulate the tissue.' },
    { id: 'W4', src: 'AC81', q: 'Which laser interaction is used to treat retinal detachment?',
      o: ['Photocoagulation', 'Photochemical reaction', 'Photoablation', 'Photochemical interaction', 'Photodynamic therapy'], a: 0,
      ex: 'Laser photocoagulation burns a scar around a retinal tear or detachment that welds the retina to the layers beneath (thermal).' }
  ]);
  CVS.after('W-C4', [
    { id: 'W5', src: 'AC80', core: true, q: 'What type of laser is used to treat cataract?',
      o: ['Carbon dioxide laser', 'Picosecond laser', 'Femtosecond laser', 'Argon laser', 'Excimer laser'], a: 2,
      ex: 'Femtosecond laser–assisted cataract surgery uses ultrashort pulses (photodisruption) to cut the capsule and fragment the lens. Excimer is for corneal refractive ablation; argon for retinal photocoagulation.' },
    { id: 'W6', src: 'AC80', q: 'ข้อใดไม่ใช่วิธีการรักษาค่าสายตาผิดปกติด้วย laser ที่ใช้ในปัจจุบัน (Which is not a laser refractive procedure used today?)',
      o: ['RK (Radial keratotomy)', 'PRK (Photorefractive keratectomy)', 'ReLEx (Refractive lenticule extraction)', 'SMILE (Small incision lenticule extraction)', 'LASIK (Laser-assisted in situ keratomileusis)'], a: 0,
      ex: 'Radial keratotomy used knife (blade) incisions, not a laser, and is no longer done. PRK and LASIK use the excimer laser; ReLEx/SMILE use the femtosecond laser.' }
  ]);
})();
