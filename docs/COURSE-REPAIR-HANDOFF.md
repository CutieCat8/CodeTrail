# ส่งต่อ curriculum repair ให้ Claude session ใหม่

อัปเดต 2026-10-05 หลังผู้ใช้สั่งหยุดเริ่มชุดใหม่ เพราะโควตาเหลือประมาณ 9%
Codex ปิด Java Foundations แล้วหยุด; **ยังไม่จบรอบปรับหลักสูตรทั้งหมด**

## เป้าหมายและขอบเขต

พัฒนาเว็บเดิมใน `/home/cnux/work/sea-fullstack-quest` ให้ผู้เริ่มจากศูนย์มีเส้นทางอ่าน/ทำนายโค้ด ไล่ค่า เขียนโปรแกรมใหม่ debug และประกอบโปรเจกต์พร้อมอธิบายเหตุผล ไม่รับประกันผลสัมฤทธิ์ก่อนทดลองผู้เรียนจริง
สอนภาษาไทย อธิบาย syntax/เครื่องมือก่อนใช้ ฝึกจากมีตัวช่วยไปทำเอง ประเมินบริบทใหม่พร้อม rubric/feedback หลังส่ง และเฉลยต้องตรง acceptance/fixtures
ขอบเขต: เจ็ดคอร์สปัจจุบัน + Friends Activity Planner/Library CLI/RPG Battle CLI + 22 labs; ไม่สร้างผลิตภัณฑ์ Planner เต็มระบบแยกออกมา
เวลาวันละประมาณหนึ่งชั่วโมงเป็นแนวแบ่งกิจกรรม ไม่ใช่บังคับจบแปดสัปดาห์
รักษา IDs/hash/progress/storage เดิม เนื้อหาดีและ analogy ที่เชื่อมโค้ด ไม่ reset กลับ audit snapshot
**ไม่ push, merge, deploy หรือแตะ /mnt/c**; Import/XP/streak/AI assistant backlog; React/Next.js/PostgreSQL เต็มคอร์สยัง planned

อ่านเอกสารปัจจุบันก่อนรับช่วง:
- [แผน repair](COURSE-REPAIR-PLAN.md), [coverage/หลักฐาน](COURSE-REPAIR-EVIDENCE.md)
- [COURSE-PLAN](COURSE-PLAN.md), [COURSE-PROGRESS](COURSE-PROGRESS.md), [COURSE-RESEARCH](COURSE-RESEARCH.md), [REDESIGN-HANDOFF](REDESIGN-HANDOFF.md)
- Audit snapshot faa1de2: [REPORT](/home/cnux/work/curriculum-audit-faa1de2/REPORT.md), [A-syllabus](/home/cnux/work/curriculum-audit-faa1de2/A-syllabus.md), [B-lesson-samples](/home/cnux/work/curriculum-audit-faa1de2/B-lesson-samples.md), [C-codex-report-java](/home/cnux/work/curriculum-audit-faa1de2/C-codex-report-java.md), [D-references-claude](/home/cnux/work/curriculum-audit-faa1de2/D-references-claude.md)

Audit เก่าเป็นจุดตั้งต้น ต้องเทียบ source ใหม่ ไม่ใช่ reset หรือถือว่าข้อค้นพบยังอยู่ทั้งหมด ประวัติ B0–B8 ใน docs ไม่ใช่การผ่านเกณฑ์รอบ repair นี้

## Branch / snapshot / working tree

- Branch `feat/curriculum-learning-repair`
- Implementation ล่าสุด **f79b9e2** — `fix(curriculum): scaffold Java foundations and verify array contracts`
- JavaScript **8ca15ac** — `fix(curriculum): scaffold JavaScript foundations and topic assessments`
- เครื่องมือ/assessment infrastructure **b7f8aa5** — `fix(curriculum): prepare beginner tools and truthful assessment feedback`
- หลัง f79b9e2 ไม่มี source ที่แก้ค้างไม่ commit; handoff นี้และ log หลักฐาน Java ถูกบันทึกเป็น docs commit ถัดมา (hash ล่าสุดจริงดู `git log -1 --oneline` ไม่ใช่ hash implementation)
- Logs ถูก ignore ด้วยกฎ *.log จึงเพิ่มไฟล์หลักฐานที่ระบุด้วย `git add -f` โดยเฉพาะ ไม่แก้กฎ ignore ทั้ง repo
- สถานะหลัง docs commit ตรวจด้วย `git status --short`; ไม่ทิ้ง/reset งานเพื่อทำให้สะอาด

## ชุดที่ปิดได้และผลตรวจจริง

| ชุด | งานที่ปิด | หลักฐาน/ผลตรวจ |
|---|---|---|
| R1 | files/terminal/Node/npm/editor/save/run/Git/PATH, developer checkpoint เฉพาะเรื่องพร้อม feedback หลังส่ง; แก้ constructor/polymorphism/M0→M1 contract | 379 tests + lint/typecheck/buildWebpack; baseline browser 7 courses/545 steps/22 labs, representative interaction/TypeScript illustration/mobile ผ่าน ดู [R1](verification/R1/browser-report.json) |
| R2-JS | เริ่ม js-start ไม่ใช้ nested function เป็นบทแรก; คง js-runtime แล้วเลื่อนไปหลัง functions; เพิ่ม function/loop/accumulator/array/arrow/control/nested-loop bridges; checkpoint เฉพาะเรื่องทั้ง28บท | IDsเดิม20บท/100stepsอยู่ครบ; 408 tests + lint/typecheck/build; browserเฉพาะJS140steps/hints/testsผิด-ถูก/gatedfeedback/save/continue/reviewfocus/mobile ผ่าน ดู [R2-JS](verification/R2-JS/browser-report.json) |
| R2-Java | declarationก่อน output/expressions; for/sum/method/array/minimum/copyก่อนโจทย์ประกอบ; Stringไม่ใช้array/regex/ifก่อนสอน; ทางเริ่มไม่บังคับNode; checkpoint25บทและequipmentCLIassessmentเฉลยเต็ม | IDsเดิม18บท/90stepsอยู่ครบ; Temurin21.0.12.1 compile/run25topics **0fail**; mutants/ขอบ/ต้นฉบับไม่เปลี่ยน/CLIstateผ่าน; browser125steps/feedback/focus/save/mobileผ่าน |

Java หลักฐาน: [compiler](verification/R2-Java/compiler-checks.log), [contracts](verification/R2-Java/contract-checks.log), [browser](verification/R2-Java/browser-report.json), [script](verification/R2-Java/browser-script.cjs.txt), [model CLI ที่ compile จริง](verification/R2-Java/EquipmentMain.java)
ตรวจปิดล่าสุด source f79b9e2: [lint](verification/R2-Java/lint.log) ผ่าน, [typecheck](verification/R2-Java/typecheck.log) ผ่าน (logว่างเมื่อผ่าน), [Vitest](verification/R2-Java/tests.log) **8 files/415 tests** ผ่าน; `npm run build -- --webpack` ผ่าน Next16.3.6/TypeScript5.9.2/Node24.21.0
Tests/route countsไม่ใช่หลักฐานคุณภาพการสอนหรือการเรียนรู้จริง การเปิดทุกrouteในคอร์สไม่ใช่การอ่านทุกบทในbrowser

ตัวตรวจ Java รอบแรกพบเอา Bash setup ไป compile เป็น Java จึงเพิ่ม `RichLesson.explain[].language` และ verifier บันทึก setup เป็น manual ไม่อ้างว่า shell/installer ผ่าน Java compiler; ตรวจ Java25บทใหม่ผ่านแล้ว
`JAVA_TOPIC_IDS` ใน verifier ใช้เลือกตรวจเฉพาะชุดที่เปลี่ยน; ไม่เพิ่ม Java cloud/browser runner
`verify-java-repair.ts` ตรวจ model CLI ใน feedback ตรงกับ fixture ที่compile และปฏิเสธ wrong state transition; minimum/copyตรวจ correctและmutantที่compileได้จริง มิใช่แค่syntaxผิด

## งานค้าง / checks ที่ยังไม่รัน

- ไม่มี source ของ Java ที่ไม่ commit หลังปิดชุดนี้; ไม่มีชุด R3 ที่เริ่มเขียน
- R3 **planned**: TypeScript narrowing/discriminated union/predicate/exhaustive และ generics/constraints/keyof/indexed access แยกให้ฝึกก่อนประกอบ; Node prerequisites/modules/CLI/files/HTTP; Back-end เฉลย routesครบและ SQL tables→CRUD/WHERE→constraints/keys→relationships→JOIN→aggregation; Java OOP state/behavior/referenceก่อนidentity/override, file I/O/JUnit setupก่อนcapstone
- R4 **planned**: ปรับ projects ทั้งสามและยกระดับ22labsให้ prerequisite/brief/starter/hints/solution/acceptance/dependencies/check commands/reflectionตรงกัน; R2 assessmentใหม่ไม่ใช่การปิด R4 projects/labsทั้งหมด
- R5 final **planned**: coverageทั้งเจ็ดคอร์ส/กิจกรรม, routesทั้งหมดในsnapshotสุดท้าย, interactionแต่ละแบบ, keyboard/mobile/TypeScript illustration และ production checksท้ายรอบ
- ยังไม่รัน combined browser บนทั้งหมดหลัง R2; R1 baselineกับR2 targetedไม่ใช่final acceptance
- ยังไม่ลอง installer/PATH ทุกOSจริง และไม่มี beginner learner trial
- ยังไม่ได้ประเมิน/reviewคุณภาพการสอนและassessmentทั้งรอบโดยผู้ไม่เขียน ดูข้อถัดไป

## Independent review ที่ต้องทำ

**R1, R2-JS และ R2-Java ทั้งหมด pending independent review** Codexเขียนและตรวจเองเท่านั้น Auditก่อนหน้าไม่ใช่review diffใหม่ ไม่อ้างว่าทั้งสองAIตรวจแล้ว
Claude sessionใหม่เริ่มอ่าน diffแบบread-onlyของสามชุดนี้ โดยเฉพาะ syntaxก่อนสอน, scaffolding, rubric/model answer, manual completion semantics, source/fixture/acceptanceและการคง IDs
บันทึก snapshot/log/ข้อค้นพบและสิ่งที่แก้ตามจริง ตรวจซ้ำเฉพาะประเด็นสำคัญที่ยังไม่ปิด ไม่วนreviewไม่สิ้นสุด

ไฟล์สำคัญของ R2-JS: `javascript-start.ts`, `javascript-bridges.ts`, `javascript-checkpoints.ts`, `javascript-foundations.ts`, `lessons/javascript-foundations.ts`, และการเอาexplainขั้นต่ำ3ส่วนออกใน `tests/content.test.ts`
ไฟล์สำคัญของ R2-Java: `java-bridges.ts`, `java-checkpoints.ts`, `java-foundations.ts`, `lessons/java-foundations.ts`, `src/types/curriculum.ts`, `scripts/verify-java-lessons.ts`, `scripts/verify-java-repair.ts`
R1 UI assessment/gatingอยู่ `QuestApp.tsx`/`generate.ts`; tests `assessment-workspace.test.tsx`; ตรวจจากcommit b7f8aa5

## ขั้นถัดไปและเกณฑ์ผ่าน

1. ตรวจ status/branch/log และ process ก่อนแก้ ถ้ามี agent เดิมกำลังเขียนไฟล์เดียวกันให้หยุด ไม่แก้ shared filesพร้อมกัน
2. ทำ independent reviewสามชุดที่สะสมก่อน แก้เฉพาะข้อสำคัญภายในscopeเดิม เก็บหลักฐานใหม่
3. เริ่ม R3 เป็นชุดเล็กชัดเจน แนะนำ TypeScriptก่อน ตาม dependencies; ownershipไฟล์ไม่ทับกัน ใช้branch/worktreeสำหรับการเขียนเมื่อมอบหมายหลายagent อย่าย้อนแก้OMC team/bypass
4. ต่อ Node/Back-end/OOP แล้ว R4 projects/labs และ R5final; ไม่ต้องขออนุญาตซ้ำสำหรับงานในscopeที่ผู้ใช้อนุญาตไว้
5. เกณฑ์ผ่านต่อชุด: syntax/เครื่องมือมีบท/prerequisiteก่อนใช้, ฝึกไล่ระดับและassessmentบริบทใหม่, feedbackหลังส่ง, เฉลย/acceptance/fixturesตรง, correctผ่านและwrongสำคัญไม่ผ่าน หรือmanualมีเกณฑ์/คำสั่งตรวจซ้ำ, IDs/storageเดิมใช้ได้, checksที่เกี่ยวข้อง+targetedbrowserผ่าน แล้วcommit+อัปเดตcoverage/evidence
6. เกณฑ์จบรอบ: ทั้ง7คอร์สและ22labs/projectมีหลักฐานรองรับครบตามแผน, finalchecks/browserผ่านและข้อจำกัดตรงจริง จากนั้นหยุดส่งมอบและเสนอแผนReact→Next.js/PostgreSQLสั้น ๆ เท่านั้น ไม่implementต่อเอง

## คำสั่งตรวจ / เครื่องมือ / preview และ process

ทำจาก Linux repo เท่านั้น:

```bash
git status --short
git branch --show-current
git log -4 --oneline
npm run lint
npx tsc --noEmit
npm test
npm run build -- --webpack
JAVA_HOME=/tmp/sea-quest-java-tools/jdk21 ./node_modules/.bin/vite-node --config vitest.config.ts scripts/verify-java-repair.ts
# ตรวจ Javaทั้งหมดรวมOOPต้องมีJUnit; เลือกบางบทใช้ JAVA_TOPIC_IDS=id1,id2
JAVA_HOME=/tmp/sea-quest-java-tools/jdk21 JUNIT_JAR=/tmp/sea-quest-java-tools/junit-platform-console-standalone-6.1.3.jar ./node_modules/.bin/vite-node --config vitest.config.ts scripts/verify-java-lessons.ts
```

JDK/JUnitถูกcopyจากcacheเก่ามาpathกลางเพื่อการตรวจรอบนี้ ไม่พึ่งscratchpadในคำสั่งข้างต้น แต่ `/tmp` อาจถูกล้าง ต้องเตรียมเครื่องมือจากofficialdistributionใหม่เมื่อหาย ห้ามอ้างว่าโหลดใหม่/ตรวจchecksumofficialแล้วในรอบนี้
Read relevant installed Next guide (`node_modules/next/dist/docs/`) ก่อนแก้codeตามAGENTS.md; ใช้WebpackเพราะTurbopackรอบR1ติดsandboxbind ไม่เปลี่ยนbuildconfig

Production preview **ยังเปิด** http://127.0.0.1:3100/#step/java-jdk-concept (JSเริ่ม `/#step/js-start-concept`)
ตอนตรวจส่งต่อ: `next-server` PID **258961**, unified exec session **48839**, คำสั่ง `npm run start -- --hostname 127.0.0.1 -p 3100`; เป็นlocalhostไม่ใช่deploy หากต้องbuildใหม่ให้หยุด/restartเฉพาะserverนี้หลังตรวจpid/cwd
ไม่มี compiler/browser verification process ค้างเมื่อปิดชุด; test/lint/typecheck/buildทั้งหมดจบแล้ว
พบ Claude processเดิม PID19402 เปิดค้าง (session logล่าสุดจบaudit); ไม่ส่งข้อความ/เรียกให้เขียน ไม่แตะrepoต้นฉบับ มีCodexCLI PID236304และapp-serverตามsessionอยู่ ให้ตรวจสถานะจริงก่อนรับช่วง ไม่สรุปจากการมีprocessว่าagentยังเขียนอยู่

Playwright1.63.0/Chromiumและnative librariesอยู่ `/tmp/sea-quest-browser` ใช้freshcontextไม่ใช้profileหลัก ไม่ถ่ายscreenshot; วิธีเตรียมอยู่COURSE-REPAIR-EVIDENCEส่วนR1
เรียกtargetedscriptเมื่อไฟล์และmanifestพร้อม:

```bash
cp docs/verification/R2-Java/browser-manifest.ts.txt /tmp/sea-quest-java-manifest.ts
./node_modules/.bin/vite-node --config vitest.config.ts /tmp/sea-quest-java-manifest.ts
cp docs/verification/R2-Java/browser-script.cjs.txt /tmp/sea-quest-browser/verify-java.cjs
PLAYWRIGHT_BROWSERS_PATH=/tmp/sea-quest-browser/browsers LD_LIBRARY_PATH=/tmp/sea-quest-browser/libs/usr/lib/x86_64-linux-gnu FONTCONFIG_FILE=/tmp/sea-quest-browser/fonts.conf node /tmp/sea-quest-browser/verify-java.cjs
```

หยุดทำงานหลังบันทึกhandoffนี้ตามคำสั่งผู้ใช้ ไม่เริ่มชุดใหม่ ไม่reset/ทิ้งงาน ไม่push/merge/deploy
