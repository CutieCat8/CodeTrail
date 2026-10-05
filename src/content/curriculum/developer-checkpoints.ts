import type { TopicSource } from "@/types/curriculum";

// Model answers live behind the submission gate, not in the assessment brief.
export const developerCheckpoints: Record<string, NonNullable<TopicSource["checkpoint"]>> = {
  "dev-files": {
    prompt: "ประเมินการอ่าน path (เปิดเอกสารได้): จาก club/src มีไฟล์ club/data/menu.txt และ club/src/menu.txt อยากอ่านไฟล์ใน data จงระบุ relative path และอธิบายแต่ละส่วน หากเปลี่ยนตำแหน่งเป็น club path เดิมชี้ที่ไหน? ไม่ต้องรันโค้ด",
    rubric: ["ชี้ไฟล์เป้าหมายจากตำแหน่งที่ระบุได้", "อธิบาย .. และผลของการเปลี่ยน working directory ได้"],
    modelAnswer: `จาก club/src ใช้ ../data/menu.txt
.. ขึ้นไปหนึ่งชั้นที่ club แล้วเข้า data จึงถึง club/data/menu.txt

ถ้าเปลี่ยนไปยืนที่ club แล้วใช้ path เดิม ../data/menu.txt จะชี้ data/menu.txt ใต้โฟลเดอร์แม่ของ club ซึ่งไม่ใช่ไฟล์เดิม ต้องใช้ data/menu.txt แทน
ชื่อไฟล์เหมือนกันไม่ได้ทำให้เป็นไฟล์เดียวกัน เพราะ relative path อ่านจากโฟลเดอร์ที่ยืนอยู่`,
  },
  "dev-terminal": {
    prompt: "ประเมินเครื่องมือ (เปิดคู่มือได้): อยู่ในโฟลเดอร์ส่วนตัว ต้องสร้างพื้นที่ชื่อ equipment-lab เข้าไปและพิสูจน์ว่าไม่มีไฟล์งานเก่าปน เลือก PowerShell หรือ Bash แล้วบันทึกคำสั่ง path ก่อน/หลัง และรายการไฟล์จริง อธิบายว่าคำสั่งใดเปลี่ยน state",
    rubric: ["คำสั่งใช้ได้ใน shell ที่ระบุและสร้าง/เข้าโฟลเดอร์เป้าหมาย", "มี path ก่อน/หลังและรายการไฟล์ ไม่ใช้การติ๊กแทนผลทดลอง", "แยกคำสั่งอ่านกับคำสั่งเปลี่ยนตำแหน่ง/สร้างโฟลเดอร์"],
    modelAnswer: `PowerShell:
Get-Location
New-Item -ItemType Directory equipment-lab
Set-Location equipment-lab
Get-Location
Get-ChildItem

Bash:
pwd
mkdir equipment-lab
cd equipment-lab
pwd
ls

รายการไฟล์ควรว่างหากสร้างใหม่ และต้องแนบผลจากเครื่องของตนเอง
mkdir / New-Item สร้างโฟลเดอร์ (เปลี่ยน state), cd / Set-Location เปลี่ยนตำแหน่ง ส่วนคำสั่งที่เหลือแค่อ่านค่า`,
  },
  "dev-runtime-tools": {
    prompt: "ประเมินวินิจฉัยเครื่องมือ (เปิดคู่มือได้): ใน PowerShell เรียก node --version ได้ v24.x.x แต่ npm run check แจ้ง Missing script: check อีกหน้าต่าง Bash แจ้ง node: command not found วิเคราะห์สองอาการแยกกัน พร้อมคำสั่งเก็บหลักฐานก่อนแก้ และอธิบายว่าทำไมแก้ source ของแอปก่อนยังไม่มีเหตุผล",
    rubric: ["แยก npm พบแล้วแต่ script ไม่มี กับ shell ยังไม่พบ executable", "ตรวจ working directory/package.json และ executable path ในแต่ละ environment", "เสนอลำดับแก้จากหลักฐาน ไม่ติดตั้งทุกอย่างซ้ำ"],
    modelAnswer: `PowerShell: npm ทำงานแล้ว จึงตรวจ Get-Location และดู scripts ใน package.json ว่ามี check หรือยืนผิดโฟลเดอร์
Bash: ตรวจ command -v node ว่าระบบนี้ติดตั้ง Node หรือ PATH ถึงหรือไม่

แม้ Windows มี Node ก็ยังไม่ยืนยันว่า WSL พร้อมใช้ เพราะเป็นคนละ environment
ทั้งสองอาการยังไม่ใช่หลักฐานว่า source ของแอปผิด จึงยังไม่ควรแก้โค้ดแอปก่อน`,
  },
  "dev-editor": {
    prompt: "ประเมิน edit-save-run (เปิดเอกสารได้): สร้าง equipment-lab/app.js ให้พิมพ์ ready และ equipment-copy/app.js ให้พิมพ์ old เมื่อตั้งใจรันตัวแรกแต่เห็น old จงเก็บหลักฐาน path ใน editor/terminal และเวอร์ชันที่ save แล้วแก้ให้ออก ready ไม่แก้ไฟล์ copy เพื่อทำให้ผลเหมือนกัน บันทึกผลก่อน/หลัง",
    rubric: ["มีสอง path และ output ก่อน/หลังที่ทำซ้ำได้", "ตรวจไฟล์ที่รันและ save แทนการแก้สำเนาปกปิดสาเหตุ", "อธิบาย buffer กับไฟล์บน disk"],
    modelAnswer: `1) ตรวจชื่อเต็มของไฟล์ใน editor และพิมพ์ Get-Location / pwd ก่อนรัน node app.js
2) ย้าย terminal เข้า equipment-lab แล้ว save ไฟล์ที่มี console.log("ready");
3) รันใหม่ได้ ready ส่วนสำเนาใน equipment-copy ยังเป็น old ไม่ต้องแก้

เนื้อหาใน buffer เปลี่ยนได้ก่อนที่ไฟล์บน disk จะเปลี่ยน runtime อ่านไฟล์ตาม path ที่คำสั่งชี้เท่านั้น`,
  },
  "dev-program": {
    prompt: "ประเมินไล่ค่า (ข้อนี้ไม่เปิดเฉลย/ตัวอย่างเดิมก่อนส่ง): อ่านโค้ดนี้:\nlet boxes = 3;\nboxes = boxes + 2;\nconsole.log(boxes);\nboxes = boxes - 1;\n\nจดค่าหลังแต่ละคำสั่งและ output อธิบายว่าการย้าย console.log ไปท้ายสุดทำให้ผลเปลี่ยนอย่างไร จากนั้นรันตรวจในเครื่อง",
    rubric: ["ค่าตามลำดับ 3 → 5 → 5 → 4 และ output 5", "ย้าย log ท้ายแล้ว output 4 พร้อมเหตุผลเรื่องลำดับ", "แนบผลรันเทียบคำทำนาย ไม่เขียนเพียงผลสุดท้าย"],
    modelAnswer: `let boxes = 3;      // boxes = 3
boxes = boxes + 2;  // boxes = 5
console.log(boxes); // แสดง 5
boxes = boxes - 1;  // boxes = 4

ค่าตามลำดับ 3 → 5 → 5 → 4 และ output คือ 5
ถ้าย้าย console.log ไปท้ายสุดจะเห็น 4 เพราะ console.log อ่านค่า ณ ขณะที่บรรทัดนั้นทำงาน ไม่ใช่ค่าที่เคยแสดงก่อนหน้า`,
  },
  "dev-process": {
    prompt: "ประเมิน process (เปิดเอกสารได้): เครื่องมือพิมพ์ converted แล้วคืน prompt และ exit code 2 ผู้ใช้สรุปว่าทำงานสำเร็จ จงแยกสิ่งที่รู้/ยังไม่รู้และออกแบบการทดลองด้วย process.exitCode เพื่อแสดงว่า output เหมือนเดิมแต่รหัสต่างได้ บันทึกคำสั่งอ่านรหัสสำหรับ shell ของคุณ",
    rubric: ["รู้ว่า process จบ แต่ convention ของ exit ไม่รายงานสำเร็จ", "ไม่ใช้ output หรือ exit 0 เป็นหลักฐานความถูกต้องของงาน", "ทดลองสองรหัสและอ่านทันทีด้วยคำสั่งของ shell ที่ระบุ"],
    modelAnswer: `prompt กลับมาแปลว่า process นี้จบแล้ว
exit code 2 ตามธรรมเนียมคือความล้มเหลว แต่ความหมายเฉพาะของเลข 2 ต้องอ่านจากคู่มือของเครื่องมือ

ทดลอง: สร้างไฟล์ที่พิมพ์ converted แล้วตั้ง process.exitCode เป็น 2 รันและอ่านรหัส จากนั้นเปลี่ยนเป็น 0 รันและอ่านใหม่
PowerShell อ่านด้วย $LASTEXITCODE ส่วน Bash อ่านด้วย echo $? ทันทีหลังรัน
output ทั้งสองรอบเหมือนกัน แต่รหัสต่างกัน

exit code 0 ไม่ได้พิสูจน์ว่าข้อมูลที่แปลงถูกต้อง ต้องตรวจผลนั้นต่างหาก`,
  },
  "dev-errors": {
    prompt: "ประเมินอ่าน error (เปิดเอกสารได้): error คือ ReferenceError: stock is not defined at equipment.js:6:13 แต่ไฟล์ประกาศชื่อ stork ไว้ ผู้ใช้บอกว่าอาจมีปัญหาที่ Node จงแยกหลักฐานกับสมมติฐาน เสนอ patch เล็กที่สุดและการตรวจซ้ำโดยไม่เปลี่ยนหลายสิ่งพร้อมกัน",
    rubric: ["ระบุชนิด ข้อความ ไฟล์/บรรทัด/คอลัมน์", "ตั้งสมมติฐาน spelling จากหลักฐาน ไม่รับรองโดยยังไม่ดูการใช้งานชื่อ", "เสนอแก้ชื่อให้สอดคล้องแล้วเทียบ expected/actual รวม input ใหม่"],
    modelAnswer: `ชนิด: ReferenceError
ข้อความ: stock ไม่ถูกประกาศ ณ จุดที่ใช้
ตำแหน่ง: equipment.js บรรทัด 6 คอลัมน์ 13

สมมติฐาน: สะกดชื่อตัวแปรไม่ตรงกัน (ประกาศ stork แต่ใช้ stock) ให้ดูก่อนว่าตั้งใจใช้ชื่อไหน แล้วแก้เฉพาะตำแหน่งที่สะกดผิด
จากนั้น save, รันคำสั่งเดิม, เทียบจำนวน stock ที่คาดกับที่ได้จริง แล้วลองอีกหนึ่งค่า
ถ้ายังผิดให้จด error ใหม่ ไม่เปลี่ยน Node หรือแก้หลายจุดพร้อมกันโดยไม่มีหลักฐาน`,
  },
  "dev-git": {
    prompt: "ประเมิน Git (เปิดเอกสารได้): ใน repo ทดลองมี README.md และ notes.md ที่บันทึกแล้ว ต้อง commit README อย่างเดียว จากนั้นแก้ README เพิ่มแต่ยังไม่ stage จงพิสูจน์ว่า commit เก็บฉบับก่อนแก้ และ notes ไม่อยู่ใน commit ส่ง command log/diff และเหตุผล ไม่ต้อง push",
    rubric: ["stage เฉพาะ README และ commit มีเหตุผล", "อ่านฉบับที่ commit เทียบกับไฟล์ปัจจุบันด้วยคำสั่ง Git ที่เห็นผลจริง (เช่น git show HEAD:README.md หรือ git diff HEAD)", "ยืนยันด้วยผลจริงว่า notes ยังไม่เข้า commit (git status --short และ git log --stat -1 หรือคำสั่งเทียบเท่า)"],
    modelAnswer: `git status --short
git add README.md
git diff --cached
git commit -m "docs: explain equipment setup"

จากนั้นแก้และ save README อีกครั้ง แล้วตรวจ:
git show HEAD:README.md   อ่านฉบับที่ commit (หรือ git diff เพื่อดูสิ่งที่แก้ใหม่)
git status --short        notes.md ขึ้นเป็น ?? ถ้ายังไม่ tracked
git log --stat -1         แสดงไฟล์ใน commit ล่าสุด ต้องมีเฉพาะ README.md

แนบผลจริงจาก repo ทดลองของตนเอง`,
  },
  "dev-docs": {
    prompt: "ประเมินท้ายคอร์ส (เปิด documentation ได้ ไม่มี starter): คู่มือเครื่องมือสมมติ label v1 ระบุว่า รับข้อความหนึ่งบรรทัด; default คงตัวพิมพ์; option --upper แปลงเป็นตัวใหญ่; ข้อความว่างแจ้ง EMPTY และ exit 2; สำเร็จ exit 0 ผู้ใช้ส่ง Sea และคาด SEA แต่เห็น Sea จงเขียน contract, สมมติฐาน, แผนทดลองทีละตัวแปร และตารางตรวจกรณีปกติ/ว่าง/option ไม่รู้จัก โดยบอกกรณีใดที่คู่มือยังไม่สัญญา ไม่ต้องติดตั้งเครื่องมือสมมตินี้",
    rubric: ["แยก input/output/default/failure ตรงคู่มือ", "วิเคราะห์ความคาดหวังกับ default และทดลอง --upper โดยคง input/version", "ครอบคลุม input ว่างและแยก unknown option ว่ายังไม่กำหนด", "จัดหลักฐานเป็น expected/actual และบอกสิ่งที่ยังต้องถาม ไม่แต่งผลทดลอง"],
    modelAnswer: `contract จากคู่มือ: input ข้อความหนึ่งบรรทัด, default คงตัวพิมพ์, --upper แปลงเป็นตัวใหญ่, ข้อความว่าง → EMPTY และ exit 2, สำเร็จ exit 0

วิเคราะห์: Sea ที่ได้ Sea เป็นไปตาม default จึงไม่ได้ผิด contract
แผนทดลอง (เปลี่ยนทีละตัวแปร): Sea พร้อม --upper คาด SEA และ exit 0 โดยคง input และเวอร์ชันเดิม

ตารางตรวจ (expected / actual):
ปกติ: Sea → Sea
option: Sea --upper → SEA
ว่าง: (ว่าง) → EMPTY, exit 2
--loud: คู่มือไม่ได้กำหนด ต้องถามหรืออ่านเพิ่ม ไม่สรุปเองว่าจะถูกละเลยหรือ exit 2

ช่อง actual ระบุว่ายังไม่ได้รัน เพราะเครื่องมือนี้เป็นเครื่องมือสมมติ`,
  },
};
