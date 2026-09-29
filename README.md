# Sea’s Full-stack Quest

แพลตฟอร์มฝึกเขียนโปรแกรมส่วนตัวสำหรับซี: นักศึกษา Digital Industry Integration ที่ต้องการพัฒนาเป็น Full-stack Developer โดยเน้น Back-end, system design, Java และ OOP

## ขอบเขตเวอร์ชันแรก

- บทเว็บเต็ม 12 บท เชื่อมเป็นบริบท **Friends Activity Planner**
- บท Java เต็ม 10 บท ตั้งแต่ JDK/command line ถึง encapsulation และ composition
- โหมดภารกิจ Full-stack, Java & OOP และผสมสองเส้นทาง
- โจทย์ตรวจอัตโนมัติ 3 ข้อ ทำงานใน Web Worker พร้อม timeout 1.5 วินาที
- โจทย์เช็กลิสต์และ Java ที่ตรวจในเครื่องมากกว่า 3 ข้อ
- Dashboard, Learning Map, Challenge Library, Skill Evidence, Journal, Projects และ Settings
- Auto-save, คืนคำตอบหลัง refresh, attempts, latest result, checklist, Export/Import JSON

## รันในเครื่อง

ต้องใช้ Node.js 20.9 ขึ้นไป (ทดสอบด้วย Node.js 22.18)

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

Production:

```bash
npm run build
npm start
```

Tests:

```bash
npm test
```

## โครงสร้าง

- `src/content/lessons.ts` — เนื้อหาบทและ challenge แบบ structured data
- `src/types/domain.ts` — Course/Lesson/Challenge/Test/Attempt/Progress/Journal/Skill/Achievement model ในรูป TypeScript
- `src/lib/storage.ts` — persistence, validation, streak (Asia/Bangkok), XP
- `src/lib/recommendation.ts` — กฎภารกิจที่อธิบายเหตุผลได้
- `src/lib/runner.ts` — behavioral JavaScript runner ใน isolated Web Worker
- `src/components/QuestApp.tsx` — product screens และ Lesson Workspace
- `src/app/globals.css` — design tokens, responsive layout, reduced motion

## เพิ่มบทเรียน

1. เพิ่ม object ชนิด `Lesson` ใน `src/content/lessons.ts`
2. ตั้ง `id` ไม่ซ้ำ, `track`, `module`, `order`, prerequisite และ skill IDs
3. ใส่ objective, real-world reason, explanation, runnable example, mistakes, prompt, acceptance criteria, starter, hints 3 ระดับ, solution, reflection และ bonus
4. เลือก `checkMode`: `auto`, `self` หรือ `local-java`
5. รัน `npm test` เพื่อตรวจว่าไม่มี starter/solution ว่าง

## เพิ่มโจทย์และ test cases

โจทย์ `auto` ต้องเป็นฟังก์ชัน JavaScript แบบ synchronous ในเวอร์ชันนี้ ระบุ `functionName` และ `tests` ที่มี `name`, `args`, `expected` ระบบจะเรียกฟังก์ชันจริงและเทียบผลลัพธ์เชิงโครงสร้าง ไม่ค้นหาคำใน source code

Runner ทำงานใน Web Worker แยก UI, ปิด `fetch`, `XMLHttpRequest`, `WebSocket`, `importScripts` และ terminate เมื่อเกิน 1.5 วินาที แต่ **ไม่ใช่ container security boundary** จึงไม่ควรใช้กับข้อมูลลับหรือเปลี่ยนเป็น multi-user runner โดยตรง

## Java

ใช้ **JDK 21 LTS** บท Java ให้ผู้เรียนรันในเครื่อง:

```bash
javac Main.java
java Main
```

เว็บไซต์บันทึก source, checklist และผลที่ผู้เรียนจด แต่ไม่อ้างว่าคอมไพล์หรือ test ผ่าน ไม่มี Java runner บน hosting รุ่นนี้ หัวข้อ inheritance, polymorphism, interfaces, JUnit และ RPG Battle CLI แสดงเป็น “วางแผนไว้” จนกว่าจะมีเนื้อหาเต็ม

## การจัดเก็บข้อมูล

ใช้ key `seas-fullstack-quest:v1` ใน `localStorage` และ validate schema ก่อน Import ข้อมูลอยู่เฉพาะ browser/profile ปัจจุบัน:

- ไม่ซิงก์ข้ามอุปกรณ์
- ไม่มีบัญชีผู้ใช้หรือฐานข้อมูล
- ล้าง browser data แล้วข้อมูลหาย
- ใช้ Export JSON สำรอง และ Import เพื่อย้ายเครื่อง

## Next.js ที่ใช้ในบทเรียน

ตัวแอปใช้ Next.js **16.3.6** กับ App Router บทเรียนย้ำให้ระบุ `cache: "no-store"`, `cache: "force-cache"` หรือ revalidation ตาม intent ของ request และไม่สมมติว่า `fetch` มี default cache behavior เหมือนกันทุกเวอร์ชัน

## Deploy และความเป็นส่วนตัว

แนะนำ Vercel Preview Deployment พร้อม **Vercel Authentication / Standard Protection** แล้วส่ง deployment URL (ไม่ใช่ production domain) ให้เฉพาะ Vercel account ที่อนุญาต จากนั้นทดสอบในหน้าต่างที่ไม่ได้ login ว่าถูกปฏิเสธจริง

```bash
vercel
```

ห้ามใช้ URL เดายากหรือ `noindex` แทน access control; metadata มี `noindex` เป็นเพียงชั้นเสริมเท่านั้น สำหรับ Hobby plan production domain ไม่ได้รับการป้องกันแบบเดียวกับ preview/deployment URL จึงไม่ควรส่ง production URL เป็น private URL

## ข้อจำกัด

- localStorage ไม่ซิงก์ข้ามอุปกรณ์และไม่เหมาะกับผู้ใช้หลายคน
- editor เป็น textarea ไม่ใช่ Cloud IDE
- auto runner รองรับโจทย์ฟังก์ชัน JavaScript synchronous เท่านั้น ไม่ compile TypeScript
- Express, SQL, UI และ Java ใช้หลักฐาน/เช็กลิสต์และการรันในเครื่อง
- ยังไม่มี Java sandbox, JUnit runner, authentication ภายในแอป หรือ persistent database
- หัวข้อ Java ระยะ 2 แสดง “วางแผนไว้” และไม่มีปุ่มไปหน้าเปล่า

## ความเป็นส่วนตัวของ source

Repository และ deployment ต้องตั้งเป็น private/protected แยกกัน การทำ GitHub repository เป็น private ไม่ทำให้ deployment private โดยอัตโนมัติ
