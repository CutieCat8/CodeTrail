# Design research and implemented direction

อัปเดตล่าสุด: 2026-09-30

เอกสารนี้แยก **สิ่งที่เข้าถึง/สังเกตได้จริง** ออกจาก **การตีความเพื่อนำมาใช้** ไม่ถือว่าหน้า reference เป็นแบบที่ต้องลอก และไม่มี code หรือ asset ภายนอกถูกคัดลอกเข้าโปรเจกต์

## Codédex

- URL ที่เปิดจริง: `https://www.codedex.io/`
- สิ่งที่เข้าถึงได้: หน้า URL ผ่าน web fetch แต่ผลที่เครื่องมือคืนมามีเพียงข้อมูลน้อยมาก/องค์ประกอบภาพหนึ่งรายการ ไม่ได้เข้าถึง interactive product อย่างเพียงพอ
- ข้อเท็จจริงที่สังเกตได้: ยืนยันได้เพียงว่า URL ตอบกลับ; หลักฐานที่ได้ไม่พอสำหรับอธิบาย layout, motion หรือ learning flow อย่างน่าเชื่อถือ
- การตีความ/ข้อเสนอ: แนวคิด “โลกเดียวกันและความก้าวหน้าผ่านด่าน” มาจาก brief ของผู้ใช้ ไม่อ้างว่า reverse-engineer จากหน้าที่เปิดไม่ได้
- หลักการที่ใช้: world identity, mascot states และ journey progression
- ใช้ที่: Dashboard, Curriculum, Lab, Roadmap, completion state; นำไปใช้แล้วบางส่วนใน commits `3940f3b`, `75da2bf`, `89fba30`, `18bdd70`
- สิ่งที่ไม่ใช้: ไม่คัดลอกข้อความ, quest structure, logo, screenshots หรือ artwork
- License/attribution: ไม่มี code/asset จาก Codédex ใน repo จึงไม่มี attribution dependency

## MotionSites

- URL ที่เปิดจริง: `https://motionsites.ai/`
- สิ่งที่เข้าถึงได้: web fetch timeout; ไม่ได้ภาพ, interactive site หรือ source code
- ข้อเท็จจริงที่สังเกตได้: ไม่มีหลักฐานเพียงพอสำหรับบันทึก visual finding
- การตีความ/ข้อเสนอ: ไม่ใช้ชื่อ MotionSites เป็นหลักฐานของ motion choice ใด ๆ ใน implementation
- หลักการที่ใช้: ไม่มีหลักการเฉพาะที่อ้างจากแหล่งนี้
- ใช้ที่/สถานะ: ยังไม่ได้ใช้
- สิ่งที่ไม่ใช้: ไม่ติดตั้ง animation library หรือคัดลอก effect เพราะไม่ได้ตรวจ implementation/license
- License/attribution: ไม่มี code/asset ถูกนำมาใช้

## GetLayers

- URL ที่เปิดจริง: `https://www.getlayers.ai/`
- สิ่งที่เข้าถึงได้: ข้อความของหน้าเว็บผ่าน web fetch; ไม่ได้ตรวจ interactive editor หรือดาวน์โหลด asset
- ข้อเท็จจริงที่สังเกตได้:
  - หน้าอธิบายการสร้างภาพแบบ layered/cinematic composition และแบ่งเป็น scenes, sections, backgrounds
  - มีตัวอย่าง/ถ้อยคำเกี่ยวกับ “Roadmap Ascent”
  - วาง layer เป็นฐานตั้งต้น ไม่ใช่งาน final ที่ใช้โดยไม่ปรับ
  - หน้าเว็บแยก free layers สำหรับทดลองและ commercial license สำหรับการใช้งานเชิงพาณิชย์
- การตีความ/ข้อเสนอ: ใช้แนวคิดแยก foreground/midground/background และให้แต่ละฉากมี focal point เดียว แทนการใส่ glow/grid เต็มหน้า
- หลักการที่ใช้: hero composition, world landmark framing และภาพที่ไม่บรรจุข้อความสำคัญ
- ใช้ที่: `ExpeditionArt`, Dashboard hero, Curriculum covers และ Lab worlds; นำไปใช้แล้วใน `80dc95b`, `3940f3b`, `75da2bf`, `89fba30`
- สิ่งที่ไม่ใช้: ไม่ใช้ generated layer/asset ของ GetLayers และไม่เลียนแบบ landing-page parallax เพราะหน้าบทเรียนต้องนิ่งและอ่านได้นาน
- License/attribution: ไม่มี asset/code จาก GetLayers ถูกนำมาใช้ จึงไม่มี license dependency

## Basement Laboratory

- URL ที่เปิดจริง: `https://github.com/basementstudio/basement-laboratory`
- สิ่งที่เข้าถึงได้: README/repository text ผ่าน GitHub page; ไม่ได้ clone หรือรัน source
- ข้อเท็จจริงที่สังเกตได้:
  - repository ระบุการใช้ Three.js, React Three Fiber และ Drei
  - repository ประกาศ MIT License
- การตีความ/ข้อเสนอ: สิ่งที่มีประโยชน์คือความสอดคล้องของ experimental world และ branded components ไม่ใช่การนำ 3D stack มาใส่ใน learning workspace
- หลักการที่ใช้: component ที่มีบุคลิกควรถูกใช้เป็นภาษาร่วมทั้งระบบ แต่พื้นที่อ่าน/เขียนต้องลดการตกแต่ง
- ใช้ที่: shell, mascot, illustration language และ world map; นำไปใช้แล้วบางส่วนผ่าน component ของเราเอง
- สิ่งที่ไม่ใช้: ไม่ clone repository, ไม่เพิ่ม Three.js/R3F/Drei และไม่คัดลอก shader/effect เพราะเพิ่ม dependency/performance cost โดยไม่ช่วยงานเรียนหลัก
- License/attribution: repository อ้าง MIT แต่ไม่มี code/asset ถูกนำมาใช้ จึงไม่มี attribution artifact ใน bundle

## Design system ที่เลือกจริง

Canonical implementation: `src/app/globals.css` โดย token อยู่ใน `:root` และ component ที่ใช้ภาพอยู่ใน `src/components/ExpeditionArt.tsx` / `src/components/PixelCat.tsx`

### Color

| Semantic role | Token | Current value |
|---|---|---|
| Canvas | `--color-canvas` | `#0b1020` |
| Deep canvas | `--color-canvas-deep` | `#070b16` |
| Surface | `--color-surface` | `#141c30` |
| Raised surface | `--color-surface-raised` | `#1c2740` |
| Primary text | `--color-text-primary` | `#f3f5fc` |
| Secondary text | `--color-text-secondary` | `#b5c0d8` |
| Primary action / success | `--color-action` | `#7ce8bd` |
| Java | `--color-java` | `#b6a0ff` |
| Information / link | `--color-info` | `#76cfff` |
| Checkpoint / attention | `--color-checkpoint` | `#f4c778` |
| Error | `--color-danger` | `#ff8793` |

ยังมี legacy aliases (`--ink`, `--mint`, `--cyan` ฯลฯ) เพื่อค่อย ๆ ย้าย component เดิมโดยไม่ทำ visual regression พร้อมกัน

### Typography

- Thai/body: `--font-sans: "Noto Sans Thai", "Leelawadee UI", Tahoma, sans-serif`
- Code/short labels: `--font-mono: "Cascadia Code", "Noto Sans Mono", Consolas, monospace`
- Body base 16px, `--leading-body: 1.72`, reading width `--layout-reading: 72ch`
- Monospace ใช้กับ code, metadata และป้ายสั้น ไม่ใช้กับย่อหน้าภาษาไทย
- Page/section hierarchy ถูกใช้จริงใน shell, Dashboard, Lesson และ Micro-step; หน้ารองยังต้องปรับใน R1–R5

### Spacing, shape and layout

- Spacing tokens: `--space-1` ถึง `--space-16`
- Radius: `--radius-sm/md/lg/xl` และ `--radius-pixel`
- Layout: `--layout-page: 1440px`, `--sidebar: 240px`, `--topbar: 68px`
- Shadow/focus tokens: `--shadow-sm`, `--shadow-md`, `--shadow-focus`
- หลักการ: ใช้ border เมื่อแบ่งข้อมูลจริง ไม่ห่อทุกย่อหน้าเป็นกล่อง และให้แต่ละหน้ามี composition ต่างกัน

### Illustration

ไฟล์ canonical: `public/art/README.md`

- `public/art/expedition-base.png` — ฉากฐานฝึก Dashboard
- `public/art/miso-sprite-sheet.png` — มาสคอตแมวหุ่นยนต์ 4 สถานะ: welcome, study, celebrate, rest
- `public/art/world-landmarks.png` — landmark 8 โลกสำหรับเส้นทางเรียน

ภาพสร้างด้วย OpenAI image generation เมื่อ 2026-09-30 สำหรับโปรเจกต์นี้โดยเฉพาะ ใช้ prompt ที่กำหนด palette, 16-bit pixel-art direction, no text/logo/watermark ไม่มี third-party artwork ถูกคัดลอก ต้องตรวจ responsive sizing และ optimize น้ำหนักใน R9

### Motion

- `--motion-fast: 150ms` สำหรับ hover/focus
- `--motion-panel: 220ms` สำหรับ panel/drawer
- `--motion-page: 260ms` สำหรับ transition เบา
- `--ease-standard: cubic-bezier(.2,.8,.2,1)`
- ใช้ transform/opacity กับ hover และ panel เมื่อเหมาะสม ไม่ใช้ custom cursor/scroll hijacking
- `prefers-reduced-motion` มี global override ใน `globals.css`; ต้อง audit ทุกหน้าอีกครั้งใน R7
- พื้นที่บทเรียน/editor ไม่มีฉากเคลื่อนไหวหลังข้อความ

## การตัดสินใจที่ตั้งใจไม่ทำ

- ไม่สร้าง landing page ใหม่ทับ product screens
- ไม่ใช้ 3D/WebGL/parallax หนักในพื้นที่เรียน
- ไม่ใช้ emoji ขยายเป็น hero illustration
- ไม่ให้ mascot พูดทุก interaction
- ไม่ทำทุกหน้าเป็น PageHeader + CardGrid แบบเดียวกัน
- ไม่เพิ่ม animation เพื่อกลบ hierarchy หรือ layout ที่ยังไม่ดี
- ไม่ติดตั้ง repository/library ภายนอกเพื่อ effect เล็กชิ้นเดียว

## แหล่งอ้างอิงภายใน repo

- Product context/baseline: `docs/APP-OVERVIEW.md`, `docs/screenshots/`
- Current implementation/status: `docs/REDESIGN-HANDOFF.md`
- Remaining work: `docs/REDESIGN-PLAN.md`
- Asset origin: `public/art/README.md`
- Tokens/layout/motion: `src/app/globals.css`
- Mascot/art components: `src/components/PixelCat.tsx`, `src/components/ExpeditionArt.tsx`

