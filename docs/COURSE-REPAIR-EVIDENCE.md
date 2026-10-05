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
