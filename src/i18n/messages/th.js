// ไทย
//
// Keys come from `node scripts/i18n-extract.mjs --json`. A key that is not
// here keeps its English string, so this file can be filled a namespace at a
// time without ever rendering a broken page.
//
// Rules this file is written to, checked by scripts/i18n-check.mjs:
//   - "Steppe Gut", "Steppe Soldier", "Steppe Army" and "ViaCap" stay in
//     Latin script exactly as written, never transliterated into Thai script.
//   - Registered company names (site.COMPANY.*.name) are absent on purpose.
//   - Thai does not separate words with spaces. Spaces here mark phrase
//     breaks, and stand in for the sentence breaks the English source makes
//     without full stops.

// Glossary — fixed once, held to for the whole file. These are the recurring
// terms; every namespace below uses the same rendering, and the "site" and
// "home" entries that came first already follow it.
//
//   gut health .............. สุขภาพลำไส้
//   gut (the organ) ......... ลำไส้
//   fermentation ............ การหมัก        (to ferment: หมัก)
//   fermented mare's milk ... นมม้าหมัก
//   the steppe .............. ทุ่งหญ้าสเตปป์  (short form ทุ่งสเตปป์ where the
//                             sentence has already established it)
//   mare .................... ม้าแม่พันธุ์      (plural is the bare noun)
//   herd .................... ฝูงม้า
//   ger ..................... กระโจมเกอร์     (kept, not replaced by "tent")
//   sachet .................. ซอง
//   capsule ................. แคปซูล
//   provenance .............. แหล่งที่มา
//   routine ................. กิจวัตร
//   immunity ................ ภูมิคุ้มกัน
//   Mongolia / Mongolian .... มองโกเลีย
//   live cultures ........... จุลินทรีย์มีชีวิต
//   the herders ............. คนเลี้ยงสัตว์
//
// Thai has no plural marking and no grammatical gender, so an English plural
// is simply the bare noun. Where the English uses a classifier-worthy count
// the Thai takes the proper classifier (ซอง, เม็ด, ตัว) rather than a literal
// number-noun pair.

export default {
  // ---------------------------------------------------------------- site --
  "site.COMPANY.manufacturer.country": "มองโกเลีย",
  "site.COMPANY.origin": "ผลิตภัณฑ์จากมองโกเลีย",
  "site.COMPANY.sourcing.province": "จังหวัดตูฟ ประเทศมองโกเลีย",
  "site.COMPANY.sourcing.season": "มิถุนายนถึงตุลาคม",

  "site.FOOTER_LINKS.0.label": "สินค้าทั้งหมด",
  "site.FOOTER_LINKS.1.label": "เรื่องราวของเรา",
  "site.FOOTER_LINKS.2.label": "สุขภาพลำไส้",
  "site.FOOTER_LINKS.3.label": "คำถามที่พบบ่อย",

  "site.GUT_HEALTH_LINKS.0.label": "ทั้งหมด",
  "site.GUT_HEALTH_LINKS.1.label": "ลำไส้กับอาหาร",
  "site.GUT_HEALTH_LINKS.2.label": "ลำไส้กับอารมณ์",
  "site.GUT_HEALTH_LINKS.3.label": "ลำไส้กับการออกกำลังกาย",
  "site.GUT_HEALTH_LINKS.4.label": "ลำไส้กับกิจวัตร",
  "site.GUT_HEALTH_LINKS.5.label": "ลำไส้กับการนอน",

  "site.NAV_LINKS.0.label": "สินค้า",
  "site.NAV_LINKS.1.label": "เรื่องราวของเรา",
  "site.NAV_LINKS.1.menu.0.label": "ทั้งหมด",
  "site.NAV_LINKS.1.menu.1.label": "พันธกิจของเรา",
  "site.NAV_LINKS.1.menu.2.label": "พันธกิจด้านวิทยาศาสตร์",
  "site.NAV_LINKS.1.menu.3.label": "กระบวนการผลิต",
  "site.NAV_LINKS.2.label": "สุขภาพลำไส้",
  "site.NAV_LINKS.2.menu.0.label": "ทั้งหมด",
  "site.NAV_LINKS.2.menu.1.label": "ลำไส้กับอาหาร",
  "site.NAV_LINKS.2.menu.2.label": "ลำไส้กับอารมณ์",
  "site.NAV_LINKS.2.menu.3.label": "ลำไส้กับการออกกำลังกาย",
  "site.NAV_LINKS.2.menu.4.label": "ลำไส้กับกิจวัตร",
  "site.NAV_LINKS.2.menu.5.label": "ลำไส้กับการนอน",
  "site.NAV_LINKS.3.label": "คำถามที่พบบ่อย",
  "site.NAV_LINKS.4.label": "ซื้อ Steppe Gut",

  "site.OUR_STORY_LINKS.0.label": "ทั้งหมด",
  "site.OUR_STORY_LINKS.1.label": "พันธกิจของเรา",
  "site.OUR_STORY_LINKS.2.label": "พันธกิจด้านวิทยาศาสตร์",
  "site.OUR_STORY_LINKS.3.label": "กระบวนการผลิต",

  "site.PRODUCT_LINKS.0.label": "ทั้งหมด",
  "site.PRODUCT_LINKS.1.label": "Steppe Gut แบบซองในถุง",
  "site.PRODUCT_LINKS.2.label": "Steppe Gut แบบซองในกล่อง",
  "site.PRODUCT_LINKS.3.label": "Steppe Gut แบบแคปซูล",

  "site.REGULATORY_DISCLOSURE":
    "ผลิตภัณฑ์นี้เป็นผลิตภัณฑ์เสริมอาหาร ไม่มีวัตถุประสงค์เพื่อวินิจฉัย บำบัด รักษา หรือป้องกันโรคใด ๆ ไม่ควรใช้แทนการรับประทานอาหารที่หลากหลายและสมดุล มีส่วนผสมของนม การขึ้นทะเบียนกับสำนักงานคณะกรรมการอาหารและยาของไทยอยู่ระหว่างดำเนินการ และจะเผยแพร่รายละเอียดการขึ้นทะเบียนที่นี่เมื่อแล้วเสร็จ",

  // ---------------------------------------------------------------- home --
  "home.CONTENTS.0.label": "จุดเริ่มต้น",
  "home.CONTENTS.1.label": "วิธีการผลิต",
  "home.CONTENTS.2.label": "สิ่งที่ทำให้เราต่าง",

  "home.ORIGIN.title": "ประเพณีเก่าแก่ ในแบบใหม่",
  "home.ORIGIN.body":
    "นมม้าหมักของเรามาจากมองโกเลีย ที่ซึ่งผลิตกันมาหลายชั่วอายุคน การหมักช่วยดึงวิตามินซี โอเมกา 3 และวิตามินบีออกมา และช่วยดูแลลำไส้ให้แข็งแรง",
  "home.ORIGIN.link.label": "ดูวิธีการผลิต",
  "home.ORIGIN.plate.alt": "ทุ่งหญ้าสเตปป์กว้างใหญ่ใต้ท้องฟ้าโปร่งในยามแสงทอง",

  "home.PROCESS.items.0.title": "รีดด้วยมือ ตามฤดูกาล",
  "home.PROCESS.items.0.body":
    "ม้าแม่พันธุ์บนทุ่งสเตปป์เล็มหญ้าตามธรรมชาติตลอดทั้งปี การรีดนมทำด้วยมือกลางแจ้ง ในช่วงสั้น ๆ ปีละครั้ง",
  "home.PROCESS.items.0.cta": "อ่านเพิ่มเติม",
  "home.PROCESS.items.0.plate.alt": "มือกำลังรีดนมม้าแม่พันธุ์กลางทุ่งหญ้าโล่ง",

  "home.PROCESS.items.1.title": "ปล่อยให้เวลาทำงาน",
  "home.PROCESS.items.1.body":
    "นมสดถูกเทลงในภาชนะที่มีเชื้อจุลินทรีย์มีชีวิตอยู่แล้ว จากนั้นคนด้วยมือต่อเนื่องหลายชั่วโมง การหมักย่อยแลคโตสและโปรตีน",
  "home.PROCESS.items.1.cta": "อ่านเพิ่มเติม",
  "home.PROCESS.items.1.plate.alt": "ภาชนะหมักไม้แบบดั้งเดิมภายในกระโจมเกอร์",

  "home.PROCESS.items.2.title": "Steppe Gut Balance",
  "home.PROCESS.items.2.body":
    "อุดมด้วยวิตามินดี ช่วยเสริมภูมิคุ้มกัน กล้ามเนื้อ และกระดูก",
  "home.PROCESS.items.2.cta": "อ่านเพิ่มเติม",
  "home.PROCESS.items.2.plate.alt":
    "มือกำลังปิดผนึกซองผงหมักแห้งบนโต๊ะไม้",

  "home.READS.title": "อะไรที่ทำให้เราต่าง",
  "home.READS.items.0.category": "การหมัก",
  "home.READS.items.0.title": "สุขภาพลำไส้",
  "home.READS.items.0.subtext": "ลำไส้กับกิจวัตร",
  "home.READS.items.0.plate.alt": "ภาพมาโครของเชื้อที่กำลังหมักในภาชนะไม้",
  "home.READS.items.1.category": "แหล่งที่มา",
  "home.READS.items.1.title": "เรื่องราวของเรา",
  "home.READS.items.1.subtext": "จากมองโกเลีย",
  "home.READS.items.1.plate.alt":
    "กระโจมเกอร์หลังเดียวกลางทุ่งหญ้า มีฝูงม้าอยู่ไกลออกไป",
  "home.READS.items.2.category": "ฝูงม้า",
  "home.READS.items.2.title": "เรื่องราวของเรา",
  "home.READS.items.2.subtext": "ม้าที่อยู่สบาย",
  "home.READS.items.2.plate.alt": "ม้าแม่พันธุ์พักผ่อนกลางทุ่งหญ้าโล่ง",
  "home.READS.items.3.category": "คุณภาพ",
  "home.READS.items.3.title": "เรื่องราวของเรา",
  "home.READS.items.3.subtext": "ทำด้วยความใส่ใจ",
  "home.READS.items.3.plate.alt": "มือกำลังตรวจขวดตัวอย่างที่บรรจุแล้วริมหน้าต่าง",
  "home.READS.items.4.category": "ผลิตภัณฑ์",
  "home.READS.items.4.title": "สุขภาพลำไส้",
  "home.READS.items.4.subtext": "กิจวัตรที่เรียบง่าย",
  "home.READS.items.4.plate.alt": "ซองเดี่ยวพร้อมผงบนพื้นผิวเรียบ",

  // --------------------------------------------------------------- FAQ --
  "faq.FAQ_GROUPS.0.heading": "ตัวผลิตภัณฑ์",
  "faq.FAQ_GROUPS.0.items.0.answer":
    "ผงนมม้าหมักจากมองโกเลีย จำหน่ายเป็นผลิตภัณฑ์เสริมอาหารสำหรับรับประทานทุกวัน ใช้ซองขนาด 10 กรัม ชงกับน้ำวันละครั้ง หรือปริมาณเท่ากันในรูปแคปซูล 3 เม็ด หรือผงตักหนึ่งช้อนปาด ผลิตภัณฑ์นี้ไม่ใช่โพรไบโอติก เพราะการทำแห้งทำให้จุลินทรีย์มีชีวิตสิ้นสุดลง สิ่งที่เหลืออยู่คือคุณค่าทางโภชนาการที่เกิดจากการหมัก ได้แก่ วิตามินซี วิตามินเอ วิตามินบี โอเมกา 3 แคลเซียม ธาตุเหล็ก แลคโตเฟอร์ริน และไลโซไซม์ ที่มีอยู่ตามธรรมชาติ",
  "faq.FAQ_GROUPS.0.items.0.question": "Steppe Gut คืออะไร",
  "faq.FAQ_GROUPS.0.items.1.answer":
    "การหมักย่อยแลคโตสและเคซีนในนมม้าไปได้มาก ทำให้สารอาหารดูดซึมได้ง่ายขึ้น ผงนี้มีวิตามินซีตามธรรมชาติ ซึ่งมีส่วนช่วยในการสร้างคอลลาเจน วิตามินบี ซึ่งมีส่วนช่วยในกระบวนการเผาผลาญพลังงาน แคลเซียมและฟอสฟอรัส ซึ่งมีส่วนช่วยในโครงสร้างของกระดูก รวมถึงแลคโตเฟอร์รินและไลโซไซม์ ซึ่งเป็นโปรตีนที่เกี่ยวข้องกับการทำงานของภูมิคุ้มกันโดยทั่วไป เรายังไม่ได้ทำการทดลองในมนุษย์ จึงไม่สามารถบอกได้ว่าจะทำงานอย่างไรในร่างกายของคุณโดยเฉพาะ",
  "faq.FAQ_GROUPS.0.items.1.question": "ทำงานอย่างไร",
  "faq.FAQ_GROUPS.0.items.2.question": "ใช้อย่างไร",
  "faq.FAQ_GROUPS.0.items.3.answer":
    "เริ่มที่วันละหนึ่งซอง แล้วคงไว้เท่านั้น การเพิ่มปริมาณหรือรับประทานเกินวันละหนึ่งซองไม่ได้ให้ประโยชน์เพิ่มขึ้น วันละหนึ่งซองตลอดหนึ่งปีดีกว่าวันละสามซองเป็นเวลาหนึ่งเดือน หากลืมไปหนึ่งวัน ให้รับประทานครั้งถัดไปตามปกติ ไม่ต้องรับประทานชดเชย",
  "faq.FAQ_GROUPS.0.items.3.question": "ควรเริ่มต้นและเพิ่มปริมาณอย่างไร",
  "faq.FAQ_GROUPS.0.items.4.answer":
    "วันละครั้ง ทุกวัน เราจะไม่บอกว่านานแค่ไหนคุณจึงจะรู้สึกถึงอะไรบางอย่าง เพราะเรายังไม่ได้ทำการทดลอง และใครก็ตามที่ให้ตัวเลขชัดเจนกับคุณคือการเดา รับประทานทุกวันแล้วตัดสินด้วยตัวคุณเอง",
  "faq.FAQ_GROUPS.0.items.4.question":
    "ควรรับประทานสัปดาห์ละกี่ครั้ง และนานแค่ไหนจึงจะเห็นผล",
  "faq.FAQ_GROUPS.0.items.5.answer":
    "ได้ ปริมาณที่แนะนำคือวันละหนึ่งซองขนาด 10 กรัม หรือแคปซูล 3 เม็ด การรับประทานมากกว่านี้ไม่ได้ให้ประโยชน์เพิ่ม เราอยากให้คุณรับประทานวันละหนึ่งซองตลอดหนึ่งปี มากกว่าวันละสามซองเป็นเวลาหนึ่งเดือน ความสม่ำเสมอในระยะยาวคือสิ่งที่สำคัญ",
  "faq.FAQ_GROUPS.0.items.5.question": "รับประทานได้ทุกวันไหม",
  "faq.FAQ_GROUPS.0.items.6.answer":
    "เราไม่ทราบ เราบอกได้ว่าในผลิตภัณฑ์มีอะไร คือนมม้าหมักที่มีวิตามิน แร่ธาตุ โปรตีน และไขมันอยู่ตามธรรมชาติ และบอกได้ว่าการได้รับสารอาหารมีผลในระยะสัปดาห์และเดือน แต่เรายังไม่ได้ทำการทดลองในมนุษย์ หากได้ผล ผลนั้นน่าจะค่อยเป็นค่อยไป หากคุณต้องการหลักฐาน โปรดปรึกษาแพทย์ของคุณ",
  "faq.FAQ_GROUPS.0.items.6.question": "ได้ผลจริงไหม",
  "faq.FAQ_GROUPS.0.items.7.answer":
    "เราจะไม่ให้ตัวเลขกับคุณ การได้รับสารอาหารทำงานในระยะสัปดาห์และเดือน เรายังไม่ได้ทำการทดลอง และใครก็ตามที่เสนอกรอบเวลาชัดเจนให้คุณคือการเดา รับประทานทุกวันแล้วตัดสินด้วยตัวคุณเอง",
  "faq.FAQ_GROUPS.0.items.7.question": "ใช้เวลานานแค่ไหนกว่าจะเห็นผล",
  "faq.FAQ_GROUPS.0.items.8.answer":
    "กล่องซองบรรจุผงนมม้าหมักขนาด 10 กรัม จำนวน 25 ซอง สำหรับ 25 วัน ขวดแคปซูลบรรจุ 90 แคปซูล สำหรับ 30 วัน ที่วันละ 3 แคปซูล ถุงเติมบรรจุผง 250 กรัม พร้อมช้อนตวง สำหรับ 25 ครั้ง ทั้งสามรูปแบบใช้ผงชนิดเดียวกัน ต่างกันเพียงวิธีรับประทาน",
  "faq.FAQ_GROUPS.0.items.8.question": "ในกล่องมีอะไรบ้าง",
  "faq.FAQ_GROUPS.0.items.9.answer":
    "ผลิตภัณฑ์นี้ทำจากนมม้าจึงเป็นผลิตภัณฑ์นม หากคุณแพ้นม อย่ารับประทาน หากคุณย่อยแลคโตสได้ไม่ดี การหมักย่อยแลคโตสไปได้เกือบหมด แต่ยังเหลืออยู่บ้าง หากคุณรับประทานโยเกิร์ตได้ คุณก็อาจรับประทานผลิตภัณฑ์นี้ได้ แต่ควรปรึกษาแพทย์ก่อน หากคุณกำลังตั้งครรภ์ ให้นมบุตร ใช้ยาประจำ หรืออยู่ในการดูแลของแพทย์ด้วยโรคใดก็ตาม โปรดปรึกษาแพทย์หรือเภสัชกรของคุณ",
  "faq.FAQ_GROUPS.0.items.9.question": "ปลอดภัยไหม และใครที่ไม่ควรรับประทาน",
  "faq.FAQ_GROUPS.0.items.10.answer":
    "ผู้ที่ต้องการรับประทานนมม้าหมักทุกวันเป็นผลิตภัณฑ์เสริมอาหาร เราไม่ได้ทำการตลาดกับเด็ก และไม่มีข้อมูลพอที่จะให้คำแนะนำสำหรับเด็กหรือผู้ตั้งครรภ์ ผู้ที่รับประทานมังสวิรัติแบบรับนมได้ ส่วนผู้ที่รับประทานวีแกนไม่ได้ เพราะเป็นผลิตภัณฑ์นม ผลิตภัณฑ์นี้ไม่ใช่โพรไบโอติกและไม่ใช่ยา",
  "faq.FAQ_GROUPS.0.items.10.question": "ผลิตภัณฑ์นี้เหมาะกับใคร",

  "faq.FAQ_GROUPS.1.heading": "การสั่งซื้อและการจัดส่ง",
  "faq.FAQ_GROUPS.1.items.0.question": "สั่งซื้อได้อย่างไร",
  "faq.FAQ_GROUPS.1.items.1.answer":
    "หลังยืนยันคำสั่งซื้อ คุณจะเห็นหน้ายืนยันพร้อมหมายเลขคำสั่งซื้อ เก็บหน้านั้นไว้หรือจดหมายเลขไว้ เพื่อใช้อ้างอิงภายหลัง",
  "faq.FAQ_GROUPS.1.items.1.question": "จะรู้ได้อย่างไรว่าคำสั่งซื้อถูกส่งแล้ว",
  "faq.FAQ_GROUPS.1.items.2.answer": "สองถึงสี่วันทำการทั่วประเทศไทย",
  "faq.FAQ_GROUPS.1.items.2.question": "จะได้รับพัสดุเมื่อไร",
  "faq.FAQ_GROUPS.1.items.3.answer":
    "คุณจะได้รับแจ้งการจัดส่งพร้อมหมายเลขติดตามพัสดุเมื่อคำสั่งซื้อออกจากคลัง ลิงก์ติดตามอาจใช้เวลาสักครู่กว่าจะใช้งานได้กับผู้ให้บริการขนส่ง หากผ่านไปหนึ่งวันแล้วยังใช้ไม่ได้ [ติดต่อเรา](/contact/)",
  "faq.FAQ_GROUPS.1.items.3.question": "ทำไมหมายเลขติดตามพัสดุถึงใช้ไม่ได้",
  "faq.FAQ_GROUPS.1.items.4.answer":
    "ขณะนี้เราจัดส่งเฉพาะภายในประเทศไทย โดยส่งตรงจากเว็บไซต์นี้",
  "faq.FAQ_GROUPS.1.items.4.question": "จัดส่งไปประเทศใดบ้าง",
  "faq.FAQ_GROUPS.1.items.5.answer":
    "เราจัดส่งไปยังที่อยู่ใดก็ได้ในประเทศไทยภายใน 2 ถึง 4 วันทำการ ค่าจัดส่งเป็นอัตราเดียวทั่วประเทศ ไม่คิดตามที่อยู่ และแสดงเป็นรายการแยกในตะกร้าและที่หน้าชำระเงิน ก่อนที่คุณจะยืนยันการชำระเงิน",
  "faq.FAQ_GROUPS.1.items.5.question": "ค่าจัดส่งเท่าไร",
  "faq.FAQ_GROUPS.1.items.6.answer":
    "หากคุณต้องการยกเลิก [ติดต่อเรา](/contact/) ทันที หากคำสั่งซื้อออกจากคลังไปแล้วเราจะไม่สามารถระงับได้ แต่สินค้าที่ยังไม่เปิดใช้สามารถส่งคืนเพื่อรับเงินคืนได้ภายใน 14 วัน ผลิตภัณฑ์อาหารที่เปิดแล้วไม่สามารถรับคืนได้ด้วยเหตุผลด้านความปลอดภัย",
  "faq.FAQ_GROUPS.1.items.6.question": "นโยบายการยกเลิกคำสั่งซื้อเป็นอย่างไร",
  "faq.FAQ_GROUPS.1.items.7.question": "เปลี่ยนที่อยู่จัดส่งได้อย่างไร",
  "faq.FAQ_GROUPS.1.items.8.answer":
    "หากที่อยู่ของคุณจัดส่งไม่ได้ เราจะติดต่อคุณเพื่อขอที่อยู่ที่ถูกต้องก่อนจัดส่งใหม่ หากเราติดต่อคุณไม่ได้และพัสดุตีกลับมาที่เรา เราจะเสนอคืนเงินหรือจัดส่งใหม่ไปยังที่อยู่ที่ถูกต้องโดยไม่คิดค่าใช้จ่ายเพิ่ม ค่าส่งคืนจะเกิดขึ้นเฉพาะกรณีที่ที่อยู่ผิดอย่างชัดเจน",
  "faq.FAQ_GROUPS.1.items.8.question": "นโยบายกรณีที่อยู่ผิดเป็นอย่างไร",

  "faq.FAQ_GROUPS.2.heading": "การชำระเงิน",
  "faq.FAQ_GROUPS.2.items.0.answer":
    "เรารับ Visa, Mastercard, PromptPay, TrueMoney, Apple Pay และ Google Pay การชำระเงินทั้งหมดดำเนินการอย่างปลอดภัยที่หน้าชำระเงิน เราไม่เก็บข้อมูลบัตรของคุณ",
  "faq.FAQ_GROUPS.2.items.0.question": "มีช่องทางการชำระเงินอะไรบ้าง",
  "faq.FAQ_GROUPS.2.items.1.answer":
    "[ติดต่อเรา](/contact/) พร้อมแจ้งหมายเลขคำสั่งซื้อและรหัสส่วนลด หากคุณเพิ่งสั่งซื้อและคำสั่งซื้อยังไม่ออกจากคลัง เราอาจใช้ส่วนลดให้ได้ สำหรับคำสั่งซื้อครั้งถัดไป กรุณากรอกรหัสส่วนลดที่หน้าชำระเงินก่อนยืนยันการชำระเงิน",
  "faq.FAQ_GROUPS.2.items.1.question": "มีรหัสส่วนลดแต่ลืมใช้ ต้องทำอย่างไร",

  // ------------------------------------------------------- ingredients --
  "ingredients.INGREDIENT_GLOSSARY.0.name": "ผงนมม้าหมัก",
  "ingredients.INGREDIENT_GLOSSARY.0.explanation":
    "นมม้าที่ผ่านการหมักด้วยจุลินทรีย์ของตัวเองประมาณสี่วัน แล้วทำแห้งที่อุณหภูมิต่ำ เป็นส่วนประกอบหลักของสิ่งที่อยู่ในบรรจุภัณฑ์",
  "ingredients.INGREDIENT_GLOSSARY.1.name": "แลคโตส",
  "ingredients.INGREDIENT_GLOSSARY.1.explanation":
    "น้ำตาลตามธรรมชาติในนม การหมักย่อยสลายไปได้มาก ส่วนที่เหลืออยู่จึงถูกระบุไว้ในรายการนี้เพราะยังคงมีอยู่",
  "ingredients.INGREDIENT_GLOSSARY.2.name": "เวย์โปรตีน",
  "ingredients.INGREDIENT_GLOSSARY.2.explanation":
    "หนึ่งในโปรตีนหลักสองกลุ่มในนม ละลายอยู่ในของเหลวแทนที่จะจับตัวเป็นก้อน",
  "ingredients.INGREDIENT_GLOSSARY.3.name": "เคซีนโปรตีน",
  "ingredients.INGREDIENT_GLOSSARY.3.explanation":
    "โปรตีนหลักอีกกลุ่มหนึ่งในนม เป็นสิ่งที่ทำให้นมมีสีขาว",
  "ingredients.INGREDIENT_GLOSSARY.4.name": "ไขมันนม",
  "ingredients.INGREDIENT_GLOSSARY.4.explanation":
    "มีอยู่ตามธรรมชาติ นมม้ามีไขมันต่ำกว่านมวัวมาก",
  "ingredients.INGREDIENT_GLOSSARY.5.name": "กรดไขมันโอเมกา 3 และโอเมกา 6",
  "ingredients.INGREDIENT_GLOSSARY.5.explanation":
    "กรดไขมันที่ร่างกายสร้างเองไม่ได้และต้องได้รับจากอาหาร ทั้งสองชนิดมีอยู่ตามธรรมชาติในนมม้า",
  "ingredients.INGREDIENT_GLOSSARY.6.name": "วิตามินซี (กรดแอสคอร์บิก)",
  "ingredients.INGREDIENT_GLOSSARY.6.explanation":
    "นมม้ามีวิตามินซีสูงผิดปกติสำหรับผลิตภัณฑ์นม วิตามินซีมีส่วนช่วยในการสร้างคอลลาเจนตามปกติและการทำงานตามปกติของระบบภูมิคุ้มกัน",
  "ingredients.INGREDIENT_GLOSSARY.7.name": "วิตามินเอ (เรตินอล)",
  "ingredients.INGREDIENT_GLOSSARY.7.explanation":
    "มีส่วนช่วยในการดูแลผิวหนังตามปกติและการมองเห็นตามปกติ",
  "ingredients.INGREDIENT_GLOSSARY.8.name": "วิตามินบี 1 บี 2 และบี 12",
  "ingredients.INGREDIENT_GLOSSARY.8.explanation":
    "เกี่ยวข้องกับกระบวนการเผาผลาญพลังงานตามปกติ วิตามินบี 12 ยังมีส่วนช่วยในการสร้างเม็ดเลือดแดงตามปกติ",
  "ingredients.INGREDIENT_GLOSSARY.9.name": "แคลเซียมและฟอสฟอรัส",
  "ingredients.INGREDIENT_GLOSSARY.9.explanation":
    "แร่ธาตุหลักสองชนิดในนม ทั้งสองชนิดมีส่วนช่วยในการรักษากระดูกและฟันให้อยู่ในสภาพปกติ",
  "ingredients.INGREDIENT_GLOSSARY.10.name": "ธาตุเหล็ก",
  "ingredients.INGREDIENT_GLOSSARY.10.explanation":
    "มีส่วนช่วยในการลำเลียงออกซิเจนในเลือดตามปกติ",
  "ingredients.INGREDIENT_GLOSSARY.11.name": "โซเดียม",
  "ingredients.INGREDIENT_GLOSSARY.11.explanation":
    "มีอยู่ตามธรรมชาติ ไม่ได้เติมในรูปเกลือ",
  "ingredients.INGREDIENT_GLOSSARY.12.name": "แลคโตเฟอร์ริน",
  "ingredients.INGREDIENT_GLOSSARY.12.explanation":
    "โปรตีนที่จับกับธาตุเหล็กซึ่งพบในนม เป็นหนึ่งในองค์ประกอบที่ทำให้นมม้าได้รับความสนใจด้านงานวิจัย",
  "ingredients.INGREDIENT_GLOSSARY.13.name": "ไลโซไซม์",
  "ingredients.INGREDIENT_GLOSSARY.13.explanation":
    "เอนไซม์ที่พบตามธรรมชาติในนม ออกฤทธิ์ต่อผนังเซลล์แบคทีเรีย นมม้ามีเอนไซม์ชนิดนี้มากกว่านมวัวอย่างเห็นได้ชัด",

  "ingredients.NOT_IN_IT.0.title": "ไม่เติมน้ำตาล",
  "ingredients.NOT_IN_IT.0.body":
    "ไม่มีการเติมความหวานใดๆ น้ำตาลที่ระบุไว้คือแลคโตสที่มีอยู่ตามธรรมชาติในนม",
  "ingredients.NOT_IN_IT.1.title": "ไม่ใช้สารให้ความหวานแทนน้ำตาล",
  "ingredients.NOT_IN_IT.1.body":
    "ไม่มีซูคราโลส หญ้าหวาน แอสปาร์แตม หรือน้ำตาลแอลกอฮอล์",
  "ingredients.NOT_IN_IT.2.title": "ไม่แต่งกลิ่นรส",
  "ingredients.NOT_IN_IT.2.body":
    "รสชาติคือรสของนมหมัก เพราะนั่นคือสิ่งที่มันเป็น",
  "ingredients.NOT_IN_IT.3.title": "ไม่แต่งสี",
  "ingredients.NOT_IN_IT.3.body": "ไม่มีทั้งสีจากธรรมชาติและสีสังเคราะห์",
  "ingredients.NOT_IN_IT.4.title": "ไม่ใส่สารกันเสีย",
  "ingredients.NOT_IN_IT.4.body": "การทำแห้งคือวิธีการถนอมอาหารที่ใช้",
  "ingredients.NOT_IN_IT.5.title": "ไม่ใช้สารตัวเติมหรือสารเพิ่มปริมาณ",
  "ingredients.NOT_IN_IT.5.body": "ผงคือเนื้อนมล้วน",

  "ingredients.PRODUCTION_STEPS.0.title": "รีดนม",
  "ingredients.PRODUCTION_STEPS.0.body":
    "รีดด้วยมือกลางแจ้ง ในช่วงเดือนที่แม่ม้าให้นม นมจะถูกแช่เย็นและลำเลียงอย่างรวดเร็ว เพราะนมม้าสดเสียได้ภายในไม่กี่ชั่วโมง",
  "ingredients.PRODUCTION_STEPS.1.title": "หมัก",
  "ingredients.PRODUCTION_STEPS.1.body":
    "นมถูกทิ้งไว้กับจุลินทรีย์ของตัวเองประมาณสี่วันและคนเป็นระยะ แลคโตสถูกย่อยสลาย โปรตีนคลายตัวบางส่วน และนมจะมีเนื้อบางลงพร้อมรสเปรี้ยวจางๆ",
  "ingredients.PRODUCTION_STEPS.2.title": "ทำแห้ง",
  "ingredients.PRODUCTION_STEPS.2.body":
    "นมหมักถูกทำแห้งที่อุณหภูมิต่ำจนเป็นผงเนื้อละเอียด ไม่มีการเติมหรือนำสิ่งใดออกในขั้นตอนนี้",
  "ingredients.PRODUCTION_STEPS.3.title": "บรรจุ",
  "ingredients.PRODUCTION_STEPS.3.body":
    "ผงถูกแบ่งบรรจุลงในซอง แคปซูล หรือถุง แล้วปิดผนึก แต่ละชุดบรรจุมาจากการเก็บรวบรวมของฤดูกาลเดียว",

  "ingredients.SUITABILITY.0.title": "มีส่วนผสมของนม",
  "ingredients.SUITABILITY.0.body":
    "ใช่ นี่คือผลิตภัณฑ์จากนม ไม่เหมาะสำหรับผู้ที่แพ้นม",
  "ingredients.SUITABILITY.1.title": "แลคโตส",
  "ingredients.SUITABILITY.1.body":
    "การหมักย่อยสลายแลคโตสในนมไปได้เกือบหมด แต่ยังคงมีแลคโตสเหลืออยู่และถูกระบุเป็นส่วนประกอบ หากคุณมีอาการกับโยเกิร์ต คุณอาจมีอาการกับผลิตภัณฑ์นี้ได้เช่นกัน",
  "ingredients.SUITABILITY.2.title": "กลูเตน",
  "ingredients.SUITABILITY.2.body":
    "ไม่มีส่วนประกอบที่มีกลูเตน ขณะนี้เรายังไม่มีการรับรองปลอดกลูเตน จึงไม่ระบุว่าผลิตภัณฑ์นี้ปลอดกลูเตน",
  "ingredients.SUITABILITY.3.title": "มังสวิรัติและวีแกน",
  "ingredients.SUITABILITY.3.body":
    "เหมาะสำหรับผู้ที่รับประทานมังสวิรัติ ไม่เหมาะสำหรับผู้ที่รับประทานวีแกน เนื่องจากเป็นผลิตภัณฑ์จากนม",
  "ingredients.SUITABILITY.4.title": "ถั่ว",
  "ingredients.SUITABILITY.4.body":
    "ไม่มีส่วนประกอบจากถั่ว หากเรื่องนี้สำคัญกับคุณ สอบถามเราเกี่ยวกับสถานที่ผลิตได้ เราจะแจ้งข้อมูลเท่าที่เรามี",
  "ingredients.SUITABILITY.5.title": "การตั้งครรภ์และให้นมบุตร",
  "ingredients.SUITABILITY.5.body":
    "ปรึกษาแพทย์ก่อนรับประทานผลิตภัณฑ์เสริมอาหารใดๆ ระหว่างตั้งครรภ์หรือให้นมบุตร เราไม่สามารถให้คำแนะนำในเรื่องนี้ได้",

  // ---------------------------------------------------------- products --
  "products.INGREDIENTS_DECLARATION":
    "ผงนมม้าหมัก แลคโตส เวย์โปรตีน เคซีนโปรตีน ไขมันนม กรดไขมันโอเมกา 3 กรดไขมันโอเมกา 6 วิตามินซี (กรดแอสคอร์บิก) วิตามินเอ (เรตินอล) วิตามินบี 1 (ไทอามีน) วิตามินบี 2 (ไรโบฟลาวิน) วิตามินบี 12 (ไซยาโนโคบาลามิน) แคลเซียม ฟอสฟอรัส โซเดียม ธาตุเหล็ก แลคโตเฟอร์ริน ไลโซไซม์",

  "products.MARKETING_PRICE_BY_SLUG.pill-bottle.save": "ประหยัด 24%",

  "products.MARKETING_PRICE_BY_SLUG.sachet-bag.save": "ประหยัด 24%",

  "products.MARKETING_PRICE_BY_SLUG.sachet-box.save": "ประหยัด 23%",

  "products.PRODUCTS.0.allergen": "มีส่วนผสมของนม",
  "products.PRODUCTS.0.alt": "กล่องซอง Steppe Gut บรรจุ 25 ซองสำหรับทุกวัน",
  "products.PRODUCTS.0.descriptor":
    "ผงนมม้าหมักบรรจุซองแยก 25 ซอง หนึ่งซองต่อหนึ่งวัน ฉีกซอง ผสมน้ำ แล้วดื่ม",
  "products.PRODUCTS.0.format": "ซองขนาด 10 กรัม 25 ซอง",
  "products.PRODUCTS.0.formatLong": "ซองขนาด 10 กรัม 25 ซอง · 25 วัน",
  "products.PRODUCTS.0.howToTake.0.body":
    "ฉีกตามรอยบากด้านบน ผงมีเนื้อละเอียดและตกตะกอนเร็ว",
  "products.PRODUCTS.0.howToTake.0.title": "ฉีกซอง",
  "products.PRODUCTS.0.howToTake.1.body":
    "ใช้น้ำเย็นหรืออุณหภูมิห้อง น้ำร้อนไม่เป็นอันตราย แต่ทำให้รสชาติแย่ลง",
  "products.PRODUCTS.0.howToTake.1.title": "เติมน้ำเย็น 100 มิลลิลิตร",
  "products.PRODUCTS.0.howToTake.2.body":
    "ดื่มภายในหนึ่งถึงสองนาที ก่อนที่ผงจะตกตะกอน คนส่วนใหญ่ดื่มก่อนอาหารเช้า แม้ว่าช่วงเวลาของวันจะสำคัญน้อยกว่าการดื่มในเวลาเดิมทุกวัน",
  "products.PRODUCTS.0.howToTake.2.title": "คนแล้วดื่ม",
  "products.PRODUCTS.0.name": "Steppe Gut แบบซองในกล่อง",
  "products.PRODUCTS.0.paragraph":
    "ผงนมม้าหมักจากมองโกเลียขนาด 10 กรัม จำนวน 25 ซอง รับประทานวันละหนึ่งซอง คนให้เข้ากับน้ำ 100 มิลลิลิตร แบ่งปริมาณมาให้แล้ว จึงไม่ต้องตวงเอง",
  "products.PRODUCTS.0.railDescriptor":
    "25 ซองสำหรับทุกวัน ฉีก ผสมน้ำ แล้วดื่ม",
  "products.PRODUCTS.0.reassurance":
    "จัดส่งภายใน 2–4 วันทำการทั่วประเทศไทย กล่องที่ยังไม่เปิดส่งคืนได้ภายใน 14 วัน",
  "products.PRODUCTS.0.servingSize": "10 กรัม",

  "products.PRODUCTS.1.allergen":
    "มีส่วนผสมของนม เปลือกแคปซูลเป็นสิ่งเดียวที่เพิ่มเข้ามา",
  "products.PRODUCTS.1.alt": "ขวดแคปซูล Steppe Gut บรรจุ 90 แคปซูล",
  "products.PRODUCTS.1.descriptor":
    "ผงนมม้าหมักบรรจุแคปซูล 90 เม็ด ในขวดแก้วสีชา รับประทานวันละ 3 แคปซูล ปริมาณเท่ากับหนึ่งซอง แต่ไม่ต้องรับรส เหมาะกับการเดินทางและความสะดวกในทุกวัน",
  "products.PRODUCTS.1.format": "90 แคปซูล",
  "products.PRODUCTS.1.formatLong": "90 แคปซูล · 30 วัน",
  "products.PRODUCTS.1.howToTake.0.body":
    "แคปซูล 3 เม็ดให้ผงเท่ากับหนึ่งซองขนาด 10 กรัม",
  "products.PRODUCTS.1.howToTake.0.title": "รับประทานครั้งละ 3 แคปซูล",
  "products.PRODUCTS.1.howToTake.1.body":
    "อุณหภูมิใดก็ได้ ไม่มีอะไรต้องผสมและไม่มีอะไรต้องรอ",
  "products.PRODUCTS.1.howToTake.1.title": "พร้อมน้ำ",
  "products.PRODUCTS.1.howToTake.2.body":
    "ในเวลาเดิมของทุกวัน คนส่วนใหญ่รับประทานก่อนอาหารเช้า แม้ว่าเวลาจะสำคัญน้อยกว่าความสม่ำเสมอ",
  "products.PRODUCTS.1.howToTake.2.title": "วันละครั้ง",
  "products.PRODUCTS.1.name": "Steppe Gut แบบแคปซูล",
  "products.PRODUCTS.1.paragraph":
    "ผงนมม้าหมักจากมองโกเลียบรรจุแคปซูล 90 เม็ด รับประทานวันละ 3 แคปซูลพร้อมน้ำ แต่ละชุดให้ปริมาณเท่ากับหนึ่งซอง โดยไม่ต้องผสมหรือเตรียมอะไร",
  "products.PRODUCTS.1.railDescriptor":
    "90 แคปซูล รับประทานวันละ 3 เม็ด ไม่ต้องรับรส",
  "products.PRODUCTS.1.reassurance":
    "จัดส่งภายใน 2–4 วันทำการทั่วประเทศไทย ขวดที่ยังไม่เปิดส่งคืนได้ภายใน 14 วัน",
  "products.PRODUCTS.1.servingSize": "3 แคปซูล",

  "products.PRODUCTS.2.allergen":
    "มีส่วนผสมของนม ปิดผนึกทุกครั้งหลังใช้และเก็บให้แห้ง",
  "products.PRODUCTS.2.alt": "ถุงเติม Steppe Gut ขนาด 250 กรัม",
  "products.PRODUCTS.2.descriptor":
    "ผงนมม้าหมักแบบไม่แบ่งซองในถุงขนาด 250 กรัม พร้อมช้อนตวง สำหรับผู้ที่รับประทานเป็นกิจวัตรอยู่แล้วและต้องการบรรจุภัณฑ์น้อยลงกับต้นทุนต่อครั้งที่ถูกลง",
  "products.PRODUCTS.2.format": "ถุงขนาด 250 กรัม",
  "products.PRODUCTS.2.formatLong": "ถุงขนาด 250 กรัม · 25 ครั้ง",
  "products.PRODUCTS.2.howToTake.0.body":
    "ช้อนที่ให้มาในถุงตวงได้ 10 กรัม เท่ากับหนึ่งซอง",
  "products.PRODUCTS.2.howToTake.0.title": "หนึ่งช้อนปาด",
  "products.PRODUCTS.2.howToTake.1.body":
    "ใช้น้ำเย็นหรืออุณหภูมิห้อง น้ำร้อนไม่เป็นอันตราย แต่ทำให้รสชาติแย่ลง",
  "products.PRODUCTS.2.howToTake.1.title": "เติมน้ำเย็น 100 มิลลิลิตร",
  "products.PRODUCTS.2.howToTake.2.body":
    "จากนั้นปิดผนึกถุงและเก็บให้แห้ง ผงแบบไม่แบ่งซองดูดความชื้นเร็วกว่าซองที่ปิดผนึกไว้",
  "products.PRODUCTS.2.howToTake.2.title": "คนแล้วดื่ม",
  "products.PRODUCTS.2.name": "Steppe Gut แบบซองในถุง",
  "products.PRODUCTS.2.paragraph":
    "ผงนมม้าหมักจากมองโกเลียแบบไม่แบ่งซอง 250 กรัม พร้อมช้อนตวง หนึ่งช้อนต่อวันเท่ากับ 10 กรัม สูตรเดียวกับแบบซอง โดยใช้บรรจุภัณฑ์ต่อครั้งน้อยลง",
  "products.PRODUCTS.2.railDescriptor":
    "ผงแบบไม่แบ่งซอง 250 กรัม พร้อมช้อนตวง บรรจุภัณฑ์น้อยลง คุ้มค่ากว่า",
  "products.PRODUCTS.2.reassurance":
    "จัดส่งภายใน 2–4 วันทำการทั่วประเทศไทย ถุงที่ยังไม่เปิดส่งคืนได้ภายใน 14 วัน",
  "products.PRODUCTS.2.servingSize": "10 กรัม หนึ่งช้อนปาด",

  "products.PRODUCT_BY_SLUG.pill-bottle.allergen":
    "มีส่วนผสมของนม เปลือกแคปซูลเป็นสิ่งเดียวที่เพิ่มเข้ามา",
  "products.PRODUCT_BY_SLUG.pill-bottle.alt":
    "ขวดแคปซูล Steppe Gut บรรจุ 90 แคปซูล",
  "products.PRODUCT_BY_SLUG.pill-bottle.descriptor":
    "ผงนมม้าหมักบรรจุแคปซูล 90 เม็ด ในขวดแก้วสีชา รับประทานวันละ 3 แคปซูล ปริมาณเท่ากับหนึ่งซอง แต่ไม่ต้องรับรส เหมาะกับการเดินทางและความสะดวกในทุกวัน",
  "products.PRODUCT_BY_SLUG.pill-bottle.format": "90 แคปซูล",
  "products.PRODUCT_BY_SLUG.pill-bottle.formatLong": "90 แคปซูล · 30 วัน",
  "products.PRODUCT_BY_SLUG.pill-bottle.howToTake.0.body":
    "แคปซูล 3 เม็ดให้ผงเท่ากับหนึ่งซองขนาด 10 กรัม",
  "products.PRODUCT_BY_SLUG.pill-bottle.howToTake.0.title":
    "รับประทานครั้งละ 3 แคปซูล",
  "products.PRODUCT_BY_SLUG.pill-bottle.howToTake.1.body":
    "อุณหภูมิใดก็ได้ ไม่มีอะไรต้องผสมและไม่มีอะไรต้องรอ",
  "products.PRODUCT_BY_SLUG.pill-bottle.howToTake.1.title": "พร้อมน้ำ",
  "products.PRODUCT_BY_SLUG.pill-bottle.howToTake.2.body":
    "ในเวลาเดิมของทุกวัน คนส่วนใหญ่รับประทานก่อนอาหารเช้า แม้ว่าเวลาจะสำคัญน้อยกว่าความสม่ำเสมอ",
  "products.PRODUCT_BY_SLUG.pill-bottle.howToTake.2.title": "วันละครั้ง",
  "products.PRODUCT_BY_SLUG.pill-bottle.name": "Steppe Gut แบบแคปซูล",
  "products.PRODUCT_BY_SLUG.pill-bottle.paragraph":
    "ผงนมม้าหมักจากมองโกเลียบรรจุแคปซูล 90 เม็ด รับประทานวันละ 3 แคปซูลพร้อมน้ำ แต่ละชุดให้ปริมาณเท่ากับหนึ่งซอง โดยไม่ต้องผสมหรือเตรียมอะไร",
  "products.PRODUCT_BY_SLUG.pill-bottle.railDescriptor":
    "90 แคปซูล รับประทานวันละ 3 เม็ด ไม่ต้องรับรส",
  "products.PRODUCT_BY_SLUG.pill-bottle.reassurance":
    "จัดส่งภายใน 2–4 วันทำการทั่วประเทศไทย ขวดที่ยังไม่เปิดส่งคืนได้ภายใน 14 วัน",
  "products.PRODUCT_BY_SLUG.pill-bottle.servingSize": "3 แคปซูล",

  "products.PRODUCT_BY_SLUG.sachet-bag.allergen":
    "มีส่วนผสมของนม ปิดผนึกทุกครั้งหลังใช้และเก็บให้แห้ง",
  "products.PRODUCT_BY_SLUG.sachet-bag.alt": "ถุงเติม Steppe Gut ขนาด 250 กรัม",
  "products.PRODUCT_BY_SLUG.sachet-bag.descriptor":
    "ผงนมม้าหมักแบบไม่แบ่งซองในถุงขนาด 250 กรัม พร้อมช้อนตวง สำหรับผู้ที่รับประทานเป็นกิจวัตรอยู่แล้วและต้องการบรรจุภัณฑ์น้อยลงกับต้นทุนต่อครั้งที่ถูกลง",
  "products.PRODUCT_BY_SLUG.sachet-bag.format": "ถุงขนาด 250 กรัม",
  "products.PRODUCT_BY_SLUG.sachet-bag.formatLong":
    "ถุงขนาด 250 กรัม · 25 ครั้ง",
  "products.PRODUCT_BY_SLUG.sachet-bag.howToTake.0.body":
    "ช้อนที่ให้มาในถุงตวงได้ 10 กรัม เท่ากับหนึ่งซอง",
  "products.PRODUCT_BY_SLUG.sachet-bag.howToTake.0.title": "หนึ่งช้อนปาด",
  "products.PRODUCT_BY_SLUG.sachet-bag.howToTake.1.body":
    "ใช้น้ำเย็นหรืออุณหภูมิห้อง น้ำร้อนไม่เป็นอันตราย แต่ทำให้รสชาติแย่ลง",
  "products.PRODUCT_BY_SLUG.sachet-bag.howToTake.1.title":
    "เติมน้ำเย็น 100 มิลลิลิตร",
  "products.PRODUCT_BY_SLUG.sachet-bag.howToTake.2.body":
    "จากนั้นปิดผนึกถุงและเก็บให้แห้ง ผงแบบไม่แบ่งซองดูดความชื้นเร็วกว่าซองที่ปิดผนึกไว้",
  "products.PRODUCT_BY_SLUG.sachet-bag.howToTake.2.title": "คนแล้วดื่ม",
  "products.PRODUCT_BY_SLUG.sachet-bag.name": "Steppe Gut แบบซองในถุง",
  "products.PRODUCT_BY_SLUG.sachet-bag.paragraph":
    "ผงนมม้าหมักจากมองโกเลียแบบไม่แบ่งซอง 250 กรัม พร้อมช้อนตวง หนึ่งช้อนต่อวันเท่ากับ 10 กรัม สูตรเดียวกับแบบซอง โดยใช้บรรจุภัณฑ์ต่อครั้งน้อยลง",
  "products.PRODUCT_BY_SLUG.sachet-bag.railDescriptor":
    "ผงแบบไม่แบ่งซอง 250 กรัม พร้อมช้อนตวง บรรจุภัณฑ์น้อยลง คุ้มค่ากว่า",
  "products.PRODUCT_BY_SLUG.sachet-bag.reassurance":
    "จัดส่งภายใน 2–4 วันทำการทั่วประเทศไทย ถุงที่ยังไม่เปิดส่งคืนได้ภายใน 14 วัน",
  "products.PRODUCT_BY_SLUG.sachet-bag.servingSize": "10 กรัม หนึ่งช้อนปาด",

  "products.PRODUCT_BY_SLUG.sachet-box.allergen": "มีส่วนผสมของนม",
  "products.PRODUCT_BY_SLUG.sachet-box.alt":
    "กล่องซอง Steppe Gut บรรจุ 25 ซองสำหรับทุกวัน",
  "products.PRODUCT_BY_SLUG.sachet-box.descriptor":
    "ผงนมม้าหมักบรรจุซองแยก 25 ซอง หนึ่งซองต่อหนึ่งวัน ฉีกซอง ผสมน้ำ แล้วดื่ม",
  "products.PRODUCT_BY_SLUG.sachet-box.format": "ซองขนาด 10 กรัม 25 ซอง",
  "products.PRODUCT_BY_SLUG.sachet-box.formatLong":
    "ซองขนาด 10 กรัม 25 ซอง · 25 วัน",
  "products.PRODUCT_BY_SLUG.sachet-box.howToTake.0.body":
    "ฉีกตามรอยบากด้านบน ผงมีเนื้อละเอียดและตกตะกอนเร็ว",
  "products.PRODUCT_BY_SLUG.sachet-box.howToTake.0.title": "ฉีกซอง",
  "products.PRODUCT_BY_SLUG.sachet-box.howToTake.1.body":
    "ใช้น้ำเย็นหรืออุณหภูมิห้อง น้ำร้อนไม่เป็นอันตราย แต่ทำให้รสชาติแย่ลง",
  "products.PRODUCT_BY_SLUG.sachet-box.howToTake.1.title":
    "เติมน้ำเย็น 100 มิลลิลิตร",
  "products.PRODUCT_BY_SLUG.sachet-box.howToTake.2.body":
    "ดื่มภายในหนึ่งถึงสองนาที ก่อนที่ผงจะตกตะกอน คนส่วนใหญ่ดื่มก่อนอาหารเช้า แม้ว่าช่วงเวลาของวันจะสำคัญน้อยกว่าการดื่มในเวลาเดิมทุกวัน",
  "products.PRODUCT_BY_SLUG.sachet-box.howToTake.2.title": "คนแล้วดื่ม",
  "products.PRODUCT_BY_SLUG.sachet-box.name": "Steppe Gut แบบซองในกล่อง",
  "products.PRODUCT_BY_SLUG.sachet-box.paragraph":
    "ผงนมม้าหมักจากมองโกเลียขนาด 10 กรัม จำนวน 25 ซอง รับประทานวันละหนึ่งซอง คนให้เข้ากับน้ำ 100 มิลลิลิตร แบ่งปริมาณมาให้แล้ว จึงไม่ต้องตวงเอง",
  "products.PRODUCT_BY_SLUG.sachet-box.railDescriptor":
    "25 ซองสำหรับทุกวัน ฉีก ผสมน้ำ แล้วดื่ม",
  "products.PRODUCT_BY_SLUG.sachet-box.reassurance":
    "จัดส่งภายใน 2–4 วันทำการทั่วประเทศไทย กล่องที่ยังไม่เปิดส่งคืนได้ภายใน 14 วัน",
  "products.PRODUCT_BY_SLUG.sachet-box.servingSize": "10 กรัม",

  "products.SHARED_BADGES.0.label": "ผลิตภัณฑ์จากมองโกเลีย",

  "products.SHARED_BADGES.1.label": "หมักตามธรรมชาติ",

  "products.SHARED_BADGES.2.label": "มีส่วนผสมของนม",

  "products.SHARED_BADGES.3.label": "ไม่เติมน้ำตาล",

  // ------------------------------------------------------------- social --
  "social.CONTENT_PILLARS.0.title": "ฤดูกาล",
  "social.CONTENT_PILLARS.0.body":
    "ฤดูรีดนมม้าอยู่ระหว่างเดือนมิถุนายนถึงตุลาคม สิ่งที่เรามีให้ชมส่วนใหญ่เกิดขึ้นในช่วงห้าเดือนนี้บนทุ่งหญ้า และเป็นส่วนของธุรกิจนี้ที่น่าสนใจอย่างแท้จริงเมื่อได้เห็น",
  "social.CONTENT_PILLARS.1.title": "วิธีการผลิต",
  "social.CONTENT_PILLARS.1.body":
    "การหมัก การอบแห้ง การบรรจุ ขั้นตอนกลางที่ไม่หรูหรา ซึ่งแทบไม่มีใครในหมวดหมู่นี้เปิดเผยให้เห็น",
  "social.CONTENT_PILLARS.2.title": "คำถามที่เราได้รับ",
  "social.CONTENT_PILLARS.2.body":
    "คำถามที่ส่งเข้ามาทางอีเมล ตอบให้ทุกคนเห็น รวมถึงคำถามที่คำตอบคือเรายังไม่ทราบ",
  "social.CONTENT_PILLARS.3.title": "สิ่งที่เราผิดพลาด",
  "social.CONTENT_PILLARS.3.body":
    "เมื่อเราแก้ไขข้อมูลบนเว็บไซต์นี้ (ตัวเลข ข้อความอ้างอิง หรือถ้อยคำ) เราเลือกที่จะบอกให้ทราบ มากกว่าแก้ไขอย่างเงียบๆ",

  "social.SOCIAL_PLATFORMS.0.name": "Instagram",
  "social.SOCIAL_PLATFORMS.1.name": "TikTok",
  "social.SOCIAL_PLATFORMS.2.name": "Facebook",
  "social.SOCIAL_PLATFORMS.3.name": "YouTube",
  "social.SOCIAL_PLATFORMS.4.name": "LINE",
};
