import type { RichLesson } from "@/types/curriculum";

export const javascriptFoundationLessons: Record<string, RichLesson> = {
  "js-functions": {
    hook: "ทริปกับเพื่อนครั้งนี้มีทั้งค่าที่พัก ค่าอาหาร และค่ารถ ทุกครั้งที่มีบิลใหม่ ซีต้องหารเงินเอง ปัดเศษเอง และบางครั้งก็หารผิด ถ้าเขียนสูตร “หารบิล” ครั้งเดียวแล้วเรียกใช้ซ้ำได้ทุกบิล งานซ้ำ ๆ จะหายไปและผลลัพธ์จะเหมือนกันทุกครั้ง นี่คือสิ่งที่ function ทำ",
    analogy: {
      title: "function เหมือนเครื่องชงกาแฟที่ตั้งสูตรไว้แล้ว",
      text: [
        "เครื่องชงกาแฟในร้านมีช่องให้ใส่ของ (เมล็ด น้ำ ขนาดแก้ว) มีขั้นตอนข้างในที่เราไม่ต้องทำเอง และส่งแก้วกาแฟออกมาให้เราถือไปใช้ต่อ",
        "ตอนสร้างเครื่องคือการ “ตั้งสูตร” เครื่องยังไม่ชงอะไร จนกว่าจะมีคนกดปุ่มสั่ง เช่นเดียวกับการเขียน function ที่ยังไม่ทำงานจนกว่าจะถูกเรียก",
      ],
      mapping: [
        ["ตั้งสูตรของเครื่องครั้งเดียว", "ประกาศ function ด้วย function splitCost(total, people) { ... }"],
        ["ช่องรับเมล็ดและขนาดแก้ว", "parameters: total และ people"],
        ["ของจริงที่ใส่ลงไปในรอบนี้", "arguments: 1250 และ 4 ตอนเรียก splitCost(1250, 4)"],
        ["กดปุ่มสั่งชง", "เรียก (call) function"],
        ["แก้วกาแฟที่ยื่นออกมาให้ถือ", "ค่าที่ return กลับไปให้โค้ดที่เรียก"],
      ],
      limits: "เครื่องจริงมีสถานะ เช่น เมล็ดหมดหรือเครื่องร้อน แต่ function ที่ดีในบทนี้ไม่จำอะไรระหว่างการเรียก ใส่ input เดิมต้องได้ output เดิมทุกครั้ง และ function ส่งค่ากลับได้ครั้งเดียว เมื่อ return แล้วจะหยุดทันที ส่วน console.log เปรียบเหมือนเครื่องประกาศออกลำโพงว่า “กาแฟเสร็จแล้ว” — ได้ยิน แต่ไม่มีแก้วให้ถือไปใช้ต่อ",
    },
    explain: [
      {
        heading: "1) ประกาศ function ยังไม่ใช่การทำงาน",
        text: [
          "บรรทัด function splitCost(total, people) { ... } คือการบอก JavaScript ว่า “มีสูตรชื่อ splitCost นะ” โค้ดใน { } ยังไม่ถูกรันในตอนนั้น",
          "function ทำงานเมื่อถูกเรียกด้วยชื่อตามด้วยวงเล็บ เช่น splitCost(900, 3) เรียกกี่ครั้งก็ทำงานกี่ครั้ง",
        ],
        code: "function greet(name) {\n  return \"สวัสดี \" + name;\n}\n\nconsole.log(\"ยังไม่มีใครเรียก greet\");\nconsole.log(greet(\"ซี\"));",
        output: "ยังไม่มีใครเรียก greet\nสวัสดี ซี",
      },
      {
        heading: "2) parameter คือช่องรับ argument คือของที่ใส่จริง",
        text: [
          "total และ people ในวงเล็บตอนประกาศคือ parameter (ตัวแปรที่รอรับค่า) ส่วน 1250 และ 4 ตอนเรียกคือ argument (ค่าจริงในรอบนั้น)",
          "JavaScript จับคู่ตามตำแหน่ง: argument ตัวแรกไปอยู่ใน parameter ตัวแรก ถ้าสลับลำดับ ผลก็สลับตาม และถ้าส่ง argument ไม่ครบ parameter ที่ขาดจะเป็น undefined",
        ],
      },
      {
        heading: "3) return ส่งค่ากลับ console.log แค่แสดง",
        text: [
          "return ทำสองอย่าง: ส่งค่ากลับไปแทนที่ตรงจุดที่เรียก และจบการทำงานของ function ทันที โค้ดหลัง return ใน block เดียวกันจะไม่ถูกรัน",
          "console.log แค่พิมพ์ค่าให้คนเห็นใน Terminal แต่ไม่ได้ส่งค่าให้โค้ด ถ้า function ไม่มี return ผลของการเรียกคือ undefined เสมอ",
        ],
        code: "function shout(word) {\n  console.log(word.toUpperCase());\n}\n\nfunction toUpper(word) {\n  return word.toUpperCase();\n}\n\nconst a = shout(\"hi\");\nconst b = toUpper(\"hi\");\nconsole.log(a, b);",
        output: "HI\nundefined HI",
      },
      {
        heading: "4) pure function: input เดิม → output เดิม ไม่แตะของข้างนอก",
        text: [
          "pure function คำนวณจาก parameter เท่านั้น ไม่เปลี่ยนตัวแปรนอก function ไม่พิมพ์ ไม่บันทึกไฟล์ ไม่ส่ง request สิ่งเหล่านี้เรียกว่า side effect",
          "ข้อดีคือทดสอบง่าย: เรียกด้วย input แล้วเทียบ output ก็พอ ไม่ต้องเตรียมหน้าจอหรือฐานข้อมูล การคำนวณราคา การตรวจฟอร์ม และการจัดรูปแบบข้อความในเว็บจริงจึงมักเขียนเป็น pure function แล้วค่อยให้ส่วนอื่นนำผลไปแสดงหรือบันทึก",
        ],
      },
    ],
    walkthrough: [
      "JavaScript อ่านการประกาศ splitCost ไว้ก่อน แต่ยังไม่รันเนื้อใน",
      "เจอ splitCost(1250, 4): ใส่ 1250 ลง total และ 4 ลง people แล้วเข้าไปรันใน function",
      "share = 1250 / 4 ได้ 312.5 แล้ว Math.ceil(312.5) ปัดขึ้นเป็น 313 return 313 จึงกลับมาแทนที่การเรียก ทำให้ perPerson = 313",
      "console.log(perPerson) พิมพ์ 313 ต่อมา console.log(splitCost(900, 3)) เรียก function ใหม่อีกรอบ ได้ 300 แล้วพิมพ์",
      "บรรทัดสุดท้าย splitCost(100, 3) ได้ Math.ceil(33.33…) = 34 แล้วนำไปคูณ 3 ได้ 102 — ค่าที่ return ใช้ต่อในนิพจน์ได้เหมือนตัวเลขทั่วไป",
    ],
    pitfalls: [
      "ใช้ console.log แทน return: เห็นตัวเลขใน Terminal แต่ตัวแปรที่รับผลกลายเป็น undefined เพราะ function ไม่ได้ส่งค่ากลับ แก้โดย return ค่าที่คำนวณได้ แล้วให้ผู้เรียกเป็นคน log",
      "ประกาศแล้วลืมเรียก: เขียน function ไว้แต่ไม่มีอะไรเกิดขึ้น เพราะยังไม่มีบรรทัดที่เรียกชื่อพร้อมวงเล็บ ตรวจว่ามี splitCost(...) จริง",
      "เขียนโค้ดต่อหลัง return แล้วคิดว่าจะทำงาน: return จบ function ทันที ให้ย้ายงานที่ต้องทำไว้ก่อน return",
      "สลับลำดับ argument: splitCost(4, 1250) ได้ 1 ไม่ใช่ 313 เพราะจับคู่ตามตำแหน่ง ตั้งชื่อ parameter ให้สื่อความหมายและอ่านลำดับก่อนเรียก",
    ],
    checks: [
      { question: "ใน splitCost(900, 3) อะไรคือ parameter และอะไรคือ argument", answer: "total และ people เป็น parameter (ประกาศไว้ใน function) ส่วน 900 และ 3 เป็น argument (ค่าที่ส่งเข้าไปในการเรียกครั้งนี้)" },
      { question: "function ที่ไม่มี return เมื่อถูกเรียกจะได้ค่าอะไรกลับมา", answer: "undefined เสมอ ต่อให้ข้างในจะ console.log อะไรออกมาก็ตาม" },
      { question: "ทำไม function คำนวณราคาที่ไม่มี side effect จึงทดสอบง่ายกว่า function ที่แก้ตัวแปรข้างนอกและพิมพ์ผลเอง", answer: "เพราะใส่ input แล้วตรวจ output ได้ตรง ๆ ผลไม่ขึ้นกับสถานะข้างนอกหรือลำดับการเรียกก่อนหน้า" },
    ],
    recap: [
      "ประกาศ = ตั้งสูตร / เรียก = สั่งให้ทำงาน",
      "parameter รอรับค่า argument คือค่าจริง จับคู่ตามตำแหน่ง",
      "return ส่งค่ากลับและจบ function ทันที ไม่มี return = ได้ undefined",
      "pure function คำนวณจาก input อย่างเดียว ทดสอบง่าย นำไปใช้ซ้ำได้",
    ],
    traceHint: "ทำตารางสามคอลัมน์: บรรทัดที่กำลังรัน · ค่าของ total/people/share ใน function · ค่าที่ถูก return เมื่อ function จบให้ลบค่าข้างในทิ้งแล้วเขียนเฉพาะค่าที่กลับไปที่จุดเรียก",
    practiceHints: [
      "แยกงานเป็นสามขั้น: ตรวจ input ที่เป็นไปไม่ได้ก่อน → คำนวณยอดรวมรวมทิป → หารแล้วปัดขึ้น",
      "ใช้ if (people <= 0) return null; เป็นบรรทัดแรก จากนั้นคำนวณ tip = total * tipPercent / 100 แล้ว grandTotal = total + tip",
      "บรรทัดสุดท้ายคือ return Math.ceil(grandTotal / people); — ตรวจว่าไม่มี console.log แทน return และคำนวณทิปแบบ total * tipPercent / 100 ไม่ใช่ total * 1.1 (100 * 1.1 ได้ 110.00000000000001 แล้วปัดขึ้นผิด)",
    ],
    acceptance: [
      "costPerPerson(1000, 4, 0) ได้ 250 และ costPerPerson(1000, 4, 10) ได้ 275",
      "ปัดขึ้นเสมอ: costPerPerson(100, 3, 0) ได้ 34",
      "จำนวนคน 0 หรือติดลบคืน null แทนการหารด้วยศูนย์",
      "function ต้อง return ตัวเลข ไม่ใช่ console.log (tests ตรวจข้อนี้)",
      "ตรวจเอง: ไม่แก้ตัวแปรนอก function และไม่พิมพ์ผลเอง — tests ตรวจได้เฉพาะค่าที่ return จึงยืนยันความ pure ไม่ได้",
    ],
    solutionNotes: [
      "ตรวจ people <= 0 ก่อน เพราะการหารด้วย 0 ใน JavaScript ไม่ error: บิลที่มากกว่า 0 หาร 0 ได้ Infinity (0 / 0 ได้ NaN) ผลจึงผิดแบบเงียบ ๆ",
      "คำนวณทิปเป็น total * tipPercent / 100 ทำให้ 100 กับ 10% ได้ 10 พอดี ส่วน 100 * 1.1 ได้ 110.00000000000001 เพราะ 1.1 เก็บเป็นเลขฐานสองได้ไม่ตรงเป๊ะ เมื่อหาร 2 แล้ว Math.ceil จึงได้ 56 แทน 55",
      "Math.ceil ปัดขึ้นให้คนจ่ายไม่ขาด ถ้าต้องการปัดใกล้สุดใช้ Math.round ได้ แต่ต้องตกลงกติกากับเพื่อนก่อน",
      "ทางเลือก: คืน { perPerson, grandTotal } เป็น object ถ้าหน้าจอต้องแสดงทั้งสองค่า — ยังเป็น pure function เหมือนเดิม",
    ],
    reflection: [
      "อธิบายด้วยคำของตัวเองว่าทำไม costPerPerson ไม่ควร console.log ผลเอง",
      "ถ้าวันหนึ่งต้องเปลี่ยนกติกาเป็น “ปัดลงแล้วเจ้าภาพจ่ายส่วนต่าง” ต้องแก้ตรงไหนบ้าง และผู้เรียก function ต้องเปลี่ยนไหม",
    ],
    extension: "เขียน formatShare(amount) ที่รับตัวเลขแล้วคืนข้อความ “คนละ 275 บาท” จากนั้นประกอบสอง function: formatShare(costPerPerson(1000, 4, 10)) — สังเกตว่า function ที่ return ค่าต่อกันเป็นสายได้",
  },
};
