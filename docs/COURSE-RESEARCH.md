# Course research

วันที่ค้นคว้า: 2026-10-05 · เอกสารนี้แทนที่ส่วน “Primary-source findings” ของ `docs/curriculum-research.md` (เอกสารเดิมเก็บไว้เป็นประวัติ)

กติกาที่ใช้: บันทึกเฉพาะสิ่งที่เห็นจริง แยก **สิ่งที่แหล่งแสดง** ออกจาก **ข้อเสนอของเรา** ไม่คัดลอกบทเรียน/โจทย์ของแพลตฟอร์ม ใช้เพียงชื่อหัวข้อเพื่อเทียบขอบเขตและลำดับ

## ผู้ค้นคว้าและวิธีเข้าถึง

| ผู้ทำ | ขอบเขต | เครื่องมือ | ข้อจำกัดของเครื่องมือ |
|---|---|---|---|
| Codex (`codex --search exec -s read-only --ephemeral`, 07:12–07:15) | JavaScript, Java, Java OOP, MDN Guide, dev.java | web search tool ของ Codex | shell ของ Codex ไม่มี network (`curl: (6) Could not resolve host`); web tool เปิดหน้าได้แต่หน้า JS-rendered ได้เนื้อหาไม่ครบ |
| Claude | TypeScript, Node.js, Back-end, TypeScript Handbook, Node.js Learn/releases, Express 5 | WebFetch + `curl` ไป GitHub API/raw ของ repo สาธารณะ | หน้า roadmap.sh และ freeCodeCamp learn เป็น JS-rendered จึงใช้ข้อมูลจาก repo สาธารณะของผู้ทำแทน |

ตรวจไขว้: freeCodeCamp JavaScript v9 ที่ Codex เปิดไม่ได้ Claude ดึง outline จาก `freeCodeCamp/freeCodeCamp` แทน

## ผลแต่ละแหล่ง

### JavaScript

| แหล่ง | ผลการเข้าถึง | สิ่งที่เห็นจริง |
|---|---|---|
| freeCodeCamp JavaScript v9 (`/learn/javascript-v9/`) | หน้าเว็บ: Codex เปิดได้ 0 บรรทัด · โครงสร้าง: Claude อ่านจาก `curriculum/structure/superblocks/javascript-v9.json` บน GitHub (outline เท่านั้น ไม่ได้อ่านบทเรียน) | 31 modules ตามลำดับ: variables-and-strings → booleans-and-numbers → functions → arrays → objects → loops → review fundamentals → higher-order functions/callbacks → DOM/events → a11y → debugging → regex → (lab) → form validation → dates → audio/video → (lab) → maps/sets → (lab) → localStorage/CRUD → classes/this → (lab) → recursion → data structures → algorithms → graphs/trees → dynamic programming → functional programming → asynchronous JS → (lab weather app) → review. แต่ละ module สลับ lecture → workshop → lab → review → quiz; functions มี workshop/lab 9 ชิ้น, loops 16 ชิ้น |
| Codecademy Introduction to JavaScript | syllabus เท่านั้น (Codex) | Welcome → types/built-in methods/variables → conditionals → functions → scope → arrays → loops; มีปุ่ม “Show all 10 modules” ส่วนที่เหลือไม่แสดง; ประกาศ 11 lessons, 12 projects, 9 quizzes |
| roadmap.sh JavaScript | partial (JS-rendered) | เห็นเฉพาะคำอธิบาย/FAQ ไม่เห็น diagram nodes จึงไม่ใช้เป็นหลักฐานลำดับ |
| MDN JavaScript Guide (ทางการ) | full page (Codex) | Introduction → Grammar/types → Control flow/error handling → Loops → Functions → Expressions/operators → Numbers/strings → Dates → Regex → Indexed collections → Keyed collections → Objects → Classes → Promises → … → Modules |

สิ่งที่นำมาใช้: ลำดับ values → conditions → functions → arrays/loops → objects → higher-order → async ตรงกันใน freeCodeCamp และ Codecademy; ทั้งคู่วางงานลงมือ (workshop/lab/project) ถี่ระหว่างแนวคิด ไม่รอจบคอร์ส; DOM แยกออกจากแกนภาษา

### TypeScript

| แหล่ง | ผลการเข้าถึง | สิ่งที่เห็นจริง |
|---|---|---|
| Codecademy Learn TypeScript | syllabus เท่านั้น (Claude) | Types → Functions → Complex Types → Union Types → Type Narrowing → Advanced Object Types; practice projects 3 รายการ, 7 quizzes |
| Codecademy Learn Intermediate TypeScript | syllabus เท่านั้น (Claude) | TypeScript Configuration → Class Types → Intermediate Type Narrowing → Generics → Next Steps; projects 3 รายการ |
| roadmap.sh TypeScript | หน้าเว็บ JS-rendered (เห็นแค่หัวหน้า) · topic files จาก repo สาธารณะ `nilbuild/developer-roadmap` (เดิม kamranahmedse) `roadmaps/typescript/content/` | 93 หัวข้อ (ไม่มีลำดับในชื่อไฟล์) เช่น introduction, typescript-vs-javascript, installation-and-configuration, tsconfigjson, tsc, primitive types, any/unknown/never/void, type-inference, type-aliases, interface, union/intersection/literal types, type-guards--narrowing, type-predicates, generics, generic-constraints, utility types (partial/pick/omit/record/…), classes/access-modifiers/abstract-classes, modules, mapped/conditional/template-literal types, decorators, namespaces |
| TypeScript Handbook (ทางการ) | full TOC (Claude) | The Basics → Everyday Types → Narrowing → More on Functions → Object Types → Type Manipulation (Generics, keyof, typeof, …) → Classes → Modules; Reference มี Utility Types; หน้าเว็บระบุ TypeScript 6.0 เป็นเวอร์ชันล่าสุด |

สิ่งที่นำมาใช้: เส้นทาง types → functions → object/complex types → unions → narrowing → interfaces → config/classes → generics ตรงกันทั้ง Codecademy และ Handbook; หัวข้อ mapped/conditional/template-literal types, decorators, namespaces, declaration merging เป็นขั้นสูง **ไม่ใส่ในคอร์สเริ่มต้น**

ข้อจำกัดของโปรเจกต์: repo ใช้ TypeScript 5.9.2 (devDependency) ส่วน Handbook แสดง 6.0 เนื้อหาจะสอนเฉพาะ feature ที่มีทั้งสองเวอร์ชันและตรวจตัวอย่างด้วย compiler ใน repo

### Node.js

| แหล่ง | ผลการเข้าถึง | สิ่งที่เห็นจริง |
|---|---|---|
| Codecademy Learn Node.js | syllabus เท่านั้น (Claude) | Welcome → What is the Back-End? → Introduction to Node.js → Node.js Essentials → Setting up a Server with HTTP → Next Steps; 2 practice projects, 3 quizzes |
| roadmap.sh Node.js | หน้าเว็บ JS-rendered · topic files จาก repo สาธารณะ | 113 หัวข้อ เช่น what-is-nodejs, nodejs-vs-browser, running-nodejs-code, commonjs/esm, npm/npx/semantic-versioning, fs-module, path-module, processargv/processenv/processcwd, callbacks/promises/asyncawait, event-loop, event-emitter, streams, http-module, expressjs, error-handling/uncaught-exceptions, testing/nodetest, debugging, worker-threads, cluster |
| Node.js Learn (ทางการ) | full nav (Claude) | Getting Started (introduction, Node vs browser, V8, npm, …) → Command Line (run scripts, REPL, output, input, env vars) → HTTP (Anatomy of an HTTP Transaction) → Manipulating Files (stats, paths, read, write, folders) → Asynchronous Work (callbacks, flow control, promises, timers, blocking vs non-blocking, event loop, EventEmitter, nextTick, setImmediate, don’t block the event loop) → TypeScript → Modules (streams, publishing) → Test Runner |
| Node.js previous releases (ทางการ) | full page (Claude) | v26 = Current, v24 (Krypton) = LTS, v22 (Jod) = LTS, v20 ลงไป = EOL |

สิ่งที่นำมาใช้: Node Fundamentals ควรสอน runtime → command line/process → modules/npm → files/path → async/event loop → HTTP module ก่อน Express ซึ่งตรงกับ Codecademy (HTTP server ก่อน framework) และ freeCodeCamp Back-end (core modules → npm → HTTP → Express); ใช้ Node 24 LTS เป็นเวอร์ชันอ้างอิงในบทเรียน (README เดิมระบุ ≥ 20.9 สำหรับตัวแอป ซึ่งเป็นคนละเรื่องกับ runtime ที่ผู้เรียนติดตั้ง)

### Back-end

| แหล่ง | ผลการเข้าถึง | สิ่งที่เห็นจริง |
|---|---|---|
| freeCodeCamp Back-End Development and APIs v9 | หน้าเว็บว่าง (WebFetch) · โครงสร้างจาก `back-end-development-and-apis-v9.json` บน GitHub (outline เท่านั้น) | introduction-to-nodejs → nodejs-core-modules (workshop file processor) → npm → lab prime checker module → HTTP and web standards (HTTP/DNS/TCP, request-response; workshop web server) → introduction-to-express → lab personal profile app → express-middleware (lab data sanitizer) → rest-api-and-web-services → lab timestamp microservice → error-handling (health checks; workshop bank API) → websockets → lab chat app → security-and-privacy → authentication (JWT protected routes) → lab family movie watchlist API → review → certification exam |
| Codecademy Back-End Engineer career path | syllabus บางส่วน (“Show all 41 units” ซ่อนส่วนที่เหลือ) | เห็น 7 units แรก: Welcome → dev environment → web fundamentals → JavaScript syntax I/II → interactive websites → JavaScript syntax III; portfolio projects ที่ประกาศ: Node console app + Git, Node/Express CRUD API, เพิ่ม PostgreSQL ให้ API เดิม |
| Codecademy Create a Back-End App with JavaScript | syllabus 8 units ครบ | JS fundamentals → conditionals/functions → arrays/loops/iterators → objects/modules → Express servers → SQL for back-end → connecting JavaScript and SQL |
| roadmap.sh Backend | หน้าเว็บแสดงแค่ FAQ · topic files จาก repo สาธารณะ | 156 หัวข้อ เช่น how-does-the-internet-work, what-is-http, rest, json-apis, open-api-specs, relational-databases, acid, transactions, normalization, database-indexes, n1-problem, orms, migrations, authentication, cookie-based-auth, token-authentication, jwt, oauth, bcrypt, cors, owasp-risks, unit/integration/functional testing, caching, message brokers, microservices |
| Express 5 migration guide (ทางการ) | full page | Express 5 เป็นเวอร์ชันหลักปัจจุบัน ต้อง Node ≥ 18; rejected promise ใน route ส่งต่อ error handler อัตโนมัติ; wildcard ต้องตั้งชื่อ (`/*splat`); `req.body` เป็น `undefined` ถ้าไม่มี body parser; `res.status(code).json(obj)` แทน signature เดิม |

สิ่งที่นำมาใช้: ลำดับ HTTP → Express → middleware → REST → error handling → security → authentication และการวาง lab หลังทุก 1–2 modules ตรงกันทั้งสองแพลตฟอร์ม; Codecademy วาง SQL หลัง Express แล้วจึงเชื่อม JS กับ SQL ซึ่งเราใช้เป็นแนวของ milestone “เพิ่มฐานข้อมูลให้ API เดิม”; WebSockets/microservices/message brokers เป็นขั้นต่อยอด **ไม่อยู่ในช่วงหลัก**

### Java และ Java OOP (Codex)

| แหล่ง | ผลการเข้าถึง | สิ่งที่เห็นจริง |
|---|---|---|
| Codecademy Learn Java | syllabus เท่านั้น | first program → variables → object-oriented Java → conditionals → arrays/ArrayLists → loops → string methods (เห็น 7 จาก 11 modules); 16 lessons, 14 projects, 15 quizzes |
| roadmap.sh Java | partial (JS-rendered) | เห็นเฉพาะคำอธิบาย/FAQ; prose แนะนำ core language/typing/OOP ก่อน ecosystem |
| Codecademy Java OOP | syllabus เท่านั้น | Classes, objects and methods → built-in classes; โมดูลแรก: classes/objects → objects as parameters → quiz → methods → quiz → 2 projects; prerequisite: Intro to Java |
| dev.java Learn (ทางการ) | full index | first steps (Getting Started, launching single-file source programs, JShell) → language basics (variables, primitives, arrays, operators, control flow; numbers/strings) → OOP (classes/objects, records, inheritance, interfaces, packages) → generics/lambdas/pattern matching → annotations/exceptions → collections/streams |

ข้อเท็จจริงด้านเวอร์ชันที่ Codex ยืนยันจาก dev.java: การรันไฟล์ source เดียวด้วย `java Main.java` มีตั้งแต่ JDK 11 จึงใช้ได้บน JDK 21; การรันหลายไฟล์ source ตรงมีตั้งแต่ JDK 22 — บทเรียนจึงใช้ `javac` + `java` สำหรับหลายไฟล์ เพื่อรองรับ JDK 21 LTS

## ข้อเสนอที่เราออกแบบเอง (ไม่ใช่ข้อค้นพบ)

1. ทุกคอร์สใช้วงจร 5 ขั้นเดิมต่อหัวข้อ (เข้าใจ → ทำนาย → ลงมือ → แก้บั๊ก → อธิบายเอง) และเพิ่มมาตรฐานบทเรียนใน `COURSE-PLAN.md`
2. JavaScript: แยก references/mutation เป็นหัวข้อของตัวเองก่อน callbacks; DOM และ async ไปอยู่ท้ายคอร์ส (DOM ในเว็บนี้ทดลองผ่าน lab ในเครื่อง เพราะ runner เป็น Worker ไม่มี DOM)
3. Java OOP: สอน composition และ interfaces **ก่อน** inheritance (Codex เสนอ และเราเห็นด้วย เพราะผู้เรียนมักใช้ inheritance เกินจำเป็น) ต่างจากลำดับของ dev.java โดยตั้งใจ
4. Back-end ใช้ Friends Activity Planner API เป็นโปรเจกต์ต่อเนื่อง ตามแนว “API → เพิ่มฐานข้อมูลภายหลัง” ที่เห็นใน Codecademy
5. ไม่ใส่หัวข้อเพื่อให้ครบ roadmap: เลือกเฉพาะที่จำเป็นต่อเป้าหมาย Full-stack/Back-end/Java ของซี

## ข้อจำกัดของการค้นคว้า

- Codecademy ทุกหน้าที่เปิด: เห็นเฉพาะ syllabus/ชื่อ module และบางหน้าซ่อน module ที่เหลือ ไม่ได้อ่านเนื้อหาบทเรียน
- roadmap.sh: diagram เป็น JS-rendered; รายการหัวข้อจาก repo สาธารณะเป็นชื่อไฟล์ ไม่มีลำดับหรือความสัมพันธ์ prerequisite
- freeCodeCamp: ใช้ JSON โครงสร้างหลักสูตรจาก GitHub ไม่ได้อ่าน lecture
- ไม่มีการ login หรือข้าม paywall

## แหล่งเครื่องมือรอบแก้หลัง audit (Codex, 2026-10-05)

อ่าน Node download/npm introduction, Git first setup, Adoptium Windows/Linux และ Playwright library ใหม่เพื่อแก้เครื่องมือ ดู URL สิ่งที่เข้าถึงได้และข้อจำกัดจริงใน [COURSE-REPAIR-EVIDENCE.md](COURSE-REPAIR-EVIDENCE.md#แหล่งที่เปิดจริงสำหรับงานใหม่) ไม่อ้างว่าเปิดบทของแพลตฟอร์มเรียนเต็มจาก syllabus; ตารางเดิมเป็นประวัติการค้นคว้ารอบก่อน

### R2-JS source access

Codex เปิด MDN Grammar/types, Loops and iteration และ String.replaceAll จริงใน2026-10-05; รายละเอียดการใช้และข้อจำกัดใน COURSE-REPAIR-EVIDENCE.md ส่วนR2-JS ไม่มีการอ้างว่าอ่านบทแพลตฟอร์มเต็มใหม่
