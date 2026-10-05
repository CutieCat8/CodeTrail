import type { RichLesson } from "@/types/curriculum";

export const typescriptLessons: Record<string, RichLesson> = {
  "ts-why": {
    hook: "โปรเจกต์ Planner โตขึ้นเรื่อย ๆ วันหนึ่งซีเปลี่ยนชื่อ field จาก joined เป็น joinedCount แล้วต้องไล่หาทุกที่ที่ใช้ชื่อเดิมเอง พลาดไปสองจุด หน้าเว็บแสดง NaN ในวันที่เพื่อนเปิดใช้ TypeScript จะชี้ทุกจุดที่ต้องแก้ให้ตั้งแต่ก่อนรัน",
    analogy: {
      title: "tsc เหมือนคนตรวจแบบก่อนส่งงานโยธา",
      text: [
        "ก่อนสร้างบ้าน วิศวกรตรวจแบบว่าคานรับน้ำหนักพอไหม ประตูกว้างพอไหม ปัญหาที่เจอบนกระดาษแก้ง่ายกว่าเจอตอนสร้างเสร็จแล้วมาก",
        "tsc ตรวจโค้ดก่อนรันแบบเดียวกัน แต่ตรวจได้เฉพาะสิ่งที่อยู่ในแบบ ถ้าวัสดุที่ส่งมาจริง (ข้อมูลจากผู้ใช้หรือ API) ไม่ตรงสเปก ต้องมีคนตรวจหน้างานอีกชั้น",
      ],
      mapping: [
        ["แบบบ้านพร้อมสเปกวัสดุ", "โค้ด TypeScript ที่มี type annotation"],
        ["วิศวกรตรวจแบบ", "tsc ตรวจ type ตอน compile"],
        ["บ้านที่สร้างเสร็จ", "JavaScript ที่รันจริงหลังลบ type ออก"],
        ["วัสดุที่ส่งมาหน้างาน", "ข้อมูลจริงตอน runtime เช่น input หรือ JSON จาก API"],
      ],
      limits: "วิศวกรอาจตรวจพลาดหรือยอมผ่อนเงื่อนไขได้ตามดุลยพินิจ แต่ tsc ตรวจตามกติกาตายตัวเสมอ และถ้าเราใช้ any หรือ as เพื่อเลี่ยงการตรวจ tsc ก็จะเชื่อเราโดยไม่ถามซ้ำ",
    },
    explain: [
      {
        heading: "1) TypeScript = JavaScript + type ที่ถูกตรวจก่อนรัน",
        text: [
          "โค้ด JavaScript ทุกบรรทัดเป็น TypeScript ได้ สิ่งที่เพิ่มคือการเขียนชนิดกำกับ เช่น capacity: number และการให้ compiler ตรวจว่าใช้ค่าถูกชนิด",
          "ผลของการตรวจคือ error ตั้งแต่ตอนเขียน (editor ขีดเส้นแดง) หรือตอนรัน tsc ไม่ใช่ตอนผู้ใช้กดปุ่ม",
        ],
      },
      {
        heading: "2) type หายไปตอนรัน",
        text: [
          "tsc ลบ type ทิ้งเหลือ JavaScript ธรรมดา browser และ Node ไม่รู้จัก type ของเราเลย",
          "ดังนั้น TypeScript ป้องกันข้อมูลผิดชนิดที่มาจากภายนอกไม่ได้เอง ต้องตรวจตอน runtime (จะเรียนในบท Promise<T> และ unknown)",
        ],
        code: "const price: number = 120;\nconsole.log(typeof price);",
        output: "number",
      },
      {
        heading: "3) เครื่องมือ: tsc, editor และ Node",
        text: [
          "editor อย่าง VS Code ใช้ TypeScript ตรวจให้ทันทีขณะพิมพ์ npx tsc --noEmit ตรวจทั้งโปรเจกต์โดยไม่สร้างไฟล์",
          "Node 22.18 ขึ้นไปรันไฟล์ .ts ได้โดยลบ type ทิ้ง แต่ไม่ตรวจ type — “รันได้” จึงไม่ได้แปลว่า “type ถูก” เว็บไซต์นี้รัน TypeScript ใน browser ไม่ได้ บทนี้จึงฝึกตรวจในเครื่อง",
        ],
      },
    ],
    walkthrough: [
      "tsc อ่าน totalSeats แล้วจำสัญญาว่ารับ number สองตัวและคืน number",
      "totalSeats(8, 2) ตรงสัญญา จึงผ่าน และตอนรันได้ 10",
      "บรรทัดที่ comment ไว้ส่ง \"8\" ซึ่งเป็น string ถ้าเอา comment ออก tsc จะหยุดก่อนรันพร้อมบอกตำแหน่งและเหตุผล",
      "หลังผ่านการตรวจ tsc ลบ : number ทิ้ง ได้ JavaScript ที่รันเหมือนเดิมทุกอย่าง",
    ],
    pitfalls: [
      "คิดว่า TypeScript ตรวจข้อมูลตอน runtime: type หายไปหลัง compile ข้อมูลจากภายนอกต้องตรวจเอง",
      "รันด้วย node index.ts แล้วคิดว่า type ถูก: Node ลบ type โดยไม่ตรวจ ต้องรัน tsc --noEmit แยก",
      "ใช้ any เพื่อให้ error หายไป: เท่ากับปิดการตรวจ ปัญหายังอยู่แค่มองไม่เห็น",
    ],
    checks: [
      { question: "ถ้า tsc แจ้ง error แต่เราก็ยังรันด้วย Node ได้ แปลว่าอะไร", answer: "Node แค่ลบ type แล้วรัน JavaScript ที่ได้ — error ของ tsc ยังเป็นบั๊กที่อาจเกิดจริงตอน runtime" },
      { question: "TypeScript ช่วยอะไรไม่ได้ในกรณีที่ API ส่ง capacity มาเป็น \"8\"", answer: "ช่วยไม่ได้เอง เพราะข้อมูลมาตอน runtime ซึ่งไม่มี type แล้ว ต้องเขียนโค้ดตรวจข้อมูลก่อนใช้" },
    ],
    recap: [
      "TypeScript = JavaScript + type ที่ตรวจตอน compile",
      "type หายไปตอนรัน ข้อมูลภายนอกต้องตรวจเอง",
      "ตรวจด้วย tsc --noEmit; Node รัน .ts ได้แต่ไม่ตรวจ",
    ],
    traceHint: "ข้างแต่ละบรรทัด เขียนสองคอลัมน์: “tsc ว่าอย่างไร” และ “ตอนรันได้อะไร” แล้วสังเกตว่าสองคอลัมน์นี้ไม่จำเป็นต้องตรงกันเมื่อเลี่ยงการตรวจ",
    practiceHints: [
      "ทำตามลำดับ: ติดตั้ง typescript → สร้าง tsconfig.json → เขียนโค้ดใน src/index.ts → npx tsc -p .",
      "เพิ่ม type ให้ parameter ทั้งสองตัวและ return type ของ function แล้วเขียนให้คืนข้อความจากสองค่า",
      "function formatPrice(amount: number, currency: string): string { return amount + \" \" + currency; } แล้วลองเรียก formatPrice(\"120\", \"THB\") เพื่อดู error ก่อนลบบรรทัดนั้น",
    ],
    acceptance: [
      "ตรวจเอง: โฟลเดอร์ ts-lab มี typescript ใน devDependencies และ tsconfig.json ที่ strict: true",
      "ตรวจเอง: npx tsc -p . ผ่านโดยไม่มี error",
      "ตรวจเอง: เมื่อส่ง string แทน amount tsc แจ้ง error ที่บรรทัดนั้น",
    ],
    solutionNotes: [
      "return type : string ทำให้ tsc เตือนถ้าวันหนึ่งเผลอ return ตัวเลข",
      "เว็บนี้รัน TypeScript ไม่ได้ จึงตรวจในเครื่อง ติดตั้ง typescript ในโปรเจกต์ก่อน (npm install --save-dev typescript) แล้ว npx tsc จะใช้ตัวที่ติดตั้ง — ถ้ายังไม่ติดตั้ง npx tsc อาจไปดึง package ชื่อ tsc ที่ไม่ใช่ TypeScript",
      "tsc -p . ใช้ tsconfig.json ในโฟลเดอร์ (strict, target ES2022) ส่วน tsc index.ts แบบระบุไฟล์จะไม่อ่าน tsconfig และไม่เปิด strict",
    ],
    reflection: [
      "นึกถึงบั๊กจากโปรเจกต์เก่าหนึ่งตัวที่ TypeScript น่าจะจับได้ และอีกหนึ่งตัวที่ TypeScript ช่วยไม่ได้",
    ],
    extension: "เปิดไฟล์ JavaScript จาก Planner M1 ใน VS Code แล้วเพิ่ม // @ts-check บรรทัดแรก ดูว่า editor เริ่มเตือนอะไรบ้างโดยไม่ต้องเปลี่ยนเป็น .ts",
  },
  "ts-basic-types": {
    hook: "ทีมหนึ่งเพิ่ง “ย้ายไป TypeScript” แต่ทุกไฟล์มี any เต็มไปหมด สุดท้าย error แบบเดิมก็ยังเกิด เพราะ any ปิดการตรวจ บทนี้ฝึกเลือกว่าเมื่อไรให้ TypeScript เดาให้ เมื่อไรต้องเขียนเอง และเมื่อไม่รู้ชนิดควรใช้อะไร",
    explain: [
      {
        heading: "1) inference: ปล่อยให้ TypeScript เดาเมื่อชัด",
        text: [
          "const title = \"Hiking\" รู้ทันทีว่าเป็น string (และเพราะเป็น const จึงแคบลงเป็นค่าตายตัว \"Hiking\") let joined = 3 เป็น number",
          "เขียน annotation เมื่อต้องการประกาศสัญญาให้ชัด เช่นตัวแปรที่อาจเป็นข้อความหรือว่าง: let note: string | null = null; (ตัวแปร let ที่เริ่มเป็น null โดยไม่ระบุ type TypeScript อาจ infer เปลี่ยนตามค่าที่ assign ทีหลังได้ แต่ annotation ทำให้ผู้อ่านและส่วนอื่นของโค้ดรู้สัญญาตั้งแต่บรรทัดแรก)",
        ],
      },
      {
        heading: "2) parameter ต้องมี type เสมอ",
        text: [
          "TypeScript ไม่รู้ว่าผู้เรียกจะส่งอะไรมา parameter ที่ไม่ได้ระบุ type และไม่มีบริบทให้เดา จะเป็น any โดยนัย ในโหมด strict ได้ error noImplicitAny (ยกเว้น callback ที่ส่งให้ function อื่น เช่น map((n) => ...) ซึ่ง TypeScript เดาจากบริบทได้ — contextual typing)",
          "นี่คือเหตุผลที่ starter ในบทนี้ (ไม่มี type) ใช้ไม่ได้ทันทีเมื่อเปิด strict",
        ],
      },
      {
        heading: "3) any ปิดการตรวจ unknown บังคับให้ตรวจ",
        text: [
          "any ยอมให้ทำทุกอย่าง เรียก method ที่ไม่มีอยู่ก็ผ่าน tsc แล้วไปพังตอนรัน",
          "unknown คือ “ยังไม่รู้” ทำอะไรกับมันไม่ได้จนกว่าจะตรวจ เช่น typeof x === \"number\" แล้วข้างใน if จึงใช้เป็น number ได้ ข้อมูลจาก JSON.parse หรือ input ภายนอกควรเริ่มเป็น unknown",
        ],
        code: "const raw: unknown = JSON.parse('\"hello\"');\nif (typeof raw === \"string\") {\n  console.log(raw.toUpperCase());\n}",
        output: "HELLO",
      },
    ],
    walkthrough: [
      "title และ joined ไม่ต้องเขียน type เพราะ infer จากค่าเริ่มต้นได้",
      "note ประกาศ string | null ไว้ตั้งแต่ต้นเพื่อบอกสัญญาว่า “อาจว่าง หรือเป็นข้อความ” ชัดเจน แม้ TypeScript จะ infer let ที่เริ่มเป็น null ได้ในบางกรณี",
      "fromApi ประกาศเป็น unknown การใช้ + 1 ทำได้เฉพาะใน if ที่พิสูจน์แล้วว่าเป็น number",
      "บรรทัดสุดท้ายใช้ title เป็น string ได้เลยเพราะ type ชัดตั้งแต่ต้น",
    ],
    pitfalls: [
      "เขียน type ซ้ำกับสิ่งที่ infer ได้ทุกบรรทัด: โค้ดยาวโดยไม่ได้อะไรเพิ่ม เขียนเฉพาะ parameter และจุดที่จำเป็น",
      "ใช้ any กับข้อมูลภายนอก: tsc หยุดช่วยทันที ใช้ unknown แล้วตรวจ",
      "ประกาศ let x; โดยไม่มีค่าและไม่มี type: ได้ any โดยนัย ใส่ type หรือค่าเริ่มต้น",
    ],
    checks: [
      { question: "let count = 0; แล้ว count = \"สาม\"; tsc ว่าอย่างไร", answer: "error เพราะ count ถูก infer เป็น number ตั้งแต่ประกาศ" },
      { question: "ต่างกันอย่างไรระหว่าง value: any กับ value: unknown เมื่อเรียก value.trim()", answer: "any ผ่าน tsc (อาจพังตอนรัน) ส่วน unknown ไม่ผ่านจนกว่าจะตรวจว่าเป็น string" },
    ],
    recap: [
      "ให้ infer เมื่อค่าเริ่มต้นบอกชนิดชัด",
      "parameter ต้องมี type",
      "ข้อมูลที่ไม่รู้ชนิด = unknown แล้วตรวจ ไม่ใช่ any",
    ],
    traceHint: "เอาเมาส์ชี้ตัวแปรใน VS Code (หรือเขียนเดาไว้ข้างบรรทัด) ว่า TypeScript คิดว่าแต่ละตัวเป็น type อะไร โดยเฉพาะ const กับ let",
    practiceHints: [
      "เปลี่ยน any เป็น unknown ก่อน แล้วดูว่า tsc บังคับให้ตรวจอะไรบ้าง",
      "ตรวจสองกรณีด้วย typeof: เป็น number (และไม่ติดลบ) หรือเป็น string ที่แปลงได้",
      "if (typeof input === \"number\" && input >= 0) return input; ใน string ใช้ Number(input) แล้วตรวจ Number.isNaN ก่อน return",
    ],
    acceptance: [
      "ตรวจเอง: ไม่มี any ในไฟล์และ tsc --noEmit --strict ผ่าน",
      "ตรวจเอง: toCount(5) ได้ 5, toCount(\"7\") ได้ 7, toCount(\"abc\") และ toCount(null) ได้ 0",
      "ตรวจเอง: ตัวเลขติดลบได้ 0",
    ],
    solutionNotes: [
      "unknown บังคับให้แต่ละกิ่งพิสูจน์ชนิดก่อนใช้ ทำให้ครอบคลุมกรณีแปลก ๆ อย่าง null โดยอัตโนมัติ",
      "Number(input) ใน string ไม่ error แต่ได้ NaN จึงต้องตรวจซ้ำหลังแปลง",
    ],
    reflection: [
      "ในโค้ด JavaScript ที่เคยเขียน มีตัวแปรไหนบ้างที่ “อาจเป็นหลายชนิด” และควรประกาศเป็น union",
    ],
    extension: "เพิ่มกรณี input เป็น boolean ให้ true → 1 และ false → 0 แล้วสังเกตว่า typeof narrowing ทำงานกับ boolean อย่างไร",
  },
  "ts-functions": {
    hook: "function คำนวณยอดต่อคนถูกเรียกจากห้าที่ในโปรเจกต์ วันหนึ่งมีคนส่งจำนวนคนเป็นข้อความ อีกคนลืมส่ง tip ผลลัพธ์เพี้ยนแบบเงียบ ๆ type ของ function คือการเขียนสัญญาที่ tsc ช่วยบังคับทุกที่ที่เรียก",
    explain: [
      {
        heading: "1) type ของ parameter และ return",
        text: [
          "เขียน type หลังชื่อ parameter และหลังวงเล็บสำหรับค่าที่ return: function perPerson(total: number, people: number): number",
          "return type infer ได้ แต่การเขียนเองทำให้ tsc ตรวจตัว function ด้วย เช่นเผลอมีกิ่งที่ไม่ return",
        ],
      },
      {
        heading: "2) optional และ default parameter",
        text: [
          "title?: string แปลว่าไม่ส่งก็ได้ ข้างใน function ค่าจะเป็น string | undefined ต้องจัดการกรณี undefined",
          "people: number = 2 ใส่ค่าเริ่มต้น ข้างในจึงเป็น number เสมอ และผู้เรียกไม่ส่งก็ได้",
        ],
      },
      {
        heading: "3) void และ function type",
        text: [
          "void บอกว่าไม่ได้คืนค่าที่ควรใช้ (เช่น function ที่แค่พิมพ์หรือบันทึก)",
          "function เป็นค่าได้ จึงมี type ได้: (amount: number) => string ใช้กับตัวแปรหรือ parameter ที่รับ callback",
        ],
        code: "function applyTwice(value: number, fn: (n: number) => number): number {\n  return fn(fn(value));\n}\nconsole.log(applyTwice(3, (n) => n * 2));",
        output: "12",
      },
    ],
    walkthrough: [
      "greet(\"ซี\") ไม่ส่ง title จึงเป็น undefined เข้ากิ่งที่คืนชื่ออย่างเดียว",
      "greet(\"ซี\", \"คุณ\") มี title จึงต่อหน้า",
      "perPerson(450) ใช้ people = 2 ตาม default ได้ 225 ส่วน perPerson(450, 4) ได้ Math.ceil(112.5) = 113",
      "format ถูกประกาศ type เป็น function ที่รับ number คืน string แล้ว logLine (void) พิมพ์ผล",
    ],
    pitfalls: [
      "ใช้ optional parameter แล้วลืมจัดการ undefined: tsc จะเตือนเมื่อใช้ค่าตรง ๆ ใช้ default หรือตรวจก่อน",
      "วาง optional parameter ไว้ก่อนตัวที่ต้องส่ง: ไม่อนุญาต optional ต้องอยู่ท้าย",
      "ประกาศ return type แต่มีกิ่งที่ return; ว่าง: tsc แจ้ง ให้ตัดสินสัญญาให้ชัด (คืนค่า default หรือ number | null)",
    ],
    checks: [
      { question: "function f(a: number, b?: number) — ข้างใน f ค่า b มี type อะไร", answer: "number | undefined" },
      { question: "ทำไม type ของ callback ช่วยตอนใช้ map หรือ sort", answer: "tsc รู้ชนิดของ parameter ใน callback และตรวจว่า callback คืนค่าชนิดที่ถูกต้อง" },
    ],
    recap: [
      "parameter ต้องมี type return type เขียนเมื่อเป็นสัญญาสำคัญ",
      "? = อาจไม่มี (ได้ undefined) / = ค่าเริ่มต้น",
      "void = ไม่มีค่าที่ใช้ได้; function type = (x: T) => R",
    ],
    traceHint: "ทำตารางการเรียกแต่ละครั้ง: ค่าของทุก parameter (รวมค่าที่มาจาก default หรือเป็น undefined) แล้วตามกิ่งที่ทำงาน",
    practiceHints: [
      "percent ไม่ส่งก็ได้ ให้มีค่าเริ่มต้น 0 แทน optional จะได้ไม่ต้องจัดการ undefined",
      "ใส่ type ให้ทั้งสอง parameter (percent ใช้ default) และ return type คิดเป็นสองขั้น: ราคาที่เหลือกี่เปอร์เซ็นต์ แล้วปัดลงเป็นจำนวนเต็ม",
      "function applyDiscount(price: number, percent: number = 0): number { return Math.floor(price * (100 - percent) / 100); } และ const calc: (price: number) => number = applyDiscount;",
    ],
    acceptance: [
      "ตรวจเอง: tsc --noEmit --strict ผ่าน",
      "ตรวจเอง: calc(1000) ได้ 1000 และ applyDiscount(999, 15) ได้ 849",
      "ตรวจเอง: เรียก applyDiscount(\"1000\") แล้ว tsc แจ้ง error",
    ],
    solutionNotes: [
      "default parameter ทำให้ type ข้างในเป็น number เสมอ อ่านง่ายกว่า percent?: number แล้ว percent ?? 0",
      "function ที่มี parameter มากกว่ายังใช้แทน type ที่รับน้อยกว่าได้ ถ้าตัวที่เกินไม่บังคับส่ง",
    ],
    reflection: [
      "function ไหนใน Planner ที่ควรเขียน return type ชัด ๆ เพราะถูกเรียกจากหลายที่",
    ],
    extension: "เขียน makeFormatter(currency: string): (amount: number) => string ที่คืน function สำหรับจัดรูปแบบเงิน แล้วสร้าง thb = makeFormatter(\"THB\")",
  },
  "ts-object-types": {
    hook: "API ส่งกิจกรรมมาพร้อม field joined แต่ใน component มีคนพิมพ์ activity.joind จอแสดง undefined ไม่มี error ใด ๆ เตือน การนิยามรูปร่างของ object ครั้งเดียวทำให้ tsc จับการสะกดผิดแบบนี้ได้ทุกที่",
    explain: [
      {
        heading: "1) type alias และ interface",
        text: [
          "type Activity = { title: string; capacity: number } ตั้งชื่อให้รูปร่าง ใช้ซ้ำได้ทั้งโปรเจกต์",
          "interface Activity { ... } ทำได้คล้ายกันสำหรับ object และขยายด้วย extends ได้ ทีมส่วนใหญ่เลือกแบบหนึ่งให้สม่ำเสมอ บทนี้ใช้ type เป็นหลักเพราะใช้กับ union ได้ด้วย",
        ],
      },
      {
        heading: "2) optional และ readonly property",
        text: [
          "place?: string แปลว่าอาจไม่มี field นี้ ใช้ ?? (ใช้ค่าทางขวาเมื่อทางซ้ายเป็น null/undefined เรียนแล้วใน Planner M2 และจะลงลึกในบท null safety) หรือตรวจก่อนอ่าน",
          "readonly id: number ห้าม assign ใหม่หลังสร้าง (ตรวจตอน compile) เหมาะกับ id ที่ไม่ควรเปลี่ยน",
        ],
      },
      {
        heading: "3) structural typing และ excess property",
        text: [
          "TypeScript ดูที่รูปร่าง ถ้า object มี field ที่ต้องการครบก็ใช้แทน type นั้นได้ ไม่ต้อง “ประกาศว่าเป็น”",
          "แต่ object literal ที่เขียนสด ๆ แล้วมี field เกิน จะถูกเตือน เพราะมักเป็นการสะกดผิด เช่น joind",
        ],
        code: "type Point = { x: number; y: number };\nconst withExtra = { x: 1, y: 2, label: \"A\" };\nconst p: Point = withExtra;\nconsole.log(p.x + p.y);",
        output: "3",
      },
    ],
    walkthrough: [
      "Activity กำหนด field บังคับสี่ตัว (id เป็น readonly) และ place เป็น optional",
      "describe อ่าน place ด้วย ?? จึงจัดการกรณีที่ไม่มีได้",
      "hiking ไม่มี place จึงได้ “ยังไม่กำหนดสถานที่” ส่วน cafe มี place",
      "ถ้าสะกด field ผิดใน object literal tsc จะแจ้ง error ที่ field ที่เกิน (และมักแนะนำชื่อที่ถูก)",
    ],
    pitfalls: [
      "แก้ error “property does not exist” ด้วย any หรือ as: ปัญหาอยู่ที่ type ไม่ตรงกับข้อมูล ให้แก้ type หรือข้อมูล",
      "คิดว่า readonly ป้องกันตอน runtime: ป้องกันแค่ตอน compile",
      "ทำทุก field เป็น optional เพื่อให้ผ่านง่าย: เสียประโยชน์ของการตรวจ field ที่ต้องมี",
    ],
    checks: [
      { question: "ทำไม const p: Point = withExtra ผ่าน แต่ const p: Point = { x: 1, y: 2, label: \"A\" } ไม่ผ่าน", answer: "ตัวแปรที่มีอยู่แล้วถูกตรวจแบบ structural (มี x, y ครบก็พอ) แต่ object literal สด ๆ ถูกตรวจ excess property เพิ่ม เพราะ field เกินมักเป็นการพิมพ์ผิด" },
      { question: "อ่าน activity.place.length โดยตรงได้ไหมเมื่อ place เป็น optional", answer: "ไม่ได้ tsc แจ้งว่า place อาจเป็น undefined ต้องตรวจหรือใช้ ?." },
    ],
    recap: [
      "type/interface อธิบายรูปร่าง object ครั้งเดียวใช้ทั้งโปรเจกต์",
      "? = อาจไม่มี, readonly = ห้าม assign ใหม่ (compile time)",
      "structural typing; object literal ถูกตรวจ field เกิน",
    ],
    traceHint: "สำหรับแต่ละ object ให้เทียบทีละ field กับ type: ครบไหม ชนิดตรงไหม เกินไหม แล้วเดาว่า tsc จะพูดอะไร",
    practiceHints: [
      "เริ่มจากประกาศ type Member สี่ field ตามโจทย์ แล้วใส่ type ให้ parameter ของ displayName",
      "nickname เป็น optional ใช้ ?: และ id เป็น readonly",
      "return member.nickname ?? member.name; แล้วลองสร้าง Member ที่สะกด nickName ผิดเพื่อดู error",
    ],
    acceptance: [
      "ตรวจเอง: tsc --noEmit --strict ผ่าน",
      "ตรวจเอง: สมาชิกที่มี nickname แสดง nickname ไม่มีแสดง name",
      "ตรวจเอง: member.id = 2 หลังสร้างแล้ว tsc แจ้ง error",
    ],
    solutionNotes: [
      "?? เลือก name เฉพาะเมื่อ nickname เป็น undefined/null ถ้าใช้ || nickname ที่เป็น \"\" จะถูกข้ามด้วย ซึ่งอาจไม่ใช่สิ่งที่ต้องการ",
      "ทางเลือก: interface Member { ... } ให้ผลเท่ากันในกรณีนี้",
    ],
    reflection: [
      "ถ้าทีมตกลงว่า email เป็น field ใหม่ที่ต้องมี การเพิ่มใน type จะช่วยหาจุดที่ต้องแก้อย่างไร",
    ],
    extension: "สร้าง type ActivityWithHost ที่ขยายจาก Activity ด้วย intersection (Activity & { host: Member }) แล้วเขียน function แสดงชื่อเจ้าภาพ",
  },
  "ts-arrays-tuples": {
    hook: "function สรุปคะแนนที่ซีเขียน sort รายการที่รับมา ทำให้ตารางคะแนนในอีกหน้าเรียงเปลี่ยนไปเองโดยไม่มีใครสั่ง readonly array ทำให้ tsc ห้ามการแก้แบบนี้ตั้งแต่ตอนเขียน",
    explain: [
      {
        heading: "1) type ของ array",
        text: [
          "number[] และ Array<number> เหมือนกัน คือ array ของ number ทุกสมาชิก",
          "array ของ object ใช้ type ที่นิยามไว้: Activity[] และผลของ map/filter มี type ตามมาเอง",
        ],
      },
      {
        heading: "2) readonly array กันการแก้ input",
        text: [
          "readonly number[] ห้ามเรียก push, pop, sort, splice และห้าม assign ช่องใน array ตอน compile",
          "function ที่ “แค่อ่าน” ควรรับ readonly array เป็นนิสัย จะส่ง array ธรรมดาเข้ามาก็ได้ แต่ข้างในแก้ไม่ได้",
        ],
      },
      {
        heading: "3) tuple เมื่อตำแหน่งมีความหมาย",
        text: [
          "[string, number] คือ array สองช่องที่ช่องแรกเป็น string ช่องที่สองเป็น number ตั้งชื่อช่องได้: [title: string, count: number]",
          "เหมาะกับค่าที่มาเป็นคู่สั้น ๆ เช่นผลของ Object.entries หรือการคืนสองค่า ถ้ามีหลาย field ใช้ object จะอ่านง่ายกว่า",
        ],
        code: "const entry: [string, number] = [\"Hiking\", 5];\nconst [title, count] = entry;\nconsole.log(title.length, count + 1);",
        output: "6 6",
      },
    ],
    walkthrough: [
      "Vote เป็น tuple ชื่อกิจกรรมกับจำนวนโหวต",
      "topVote รับ readonly Vote[] จึงต้องคัดลอกก่อน sort แล้วคืนตัวแรกหรือ undefined",
      "ผลเป็น Vote | undefined จึงต้องตรวจ if (best) ก่อน destructure",
      "votes เดิมไม่เปลี่ยน และ map ได้ number[] โดย tsc รู้ชนิดเอง",
    ],
    pitfalls: [
      "รับ array ธรรมดาใน function ที่ควรแค่อ่าน: เปิดโอกาสให้ sort/push แก้ข้อมูลผู้เรียก",
      "ใช้ tuple กับข้อมูลที่มีหลาย field: [string, number, number, boolean] อ่านยาก ใช้ object",
      "destructure tuple สลับตำแหน่ง: tsc จับได้เมื่อชนิดต่างกัน แต่ถ้าชนิดเหมือนกัน (เช่น [number, number]) จะไม่เตือน ตั้งชื่อช่องให้ชัด",
    ],
    checks: [
      { question: "readonly string[] เรียก .map(...) ได้ไหม", answer: "ได้ เพราะ map ไม่แก้ array เดิม ห้ามเฉพาะ method ที่แก้ array" },
      { question: "type ของ [\"a\", 1] เมื่อเขียนลอย ๆ โดยไม่ระบุ type คืออะไร", answer: "(string | number)[] — ต้องประกาศเองถ้าต้องการ tuple [string, number]" },
    ],
    recap: [
      "T[] = array ของ T",
      "readonly T[] สำหรับ function ที่แค่อ่าน",
      "tuple เมื่อตำแหน่งมีความหมายและมีไม่กี่ช่อง",
    ],
    traceHint: "เขียน type ของทุกค่าที่เกิดในโค้ด รวมผลของ [...votes], sort, [0] และ map ว่า tsc คิดว่าเป็นอะไร",
    practiceHints: [
      "ห้ามแก้ scores ที่รับมา ทั้ง sort และการเข้าถึง index แบบเดิมของ starter ต้องเปลี่ยน",
      "รับเป็น readonly number[] และคืน tuple [min: number, max: number] ใช้ Math.min(...scores) กับ Math.max(...scores)",
      "ดักกรณี array ว่างก่อน: if (scores.length === 0) return [0, 0]; แล้ว destructure ด้วย const [low, high] = summarize(...)",
    ],
    acceptance: [
      "ตรวจเอง: tsc --noEmit --strict ผ่าน และถ้าใส่ scores.sort() ใน function จะ error",
      "ตรวจเอง: summarize([70, 92, 55]) ได้ [55, 92] และ array ว่างได้ [0, 0]",
      "ตรวจเอง: array ที่ส่งเข้าไปลำดับไม่เปลี่ยน",
    ],
    solutionNotes: [
      "Math.min(...scores) กับ array ว่างได้ Infinity จึงต้องดักกรณีว่างก่อน",
      "labeled tuple ทำให้ editor แสดงชื่อ min/max ตอนใช้งาน ลดโอกาสสลับตำแหน่ง",
    ],
    reflection: [
      "function ไหนใน Planner ที่ควรรับ readonly array",
    ],
    extension: "เปลี่ยนให้ summarize คืน { min, max, average } เป็น object แทน tuple แล้วเปรียบเทียบความอ่านง่ายของจุดที่เรียกใช้",
  },
  "ts-unions-literals": {
    hook: "สถานะการจองถูกเก็บเป็น string ใครจะใส่อะไรก็ได้ จนมีทั้ง \"confirm\", \"confirmed\" และ \"Confirmed\" ปนกันในฐานข้อมูล literal types ทำให้ค่าที่เป็นไปได้มีชุดเดียว และ tsc ปฏิเสธคำที่สะกดผิดทันที",
    explain: [
      {
        heading: "1) union: เป็นได้หลายแบบ",
        text: [
          "number | string แปลว่าค่าเป็น number หรือ string ก็ได้ เช่น id ที่บางระบบส่งเป็นตัวเลข บางระบบเป็นข้อความ",
          "เมื่อเป็น union จะใช้ได้เฉพาะสิ่งที่ทุกสมาชิกทำได้ เช่น String(id) จนกว่าจะแยกด้วยการตรวจ (บทถัดไป)",
        ],
      },
      {
        heading: "2) literal types: ค่าที่ตายตัว",
        text: [
          "\"pending\" เป็น type ได้ด้วย หมายถึงต้องเป็นข้อความนี้เท่านั้น รวมกันเป็นชุดตัวเลือก: type Status = \"pending\" | \"confirmed\" | \"cancelled\"",
          "editor แนะนำค่าที่ถูกให้ และ tsc ปฏิเสธค่าที่ไม่อยู่ในชุด",
        ],
      },
      {
        heading: "3) widening: let กว้าง const แคบ",
        text: [
          "let kind = \"online\" ถูก infer เป็น string เพราะ let อาจเปลี่ยนค่า ส่วน const kind = \"online\" เป็น literal \"online\"",
          "ถ้าต้องการให้ let เก็บได้เฉพาะชุดตัวเลือก ประกาศ type เอง: let kind: Kind = \"online\"",
        ],
        code: "type Size = \"S\" | \"M\" | \"L\";\nconst sizes: Size[] = [\"S\", \"L\"];\nconsole.log(sizes.includes(\"L\"));",
        output: "true",
      },
    ],
    walkthrough: [
      "Status มีสามค่า label ตรวจทีละค่า กิ่งสุดท้ายเหลือเพียง \"cancelled\"",
      "formatId รับทั้ง number และ string จึงแปลงเป็น string ก่อน padStart",
      "label(\"pending\") และ label(\"cancelled\") ผ่าน tsc ส่วนค่าที่สะกดผิดจะไม่ผ่าน",
    ],
    pitfalls: [
      "ใช้ string แทน union ของ literal: เสียการตรวจคำผิดและ autocomplete",
      "ใช้ enum แบบ TypeScript: สร้างโค้ด runtime และ Node type stripping ไม่รองรับ union ของ literal มักพอ",
      "เรียก method ที่มีแค่บางสมาชิกของ union: ต้อง narrow ก่อน",
    ],
    checks: [
      { question: "type Kind = \"online\" | \"onsite\"; const k: Kind = \"Online\"; ผ่านไหม", answer: "ไม่ผ่าน literal type แยกตัวพิมพ์ใหญ่เล็ก" },
      { question: "ทำไม let kind = \"online\" ส่งให้ parameter แบบ Kind ไม่ได้", answer: "let ถูก infer เป็น string (widening) ซึ่งกว้างกว่า Kind" },
    ],
    recap: [
      "A | B = เป็นได้หลายแบบ ใช้ได้เฉพาะสิ่งที่ทุกแบบมีร่วม",
      "literal union แทนชุดค่าคงที่ ใช้แทน enum ได้",
      "let กว้าง const แคบ ประกาศ type เมื่อต้องการ",
    ],
    traceHint: "เขียนชุดค่าที่เป็นไปได้ของ status ในแต่ละบรรทัดของ label แล้วดูว่าชุดลดลงอย่างไรหลังแต่ละ if",
    practiceHints: [
      "นิยามชุดบทบาทเป็น union ของ literal แล้วเปลี่ยน type ของ parameter",
      "type Role = \"owner\" | \"member\" | \"guest\" และ canEdit(role: Role)",
      "return role === \"owner\" || role === \"member\"; — ตรวจแบบระบุค่าที่อนุญาต แทน role !== \"guest\" ซึ่งจะให้สิทธิ์บทบาทใหม่ที่เพิ่มในอนาคตโดยไม่ตั้งใจ",
    ],
    acceptance: [
      "ตรวจเอง: tsc --noEmit --strict ผ่าน",
      "ตรวจเอง: canEdit(\"admin\") ไม่ผ่าน tsc",
      "ตรวจเอง: owner/member ได้ true, guest ได้ false",
    ],
    solutionNotes: [
      "เขียนเงื่อนไขแบบ allow-list (ระบุสิ่งที่อนุญาต) ปลอดภัยกว่า deny-list เมื่อชุดค่าขยาย",
      "ถ้า role มาจากข้อมูลภายนอก ยังต้องตรวจตอน runtime ก่อนเชื่อว่าเป็น Role",
    ],
    reflection: [
      "field ไหนใน Planner ที่ควรเปลี่ยนจาก string เป็น union ของ literal",
    ],
    extension: "สร้าง const ROLES = [\"owner\", \"member\", \"guest\"] as const แล้วสร้าง type Role = typeof ROLES[number] จะได้ทั้งรายการสำหรับ runtime และ type ในที่เดียว",
  },
  "ts-narrowing": {
    hook: "กิจกรรมออนไลน์มีลิงก์ประชุม กิจกรรมในสถานที่มีห้อง ถ้าโค้ดอ่าน activity.room กับกิจกรรมออนไลน์ จอจะแสดง undefined narrowing ทำให้แต่ละกิ่งของโค้ดรู้ว่ากำลังจัดการแบบไหน และ tsc เตือนเมื่อมีแบบใหม่ที่ยังไม่ได้รองรับ",
    analogy: {
      title: "discriminated union เหมือนช่องคัดแยกพัสดุตามป้าย",
      text: [
        "พัสดุทุกชิ้นมีป้ายประเภทติดอยู่ พนักงานดูป้ายแล้วส่งเข้าช่องที่ถูก ช่องเอกสารรู้ว่าของในช่องเป็นเอกสารแน่นอน จึงจัดการได้โดยไม่ต้องเปิดดู",
        "ถ้าวันหนึ่งมีพัสดุประเภทใหม่ที่ไม่มีช่องรองรับ จะไปค้างอยู่ที่ปลายสายพาน ซึ่งพนักงานเห็นได้ทันที",
      ],
      mapping: [
        ["ป้ายประเภทบนพัสดุ", "field ร่วมที่เป็น literal เช่น kind: \"online\""],
        ["ช่องคัดแยกแต่ละช่อง", "case ของ switch หรือกิ่ง if ที่ตรวจ kind"],
        ["ในช่องเอกสารรู้ว่าเป็นเอกสาร", "ในกิ่งนั้น tsc รู้ type ที่แคบลงและให้ใช้ field ของแบบนั้น"],
        ["พัสดุค้างปลายสายพาน", "กิ่ง default ที่ไม่ใช่ never → tsc แจ้ง error"],
      ],
      limits: "ป้ายจริงอาจติดผิดได้ แต่ tsc เชื่อ type ของเราเสมอ ถ้าข้อมูลมาจากภายนอกโดยมี kind ผิด tsc ไม่รู้ ต้องตรวจตอน runtime ก่อนเข้าระบบ",
    },
    explain: [
      {
        heading: "1) การตรวจที่ tsc เข้าใจ",
        text: [
          "typeof x === \"string\", x === null, Array.isArray(x), \"url\" in x และ x instanceof Date ทำให้ type ในกิ่งนั้นแคบลง",
          "หลัง return ในกิ่งแรก ส่วนที่เหลือของ function รู้ว่าไม่ใช่กรณีนั้นแล้ว",
        ],
        code: "function size(value: string | string[]): number {\n  if (Array.isArray(value)) return value.length;\n  return value.trim().length;\n}\nconsole.log(size([\"a\", \"b\"]), size(\"  hi \"));",
        output: "2 2",
      },
      {
        heading: "2) discriminated union",
        text: [
          "แต่ละแบบมี field ชื่อเดียวกัน (เช่น kind) ที่เป็น literal ต่างกัน ตรวจ kind แล้วได้ type ของแบบนั้นทันที",
          "switch (activity.kind) อ่านง่ายเมื่อมีหลายแบบ",
        ],
      },
      {
        heading: "3) type predicate และ exhaustive check",
        text: [
          "function isOnline(a: Activity): a is Online ทำให้ใช้กับ filter แล้วได้ Online[] กลับมา",
          "ในกิ่ง default ถ้าจัดการครบแล้ว activity จะเป็น never การเขียน const unreachable: never = activity ทำให้ tsc แจ้งทันทีเมื่อมีแบบใหม่ที่ยังไม่มี case",
        ],
      },
    ],
    walkthrough: [
      "Online กับ Onsite มี kind คนละค่า จึงเป็น discriminated union",
      "switch ตรวจ kind: case \"online\" ใช้ url ได้ case \"onsite\" ใช้ room ได้",
      "default เป็นจุดที่ควรไม่มีวันมาถึง activity จึงเป็น never",
      "isOnline ใช้กับ filter ทำให้ map ต่อเป็น url ได้โดยไม่ต้อง as",
    ],
    pitfalls: [
      "ใช้ typeof x === \"object\" แยก null: typeof null ก็เป็น \"object\" ใช้ x === null",
      "เขียน type predicate ที่ตรวจไม่ครบ: tsc เชื่อ predicate ของเราเลย ถ้าตรวจผิดจะได้ type ผิด",
      "ไม่มี exhaustive check: เพิ่มแบบใหม่แล้วกิ่ง default ทำงานเงียบ ๆ ด้วยผลที่ผิด",
    ],
    checks: [
      { question: "หลัง if (activity.kind === \"online\") return ...; บรรทัดถัดไป activity มี type อะไร", answer: "Onsite (แบบที่เหลือ) เพราะกรณี online ถูก return ไปแล้ว" },
      { question: "ทำไม filter(isOnline) ได้ Online[] แต่ filter((a) => a.kind === \"online\") ในบางเวอร์ชันได้ Activity[]", answer: "type predicate บอก tsc ชัดว่าผ่านแล้วเป็น Online ส่วน arrow ธรรมดา tsc อาจไม่ infer เป็น predicate ให้ (TypeScript 5.5+ infer ได้ในหลายกรณี แต่การเขียน predicate เองชัดเจนกว่า)" },
    ],
    recap: [
      "typeof / === null / Array.isArray / in / instanceof ทำให้ type แคบลง",
      "discriminated union: field literal ร่วมแยกแบบ",
      "type predicate สำหรับ function ตรวจ; never สำหรับ exhaustive check",
    ],
    traceHint: "เขียน type ของ activity ที่ต้นแต่ละ case และใน default แล้วดูว่าชุดของแบบที่เป็นไปได้หดลงทีละขั้นจนเหลือ never",
    practiceHints: [
      "เพิ่ม Hybrid ใน union ก่อน แล้วดู error ที่ tsc ชี้ในกิ่ง default — นั่นคือรายการงานที่ต้องทำ",
      "เพิ่ม case \"hybrid\" ที่ใช้ทั้ง url และ room แล้วเขียน hasRoom ที่คืน activity.kind === \"onsite\" || activity.kind === \"hybrid\"",
      "type ของ hasRoom คือ (activity: Activity): activity is Onsite | Hybrid แล้ว list.filter(hasRoom).map((a) => a.room) จะผ่าน tsc",
    ],
    acceptance: [
      "ตรวจเอง: ก่อนเพิ่ม case hybrid tsc แจ้ง error ที่กิ่ง default",
      "ตรวจเอง: หลังแก้ tsc --noEmit --strict ผ่าน และไม่มี as",
      "ตรวจเอง: filter(hasRoom) แล้วอ่าน .room ได้โดยไม่ error",
    ],
    solutionNotes: [
      "exhaustive check ทำงานเพราะ Hybrid ไม่ใช่ never — tsc ชี้จุดที่ลืมแทนการปล่อยให้ default ทำงานเงียบ ๆ",
      "predicate ต้องตรวจให้ตรงกับ type ที่ประกาศ ถ้าลืม hybrid ใน predicate แต่ประกาศ Onsite | Hybrid ผลจะผิดโดยที่ tsc ไม่เตือน",
    ],
    reflection: [
      "ในระบบที่ซีเคยทำ มีข้อมูลแบบไหนที่ “มีหลายแบบ แต่ละแบบมี field ไม่เหมือนกัน” และเคยจัดการด้วย if ซ้อนกันยาว ๆ",
    ],
    extension: "เขียน function countByKind(list: readonly Activity[]): Record<Activity[\"kind\"], number> ที่นับจำนวนแต่ละแบบ แล้วสังเกตว่าเพิ่ม hybrid แล้ว tsc บังคับให้มี key ใหม่",
  },
  "ts-null-safety": {
    hook: "error ที่เห็นบ่อยที่สุดในหน้าเว็บคือ Cannot read properties of undefined เพราะโค้ดคิดว่าค่ามีอยู่เสมอ strict mode ของ TypeScript บังคับให้ตอบตั้งแต่ตอนเขียนว่า “ถ้าไม่มีค่า จะทำอย่างไร”",
    explain: [
      {
        heading: "1) strict ทำให้ null/undefined ต้องประกาศเอง",
        text: [
          "เมื่อเปิด strict type string ไม่รวม null และ undefined ค่าที่อาจไม่มีต้องเขียนเป็น string | null หรือ field แบบ optional",
          "method หลายตัวคืนค่าที่อาจไม่มีอยู่แล้ว เช่น find คืน T | undefined และ Map.get คืน V | undefined tsc จะเตือนให้ตรวจก่อนใช้",
        ],
      },
      {
        heading: "2) ?. และ ??",
        text: [
          "a?.b อ่าน b ต่อเมื่อ a ไม่ใช่ null/undefined ไม่งั้นได้ undefined ทั้งนิพจน์ (ไม่ error)",
          "a ?? b ใช้ b เมื่อ a เป็น null/undefined เท่านั้น ต่างจาก a || b ที่ใช้ b เมื่อ a เป็น falsy ใด ๆ รวม 0 และ \"\"",
        ],
        code: "const discount = 0;\nconsole.log(discount ?? 10, discount || 10);",
        output: "0 10",
      },
      {
        heading: "3) ! ไม่ได้ทำให้ค่ามีอยู่จริง",
        text: [
          "value! บอก tsc ว่าไม่ใช่ null โดยไม่ตรวจ ถ้าผิดจะพังตอนรันเหมือนไม่มี TypeScript",
          "ใช้ ! เฉพาะเมื่อพิสูจน์ได้จากโค้ดส่วนอื่นที่ tsc มองไม่เห็น และควรมี comment บอกเหตุผล ส่วนใหญ่การตรวจหรือ ?? ดีกว่า",
        ],
      },
    ],
    walkthrough: [
      "member.contact?.line อ่าน line ต่อเมื่อมี contact ถ้าไม่มีได้ undefined แล้ว ?? ใส่ “ไม่มี LINE”",
      "seats ?? 1 คง 0 ของต้นไว้ (0 ไม่ใช่ null) แต่ || เปลี่ยนเป็น 1",
      "ฝนมี seats เป็น null จึงได้ 1 ทั้งสองแบบ",
      "find หา “บี” ไม่เจอได้ undefined found?.name จึงเป็น undefined แล้ว ?? ใส่ข้อความแทน",
    ],
    pitfalls: [
      "ใช้ || ใส่ค่าเริ่มต้นให้ตัวเลข: 0 ถูกแทน ใช้ ??",
      "ใช้ ! เพื่อให้ error หาย: เลื่อนปัญหาไปเกิดตอนรัน",
      "ใส่ ?. ทุกจุดจนเคยชิน: ซ่อนสถานการณ์ที่ควรเป็น error จริง ใช้เมื่อค่า “ไม่มี” เป็นกรณีปกติเท่านั้น",
    ],
    checks: [
      { question: "\"\" ?? \"ค่าเริ่มต้น\" ได้อะไร", answer: "\"\" เพราะ ?? แทนเฉพาะ null/undefined" },
      { question: "activities.find(...).title ใน strict mode tsc ว่าอย่างไร", answer: "แจ้งว่า object is possibly 'undefined' เพราะ find อาจหาไม่เจอ" },
    ],
    recap: [
      "strict: ค่าที่อาจไม่มีต้องประกาศและตรวจ",
      "?. อ่านต่ออย่างปลอดภัย ?? ค่าแทนเมื่อ null/undefined",
      "! ไม่ใช่การตรวจ หลีกเลี่ยงเมื่อตรวจได้",
    ],
    traceHint: "ทำตารางหนึ่งแถวต่อสมาชิก: contact, contact?.line, seats, ผลของ ?? และผลของ || แล้วเทียบแถวที่สองคอลัมน์สุดท้ายต่างกัน",
    practiceHints: [
      "มีสามกรณี: ไม่มี contact, มี contact แต่ไม่มี line, มีทั้งคู่ — จัดการทีละกรณีจากบนลงล่าง",
      "if (!member.contact) return \"ไม่มีข้อมูลติดต่อ\"; หลังบรรทัดนี้ tsc รู้ว่า contact มีอยู่",
      "return member.contact.line ? \"LINE: \" + member.contact.line : \"ยังไม่ใส่ LINE\"; — ไม่มี ! เลย",
    ],
    acceptance: [
      "ตรวจเอง: ไม่มี ! ในไฟล์และ tsc --noEmit --strict ผ่าน",
      "ตรวจเอง: สามกรณีได้ข้อความตามโจทย์",
    ],
    solutionNotes: [
      "return early ทำให้ tsc narrow contact ให้ในบรรทัดที่เหลือ อ่านง่ายกว่า ?. ซ้อนหลายชั้น",
      "line ที่เป็น \"\" จะถูกนับว่า “ยังไม่ใส่” เพราะใช้การตรวจ truthy ถ้าต้องการแยก \"\" กับ undefined ให้ตรวจ === undefined",
    ],
    reflection: [
      "ในหน้าที่โหลดข้อมูลจาก API มีจุดไหนที่ควรใช้ ?? กับค่าเริ่มต้น และจุดไหนที่ควรแสดง error แทน",
    ],
    extension: "เขียน getLimit(params: Map<string, string>): number ที่อ่าน \"limit\" แปลงเป็นตัวเลข และคืน 20 เมื่อไม่มีหรือแปลงไม่ได้ โดยไม่ใช้ !",
  },
  "ts-generics": {
    hook: "ซีเขียน function “หา item ด้วย id” ใช้กับกิจกรรม แล้วอยากใช้กับสมาชิกด้วย จึงเปลี่ยน type เป็น any สุดท้ายผลที่ได้กลายเป็น any และ editor เลิกช่วยเติม field ให้ generics แก้ปัญหานี้โดยไม่ทิ้ง type",
    analogy: {
      title: "generic function เหมือนกล่องใส่ของที่ติดฉลากตอนใช้งาน",
      text: [
        "กล่องพลาสติกใบเดียวใช้ได้ทั้งใส่ขนมและใส่สายชาร์จ ก่อนเก็บเข้าตู้เราติดฉลากว่าใบนี้ใส่อะไร เวลาหยิบออกมาจึงรู้ทันทีว่าข้างในคืออะไร",
        "type parameter T คือฉลากนั้น กล่อง (function) ทำงานเหมือนเดิมกับของทุกชนิด แต่ผลลัพธ์รู้ชนิดตามฉลากที่ติด",
      ],
      mapping: [
        ["กล่องใบเดียวใช้ได้หลายอย่าง", "function first<T>(items: T[]) ตัวเดียวใช้ได้กับทุกชนิด"],
        ["ติดฉลากตอนเก็บของ", "T ถูกกำหนดตอนเรียก (มักเดาจาก argument)"],
        ["หยิบออกมารู้ว่าเป็นอะไร", "ค่าที่ return มี type เป็น T ไม่ใช่ any"],
        ["กล่องที่ต้องมีช่องเสียบปลั๊ก", "constraint T extends { id: number } บังคับคุณสมบัติขั้นต่ำ"],
      ],
      limits: "ฉลากจริงเปลี่ยนได้ทีหลัง แต่ T ถูกกำหนดครั้งเดียวต่อการเรียก และ generics มีผลเฉพาะตอน compile ตอนรันไม่มี T เหลืออยู่ จึงใช้ T ตรวจชนิดตอน runtime ไม่ได้",
    },
    explain: [
      {
        heading: "1) type parameter <T>",
        text: [
          "function first<T>(items: readonly T[]): T | undefined ใช้ T เป็นตัวแทนชนิดของสมาชิก",
          "ส่วนใหญ่ไม่ต้องเขียน <T> ตอนเรียก tsc เดาจาก argument ให้ เขียนเองเมื่อเดาไม่ได้ เช่น first<number>([])",
        ],
      },
      {
        heading: "2) constraint ด้วย extends",
        text: [
          "ถ้า function ต้องใช้ field ของ T ต้องบอกขั้นต่ำว่า T มีอะไร: <T extends { id: number }> แล้วข้างในใช้ item.id ได้",
          "ผลยังเป็น T เต็ม ๆ (เช่น Activity) ไม่ใช่แค่ { id: number }",
        ],
      },
      {
        heading: "3) keyof และ T[K]",
        text: [
          "keyof T คือ union ของชื่อ field ใน T เช่น \"id\" | \"title\" | \"capacity\"",
          "<K extends keyof T> รับเฉพาะชื่อ field ที่มีจริง และ T[K] คือชนิดของ field นั้น pluck(activities, \"capacity\") จึงได้ number[]",
        ],
      },
    ],
    walkthrough: [
      "first([\"a\", \"b\"]) T เป็น string ได้ \"a\" ส่วน first<number>([]) ระบุ T เองเพราะ array ว่างเดาไม่ได้ ได้ undefined",
      "byId ใช้ item.id ได้เพราะ constraint และคืน activity ทั้งก้อน จึงอ่าน ?.title ต่อได้",
      "pluck รับ key ที่มีจริงเท่านั้นและคืน array ของชนิด field นั้น",
    ],
    pitfalls: [
      "ใช้ any แทน generics: เสีย type ของผลลัพธ์",
      "ใช้ field ของ T โดยไม่มี constraint: tsc แจ้งว่า property ไม่มีใน T",
      "ใส่ type parameter ที่ไม่ได้ใช้เชื่อมอะไร: ถ้า T ปรากฏแค่ที่เดียว มักไม่จำเป็นต้องเป็น generic",
    ],
    checks: [
      { question: "byId(members, 1) เมื่อ members เป็น Member[] คืน type อะไร", answer: "Member | undefined เพราะ T ถูกเดาเป็น Member" },
      { question: "ทำไม pluck(activities, \"price\") ไม่ผ่าน", answer: "\"price\" ไม่อยู่ใน keyof ของ activity จึงไม่ตรง constraint K extends keyof T" },
    ],
    recap: [
      "<T> = ชนิดที่กำหนดตอนเรียก มักเดาจาก argument",
      "T extends X = ขั้นต่ำที่ T ต้องมี",
      "keyof T และ T[K] สำหรับทำงานกับชื่อ field อย่างปลอดภัย",
    ],
    traceHint: "ทุกการเรียก ให้เขียนว่า T (และ K) ถูกเดาเป็นอะไร แล้วแทนค่าลงใน signature เพื่อหา type ของผลลัพธ์",
    practiceHints: [
      "เปลี่ยน any ทั้งหมดเป็น type parameter: T สำหรับสมาชิก และ K สำหรับชื่อ field",
      "signature: function groupBy<T, K extends keyof T>(items: readonly T[], key: K): Record<string, T[]>",
      "ข้างในใช้ const groupKey = String(item[key]); เพราะค่าของ field อาจไม่ใช่ string แล้วสะสมแบบ immutable เหมือนบท JS",
    ],
    acceptance: [
      "ตรวจเอง: ไม่มี any และ tsc --noEmit --strict ผ่าน",
      "ตรวจเอง: groupBy(list, \"kind\") ได้ object ที่ key เป็นค่า kind และค่าเป็น array ของ item เดิม",
      "ตรวจเอง: groupBy(list, \"price\") ไม่ผ่าน tsc เมื่อไม่มี field price",
    ],
    solutionNotes: [
      "Record<string, T[]> บอกว่าแต่ละกลุ่มยังเป็น T เต็มรูป ใช้ field อื่นต่อได้",
      "String(item[key]) แปลงค่าที่ใช้จัดกลุ่มให้เป็นข้อความ เพราะ key ของ object ธรรมดาเป็น string (หรือ symbol) ข้อควรระวัง: ค่าต่างชนิดที่แปลงแล้วเหมือนกัน เช่น 1 กับ \"1\" จะรวมอยู่กลุ่มเดียว",
      "Object.create(null) สร้าง object ที่ไม่มี prototype จึงจัดกลุ่มค่าอย่าง \"constructor\" หรือ \"toString\" ได้ถูกต้อง (object {} ธรรมดามี property เหล่านี้สืบทอดมาแล้ว)",
    ],
    reflection: [
      "function ไหนใน Planner ที่เขียนซ้ำสำหรับข้อมูลต่างชนิด และควรเป็น generic",
    ],
    extension: "เขียน sortBy<T, K extends keyof T>(items: readonly T[], key: K): T[] ที่คืน array ใหม่เรียงตาม field นั้น (สมมติว่าเป็น number หรือ string)",
  },
  "ts-utility-types": {
    hook: "โปรเจกต์มี type Activity, ActivityForm, ActivityUpdate และ ActivityCard ที่เขียนแยกกันด้วยมือ วันหนึ่งเพิ่ม field date ใน Activity แต่ลืมเพิ่มในฟอร์ม ข้อมูลวันที่จึงหายตอนสร้าง utility types ทำให้ทุก type ผูกกับต้นฉบับเดียว",
    explain: [
      {
        heading: "1) Omit และ Pick: ตัดหรือเลือก field",
        text: [
          "Omit<Activity, \"id\"> คือ Activity ที่ไม่มี id เหมาะกับข้อมูลที่ผู้ใช้กรอกตอนสร้าง (server เป็นคนให้ id)",
          "Pick<Activity, \"title\" | \"capacity\"> เลือกแค่ field ที่ต้องการ เหมาะกับข้อมูลสำหรับแสดงการ์ด",
        ],
      },
      {
        heading: "2) Partial: ทุก field optional",
        text: [
          "Partial<T> เหมาะกับข้อมูลอัปเดตที่ส่งมาแค่บาง field แล้วรวมกับของเดิมด้วย spread",
          "รวมกันได้: Partial<Omit<Activity, \"id\">> คืออัปเดตได้ทุก field ยกเว้น id",
        ],
      },
      {
        heading: "3) Record และ ReturnType",
        text: [
          "Record<\"online\" | \"onsite\", number> คือ object ที่ต้องมีทั้งสอง key และค่าเป็น number",
          "ReturnType<typeof fn> ดึง type ของค่าที่ function คืน ใช้เมื่อไม่อยากเขียน type ซ้ำกับสิ่งที่ function สร้าง",
        ],
        code: "function makeSummary() {\n  return { total: 3, full: 1 };\n}\ntype Summary = ReturnType<typeof makeSummary>;\nconst s: Summary = { total: 5, full: 2 };\nconsole.log(s.total - s.full);",
        output: "3",
      },
    ],
    walkthrough: [
      "NewActivity ตัด id และ joined ออก เพราะ create เป็นคนกำหนด",
      "ActivityPatch ให้แก้ได้บาง field ยกเว้น id แล้ว update รวมด้วย spread",
      "Preview มีแค่สอง field และ countsByKind ต้องมีครบทั้ง online และ onsite",
      "ผลที่พิมพ์ออกมาเป็น object ธรรมดา — utility types ไม่ได้เปลี่ยนอะไรตอนรัน",
    ],
    pitfalls: [
      "เขียน type ของฟอร์มซ้ำด้วยมือ: เพิ่ม field ใหม่แล้วลืมอัปเดต ใช้ Omit/Pick จาก model",
      "คิดว่า Pick ตัด field ออกจาก object ตอนรัน: เป็นแค่ type ต้องสร้าง object ใหม่เองถ้าต้องการซ่อนข้อมูล",
      "ใช้ Partial กับข้อมูลสร้างใหม่: ทำให้ field ที่ต้องมีกลายเป็นไม่บังคับ",
      "Partial ยอมให้ส่ง { title: undefined } ได้ แล้ว spread จะทับ title เดิมเป็น undefined ทั้งที่ Activity บังคับ string ตรวจ/ตัดค่า undefined ออกก่อน merge หรือเปิด exactOptionalPropertyTypes ใน tsconfig",
    ],
    checks: [
      { question: "Omit<Activity, \"id\" | \"joined\"> มี field อะไรบ้างเมื่อ Activity มี id, title, capacity, joined", answer: "title และ capacity" },
      { question: "ทำไม toCard ที่ return activity ทั้งก้อนผ่าน tsc ทั้งที่ประกาศคืน Pick<Activity, \"title\">", answer: "เพราะ structural typing: object ที่มี field มากกว่าใช้แทนได้ แต่ตอนรัน field อื่นยังติดไปด้วย" },
    ],
    recap: [
      "Omit/Pick ตัด/เลือก field, Partial ทำให้ optional",
      "Record<K, V> สำหรับ object ที่ key รู้ล่วงหน้า",
      "utility types มีผลแค่ตอน compile",
    ],
    traceHint: "เขียน field ของแต่ละ type ที่สร้างจาก Activity ออกมาเป็นรายการ แล้วตรวจว่า object ในตัวอย่างมี field ตรงกัน",
    practiceHints: [
      "MemberForm คือ Member ที่ยังไม่มี id ส่วน PublicMember เลือกแค่สอง field",
      "เลือก utility ให้ตรงงาน: “ตัดออก” ใช้ Omit, “เลือกเฉพาะ” ใช้ Pick และใน toPublic ต้องสร้าง object ใหม่ ไม่ใช่คืนตัวเดิม",
      "type MemberForm = Omit<Member, \"id\">; type PublicMember = Pick<Member, \"id\" | \"name\">; และ return { id: member.id, name: member.name };",
    ],
    acceptance: [
      "ตรวจเอง: tsc --noEmit --strict ผ่าน และไม่มี type ที่เขียนซ้ำด้วยมือ",
      "ตรวจเอง: toPublic คืนเฉพาะ id และ name (console.log แล้วไม่เห็น email/age)",
    ],
    solutionNotes: [
      "การคืน object ใหม่ใน toPublic สำคัญกว่าตัว type เพราะ type ไม่ได้ตัดข้อมูลตอนรัน",
      "ถ้าเพิ่ม field ใน Member ทีหลัง MemberForm จะได้ field ใหม่อัตโนมัติ และ tsc จะบังคับให้ฟอร์มส่งค่ามาด้วย",
    ],
    reflection: [
      "ใน API ที่จะสร้างในคอร์ส Back-end type ไหนบ้างที่ควรสร้างจาก model ด้วย Omit/Pick/Partial",
    ],
    extension: "สร้าง type ActivityUpdate = Partial<Omit<Activity, \"id\">> & { id: number } สำหรับคำขออัปเดตที่ต้องระบุ id เสมอ",
  },
  "ts-classes": {
    hook: "object กิจกรรมถูกแก้จากหลายที่ จนมีคนเพิ่มสมาชิกเกินที่นั่งโดยตรงผ่าน activity.members.push ทั้งที่ควรผ่านการตรวจกติกา class ที่ซ่อน state ไว้และเปิดแค่ method ที่ตรวจกติกา ช่วยให้ object รักษาความถูกต้องของตัวเอง",
    explain: [
      {
        heading: "1) field ที่มี type และ constructor",
        text: [
          "ประกาศ field พร้อม type ใน class แล้วกำหนดค่าใน constructor หรือใส่ค่าเริ่มต้นตรงที่ประกาศ (members: string[] = [])",
          "strict mode ตรวจว่า field ถูกกำหนดค่าก่อนใช้งาน (strictPropertyInitialization)",
        ],
      },
      {
        heading: "2) private, readonly และ #private",
        text: [
          "private ห้ามโค้ดนอก class เข้าถึง (ตรวจตอน compile เท่านั้น ตอนรันยังเป็น field ธรรมดา) readonly ห้าม assign หลัง constructor",
          "ถ้าต้องการซ่อนจริงตอน runtime ใช้ #members ของ JavaScript บทนี้ใช้ private เพื่อเน้นการตรวจของ tsc",
        ],
      },
      {
        heading: "3) implements และ getter",
        text: [
          "class Activity implements Joinable ให้ tsc ตรวจว่า class มีทุกอย่างที่ interface กำหนด ไม่ได้เพิ่มพฤติกรรมเอง",
          "get seatsLeft() คำนวณค่าจาก state ทุกครั้งที่อ่าน ทำให้ไม่ต้องเก็บค่าซ้ำที่อาจไม่ตรงกัน",
          "parameter properties (constructor(private x: number)) สั้นกว่า แต่ Node type stripping ไม่รองรับ บทนี้จึงประกาศ field แยก",
        ],
      },
    ],
    walkthrough: [
      "สร้าง game ที่รับได้ 2 คน members เริ่มเป็น []",
      "join(\"ซี\") ผ่านเงื่อนไข เพิ่มสมาชิก คืน true; join(\"ซี\") ซ้ำคืน false",
      "join(\"ต้น\") เพิ่มได้ ที่นั่งเหลือ 0; join(\"ฝน\") เต็มแล้วคืน false",
      "title อ่านได้ (readonly แต่ public) ส่วน capacity และ members อ่านจากข้างนอกไม่ได้",
    ],
    pitfalls: [
      "ทำทุก field เป็น public แล้วหวังว่าทุกคนจะเรียก method: ใครก็ข้ามกติกาได้",
      "คิดว่า private ซ่อนข้อมูลตอน runtime: ใช้ #field ถ้าต้องการจริง",
      "ดึง method ออกมาเป็น function เดี่ยว: this หาย",
    ],
    checks: [
      { question: "ถ้าลบ method join ออกจาก class tsc จะแจ้งที่ไหน", answer: "ที่ class Activity implements Joinable ว่า class ไม่ได้ implement join ตาม interface" },
      { question: "seatsLeft เป็น getter ต่างจากการเก็บ seatsLeft เป็น field อย่างไร", answer: "getter คำนวณจาก members ทุกครั้งจึงถูกต้องเสมอ ส่วน field ต้องคอยอัปเดตเองและอาจไม่ตรง" },
    ],
    recap: [
      "field มี type และต้องถูกกำหนดค่า",
      "private/readonly ตรวจตอน compile; #field ซ่อนจริงตอน runtime",
      "implements ตรวจตามสัญญา getter คำนวณจาก state",
    ],
    traceHint: "ทำตาราง state ของ members และ seatsLeft หลังการเรียก join แต่ละครั้ง พร้อมค่าที่คืน",
    practiceHints: [
      "balance ต้องเปลี่ยนได้เฉพาะผ่าน method จึงควรเป็น private",
      "deposit ตรวจ amount <= 0 แล้ว throw; withdraw คืน false เมื่อ amount > balance หรือ <= 0",
      "get balanceText(): string { return \"เหลือ \" + this.balance + \" บาท\"; } และลองเขียน wallet.balance = 1000 นอก class เพื่อดู error",
    ],
    acceptance: [
      "ตรวจเอง: tsc --noEmit --strict ผ่าน และ wallet.balance = 1000 นอก class ไม่ผ่าน",
      "ตรวจเอง: ฝาก 500 ถอน 200 ได้ true ถอน 400 ได้ false และข้อความเป็น “เหลือ 300 บาท”",
      "ตรวจเอง: deposit(0) หรือ deposit(-5) โยน Error",
    ],
    solutionNotes: [
      "deposit throw เพราะจำนวนติดลบคือบั๊กของผู้เรียก ส่วน withdraw คืน false เพราะเงินไม่พอเป็นสถานการณ์ปกติที่หน้าจอต้องจัดการ",
      "ทางเลือก: ใช้ #balance เพื่อซ่อนจริงตอน runtime โดยเฉพาะถ้า object ถูกส่งต่อให้ library อื่น",
    ],
    reflection: [
      "กติกาไหนใน Planner ที่ควรอยู่ใน method ของ object แทนการให้ทุกคนแก้ field เอง",
    ],
    extension: "เพิ่ม interface HasHistory { history: readonly string[] } ให้ Wallet implements ด้วย แล้วบันทึกทุกการฝาก/ถอนที่สำเร็จ",
  },
  "ts-config": {
    hook: "ซีรันโปรเจกต์ TypeScript ด้วย node index.ts ได้ตลอด แต่พอเพื่อนรัน tsc กลับเจอ error สิบกว่าจุด เพราะ Node ไม่เคยตรวจ type ให้เลย บทนี้จัดเครื่องมือให้ตรวจแบบเดียวกันทุกคนและทุกครั้ง",
    explain: [
      {
        heading: "1) tsconfig.json คือกติกาของโปรเจกต์",
        text: [
          "include บอกไฟล์ที่ตรวจ compilerOptions บอกกติกา strict: true เปิดชุดการตรวจที่สำคัญ (strictNullChecks, noImplicitAny และอื่น ๆ) ควรเปิดตั้งแต่เริ่มโปรเจกต์",
          "target บอกเวอร์ชัน JavaScript ที่ต้องการ module: \"NodeNext\" ทำตามกติกาของ Node ที่ตัดสินจาก \"type\": \"module\" ใน package.json (หรือนามสกุล .mts) ว่าไฟล์เป็น ESM — ถ้าไม่ตั้งจะถือเป็น CommonJS",
        ],
      },
      {
        heading: "2) tsc --noEmit สำหรับตรวจ",
        text: [
          "เมื่อมีเครื่องมืออื่นรันโค้ด (Node, Next.js, bundler) ใช้ tsc แค่ตรวจ: noEmit ไม่สร้างไฟล์ .js",
          "ใส่ใน package.json เป็น script เช่น \"check\": \"tsc\" แล้วรันก่อน commit และใน CI",
        ],
      },
      {
        heading: "3) รัน TypeScript ใน Node",
        text: [
          "Node 22.18 ขึ้นไปรัน node index.ts ได้เลยด้วย type stripping (ลบ type ทิ้ง) ส่วน Node 22.6–22.17 ต้องใช้ --experimental-strip-types และเวอร์ชันที่เก่ากว่านั้นไม่รองรับ",
          "type stripping ไม่ตรวจ type และไม่รองรับ syntax ที่ต้องแปลงโค้ด เช่น enum, namespace ที่มีโค้ด และ parameter properties ถ้าใช้ต้องผ่านเครื่องมือที่ transpile",
        ],
      },
    ],
    walkthrough: [
      "ตัวอย่าง tsconfig ใน comment เปิด strict และ noEmit และตรวจเฉพาะโฟลเดอร์ src",
      "parsePort รับ string | undefined เพราะ environment variable อาจไม่มี",
      "?? ให้ \"3000\" เมื่อไม่มีค่า แล้วตรวจว่าแปลงได้เป็นจำนวนเต็มบวก",
      "ผลสามกรณี: ไม่มีค่า → 3000, \"8080\" → 8080, \"abc\" → 3000",
    ],
    pitfalls: [
      "ปิด strict เพราะ error เยอะ: error เหล่านั้นคือบั๊กที่อาจเกิดจริง เปิดตั้งแต่ต้นจะง่ายกว่ามาเปิดทีหลัง",
      "เชื่อว่า node index.ts ผ่าน = type ถูก",
      "ใช้ enum ในโค้ดที่รันด้วย type stripping",
    ],
    checks: [
      { question: "ทำไม process.env.PORT มี type เป็น string | undefined", answer: "เพราะ environment variable อาจไม่ได้ตั้งไว้ และค่าที่ตั้งเป็นข้อความเสมอ" },
      { question: "noEmit มีไว้ทำไมเมื่อ tsc เป็น compiler", answer: "เพื่อใช้ tsc เป็นตัวตรวจอย่างเดียว ปล่อยให้เครื่องมืออื่นเป็นคนรันหรือ bundle" },
    ],
    recap: [
      "tsconfig.json + strict: true ตั้งแต่เริ่ม",
      "tsc --noEmit ใน script และ CI",
      "Node 22.18+ รัน .ts ได้แต่ไม่ตรวจ และไม่รองรับ enum",
    ],
    traceHint: "สำหรับแต่ละการเรียก parsePort เขียนค่าหลัง ?? ค่าหลัง Number() และผลของเงื่อนไข isInteger && > 0",
    practiceHints: [
      "ติดตั้ง typescript เป็น devDependency ในโปรเจกต์ใหม่ แล้วสร้าง tsconfig.json เอง (หรือ npx tsc --init แล้วแก้)",
      "compilerOptions อย่างน้อย: \"strict\": true, \"noEmit\": true, \"module\": \"NodeNext\", \"target\": \"ES2022\" และ include [\"src\"]",
      "script \"check\": \"tsc\" — รัน npm run check ให้ผ่าน แล้วลองลบ | undefined ออกจาก parsePort เพื่อดู error",
    ],
    acceptance: [
      "ตรวจเอง: npm run check ผ่าน",
      "ตรวจเอง: เมื่อทำให้ type ผิดหนึ่งจุด npm run check ล้มเหลวพร้อมบอกบรรทัด",
      "ตรวจเอง: node src/index.ts (Node 22.18+) รันได้",
    ],
    solutionNotes: [
      "ใช้ tsc ใน script ทำให้ทุกคนในทีมและ CI ตรวจด้วยเวอร์ชันและกติกาเดียวกัน",
      "Next.js มี tsconfig ของตัวเองและตรวจตอน build แต่การรัน tsc --noEmit แยกยังช่วยให้เห็น error เร็วระหว่างพัฒนา",
    ],
    reflection: [
      "โปรเจกต์ที่ซีเคยทำใช้ strict ไหม และถ้าเปิดวันนี้คิดว่าจะเจอ error ประเภทไหนมากที่สุด",
    ],
    extension: "เพิ่ม \"noUncheckedIndexedAccess\": true แล้วดูว่า array[0] กลายเป็น T | undefined อย่างไร และทำไมจึงปลอดภัยขึ้น",
  },
  "ts-async-types": {
    hook: "โค้ดเขียนว่า const activities = await response.json() as Activity[] tsc ผ่านสวยงาม แต่วันที่ API เปลี่ยนชื่อ field หน้าเว็บพังทั้งหน้าโดยไม่มีอะไรเตือน เพราะ as คือการสั่งให้ tsc เชื่อ ไม่ใช่การตรวจ",
    explain: [
      {
        heading: "1) Promise<T>",
        text: [
          "async function ที่คืน T มี type เป็น Promise<T> เช่น async function load(): Promise<Activity[]>",
          "await ของ Promise<T> ได้ T และ Promise.all ของหลาย Promise ได้ tuple ของผลแต่ละตัว",
        ],
      },
      {
        heading: "2) ข้อมูลภายนอกคือ unknown",
        text: [
          "response.json() และ JSON.parse คืน any ซึ่งไหลไปทุกที่โดยไม่ถูกตรวจ ให้รับเป็น unknown ทันที: const data: unknown = await response.json()",
          "จุดที่ข้อมูลภายนอกเข้ามา (API, request body, localStorage, ไฟล์) เรียกว่า trust boundary ต้องตรวจจริงก่อนส่งต่อ",
        ],
      },
      {
        heading: "3) type guard ตรวจจริง as แค่ยืนยัน",
        text: [
          "type guard (value: unknown): value is Activity ตรวจ field ทีละตัวด้วย typeof แล้ว tsc เชื่อผลของมัน",
          "ใน guard มักต้อง as Record<string, unknown> เพื่ออ่าน field หลังตรวจว่าเป็น object แล้ว ซึ่งยังปลอดภัยเพราะทุก field ถูกตรวจต่อ",
        ],
        code: "async function twice(n: number): Promise<number> {\n  return n * 2;\n}\nconst [a, b] = await Promise.all([twice(2), twice(5)]);\nconsole.log(a + b);",
        output: "14",
      },
    ],
    walkthrough: [
      "isActivity ตรวจว่าเป็น object ที่ไม่ใช่ null แล้วตรวจ title เป็น string และ capacity เป็น number",
      "loadActivities parse เป็น unknown ตรวจว่าเป็น array แล้ว filter ด้วย guard ได้ Activity[] จริง",
      "รายการ Bad ที่ capacity เป็น \"8\" ถูกกรองทิ้ง จึงเหลือ Hiking",
      "JSON ที่ไม่ใช่ array ทำให้ throw แล้ว catch พิมพ์ข้อความ",
    ],
    pitfalls: [
      "ใช้ as Activity[] กับ response: tsc เชื่อโดยไม่ตรวจ",
      "ปล่อย any จาก JSON.parse/response.json(): ประกาศ unknown ทันที",
      "guard ตรวจไม่ครบ field: tsc เชื่อ guard ของเรา จึงต้องตรวจทุก field ที่โค้ดใช้",
    ],
    checks: [
      { question: "async function f(): Promise<string> แล้ว const x = f(); x มี type อะไร", answer: "Promise<string> — ต้อง await จึงได้ string" },
      { question: "ทำไม as ไม่ปลอดภัยกับข้อมูลจาก API แต่ใช้ใน type guard ได้", answer: "ใน guard as ใช้แค่เพื่ออ่าน field ที่กำลังจะถูกตรวจทีละตัว ผลสุดท้ายมาจากการตรวจจริง ส่วน as กับ response ตรง ๆ ไม่มีการตรวจเลย" },
    ],
    recap: [
      "async คืน Promise<T>; await ได้ T",
      "ข้อมูลภายนอก = unknown ที่ trust boundary",
      "type guard ตรวจจริง; as แค่ยืนยัน",
    ],
    traceHint: "สำหรับแต่ละรายการใน JSON ให้ตอบคำถามของ isActivity ทีละข้อ (object? title string? capacity number?) แล้วตัดสินว่าอยู่หรือถูกกรอง",
    practiceHints: [
      "เขียน isMember ตามรูปแบบของ isActivity: ตรวจ object ก่อน แล้วตรวจทีละ field",
      "email เป็น optional: ผ่านเมื่อ record.email === undefined หรือ typeof record.email === \"string\"",
      "parseMembers: const data: unknown = JSON.parse(text); return Array.isArray(data) ? data.filter(isMember) : [];",
    ],
    acceptance: [
      "ตรวจเอง: tsc --noEmit --strict ผ่านและไม่มี any หรือ as Member[]",
      "ตรวจเอง: ตัวอย่างใน solution เหลือเฉพาะซี (id ของต้นเป็น string และ email ของฝนเป็นตัวเลข)",
    ],
    solutionNotes: [
      "การกรองทิ้งเป็นนโยบายหนึ่ง บางระบบควร throw ทั้งก้อนแทน ขึ้นกับว่าข้อมูลเสียบางส่วนรับได้ไหม",
      "ในโปรเจกต์จริงนิยมใช้ library ตรวจ schema (เช่น Zod) ซึ่งสร้างทั้ง type และ guard จากนิยามเดียว — หลักการเดียวกับที่เขียนเองในบทนี้",
    ],
    reflection: [
      "ใน API ที่ซีเคยเรียก มีจุดไหนที่ใช้ as หรือ any กับ response แล้วควรเปลี่ยนเป็น guard",
    ],
    extension: "เขียน fetchJson<T>(url: string, guard: (v: unknown) => v is T): Promise<T> ที่ throw เมื่อ response ไม่ ok หรือ guard ไม่ผ่าน",
  },
  "ts-project-planner": {
    hook: "Planner ที่เขียนด้วย JavaScript ทำงานได้แล้ว แต่ทุกครั้งที่แก้ field ต้องลุ้นว่าจะพังที่ไหน milestone นี้ใส่ type ให้ model และ logic ทั้งหมด เพื่อให้ tsc เป็นเพื่อนร่วมทีมที่ตรวจทุกการเปลี่ยนแปลง",
    explain: [
      {
        heading: "1) เริ่มจาก model",
        text: [
          "นิยาม BaseActivity ที่ทุกกิจกรรมมี แล้วสร้าง Activity เป็น discriminated union ของแบบ online (มี url) และ onsite (มี room)",
          "type อื่น (NewActivity, Summary, WeekPlan) สร้างจาก model ด้วย utility types หรือประกาศเป็นสัญญาของ function",
        ],
      },
      {
        heading: "2) แปลงทีละ function จากขอบเข้าหาแกน",
        text: [
          "ใส่ type ให้ helper เล็ก ๆ ก่อน (isFull, isValidTime) แล้วค่อย function ที่ประกอบ (summarizePlanner, planWeek)",
          "เมื่อ tsc แจ้ง error ให้ถามว่า “โค้ดผิด หรือ type ผิด” ก่อนแก้ อย่าแก้ด้วย any",
        ],
      },
      {
        heading: "3) ปิดขอบด้วยการตรวจข้อมูล",
        text: [
          "parseActivities รับข้อความ JSON เป็น unknown แล้วใช้ type guard ตรวจทั้ง field ร่วมและ field เฉพาะแบบ",
          "เกณฑ์ผ่าน: tsc --noEmit ด้วย strict ผ่าน ไม่มี any และไม่มี as ยกเว้นใน guard",
        ],
      },
    ],
    walkthrough: [
      "BaseActivity มี field ร่วม Activity เพิ่ม kind พร้อม url หรือ room ตามแบบ",
      "NewActivity ตัด field ที่ระบบเป็นคนกำหนด (id, joined, votes) แต่ยังบังคับให้ระบุแบบพร้อม field ของแบบนั้น",
      "summarizePlanner มี return type Summary tsc ตรวจว่าทุก field มีชนิดตรง ส่วนกรณีรายการว่าง (ranked[0] เป็น undefined) เราจัดการเองด้วย ?. และ ?? เพราะ strict อย่างเดียวไม่บังคับ",
      "create สร้าง Activity ที่สมบูรณ์ จากนั้นสรุปได้ total 2 และที่นั่งรวม 16",
    ],
    pitfalls: [
      "ใส่ any ให้ผ่านก่อนแล้วค่อยแก้: มักไม่ได้กลับมาแก้ ให้แก้ทีละ function จนสะอาด",
      "ทำ field เฉพาะแบบเป็น optional ทั้งหมด (url?: string; room?: string): เสียการ narrow ใช้ discriminated union",
      "guard ตรวจแค่ field ร่วม: กิจกรรม online ที่ไม่มี url จะหลุดเข้ามา",
    ],
    checks: [
      { question: "ทำไม NewActivity ไม่ควรมี joined และ votes", answer: "เพราะระบบเป็นคนตั้งค่าเริ่มต้น (0) ผู้ใช้ไม่ควรกำหนดเองตอนสร้าง" },
      { question: "ถ้าเพิ่มแบบ hybrid ใน Activity ส่วนไหนของ M3 ที่ tsc จะบังคับให้แก้", answer: "จุดที่ใช้ exhaustive check หรือ type ที่ต้องครอบคลุมทุกแบบ เช่น NewActivity, isActivity (ต้องแก้เอง tsc ไม่บังคับ) และ function ที่ switch ตาม kind" },
    ],
    recap: [
      "model ก่อน แล้ว type อื่นสร้างจาก model",
      "แปลงทีละ function ไม่ใช้ any",
      "ขอบรับ unknown + guard; เกณฑ์คือ tsc strict ผ่าน",
    ],
    traceHint: "เขียน type ของทุกตัวแปรใน summarizePlanner (full, ranked, ranked[0]) แล้วตรวจว่าตรงกับ Summary ทุก field",
    practiceHints: [
      "เริ่มจากคัดลอก type BaseActivity/Activity จากตัวอย่าง แล้วใส่ type ให้ isValidTime ก่อนเพราะเล็กที่สุด",
      "planWeek: รับ readonly Activity[] จัดกลุ่มลง Record<string, Activity[]> แล้วแปลงเป็น Record<string, string[]> ตอนท้าย",
      "isActivity ตรวจ field ร่วมทั้งหมดก่อน แล้วตรวจ (kind === \"online\" && url เป็น string) || (kind === \"onsite\" && room เป็น string)",
    ],
    acceptance: [
      "ตรวจเอง: npx tsc --noEmit --strict planner.ts ผ่าน",
      "ตรวจเอง: ไม่มี any และ as ใช้เฉพาะใน type guard",
      "ตรวจเอง: parseActivities ทิ้งรายการ online ที่ไม่มี url",
      "ตรวจเอง: planWeek ให้ผลเหมือน M2 กับข้อมูลชุดเดิม",
    ],
    solutionNotes: [
      "Object.entries(grouped) ให้ [day, items] ที่มี type ถูกต้อง อ่านง่ายกว่า Object.keys แล้ว index ซ้ำ",
      "M3 นำไปใช้ต่อใน Back-end: type เดียวกันใช้เป็น model ของ API และ guard ใช้ตรวจ request body",
    ],
    reflection: [
      "ระหว่างแปลง tsc ชี้ปัญหาอะไรในโค้ด M1–M2 ที่ซีไม่เคยสังเกตมาก่อน",
    ],
    extension: "เพิ่มแบบ hybrid ที่มีทั้ง url และ room แล้วไล่แก้ทุกจุดที่ tsc ชี้ จดว่ามีกี่จุดและ tsc จับได้กี่จุดเอง",
  },
};
