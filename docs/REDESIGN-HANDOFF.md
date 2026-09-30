# Redesign handoff

อัปเดตล่าสุด: 2026-10-01
Branch: `main`  
Remote: `origin` → `https://github.com/CutieCat8/CodeTrail.git`  
ฐาน implementation ที่ push แล้ว: `7e4d7c8`
สถานะรอบ: **หน้า Home แบบ daily-return พร้อม activity heatmap เขียนและ push แล้ว; รอผู้ใช้ตรวจภาพใน browser**

เอกสารหลักมีหน้าที่แยกกัน:

- ไฟล์นี้: สถานะจริงและจุดเริ่มทำงานรอบถัดไป
- `docs/REDESIGN-PLAN.md`: ช่วงงานและ acceptance gate ที่ยังเปิด
- `docs/ACCEPTANCE-CHECKLIST.md`: ขั้นตอน browser/manual QA สำหรับผู้ใช้
- `docs/DESIGN-RESEARCH.md`: หลักฐานงานวิจัยและ design decisions
- `docs/APP-OVERVIEW.md`: เอกสารบริบทจากผู้ใช้ (ยัง untracked; อย่า stage โดยไม่ตั้งใจ)

## เป้าหมายและ Art direction

รีดีไซน์แอปเดิมให้เป็น “โลกผจญภัยสำหรับคนเรียนเขียนโปรแกรม” ที่กลับมาฝึกได้วันละประมาณหนึ่งชั่วโมง โดยรักษาระบบเรียนและข้อมูลเดิม Art direction ล่าสุดคือ **Pixel Nebula**: ใช้สีดำเกือบสนิทเป็นฐาน ใช้ gradient น้ำเงิน→ม่วงกับ CTA, active state, แผนที่และฉากสำคัญ พร้อมข้อความ neutral contrast สูง โดยรักษา pixel art และมาสคอตเดิมทั้งหมด

## Theme iteration ล่าสุด

- Feedback รอบล่าสุด: ธีม warm charcoal/olive หลุดจาก pixel art ผู้ใช้ต้องการดำเป็นหลักและใช้น้ำเงินกับม่วงแบบไล่เฉดร่วมกัน
- การแก้: แทน `modern-adventure.css` ด้วย `src/app/pixel-nebula.css` เป็น visual override หลัง `globals.css` ผ่าน import ใน `src/app/layout.tsx`
- ขอบเขต: ใช้ near-black แยกระดับพื้นผิว และจำกัด blue→violet gradient ไว้ที่ CTA, active state, เส้นทางและฉากสำคัญ เพื่อไม่ให้ทุกกล่องเป็นสีเดียวกัน
- Pixel art: ไม่ลบหรือแทน asset ใด; ยังคง `PixelCat`, `ExpeditionArt` และภาพใน `public/art/` พร้อม `image-rendering: pixelated`
- หลักฐาน: commit `d2d59d7` (`feat(theme): align interface with pixel nebula art`), push แล้ว
- Automated checks: lint ผ่าน; production build ผ่าน; contrast คู่สีหลักที่คำนวณได้อยู่ระหว่าง 6.57:1–18.87:1
- Manual verification: ยังรอผู้ใช้เปิดดูจริง; ไม่ได้เรียก Chrome หรือถ่าย screenshot

## Home dashboard iteration ล่าสุด

- เป้าหมาย: เปลี่ยน `#dashboard` ให้เป็นหน้า Home สำหรับกลับมาเรียนทุกวัน ไม่ใช่หน้าอธิบายผลิตภัณฑ์ โดยอิง composition จากภาพ Codédex ที่ผู้ใช้แนบ
- สิ่งที่เขียน: greeting ของ Miso, continue-learning hero, โปรไฟล์ Sea, XP/level/บทที่ผ่าน/streak จากข้อมูลจริง, ตัวเลือกโหมด, project summary, weekly goal และ activity heatmap 20 สัปดาห์
- Heatmap ใช้เฉพาะ timestamp จริงจาก lesson progress, micro-step, Journal และ Project progress; บัญชีใหม่จึงเริ่มว่างและไม่มี activity จำลอง
- โครงสร้าง heatmap ดัดแปลงจาก Amicro `MonoActivityHeatmap.tsx` ภายใต้ MIT License โดยไม่คัดลอกข้อมูลสุ่มหรือเพิ่ม `motion/react`; attribution อยู่ใน `docs/THIRD-PARTY-NOTICES.md`
- หลักฐาน: `src/components/QuestHome.tsx`, `src/components/ActivityHeatmap.tsx`, `src/lib/activity.ts`, `src/app/home-dashboard.css`, commit `7e4d7c8` และ push แล้ว
- Automated checks หลังเขียนชุดนี้: lint ผ่าน, Vitest 18/18 และ production build ผ่านบน Next.js 16.3.6
- Manual verification: ยังไม่ได้ตรวจภาพจริงตามคำสั่งไม่ให้เรียก Chrome/ถ่าย screenshot

## สัญญาที่ต้องรักษา

- localStorage key `seas-fullstack-quest:v1` และ `AppData.version === 1`; field ใหม่ต้อง optional หรือมี migration
- Lesson IDs, Topic/Step IDs และ hash routes เดิม เช่น `#dashboard`, `#curriculum`, `#roadmap`, `#map`, `#lesson/<id>`, `#step/<id>`
- progress, source, notes, reflection, checklist, attempts, last result, journal, project links, last lesson/step และ Roadmap marks เดิม
- โหมด `fullstack | java | mixed` และ weekly goal
- Roadmap marks `learning | done | skip` และการแยก manual/inferred state
- auto-check ใน Web Worker ผ่าน `src/lib/runner.ts`, timeout 1.5 วินาที; ห้ามแทนด้วย keyword matching หรือ `eval` ใน UI process
- Java เป็น `local-java`; เว็บบันทึกหลักฐานแต่ไม่อ้างว่า compile/tests ผ่าน
- XP อิง `completedAt` ครั้งแรกและต้องไม่เพิ่มจากการรันซ้ำ
- Export/Import JSON ต้องอ่าน schema v1 เก่าได้และปฏิเสธข้อมูลผิดโดยไม่ทำแอปล้ม
- ไม่เพิ่ม backend/database/auth และไม่เปลี่ยน routing architecture เพื่อรีดีไซน์
- ไม่มี private deployment ขณะนี้; localStorage ไม่ใช่ access control และไม่ sync ข้ามอุปกรณ์

## เทียบพรอมพ์รีดีไซน์ 20 หัวข้อ

Tests/build เป็นหลักฐานทางเทคนิคเท่านั้น ไม่ใช่หลักฐานว่า UI ผ่าน Visual QA

| # | หัวข้อ | สถานะ | หลักฐาน / สิ่งที่ยังต้องตรวจ |
|---|---|---|---|
| 1 | เป้าหมายผลิตภัณฑ์ | ทำบางส่วน / ต้องตรวจในเบราว์เซอร์ | flow หลักอยู่ใน `QuestApp.tsx`; ต้องให้ผู้ใช้ยืนยัน hierarchy, ความอยากกลับมาใช้ และความอ่านสบาย |
| 2 | ข้อจำกัดโปรเจกต์ | ทำเสร็จแล้วด้าน implementation / ต้องตรวจ persistence | schema v1 ใน `src/lib/storage.ts`, hash routing ใน `QuestApp.tsx`, commits `43943bc`, `a8d12b0` |
| 3 | ปัญหาจากภาพเดิม | ทำบางส่วน / ต้องตรวจในเบราว์เซอร์ | composition ถูกเปลี่ยนใน commits `3940f3b`–`8475f65`; step index แก้จากข้อมูลจริงที่ `31868ee`; ต้องยืนยันภาพจริงและ XP overlay |
| 4 | Pixel Nebula | เขียนโค้ดแล้ว / ต้องตรวจในเบราว์เซอร์ | `src/app/pixel-nebula.css`, `src/app/layout.tsx`, pixel art เดิมใน `public/art/`, commits `80dc95b`, `d2d59d7` |
| 5 | Design tokens/typography/layout | ทำเสร็จแล้วด้านโค้ด / ต้องตรวจภาพจริง | semantic override ใน `pixel-nebula.css`; คู่สีหลักคำนวณผ่าน 6.57:1 ขึ้นไป แต่ยังต้องตรวจทุก state ใน browser |
| 6 | ภาพประกอบและมาสคอต | ทำบางส่วน / ต้องตรวจในเบราว์เซอร์ | `expedition-base.png`, `world-landmarks.png`, `miso-sprite-sheet.png`, `PixelCat.tsx`; ยังไม่ได้ optimize responsive variants และไม่มี badge raster แยกทุกชนิด |
| 7 | App shell/navigation | เขียนโค้ดแล้ว / ต้องตรวจ keyboard/mobile | shell/breadcrumb/drawer/focus code ใน `QuestApp.tsx`, commit `3940f3b` |
| 8 | Dashboard/Home | เขียนโค้ดแล้ว / ต้องตรวจในเบราว์เซอร์ | daily-return hero, profile, real activity heatmap, mode/project/goal ใน `QuestHome.tsx`, commit `7e4d7c8` |
| 9 | Curriculum | เขียนโค้ดแล้ว / ต้องตรวจในเบราว์เซอร์ | featured course/cards/chapters/named steps, commit `75da2bf` |
| 10 | Roadmap | ทำบางส่วน / ต้องตรวจในเบราว์เซอร์ | topology/drawer/status/current-location ใน `FullStackRoadmap.tsx` และ `roadmap.css`, commits `18bdd70`, `43943bc`; mobile/readability/state reload รอตรวจ |
| 11 | Lab Map | เขียนโค้ดแล้ว / ต้องตรวจในเบราว์เซอร์ | illustrated worlds/quest panel/planned states, commit `89fba30` |
| 12 | Lesson Workspace | ทำบางส่วน / ต้องตรวจในเบราว์เซอร์ | split workspace, mobile tabs, focus mode, results, save status ใน commit `bd25520`; ไม่มี draggable splitter และ token-level highlighting (ทั้งคู่ไม่บังคับ) |
| 13 | Micro-step | เขียนโค้ดแล้ว / ต้องตรวจในเบราว์เซอร์ | three-phase flow `54f0564`; per-course count `31868ee`; persistence/navigation รอตรวจ |
| 14 | หน้ารอง | เขียนโค้ดแล้ว / ต้องตรวจในเบราว์เซอร์ | Challenges `72ff141`, Skills `290d49f`, Journal `e6fbfdf`, Projects `4fbf3b2`, Settings `8475f65` |
| 15 | Motion/interaction | ทำบางส่วน / ต้องตรวจ reduced motion | motion tokens + global reduced-motion rules ใน `globals.css`; ไม่มีเสียง/custom cursor/scroll hijacking; completion celebration ยังเรียบง่าย |
| 16 | Reference research | ทำบางส่วน | `docs/DESIGN-RESEARCH.md`: GetLayers/Basement เข้าถึงได้; Codédex ได้ข้อมูลไม่พอ; MotionSites timeout; ไม่คัดลอก external assets/code |
| 17 | วิธีทำงาน | ทำบางส่วน | feature commits แยกและเอกสารต่อเนื่องมีแล้ว; final browser pass/screenshot งดตามคำสั่งผู้ใช้ |
| 18 | Visual/Functional QA | ทำบางส่วน / ต้องตรวจในเบราว์เซอร์ | lint + Vitest 15/15 + build ผ่านที่ `a8d12b0`; manual matrix อยู่ใน `ACCEPTANCE-CHECKLIST.md` |
| 19 | เกณฑ์คุณภาพ | ต้องตรวจในเบราว์เซอร์ | implementation ครอบคลุมหน้าเป้าหมาย แต่ยังห้ามสรุปว่าผ่าน visual acceptance ก่อนผู้ใช้ตรวจ |
| 20 | ส่งมอบ | ทำบางส่วน | repo/คำสั่ง preview/checklist พร้อม; ยังไม่มี private URL, final screenshots หรือ browser acceptance |

## สถานะจริงรายพื้นที่

| พื้นที่ | สิ่งที่เขียนไว้จริง | Commit | Manual verification |
|---|---|---|---|
| Dashboard/Home | greeting, illustrated continue-learning hero, profile, real activity heatmap, mode selector, project/goal/zero state | `7e4d7c8` | composition, responsive, heatmap interaction, mode reload, CTA |
| Curriculum | featured course, course cards, chapter disclosure, named step rows, planned state | `75da2bf` | filters, long Thai titles, course count/navigation |
| Roadmap | journey topology, chapter/node/checkpoint styles, current location, drawer, marks | `18bdd70`, `43943bc` | desktop/mobile readability, Escape/focus, status reload |
| Lab Map | illustrated worlds, current world, real quest panel, planned world without empty CTA | `89fba30` | world selection, mobile stack, Java labels |
| Lesson Workspace | side-by-side reading/editor, mobile tabs, focus mode, result panel, copy, Tab indentation, save state | `bd25520` | draft reload, wrong/correct runner, XP, self-check, mobile scroll |
| Micro-step | compact metadata, understand/respond/notes phases, correct course index, prev/next | `54f0564`, `31868ee` | notes/answer reload, completion and navigation semantics |
| Challenges | featured real item, compact rows, search/filter/count/clear/empty | `72ff141` | combined filters and keyboard/mobile |
| Skill Evidence | route selector, skill index/detail, auto vs self/local evidence, planned state | `290d49f` | evidence changes after completion, Java separation |
| Journal | list-first archive, create/edit/search, lesson and URL fields | `e6fbfdf` | add/edit/search/reload |
| Projects | illustrated covers, overview/detail, persisted repo/demo/checklist | `4fbf3b2` | project switching/reload and URL behavior |
| Settings | training/backup/reset sections, export/import feedback, local-only disclosure | `8475f65`, `a8d12b0` | export/import/reset/mode/goal in browser |
| Illustration | original base scene, 8 world landmarks, one mascot sheet with welcome/study/success/rest | `80dc95b` | visual consistency, crop/aspect, asset cost |
| Motion | 150/220/260ms tokens, hover/panel feedback, reduced-motion override | `80dc95b`, `d2d59d7` | OS reduced-motion and no distracting loop |

## สถานะ implementation / verification / Git

| ชุดงาน | เขียนโค้ดแล้ว | ตรวจ browser เดิม | Automated checks หลังชุด | Commit แล้ว | Push แล้ว |
|---|---|---|---|---|---|
| Tokens + art | ใช่ | เคยดูบางหน้า | build ภายหลังผ่าน | `80dc95b` | ใช่ |
| Home dashboard iteration | ใช่ | ยังไม่ได้ดูหลังเปลี่ยน Home | lint, tests 18/18, build ผ่าน | `7e4d7c8` | ใช่ |
| Curriculum | ใช่ | เคยดู desktop/mobile | lint/build ภายหลังผ่าน | `75da2bf` | ใช่ |
| Lab | ใช่ | เคยดู desktop/mobile | lint/build ภายหลังผ่าน | `89fba30` | ใช่ |
| Lesson | ใช่ | เคยดู desktop/mobile | tests ภายหลังผ่าน | `bd25520` | ใช่ |
| Micro-step | ใช่ | เคยดู desktop/mobile | tests ภายหลังผ่าน | `54f0564`, `31868ee` | ใช่ |
| Roadmap | ใช่ | เคยดู desktop/drawer | lint/build ภายหลังผ่าน | `18bdd70`, `43943bc` | ใช่ |
| Challenges | ใช่ | เคยดู desktop/mobile/search/empty | lint/tests/build ผ่าน | `72ff141` | ใช่ |
| Skills/Journal/Projects/Settings | ใช่ | ยังไม่มี final manual pass | lint/tests/build ผ่าน | `290d49f`–`8475f65` | ใช่ |
| Nested import safety | ใช่ | ไม่จำเป็นต่อ visual; flow ยังรอ manual | lint, tests 15/15, build ผ่าน | `a8d12b0` | ใช่ |
| Acceptance documents | ใช่ | ไม่เกี่ยวข้อง | ไม่รันซ้ำเพราะแก้ docs เท่านั้น | เอกสารชุดนี้คือ commit ของรอบ R4 | ตรวจสถานะจาก `origin/main` |

การดู browser ในอดีตเป็นเพียง intermediate inspection และไม่ใช่ final acceptance หลังทุก commit ผู้ใช้สั่งไม่ให้เรียก Chrome/ถ่าย screenshot เพิ่ม จึงต้องใช้ checklist ให้ผู้ใช้ตรวจเอง

## การเปลี่ยนแปลงที่ยังไม่ commit

หลัง commit Home `7e4d7c8` ยังมีงานค้างจากชุดขยายเนื้อหาที่ไม่ได้รวมใน commit Home:

```text
 M src/app/globals.css
 M src/components/QuestApp.tsx
 M src/content/curriculum/generate.ts
 M src/content/curriculum/index.ts
 M src/types/curriculum.ts
 M tests/content.test.ts
?? AGENTS.md
?? CLAUDE.md
?? docs/APP-OVERVIEW.md
?? docs/screenshots/
?? src/components/StepSections.tsx
?? src/content/curriculum/lessons/
```

รายการเหล่านี้ถูกเก็บไว้ทั้งหมด ไม่ discard/reset/overwrite และไม่ถูก stage ใน commit Home เอกสารรอบนี้จะ stage เฉพาะไฟล์ `docs/` ที่ระบุชัดเจน

## ผลตรวจล่าสุด

หลังเขียน Home/heatmap ที่ `7e4d7c8` โดยตรวจบน working tree ปัจจุบัน:

- `npm run lint`: ผ่าน
- `npm test`: ผ่าน 18/18 (รวม activity tests ใหม่ 2 ข้อและ content tests ใน working tree)
- `npm run build`: ผ่านบน Next.js 16.3.6
- ไม่ได้เรียก browser หรือถ่าย screenshot ในรอบ Home นี้
- ไม่รัน checks ซ้ำหลังแก้เอกสารเท่านั้น

Activity test ใหม่ยืนยัน zero state และการรวมวันที่ตาม Asia/Bangkok ใน `tests/activity.test.ts` ส่วน manual composition/interaction ยังรอผู้ใช้ตรวจ

## ภาพหน้าจอ

- `docs/screenshots/` เป็น baseline จากผู้ใช้และยัง untracked ไม่ใช่ผลหลังรีดีไซน์
- ไม่มี final redesigned screenshots ใน repository
- ผู้ใช้จะตรวจและส่งภาพ/ผล acceptance เอง; ห้ามอ้างว่า Visual QA ผ่านก่อนรับหลักฐานนั้น

## ข้อจำกัดและเรื่องที่ยังเปิด

- `QuestApp.tsx` ยังใหญ่; ไม่ refactor ในรอบตรวจรับโดยไม่มี defect จริง
- raster assets ใน `public/art/` รวมประมาณ 5.7 MB ยังไม่ได้ทำ responsive variants/optimization audit
- code samples ยังไม่มี token-level syntax highlighting และ Lesson ไม่มี draggable splitter; ทั้งคู่เป็น optional
- runner ลด network APIs และ terminate เมื่อ timeout แต่ Web Worker ไม่ใช่ security container ระดับ server sandbox
- ข้อมูลอยู่ localStorage เท่านั้น ไม่ sync ข้ามอุปกรณ์
- ไม่มี private hosting/access control; ผู้ใช้ยังไม่ต้องการ deploy
- acceptance ที่ยังเปิดทั้งหมดอยู่ใน `docs/ACCEPTANCE-CHECKLIST.md`

## วิธีรัน

ต้องใช้ Node.js 20.9+ (README ระบุว่าเคยทดสอบด้วย Node 22.18)

```powershell
npm install
npm run lint
npm test
npm run build
npm start -- -p 3100
```

Production preview: `http://localhost:3100/#dashboard`

ลำดับตรวจแนะนำ: Dashboard → Curriculum → Lab → Lesson Workspace → Micro-step → Roadmap → หน้ารอง → Mobile/Keyboard

## งานถัดไปที่ควรเริ่ม

**รอผลและภาพหน้า Home จากผู้ใช้** ตาม `ACCEPTANCE-CHECKLIST.md` แล้ว:

1. บันทึกเฉพาะข้อที่ไม่ผ่าน พร้อม hash/viewport/ขั้นตอนทำซ้ำ
2. จัดลำดับ functional/data-loss/accessibility ก่อน visual polish
3. แก้หนึ่ง defect ต่อหนึ่ง commit และตรวจเฉพาะขอบเขตที่ได้รับผลกระทบ
4. อัปเดต HANDOFF/PLAN เมื่อจบชุดแก้สำคัญ

## วิธีกลับมาทำต่อโดยไม่รื้อของเดิม

1. อ่านไฟล์นี้, PLAN, checklist และผลตรวจจากผู้ใช้
2. รัน `git status --short`, `git diff`, `git log --oneline -15`
3. อย่า stage/overwrite `docs/APP-OVERVIEW.md` หรือ `docs/screenshots/`
4. ยืนยัน defect จาก code และขั้นตอนทำซ้ำก่อนแก้; ห้ามเปลี่ยน ID/hash/storage/runner/XP เพื่อแก้ layout
5. รักษา workflow หนึ่ง feature/defect ต่อหนึ่ง commit และ push
