# หลักฐานรอบแก้หลักสูตรหลัง faa1de2

ผู้ทำ: Codex คนเดียวตามคำสั่งล่าสุด · branch feat/curriculum-learning-repair · ไม่ push/merge/deploy/แตะ /mnt/c
Independent review ของงานใหม่: **ยังไม่มี** (audit เดิมตรวจ faa1de2 ไม่ใช่ diff นี้)
ก่อนแก้: git status --short ว่าง; log ล่าสุด faa1de2; worktree เดียว; ไม่พบ Claude/process agent อื่นใน process namespace ที่ตรวจได้ ไม่อ้างว่าเห็น process นอก environment นี้

## ชุด R1 และไฟล์

- developer-foundations.ts: ลำดับใหม่และ prerequisites คง ID/hash เดิม
- developer-tools.ts: Node 24/npm/npx/PATH พร้อมขั้นติดตั้งตาม shell; npm ขั้นต่ำไม่ต้องเรียน Node course ก่อน
- lessons/developer-foundations.ts: สร้าง workspace/save/run, terminal mkdir, Git setup, เอกสารทดลองโดยไม่ต้องรู้ HTTP
- developer-checkpoints.ts + types/curriculum.ts + generate.ts: คำถามเฉพาะเรื่อง/rubric/model answer; กิจกรรมประเมินไม่มี practice starter/ใบ้นำ algorithm
- QuestApp.tsx: ใช้ prompt จริงแทนเขียนทับ; feedback ประเมินหลังส่ง; ไม่สื่อว่าคำตอบข้อความผ่านเพียงเพราะไม่ว่าง; Tab/Shift+Tab ออกจากคำตอบประเมินได้
- lessons/java-foundations.ts + java-foundations.ts: JDK setup, PATH, Java route ทบทวน editor; แก้ข้ออ้างว่า fixture M0 ใช้ตรวจ M1 ตรง ๆ ได้
- java-oop.ts + lessons/java-oop.ts: constructor ทั้งสาม field final ตรง starter/solution; describe 3 บรรทัด + due 2 บรรทัดตรง fixture (ไม่ได้เปลี่ยน executable solution)
- typescript.ts: ts-why ทบทวน tools/editor และติดตั้ง typescript@5.9.2 ตรง compiler repo

## Coverage ของงานที่แก้แล้วและช่องที่ยังเปิด

| ทักษะจำเป็น | บทสอน | ฝึก | ประเมิน | หลักฐาน/สถานะ |
|---|---|---|---|---|
| path/working directory | dev-files/dev-terminal | relative path + สร้าง/เข้า workspace | path สองไฟล์ชื่อซ้ำ + equipment-lab | prerequisite/order tests ผ่าน; PowerShell ยังไม่ทดลองบน Windows |
| Node/npm/PATH | dev-runtime-tools | version/path/init log | Missing script เทียบ command not found | Node ของ environment เป็น v24.21.0; installers ของผู้เรียนยังไม่ทดสอบทุก OS |
| editor/save/run | dev-editor | version 1→2 พร้อม save/command/output | equipment-lab กับ equipment-copy | เนื้อหาและ gate เชื่อม UI; ไม่อ้างผลสัมฤทธิ์ผู้เรียน |
| program/process/errors | dev-program/dev-process/dev-errors | ทำนาย, เขียน, debug | boxes trace + exit code + stock/stork | dev-process example รันใน Node ผ่าน tests; คำตอบข้อความเทียบ rubric เอง |
| Git/docs | dev-git/dev-docs | repo ทดลอง + minimal expression | commit แยกไฟล์ + contract เครื่องมือโดเมนใหม่ | node --print ได้ 8/12/8 ตรงโจทย์; Git installer ยังไม่ทดสอบทุก OS |
| Java/OOP contract | oop-constructor/oop-polymorphism/M0 | เฉลยเดิม | fixtures เดิม | แก้ข้อความให้ตรงโค้ด; ยังไม่ได้รัน JDK/JUnit ใหม่ |
| JS/Java language ladder | บทเดิมมีอยู่ | ต้องแยก syntax/algorithm และเพิ่มฝึก | ยังขาด assessment ใหม่ครบกลุ่ม | **planned R2 ไม่ปิดจากการมีชื่อบท** |
| TS/Node/Back-end/OOP ต่อเนื่อง | บทเดิมมีอยู่ | narrowing/generics/SQL/I/O ยังต้องแยก | ยังไม่ครอบคลุมทุกผลลัพธ์ | **planned R3** |
| projects/22 labs | บทเดิมมีอยู่ | ต้องตรวจ acceptance/solution/dependencies ทุก lab | ลดตัวช่วยท้ายช่วง | **planned R4** |

## ผลตรวจเทคนิค

- npm run lint: ผ่าน
- ./node_modules/.bin/tsc --noEmit: ผ่าน
- npm test -- --reporter=dot (นอก sandbox เพราะ tests เปิด HTTP): 8 files / 379 tests ผ่าน (หลังเพิ่ม assessment tests)
- tests/assessment-workspace.test.tsx: brief จริง, feedback ก่อน/หลังส่ง, draft เดิมที่เคยเปิดเฉลย, restore คำตอบด้วย ID เดิม; 3 cases ผ่าน
- tests/recommendation.test.ts: เปลี่ยน expected จุดเริ่มเป็น dev-files; ไม่เปลี่ยน IDs ของ progress; รวม targeted tests 13/13 ผ่านหลังแก้ UI ล่าสุด
- npm run build: Turbopack ไม่ผ่าน EPERM ตอน PostCSS เปิดพอร์ต แม้ขอสิทธิ์; npm run build -- --webpack: ผ่าน production build โดยไม่เปลี่ยน config
- preview: npm run start -- --hostname 127.0.0.1 -p 3100; HTTP 200 ที่ http://127.0.0.1:3100
- checks ของผู้พัฒนาไม่ใช่ runner ผู้เรียน: เว็บไม่รัน Node/JDK/SQL; manual rubric ไม่ให้คะแนนอัตโนมัติ

## Browser verification (ต้องอ่านผลจริงก่อนปิด)

Playwright 1.63.0 / Chromium 153 ดาวน์โหลดใน /tmp/sea-quest-browser; ใช้ context ใหม่ ไม่ใช้ profile หลัก ไม่ถ่าย screenshots
sudo install-deps ทำไม่ได้ (ต้อง authenticate); ดาวน์โหลด Ubuntu .deb เฉพาะ libnspr4/libnss3/libasound2t64/ฟอนต์ไทย แตกใช้ใน /tmp ไม่มีการติดตั้ง system package
ผล browser: เปิด 7 course views, 545 step routes (109 topics) และ 22 lab routes ได้ ไม่มี pageerror; นี่เป็นการเปิด route ไม่ใช่อ่านคุณภาพทุกบท
ตรวจ interaction ตัวแทน: hints, assessment submit→feedback, worker ตรวจคำตอบผิด/ถูก, checklist, save/restore, เรียนต่อ และ review focus ผ่าน
ตรวจบทเครื่องมือยาวที่ desktop 1440px/mobile 390px พบ overflow 629px ก่อนแก้; แก้ grid min-width/text wrap แล้วหน้าไม่ล้น; Tab ออกจากคำตอบ assessment ได้
ภาพ TypeScript: asset SVG decode ได้ 150×150, CSS background และพื้นที่แสดง desktop/mobile มีจริง; ไม่อ้าง human visual acceptance จากการตรวจ DOM
หลักฐาน: [browser-report.json](verification/R1/browser-report.json), [script ที่รันจริง](verification/R1/browser-script.cjs.txt), [manifest generator](verification/R1/browser-manifest.ts.txt)
การเปิด route ทุกหน้าจะยืนยันเพียงว่าเปิดได้ ไม่ใช่อ่านเนื้อหาทุกบทใน browser

## แหล่งที่เปิดจริงสำหรับงานใหม่

อ่านแหล่งทางการเพื่อเขียนขั้นเครื่องมือ ไม่คัดลอกบท/โจทย์แพลตฟอร์ม:
- [Node download](https://nodejs.org/en/download): อ่านหน้า version/download; OS-specific widget เป็น dynamic จึงแยก archive recipe เอง ไม่อ้างว่าอ่าน installer ทุกหน้าจอ
- [npm introduction](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager): หน้าที่ npm/install/scripts
- [Git first setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup): identity/config ไม่ใช่ login
- [Temurin Windows installation](https://adoptium.net/installation/windows), [Linux installation](https://adoptium.net/installation/linux): PATH/JAVA_HOME, แยก OS/package
- [Playwright library](https://playwright.dev/docs/library): fresh context และ installation workflow
- VS Code getting-started URL เดิม redirect ไป agent tutorial; URL editor ที่ลองคืน Internal Error ไม่ใช้เป็นหลักฐานว่าอ่านคู่มือ editor เต็ม ขั้นเมนูที่เขียนเป็นวิธีฝึกที่ยังต้องทดลองกับเครื่องผู้เรียน
- Next.js guide ของรุ่นจริง: node_modules/next/dist/docs/01-app/01-getting-started/01-installation.md (อ่านก่อนแก้โค้ด); build ไม่รัน lint และรองรับ --webpack

ข้อจำกัด: ไม่มี learner trial; ยังไม่รับประกันผลสัมฤทธิ์ ไม่อ้างว่า coverage ทั้งเจ็ดคอร์สผ่านแล้ว

## รับช่วง

อ่าน COURSE-REPAIR-PLAN และ diff/commit ล่าสุดก่อน ไม่ reset ไป faa1de2
รอบถัดไปปิด R2: js-runtime เริ่มจากคำสั่งตรง ๆ ก่อน function/hoisting/recursion; ไม่ใช้ array/arrow/Java declaration/cast ก่อนสอน; แยกสะพาน minimum/copy ก่อน withoutLowest
ต่อ R3 SQL tables/CRUD/constraints/keys/relationships/JOIN/aggregation, OOP state/reference/file I/O/JUnit และแก้เฉลย routes ที่ยังไม่ครบ
จบ R4 ทุก 22 labs แล้วค่อย final browser/checks/coverage ไม่เริ่มคอร์ส planned

### คำสั่งตรวจ browser ซ้ำ

Package/Chromium และ native libraries อยู่ /tmp ไม่เพิ่ม app dependency ต้องเตรียมใหม่หาก /tmp ถูกล้าง:

```bash
npm install --prefix /tmp/sea-quest-browser --cache /tmp/sea-quest-npm-cache playwright@1.63.0
PLAYWRIGHT_BROWSERS_PATH=/tmp/sea-quest-browser/browsers /tmp/sea-quest-browser/node_modules/.bin/playwright install chromium
# ถ้า system dependencies พร้อมอยู่แล้ว ไม่ต้องแตก .deb เพิ่ม
# ถ้าใช้ libraries ใน /tmp ตามรอบนี้: ดาวน์โลดด้วย apt-get download libnspr4 libnss3 libasound2t64 fonts-tlwg-loma-otf
# แตกแต่ละ .deb ด้วย dpkg-deb -x <ชื่อไฟล์จริง> /tmp/sea-quest-browser/libs
cp docs/verification/R1/browser-script.cjs.txt /tmp/sea-quest-browser/verify.cjs
cp docs/verification/R1/browser-manifest.ts.txt /tmp/sea-quest-manifest.ts
./node_modules/.bin/vite-node --config vitest.config.ts /tmp/sea-quest-manifest.ts
# อีก terminal: npm run start -- --hostname 127.0.0.1 -p 3100
PLAYWRIGHT_BROWSERS_PATH=/tmp/sea-quest-browser/browsers LD_LIBRARY_PATH=/tmp/sea-quest-browser/libs/usr/lib/x86_64-linux-gnu FONTCONFIG_FILE=/tmp/sea-quest-browser/fonts.conf node /tmp/sea-quest-browser/verify.cjs
```

fonts.conf เป็น fontconfig ของ context นี้ที่ include /etc/fonts/fonts.conf, เพิ่ม dir /tmp/sea-quest-browser/libs/usr/share/fonts และใช้ cachedir /tmp/sea-quest-browser/font-cache
Environment นี้ sandbox บล็อก socket/ดาวน์โหลด/เขียน .git; ใช้ approval ที่รองรับ ไม่มี Codex bypass
Browser script เป็นหลักฐานตรวจชุดแรก ต้องปรับ manifest และรันใหม่เมื่อชุด R2–R4 เปลี่ยนบท/interaction

## R2-JS — JavaScript Foundations (2026-10-05)

ฐาน b7f8aa5, branch feat/curriculum-learning-repair; เจ้าของการผลิตและตรวจ Codex คนเดียว
ตรวจ process เพิ่มหลัง permissions เปลี่ยน: มี Claude เปิดค้าง cwd repo ต้นฉบับ แต่ session log ล่าสุดจบ audit เวลา07:02UTC ไม่มีงานเขียนใหม่ใน Linux; ไม่แตะ repo ต้นฉบับ ไม่เรียก agent เพิ่ม
Snapshot ของชุดนี้: commit subject `fix(curriculum): scaffold JavaScript foundations and topic assessments` (ดู git log)
Independent review ใหม่: **pending ทุกไฟล์ในชุดนี้** ไม่อ้างว่า Claude ตรวจแล้ว

### สิ่งที่แก้และ coverage ที่ตรวจ

| ทักษะ/ช่องว่าง | บทสอน | ฝึก | assessment / หลักฐาน |
|---|---|---|---|
| save/run/คำสั่งก่อน function | js-start → values → variables | แยกชื่อ/ข้อความ, เปลี่ยนข้อมูลแล้วทำนาย; debugชื่อผิด/assign const | เส้นทางเดินทาง, เครดิต; browser output check ปฏิเสธผิด/ยอมรับเฉลย |
| function ก่อน call stack | js-function-basics → js-functions → js-runtime | เติมreturn →เขียนคำนวณหลายinput → traceการเรียกซ้อน; return/log debug | แปลงอุณหภูมิ, ค่าถ่ายเอกสาร, traceแพ็กสินค้า; function tests/feedback gated |
| loopก่อนการประกอบ | loop-basics → accumulator → array-basics → loop-control → loops → nested-loops | เติมขอบ → sumToจากชื่อfunction → countAbove → หยุด0 → affordableCount → สร้างทุกคู่ | นับถอยหลัง/คูปอง/เซนเซอร์/บริจาค/เวลางาน/ห้อง; ปกติ ศูนย์รอบ ขอบรวม ไม่ข้ามหลังหยุด |
| array/arrow/objectก่อนmap | array-basics → function-values → objects → arrays | index/length/push/for-of, ส่งfunctionกับเรียก, arrow block return | กฎราคา/พัสดุ; correct/wrong function/output fixtures |
| errors/ข้อมูลเปลี่ยนได้ | errors (สอนtry/catchก่อนใช้), references, callbacks | หลักฐาน i/value, copyชั้นที่เปลี่ยน, sort/reduce | เซสชันและstateหนังสือ; rubric แยกmanualตรวจmutationจากผลreturn |
| async/modules/validation | exceptions → modules-json → promises → async → Planner M2 | คำสั่ง.mjsแน่นอน, catch/rejection, ฝึกsplit/destructure/??ก่อนpipeline | ชั่วโมง, modulesค่าซอง, Promiseลำดับ, simulatedasync; ท้ายคอร์สรายงานยืมอุปกรณ์เลือกวิธีเอง |

แก้ values ไม่ใช้[]ก่อนarray; variables ไม่ใช้if/array/loopก่อนสอน; stringsสอนreplaceAllและใช้แทนsplit/joinในช่วงต้น คงreturn/console.log, analogiesและPlannerเดิม
Checkpointทั้ง28บทเป็นโจทย์เฉพาะเรื่องพร้อมrubric/คำตอบจริง มีกรณีขอบ/ผิดเหมาะกับแต่ละเรื่อง Feedbackหลังส่งยังกลับทบทวนได้ แต่การบันทึก completed เป็นหลักฐานการส่ง ไม่ใช่คะแนนความถูกต้อง
Tests โครงสร้างเดิมบังคับexplainอย่างน้อย3ส่วน แม้แบ่งแนวคิดเล็ก จึงเอาจำนวนขั้นต่ำออก ไม่เติมข้อความเพื่อผ่านจำนวน ส่วนตรวจoutput/fixtures/prerequisite/เนื้อหาที่แสดงยังอยู่

### ผลตรวจ

- lint ผ่าน; TypeScript --noEmit ผ่าน; Vitest 8 files / 408 tests ผ่าน รวมตัวอย่างและอธิบายย่อยรันได้ เฉลยผ่าน starter/คำตอบผิดที่กำหนดไม่ผ่าน
- production build `npm run build -- --webpack` ผ่านบน Next16.3.6 / Node24.21.0 / TypeScript5.9.2; ไม่แก้buildconfig
- scriptเทียบgitshow b7f8aa5กับsourceปัจจุบัน:20 IDsเดิมอยู่ครบ ไม่มีschema/hashเปลี่ยน
- Browser production contextแยก:140 JavaScript stepsเปิดได้ ไม่มีpageerror; ไม่ใช่อ่านทุกบทหรือยืนยันการเรียนรู้
- ตัวแทนinteraction: new output/function testsถูก/ผิด, hints, assessmentไม่เห็นเฉลยก่อนส่ง→feedback→save/reload, เรียนต่อเข้าสู่runtimeที่ย้าย, reviewlinkไปjs-startพร้อมfocus, longcontent1440/390ไม่ล้น, Tabออกจากassessment
- หลักฐาน [browser report](verification/R2-JS/browser-report.json), [script](verification/R2-JS/browser-script.cjs.txt), [manifest](verification/R2-JS/browser-manifest.ts.txt)
- Previewในเครื่อง http://127.0.0.1:3100/#step/js-start-concept ไม่มีdeploy

### แหล่งและข้อจำกัด

เปิดอ่านเอกสารทางการ MDN [Grammar/types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types), [Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration), [replaceAll](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) เพื่อตรวจกลไก declaration/ขอบลูป/string replacement; โจทย์และข้อความเขียนใหม่ ไม่อ้างอ่านคอร์สแพลตฟอร์มเต็ม
ยังไม่มี learner trial หรือ independent review ผลเทคนิคไม่ยืนยันความสามารถผู้เริ่มต้น ยังไม่ปิดอีกห้าคอร์ส/projects/22labs หรือfinal browserรวม
ถัดไป R2-Java: declaration/castก่อนใช้, array/ArrayList/minimum/copyก่อนwithoutLowest, checkpoint/assessmentใหม่ แล้วR3→R4→R5ตามแผน ไม่ต้องขออนุญาตซ้ำ

## R2-Java — ปิดชุด Java Foundations ก่อนส่งต่อ (2026-10-05)

ฐาน8ca15ac; ผู้เขียน/ผู้ตรวจเอง Codex; independent review **pending** ไม่ได้เรียก Claude ตรวจ
ผู้ใช้สั่งหยุดเริ่มชุดใหม่เพราะโควตาเหลือประมาณ9%; ปิดเฉพาะJavaและเตรียมhandoff ไม่เริ่มR3

| ทักษะ/ช่องว่าง | บทและกิจกรรม | ประเมิน / หลักฐาน |
|---|---|---|
| declarationก่อนใช้ | java-declarationsก่อนoutput/expressions; อ่านชนิด/ชื่อ/ค่าและเติมส่วนเดียว | พัสดุใหม่; compile/read output; ชื่อเดิม18บทอยู่ครบ |
| loopพื้นฐานก่อนโจทย์หนาแน่น | java-for-basics → java-loop-sum → java-loops | นับถอยหลัง/ระยะเดิน/เวลางาน; zero/one/many rounds |
| methodก่อนประกอบหลายmethod | java-method-basics → java-methods | ค่าซอง/ตั๋วในบริบทใหม่; returnกับprintlnและpass-by-value |
| array/minimum/copyก่อนwithoutLowest | array-basics → array-minimum → array-copy → java-arrays | เซนเซอร์/minimumซ้ำ/ค่าติดลบ/ว่าง/หนึ่งตัว/ต้นฉบับไม่เปลี่ยน; mutantที่มีความหมายถูกปฏิเสธ |
| syntaxไม่ข้ามลำดับ | primitives bugไม่ใช้ifก่อนbranch; Stringใช้indexOf/substringแทนarray/regexก่อนสอน; castยังอยู่บทcastingก่อนใช้ต่อ | เฉลย/acceptance/expected outputแก้พร้อมกัน; compilerตรวจได้ |
| ทางเริ่มJavaเป็นอิสระ | java-jdk prerequisite files/terminal และeditor/setupอยู่ในบทเอง ไม่บังคับNode/npm | Java21จริงในเครื่อง; OS installer/PATH recipeยังไม่ได้ลองทุกOS |
| checkpointและท้ายคอร์ส | checkpointเฉพาะเรื่องทั้ง25บท feedbackหลังส่ง; CLIอุปกรณ์ใหม่เลือกวิธีเอง | เฉลยเต็มEquipmentMainในfeedbackตรงไฟล์ที่compile; normal/error/state/EOF/quit fixtures |

### ผลตรวจจริง

- JDK: Temurin21.0.12.1+1, javac21.0.12.1; นำเครื่องมือจากcacheนอกrepoมาวางpathกลาง /tmp/sea-quest-java-tools ไม่เขียนในrepoต้นฉบับ ไม่อ้างดาวน์โหลดใหม่จากofficial
- `scripts/verify-java-lessons.ts` ล่าสุดเลือก25Java Foundations topics: **0 failing checks**; example/explainที่เป็นJava, starter, solution/output/fixtures และbugCheck ผ่าน [compiler log](verification/R2-Java/compiler-checks.log)
- ตัวตรวจรอบแรก46Java topicsพบ1ปัญหา:เอาBashติดตั้งJDKไปcompileเป็นJava; เพิ่มoptionallanguageในrichblockและบันทึกshellsetupเป็นmanualอย่างชัดเจน ไม่อ้างว่าshellsetupผ่านcompiler แล้วตรวจ25บทล่าสุดใหม่ผ่าน JavaOOPยังไม่ถือว่าซ่อมR3แล้ว
- `scripts/verify-java-repair.ts`: correctผ่าน, wrongalgorithmเลือกminimumตัวท้าย/นับ0/copyผิดindexไม่ผ่าน และตรวจsourceไม่เปลี่ยน; Equipmentnormal/errors/emptyEOF/argument/quitผ่าน, ผิดstateถูกปฏิเสธ [contract log](verification/R2-Java/contract-checks.log)
- lint, --noEmit และVitest415testsผ่าน; productionbuildWebpackผ่าน Next16.3.6 ขั้นปิดส่งต่อเก็บlogล่าสุดเพิ่มเมื่อจบ
- Browser125Java stepsเปิดได้; hints, prerequisite/focus, gatedเต็มเฉลย, oldIDsave/reload, 1440/390pxไม่ล้นและTabออกจากคำตอบผ่าน ไม่มีpageerror [report](verification/R2-Java/browser-report.json) / [script](verification/R2-Java/browser-script.cjs.txt) / [manifest](verification/R2-Java/browser-manifest.ts.txt)
- เปิดroutesไม่เท่ากับอ่านครบทุกบท; Javaเว็บไซต์ไม่มีcompiler การส่ง/checklistเป็นself-report ไม่ยืนยันถูก; ไม่มีlearner trial

### แหล่ง/ข้อจำกัด/รับช่วง

ลองเปิดdev.java variables/arrays/primitive-types แต่เครื่องมือคืน0lines จึงไม่อ้างอ่านเนื้อหาเต็ม ใช้ [Oracle Arrays](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html), [Variables](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html) อ่านได้จริง (tutorialJDK8 ใช้เฉพาะพื้นฐานที่ตรวจJDK21ซ้ำ) และ [JLS21 conversions](https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html)
R1,R2-JS,R2-Javaทั้งหมดรอindependentreview; R3/R4/R5finalยังค้าง ตาม [COURSE-REPAIR-HANDOFF.md](COURSE-REPAIR-HANDOFF.md)
