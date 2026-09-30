# Redesign plan

อัปเดตล่าสุด: 2026-09-30

ไฟล์นี้เป็น **คิวงานและเกณฑ์จบ** สถานะหลักฐานล่าสุดอยู่ที่ `docs/REDESIGN-HANDOFF.md` แต่ละช่วงควรทำ, ตรวจ, commit และ push แยกกันเมื่อเป็น feature ที่สมบูรณ์ ห้ามรวมงานค้างแล้วตั้งชื่อเหมือนเสร็จ

สถานะที่ใช้: `ยังไม่เริ่ม` / `กำลังทำ` / `ติดปัญหา` / `เสร็จ`

## R0 — Continuity documents

- สถานะ: **เสร็จ**
- เป้าหมาย: ทำ handoff, plan และ research ให้ AI รอบถัดไปตรวจสถานะและเริ่มงานได้ทันที
- ขอบเขต: `docs/REDESIGN-HANDOFF.md`, `docs/REDESIGN-PLAN.md`, `docs/DESIGN-RESEARCH.md`
- Dependency: Git status/diff/log และเอกสารเดิม
- เกณฑ์เสร็จ: ทั้งสามไฟล์สะท้อน worktree/commits/QA จริง, stage เฉพาะสามไฟล์, commit แยก และ push สำเร็จ
- การทดสอบ: ตรวจ Markdown/diff และ `git status`; ไม่รัน test suite เพราะไม่มี code change

## R1 — Challenge Library

- สถานะ: **เสร็จ** (`72ff141`, pushed)
- เป้าหมาย: ทำคลังโจทย์ให้ค้นและตัดสินใจได้เร็ว ลดรายการยาวจังหวะเดียว
- หน้า/components: `Challenges` ใน `src/components/QuestApp.tsx`, styles ใน `src/app/globals.css`
- Dependency: design tokens และ shell จาก `80dc95b`/`3940f3b`
- เกณฑ์เสร็จ: featured challenge มาจากข้อมูลจริง; แถวผลลัพธ์แสดงชื่อ หมวด เวลา วิธีตรวจ สถานะ; search/filter เดิมทำงาน; มี result count, clear filters และ empty state; ไม่มีปุ่มเปิดหน้าว่าง
- การทดสอบ: lint, search หลายคำ, filter แต่ละแกน, clear, zero-result, keyboard focus และ mobile overflow

## R2 — Skill Evidence

- สถานะ: **เสร็จ** (`290d49f`, pushed)
- เป้าหมาย: แสดงภาพรวมตามหมวดและหลักฐานจริงโดยไม่สร้าง Mastery score
- หน้า/components: `Skills`, progress selectors และ styles ที่เกี่ยวข้อง
- Dependency: R1 เฉพาะ shared compact-row pattern ถ้านำกลับใช้แล้วเหมาะสม
- เกณฑ์เสร็จ: ลด card grid ซ้ำ; เปิดรายละเอียดได้; แยก automatic verification/self-check/local Java; ทักษะไม่มีหลักฐานแสดงทางเริ่มเรียน; Java progress แยกจากเว็บ
- การทดสอบ: เปรียบเทียบข้อมูลว่าง/มี progress, ผ่าน auto/self-check, keyboard disclosure, mobile

## R3 — Journal list-first

- สถานะ: **เสร็จ** (`e6fbfdf`, pushed)
- เป้าหมาย: เปิดมาเห็นบันทึกย้อนหลังและเริ่มเขียนได้ ไม่เจอฟอร์มยาวทันที
- หน้า/components: `Journal`, `JournalEntry`, persistence ใน `QuestApp.tsx`/`src/lib/storage.ts` ถ้าจำเป็น
- Dependency: ต้องรักษา `JournalEntry` fields และ schema v1
- เกณฑ์เสร็จ: list + create/edit flow; ทุก field เดิมอยู่ครบ; search ย้อนหลังถ้ามีเดิมต้องไม่หาย; empty prompts ไม่สร้างข้อมูลปลอม; save/restore หลัง reload
- การทดสอบ: เพิ่ม, แก้, reload, link/lesson association, empty state, invalid/empty fields ที่กำหนด

## R4 — Projects persistence and detail

- สถานะ: **เสร็จ** (`4fbf3b2`, pushed)
- เป้าหมาย: เปลี่ยนจากรายละเอียดทุกโปรเจกต์พร้อมกันเป็น overview/detail พร้อมบันทึก repository, demo และ checklist จริง
- หน้า/components: `Projects`, `AppData`/project types, `src/lib/storage.ts`, related tests
- Dependency: ตัดสินใจ backward-compatible project state; ต้องเพิ่ม test fixture ของ schema v1 เดิมก่อน implementation
- เกณฑ์เสร็จ: project covers แตกต่างกัน; overview มีเป้าหมาย/สถานะ/CTA; stories/criteria อยู่ใน detail; bullet ไม่ดูเหมือนเสร็จ; URLs/checklist คืนหลัง reload; import ข้อมูลเก่าได้
- การทดสอบ: unit validation/migration, add/edit URLs, checklist persistence, reload, old JSON import และ mobile detail

## R5 — Settings and backup safety

- สถานะ: **เสร็จ** (`8475f65`, pushed)
- เป้าหมาย: จัดหมวดการฝึก/ข้อมูลสำรอง/เริ่มใหม่ และทำ feedback ให้ชัด
- หน้า/components: `Settings`, `ModeSwitch`, `src/lib/storage.ts`
- Dependency: R4 data model ต้องนิ่งก่อน final import/export validation
- เกณฑ์เสร็จ: อธิบาย localStorage/no sync ถูกต้อง; mode/goal persist; export ครบ; import success/error ชัด; invalid input ไม่เปลี่ยน data; reset มี confirmation และไม่คลิกพลาดง่าย
- การทดสอบ: export→reset ใน test profile→import, invalid JSON/schema, cancel reset, mode reload

## R6 — Roadmap/mobile interaction audit

- สถานะ: **กำลังทำ**
- เป้าหมาย: ปิดช่องว่างของ Roadmap รุ่นใหม่ โดยเฉพาะ mobile list/drawer และ manual state persistence
- หน้า/components: `FullStackRoadmap.tsx`, `roadmap.css`
- Dependency: visual redesign commit `18bdd70`
- เกณฑ์เสร็จ: topology/readability desktop; list view mobile เข้าถึงทุก node; drawer Escape/focus return; Learning/Done/Skip/clear persist; current-location control ใช้ได้; inferred/manual status แยกกัน
- การทดสอบ: direct `#roadmap`, keyboard-only, refresh state, 390/768 viewports, reduced motion

## R7 — Cross-page responsive and accessibility polish

- สถานะ: **กำลังทำ**
- เป้าหมาย: ตรวจ shell และหน้าที่รีดีไซน์แล้วให้ครบ viewport/keyboard/contrast
- หน้า/components: App shell, Dashboard, Curriculum, Lab, Lesson, Micro-step, Roadmap; `globals.css`
- Dependency: R1–R6 เพื่อไม่แก้ซ้ำ; ตรวจหน้าที่มีแล้วระหว่างทางได้
- เกณฑ์เสร็จ: 1440×900, 1280×800, 768×1024, 390×844 ไม่มี page overflow/text clipping; drawer/modal ไม่ถูกตัด; focus visible; Escape/focus return; reduced motion; sidebar scroll ใช้ได้ใน viewport เตี้ย
- การทดสอบ: production preview, keyboard path, automated lint และ manual contrast checks

## R8 — Functional regression

- สถานะ: **ยังไม่เริ่ม**
- เป้าหมาย: ยืนยันว่า visual redesign ไม่ทำลาย product behavior
- หน้า/components: ทุกหน้า, `storage.ts`, `runner.ts`, recommendation, hash navigation
- Dependency: R1–R7 จบ
- เกณฑ์เสร็จ: hash/back, mode, autosave/reload, wrong/correct tests, XP no duplicate, Java self-check label, checklist/Roadmap persistence, search/filter, Journal/Projects, export/import old and invalid data, step count ≤ course total ทำงานตามจริง
- การทดสอบ: Vitest เพิ่มเฉพาะ logic ที่ควร automate + production browser matrix ด้วย test profile แยก

## R9 — Visual artifacts and asset optimization

- สถานะ: **ยังไม่เริ่ม**
- เป้าหมาย: เก็บหลักฐานหน้าจอและลดต้นทุนภาพโดยไม่ทำลาย pixel fidelity
- หน้า/components: `public/art/`, image usages, docs screenshot destination ที่เลือกใหม่
- Dependency: R1–R8 จบด้านภาพ
- เกณฑ์เสร็จ: ไม่ทับ baseline; ภาพไม่ยืด; dimensions/compression เหมาะสม; asset origin ระบุครบ; ภาพหน้าจอให้ผู้ใช้เป็นผู้ตรวจ/เก็บตามคำสั่งล่าสุด
- การทดสอบ: code/layout review, network/build output audit และ production build; ไม่เรียก Chrome หรือถ่าย screenshot เพิ่ม

## R10 — Release verification (ยังไม่ deploy)

- สถานะ: **ยังไม่เริ่ม**
- เป้าหมาย: ทำ local release candidate ให้ตรวจได้ โดยไม่เผยแพร่สาธารณะ
- หน้า/components: ทั้ง repo และเอกสารส่งมอบ
- Dependency: R1–R9
- เกณฑ์เสร็จ: lint/tests/build ผ่าน; local production preview เปิดได้; git clean ยกเว้น input ที่ตั้งใจ untracked; HANDOFF/PLAN อัปเดต; limitations ซื่อสัตย์
- การทดสอบ: `npm run lint`, `npm test`, `npm run build`, smoke test production
- หมายเหตุ: Private hosting เป็นงานแยกเมื่อผู้ใช้อนุญาตและเลือก access control แล้ว

## ช่วงที่เขียน/ตรวจ/commit/push แล้วก่อนแผนนี้

- Design system + art — `80dc95b`
- App shell + Dashboard — `3940f3b`
- Curriculum — `75da2bf`
- Lab — `89fba30`
- Lesson Workspace — `bd25520`
- Micro-step — `54f0564`
- Roadmap visual redesign — `18bdd70`

รายละเอียดหลักฐานและข้อจำกัดของแต่ละช่วงอยู่ใน `docs/REDESIGN-HANDOFF.md`
