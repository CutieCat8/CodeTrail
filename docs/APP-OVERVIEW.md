# Sea's Full-stack Quest — ภาพรวมทุกหน้า

เอกสารนี้เขียนไว้ให้ AI (Claude, ChatGPT ฯลฯ) อ่านคู่กับภาพหน้าจอในโฟลเดอร์ `docs/screenshots/` โดยชื่อไฟล์ภาพจะตรงกับหัวข้อด้านล่าง แอปรันอยู่บน localhost จึงเปิดผ่านลิงก์ไม่ได้ ให้แนบ `.md` + ภาพ `.png` เข้าไปในแชตแทน

## แอปนี้คืออะไร

เว็บแอปส่วนตัวสำหรับ "ซี" ใช้เรียนเป็น Full-stack Developer (TypeScript / React / Next.js / Node / PostgreSQL) และ Java + OOP แบบมีภารกิจ บทเรียน โจทย์ตรวจอัตโนมัติ สมุดบันทึก และโปรเจกต์สะสมผลงาน

- **Stack:** Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript, ทดสอบด้วย Vitest
- **ไม่มี backend / database:** ข้อมูลทั้งหมด (ความคืบหน้า โค้ดที่เขียน บันทึก สถานะ roadmap) เก็บใน `localStorage` ของเบราว์เซอร์ มีปุ่ม Export/Import JSON
- **โครงสร้างหน้า:** เป็น single-page app หน้าเดียว สลับหน้าด้วย hash (`#roadmap`, `#lesson/<id>` ฯลฯ) มี sidebar ซ้ายเป็นเมนูหลัก และ topbar บอกหน้าปัจจุบัน + สถานะบันทึก
- **ธีม:** พื้นมืดสีน้ำเงินเข้ม เน้นสี mint / cyan ยกเว้นหน้า Roadmap ที่ใช้พื้นสว่างโทนพาสเทล
- **ภาษา:** UI เป็นภาษาไทยผสมศัพท์เทคนิคภาษาอังกฤษ
- **ข้อมูลในภาพ:** แคชจากสถานะเริ่มต้น (ยังไม่เคยเรียน) ตัวเลขความคืบหน้าจึงเป็น 0 ทั้งหมด

Sidebar มี 9 เมนู และมีตัวนับ XP กับจำนวนบทที่ผ่านอยู่ล่างสุด (ในภาพ XP ถูกไอคอน "N" ของ Next.js dev ทับ เกิดเฉพาะโหมด dev)

---

## 01 · ฐานปฏิบัติการ (Dashboard)
ภาพ: `screenshots/01-dashboard.png` · route: `#dashboard`

หน้าแรก บอกว่าวันนี้ควรทำอะไรต่อ
- คำทักทาย + ตัวสลับ **โหมดการเรียน**: Full-stack / Java & OOP / ผสมสองเส้นทาง
- การ์ดใหญ่ **ภารกิจวันนี้**: micro-step ที่ระบบแนะนำ (ในภาพคือ "Program, source code และ instruction" จาก Developer Foundations) บอกเวลา ประเภท และปุ่ม "เริ่ม micro-step"
- แถบสถิติ 4 ช่อง: วันต่อเนื่อง (streak), micro-steps ที่ผ่าน, ทักษะล่าสุด, เป้าหมายสัปดาห์
- **Resume log:** กลับไปจุดล่าสุด
- **Review radar:** เรื่องที่ควรทบทวน
- **Active project:** Friends Activity Planner
- **Weekly target:** สไลเดอร์ตั้งจำนวนภารกิจต่อสัปดาห์ (1–14)

## 02 · คอร์สจากพื้นฐาน (Curriculum)
ภาพ: `screenshots/02-curriculum.png` · route: `#curriculum`

รายการคอร์สที่แตกเป็น micro-step เล็กๆ หลายร้อยข้อ
- แท็บกรอง: ทั้งหมด / พื้นฐานนักพัฒนา / Java & OOP / Web & Back-end
- คอร์สที่เปิดแล้ว: Developer Foundations (40 steps), Java Foundations (70), Java OOP Lab (40), JavaScript Foundations (40), Node & HTTP Foundations (40)
- แต่ละคอร์สแบ่งเป็นหัวข้อ และแต่ละหัวข้อมีช่องตัวเลขเล็กๆ ให้กดเข้า step
- คอร์สที่ยังล็อก (วางแผนไว้): TypeScript Workshop (72), React Foundations (84), Next.js App Router (60), PostgreSQL & Prisma (84)

## 03 · Full-stack Roadmap
ภาพ: `screenshots/03-roadmap.png` (ทั้งหน้า), `screenshots/12-roadmap-drawer.png` (เปิดแผงรายละเอียด) · route: `#roadmap`

แผนที่เส้นทางเรียน Full-stack ออกแบบตามสไตล์ roadmap.sh แต่ใช้สีพาสเทลของตัวเอง
- **เส้นกลางแนวตั้ง** ต่อยาวจาก "Full Stack" ถึง "Build · Explain · Ship · Improve"
- **กล่องลาเวนเดอร์** = ด่านหลัก 9 ด่าน + ด่านเสริม Java (01 ใช้เครื่องมือ → 02 ภาษาของเว็บ → 03 ฟังก์ชันและข้อมูล → 04 Front-end/Back-end → 05 ข้อมูลมีโครงสร้าง → 06 Full-stack feature → 07 ความน่าเชื่อถือ → 08 ส่งงานขึ้นจริง → J Java & OOP → 09 Portfolio)
- **กล่องฟ้าอ่อน** = หัวข้อย่อย 42 หัวข้อ แตกซ้าย/ขวาสลับกัน เชื่อมเส้นกลางด้วยเส้นประ; ขอบซ้ายมีแถบสีบอกสายทักษะ; เส้นประรอบกล่อง = หัวข้อเลือกเรียน
- **กล่องม่วงเข้ม** = Checkpoint ท้ายแต่ละด่าน บอกว่าจบด่านแล้วควรทำอะไรได้
- **คลิกหัวข้อ** → เปิดแผงขวาสีขาว: คำอธิบาย ทำไมต้องเรียน หลักฐานว่าเข้าใจแล้ว และปุ่ม **Learning / Done / Skip** (กดซ้ำเพื่อยกเลิก) + ปุ่มเริ่มเรียนถ้ามีบทเรียนรองรับ
- สถานะแสดงบนกล่อง: Learning = เหลืองมีไอคอนนาฬิกา, Done = เขียวขีดฆ่า, Skip = เทาจาง
- ถ้ายังไม่กดเอง ระบบเดาสถานะจากความคืบหน้าในบทเรียน/step ที่ผูกไว้
- ด้านบนมีสถิติ Done / Learning / Skip และตัวกรองสายทักษะ (พื้นฐานร่วม, Front-end, Back-end, Database, Quality & Delivery, Java)

## 04 · แผนที่ Lab (Learning Map)
ภาพ: `screenshots/04-lab-map.png` · route: `#map`

เส้นทางบทเรียนแบบ Lab (โจทย์เขียนโค้ดตรวจอัตโนมัติ/เช็กลิสต์) 10 "โลก" เรียงแนวตั้งบนเส้นเวลา
- 01 Developer Foundations · 02 Java Foundations (6 บท) · 03 Java OOP Lab (4 บท) · 04 TypeScript Workshop · 05 React & Next.js (4) · 06 Node.js & Express (3) · 07 PostgreSQL & Data Modeling (2) · 08 Full-stack Integration (2) · 09 Authentication & Reliability · 10 Portfolio Projects
- แต่ละบทบอกเวลา (นาที) และวิธีตรวจ (ตรวจในเครื่อง / เช็กลิสต์) กดเข้าไปเปิดหน้าบทเรียน
- โลกที่ยังไม่มีเนื้อหาขึ้นป้าย "วางแผนไว้"; ท้ายหน้ามีกล่อง Java Phase 2 ที่ยังล็อก (inheritance, polymorphism, exceptions, generics, JUnit, RPG Battle CLI)

## 05 · คลังโจทย์ (Challenge Library)
ภาพ: `screenshots/05-challenges.png` · route: `#challenges`

คลังโจทย์ทั้ง 22 ข้อในรูปแบบรายการ
- ช่องค้นหา + ตัวกรองสายทาง + ตัวกรองวิธีตรวจ
- แต่ละข้อมีป้ายโมดูล ชื่อโจทย์ คำอธิบายสั้น เวลา และวิธีตรวจ (ไอคอน `</>` = เว็บ, `{ }` = Java)

## 06 · หลักฐานทักษะ (Skill Evidence)
ภาพ: `screenshots/06-skills.png` · route: `#skills`

สรุปทักษะแบบ "หลักฐาน ไม่ใช่คะแนนสวยๆ" — ไม่มี Mastery %
- กลุ่ม Full-stack 9 ทักษะ (TypeScript, React, Next.js, REST API, Validation, SQL, Authentication, Testing, Integration) และกลุ่ม Java & OOP 9 ทักษะ
- แต่ละการ์ดนับ "ระบบตรวจผ่าน" กับ "ตรวจด้วยเช็กลิสต์" พร้อมแถบความคืบหน้า และลิงก์ไปบทที่มีหลักฐาน
- ทักษะที่ยังไม่มีบทเรียนขึ้นข้อความ "วางแผนไว้ — ยังไม่มีหลักฐาน"

## 07 · สมุดบันทึก (Journal)
ภาพ: `screenshots/07-journal.png` · route: `#journal`

ฟอร์มบันทึกการเรียนรู้ + รายการบันทึกที่เคยเขียน
- ฟิลด์: หัวข้อ, เชื่อมกับบท, แนวคิดที่เข้าใจเพิ่ม, บั๊กที่เจอ, วิธีแก้และเหตุผล, สิ่งที่ยังไม่เข้าใจ, GitHub/Demo URL
- ฝั่งขวามีช่องค้นหาบันทึก (ในภาพยังไม่มีบันทึก)

## 08 · โปรเจกต์ (Projects)
ภาพ: `screenshots/08-projects.png` · route: `#projects`

4 โปรเจกต์สะสมผลงาน: Friends Activity Planner (เส้นทางหลัก), Personal Expense Tracker, Mini Incident Dashboard (ต่อยอด), Booking API (ขั้นสูง)
- แต่ละโปรเจกต์มี User stories, Acceptance criteria, ช่องกรอก Repository URL / Demo URL และส่วนพับ "คำถามตัดสินใจทางเทคนิค"

## 09 · ตั้งค่า (Settings)
ภาพ: `screenshots/09-settings.png` · route: `#settings`

- แจ้งว่าข้อมูลอยู่ใน localStorage เท่านั้น ไม่ส่งขึ้น server
- สลับโหมดภารกิจ
- Export JSON / Import JSON สำหรับสำรองและย้ายข้อมูล
- ปุ่ม "ล้างข้อมูล" เพื่อเริ่มใหม่

## 10 · หน้าบทเรียน (Lesson Workspace)
ภาพ: `screenshots/10-lesson.png` · route: `#lesson/<id>` (ตัวอย่าง: `#lesson/web-ts-narrowing`)

พื้นที่ทำงานของ 1 บทเรียน/1 โจทย์
- หัวบท: breadcrumb, ป้ายเส้นทาง, เวลา/XP, สถานะ ("กำลังเรียน")
- แท็บ: **บทเรียน** / โจทย์ / โค้ด / ผลทดสอบ / บันทึก
- แท็บบทเรียนมี: เป้าหมายหลังจบบท, ทำไมใช้ในงานจริง, Prerequisite, แนวคิดสำคัญ, โค้ดตัวอย่าง, "จุดที่มักพลาด", ปุ่ม "ไปที่โจทย์"
- แถบขวา: Session plan (ทบทวน 5 → เรียนแนวคิด 15 → ลงมือเขียน 30 → ทดสอบ+บันทึก 10 นาที), Check mode, จำนวน attempts

## 11 · หน้า Micro-step
ภาพ: `screenshots/11-step.png` · route: `#step/<id>` (ตัวอย่าง: `#step/js-runtime-concept`)

หน้าเรียนหน่วยเล็กที่สุด (ตัวอย่างในภาพใช้เวลา 7 นาที) ที่เปิดจากหน้าคอร์ส
- หัวหน้า: ลิงก์กลับ "คอร์สทั้งหมด", ชื่อคอร์ส/หัวข้อ, ชื่อ step, ตัวนับลำดับที่มุมขวา
- คอลัมน์ซ้าย: ประเภท (เช่น CONCEPT), เวลา, ปุ่ม ก่อนหน้า/ถัดไป
- เนื้อหา: คำอธิบาย ตารางคำศัพท์ ตัวอย่างโค้ด และช่อง "Field notes" ให้จดสิ่งที่เข้าใจหรือสงสัย

---

## ข้อสังเกตที่เห็นจากภาพ (สำหรับคนรีวิว)
- หน้า Micro-step มุมขวาบนแสดง **"151 / 40"** ดูเหมือนตัวนับลำดับไม่ตรงกับจำนวน step ของคอร์ส (ยังไม่ได้ตรวจโค้ด)
- ในโหมด dev ไอคอน "N" ของ Next.js ทับส่วน XP มุมซ้ายล่าง (ไม่เกิดใน production)
- หน้า Roadmap สว่างต่างจากส่วนอื่นของแอปที่เป็นธีมมืด ตั้งใจให้เป็นแคนวาส
