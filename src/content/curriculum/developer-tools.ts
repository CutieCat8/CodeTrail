import type { TopicSource, RichLesson } from "@/types/curriculum";

// Shared tool preparation, not the Node.js language course.
export const developerToolsTopic: TopicSource = {
  id: "dev-runtime-tools", courseId: "developer-foundations", standard: "v3",
  unit: "เตรียมเครื่องมือ", title: "ติดตั้ง Node และรู้จัก npm/npx ขั้นแรก",
  prerequisites: ["dev-terminal"],
  objective: "ตรวจ Node/npm และตำแหน่งคำสั่ง สร้าง package.json ในพื้นที่ทดลอง และแยกการติดตั้ง package จากการรันโปรแกรมได้",
  why: "ก่อนรันไฟล์หรือใช้ TypeScript ต้องแยกให้ได้ว่าเครื่องมือหาไม่เจอ หรือโค้ดของเราผิด จะได้ไม่แก้โค้ดเพื่อซ่อม PATH",
  explanation: "Node คือเครื่องมือรัน JavaScript นอก browser; npm จัดการ package (ชุดโค้ด/เครื่องมือที่ติดตั้งเพิ่ม); npx เรียกเครื่องมือจาก package ในโปรเจกต์ ทั้งสามคำสั่งเป็นเครื่องมือคนละหน้าที่",
  example: "# PowerShell หรือ Bash: พิมพ์ทีละบรรทัด ไม่พิมพ์เครื่องหมาย prompt\nnode --version\nnpm --version\nnpm init -y",
  tracePrompt: "node --version สำเร็จ แต่ npm init -y สร้าง package.json ผิดโฟลเดอร์: เครื่องมือเสียหรือไม่ และควรตรวจหลักฐานใดก่อนทำต่อ?",
  traceAnswer: "เครื่องมือรันได้ แต่ working directory ไม่ตรง ตรวจ Get-Location (PowerShell) หรือ pwd (Bash) และหา package.json ในรายการไฟล์ก่อน ย้ายไปพื้นที่ทดลองที่ตั้งใจ ไม่ลบไฟล์ในโปรเจกต์อื่น",
  starter: "# ในโฟลเดอร์ทดลองว่างชื่อ tools-lab\n# ตรวจ Node และ npm\n# สร้าง package.json แล้วเปิดอ่าน name และ scripts",
  practicePrompt: "สร้าง tools-lab ที่ไม่ใช่โปรเจกต์งานจริงด้วยคำสั่งจาก dev-terminal ตรวจ Node 24 และ npm แล้วสร้าง package.json ด้วย npm init -y บันทึก path เต็ม, เวอร์ชันที่เห็น และอธิบายว่ามีโปรแกรมของเราเริ่มทำงานหรือยัง ไม่ต้องติดตั้ง package เพิ่มในกิจกรรมนี้",
  solution: "node --version\nnpm --version\nnpm init -y\n# PowerShell: Get-Location; Get-Content package.json\n# Bash: pwd; cat package.json\n# ยังไม่ได้รันโค้ดของเรา npm init เพียงสร้างข้อมูลโปรเจกต์",
  buggy: "# terminal บอก: node: command not found\n# ผู้เรียนแก้ console.log ใน app.js แล้วลองอีกครั้ง แต่ยังไม่พบ node",
  bugExplanation: "shell หา executable ชื่อ node ไม่เจอ จึงยังไม่ได้อ่าน app.js ตรวจการติดตั้งและ PATH ตามบทนี้ แล้วเปิด terminal ใหม่และตรวจ node --version ก่อนรันไฟล์",
  vocabulary: [["runtime", "เครื่องมือและสภาพแวดล้อมที่ทำให้โค้ดทำงาน"], ["package", "ชุดโค้ดหรือเครื่องมือที่ติดตั้งเพิ่ม"], ["PATH", "รายการโฟลเดอร์ที่ shell ใช้ค้นหา executable"], ["executable", "ไฟล์โปรแกรมที่ระบบเรียกทำงานได้"]],
};

export const developerToolsLesson: RichLesson = {
  hook: "พิมพ์ node app.js แล้วเครื่องบอกไม่รู้จัก node นี่เกิดก่อนภาษา JavaScript จะอ่านโค้ดด้วยซ้ำ เราจะเตรียมทางรันก่อนเขียนโปรแกรม",
  analogy: {
    title: "PATH เหมือนรายชื่อชั้นวางเครื่องมือ",
    text: ["เมื่อสั่ง node shell เดินหาตามชั้นวางที่ระบุใน PATH ถ้าไม่ได้ใส่ชั้นวางนั้นไว้ มันหาเครื่องมือไม่พบ แม้มีเครื่องมือติดตั้งอยู่จริง"],
    mapping: [["ชื่อเครื่องมือ", "ชื่อคำสั่ง node"], ["รายชื่อชั้นวาง", "PATH"], ["หาในแต่ละชั้นตามลำดับ", "การ resolve executable"]],
    limits: "shell ไม่ค้นทั้งเครื่อง และอาจพบเครื่องมือชื่อเดียวกันหลายเวอร์ชัน; บน Windows มีการค้นตามนามสกุลด้วย ตรวจ path จริงก่อนสรุปจากชื่อคำสั่ง",
  },
  explain: [
    { heading: "1) เลือก environment เดียวก่อน", text: ["Windows ใช้ PowerShell; WSL/Linux ใช้ Bash ในระบบนั้น การติดตั้ง Node บน Windows ไม่ได้ยืนยันว่า Node พร้อมใน WSL ให้ตรวจใน terminal ที่จะเรียนจริง", "ติดตั้ง VS Code จาก https://code.visualstudio.com/download หากยังไม่มี เปิดแอปเพื่อใช้งานต่อใน dev-editor ไม่ต้องลง extension เพื่อรันตัวอย่างแรก"] },
    { heading: "2) ติดตั้ง Node 24 LTS", text: ["ไป https://nodejs.org/en/download เลือก v24 LTS และระบบ/สถาปัตยกรรมของเครื่อง Windows เลือก Installer (.msi), macOS เลือก Installer (.pkg) เปิดไฟล์ที่ดาวน์โหลด ทำตาม installer และคงตัวเลือกเพิ่ม Node ลง PATH", "Bash บน Linux/WSL: เลือกวิธีติดตั้งสำหรับ Linux ในหน้าเดียวกัน ทำตามคำสั่งของวิธีนั้นใน Bash ของ Linux/WSL ไม่ใช้ installer Windows แทน การเลือกวิธีติดตั้งขึ้นกับ distribution; บันทึกวิธีที่เลือกไว้ ห้ามคัดลอกคำสั่งของระบบอื่น", "หลังติดตั้งปิด terminal แล้วเปิดใหม่ พิมพ์ node --version และ npm --version ทีละบรรทัด คาด node เป็น v24.x.x ส่วน npm เป็นเลขเวอร์ชันของตัวมันเอง ไม่จำเป็นต้องเป็น 24"] },
    { heading: "Linux/WSL แบบ portable: Bash บนเครื่อง x64", text: ["ตัวอย่างนี้ใช้ archive ทางการรุ่น 24.21.0: ตรวจ uname -m ก่อน ถ้าได้ x86_64 ใช้ชุดนี้; ถ้า aarch64 ใช้ arm64 แทน x64 ทั้งใน URL และชื่อไฟล์/โฟลเดอร์ หากเป็นสถาปัตยกรรมอื่นเลือก archive ให้ตรงจากหน้า download ไม่ใช้คำสั่ง x64", "ทำในโฟลเดอร์ tools-lab ว่างที่สร้างไว้แล้ว ต้องมี curl และ tar (ถ้าไม่พบให้ติดตั้งผ่าน package manager ตาม distribution ก่อน) export เพิ่ม path ใน Bash หน้าต่างนี้เท่านั้น หากจะเก็บถาวรให้ใช้ editor เพิ่มบรรทัด export เดิมใน ~/.bashrc ด้วย path เต็มของโฟลเดอร์ที่แตกไฟล์แล้ว เปิด Bash ใหม่และตรวจอีกครั้ง อย่าทิ้ง archive ไว้ใน repo งาน"], code: `uname -m
curl -fLO https://nodejs.org/dist/v24.21.0/node-v24.21.0-linux-x64.tar.xz
tar -xf node-v24.21.0-linux-x64.tar.xz
export PATH="$PWD/node-v24.21.0-linux-x64/bin:$PATH"
node --version
npm --version`, output: "uname: x86_64; node: v24.21.0; npm: เลขเวอร์ชันที่มากับ archive" },
    { heading: "3) ถ้า command not found หรือ is not recognized", text: ["PATH เป็นรายชื่อโฟลเดอร์สำหรับค้นหาโปรแกรม ไม่ใช่ตำแหน่งไฟล์ app.js PowerShell ตรวจด้วย Get-Command node และ Get-Command npm; Bash ตรวจด้วย command -v node และ command -v npm", "ถ้าไม่พบ ให้ตรวจว่าติดตั้งในระบบเดียวกับ terminal หรือไม่ แล้วเปิด terminal ใหม่ หาก installer Windows ติดตั้งที่ C:\\Program Files\\nodejs ให้เปิด Settings ค้น Environment Variables → User Path → เพิ่มโฟลเดอร์ที่มี node.exe จริง → เปิด terminal ใหม่ ไม่เพิ่ม path ของ app.js และไม่ลบ PATH เดิม", "Linux/WSL ถ้าใช้ตัวจัดการเวอร์ชัน ให้เปิด Bash ใหม่เพื่อโหลด shell initialization ของวิธีที่ติดตั้ง แล้วตรวจอีกครั้ง ถ้ายังไม่พบให้อ่านส่วน troubleshooting ของวิธีนั้น อย่าเดาชื่อโฟลเดอร์ bin", "ถ้าพบเวอร์ชันอื่น ให้บันทึก path ของคำสั่งก่อนเปลี่ยนการติดตั้ง หาก PowerShell แจ้งว่า npm.ps1 ถูกบล็อกด้วย execution policy ให้ลอง npm.cmd --version และใช้ npm.cmd แทน npm (npx.cmd แทน npx) ในกิจกรรมถัดไป ไม่ต้องปิด policy ทั้งเครื่อง"] },
    { heading: "4) npm ขั้นต่ำที่ TypeScript ต้องใช้", text: ["ทำในโฟลเดอร์ทดลอง: npm init -y สร้าง package.json (ข้อมูลชื่อโปรเจกต์และคำสั่ง) ไม่ได้สร้างแอปและไม่ได้รัน app.js", "npm install --save-dev typescript@5.9.2 ดาวน์โหลด compiler สำหรับพัฒนา บันทึกใน devDependencies และสร้าง node_modules/package-lock.json ต้องมี internet; กิจกรรมติดตั้ง compiler ทำใน ts-why หลังเรียน JavaScript", "npx tsc -p . เรียก compiler ที่ติดตั้งในโปรเจกต์และอ่าน config ที่ราก ก่อนใช้ตรวจด้วย npm ls typescript หากไม่พบให้ติดตั้ง package ที่บทกำหนดก่อน อย่าตอบตกลงติดตั้ง package ชื่อ tsc ที่ไม่รู้จัก", "npm run ชื่อคำสั่ง ใช้รายการ scripts ใน package.json; Missing script ต่างจาก command not found: npm เริ่มได้แล้ว แต่ข้อมูลโปรเจกต์ไม่มีชื่อนั้น หรืออยู่ผิดโฟลเดอร์"] },
    { heading: "5) อ่านผลตรวจแล้วตัดสินใจ", text: ["version ตรวจเครื่องมือ; path ตรวจว่าเรียกตัวไหน; working directory ตรวจพื้นที่ทำงาน ทั้งสามหลักฐานตอบคนละคำถาม อย่าใช้การเห็นเลขเวอร์ชันแทนการตรวจว่าไฟล์อยู่ถูกที่", "อ่าน https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager สำหรับหน้าที่ npm (อ่านคู่มือเครื่องมือ ไม่ต้องเรียน HTTP หรือ server ก่อน TypeScript)"] },
  ],
  walkthrough: ["node --version เรียก Node ให้รายงานเวอร์ชันแล้วจบ ไม่ได้อ่าน source ของเรา", "npm --version ตรวจ npm แยกจาก Node", "npm init -y ใช้ค่าตั้งต้นสร้าง package.json ใน working directory ให้เปิดอ่านชื่อและ scripts จึงจะรู้ว่าถูกพื้นที่"],
  pitfalls: ["ติดตั้งบน Windows แต่ตรวจใน WSL: เป็นคนละ environment", "เปิด terminal เก่าค้างไว้หลังเปลี่ยน PATH: session อาจยังเห็นค่าเก่า", "npm init ใน repo งานจริงโดยไม่ได้ตรวจตำแหน่ง: ใช้พื้นที่ทดลองว่างเสมอ"],
  checks: [{ question: "node พบ แต่ npm ไม่พบ ต้องแก้ app.js หรือไม่?", answer: "ยังไม่เกี่ยวกับ app.js ต้องตรวจ npm และ path ใน environment เดียวกันก่อน" }, { question: "npm init -y ต่างจาก node app.js อย่างไร?", answer: "คำสั่งแรกสร้างข้อมูล package; คำสั่งหลังอ่าน source แล้วรันโปรแกรม" }],
  recap: ["Node รันโค้ด; npm จัดการ package; npx เรียกเครื่องมือของ package", "ตรวจ version + executable path + working directory แยกกัน", "เรียน npm ขั้นต่ำได้ก่อนคอร์ส Node ไม่มี dependency วนกลับ"],
  traceHint: "แยกหลักฐานว่า shell พบเครื่องมือ กับหลักฐานว่า working directory ถูก",
  practiceHints: ["ใช้พื้นที่ทดลองว่างและตรวจตำแหน่งก่อน", "ตรวจ Node/npm แยกคำสั่ง แล้วค่อยใช้ init", "หลัง npm init -y เปิด package.json จด name/scripts พร้อม path; การเห็นไฟล์นี้ไม่ได้แปลว่า app.js รันแล้ว"],
  acceptance: ["ตรวจเองในเครื่อง: node --version เป็น v24.x.x และ npm --version มีเลขเวอร์ชัน", "บันทึก path ที่ Get-Command หรือ command -v พบ ไม่ใช้การติ๊กแทนหลักฐาน", "package.json อยู่ใน tools-lab ที่ตั้งใจ มี name/scripts ให้อ่าน และอธิบายได้ว่ายังไม่รันโปรแกรมของเรา"],
  solutionNotes: ["คำสั่ง version ไม่แก้ไฟล์ ส่วน init สร้างข้อมูลที่ working directory จึงตรวจตำแหน่งก่อน", "หากใช้ npm.cmd บน PowerShell ผลควรเหมือน npm; เปลี่ยนชื่อ executable ไม่ได้เปลี่ยน package contract"],
  reflection: ["ถ้าเครื่องมือรันได้แต่หาไฟล์เราไม่พบ ควรตรวจอะไรแทนการติดตั้งซ้ำ?"],
  extension: "เปิด terminal อีกหน้าต่าง ตรวจ working directory เปรียบเทียบกับหน้าต่างแรก แล้วอธิบายว่าทำไมเปลี่ยน cd หน้าต่างหนึ่งไม่ย้ายอีกหน้าต่าง",
};
