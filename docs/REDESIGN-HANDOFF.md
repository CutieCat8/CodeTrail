# Redesign handoff

อัปเดตล่าสุด: 2026-10-05  
Branch: `feat/curriculum-expansion` (แตกจาก `fix/import-validation` ที่ `57e1cd2` ← `fix/runner-comparator` `480ad3f` ← `main` `f9a7613`; ทุก commit อยู่ในสำเนา Linux `~/work/sea-fullstack-quest` เท่านั้น ยังไม่ push/merge)  
Remote: `origin` → `https://github.com/CutieCat8/CodeTrail.git`  
ฐาน implementation ที่ push แล้ว: `f9a7613` บน `main`
สถานะรอบล่าสุด: **ยกระดับเนื้อหาหลักสูตรทั้งระบบ** — สถานะ/แผน/หลักฐานอยู่ใน `docs/COURSE-PROGRESS.md`, `docs/COURSE-PLAN.md`, `docs/COURSE-RESEARCH.md` (ไฟล์นี้ไม่ทำสถานะรายบทซ้ำ) งานระบบที่ค้างย้ายไป “Backlog ระบบ” ด้านล่าง  
สถานะรอบ Import: แก้ Import validation และความปลอดภัยของข้อมูลตอนโหลด/บันทึกแล้ว (`57e1cd2`); automated checks และ Codex review ผ่าน; ยังไม่ได้ตรวจในเบราว์เซอร์ (รอตรวจ) (ดู “Defect fix: Import validation”)  
สถานะรอบก่อน: แก้ตัวเปรียบเทียบผลของ auto runner (`d51e7ca`, `480ad3f`); ผลตรวจ Chrome ที่ผู้ใช้ส่งต่อมายืนยัน auto lessons 3 บท (ไม่ใช่ final acceptance); defect XP หายเมื่อส่งคำตอบผิดหลังผ่าน ยังรอตรวจยืนยัน  
ก่อนหน้านั้น: Roadmap แบบ skill expedition map เขียนและ push แล้ว; รอผู้ใช้ตรวจภาพจริงใน browser

เอกสารหลักมีหน้าที่แยกกัน:

- ไฟล์นี้: สถานะจริงและจุดเริ่มทำงานรอบถัดไป (ระบบ/UI) และ backlog ระบบ
- `docs/COURSE-PROGRESS.md`: สถานะรายบทของหลักสูตร งานถัดไป และบันทึกชุดงาน
- `docs/COURSE-PLAN.md`: syllabus, มาตรฐานบทเรียน, บทบาท Claude/Codex และคำสั่งที่ใช้ได้จริง
- `docs/COURSE-RESEARCH.md`: ผลค้นคว้าแหล่งอ้างอิงพร้อมข้อจำกัด
- `docs/REDESIGN-PLAN.md`: ช่วงงานและ acceptance gate ที่ยังเปิด

## Backlog ระบบ (พักไว้ระหว่างงานหลักสูตร)

ไม่ทำต่อในรอบขยายเนื้อหา เว้นแต่ขัดขวางการเรียนหรือทำให้ข้อมูลหายใน flow ที่กำลังแก้

| งาน | สถานะ | หลักฐาน |
|---|---|---|
| ตรวจ Import validation ในเบราว์เซอร์ (profile/origin แยก) | รอตรวจ | หัวข้อ “Defect fix: Import validation”, commit `57e1cd2` |
| XP หายเมื่อส่งคำตอบผิดหลังผ่านบท | รอตรวจยืนยัน + ให้ผู้ใช้ตัดสินพฤติกรรม | หัวข้อ “Defect แยก (รอตรวจยืนยัน, ยังไม่แก้)”, `run()` ใน `QuestApp.tsx` |
| XP นับซ้ำเมื่อ `lessonId` ซ้ำ / อ่าน key จาก prototype | ยังไม่แก้ | ผล Codex รอบตรวจ storage (2026-10-05) |
| นิยาม streak (ไม่นับ step/project, เก็บเฉพาะ `updatedAt` ล่าสุด) | รอผู้ใช้ตัดสินก่อนเปลี่ยน schema | ผล Codex รอบตรวจ storage |
| race ข้ามแท็บของ autosave, UI กู้คืน `:rejected:*` | ข้อจำกัดที่บันทึกไว้ | หัวข้อ Import validation |
| runner: timeout รวมทุก case, output async หาย, API บางตัวยังไม่ปิด, แยก realm กันปลอมผล | ยังไม่ทำ | หัวข้อ runner comparator |
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

### Defect fix: ภารกิจโหมดผสม

- สาเหตุเดิม: `stepRecommendation()` ต่อ steps ทั้งคอร์สด้วย `flatMap` ทำให้ Mixed เรียน Developer Foundations ครบ 40 steps ก่อนเห็น Java จึงมีพฤติกรรมเหมือน Full-stack ช่วงแรก
- พฤติกรรมใหม่: สลับ Developer Foundations ↔ Java Foundations ตามจำนวนขั้นที่ผ่าน จากนั้น JavaScript Foundations ↔ Java OOP และค่อย Node Foundations โดยไม่ข้าม route ที่ยังไม่จบ
- Home แสดงภารกิจผสม, step ปัจจุบัน และ route ถัดไปอย่างชัดเจน; CTA เปิดทีละ step ตามจริง และเมื่อกลับ Home หลังผ่านขั้นแรก recommendation จะสลับฝั่ง
- Full-stack/Java resume เฉพาะ last step/lesson ที่อยู่ใน route ของโหมดที่เลือก ป้องกันการแสดงภารกิจจากโหมดก่อนหน้า
- หลักฐาน: `src/lib/recommendation.ts`, `src/components/QuestHome.tsx`, `tests/recommendation.test.ts`, commit `a5b0408` (pushed)
- ตรวจแล้ว: regression tests 10/10, lint และ production build ผ่าน; code review ไม่พบ blocking/high issue
- Manual verification: รอผู้ใช้ตรวจการสลับโหมดและการกลับ Home หลังผ่าน step

### Defect fix: ตัวเปรียบเทียบผลของ auto runner (2026-10-05)

- พื้นที่ทำงาน: สำเนา Linux `/home/cnux/work/sea-fullstack-quest` ฐาน `f9a7613`, branch `fix/runner-comparator`; commit แล้วในสำเนาเท่านั้น ยังไม่ push/merge และยังไม่ sync กลับ repo บน `/mnt/c/Users/Asus/Documents/sea-fullstack-quest` (handoff ใน repo นั้นจึงยังไม่มีหัวข้อนี้)
- สาเหตุเดิม: `stable()` ใน `src/lib/runner.ts` ใช้ `JSON.stringify(value, keysArray)` ซึ่งกรอง key ทุกชั้นด้วย key ชั้นบนสุด array ของ object จึงกลายเป็น `[{}]` คำตอบผิดของ `filterActivities` (`src/content/lessons.ts:36-37`) และ object ซ้อนที่ค่าผิดจึง “ผ่าน”; `NaN`/`null`, `[undefined]`/`[null]` ก็ถือว่าเท่ากัน
- พฤติกรรมใหม่: `compareTestValue()` ใน `src/lib/compare.ts` รองรับเฉพาะ `null`, boolean, string, finite number, array และ plain object ที่ประกอบจากค่าเหล่านี้ ลำดับ key ของ object ไม่มีผล ลำดับ array มีผล ค่าอื่นทั้งหมด (undefined, NaN, Infinity, bigint, symbol, function, Date, Map, Set, class instance, sparse array, property เสริมบน array, symbol key, property ที่ไม่ enumerable, getter/setter, circular, ซ้อนเกิน 200 ชั้น) ได้ผล “ไม่ผ่าน” พร้อม error ภาษาไทยที่ระบุตำแหน่งค่า
- Snapshot: อ่านค่าครั้งเดียวผ่าน own property descriptors แล้วใช้ snapshot เดียวทั้งเทียบและแสดง `actual`; ไม่เรียก getter ของคำตอบผู้เรียน รวมถึง `then` (Worker ตรวจ async ด้วย `instanceof Promise`) และ `constructor` บน prototype
- Worker ใช้ logic เดียวกับ tests: `buildTestWorkerSource()` ฝัง `compareTestValue.toString()` และ `tests/runner-compare.test.ts` รัน source string นั้นจริงด้วย `self` จำลอง
- Tests: `tests/runner-compare.test.ts` 42 กรณี ครอบคลุม array ของ object, object ซ้อน, key คนละลำดับ, array คนละลำดับ, ค่าที่ไม่รองรับ, reference solution ผ่านทุก auto lesson และคำตอบผิดไม่ผ่านทุก auto lesson; mutation check ยืนยันว่า comparator เก่าและ snapshot ระหว่างทางทำให้ regression tests ล้มจริง
- Checks ล่าสุด (snapshot `compare.ts` `83de524e…`, `runner.ts` `654c1ae6…`, test `f473515c…`): Vitest 70/70, `npm run lint`, `tsc --noEmit` และ `npm run build` ผ่าน; ตรวจ comparator ที่ minify ใน production chunk (`eM`) แยก module scope ผ่าน 12 กรณี
- ผลตรวจ Codex (`codex exec -s read-only --ephemeral`, model `gpt-6.1-sol`, ไม่ใช้ OMC team/bypass; ทุกรอบตรวจ snapshot ที่บันทึก hash ก่อนและ hash ตรงหลังตรวจ):
  - รอบ 1 (04:51–04:53): พบ 4 จุดที่ CONFIRMED — symbol key บน array, property ที่ไม่ enumerable, sparse array ที่เติมจาก `Array.prototype`, getter ถูกอ่านซ้ำจนค่าที่ตรวจกับค่าที่รายงานไม่ตรงกัน → แก้ทั้งหมดด้วย snapshot จาก own property descriptors
  - รอบ 2 (05:03–05:06): พบ 5 จุด → แก้ 3 (Worker อ่าน `actual.then` ซึ่งเรียก getter, การตั้งชื่อ error อ่าน `constructor` getter, object ลึกมากเกิด stack overflow) และบันทึก 2 เป็นข้อจำกัด (Proxy ที่โกหก descriptor, โค้ดผู้เรียนแทนที่ built-in)
  - รอบ 3 (05:08–05:11, snapshot สุดท้าย): ไม่พบปัญหาใหม่; Node harness จำลองชุดทดสอบผ่าน 42/42, reference ผ่านและ `return "WRONG"` ไม่ผ่านทั้ง 3 auto lessons / 9 cases
- ผลตรวจ Claude: ยืนยัน false positive เดิมด้วย node; mutation check ใส่ comparator เวอร์ชันก่อนหน้ากลับชั่วคราวแล้ว regression tests ล้ม (เวอร์ชันเดิม 5, หลังรอบ 1 → 6, หลังรอบ 2 → 3) แล้วคืนไฟล์และตรวจ `cmp`
- ข้อจำกัดที่ตั้งใจไม่แก้: Proxy ที่ trap โกหก descriptor และโค้ดผู้เรียนที่แทนที่ built-in เช่น `Object.getOwnPropertyDescriptors` ยังทำให้ผลผ่านได้ เพราะโค้ดผู้เรียนรันใน Worker/realm เดียวกับตัวตรวจ (เป็นการโกงผลตัวเอง; runner ไม่ใช่ security boundary)
- Automated verification: tests และ Codex ใช้ Node harness เท่านั้น; Claude ในสำเนา Linux ไม่ได้เรียก Chrome หรือถ่าย screenshot ตามข้อกำหนดเดิม

#### ผลตรวจเบราว์เซอร์ (2026-10-05, ส่งต่อจากผู้ใช้)

แหล่งที่มา: ผลตรวจผ่าน Chrome โดย Claude อีก session ที่ผู้ใช้ส่งต่อมา **ไม่ใช่การตรวจที่ทำใน session ที่แก้โค้ดนี้** และ **ไม่ใช่ final acceptance ของเว็บไซต์ทั้งหมด** ตรวจบน production preview `http://localhost:3100` จาก build ของ commit `d51e7ca` ด้วยคำตอบผิดและคำตอบถูกที่เตรียมไว้ล่วงหน้า (คำตอบผิดของ filter/form เคยผ่านครบ 3/3 กับ comparator เดิม)

| Lesson | คำตอบผิด | คำตอบถูก |
|---|---|---|
| `web-react-filter` | ผ่าน 1/3 (เฉพาะ “รายการว่าง” ซึ่งถูกต้องจริง) | ผ่าน 3/3 |
| `web-react-form` | ผ่าน 0/3 พร้อม error ค่า `undefined` ที่ runner ไม่รองรับ | ผ่าน 3/3 |
| `web-ts-narrowing` | ผ่าน 2/3 (“กิจกรรมที่มีห้อง” ไม่ผ่าน) | ผ่าน 3/3 |

- expected/actual ที่แสดงตรงตามค่าที่เตรียมไว้
- หลังผ่านครบสามบท Dashboard แสดง 300 XP; รันคำตอบถูกของ `web-ts-narrowing` ซ้ำแล้ว XP ยังเป็น 300
- ยังไม่ได้ตรวจ: XP เริ่มต้นเป็น 0 ก่อนทดสอบ; การพิมพ์ด้วยมือและ auto-save/reload; การส่งคำตอบผิดหลังผ่านบทแล้ว
- ข้อมูลทดสอบอยู่ใน Chrome profile หลักที่ origin `localhost:3100`: **ห้ามล้าง site data หรือ localStorage ทั้ง origin** เพราะยังไม่ยืนยันว่ามีข้อมูลเดิมใน origin นี้หรือไม่

#### Defect แยก (รอตรวจยืนยัน, ยังไม่แก้): XP หายเมื่อส่งคำตอบผิดหลังผ่านบท

- อาการที่คาด: ผ่านบทแล้ว (`completedAt` ถูกตั้ง, XP +100) จากนั้นกด Run tests ด้วยคำตอบผิด `run()` ใน `src/components/QuestApp.tsx` (บรรทัด 386 ที่ `d51e7ca`, 390 ที่ branch import) ตั้ง `completedAt: passed ? (progress.completedAt ?? now) : undefined` ทำให้ `completedAt` ถูกล้าง และ `xpTotal()` ใน `src/lib/storage.ts` นับ XP ของบทนั้นเป็น 0 สถานะกลับเป็น `in-progress`
- หลักฐาน: อ่านจากโค้ดเท่านั้น ยังไม่ได้ทำซ้ำใน browser; พฤติกรรมนี้มีก่อนการแก้ runner ไม่ได้เกิดจาก `d51e7ca`
- รอบถัดไป: ยืนยันใน browser ด้วยข้อมูลทดสอบแยก แล้วให้ผู้ใช้ตัดสินว่าการผ่านบทควรคงอยู่หรือไม่เมื่อรันไม่ผ่านภายหลัง ก่อนแก้พร้อม regression test

### Defect fix: Import validation (2026-10-05)

- พื้นที่ทำงาน: สำเนา Linux `/home/cnux/work/sea-fullstack-quest`, branch `fix/import-validation` แตกจาก `480ad3f`; ยังไม่ push/merge และไม่ได้แตะ repo บน `/mnt/c`
- ต้นเหตุที่ยืนยันก่อนแก้ (node บน `480ad3f`): `isAppData()` ตรวจวันที่แค่ `typeof === "string"` ไฟล์ที่มี `updatedAt: "bad"` จึงผ่าน แล้ว `calculateStreak()` โยน `RangeError: Invalid time value` จาก `Intl.DateTimeFormat.format(new Date("bad"))` ทำให้ `QuestHome` render ไม่ได้; enum ใช้ `String(...)` ทำให้ `status: ["passed"]` และ `roadmapMarks: { x: ["done"] }` ผ่าน; journal `date`/`updatedAt` ที่ไม่ใช่วันที่ก็ผ่าน; Settings แจ้ง “นำเข้าสำเร็จ” ก่อน autosave และไม่สนใจผลการบันทึก
- วันที่: timestamp ทุกช่อง (`progress.updatedAt`, `completedAt`, `lastResult.at`, `stepProgress.updatedAt`, `projectProgress.updatedAt`, `journal.updatedAt`) ต้องตรงกับ `Date#toISOString()` แบบ round-trip (`YYYY-MM-DDTHH:mm:ss.sssZ`) และ `journal.date` ต้องเป็น `YYYY-MM-DD` ที่มีจริง ตรงกับที่แอปเขียน (`toISOString()` และ `now.slice(0,10)`); ปฏิเสธ `"bad"`, 30 ก.พ., ชั่วโมง 24, ไม่มี milliseconds, timezone offset
- Enum: `mode`, `status`, `roadmapMarks` ตรวจด้วย `typeof === "string"` และรายการค่าที่อนุญาตโดยตรง
- `calculateStreak(data, now?)`: นิยามเดิมไม่เปลี่ยน (นับจาก `progress` + `journal` ตามวัน Bangkok); timestamp ที่ไม่ผ่าน `isIsoTimestamp` ถูกข้าม ไม่ throw และไม่สร้างวันจาก rollover
- Import: `importAppData(text, save)` parse → validate → `save` ก่อน; Settings เรียก `setData` และแจ้งสำเร็จเฉพาะเมื่อบันทึกสำเร็จ ข้อความล้มเหลวระบุว่า “ข้อมูลเดิมไม่ถูกเปลี่ยน”; Export ใช้ `serializeAppData()` ตัวเดียวกับที่ test round-trip
- ความปลอดภัยข้อมูลตอนโหลด (จำเป็นเพราะ schema เข้มขึ้น): `loadData()` คัดลอกข้อมูลที่ไม่ผ่าน schema/JSON ไป `seas-fullstack-quest:v1:rejected:<ISO time>` (เติม `:2`, `:3` ถ้าชน) ก่อนใช้ข้อมูลว่าง และคืน `backedUpRaw`; `useQuestData` เรียก `canOverwriteStoredData(backedUpRaw)` ก่อนทุก autosave ซึ่งยอมเขียนทับเฉพาะ storage ว่าง, ข้อมูลที่ถูกต้อง หรือค่าที่ backup แล้ว ถ้า backup ล้มเหลวหรือแท็บอื่นเขียนข้อมูลเสียระหว่างใช้งาน autosave จะไม่เขียนทับและแสดงสถานะ error จน import สำเร็จหรือข้อมูลกลับมาถูกต้อง
- ไฟล์: `src/lib/storage.ts`, `src/components/QuestApp.tsx` (`useQuestData` export เพื่อ test, Settings import/export), `tests/storage-import.test.ts` (50), `tests/quest-data-hook.test.tsx` (4, jsdom + fake timers)
- Checks ล่าสุด (snapshot `storage.ts` `8f0db8e0…`, `QuestApp.tsx` `a7af45fe…`, `storage-import.test.ts` `af56d3b7…`, `quest-data-hook.test.tsx` `ebfb6744…`): Vitest 124/124, lint (0 warning), `tsc --noEmit`, `npm run build` ผ่าน; mutation check 12 แบบ (วันที่, enum, streak guard, save error, backup, key ชน, gating ใน hook) ทำให้ tests ล้มทุกแบบแล้วคืนไฟล์
- ผลตรวจ Codex (`codex exec -s read-only --ephemeral`, `gpt-6.1-sol`, ไม่ใช้ OMC team/bypass; hash ตรงทุกรอบ):
  - รอบ 1 (06:42–06:44): HIGH backup ล้มเหลวแล้ว autosave ทับข้อมูลเดิม; backup key เดียวถูกทับ; streak ยังนับ rollover; timestamp ไม่มี ms ผ่าน; ปี `+010000` ถูกปฏิเสธ → แก้ 4, ข้อสุดท้ายรับเป็นข้อจำกัด
  - รอบ 2 (06:47–06:49): HIGH หลัง `canSave=false` import สำเร็จแล้ว autosave ไม่กลับมา; backup ชนใน ms เดียว; test ไม่ครอบ → แก้ทั้งหมด
  - รอบ 3 (06:51–06:53): HIGH autosave ทับข้อมูลเสียที่แท็บอื่นเขียนระหว่าง session; ไม่มี hook test → แก้ด้วย guard ก่อนทุก save และ hook test
  - รอบ 4 (06:56–06:59, snapshot สุดท้าย): ไม่พบปัญหา CONFIRMED ใหม่; SUSPECTED เฉพาะ race ข้ามแท็บ (ดูข้อจำกัด)
- ข้อจำกัด: localStorage ไม่มี compare-and-swap จึงยังมีช่องแคบที่แท็บอื่นเขียนระหว่าง “ตรวจ” กับ “บันทึก” หรือสองแท็บสร้าง backup key เดียวกันพร้อมกัน (SUSPECTED, ยังไม่พิสูจน์ใน browser); ข้อมูลปี ≥ 10000 ถูกปฏิเสธ; backup ใน `:rejected:*` ยังไม่มี UI กู้คืน (ต้องใช้ DevTools); export เก่าที่แก้มือให้ timestamp ไม่ตรงรูปแบบจะ import ไม่ได้
- ไม่ได้ทำในรอบนี้: นิยาม streak, XP (นับซ้ำเมื่อ `lessonId` ซ้ำ/อ่าน key จาก prototype, XP หายหลังรันผิด), เนื้อหาบทเรียน
- Browser verification: **ยังไม่ได้ตรวจในเบราว์เซอร์ (รอตรวจ)**; ไม่ได้ใช้ Chrome profile หลักทดสอบ Import และไม่ได้ล้างข้อมูลใด ควรใช้ profile/origin แยกเมื่อตรวจ

## Roadmap iteration ล่าสุด

- เปลี่ยนจาก central timeline ที่มี node กล่องซ้าย/ขวาซ้ำกัน เป็นแผนเดินทางสองระดับ: route overview สำหรับกระโดดข้าม chapter และ detailed chapter network
- แต่ละ chapter แยก lane จริงตาม Core, Front-end, Back-end, Database, Quality และ Java พร้อมสี, เส้นเชื่อม, checkpoint และจำนวนหลักฐาน
- current position, filters, Learning/Done/Skip, manual/inferred state, drawer, Escape/focus return และลิงก์เริ่มบทใช้ behavior เดิม
- Mobile เปลี่ยนเป็น route แนวตั้ง พร้อม overview ที่เลื่อนแนวนอน ไม่บังคับ pinch/drag
- หลักฐาน: `src/components/FullStackRoadmap.tsx`, `src/components/roadmap.css`, commit `46a96e2` (pushed)
- ตรวจแล้ว: lint และ production build ผ่าน; ยังไม่ได้เรียก Chrome/ถ่าย screenshot ตามคำสั่งผู้ใช้

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
| Roadmap | route overview, chapter lane network, evidence counts, checkpoints, current location, drawer และ marks | `46a96e2` | desktop/mobile composition, lane filtering, Escape/focus, status reload |
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
| Runner comparator (2026-10-05) | ใช่ | ผลตรวจ Chrome ส่งต่อจากผู้ใช้: 3 auto lessons ตามคาด (ไม่ใช่ final acceptance) | lint, tsc, tests 70/70, build ผ่าน; production comparator 12/12 | branch `fix/runner-comparator` ในสำเนา Linux | ไม่ |
| Import validation (2026-10-05) | ใช่ | **รอตรวจในเบราว์เซอร์** | lint, tsc, tests 124/124, build ผ่าน | branch `fix/import-validation` ในสำเนา Linux | ไม่ |

การดู browser ในอดีตเป็นเพียง intermediate inspection และไม่ใช่ final acceptance หลังทุก commit ผู้ใช้สั่งไม่ให้เรียก Chrome/ถ่าย screenshot เพิ่ม จึงต้องใช้ checklist ให้ผู้ใช้ตรวจเอง

## การเปลี่ยนแปลงที่ยังไม่ commit

ส่วนนี้เป็นประวัติของ repo ต้นฉบับบน `/mnt/c` หลัง commit Home `7e4d7c8` ไม่ใช่สถานะของสำเนา Linux; ณ 2026-10-05 ไฟล์ที่ modified ใน repo ต้นฉบับเปลี่ยนเฉพาะ line ending และสำเนา Linux ไม่ได้รวมไฟล์เหล่านั้น

รายการเดิมหลัง commit Home มีงานค้างจากชุดขยายเนื้อหาที่ไม่ได้รวมใน commit Home:

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

รอบ Import validation (2026-10-05) บน snapshot สุดท้ายในสำเนา Linux (`storage.ts` `8f0db8e0…`, `QuestApp.tsx` `a7af45fe…`, `tests/storage-import.test.ts` `af56d3b7…`, `tests/quest-data-hook.test.tsx` `ebfb6744…` — ชุดเดียวกับที่ Codex รอบ 4 ตรวจ):

- `npx vitest run`: ผ่าน 124/124 (6 ไฟล์)
- `npm run lint`: ผ่าน ไม่มี warning
- `npx tsc --noEmit`: ผ่าน
- `npm run build`: ผ่าน (clean `.next`)
- Codex read-only review รอบ 4: ไม่พบปัญหา CONFIRMED ใหม่
- **ยังไม่ได้ตรวจในเบราว์เซอร์**; preview `localhost:3100` ของรอบ runner ถูกปิดก่อน build รอบนี้
- หลังจากนั้นแก้เฉพาะเอกสาร จึงไม่รัน checks ซ้ำ

### ประวัติ: รอบ runner comparator

รอบ runner comparator (2026-10-05) บน snapshot สุดท้ายในสำเนา Linux (`compare.ts` `83de524e…`, `runner.ts` `654c1ae6…`, `tests/runner-compare.test.ts` `f473515c…`):

- `npx vitest run`: ผ่าน 70/70 (4 ไฟล์; `runner-compare.test.ts` 42)
- `npm run lint`: ผ่าน
- `npx tsc --noEmit`: ผ่าน
- `npm run build`: ผ่าน (clean `.next`) บน Next.js 16.3.6
- Production check: ดึง comparator ที่ minify (`eM`) จาก chunk แล้วรันแยก module scope ผ่าน 12/12 และยืนยันว่า Worker ใช้ `instanceof Promise` ไม่อ่าน `.then`
- Codex read-only review รอบสุดท้าย: ไม่พบปัญหาใหม่
- Session ที่แก้โค้ดไม่ได้เรียก Chrome หรือถ่าย screenshot
- Browser: ผลตรวจ Chrome ที่ผู้ใช้ส่งต่อมา (ไม่ใช่ final acceptance) — ดู “ผลตรวจเบราว์เซอร์ (2026-10-05, ส่งต่อจากผู้ใช้)” ในหัวข้อ runner
- หลังจากนั้นแก้เฉพาะเอกสาร จึงไม่รัน checks ซ้ำ

### ประวัติ: ผลตรวจรอบ Home/heatmap (`7e4d7c8`)

หลังเขียน Home/heatmap ที่ `7e4d7c8` โดยตรวจบน working tree ในเวลานั้น:

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
- runner ลด network APIs และ terminate เมื่อ timeout แต่ Web Worker ไม่ใช่ security container ระดับ server sandbox; โค้ดผู้เรียนกับ comparator อยู่ realm เดียวกัน จึงปลอมผลผ่านได้ด้วย Proxy/แทนที่ built-in
- Defect รอตรวจยืนยัน: XP หายเมื่อส่งคำตอบผิดหลังผ่านบท (`run()` ใน `QuestApp.tsx` ล้าง `completedAt`) — รายละเอียดในหัวข้อ runner
- งานค้างจาก runner (ยังไม่ทำ): ตรวจ browser ส่วนที่ยังไม่ครอบคลุม (XP เริ่มต้น, พิมพ์ด้วยมือ, auto-save/reload); timeout 1.5 วินาทีเดียวรวมทุก test case และรวมเวลา start Worker; `runIsolatedSnippet` ทิ้ง output async และไม่รายงาน unhandled rejection; `EventSource`/`indexedDB`/`caches` ยังไม่ถูกปิด; ถ้าต้องกันการปลอมผลต้องแยก realm ระหว่างโค้ดผู้เรียนกับตัวตรวจ
- งานค้างจากการตรวจ storage: วันที่ใน import และ enum แบบ array แก้แล้วบน `fix/import-validation` (รอตรวจในเบราว์เซอร์); ที่ยังไม่แก้คือ XP นับซ้ำเมื่อ `lessonId` ซ้ำและอ่าน key จาก prototype, นิยาม streak ไม่รวม step/project และเก็บเฉพาะ `updatedAt` ล่าสุด (ต้องให้ผู้ใช้ตัดสินใจก่อนเปลี่ยน schema)
- Import/storage: race ข้ามแท็บระหว่างตรวจกับบันทึกยังเป็นไปได้ (localStorage ไม่มี CAS); backup `:rejected:*` ยังไม่มี UI กู้คืน
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
