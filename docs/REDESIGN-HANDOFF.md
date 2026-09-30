# Redesign handoff

อัปเดตล่าสุด: 2026-09-30  
Branch: `main`  
Remote: `origin` → `https://github.com/CutieCat8/CodeTrail.git`  
Commit ที่ตรวจเป็นฐาน: `8475f65` (`origin/main` หลังจบ R5)

ไฟล์นี้เป็น **สถานะปัจจุบัน** ของงานรีดีไซน์ ส่วนภาพรวมผลิตภัณฑ์อยู่ที่ `docs/APP-OVERVIEW.md`, คิวงานอยู่ที่ `docs/REDESIGN-PLAN.md` และเหตุผลด้านภาพอยู่ที่ `docs/DESIGN-RESEARCH.md` เมื่อเอกสารขัดกับโค้ด ให้ยืนยันจากโค้ด, tests และ Git ก่อนแก้เอกสาร

## เป้าหมายและทิศทาง

รีดีไซน์แอปเดิมให้เป็นโลกเรียนเขียนโปรแกรมที่อยากกลับมาใช้วันละประมาณหนึ่งชั่วโมง โดยไม่ลดทอนระบบเรียนและข้อมูลเดิม Art direction คือ **Midnight Pixel Expedition**: โลก pixel art ยามค่ำคืนผสาน developer workspace ที่อ่านสบาย ใช้พื้น navy/slate หลายระดับ, mint สำหรับ action, lavender สำหรับ Java, cyan สำหรับข้อมูล และ amber สำหรับ checkpoint

ผลลัพธ์ที่ต้องรักษาไว้คือ Dashboard ที่บอกงานถัดไปทันที, Curriculum ที่เลือกจากชื่อและความหมายได้, Roadmap แบบแผนเดินทาง, Lab แบบโลกภารกิจ, Workspace ที่อ่านและเขียนโค้ดต่อเนื่องได้ และหน้ารองที่ไม่ย้อนกลับไปเป็น card grid ซ้ำกันทั้งหมด

## สัญญาที่ห้ามทำพัง

- คง localStorage key `seas-fullstack-quest:v1` และ `AppData.version === 1`; field ใหม่ต้อง optional หรือมี migration ที่อ่านข้อมูลเก่าได้
- ห้ามล้าง localStorage เพื่อทดสอบ; ใช้ browser profile/ชุดข้อมูลแยก
- คง Lesson IDs, Topic/Step IDs และ hash routes เดิม เช่น `#dashboard`, `#curriculum`, `#roadmap`, `#map`, `#lesson/<id>`, `#step/<id>`
- คงโหมด `fullstack`, `java`, `mixed`, weekly goal, answers, notes, reflection, checklist, attempts, last result, journal, last lesson/step และ Roadmap marks
- คงสถานะ Roadmap `learning | done | skip`; แยกสถานะผู้เรียนตั้งเองจากสถานะที่อนุมาน
- ระบบ auto-check ต้องรันพฤติกรรมจริงใน Web Worker ผ่าน `src/lib/runner.ts`, timeout 1.5 วินาที และไม่เปลี่ยนเป็น keyword matching หรือ `eval` ใน UI process
- Java ยังเป็น `local-java`: เว็บไซต์บันทึก source/checklist/notes แต่ห้ามอ้างว่า compile หรือ tests ผ่าน
- XP มาจาก `completedAt` ของการผ่านครั้งแรก; การรันหรือกดซ้ำต้องไม่เพิ่มรางวัล
- คง Export/Import JSON และ validation; invalid import ต้องไม่ทำให้แอปล้ม
- ไม่เพิ่ม backend/database/auth หรือเปลี่ยน routing architecture เพื่อรีดีไซน์
- ยังไม่ deploy สาธารณะ; localStorage ไม่ใช่ access control และไม่มี private URL ที่ตรวจแล้วในขณะนี้

## สถานะรายช่วง

คำว่า “เขียนแล้ว”, “ตรวจใน browser”, “ผ่าน tests/build”, “commit” และ “push” แยกกันตามหลักฐาน ไม่ใช้คำว่าเสร็จแทนทุกสถานะ

| ช่วง | เขียนโค้ดแล้ว | ตรวจใน browser แล้ว | Tests / build | Commit | Push | ไฟล์สำคัญ |
|---|---|---|---|---|---|---|
| Roadmap marks + schema v1 compatibility | ใช่ | ตรวจ flow หลักแล้ว | test รองรับ schema | `43943bc` | ใช่ | `src/lib/storage.ts`, `src/types/domain.ts`, `src/components/FullStackRoadmap.tsx` |
| แก้เลข Micro-step ต่อคอร์ส | ใช่ | เห็น `1 / 40` ในคอร์สที่ตรวจ | unit test ครอบคลุม | `31868ee` | ใช่ | `src/content/curriculum/generate.ts`, `tests/content.test.ts` |
| Design tokens + original pixel assets | ใช่ | ใช้จริงในหน้าที่รีดีไซน์ | build ผ่านภายหลัง | `80dc95b` | ใช่ | `src/app/globals.css`, `src/components/ExpeditionArt.tsx`, `public/art/` |
| App shell + Dashboard | ใช่ | Production desktop/mobile | lint/build ผ่านภายหลัง | `3940f3b` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Curriculum explorer | ใช่ | Production desktop/mobile | lint/build ผ่านภายหลัง | `75da2bf` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Lab world map | ใช่ | Production desktop/mobile | lint/build ผ่านภายหลัง | `89fba30` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Lesson split workspace | ใช่ | Production desktop/mobile | tests 12/12 หลังชุดนี้ | `bd25520` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Micro-step three-phase flow | ใช่ | Production desktop/mobile | tests 12/12 หลังชุดนี้ | `54f0564` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Roadmap + drawer visual system | ใช่ | Production desktop + drawer | lint/build ผ่านหลังชุดนี้; ไม่ได้รัน tests ซ้ำเพราะเปลี่ยน UI/CSS | `18bdd70` | ใช่ | `src/components/FullStackRoadmap.tsx`, `src/components/roadmap.css` |
| Challenge Library mission archive | ใช่ | Production desktop/mobile, filter/empty/clear | lint + tests 12/12 + build ผ่าน | `72ff141` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Skill Evidence explorer | ใช่ | ผู้ใช้จะตรวจภาพเองตามคำสั่งล่าสุด | lint + tests 12/12 + build ผ่าน | `290d49f` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Journal archive-first flow | ใช่ | ผู้ใช้จะตรวจภาพเองตามคำสั่งล่าสุด | lint + tests 12/12 + build ผ่าน | `e6fbfdf` | ใช่ | `src/components/QuestApp.tsx`, `src/app/globals.css` |
| Projects overview + persisted evidence | ใช่ | ผู้ใช้จะตรวจภาพเองตามคำสั่งล่าสุด | lint + tests 14/14 + build ผ่าน | `4fbf3b2` | ใช่ | `src/types/domain.ts`, `src/lib/storage.ts`, `src/components/QuestApp.tsx`, `tests/content.test.ts` |
| Settings + backup recovery controls | ใช่ | ผู้ใช้จะตรวจภาพเองตามคำสั่งล่าสุด | lint + tests 14/14 + build ผ่าน | `8475f65` | ใช่ | `src/lib/storage.ts`, `src/components/QuestApp.tsx`, `tests/content.test.ts` |

`origin/main` และ `HEAD` ตรงกันที่ `8475f65` หลังจบ R5

## สิ่งที่กำลังทำ

R5 Settings จบและ push แล้ว งานถัดไปคือ R6/R7 interaction + responsive audit โดยไม่เรียก Chrome ตามคำสั่งล่าสุด ให้ตรวจจาก code, lint/tests/build และส่งรายการจุดที่ผู้ใช้ควรดูเอง

## Worktree ที่ยังไม่ commit ก่อนเอกสารชุดนี้

ผล `git status --short` ก่อนสร้างเอกสาร:

```text
?? docs/APP-OVERVIEW.md
?? docs/screenshots/
```

`git diff` และ `git diff --stat` ว่าง ไม่มี tracked code ที่แก้ค้าง ไฟล์ด้านบนเป็น input/reference ที่ผู้ใช้ให้มา จึงไม่ถูกแก้, stage หรือ commit รวมกับเอกสารส่งต่อโดยอัตโนมัติ หลังสร้างเอกสารนี้จะ stage เฉพาะ:

- `docs/REDESIGN-HANDOFF.md`
- `docs/REDESIGN-PLAN.md`
- `docs/DESIGN-RESEARCH.md`

## งานที่เหลือตามลำดับ

1. Functional QA ของ persistence/runner/XP/import และ Roadmap states ด้วยข้อมูลทดสอบแยก
2. Responsive/a11y code audit รวม focus, Escape, overflow, contrast และ reduced motion; ผู้ใช้ตรวจ viewport จริงเอง
3. optimize ภาพและรัน lint/tests/build รอบส่งมอบ
4. Private hosting ทำภายหลังเมื่อผู้ใช้พร้อม; ห้าม deploy สาธารณะเพื่อให้มี URL

รายละเอียดและเกณฑ์จบของแต่ละช่วงอยู่ใน `docs/REDESIGN-PLAN.md`

## งานถัดไปแบบเจาะจง

เริ่ม R6/R7 ที่ shell, Roadmap และ interaction paths:

1. ตรวจ drawer focus trap/Escape/focus return และ Roadmap drawer ด้วย code review
2. ตรวจ media queries ของหน้าที่รีดีไซน์ทั้งหมดหา overflow/target ต่ำกว่าเกณฑ์
3. เพิ่ม unit tests ให้ logic persistence/XP/import ที่ยังตรวจอัตโนมัติได้ โดยไม่จำลอง browser pass
4. สรุป manual visual checklist ให้ผู้ใช้ตรวจแทน Chrome
5. commit/push การแก้แต่ละ defect แยกจากเอกสาร

## ข้อจำกัดและบั๊กที่ทราบ

- `QuestApp.tsx` ยังเป็น component ใหญ่ หลายหน้ารวมในไฟล์เดียว; ห้าม refactor ใหญ่พร้อมรีดีไซน์หน้าหนึ่งโดยไม่มีเหตุจำเป็น
- หน้าหลักและหน้ารองทั้งหมดผ่าน composition redesign แล้ว เหลืองาน audit/defect fixing
- Project state ใช้ optional `projectProgress` ภายใต้ schema v1; ต้องรักษา validator/tests นี้เมื่อแก้ import ใน Settings
- Code example มี code styling และ horizontal scroll แต่ยังไม่มี token-level syntax highlighting
- Lesson ไม่มี draggable splitter; focus mode มีแล้วและ splitter เป็น optional
- ภาพ raster ใน `public/art/` รวมประมาณ 5.7 MB ยังไม่ได้ทำ responsive variants/optimization audit
- ภาพ QA หลังรีดีไซน์ถูกตรวจผ่าน browser session แต่ยังไม่ได้บันทึกเป็นไฟล์ใน repo เพราะ connector ไม่อนุญาต path ที่ลองใช้; ต้องเก็บใหม่ในช่วง final visual QA
- `docs/screenshots/` คือ baseline ก่อนรีดีไซน์จากผู้ใช้ ไม่ใช่ภาพผลลัพธ์ปัจจุบัน และยัง untracked
- แอปเก็บข้อมูลใน localStorage เท่านั้น ไม่ sync ข้ามอุปกรณ์ ไม่มี auth/backend/private deployment
- Browser production QA ใช้ port 3100 เพราะ port 3000 มี dev server อยู่แล้ว; อย่าฆ่า process ที่ port 3000 โดยไม่ยืนยันเจ้าของ
- ยังต้องทดสอบ Project persistence (หลังสร้าง), Journal edit, Import old data, invalid import, duplicate XP และ Roadmap persistence แบบ end-to-end ให้ครบ

## คำถามที่ยังไม่ตัดสินใจ

- จะเพิ่ม project fields ลง `AppData` เป็น optional record ภายใต้ schema v1 หรือ bump schema พร้อม migration; แนวทางแรกเล็กและเข้ากันได้ง่ายกว่า แต่ต้องกำหนด validation ให้ครบ
- จะใช้ highlighter dependency หรือ tokenizer ขนาดเล็กสำหรับ code examples; ยังไม่ควรเพิ่ม dependency จนวัดประโยชน์/ขนาด bundle
- จะเก็บ final screenshots ใน `docs/screenshots/redesign/` หรือ `docs/qa/redesign/`; ห้ามเขียนทับ baseline เดิม
- Private hosting provider/access policy ยังไม่เลือก และผู้ใช้สั่งว่ายังไม่ deploy

## วิธีรันและตรวจ

ต้องใช้ Node.js 20.9+ (README ระบุว่าเคยทดสอบด้วย Node 22.18)

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm start -- -p 3100
```

เปิด local preview ที่ `http://localhost:3100` เมื่อใช้คำสั่ง production ด้านบน

## ผลตรวจล่าสุด

- `npm test`: 14 tests ผ่าน หลัง code ของ R5 Settings ที่ commit เป็น `8475f65`
- `npm run lint`: ผ่าน หลัง code ของ R5 Settings ที่ commit เป็น `8475f65`
- `npm run build`: ผ่านบน Next.js 16.3.6 หลัง code ของ R5 Settings ที่ commit เป็น `8475f65`
- Production browser QA ที่ `localhost:3100`: ตรวจ Dashboard, Curriculum, Lab, Lesson และ Micro-step บน desktop/mobile; ตรวจ Roadmap + drawer บน desktop; direct hash routes ที่เปิดระหว่างตรวจ ได้แก่ `#curriculum`, `#map`, `#lesson/web-ts-narrowing`, `#step/dev-program-concept`, `#roadmap`
- ยังไม่ถือว่า full regression QA จบ เพราะหน้ารองและ interaction matrix ตามหัวข้อด้านบนยังไม่ครบ
- หลัง R1 ผู้ใช้สั่งชัดเจนว่าไม่ให้เรียก Chrome หรือถ่าย screenshot เพิ่ม; งานถัดไปใช้ lint/tests/build และให้ผู้ใช้ตรวจภาพเอง

ไม่ต้องรัน tests ทั้งชุดซ้ำเพราะแก้เอกสารอย่างเดียว แต่ทุก feature code ถัดไปต้องตรวจตามความเสี่ยงของมัน

## ภาพหน้าจอ

- Baseline ก่อนรีดีไซน์: `docs/screenshots/01-dashboard.png` ถึง `12-roadmap-drawer.png` และ `docs/screenshots/screenshots.pdf`; เป็นไฟล์ untracked จากผู้ใช้
- ภาพหลังรีดีไซน์ที่ตรวจใน browser: Dashboard, Curriculum, Lab, Lesson, Micro-step และ Roadmap drawer ถูกดูจริงระหว่าง session แต่ **ไม่มีไฟล์ใน repository**
- งานค้าง: เก็บทั้ง viewport และ full-page ของ Dashboard, Curriculum, Lab, Lesson และ Mobile โดยไม่เขียนทับ baseline

## วิธีกลับมาทำต่อโดยไม่รื้อของเดิม

1. อ่านไฟล์นี้, `docs/REDESIGN-PLAN.md` และเฉพาะส่วนที่เกี่ยวข้องใน `docs/DESIGN-RESEARCH.md`
2. รัน `git status --short`, `git diff`, `git log --oneline -15`; อย่า stage `docs/APP-OVERVIEW.md` หรือ `docs/screenshots/` โดยไม่ตั้งใจ
3. ยืนยันว่า `HEAD` ไม่ถอยหลังจาก commit ที่บันทึกไว้ และตรวจ code จริงหากเอกสารคลาดเคลื่อน
4. ทำหนึ่งช่วงตาม PLAN, ตรวจตามเกณฑ์, commit หนึ่ง feature ต่อหนึ่ง commit และ push
5. ห้ามเปลี่ยน ID/hash/storage/runner/XP เพื่อแก้ layout; ถ้าจำเป็นต้องเปลี่ยน schema ให้เพิ่ม compatibility test ก่อน
6. อัปเดต HANDOFF และ PLAN เมื่อจบช่วงหรือก่อนจบรอบ โดยบันทึกเฉพาะหลักฐานสำคัญ
