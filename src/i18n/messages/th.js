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

  // --------------------------------------------------------------- story --
  "story.STANDFIRST.eyebrow": "จุดเริ่มต้น",
  "story.STANDFIRST.lead":
    "แปดร้อยปีมาแล้ว ที่นมม้าหมักเป็นส่วนหนึ่งของชีวิตบนทุ่งหญ้าสเตปป์มองโกเลีย ไม่ใช่ในฐานะผลิตภัณฑ์สุขภาพที่ถูกออกแบบขึ้น แต่ในฐานะสิ่งที่ผืนดินมอบให้ และสิ่งที่ร่างกายเติบโตได้ดีด้วย",
  "story.STANDFIRST.sub": "ยังคงทำด้วยวิธีเดิม แปดร้อยปีผ่านไป",

  "story.CHAPTERS.0.folio": "ผืนดิน",
  "story.CHAPTERS.0.title": "สิ่งที่ผืนดินหล่อเลี้ยงได้",
  "story.CHAPTERS.0.pullQuote":
    "ผืนดินให้หญ้า คุณจึงเลี้ยงสัตว์ที่กินหญ้า และย้ายไปเมื่อหญ้าหมด",
  "story.CHAPTERS.0.plate.alt":
    "ทุ่งหญ้าสเตปป์กว้างใหญ่ใต้ท้องฟ้าโปร่งในยามแสงทอง",

  "story.CHAPTERS.1.folio": "ม้า",
  "story.CHAPTERS.1.title": "สัตว์ที่ทุกสิ่งต้องพึ่งพา",
  "story.CHAPTERS.1.pullQuote":
    "ม้าแบกรับทุกอย่าง ทั้งการเดินทาง ความมั่งคั่ง และอาหาร มีเพียงม้าแม่พันธุ์ที่ให้นม",
  "story.CHAPTERS.1.plate.alt":
    "ม้าแม่พันธุ์พักผ่อนกลางทุ่งหญ้าโล่งในยามแสงทอง",

  "story.CHAPTERS.2.folio": "ฤดูกาล",
  "story.CHAPTERS.2.title": "น้ำนมปรากฏ แล้วก็จางหาย",
  "story.CHAPTERS.2.pullQuote":
    "นมที่เสียเร็วต้องกลายเป็นสิ่งอื่น การหมักคือคำตอบเดียวที่มี",
  "story.CHAPTERS.2.plate.alt": "มือกำลังรีดนมม้าแม่พันธุ์กลางทุ่งหญ้าโล่ง",

  "story.CHAPTERS.3.folio": "ภาชนะ",
  "story.CHAPTERS.3.title": "ความอดทนและเชื้อจุลินทรีย์มีชีวิต",
  "story.CHAPTERS.3.pullQuote":
    "เชื้อจุลินทรีย์มีชีวิต การคนเบามือ และความอดทน ผลลัพธ์คืออาหารที่เป็นของร่างกาย",
  "story.CHAPTERS.3.plate.alt": "ภาชนะหมักแบบดั้งเดิมภายในกระโจมเกอร์",

  "story.CHAPTERS.4.folio": "ผู้ขี่ม้า",
  "story.CHAPTERS.4.title": "อาหารที่เดินทางด้วยสี่ขา",
  "story.CHAPTERS.4.pullQuote":
    "อาหารที่เลี้ยงตัวเอง พาตัวเองไป และทำขึ้นทุกที่ที่ขบวนหยุดพัก",
  "story.CHAPTERS.4.plate.alt": "ผู้ขี่ม้าควบข้ามทุ่งหญ้าโล่งในยามแสงทอง",

  "story.CHAPTERS.5.folio": "สิ่งที่คงอยู่",
  "story.CHAPTERS.5.title": "สืบทอดต่อมา ไม่ใช่คิดขึ้นใหม่",
  "story.CHAPTERS.5.pullQuote":
    "วิธีการนี้มีอยู่แล้ว สิ่งที่เราทำคือรักษามันไว้ เพื่อไม่ให้สิ่งใดถูกเจือจางด้วยระยะทางหรือความสะดวก",
  "story.CHAPTERS.5.plate.alt": "มือกำลังทำงานบนโต๊ะไม้เรียบง่าย",

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

  // ---------------------------------------------------------- gutHealth --
  "gutHealth.GUT_HEALTH_ROWS.0.heading": "สิ่งที่คุณกิน และสิ่งที่หล่อเลี้ยงลำไส้",
  "gutHealth.GUT_HEALTH_ROWS.0.body":
    "อาหารที่หลากหลายและอุดมด้วยพืชผัก ให้ลำไส้มีวัตถุดิบหลายหลากไว้ทำงาน Steppe Gut เป็นเพียงอาหารหมักอย่างหนึ่งในหลายอย่าง ไม่ใช่สิ่งทดแทนอาหารส่วนที่เหลือในจาน หน้าเรื่องอาหารบอกว่ามันมีที่ทางอยู่ตรงไหนในวันปกติของการกิน",
  "gutHealth.GUT_HEALTH_ROWS.0.cta.label": "ลำไส้กับอาหาร",
  "gutHealth.GUT_HEALTH_ROWS.0.alt": "ภาพมุมสูงของผลไม้สดในชาม",

  "gutHealth.GUT_HEALTH_ROWS.1.heading": "ชุมชนที่คุณพกพาอยู่ในตัว",
  "gutHealth.GUT_HEALTH_ROWS.1.body":
    "จุลินทรีย์นับล้านล้านตัวอาศัยอยู่ในลำไส้ของคน และไม่มีใครสองคนที่มีองค์ประกอบเหมือนกันเป๊ะ อาหารหมักเป็นส่วนหนึ่งของภาพนี้มาตั้งแต่มนุษย์เริ่มลงมือทำ เรารวบรวมคำถามที่ถูกถามบ่อยที่สุดเกี่ยวกับการหมักและจุลินทรีย์ในนั้นไว้เป็นรายการที่อัปเดตอยู่เสมอ",
  "gutHealth.GUT_HEALTH_ROWS.1.cta.label": "คำถามที่พบบ่อย",
  "gutHealth.GUT_HEALTH_ROWS.1.alt": "ภาพระยะใกล้ของช้อนตักของเหลวสีอ่อนที่กำลังเกิดฟอง",

  "gutHealth.GUT_HEALTH_ROWS.2.heading": "ที่ทางในหนึ่งวัน",
  "gutHealth.GUT_HEALTH_ROWS.2.body":
    "ลำไส้มีตารางเวลาคร่าว ๆ ของมันเอง และจะสงบลงเมื่อวันเวลารอบตัวเป็นไปอย่างสม่ำเสมอ มื้ออาหารในเวลาใกล้เคียงกัน การตื่นนอนที่คงที่ ยามเย็นที่คล้ายกับเมื่อวาน หน้าเรื่องกิจวัตรมองว่าการกินอาหารหมักทุกวันมีที่ทางอยู่ตรงไหนในนั้น",
  "gutHealth.GUT_HEALTH_ROWS.2.cta.label": "ลำไส้กับกิจวัตร",
  "gutHealth.GUT_HEALTH_ROWS.2.alt": "โต๊ะข้างเตียงที่มีโคมไฟ นาฬิกาเล็ก ๆ และดอกไม้ในโหลแก้ว",

  "gutHealth.GUT_HEALTH_ROWS.3.heading": "ลำไส้กับความรู้สึกของคุณ",
  "gutHealth.GUT_HEALTH_ROWS.3.body":
    "ลำไส้กับสมองติดต่อกันอย่างใกล้ชิดผ่านระบบประสาท และต่างฝ่ายต่างรับรู้สภาพของอีกฝ่าย ช่วงที่จิตใจห่อเหี่ยวอาจแสดงออกผ่านการย่อยอาหาร และลำไส้ที่ไม่สงบก็อาจส่งผลต่ออารมณ์ตลอดทั้งวัน หน้าเรื่องอารมณ์พาไปดูว่าความเชื่อมโยงนี้เป็นที่เข้าใจกันแค่ไหน และอะไรที่ยังอยู่ระหว่างการศึกษา",
  "gutHealth.GUT_HEALTH_ROWS.3.cta.label": "ลำไส้กับอารมณ์",
  "gutHealth.GUT_HEALTH_ROWS.3.alt": "คนกำลังจิบเครื่องดื่มจากแก้วในครัวอบอุ่นท่ามกลางแสงกลางวันนวลตา",

  "gutHealth.GUT_HEALTH_ROWS.4.heading": "การเคลื่อนไหว ในจังหวะธรรมดา",
  "gutHealth.GUT_HEALTH_ROWS.4.body":
    "การเคลื่อนไหวเบา ๆ อย่างสม่ำเสมอเป็นสิ่งเรียบง่ายอย่างหนึ่งที่ช่วยให้การย่อยอาหารเดินหน้าต่อไป การเดินหลังมื้ออาหาร การยืดเส้นในตอนเช้า งานที่ทำให้คุณได้ยืนเดิน หน้าเรื่องการออกกำลังกายตั้งเกณฑ์ไว้ต่ำอย่างตั้งใจ",
  "gutHealth.GUT_HEALTH_ROWS.4.cta.label": "ลำไส้กับการออกกำลังกาย",
  "gutHealth.GUT_HEALTH_ROWS.4.alt": "คนกำลังเดินบนเส้นทางเงียบสงบด้วยจังหวะสบาย ๆ",

  "gutHealth.GUT_HEALTH_ROWS.5.heading": "ราคาของคืนที่นอนน้อย",
  "gutHealth.GUT_HEALTH_ROWS.5.body":
    "การนอนกับลำไส้เดินตามนาฬิกาที่ทับซ้อนกัน คืนที่นอนน้อยติดต่อกันหลายคืนจึงมักรู้สึกได้ทั้งสองอย่าง การถนอมชั่วโมงการนอนเป็นหนึ่งในไม่กี่นิสัยที่ให้ผลตอบแทนกลับมาทั่วทั้งระบบ หน้าเรื่องการนอนอธิบายว่าทั้งสองสิ่งนี้เดินเวลาไปด้วยกันอย่างไร",
  "gutHealth.GUT_HEALTH_ROWS.5.cta.label": "ลำไส้กับการนอน",
  "gutHealth.GUT_HEALTH_ROWS.5.alt": "เตียงที่ยังไม่ได้เก็บข้างหน้าต่างในแสงก่อนรุ่งสาง",

  "gutHealth.GUT_HEALTH_ROWS.6.heading": "พลังของสิ่งที่เล็กจิ๋ว",
  "gutHealth.GUT_HEALTH_ROWS.6.body":
    "จุลินทรีย์ตัวเดียวเล็กเกินกว่าจะมองเห็น และในตัวคุณมีพวกมันมากกว่าจำนวนคนบนโลก เมื่อได้รับการดูแล ประชากรกลุ่มนี้ทำงานเงียบ ๆ ไว้มากมาย Steppe Gut เป็นวิธีหนึ่งในการส่งสิ่งที่พวกมันคุ้นเคยอยู่แล้วไปให้",
  "gutHealth.GUT_HEALTH_ROWS.6.cta.label": "ดูสินค้าทั้งหมด",
  "gutHealth.GUT_HEALTH_ROWS.6.alt": "หยดน้ำค้างหยดเดียวเกาะอยู่บนใบหญ้า",

  "gutHealth.GUT_HEALTH_WAYS.heading": "วิธีที่ผู้คนรับประทานกัน",
  "gutHealth.GUT_HEALTH_WAYS.items.0.label": "ตอนเช้า",
  "gutHealth.GUT_HEALTH_WAYS.items.0.title": "คนลงในน้ำ",
  "gutHealth.GUT_HEALTH_WAYS.items.0.note": "ก่อนสิ่งอื่นใด",
  "gutHealth.GUT_HEALTH_WAYS.items.0.alt": "แก้วของเหลวขุ่นวางอยู่บนขอบหน้าต่าง",

  "gutHealth.GUT_HEALTH_WAYS.items.1.label": "พร้อมอาหาร",
  "gutHealth.GUT_HEALTH_WAYS.items.1.title": "ควบคู่ไปกับมื้ออาหาร",
  "gutHealth.GUT_HEALTH_WAYS.items.1.note": "ผสมในโยเกิร์ตหรือสมูทตี้",
  "gutHealth.GUT_HEALTH_WAYS.items.1.alt": "ชามโยเกิร์ตที่มีช้อนวางแช่อยู่",

  "gutHealth.GUT_HEALTH_WAYS.items.2.label": "หลังออกกำลังกาย",
  "gutHealth.GUT_HEALTH_WAYS.items.2.title": "ในเครื่องดื่มฟื้นกำลัง",
  "gutHealth.GUT_HEALTH_WAYS.items.2.note": "เมื่อร่างกายเข้าที่แล้ว",
  "gutHealth.GUT_HEALTH_WAYS.items.2.alt": "ขวดเชคเกอร์และดัมเบลบนม้านั่งในยิม",

  "gutHealth.GUT_HEALTH_WAYS.items.3.label": "ตอนเย็น",
  "gutHealth.GUT_HEALTH_WAYS.items.3.title": "อุ่น ๆ ก่อนเข้านอน",
  "gutHealth.GUT_HEALTH_WAYS.items.3.note": "ส่วนหนึ่งของการผ่อนคลายก่อนนอน",
  "gutHealth.GUT_HEALTH_WAYS.items.3.alt": "แก้วอุ่น ๆ ที่ถูกประคองด้วยสองมือในแสงสลัว",

  // ----------------------------------------------------------- gutDiet --
  "gutDiet.GUT_DIET.heading": "ลำไส้กับอาหาร",
  "gutDiet.GUT_DIET.standfirst":
    "ลำไส้ที่แข็งแรงกับจานอาหารที่ดีคือเรื่องเดียวกัน อาหารที่หลากหลายและเน้นพืชเป็นหลักให้จุลินทรีย์ที่คุณพกพาอยู่มีวัตถุดิบมากมายไว้ทำงาน และอาหารหมักวันละนิดเป็นเพียงส่วนเล็ก ๆ ของภาพนั้น ไม่ใช่สิ่งที่มาแทนอาหารส่วนที่เหลือในมื้อ",

  "gutDiet.GUT_DIET.intro.heading": "เริ่มต้นที่ลำไส้",
  "gutDiet.GUT_DIET.intro.body":
    "ลำไส้ทำงานด้วยสิ่งที่ส่งไปถึงมัน ใยอาหารจากพืช อาหารหมักเล็กน้อย น้ำตลอดทั้งวัน และมื้ออาหารในเวลาใกล้เคียงกัน ไม่มีอะไรซับซ้อน และไม่มีอาหารชนิดใดชนิดเดียวที่แบกรับทั้งหมด หน้านี้บอกว่า Steppe Gut มีที่ทางอยู่ตรงไหนในหนึ่งสัปดาห์ปกติของการกิน",
  "gutDiet.GUT_DIET.intro.aside":
    "Steppe Gut เป็นอาหารหมักอย่างหนึ่งในหลายอย่าง ไม่ใช่ศูนย์กลางของจาน คนลงในน้ำ โยเกิร์ต หรือสมูทตี้ในตอนเช้า และอยู่เคียงข้างผัก ธัญพืช และพืชตระกูลถั่วที่แบกรับงานส่วนใหญ่ตลอดสัปดาห์ปกติ",

  "gutDiet.GUT_DIET.heroImage.description":
    "ภาพมุมสูงของผักสด ธัญพืชเต็มเมล็ด และพืชตระกูลถั่ววางกระจายบนโต๊ะปูผ้าลินิน แสงกลางวันสม่ำเสมอ ไม่มีแบรนด์",
  "gutDiet.GUT_DIET.heroImage.alt":
    "โต๊ะมุมสูงที่มีผัก ธัญพืช และพืชตระกูลถั่ว",

  "gutDiet.GUT_DIET.blocks.0.heading": "น้ำมาก่อน",
  "gutDiet.GUT_DIET.blocks.0.imageBrief":
    "โหลแก้วใส่น้ำสองใบพร้อมแตงกวาฝาน มะนาว และมินต์ บนโต๊ะไม้เก่ากลางแจ้ง แสงกลางวันจ้า",
  "gutDiet.GUT_DIET.blocks.0.alt":
    "โหลน้ำสองใบพร้อมแตงกวา มะนาว และมินต์ บนโต๊ะไม้",

  "gutDiet.GUT_DIET.blocks.1.heading": "อาหารพรีไบโอติกคืออะไร",
  "gutDiet.GUT_DIET.blocks.1.imageBrief":
    "มัดหน่อไม้ฝรั่งสดตั้งอยู่ในกระดาษสีน้ำตาล ตัดกับพื้นหลังสีเขียวเข้มเรียบ แสงสตูดิโอกลางวันสม่ำเสมอ",
  "gutDiet.GUT_DIET.blocks.1.alt":
    "มัดหน่อไม้ฝรั่งสดห่อด้วยกระดาษสีน้ำตาล",

  "gutDiet.GUT_DIET.fermented.heading": "อาหารหมัก",
  "gutDiet.GUT_DIET.fermented.body":
    "ของดอง กิมจิ ซาวเคราต์ เคเฟอร์ และโยเกิร์ตที่มีจุลินทรีย์มีชีวิต ต่างก็มีจุลินทรีย์จากการหมักของตัวเอง และแต่ละอย่างก็เพิ่มความหลากหลายให้กับส่วนผสมที่คุณมีอยู่แล้ว Steppe Gut อยู่ในกลุ่มนี้ เป็นนมม้าหมักที่ทำแห้งเป็นผง งานศึกษาเรื่องอาหารหมักชี้ไปที่ชุมชนจุลินทรีย์ในลำไส้ที่หลากหลายขึ้นในคนที่รับประทานเป็นประจำ ซึ่งเป็นเหตุผลที่ควรมีไว้สักเล็กน้อยในการหมุนเวียนประจำสัปดาห์ มากกว่าจะพึ่งพาอย่างใดอย่างหนึ่งเพียงอย่างเดียว",

  "gutDiet.GUT_DIET.foods.heading": "อาหารสำหรับลำไส้",
  "gutDiet.GUT_DIET.foods.intro":
    "สามนิสัย ไม่ใช่รายการซื้อของ แต่ละอย่างทำต่อเนื่องได้ง่ายตลอดสัปดาห์ปกติ",
  "gutDiet.GUT_DIET.foods.items.0.title": "ใยอาหาร",
  "gutDiet.GUT_DIET.foods.items.0.note":
    "ผัก ผลไม้ ธัญพืชเต็มเมล็ด และพืชตระกูลถั่วในทุกวัน",
  "gutDiet.GUT_DIET.foods.items.1.title": "อาหารหมัก",
  "gutDiet.GUT_DIET.foods.items.1.note":
    "อาหารหมักปริมาณเล็กน้อยเกือบทุกวัน",
  "gutDiet.GUT_DIET.foods.items.2.title": "พืชที่หลากหลาย",
  "gutDiet.GUT_DIET.foods.items.2.note":
    "พืชหลายชนิดตลอดสัปดาห์ มากกว่าจะกินพืชไม่กี่ชนิดในปริมาณมาก",

  "gutDiet.GUT_DIET.more.heading": "เพิ่มเติมจากสุขภาพลำไส้",
  "gutDiet.GUT_DIET.more.items.0.title": "ลำไส้กับอารมณ์",
  "gutDiet.GUT_DIET.more.items.0.note": "ลำไส้กับสมองติดต่อกันอย่างไร",
  "gutDiet.GUT_DIET.more.items.1.title": "ลำไส้กับกิจวัตร",
  "gutDiet.GUT_DIET.more.items.1.note":
    "อาหารหมักประจำวันมีที่ทางอยู่ตรงไหนในรูปแบบของหนึ่งวัน",
  "gutDiet.GUT_DIET.more.items.2.title": "ลำไส้กับการนอน",
  "gutDiet.GUT_DIET.more.items.2.note":
    "คืนที่นอนน้อยติดต่อกันทำให้ทั้งระบบต้องจ่ายอะไรไปบ้าง",

  // ----------------------------------------------------------- gutMood --
  "gutMood.GUT_MOOD_FEATURE.heading": "ลำไส้กับสมองติดต่อกันอย่างใกล้ชิด",
  "gutMood.GUT_MOOD_FEATURE.body":
    "ทั้งสองส่งสัญญาณถึงกันผ่านระบบประสาททั้งสองทิศทางตลอดวัน จึงเป็นเหตุผลที่ช่วงที่จิตใจห่อเหี่ยวอาจแสดงออกมาที่การย่อยอาหาร และลำไส้ที่ปั่นป่วนก็ระบายสีให้กับความรู้สึกในหนึ่งวันได้ ต่อไปนี้คือชุดนิสัยเรียบง่ายที่ผู้คนใช้ดูแลอีกครึ่งหนึ่งของวงจรนี้",
  "gutMood.GUT_MOOD_FEATURE.alt":
    "ภาพระยะใกล้ของช้อนตักของเหลวสีอ่อนที่กำลังเกิดฟอง",

  "gutMood.GUT_MOOD_HABITS_INTRO.heading":
    "นิสัยบางอย่างที่ผู้คนใช้เพื่อให้รู้สึกดีที่สุด",
  "gutMood.GUT_MOOD_HABITS_INTRO.body":
    "ไม่มีสิ่งใดในนี้เป็นการรักษา และไม่มีสิ่งใดเกี่ยวข้องกับ Steppe Gut เหล่านี้คือสิ่งเรียบง่ายที่ทำได้โดยไม่สิ้นเปลือง และแทรกอยู่ในสัปดาห์ธรรมดาได้ เลือกอย่างที่เหมาะกับคุณ และปล่อยที่เหลือไว้",

  "gutMood.GUT_MOOD_HERO.alt":
    "คนกำลังหัวเราะกลางแจ้งท่ามกลางลูกโป่งสีอ่อนในแสงจ้า",

  "gutMood.GUT_MOOD_INTRO.heading":
    "ลำไส้กับความรู้สึกของคุณเชื่อมโยงกันมากกว่าที่เห็น",
  "gutMood.GUT_MOOD_INTRO.body":
    "ช่วงเวลาที่เครียดเปลี่ยนได้ทั้งส่วนผสมและพฤติกรรมของจุลินทรีย์ในลำไส้ และลำไส้ก็ส่งสัญญาณกลับไปอีกทาง จึงคุ้มค่าที่จะคอยสังเกตสิ่งที่ทำให้คุณตึงเครียด และสิ่งที่ช่วยให้คุณสงบลง",

  "gutMood.GUT_MOOD_READ_MORE.heading": "อ่านต่อ",
  "gutMood.GUT_MOOD_READ_MORE.items.0.caption": "ลำไส้กับกิจวัตร",
  "gutMood.GUT_MOOD_READ_MORE.items.0.alt":
    "ตารางกิจวัตรประจำวันที่เขียนด้วยมือ พร้อมถ้วยวางอยู่บนหน้ากระดาษ",
  "gutMood.GUT_MOOD_READ_MORE.items.1.caption": "ลำไส้กับการนอน",
  "gutMood.GUT_MOOD_READ_MORE.items.1.alt":
    "เตียงที่ยังไม่ได้เก็บข้างหน้าต่างในแสงก่อนรุ่งสาง",
  "gutMood.GUT_MOOD_READ_MORE.items.2.caption": "ลำไส้กับการออกกำลังกาย",
  "gutMood.GUT_MOOD_READ_MORE.items.2.alt":
    "คนกำลังเดินบนเส้นทางเงียบสงบด้วยจังหวะสบาย ๆ",

  "gutMood.GUT_MOOD_SHELVES.0.heading": "เวลากลางแจ้ง",
  "gutMood.GUT_MOOD_SHELVES.0.items.0.caption": "เดินเล่นในที่ที่มีสีเขียว",
  "gutMood.GUT_MOOD_SHELVES.0.items.0.alt":
    "ทะเลสาบในสวนลุมพินี กรุงเทพฯ เรือถีบบนผิวน้ำนิ่งใต้ริมตลิ่งที่เรียงรายด้วยต้นไม้เขียวชอุ่ม โดยมีเส้นขอบฟ้าเมืองที่พร่ามัวอยู่เบื้องหลัง",
  "gutMood.GUT_MOOD_SHELVES.0.items.1.caption": "แสงเช้าตรู่",
  "gutMood.GUT_MOOD_SHELVES.0.items.1.alt":
    "พระอาทิตย์ขึ้นเหนือทะเลที่อ่าวนาง กระบี่ ดวงอาทิตย์อยู่ต่ำเหนือเส้นขอบฟ้าหลังเรือหางยาว โดยมีแสงทอดยาวไปทั่วผิวน้ำ",
  "gutMood.GUT_MOOD_SHELVES.0.items.2.caption": "ไม่กี่นาทีกลางแดด",
  "gutMood.GUT_MOOD_SHELVES.0.items.2.alt":
    "คนกำลังนั่งพักบนขั้นบันไดในแสงแดดอุ่น",
  "gutMood.GUT_MOOD_SHELVES.0.items.3.caption": "ต้นไม้สักต้นให้ดูแล",
  "gutMood.GUT_MOOD_SHELVES.0.items.3.alt":
    "ต้นไม้กระถางเล็ก ๆ บนขอบหน้าต่าง",

  "gutMood.GUT_MOOD_SHELVES.1.heading": "กิจวัตรประจำวันที่ดี",
  "gutMood.GUT_MOOD_SHELVES.1.items.0.caption": "ตื่นนอนในเวลาใกล้เคียงกัน",
  "gutMood.GUT_MOOD_SHELVES.1.items.0.alt": "นาฬิกาปลุกบนโต๊ะข้างเตียง",
  "gutMood.GUT_MOOD_SHELVES.1.items.1.caption": "มื้อเช้าที่ได้นั่งกิน",
  "gutMood.GUT_MOOD_SHELVES.1.items.1.alt": "ชามโยเกิร์ตและผลไม้บนโต๊ะ",
  "gutMood.GUT_MOOD_SHELVES.1.items.2.caption": "หยุดพักระหว่างงาน",
  "gutMood.GUT_MOOD_SHELVES.1.items.2.alt": "คนกำลังยืดเส้นยืดสายที่โต๊ะทำงาน",
  "gutMood.GUT_MOOD_SHELVES.1.items.3.caption": "ล้างหน้าน้ำเย็นให้ตื่นตัว",
  "gutMood.GUT_MOOD_SHELVES.1.items.3.alt": "น้ำเย็นไหลผ่านมือที่อ่างล้างหน้า",

  "gutMood.GUT_MOOD_SHELVES.2.heading": "ทำให้จิตใจสงบ",
  "gutMood.GUT_MOOD_SHELVES.2.items.0.caption": "เอ่ยถึงส่วนดี ๆ ของวัน",
  "gutMood.GUT_MOOD_SHELVES.2.items.0.alt":
    "มือกำลังเขียนรายการสั้น ๆ ลงในสมุด",
  "gutMood.GUT_MOOD_SHELVES.2.items.1.caption": "เพลงที่คุณคุ้นเคยดีอยู่แล้ว",
  "gutMood.GUT_MOOD_SHELVES.2.items.1.alt": "หูฟังวางอยู่บนปกแผ่นเสียง",
  "gutMood.GUT_MOOD_SHELVES.2.items.2.caption": "ช่วงเวลาเงียบ ๆ กับสัตว์เลี้ยง",
  "gutMood.GUT_MOOD_SHELVES.2.items.2.alt": "สุนัขนอนหลับในหย่อมแสงแดด",
  "gutMood.GUT_MOOD_SHELVES.2.items.3.caption": "หายใจช้า ๆ หนึ่งครั้ง ทำซ้ำ",
  "gutMood.GUT_MOOD_SHELVES.2.items.3.alt":
    "คนกำลังนั่งสงบอยู่ข้างหน้าต่างที่เปิดอยู่",

  // ---------------------------------------------------------- gutSleep --
  "gutSleep.GUT_SLEEP_META.title": "ลำไส้กับการนอน · สุขภาพลำไส้ · Steppe Gut",
  "gutSleep.GUT_SLEEP_META.description":
    "การนอนและลำไส้เดินตามนาฬิการอบวันเดียวกัน คืนที่นอนน้อยติดต่อกันเรียกร้องอะไรจากระบบย่อยอาหาร และนิสัยเล็ก ๆ ก่อนนอนที่ช่วยให้ทั้งสองเดินไปพร้อมกัน",

  "gutSleep.GUT_SLEEP_INTRO":
    "การนอนและการย่อยอาหารเดินตามนาฬิการอบวันเดียวกันราวยี่สิบสี่ชั่วโมง และอ่านสัญญาณเดียวกัน แสงยามเช้า จังหวะเวลาของมื้ออาหาร และเวลาเข้านอนที่สม่ำเสมอ เมื่อค่ำคืนเป็นเวลาเดิมอย่างสม่ำเสมอ ลำไส้ก็มีช่วงที่เงียบสงบและคาดเดาได้มากขึ้นไว้ทำงานในยามค่ำคืน อาหารหมักประจำวันเป็นเพียงจุดเล็ก ๆ ที่แน่นอนจุดหนึ่งในวันนั้น ไม่ใช่สิ่งที่คอยยึดจังหวะทั้งหมดไว้",

  "gutSleep.GUT_SLEEP_WHY.heading": "ทำไมการนอนจึงสำคัญต่อลำไส้",
  "gutSleep.GUT_SLEEP_WHY.alt":
    "ห้องนอนโทนครีมสว่าง มีแสงกลางวันทอดเฉียงผ่านผนังเหนือเครื่องนอนสีขาว",

  "gutSleep.GUT_SLEEP_LEAD_ROW.heading": "กะกลางคืน",
  "gutSleep.GUT_SLEEP_LEAD_ROW.alt":
    "โต๊ะข้างเตียงในแสงสลัว มีแก้วน้ำและแว่นตาที่พับเก็บไว้",

  "gutSleep.GUT_SLEEP_ROWS.0.heading": "คืนที่นอนน้อยเรียกร้องอะไรจากลำไส้",
  "gutSleep.GUT_SLEEP_ROWS.0.alt":
    "เตียงที่ยังไม่ได้เก็บข้างหน้าต่างในแสงสีเทาก่อนรุ่งสาง",
  "gutSleep.GUT_SLEEP_ROWS.1.heading": "การนอนชดเชยไม่เหมือนกัน",
  "gutSleep.GUT_SLEEP_ROWS.1.alt":
    "คนกำลังเปิดผ้าม่านบางรับแสงกลางวันสว่างจ้า มองจากด้านหลัง",

  "gutSleep.GUT_SLEEP_HABITS.heading": "นิสัยที่ปูทางให้ค่ำคืน",
  "gutSleep.GUT_SLEEP_HABITS.items.0.caption": "สัญญาณเข้านอน",
  "gutSleep.GUT_SLEEP_HABITS.items.0.alt":
    "โคมไฟหัวเตียงดวงเล็กแสงอุ่นเปิดอยู่ในห้องสลัวก่อนเข้านอน",
  "gutSleep.GUT_SLEEP_HABITS.items.1.caption": "คืนหนึ่งยาวแค่ไหน",
  "gutSleep.GUT_SLEEP_HABITS.items.1.alt":
    "เตียงที่ปูเปิดผ้าห่มไว้ในห้องมืดเงียบสงบ",
  "gutSleep.GUT_SLEEP_HABITS.items.2.caption": "รับแสงแต่เช้า",
  "gutSleep.GUT_SLEEP_HABITS.items.2.alt":
    "คนกำลังยืนที่ประตูที่เปิดอยู่ในแสงเช้าอ่อน ๆ พร้อมถ้วยในมือ",
  "gutSleep.GUT_SLEEP_HABITS.items.3.caption": "กินมื้อเย็นให้เร็วขึ้น",
  "gutSleep.GUT_SLEEP_HABITS.items.3.alt":
    "ครอบครัวกำลังนั่งกินมื้อเย็นด้วยกันแต่หัวค่ำที่โต๊ะไม้",
  "gutSleep.GUT_SLEEP_HABITS.items.4.caption": "หรี่แสงยามค่ำ",
  "gutSleep.GUT_SLEEP_HABITS.items.4.alt":
    "ห้องนั่งเล่นที่มีเพียงโคมไฟดวงเล็กดวงเดียว พร้อมหนังสือคว่ำหน้าวางอยู่บนผ้าห่ม",
  "gutSleep.GUT_SLEEP_HABITS.items.5.caption": "ห้องที่เย็นและมืด",
  "gutSleep.GUT_SLEEP_HABITS.items.5.alt":
    "ห้องนอนที่เป็นระเบียบ ผ้าม่านหนาปิดสนิท และเตียงที่ปูเปิดผ้าห่มไว้",
  "gutSleep.GUT_SLEEP_HABITS.items.6.caption": "เวลาตื่นที่สม่ำเสมอ",
  "gutSleep.GUT_SLEEP_HABITS.items.6.alt":
    "นาฬิกาปลุกแบบสองระฆังและต้นไม้เล็ก ๆ บนโต๊ะข้างเตียง ถัดจากเตียงที่จัดเก็บเรียบร้อย",

  "gutSleep.GUT_SLEEP_MORE.heading": "เพิ่มเติมจากสุขภาพลำไส้",
  "gutSleep.GUT_SLEEP_MORE.items.0.title": "ลำไส้กับกิจวัตร",
  "gutSleep.GUT_SLEEP_MORE.items.0.note":
    "มื้ออาหาร แสง และการนอน มีที่ทางอยู่ตรงไหนในรูปแบบของหนึ่งวัน",
  "gutSleep.GUT_SLEEP_MORE.items.1.title": "ลำไส้กับอารมณ์",
  "gutSleep.GUT_SLEEP_MORE.items.1.note":
    "ลำไส้กับสมองติดต่อกันอย่างไรตลอดทั้งวัน",
  "gutSleep.GUT_SLEEP_MORE.items.2.title": "ลำไส้กับการออกกำลังกาย",
  "gutSleep.GUT_SLEEP_MORE.items.2.note":
    "การเคลื่อนไหวเบา ๆ ในแต่ละวันช่วยการย่อยอาหารอย่างไร",

  // ------------------------------------------------------- gutExercise --
  "gutExercise.GUT_EXERCISE_META.title": "ลำไส้กับการออกกำลังกาย · Steppe Gut",
  "gutExercise.GUT_EXERCISE_META.description":
    "การเคลื่อนไหวเบา ๆ อย่างสม่ำเสมออยู่เคียงข้างลำไส้ที่สงบนิ่งอย่างไร พร้อมวิธีง่าย ๆ ไม่กี่อย่างที่จะนำมันเข้ามาในวันธรรมดาให้มากขึ้น",

  "gutExercise.GUT_EXERCISE_HERO.alt":
    "คนเดินเพียงลำพังบนเส้นทางทุ่งหญ้าสเตปป์อันกว้างใหญ่ยามรุ่งอรุณ",

  "gutExercise.GUT_EXERCISE_INTRO":
    "การเคลื่อนไหวเป็นหนึ่งในนิสัยที่เรียบง่ายที่สุดที่อยู่เคียงข้างลำไส้ที่สงบนิ่ง เดินสักหน่อยหลังมื้ออาหาร ยืดเส้นยืดสายในตอนเช้า งานที่ทำให้คุณได้ลุกยืน หน้านี้ตั้งใจตั้งเกณฑ์ไว้ให้ต่ำ",

  "gutExercise.GUT_EXERCISE_LEAD_NOTE.heading":
    "ไม่จำเป็นต้องหมายถึงการวิ่งไกลหรือการออกกำลังหนัก",
  "gutExercise.GUT_EXERCISE_LEAD_NOTE.body":
    "เดินเร็ว ๆ ในสวนหรือเล่นกีฬาที่คุณชอบก็นับเช่นกัน หากเป็นกิจกรรมที่คุณตั้งตารอ คุณก็มีแนวโน้มมากกว่ามากที่จะทำมันต่อไปสัปดาห์แล้วสัปดาห์เล่า และทำให้การเคลื่อนไหวเป็นส่วนหนึ่งตามปกติของแต่ละวัน",

  "gutExercise.GUT_EXERCISE_LEAD_ROW.heading": "เริ่มจากสิ่งที่คุณทำอยู่แล้ว",
  "gutExercise.GUT_EXERCISE_LEAD_ROW.body":
    "เดินสั้น ๆ ยืดเส้นสักไม่กี่นาที ขึ้นบันไดสักช่วงอย่างช้า ๆ การเคลื่อนไหวเบา ๆ เรียกร้องเพียงเล็กน้อยและแทรกลงในช่วงว่างที่มีอยู่แล้ว การเลือกสิ่งที่คุณจะทำต่อไปได้จริงสำคัญกว่าการเลือกตัวเลือกที่หนักที่สุด",
  "gutExercise.GUT_EXERCISE_LEAD_ROW.cta.label": "ลำไส้กับกิจวัตร",
  "gutExercise.GUT_EXERCISE_LEAD_ROW.alt":
    "คนกำลังเดินบนเส้นทางร่มไม้อันเงียบสงบด้วยจังหวะสบาย ๆ",

  "gutExercise.GUT_EXERCISE_WHY.heading": "ทำไมการเคลื่อนไหวจึงสำคัญ",
  "gutExercise.GUT_EXERCISE_WHY.body":
    "การเคลื่อนไหวเบา ๆ อย่างสม่ำเสมอเป็นส่วนหนึ่งของกิจวัตรสุขภาพธรรมดา และมักไปด้วยกันกับการย่อยอาหารที่สม่ำเสมอ คุณไม่จำเป็นต้องมีแผนฝึกซ้อมหรือสมาชิกยิมเพื่อให้มันนับ ลองนึกถึงวันที่คุณมีอยู่แล้ว และมองหาส่วนของมันที่ทำให้คุณได้ลุกยืนและเคลื่อนไหว",

  "gutExercise.GUT_EXERCISE_TIPS_INTRO.heading": "เคล็ดลับการออกกำลังกายเด็ด ๆ จากเรา",
  "gutExercise.GUT_EXERCISE_TIPS_INTRO.body":
    "จุดเริ่มต้นง่าย ๆ สามอย่าง ทำในจังหวะของคุณเอง ค่อย ๆ เพิ่มขึ้น และหยุดถ้ารู้สึกเจ็บตรงไหน",

  "gutExercise.GUT_EXERCISE_TIPS.0.heading": "อบอุ่นร่างกาย",
  "gutExercise.GUT_EXERCISE_TIPS.0.body":
    "เริ่มด้วยการเคลื่อนไหวเบา ๆ สักไม่กี่นาที ยืดเส้นเบา ๆ จากนั้นทำสิ่งที่กำลังจะทำในแบบช้า ๆ นี่เปิดโอกาสให้กล้ามเนื้อและจิตใจของคุณได้ปรับตัวตามก่อนจะทำอะไรมากไปกว่านั้น",
  "gutExercise.GUT_EXERCISE_TIPS.0.tip":
    "ลองเดินอยู่กับที่ช้า ๆ หมุนไหล่สักหน่อย และก้าวลันจ์เบา ๆ สองสามครั้ง",
  "gutExercise.GUT_EXERCISE_TIPS.0.alt":
    "คนกำลังยืดตัวในท่าลันจ์ต่ำพร้อมยกแขนข้างหนึ่งขึ้น กำลังอบอุ่นร่างกายบนสนามหญ้า",

  "gutExercise.GUT_EXERCISE_TIPS.1.heading": "เสริมสร้างความแข็งแรง",
  "gutExercise.GUT_EXERCISE_TIPS.1.body":
    "การออกกำลังโดยมีแรงต้านบางอย่าง ไม่ว่าจะเป็นน้ำหนักเบา ๆ ยางยืด หรือน้ำหนักตัวของคุณเอง ช่วยให้การเคลื่อนไหวในแต่ละวันเป็นเรื่องง่าย ทั้งการหิ้วของที่ซื้อมา การลุกขึ้นจากเก้าอี้เตี้ย การขึ้นบันได",
  "gutExercise.GUT_EXERCISE_TIPS.1.tip":
    "กันเวลาไว้สิบถึงสิบห้านาที และทำทุกการเคลื่อนไหวให้ช้าและควบคุมได้",
  "gutExercise.GUT_EXERCISE_TIPS.1.alt":
    "คนกำลังสควอทด้วยน้ำหนักตัวข้างม้านั่งในสวน",

  "gutExercise.GUT_EXERCISE_TIPS.2.heading": "อย่าลืมคาร์ดิโอ",
  "gutExercise.GUT_EXERCISE_TIPS.2.body":
    "อะไรก็ตามที่ทำให้ลมหายใจและอัตราการเต้นหัวใจของคุณสูงขึ้นสักหน่อยก็นับ ทั้งเดินเร็ว ปั่นจักรยาน ว่ายน้ำสบาย ๆ ไม่จำเป็นต้องหนักถึงจะคุ้มค่าที่จะทำ",
  "gutExercise.GUT_EXERCISE_TIPS.2.tip":
    "เพิ่มการเดินเร็วสิบถึงสิบห้านาทีเข้าไปในแต่ละวัน แล้วค่อย ๆ เพิ่มขึ้นตลอดหลายสัปดาห์",
  "gutExercise.GUT_EXERCISE_TIPS.2.alt":
    "คนกำลังเดินเร็วไปตามทางเดินไม้ริมน้ำ",

  "gutExercise.GUT_EXERCISE_WAYS.heading": "ทำให้การออกกำลังกายสนุก",
  "gutExercise.GUT_EXERCISE_WAYS.items.0.caption": "10,000 ก้าว",
  "gutExercise.GUT_EXERCISE_WAYS.items.0.body":
    "การนับก้าวในแต่ละวันเป็นสิ่งง่าย ๆ ที่ใช้เป็นแกนของการเดิน แบ่งมันออกไปตลอดทั้งวันถ้าแบบนั้นเหมาะกับคุณมากกว่า เดินสักรอบตอนพักเที่ยง เลือกทางกลับบ้านที่ไกลขึ้น เดินวนรอบตึกหลังมื้อเย็น และถือว่าตัวเลขเป็นแนวทางคร่าว ๆ มากกว่าจะเป็นกฎ",
  "gutExercise.GUT_EXERCISE_WAYS.items.0.alt":
    "คนกำลังเดินบนเส้นทางในป่าเขียวชอุ่ม",

  "gutExercise.GUT_EXERCISE_WAYS.items.1.caption": "ไปว่ายน้ำ",
  "gutExercise.GUT_EXERCISE_WAYS.items.1.body":
    "การว่ายน้ำเรียกร้องบางอย่างจากทั้งร่างกายในขณะที่ลดภาระที่ข้อต่อ ตั้งจังหวะสบาย ๆ ที่คุณรักษาไว้ได้สักพัก พักที่ขอบสระเมื่อไหร่ที่ต้องการ และนับความยาวสระเฉพาะเมื่อมันช่วยให้คุณทำต่อไปได้",
  "gutExercise.GUT_EXERCISE_WAYS.items.1.alt":
    "นักว่ายน้ำที่ไม่รีบร้อนกำลังว่ายข้ามสระกลางแจ้งอันสงบนิ่ง",

  "gutExercise.GUT_EXERCISE_WAYS.items.2.caption": "สนุกกับเพื่อน",
  "gutExercise.GUT_EXERCISE_WAYS.items.2.body":
    "การนัดกันไปเคลื่อนไหวกับคนอื่นทำให้การมาตามนัดง่ายขึ้นมาก เกมกีฬาประจำ การเดินคุยกันไปพลาง คลาสที่ไปด้วยกัน เพื่อนร่วมทางทำหน้าที่พอ ๆ กับตัวกิจกรรมเอง",
  "gutExercise.GUT_EXERCISE_WAYS.items.2.alt":
    "เพื่อนสามคนกำลังเล่นกีฬาสบาย ๆ บนสนามหญ้า",

  "gutExercise.GUT_EXERCISE_WAYS.items.3.caption": "เลือกขึ้นบันได",
  "gutExercise.GUT_EXERCISE_WAYS.items.3.body":
    "การเลือกขึ้นบันไดแทนลิฟต์เป็นการตัดสินใจเล็ก ๆ ที่คุณทำได้หลายครั้งต่อวัน ขึ้นด้วยจังหวะสม่ำเสมอ จับราวบันได และหยุดก่อนถึงชั้นสักชั้นในช่วงที่ยังค่อย ๆ สร้างความเคยชิน",
  "gutExercise.GUT_EXERCISE_WAYS.items.3.alt":
    "ช่องบันไดคอนกรีตเรียบ ๆ ที่มีแสงจากช่องแสงบนเพดานส่องลงมา",

  "gutExercise.GUT_EXERCISE_WAYS.items.4.caption": "การยืดเส้น",
  "gutExercise.GUT_EXERCISE_WAYS.items.4.body":
    "การยืดเส้นช้า ๆ สักไม่กี่นาทีไม่ต้องใช้อุปกรณ์และใช้พื้นที่น้อยมาก ค่อย ๆ เคลื่อนไปจนถึงจุดที่เริ่มรู้สึกตึง ค้างไว้พร้อมกับหายใจ และอย่าฝืนไปจนถึงจุดที่เจ็บ",
  "gutExercise.GUT_EXERCISE_WAYS.items.4.alt":
    "คนกำลังยืดเส้นช้า ๆ บนพรมข้างหน้าต่าง",

  "gutExercise.GUT_EXERCISE_MORE.heading": "เพิ่มเติมจากสุขภาพลำไส้",
  "gutExercise.GUT_EXERCISE_MORE.items.0.title": "ลำไส้กับกิจวัตร",
  "gutExercise.GUT_EXERCISE_MORE.items.0.note": "นิสัยประจำวันมีที่ทางอยู่ตรงไหนในหนึ่งวัน",
  "gutExercise.GUT_EXERCISE_MORE.items.0.alt":
    "ตารางกิจวัตรประจำวันที่เขียนด้วยมือ พร้อมถ้วยวางอยู่บนหน้ากระดาษ",
  "gutExercise.GUT_EXERCISE_MORE.items.1.title": "ลำไส้กับการนอน",
  "gutExercise.GUT_EXERCISE_MORE.items.1.note": "ทั้งสองเดินตามเวลาไปด้วยกันอย่างไร",
  "gutExercise.GUT_EXERCISE_MORE.items.1.alt":
    "เตียงที่ยังไม่ได้เก็บ มีแสงแดดยามเช้าอุ่น ๆ บนผ้าปูสีขาว และต้นไม้สีเขียวอยู่ใกล้ ๆ",
  "gutExercise.GUT_EXERCISE_MORE.items.2.title": "ลำไส้กับอาหาร",
  "gutExercise.GUT_EXERCISE_MORE.items.2.note": "สิ่งที่คุณกิน และสิ่งที่หล่อเลี้ยงมัน",
  "gutExercise.GUT_EXERCISE_MORE.items.2.alt":
    "ภาพมุมสูงของผักและธัญพืชเต็มเมล็ดวางเรียงราย",

  // ------------------------------------------------------- gutRoutine --
  "gutRoutine.GUT_ROUTINE_META.title": "ลำไส้กับกิจวัตร · สุขภาพลำไส้ · Steppe Gut",
  "gutRoutine.GUT_ROUTINE_META.description":
    "ลำไส้เดินตามนาฬิการอบวันอย่างคร่าว ๆ และจะนิ่งขึ้นเมื่อวันรอบ ๆ เป็นไปอย่างสม่ำเสมอ มื้ออาหาร แสง การนอน และอาหารหมักประจำวันมีที่ทางอยู่ตรงไหนในรูปแบบของหนึ่งวัน",

  "gutRoutine.GUT_ROUTINE_INTRO":
    "ลำไส้เดินตามนาฬิการอบวันอย่างคร่าว ๆ ของมันเอง ผูกอยู่อย่างใกล้ชิดกับเวลาที่คุณตื่น เวลาที่คุณกิน และเวลาที่แสงลาลับไป รักษาสิ่งเหล่านั้นให้สม่ำเสมอพอ ๆ กัน แล้วทั้งระบบก็มีเรื่องต้องแก้ไขน้อยลง อาหารหมักประจำวันเป็นเพียงจุดเล็ก ๆ ที่แน่นอนจุดหนึ่งในนั้น ไม่ใช่สิ่งที่คอยยึดทั้งหมดไว้ด้วยกัน",

  "gutRoutine.GUT_ROUTINE_LEAD_ROW.heading": "ร่างกายมีเวลาของมันเอง",
  "gutRoutine.GUT_ROUTINE_LEAD_ROW.alt":
    "ตารางกิจวัตรประจำวันที่เขียนด้วยมือ พร้อมถ้วยวางพักอยู่บนหน้ากระดาษที่เปิดอยู่",

  "gutRoutine.GUT_ROUTINE_WHY.heading": "ทำไมกิจวัตรจึงสำคัญต่อลำไส้",
  "gutRoutine.GUT_ROUTINE_WHY.body":
    "ร่างกายส่วนใหญ่ทำงานตามจังหวะรอบวัน และระบบย่อยอาหารก็เป็นส่วนหนึ่งของสิ่งนั้น ความหิว คลื่นการบีบตัวของกล้ามเนื้อที่เคลื่อนอาหารไปข้างหน้า ส่วนผสมของจุลินทรีย์ในลำไส้ และเยื่อบุผนังที่พวกมันอาศัยอยู่ ล้วนเปลี่ยนแปลงไปตลอดราวยี่สิบสี่ชั่วโมงก่อนจะวนซ้ำอีกครั้งในวันถัดไป",
  "gutRoutine.GUT_ROUTINE_WHY.aside":
    "จังหวะนั้นอ่านสัญญาณจากจังหวะเวลาของมื้ออาหารที่สม่ำเสมอ แสงยามเช้า และช่วงเวลานอนที่คงที่ ซึ่งรักษาไว้ให้สม่ำเสมอวันแล้ววันเล่า วันที่คล้ายกับเมื่อวานจึงให้ลำไส้มีเรื่องต้องปรับตัวน้อยกว่าวันที่ไม่เป็นเช่นนั้น และความสม่ำเสมอนั้นก็คือเกือบทั้งหมดของสิ่งที่กิจวัตรมีไว้เพื่อ",

  "gutRoutine.GUT_ROUTINE_ROWS.0.heading": "ปกป้องยามค่ำ",
  "gutRoutine.GUT_ROUTINE_ROWS.0.alt":
    "โต๊ะข้างเตียงในแสงโคมสลัว พร้อมแก้วน้ำหนึ่งใบ",
  "gutRoutine.GUT_ROUTINE_ROWS.1.heading": "ออกไปข้างนอกวันละครั้ง",
  "gutRoutine.GUT_ROUTINE_ROWS.1.alt":
    "คนกำลังเดินวนอย่างไม่รีบร้อนผ่านสวนสาธารณะเขียวชอุ่มในเมือง",

  "gutRoutine.GUT_ROUTINE_TRAVEL.heading": "กิจวัตรที่เดินทางไปกับคุณได้",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.0.caption": "รักษารูปแบบของหนึ่งวันเอาไว้",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.0.body":
    "ยึดส่วนที่เดินทางไปด้วยได้ง่ายเอาไว้ ออกไปรับแสงกลางวันเมื่อคุณลงถึงที่หมาย กินมื้ออาหารจริงจังมื้อแรกราวเวลาอาหารเช้าหรือกลางวันของท้องถิ่น และตั้งเป้าเข้านอนให้อยู่ในช่วงหนึ่งถึงสองชั่วโมงจากเวลาปกติของคุณ เวลาที่แน่นอนสำคัญน้อยกว่าการรักษาลำดับให้เหมือนเดิม",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.0.alt":
    "นักเดินทางเพียงลำพังบนทางเดินในสนามบินข้างผนังกระจกบานใหญ่",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.1.caption": "กินแบบที่คุณกินอยู่ที่บ้าน",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.1.body":
    "เมื่ออยู่ห่างจากครัวของตัวเอง เป็นเรื่องง่ายที่จะเลื่อนไปกินอาหารวนอยู่ไม่กี่อย่าง วางผักไว้บนจานในมื้อส่วนใหญ่ พกผงติดตัวไปเพื่อให้แก้วยามเช้ายังเกิดขึ้นได้ และถือว่าช่วงที่กินหนักติดต่อกันหลายวันเป็นสิ่งที่ต้องค่อย ๆ ปรับให้เข้าที่ มากกว่าจะเป็นอะไรที่ต้องแก้ให้จบในครั้งเดียว",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.1.alt":
    "โต๊ะที่จัดเรียบง่าย มีจาน แก้วน้ำ และถ้วยอาหารใบเล็ก ๆ",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.2.caption": "ให้น้ำอยู่ใกล้มือเสมอ",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.2.body":
    "การบินและสถานที่ร้อน ๆ ดึงน้ำออกจากตัวคุณเร็วกว่าวันธรรมดาที่บ้าน เติมน้ำใส่ขวดให้เต็มเมื่อผ่านจุดตรวจแล้ว วางไว้บนโต๊ะตลอดทั้งวัน และดื่มสักแก้วพร้อมทุกมื้ออาหาร เพื่อไม่ให้มันกลายเป็นสิ่งที่ต้องคอยนึกถึงในภายหลัง",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.2.alt":
    "ขวดน้ำแบบเติมซ้ำได้บนโต๊ะข้างเตียงในแสงอุ่น",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.3.caption": "ออกไปข้างนอกเมื่อคุณลงถึงที่หมาย",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.3.body":
    "แสงกลางวันเป็นสัญญาณที่แรงที่สุดที่นาฬิการ่างกายมี และเช้าแรกในที่ใหม่คือตอนที่มันสำคัญที่สุด ออกไปเดินสั้น ๆ ในแสงกลางวันแทนที่จะอยู่แต่ในห้อง และตั้งเป้าไปที่ยามเช้าของท้องถิ่นมากกว่าเวลาใดก็ตามที่คุณบังเอิญตื่น",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.3.alt":
    "คนกำลังเดินข้ามถนนร่มไม้อันเงียบสงบในแสงเช้าอ่อน ๆ",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.4.caption": "ยอมให้วันแรก ๆ ยังไม่เข้าที่",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.4.body":
    "สองหรือสามวันแรกหลังการเดินทางไกลมักรู้สึกไม่เข้าจังหวะ และนั่นคือราคาธรรมดาของการย้ายข้ามเขตเวลา ยึดหลักยึดที่คุณทำได้ไว้ ข้ามอันที่ทำไม่ได้ไป และปล่อยให้จังหวะปกติกลับมาด้วยตัวของมันเองแทนที่จะไปฝืนบังคับ",
  "gutRoutine.GUT_ROUTINE_TRAVEL.items.4.alt":
    "กระเป๋าเดินทางแบบมีล้อวางอยู่ข้างเตียงในห้องพักโรงแรมอันเงียบสงบ",

  "gutRoutine.GUT_ROUTINE_MORE.heading": "เพิ่มเติมจากสุขภาพลำไส้",
  "gutRoutine.GUT_ROUTINE_MORE.items.0.title": "ลำไส้กับการนอน",
  "gutRoutine.GUT_ROUTINE_MORE.items.0.note":
    "คืนที่นอนน้อยติดต่อกันเรียกร้องอะไรจากทั้งระบบ",
  "gutRoutine.GUT_ROUTINE_MORE.items.1.title": "ลำไส้กับอาหาร",
  "gutRoutine.GUT_ROUTINE_MORE.items.1.note":
    "อาหารหมักประจำวันมีที่ทางอยู่ตรงไหนในสัปดาห์ปกติของการกิน",
  "gutRoutine.GUT_ROUTINE_MORE.items.2.title": "ลำไส้กับอารมณ์",
  "gutRoutine.GUT_ROUTINE_MORE.items.2.note":
    "ลำไส้กับสมองติดต่อกันอย่างไรตลอดทั้งวัน",

  // ------------------------------------------------------------ mission --
  "mission.MISSION.hero.alt":
    "ทุ่งหญ้ามองโกเลียอันโล่งกว้างในยามแสงแรก มีกระโจมเกอร์และฝูงม้าอยู่ไกลออกไป",
  "mission.MISSION.heading": "พันธกิจของเรา",
  "mission.MISSION.statement":
    "พันธกิจของเราคือการนำหนึ่งในอาหารหมักที่เก่าแก่ที่สุดของโลกออกจากมองโกเลีย โดยไม่เปลี่ยนแปลงสิ่งที่มันเป็น นมม้าหมักเป็นส่วนหนึ่งของชีวิตประจำวันบนทุ่งหญ้าสเตปป์มาแปดร้อยปี ไม่เคยถูกออกแบบขึ้นเป็นผลิตภัณฑ์สุขภาพ แต่เป็นสิ่งที่ผืนดินมอบให้ และเป็นสิ่งที่ผู้คนซึ่งอาศัยอยู่บนนั้นทำกันมาตลอด มันไม่เคยเดินทางไปไหน เพราะนมหมักสดเสียภายในไม่กี่วัน และม้าแม่พันธุ์ให้นมเพียงไม่กี่เดือนต่อปี เราแก้เพียงเท่านั้น และไม่มีอะไรอื่น มันหมักในที่ที่หมักกันมาเสมอ ทำให้แห้งในที่ที่ผลิต และปิดผนึกที่นั่นก่อนออกจากประเทศ",
  "mission.MISSION.timelineHeading": "เรื่องราวของเรา",

  "mission.MISSION.timeline.0.era": "แปดร้อยปีก่อน",
  "mission.MISSION.timeline.0.body":
    "ผู้ขี่ม้าข้ามทุ่งสเตปป์ไปพร้อมฝูงม้าแม่พันธุ์ น้ำนมถูกหมักไปตามที่ขบวนเคลื่อน และทำขึ้นสดใหม่ทุกที่ที่หยุดพักตั้งค่าย",
  "mission.MISSION.timeline.0.alt": "ฝูงม้าเคลื่อนไปด้วยกันข้ามทุ่งหญ้าโล่ง",

  "mission.MISSION.timeline.1.era": "ทุกฤดูกาลนับแต่นั้น",
  "mission.MISSION.timeline.1.body":
    "ครอบครัวคนเลี้ยงสัตว์เก็บรักษาเชื้อจุลินทรีย์มีชีวิตของตนเอง แต่ละเชื้อสืบทอดจากฤดูร้อนหนึ่งสู่ฤดูร้อนถัดไปโดยไม่ขาดตอน",
  "mission.MISSION.timeline.1.alt":
    "กระโจมเกอร์ของครอบครัวคนเลี้ยงสัตว์ตั้งอยู่โดดเดี่ยวกลางทุ่งหญ้าโล่ง",

  "mission.MISSION.timeline.2.era": "จังหวัดตูฟ วันนี้",
  "mission.MISSION.timeline.2.body":
    "Steppe Gut ก่อตั้งขึ้น น้ำนมรับซื้อจากครอบครัวที่หมักมันอยู่แล้ว ในราคาที่ตกลงกันก่อนแต่ละฤดูกาลจะเริ่ม",
  "mission.MISSION.timeline.2.alt":
    "คนเลี้ยงสัตว์ยืนอยู่บนทุ่งสเตปป์อันโล่งกว้างในเวลากลางวัน",

  "mission.MISSION.timeline.3.era": "ปัจจุบัน",
  "mission.MISSION.timeline.3.body":
    "ทำให้แห้งและปิดผนึกในที่ที่ผลิต อาหารหมักมาถึงคุณในรูปผงที่คงตัว ไม่เคยถูกเพาะเชื้อซ้ำระหว่างทาง",
  "mission.MISSION.timeline.3.alt": "ช้อนตักผงแห้งสีจางขึ้นจากกองที่ใหญ่กว่า",

  "mission.MISSION.todayHeading": "ข้ามเวลามาถึงวันนี้",

  "mission.MISSION.chapters.0.heading": "สิ่งที่ผืนดินหล่อเลี้ยงได้",
  "mission.MISSION.chapters.0.alt":
    "ทุ่งหญ้าสเตปป์กว้างใหญ่ใต้ท้องฟ้าโปร่งในยามแสงทอง",

  "mission.MISSION.chapters.1.heading": "สัตว์ที่ทุกสิ่งต้องพึ่งพา",
  "mission.MISSION.chapters.1.alt": "ม้าแม่พันธุ์พักผ่อนกลางทุ่งหญ้าโล่งในยามแสงทอง",

  "mission.MISSION.chapters.2.alt": "คนเลี้ยงสัตว์อยู่ข้างม้าของตนกลางทุ่งหญ้าโล่ง",

  "mission.MISSION.chapters.3.heading": "ความอดทนและเชื้อจุลินทรีย์มีชีวิต",
  "mission.MISSION.chapters.3.alt": "ภาชนะหมักไม้แบบดั้งเดิมภายในกระโจมเกอร์",

  "mission.MISSION.chapters.4.heading": "สืบทอดต่อมา ไม่ใช่คิดขึ้นใหม่",
  "mission.MISSION.chapters.4.alt":
    "ฝูงม้าเล็มหญ้าข้ามทุ่งหญ้ามองโกเลียอันโล่งกว้างเบื้องล่างเนินเขาที่มีหิมะโปรยปราย",
};
