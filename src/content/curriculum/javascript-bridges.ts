import type { TopicSource } from "@/types/curriculum";

export const javascriptBridgeTopics: TopicSource[] = [
  {
    "id": "js-function-basics",
    "courseId": "javascript-foundations",
    "unit": "สะพานทักษะพื้นฐาน",
    "title": "function: ประกาศ เรียก และคืนค่า",
    "prerequisites": [
      "js-conditions",
      "js-strings"
    ],
    "language": "javascript",
    "standard": "v3",
    "objective": "ประกาศ function เล็ก รับ parameter หนึ่งตัว คืนค่าที่ผู้เรียกนำไปใช้ต่อได้",
    "why": "คำสั่งซ้ำหลายจุดแก้ไม่พร้อมกันได้ง่าย การตั้งชื่อให้ชุดคำสั่งทำให้ทดสอบแต่ละงานได้",
    "explanation": "function ตามด้วยชื่อ () และ { } คือการประกาศชุดคำสั่ง ข้างในยังไม่ทำงาน ชื่อ() คือการเรียก ทำข้างในแล้วกลับมาบรรทัดถัดไป",
    "example": "function label(name) {\n  return \"สวัสดี \" + name;\n}\nconst message = label(\"ดาว\");\nconsole.log(message);\nconsole.log(label(\"เมฆ\"));",
    "expectedOutput": "สวัสดี ดาว\nสวัสดี เมฆ",
    "tracePrompt": "ถ้าเพิ่ม console.log(label(\"ฟ้า\") + \"!\"); เป็นบรรทัดสุดท้าย ทั้งไฟล์พิมพ์อะไรบ้าง และ function label ทำงานทั้งหมดกี่ครั้ง? ในการเรียกครั้งใหม่ name มีค่าอะไร",
    "traceAnswer": "พิมพ์ สวัสดี ดาว / สวัสดี เมฆ / สวัสดี ฟ้า! — label ทำงาน 3 ครั้ง (บรรทัดประกาศไม่นับ) ครั้งใหม่ name เป็น ฟ้า แล้วคืน สวัสดี ฟ้า ค่าที่คืนมาแทนที่จุดเรียก ผู้เรียกจึงต่อ ! เองได้ โดยไม่ต้องแก้ function",
    "practicePrompt": "เติมเฉพาะส่วนที่หายให้ stamp(text) คืนข้อความ รับแล้ว: ตามด้วย text โดยยังไม่ log ใน function",
    "starter": "function stamp(text) {\n  // เติมการคืนค่า\n}\nconsole.log(stamp(\"ใบสมัคร\"));",
    "solution": "function stamp(text) {\n  return \"รับแล้ว: \" + text;\n}\nconsole.log(stamp(\"ใบสมัคร\"));",
    "buggy": "function double(value) {\n  console.log(value * 2);\n}\nconst result = double(4);\nconsole.log(result + 1);",
    "bugExplanation": "คาด 9 แต่ actual เป็น 8 แล้ว NaN: double แสดง 8 แต่ไม่มี return จึงคืน undefined; undefined + 1 เป็น NaN เปลี่ยน console.log ใน function เป็น return value * 2; แล้วรันซ้ำ จะเห็นเพียง 9",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: ทำ function ที่รับอุณหภูมิ Celsius แล้วคืน Fahrenheit ตามกฎ C × 9 / 5 + 32 เลือกชื่อเอง ให้ผู้เรียกแสดงผลของ 0, 100 และ -40 จากนั้นผู้เรียกนำค่าที่คืนจาก 100 องศาไปบวก 1 อีกหนึ่งครั้งแล้วแสดงผล อธิบายว่า function รับและคืนค่าอะไร",
      "rubric": [
        "แสดง 32, 212, -40 ตามลำดับ",
        "ผู้เรียกนำค่าที่คืนจาก 100 องศาไปบวก 1 ได้ 213 (พิสูจน์ว่า function คืนค่า ไม่ได้แค่พิมพ์)",
        "อธิบาย parameter กับ argument ได้ และใน function ใช้ return ไม่ใช้ console.log แทน"
      ],
      "modelAnswer": "function toFahrenheit(celsius) {\n  return celsius * 9 / 5 + 32;\n}\n\nconsole.log(toFahrenheit(0));\nconsole.log(toFahrenheit(100));\nconsole.log(toFahrenheit(-40));\n\nconst warmer = toFahrenheit(100) + 1;\nconsole.log(warmer);\n\nผลจริง: 32 / 212 / -40 / 213\ncelsius เป็น parameter ส่วน 0, 100, -40 เป็น argument ของการเรียกแต่ละครั้ง บรรทัด warmer ได้ 213 เพราะค่าที่ return มาแทนที่ toFahrenheit(100) แล้วผู้เรียกบวก 1 ต่อเอง ถ้า function ใช้ console.log แทน return ค่าที่ได้จะเป็น undefined และ undefined + 1 เป็น NaN ตั้งชื่ออื่นหรือเขียนสูตรเป็น celsius * 1.8 + 32 ก็ถูก"
    },
    "lesson": {
      "hook": "คำสั่งซ้ำหลายจุดแก้ไม่พร้อมกันได้ง่าย การตั้งชื่อให้ชุดคำสั่งทำให้ทดสอบแต่ละงานได้",
      "explain": [
        {
          "heading": "เริ่มจากไม่มี input",
          "text": [
            "function ตามด้วยชื่อ () และ { } คือการประกาศชุดคำสั่ง ข้างในยังไม่ทำงาน ชื่อ() คือการเรียก ทำข้างในแล้วกลับมาบรรทัดถัดไป"
          ],
          "code": "function greet() {\n  console.log(\"สวัสดี\");\n}\nconsole.log(\"เริ่ม\");\ngreet();",
          "output": "เริ่ม\nสวัสดี"
        },
        {
          "heading": "รับหนึ่งค่าแล้วส่งผลกลับ",
          "text": [
            "parameter คือชื่อในวงเล็บตอนประกาศ argument คือค่าจริงที่ส่งตอนเรียก จับคู่ตามตำแหน่ง return ส่งค่าไปแทนที่จุดเรียกแล้วจบ function; console.log แค่แสดง ถ้าไม่ return การเรียกได้ undefined",
            "เริ่มเติมส่วนเดียวในกิจกรรมนี้ จากนั้นทำโจทย์จากไฟล์ว่างใน checkpoint ก่อนบท js-functions ซึ่งจะประกอบหลาย parameters กับเงื่อนไข"
          ]
        }
      ],
      "walkthrough": [
        "บรรทัด 1–3 ประกาศ label ไว้เฉย ๆ ยังไม่มีอะไรแสดง",
        "label(\"ดาว\") ส่ง ดาว เข้า parameter name แล้ว return ข้อความ สวัสดี ดาว กลับมาแทนที่จุดเรียก ค่านี้ถูกเก็บใน message",
        "console.log(message) แสดง สวัสดี ดาว — message เก็บข้อความที่ได้ ไม่ได้เก็บตัว function",
        "label(\"เมฆ\") เรียกอีกครั้ง รอบนี้ name เป็น เมฆ ค่าที่คืนส่งให้ console.log แสดงทันทีโดยไม่ต้องมีชื่อเก็บ"
      ],
      "pitfalls": [
        "ลืมวงเล็บตอนเรียก เช่น console.log(label) จะได้ตัว function (Node แสดงเป็น [Function: label]) ไม่ใช่ข้อความ ต้องเขียน label(\"ดาว\")",
        "เขียนคำสั่งไว้หลัง return ใน function เดียวกันแล้วคิดว่าจะทำงาน: return จบ function ทันที คำสั่งที่อยู่ถัดไปจึงไม่ถูกทำในการเรียกนั้น",
        "สลับลำดับ argument กับ parameter: ค่าที่ส่งตอนเรียกจับคู่กับชื่อในวงเล็บตามตำแหน่ง ไม่ได้จับคู่ตามชื่อตัวแปรที่ผู้เรียกใช้"
      ],
      "checks": [
        {
          "question": "ถ้าประกาศ greet แต่ไม่เขียน greet() จะพิมพ์อะไร?",
          "answer": "ไม่พิมพ์ เพราะยังไม่ได้เรียก"
        },
        {
          "question": "return จบแล้วคำสั่งที่อยู่ถัดไปใน function จะทำไหม?",
          "answer": "ไม่ทำในการเรียกนั้น"
        }
      ],
      "recap": [
        "ประกาศ function เล็ก รับ parameter หนึ่งตัว คืนค่าที่ผู้เรียกนำไปใช้ต่อได้"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "ผู้เรียกต้องได้ข้อความกลับไปใช้ ไม่ใช่เห็นแค่บนหน้าจอ",
        "ประกอบข้อความแล้วใช้ return",
        "return \"รับแล้ว: \" + text;"
      ],
      "acceptance": [
        "stamp คืนข้อความ รับแล้ว: ใบสมัคร เมื่อรับ ใบสมัคร",
        "เปลี่ยน text เป็นข้อมูลอื่นต้องเปลี่ยนตาม ไม่ log แทน return"
      ],
      "solutionNotes": [
        "ใช้ return เพราะผู้เรียกเป็นผู้ตัดสินใจแสดงผล",
        "ประกอบด้วย template literal ก็ได้หลังเรียน js-strings"
      ],
      "reflection": [
        "ถ้าเปลี่ยนข้อมูลตั้งต้น วิธีเดิมยังถูกหรือไม่? ทดลองหนึ่งกรณีและอธิบายจากโค้ด ไม่ตอบเพียงว่าผ่าน"
      ]
    },
    "autoCheck": {
      "functionName": "stamp",
      "tests": [
        {
          "name": "ใบสมัคร",
          "args": [
            "ใบสมัคร"
          ],
          "expected": "รับแล้ว: ใบสมัคร"
        },
        {
          "name": "ข้อความว่าง",
          "args": [
            ""
          ],
          "expected": "รับแล้ว: "
        }
      ],
      "wrongAnswers": [
        "function stamp(text) { console.log(\"รับแล้ว: \" + text); }",
        "function stamp(text) { return \"รับแล้ว: ใบสมัคร\"; }"
      ]
    }
  },
  {
    "id": "js-loop-basics",
    "courseId": "javascript-foundations",
    "unit": "สะพานทักษะพื้นฐาน",
    "title": "for: นับรอบและขอบเขต",
    "prerequisites": [
      "js-conditions",
      "js-variables"
    ],
    "language": "javascript",
    "standard": "v3",
    "objective": "ไล่เริ่มค่า ตรวจเงื่อนไข ทำงาน และเพิ่มค่าใน for พร้อมตรวจกรณีศูนย์รอบ",
    "why": "ก่อนรวมรายการ ต้องรู้ว่าลูปทำกี่ครั้งและค่าของตัวนับมาจากไหน",
    "explanation": "for (let i = 1; i <= 3; i = i + 1) { ... } มีสามช่องคั่นด้วย ; ช่องแรกทำครั้งเดียว ช่องกลางตรวจก่อนทุกรอบ ถ้าเท็จออกทันที ช่องท้ายทำหลังจบรอบแล้วกลับไปตรวจ ช่อง i = i + 1 เพิ่มหนึ่ง; i++ เป็นรูปย่อเพิ่มหนึ่ง แต่ในบทนี้เขียนเต็มให้ไล่ค่าได้",
    "example": "for (let i = 1; i <= 3; i = i + 1) {\n  console.log(i);\n}\nconsole.log(\"จบ\");",
    "expectedOutput": "1\n2\n3\nจบ",
    "tracePrompt": "ถ้าเปลี่ยนช่องกลางเป็น i <= 0 จะพิมพ์อะไร? แล้วถ้าใช้เงื่อนไขเดิม (i <= 3) แต่เปลี่ยนช่องท้ายเป็น i = i + 2 จะพิมพ์อะไร? เขียนค่า i ทุกครั้งที่ถูกตรวจ",
    "traceAnswer": "i <= 0: ตรวจ i = 1 เป็นเท็จตั้งแต่ครั้งแรก ไม่เข้าลูปเลย พิมพ์แค่ จบ · i = i + 2: ตรวจ 1 จริง พิมพ์ 1 แล้ว i เป็น 3 · ตรวจ 3 จริง พิมพ์ 3 แล้ว i เป็น 5 · ตรวจ 5 เท็จ ออกจากลูป แล้วพิมพ์ จบ",
    "practicePrompt": "เติมเงื่อนไขและขั้นเพิ่มใน starter ให้พิมพ์ ชั้น 2, ชั้น 3, ชั้น 4 ทีละบรรทัด แล้วกด Run tests (ตรวจเฉพาะ start = 2, end = 4 ตามโจทย์) เมื่อผ่านแล้ว ทดลองเองต่อ: เปลี่ยน start เป็น 5 แล้วกด Run ควรไม่มีบรรทัดชั้นเลย — กรณีนี้ Run tests จะไม่ผ่านเพราะตรวจเฉพาะค่าตั้งต้น จึงเปลี่ยนกลับเป็น 2 ก่อนกด Run tests อีกครั้ง",
    "starter": "const start = 2;\nconst end = 4;\nfor (let floor = start; false; floor = floor) {\n  console.log(\"ชั้น \" + floor);\n}",
    "solution": "const start = 2;\nconst end = 4;\nfor (let floor = start; floor <= end; floor = floor + 1) {\n  console.log(\"ชั้น \" + floor);\n}",
    "buggy": "for (let i = 1; i < 3; i = i + 1) {\n  console.log(i);\n}",
    "bugExplanation": "คาด 1, 2, 3 แต่ได้ 1, 2 เพราะ < ไม่รวม 3 แก้เป็น <= แล้วตรวจอีกกรณีเมื่อปลายเป็น 1 ควรมีเพียง 1 บรรทัด",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: เก็บจำนวนวินาทีไว้ในตัวแปร แล้วแสดงหมายเลขนับถอยหลังจากจำนวนนั้นถึง 1 ทีละบรรทัด ตามด้วยคำว่า พร้อม ทดลองเริ่มจาก 5, 0 และ 1 โดยเปลี่ยนแค่ค่าในตัวแปร ห้ามพิมพ์หมายเลขคงที่ อธิบายว่าลูปหยุดเพราะอะไร",
      "rubric": [
        "5 ให้ 5, 4, 3, 2, 1, พร้อม",
        "0 ให้ พร้อม อย่างเดียว และ 1 ให้ 1, พร้อม",
        "เปลี่ยนค่าเริ่มได้โดยไม่แก้ส่วนอื่น และอธิบายว่าตัวนับลดลงจนเงื่อนไขเป็นเท็จ"
      ],
      "modelAnswer": "const seconds = 5;\nfor (let left = seconds; left >= 1; left = left - 1) {\n  console.log(left);\n}\nconsole.log(\"พร้อม\");\n\nผลจริงเมื่อ seconds = 5: 5 / 4 / 3 / 2 / 1 / พร้อม\nเมื่อ seconds = 0 เงื่อนไข 0 >= 1 เป็นเท็จตั้งแต่ครั้งแรก จึงเห็นแค่ พร้อม เมื่อ seconds = 1 ทำหนึ่งรอบแล้ว left เป็น 0 จึงหยุด ลูปหยุดได้เพราะช่องท้ายลด left ทีละ 1 จนเงื่อนไขเป็นเท็จ ใช้ while หลังเรียนบท js-loop-control ก็ถูก"
    },
    "lesson": {
      "hook": "ก่อนรวมรายการ ต้องรู้ว่าลูปทำกี่ครั้งและค่าของตัวนับมาจากไหน",
      "explain": [
        {
          "heading": "กลไกหนึ่งรอบ",
          "text": [
            "for (let i = 1; i <= 3; i = i + 1) { ... } มีสามช่องคั่นด้วย ; ช่องแรกทำครั้งเดียว ช่องกลางตรวจก่อนทุกรอบ ถ้าเท็จออกทันที ช่องท้ายทำหลังจบรอบแล้วกลับไปตรวจ ช่อง i = i + 1 เพิ่มหนึ่ง; i++ เป็นรูปย่อเพิ่มหนึ่ง แต่ในบทนี้เขียนเต็มให้ไล่ค่าได้",
            "ต่างจาก if ที่ทำครั้งเดียวเมื่อจริง for กลับมาทดสอบซ้ำ ต้องมีการเปลี่ยนค่าที่พาไปสู่การหยุด"
          ]
        },
        {
          "heading": "ตรวจขอบก่อนรัน",
          "text": [
            "เงื่อนไข < 3 ทำที่ 1 และ 2 ส่วน <= 3 ทำที่ 1, 2, 3 ถ้าค่าเริ่มไม่ผ่านเงื่อนไขจะไม่ทำแม้แต่รอบเดียว อย่าทดลองลูปที่ไม่มีทางหยุดใน terminal; ใช้ Ctrl+C หากค้าง"
          ]
        }
      ],
      "walkthrough": [
        "ช่องแรก let i = 1 ทำครั้งเดียวก่อนเริ่มรอบแรก",
        "ตรวจ 1 <= 3 จริง จึงพิมพ์ 1 แล้วช่องท้ายเพิ่ม i เป็น 2",
        "ทำแบบเดียวกันกับ 2 และ 3: ตรวจก่อน พิมพ์ แล้วเพิ่ม",
        "เมื่อ i เป็น 4 ตรวจ 4 <= 3 เป็นเท็จ ออกจากลูป แล้วบรรทัดถัดไปพิมพ์ จบ"
      ],
      "pitfalls": [
        "ลืมช่องท้ายหรือเปลี่ยนค่าผิดทิศ เช่น i = i - 1 ทั้งที่เงื่อนไขรอให้ i ใหญ่ขึ้น ลูปจะไม่มีทางหยุด ถ้าค้างใน terminal กด Ctrl+C",
        "วาง console.log(\"จบ\") ไว้ใน { } ของลูป ทำให้พิมพ์ จบ ทุกรอบ ตรวจว่าคำสั่งอยู่ในหรือนอก block",
        "ใช้ , แทน ; คั่นสามช่องใน for ( ) จะเกิด SyntaxError ต้องคั่นด้วย ; สองตัว"
      ],
      "checks": [
        {
          "question": "เงื่อนไขตรวจหลังหรือก่อนทำรอบ?",
          "answer": "ก่อน จึงเป็นศูนย์รอบได้"
        },
        {
          "question": "i=1 และ i<=1 ทำกี่รอบ?",
          "answer": "หนึ่งรอบ หลังเพิ่มเป็น 2 เงื่อนไขเป็นเท็จ"
        }
      ],
      "recap": [
        "ไล่เริ่มค่า ตรวจเงื่อนไข ทำงาน และเพิ่มค่าใน for พร้อมตรวจกรณีศูนย์รอบ"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "ช่วงรวมทั้ง start และ end",
        "ตรวจ floor <= end และเพิ่มทีละหนึ่งหลังทำรอบ",
        "for (let floor = start; floor <= end; floor = floor + 1)"
      ],
      "acceptance": [
        "Run tests: พิมพ์ ชั้น 2 / ชั้น 3 / ชั้น 4 (ตรวจเฉพาะ start = 2, end = 4)",
        "ตรวจเอง: start = 5, end = 4 ไม่มี output และลูปต้องหยุด — Run tests ไม่ได้ตรวจกรณีนี้"
      ],
      "solutionNotes": [
        "ไม่พิมพ์สามบรรทัดคงที่ เพราะเปลี่ยนขอบแล้วต้องทำงานตามขอบ",
        "ใช้ floor++ ได้แต่ต้องอธิบายว่าขั้นนี้เพิ่มค่าหนึ่งหลังแต่ละรอบ"
      ],
      "reflection": [
        "ถ้าเปลี่ยนข้อมูลตั้งต้น วิธีเดิมยังถูกหรือไม่? ทดลองหนึ่งกรณีและอธิบายจากโค้ด ไม่ตอบเพียงว่าผ่าน"
      ]
    },
    "outputCheck": {
      "expected": "ชั้น 2\nชั้น 3\nชั้น 4",
      "wrongAnswers": [
        "for (let floor = 2; floor < 4; floor = floor + 1) { console.log(\"ชั้น \" + floor); }"
      ]
    }
  },
  {
    "id": "js-accumulator",
    "courseId": "javascript-foundations",
    "unit": "สะพานทักษะพื้นฐาน",
    "title": "สะสมผลจากลูปทีละรอบ",
    "prerequisites": [
      "js-loop-basics",
      "js-function-basics"
    ],
    "language": "javascript",
    "standard": "v3",
    "objective": "แยกตัวนับรอบกับยอดสะสม เลือกค่าเริ่มและอธิบายผลหลังแต่ละรอบ",
    "why": "การพิมพ์ค่าทุกรอบยังไม่ใช่การรวมค่า ต้องมีชื่อที่จำผลจากรอบก่อน",
    "explanation": "accumulator คือตัวแปรเก็บผลที่สะสม ประกาศก่อนลูป let sum = 0; เพราะผลรวมเริ่มที่ศูนย์ sum = sum + i อ่าน sum เดิมบวกค่ารอบนี้ แล้วเก็บใหม่ ถ้าประกาศ sum ข้างในจะเริ่มใหม่ทุกครั้ง ไม่จำรอบก่อน",
    "example": "let sum = 0;\nfor (let i = 1; i <= 3; i = i + 1) {\n  sum = sum + i;\n  console.log(i, sum);\n}\nconsole.log(\"รวม\", sum);",
    "expectedOutput": "1 1\n2 3\n3 6\nรวม 6",
    "tracePrompt": "ถ้าเปลี่ยนเงื่อนไขเป็น i <= 4 และเปลี่ยน sum = sum + i เป็น sum = sum + 2 จะพิมพ์อะไรทุกบรรทัด? ตัวไหนบอกรอบ ตัวไหนเก็บผล",
    "traceAnswer": "1 2 / 2 4 / 3 6 / 4 8 / รวม 8 — แต่ละรอบเพิ่ม 2 คงที่ ไม่ขึ้นกับ i; i ยังบอกเพียงว่าเป็นรอบที่เท่าไร ส่วน sum เก็บผลสะสม สี่รอบจึงรวม 4 × 2 = 8",
    "practicePrompt": "เขียน sumTo(n) คืนผลรวมจำนวนเต็ม 1 ถึง n สมมติ n เป็นจำนวนเต็มไม่ติดลบ เริ่มจาก starter ที่มีแค่ชื่อ function แล้วตรวจ 0, 1 และ 4",
    "starter": "function sumTo(n) {\n  // เขียนการคำนวณเอง\n}",
    "solution": "function sumTo(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i = i + 1) {\n    sum = sum + i;\n  }\n  return sum;\n}",
    "buggy": "function sumTo(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i = i + 1) {\n    sum = sum + i;\n    return sum;\n  }\n}",
    "bugExplanation": "คาด sumTo(4) = 10 แต่ได้ 1 เพราะ return ออกจาก function ตั้งแต่รอบแรก ย้าย return ไปหลังลูป แล้วตรวจ n = 0 ด้วย (ถ้า return อยู่ในลูป n = 0 จะได้ undefined)",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: เครื่องแจกคูปองแจก 2 ใบในวันที่ 1, 4 ใบในวันที่ 2, 6 ใบในวันที่ 3 (เพิ่มวันละ 2 ใบ) เขียนโปรแกรมที่รับจำนวนวันผ่านตัวแปร แล้วแสดงยอดแจกทั้งหมดของทุกวันรวมกัน ทดลอง 0, 1 และ 3 วัน เลือกวิธีเองและอธิบาย",
      "rubric": [
        "ได้ 0, 2 และ 12 ตามจำนวนวัน",
        "ไม่พิมพ์คำตอบคงที่ เปลี่ยนจำนวนวันในตัวแปรแล้วผลเปลี่ยนตาม",
        "คำอธิบายบอกวิธีสะสม (หรือสูตรที่เลือก) และกรณี 0 วัน"
      ],
      "modelAnswer": "const days = 3;\nlet coupons = 0;\nfor (let day = 1; day <= days; day = day + 1) {\n  coupons = coupons + day * 2;\n}\nconsole.log(coupons);\n\nผลจริง: days = 3 ได้ 12 (2 + 4 + 6) เปลี่ยน days เป็น 1 ได้ 2 และเป็น 0 ได้ 0 เพราะไม่เข้าลูปเลย coupons จึงยังเป็นค่าเริ่ม 0\nday บอกว่าเป็นวันที่เท่าไร ส่วน coupons สะสมยอดของทุกวัน สูตร days * (days + 1) ก็ถูกและไม่ต้องใช้ลูป"
    },
    "lesson": {
      "hook": "การพิมพ์ค่าทุกรอบยังไม่ใช่การรวมค่า ต้องมีชื่อที่จำผลจากรอบก่อน",
      "explain": [
        {
          "heading": "ค่าเริ่มและการสะสม",
          "text": [
            "accumulator คือตัวแปรเก็บผลที่สะสม ประกาศก่อนลูป let sum = 0; เพราะผลรวมเริ่มที่ศูนย์ sum = sum + i อ่าน sum เดิมบวกค่ารอบนี้ แล้วเก็บใหม่ ถ้าประกาศ sum ข้างในจะเริ่มใหม่ทุกครั้ง ไม่จำรอบก่อน",
            "counter เช่น i บอกตำแหน่งรอบ แต่ sum เก็บผลของหลายรอบ อย่าใช้ตัวเดียวทำสองหน้าที่"
          ]
        },
        {
          "heading": "คืนหลังจบทุกครั้ง",
          "text": [
            "เมื่อทำใน function ให้ return หลังลูปเพื่อรวมครบทุกรอบ ถ้า return อยู่ข้างในจะออกตั้งแต่รอบแรก กรณีไม่เข้าลูปก็คืนค่าเริ่มได้"
          ]
        }
      ],
      "walkthrough": [
        "ก่อนลูปตั้ง sum = 0 เป็นค่าเริ่มของผลรวม",
        "รอบ i = 1: อ่าน sum เดิม (0) บวก 1 แล้วเก็บกลับเป็น 1 จึงพิมพ์ 1 1",
        "รอบ i = 2 และ i = 3: sum เป็น 3 และ 6 ตามลำดับ เพราะทุกรอบอ่านค่าที่รอบก่อนเก็บไว้",
        "หลังออกจากลูป sum ยังเก็บ 6 เพราะประกาศไว้นอกลูป จึงพิมพ์ รวม 6"
      ],
      "pitfalls": [
        "ประกาศ let sum = 0; ไว้ใน { } ของลูป ทำให้ sum เริ่มใหม่ทุกรอบ จำผลของรอบก่อนไม่ได้",
        "เลือกค่าเริ่มผิด เช่นเริ่มผลรวมที่ 1 ทำให้ทุกคำตอบเกินไป 1 — ค่าเริ่ม 0 เหมาะกับการบวกสะสม",
        "ใช้ i เป็นทั้งตัวนับและยอดรวม เช่น i = i + i ทำให้จำนวนรอบเพี้ยน แยกสองชื่อเสมอ"
      ],
      "checks": [
        {
          "question": "ถ้า sum = 0 อยู่ในลูป จะจำค่าเดิมหรือไม่?",
          "answer": "ไม่ แต่ละรอบเริ่มใหม่ที่ 0"
        },
        {
          "question": "return ในรอบแรกส่งผลอย่างไร?",
          "answer": "function จบทันที ไม่ทำรอบถัดไป"
        }
      ],
      "recap": [
        "แยกตัวนับรอบกับยอดสะสม เลือกค่าเริ่มและอธิบายผลหลังแต่ละรอบ"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "ต้องมีชื่อที่จำผลจากรอบก่อน และเริ่มที่ 0",
        "ประกาศ sum ก่อน for วน i ตั้งแต่ 1 ถึง n แล้วบวก i เข้า sum",
        "ในลูปเขียน sum = sum + i; แล้ววาง return sum; หลังปิด } ของลูป (ไม่ใช่ข้างใน)"
      ],
      "acceptance": [
        "sumTo(0) = 0, sumTo(1) = 1, sumTo(4) = 10",
        "return อยู่หลังลูป และอธิบายผลทีละรอบได้"
      ],
      "solutionNotes": [
        "เลือก 0 เพราะเป็นค่าเริ่มของผลรวม ไม่ใช่คำตอบพิเศษของทุกโจทย์",
        "สูตร n * (n + 1) / 2 ถูกสำหรับบริบทนี้ แต่กิจกรรมนี้ฝึกลูปก่อน เปรียบเทียบสองวิธีได้หลังทำ"
      ],
      "reflection": [
        "ถ้าเปลี่ยนข้อมูลตั้งต้น วิธีเดิมยังถูกหรือไม่? ทดลองหนึ่งกรณีและอธิบายจากโค้ด ไม่ตอบเพียงว่าผ่าน"
      ]
    },
    "autoCheck": {
      "functionName": "sumTo",
      "tests": [
        {
          "name": "ศูนย์รอบ",
          "args": [
            0
          ],
          "expected": 0
        },
        {
          "name": "รอบเดียว",
          "args": [
            1
          ],
          "expected": 1
        },
        {
          "name": "หลายรอบ",
          "args": [
            4
          ],
          "expected": 10
        }
      ],
      "wrongAnswers": [
        "function sumTo(n){let s=0;for(let i=1;i<=n;i++){s+=i;return s;}}",
        "function sumTo(n){let s=0;for(let i=1;i<n;i++){s+=i;}return s;}"
      ]
    }
  },
  {
    "id": "js-array-basics",
    "courseId": "javascript-foundations",
    "unit": "สะพานทักษะพื้นฐาน",
    "title": "array: สร้าง อ่าน แก้ และวนรายการ",
    "prerequisites": [
      "js-accumulator"
    ],
    "language": "javascript",
    "standard": "v3",
    "objective": "ใช้ index และ length อ่านรายการ อธิบายขอบ และรวมค่าด้วย for...of โดยยังไม่ใช้ callbacks",
    "why": "ข้อมูลหลายชิ้นควรอยู่ในรายการเดียว แต่ต้องรู้ตำแหน่งก่อนใช้ map/filter หรือเลือกของตามงบ",
    "explanation": "array คือรายการค่ามีลำดับ สร้างด้วย [ค่าแรก, ค่าถัดไป] คั่นด้วย , index คือตำแหน่งเริ่มที่ 0 เช่น scores[0] อ่านตัวแรก .length คือจำนวนตัว ดังนั้นตำแหน่งสุดท้ายคือ length - 1 ตำแหน่งเกินขอบได้ undefined ไม่ใช่ 0",
    "example": "const scores = [4, 7, 2];\nconsole.log(scores[0], scores.length);\nlet total = 0;\nfor (const score of scores) {\n  total = total + score;\n}\nconsole.log(total);\nconsole.log(scores[3]);",
    "expectedOutput": "4 3\n13\nundefined",
    "tracePrompt": "ถ้าเพิ่มบรรทัด scores.push(5); ไว้ก่อน let total = 0; แต่ละบรรทัดจะพิมพ์อะไร? ทำไมบรรทัดแรกยังเห็นจำนวนเดิม",
    "traceAnswer": "4 3 / 18 / 5 — บรรทัดแรกรันก่อน push จึงยังเห็น length 3 · หลัง push รายการเป็น [4, 7, 2, 5] for...of จึงวน 4 รอบ total = 4 + 7 + 2 + 5 = 18 · index 3 มีค่าแล้วคือ 5 จึงไม่ใช่ undefined อีกต่อไป",
    "practicePrompt": "เขียน countAbove(values, limit) คืนจำนวนค่าที่มากกว่า limit ไม่รวมเท่ากัน สมมติรายการมีแต่ตัวเลข ห้ามแก้รายการต้นฉบับ starter มีแค่ชื่อให้เลือกวิธีวนเอง",
    "starter": "function countAbove(values, limit) {\n  // คืนจำนวนค่าที่มากกว่า limit\n}",
    "solution": "function countAbove(values, limit) {\n  let count = 0;\n  for (const value of values) {\n    if (value > limit) count = count + 1;\n  }\n  return count;\n}",
    "buggy": "const prices = [10, 20];\nlet total = 0;\nfor (let i = 0; i <= prices.length; i = i + 1) {\n  total = total + prices[i];\n}\nconsole.log(total);",
    "bugExplanation": "คาด 30 แต่ actual เป็น NaN เพราะ i = 2 ยังผ่านเงื่อนไข <= และ prices[2] ได้ undefined; 30 + undefined เป็น NaN เปลี่ยนเป็น i < prices.length แล้วตรวจรายการว่างได้ 0",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: เซนเซอร์ส่งอุณหภูมิเป็นรายการตัวเลข เขียน function ที่คืนข้อความบอกค่าสูงสุดและ index ของค่านั้น ถ้าค่าสูงสุดซ้ำให้ตอบ index แรกที่พบ ถ้ารายการว่างให้คืน ไม่มีข้อมูล ห้ามแก้รายการเดิม ทดลอง [18, 25, 31, 31, 22], [] และ [-5, -2, -9] แล้วอธิบายว่าโค้ดรับมือกรณีค่าติดลบทั้งหมดอย่างไร",
      "rubric": [
        "ได้ สูงสุด 31 ที่ index 2 / ไม่มีข้อมูล / สูงสุด -2 ที่ index 1",
        "ค่าซ้ำตอบ index แรก (2 ไม่ใช่ 3) และรายการที่ติดลบทั้งหมดไม่ได้ตอบ 0",
        "ไม่แก้หรือเรียงรายการเดิม และแนบผลรันจริงพร้อมคำอธิบาย"
      ],
      "modelAnswer": "function hottest(readings) {\n  if (readings.length === 0) {\n    return \"ไม่มีข้อมูล\";\n  }\n  let maxIndex = 0;\n  for (let i = 1; i < readings.length; i = i + 1) {\n    if (readings[i] > readings[maxIndex]) {\n      maxIndex = i;\n    }\n  }\n  return \"สูงสุด \" + readings[maxIndex] + \" ที่ index \" + maxIndex;\n}\n\nconsole.log(hottest([18, 25, 31, 31, 22]));\nconsole.log(hottest([]));\nconsole.log(hottest([-5, -2, -9]));\n\nผลจริง: สูงสุด 31 ที่ index 2 / ไม่มีข้อมูล / สูงสุด -2 ที่ index 1\nเริ่มจากสมาชิกตัวแรกเป็นค่าสูงสุดชั่วคราว ไม่ได้เริ่มจาก 0 จึงถูกเมื่อทุกค่าติดลบ ใช้ > (ไม่ใช่ >=) ค่าที่เท่ากันภายหลังจึงไม่แทน index แรก ตรวจรายการว่างก่อน เพราะ readings[0] ของ [] เป็น undefined เก็บค่าสูงสุดและ index เป็นสองตัวแปรแยกกันก็ถูก"
    },
    "lesson": {
      "hook": "ข้อมูลหลายชิ้นควรอยู่ในรายการเดียว แต่ต้องรู้ตำแหน่งก่อนใช้ map/filter หรือเลือกของตามงบ",
      "explain": [
        {
          "heading": "วงเล็บเหลี่ยมและตำแหน่ง",
          "text": [
            "array คือรายการค่ามีลำดับ สร้างด้วย [ค่าแรก, ค่าถัดไป] คั่นด้วย , index คือตำแหน่งเริ่มที่ 0 เช่น scores[0] อ่านตัวแรก .length คือจำนวนตัว ดังนั้นตำแหน่งสุดท้ายคือ length - 1 ตำแหน่งเกินขอบได้ undefined ไม่ใช่ 0",
            "scores[0] = 9 เปลี่ยนค่าตัวแรก .push(ค่า) เพิ่มท้าย .pop() เอาท้ายออกและคืนค่านั้น const ห้ามผูกชื่อกับรายการใหม่ แต่ไม่ห้ามแก้สมาชิกในรายการเดิม จะเรียน reference ลึกภายหลัง"
          ]
        },
        {
          "heading": "วนค่าโดยไม่จัด index",
          "text": [
            "for (const score of scores) { ... } อ่านค่าแต่ละตัวตามลำดับ ชื่อ score เป็นค่าของรอบนี้ ไม่ใช่ index รายการว่างทำศูนย์รอบ เลือก for แบบตัวนับเมื่อจำเป็นต้องรู้ตำแหน่งด้วย",
            "Array.isArray(value) ใช้ตรวจว่าเป็น array; typeof [] ให้ object จึงแยกไม่ได้ ไม่ต้องใช้ลูกศรหรือ callback ในบทนี้"
          ]
        }
      ],
      "walkthrough": [
        "scores[0] อ่านตัวแรกได้ 4 และ scores.length บอกจำนวนสมาชิก 3",
        "total เริ่ม 0 แล้ว for...of ให้ score เป็น 4, 7, 2 ทีละรอบ total จึงเป็น 4, 11, 13",
        "scores[3] อยู่เกินตำแหน่งสุดท้าย (length - 1 = 2) จึงได้ undefined"
      ],
      "pitfalls": [
        "คิดว่า length คือ index สุดท้าย: รายการ 3 ตัวมี index 0, 1, 2 ตัวสุดท้ายคือ scores[scores.length - 1]",
        "คิดว่า for (const score of scores) ให้ตำแหน่ง ความจริง score คือค่าของสมาชิก ถ้าต้องการตำแหน่งให้ใช้ for แบบตัวนับ",
        "คิดว่า const ห้ามแก้สมาชิก: const scores ห้ามผูกชื่อกับรายการใหม่ แต่ scores.push(9) หรือ scores[0] = 1 ยังทำได้"
      ],
      "checks": [
        {
          "question": "รายการมี 3 ตัว index สุดท้ายคืออะไร?",
          "answer": "2 เพราะเริ่มนับที่ 0"
        },
        {
          "question": "for...of ของ [] ทำกี่รอบ?",
          "answer": "0 รอบ และตัวสะสมนอกลูปยังเป็นค่าเริ่ม"
        }
      ],
      "recap": [
        "ใช้ index และ length อ่านรายการ อธิบายขอบ และรวมค่าด้วย for...of โดยยังไม่ใช้ callbacks"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "แยกจำนวนตัวที่ผ่าน ออกจากค่าของสมาชิก",
        "สะสม count ก่อนลูป แล้วเพิ่มเฉพาะเมื่อ value > limit",
        "ใน for (const value of values) ใช้ if (value > limit) เพิ่ม count ทีละ 1 แล้ว return count หลังลูป"
      ],
      "acceptance": [
        "[2, 5, 5, 9] กับ limit 5 ได้ 1 (ไม่รวมค่าที่เท่ากัน)",
        "รายการว่างได้ 0 และไม่มีสมาชิกถูกแก้"
      ],
      "solutionNotes": [
        "ใช้ for...of เพราะต้องการค่า ไม่ต้องการ index",
        "for แบบตัวนับก็ถูกถ้าใช้ i < values.length; อย่าใช้ <= length"
      ],
      "reflection": [
        "ถ้าเปลี่ยนข้อมูลตั้งต้น วิธีเดิมยังถูกหรือไม่? ทดลองหนึ่งกรณีและอธิบายจากโค้ด ไม่ตอบเพียงว่าผ่าน"
      ]
    },
    "autoCheck": {
      "functionName": "countAbove",
      "tests": [
        {
          "name": "รวมค่าซ้ำแต่ไม่รวมขอบ",
          "args": [
            [
              2,
              5,
              5,
              9
            ],
            5
          ],
          "expected": 1
        },
        {
          "name": "รายการว่าง",
          "args": [
            [],
            5
          ],
          "expected": 0
        },
        {
          "name": "จำนวนติดลบ",
          "args": [
            [
              -4,
              -1,
              0
            ],
            -2
          ],
          "expected": 2
        }
      ],
      "wrongAnswers": [
        "function countAbove(values,limit){let count=0;for(const value of values){if(value>=limit)count++;}return count;}",
        "function countAbove(values,limit){return values.length;}"
      ]
    }
  },
  {
    "id": "js-function-values",
    "courseId": "javascript-foundations",
    "unit": "สะพานทักษะพื้นฐาน",
    "title": "function expression และ arrow ก่อน callbacks",
    "prerequisites": [
      "js-functions",
      "js-array-basics"
    ],
    "language": "javascript",
    "standard": "v3",
    "objective": "อ่าน function ที่เก็บในตัวแปร แปลงเป็น arrow แบบง่าย และส่งเป็น argument โดยยังไม่ใช้ reduce",
    "why": "array.map รับ function ไปทำงานกับแต่ละค่า จึงต้องรู้ความต่างระหว่างส่ง function กับส่งผลของการเรียกก่อน",
    "explanation": "const double = function(value) { return value * 2; }; เก็บค่า function ไว้ในชื่อ double ต้องประกาศก่อนใช้ ต่างจาก function declaration ที่เตรียมชื่อให้ก่อนรัน; double คือค่า function ส่วน double(3) คือการเรียกและได้ 6",
    "example": "const double = (value) => value * 2;\nfunction apply(value, transform) {\n  return transform(value);\n}\nconsole.log(apply(3, double));\nconsole.log(double(4));",
    "expectedOutput": "6\n8",
    "tracePrompt": "ถ้าเพิ่มสองบรรทัดท้ายไฟล์: console.log(apply(5, (value) => value - 1)); แล้ว console.log(apply(2, double(2))); แต่ละบรรทัดได้อะไร และทำไม",
    "traceAnswer": "บรรทัดแรกได้ 4 — arrow ที่เขียนตรงจุดเรียกก็เป็นค่า function apply จึงเรียกมันด้วย 5 · บรรทัดที่สองเกิด TypeError: transform is not a function เพราะ double(2) ถูกเรียกก่อนและส่ง 4 (ตัวเลข) เข้าไป apply จึงพยายามเรียกตัวเลขเหมือนเป็น function",
    "practicePrompt": "เติม arrow ในชื่อ triple ให้ apply(4, triple) ได้ 12 จากนั้นเขียนอีกรูปแบบที่มี { } และตรวจว่า output เท่าเดิม",
    "starter": "const triple = (value) => 0;\nfunction apply(value, transform) { return transform(value); }\nconsole.log(apply(4, triple));",
    "solution": "const triple = (value) => value * 3;\nfunction apply(value, transform) { return transform(value); }\nconsole.log(apply(4, triple));",
    "buggy": "const triple = (value) => { value * 3; };\nconsole.log(triple(4));",
    "bugExplanation": "คาด 12 แต่ได้ undefined เพราะ arrow ที่มี { } ไม่คืนค่าอัตโนมัติ ต้องเขียน return value * 3; หรือเอา { } ออก แล้วลองกับ 4 และ 0",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: เขียน function กลางหนึ่งตัวที่รับรายการตัวเลขและ \"กฎตรวจ\" (function ที่รับตัวเลขหนึ่งตัวแล้วคืน true หรือ false) แล้วคืนจำนวนตัวที่กฎตอบ true สร้างกฎสองแบบ: น้อยกว่า 10 และมากกว่า 100 ทดลองกับ [4, 150, 7, 200, 9] ทั้งสองกฎ และกับ [] โดยไม่แก้ function กลางเมื่อเปลี่ยนกฎ อธิบายว่าตรงไหนส่ง function และตรงไหนเรียก",
      "rubric": [
        "ได้ 3 (น้อยกว่า 10), 2 (มากกว่า 100) และ 0 สำหรับรายการว่าง",
        "function กลางรับกฎเป็นค่า function และเรียกกฎกับสมาชิกแต่ละตัว ไม่รับผลตัวเลขหรือ true/false ที่คำนวณมาแล้ว",
        "อธิบายได้ว่า argument ใดจับคู่กับ parameter ใด และการเรียกกฎเกิดในบรรทัดไหน"
      ],
      "modelAnswer": "function countWhere(values, test) {\n  let count = 0;\n  for (const value of values) {\n    if (test(value)) {\n      count = count + 1;\n    }\n  }\n  return count;\n}\n\nconst isSmall = (value) => value < 10;\nconst isLarge = (value) => value > 100;\n\nconsole.log(countWhere([4, 150, 7, 200, 9], isSmall));\nconsole.log(countWhere([4, 150, 7, 200, 9], isLarge));\nconsole.log(countWhere([], isLarge));\n\nผลจริง: 3 / 2 / 0\nisSmall และ isLarge ถูกส่งโดยไม่มีวงเล็บ จึงเข้า parameter test เป็นค่า function บรรทัด if (test(value)) คือจุดที่เรียกกฎกับสมาชิกทีละตัว รายการว่างไม่เข้าลูปจึงได้ 0 เขียนกฎเป็น function declaration หรือส่ง arrow ตรงจุดเรียกก็ถูก"
    },
    "lesson": {
      "hook": "array.map รับ function ไปทำงานกับแต่ละค่า จึงต้องรู้ความต่างระหว่างส่ง function กับส่งผลของการเรียกก่อน",
      "explain": [
        {
          "heading": "function เป็นค่า",
          "text": [
            "const double = function(value) { return value * 2; }; เก็บค่า function ไว้ในชื่อ double ต้องประกาศก่อนใช้ ต่างจาก function declaration ที่เตรียมชื่อให้ก่อนรัน; double คือค่า function ส่วน double(3) คือการเรียกและได้ 6",
            "parameter รับ function ได้เหมือนรับตัวเลข ผู้รับเป็นคนตัดสินใจว่าจะเรียก function ที่ส่งเข้าไปเมื่อไร (บท js-callbacks จะตั้งชื่อเรียกรูปแบบนี้และใช้กับ array)"
          ]
        },
        {
          "heading": "arrow รูปแบบสองอย่าง",
          "text": [
            "const double = (value) => value * 2; เป็น arrow function วงเล็บรับ parameter => คั่นกับการทำงาน ด้านขวาเป็นนิพจน์เดียวจึงคืนค่าอัตโนมัติ",
            "ถ้าใช้ block { } ต้องเขียน return เอง เช่น (value) => { return value * 2; } สำหรับ parameter หนึ่งตัวละวงเล็บได้ แต่ในบทนี้ใส่วงเล็บเสมอให้เห็นโครงชัด"
          ]
        }
      ],
      "walkthrough": [
        "บรรทัดแรกเก็บ arrow function ไว้ในชื่อ double ยังไม่คำนวณอะไร",
        "apply มี parameter สองตัว: value เป็นค่า และ transform เป็น function ที่จะถูกเรียกข้างใน",
        "apply(3, double) ส่งตัว function (ไม่มีวงเล็บ) เข้าไป apply เรียก transform(3) ซึ่งก็คือ double(3) ได้ 6 แล้วคืน 6",
        "double(4) เป็นการเรียกตรง ๆ ได้ 8"
      ],
      "pitfalls": [
        "ส่ง double(3) แทน double: วงเล็บทำให้เรียกทันทีและส่งตัวเลขเข้าไป ผู้รับจะเรียกต่อไม่ได้",
        "เรียก function ที่เก็บใน const ก่อนบรรทัดที่ประกาศ จะได้ ReferenceError ต่างจาก function declaration ที่เรียกก่อนบรรทัดประกาศได้",
        "ใน apply เรียก transform(value) แต่ลืม return ผลออกไป apply จึงคืน undefined"
      ],
      "checks": [
        {
          "question": "fn กับ fn() ต่างกันอย่างไร?",
          "answer": "fn คือค่า function ส่วน fn() คือการเรียกแล้วได้ค่าที่คืน"
        },
        {
          "question": "arrow ที่มี { } ต้องทำอะไรเพื่อคืนค่า?",
          "answer": "เขียน return ให้ชัดเจน"
        }
      ],
      "recap": [
        "อ่าน function ที่เก็บในตัวแปร แปลงเป็น arrow แบบง่าย และส่งเป็น argument โดยยังไม่ใช้ reduce"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "arrow แบบนิพจน์เดียวคืนค่าด้านขวาโดยอัตโนมัติ",
        "เปลี่ยน 0 เป็นการคำนวณจาก value",
        "รูปนิพจน์คือ (value) => value * 3 ส่วนรูป block ต้องมี return อยู่ใน { }"
      ],
      "acceptance": [
        "output เป็น 12 และรูปแบบ block ต้องมี return",
        "ตรวจเอง: เปลี่ยน argument เป็น 0 ต้องได้ 0 แสดงว่าผลไม่ได้เขียนคงที่ (output check ตรวจเฉพาะ 12)"
      ],
      "solutionNotes": [
        "ส่ง triple โดยไม่มีวงเล็บ เพราะ apply ต้องเป็นคนเรียกเอง",
        "function expression ก็ส่งต่อได้ ไม่จำเป็นต้องเป็น arrow เสมอ"
      ],
      "reflection": [
        "ถ้าเปลี่ยนข้อมูลตั้งต้น วิธีเดิมยังถูกหรือไม่? ทดลองหนึ่งกรณีและอธิบายจากโค้ด ไม่ตอบเพียงว่าผ่าน"
      ]
    },
    "outputCheck": {
      "expected": "12",
      "wrongAnswers": [
        "const triple = (value) => { value * 3; }; function apply(value, transform){return transform(value);} console.log(apply(4,triple));",
        "const triple=(value)=>value+3;function apply(value,transform){return transform(value);}console.log(apply(4,triple));"
      ]
    }
  },
  {
    "id": "js-loop-control",
    "courseId": "javascript-foundations",
    "unit": "สะพานทักษะพื้นฐาน",
    "title": "while และการหยุด: break / continue",
    "prerequisites": [
      "js-array-basics"
    ],
    "language": "javascript",
    "standard": "v3",
    "objective": "อธิบายเงื่อนไขก่อนแต่ละรอบและเลือกหยุดทั้งลูปหรือข้ามเฉพาะรอบได้",
    "why": "บางงานไม่รู้จำนวนรอบล่วงหน้า เช่นใช้เครดิตจนหมด ต้องตรวจเงื่อนไขที่เปลี่ยนจริง และแยกหยุดกับข้าม",
    "explanation": "while (เงื่อนไข) { คำสั่ง } ตรวจเงื่อนไขก่อนทุกรอบ ถ้าเท็จหยุด ไม่ทำแม้แต่รอบแรกได้ ต้องเปลี่ยนข้อมูลภายในเพื่อให้เงื่อนไขมีทางเป็นเท็จ เช่นลด remaining ทุกครั้ง",
    "example": "const readings = [3, -1, 2, 0, 8];\nfor (const value of readings) {\n  if (value < 0) continue;\n  if (value === 0) break;\n  console.log(value);\n}",
    "expectedOutput": "3\n2",
    "tracePrompt": "ถ้าเปลี่ยน readings เป็น [-4, 5, 0, 6] จะพิมพ์อะไร? แล้วถ้าเป็น [0, 3] ล่ะ? ถ้าสลับสองบรรทัด if (ตรวจ === 0 ก่อน < 0) ผลของสองรายการนี้เปลี่ยนไหม",
    "traceAnswer": "[-4, 5, 0, 6]: -4 ถูกข้าม พิมพ์ 5 แล้วเจอ 0 จึงหยุด 6 ไม่ถูกอ่าน · [0, 3]: รอบแรกเจอ 0 ออกทันที ไม่มี output แม้มี 3 ตามหลัง · สลับลำดับ if แล้วผลเท่าเดิม เพราะค่าหนึ่งตัวเป็นทั้งติดลบและศูนย์พร้อมกันไม่ได้",
    "practicePrompt": "เติมคำสั่งให้โปรแกรมอ่าน [4, 2, 0, 9] แล้วพิมพ์เฉพาะค่าที่มาก่อน 0 ทำไมใช้ continue อย่างเดียวไม่ได้?",
    "starter": "const values = [4, 2, 0, 9];\nfor (const value of values) {\n  if (value === 0) { /* เติมที่นี่ */ }\n  console.log(value);\n}",
    "solution": "const values = [4, 2, 0, 9];\nfor (const value of values) {\n  if (value === 0) break;\n  console.log(value);\n}",
    "buggy": "let tickets = 2;\nwhile (tickets > 0) {\n  console.log(tickets);\n}",
    "bugExplanation": "คาด 2, 1 แล้วจบ แต่ actual พิมพ์ 2 ซ้ำจน runner timeout เพราะ tickets ไม่ลด เพิ่ม tickets = tickets - 1 หลัง log แล้วตรวจค่าเริ่ม 0 ด้วย",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: ตู้ขายของรับเหรียญตามลำดับในรายการ ยอมรับเฉพาะเหรียญ 1, 5 และ 10 (เหรียญอื่นไม่นับ) ตู้รับเหรียญจนยอดถึงหรือเกินราคาแล้วไม่รับเหรียญที่เหลือ คืนข้อความ ใช้ X เหรียญ ทอน Y หรือ เงินไม่พอ ถ้าเหรียญหมดก่อน ทดลอง ราคา 25 กับ [10, 3, 10, 10, 5], ราคา 20 กับ [10, 10, 5], ราคา 30 กับ [10, 5] และราคา 10 กับ [] เลือกวิธีเอง",
      "rubric": [
        "ได้ ใช้ 3 เหรียญ ทอน 5 / ใช้ 2 เหรียญ ทอน 0 / เงินไม่พอ / เงินไม่พอ",
        "เหรียญ 3 ไม่ถูกนับ และเหรียญหลังจากยอดครบไม่ถูกนับ",
        "อธิบายว่าโค้ดหยุดรับเหรียญตรงไหนและข้ามเหรียญที่ไม่ยอมรับอย่างไร พร้อมผลรันจริง"
      ],
      "modelAnswer": "function payWithCoins(price, coins) {\n  let paid = 0;\n  let used = 0;\n  for (const coin of coins) {\n    if (paid >= price) {\n      break;\n    }\n    if (coin !== 1 && coin !== 5 && coin !== 10) {\n      continue;\n    }\n    paid = paid + coin;\n    used = used + 1;\n  }\n  if (paid < price) {\n    return \"เงินไม่พอ\";\n  }\n  return \"ใช้ \" + used + \" เหรียญ ทอน \" + (paid - price);\n}\n\nconsole.log(payWithCoins(25, [10, 3, 10, 10, 5]));\nconsole.log(payWithCoins(20, [10, 10, 5]));\nconsole.log(payWithCoins(30, [10, 5]));\nconsole.log(payWithCoins(10, []));\n\nผลจริง: ใช้ 3 เหรียญ ทอน 5 / ใช้ 2 เหรียญ ทอน 0 / เงินไม่พอ / เงินไม่พอ\nbreak หยุดรับเมื่อยอดถึงราคาแล้ว เหรียญ 5 ตัวสุดท้ายจึงไม่ถูกนับ continue ข้ามเหรียญ 3 โดยไม่เพิ่ม used ตรวจ paid < price หลังลูปเพื่อแยกกรณีเหรียญหมดก่อน ใช้ while กับ index หรือ if ซ้อนแทน continue ก็ถูกถ้าผลตรงทุกกรณี"
    },
    "lesson": {
      "hook": "บางงานไม่รู้จำนวนรอบล่วงหน้า เช่นใช้เครดิตจนหมด ต้องตรวจเงื่อนไขที่เปลี่ยนจริง และแยกหยุดกับข้าม",
      "explain": [
        {
          "heading": "while ตรวจซ้ำ",
          "text": [
            "while (เงื่อนไข) { คำสั่ง } ตรวจเงื่อนไขก่อนทุกรอบ ถ้าเท็จหยุด ไม่ทำแม้แต่รอบแรกได้ ต้องเปลี่ยนข้อมูลภายในเพื่อให้เงื่อนไขมีทางเป็นเท็จ เช่นลด remaining ทุกครั้ง",
            "ลองจากตัวอย่างเล็กก่อนอ่านส่วนข้าม/หยุด"
          ],
          "code": "let remaining = 2;\nwhile (remaining > 0) {\n  console.log(remaining);\n  remaining = remaining - 1;\n}\nconsole.log(\"หมด\");",
          "output": "2\n1\nหมด"
        },
        {
          "heading": "หยุดทั้งลูปกับข้ามหนึ่งรอบ",
          "text": [
            "break ออกจากลูปทันที continue ข้ามคำสั่งที่เหลือของรอบนี้ แล้วไปขั้นเพิ่มและตรวจรอบใหม่ใน for; ใน while ต้องระวัง continue ข้ามการเปลี่ยนค่าจนค้าง",
            "ตัวอย่างนี้ข้ามค่าติดลบ แต่เมื่อเจอ 0 หยุดทั้งหมด แม้หลัง 0 ยังมีค่าบวก ถ้าไม่ต้องการข้ามหรือหยุด ใช้ if ธรรมดาได้"
          ]
        },
        {
          "heading": "ก่อนให้ทำเอง",
          "text": [
            "เติมคำสั่งหยุดในกิจกรรมแรก แล้วทำ checkpoint ที่แยกกฎข้ามกับหยุดโดยไม่มีโครงคำตอบ ห้ามทดสอบลูปไม่มีเงื่อนไขหยุดใน terminal; Ctrl+C หยุดโปรแกรมค้าง"
          ]
        }
      ],
      "walkthrough": [
        "3: ไม่ติดลบและไม่ใช่ 0 จึงถึงบรรทัด log พิมพ์ 3",
        "-1: เข้า continue ข้ามคำสั่งที่เหลือของรอบนี้ แล้วไปค่าถัดไป",
        "2: ผ่านทั้งสอง if พิมพ์ 2",
        "0: เข้า break ออกจากลูปทันที 8 จึงไม่ถูกอ่านเลย"
      ],
      "pitfalls": [
        "ใช้ continue ในที่ที่ต้องการหยุดทั้งรายการ: ลูปยังอ่านค่าหลังจากนั้นต่อ",
        "ใน while ถ้า continue อยู่ก่อนบรรทัดที่เปลี่ยนตัวนับ รอบถัดไปจะตรวจค่าเดิมซ้ำจนค้าง ให้เปลี่ยนค่าก่อน continue",
        "คิดว่า break ออกแค่ if: ความจริง break ออกจากลูปที่ครอบอยู่ทั้งลูป"
      ],
      "checks": [
        {
          "question": "continue ใน for ทำอะไรต่อ?",
          "answer": "ข้ามคำสั่งที่เหลือของรอบนี้ แล้วไปรอบถัดไป (ใน for แบบตัวนับจะทำช่องเพิ่มค่าแล้วตรวจเงื่อนไขก่อน)"
        },
        {
          "question": "while ที่เงื่อนไขจริงตลอดเกิดอะไร?",
          "answer": "ไม่จบ ต้องมีการเปลี่ยนค่าหรือทาง break ที่เข้าถึงได้"
        }
      ],
      "recap": [
        "อธิบายเงื่อนไขก่อนแต่ละรอบและเลือกหยุดทั้งลูปหรือข้ามเฉพาะรอบได้"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "เมื่อเจอ 0 ต้องเลิกอ่านรายการทั้งหมด",
        "continue ยังอ่าน 9 ต่อ จึงต้องใช้คำสั่งที่ออกจากลูป",
        "ในวงเล็บปีกกาของ if (value === 0) ใส่คำสั่งที่ออกจากลูปทันที"
      ],
      "acceptance": [
        "output check: พิมพ์ 4 และ 2 เท่านั้น",
        "ตรวจเอง: ให้ 0 เป็นตัวแรกต้องไม่มี output และรายการที่ไม่มี 0 ต้องพิมพ์ทุกตัว"
      ],
      "solutionNotes": [
        "break ตรงกับ เลิกทั้งรายการ ไม่ใช่ข้ามเฉพาะค่าศูนย์",
        "ใช้ while ก็ได้ แต่ต้องดูแล index และขอบเอง"
      ],
      "reflection": [
        "ถ้าเปลี่ยนข้อมูลตั้งต้น วิธีเดิมยังถูกหรือไม่? ทดลองหนึ่งกรณีและอธิบายจากโค้ด ไม่ตอบเพียงว่าผ่าน"
      ]
    },
    "outputCheck": {
      "expected": "4\n2",
      "wrongAnswers": [
        "const values=[4,2,0,9];for(const value of values){if(value===0)continue;console.log(value);}"
      ]
    }
  },
  {
    "id": "js-nested-loops",
    "courseId": "javascript-foundations",
    "unit": "สะพานทักษะพื้นฐาน",
    "title": "ลูปซ้อน: จับคู่รายการ",
    "prerequisites": [
      "js-loops"
    ],
    "language": "javascript",
    "standard": "v3",
    "objective": "ไล่ outer/inner loop และสร้างคู่ทุกคู่ได้โดยไม่สับสนจำนวนรอบ",
    "why": "เมื่อจับคู่วันกับช่วงเวลา ต้องทำทุกรายการข้างในสำหรับแต่ละรายการข้างนอก ไม่ใช่วนสองรายการแยกกัน",
    "explanation": "ลูปซ้อนคือลูปหนึ่งอยู่ใน block ของอีกลูป outer loop คือชั้นนอก inner loop คือชั้นใน เมื่อชั้นนอกเปลี่ยนค่า ชั้นในเริ่มอ่านรายการใหม่ตั้งแต่ตัวแรก",
    "example": "const days = [\"จันทร์\", \"อังคาร\"];\nconst slots = [\"เช้า\", \"เย็น\"];\nfor (const day of days) {\n  for (const slot of slots) {\n    console.log(day + \":\" + slot);\n  }\n}",
    "expectedOutput": "จันทร์:เช้า\nจันทร์:เย็น\nอังคาร:เช้า\nอังคาร:เย็น",
    "tracePrompt": "ถ้าเพิ่ม \"พุธ\" ใน days และใส่ console.log(\"--\"); หลังลูปชั้นใน (แต่ยังอยู่ในลูปชั้นนอก) จะพิมพ์กี่บรรทัด และ -- อยู่ตรงไหนบ้าง",
    "traceAnswer": "9 บรรทัด: 3 วัน × 2 ช่วง = 6 คู่ บวก -- อีก 3 ครั้ง ลำดับคือ จันทร์:เช้า, จันทร์:เย็น, --, อังคาร:เช้า, อังคาร:เย็น, --, พุธ:เช้า, พุธ:เย็น, -- เพราะคำสั่งที่อยู่ในชั้นนอกแต่นอกชั้นในทำครั้งเดียวต่อหนึ่ง day",
    "practicePrompt": "จาก starter สร้างรายการรหัสทุกคู่ของขนาด S, M กับสี blue, red โดย push ข้อความ ขนาด-สี เข้า result แล้วคืน result",
    "starter": "function variants(sizes, colors) {\n  const result = [];\n  // สร้างคู่เอง\n  return result;\n}",
    "solution": "function variants(sizes, colors) {\n  const result = [];\n  for (const size of sizes) {\n    for (const color of colors) {\n      result.push(size + \"-\" + color);\n    }\n  }\n  return result;\n}",
    "buggy": "const result = [];\nfor (const size of [\"S\", \"M\"]) {\n  result.push(size);\n}\nfor (const color of [\"blue\", \"red\"]) {\n  result.push(color);\n}\nconsole.log(result);",
    "bugExplanation": "คาด 4 คู่ แต่ได้ [\"S\", \"M\", \"blue\", \"red\"] เพราะสองลูปแยกกัน ไม่ได้จับคู่ ย้ายลูปสีเข้าไปในลูปขนาด แล้ว push size + \"-\" + color",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: ร้านมีเสื้อราคา [200, 350, 500] และกางเกงราคา [300, 450] เขียน function ที่รับสองรายการและงบ แสดงทุกชุด (เสื้อ 1 + กางเกง 1) ที่ราคารวมไม่เกินงบ ในรูป 200 + 300 = 500 แล้วคืนจำนวนชุด ถ้าไม่มีชุดเลยให้แสดง ไม่มีชุดในงบ ทดลองงบ 650 และ 400 อธิบายว่าแต่ละลูปทำกี่รอบ",
      "rubric": [
        "งบ 650 แสดง 200 + 300 = 500, 200 + 450 = 650, 350 + 300 = 650 และคืน 3 (รวมชุดที่เท่างบพอดี)",
        "งบ 400 แสดง ไม่มีชุดในงบ และคืน 0",
        "อธิบายได้ว่าชั้นนอกวน 3 รอบ ชั้นในวน 2 รอบต่อเสื้อหนึ่งตัว รวมตรวจ 6 ชุด"
      ],
      "modelAnswer": "function outfits(shirts, pants, budget) {\n  let count = 0;\n  for (const shirt of shirts) {\n    for (const pant of pants) {\n      const total = shirt + pant;\n      if (total <= budget) {\n        console.log(shirt + \" + \" + pant + \" = \" + total);\n        count = count + 1;\n      }\n    }\n  }\n  if (count === 0) {\n    console.log(\"ไม่มีชุดในงบ\");\n  }\n  return count;\n}\n\nconsole.log(outfits([200, 350, 500], [300, 450], 650));\nconsole.log(outfits([200, 350, 500], [300, 450], 400));\n\nผลจริง: 200 + 300 = 500 / 200 + 450 = 650 / 350 + 300 = 650 / 3 / ไม่มีชุดในงบ / 0\nชั้นนอกให้เสื้อทีละตัว (3 รอบ) ชั้นในวนกางเกงครบทุกตัวสำหรับเสื้อแต่ละตัว (2 รอบ) จึงตรวจ 6 ชุด ใช้ <= เพราะชุดที่เท่างบพอดีซื้อได้ ตรวจ count หลังลูปทั้งสองเพื่อรู้ว่าไม่มีชุดเลย เก็บชุดใน array แล้วค่อยแสดงก็ถูก"
    },
    "lesson": {
      "hook": "เมื่อจับคู่วันกับช่วงเวลา ต้องทำทุกรายการข้างในสำหรับแต่ละรายการข้างนอก ไม่ใช่วนสองรายการแยกกัน",
      "explain": [
        {
          "heading": "เริ่มจากคู่เล็ก",
          "text": [
            "ลูปซ้อนคือลูปหนึ่งอยู่ใน block ของอีกลูป outer loop คือชั้นนอก inner loop คือชั้นใน เมื่อชั้นนอกเปลี่ยนค่า ชั้นในเริ่มอ่านรายการใหม่ตั้งแต่ตัวแรก",
            "2 วันกับ 2 ช่วงมี 2 × 2 = 4 คู่ แต่ถ้ารายการใดว่างจะไม่มีคู่"
          ]
        }
      ],
      "walkthrough": [
        "ชั้นนอกให้ day เป็น จันทร์ แล้วชั้นในวน slots ครบ: จันทร์:เช้า แล้ว จันทร์:เย็น",
        "ชั้นในจบ ชั้นนอกไปค่าถัดไป day เป็น อังคาร และชั้นในเริ่มจาก เช้า ใหม่",
        "รวม 2 × 2 = 4 บรรทัด ทุกวันได้ครบทุกช่วง ไม่ใช่จับคู่ตาม index เดียวกัน"
      ],
      "pitfalls": [
        "ใช้ชื่อเดียวกันทั้งสองชั้น เช่น const item ทั้งนอกและใน ชื่อชั้นในจะบังชื่อชั้นนอก ทำให้อ่านค่าผิดตัว",
        "วางลูปผิดชั้นทำให้ลำดับผลเปลี่ยน: ถ้า slots เป็นชั้นนอก จะได้ จันทร์:เช้า, อังคาร:เช้า ก่อน จันทร์:เย็น",
        "คิดว่า break ในชั้นในหยุดทั้งหมด: break ออกแค่ลูปชั้นใน ชั้นนอกยังวนต่อ"
      ],
      "checks": [
        {
          "question": "รายการนอก 3 ตัวกับรายการใน 2 ตัว ทำ log ในชั้นในกี่ครั้ง?",
          "answer": "6 ครั้ง ถ้าไม่มี break"
        },
        {
          "question": "รายการชั้นในว่างเกิดอะไร?",
          "answer": "ชั้นนอกยังวน แต่ไม่มีคู่ถูกสร้าง"
        }
      ],
      "recap": [
        "ไล่ outer/inner loop และสร้างคู่ทุกคู่ได้โดยไม่สับสนจำนวนรอบ"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "ต้องวนทุกสีใหม่ในทุกขนาด",
        "ลูป colors อยู่ในลูป sizes และ push หนึ่งคู่ต่อหนึ่งรอบของชั้นใน",
        "ในชั้นใน push ข้อความ size + \"-\" + color แล้ว return result หลังลูปชั้นนอก"
      ],
      "acceptance": [
        "S, M กับ blue, red ได้ S-blue, S-red, M-blue, M-red",
        "ถ้าขนาดหรือสีว่างต้องคืน []"
      ],
      "solutionNotes": [
        "ใช้ชื่อ size กับ color คนละชื่อทำให้ไล่ได้ชัด",
        "ลำดับคู่เป็นส่วนหนึ่งของโจทย์ จึงวนขนาดเป็นชั้นนอก สีเป็นชั้นใน"
      ],
      "reflection": [
        "ถ้าเปลี่ยนข้อมูลตั้งต้น วิธีเดิมยังถูกหรือไม่? ทดลองหนึ่งกรณีและอธิบายจากโค้ด ไม่ตอบเพียงว่าผ่าน"
      ]
    },
    "autoCheck": {
      "functionName": "variants",
      "tests": [
        {
          "name": "สองคูณสอง",
          "args": [
            [
              "S",
              "M"
            ],
            [
              "blue",
              "red"
            ]
          ],
          "expected": [
            "S-blue",
            "S-red",
            "M-blue",
            "M-red"
          ]
        },
        {
          "name": "ไม่มีขนาด",
          "args": [
            [],
            [
              "blue"
            ]
          ],
          "expected": []
        },
        {
          "name": "ไม่มีสี",
          "args": [
            [
              "S"
            ],
            []
          ],
          "expected": []
        }
      ],
      "wrongAnswers": [
        "function variants(sizes,colors){return [...sizes,...colors];}",
        "function variants(sizes,colors){const result=[];for(let i=0;i<sizes.length;i++){result.push(sizes[i]+\"-\"+colors[i]);}return result;}"
      ]
    }
  }
];
