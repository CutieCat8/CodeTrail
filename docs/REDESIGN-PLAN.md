# Redesign plan

อัปเดต: 2026-10-01
สถานะรอบ: **Home dashboard + real activity heatmap เขียนและ push แล้ว — รอ manual acceptance จากผู้ใช้**

สถานะที่ใช้: ยังไม่เริ่ม / กำลังทำ / ติดปัญหา / เสร็จ
คำว่า “เสร็จ” หมายถึงผ่านเกณฑ์ของช่วงนั้นเท่านั้น ไม่ได้ทำให้ browser/visual acceptance ผ่านโดยอัตโนมัติ

## R0 — Continuity documents

- สถานะ: **เสร็จ**
- เป้าหมาย/ขอบเขต: HANDOFF, PLAN และ DESIGN-RESEARCH ที่ทำให้รอบถัดไปทำต่อได้
- หน้า/components: `docs/REDESIGN-HANDOFF.md`, `docs/REDESIGN-PLAN.md`, `docs/DESIGN-RESEARCH.md`
- Dependency: Git/code state จริง
- เกณฑ์เสร็จ: แยก code/browser/tests/commit/push และบันทึกข้อจำกัดตรงไปตรงมา
- การทดสอบ: ตรวจ links/commit hashes กับ Git; ไม่รัน app tests เพราะแก้ docs อย่างเดียว

## R1 — Core visual redesign

- สถานะ: **เสร็จ** ด้าน implementation
- เป้าหมาย/ขอบเขต: tokens, original art, shell, Dashboard, Curriculum, Lab, Lesson, Micro-step และ Roadmap
- หน้า/components: `globals.css`, `QuestApp.tsx`, `FullStackRoadmap.tsx`, `roadmap.css`, `ExpeditionArt.tsx`, `PixelCat.tsx`, `public/art/`
- Dependency: IDs/hash/storage/runner เดิม
- เกณฑ์เสร็จ: composition ใหม่ครบหน้าหลักโดยไม่ทำลาย data contracts
- การทดสอบ: commits `80dc95b`, `3940f3b`, `75da2bf`, `89fba30`, `bd25520`, `54f0564`, `18bdd70`, `31868ee`

## R2 — Secondary pages

- สถานะ: **เสร็จ** ด้าน implementation
- เป้าหมาย/ขอบเขต: Challenge, Skills, Journal, Projects และ Settings ใช้ composition ที่เหมาะกับงานแต่ละหน้า
- หน้า/components: sections ที่เกี่ยวข้องใน `QuestApp.tsx`, `globals.css`, persistence types/storage
- Dependency: R1 design system
- เกณฑ์เสร็จ: search/filter, evidence, list-first notes, project detail/persistence และ backup controls มีโค้ดใช้งานจริง
- การทดสอบ: commits `72ff141`, `290d49f`, `e6fbfdf`, `4fbf3b2`, `8475f65`

## R3 — Persistence and import safety

- สถานะ: **เสร็จ** ด้าน automated validation
- เป้าหมาย/ขอบเขต: รักษา schema v1 และป้องกัน malformed nested import
- หน้า/components: `src/lib/storage.ts`, `src/types/domain.ts`, `tests/content.test.ts`
- Dependency: Project/Roadmap optional fields
- เกณฑ์เสร็จ: old shape ยัง normalize ได้; invalid nested records ถูกปฏิเสธ; current data ไม่ถูกเขียนจาก validator ที่ล้มเหลว
- การทดสอบ: lint ผ่าน, Vitest 15/15, build ผ่านหลัง `a8d12b0`; browser import flow ยังอยู่ใน R5

## R4 — Acceptance preparation

- สถานะ: **เสร็จ** (เอกสารชุดนี้เป็น commit ของ R4)
- เป้าหมาย/ขอบเขต: สร้าง manual checklist และปรับ HANDOFF/PLAN ให้สะท้อน implementation freeze
- หน้า/components: เอกสารสามไฟล์ใน `docs/`
- Dependency: R1–R3 และสถานะ Git ล่าสุด
- เกณฑ์เสร็จ: checklist ระบุ hash/ขั้นตอน/ผล/ช่องผล ครบ desktop/mobile/navigation/persistence/runner/XP/checklist/Roadmap/Journal/Projects/Import/keyboard
- การทดสอบ: review เอกสารเทียบ prompt 20 หัวข้อ; ไม่รัน app checks ซ้ำเมื่อมีเพียง docs change

## R5 — Manual functional acceptance

- สถานะ: **ติดปัญหา — รอผลตรวจจากผู้ใช้**
- เป้าหมาย/ขอบเขต: ยืนยัน behavior ใน production preview โดยไม่ใช้ข้อมูลจริง
- หน้า/components: ทุกหน้า โดยเริ่ม Dashboard → Curriculum → Lab → Lesson → Micro-step
- Dependency: R4 และผู้ใช้เปิด browser เอง
- เกณฑ์เสร็จ: hash/back, mode, autosave, wrong/correct tests, XP no duplicate, Java label, checklist, Roadmap marks, search, Journal, Projects, Export/Import ผ่านตาม checklist
- การทดสอบ: `docs/ACCEPTANCE-CHECKLIST.md` ส่วน A–E

## R5.1 — Pixel Nebula theme iteration

- สถานะ: **เสร็จ** ด้าน implementation (`d2d59d7`, pushed)
- เป้าหมาย/ขอบเขต: ใช้สีดำเป็นฐานและ blue→violet gradient โดยให้ภาพรวมกลับมาเข้ากับ pixel art
- หน้า/components: `src/app/pixel-nebula.css`, import ใน `src/app/layout.tsx`; ครอบ shell และทุกหน้าที่รีดีไซน์
- Dependency: design system เดิมและ pixel assets จาก R1
- เกณฑ์เสร็จ: canvas/surfaces เป็น near-black, gradient ใช้กับองค์ประกอบนำสายตา, primary/secondary text contrast สูง, pixel assets เดิมยัง render
- การทดสอบ: lint ผ่าน, production build ผ่าน, static contrast ของคู่สีหลัก 6.57:1–18.87:1; visual acceptance อยู่ใน R6

## R5.2 — Daily-return Home และ activity heatmap

- สถานะ: **เสร็จด้าน implementation** (`7e4d7c8`, pushed) / รอ manual visual acceptance
- เป้าหมาย/ขอบเขต: ทำ `#dashboard` เป็นหน้า Home ที่เห็นจุดเรียนต่อ โปรไฟล์ และความสม่ำเสมอจากข้อมูลจริงทันที โดยยังคง Pixel Nebula และ pixel art
- หน้า/components: `QuestHome.tsx`, `ActivityHeatmap.tsx`, `activity.ts`, `home-dashboard.css`, Dashboard adapter ใน `QuestApp.tsx`
- Dependency: schema v1, recommendation rules, lesson/step/project progress และ Asia/Bangkok
- เกณฑ์เสร็จ: zero state ไม่ปลอมกิจกรรม; heatmap สร้างจาก persisted timestamps; CTA เปิด hash เดิม; mode/goal ใช้ data source เดิม; mobile CSS มี layout stack
- การทดสอบ: lint ผ่าน, Vitest 18/18, production build ผ่าน; composition, hover/focus/day detail และ responsive layout อยู่ใน R6

## R6 — Responsive and visual acceptance

- สถานะ: **ติดปัญหา — รอผลตรวจ/ภาพจากผู้ใช้**
- เป้าหมาย/ขอบเขต: ตรวจ hierarchy, typography, art, overflow, drawers และ states ที่ viewport เป้าหมาย
- หน้า/components: ทุกหน้าที่รีดีไซน์และ assets
- Dependency: R5 หรือทดสอบคู่ขนานโดยผู้ใช้
- เกณฑ์เสร็จ: 1440×900, 1280×800, 768×1024, 390×844 ไม่มีปัญหารุนแรง; user ยืนยัน visual acceptance หรือส่ง defect ที่ทำซ้ำได้
- การทดสอบ: checklist ส่วน A/F และภาพจากผู้ใช้; AI ไม่เรียก Chrome/ถ่าย screenshot ตามข้อจำกัด

## R7 — Keyboard, focus and reduced-motion acceptance

- สถานะ: **ติดปัญหา — รอผลตรวจจากผู้ใช้**
- เป้าหมาย/ขอบเขต: ยืนยัน keyboard-only, Escape/focus return, visible focus และ reduced motion
- หน้า/components: shell drawers, Roadmap drawer, Lesson controls, Settings modal, global CSS
- Dependency: R4
- เกณฑ์เสร็จ: action หลักเข้าถึงด้วย keyboard, focus ไม่สูญ, drawer คืน focus, reduced-motion ไม่รบกวนการเรียน
- การทดสอบ: checklist ส่วน G

## R8 — Acceptance defect fixes

- สถานะ: **กำลังทำ** — แก้ mixed mission defect แรกแล้ว (`a5b0408`); ยังรอ manual acceptance
- เป้าหมาย/ขอบเขต: แก้เฉพาะข้อไม่ผ่านที่ผู้ใช้รายงาน
- หน้า/components: จำกัดตาม defect
- Dependency: R5–R7 มีผลตรวจ
- เกณฑ์เสร็จ: มี reproduction, root cause, fix และ targeted verification; หนึ่ง defect/feature ต่อหนึ่ง commit
- การทดสอบ: targeted test + lint/build ตามความเสี่ยง ไม่รันทุกอย่างซ้ำโดยไม่มีเหตุ

Defect ที่ปิดด้าน implementation:

- Mixed mode เดิมเดิน Developer Foundations ครบทั้งคอร์สก่อน Java; เปลี่ยนเป็น balanced staged alternation พร้อม tests 10 ข้อ
- Home เดิมอาจ resume รายการจากโหมดก่อนหน้า; จำกัด resume ให้ตรง route และให้ Mixed ใช้ recommendation ปัจจุบัน

## R9 — Asset optimization

- สถานะ: **ยังไม่เริ่ม**
- เป้าหมาย/ขอบเขต: ลดต้นทุน raster assets โดยไม่ทำลาย pixel fidelity
- หน้า/components: `public/art/`, image usages
- Dependency: visual acceptance ยืนยัน crop/สัดส่วนก่อน
- เกณฑ์เสร็จ: dimensions/format/compression เหมาะสม, ไม่มีภาพยืด, origin/attribution ครบ
- การทดสอบ: build output/asset-size audit และผู้ใช้ตรวจภาพ

## R10 — Private delivery

- สถานะ: **ยังไม่เริ่มตามคำสั่งผู้ใช้**
- เป้าหมาย/ขอบเขต: private hosting/access control เมื่อผู้ใช้พร้อม
- หน้า/components: deployment configuration และเอกสารส่งมอบ
- Dependency: R5–R9 ผ่านและเลือก hosting/access policy
- เกณฑ์เสร็จ: private URL ถูกตรวจ access จริง; ไม่ใช้ URL เดายาก/noindex แทน auth
- การทดสอบ: authorized/unauthorized access และ production smoke test

## การตัดสินใจรอบนี้

- หยุดเพิ่ม feature และ visual refinement หลัง Home iteration นี้จนผู้ใช้ส่งผลตรวจ
- ใช้ `docs/ACCEPTANCE-CHECKLIST.md` เป็น source of truth สำหรับการตรวจรับ
- หลัง R4 commit/push ให้รอผล/ภาพจากผู้ใช้ก่อน R8
- Private deployment และ screenshot generation ยังไม่อยู่ในขอบเขตรอบนี้
