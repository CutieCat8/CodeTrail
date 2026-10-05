import type { RichLesson } from "@/types/curriculum";

const localRun = "ตรวจเองในเครื่อง: บทนี้ใช้ API ของ Node ที่ไม่มีใน browser จึงกด Run บนเว็บไม่ได้";

export const nodeFoundationLessons: Record<string, RichLesson> = {
  "node-runtime": {
    hook: "ซีเขียน JavaScript มาตลอดใน browser วันนี้ต้องเขียน server แล้วลองใช้ document.querySelector ใน server ผลคือ error ทันที การรู้ว่าโค้ดกำลังรันอยู่ที่ไหนคือเรื่องแรกของการเขียน back-end",
    analogy: {
      title: "engine เดียวกัน คนละรถ",
      text: [
        "เครื่องยนต์รุ่นเดียวกันใส่ได้ทั้งรถเก๋งและรถกระบะ เครื่องยนต์ทำงานเหมือนเดิม แต่รถแต่ละคันมีอุปกรณ์ต่างกัน รถกระบะมีกระบะท้าย รถเก๋งมีเบาะหลัง",
        "V8 คือเครื่องยนต์ที่อยู่ทั้งใน Chrome และ Node ภาษา JavaScript ทำงานเหมือนกัน แต่ browser ให้ document และ window ส่วน Node ให้ fs, process และ http",
      ],
      mapping: [
        ["เครื่องยนต์", "V8 engine ที่รันภาษา JavaScript"],
        ["ตัวรถแต่ละคัน", "runtime: browser หรือ Node"],
        ["อุปกรณ์เฉพาะของรถ", "API ของ runtime เช่น document (browser) หรือ fs (Node)"],
      ],
      limits: "รถสองคันใช้อุปกรณ์ร่วมกันไม่ได้เลย แต่ runtime สองแบบมี API บางตัวร่วมกัน เช่น console, setTimeout, fetch และ URL ซึ่งทำงานคล้ายกันทั้งสองที่",
    },
    explain: [
      {
        heading: "1) Node = V8 + API สำหรับเครื่องและเครือข่าย",
        text: [
          "Node อ่านไฟล์ได้ เปิด server ได้ เรียกโปรแกรมอื่นได้ ซึ่ง browser ทำไม่ได้เพื่อความปลอดภัยของผู้ใช้",
          "ไม่มี DOM ใน Node เพราะไม่มีหน้าเว็บให้แสดง",
        ],
      },
      {
        heading: "2) รันไฟล์และ REPL",
        text: [
          "node app.mjs รันไฟล์จากบนลงล่างแล้วจบ (ยกเว้นมีงานค้าง เช่น server ที่ฟังอยู่หรือ timer)",
          "พิมพ์ node เฉย ๆ เข้า REPL พิมพ์โค้ดแล้วเห็นผลทันที เหมาะลองของสั้น ๆ ออกด้วย .exit หรือ Ctrl+C สองครั้ง",
        ],
      },
      {
        heading: "3) เวอร์ชันของ Node สำคัญ",
        text: [
          "บทเรียนนี้อ้างอิง Node 24 LTS (Node 22 LTS ใช้ได้เกือบทั้งหมด) ตรวจด้วย node --version",
          "บาง feature มีเฉพาะเวอร์ชันใหม่ เช่น import.meta.dirname (20.11+) และการรัน .ts โดยตรง (22.18+) ถ้าตัวอย่างไม่ทำงาน ให้เช็กเวอร์ชันก่อน",
        ],
      },
    ],
    walkthrough: [
      "บรรทัดแรกอ่านเวอร์ชันจาก process.versions.node แล้วเทียบตัวเลขแรก (major)",
      "typeof globalThis.document เป็น \"undefined\" เพราะ Node ไม่มี DOM",
      "typeof globalThis.process เป็น \"object\" เพราะ process เป็น API ของ Node",
      "setTimeout มีอยู่เพราะ Node ให้มาเหมือน browser แต่เป็น API ของ runtime ไม่ใช่ของภาษา",
    ],
    pitfalls: [
      "ใช้ document/window ในโค้ดฝั่ง server: ReferenceError แยกโค้ดตามที่ที่มันรัน",
      "ใช้ Node เวอร์ชันเก่าแล้วตัวอย่างไม่ทำงาน: เช็ก node --version ก่อน debug อย่างอื่น",
      "คิดว่า REPL คือที่เขียนโปรแกรม: งานจริงเขียนเป็นไฟล์แล้ว commit",
    ],
    checks: [
      { question: "อะไรต่อไปนี้มีใน Node: fs, document, process, fetch", answer: "fs, process และ fetch (Node 18+) ไม่มี document" },
      { question: "ทำไม node server.mjs บางครั้งไม่จบเองเหมือน script อื่น", answer: "เพราะ server ยังฟัง port อยู่ (มีงานค้างใน event loop) Node จะจบเมื่อไม่มีงานค้าง" },
    ],
    recap: [
      "Node = V8 + API สำหรับไฟล์ เครือข่าย และ process",
      "ไม่มี DOM ใน Node",
      "เช็กเวอร์ชันด้วย node --version (อ้างอิง Node 24 LTS)",
    ],
    traceHint: "ข้างแต่ละบรรทัดเขียนว่า API ที่ใช้มาจาก “ภาษา”, “Node” หรือ “ทั้ง browser และ Node” แล้วตอบว่าบรรทัดไหนพังถ้ารันใน browser",
    practiceHints: [
      "สร้างไฟล์ hello.mjs แล้วใช้ console.log สามบรรทัด",
      "ชื่อใส่เป็นข้อความ เวอร์ชันใช้ process.version เวลาใช้ new Date().toISOString()",
      "รัน node hello.mjs แล้วเข้า REPL ด้วย node พิมพ์ [1, 2, 3].map((n) => n * 2) ดูผล ออกด้วย .exit",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: node hello.mjs พิมพ์สามบรรทัดรวมเวอร์ชัน Node (v22 ขึ้นไป)",
      "ตรวจเอง: ใน REPL ได้ [ 2, 4, 6 ] และออกจาก REPL ได้",
    ],
    solutionNotes: [
      "process.version ขึ้นต้นด้วย v (เช่น v24.x.x) ส่วน process.versions.node ไม่มี v",
      "นามสกุล .mjs บอก Node ให้ถือไฟล์เป็น ES module โดยไม่ต้องตั้งค่าใน package.json",
    ],
    reflection: [
      "ยกตัวอย่างงานหนึ่งที่ต้องทำฝั่ง server (Node) และอีกงานที่ต้องทำใน browser ในโปรเจกต์ Planner",
    ],
    extension: "ใน REPL ลองพิมพ์ process.platform, process.cwd() และ os.cpus().length (ต้อง import os จาก node:os ผ่าน await import(\"node:os\")) แล้วจดว่าเครื่องตัวเองเป็นอย่างไร",
  },
  "node-process-cli": {
    hook: "script สำหรับตรวจข้อมูลก่อน deploy พิมพ์ว่า “ผิดพลาด” ทุกครั้ง แต่ CI กลับขึ้นเครื่องหมายถูกสีเขียว เพราะโปรแกรมจบด้วย exit code 0 เครื่องมืออื่นคุยกับโปรแกรมของเราผ่าน argument, environment และ exit code ไม่ใช่ข้อความที่คนอ่าน",
    explain: [
      {
        heading: "1) argv: argument ที่ผู้ใช้ส่งมา",
        text: [
          "process.argv[0] คือ path ของ node, [1] คือไฟล์ script, ส่วน process.argv.slice(2) คือสิ่งที่ผู้ใช้พิมพ์ต่อท้าย",
          "ค่าทุกตัวเป็น string ต้องแปลงและตรวจเหมือน input จากฟอร์ม",
        ],
      },
      {
        heading: "2) env: ตั้งค่าจากภายนอก",
        text: [
          "process.env.PORT อ่าน environment variable ค่าเป็น string หรือ undefined ถ้าไม่ได้ตั้ง",
          "ใช้กับค่าที่ต่างกันในแต่ละเครื่อง (port, URL ฐานข้อมูล, secret) แทนการเขียนตายตัวในโค้ด ตั้งชั่วคราวใน bash ด้วย PORT=4000 node app.mjs หรือใน PowerShell ด้วย $env:PORT=4000",
        ],
      },
      {
        heading: "3) stdout, stderr และ exit code",
        text: [
          "console.log → stdout (ผลลัพธ์ที่โปรแกรมอื่นอาจนำไปใช้ต่อ), console.error → stderr (ข้อความผิดพลาดสำหรับคน) แยกกันทำให้ redirect ผลลัพธ์ได้โดยไม่ปน error",
          "process.exitCode = 1 ตั้งรหัสตอนจบโดยให้โปรแกรมทำงานที่ค้างให้เสร็จก่อน ส่วน process.exit(1) หยุดทันทีซึ่งอาจตัด output ที่ยังเขียนไม่เสร็จ",
        ],
        code: "const exitCodeFor = (ok) => (ok ? 0 : 1);\nconsole.log(exitCodeFor(true), exitCodeFor(false));",
        output: "0 1",
      },
    ],
    walkthrough: [
      "ตัวอย่างจำลอง process.argv ด้วย args เพื่อให้รันได้ทุกที่ destructure ข้ามสองตำแหน่งแรกแล้วตั้งค่าเริ่มต้นให้ name และ timesText",
      "แปลง timesText เป็นตัวเลขแล้วตรวจ ถ้าผิดเขียน stderr และตั้ง exitCode = 1",
      "ถ้าถูก วนพิมพ์คำทักทายตามจำนวนครั้งลง stdout",
      "อ่าน port จาก env พร้อมค่าเริ่มต้น \"3000\" ผ่าน ?? แล้วแปลงเป็นตัวเลข",
    ],
    pitfalls: [
      "ลืมว่า argv/env เป็น string: \"3\" + 1 ได้ \"31\" แปลงก่อนใช้",
      "พิมพ์ error ด้วย console.log: ปนกับผลลัพธ์ปกติ ใช้ console.error",
      "จบด้วย exit code 0 ทั้งที่ล้มเหลว: CI/script อื่นเข้าใจผิดว่าสำเร็จ",
      "เขียน secret ไว้ในโค้ด: ใช้ environment variable และไม่ commit ไฟล์ .env",
    ],
    checks: [
      { question: "node sum.mjs 10 20 แล้ว process.argv.slice(2) คืออะไร", answer: "[\"10\", \"20\"] เป็น string ทั้งคู่" },
      { question: "ทำไม process.exitCode = 1 มักดีกว่า process.exit(1)", answer: "exitCode ให้โปรแกรมจบเองตามปกติ output ที่ค้างจึงถูกเขียนครบ ส่วน exit() หยุดทันที" },
    ],
    recap: [
      "argv.slice(2) = argument ของผู้ใช้ เป็น string",
      "env = ตั้งค่าจากภายนอก string หรือ undefined",
      "ผลปกติ → stdout, ผิดพลาด → stderr + exit code ที่ไม่ใช่ 0",
    ],
    traceHint: "เขียนค่าใน args ทีละตำแหน่ง แล้วดูว่าแต่ละตัวแปรจาก destructuring ได้ค่าอะไร จากนั้นตามกิ่ง if",
    practiceHints: [
      "อ่าน argument ทั้งหมดด้วย process.argv.slice(2) แล้วหาตัวที่แปลงเป็นตัวเลขไม่ได้ก่อนรวม",
      "ใช้ filter หาตัวที่ผิด (ข้อความว่างหรือ Number.isNaN(Number(text))) ถ้ามี ให้ console.error แล้วตั้ง exitCode",
      "ถ้าไม่มีตัวผิด ใช้ reduce รวม Number(text) แล้ว console.log(total) — ลอง node sum.mjs 10 x 5 แล้ว echo $? ควรได้ 1",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: node sum.mjs 10 20 5 พิมพ์ 35 และ exit code 0",
      "ตรวจเอง: node sum.mjs 10 x พิมพ์ข้อความที่บอกว่า x ผิดลง stderr ไม่พิมพ์ผลรวม และ exit code 1",
      "ตรวจเอง: ไม่มี argument เลยพิมพ์ 0",
    ],
    solutionNotes: [
      "ตรวจทั้งหมดก่อนแล้วค่อยรวม ทำให้รายงานตัวที่ผิดได้ครบในครั้งเดียว",
      "ไม่มี argument ได้ 0 จาก reduce ที่มีค่าเริ่มต้น ซึ่งสมเหตุสมผลสำหรับผลรวม",
    ],
    reflection: [
      "ในโปรเจกต์ที่เคยทำ มีค่าไหนที่เขียนตายตัวในโค้ดแต่ควรย้ายไปเป็น environment variable",
    ],
    extension: "รองรับ flag --avg ที่เปลี่ยนจากผลรวมเป็นค่าเฉลี่ย (ตรวจว่ามี \"--avg\" ใน argv แล้วตัดออกก่อนแปลงตัวเลข)",
  },
  "node-modules": {
    hook: "ซี clone โปรเจกต์เก่าของรุ่นพี่มา เจอทั้ง require และ import ในไฟล์ต่าง ๆ พอเพิ่มไฟล์ใหม่ด้วย import ก็ได้ error ว่าใช้ import นอก module ไม่ได้ บทนี้ทำให้รู้ว่า Node ตัดสินว่าไฟล์ไหนเป็น module แบบไหน",
    explain: [
      {
        heading: "1) Node รู้ได้อย่างไรว่าไฟล์เป็น ESM",
        text: [
          "นามสกุล .mjs = ES module เสมอ, .cjs = CommonJS เสมอ, .js ขึ้นกับ \"type\" ใน package.json ที่ใกล้ที่สุด: \"module\" = ESM, \"commonjs\" = CommonJS และถ้าไม่ตั้งเลย Node 22.7+ จะดูจาก syntax ในไฟล์ (มี import/export ก็ถือเป็น ESM) ซึ่งช้ากว่าเล็กน้อยและทำให้ผู้อ่านเดายาก จึงควรตั้ง \"type\" ให้ชัดเสมอ",
          "โปรเจกต์ใหม่แนะนำ \"type\": \"module\" แล้วใช้ .js ได้เลย",
        ],
      },
      {
        heading: "2) import ใน Node: ใส่นามสกุลและใช้ node:",
        text: [
          "ไฟล์ของเราต้องระบุ path พร้อมนามสกุล: import { isFull } from \"./planner.mjs\"",
          "โมดูลในตัวใช้ prefix node: เช่น node:fs/promises, node:path, node:http เพื่อแยกจาก package ใน npm ที่อาจชื่อซ้ำ",
          "import.meta.dirname และ import.meta.filename บอกที่อยู่ของไฟล์ปัจจุบัน ใช้สร้าง path ไปยังไฟล์ข้างโค้ด",
        ],
      },
      {
        heading: "3) อ่าน CommonJS ให้ออก",
        text: [
          "CommonJS: const fs = require(\"node:fs\"); และส่งออกด้วย module.exports = { isFull }; ยังพบในโปรเจกต์และ tutorial เก่าจำนวนมาก",
          "ESM import CommonJS package ได้ แต่ require() ไฟล์ ESM ได้จำกัด บทเรียนนี้เขียนใหม่ด้วย ESM เสมอ แต่ควรอ่านแบบเก่าออก",
        ],
        code: "import path from \"node:path\";\nconsole.log(path.join(\"src\", \"routes\", \"..\", \"services\", \"planner.mjs\"));",
        output: "src/services/planner.mjs",
      },
    ],
    walkthrough: [
      "import.meta.dirname ให้ path เต็มของโฟลเดอร์ (path.isAbsolute เป็น true)",
      "import.meta.url เป็น URL แบบ file:// แปลงเป็น path ด้วย fileURLToPath",
      "path.join ต่อชื่อโฟลเดอร์และไฟล์ด้วยตัวคั่นของระบบ (ผลในตัวอย่างเป็นแบบ Linux/macOS บน Windows จะใช้ \\)",
      "path.extname คืนนามสกุลตัวสุดท้ายรวมจุด",
    ],
    pitfalls: [
      "import โดยไม่ใส่นามสกุล: ERR_MODULE_NOT_FOUND",
      "ตั้ง \"type\": \"commonjs\" (หรือใช้ Node เวอร์ชันเก่า) แล้วเขียน import ในไฟล์ .js: SyntaxError ว่าใช้ import นอก module ไม่ได้ — ตั้ง \"type\" ให้ตรงกับแบบที่เขียน",
      "ใช้ path ที่ขึ้นกับโฟลเดอร์ที่รันคำสั่ง แทน import.meta.dirname: ไฟล์หาไม่เจอเมื่อรันจากโฟลเดอร์อื่น",
    ],
    checks: [
      { question: "ไฟล์ util.js ที่ใช้ require และอยู่ในโปรเจกต์ที่ package.json ไม่มี \"type\" จะถูกมองเป็น module แบบไหน", answer: "CommonJS (Node 22.7+ จะถือเป็น ESM ก็ต่อเมื่อเจอ syntax ของ ESM เช่น import/export) — เพราะคาดเดายากจึงควรตั้ง \"type\" ให้ชัด" },
      { question: "ทำไมควรเขียน node:fs แทน fs", answer: "บอกชัดว่าเป็นโมดูลในตัวของ Node ไม่สับสนกับ package ใน npm" },
    ],
    recap: [
      ".mjs = ESM, .cjs = CommonJS, .js ตาม \"type\" (ตั้งให้ชัดเสมอ)",
      "import ไฟล์ของเราต้องใส่นามสกุล; โมดูลในตัวใช้ node:",
      "import.meta.dirname สำหรับ path ข้างไฟล์โค้ด",
    ],
    traceHint: "สำหรับ path.join ให้เขียนโฟลเดอร์ทีละชั้นบนกระดาษ เจอ \"..\" ให้ขีดชั้นก่อนหน้าทิ้ง",
    practiceHints: [
      "เติมคำว่า export หน้า function ที่จะให้ไฟล์อื่นใช้",
      "ใน main.mjs ใช้ import { isFull, summarize } from \"./planner.mjs\"; (มีนามสกุล)",
      "summarize ใช้ isFull กับ filter แล้วคืน { total, full, open } — รัน node main.mjs ทั้งสองไฟล์ต้องอยู่โฟลเดอร์เดียวกัน",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: node main.mjs พิมพ์ true และ object สรุป",
      "ตรวจเอง: ลบ export ของ isFull แล้วได้ SyntaxError ว่าไม่มี export ชื่อนี้",
    ],
    solutionNotes: [
      "planner.mjs เป็น pure logic ไม่มี console.log ทำให้ import ไปใช้ได้ทั้ง CLI, server และ test",
      "named export ทำให้ editor ช่วยเติมชื่อและตรวจการสะกดได้",
    ],
    reflection: [
      "ถ้า Planner มีทั้ง CLI และ API ไฟล์ไหนควรเป็น logic ที่ใช้ร่วม และไฟล์ไหนเป็นส่วนเชื่อม input/output",
    ],
    extension: "เขียน planner.cjs แบบ CommonJS ที่ export function เดียวกันด้วย module.exports แล้วลอง import จาก main.mjs ด้วย import planner from \"./planner.cjs\" สังเกตว่า default import ใช้ได้แน่นอนกับ CommonJS (named import ใช้ได้บางกรณีเมื่อ Node ตรวจพบชื่อ export)",
  },
  "node-npm": {
    hook: "เพื่อนส่งโปรเจกต์มาใน zip ขนาด 300 MB เพราะติด node_modules มาด้วย พอแตกไฟล์บนเครื่องซีกลับรันไม่ได้อยู่ดี เพราะ native package ถูก build มาสำหรับเครื่องอื่น npm มีวิธีมาตรฐานที่ทำให้ทุกเครื่องสร้าง environment เดียวกันได้จากไฟล์ไม่กี่ KB",
    explain: [
      {
        heading: "1) package.json คือบัตรประจำตัวโปรเจกต์",
        text: [
          "name, version, \"type\": \"module\", scripts และรายการ package ที่ใช้",
          "npm init -y สร้างไฟล์เริ่มต้น แก้ด้วยมือได้เพราะเป็น JSON ธรรมดา",
        ],
      },
      {
        heading: "2) dependencies กับ devDependencies",
        text: [
          "npm install express → dependencies (ต้องใช้ตอนรันจริง) / npm install --save-dev typescript → devDependencies (ใช้ตอนพัฒนา เช่น test, lint, compiler)",
          "ระบบ deploy บางแบบติดตั้งเฉพาะ dependencies การใส่ผิดกลุ่มทำให้ production ขาด package หรือหนักเกินจำเป็น",
        ],
      },
      {
        heading: "3) lockfile, semver และคำสั่งที่ใช้บ่อย",
        text: [
          "package-lock.json บันทึกเวอร์ชันจริงทุก package (รวมที่ซ้อนอยู่) ต้อง commit ส่วน node_modules ไม่ commit (ใส่ใน .gitignore)",
          "^1.4.2 รับ 1.x.x ที่ ≥ 1.4.2 / ~1.4.2 รับ 1.4.x ที่ ≥ 1.4.2 / 1.4.2 เท่านั้น",
          "npm run <script> รัน script, npm ci ติดตั้งตาม lockfile เป๊ะ (ลบ node_modules เดิมก่อน), npx <tool> รันเครื่องมือจาก package โดยไม่ติดตั้ง global",
        ],
      },
    ],
    walkthrough: [
      "pkg จำลอง package.json ที่มี script สองตัวและ dependency สองกลุ่ม",
      "allows ตรวจ range แบบย่อ: major ต้องตรง, ~ ต้องตรง minor ด้วย, แล้วต้องไม่ต่ำกว่าเวอร์ชันขั้นต่ำ",
      "^5.1.0 รับ 5.2.0 แต่ไม่รับ 6.0.0 (major เปลี่ยน อาจมี breaking change)",
      "~5.9.2 รับ 5.9.3 แต่ไม่รับ 5.10.0",
    ],
    pitfalls: [
      "commit node_modules: repo ใหญ่และอาจใช้ข้ามระบบปฏิบัติการไม่ได้",
      "ไม่ commit package-lock.json: เครื่องอื่นอาจได้เวอร์ชันต่างจากที่ทดสอบ",
      "ติดตั้งเครื่องมือแบบ global แล้วเพื่อนไม่มี: ใส่เป็น devDependency แล้วเรียกผ่าน npm script",
    ],
    checks: [
      { question: "vitest ควรอยู่กลุ่มไหน", answer: "devDependencies เพราะใช้ตอนพัฒนา/ทดสอบ ไม่ใช่ตอน server รันจริง" },
      { question: "npm install กับ npm ci ต่างกันอย่างไร", answer: "install อาจอัปเดต lockfile ภายใน range ที่อนุญาต ส่วน ci ติดตั้งตาม lockfile เป๊ะและล้มเหลวถ้า lockfile ไม่ตรงกับ package.json" },
    ],
    recap: [
      "package.json อธิบายโปรเจกต์; lockfile ล็อกเวอร์ชันจริง (commit ทั้งคู่)",
      "dependencies = ใช้ตอนรัน; devDependencies = ใช้ตอนพัฒนา",
      "^ ยืด minor/patch, ~ ยืดแค่ patch",
    ],
    traceHint: "สำหรับแต่ละคู่ range/version เขียน major.minor.patch แยกกันแล้วตอบสามคำถาม: major ตรงไหม, (ถ้า ~) minor ตรงไหม, ไม่ต่ำกว่าขั้นต่ำใช่ไหม",
    practiceHints: [
      "เริ่มจาก npm init -y แล้วแก้ package.json ด้วยมือ",
      "เพิ่ม \"type\": \"module\" และ scripts สองตัว: start รันไฟล์ใน src, check:node รัน node --version",
      "สร้าง src/main.mjs ที่ console.log ข้อความ แล้วรัน npm start และ npm run check:node",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: npm start รัน src/main.mjs สำเร็จ",
      "ตรวจเอง: npm run check:node พิมพ์เวอร์ชัน Node",
      "ตรวจเอง: .gitignore มี node_modules/ แต่ไม่ได้ ignore package-lock.json",
    ],
    solutionNotes: [
      "script \"test\": \"node --test\" จะใช้ในบท node-test",
      "ไม่ต้องติดตั้งอะไรในบทนี้ เพื่อเห็นโครงสร้าง package.json ชัด ๆ ก่อนเพิ่ม dependency จริงในคอร์ส Back-end",
    ],
    reflection: [
      "เขียนอธิบายในหนึ่งย่อหน้าว่าถ้าเพื่อน clone โปรเจกต์ไป ต้องรันคำสั่งอะไรบ้างเพื่อให้ได้ environment เหมือนเรา",
    ],
    extension: "ติดตั้ง package เล็ก ๆ หนึ่งตัว (เช่น npm install --save-dev prettier) แล้วเปิด package-lock.json ดูว่ามีอะไรถูกเพิ่ม จากนั้น npm uninstall ออก",
  },
  "node-fs": {
    hook: "CLI ของ Planner ต้องอ่านไฟล์กิจกรรมที่ผู้ใช้ส่งมา ไฟล์อาจไม่มี อาจเป็น JSON เสีย หรืออยู่คนละโฟลเดอร์กับที่คิด ถ้าโปรแกรมพังด้วย stack trace ยาว ๆ ผู้ใช้จะไม่รู้ว่าต้องแก้อะไร",
    explain: [
      {
        heading: "1) fs/promises + await",
        text: [
          "import { readFile, writeFile, mkdir, readdir } from \"node:fs/promises\" ทุก function คืน Promise ใช้ await",
          "readFile(file, \"utf8\") ได้ string ถ้าไม่ระบุ encoding ได้ Buffer (byte ดิบ)",
          "writeFile เขียนทับทั้งไฟล์ mkdir(dir, { recursive: true }) สร้างโฟลเดอร์ซ้อนและไม่ error ถ้ามีแล้ว",
        ],
      },
      {
        heading: "2) path สัมพันธ์กับอะไร",
        text: [
          "path แบบ \"data/a.json\" อิงกับ process.cwd() (โฟลเดอร์ที่รันคำสั่ง) ไม่ใช่โฟลเดอร์ของไฟล์โค้ด",
          "ไฟล์ที่มากับโค้ด (เช่น template หรือข้อมูลตัวอย่าง) อ้างด้วย path.join(import.meta.dirname, \"data\", \"a.json\")",
        ],
      },
      {
        heading: "3) แยก error ด้วย error.code",
        text: [
          "error จากระบบไฟล์มี code: ENOENT (ไม่มีไฟล์), EACCES/EPERM (ไม่มีสิทธิ์), EISDIR (เป็นโฟลเดอร์) ตรวจ code เพื่อเลือกวิธีรับมือ",
          "จัดการเฉพาะกรณีที่รู้ว่าจะทำอะไร (เช่นไม่มีไฟล์ = เริ่มจากรายการว่าง) แล้ว throw ต่อสำหรับกรณีอื่น อย่ากลืน error ทุกชนิด",
        ],
      },
    ],
    walkthrough: [
      "สร้างโฟลเดอร์ demo-data ใต้ cwd (ไม่ error ถ้ามีอยู่แล้ว)",
      "เขียน array เป็น JSON แบบจัดย่อหน้า แล้วอ่านกลับเป็น string และ parse",
      "พยายามอ่านไฟล์ที่ไม่มีอยู่ ได้ error ที่ code เป็น ENOENT",
    ],
    pitfalls: [
      "ลืม await: ได้ Promise แทนข้อมูล",
      "ไม่ระบุ \"utf8\": ได้ Buffer แล้ว JSON.parse แปลก ๆ",
      "ใช้ path ที่ขึ้นกับ cwd แล้วรันจากโฟลเดอร์อื่น: ENOENT ทั้งที่ไฟล์มีอยู่",
      "catch ทุก error แล้วคืน []: ซ่อนปัญหาสิทธิ์หรือ JSON เสีย",
    ],
    checks: [
      { question: "ถ้ารัน node scripts/load.mjs จากรากโปรเจกต์ readFile(\"data.json\") จะหาไฟล์ที่ไหน", answer: "data.json ที่รากโปรเจกต์ (cwd) ไม่ใช่ใน scripts/" },
      { question: "ทำไม readActivities ควร throw ต่อเมื่อ error ไม่ใช่ ENOENT", answer: "เพราะไม่รู้ว่าควรรับมืออย่างไร (เช่นไม่มีสิทธิ์) การส่งต่อให้ผู้เรียกตัดสินใจดีกว่าแสร้งว่าไม่มีข้อมูล" },
    ],
    recap: [
      "fs/promises + await + \"utf8\"",
      "relative path อิง cwd; ไฟล์ข้างโค้ดใช้ import.meta.dirname",
      "แยก error ด้วย code จัดการเฉพาะที่รู้วิธี",
    ],
    traceHint: "เขียน path เต็มของทุกไฟล์ที่ถูกอ่าน/เขียน โดยสมมติว่า cwd คือ /home/sea/project แล้วตามว่าคำสั่งไหนสำเร็จ คำสั่งไหน throw",
    practiceHints: [
      "แยกสองขั้นที่ผิดได้ต่างกัน: อ่านไฟล์ (อาจไม่มี) และ parse JSON (อาจเสีย)",
      "ครอบ readFile ด้วย try/catch ที่ตรวจ error.code === \"ENOENT\" แล้ว return [] นอกนั้น throw error",
      "ครอบ JSON.parse ด้วย try/catch แยก แล้ว throw new Error(\"ไฟล์ \" + file + \" ไม่ใช่ JSON ที่ถูกต้อง\")",
    ],
    acceptance: [
      "ตรวจเองในเครื่อง: บทนี้ใช้ API ของ Node ที่ไม่มีใน browser จึงกด Run บนเว็บไม่ได้",
      "ตรวจเอง: ไฟล์ที่มี array คืน array ที่อ่านได้ และไฟล์ที่ไม่มีคืน []",
      "ตรวจเอง: JSON เสีย throw error ที่มีชื่อไฟล์ และ JSON ที่ไม่ใช่ array ({} หรือ null) throw error อีกข้อความ",
    ],
    solutionNotes: [
      "แยก try สองชั้นทำให้ข้อความผิดพลาดบอกได้ตรงว่าพังที่ขั้นไหน",
      "ตรวจ Array.isArray นอก try ของ JSON.parse เพื่อไม่ให้ error เรื่องรูปร่างถูกเข้าใจผิดว่าเป็น JSON เสีย",
      "การตรวจทีละรายการ (เช่นมี title ไหม) ทำใน M4 ก่อนส่งให้ logic",
    ],
    reflection: [
      "ในงานที่เคยทำ มีจุดไหนที่ catch error ทุกชนิดแล้วทำต่อเหมือนไม่มีอะไรเกิดขึ้น",
    ],
    extension: "เขียน saveActivities(file, activities) ที่เขียนลงไฟล์ชั่วคราวก่อน (file + \".tmp\") แล้วค่อย rename ทับไฟล์จริงด้วย fs/promises.rename เพื่อไม่ให้ไฟล์เสียถ้าโปรแกรมพังกลางทาง",
  },
  "node-event-loop": {
    hook: "API ของกลุ่มเพื่อนช้าเป็นช่วง ๆ ทุกคนบ่นพร้อมกัน สาเหตุคือ endpoint ออกรายงานที่วนคำนวณยาว 3 วินาที ระหว่างนั้น request อื่นทั้งหมดต้องรอ ทั้งที่ Node ขึ้นชื่อว่ารับงานพร้อมกันได้เยอะ",
    analogy: {
      title: "event loop เหมือนพนักงานเสิร์ฟคนเดียวในร้านที่มีครัว",
      text: [
        "ร้านมีพนักงานเสิร์ฟคนเดียว เขารับออร์เดอร์แล้วส่งเข้าครัว ไม่ยืนรอหน้าเตา ระหว่างนั้นไปรับโต๊ะอื่นต่อ เมื่อครัวกดกริ่งว่าอาหารเสร็จ เขาค่อยไปยกเสิร์ฟ",
        "ถ้าวันหนึ่งพนักงานคนนี้ต้องนั่งพับผ้าเช็ดปาก 3 นาทีเอง ทุกโต๊ะต้องรอแม้ครัวจะทำอาหารเสร็จแล้ว",
      ],
      mapping: [
        ["พนักงานเสิร์ฟคนเดียว", "thread หลักที่รัน JavaScript"],
        ["ส่งออร์เดอร์เข้าครัวแล้วไปทำอย่างอื่น", "non-blocking I/O (อ่านไฟล์ เรียกเครือข่าย)"],
        ["กริ่งจากครัว", "callback/Promise ที่พร้อมให้ event loop หยิบมาทำ"],
        ["พับผ้าเช็ดปากเองนาน ๆ", "ลูปคำนวณหนักหรือ readFileSync ที่บล็อก thread หลัก"],
      ],
      limits: "พนักงานจริงเลือกเองได้ว่าจะไปโต๊ะไหนก่อน แต่ event loop ทำตามลำดับ phase ที่กำหนด และ “ครัว” ของ Node (ระบบปฏิบัติการ/thread pool) ทำงานที่ Node เตรียมไว้ เช่น I/O, crypto และ zlib แต่ไม่ได้ช่วยรันโค้ด JavaScript ที่เราเขียนเอง งานคำนวณของเราต้องใช้ worker_threads",
    },
    explain: [
      {
        heading: "1) thread เดียว แต่ไม่รอ I/O",
        text: [
          "โค้ด JavaScript ของเราทำงานทีละบรรทัดบน thread เดียว แต่ await readFile หรือ fetch แค่ “สั่งงาน” แล้วปล่อย thread ไปทำ callback อื่น",
          "นี่คือเหตุผลที่ server หนึ่งตัวรับหลาย request ที่กำลังรอฐานข้อมูลได้พร้อมกัน",
        ],
      },
      {
        heading: "2) ลำดับที่เชื่อถือได้",
        text: [
          "โค้ด synchronous ปัจจุบันจบก่อนเสมอ แล้ว callback ของ Promise ที่พร้อม (microtask) ถูกทำจนหมด จากนั้นจึงถึงงานในคิวของ event loop เช่น timer",
          "หลัง callback ของ I/O setImmediate มาก่อน setTimeout(…, 0) เสมอ แต่ที่ระดับบนสุดของไฟล์ ลำดับของสองตัวนี้ไม่รับประกัน",
          "process.nextTick เป็นคิวพิเศษของ Node: ใน CommonJS ทำก่อน Promise แต่ใน ES module ที่ระดับบนสุดของไฟล์ Promise อาจมาก่อน อย่าเขียนโค้ดที่พึ่งลำดับนี้",
        ],
      },
      {
        heading: "3) อะไรบล็อก event loop",
        text: [
          "ลูปคำนวณยาว ๆ, JSON.parse ข้อมูลใหญ่มาก, function ...Sync เช่น readFileSync ใน request handler, regex ที่ย้อนรอยหนัก",
          "ทางแก้: ใช้ API แบบ async, แบ่งงานเป็นชิ้น, ย้ายงานคำนวณหนักไป worker_threads หรือ job queue",
        ],
        code: "const start = Date.now();\nsetTimeout(() => console.log(\"timer ช้าไป\", Date.now() - start >= 50 ? \"อย่างน้อย 50ms\" : \"น้อยกว่า 50ms\"), 0);\nwhile (Date.now() - start < 50) {}\nconsole.log(\"ลูปบล็อกเสร็จ\");",
        output: "ลูปบล็อกเสร็จ\ntimer ช้าไป อย่างน้อย 50ms",
      },
    ],
    walkthrough: [
      "บรรทัด synchronous พิมพ์ 1 และ 2 ก่อน ระหว่างนั้นลงทะเบียน timer และ then ของ Promise",
      "เมื่อ synchronous จบ Promise ที่พร้อมทำก่อน (3) แล้ว event loop ไปหยิบ timer (4)",
      "await timer 20 ms ให้ส่วนแรกจบแน่นอน แล้ว await readFile รอ I/O",
      "หลัง I/O ตั้งทั้ง setTimeout 0 และ setImmediate: check phase (immediate, 5) มาก่อน timers รอบถัดไป (6)",
    ],
    pitfalls: [
      "readFileSync หรือลูปหนักใน request handler: ทุก request ค้าง",
      "คิดว่า setTimeout(fn, 0) ทำงานทันที: รอให้ synchronous และ microtask จบก่อน และอาจช้ากว่าที่ตั้งถ้า event loop ถูกบล็อก",
      "เขียนโค้ดที่ถูกต้องเฉพาะเมื่อ nextTick/Promise/immediate เรียงแบบหนึ่ง: ลำดับบางคู่ไม่รับประกัน ใช้ await ให้ชัดแทน",
    ],
    checks: [
      { question: "ทำไม setTimeout(fn, 0) ในตัวอย่าง “ลูปบล็อก” จึงทำงานช้ากว่า 0 ms มาก", answer: "เพราะ while ครอง thread หลักอยู่ 50 ms timer พร้อมแล้วแต่ event loop ไม่มีโอกาสหยิบมาทำจนลูปจบ" },
      { question: "ระหว่าง await fetch(...) ใน handler หนึ่ง server รับ request อื่นได้ไหม", answer: "ได้ เพราะ await ปล่อย thread ให้ event loop ทำ callback อื่นระหว่างรอเครือข่าย" },
    ],
    recap: [
      "thread เดียว + I/O ไม่บล็อก = รับหลายงานพร้อมกัน",
      "synchronous → microtask (Promise) → คิวของ event loop; หลัง I/O immediate ก่อน timeout",
      "งานคำนวณหนัก/…Sync ใน handler บล็อกทุก request",
    ],
    traceHint: "แบ่งกระดาษเป็นคอลัมน์: synchronous · microtask · timers · check (immediate) แล้วย้าย callback ลงคอลัมน์ตามเวลาที่มันพร้อม",
    practiceHints: [
      "รันเวอร์ชัน starter ก่อนแล้วเปิดสองแท็บ: /slow แล้วรีบ /fast สังเกตว่า /fast รอ",
      "เปลี่ยน handler เป็น async แล้วแทนลูปด้วย await new Promise((resolve) => setTimeout(resolve, 3000))",
      "รันใหม่แล้วเปิด /slow กับ /fast เหมือนเดิม /fast ควรตอบทันที จดผลทั้งสองแบบใน Field notes",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: กับ starter /fast ต้องรอให้ /slow เสร็จก่อน",
      "ตรวจเอง: กับ solution /fast ตอบทันทีแม้ /slow ยังไม่เสร็จ",
      "ตรวจเอง: อธิบายได้ใน Field notes ว่าทำไมสองแบบต่างกัน",
    ],
    solutionNotes: [
      "setTimeout ใน solution จำลองงาน I/O ที่ใช้เวลา (เช่นรอฐานข้อมูล) ซึ่งไม่ครอง thread",
      "งานที่ต้องคำนวณหนักจริง ๆ (เช่น resize รูป) แก้ด้วยการย้ายไป worker_threads ไม่ใช่ setTimeout",
    ],
    reflection: [
      "ใน API ที่เคยเขียน มีจุดไหนที่ใช้ function ...Sync หรือคำนวณหนักใน handler",
    ],
    extension: "ใช้ performance.now() วัดว่า handler แต่ละแบบใช้เวลาตอบ /fast เท่าไรเมื่อมี /slow ค้างอยู่ แล้วบันทึกเป็นตาราง",
  },
  "node-events-streams": {
    hook: "ไฟล์ log โหวตของกลุ่มเพื่อนใหญ่ขึ้นทุกวัน วันหนึ่ง script ที่ใช้ readFile อ่านทั้งไฟล์เข้าหน่วยความจำก็พังเพราะไฟล์ใหญ่เกิน การอ่านทีละบรรทัดด้วย stream ทำให้หน่วยความจำไม่โตตามขนาดไฟล์",
    explain: [
      {
        heading: "1) EventEmitter: ส่งสัญญาณและฟัง",
        text: [
          "emitter.on(\"ชื่อ\", callback) ลงทะเบียนฟัง emitter.emit(\"ชื่อ\", ...ข้อมูล) เรียกทุก listener ของชื่อนั้นทันทีแบบ synchronous ตามลำดับที่ลงทะเบียน",
          "event ไม่ถูกเก็บไว้ ถ้า emit ก่อนมีคนฟังก็หายไป และ event ชื่อ \"error\" ถ้าไม่มี listener Node จะ throw",
        ],
      },
      {
        heading: "2) stream: ข้อมูลมาทีละ chunk",
        text: [
          "readable stream ส่ง chunk ของข้อมูลมาเรื่อย ๆ (เช่นไฟล์ทีละ 64 KB) แทนการให้ทั้งก้อน request ของ http server และ process.stdin ก็เป็น stream",
          "ข้อดี: เริ่มประมวลผลได้ก่อนข้อมูลมาครบ และหน่วยความจำไม่โตตามขนาดไฟล์ (ยังขึ้นกับ buffer, บรรทัดที่ยาวที่สุด และข้อมูลที่เราเลือกเก็บไว้)",
        ],
      },
      {
        heading: "3) อ่านทีละบรรทัดและต่อท่อ",
        text: [
          "readline.createInterface({ input: createReadStream(file), crlfDelay: Infinity }) แล้ว for await (const line of rl) ได้ทีละบรรทัด (crlfDelay ทำให้ \\r\\n ของ Windows นับเป็นบรรทัดเดียว)",
          "pipeline(source, transform, destination) จาก node:stream/promises ต่อหลาย stream และส่งต่อ error ให้ครบ ใช้แทน .pipe() แบบเดิม",
        ],
        code: "import { EventEmitter } from \"node:events\";\nconst e = new EventEmitter();\ne.emit(\"ping\");\ne.on(\"ping\", () => console.log(\"ได้ยิน ping\"));\ne.emit(\"ping\");",
        output: "ได้ยิน ping",
      },
    ],
    walkthrough: [
      "planner ลงทะเบียนสอง listener ของ \"joined\" แล้ว emit ครั้งเดียว ทั้งสองถูกเรียกตามลำดับ",
      "เขียนไฟล์ votes.log สามบรรทัด",
      "readline อ่านทีละบรรทัดและนับลง object counts โดยข้ามบรรทัดว่าง",
      "Node แสดง object ด้วยรูปแบบของ console.log ใน Node ({ Hiking: 2, Movie: 1 })",
    ],
    pitfalls: [
      "emit ก่อน on: event หายไป",
      "ไม่ฟัง \"error\" ของ stream/emitter: โปรแกรมหยุดทันทีเมื่อเกิดปัญหา",
      "readFile ไฟล์ใหญ่ทั้งไฟล์เพื่อประมวลผลทีละบรรทัด: ใช้หน่วยความจำเท่าขนาดไฟล์",
    ],
    checks: [
      { question: "ในตัวอย่างสั้น ทำไม emit ครั้งแรกไม่พิมพ์อะไร", answer: "เพราะยังไม่มี listener ในตอนที่ emit event ไม่ถูกเก็บไว้รอ" },
      { question: "ทำไมนับบรรทัดด้วย stream ไม่ต้องใช้หน่วยความจำเท่าขนาดไฟล์", answer: "เพราะประมวลผลทีละ chunk/บรรทัดแล้วทิ้ง เก็บแค่ตัวนับ — หน่วยความจำขึ้นกับบรรทัดที่ยาวที่สุดและสิ่งที่สะสมไว้ ไม่ใช่ขนาดไฟล์ทั้งหมด" },
    ],
    recap: [
      "on ลงทะเบียน emit เรียกทันทีแบบ synchronous",
      "ฟัง \"error\" เสมอ",
      "stream + readline สำหรับไฟล์ใหญ่ pipeline สำหรับต่อท่อ",
    ],
    traceHint: "ทำตารางรอบของ for await: บรรทัดที่ได้ และค่า counts หลังรอบนั้น",
    practiceHints: [
      "ตรวจว่ามีชื่อไฟล์ใน argument ก่อน ถ้าไม่มีให้ console.error วิธีใช้และตั้ง exitCode",
      "สร้าง interface ด้วย readline.createInterface({ input: createReadStream(file), crlfDelay: Infinity }) แล้ว for await วนทีละบรรทัด",
      "ข้ามบรรทัดที่ trim แล้วว่าง นับ count และเก็บ longest = Math.max(longest, line.length) แล้วพิมพ์ตอนจบลูป",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: นับบรรทัดที่ไม่ว่างได้ถูก และความยาวสูงสุดถูก",
      "ตรวจเอง: ไม่ระบุไฟล์ได้ข้อความวิธีใช้และ exit code 1",
      "ตรวจเอง: ใช้ readline/stream ไม่ใช่ readFile",
    ],
    solutionNotes: [
      "ไฟล์ที่ไม่มีจะทำให้ stream emit \"error\" ซึ่ง for await จะ throw ออกมาเป็น error ธรรมดา สามารถครอบ try/catch แล้วแปลงเป็นข้อความที่อ่านง่ายได้",
      "line.length นับหน่วยของ string (UTF-16) ภาษาไทยที่มีสระบน/ล่างนับแยกตัว ถ้าต้องการนับตามที่ตาเห็นต้องใช้ Intl.Segmenter",
    ],
    reflection: [
      "งานไหนใน Planner ที่ควรใช้ event (เช่นแจ้งเตือนเมื่อมีคนเข้าร่วม) แทนการเรียก function ตรง ๆ และมีข้อเสียอะไร",
    ],
    extension: "ใช้ pipeline + createGzip จาก node:zlib บีบอัดไฟล์ votes.log เป็น votes.log.gz แล้วเทียบขนาดไฟล์",
  },
  "node-http": {
    hook: "หน้าเว็บเรียก /api/activities แล้วได้ 200 แต่ข้อมูลเป็น HTML หน้า error แทน JSON ทำให้ response.json() พัง การเข้าใจ request/response ระดับ HTTP ช่วยให้อ่าน Network tab และออกแบบ API ที่ตอบชัดเจน",
    analogy: {
      title: "HTTP เหมือนการส่งแบบฟอร์มที่เคาน์เตอร์ราชการ",
      text: [
        "ผู้ขอยื่นแบบฟอร์ม: ระบุว่าต้องการทำอะไร (ขอเอกสาร/แก้ข้อมูล) ที่แผนกไหน แนบเอกสารประกอบ เจ้าหน้าที่ตอบกลับด้วยผลลัพธ์พร้อมตราประทับสถานะ เช่น อนุมัติ ไม่พบเรื่อง หรือเอกสารไม่ครบ",
        "request คือแบบฟอร์มที่ยื่น response คือเอกสารตอบกลับ ทุกครั้งต้องได้คำตอบหนึ่งครั้งเสมอ แม้จะเป็นการปฏิเสธ",
      ],
      mapping: [
        ["ประเภทคำขอ (ขอ/แก้/ยกเลิก)", "HTTP method (GET/POST/PATCH/DELETE)"],
        ["แผนกที่ยื่น", "path เช่น /activities/1"],
        ["ข้อมูลหัวกระดาษ เช่นภาษาเอกสาร", "headers เช่น Content-Type"],
        ["เอกสารแนบ", "body"],
        ["ตราประทับสถานะ", "status code (200, 404, 400, 500)"],
      ],
      limits: "เคาน์เตอร์จริงจำเราได้จากคิวก่อนหน้า แต่ HTTP เป็น stateless: แต่ละ request ต้องมีข้อมูลครบในตัวเอง ตัวโปรโตคอลไม่ได้ผูก request เข้าด้วยกัน server ยังเก็บข้อมูลในฐานข้อมูลหรือ session ได้ แต่ต้องให้ client ส่งตัวระบุมาทุกครั้ง (cookie/token ในคอร์ส Back-end)",
    },
    explain: [
      {
        heading: "1) ส่วนประกอบของ request/response",
        text: [
          "request: method + path (+ query) + headers + body (ถ้ามี) response: status + headers + body",
          "GET อ่านและไม่ควรเปลี่ยนข้อมูล POST สร้าง PUT/PATCH แก้ DELETE ลบ",
        ],
      },
      {
        heading: "2) status code ที่ใช้บ่อย",
        text: [
          "200 OK, 201 Created, 204 No Content / 400 Bad Request (ข้อมูลผิด), 401 ยังไม่ยืนยันตัวตน, 403 ไม่มีสิทธิ์, 404 Not Found, 409 Conflict / 500 Internal Server Error",
          "4xx = ผู้ส่งแก้ได้ 5xx = server ผิด ผู้ส่งอาจลองใหม่ภายหลัง",
        ],
      },
      {
        heading: "3) node:http แบบไม่มี framework",
        text: [
          "http.createServer((req, res) => {...}) ถูกเรียกทุก request แยกด้วย req.method และ new URL(req.url, \"http://localhost\").pathname",
          "res.writeHead(status, headers) แล้ว res.end(body) ส่งได้ครั้งเดียวต่อ request ทุกกิ่งต้องจบด้วย res.end",
          "body ของ request เป็น stream ต้องรวม chunk เอง — เป็นเหตุผลหนึ่งที่ใช้ Express ในคอร์สถัดไป",
        ],
      },
    ],
    walkthrough: [
      "server แยก GET /activities ออกจาก path อื่น ตอบ JSON พร้อม Content-Type",
      "listen(0) ให้ระบบเลือก port ว่าง แล้วอ่าน port จริงจาก server.address()",
      "fetch ไป /activities ได้ 200 และ JSON (Node แสดง array ของ object ในรูปแบบของ console.log)",
      "fetch ไป /nope ได้ 404 พร้อม JSON error แล้วปิด server",
    ],
    pitfalls: [
      "ลืม res.end: client ค้าง",
      "ตอบซ้ำ: writeHead หลังส่ง header แล้วได้ ERR_HTTP_HEADERS_SENT ส่วนการ write หลัง end ได้ ERR_STREAM_WRITE_AFTER_END ใส่ return หลังตอบเสมอ",
      "ส่ง JSON โดยไม่ตั้ง Content-Type: client บางตัวไม่ parse",
      "ตอบ 200 พร้อม { error } เมื่อผิด: client แยกสำเร็จ/ล้มเหลวจาก status ไม่ได้",
    ],
    checks: [
      { question: "ผู้ใช้ส่ง id เป็น \"abc\" ควรตอบ status อะไร", answer: "400 เพราะ request ผิดรูปแบบ ผู้ส่งแก้ได้" },
      { question: "ทำไม GET ไม่ควรเปลี่ยนข้อมูล", answer: "เพราะ browser, cache และ crawler อาจเรียก GET ซ้ำได้เอง ถ้า GET เปลี่ยนข้อมูลจะเกิดผลข้างเคียงที่ไม่ตั้งใจ" },
    ],
    recap: [
      "request = method + path + headers + body; response = status + headers + body",
      "2xx สำเร็จ 4xx ผู้ส่งผิด 5xx server ผิด",
      "ทุกกิ่งต้อง res.end ครั้งเดียว",
    ],
    traceHint: "สำหรับแต่ละ fetch เขียน method, pathname, กิ่งที่เข้า, status และ body ที่ได้",
    practiceHints: [
      "แยก id จาก pathname ด้วย regex หรือ split แล้วแปลงเป็นตัวเลข",
      "สร้าง helper sendJson(res, status, body) แล้วตอบสามแบบ: 400 เมื่อ id ไม่ใช่จำนวนเต็ม 404 เมื่อหาไม่เจอ 200 เมื่อเจอ",
      "url.pathname.match(/^\\/activities\\/([^/]+)$/) ได้ match[1] เป็น id ส่วน path อื่นทั้งหมดตอบ 404 { error: \"Not found\" }",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: curl -i http://localhost:3000/activities/1 ได้ 200 และ JSON ของ Hiking",
      "ตรวจเอง: /activities/99 ได้ 404 และ /activities/abc ได้ 400",
      "ตรวจเอง: ทุก response มี Content-Type: application/json",
    ],
    solutionNotes: [
      "sendJson รวมการตั้ง header และ stringify ไว้ที่เดียว ลดโอกาสลืม Content-Type",
      "return sendJson(...) ทำให้ไม่ไปถึงบรรทัดตอบซ้ำด้านล่าง",
    ],
    reflection: [
      "เปิด Network tab ของเว็บที่ใช้บ่อย เลือก request หนึ่งรายการ แล้วระบุ method, status, Content-Type และขนาด body",
    ],
    extension: "เพิ่ม POST /activities ที่อ่าน body (รวม chunk จาก req ด้วย for await (const chunk of req)) parse JSON ตรวจ title แล้วตอบ 201 พร้อมกิจกรรมใหม่ หรือ 400 ถ้าข้อมูลผิด",
  },
  "node-test": {
    hook: "ทุกครั้งที่แก้ summarize ซีต้องเปิด CLI แล้วลองไฟล์ตัวอย่างสามไฟล์ด้วยมือ วันที่รีบก็ข้ามไปหนึ่งไฟล์ แล้วบั๊กเรื่องรายการว่างก็กลับมา test อัตโนมัติทำงานซ้ำนี้แทนในไม่กี่ร้อยมิลลิวินาที",
    explain: [
      {
        heading: "1) test = ตัวอย่างที่รันได้และตรวจตัวเอง",
        text: [
          "แต่ละ test เรียก function ด้วย input ที่รู้คำตอบ แล้ว assert ว่าผลตรงตามคาด ถ้าไม่ตรง assert จะ throw และ test ล้ม",
          "test ที่ดีอ่านแล้วเข้าใจพฤติกรรมของโค้ดได้เหมือนเอกสาร",
        ],
      },
      {
        heading: "2) node:test และ node:assert/strict",
        text: [
          "import test from \"node:test\" แล้ว test(\"ชื่อที่บอกพฤติกรรม\", () => {...}) รองรับ async ด้วย async () => {...}",
          "assert.equal ใน node:assert/strict เทียบด้วย Object.is (เหมือน === เกือบทุกกรณี ต่างตรงที่ NaN เท่ากับ NaN และ 0 ไม่เท่ากับ -0), assert.deepEqual เทียบเนื้อหา, assert.throws(fn, { message }), await assert.rejects(promise, { message })",
          "node --test ค้นไฟล์ test (เช่น *.test.mjs) รันทั้งหมดแล้วสรุปผล exit code ไม่ใช่ 0 ถ้ามี test ล้ม จึงใช้ใน CI ได้",
        ],
      },
      {
        heading: "3) เลือกกรณีทดสอบ",
        text: [
          "กรณีปกติหนึ่งกรณี + กรณีขอบ (ว่าง, เท่ากันพอดี, ข้อมูลเกิน) + กรณีผิดที่ต้อง error",
          "เมื่อเจอบั๊ก ให้เขียน test ที่ทำให้บั๊กปรากฏก่อนแก้ (test ล้ม) แล้วแก้จนผ่าน test นั้นจะกันไม่ให้บั๊กกลับมา",
        ],
      },
    ],
    walkthrough: [
      "assert.deepEqual สองข้อแรกผ่านจึงพิมพ์ข้อความยืนยัน",
      "assert.equal(0, 1) ล้ม จึง throw AssertionError ที่มี code ERR_ASSERTION",
      "ใน test จริงไม่ต้อง try/catch เอง test runner จะจับและรายงานว่า test ไหนล้มพร้อมค่าที่ต่างกัน",
    ],
    pitfalls: [
      "ใช้ equal กับ object: เทียบ identity ใช้ deepEqual",
      "ใช้ assert.throws กับ async function: ใช้ await assert.rejects",
      "test ที่ไม่มี assert: อาจผ่านโดยไม่ได้ตรวจผลที่ตั้งใจ (ล้มได้แค่ตอน throw หรือค้าง) ทุก test ควรยืนยันผลลัพธ์อย่างน้อยหนึ่งข้อ",
      "test ที่พึ่งลำดับหรือข้อมูลจาก test อื่น: ล้มแบบสุ่ม ทำให้แต่ละ test เตรียมข้อมูลเอง",
    ],
    checks: [
      { question: "ถ้า summarize คืน { total: 0, full: 0 } แต่ test ใช้ assert.equal เทียบกับ { total: 0, full: 0 } จะผ่านไหม", answer: "ไม่ผ่าน equal เทียบ identity ต้องใช้ deepEqual" },
      { question: "ทำไมควรเขียน test ที่ล้มก่อนแก้บั๊ก", answer: "เพื่อยืนยันว่า test จับบั๊กนั้นได้จริง ถ้า test ผ่านตั้งแต่แรกแปลว่ามันไม่ได้ตรวจสิ่งที่คิด" },
    ],
    recap: [
      "test = input ที่รู้คำตอบ + assert",
      "deepEqual สำหรับ object/array; rejects สำหรับ async",
      "node --test ใน CI; เขียน test ที่ล้มก่อนแก้บั๊ก",
    ],
    traceHint: "สำหรับแต่ละ assert เขียนค่าที่ได้จริงกับค่าที่คาดไว้คู่กัน แล้วตัดสินว่าผ่านหรือ throw",
    practiceHints: [
      "รวมหลาย function ไว้ใน planner.mjs แล้ว export เพื่อให้ไฟล์ test import ได้",
      "เขียน test แยกตามพฤติกรรม: ปกติ, ว่าง, input ผิด (assert.throws พร้อม { message }), กรณีขอบที่คิดเอง",
      "รัน node --test ให้ผ่าน แล้วแก้ summarize ให้ผิด (เช่นใช้ === แทน >=) เพื่อดูว่า test กรณีขอบล้มจริง",
    ],
    acceptance: [
      localRun,
      "ตรวจเอง: node --test รันอย่างน้อย 4 test และผ่านทั้งหมด",
      "ตรวจเอง: เมื่อทำให้ logic ผิดหนึ่งจุด อย่างน้อยหนึ่ง test ล้ม",
      "ตรวจเอง: ชื่อ test บอกพฤติกรรม ไม่ใช่แค่ “test 1”",
    ],
    solutionNotes: [
      "assert.throws(fn, { message }) ตรวจทั้งว่ามี error และข้อความถูก ทำให้ test เจาะจงขึ้น",
      "test กรณี joined > capacity คือ regression test ของบั๊กที่เคยเห็นใน Planner M1",
    ],
    reflection: [
      "บั๊กที่เคยเจอในโปรเจกต์ไหนบ้างที่ test แบบนี้น่าจะจับได้ก่อนส่งงาน",
    ],
    extension: "ลองใช้ node --test --watch แล้วแก้โค้ด สังเกตว่า test รันใหม่อัตโนมัติ จากนั้นลอง node --test --experimental-test-coverage เพื่อดูว่าบรรทัดไหนยังไม่ถูกทดสอบ",
  },
  "node-project-planner-cli": {
    hook: "เพื่อนอยากได้สรุปกิจกรรมของสัปดาห์แบบเร็ว ๆ ในเทอร์มินัลก่อนเปิดเว็บ M4 นำ logic ที่เขียนมาตั้งแต่คอร์ส JavaScript มาประกอบเป็นเครื่องมือจริงที่อ่านไฟล์ จัดการ error และมี test",
    explain: [
      {
        heading: "1) แยก logic ออกจาก input/output",
        text: [
          "planner.mjs มีแต่ pure function (summarizePlanner, planWeek) ไม่อ่านไฟล์ ไม่พิมพ์",
          "cli.mjs มี run(argv) ที่คืนผลเป็น object { code, stdout, stderr } และส่วนนอกบาง ๆ ที่พิมพ์และตั้ง exitCode",
        ],
      },
      {
        heading: "2) error ที่ผู้ใช้อ่านเข้าใจ",
        text: [
          "คำสั่งผิด → exit code 2 + usage ไฟล์ไม่มี/JSON เสีย/ไม่ใช่ array → exit code 1 + ข้อความบอกสิ่งที่ต้องแก้",
          "ไม่โชว์ stack trace ให้ผู้ใช้ทั่วไป แต่ log รายละเอียดได้เมื่อเปิดโหมด debug",
        ],
      },
      {
        heading: "3) ทดสอบ run() โดยตรง",
        text: [
          "เพราะ run คืน object จึงทดสอบได้ด้วย assert.deepEqual โดยไม่ต้องจับ stdout หรือ spawn process",
          "ใช้ไฟล์ตัวอย่างใน test เตรียมด้วย writeFile ในโฟลเดอร์ชั่วคราว (fs/promises.mkdtemp + os.tmpdir())",
        ],
      },
    ],
    walkthrough: [
      "run ตรวจคำสั่งและชื่อไฟล์ก่อน ถ้าผิดคืน code 2 พร้อม usage",
      "อ่านไฟล์และ parse ใน try เดียว แต่แยกข้อความตาม error.code",
      "ตรวจว่าเป็น array แล้วค่อยเรียก logic",
      "ตัวอย่างเรียก run สามครั้ง: สำเร็จ, ไฟล์ไม่มี, คำสั่งผิด",
    ],
    pitfalls: [
      "พิมพ์และ process.exit อยู่ใน logic: ทดสอบยากและ output อาจถูกตัด",
      "ตรวจแค่ว่าเป็น array: รายการอย่าง null หรือไม่มี title ทำให้ logic พังด้วย TypeError ตรวจทุกรายการก่อนส่งต่อ",
      "พิมพ์ undefined เมื่อไม่มี stdout: พิมพ์เฉพาะเมื่อมีค่า",
    ],
    checks: [
      { question: "ทำไมคำสั่งผิดใช้ exit code 2 แต่ไฟล์ไม่มีใช้ 1", answer: "เป็นธรรมเนียมของ CLI: 2 = ใช้คำสั่งผิด (ผู้ใช้ต้องดู usage), 1 = คำสั่งถูกแต่งานล้มเหลว" },
      { question: "import.meta.main ใน solution มีไว้ทำอะไร", answer: "ให้ส่วนพิมพ์ผลทำงานเฉพาะเมื่อรันไฟล์นี้โดยตรง ไม่ทำงานตอน test import run() ไปใช้" },
    ],
    recap: [
      "logic = pure; cli = แปลง argv/ไฟล์ ↔ logic ↔ stdout/stderr/exit code",
      "error แต่ละแบบมีข้อความและ exit code ของตัวเอง",
      "ทดสอบ run() โดยตรงด้วย node:test",
    ],
    traceHint: "สำหรับแต่ละการเรียก run ไล่ทีละ return ว่าหยุดที่ return ไหนและได้ object อะไร",
    practiceHints: [
      "เริ่มจาก planner.mjs: คัดลอก function จาก M1–M2 มาแล้ว export",
      "เขียน run ตามตัวอย่างแต่รองรับสองคำสั่ง ส่วน week แปลง schedule เป็นข้อความด้วย Object.entries แล้ว join(\"\\n\")",
      "ใน cli.test.mjs เตรียมไฟล์ด้วย mkdtemp แล้วทดสอบ: summary สำเร็จ, week สำเร็จพร้อมรายการผิด, ไฟล์ไม่มี, JSON เสีย, คำสั่งผิด",
    ],
    acceptance: [
      "ตรวจเองในเครื่อง: บทนี้ใช้ API ของ Node ที่ไม่มีใน browser จึงกด Run บนเว็บไม่ได้",
      "ตรวจเอง: node cli.mjs summary data.json และ node cli.mjs week data.json แสดงผลถูก",
      "ตรวจเอง: ไฟล์ไม่มี, JSON เสีย, ไม่ใช่ array, รายการผิดรูปแบบ และคำสั่งผิด แสดงข้อความที่อ่านเข้าใจและ exit code ตามที่กำหนด โดยไม่มี TypeError",
      "ตรวจเอง: npm test (node --test) ผ่านอย่างน้อย 5 กรณี",
    ],
    solutionNotes: [
      "import.meta.main มีตั้งแต่ Node 24.2 และ 22.18 ถ้าใช้เวอร์ชันเก่ากว่าให้แยกส่วนนอกเป็นไฟล์ bin.mjs ที่ import run มาเรียกแทน",
      "ข้อความผิดพลาดใช้ภาษาเดียวกับผู้ใช้และบอกสิ่งที่ต้องทำ ไม่ใช่แค่ “error”",
    ],
    reflection: [
      "ถ้าจะเปลี่ยน CLI นี้เป็น API ในคอร์ส Back-end ส่วนไหนนำไปใช้ต่อได้ทันที และส่วนไหนต้องเขียนใหม่",
    ],
    extension: "เพิ่มคำสั่ง add <file> <title> <day> <time> ที่ตรวจข้อมูลด้วย logic เดียวกับ planWeek แล้วเขียนกลับลงไฟล์ (ใช้แนวทางเขียนไฟล์ชั่วคราวแล้ว rename จากบท node-fs)",
  },
};
