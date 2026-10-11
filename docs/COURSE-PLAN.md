# Course plan

## รอบแก้หลัง curriculum audit (Codex ลงมือหลัก)

ฐาน faa1de2 → branch `feat/curriculum-learning-repair` · 2026-10-05
สถานะทั้งรอบ: **in progress**; บันทึก B0–B8 ด้านล่างเป็นประวัติการเขียน ไม่ใช่การผ่านเกณฑ์คุณภาพรอบใหม่
แผนล่าสุด: [COURSE-REPAIR-PLAN.md](COURSE-REPAIR-PLAN.md) · coverage/หลักฐาน: [COURSE-REPAIR-EVIDENCE.md](COURSE-REPAIR-EVIDENCE.md)
Claude ติด usage limit ตามผู้ใช้; Codex เขียนและตรวจเองในรอบนี้ ยังไม่มี independent review ของ diff ใหม่ ไม่อ้างว่าทั้งสอง AI ตรวจแล้ว

R1 implement แล้ว: ลำดับ files → terminal → Node/npm tools → editor → program → process → errors → Git → docs; คง IDs เดิมและเพิ่ม dev-runtime-tools
เพิ่ม checkpoint เฉพาะเรื่องใน Developer Foundations พร้อม rubric/model answer หลังส่ง ไม่มี starter algorithm; การส่งข้อความบันทึกความพยายาม ไม่ใช่ยืนยันถูก
แก้ความขัดกัน oop-constructor / oop-polymorphism / M0→M1; เพิ่ม JDK setup และ prerequisite npm ของ ts-why
R2-JS implement และตรวจแล้ว: ทางเริ่มจากศูนย์/สะพาน function-loop-array/28 checkpoint เฉพาะเรื่อง; IDs เดิมคงอยู่ รายละเอียดใน COURSE-REPAIR-EVIDENCE
R2-Java implement และตรวจแล้ว: declaration/loop/method/array/minimum/copyก่อนประกอบ, 25 checkpoint และequipmentCLIassessment; compiler25บท0fail, contract tests/browserผ่าน
R3–R4ยังplanned: TypeScript/Node/Back-end/OOP, SQL, projects และ22labsยังไม่ปิด; หยุดเริ่มชุดใหม่ตามโควตา ส่งต่อในCOURSE-REPAIR-HANDOFF.md
R5 ตรวจ baseline ชุดแรกแล้ว: build Webpack ผ่าน; browser เปิด 7 courses/545 steps/22 labs และตรวจ interaction ตัวแทน/TypeScript/mobile ผ่าน ต้องรันใหม่หลัง R2–R4; ไม่ใช่ final acceptance ทั้งรอบ


อัปเดต: 2026-10-05 · branch `feat/curriculum-expansion` (สำเนา Linux `~/work/sea-fullstack-quest`)
หลักฐานค้นคว้า: `docs/COURSE-RESEARCH.md` · สถานะรายบท: `docs/COURSE-PROGRESS.md`

## ผู้เรียนและหลักการ

- ซี นักศึกษาปี 2 DII, CAMT, CMU เคยเชื่อม Front-end กับ Back-end แต่พื้นฐานบางเรื่องยังไม่แน่น เป้าหมายคือเข้าใจเหตุผล อ่านโค้ดออก เขียนเองได้ และแก้ปัญหาได้
- ภาษาไทยเป็นหลัก อธิบายศัพท์อังกฤษเมื่อพบครั้งแรก (ผ่าน vocabulary ของหัวข้อ)
- ฝึกวันละประมาณหนึ่งชั่วโมง: หนึ่งหัวข้อมี 5 ขั้น (~45 นาที) หยุดและกลับมาต่อได้ทุกขั้น ไม่มีกำหนดจบคอร์ส

## ข้อกำหนดความเข้ากันได้ (ห้ามละเมิด)

- **ไม่เปลี่ยน ID เดิม**: topic ID, step ID (`<topic>-<kind>`), lab/lesson ID, course ID และ hash URL (`#step/...`, `#lesson/...`) คงเดิม ความคืบหน้าใน `stepProgress`/`progress` ผูกกับ ID เหล่านี้
- ย้ายหัวข้อข้ามคอร์สได้ (step ID ไม่เปลี่ยน) แต่ตำแหน่งในคอร์สจะเปลี่ยน — บันทึกใน `COURSE-PROGRESS.md`
- ไม่เปลี่ยน storage schema v1 ในงานหลักสูตร

## มาตรฐานบทเรียน (ใช้กับทุกหัวข้อที่สถานะ “เขียนแล้ว”)

หนึ่งหัวข้อ (`TopicSource` + `RichLesson`) ต้องมี:

1. **objective** ที่สังเกตได้ (“เขียน/อธิบาย/แก้ … ได้”)
2. **prerequisites** เป็น topic ID ที่มีจริงและมาก่อน แสดงเป็นลิงก์ทบทวน
3. **hook**: สถานการณ์ที่ทำให้เห็นว่าทำไมต้องเรียน
4. **explain**: ทีละแนวคิด ตัวอย่างเล็กก่อนซับซ้อน (block ละหนึ่งความคิด มี code/output ได้)
5. **example** ที่รันได้ + **expectedOutput** ที่ตรงจริง (JS ตรวจด้วย test; TS ตรวจด้วย compiler; Java ตรวจด้วย JDK เมื่อมี)
6. **walkthrough** อธิบายลำดับการทำงาน ไม่ใช่แปลทีละบรรทัด
7. **pitfalls**: อาการ → เหตุผล → วิธีแก้
8. **checks**: คำถามเช็กความเข้าใจระหว่างเรียนพร้อมคำตอบ (≥ 2)
9. **practice**: โจทย์ต่อจากตัวอย่างแต่ต้องคิดเพิ่ม, **starter** ที่ไม่เฉลยพฤติกรรมหลัก, **acceptance** ที่ตรวจได้, **hint 3 ระดับ** (ทิศทาง → โครงสร้าง → เกือบเฉลย), **solution** + **solutionNotes** (เหตุผล/ทางเลือก)
10. **autoCheck** (JS/TS-compatible JS เท่านั้น): `functionName` + tests; test ต้องให้ starter ไม่ผ่านและ solution ผ่าน
11. **buggy** + **bugExplanation** สำหรับขั้นแก้บั๊ก
12. **reflection** และ **extension** เมื่อเหมาะสม
13. **analogy** เฉพาะแนวคิดยาก: สถานการณ์คุ้นเคย → จับคู่ส่วนกับแนวคิดจริง (`mapping`) → ข้อจำกัดของการเปรียบเทียบ (`limits`) → กลับไปที่โค้ดจริง → ให้ผู้เรียนทำนาย (ขั้น trace)

คุณภาพไม่วัดด้วยจำนวนคำ หัวข้อยากแบ่งย่อยเป็นหลายหัวข้อแทนการยัดในบทเดียว

### การตรวจที่ใช้

เครื่องมือตรวจที่สร้างในรอบนี้ (รันนอกแอป ไม่เพิ่ม dependency ใน package.json):

- `npx vitest run` — มาตรฐาน v3, ID/prerequisite, ตัวอย่าง JavaScript/Node/TypeScript รันจริง, autoCheck/outputCheck, การผูก lab กับหัวข้อ
- `VERIFY_DIR=<โฟลเดอร์ที่ติดตั้ง express@5 @electric-sql/pglite> npx vite-node --config vitest.config.ts scripts/verify-lesson-deps.ts` — ตัวอย่างที่ต้องใช้ Express/SQL
- `JAVA_HOME=<JDK 21> JUNIT_JAR=<junit-platform-console-standalone 6.x> npx vite-node --config vitest.config.ts scripts/verify-java-lessons.ts` — ตัวอย่าง, starter, เฉลย (solutionCheck/fixture/JUnit) และ bugCheck ของทุกหัวข้อ Java


- `tests/curriculum-quality.test.ts`: โครงสร้างครบตามมาตรฐานสำหรับหัวข้อที่ประกาศ `lesson`, prerequisite มีจริงและมาก่อน, ID ไม่ซ้ำ, ตัวอย่าง JS ให้ผลตรงกับ `expectedOutput`, autoCheck: starter ไม่ผ่าน/solution ผ่าน/คำตอบผิดที่ระบุไม่ผ่าน
- TypeScript: ตัวอย่างและ solution ต้อง compile ผ่านด้วย `typescript` ใน repo (strict)
- Java: ตรวจด้วย JDK 21 เมื่อมีในเครื่อง; ถ้าไม่มีให้ระบุใน progress ว่ายังไม่ได้ compile จริง และให้ Codex review
- ไม่สร้าง test ที่ตรวจเพียงข้อความหรือจำนวนคำ

## บทบาทและวิธีส่งงานที่ใช้ได้จริง

| บทบาท | งาน |
|---|---|
| Claude | ผู้ประสานงานและ implement หลัก: inventory, ออกแบบ syllabus, เขียนบท, เชื่อม UI, รัน checks, ตัดสินข้อเสนอของ Codex จากหลักฐาน, commit |
| Codex | ค้นคว้าแหล่งที่แบ่งให้, audit ความถูกต้องทางเทคนิค/prerequisite/starter/solution/tests, review diff ของแต่ละชุดแบบ read-only |

คำสั่งที่ทดสอบแล้ว (ไม่ใช้ OMC team ไม่ใช้ bypass):

```bash
cd ~/work/sea-fullstack-quest
# ค้นเว็บ: shell ของ Codex ไม่มี network ต้องใช้ --search
codex --search exec -s read-only --ephemeral "<งาน>" </dev/null >out.txt 2>err.txt
# review diff (ไม่ต้องใช้เว็บ)
codex exec -s read-only --ephemeral "<งาน review>" </dev/null >out.txt 2>err.txt
```

- รันแบบ background แล้ว Claude ทำงานอิสระระหว่างรอ; เก็บ hash ของ snapshot ก่อนให้ Codex ตรวจ และหยุดแก้ไฟล์ชุดนั้นระหว่างตรวจ
- review หนึ่งรอบต่อชุด แก้เฉพาะสิ่งที่มีหลักฐาน ตรวจซ้ำเฉพาะเมื่อพบปัญหาสำคัญ
- ห้ามอ้างว่า Codex เปิดเว็บหรือรันสิ่งที่ไม่ได้ทำ บันทึกผลพร้อมผู้ทำในเอกสาร

## Syllabus

สัญลักษณ์: **(เดิม)** = topic ID ที่มีอยู่แล้ว ต้องเขียนใหม่ตามมาตรฐาน · **(ใหม่)** · ★ = mini project/checkpoint · ✓auto = มีการตรวจอัตโนมัติใน browser

### 0. Developer Foundations (`developer-foundations`, live)

8 หัวข้อเดิมเป็น rich แล้ว งานที่เหลือ: เติม checks, acceptance และ hint 3 ระดับตามมาตรฐาน (ทำหลังเส้นทางหลัก)

### 1. JavaScript Foundations (`javascript-foundations`) — สอนภาษาและการแก้ปัญหา

| Unit | หัวข้อ | prerequisite หลัก |
|---|---|---|
| รันโค้ดและอ่านผล | `js-runtime` (เดิม), `js-errors` (ใหม่: อ่าน error, console.log debugging) | dev-program, dev-errors |
| ค่าและตัวแปร | `js-values` (เดิม), `js-variables` (เดิม), `js-strings` (ใหม่), `js-numbers` (ใหม่: arithmetic, conversion, NaN) | js-runtime |
| ตัดสินใจ | `js-conditions` (ใหม่: `===`, logical operators, truthy/falsy, if/else) ✓auto | js-values |
| Functions | `js-functions` (เดิม, **บทมาตรฐาน**) ✓auto, `js-scope` (เดิม) | js-conditions |
| ทำซ้ำและ collections | `js-loops` (ใหม่) ✓auto, `js-arrays` (เดิม) ✓auto, `js-objects` (เดิม) ✓auto, `js-references` (ใหม่: reference/mutation/copy) ✓auto | js-functions |
| ฟังก์ชันระดับสูง | `js-callbacks` (ใหม่: callback, reduce, sort comparator) ✓auto, ★ `js-project-planner-1` Friends Activity Planner M1 ✓auto | js-arrays, js-objects |
| Errors และ modules | `js-exceptions` (ใหม่: throw/try/catch), `js-modules-json` (ใหม่: ES modules, JSON) | js-functions |
| Asynchronous | `js-promises` (ใหม่), `js-async` (เดิม: async/await + error path), ★ `js-project-planner-2` M2 (validate/group/sort + async flow) ✓auto | js-callbacks |

DOM/events ไม่อยู่ในคอร์สนี้ (runner เป็น Worker ไม่มี DOM) — ครอบคลุมใน lab Front-end เดิม

### 2. TypeScript Foundations → Intermediate (`typescript`, เปลี่ยนจาก writing เป็น live) — โลกใหม่ “Type Observatory”

| Unit | หัวข้อ |
|---|---|
| ทำไมต้องมี type | `ts-why` (compile-time vs runtime, tsc), `ts-basic-types` (annotation, inference, any vs unknown) |
| Functions และ objects | `ts-functions`, `ts-object-types` (type alias, interface, optional, readonly), `ts-arrays-tuples` |
| Unions และ narrowing | `ts-unions-literals`, `ts-narrowing` (typeof/in/equality/discriminated union/type predicate), `ts-null-safety` |
| Reuse | `ts-generics` (รวม constraints), `ts-utility-types`, `ts-classes` (access modifiers, implements) |
| ใช้ในโปรเจกต์จริง | `ts-config` (tsconfig strict, tsc --noEmit, รัน TS ใน Node), `ts-async-types` (Promise<T>, JSON เป็น unknown แล้ว validate), ★ `ts-project-planner` (type โมเดลของ Planner ด้วย discriminated union) |

TS ทุกหัวข้อ: ตัวอย่าง/solution ตรวจด้วย compiler ใน test; practice ที่ตรรกะเป็น JS ล้วนใช้ ✓auto ได้ ส่วนที่ต้องมี type ใช้ checklist + `npx tsc --noEmit` ในเครื่อง (เว็บไม่อ้างว่าตรวจ type)

### 3. Java Foundations (`java-foundations`) — สอนภาษาและการรันโปรแกรม (JDK 21 LTS)

เดิม 14 หัวข้อ (`java-jdk` … `java-arraylist`) เขียนใหม่ตามมาตรฐาน และเพิ่ม: `java-switch` (switch expression), `java-exceptions-basic` (try/catch, parse input), `java-multi-file` (หลายไฟล์, package, `javac -d`), ★ `java-project-library-0` Library Management CLI M0 (เมนู + ArrayList)

คำสั่งรันในบทเรียน: `java Main.java` (single-file, JDK 11+) สำหรับไฟล์เดียว; `javac -d out ...` + `java -cp out ...` สำหรับหลายไฟล์

### 4. Java OOP (`java-oop`) — ออกแบบความรับผิดชอบและพฤติกรรมของหลาย object

ลำดับ: `oop-responsibility` → `oop-class-object` → `oop-fields-methods` → `oop-constructor` → `oop-identity` (ใหม่: reference, `==` vs `equals`) → `oop-static` (ใหม่) → `oop-encapsulation` → ★ `oop-project-library-1` (Book/Member) → `oop-composition` → `oop-collaboration` → ★ `oop-project-library-2` (Library + กติกาการยืม) → `oop-interfaces` (ใหม่) → `oop-polymorphism` (ใหม่) → `oop-inheritance` (ใหม่) → `oop-abstract` (ใหม่) → ★ `oop-project-rpg` RPG Battle CLI → `oop-collections` (ใหม่: List/Set/Map + generics ที่ใช้) → `oop-exceptions` (ใหม่) → `oop-refactor-main` (เดิม) → `oop-junit` (ใหม่: JUnit 5) → ★ `oop-project-library-3` capstone (persistence ด้วยไฟล์ + tests)

composition และ interfaces มาก่อน inheritance โดยตั้งใจ (ดู research)

### 5. Node.js Fundamentals (`node-foundations`, เปลี่ยนชื่อแสดงผล) — runtime, modules, files, async, HTTP

`node-runtime` (เดิม) → `node-process-cli` (ใหม่: argv, env, exit code, stdout/stderr) → `node-modules` (เดิม) → `node-npm` (เดิม) → `node-fs` (ใหม่: fs/promises, path) → `node-event-loop` (ใหม่: blocking vs non-blocking) → `node-events-streams` (ใหม่) → `node-http` (เดิม) → `node-test` (ใหม่: node:test + assert) → ★ `node-project-planner-cli` (CLI อ่านไฟล์ JSON ของ Planner แล้วสรุป)

### 6. Back-end Development (`backend`, คอร์สใหม่) — API, validation, database, auth, testing

`be-rest-design` (ใหม่) → `node-express-route` → `node-input` → `node-middleware` → `node-errors` (4 หัวข้อเดิมย้ายจาก node-foundations; step ID เดิม) → ★ `be-project-planner-api-1` (in-memory CRUD) → `be-sql-basics` → `be-sql-joins` → `be-db-node` (parameterized query, SQL injection) → `be-transactions` → ★ `be-project-planner-api-2` (PostgreSQL) → `be-auth` (hashing, session vs token) → `be-authorization` (401/403, ownership) → `be-security-basics` (CORS, secrets, OWASP) → `be-testing-api` → `be-architecture` (route/service/repository) → ★ `be-project-planner-capstone`

Express ตาม v5 (Node ≥ 18): async error ส่งต่ออัตโนมัติ, `res.status().json()`, ต้องมี `express.json()` ก่อนอ่าน `req.body`

### 7. คอร์ส planned และ labs เดิม

- `react`, `nextjs`, `postgres` คงเป็น planned; `postgres` ปรับคำอธิบายเป็นเชิงลึกต่อจาก Back-end (SQL พื้นฐานอยู่ใน `backend`)
- Labs 22 บทใน `src/content/lessons.ts` (web 12 + Java 10): ปรับคำอธิบาย/acceptance/hints ให้ตามมาตรฐาน และผูก prerequisite กับหัวข้อใหม่; Java labs กลายเป็น milestone ของ Library Management CLI; `plannedJava` เหลือเฉพาะที่ยังไม่มีบท

## โปรเจกต์ระหว่างเรียน

| โปรเจกต์ | Milestone | ต้องเรียนก่อน | วิธีตรวจ |
|---|---|---|---|
| Friends Activity Planner (web) | M1 data + summary functions (JS) · M2 validate/group/sort (JS) · M3 typed models (TS) · M4 CLI อ่านไฟล์ (Node) · M5 API in-memory · M6 PostgreSQL · M7 auth + tests (capstone) | ตามคอร์ส | M1–M2 ✓auto ในเว็บ; M3 `tsc --noEmit`; M4–M7 รันในเครื่อง + checklist (เว็บไม่อ้างว่าตรวจ Node/Express/SQL) |
| Library Management CLI (Java) | M0 เมนู + ArrayList · M1 Book/Member · M2 Library + กติกายืม · M3 capstone persistence + JUnit | Java Foundations → OOP | `javac`/`java` ในเครื่อง + checklist; JUnit ใน M3 |
| RPG Battle CLI (Java OOP) | interfaces + composition + polymorphism | `oop-abstract` | รันในเครื่อง + checklist |

แต่ละ milestone มี brief, starter files (ในบท), acceptance criteria และวิธีทดสอบ

## ลำดับ implement

| ชุด | งาน | สถานะ |
|---|---|---|
| B0 | research, plan, progress, handoff | เสร็จ |
| B1 | ขยาย type/generator/UI (prerequisite links, checks, acceptance, hints 3 ระดับ, autoCheck ใน micro-step) + บทมาตรฐาน `js-functions` + quality tests | เสร็จ |
| B2 | JavaScript Foundations ครบ | เสร็จ |
| B3 | TypeScript + โลกใหม่ | เสร็จ |
| B4 | Node.js Fundamentals | เสร็จ |
| B5 | Back-end Development | เสร็จ (ตรวจด้วย Express 5 + PGlite + pg ผ่าน socket) |
| B6 | Java Foundations | เสร็จ (ตรวจด้วย JDK 21) |
| B7 | Java OOP + Library/RPG projects | เสร็จ (ตรวจด้วย JDK 21 + JUnit 6.1.3) |
| B8 | Labs 22 บท, Developer Foundations ตามมาตรฐาน, คอร์ส planned | เสร็จ (lab ผูกกับคอร์สแต่ยังเป็นรูปแบบเดิม) |

ทุกชุด: เขียน → checks ที่เกี่ยวข้อง → Codex review หนึ่งรอบ → แก้ตามหลักฐาน → commit → อัปเดต progress
