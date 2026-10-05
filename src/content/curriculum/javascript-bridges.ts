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
    "tracePrompt": "เขียน argument และค่าที่ return ในการเรียกแต่ละครั้ง message เก็บชื่อ function หรือข้อความ?",
    "traceAnswer": "ประกาศ label ยังไม่ทำงาน · เรียกด้วย ดาว ทำให้ name เป็น ดาว แล้วคืน สวัสดี ดาว ไปเก็บใน message · เรียกด้วย เมฆ สร้างค่าของ name รอบใหม่ คืน สวัสดี เมฆ · message เก็บข้อความ ไม่ใช่ชื่อ function",
    "practicePrompt": "เติมเฉพาะส่วนที่หายให้ stamp(text) คืนข้อความ รับแล้ว: ตามด้วย text โดยยังไม่ log ใน function",
    "starter": "function stamp(text) {\n  // เติมการคืนค่า\n}\nconsole.log(stamp(\"ใบสมัคร\"));",
    "solution": "function stamp(text) {\n  return \"รับแล้ว: \" + text;\n}\nconsole.log(stamp(\"ใบสมัคร\"));",
    "buggy": "function double(value) {\n  console.log(value * 2);\n}\nconst result = double(4);\nconsole.log(result + 1);",
    "bugExplanation": "คาด 9 แต่ actual เป็น 8 แล้ว NaN: double แสดง 8 แต่ไม่มี return จึงได้ undefined; undefined + 1 เป็น NaN เปลี่ยน console.log ใน function เป็น return value * 2 แล้วรันซ้ำจะได้เพียง 9",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: ทำ function ที่รับอุณหภูมิ Celsius แล้วคืน Fahrenheit ตามกฎ C × 9 / 5 + 32 เลือกชื่อเอง ทดสอบ 0, 100 และ -40 ให้ผู้เรียกแสดงผล อธิบายว่ารับและคืนค่าอะไร",
      "rubric": [
        "คืน 32, 212, -40 ตามลำดับ",
        "ผู้เรียกใช้ค่าที่คืนได้ เช่นบวก 1 แล้วผลเปลี่ยน",
        "อธิบาย parameter/argument และไม่พิมพ์แทน return"
      ],
      "modelAnswer": "function fahrenheit(c) { return c * 9 / 5 + 32; }\nconsole.log(fahrenheit(0), fahrenheit(100), fahrenheit(-40));\nผล 32 212 -40; c เป็น parameter ส่วน 0/100/-40 เป็น argument ของแต่ละรอบ โค้ดคำนวณอื่นที่ตรงสูตรใช้ได้"
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
        "ประกาศ label ยังไม่ทำงาน",
        "เรียกด้วย ดาว ทำให้ name เป็น ดาว แล้วคืน สวัสดี ดาว ไปเก็บใน message",
        "เรียกด้วย เมฆ สร้างค่าของ name รอบใหม่ คืน สวัสดี เมฆ",
        "message เก็บข้อความ ไม่ใช่ชื่อ function"
      ],
      "pitfalls": [
        "คาด 9 แต่ actual เป็น 8 แล้ว NaN: double แสดง 8 แต่ไม่มี return จึงได้ undefined; undefined + 1 เป็น NaN เปลี่ยน console.log ใน function เป็น return value * 2 แล้วรันซ้ำจะได้เพียง 9"
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
    "tracePrompt": "ไล่ค่า i ที่ตรวจทุกครั้งรวมครั้งที่หยุด ถ้าเปลี่ยน <= เป็น < จะหายบรรทัดใด?",
    "traceAnswer": "เริ่ม i=1 ตรวจจริง พิมพ์1 แล้วเพิ่ม2 · ตรวจ2จริง พิมพ์2 แล้วเพิ่ม3 · ตรวจ3จริง พิมพ์3 แล้วเพิ่ม4 · ตรวจ4เท็จออก พิมพ์จบ ถ้า < จะไม่พิมพ์3",
    "practicePrompt": "เติมเงื่อนไขและขั้นเพิ่มใน starter ให้พิมพ์ ชั้น 2, ชั้น 3, ชั้น 4 ทีละบรรทัด จากนั้นเปลี่ยน start เป็น 5 ให้ไม่มีบรรทัดชั้น",
    "starter": "const start = 2;\nconst end = 4;\nfor (let floor = start; false; floor = floor) {\n  console.log(\"ชั้น \" + floor);\n}",
    "solution": "const start = 2;\nconst end = 4;\nfor (let floor = start; floor <= end; floor = floor + 1) {\n  console.log(\"ชั้น \" + floor);\n}",
    "buggy": "for (let i = 1; i < 3; i = i + 1) {\n  console.log(i);\n}",
    "bugExplanation": "คาด1,2,3 แต่ได้1,2 เพราะ < ไม่รวม3 แก้เป็น <= แล้วตรวจอีกกรณีเมื่อปลายเป็น1 ควรมีเพียง1บรรทัด",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: แสดงหมายเลขนับถอยหลังจากจำนวนวินาทีที่กำหนดถึง1 แล้วแสดง พร้อม เริ่มจาก5 อีกครั้งจาก0 และจาก1 ห้ามพิมพ์หมายเลขคงที่ อธิบายเหตุผลที่หยุด",
      "rubric": [
        "5 ให้5,4,3,2,1,พร้อม",
        "0 ให้พร้อมอย่างเดียว;1ให้1,พร้อม",
        "เปลี่ยนจำนวนเริ่มได้และตัวนับลดลงจนเงื่อนไขเท็จ"
      ],
      "modelAnswer": "const seconds = 5;\nfor (let left = seconds; left >= 1; left = left - 1) { console.log(left); }\nconsole.log(\"พร้อม\");\nเมื่อ0 เงื่อนไขแรกเท็จ เมื่อ1ทำหนึ่งรอบ ทางเลือก while ใช้ได้เมื่อเรียนแล้ว"
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
        "เริ่ม i=1 ตรวจจริง พิมพ์1 แล้วเพิ่ม2",
        "ตรวจ2จริง พิมพ์2 แล้วเพิ่ม3",
        "ตรวจ3จริง พิมพ์3 แล้วเพิ่ม4",
        "ตรวจ4เท็จออก พิมพ์จบ ถ้า < จะไม่พิมพ์3"
      ],
      "pitfalls": [
        "คาด1,2,3 แต่ได้1,2 เพราะ < ไม่รวม3 แก้เป็น <= แล้วตรวจอีกกรณีเมื่อปลายเป็น1 ควรมีเพียง1บรรทัด"
      ],
      "checks": [
        {
          "question": "เงื่อนไขตรวจหลังหรือก่อนทำรอบ?",
          "answer": "ก่อน จึงเป็นศูนย์รอบได้"
        },
        {
          "question": "i=1 และ i<=1 ทำกี่รอบ?",
          "answer": "หนึ่งรอบ หลังเพิ่มเป็น2เงื่อนไขเท็จ"
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
        "พิมพ์ ชั้น 2 / ชั้น 3 / ชั้น 4",
        "ตรวจเอง: start=5,end=4 ไม่มี output; ลูปต้องหยุด"
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
    "tracePrompt": "ทำตาราง i,sum ก่อนและหลังแต่ละรอบ sum ควรประกาศตรงไหน?",
    "traceAnswer": "ก่อนลูป sum=0 · i=1 sum=0+1=1 · i=2 sum=1+2=3 · i=3 sum=3+3=6 · ออกจากลูป sumยัง6 เพราะประกาศนอกลูป",
    "practicePrompt": "เขียน sumTo(n) คืนผลรวมจำนวนเต็ม1ถึงn สมมติ n เป็นจำนวนเต็มไม่ติดลบ เริ่มจาก starter แค่ชื่อ function แล้วตรวจ0,1,4",
    "starter": "function sumTo(n) {\n  // เขียนการคำนวณเอง\n}",
    "solution": "function sumTo(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i = i + 1) {\n    sum = sum + i;\n  }\n  return sum;\n}",
    "buggy": "function sumTo(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i = i + 1) {\n    sum = sum + i;\n    return sum;\n  }\n}",
    "bugExplanation": "คาดsumTo(4)=10 แต่ได้1 เพราะ return ออกจากfunctionรอบแรก ย้าย return หลังลูปและตรวจ n=0 ด้วย มิฉะนั้นอาจได้ undefined",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: เครื่องแจกคูปองแจก2ใบในวันที่1,4ใบวันที่2,6ใบวันที่3 เพิ่มวันละ2ใบ เขียนโปรแกรมรับจำนวนวันผ่านตัวแปร แล้วแสดงยอดแจกทั้งหมด ทดลอง0,1,3วัน เลือกวิธีเองและอธิบาย",
      "rubric": [
        "ผล0,2,12ตามจำนวนวัน",
        "ไม่พิมพ์คำตอบคงที่และเปลี่ยนจำนวนวันได้",
        "คำอธิบายแสดงวิธีสะสมหรือสูตรที่เลือกและตรวจขอบ"
      ],
      "modelAnswer": "const days=3; let coupons=0; for(let day=1;day<=days;day=day+1){coupons=coupons+day*2;} console.log(coupons);\n0วันไม่เข้าลูปได้0;1วันได้2;3วันสะสม2+4+6=12 สูตร days*(days+1) ก็ถูก ไม่ต้องใช้ลูปใน assessment"
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
        "ก่อนลูป sum=0",
        "i=1 sum=0+1=1",
        "i=2 sum=1+2=3",
        "i=3 sum=3+3=6",
        "ออกจากลูป sumยัง6 เพราะประกาศนอกลูป"
      ],
      "pitfalls": [
        "คาดsumTo(4)=10 แต่ได้1 เพราะ return ออกจากfunctionรอบแรก ย้าย return หลังลูปและตรวจ n=0 ด้วย มิฉะนั้นอาจได้ undefined"
      ],
      "checks": [
        {
          "question": "ถ้า sum=0 อยู่ในลูปจะจำค่าเดิมหรือไม่?",
          "answer": "ไม่ แต่ละรอบเริ่มใหม่"
        },
        {
          "question": "returnในรอบแรกส่งผลอย่างไร?",
          "answer": "functionจบ ไม่ทำรอบถัดไป"
        }
      ],
      "recap": [
        "แยกตัวนับรอบกับยอดสะสม เลือกค่าเริ่มและอธิบายผลหลังแต่ละรอบ"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "ต้องมีค่าที่จำผลจากรอบก่อน และเริ่มที่0",
        "ประกาศ sum ก่อน for วน1ถึงnแล้วเพิ่ม i เข้า sum",
        "let sum=0; for(let i=1;i<=n;i=i+1){sum=sum+i;} return sum;"
      ],
      "acceptance": [
        "sumTo(0)=0,sumTo(1)=1,sumTo(4)=10",
        "returnหลังลูปและอธิบายผลทีละรอบได้"
      ],
      "solutionNotes": [
        "เลือก0เพราะเป็นค่าเริ่มของผลรวม ไม่ใช่คำตอบพิเศษของทุกโจทย์",
        "สูตร n*(n+1)/2 ถูกสำหรับบริบทนี้ แต่กิจกรรมฝึกนี้ให้ทดลองลูปก่อน เปรียบเทียบสองวิธีได้หลังทำ"
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
    "explanation": "array คือรายการค่ามีลำดับ สร้างด้วย [ค่าแรก, ค่าถัดไป] คั่นด้วย , index คือตำแหน่งเริ่ม0 เช่น scores[0] อ่านตัวแรก .length คือจำนวนตัว ดังนั้นตำแหน่งสุดท้ายคือ length-1 ตำแหน่งเกินขอบได้ undefined ไม่ใช่0",
    "example": "const scores = [4, 7, 2];\nconsole.log(scores[0], scores.length);\nlet total = 0;\nfor (const score of scores) {\n  total = total + score;\n}\nconsole.log(total);\nconsole.log(scores[3]);",
    "expectedOutput": "4 3\n13\nundefined",
    "tracePrompt": "เขียน index และค่าของทั้งสามตัว ไล่ total และบอกว่าทำไม scores[3] ไม่ใช่2",
    "traceAnswer": "index0คือ4 index1คือ7 index2คือ2 · totalเริ่ม0 ผ่าน4เป็น4 ผ่าน7เป็น11 ผ่าน2เป็น13 · length=3แต่indexสุดท้าย=2 ดังนั้นscores[3]ได้undefined",
    "practicePrompt": "เขียน countAbove(values, limit) คืนจำนวนค่าที่มากกว่า limit ไม่รวมเท่ากัน สมมติรายการมีแต่ตัวเลข ห้ามแก้รายการต้นฉบับ starter มีแค่ชื่อให้เลือกวิธีวนเอง",
    "starter": "function countAbove(values, limit) {\n  // คืนจำนวนค่าที่มากกว่า limit\n}",
    "solution": "function countAbove(values, limit) {\n  let count = 0;\n  for (const value of values) {\n    if (value > limit) count = count + 1;\n  }\n  return count;\n}",
    "buggy": "const prices = [10, 20];\nlet total = 0;\nfor (let i = 0; i <= prices.length; i = i + 1) {\n  total = total + prices[i];\n}\nconsole.log(total);",
    "bugExplanation": "คาด30แต่actualNaN เพราะi=2ยังผ่าน <= และprices[2]ได้undefined;30+undefinedเป็นNaN เปลี่ยนเป็นi<prices.length แล้วตรวจรายการว่างได้0",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: เซนเซอร์ส่ง [18,25,25,31] สร้างโปรแกรมแสดงจำนวนค่าที่อยู่ในช่วง20ถึง30รวมขอบ ทดลอง [] และ [20,30,19,31] เลือกชื่อและวิธีเอง ไม่ต้องใช้ countAbove",
      "rubric": [
        "ผล2,0,2ตามสามรายการ",
        "รวม20และ30 แต่ไม่รวม19หรือ31",
        "ไม่แก้ข้อมูลต้นฉบับและอธิบายขอบพร้อมผลทดลอง"
      ],
      "modelAnswer": "function inRange(readings){let count=0;for(const reading of readings){if(reading>=20 && reading<=30)count=count+1;}return count;}\nconsole.log(inRange([18,25,25,31])); //2\nconsole.log(inRange([])); //0\nconsole.log(inRange([20,30,19,31])); //2\nใช้ filter หลังเรียนก็ถูก assessment ไม่บังคับลูป"
    },
    "lesson": {
      "hook": "ข้อมูลหลายชิ้นควรอยู่ในรายการเดียว แต่ต้องรู้ตำแหน่งก่อนใช้ map/filter หรือเลือกของตามงบ",
      "explain": [
        {
          "heading": "วงเล็บเหลี่ยมและตำแหน่ง",
          "text": [
            "array คือรายการค่ามีลำดับ สร้างด้วย [ค่าแรก, ค่าถัดไป] คั่นด้วย , index คือตำแหน่งเริ่ม0 เช่น scores[0] อ่านตัวแรก .length คือจำนวนตัว ดังนั้นตำแหน่งสุดท้ายคือ length-1 ตำแหน่งเกินขอบได้ undefined ไม่ใช่0",
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
        "index0คือ4 index1คือ7 index2คือ2",
        "totalเริ่ม0 ผ่าน4เป็น4 ผ่าน7เป็น11 ผ่าน2เป็น13",
        "length=3แต่indexสุดท้าย=2 ดังนั้นscores[3]ได้undefined"
      ],
      "pitfalls": [
        "คาด30แต่actualNaN เพราะi=2ยังผ่าน <= และprices[2]ได้undefined;30+undefinedเป็นNaN เปลี่ยนเป็นi<prices.length แล้วตรวจรายการว่างได้0"
      ],
      "checks": [
        {
          "question": "รายการมี3ตัว indexสุดท้ายคืออะไร?",
          "answer": "2 เพราะเริ่มนับ0"
        },
        {
          "question": "for...ofของ [] ทำกี่รอบ?",
          "answer": "0รอบและค่าตัวสะสมนอกลูปยังเป็นค่าเริ่ม"
        }
      ],
      "recap": [
        "ใช้ index และ length อ่านรายการ อธิบายขอบ และรวมค่าด้วย for...of โดยยังไม่ใช้ callbacks"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "แยกจำนวนตัวที่ผ่านออกจากค่าของสมาชิก",
        "สะสมcountก่อนลูป เพิ่มเฉพาะvalue>limit",
        "let count=0; for(const value of values){if(value>limit)count=count+1;} return count;"
      ],
      "acceptance": [
        "[2,5,5,9],limit5ได้1 ไม่รวมเท่ากัน",
        "รายการว่างได้0 ไม่มีสมาชิกถูกแก้"
      ],
      "solutionNotes": [
        "ใช้for...ofเพราะต้องการค่าไม่ต้องการindex",
        "forตัวนับก็ถูกถ้าใช้ i<length; อย่า <=length"
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
    "explanation": "const double = function(value) { return value * 2; }; เก็บค่า function ไว้ในชื่อ double ต้องประกาศก่อนใช้ ต่างจาก function declaration ที่เตรียมชื่อให้ก่อนรัน; double คือค่า function ส่วน double(3) คือเรียกและได้6",
    "example": "const double = (value) => value * 2;\nfunction apply(value, transform) {\n  return transform(value);\n}\nconsole.log(apply(3, double));\nconsole.log(double(4));",
    "expectedOutput": "6\n8",
    "tracePrompt": "apply ได้ argument อะไรบ้าง ทำไมเขียน double โดยไม่มี () ใน argument ที่สอง?",
    "traceAnswer": "doubleเก็บfunctionยังไม่เรียก · apply(3,double)ส่ง3และfunctionเข้าไป · transform(value)เรียกdoubleด้วย3 คืน6แล้วapplyคืน6 · double(4)คืน8; ถ้าส่งdouble(3)จะส่ง6ไม่ใช่function",
    "practicePrompt": "เติม arrow ในชื่อ triple ให้ apply(4,triple) ได้12 จากนั้นเขียนอีกรูปแบบที่มี { } และตรวจว่า output เท่าเดิม",
    "starter": "const triple = (value) => 0;\nfunction apply(value, transform) { return transform(value); }\nconsole.log(apply(4, triple));",
    "solution": "const triple = (value) => value * 3;\nfunction apply(value, transform) { return transform(value); }\nconsole.log(apply(4, triple));",
    "buggy": "const triple = (value) => { value * 3; };\nconsole.log(triple(4));",
    "bugExplanation": "คาด12แต่ได้undefined เพราะ arrow มี { } ไม่มี implicit return ต้อง return value*3 หรือเอา { } ออก แล้วลอง4กับ0",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: โปรแกรมมี function ใช้กฎแปลงค่าที่รับมา สร้างกฎลดราคา10บาทกับกฎเพิ่มค่าห่อ5บาท ให้เลือกกฎแล้วใช้กับราคา40โดยไม่แก้ตัวเรียกกลาง ส่งผล30และ45 อธิบายว่าตรงไหนส่ง function ตรงไหนเรียก",
      "rubric": [
        "กฎสองแบบได้30และ45",
        "ส่วนกลางรับกฎเป็นค่าfunction ไม่รับผลตัวเลขแทน",
        "อธิบายการจับคู่parameterและการเรียกได้"
      ],
      "modelAnswer": "function applyPrice(price, rule){return rule(price);}\nconst discount=(price)=>price-10;\nconst wrap=(price)=>price+5;\nconsole.log(applyPrice(40,discount),applyPrice(40,wrap));\nผล30 45; ส่งdiscount/wrapเข้าrule แล้วส่วนกลางเรียกrule(price) ใช้function declarationแทนarrowก็ถูก"
    },
    "lesson": {
      "hook": "array.map รับ function ไปทำงานกับแต่ละค่า จึงต้องรู้ความต่างระหว่างส่ง function กับส่งผลของการเรียกก่อน",
      "explain": [
        {
          "heading": "function เป็นค่า",
          "text": [
            "const double = function(value) { return value * 2; }; เก็บค่า function ไว้ในชื่อ double ต้องประกาศก่อนใช้ ต่างจาก function declaration ที่เตรียมชื่อให้ก่อนรัน; double คือค่า function ส่วน double(3) คือเรียกและได้6",
            "parameter รับ function ได้เหมือนรับตัวเลข function ที่ส่งให้ผู้อื่นเรียกเรียกว่า callback ไม่ใช่การทำ async เสมอ"
          ]
        },
        {
          "heading": "arrow รูปแบบสองอย่าง",
          "text": [
            "const double = (value) => value * 2; เป็น arrow function วงเล็บรับ parameter => คั่นกับการทำงาน ด้านขวาเป็นนิพจน์เดียวจึงคืนค่าอัตโนมัติ",
            "ถ้าใช้ block { } ต้องเขียน return เอง เช่น (value) => { return value * 2; } สำหรับ parameter หนึ่งตัวละวงเล็บได้ แต่เริ่มใช้วงเล็บให้เห็นโครงชัด arrow กับ function มี this ต่างกัน ไม่ใช้แทน methods ที่อาศัย this ในบทนี้"
          ]
        }
      ],
      "walkthrough": [
        "doubleเก็บfunctionยังไม่เรียก",
        "apply(3,double)ส่ง3และfunctionเข้าไป",
        "transform(value)เรียกdoubleด้วย3 คืน6แล้วapplyคืน6",
        "double(4)คืน8; ถ้าส่งdouble(3)จะส่ง6ไม่ใช่function"
      ],
      "pitfalls": [
        "คาด12แต่ได้undefined เพราะ arrow มี { } ไม่มี implicit return ต้อง return value*3 หรือเอา { } ออก แล้วลอง4กับ0"
      ],
      "checks": [
        {
          "question": "fn กับ fn() ต่างกันอย่างไร?",
          "answer": "fnคือค่าfunction fn()เรียกแล้วใช้ค่าที่คืน"
        },
        {
          "question": "arrowมี { } ต้องทำอะไรเพื่อคืนค่า?",
          "answer": "เขียนreturnชัดเจน"
        }
      ],
      "recap": [
        "อ่าน function ที่เก็บในตัวแปร แปลงเป็น arrow แบบง่าย และส่งเป็น argument โดยยังไม่ใช้ reduce"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "arrowแบบนิพจน์คืนค่าด้านขวาโดยอัตโนมัติ",
        "เปลี่ยน0เป็น value * 3",
        "const triple = (value) => value * 3; อีกแบบ (value) => { return value * 3; }"
      ],
      "acceptance": [
        "output12 และรูปแบบblockต้องreturn",
        "เปลี่ยนargumentเป็น0ได้0 ตรวจเองว่าผลไม่ถูกเขียนคงที่"
      ],
      "solutionNotes": [
        "ส่งtripleโดยไม่มีวงเล็บเพราะapplyต้องเรียกเอง",
        "function expression ก็ส่งต่อได้ arrowไม่จำเป็นสำหรับcallbackทุกอัน"
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
    "tracePrompt": "แต่ละรอบทำคำสั่งไหนบ้าง ทำไม8ไม่ปรากฏ และถ้าเปลี่ยนbreakเป็นcontinueผลเปลี่ยนอย่างไร?",
    "traceAnswer": "3ไม่ติดลบและไม่0จึงพิมพ์3 · -1เข้ากิ่งcontinueข้ามlog · 2พิมพ์2 · 0เข้าbreakออกลูปไม่อ่าน8 · ถ้า0ใช้continueจะข้าม0แล้วพิมพ์8ด้วย",
    "practicePrompt": "เติมคำสั่งให้โปรแกรมอ่าน [4,2,0,9] แล้วพิมพ์เฉพาะค่าก่อน0 ทำไมใช้continueอย่างเดียวไม่ได้?",
    "starter": "const values = [4, 2, 0, 9];\nfor (const value of values) {\n  if (value === 0) { /* เติมที่นี่ */ }\n  console.log(value);\n}",
    "solution": "const values = [4, 2, 0, 9];\nfor (const value of values) {\n  if (value === 0) break;\n  console.log(value);\n}",
    "buggy": "let tickets = 2;\nwhile (tickets > 0) {\n  console.log(tickets);\n}",
    "bugExplanation": "คาด2,1แล้วจบ แต่actualพิมพ์2ซ้ำจน runner timeout เพราะticketsไม่ลด เพิ่ม tickets=tickets-1 หลังlog แล้วตรวจค่าเริ่ม0ด้วย",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: เครื่องอ่านยอดบริจาคยอมรับค่าบวก ข้ามค่าติดลบ และหยุดอ่านเมื่อพบ0 แสดงผลรวมก่อนหยุด ทดลอง [5,-2,3,0,20],[],[0,9] เลือกวิธีเอง",
      "rubric": [
        "ได้8,0,0ตามสามกรณี",
        "ไม่รวมค่าติดลบหรือค่าหลัง0",
        "อธิบายทางหยุดและทางข้ามพร้อมผลจริง"
      ],
      "modelAnswer": "function donated(values){let total=0;for(const value of values){if(value===0)break;if(value<0)continue;total=total+value;}return total;}\nconsole.log(donated([5,-2,3,0,20])); //8\n[]และ[0,9]คืน0 ใช้whileหรือifแทนcontinueได้เมื่อ behaviorตรง"
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
            "ตัวอย่างนี้ข้ามค่าติดลบ แต่เมื่อเจอ0หยุดทั้งหมด แม้หลัง0ยังมีค่าบวก; ถ้าไม่ต้องการข้ามหรือหยุดใช้ if ธรรมดาได้"
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
        "3ไม่ติดลบและไม่0จึงพิมพ์3",
        "-1เข้ากิ่งcontinueข้ามlog",
        "2พิมพ์2",
        "0เข้าbreakออกลูปไม่อ่าน8",
        "ถ้า0ใช้continueจะข้าม0แล้วพิมพ์8ด้วย"
      ],
      "pitfalls": [
        "คาด2,1แล้วจบ แต่actualพิมพ์2ซ้ำจน runner timeout เพราะticketsไม่ลด เพิ่ม tickets=tickets-1 หลังlog แล้วตรวจค่าเริ่ม0ด้วย"
      ],
      "checks": [
        {
          "question": "continueในforทำอะไรต่อ?",
          "answer": "ไปขั้นเพิ่มค่าแล้วตรวจเงื่อนไขรอบใหม่"
        },
        {
          "question": "whileเงื่อนไขจริงตลอดเกิดอะไร?",
          "answer": "ไม่จบ ต้องมีการเปลี่ยนค่าหรือทางbreakที่เข้าถึงได้"
        }
      ],
      "recap": [
        "อธิบายเงื่อนไขก่อนแต่ละรอบและเลือกหยุดทั้งลูปหรือข้ามเฉพาะรอบได้"
      ],
      "traceHint": "จดค่าก่อนและหลังแต่ละคำสั่ง เปรียบผลทำนายกับผลจริงก่อนแก้",
      "practiceHints": [
        "เมื่อเจอ0ต้องเลิกอ่านรายการทั้งหมด",
        "continueยังอ่าน9ต่อ จึงต้องbreak",
        "if (value === 0) break;"
      ],
      "acceptance": [
        "พิมพ์4และ2เท่านั้น",
        "ลอง0เป็นตัวแรกไม่มีoutput และไม่มี0พิมพ์ทุกตัว"
      ],
      "solutionNotes": [
        "breakตรงกับเลิกทั้งรายการ ไม่ใช่ข้ามเฉพาะค่าศูนย์",
        "จะใช้whileก็ได้แต่ต้องดูindexและขอบด้วย"
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
    "tracePrompt": "เขียน day,slot ของทุกครั้งที่log ทำไมไม่ได้แค่จันทร์:เช้าและอังคาร:เย็น?",
    "traceAnswer": "day=จันทร์ชั้นในเริ่มเช้าแล้วเย็น · day=อังคารชั้นในเริ่มเช้าใหม่แล้วเย็น · ไม่ใช่จับคู่ตามindexเดียวกัน จึงได้4คู่",
    "practicePrompt": "จาก starter สร้างรายการรหัสทุกคู่ของขนาด S,M กับสี blue,red โดย push ข้อความ ขนาด-สี เข้า result แล้วคืน result",
    "starter": "function variants(sizes, colors) {\n  const result = [];\n  // สร้างคู่เอง\n  return result;\n}",
    "solution": "function variants(sizes, colors) {\n  const result = [];\n  for (const size of sizes) {\n    for (const color of colors) {\n      result.push(size + \"-\" + color);\n    }\n  }\n  return result;\n}",
    "buggy": "const result = [];\nfor (const size of [\"S\", \"M\"]) { result.push(size); }\nfor (const color of [\"blue\", \"red\"]) { result.push(color); }\nconsole.log(result);",
    "bugExplanation": "คาด4คู่แต่ได้ [\"S\",\"M\",\"blue\",\"red\"] เพราะสองลูปแยกไม่จับคู่ ย้ายลูปสีเข้าไปข้างในลูปขนาด แล้วเพิ่มsize+\"-\"+color",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมิน — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด ผลทดลอง และคำอธิบาย ถ้ายังทำไม่สำเร็จส่งสิ่งที่ลองและ error ได้: ห้อง A,B,C มีรอบเช้าและบ่าย สร้างข้อความจองทุกคู่ให้แสดงห้องละเช้าก่อนบ่าย เปลี่ยนรายการรอบเป็น[]แล้วตรวจไม่มีคู่ เลือกโครงเอง",
      "rubric": [
        "ได้6คู่และลำดับห้องAครบก่อนBก่อนC",
        "รายการรอบว่างไม่มีคู่",
        "อธิบายจำนวนครั้งและค่าที่แต่ละลูปอ่าน"
      ],
      "modelAnswer": "const rooms=[\"A\",\"B\",\"C\"]; const times=[\"เช้า\",\"บ่าย\"];for(const room of rooms){for(const time of times){console.log(room+\":\"+time);}}\nA:เช้า,A:บ่าย,B:เช้า,B:บ่าย,C:เช้า,C:บ่าย คนละบรรทัด times=[]ไม่มีoutput"
    },
    "lesson": {
      "hook": "เมื่อจับคู่วันกับช่วงเวลา ต้องทำทุกรายการข้างในสำหรับแต่ละรายการข้างนอก ไม่ใช่วนสองรายการแยกกัน",
      "explain": [
        {
          "heading": "เริ่มจากคู่เล็ก",
          "text": [
            "ลูปซ้อนคือลูปหนึ่งอยู่ใน block ของอีกลูป outer loop คือชั้นนอก inner loop คือชั้นใน เมื่อชั้นนอกเปลี่ยนค่า ชั้นในเริ่มอ่านรายการใหม่ตั้งแต่ตัวแรก",
            "2วันกับ2ช่วงมี2×2=4คู่ แต่ถ้ารายการใดว่างไม่มีคู่ ระวังชื่อซ้ำที่บดบังชื่อชั้นนอก"
          ]
        }
      ],
      "walkthrough": [
        "day=จันทร์ชั้นในเริ่มเช้าแล้วเย็น",
        "day=อังคารชั้นในเริ่มเช้าใหม่แล้วเย็น",
        "ไม่ใช่จับคู่ตามindexเดียวกัน จึงได้4คู่"
      ],
      "pitfalls": [
        "คาด4คู่แต่ได้ [\"S\",\"M\",\"blue\",\"red\"] เพราะสองลูปแยกไม่จับคู่ ย้ายลูปสีเข้าไปข้างในลูปขนาด แล้วเพิ่มsize+\"-\"+color"
      ],
      "checks": [
        {
          "question": "3รายการนอกกับ2รายการในทำlogกี่ครั้ง?",
          "answer": "6ครั้ง ถ้าไม่break"
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
        "ต้องทำทุกสีใหม่ในทุกขนาด",
        "ลูปcolorsอยู่ในลูปsizesและpushหนึ่งคู่ต่อรอบชั้นใน",
        "for(const size of sizes){for(const color of colors){result.push(size+\"-\"+color);}}"
      ],
      "acceptance": [
        "S,Mกับblue,redได้S-blue,S-red,M-blue,M-red",
        "ถ้าขนาดหรือสีว่างต้องคืน[]"
      ],
      "solutionNotes": [
        "ใช้ชื่อsizeกับcolorคนละชื่อทำให้ไล่ได้ชัด",
        "ลำดับคู่เป็นส่วนของโจทย์นี้จึงวนขนาดชั้นนอก สีชั้นใน"
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
