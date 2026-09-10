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
};
