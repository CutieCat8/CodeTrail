import type { TopicSource } from "@/types/curriculum";

const courseId = "developer-foundations";
const v = (term: string, meaning: string): [string, string] => [term, meaning];

export const developerFoundationTopics: TopicSource[] = [
  {
    id: "dev-program", courseId, unit: "คอมพิวเตอร์รันโค้ดอย่างไร", title: "Program, source code และ instruction",
    objective: "แยก source code ออกจาก program ที่กำลังทำงานและอธิบายลำดับ instruction ได้", why: "ถ้าแยกไฟล์โค้ดกับ process ไม่ออก จะสับสนว่าทำไมแก้ไฟล์แล้วโปรแกรมเก่ายังไม่เปลี่ยน",
    explanation: "Source code คือข้อความที่มนุษย์เขียนตามไวยากรณ์ของภาษา ส่วน program คือชุดคำสั่งที่ runtime หรือ CPU กำลังดำเนินการ คอมพิวเตอร์ไม่เดาเจตนา: มันทำตามลำดับและกฎของภาษาเท่านั้น",
    example: `let score = 2;\nscore = score + 3;\nconsole.log(score); // 5`, tracePrompt: "ก่อนรัน ค่า score หลังแต่ละบรรทัดคืออะไร?", traceAnswer: "หลังบรรทัด 1 เป็น 2; หลังบรรทัด 2 เป็น 5; บรรทัด 3 แสดง 5",
    starter: `let friends = 9;\n// ลดจำนวนลง 1 แล้วแสดงผล`, practicePrompt: "เขียน instruction เปลี่ยน friends เป็น 8 แล้วแสดง 8", solution: `let friends = 9;\nfriends = friends - 1;\nconsole.log(friends);`,
    buggy: `let total = 4;\nconsole.log(total);\ntotal = 7; // ผู้เขียนคาดว่าจะพิมพ์ 7`, bugExplanation: "console.log ทำงานก่อน assignment ใหม่ จึงพิมพ์ 4 ย้าย log ไว้หลัง total = 7", vocabulary: [v("source code", "ข้อความคำสั่งที่เราเขียน"), v("instruction", "คำสั่งย่อยหนึ่งขั้น")],
  },
  {
    id: "dev-files", courseId, unit: "ไฟล์และโฟลเดอร์", title: "ไฟล์, extension และ path",
    objective: "อ่าน relative/absolute path และรู้ว่า extension สื่อชนิดไฟล์", why: "คำสั่ง build, import และ error ล้วนชี้ไปยัง path ถ้าอ่าน path ไม่ได้จะแก้ไฟล์ผิดตำแหน่ง",
    explanation: "ไฟล์มีชื่อ เนื้อหา และตำแหน่งในโครงสร้างโฟลเดอร์ Extension เช่น .ts หรือ .java ช่วยเครื่องมือเลือกวิธีอ่าน Absolute path เริ่มจากรากของระบบ ส่วน relative path เริ่มจากตำแหน่งปัจจุบัน",
    example: `quest/\n├─ src/\n│  └─ Main.java\n└─ notes.md\n\nจาก quest: src/Main.java\nabsolute: C:\\work\\quest\\src\\Main.java`, tracePrompt: "ถ้า current folder คือ quest/src path ../notes.md ชี้ไปไหน?", traceAnswer: ".. ถอยหนึ่งระดับไป quest แล้วเลือก notes.md",
    starter: `project/\n├─ data/activities.json\n└─ src/read.js\n\nจาก src/read.js ต้องอ้างไฟล์ JSON ด้วย path: ____`, practicePrompt: "เติม relative path จากโฟลเดอร์ src ไปยังไฟล์ JSON", solution: `../data/activities.json`,
    buggy: `node src\\server.js\n# terminal อยู่ที่ C:\\work ไม่ใช่ C:\\work\\quest`, bugExplanation: "relative path เริ่มจาก current working directory ไม่ใช่ตำแหน่งที่เราคิด ต้อง cd quest หรือใช้ path ที่รวม quest", vocabulary: [v("extension", "ส่วนท้ายชื่อไฟล์ เช่น .java"), v("path", "ที่อยู่ของไฟล์"), v("relative", "เทียบจากตำแหน่งปัจจุบัน")],
  },
  {
    id: "dev-terminal", courseId, unit: "Terminal", title: "current working directory และคำสั่งพื้นฐาน",
    objective: "ตรวจตำแหน่ง สร้างโฟลเดอร์ และย้ายตำแหน่งโดยไม่เดา", why: "terminal รันคำสั่งภายใต้ working directory เสมอ ความผิดพลาดจำนวนมากเกิดจากอยู่ผิดโฟลเดอร์",
    explanation: "Terminal คือโปรแกรมรับคำสั่งข้อความ Shell เป็นตัวตีความคำสั่ง ทุก session มี current working directory ใช้ pwd/Get-Location ตรวจ ใช้ ls/Get-ChildItem ดูรายการ และ cd/Set-Location ย้ายตำแหน่ง",
    example: `Get-Location\nGet-ChildItem\nSet-Location .\\quest\nGet-Location`, tracePrompt: "คำสั่งใดเปลี่ยนตำแหน่ง และคำสั่งใดเพียงอ่านข้อมูล?", traceAnswer: "Set-Location เปลี่ยน state; Get-Location และ Get-ChildItem เป็นการอ่าน",
    starter: `# ตอนนี้อยู่ C:\\work และมีโฟลเดอร์ quest\n# 1 ตรวจตำแหน่ง\n# 2 เข้า quest\n# 3 ดูไฟล์`, practicePrompt: "เขียน PowerShell สามคำสั่งตามลำดับ", solution: `Get-Location\nSet-Location .\\quest\nGet-ChildItem`,
    buggy: `PS C:\\work> npm run dev\nnpm error Missing script: dev\n# package.json อยู่ C:\\work\\quest`, bugExplanation: "npm อ่าน package.json จาก working directory ให้ cd quest ก่อน ไม่ควรแก้ package.json ที่อื่น", vocabulary: [v("terminal", "หน้าต่างรับคำสั่งข้อความ"), v("shell", "โปรแกรมตีความคำสั่ง"), v("working directory", "โฟลเดอร์ฐานของคำสั่งปัจจุบัน")],
  },
  {
    id: "dev-process", courseId, unit: "Process และ runtime", title: "เริ่ม หยุด และอ่าน exit code",
    objective: "อธิบาย process, standard output/error และ exit code ได้", why: "server ที่ยังรันอยู่, port ชน หรือ command ล้มเหลว ล้วนเข้าใจได้จาก process model",
    explanation: "เมื่อรัน node, java หรือ npm ระบบสร้าง process ที่มีหน่วยความจำและ input/output ของตัวเอง Process จบเองหรือถูกหยุดได้ Exit code 0 โดย convention หมายถึงสำเร็จ ค่าอื่นหมายถึงล้มเหลว",
    example: `node server.js\n# process รอต่อเพราะ server ฟัง request\n# Ctrl+C ส่งสัญญาณให้หยุด`, tracePrompt: "ทำไม terminal ยังไม่คืน prompt หลัง server แสดง Ready?", traceAnswer: "process ยังทำงานเพื่อรับ request จึงยังไม่ exit นี่ไม่ใช่อาการค้างโดยอัตโนมัติ",
    starter: `console.log("start");\nprocess.exitCode = 1;\n// จะเห็น output และ exit code ใด`, practicePrompt: "ทำนายแล้วรัน จากนั้นเปลี่ยนให้ command สำเร็จ", solution: `console.log("start");\nprocess.exitCode = 0;`,
    buggy: `npm start\n# Error: listen EADDRINUSE: address already in use :::3000`, bugExplanation: "มี process อื่นครอง port 3000 ต้องหยุด process เดิมหรือเลือก port ใหม่ ไม่ใช่ติดตั้ง npm ซ้ำ", vocabulary: [v("process", "โปรแกรมหนึ่ง instance ที่กำลังทำงาน"), v("exit code", "ตัวเลขสรุปผลเมื่อ process จบ"), v("port", "หมายเลขจุดรับการเชื่อมต่อของ process")],
  },
  {
    id: "dev-errors", courseId, unit: "Debugging", title: "อ่าน error จากชนิด ตำแหน่ง และข้อความ",
    objective: "อ่าน error โดยเริ่มจากบรรทัดแรกที่เกี่ยวกับโค้ดเราและตั้งสมมติฐานหนึ่งข้อ", why: "นักพัฒนาไม่ได้จำวิธีแก้ทุก error แต่ต้องสกัดหลักฐานและทดลองแก้ทีละสาเหตุ",
    explanation: "Error ที่มีประโยชน์มักบอกชนิด ข้อความ file:line:column และ stack trace เริ่มจากข้อความกับตำแหน่งในโค้ดเรา แยก syntax error (อ่านโค้ดไม่ได้), runtime error (เริ่มแล้วล้ม) และ logic error (รันได้แต่ผลผิด)",
    example: `ReferenceError: total is not defined\n  at C:\\quest\\app.js:4:13`, tracePrompt: "หลักฐานสามชิ้นจาก error นี้คืออะไร?", traceAnswer: "ชนิด ReferenceError, ชื่อ total ไม่มีใน scope, จุดเกิด app.js บรรทัด 4 คอลัมน์ 13",
    starter: `const total = 9;\nconsole.log(ttoal);`, practicePrompt: "จัดประเภท error ตั้งสมมติฐาน แล้วแก้เพียงจุดที่จำเป็น", solution: `const total = 9;\nconsole.log(total);`,
    buggy: `const price = "20";\nconsole.log(price + 5); // ได้ 205 แต่คาด 25`, bugExplanation: "เป็น logic/type coercion issue ไม่ใช่ syntax error แปลง input เป็น Number ก่อนบวก: Number(price) + 5", vocabulary: [v("syntax error", "โค้ดผิดไวยากรณ์จน parse ไม่ได้"), v("runtime error", "ผิดขณะโปรแกรมทำงาน"), v("logic error", "โปรแกรมรันแต่ผลไม่ตรงเจตนา")],
  },
  {
    id: "dev-editor", courseId, unit: "เครื่องมือพัฒนา", title: "Editor, save และ run เป็นคนละการกระทำ",
    objective: "อธิบายวงจร edit-save-run-observe ได้", why: "มือใหม่มักแก้โค้ดแต่รันไฟล์เก่าหรือยังไม่ save แล้วสรุปว่าภาษาไม่ทำงาน",
    explanation: "Editor เปลี่ยน buffer ในหน่วยความจำ การ save เขียน buffer ลงไฟล์ การ run ให้ runtime อ่านไฟล์ ณ เวลานั้น บาง dev server watch แล้วรันใหม่อัตโนมัติ แต่ command line ปกติไม่ทำเช่นนั้น",
    example: `แก้ app.js → Save → node app.js → อ่าน output/error`, tracePrompt: "ถ้าแก้ข้อความแต่ไม่ save แล้วรัน node app.js จะเห็นเวอร์ชันใด?", traceAnswer: "runtime อ่านไฟล์บน disk จึงเห็นเวอร์ชันที่ save ล่าสุด ไม่ใช่ buffer ที่ยังไม่ save",
    starter: `console.log("version 1");`, practicePrompt: "เปลี่ยนเป็น version 2, save, รัน และบันทึก command กับ output", solution: `node app.js\n# version 2`,
    buggy: `// editor เปิด C:\\copy\\app.js\nPS C:\\quest> node app.js`, bugExplanation: "กำลังแก้คนละไฟล์กับที่รัน ตรวจ absolute path ใน editor และ terminal", vocabulary: [v("buffer", "เนื้อหาที่ editor ถืออยู่ก่อน save"), v("watch mode", "โหมดเฝ้าไฟล์และสั่งงานใหม่เมื่อเปลี่ยน")],
  },
  {
    id: "dev-git", courseId, unit: "Git", title: "repository, working tree และ commit",
    objective: "แยก working tree, staging area และ commit และสร้าง commit ที่มีเหตุผลเดียว", why: "Git เป็นทั้งเครื่องมือกู้คืน สื่อสารการเปลี่ยนแปลง และหลักฐานการเติบโต ไม่ใช่ปุ่ม backup อย่างเดียว",
    explanation: "Working tree คือไฟล์ที่กำลังแก้ Staging area คือชุดการเปลี่ยนแปลงที่จะเข้า commit ครั้งถัดไป Commit คือ snapshot พร้อมผู้เขียน เวลา และข้อความ ควรเลือกเฉพาะไฟล์ที่เป็น feature เดียวกัน",
    example: `git status --short\ngit add src/app.js\ngit commit -m "feat: validate activity title"`, tracePrompt: "ถ้าแก้ app.js และ notes.md แต่ add แค่ app.js commit จะมีอะไร?", traceAnswer: "commit มีเฉพาะ staged change ของ app.js ส่วน notes.md ยังอยู่ใน working tree",
    starter: `# ตรวจสถานะ\n# stage README.md\n# commit ข้อความ docs: add setup guide`, practicePrompt: "เขียนสามคำสั่งโดยไม่ใช้ git add .", solution: `git status --short\ngit add README.md\ngit commit -m "docs: add setup guide"`,
    buggy: `git add .\ngit commit -m "update"\n# มี .env และไฟล์งานคนอื่นปน`, bugExplanation: "ตรวจ status/diff ก่อน stage, ใส่ .env ใน .gitignore และ add เฉพาะ path ที่อยู่ใน feature ข้อความ commit ควรบอก intent", vocabulary: [v("repository", "พื้นที่ที่ Git ติดตามประวัติ"), v("staging area", "รายการเปลี่ยนแปลงสำหรับ commit ถัดไป"), v("commit", "snapshot ที่มีความหมายหนึ่งหน่วย")],
  },
  {
    id: "dev-docs", courseId, unit: "การเรียนรู้ด้วยเอกสาร", title: "อ่าน documentation และสร้าง minimal reproduction",
    objective: "หา contract จากเอกสารและลดปัญหาให้เหลือตัวอย่างเล็กที่สุด", why: "framework เปลี่ยนเร็ว การอ่านเอกสารและพิสูจน์สมมติฐานสำคัญกว่าจำ tutorial",
    explanation: "อ่าน documentation โดยหา version, input, output, defaults และ failure behavior เมื่อบั๊กซับซ้อนให้สร้าง minimal reproduction: โค้ดน้อยที่สุดที่ยังทำให้ปัญหาเกิด แล้วเปลี่ยนทีละตัวแปร",
    example: `คำถาม: fetch cache ไหม?\n1 ระบุ Next.js version\n2 แยก browser fetch / server fetch\n3 สร้าง route เล็กหนึ่ง route\n4 ระบุ cache option แล้วสังเกต request`, tracePrompt: "ทำไมคำถามว่า fetch cache ไหมจึงยังตอบไม่ได้?", traceAnswer: "ขาด runtime/context, framework version และ options ซึ่งทำให้ behavior ต่างกัน",
    starter: `ปัญหา: POST สร้างข้อมูลซ้ำ\nตัวแปรที่เกี่ยวข้อง: UI, network, route, database\nminimal reproduction: ____`, practicePrompt: "เขียนแผนลดปัญหาให้ทดสอบทีละชั้น", solution: `เรียก POST ด้วย curl request เดิมสองครั้ง → ตรวจ response/row count → ถ้ายังซ้ำปัญหาอยู่หลัง UI → เพิ่ม unique/idempotency test`,
    buggy: `เปลี่ยน React, Express, schema และ dependency versions พร้อมกัน แล้วบั๊กหาย`, bugExplanation: "สรุปสาเหตุไม่ได้เพราะเปลี่ยนหลายตัวแปร ย้อนกลับแล้วทดลองทีละการเปลี่ยนพร้อมบันทึก expected/actual", vocabulary: [v("contract", "ข้อตกลงเรื่อง input/output/failure"), v("minimal reproduction", "ตัวอย่างเล็กที่สุดที่ยังเกิดปัญหา")],
  },
];
