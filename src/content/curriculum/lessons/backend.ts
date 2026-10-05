import type { RichLesson } from "@/types/curriculum";

const local = "ตรวจเองในเครื่อง: บทนี้ต้องใช้ package (เช่น express) และรัน server ในเครื่อง เว็บไซต์ไม่ได้รันหรือตรวจ Express/SQL ให้";

export const backendLessons: Record<string, RichLesson> = {
  "be-rest-design": {
    hook: "ทีม front-end ต้องจำว่า endpoint นี้ส่ง error เป็น { msg } อีกตัวเป็น { error } และบางตัวตอบ 200 แม้จะล้มเหลว ทุกหน้าจอเลยเต็มไปด้วย if พิเศษ API ที่ออกแบบสม่ำเสมอตั้งแต่แรกช่วยให้ทั้งสองฝั่งทำงานเร็วขึ้นและพลาดน้อยลง",
    analogy: {
      title: "REST API เหมือนระบบชั้นวางในห้องสมุด",
      text: [
        "ห้องสมุดจัดหนังสือเป็นหมวดตามป้ายบนชั้น (สิ่งของ) ส่วนการกระทำ (ยืม คืน จอง) ทำผ่านเคาน์เตอร์ตามกติกาเดียวกันทุกหมวด ผู้ใช้จึงเดาได้ว่าต้องทำอย่างไรกับหมวดใหม่ที่ไม่เคยเห็น",
        "REST ใช้ path เป็นป้ายของสิ่งของ (/activities/42) และใช้ method เป็นการกระทำมาตรฐาน ผลลัพธ์บอกด้วย status ที่ทุก endpoint ใช้ความหมายเดียวกัน",
      ],
      mapping: [
        ["ป้ายหมวดและเลขหนังสือ", "path ของ resource เช่น /activities/42"],
        ["การกระทำที่เคาน์เตอร์ (ยืม/คืน/ดู)", "HTTP method (POST/DELETE/GET)"],
        ["ใบแจ้งผลจากเคาน์เตอร์", "status code และ error contract"],
        ["กติกาเดียวกันทุกหมวด", "ความสม่ำเสมอของ API ทั้งระบบ"],
      ],
      limits: "ห้องสมุดจริงมีการกระทำพิเศษได้ตามใจ แต่ HTTP มี method จำกัด บางงานจึงต้องออกแบบเป็น resource ใหม่ เช่นการเข้าร่วมกิจกรรมเป็น “สมาชิกของกิจกรรม” (POST /activities/42/members) แทนการสร้าง path แบบกริยา /joinActivity",
    },
    explain: [
      {
        heading: "1) path เป็นคำนาม method เป็นการกระทำ",
        text: [
          "collection: /activities, item: /activities/42, ความสัมพันธ์: /activities/42/members หลีกเลี่ยง path ที่เป็นกริยา เช่น /createActivity",
          "query string ใช้กรอง/เรียง/แบ่งหน้า: /activities?day=sat&limit=20",
        ],
      },
      {
        heading: "2) status ที่สื่อความหมาย",
        text: [
          "200 อ่าน/แก้สำเร็จ, 201 สร้างสำเร็จ, 204 สำเร็จแต่ไม่มี body (มักใช้กับ DELETE)",
          "400 ข้อมูลผิดรูปแบบ, 401 ยังไม่ยืนยันตัวตน, 403 ไม่มีสิทธิ์, 404 ไม่พบ, 409 ขัดกับสถานะปัจจุบัน, 500 server ผิดพลาด",
        ],
      },
      {
        heading: "3) error contract และ idempotency",
        text: [
          "ตกลงรูปแบบ error เดียว เช่น { error: { code, message, details? } } code เป็นคำคงที่ให้โปรแกรมใช้ตัดสินใจ message ให้คนอ่าน details บอก field ที่ผิด",
          "GET, PUT, DELETE ควร idempotent: ส่งซ้ำ (เช่นเน็ตสะดุดแล้ว retry) ไม่ทำให้ผลต่อระบบต่างจากส่งครั้งเดียว POST มักไม่ idempotent จึงต้องระวังการสร้างซ้ำ",
        ],
      },
    ],
    walkthrough: [
      "ตาราง routes แสดง method + path + ผลที่เป็นไปได้ของแต่ละ endpoint",
      "padEnd จัดคอลัมน์ method ให้ตรงกันเพื่ออ่านง่าย",
      "apiError สร้าง error ตามรูปแบบเดียว ใส่ details เฉพาะเมื่อมี",
    ],
    pitfalls: [
      "ตอบ 200 พร้อม { success: false }: client ใช้ response.ok ไม่ได้",
      "ใช้ path เป็นกริยาและ GET ที่เปลี่ยนข้อมูล: ไม่ปลอดภัยกับ cache/retry",
      "error แต่ละ endpoint คนละรูปแบบ: front-end ต้องเขียนกรณีพิเศษ",
      "ใช้ 400 กับทุกปัญหา: แยก 404/409/403 เพื่อให้ client ตัดสินใจได้ถูก",
    ],
    checks: [
      { question: "ลบกิจกรรมสำเร็จควรตอบอะไร", answer: "204 No Content (หรือ 200 พร้อมข้อมูลถ้าตกลงไว้) และเรียก DELETE ซ้ำควรได้ผลต่อระบบเหมือนเดิม (กิจกรรมยังถูกลบ) แม้ครั้งที่สองอาจตอบ 404" },
      { question: "สร้างกิจกรรมที่ชื่อว่างควรได้ 400 หรือ 409", answer: "400 เพราะข้อมูลผิดรูปแบบ ส่วน 409 ใช้เมื่อข้อมูลถูกแต่ขัดกับสถานะปัจจุบัน" },
    ],
    recap: [
      "path = คำนาม, method = การกระทำ, query = กรอง/เรียง",
      "status สื่อผลจริง 2xx/4xx/5xx",
      "error contract เดียวทั้ง API",
    ],
    traceHint: "สำหรับแต่ละ endpoint ถามสามข้อ: เปลี่ยนข้อมูลไหม (method), อะไรผิดได้บ้าง (status), ถ้าส่งซ้ำจะเกิดอะไร (idempotency)",
    practiceHints: [
      "เริ่มจากระบุ resource ใหม่: ช่วงเวลา (slot) เป็นของกิจกรรม และโหวตเป็นของช่วงเวลา",
      "slot ใช้ /activities/:id/slots, โหวตของตัวเองใช้ PUT/DELETE กับ /activities/:id/slots/:slotId/votes/me ซึ่ง idempotent",
      "voteErrorFor คืน { status, body } โดย body ใช้รูปแบบ { error: { code, message } } และเลือก 404/400/409 ตามสถานการณ์",
    ],
    acceptance: [
      "ตัวอย่างพิมพ์ตาราง endpoint และ error ตาม expected output (Run ได้บนเว็บ)",
      "ตรวจเอง: การออกแบบ slot/vote ใช้ path เป็นคำนามและ method ตรงความหมาย",
      "ตรวจเอง: ทุก error ใช้รูปแบบเดียวกัน และเลือก status ต่างกันตามสถานการณ์",
    ],
    solutionNotes: [
      "PUT .../votes/me ทำให้โหวตซ้ำได้ผลเท่าเดิม (idempotent) ส่วน POST อาจสร้างโหวตซ้ำถ้า client retry",
      "ใช้ /me แทนการรับ userId จาก body เพื่อไม่ให้โหวตแทนคนอื่นได้ (จะเรียนต่อในบท authorization)",
    ],
    reflection: [
      "API ที่ซีเคยเรียกหรือเขียน มี endpoint ไหนที่ status หรือ error ไม่สม่ำเสมอ และส่งผลต่อ front-end อย่างไร",
    ],
    extension: "เขียนสเปก OpenAPI (YAML) สั้น ๆ สำหรับ GET /activities และ POST /activities แล้วลองเปิดด้วยเครื่องมืออ่าน OpenAPI ในเครื่อง",
  },
  "node-express-route": {
    hook: "server จาก node:http ในคอร์สก่อนต้องแยก path ด้วย regex เอง อ่าน body ทีละ chunk เอง และตั้ง header JSON เองทุกครั้ง Express ทำงานซ้ำเหล่านี้ให้ เหลือแค่สิ่งที่เป็นของ API เรา",
    explain: [
      {
        heading: "1) app และ route",
        text: [
          "import express from \"express\" แล้ว const app = express() app.get/post/patch/delete(path, handler) ลงทะเบียนตาม method",
          "path ใส่ parameter ได้: /activities/:id แล้วอ่านจาก req.params.id (เป็น string เสมอ)",
        ],
      },
      {
        heading: "2) ตอบด้วย res.status().json()",
        text: [
          "res.json(data) ตั้ง Content-Type: application/json และส่ง res.status(201).json(data) ตั้ง status ก่อน res.status(204).end() สำหรับไม่มี body",
          "Express 5 ถอดรูปแบบเก่า res.json(obj, status) และ res.send(status) ออก ใช้ res.status(code).json(body) / res.sendStatus(code)",
        ],
      },
      {
        heading: "3) แยก app ออกจาก server",
        text: [
          "app.mjs export app (หรือ createApp()) ส่วน server.mjs เป็นคน listen ทำให้ test import app ไปเปิดบน port 0 ได้โดยไม่ชนกับ server ที่รันอยู่",
          "ติดตั้งด้วย npm install express (Express 5 ต้องใช้ Node 18+)",
        ],
      },
    ],
    walkthrough: [
      "ลงทะเบียน GET /activities และ GET /health",
      "listen(0) ให้ระบบเลือก port แล้วรอ event listening",
      "fetch /activities ได้ 200 และ array (Node แสดงในรูปแบบ console.log)",
      "fetch /nope ไม่มี route จึงได้ 404 ค่าเริ่มต้นของ Express ที่เป็น HTML",
    ],
    pitfalls: [
      "ตอบซ้ำในกิ่งเดียวกัน: ERR_HTTP_HEADERS_SENT ใส่ return",
      "เปรียบเทียบ req.params.id กับตัวเลขโดยไม่แปลง: \"1\" === 1 เป็น false",
      "ใช้ signature เก่าของ Express 4 เช่น res.json(obj, 201)",
      "listen ในไฟล์เดียวกับ app: test ต้องเปิด port จริงซ้ำ",
    ],
    checks: [
      { question: "req.params.id ของ GET /activities/42 มีชนิดอะไร", answer: "string \"42\" ต้องแปลงด้วย Number() ก่อนเทียบกับ id ที่เป็นตัวเลข" },
      { question: "ทำไม 404 ของ Express เป็น HTML", answer: "เป็น handler ค่าเริ่มต้นเมื่อไม่มี route ตรง API ควรเพิ่ม 404 handler ที่ตอบ JSON เอง" },
    ],
    recap: [
      "app.METHOD(path, handler); params เป็น string",
      "res.status(code).json(body) ใน Express 5",
      "แยก app กับ server เพื่อ test",
    ],
    traceHint: "สำหรับแต่ละ fetch ระบุ route ที่ตรง (หรือไม่มี) แล้วเขียน status, Content-Type และ body ที่ได้",
    practiceHints: [
      "app.mjs export app และไม่เรียก listen เอง",
      "GET /activities/:id แปลง req.params.id ด้วย Number แล้ว find ถ้าไม่เจอ return res.status(404).json({ error: ... })",
      "server.mjs: import { app } from \"./app.mjs\"; app.listen(3000, () => console.log(\"http://localhost:3000\")) แล้ว curl -i ทั้งกรณีเจอและไม่เจอ",
    ],
    acceptance: [
      local,
      "ตรวจเอง: GET /activities ได้ 200 และ array",
      "ตรวจเอง: GET /activities/1 ได้ 200 และ /activities/99 ได้ 404 รูปแบบ { error: { code, message } }",
    ],
    solutionNotes: [
      "return หน้า res.status(404) ทำให้ไม่ไปถึง res.json ด้านล่าง",
      "Number(\"abc\") ได้ NaN ซึ่งไม่ตรงกับ id ใด จึงได้ 404 — ถ้าต้องการ 400 สำหรับ id ที่ไม่ใช่ตัวเลขให้ตรวจเพิ่ม (บทถัดไป)",
    ],
    reflection: [
      "เทียบ server node:http ในคอร์ส Node กับ Express: งานไหนที่ Express ทำแทนให้ และงานไหนที่ยังเป็นความรับผิดชอบของเรา",
    ],
    extension: "เพิ่ม GET /activities?limit=1 ที่ตัดผลตามจำนวน และตอบ 400 ถ้า limit ไม่ใช่จำนวนเต็มบวก",
  },
  "node-input": {
    hook: "API รับกิจกรรมใหม่โดยเชื่อ req.body ทั้งก้อน วันหนึ่งมีคนส่ง capacity เป็น \"lots\" และอีกคนแอบส่ง joined: 999 มาด้วย ข้อมูลเสียเข้าไปปนตั้งแต่ประตูหน้า ทุกส่วนข้างในต้องคอยตรวจซ้ำ",
    explain: [
      {
        heading: "1) สามแหล่งของ input",
        text: [
          "req.params จาก path, req.query จาก ?a=1&b=2, req.body จากเนื้อหา request (ต้องมี app.use(express.json()) ก่อน)",
          "params และ query เป็น string เสมอ (query อาจเป็น array ถ้าส่ง key ซ้ำ ?day=sat&day=sun) ต้องตรวจชนิดและแปลงเอง",
        ],
      },
      {
        heading: "2) validate ที่ขอบแล้วส่งต่อเฉพาะข้อมูลที่สะอาด",
        text: [
          "function validateX(input) คืน { ok: true, value } หรือ { ok: false, errors } โดย value มีเฉพาะ field ที่อนุญาตและผ่านการ trim/แปลงแล้ว",
          "รวบรวม error ทุก field ในครั้งเดียว ผู้ใช้จะแก้ฟอร์มได้ครบในรอบเดียว",
        ],
      },
      {
        heading: "3) ไม่แปลงชนิดให้แบบเงียบ ๆ",
        text: [
          "ถ้า API ประกาศว่า capacity เป็น number การรับ \"5\" แล้วแปลงให้อาจซ่อนบั๊กของ client ตอบ 400 ให้ชัดดีกว่า",
          "ยกเว้น query string ซึ่งเป็น string โดยธรรมชาติ ต้องแปลงเองและตอบ 400 เมื่อแปลงไม่ได้",
        ],
      },
    ],
    walkthrough: [
      "express.json() แปลง body JSON เป็น object ก่อนถึง handler",
      "validateActivity ตรวจ title หลัง trim และ capacity ต้องเป็นจำนวนเต็ม 2–9 รวม error ทั้งสอง field",
      "request แรกผิดทั้งสอง field ได้ 400 พร้อม details request ที่สองผ่านได้ 201 และชื่อถูก trim",
      "GET /search แปลง limit จาก string เป็นตัวเลขเอง",
    ],
    pitfalls: [
      "ลืม express.json(): req.body เป็น undefined (Express 5)",
      "เก็บ req.body ทั้งก้อน: mass assignment",
      "ตรวจทีละ field แล้วตอบทันทีที่เจอข้อแรก: ผู้ใช้ต้องส่งหลายรอบ",
      "ใช้ typeof query === \"number\": query เป็น string เสมอ",
    ],
    checks: [
      { question: "?day=sat&day=sun ทำให้ req.query.day เป็นอะไร", answer: "array [\"sat\", \"sun\"] ใน Express จึงต้องตรวจว่าเป็น string ก่อนใช้" },
      { question: "ทำไม validate ควรคืนข้อมูลใหม่ (value) แทนการบอกแค่ผ่าน/ไม่ผ่าน", answer: "เพื่อให้ส่วนถัดไปใช้เฉพาะข้อมูลที่ตรวจและทำความสะอาดแล้ว ไม่หยิบ field อื่นจาก req.body ไปใช้โดยไม่ตั้งใจ" },
    ],
    recap: [
      "params/query เป็น string; body ต้องมี express.json()",
      "validate คืน { ok, value } หรือ { ok, errors }",
      "ใช้เฉพาะ value ที่ผ่านการตรวจ",
    ],
    traceHint: "สำหรับแต่ละ request เขียนค่า body ที่ server เห็น แล้วไล่เงื่อนไขของ validateActivity ทีละ field",
    practiceHints: [
      "ขยาย validateActivity จากตัวอย่างให้มี day และขอบเขตความยาวของ title",
      "DAYS.includes(body?.day) ตรวจวัน และรวม error ลง object เดียว คืน value ที่มีเฉพาะ title/capacity/day",
      "parseDayQuery: ไม่ส่งมา → ok แบบไม่กรอง, ส่งมาเป็น string ที่อยู่ใน DAYS → ok, นอกนั้น → ไม่ ok แล้ว route ตอบ 400",
    ],
    acceptance: [
      local,
      "ตรวจเอง: POST ข้อมูลผิดหลาย field ได้ 400 พร้อม details ครบทุก field",
      "ตรวจเอง: POST ข้อมูลถูกได้ 201 และไม่มี field แปลกปลอมที่ client แอบส่งมา",
      "ตรวจเอง: GET /activities?day=funday ได้ 400",
    ],
    solutionNotes: [
      "body?.title ใช้ optional chaining เพราะ body อาจเป็น undefined เมื่อ client ไม่ส่ง JSON",
      "ในงานจริงนิยมใช้ library ตรวจ schema (เช่น Zod) แต่หลักเดียวกัน: ตรวจที่ขอบ คืนข้อมูลที่สะอาด",
    ],
    reflection: [
      "ฟอร์มไหนในเว็บที่ซีเคยทำ ที่ตรวจเฉพาะฝั่ง browser แต่ไม่ได้ตรวจฝั่ง server",
    ],
    extension: "เพิ่ม validateActivityPatch สำหรับ PATCH ที่ทุก field optional แต่ถ้าส่งมาต้องถูกต้อง และต้องมีอย่างน้อยหนึ่ง field",
  },
  "node-middleware": {
    hook: "ซีอยากรู้ว่า request ไหนช้า เลยใส่ console.log จับเวลาในทุก route สามสิบจุด พอจะเปลี่ยนรูปแบบ log ต้องแก้สามสิบที่ middleware ทำงานที่ต้องเกิดกับหลาย request ไว้ในที่เดียว",
    analogy: {
      title: "middleware เหมือนจุดตรวจที่ผู้โดยสารเดินผ่านในสนามบิน",
      text: [
        "ผู้โดยสารผ่านจุดเช็กอิน ตรวจกระเป๋า และตรวจหนังสือเดินทางตามลำดับ แต่ละจุดเลือกได้ว่าจะปล่อยผ่านไปจุดถัดไป หรือหยุดผู้โดยสารไว้ตรงนั้น ถ้าไม่มีจุดไหนปล่อยหรือหยุด ผู้โดยสารจะค้างอยู่กลางทาง",
        "request ผ่าน middleware ตามลำดับที่ลงทะเบียน แต่ละตัวเรียก next() เพื่อปล่อยผ่าน หรือตอบเองเพื่อหยุด",
      ],
      mapping: [
        ["จุดตรวจแต่ละจุด", "middleware แต่ละตัว"],
        ["ลำดับของจุดตรวจ", "ลำดับการเรียก app.use/route"],
        ["ปล่อยผ่านไปจุดถัดไป", "next()"],
        ["หยุดและแจ้งผู้โดยสาร", "res.status(...).json(...) โดยไม่เรียก next"],
        ["ส่งไปห้องปัญหาพิเศษ", "next(error) ไปหา error middleware"],
      ],
      limits: "จุดตรวจจริงอาจทำงานพร้อมกันหลายคิว แต่ middleware ของ request หนึ่งทำตามลำดับทีละตัวเสมอ และ middleware ที่อยู่หลัง route ที่ตอบแล้วจะไม่ถูกเรียกเลย",
    },
    explain: [
      {
        heading: "1) (req, res, next) และสามทางเลือก",
        text: [
          "ตอบเองแล้วจบ, เรียก next() ให้ตัวถัดไป, หรือ next(error) ไปหา error middleware ต้องเลือกหนึ่งทางเสมอ",
          "middleware แนบข้อมูลให้ตัวถัดไปได้ เช่น req.user หรือ res.locals.startedAt",
        ],
      },
      {
        heading: "2) ขอบเขตการใช้",
        text: [
          "app.use(fn) ทุก request, app.use(\"/admin\", fn) เฉพาะ path ที่ขึ้นต้นด้วย /admin, app.get(\"/x\", fnA, fnB, handler) เฉพาะ route นั้น",
          "express.json() ก็คือ middleware ที่อ่าน body แล้วใส่ req.body",
        ],
      },
      {
        heading: "3) ลำดับคือพฤติกรรม",
        text: [
          "logger และ express.json() ไว้ต้น ๆ, การตรวจสิทธิ์ไว้ก่อน route ที่ต้องป้องกัน, 404 handler และ error middleware ไว้ท้ายสุด",
          "res.on(\"finish\") ใช้รู้ status และเวลาเมื่อ response ส่งเสร็จ เหมาะกับ logger",
        ],
      },
    ],
    walkthrough: [
      "logger ทำงานก่อนทุก request แล้ว next()",
      "requireApiKey ใช้เฉพาะ /reports: ไม่มี key ตอบ 401 แล้วหยุด มี key เรียก next()",
      "handler ทำงานเฉพาะ request ที่ผ่านการตรวจ",
      "log แสดงลำดับจริงของทั้งสอง request",
    ],
    pitfalls: [
      "ลืม next(): request ค้าง",
      "ตอบแล้วยัง next(): handler ถัดไปทำงานและตอบซ้ำ",
      "วาง middleware ตรวจสิทธิ์ไว้หลัง route: route ทำงานก่อนตรวจ",
      "middleware async ที่ throw ใน Express 4 ไม่ถูกส่งต่อ (Express 5 ส่งต่อให้)",
    ],
    checks: [
      { question: "app.use(\"/api\", fn) ทำงานกับ /api/activities ไหม และกับ /apiary ไหม", answer: "ทำงานกับ /api/activities (path ขึ้นต้นด้วย /api ตามขอบเขต segment) แต่ไม่ทำงานกับ /apiary" },
      { question: "ทำไม 404 handler ต้องอยู่ท้ายสุด", answer: "เพราะถ้าอยู่ก่อน route จะตอบ 404 ให้ทุก request ก่อน route จริงมีโอกาสทำงาน" },
    ],
    recap: [
      "middleware = (req, res, next): ตอบ หรือ next หรือ next(err)",
      "ลำดับการลงทะเบียน = ลำดับการทำงาน",
      "งานร่วม (log, parse, auth) ไว้ที่ middleware ที่เดียว",
    ],
    traceHint: "ทำแถบเส้นเวลาสำหรับแต่ละ request: middleware ไหนถูกเรียก, ตัวไหนเรียก next, ตัวไหนตอบและจบ",
    practiceHints: [
      "requestTimer: จดเวลาเริ่มก่อน next() แล้วคำนวณตอน res.on(\"finish\")",
      "requireJson ตรวจเฉพาะ POST/PATCH ด้วย req.is(\"application/json\") ถ้าไม่ใช่ตอบ 415 แล้ว return",
      "ลำดับใน app.mjs: requestTimer → express.json() → requireJson → routes → 404 → error middleware",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ทุก request พิมพ์ method, path, status และเวลา",
      "ตรวจเอง: POST โดยไม่ตั้ง Content-Type ได้ 415 ตามรูปแบบ error ของ API",
      "ตรวจเอง: GET ไม่ถูก requireJson ปฏิเสธ",
    ],
    solutionNotes: [
      "req.originalUrl ให้ path เต็มแม้ middleware ถูก mount ใต้ prefix",
      "res.on(\"finish\") ทำงานหลังส่ง response แล้ว จึงไม่ทำให้ request ช้าลง",
    ],
    reflection: [
      "งานไหนใน planner-api ที่ซ้ำกันในหลาย route และควรย้ายเป็น middleware",
    ],
    extension: "เพิ่ม requestId middleware ที่สร้าง id สุ่ม (crypto.randomUUID) ใส่ใน header X-Request-Id และใส่ใน log เพื่อตามรอย request หนึ่งรายการ",
  },
  "node-errors": {
    hook: "API ของกลุ่มเพื่อนพังแล้วส่ง stack trace ยาวพร้อม path ไฟล์ในเครื่องให้ผู้ใช้เห็น อีก endpoint ตอบ 500 ทั้งที่จริงแค่ไม่พบกิจกรรม การจัดการ error ที่ดีแยกปัญหาของผู้ใช้ออกจากปัญหาของระบบ และพูดภาษาเดียวกันทั้ง API",
    explain: [
      {
        heading: "1) error middleware ตัวเดียวท้ายสุด",
        text: [
          "app.use((err, req, res, next) => {...}) ต้องมีสี่ parameter Express จึงรู้ว่าเป็นตัวจัดการ error",
          "ทุก route ใช้แค่ throw (หรือ next(err)) แล้วให้ตัวนี้ตัดสินใจรูปแบบคำตอบ",
        ],
      },
      {
        heading: "2) Express 5 ส่ง async error ให้เอง",
        text: [
          "handler แบบ async ที่ throw หรือ await Promise ที่ reject จะถูกส่งเข้า error middleware อัตโนมัติ",
          "Express 4 ไม่ทำ ต้องเขียน try/catch แล้ว next(err) ใน handler ทุกตัว — ถ้าอ่าน tutorial เก่าจะเห็นแบบนั้น",
        ],
      },
      {
        heading: "3) error ที่คาดไว้ vs ไม่คาดคิด",
        text: [
          "error ที่ออกแบบไว้ (ไม่พบ, ข้อมูลผิด, ขัดแย้ง) สร้างเป็น HttpError ที่มี status/code แล้วตอบตรง ๆ",
          "error อื่นทั้งหมดเป็น 500: log รายละเอียดฝั่ง server (stack, request id) แต่ตอบ client ด้วยข้อความทั่วไป",
        ],
      },
    ],
    walkthrough: [
      "/activities/1 พบข้อมูล ตอบ 200",
      "/activities/9 throw HttpError 404 ใน async handler Express 5 ส่งเข้า error middleware ซึ่งตอบตาม status/code",
      "/crash ทำ JSON.parse พัง เป็น error ที่ไม่ใช่ HttpError จึงตอบ 500 ทั่วไปและจดชื่อ error ไว้ฝั่ง server",
      "/nope ไม่มี route จึงถึง 404 handler ที่ตอบ JSON",
    ],
    pitfalls: [
      "ส่ง err.message หรือ err.stack ของ error ที่ไม่คาดคิดให้ client: รั่วข้อมูลภายใน",
      "วาง error middleware ก่อน route: ไม่ได้รับ error",
      "error middleware มีแค่สาม parameter: Express มองเป็น middleware ธรรมดา",
      "ตอบ 500 กับข้อมูลผิดของผู้ใช้: client คิดว่าเป็นปัญหาของ server แล้ว retry ไปเรื่อย ๆ",
    ],
    checks: [
      { question: "ใน Express 4 handler async ที่ throw จะเกิดอะไรถ้าไม่ได้ try/catch", answer: "Promise ถูก reject โดยไม่มีใครจับ request ค้างหรือได้ unhandled rejection Express 5 แก้ปัญหานี้โดยส่งเข้า error middleware ให้" },
      { question: "ทำไม error 500 ควรตอบข้อความทั่วไป", answer: "เพราะรายละเอียดภายใน (stack, SQL, path) ไม่ช่วยผู้ใช้ และเปิดเผยโครงสร้างระบบให้ผู้โจมตี" },
    ],
    recap: [
      "error middleware (err, req, res, next) ไว้ท้ายสุด",
      "Express 5 ส่ง async error ให้อัตโนมัติ",
      "HttpError สำหรับที่คาดไว้; 500 + log ฝั่ง server สำหรับที่เหลือ",
    ],
    traceHint: "สำหรับแต่ละ path ไล่ว่า error เกิดที่ไหน (หรือไม่เกิด) วิ่งไปถึง middleware ตัวไหน และกิ่งไหนตอบ",
    practiceHints: [
      "HttpError เก็บ status, code, details และ helper notFound/conflict/invalid สร้าง error ที่ใช้บ่อย",
      "route เปลี่ยนจาก res.status(404).json(...) เป็น throw notFound(\"...\")",
      "error middleware: ถ้า instanceof HttpError ตอบตาม field ของมัน (ใส่ details เมื่อมี) นอกนั้น console.error(err) แล้วตอบ 500 ทั่วไป",
    ],
    acceptance: [
      local,
      "ตรวจเอง: 404 ทั้งกรณี path ไม่มีและกิจกรรมไม่มีเป็น JSON",
      "ตรวจเอง: validation ผิดได้ 400 พร้อม details",
      "ตรวจเอง: error ที่ไม่คาดคิดได้ 500 ข้อความทั่วไป และรายละเอียดอยู่ใน log ฝั่ง server เท่านั้น",
    ],
    solutionNotes: [
      "รวมการแปลง error ไว้ที่เดียว ทำให้เปลี่ยนรูปแบบ error ทั้ง API ได้ในไฟล์เดียว",
      "ในงานจริงควร log พร้อม request id และส่งไประบบเก็บ log (ไม่ใช่แค่ console)",
    ],
    reflection: [
      "ถ้าผู้ใช้เห็นข้อความ “เกิดข้อผิดพลาดภายใน” เขาควรทำอะไรต่อ และ API ช่วยอะไรได้อีก (เช่นแนบ request id)",
    ],
    extension: "แนบ requestId จาก middleware บทก่อนลงใน error 500 ({ error: { code, message, requestId } }) เพื่อให้ผู้ใช้แจ้งปัญหาพร้อมรหัสที่ค้น log ได้",
  },
  "be-project-planner-api-1": {
    hook: "CLI ของ M4 ใช้ได้เฉพาะคนที่มีไฟล์ในเครื่อง M5 เปลี่ยน logic เดิมให้เป็นบริการที่เพื่อนทุกคนเรียกผ่าน HTTP ได้ และวางโครงสร้างที่จะเปลี่ยนไปใช้ฐานข้อมูลได้โดยไม่ต้องรื้อ",
    explain: [
      {
        heading: "1) store: ที่เดียวที่รู้ว่าข้อมูลเก็บอย่างไร",
        text: [
          "createStore() คืน object ที่มี method list/get/create/update/remove/join ข้างในใช้ Map",
          "method คืนผลเป็นภาษาของระบบ ({ status: \"full\" }) ไม่ใช่ HTTP status",
        ],
      },
      {
        heading: "2) createApp(store): route บาง ๆ",
        text: [
          "route อ่าน input → validate → เรียก store → แปลงผลเป็น status/JSON",
          "รับ store เป็น parameter ทำให้ test สร้าง store ใหม่ได้ทุกครั้ง และ M6 ส่ง repository ที่ใช้ฐานข้อมูลเข้ามาแทน",
        ],
      },
      {
        heading: "3) test ผ่าน HTTP จริง",
        text: [
          "listen(0) + fetch ทดสอบทั้ง routing, middleware, validation และ error contract ในครั้งเดียว",
          "ปิด server หลังแต่ละ test เสมอ ไม่งั้น node --test จะค้าง",
        ],
      },
    ],
    walkthrough: [
      "สร้างกิจกรรมที่รับ 2 คน",
      "ซีเข้าร่วมได้ 201, ซีซ้ำได้ 409, ต้นเข้าได้ 201 (เต็มพอดี), ฝนได้ 409 เพราะเต็ม",
      "GET /activities แสดงสมาชิกสองคน",
    ],
    pitfalls: [
      "แก้ object ใน Map โดยตรงแล้วคืน reference เดิม: ผู้เรียกแก้ข้อมูลใน store ได้ (สร้าง object ใหม่ตอนอัปเดต)",
      "ให้ store คืน HTTP status: ผูก store กับ Express",
      "test ใช้ store ร่วมกัน: ผลขึ้นกับลำดับ",
    ],
    checks: [
      { question: "ทำไม join คืน { status: \"full\" } แทนการ throw HttpError(409)", answer: "store ไม่ควรรู้จัก HTTP route เป็นคนแปลงผลเป็น 409 ทำให้ store ใช้ได้กับ CLI/test โดยตรง" },
      { question: "ข้อมูลของ M5 จะเป็นอย่างไรเมื่อ restart server", answer: "หายทั้งหมดเพราะอยู่ในหน่วยความจำ M6 จะแก้ด้วยฐานข้อมูล" },
    ],
    recap: [
      "store = ที่เก็บข้อมูลเดียว คืนผลเป็นภาษาของระบบ",
      "createApp(store) = route บาง ๆ",
      "test ผ่าน HTTP จริงด้วย listen(0)",
    ],
    traceHint: "ไล่ค่า members และ capacity หลังการเรียก join แต่ละครั้ง พร้อม status ที่ route ตอบ",
    practiceHints: [
      "เริ่มจาก store ให้ครบทุก method แล้วทดสอบด้วยการเรียกตรง ๆ ก่อนต่อกับ route",
      "route ทุกตัวตาม pattern: validate → store → map ผลเป็น status (ใช้ HttpError จากบทก่อน)",
      "api.test.mjs: helper startApp() คืน { base, close } สร้าง store ใหม่ทุกครั้ง แล้วเขียน test ทีละ endpoint ทั้งกรณีสำเร็จและผิด",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ทุก endpoint ตาม practice prompt ทำงานพร้อม status ที่ระบุ",
      "ตรวจเอง: ลด capacity ต่ำกว่าจำนวนสมาชิกได้ 409",
      "ตรวจเอง: node --test ผ่านอย่างน้อย 8 กรณีและไม่ค้าง",
    ],
    solutionNotes: [
      "update/join สร้าง object ใหม่แล้ว set กลับลง Map แทนการแก้ object เดิม ลดปัญหา reference ที่เรียนในคอร์ส JS",
      "กฎ “ลด capacity ต่ำกว่าสมาชิกไม่ได้” อยู่ใน store เพราะเป็นกฎของข้อมูล ไม่ใช่ของ HTTP",
    ],
    reflection: [
      "ถ้าต้องเปลี่ยน Map เป็นฐานข้อมูลพรุ่งนี้ ไฟล์ไหนต้องแก้ และไฟล์ไหนไม่ต้องแตะเลย",
    ],
    extension: "เพิ่ม DELETE /activities/:id/members/:name สำหรับออกจากกิจกรรม พร้อม test กรณีออกแล้วเข้าใหม่ได้",
  },
  "be-sql-basics": {
    hook: "API ของ M5 ลืมทุกอย่างทุกครั้งที่ restart และถ้าโค้ดเผลอบันทึก capacity เป็น 50 ก็ไม่มีอะไรหยุดได้ ฐานข้อมูลเชิงสัมพันธ์เก็บข้อมูลถาวรและบังคับกติกาของข้อมูลได้เองโดยไม่ต้องเชื่อทุกบรรทัดของโค้ด",
    explain: [
      {
        heading: "1) ตาราง คอลัมน์ และชนิด",
        text: [
          "CREATE TABLE กำหนดคอลัมน์และชนิด เช่น INTEGER, TEXT, BOOLEAN, TIMESTAMPTZ (เวลาพร้อม timezone) ทุกแถวต้องตรงตามนี้",
          "id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ให้ฐานข้อมูลสร้าง id ที่ไม่ซ้ำให้ (รูปแบบมาตรฐาน SQL ส่วน SERIAL เป็นรูปแบบเก่าที่ยังพบได้)",
        ],
      },
      {
        heading: "2) constraint คือกติกาที่ฐานข้อมูลบังคับ",
        text: [
          "NOT NULL ห้ามว่าง, UNIQUE ห้ามซ้ำ, CHECK (เงื่อนไข) ต้องเป็นจริง, PRIMARY KEY = NOT NULL + UNIQUE",
          "ละเมิดเมื่อไรคำสั่งนั้น error และไม่มีอะไรถูกบันทึก — เป็นด่านสุดท้ายแม้โค้ดส่วนไหนจะลืมตรวจ",
        ],
      },
      {
        heading: "3) CRUD ด้วย SQL",
        text: [
          "INSERT INTO t (cols) VALUES (...) · SELECT cols FROM t WHERE ... ORDER BY ... LIMIT n · UPDATE t SET col = v WHERE ... · DELETE FROM t WHERE ...",
          "string ใน SQL ใช้ single quote ('Hiking') ส่วนชื่อตาราง/คอลัมน์ไม่ต้องมีเครื่องหมาย",
          "ฝึกในเครื่องได้สองทาง: PGlite ผ่าน script สั้น ๆ (ติดตั้ง npm install @electric-sql/pglite) หรือ psql กับ PostgreSQL จริง",
        ],
      },
    ],
    walkthrough: [
      "สร้างตาราง activities พร้อม CHECK สามข้อ",
      "INSERT สามแถว ได้ id 1, 2, 3",
      "UPDATE เฉพาะ Movie night เป็น 5 ที่นั่ง แล้ว DELETE กิจกรรมวันศุกร์ (Board game)",
      "SELECT กิจกรรมวันเสาร์เรียงตาม capacity จากมากไปน้อย ได้ Hiking แล้ว Movie night",
    ],
    pitfalls: [
      "UPDATE/DELETE ไม่มี WHERE: กระทบทุกแถว รัน SELECT ด้วย WHERE เดียวกันก่อนเสมอ",
      "ใช้ double quote กับ string: \"Hiking\" คือชื่อคอลัมน์ ไม่ใช่ข้อความ",
      "พึ่ง validation ในโค้ดอย่างเดียว: ใส่ constraint ที่สำคัญในฐานข้อมูลด้วย",
      "ใช้ชื่อเป็นเงื่อนไขแก้ข้อมูล: ชื่อซ้ำได้ ใช้ primary key",
    ],
    checks: [
      { question: "INSERT ที่ละเมิด CHECK หนึ่งข้อในคำสั่งที่เพิ่มหลายแถวพร้อมกัน จะบันทึกแถวที่ถูกไหม", answer: "ไม่ คำสั่งเดียวสำเร็จทั้งหมดหรือล้มเหลวทั้งหมด" },
      { question: "SELECT * FROM activities WHERE day = \"sat\" ผิดอย่างไร", answer: "\"sat\" ถูกตีความเป็นชื่อคอลัมน์ ต้องใช้ 'sat'" },
    ],
    recap: [
      "ตาราง + ชนิด + primary key",
      "constraint = กติกาที่ฐานข้อมูลบังคับ",
      "UPDATE/DELETE ต้องมี WHERE เสมอ",
    ],
    traceHint: "เขียนตารางบนกระดาษหลังแต่ละคำสั่ง (INSERT, UPDATE, DELETE) แล้วกรองตาม WHERE ของ SELECT สุดท้าย",
    practiceHints: [
      "เริ่มจาก CREATE TABLE ให้มี constraint ครบตามโจทย์ (email ต้อง UNIQUE และ NOT NULL)",
      "INSERT หลายแถวในคำสั่งเดียวด้วย VALUES (...), (...) แล้วลองแถวที่ email ซ้ำ/อายุ 10 แยกคำสั่งเพื่อดู error",
      "SELECT name, email FROM members WHERE age >= 18 ORDER BY name; — ฝึกด้วย script: const db = new PGlite(); const res = await db.exec(sql); แล้วพิมพ์ res.at(-1).rows",
    ],
    acceptance: [
      "ตรวจเองในเครื่อง: ใช้ PGlite หรือ psql เว็บไซต์ไม่ได้รัน SQL",
      "ตรวจเอง: email ซ้ำและอายุ 10 ถูกฐานข้อมูลปฏิเสธ",
      "ตรวจเอง: SELECT ได้เฉพาะสมาชิกอายุ 18 ขึ้นไปเรียงตามชื่อ",
    ],
    solutionNotes: [
      "age เป็น nullable ตามโจทย์ (ไม่มี NOT NULL) CHECK (age >= 13) จะผ่านเมื่อ age เป็น NULL เพราะเงื่อนไขกับ NULL ไม่เป็น false — ถ้าต้องบังคับให้มีอายุ ใส่ NOT NULL ด้วย",
      "การเรียงชื่อภาษาไทยขึ้นกับ collation ของฐานข้อมูล ผลอาจต่างกันระหว่าง PGlite กับ PostgreSQL ที่ตั้งภาษาไว้",
    ],
    reflection: [
      "กติกาไหนของ Planner ที่ควรอยู่ในฐานข้อมูล (constraint) และกติกาไหนควรอยู่ในโค้ด (เพราะซับซ้อนหรือต้องใช้ข้อมูลอื่นประกอบ)",
    ],
    extension: "เพิ่มคอลัมน์ created_at TIMESTAMPTZ NOT NULL DEFAULT now() แล้ว SELECT กิจกรรมที่สร้างล่าสุด 2 รายการด้วย ORDER BY created_at DESC LIMIT 2",
  },
  "be-sql-joins": {
    hook: "ถ้าเก็บรายชื่อผู้เข้าร่วมเป็นข้อความ \"ซี, ต้น\" ในคอลัมน์เดียว คำถามง่าย ๆ อย่าง “ซีเข้าร่วมกี่กิจกรรม” ต้องอ่านทุกแถวแล้วตัดข้อความเอง และกันชื่อซ้ำไม่ได้ ความสัมพันธ์ที่ถูกต้องทำให้ฐานข้อมูลตอบคำถามเหล่านี้ได้ในคำสั่งเดียว",
    analogy: {
      title: "ตารางกลางเหมือนใบลงทะเบียนเรียน",
      text: [
        "มหาวิทยาลัยไม่เขียนชื่อวิชาทั้งหมดลงในบัตรนักศึกษา และไม่เขียนชื่อนักศึกษาทั้งหมดลงในประกาศวิชา แต่มีใบลงทะเบียนที่แต่ละแถวบอกว่า “นักศึกษาคนนี้ลงวิชานี้”",
        "ตาราง participations คือใบลงทะเบียนนั้น แต่ละแถวจับคู่ activity_id กับ member_id และห้ามคู่เดียวกันซ้ำ",
      ],
      mapping: [
        ["รายชื่อนักศึกษา", "ตาราง members"],
        ["รายชื่อวิชา", "ตาราง activities"],
        ["หนึ่งแถวในใบลงทะเบียน", "หนึ่งแถวใน participations (activity_id, member_id)"],
        ["ห้ามลงวิชาเดียวกันซ้ำ", "PRIMARY KEY (activity_id, member_id)"],
        ["ห้ามลงวิชาที่ไม่มีอยู่จริง", "FOREIGN KEY ... REFERENCES"],
      ],
      limits: "ใบลงทะเบียนจริงอาจมีข้อมูลประกอบ (เกรด, วันที่ลง) ตารางกลางก็เพิ่มคอลัมน์แบบนั้นได้ แต่ต่างจากกระดาษตรงที่ฐานข้อมูลบังคับ constraint ทุกครั้งโดยอัตโนมัติ และ ON DELETE CASCADE ลบแถวที่เกี่ยวข้องตามไปได้เอง",
    },
    explain: [
      {
        heading: "1) foreign key และตารางกลาง",
        text: [
          "member_id INTEGER REFERENCES members(id) บังคับว่าต้องมีสมาชิกคนนั้นจริง",
          "ความสัมพันธ์หลายต่อหลายใช้ตารางกลางที่มี primary key เป็นคู่ของสอง foreign key",
        ],
      },
      {
        heading: "2) JOIN และ LEFT JOIN",
        text: [
          "FROM a JOIN b ON b.a_id = a.id ต่อแถวที่ตรงกัน แถวที่ไม่มีคู่หายไป",
          "LEFT JOIN เก็บทุกแถวของ a แม้ไม่มีคู่ คอลัมน์ของ b เป็น NULL — ใช้เมื่อต้องการ “ทุกกิจกรรม รวมที่ยังไม่มีคนเข้าร่วม”",
        ],
      },
      {
        heading: "3) GROUP BY, COUNT และ HAVING",
        text: [
          "GROUP BY รวมแถวที่มีค่าเดียวกันเป็นกลุ่ม แล้วใช้ COUNT/SUM/MAX ต่อกลุ่ม คอลัมน์ที่ SELECT ต้องอยู่ใน GROUP BY หรืออยู่ใน aggregate (PostgreSQL อนุญาตคอลัมน์ของตารางเมื่อ GROUP BY primary key ของตารางนั้น)",
          "COUNT(*) นับแถว COUNT(คอลัมน์) นับเฉพาะที่ไม่ใช่ NULL HAVING กรองหลังรวมกลุ่ม (WHERE กรองก่อน)",
        ],
        code: "SELECT COUNT(*)::int AS rows, COUNT(x)::int AS non_null FROM (VALUES (1), (NULL), (3)) AS t(x);",
        output: "{\"rows\":3,\"non_null\":2}",
      },
    ],
    walkthrough: [
      "สร้างสามตารางพร้อม foreign key และ primary key คู่",
      "ใส่ข้อมูล: Hiking มี 2 คน, Board game มี 2 คน (เต็ม), Cafe hop ไม่มีใคร",
      "LEFT JOIN ทำให้ Cafe hop ยังอยู่ และ COUNT(p.member_id) ได้ 0",
      "seats_left คำนวณจาก capacity ลบจำนวนผู้เข้าร่วม",
    ],
    pitfalls: [
      "ใช้ COUNT(*) กับ LEFT JOIN: แถวที่ไม่มีคู่ถูกนับเป็น 1",
      "GROUP BY ด้วยชื่อแทน id: ชื่อซ้ำถูกรวมเป็นกลุ่มเดียว",
      "ใช้ WHERE กับผลของ COUNT: ต้องใช้ HAVING",
      "ลืมว่า COUNT เป็น bigint: driver pg คืนเป็น string ใช้ ::int เมื่อรู้ว่าไม่ล้น",
    ],
    checks: [
      { question: "ถ้าต้องการรายชื่อกิจกรรมที่ซีเข้าร่วม ต้อง JOIN ตารางไหนบ้าง", answer: "members → participations → activities (หรือเริ่มจาก participations ที่ member_id ของซี แล้ว JOIN activities)" },
      { question: "WHERE กับ HAVING ต่างกันอย่างไร", answer: "WHERE กรองแถวก่อนรวมกลุ่ม HAVING กรองกลุ่มหลังรวมและใช้ค่าจาก aggregate ได้" },
    ],
    recap: [
      "foreign key บังคับความสัมพันธ์; ตารางกลางสำหรับหลายต่อหลาย",
      "JOIN ตัดแถวไม่มีคู่; LEFT JOIN เก็บไว้เป็น NULL",
      "GROUP BY + COUNT(คอลัมน์) + HAVING",
    ],
    traceHint: "วาดผลของ LEFT JOIN เป็นตารางกลางก่อน (หนึ่งแถวต่อคู่ หรือแถวที่ฝั่งขวาเป็น NULL) แล้วค่อยจับกลุ่มตาม a.id และนับ",
    practiceHints: [
      "ข้อแรกเริ่มจาก members แล้ว LEFT JOIN participations เพื่อเก็บคนที่ยังไม่เข้าร่วม",
      "นับด้วย COUNT(p.activity_id)::int แล้ว GROUP BY m.id, m.name และ ORDER BY จำนวนจากมากไปน้อยแล้วชื่อ",
      "ข้อสอง JOIN participations แล้ว GROUP BY a.id, a.title, a.capacity และ HAVING COUNT(*) >= a.capacity",
    ],
    acceptance: [
      "ตรวจเองในเครื่อง: ใช้ PGlite หรือ psql เว็บไซต์ไม่ได้รัน SQL",
      "ตรวจเอง: ข้อแรกมีสมาชิกทุกคน (คนที่ไม่เข้าร่วมได้ 0)",
      "ตรวจเอง: ข้อสองได้เฉพาะ Board game",
    ],
    solutionNotes: [
      "ข้อสองใช้ JOIN ธรรมดาได้เพราะกิจกรรมที่ไม่มีคนเข้าร่วมเต็มไม่ได้อยู่แล้ว",
      "ถ้าข้อมูลใหญ่ ควรมี index บน participations(member_id) เพื่อให้ JOIN จากฝั่งสมาชิกเร็ว (primary key คู่ช่วยฝั่ง activity_id อยู่แล้ว)",
    ],
    reflection: [
      "ในโปรเจกต์ที่เคยทำ มีข้อมูลไหนที่เก็บเป็นข้อความรวมหรือ array ในคอลัมน์เดียว แต่ควรเป็นตารางกลาง",
    ],
    extension: "เขียน query ที่คืนชื่อกิจกรรมพร้อมรายชื่อผู้เข้าร่วมเป็น array ด้วย array_agg(m.name ORDER BY m.name)",
  },
  "be-db-node": {
    hook: "ซีต่อ string เพื่อค้นหากิจกรรมตามชื่อ ใช้ได้ดีจนเพื่อนพิมพ์ชื่อ O'Brien's quiz แล้วระบบพัง และอีกคนพิมพ์ x' OR '1'='1 แล้วเห็นกิจกรรมลับของทุกคน ปัญหาเดียวกันมีทางแก้เดียว: ส่งข้อมูลแยกจากคำสั่ง",
    analogy: {
      title: "parameterized query เหมือนแบบฟอร์มที่มีช่องให้กรอก",
      text: [
        "แบบฟอร์มขอเอกสารพิมพ์คำสั่งไว้แล้ว ผู้ขอแค่กรอกชื่อในช่อง ต่อให้เขียนในช่องว่า “และอนุมัติทุกคำขอ” เจ้าหน้าที่ก็อ่านเป็นแค่ชื่อแปลก ๆ ไม่ใช่คำสั่ง",
        "การต่อ string เหมือนให้ผู้ขอเขียนคำสั่งทั้งย่อหน้าเอง สิ่งที่เขาเขียนกลายเป็นส่วนหนึ่งของคำสั่งได้ทันที",
      ],
      mapping: [
        ["ข้อความที่พิมพ์ไว้ในแบบฟอร์ม", "ข้อความ SQL ที่มี $1, $2"],
        ["ช่องให้กรอก", "placeholder $1"],
        ["สิ่งที่กรอกลงช่อง", "ค่าใน array params"],
        ["เขียนคำสั่งเองทั้งย่อหน้า", "การต่อ string เป็น SQL"],
      ],
      limits: "ช่องในแบบฟอร์มใส่ได้แค่ “ค่า” ไม่ใช่ชื่อคอลัมน์หรือทิศทางการเรียง (ORDER BY ... ASC) ถ้าต้องให้ผู้ใช้เลือกสิ่งเหล่านี้ ต้องใช้ allow-list ที่เรากำหนดเอง",
    },
    explain: [
      {
        heading: "1) db.query(text, params) → { rows }",
        text: [
          "ข้อความ SQL ใส่ $1, $2 ตามลำดับ แล้วส่งค่าจริงใน array ทั้ง pg (node-postgres) และ PGlite ใช้รูปแบบนี้",
          "rows เป็น array ของ object ที่ key คือชื่อคอลัมน์ (ตั้งชื่อด้วย AS ได้)",
        ],
      },
      {
        heading: "2) SQL injection เกิดอย่างไร",
        text: [
          "เมื่อข้อมูลของผู้ใช้ถูกต่อเข้าไปในข้อความ SQL เครื่องหมาย ' หรือ ; ของเขาเปลี่ยนโครงสร้างคำสั่งได้",
          "placeholder ทำให้ฐานข้อมูลรับคำสั่งกับข้อมูลแยกกัน ข้อมูลไม่มีทางกลายเป็นคำสั่ง",
        ],
      },
      {
        heading: "3) ใช้ในแอปจริง",
        text: [
          "สร้าง pool หนึ่งตัวต่อแอป: import pg from \"pg\"; const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL }); แล้ว pool.query(...)",
          "รวม query ของ resource ไว้ใน repository (createActivityRepository(db)) ส่วนอื่นเรียก method ที่มีชื่อสื่อความหมาย ไม่เขียน SQL กระจัดกระจาย",
        ],
      },
    ],
    walkthrough: [
      "สร้างตารางและข้อมูลสองแถวด้วย db.exec (หลายคำสั่งในครั้งเดียว ไม่มี parameter)",
      "findByTitle ใช้ $1: \"Hiking\" เจอ 1 แถว ส่วน attack ไม่ตรงชื่อใดจึงได้ 0",
      "findByTitleUnsafe ต่อ string: attack ทำให้เงื่อนไขจริงทุกแถว ได้ทั้งสองกิจกรรม",
      "INSERT ชื่อที่มี ' ผ่าน $1 ได้ปกติ และ RETURNING คืนแถวที่สร้าง",
    ],
    pitfalls: [
      "ต่อ string กับค่าจากผู้ใช้: SQL injection",
      "ใช้ placeholder กับชื่อคอลัมน์/ORDER BY: ใช้ไม่ได้ ใช้ allow-list",
      "สร้าง Pool ใหม่ทุก request: connection หมดเร็ว สร้างครั้งเดียวตอนเริ่ม",
      "SELECT * แล้วส่งให้ client ทั้งหมด: อาจหลุดคอลัมน์ลับ เลือกคอลัมน์ที่ต้องการ",
    ],
    checks: [
      { question: "\"... WHERE id = $1\" กับ [\"1 OR 1=1\"] จะเกิดอะไร", answer: "ฐานข้อมูลพยายามแปลง \"1 OR 1=1\" เป็นตัวเลข แล้ว error ว่าไม่ใช่ integer — ไม่ได้รันเป็นเงื่อนไข" },
      { question: "ทำไมควรรวม query ไว้ใน repository", answer: "เพื่อให้ SQL อยู่ที่เดียว ตรวจเรื่อง injection ง่าย และเปลี่ยน query หรือฐานข้อมูลได้โดยไม่แก้ route" },
    ],
    recap: [
      "db.query(text, params) ใช้ $1, $2 เสมอ",
      "ห้ามต่อ string กับข้อมูลผู้ใช้",
      "pool เดียวต่อแอป; query อยู่ใน repository",
    ],
    traceHint: "เขียนข้อความ SQL สุดท้ายที่ฐานข้อมูลได้รับสำหรับแต่ละการเรียก (แบบต่อ string จะเห็นว่าคำสั่งเปลี่ยนรูป)",
    practiceHints: [
      "แทนการต่อ string ด้วย $1 ทุกจุด และส่งค่าใน array",
      "list ที่ day อาจไม่มี: ใช้ WHERE ($1::text IS NULL OR day = $1) แล้วส่ง [day ?? null] ทำให้ข้อความ SQL คงที่",
      "create ใช้ INSERT ... RETURNING id, title, capacity, day แล้วคืน rows[0] ส่วน get คืน rows[0] ?? null",
    ],
    acceptance: [
      "ตรวจเองในเครื่อง: รันกับ PGlite (npm install @electric-sql/pglite) เว็บไซต์ไม่ได้รัน SQL",
      "ตรวจเอง: ไม่มีการต่อ string กับค่าที่มาจากผู้ใช้ในไฟล์ db.mjs",
      "ตรวจเอง: list() คืนทุกกิจกรรม list({ day: \"sat\" }) คืนเฉพาะวันเสาร์ get(id ที่ไม่มี) คืน null",
    ],
    solutionNotes: [
      "$1::text บอกชนิดให้ฐานข้อมูลเมื่อค่าเป็น null ไม่งั้นบางกรณีเดาชนิดไม่ได้",
      "repository คืน null แทน throw เมื่อหาไม่เจอ ปล่อยให้ service/route ตัดสินใจว่าเป็น 404",
    ],
    reflection: [
      "ถ้าต้องให้ผู้ใช้เลือกเรียงตามคอลัมน์ได้ จะออกแบบ allow-list อย่างไรให้ปลอดภัย",
    ],
    extension: "เขียน listPaged({ limit, offset }) ที่ตรวจ limit 1–50 และ offset ≥ 0 แล้วใช้ LIMIT $1 OFFSET $2",
  },
  "be-transactions": {
    hook: "ที่นั่งสุดท้ายของ Board game ถูกกดพร้อมกันโดยสองคน ทั้งสองได้ข้อความ “เข้าร่วมสำเร็จ” แต่กิจกรรมรับได้คนเดียว โค้ดตรวจถูกทุกบรรทัด ปัญหาอยู่ที่สองคำขอทำงานสลับกันระหว่าง “ตรวจ” กับ “บันทึก”",
    analogy: {
      title: "transaction เหมือนการโอนเงินที่ต้องสำเร็จทั้งสองฝั่ง",
      text: [
        "การโอนเงินคือ “หักบัญชีต้นทาง” และ “เพิ่มบัญชีปลายทาง” ถ้าระบบล่มหลังหักแต่ก่อนเพิ่ม เงินหายไปเฉย ๆ ธนาคารจึงทำสองขั้นนี้เป็นงานเดียวที่สำเร็จทั้งคู่หรือไม่เกิดอะไรเลย",
        "transaction ทำแบบเดียวกันกับคำสั่ง SQL หลายคำสั่ง: COMMIT เมื่อทุกขั้นผ่าน ROLLBACK ทั้งหมดเมื่อขั้นใดล้ม",
      ],
      mapping: [
        ["หักต้นทาง + เพิ่มปลายทาง", "หลายคำสั่ง SQL ใน BEGIN ... COMMIT"],
        ["ล่มกลางทางแล้วยกเลิกทั้งหมด", "ROLLBACK (Atomicity)"],
        ["คนอื่นไม่เห็นยอดเงินระหว่างโอน", "Isolation"],
        ["ล็อกบัญชีระหว่างทำรายการ", "SELECT ... FOR UPDATE"],
      ],
      limits: "ธนาคารจริงมีขั้นตอนนอกฐานข้อมูล (ส่ง SMS, ธนาคารอื่น) ซึ่ง transaction ของฐานข้อมูลย้อนกลับไม่ได้ ถ้าส่งอีเมลไปแล้วแล้วค่อย rollback อีเมลก็ยังถูกส่ง จึงควรทำงานภายนอกหลัง COMMIT",
    },
    explain: [
      {
        heading: "1) BEGIN/COMMIT/ROLLBACK และ ACID",
        text: [
          "Atomicity: ทั้งหมดหรือไม่มีเลย, Consistency: constraint ยังจริงหลังจบ, Isolation: งานครึ่งทางไม่ถูกเห็นโดยงานอื่น, Durability: COMMIT แล้วอยู่ถาวร",
          "PGlite ใช้ db.transaction(async (tx) => {...}) ส่วน pg ต้องยืม client จาก pool: const client = await pool.connect(); await client.query(\"BEGIN\"); ... COMMIT/ROLLBACK แล้ว client.release() (นิยมเขียน helper withTransaction ครอบ)",
        ],
      },
      {
        heading: "2) race condition กับ check-then-act",
        text: [
          "“นับก่อนแล้วค่อยเพิ่ม” สองคำสั่งแยกกัน คำขอสองตัวอาจนับได้เท่ากันก่อนที่ใครจะเพิ่ม",
          "แก้ด้วยการล็อกแถวที่เป็นตัวตัดสิน (SELECT ... FOR UPDATE ภายใน transaction) คำขอที่สองต้องรอจนคำขอแรกจบ แล้วจึงนับได้ค่าที่ถูก",
        ],
      },
      {
        heading: "3) ให้ constraint ทำงานที่มันทำได้ดีกว่า",
        text: [
          "การกันซ้ำใช้ PRIMARY KEY/UNIQUE ซึ่งถูกต้องเสมอแม้หลายคำขอพร้อมกัน ใช้ ON CONFLICT DO NOTHING RETURNING เพื่อรู้ว่าแทรกจริงหรือซ้ำโดยไม่ error",
          "ใน pg error ของ constraint มี code เช่น 23505 (unique_violation) ใช้แปลงเป็น 409 ได้",
        ],
      },
    ],
    walkthrough: [
      "join เปิด transaction ล็อกแถวกิจกรรม นับผู้เข้าร่วม แล้ว INSERT ... ON CONFLICT DO NOTHING",
      "ซีเข้าครั้งแรก joined, ซ้ำได้ already-joined (ไม่มีแถวคืนมา), ต้นเข้าได้จนเต็ม, ฝนได้ full, id 9 ได้ not-found",
      "บล็อกสุดท้าย UPDATE แล้ว throw ทำให้ rollback capacity จึงยังเป็น 2",
    ],
    pitfalls: [
      "ตรวจแล้วบันทึกนอก transaction: race condition",
      "ส่งอีเมล/เรียก API ภายนอกใน transaction แล้ว rollback: ย้อนไม่ได้",
      "transaction นานเกินไป (รอ network ข้างใน): ล็อกค้าง คำขออื่นรอ",
      "ลืม release client ของ pg: pool หมดแล้วแอปค้าง",
    ],
    checks: [
      { question: "ถ้าไม่มี FOR UPDATE แต่ยังอยู่ใน transaction การนับที่นั่งยังมี race ได้ไหม", answer: "ได้ ใน isolation ระดับปกติ (Read Committed) สอง transaction อ่านจำนวนเดิมพร้อมกันได้ FOR UPDATE ทำให้ต้องรอกัน" },
      { question: "ทำไมควรส่งอีเมลยืนยันหลัง COMMIT", answer: "เพราะถ้าส่งก่อนแล้ว transaction rollback ผู้ใช้จะได้อีเมลยืนยันสิ่งที่ไม่ได้เกิดขึ้นจริง" },
    ],
    recap: [
      "transaction = หลายคำสั่งที่สำเร็จหรือยกเลิกพร้อมกัน",
      "check-then-act ต้องอยู่ใน transaction + ล็อกแถว",
      "กันซ้ำด้วย constraint + ON CONFLICT",
    ],
    traceHint: "สำหรับแต่ละการเรียก join เขียนว่า transaction คืนค่าที่จุดไหน และมี INSERT สำเร็จหรือไม่ แล้วนับแถวใน participations หลังแต่ละครั้ง",
    practiceHints: [
      "ทั้งการลบและการเพิ่มต้องอยู่ใน transaction เดียวกัน และกรณีผิดต้องยกเลิกทั้งคู่",
      "DELETE ... RETURNING member บอกว่าลบจริงไหม ส่วน INSERT ... ON CONFLICT DO NOTHING RETURNING member บอกว่าเพิ่มจริงไหม",
      "ใน PGlite การ throw ใน callback ทำให้ rollback ใช้ class error เฉพาะที่ถือค่าผลลัพธ์ แล้ว catch นอก transaction เพื่อคืนค่านั้น (ตามเฉลย)",
    ],
    acceptance: [
      "ตรวจเองในเครื่อง: รันกับ PGlite เว็บไซต์ไม่ได้รัน SQL",
      "ตรวจเอง: ย้ายสำเร็จได้ \"transferred\" และรายชื่อเปลี่ยนตาม",
      "ตรวจเอง: fromMember ไม่ได้เข้าร่วมได้ \"not-participant\" และข้อมูลไม่เปลี่ยน",
      "ตรวจเอง: toMember เข้าร่วมอยู่แล้วได้ \"already-joined\" และ fromMember ยังอยู่ (rollback ทั้งก้อน)",
    ],
    solutionNotes: [
      "กรณี already-joined ต้อง rollback การลบที่ทำไปแล้ว การ throw ใน callback คือวิธีบอก PGlite ให้ rollback",
      "error อื่นที่ไม่ใช่ RollbackWith ถูก throw ต่อไปตามเดิม ไม่กลืน",
    ],
    reflection: [
      "ใน Planner มีการกระทำไหนอีกที่มีหลายขั้นและควรอยู่ใน transaction (เช่นลบกิจกรรมพร้อมโหวตทั้งหมด)",
    ],
    extension: "เขียน withTransaction(pool, fn) สำหรับ pg ที่ BEGIN, เรียก fn(client), COMMIT หรือ ROLLBACK เมื่อ throw และ release ใน finally เสมอ",
  },
  "be-project-planner-api-2": {
    hook: "API ของ M5 ใช้งานได้ แต่ข้อมูลหายทุกครั้งที่ deploy ใหม่ M6 ย้ายไปใช้ PostgreSQL โดยใช้โครงสร้างที่วางไว้: เปลี่ยนแค่ store เป็น repository แล้ว test ชุดเดิมต้องยังผ่าน",
    explain: [
      {
        heading: "1) migration ก่อนโค้ด",
        text: [
          "migrations/001_init.sql สร้างตารางและ constraint ทั้งหมด ไฟล์ถัดไปเพิ่มการเปลี่ยนแปลงทีละขั้น (002_add_slots.sql) ห้ามแก้ไฟล์ที่รันบน production ไปแล้ว",
          "test รัน migration บนฐานข้อมูลใหม่ทุกครั้ง ทำให้มั่นใจว่าโครงสร้างสร้างจากศูนย์ได้",
        ],
      },
      {
        heading: "2) repository แทน store",
        text: [
          "method ชื่อเดิม คืนผลแบบเดิม แต่เป็น async และใช้ SQL route เปลี่ยนแค่เติม async/await",
          "การดึงกิจกรรมพร้อมรายชื่อสมาชิกใช้ LEFT JOIN + array_agg ใน query เดียว แทนการ query สมาชิกทีละกิจกรรม (ปัญหา N+1)",
        ],
      },
      {
        heading: "3) แปลง error ของฐานข้อมูล",
        text: [
          "constraint ที่ถูกละเมิดส่ง error ที่มี code (23505 unique, 23514 check, 23503 foreign key) error middleware แปลงเป็น 409/400 ได้",
          "validation ในโค้ดยังจำเป็นเพื่อให้ข้อความผิดพลาดบอก field ชัดเจน constraint เป็นด่านสุดท้ายเมื่อโค้ดพลาด",
        ],
      },
    ],
    walkthrough: [
      "รัน migration บน PGlite ใหม่",
      "POST กิจกรรมที่ถูกต้องได้ 201",
      "POST capacity 20 ถูก CHECK ปฏิเสธ แต่ตัวอย่างยังไม่แปลง error จึงได้ 500 (สิ่งที่ practice ให้แก้)",
      "เพิ่มผู้เข้าร่วมด้วย SQL แล้ว GET ได้รายชื่อเรียงตามชื่อจาก array_agg",
    ],
    pitfalls: [
      "แก้ไฟล์ migration เก่าแทนการเพิ่มไฟล์ใหม่: ฐานข้อมูลที่รันไปแล้วไม่ตรงกับไฟล์",
      "query สมาชิกในลูปทีละกิจกรรม: N+1 query ช้าเมื่อข้อมูลโต",
      "ปล่อย error ของ constraint เป็น 500: client ไม่รู้ว่าแก้อะไร",
      "เขียน connection string ในโค้ด",
    ],
    checks: [
      { question: "ทำไม test ใช้ PGlite ใหม่ต่อ test แทนฐานข้อมูลเดียว", answer: "ให้แต่ละ test เริ่มจากสถานะเดียวกัน ไม่พึ่งข้อมูลหรือลำดับของ test อื่น และไม่ต้องล้างข้อมูลเอง" },
      { question: "N+1 query คืออะไร", answer: "query หนึ่งครั้งเพื่อได้รายการ N แถว แล้ว query เพิ่มอีก N ครั้งเพื่อข้อมูลประกอบของแต่ละแถว แก้ด้วย JOIN หรือ query แบบรวม" },
    ],
    recap: [
      "migration สร้างโครงสร้างจากศูนย์ได้ เพิ่มไฟล์ใหม่ทุกการเปลี่ยน",
      "repository แทน store ด้วย interface เดิม",
      "แปลง error code ของฐานข้อมูลเป็น 400/409",
    ],
    traceHint: "สำหรับแต่ละ request เขียน SQL ที่ repository ส่ง ผลจากฐานข้อมูล และ status ที่ error middleware/route ตอบ",
    practiceHints: [
      "เขียน 001_init.sql ก่อนแล้วรันกับ PGlite ให้ผ่าน จากนั้นค่อยเขียน repository ทีละ method",
      "ใช้ query selectActivity ร่วมกันสำหรับ list/get (LEFT JOIN + array_agg + GROUP BY a.id) และใช้ transaction ใน join ตามบท be-transactions",
      "test helper: freshApp() สร้าง PGlite ใหม่ + exec migration + createApp(createRepository(db)) แล้ว test เดิมเปลี่ยนแค่วิธีสร้าง app",
    ],
    acceptance: [
      local,
      "ตรวจเอง: test ชุดเดิมของ M5 ผ่านทั้งหมดกับ repository ใหม่",
      "ตรวจเอง: capacity ผิดได้ 400 (จาก validation หรือ error code 23514) ไม่ใช่ 500",
      "ตรวจเอง: ข้อมูลยังอยู่หลัง restart server เมื่อรันกับ PostgreSQL จริง",
    ],
    solutionNotes: [
      "create คืน this.get(id) เพื่อให้รูปร่าง object (มี members) เหมือนกับที่ list/get คืน",
      "FILTER (WHERE p.member IS NOT NULL) ทำให้กิจกรรมที่ไม่มีสมาชิกได้ array ว่างแทน [null]",
    ],
    reflection: [
      "การแยก store ใน M5 ช่วยงานใน M6 อย่างไร และมีส่วนไหนที่ยังต้องแก้มากกว่าที่คาด",
    ],
    extension: "เขียน npm run migrate ที่อ่านไฟล์ใน migrations/ ตามลำดับชื่อ และบันทึกว่าไฟล์ไหนรันแล้วในตาราง schema_migrations เพื่อไม่รันซ้ำ",
  },
  "be-auth": {
    hook: "ระบบ Planner ยังให้ใครก็สร้างหรือลบกิจกรรมได้ ขั้นแรกของการกันคือรู้ว่าแต่ละ request มาจากใคร แต่การทำ login ผิดเพียงเล็กน้อย เช่นเก็บรหัสผ่านตรง ๆ อาจทำให้ข้อมูลผู้ใช้ทุกคนรั่วไปถึงบริการอื่นที่เขาใช้รหัสเดียวกัน",
    analogy: {
      title: "hash + salt เหมือนเครื่องบดที่ใส่เครื่องเทศสุ่มต่อจาน",
      text: [
        "ร้านเก็บ “ผงที่บดแล้ว” แทนสูตรต้นฉบับ ผงย้อนกลับเป็นวัตถุดิบไม่ได้ แต่ถ้ามีคนอ้างว่ารู้สูตร ร้านบดตามสูตรที่เขาบอกแล้วเทียบว่าได้ผงเหมือนกันไหม",
        "ร้านใส่เครื่องเทศสุ่มต่อจาน (salt) ลงไปด้วย สองคนที่ใช้สูตรเดียวกันจึงได้ผงต่างกัน คนที่ขโมยผงไปเทียบกับตารางผงสำเร็จรูปไม่ได้ และเครื่องบดถูกตั้งให้ช้าโดยตั้งใจ ทำให้การเดาทีละสูตรใช้เวลานาน",
      ],
      mapping: [
        ["สูตรต้นฉบับ", "รหัสผ่านที่ผู้ใช้กรอก"],
        ["ผงที่บดแล้ว", "password hash ที่เก็บในฐานข้อมูล"],
        ["เครื่องเทศสุ่มต่อจาน", "salt ที่สุ่มต่อผู้ใช้และเก็บไว้คู่กับ hash"],
        ["เครื่องบดที่ช้าโดยตั้งใจ", "scrypt/bcrypt/argon2 ที่ทำให้การเดาจำนวนมากแพง"],
      ],
      limits: "การเปรียบเทียบนี้อธิบายการเก็บรหัสผ่าน แต่ไม่ได้ครอบคลุม session token ซึ่งเป็นค่าสุ่มที่ server ออกให้หลัง login และต้องเก็บรักษาเหมือนรหัสผ่านชั่วคราว (ใครได้ token ไปก็สวมรอยได้จนหมดอายุหรือถูกเพิกถอน)",
    },
    explain: [
      {
        heading: "1) เก็บ hash ไม่เก็บรหัส",
        text: [
          "สมัคร: สุ่ม salt → hash = scrypt(password, salt) → เก็บ salt:hash",
          "login: อ่าน salt จากที่เก็บ → คำนวณ scrypt(รหัสที่กรอก, salt) → เทียบกับ hash ที่เก็บด้วย timingSafeEqual",
          "ไม่ใช้ hash เร็ว (MD5, SHA-256 เดี่ยว ๆ) กับรหัสผ่าน",
        ],
      },
      {
        heading: "2) session token",
        text: [
          "หลัง login ผ่าน ออก token สุ่ม 32 byte (randomBytes(32).toString(\"base64url\")) เก็บฝั่ง server คู่กับ user และเวลาหมดอายุ",
          "client ส่งกลับทุก request: Authorization: Bearer <token> หรือ cookie แบบ HttpOnly (JavaScript อ่านไม่ได้), Secure (เฉพาะ HTTPS), SameSite (ลด CSRF)",
          "logout = ลบ token ฝั่ง server ทันที ซึ่งเป็นข้อดีของ session ที่เก็บฝั่ง server เมื่อเทียบกับ JWT",
        ],
      },
      {
        heading: "3) อย่าให้ข้อมูลแก่ผู้เดา",
        text: [
          "login ผิดทุกกรณีตอบ 401 ข้อความเดียว ไม่บอกว่าอีเมลไม่มีหรือรหัสผิด",
          "กำหนดความยาวรหัสผ่านขั้นต่ำ (เช่น 12) และควรจำกัดจำนวนครั้งที่ลองผิด (rate limit) ในระบบจริง",
        ],
      },
    ],
    walkthrough: [
      "hashPassword สุ่ม salt ทุกครั้ง hash ของรหัสเดียวกันสองครั้งจึงต่างกัน",
      "login ที่รหัสถูก: verifyPassword ใช้ salt เดิมคำนวณแล้วเทียบได้ true ออก token ยาว 43 ตัวอักษร (32 byte แบบ base64url)",
      "รหัสผิดและอีเมลที่ไม่มีได้ 401 ข้อความเดียวกัน",
    ],
    pitfalls: [
      "เก็บรหัสผ่านตรง ๆ หรือใช้ SHA-256 ไม่มี salt",
      "บอกว่า “ไม่พบอีเมลนี้”: user enumeration",
      "เก็บ token ใน localStorage ของเว็บที่มีช่องโหว่ XSS: ถูกขโมยได้ (cookie HttpOnly ปลอดภัยกว่าสำหรับเว็บ)",
      "token ไม่มีวันหมดอายุ หรือ logout แล้วไม่ลบ token",
    ],
    checks: [
      { question: "ทำไมต้องเก็บ salt ไว้คู่กับ hash", answer: "เพราะตอน login ต้องใช้ salt เดิมคำนวณ hash ของรหัสที่กรอก salt ไม่ใช่ความลับ หน้าที่ของมันคือทำให้ hash ของรหัสเดียวกันไม่ซ้ำ" },
      { question: "authentication ตอบคำถามอะไร และไม่ได้ตอบคำถามอะไร", answer: "ตอบว่าผู้ใช้เป็นใคร แต่ไม่ได้ตอบว่าเขาทำสิ่งนี้ได้ไหม (บท authorization)" },
    ],
    recap: [
      "รหัสผ่าน → scrypt + salt; เทียบด้วย timingSafeEqual",
      "token สุ่ม เก็บฝั่ง server มีวันหมดอายุ",
      "login ผิด = 401 ข้อความเดียว",
    ],
    traceHint: "เขียนสิ่งที่ถูกเก็บในฐานข้อมูลหลังสมัคร (salt:hash) และสิ่งที่ถูกคำนวณตอน login แล้วชี้ว่าการเทียบเกิดที่บรรทัดไหน",
    practiceHints: [
      "ตาราง users: id, email UNIQUE, password_hash ตาราง sessions: token PRIMARY KEY, user_id REFERENCES users, expires_at TIMESTAMPTZ",
      "register: validate → hashPassword → INSERT (จับ 23505 เป็น 409) login: SELECT ตาม email → verifyPassword → INSERT session พร้อม expires_at = now() + interval '1 hour'",
      "requireUser: อ่าน Bearer token → SELECT session ที่ expires_at > now() JOIN users → ไม่พบตอบ 401 → พบแนบ req.user แล้ว next()",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ในฐานข้อมูลไม่มีรหัสผ่านแบบอ่านออก",
      "ตรวจเอง: login ผิดทุกแบบได้ 401 ข้อความเดียวกัน",
      "ตรวจเอง: token หมดอายุหรือ logout แล้วใช้ไม่ได้ (401)",
    ],
    solutionNotes: [
      "scrypt จาก node:crypto ไม่ต้องติดตั้ง package เพิ่ม ถ้าใช้ bcrypt/argon2 หลักการเหมือนกัน",
      "การเทียบ token ใน SQL (WHERE token = $1) ใช้ได้เพราะ token ยาวและสุ่มมาก ระบบจริงบางแห่งเก็บ hash ของ token แทน token ตรง ๆ เพื่อกันกรณีฐานข้อมูลรั่ว",
    ],
    reflection: [
      "ถ้าฐานข้อมูลของ Planner รั่ววันนี้ ข้อมูลไหนของผู้ใช้ที่ยังปลอดภัย และข้อมูลไหนที่ต้องรีบเปลี่ยน",
    ],
    extension: "เพิ่ม POST /auth/logout ที่ลบ session ของ token ปัจจุบัน และ job ที่ลบ session หมดอายุทุกชั่วโมง",
  },
  "be-authorization": {
    hook: "หลังทำ login เสร็จ ทุกคนที่เข้าสู่ระบบได้กลับลบกิจกรรมของคนอื่นได้ เพียงเปลี่ยนเลข id ใน URL ระบบรู้ว่าเป็นใคร แต่ไม่เคยถามว่าคนนั้นมีสิทธิ์ทำสิ่งนี้ไหม",
    explain: [
      {
        heading: "1) authentication ≠ authorization",
        text: [
          "authentication: “คุณคือใคร” (token ถูกต้องไหม) authorization: “คุณทำสิ่งนี้กับ resource นี้ได้ไหม”",
          "ทุก endpoint ที่เปลี่ยนข้อมูลต้องตรวจทั้งสองอย่าง และตรวจฝั่ง server เสมอ",
        ],
      },
      {
        heading: "2) 401, 403 หรือ 404",
        text: [
          "401: ไม่มี token หรือ token ใช้ไม่ได้ / 403: รู้ว่าเป็นใครแต่ไม่มีสิทธิ์ / 404: ไม่มี resource",
          "ถ้าการรู้ว่า resource มีอยู่เป็นข้อมูลลับ (เช่นกิจกรรมส่วนตัว) ตอบ 404 แทน 403 ได้ เพื่อไม่ให้ไล่เดาว่ามี id ไหนบ้าง",
        ],
      },
      {
        heading: "3) กฎสิทธิ์อยู่ที่เดียว",
        text: [
          "เขียน policy function เช่น canEditActivity(user, activity) แล้วเรียกจากทุกจุดที่ต้องใช้ แก้กฎครั้งเดียวได้ทั้งระบบ",
          "ข้อมูลที่บอกตัวตน (เช่น member ที่จะเข้าร่วม) ต้องมาจาก req.user ไม่รับจาก body",
        ],
      },
    ],
    walkthrough: [
      "middleware แปลง token เป็น req.user (หรือ null)",
      "PATCH ตรวจตามลำดับ: login หรือยัง → กิจกรรมมีอยู่ไหม → มีสิทธิ์ไหม → แก้",
      "ซีแก้ของตัวเองได้ ของคนอื่นได้ 403 admin แก้ได้ทุกอัน id ที่ไม่มีได้ 404",
    ],
    pitfalls: [
      "ตรวจแค่ login: IDOR",
      "ซ่อนปุ่มใน UI แล้วคิดว่าปลอดภัย: ใครก็เรียก API ตรงได้",
      "รับ userId/memberId จาก body: ผู้ใช้สวมรอยคนอื่นได้",
      "ตรวจสิทธิ์ก่อนโหลด resource: activity เป็น undefined",
    ],
    checks: [
      { question: "ผู้ใช้ที่ token หมดอายุพยายามลบกิจกรรมของตัวเอง ควรได้ status อะไร", answer: "401 เพราะระบบยังไม่รู้ว่าเป็นใคร (การยืนยันตัวตนล้มเหลวก่อนจะถึงการตรวจสิทธิ์)" },
      { question: "ทำไม POST /activities/:id/members ไม่ควรรับ memberId จาก body", answer: "เพราะผู้ใช้จะเพิ่มคนอื่นเข้ากิจกรรมแทนได้ ตัวตนต้องมาจาก req.user ที่ server ยืนยันแล้ว" },
    ],
    recap: [
      "authentication = ใคร; authorization = ทำได้ไหม",
      "401 / 403 / 404 ตามลำดับการตรวจ",
      "policy function ที่เดียว; ตัวตนมาจาก req.user",
    ],
    traceHint: "ทำตารางห้าแถวตาม request ในตัวอย่าง: มี user ไหม, กิจกรรมมีไหม, canEdit เป็นอะไร, status ที่ได้",
    practiceHints: [
      "เพิ่ม owner_id ในตาราง activities และกำหนดค่าจาก req.user.id ตอนสร้าง (ไม่รับจาก body)",
      "PATCH/DELETE: โหลดกิจกรรม → 404 ถ้าไม่มี → 403 ถ้า canEditActivity เป็น false → ทำงาน",
      "test: สมัคร A และ B, A สร้างกิจกรรม, B พยายาม PATCH และ DELETE → ต้องได้ 403 และกิจกรรมยังเหมือนเดิม",
    ],
    acceptance: [
      local,
      "ตรวจเอง: ผู้ใช้ B แก้/ลบกิจกรรมของ A ไม่ได้ (403) และข้อมูลไม่เปลี่ยน",
      "ตรวจเอง: ไม่มี token ได้ 401 ทุก endpoint ที่เปลี่ยนข้อมูล",
      "ตรวจเอง: การเข้าร่วมใช้ตัวตนจาก token เสมอ",
    ],
    solutionNotes: [
      "รวมเงื่อนไขเจ้าของใน SQL (WHERE id = $1 AND owner_id = $2) ช่วยป้องกันอีกชั้น แต่ยังต้องแยก 403 กับ 404 ถ้าต้องการบอก client ชัดเจน",
      "role admin ควรมาจากข้อมูลในฐานข้อมูล ไม่ใช่สิ่งที่ client ส่งมา",
    ],
    reflection: [
      "ลองคิดในมุมผู้โจมตี: ถ้าได้ token ของตัวเองหนึ่งอัน จะลองเรียก endpoint ไหนของ Planner ก่อน และระบบป้องกันไว้หรือยัง",
    ],
    extension: "เพิ่มบทบาท co-host ที่เจ้าของกิจกรรมแต่งตั้งได้ (ตาราง activity_hosts) แล้วให้ canEditActivity รองรับ",
  },
  "be-security-basics": {
    hook: "API ของ Planner เปิดใช้จริงแล้ว เว็บแปลกหน้าก็เรียก API ได้พร้อม cookie ของผู้ใช้ ข้อความ error เผย stack trace และมีคนส่ง JSON ขนาด 50 MB เข้ามาจน server ช้า ช่องเหล่านี้ไม่ใช่บั๊กของ logic แต่เป็นการตั้งค่าที่เปิดกว้างเกินไป",
    explain: [
      {
        heading: "1) CORS คืออะไรและไม่ใช่อะไร",
        text: [
          "browser จะไม่ให้ JavaScript ของเว็บ origin หนึ่งอ่าน response จาก API อีก origin เว้นแต่ API ตอบ Access-Control-Allow-Origin ที่อนุญาต request บางแบบ browser ส่ง OPTIONS (preflight) ไปถามก่อน",
          "CORS ไม่ได้กัน curl หรือ server อื่น และไม่ใช่ authentication อนุญาตเฉพาะ origin ที่รู้จัก ตั้ง Vary: Origin เมื่อสะท้อนค่า",
        ],
      },
      {
        heading: "2) secret และการตั้งค่าที่ปลอดภัยเป็นค่าเริ่มต้น",
        text: [
          "secret อยู่ใน environment (.env ใน .gitignore) ตรวจตอนเริ่มว่ามีครบ ไม่ log ค่า secret",
          "จำกัดขนาด body (express.json({ limit })), ปิด x-powered-by, ตั้ง header ป้องกันพื้นฐาน (ในงานจริงนิยมใช้ helmet) และไม่ส่ง stack trace ให้ client",
        ],
      },
      {
        heading: "3) OWASP Top 10 ในภาษาของ Planner",
        text: [
          "Broken Access Control → ตรวจสิทธิ์ทุก endpoint (บท authorization) · Injection → placeholder (บท db-node) · Identification/Authentication Failures → hash + session (บท auth)",
          "Security Misconfiguration → CORS/headers/limit ในบทนี้ · Vulnerable Components → อัปเดต dependency และดู npm audit อย่างมีวิจารณญาณ",
        ],
      },
    ],
    walkthrough: [
      "middleware ตั้ง X-Content-Type-Options ทุก response และ cors ตรวจ origin กับ allow-list",
      "OPTIONS จาก localhost:5173 ได้ header อนุญาต ส่วน evil.example ไม่ได้ (null)",
      "body ใหญ่เกิน 1kb ถูก express.json ปฏิเสธด้วย error type entity.too.large แปลงเป็น 413",
      "response ไม่มี x-powered-by และมี nosniff",
    ],
    pitfalls: [
      "Access-Control-Allow-Origin: * พร้อม credentials หรือสะท้อนทุก origin",
      "คิดว่า CORS แทน authentication ได้",
      "commit .env หรือ log secret",
      "ไม่จำกัดขนาด body/จำนวน request",
    ],
    checks: [
      { question: "ถ้า curl เรียก API จาก origin ที่ไม่อนุญาต จะถูก CORS กันไหม", answer: "ไม่ CORS บังคับโดย browser เท่านั้น curl ได้ response ปกติ" },
      { question: "ทำไมต้องตั้ง Vary: Origin เมื่อสะท้อน origin", answer: "เพื่อให้ cache ไม่ส่ง response ที่มี Allow-Origin ของ origin หนึ่งไปให้อีก origin" },
    ],
    recap: [
      "CORS = กติกาของ browser อนุญาตเฉพาะ origin ที่รู้จัก",
      "secret ใน env, จำกัด body, ปิดข้อมูลที่ไม่จำเป็น",
      "OWASP: access control, injection, auth, misconfiguration",
    ],
    traceHint: "สำหรับแต่ละ request เขียน origin ที่ส่งมา, middleware ที่ตั้ง header, และ header ที่ browser จะเห็น",
    practiceHints: [
      "loadConfig อ่าน env ที่จำเป็นและ throw พร้อมรายชื่อที่ขาด เรียกครั้งเดียวตอนเริ่ม server",
      "CORS_ORIGINS แยกด้วย comma → Set แล้วส่งให้ createApp ใช้ใน middleware cors",
      "SECURITY-CHECKLIST.md: เขียนห้าข้อ OWASP แต่ละข้อระบุไฟล์/function ที่ป้องกัน และสิ่งที่ยังไม่ได้ทำ (เช่น rate limit)",
    ],
    acceptance: [
      local,
      "ตรวจเอง: origin ที่ไม่อยู่ใน CORS_ORIGINS ไม่ได้ Access-Control-Allow-Origin",
      "ตรวจเอง: ขาด DATABASE_URL หรือ CORS_ORIGINS แล้ว server ไม่ start พร้อมข้อความชัดเจน",
      "ตรวจเอง: body เกิน 10kb ได้ 413 และ response ไม่มี x-powered-by",
    ],
    solutionNotes: [
      "loadConfig รับ env เป็น parameter (ไม่อ่าน process.env ตรง ๆ) จึงทดสอบได้ง่าย",
      "rate limiting และ CSRF protection (เมื่อใช้ cookie) เป็นหัวข้อต่อยอดที่ควรใส่ก่อนเปิดใช้สาธารณะ",
    ],
    reflection: [
      "จาก OWASP ห้าข้อ ข้อไหนที่ Planner ของซียังป้องกันได้น้อยที่สุด และจะเริ่มแก้อย่างไร",
    ],
    extension: "เพิ่ม rate limit อย่างง่ายสำหรับ /auth/login (เช่น 5 ครั้งต่อ 15 นาทีต่อ IP ด้วย Map ในหน่วยความจำ) แล้วเขียน test ว่าครั้งที่ 6 ได้ 429",
  },
  "be-testing-api": {
    hook: "ทุกครั้งที่เพิ่มฟีเจอร์ใหม่ ซีต้องทดสอบด้วย Postman ซ้ำยี่สิบขั้นตอน วันหนึ่งเพิ่ม co-host แล้วลืมลองกรณี “คนอื่นแก้ไม่ได้” จนช่องโหว่หลุดไป test อัตโนมัติจำทุกกรณีแทนเรา",
    explain: [
      {
        heading: "1) เลือกระดับ test",
        text: [
          "unit test: function เดี่ยวที่มีกฎซับซ้อน (validation, policy, service กับ fake) เร็วและชี้จุดผิดตรง",
          "integration test: เรียก HTTP จริงกับฐานข้อมูลจริง (PGlite) ครอบคลุมการต่อชิ้นส่วน ช้ากว่าแต่จับปัญหาการเชื่อมต่อได้",
          "end-to-end (ผ่านหน้าเว็บ) อยู่นอกขอบเขตคอร์สนี้",
        ],
      },
      {
        heading: "2) test ที่เชื่อถือได้",
        text: [
          "arrange–act–assert: เตรียมข้อมูลเอง กระทำหนึ่งอย่าง ตรวจผลที่มีความหมาย (status และ body)",
          "isolation: app/ฐานข้อมูลใหม่ต่อ test ไม่พึ่งลำดับ ปิดทรัพยากรด้วย t.after/finally",
        ],
      },
      {
        heading: "3) ทดสอบกรณีผิดและความปลอดภัย",
        text: [
          "สำหรับทุก endpoint ที่เปลี่ยนข้อมูล ทดสอบอย่างน้อย: สำเร็จ, ไม่ login (401), คนอื่น (403), ไม่มี resource (404), ข้อมูลผิด (400) และ conflict (409) ถ้ามี",
          "test ของกฎความปลอดภัยคือหลักฐานว่ากฎยังทำงานหลังทุกการแก้",
        ],
      },
    ],
    walkthrough: [
      "withServer สร้าง app ใหม่ เปิด listen(0) รัน test แล้วปิดใน finally",
      "test แรกสร้างสำเร็จและชื่อถูก trim test ที่สองได้ 400",
      "test ที่สามยืนยัน isolation: id เริ่มที่ 1 ใหม่เพราะ app ใหม่",
    ],
    pitfalls: [
      "assert ที่อ่อนเกินไป เช่น assert.ok(response): ผ่านเสมอ",
      "test พึ่งข้อมูลจาก test อื่น",
      "ลืมปิด server: node --test ค้าง",
      "ทดสอบแต่ happy path",
    ],
    checks: [
      { question: "ทำไม integration test ของ API ควรใช้ฐานข้อมูลใหม่ต่อ test", answer: "ให้ผลไม่ขึ้นกับข้อมูลที่ test อื่นทิ้งไว้ และรันแยกหรือสลับลำดับได้" },
      { question: "test ที่ดีของ PATCH ของคนอื่นควร assert อะไรบ้าง", answer: "status 403 และยืนยันว่าข้อมูลไม่เปลี่ยน (GET แล้วเทียบ) ไม่ใช่แค่ status" },
    ],
    recap: [
      "unit สำหรับกฎ; integration สำหรับการเชื่อมต่อ",
      "arrange–act–assert + isolation",
      "ทดสอบ 401/403/404/400/409 ไม่ใช่แค่สำเร็จ",
    ],
    traceHint: "สำหรับแต่ละ test เขียนสามบรรทัด: เตรียมอะไร, ทำอะไร, คาดหวังอะไร แล้วตรวจว่า assert ตรงกับบรรทัดที่สาม",
    practiceHints: [
      "เขียน helper startTestApp และ api ก่อน เพื่อให้ test แต่ละอันสั้น",
      "registerAndLogin ช่วยสร้างผู้ใช้หลายคนใน test เดียว แล้วจัด test เป็นกลุ่มตาม endpoint",
      "ทุก test ใช้ t.after(app.close) และ assert ทั้ง status และส่วนสำคัญของ body; สำหรับกรณี 403 ให้ GET ซ้ำยืนยันว่าข้อมูลไม่เปลี่ยน",
    ],
    acceptance: [
      local,
      "ตรวจเอง: node --test ผ่านและครอบคลุมทุก endpoint สำคัญทั้งกรณีสำเร็จและผิด",
      "ตรวจเอง: รัน test ทีละไฟล์หรือสลับลำดับแล้วผลเหมือนเดิม",
      "ตรวจเอง: ลองลบการตรวจสิทธิ์ใน PATCH แล้ว test 403 ล้ม",
    ],
    solutionNotes: [
      "helper api คืน { status, body } ทำให้ assert อ่านง่ายและจัดการ 204 ได้",
      "การลองทำให้โค้ดผิดแล้วดูว่า test ล้ม คือวิธีพิสูจน์ว่า test ตรวจสิ่งที่ตั้งใจจริง",
    ],
    reflection: [
      "กรณีไหนใน Planner ที่ซีกลัวพังที่สุด และมี test ที่จับได้หรือยัง",
    ],
    extension: "วัดว่ามีบรรทัดไหนยังไม่ถูก test ด้วย node --test --experimental-test-coverage แล้วเพิ่ม test ให้กิ่งสำคัญที่ยังไม่ครอบคลุม",
  },
  "be-architecture": {
    hook: "handler ของ POST /activities/:id/members ยาวร้อยบรรทัด: อ่าน token, ตรวจ input, SQL หลายคำสั่ง, ตรวจที่นั่ง, ส่งอีเมล ทุกครั้งที่แก้กฎการเข้าร่วม ต้องอ่านทั้งก้อนและทดสอบผ่าน HTTP อย่างเดียว",
    explain: [
      {
        heading: "1) สามชั้นและทิศทางการพึ่งพา",
        text: [
          "route (HTTP) → service (กฎของระบบ) → repository (ฐานข้อมูล) ชั้นนอกเรียกชั้นในได้ ชั้นในไม่รู้จักชั้นนอก",
          "service ไม่รู้จัก req/res repository ไม่รู้จักกฎธุรกิจ",
        ],
      },
      {
        heading: "2) ส่งสิ่งที่ต้องใช้เข้ามา",
        text: [
          "createActivityService({ repository, clock, mailer }) รับ dependency ตอนสร้าง test จึงส่ง fake ได้ (เวลาแน่นอน, ไม่ส่งอีเมลจริง)",
          "composition root (server.mjs) อ่าน config ครั้งเดียว สร้าง pool → repository → service → app แล้ว listen",
        ],
      },
      {
        heading: "3) แบ่งเมื่อคุ้ม",
        text: [
          "โปรเจกต์เล็กไม่จำเป็นต้องมีทุกชั้นตั้งแต่วันแรก สัญญาณว่าควรแยก: handler ยาว, กฎเดียวกันซ้ำหลาย route, test ช้าเพราะต้องผ่าน HTTP ทุกครั้ง",
          "ชั้นที่มากเกินไปก็มีต้นทุน: ต้องเปิดหลายไฟล์เพื่อตามงานเดียว",
        ],
      },
    ],
    walkthrough: [
      "service.join ตรวจตามลำดับ: มีกิจกรรมไหม → เริ่มแล้วหรือยัง (ใช้ clock) → ซ้ำไหม → เต็มไหม → บันทึกผ่าน repository",
      "fakeRepository ใช้ Map ทำงานจริงแบบง่ายสำหรับทดสอบ",
      "clock คงที่ที่ 1000 ทำให้กิจกรรม 2 (เริ่ม 500) ถือว่าเริ่มแล้ว",
      "ผลแต่ละครั้งเป็น { ok, reason } ที่ route นำไปแปลงเป็น status ภายหลัง",
    ],
    pitfalls: [
      "service รับ req/res: ผูกกับ HTTP",
      "import ตัวแปร global (pool, Date.now) ตรง ๆ ใน service: test ควบคุมไม่ได้",
      "สร้างชั้นซ้อนเกินจำเป็นตั้งแต่โปรเจกต์ยังเล็ก",
      "repository มีกฎธุรกิจปน: กฎกระจายสองที่",
    ],
    checks: [
      { question: "กฎ “กิจกรรมที่เริ่มแล้วเข้าร่วมไม่ได้” ควรอยู่ชั้นไหน", answer: "service เพราะเป็นกฎของระบบ ไม่ใช่เรื่อง HTTP หรือวิธีเก็บข้อมูล" },
      { question: "ทำไม route แปลง reason → status ดีกว่าให้ service คืน status", answer: "service ใช้ได้กับช่องทางอื่น (CLI, job) และไม่ผูกกับรายละเอียดของ HTTP" },
    ],
    recap: [
      "route → service → repository; ชั้นในไม่รู้จักชั้นนอก",
      "ส่ง dependency เข้ามา; ประกอบที่ composition root",
      "แบ่งชั้นเมื่อความซับซ้อนคุ้มกับต้นทุน",
    ],
    traceHint: "สำหรับแต่ละการเรียก join ไล่ return ที่เกิดขึ้นตามลำดับเงื่อนไข และสังเกตว่าไม่มีบรรทัดไหนรู้จัก HTTP",
    practiceHints: [
      "เริ่มจากย้ายกฎของ join ออกจาก route ก่อน (ชิ้นเดียว) แล้วรัน test เดิมให้ผ่าน",
      "service รับ { repository, clock } คืน { ok, reason } และ route มี map reason → status ที่เดียว",
      "unit test ของ service ใช้ fake repository (Map) และ clock คงที่ ทดสอบ not-found, already-started, already-joined, full และสำเร็จ",
    ],
    acceptance: [
      "ตัวอย่างพิมพ์ผลสี่บรรทัดตาม expected output (Run ได้บนเว็บ)",
      local,
      "ตรวจเอง: service ไม่ import express และไม่ใช้ req/res",
      "ตรวจเอง: unit test ของ service ≥ 5 กรณีผ่านโดยไม่เปิด HTTP และ integration test เดิมยังผ่าน",
    ],
    solutionNotes: [
      "policy (canEditActivity) ถูกเรียกจาก service ไม่ใช่จาก route จึงใช้กฎเดียวกันทุกช่องทาง",
      "repository.join ยังทำ transaction/ล็อกเอง เพราะเป็นเรื่องความถูกต้องของข้อมูลที่ต้องทำใกล้ฐานข้อมูล",
    ],
    reflection: [
      "หลัง refactor การเพิ่มกฎใหม่ (เช่นห้ามเข้าร่วมเกิน 3 กิจกรรมต่อสัปดาห์) ต้องแก้กี่ไฟล์ และทดสอบได้เร็วขึ้นไหม",
    ],
    extension: "เพิ่ม mailer เป็น dependency ของ service ที่ส่งอีเมลยืนยันหลัง join สำเร็จ ใน test ใช้ fake mailer ที่จดว่าส่งอะไรไป แล้ว assert ว่าส่งครั้งเดียวเฉพาะเมื่อสำเร็จ",
  },
  "be-project-planner-capstone": {
    hook: "ทุกชิ้นที่สร้างมาตั้งแต่ M1 ถึง M6 พร้อมแล้ว capstone คือการประกอบให้เป็นบริการที่คนอื่นติดตั้ง รัน และตรวจได้จริง โดยมีหลักฐานว่าความถูกต้องและความปลอดภัยทำงาน ไม่ใช่แค่ “รันบนเครื่องผมได้”",
    explain: [
      {
        heading: "1) definition of done",
        text: [
          "เกณฑ์ส่งมอบเจ็ดข้อในคำอธิบายบทคือ checklist ที่ตรวจได้ งานที่ยังไม่เสร็จให้เขียนตามจริงใน README",
          "หลักฐานที่ดีคือคำสั่งที่คนอื่นรันซ้ำได้ (npm test) พร้อมผล",
        ],
      },
      {
        heading: "2) ลำดับความสำคัญ",
        text: [
          "ความถูกต้องของข้อมูล (transaction, constraint) และความปลอดภัย (auth, สิทธิ์) มาก่อนฟีเจอร์ใหม่",
          "test ของสิ่งที่ทำเสร็จแล้วมาก่อนฟีเจอร์ที่ยังไม่มี test",
        ],
      },
      {
        heading: "3) สิ่งที่เว็บไซต์นี้ตรวจให้ไม่ได้",
        text: [
          "Express, PostgreSQL และ server ต้องรันในเครื่อง เว็บไซต์ไม่อ้างว่าตรวจสิ่งเหล่านี้ผ่าน",
          "บันทึกผลการตรวจของตัวเองใน README/Field notes เป็นหลักฐานการเรียนรู้",
        ],
      },
    ],
    walkthrough: [
      "checklist เป็น array ของ [รายการ, เสร็จแล้วไหม]",
      "นับรายการที่เสร็จด้วย filter แล้วพิมพ์รายการที่ยังไม่เสร็จทีละบรรทัด",
    ],
    pitfalls: [
      "อ้างว่าเสร็จโดยไม่มีหลักฐานที่รันซ้ำได้",
      "เพิ่มฟีเจอร์ก่อนทำ test/ความปลอดภัยของสิ่งที่มีอยู่",
      "README ที่ข้ามขั้นตอนติดตั้งหรือตัวแปร environment",
    ],
    checks: [
      { question: "ทำไม README ต้องระบุตัวแปร environment ครบ", answer: "เพราะคนอื่นต้องรู้ว่าต้องตั้งค่าอะไรบ้างจึงจะรันได้ และ server ของเราตรวจว่าขาดไม่ได้" },
      { question: "หลักฐานแบบไหนที่คนอื่นตรวจซ้ำได้", answer: "คำสั่งที่รันได้พร้อมผล เช่น npm test ผ่านกี่ test และรายการกรณีที่ครอบคลุม" },
    ],
    recap: [
      "definition of done ที่ตรวจได้",
      "ความถูกต้องและความปลอดภัยก่อนฟีเจอร์",
      "หลักฐานที่รันซ้ำได้",
    ],
    traceHint: "ไล่ checklist ทีละข้อแล้วนับเฉพาะที่ ok เป็น true จากนั้นเขียนรายการที่เหลือตามลำดับเดิม",
    practiceHints: [
      "เริ่มจากทำ checklist ใน README ให้ตรงกับสถานะจริงก่อนเขียนโค้ดเพิ่ม",
      "ทำงานที่เหลือตามลำดับ: test ของสิ่งที่มีอยู่ → slots/votes → SECURITY-CHECKLIST",
      "ก่อนส่ง: npm ci ในโฟลเดอร์ใหม่ (clone สะอาด), npm run migrate, npm test, npm start แล้วทำตาม README ด้วย curl ทีละขั้น",
    ],
    acceptance: [
      "ตัวอย่างพิมพ์สรุป checklist ตาม expected output (Run ได้บนเว็บ)",
      local,
      "ตรวจเอง: clone ใหม่แล้วทำตาม README ได้จนรันและ test ผ่าน",
      "ตรวจเอง: checklist ใน README ตรงกับความจริงทุกข้อ",
    ],
    solutionNotes: [
      "README ในเฉลยระบุ endpoint และ status ที่เป็นไปได้ ทำให้ทีม front-end ใช้เป็นสัญญาได้ทันที",
      "การใช้ PGlite ใน test และ PostgreSQL จริงตอนรัน ทำให้ test เร็วโดยไม่เสียความเหมือนจริงของ SQL",
    ],
    reflection: [
      "ถ้าย้อนกลับไปเริ่ม Planner ใหม่ การตัดสินใจไหนที่จะทำเหมือนเดิม และไหนที่จะเปลี่ยน",
    ],
    extension: "เชื่อมหน้าเว็บ (React หรือ Next.js) เข้ากับ API นี้: หน้า login, รายการกิจกรรม และปุ่มเข้าร่วมที่แสดง error ตาม error contract",
  },
};
