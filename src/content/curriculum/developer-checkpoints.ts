import type { TopicSource } from "@/types/curriculum";

// Model answers live behind the submission gate, not in the assessment brief.
export const developerCheckpoints: Record<string, NonNullable<TopicSource["checkpoint"]>> = {
  "dev-files": {
    prompt: "ประเมินการอ่าน path (เปิดเอกสารได้): จาก club/src มีไฟล์ club/data/menu.txt และ club/src/menu.txt อยากอ่านไฟล์ใน data จงระบุ relative path และอธิบายแต่ละส่วน หากเปลี่ยนตำแหน่งเป็น club path เดิมชี้ที่ไหน? ไม่ต้องรันโค้ด",
    rubric: ["ชี้ไฟล์เป้าหมายจากตำแหน่งที่ระบุได้", "อธิบาย .. และผลของการเปลี่ยน working directory ได้"],
    modelAnswer: "จาก club/src ใช้ ../data/menu.txt: .. ขึ้นไป club แล้วเข้า data เมื่อยืนที่ club path เดิมชี้ data/menu.txt ใต้โฟลเดอร์แม่ของ club; ต้องใช้ data/menu.txt แทน ชื่อไฟล์เหมือนกันไม่ทำให้เป็นไฟล์เดียวกัน",
  },
  "dev-terminal": {
    prompt: "ประเมินเครื่องมือ (เปิดคู่มือได้): อยู่ในโฟลเดอร์ส่วนตัว ต้องสร้างพื้นที่ชื่อ equipment-lab เข้าไปและพิสูจน์ว่าไม่มีไฟล์งานเก่าปน เลือก PowerShell หรือ Bash แล้วบันทึกคำสั่ง path ก่อน/หลัง และรายการไฟล์จริง อธิบายว่าคำสั่งใดเปลี่ยน state",
    rubric: ["คำสั่งใช้ได้ใน shell ที่ระบุและสร้าง/เข้าโฟลเดอร์เป้าหมาย", "มี path ก่อน/หลังและรายการไฟล์ ไม่ใช้การติ๊กแทนผลทดลอง", "แยกคำสั่งอ่านกับคำสั่งเปลี่ยนตำแหน่ง/สร้างโฟลเดอร์"],
    modelAnswer: "PowerShell: Get-Location → New-Item -ItemType Directory equipment-lab → Set-Location equipment-lab → Get-Location → Get-ChildItem; Bash: pwd → mkdir equipment-lab → cd equipment-lab → pwd → ls รายการควรว่างหากสร้างใหม่ ต้องแนบผลของเครื่องตนเอง mkdir/New-Item สร้าง state; cd/Set-Location เปลี่ยนตำแหน่ง; ที่เหลืออ่าน",
  },
  "dev-runtime-tools": {
    prompt: "ประเมินวินิจฉัยเครื่องมือ (เปิดคู่มือได้): ใน PowerShell เรียก node --version ได้ v24.x.x แต่ npm run check แจ้ง Missing script: check อีกหน้าต่าง Bash แจ้ง node: command not found วิเคราะห์สองอาการแยกกัน พร้อมคำสั่งเก็บหลักฐานก่อนแก้ และอธิบายว่าทำไมแก้ source ของแอปก่อนยังไม่มีเหตุผล",
    rubric: ["แยก npm พบแล้วแต่ script ไม่มี กับ shell ยังไม่พบ executable", "ตรวจ working directory/package.json และ executable path ในแต่ละ environment", "เสนอลำดับแก้จากหลักฐาน ไม่ติดตั้งทุกอย่างซ้ำ"],
    modelAnswer: "PowerShell: npm ทำงานแล้ว ตรวจ Get-Location และ scripts ใน package.json ว่ามี check หรืออยู่ผิด folder; Bash: command -v node ตรวจการติดตั้ง/PATH ของระบบนั้น แม้ Windows มี Node ก็ไม่ได้ยืนยัน WSL พร้อม ทั้งสองยังไม่ใช่หลักฐานว่า source ของแอปผิด",
  },
  "dev-editor": {
    prompt: "ประเมิน edit-save-run (เปิดเอกสารได้): สร้าง equipment-lab/app.js ให้พิมพ์ ready และ equipment-copy/app.js ให้พิมพ์ old เมื่อตั้งใจรันตัวแรกแต่เห็น old จงเก็บหลักฐาน path ใน editor/terminal และเวอร์ชันที่ save แล้วแก้ให้ออก ready ไม่แก้ไฟล์ copy เพื่อทำให้ผลเหมือนกัน บันทึกผลก่อน/หลัง",
    rubric: ["มีสอง path และ output ก่อน/หลังที่ทำซ้ำได้", "ตรวจไฟล์ที่รันและ save แทนการแก้สำเนาปกปิดสาเหตุ", "อธิบาย buffer กับไฟล์บน disk"],
    modelAnswer: "ตรวจชื่อเต็มของไฟล์ใน editor และ Get-Location/pwd ก่อน node app.js ย้าย terminal เข้า equipment-lab แล้ว save ไฟล์ที่มี console.log(\"ready\"); รันใหม่ได้ ready สำเนายังเป็น old เนื้อหาใน buffer เปลี่ยนได้ก่อน disk; runtime อ่านไฟล์ที่ path ของคำสั่งชี้",
  },
  "dev-program": {
    prompt: "ประเมินไล่ค่า (ข้อนี้ไม่เปิดเฉลย/ตัวอย่างเดิมก่อนส่ง): อ่าน let boxes = 3; boxes = boxes + 2; console.log(boxes); boxes = boxes - 1; จดค่าหลังแต่ละคำสั่งและ output อธิบายว่าการย้าย console.log ไปท้ายสุดทำให้ผลเปลี่ยนอย่างไร จากนั้นรันตรวจในเครื่อง",
    rubric: ["ค่าตามลำดับ 3 → 5 → 5 → 4 และ output 5", "ย้าย log ท้ายแล้ว output 4 พร้อมเหตุผลเรื่องลำดับ", "แนบผลรันเทียบคำทำนาย ไม่เขียนเพียงผลสุดท้าย"],
    modelAnswer: "หลังประกาศ boxes เป็น 3; หลังบวกเป็น 5; log แสดง 5 โดยไม่เปลี่ยนค่า; หลังลบเป็น 4 ถ้าย้าย log ท้ายจะเห็น 4 เพราะอ่านค่าขณะนั้น ไม่ใช่ค่าที่เคยแสดงก่อนหน้า",
  },
  "dev-process": {
    prompt: "ประเมิน process (เปิดเอกสารได้): เครื่องมือพิมพ์ converted แล้วคืน prompt และ exit code 2 ผู้ใช้สรุปว่าทำงานสำเร็จ จงแยกสิ่งที่รู้/ยังไม่รู้และออกแบบการทดลองด้วย process.exitCode เพื่อแสดงว่า output เหมือนเดิมแต่รหัสต่างได้ บันทึกคำสั่งอ่านรหัสสำหรับ shell ของคุณ",
    rubric: ["รู้ว่า process จบ แต่ convention ของ exit ไม่รายงานสำเร็จ", "ไม่ใช้ output หรือ exit 0 เป็นหลักฐานความถูกต้องของงาน", "ทดลองสองรหัสและอ่านทันทีด้วยคำสั่งของ shell ที่ระบุ"],
    modelAnswer: "prompt กลับแปลว่า process นี้จบ รหัส 2 ตาม convention คือความล้มเหลว แต่ต้องอ่านคู่มือเพื่อรู้ความหมายเฉพาะ สร้างไฟล์พิมพ์ converted แล้วตั้ง process.exitCode เป็น 2 และ 0 ทีละรอบ PowerShell อ่าน $LASTEXITCODE; Bash echo $? ทันที ทั้งคู่พิมพ์เหมือนกัน ความถูกต้องของข้อมูลที่แปลงยังต้องตรวจต่างหาก",
  },
  "dev-errors": {
    prompt: "ประเมินอ่าน error (เปิดเอกสารได้): error คือ ReferenceError: stock is not defined at equipment.js:6:13 แต่ไฟล์ประกาศชื่อ stork ไว้ ผู้ใช้บอกว่าอาจมีปัญหาที่ Node จงแยกหลักฐานกับสมมติฐาน เสนอ patch เล็กที่สุดและการตรวจซ้ำโดยไม่เปลี่ยนหลายสิ่งพร้อมกัน",
    rubric: ["ระบุชนิด ข้อความ ไฟล์/บรรทัด/คอลัมน์", "ตั้งสมมติฐาน spelling จากหลักฐาน ไม่รับรองโดยยังไม่ดูการใช้งานชื่อ", "เสนอแก้ชื่อให้สอดคล้องแล้วเทียบ expected/actual รวม input ใหม่"],
    modelAnswer: "ชนิด ReferenceError; ชื่อ stock ไม่ถูกประกาศ ณ จุดใช้; equipment.js บรรทัด 6 คอลัมน์ 13 สมมติฐานคือสะกดตัวแปรไม่สอดคล้อง ดูว่าตั้งใจใช้ชื่อไหนแล้วแก้เพียงตำแหน่งที่ผิด Save รัน command เดิม เทียบจำนวน stock ที่ expected และอีกค่าหนึ่ง หากยังผิดจด error ใหม่ ไม่เปลี่ยน Node โดยไม่มีหลักฐาน",
  },
  "dev-git": {
    prompt: "ประเมิน Git (เปิดเอกสารได้): ใน repo ทดลองมี README.md และ notes.md ที่บันทึกแล้ว ต้อง commit README อย่างเดียว จากนั้นแก้ README เพิ่มแต่ยังไม่ stage จงพิสูจน์ว่า commit เก็บฉบับก่อนแก้ และ notes ไม่อยู่ใน commit ส่ง command log/diff และเหตุผล ไม่ต้อง push",
    rubric: ["stage เฉพาะ README และ commit มีเหตุผล", "git show HEAD:README.md เทียบฉบับที่ commit กับไฟล์ปัจจุบัน", "git status --short และ git show --stat ยืนยัน notes ยังไม่เข้า commit"],
    modelAnswer: "git status --short; git add README.md; git diff --cached; git commit -m \"docs: explain equipment setup\" แล้วแก้/save README อีกครั้ง ใช้ git show HEAD:README.md อ่านฉบับ commit, git diff อ่านสิ่งแก้ใหม่ และ git show --stat ยืนยันมีเฉพาะ README สถานะ notes เป็น ?? หากยังไม่ tracked แนบผลจริงของ repo ทดลอง",
  },
  "dev-docs": {
    prompt: "ประเมินท้ายคอร์ส (เปิด documentation ได้ ไม่มี starter): คู่มือเครื่องมือสมมติ label v1 ระบุว่า รับข้อความหนึ่งบรรทัด; default คงตัวพิมพ์; option --upper แปลงเป็นตัวใหญ่; ข้อความว่างแจ้ง EMPTY และ exit 2; สำเร็จ exit 0 ผู้ใช้ส่ง Sea และคาด SEA แต่เห็น Sea จงเขียน contract, สมมติฐาน, แผนทดลองทีละตัวแปร และตารางตรวจกรณีปกติ/ว่าง/option ไม่รู้จัก โดยบอกกรณีใดที่คู่มือยังไม่สัญญา ไม่ต้องติดตั้งเครื่องมือสมมตินี้",
    rubric: ["แยก input/output/default/failure ตรงคู่มือ", "วิเคราะห์ความคาดหวังกับ default และทดลอง --upper โดยคง input/version", "ครอบคลุม input ว่างและแยก unknown option ว่ายังไม่กำหนด", "จัดหลักฐานเป็น expected/actual และบอกสิ่งที่ยังต้องถาม ไม่แต่งผลทดลอง"],
    modelAnswer: "input Sea; default คืน Sea จึงไม่ได้ผิด contract ทดลอง Sea + --upper คาด SEA, exit 0 เปลี่ยนเฉพาะ option กรณีว่างคาด EMPTY, exit 2 ส่วน --loud ไม่มี behavior ในคู่มือ ต้องถาม/อ่านเพิ่ม ไม่สรุปว่ามันจะ ignore หรือ exit 2 ตาราง actual ระบุยังไม่ได้รันเพราะเป็นเครื่องมือสมมติ ประเมินแผนจาก rubric ไม่รับรองว่ารันผ่าน",
  },
};
