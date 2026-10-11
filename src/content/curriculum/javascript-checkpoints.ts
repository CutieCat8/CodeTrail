import type { TopicSource } from "@/types/curriculum";

const OPEN = "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ส่งความพยายามของตัวเองก่อนดู feedback หรือเฉลย";
const SUBMIT = "ส่ง: โค้ด ค่าที่ทำนายก่อนรัน ผลรันจริง และคำอธิบายด้วยคำของตัวเอง ถ้ายังไม่สำเร็จ ส่งสิ่งที่ลองและ error ที่เห็นเพื่อเทียบกับ rubric ได้ (การบันทึกไม่ใช่การยืนยันว่าถูก)";
const prompt = (...lines: string[]) => [OPEN, ...lines, SUBMIT].join("\n");

export const javascriptCheckpoints: Record<string, NonNullable<TopicSource["checkpoint"]>> = {
  "js-values": {
    prompt: prompt(
      "ร้านรับจำนวนแก้วจากฟอร์มเป็นข้อความ cupsText = \"8\" และมีแก้วสำรอง extra = 2 (เป็น number)",
      "1) ก่อนรัน ทำนายค่าและ typeof ของ cupsText + extra, cupsText - extra และ cupsText * extra",
      "2) รันเพื่อเทียบกับที่ทำนาย",
      "3) เขียนบรรทัดที่ได้จำนวนแก้วรวม 10 ชนิด number โดยแปลงชนิดเองอย่างชัดเจน",
      "4) เปลี่ยน cupsText เป็น \"0\" แล้วรันอีกครั้ง บันทึกผลทุกบรรทัด",
    ),
    rubric: [
      "ผลจริงเมื่อ \"8\": 82 string, 6 number, 16 number และยอดรวม 10 number; เมื่อ \"0\": 02 string, -2, 0 และยอดรวม 2",
      "ค่าตั้งต้นอยู่ในตัวแปร และยอดรวมใช้การแปลงที่ชัดเจน (เช่น Number) ไม่พึ่งการแปลงอัตโนมัติ",
      "อธิบายได้ว่าทำไม + ต่อข้อความ ส่วน - และ * คำนวณเป็นตัวเลข โดยเทียบกับค่าที่ทำนาย",
    ],
    modelAnswer: `const cupsText = "8";
const extra = 2;

console.log(cupsText + extra, typeof (cupsText + extra));
console.log(cupsText - extra, typeof (cupsText - extra));
console.log(cupsText * extra, typeof (cupsText * extra));

const total = Number(cupsText) + extra;
console.log(total, typeof total);

ผลจริง: 82 string / 6 number / 16 number / 10 number
เมื่อเปลี่ยน cupsText เป็น "0": 02 string / -2 number / 0 number / 2 number
+ ที่มี string อยู่ฝั่งหนึ่งจะต่อข้อความ จึงได้ "82" ส่วน - และ * แปลงข้อความเป็นตัวเลขก่อนคำนวณ (type coercion) บรรทัด total แปลงเองด้วย Number จึงได้ number แน่นอน ใส่วงเล็บหลัง typeof เพื่อดูชนิดของผลทั้งก้อน ถ้าใช้ตัวแปรเก็บผลแต่ละบรรทัดก่อนแล้วค่อย typeof ก็ถูกเหมือนกัน`,
  },
  "js-variables": {
    prompt: prompt(
      "ระบบนับคนในห้องประชุม: ห้องจุ 6 คน (ไม่เปลี่ยน) เริ่มมี 0 คน จากนั้นเข้ามา 5 คน ออกไป 2 คน และเข้ามาอีก 4 คน",
      "เขียนโปรแกรมที่แสดงจำนวนคนหลังแต่ละเหตุการณ์ แล้วบรรทัดสุดท้ายแสดงที่ว่างที่เหลือ (ความจุ ลบ จำนวนคน) เลือก const หรือ let ให้แต่ละชื่อเอง",
      "จากนั้นทดลองเพิ่มบรรทัดที่เปลี่ยนค่าความจุหลังประกาศหนึ่งครั้ง รัน บันทึก error ที่เห็น แล้วลบบรรทัดนั้นออก",
      "อธิบายว่าผลบรรทัดสุดท้ายบอกอะไรเกี่ยวกับห้อง",
    ),
    rubric: [
      "แสดง 5, 3, 7 แล้ว ที่ว่าง -1 โดยคำนวณจากชื่อ ไม่พิมพ์ตัวเลขคงที่",
      "ความจุใช้ const จำนวนคนใช้ let และบันทึก error จริง TypeError: Assignment to constant variable.",
      "อธิบายว่า -1 หมายถึงคนเกินความจุ 1 คน และบอกได้ว่าชื่อใดเปลี่ยนค่า ชื่อใดคงที่",
    ],
    modelAnswer: `const capacity = 6;
let people = 0;

people = people + 5;
console.log(people);
people = people - 2;
console.log(people);
people = people + 4;
console.log(people);

console.log("ที่ว่าง", capacity - people);

ผลจริง: 5 / 3 / 7 / ที่ว่าง -1
บรรทัดทดลอง capacity = 7; ทำให้เกิด TypeError: Assignment to constant variable. เพราะ const ห้ามผูกชื่อกับค่าใหม่ จึงลบบรรทัดนั้นออก
people เปลี่ยนทุกเหตุการณ์จึงใช้ let ส่วน capacity คงที่จึงใช้ const ผล -1 แปลว่าในห้องมีคนเกินความจุ 1 คน (บท conditions จะสอนวิธีตรวจและแจ้งเตือนกรณีนี้) ใช้ people += 5 ก็ถูก`,
  },
  "js-strings": {
    prompt: prompt(
      "รหัสบัตรสมาชิกมีรูปแบบ TH-ปี-ลำดับ เช่น \"TH-2026-0042\" แต่ผู้ใช้บางคนพิมพ์มาเป็น \" th-2025-0100 \" (ตัวเล็กและมีช่องว่าง)",
      "เขียนโปรแกรมที่ทำให้รหัสเป็นรูปมาตรฐาน แล้วแสดง 3 บรรทัด: รหัสมี TH- หรือไม่ (true/false), ข้อความ ปี <ปี> ลำดับ <ลำดับ>, และความยาวของค่าเดิมกับค่าที่ทำสะอาดแล้ว",
      "ทดลองกับ \"TH-2026-0042\", \" th-2025-0100 \" และ \"TH-26-1\" แล้วอธิบายว่าทำไมกรณีสุดท้ายได้ผลไม่สมเหตุสมผล",
    ),
    rubric: [
      "\"TH-2026-0042\" ได้ true / ปี 2026 ลำดับ 0042 / 12 12 และ \" th-2025-0100 \" ได้ true / ปี 2025 ลำดับ 0100 / 14 12",
      "ทำสะอาดก่อนแยกส่วน และค่าเดิมไม่ถูกแก้ (ความยาวเดิมยังรวมช่องว่าง)",
      "อธิบายได้ว่า \"TH-26-1\" ได้ปีและลำดับผิดเพราะตัดตามตำแหน่งที่สมมติว่าปีมี 4 หลัก",
    ],
    modelAnswer: `const raw = " th-2025-0100 ";
const code = raw.trim().toUpperCase();
const year = code.slice(3, 7);
const order = code.slice(8, 12);

console.log(code.includes("TH-"));
console.log(\`ปี \${year} ลำดับ \${order}\`);
console.log(raw.length, code.length);

ผลจริงกับ " th-2025-0100 ": true / ปี 2025 ลำดับ 0100 / 14 12
กับ "TH-2026-0042": true / ปี 2026 ลำดับ 0042 / 12 12
กับ "TH-26-1": true / ปี 26-1 ลำดับ (ว่าง) / 7 7
trim และ toUpperCase คืน string ใหม่ raw จึงยังยาว 14 ปีอยู่ index 3 ถึง 6 จึงใช้ slice(3, 7) ลำดับอยู่ index 8 ถึง 11 วิธีนี้ถูกเฉพาะเมื่อรูปแบบตรงตามที่กำหนด "TH-26-1" ปีมีแค่ 2 หลัก ตำแหน่งจึงเลื่อนและได้ค่าผิด ระบบจริงควรตรวจรูปแบบก่อนตัด ใช้ + ต่อข้อความแทน template literal ก็ถูก`,
  },
  "js-numbers": {
    prompt: prompt(
      "แบ่งบิลอาหารเท่า ๆ กัน: ยอดบิลมาจากฟอร์มเป็นข้อความ billText และจำนวนคนเป็น number people ระบบจ่ายเงินเป็นสตางค์ (จำนวนเต็ม)",
      "แสดงในบรรทัดเดียว: ยอดบิลแปลงแล้วเป็นตัวเลขจำกัดหรือไม่, สตางค์ที่แต่ละคนจ่าย (ปัดลงเป็นจำนวนเต็ม) และเศษสตางค์ที่เหลือหลังแบ่ง",
      "ทดลอง \"100\" กับ 3 คน, \"100.50\" กับ 3 คน และ \"1,000\" กับ 2 คน อธิบายว่าทำไมคิดเป็นสตางค์ และผลของกรณีสุดท้ายใช้จ่ายเงินได้หรือไม่",
    ),
    rubric: [
      "ได้ true 3333 1 / true 3350 0 / false NaN NaN ตามสามกรณี",
      "แปลงข้อความเป็นตัวเลขเอง คิดเป็นสตางค์ก่อนแบ่ง และหาเศษด้วยการคำนวณ ไม่พิมพ์คำตอบเอง",
      "อธิบายได้ว่า \"1,000\" แปลงไม่ได้ (NaN) จึงใช้จ่ายเงินไม่ได้ และทำไมจำนวนเต็มสตางค์ปลอดภัยกว่าทศนิยม",
    ],
    modelAnswer: `const billText = "100";
const people = 3;

const bill = Number(billText);
const satang = Math.round(bill * 100);
const each = Math.floor(satang / people);
const leftover = satang % people;
console.log(Number.isFinite(bill), each, leftover);

ผลจริง: "100" กับ 3 คน ได้ true 3333 1 / "100.50" กับ 3 คน ได้ true 3350 0 / "1,000" กับ 2 คน ได้ false NaN NaN
คูณ 100 เป็นสตางค์ก่อนเพื่อคำนวณกับจำนวนเต็ม Math.round กันกรณีอย่าง 19.99 * 100 ที่ได้ 1998.9999999999998 Math.floor ปัดลง และ % ให้เศษที่แบ่งไม่ลงตัว "1,000" มีเครื่องหมายจุลภาค Number จึงได้ NaN และ NaN ที่เข้าไปในการคำนวณทำให้ผลต่อไปเป็น NaN ทั้งหมด Number.isFinite เป็น false จึงบอกได้ว่าไม่ควรนำไปจ่ายเงิน (บทถัดไปจะสอน if เพื่อแสดงข้อความเตือนแทน)`,
  },
  "js-conditions": {
    prompt: prompt(
      "ค่าที่จอดรถ: ถ้าชั่วโมงน้อยกว่า 0 แสดง ข้อมูลผิด, ตั้งแต่ 0 ถึง 1 ชั่วโมง (รวม 1) ฟรี แสดง 0, มากกว่า 1 ชั่วโมงคิด 30 บาทต่อชั่วโมงเฉพาะส่วนที่เกิน 1 ชั่วโมง ไม่ปัดเศษ",
      "เขียนจากไฟล์ว่างโดยเก็บชั่วโมงในตัวแปร แล้วเปลี่ยนค่าทดลองทีละกรณี: -1, 0, 1, 2 และ 2.5 อธิบายว่าแต่ละกรณีเข้ากิ่งไหนและทำไม",
    ),
    rubric: [
      "ได้ ข้อมูลผิด, 0, 0, 30 และ 45 ตามห้ากรณี",
      "ลำดับกิ่งถูก: ตรวจค่าติดลบก่อน และช่วงฟรีรวมขอบ 1 ชั่วโมง",
      "แนบผลรันจริงของทั้งห้ากรณีพร้อมเหตุผลการเลือกกิ่ง",
    ],
    modelAnswer: `const hours = 2.5;

if (hours < 0) {
  console.log("ข้อมูลผิด");
} else if (hours <= 1) {
  console.log(0);
} else {
  console.log((hours - 1) * 30);
}

ผลจริงเมื่อเปลี่ยน hours ทีละค่า: -1 → ข้อมูลผิด / 0 → 0 / 1 → 0 / 2 → 30 / 2.5 → 45
ตรวจค่าติดลบก่อน เพราะ -1 ก็ผ่านเงื่อนไข hours <= 1 ด้วย ถ้าสลับลำดับจะได้ 0 แทนข้อมูลผิด ใช้ <= 1 เพราะ 1 ชั่วโมงพอดียังฟรี กิ่งสุดท้ายคิดเฉพาะส่วนที่เกิน 1 ชั่วโมง เขียนเงื่อนไขกลับด้าน (ตรวจ hours > 1 ก่อน แล้วค่อยแยกค่าติดลบ) ก็ถูกถ้าผลทั้งห้ากรณีตรง`,
  },
  "js-functions": {
    prompt: prompt(
      "เขียน function คิดค่าถ่ายเอกสาร รับจำนวนหน้าและราคาต่อหน้า คืนยอดเงิน หรือคืน null เมื่อจำนวนหน้าติดลบ (สมมติว่าทั้งคู่เป็นตัวเลขและราคาต่อหน้าไม่ติดลบ) เลือกชื่อและวิธีเอง",
      "ทดสอบ 0 หน้า, 3 หน้าราคา 2.5 และจำนวนหน้าติดลบ จากนั้นให้ผู้เรียกนำผลของ 3 หน้าไปบวกค่าซอง 5 บาท โดยไม่นำ null ไปคิดเงิน",
    ),
    rubric: [
      "คืน 0, 7.5 และ null ตามสามกรณี",
      "ผู้เรียกนำค่าที่คืนไปคิดต่อได้ 12.5 และตรวจ null ก่อนนำไปบวก",
      "คำอธิบาย parameter และ return ตรงกับโค้ด",
    ],
    modelAnswer: `function copyCost(pages, pricePerPage) {
  if (pages < 0) {
    return null;
  }
  return pages * pricePerPage;
}

console.log(copyCost(0, 2.5));
console.log(copyCost(3, 2.5));
console.log(copyCost(-1, 2.5));

const cost = copyCost(3, 2.5);
if (cost !== null) {
  console.log(cost + 5);
}

ผลจริง: 0 / 7.5 / null / 12.5
pages และ pricePerPage เป็น parameter ที่รับค่าจากการเรียกแต่ละครั้ง return ส่งยอดเงินกลับให้ผู้เรียกตัดสินใจต่อ ส่วน null บอกว่าข้อมูลผิด ผู้เรียกจึงตรวจก่อนบวกค่าซอง ถ้าไม่ตรวจ null + 5 จะได้ 5 ซึ่งดูเหมือนถูกแต่ผิดความหมาย ใช้ชื่ออื่นก็ถูก`,
  },
  "js-runtime": {
    prompt: prompt(
      "อ่านโปรแกรมนี้โดยยังไม่รัน:",
      "",
      "function checkStock() {",
      "  console.log(\"ตรวจสต็อก\");",
      "  return 2;",
      "}",
      "",
      "function placeOrder(item) {",
      "  console.log(\"รับออร์เดอร์ \" + item);",
      "  const stock = checkStock();",
      "  console.log(\"เหลือ \" + stock);",
      "}",
      "",
      "placeOrder(\"ชา\");",
      "placeOrder(\"กาแฟ\");",
      "console.log(\"ปิดร้าน\");",
      "",
      "1) ทำนาย output ทั้งหมดตามลำดับ 2) เขียน call stack (จากล่างขึ้นบน) ขณะที่ ตรวจสต็อก ถูกพิมพ์ครั้งที่สอง 3) ถ้าย้าย return 2; ไปไว้ก่อน console.log(\"ตรวจสต็อก\") output จะเปลี่ยนอย่างไร แล้วรันทั้งสองแบบเพื่อตรวจคำทำนาย",
    ),
    rubric: [
      "output: รับออร์เดอร์ ชา, ตรวจสต็อก, เหลือ 2, รับออร์เดอร์ กาแฟ, ตรวจสต็อก, เหลือ 2, ปิดร้าน",
      "stack ขณะพิมพ์ ตรวจสต็อก ครั้งที่สอง: ระดับบนสุดของไฟล์ → placeOrder(\"กาแฟ\") → checkStock",
      "แบบย้าย return: ตรวจสต็อก หายไปทั้งสองครั้ง แต่ เหลือ 2 ยังพิมพ์ และอธิบายได้ว่า return จบ function ทันที",
    ],
    modelAnswer: `คำทำนายและผลรันจริง (ตรงกัน):
รับออร์เดอร์ ชา
ตรวจสต็อก
เหลือ 2
รับออร์เดอร์ กาแฟ
ตรวจสต็อก
เหลือ 2
ปิดร้าน

stack ขณะพิมพ์ ตรวจสต็อก ครั้งที่สอง (ล่าง → บน): ระดับบนสุดของไฟล์ → placeOrder("กาแฟ") → checkStock
placeOrder ค้างอยู่ที่บรรทัด const stock = checkStock(); จนกว่า checkStock จะ return 2 แล้วจึงทำบรรทัด เหลือ 2 ต่อ เมื่อ placeOrder จบ frame ของมันออกจาก stack แล้วระดับบนสุดจึงเรียก placeOrder("กาแฟ") ใหม่
แบบย้าย return 2; ขึ้นก่อน log: ผลเป็น รับออร์เดอร์ ชา / เหลือ 2 / รับออร์เดอร์ กาแฟ / เหลือ 2 / ปิดร้าน เพราะ return จบ checkStock ทันที บรรทัดหลัง return จึงไม่ถูกทำ แต่ค่า 2 ยังถูกส่งกลับ`,
  },
  "js-scope": {
    prompt: prompt(
      "ระบบโควตาใช้ห้องประชุม: เขียน function ที่สร้าง \"ตัวจำกัดสิทธิ์\" จากจำนวนครั้งสูงสุดที่ได้รับ ตัวจำกัดแต่ละตัวเรียกได้โดยไม่ต้องส่งค่า และตอบ อนุญาต จนครบจำนวนครั้ง หลังจากนั้นตอบ เกินโควตา",
      "ตัวจำกัดที่สร้างแยกกันต้องนับแยกกัน และโค้ดภายนอกต้องแก้ตัวนับโดยตรงไม่ได้",
      "ทดลอง: สร้าง a จาก 2 และ b จาก 1 แล้วเรียก a, a, a, b, b ตามลำดับ และสร้างอีกตัวจาก 0 แล้วเรียกหนึ่งครั้ง จากนั้นลองพิมพ์ตัวนับจากภายนอก function แล้วบันทึกสิ่งที่เกิดขึ้น",
    ),
    rubric: [
      "ได้ อนุญาต, อนุญาต, เกินโควตา, อนุญาต, เกินโควตา และตัวที่สร้างจาก 0 ตอบ เกินโควตา ตั้งแต่ครั้งแรก",
      "ไม่มีตัวนับระดับบนสุดที่ทำให้ a กับ b แชร์กัน และการอ่านตัวนับจากภายนอกเกิด ReferenceError",
      "อธิบายได้ว่าแต่ละครั้งที่สร้างตัวจำกัด function ภายในจำตัวแปรชุดของตัวเอง (closure)",
    ],
    modelAnswer: `function makeLimiter(max) {
  let used = 0;
  return function () {
    if (used >= max) {
      return "เกินโควตา";
    }
    used = used + 1;
    return "อนุญาต";
  };
}

const a = makeLimiter(2);
const b = makeLimiter(1);
console.log(a());
console.log(a());
console.log(a());
console.log(b());
console.log(b());

const none = makeLimiter(0);
console.log(none());

ผลจริง: อนุญาต / อนุญาต / เกินโควตา / อนุญาต / เกินโควตา / เกินโควตา
ลองเพิ่ม console.log(used); ท้ายไฟล์ ได้ ReferenceError: used is not defined เพราะ used อยู่ใน scope ของ makeLimiter เท่านั้น
ทุกครั้งที่เรียก makeLimiter จะสร้าง used และ max ชุดใหม่ function ที่คืนไปจำชุดนั้นไว้ a กับ b จึงนับแยกกัน ส่วนตัวที่สร้างจาก 0 ตรวจ used >= max เป็นจริงตั้งแต่ครั้งแรก นับถอยหลังจาก max ลงไปแทนการนับขึ้นก็ถูก`,
  },
  "js-objects": {
    prompt: prompt(
      "ข้อมูลอุปกรณ์ { name: \"Lamp\", stock: 3, location: { room: \"A\" } } สร้างผลใหม่ที่ stock เป็น 2 แต่ชื่อและห้องเหมือนเดิม",
      "ก่อนทดลอง ทำนายว่าถ้าเปลี่ยน location.room ในผลใหม่ จะกระทบต้นฉบับหรือไม่ แล้วรันเพื่อยืนยัน และแสดงวิธีที่ทำให้ห้องของผลใหม่เป็นอิสระจากต้นฉบับ",
    ),
    rubric: [
      "ต้นฉบับ stock ยังเป็น 3 ส่วนผลใหม่เป็น 2",
      "ผลรันแสดงว่า spread ชั้นเดียวยังแชร์ location (ต้นฉบับเปลี่ยนเป็นห้อง B ด้วย) และอธิบายว่าเป็น shallow copy",
      "แสดงการ copy ชั้น location ด้วย แล้วผลรันยืนยันว่าต้นฉบับไม่เปลี่ยน",
    ],
    modelAnswer: `const original = { name: "Lamp", stock: 3, location: { room: "A" } };

const next = { ...original, stock: 2 };
next.location.room = "B";
console.log(original.stock, next.stock, original.location.room);

const fresh = { name: "Lamp", stock: 3, location: { room: "A" } };
const isolated = { ...fresh, stock: 2, location: { ...fresh.location } };
isolated.location.room = "B";
console.log(fresh.location.room, isolated.location.room);

ผลจริง: 3 2 B / A B
spread คัดลอกเฉพาะชั้นนอก (shallow copy) next.location จึงชี้ object เดียวกับ original.location การเปลี่ยนห้องใน next ทำให้ต้นฉบับเป็น B ด้วย แบบ isolated สร้าง location ใหม่ด้วย spread อีกชั้น ต้นฉบับ fresh จึงยังเป็น A ถ้าโจทย์ไม่ต้องแก้ห้อง spread ชั้นเดียวก็พอ`,
  },
  "js-loops": {
    prompt: prompt(
      "แอปนับก้าวเก็บจำนวนก้าวรายวันเป็นรายการตามลำดับวัน เขียน function ที่รับรายการและเป้าหมาย แล้วคืนจำนวนวันติดต่อกันที่ยาวที่สุดซึ่งเดินถึงเป้าหมาย (เท่ากับเป้าหมายถือว่าถึง)",
      "ทดลอง [3000, 8000, 9000, 2000, 8500, 8200, 9100] กับเป้า 8000, [] กับเป้า 8000, [1000, 2000] กับเป้า 8000 และ [8000, 8000] กับเป้า 8000 เลือกชนิดลูปเองและอธิบายว่าค่าที่ใช้ติดตามเปลี่ยนอย่างไรในวันที่ไม่ถึงเป้า",
    ),
    rubric: [
      "ได้ 3, 0, 0 และ 2 ตามสี่กรณี",
      "นับต่อเนื่องจริง: วันที่ไม่ถึงเป้าทำให้ช่วงใหม่เริ่มนับใหม่ ไม่ได้นับรวมทุกวันที่ถึงเป้า (ตัวอย่างแรกต้องไม่ได้ 5)",
      "อธิบายค่าที่ติดตามทีละวันได้อย่างน้อยหนึ่งช่วง พร้อมผลรันจริง",
    ],
    modelAnswer: `function longestStreak(steps, goal) {
  let best = 0;
  let current = 0;
  for (const day of steps) {
    if (day >= goal) {
      current = current + 1;
      if (current > best) {
        best = current;
      }
    } else {
      current = 0;
    }
  }
  return best;
}

console.log(longestStreak([3000, 8000, 9000, 2000, 8500, 8200, 9100], 8000));
console.log(longestStreak([], 8000));
console.log(longestStreak([1000, 2000], 8000));
console.log(longestStreak([8000, 8000], 8000));

ผลจริง: 3 / 0 / 0 / 2
current คือความยาวช่วงที่กำลังนับ best คือช่วงยาวที่สุดที่เคยเห็น ในตัวอย่างแรก current เป็น 0, 1, 2 แล้วกลับเป็น 0 ที่ 2000 ก่อนขึ้นเป็น 1, 2, 3 จึงได้ best 3 รายการว่างไม่เข้าลูปจึงคืนค่าเริ่ม 0 ใช้ for แบบตัวนับหรือ while ก็ถูกถ้าผลตรงทุกกรณี`,
  },
  "js-arrays": {
    prompt: prompt(
      "ร้านอาหารมีเมนู [{ code: \"A1\", name: \"ข้าวผัด\", price: 60 }, { code: \"B2\", name: \"ชาเย็น\", price: 35 }] ลูกค้าส่งรายการรหัสที่สั่งตามลำดับ เช่น [\"B2\", \"A1\", \"Z9\"]",
      "เขียน function ที่คืนรายการชื่อเมนูตามลำดับที่สั่ง ถ้ารหัสไม่มีในเมนูให้ใส่ข้อความ ไม่พบ ตามด้วยรหัสนั้น ห้ามแก้เมนูหรือรายการที่สั่ง",
      "ทดลอง [\"B2\", \"A1\", \"Z9\"], [] และ [\"A1\", \"A1\"] แล้วอธิบายว่าโค้ดรู้ได้อย่างไรว่ารหัสไม่มีในเมนู",
    ),
    rubric: [
      "ได้ [\"ชาเย็น\", \"ข้าวผัด\", \"ไม่พบ Z9\"], [] และ [\"ข้าวผัด\", \"ข้าวผัด\"]",
      "ผลมีลำดับตามรายการที่สั่ง (ไม่ใช่ลำดับเมนู) และเมนูกับรายการที่สั่งไม่ถูกแก้",
      "อธิบายได้ว่าการค้นหาที่ไม่พบให้ undefined และโค้ดแยกกรณีนั้นก่อนอ่าน name",
    ],
    modelAnswer: `const menu = [
  { code: "A1", name: "ข้าวผัด", price: 60 },
  { code: "B2", name: "ชาเย็น", price: 35 },
];

function orderNames(codes, menuItems) {
  return codes.map((code) => {
    const item = menuItems.find((entry) => entry.code === code);
    if (item === undefined) {
      return "ไม่พบ " + code;
    }
    return item.name;
  });
}

console.log(orderNames(["B2", "A1", "Z9"], menu));
console.log(orderNames([], menu));
console.log(orderNames(["A1", "A1"], menu));

ผลจริง: [ 'ชาเย็น', 'ข้าวผัด', 'ไม่พบ Z9' ] / [] / [ 'ข้าวผัด', 'ข้าวผัด' ]
map สร้าง array ใหม่ที่มีสมาชิกเท่ากับรายการที่สั่ง ลำดับจึงตามการสั่ง ภายในใช้ find หาเมนูที่รหัสตรงกัน ถ้าไม่พบ find คืน undefined จึงตรวจก่อนอ่าน item.name เพื่อไม่ให้เกิด TypeError ไม่มีบรรทัดใดแก้ menu หรือ codes ใช้ for...of กับ push หรือ ternary แทน if ก็ถูก`,
  },
  "js-errors": {
    prompt: prompt(
      "โปรแกรมทักทายสมาชิกที่ถูกเลือกจากฟอร์ม คาดว่าจะแสดง สวัสดี ต้น แต่รันแล้วเกิด error:",
      "",
      "const members = [",
      "  { id: 1, name: \"ซี\" },",
      "  { id: 2, name: \"ต้น\" },",
      "];",
      "const selectedId = \"2\"; // ค่ามาจากช่องเลือกในฟอร์ม",
      "",
      "const member = members.find((item) => item.id === selectedId);",
      "console.log(\"สวัสดี \" + member.name);",
      "",
      "1) รันแล้วจด error จริง 2) เขียนสมมติฐานว่าต้นเหตุคืออะไร (ไม่ใช่แค่บรรทัดที่พัง) 3) เพิ่ม log ชั่วคราวเพื่อเก็บหลักฐานยืนยัน 4) แก้ให้น้อยที่สุด 5) ตรวจกรณี selectedId = \"9\" ซึ่งไม่มีสมาชิก ต้องแสดง ไม่พบสมาชิก โดยไม่พัง แล้วลบ log ชั่วคราวออก",
    ),
    rubric: [
      "บันทึก error จริง TypeError: Cannot read properties of undefined (reading 'name') และระบุต้นเหตุว่า find คืน undefined เพราะ \"2\" (string) ไม่ === 2 (number)",
      "หลักฐานมาจาก log จริง เช่น member เป็น undefined และ typeof ของ selectedId กับ id ต่างกัน",
      "หลังแก้ \"2\" แสดง สวัสดี ต้น และ \"9\" แสดง ไม่พบสมาชิก โดยไม่เกิด error",
    ],
    modelAnswer: `// ขั้นเก็บหลักฐาน (ใส่ชั่วคราวก่อนบรรทัดที่พัง แล้วลบออกหลังยืนยัน):
// console.log(member, typeof selectedId, typeof members[0].id);
// ได้: undefined string number

const members = [
  { id: 1, name: "ซี" },
  { id: 2, name: "ต้น" },
];
const selectedId = "2";

const member = members.find((item) => item.id === Number(selectedId));
if (member === undefined) {
  console.log("ไม่พบสมาชิก");
} else {
  console.log("สวัสดี " + member.name);
}

ผลจริง: ก่อนแก้ TypeError: Cannot read properties of undefined (reading 'name') / หลังแก้ selectedId = "2" ได้ สวัสดี ต้น และ "9" ได้ ไม่พบสมาชิก
บรรทัดที่พังคือ member.name แต่ต้นเหตุอยู่บรรทัดก่อนหน้า: === เทียบทั้งค่าและชนิด "2" กับ 2 จึงไม่เท่ากัน find ไม่พบและคืน undefined log หลักฐานยืนยันว่า member เป็น undefined และชนิดต่างกัน แก้จุดเดียวคือแปลง selectedId เป็น number ก่อนเทียบ แล้วเพิ่มการตรวจ undefined สำหรับรหัสที่ไม่มีจริง การแปลง item.id เป็น string แทนก็ถูก แต่การเปลี่ยนเป็น == ไม่แนะนำเพราะซ่อนปัญหาชนิดข้อมูล`,
  },
  "js-references": {
    prompt: prompt(
      "state = { book: { title: \"Old\" }, tags: [\"read\"] } สร้าง next ที่ชื่อหนังสือเป็น New และ tags มี done เพิ่มต่อท้าย โดยทุกส่วนของต้นฉบับต้องเหมือนเดิม",
      "แสดงผลของ state และ next หลังสร้าง และอธิบายว่า copy ส่วนใดบ้างและเพราะอะไร",
    ),
    rubric: [
      "state.book.title ยังเป็น Old และ state.tags ยังเป็น [\"read\"]",
      "next.book.title เป็น New และ next.tags เป็น [\"read\", \"done\"]",
      "copy ทุกชั้นที่แก้ (ตัวนอก, book, tags) และไม่อ้างว่า spread เป็น deep copy",
    ],
    modelAnswer: `const state = { book: { title: "Old" }, tags: ["read"] };

const next = {
  ...state,
  book: { ...state.book, title: "New" },
  tags: [...state.tags, "done"],
};

console.log(state.book.title, state.tags);
console.log(next.book.title, next.tags);
console.log(state.book === next.book, state.tags === next.tags);

ผลจริง: Old [ 'read' ] / New [ 'read', 'done' ] / false false
copy ตัวนอกเพราะต้องได้ object ใหม่ copy book เพราะเปลี่ยน title และสร้าง tags ใหม่เพราะเพิ่มสมาชิก ถ้าใช้ next.tags.push("done") หลัง spread ชั้นเดียว ต้นฉบับจะเปลี่ยนด้วยเพราะยังชี้ array เดียวกัน การประกาศด้วย const อย่างเดียวไม่ได้ทำให้ object แก้ไม่ได้`,
  },
  "js-callbacks": {
    prompt: prompt(
      "รายการเซสชัน [{ name: \"B\", minutes: 30 }, { name: \"A\", minutes: 5 }, { name: \"C\", minutes: 15 }] สร้างรายงาน: ยอดนาทีรวม และรายชื่อเรียงตามนาทีจากน้อยไปมาก โดยไม่แก้ลำดับของรายการต้นฉบับ",
      "ทดลองกับรายการว่างและรายการที่มีเซสชันเดียวด้วย",
    ),
    rubric: [
      "ได้รวม 50 และชื่อ [\"A\", \"C\", \"B\"]; รายการว่างได้รวม 0 และ []",
      "ต้นฉบับยังเรียง B, A, C หลังสร้างรายงาน",
      "อธิบาย comparator (หรือวิธีเรียงที่เลือก) และค่าเริ่มของผลรวม",
    ],
    modelAnswer: `function report(sessions) {
  const total = sessions.reduce((sum, item) => sum + item.minutes, 0);
  const names = [...sessions]
    .sort((a, b) => a.minutes - b.minutes)
    .map((item) => item.name);
  return { total, names };
}

const sessions = [
  { name: "B", minutes: 30 },
  { name: "A", minutes: 5 },
  { name: "C", minutes: 15 },
];
console.log(report(sessions));
console.log(report([]));
console.log(report([{ name: "D", minutes: 20 }]));
console.log(sessions.map((item) => item.name));

ผลจริง: { total: 50, names: [ 'A', 'C', 'B' ] } / { total: 0, names: [] } / { total: 20, names: [ 'D' ] } / [ 'B', 'A', 'C' ]
ค่าเริ่ม 0 ของ reduce ทำให้รายการว่างได้ 0 แทน error comparator a.minutes - b.minutes ติดลบเมื่อ a ควรมาก่อน จึงเรียงน้อยไปมาก copy ด้วย [...sessions] ก่อน sort เพราะ sort แก้ array เดิม ใช้ลูปสะสมและวิธีเรียงอื่นก็ใช้ได้ถ้าต้นฉบับไม่เปลี่ยน`,
  },
  "js-project-planner-1": {
    prompt: prompt(
      "บริบทใหม่: ห้องสมุดชุมชน หนังสือแต่ละเล่มมี { title, copies, borrowed, waitlist } (copies คือจำนวนเล่มทั้งหมด borrowed คือที่ถูกยืมอยู่ waitlist คือจำนวนคนที่รอ)",
      "เขียน function ที่คืนสรุป { available, totalWaiting, mostWanted }: available คือชื่อหนังสือที่ยังมีเล่มว่างเรียงตามตัวอักษร, totalWaiting คือคนรอรวมเฉพาะหนังสือที่ไม่มีเล่มว่าง, mostWanted คือชื่อที่มีคนรอมากที่สุด (ถ้าเท่ากันเลือกชื่อที่มาก่อนตามตัวอักษร ถ้าไม่มีใครรอให้เป็น null)",
      "ทดลองรายการว่าง, รายการที่ไม่มีใครรอ และรายการตัวอย่าง [{ title: \"Dune\", copies: 2, borrowed: 2, waitlist: 3 }, { title: \"Clay\", copies: 3, borrowed: 1, waitlist: 0 }, { title: \"Atlas\", copies: 1, borrowed: 0, waitlist: 0 }, { title: \"Bird\", copies: 1, borrowed: 1, waitlist: 5 }] ห้ามแก้ข้อมูลตั้งต้น แยก helper หรือไม่ก็ได้ อธิบายการตัดสินใจ",
    ),
    rubric: [
      "ตัวอย่างได้ { available: [\"Atlas\", \"Clay\"], totalWaiting: 8, mostWanted: \"Bird\" }",
      "รายการว่างได้ { available: [], totalWaiting: 0, mostWanted: null } และรายการที่ไม่มีใครรอได้ mostWanted เป็น null",
      "ข้อมูลตั้งต้นไม่ถูกแก้หรือเรียงใหม่ และคำอธิบายบอกเหตุผลของวิธีที่เลือกพร้อมผลรันจริง",
    ],
    modelAnswer: `function libraryReport(books) {
  const available = books
    .filter((book) => book.borrowed < book.copies)
    .map((book) => book.title)
    .sort((a, b) => a.localeCompare(b));

  const totalWaiting = books
    .filter((book) => book.borrowed >= book.copies)
    .reduce((sum, book) => sum + book.waitlist, 0);

  let mostWanted = null;
  let most = 0;
  for (const book of books) {
    const more = book.waitlist > most;
    const tieEarlier = book.waitlist === most && most > 0 && book.title.localeCompare(mostWanted) < 0;
    if (more || tieEarlier) {
      mostWanted = book.title;
      most = book.waitlist;
    }
  }
  return { available, totalWaiting, mostWanted };
}

const books = [
  { title: "Dune", copies: 2, borrowed: 2, waitlist: 3 },
  { title: "Clay", copies: 3, borrowed: 1, waitlist: 0 },
  { title: "Atlas", copies: 1, borrowed: 0, waitlist: 0 },
  { title: "Bird", copies: 1, borrowed: 1, waitlist: 5 },
];
console.log(libraryReport(books));
console.log(libraryReport([]));
console.log(libraryReport([{ title: "Atlas", copies: 1, borrowed: 0, waitlist: 0 }]));
console.log(books[0].title);

ผลจริง: { available: [ 'Atlas', 'Clay' ], totalWaiting: 8, mostWanted: 'Bird' } / { available: [], totalWaiting: 0, mostWanted: null } / { available: [ 'Atlas' ], totalWaiting: 0, mostWanted: null } / Dune
filter และ map สร้าง array ใหม่ก่อน sort จึงไม่กระทบ books (บรรทัดสุดท้ายยังเห็น Dune เป็นตัวแรก) ใช้ reduce เริ่มที่ 0 รวมคนรอ ส่วน mostWanted ใช้ลูปเพราะต้องจำทั้งชื่อและจำนวน เริ่มที่ null กับ 0 เพื่อให้กรณีไม่มีใครรอคืน null วิธีนี้เป็นเพียงทางหนึ่ง การเรียง copy ของรายการตามคนรอแล้วเลือกตัวแรกก็ถูกถ้าผลตรงทุกกรณี`,
  },
  "js-exceptions": {
    prompt: prompt(
      "ระบบจองห้องซ้อมดนตรีมีห้อง A และ B คำขอจองแต่ละรายการเป็น { room, hours } เขียน function ที่ตรวจคำขอหนึ่งรายการ ถ้าห้องไม่มีอยู่ให้ throw Error ที่ข้อความบอกชื่อห้อง ถ้าชั่วโมงไม่ใช่จำนวนเต็ม 1 ถึง 4 ให้ throw Error ที่ข้อความบอกค่าที่ผิด ถ้าถูกคืนข้อความยืนยัน",
      "ให้โค้ดผู้เรียกประมวลผลรายการ [{ room: \"A\", hours: 2 }, { room: \"C\", hours: 1 }, { room: \"B\", hours: 5 }, { room: \"B\", hours: 4 }, { room: \"A\", hours: 1.5 }] ทีละรายการ แสดงผลของแต่ละรายการ คำขอที่ผิดต้องไม่ทำให้รายการถัดไปหยุด และบรรทัดสุดท้ายสรุปจำนวนที่สำเร็จ",
    ),
    rubric: [
      "A 2 และ B 4 สำเร็จ; C ถูกปฏิเสธเรื่องห้อง; B 5 และ A 1.5 ถูกปฏิเสธเรื่องชั่วโมง; สรุป สำเร็จ 2 จาก 5",
      "function ตรวจ throw Error ไม่คืนค่าปกติแทน error และผู้เรียกเป็นคน catch ทีละรายการจึงประมวลผลครบทุกรายการ",
      "ข้อความ error บอกค่าที่ผิดได้ และคำอธิบายบอกว่าทำไม try/catch อยู่ในลูป ไม่ใช่ครอบทั้งลูป",
    ],
    modelAnswer: `function book(request) {
  if (request.room !== "A" && request.room !== "B") {
    throw new Error("ไม่มีห้อง " + request.room);
  }
  if (!Number.isInteger(request.hours) || request.hours < 1 || request.hours > 4) {
    throw new Error("ชั่วโมงไม่ถูกต้อง: " + request.hours);
  }
  return request.room + " " + request.hours + " ชม.";
}

const requests = [
  { room: "A", hours: 2 },
  { room: "C", hours: 1 },
  { room: "B", hours: 5 },
  { room: "B", hours: 4 },
  { room: "A", hours: 1.5 },
];

let okCount = 0;
for (const request of requests) {
  try {
    console.log("จองแล้ว " + book(request));
    okCount = okCount + 1;
  } catch (error) {
    console.log("ปฏิเสธ: " + error.message);
  }
}
console.log("สำเร็จ " + okCount + " จาก " + requests.length);

ผลจริง: จองแล้ว A 2 ชม. / ปฏิเสธ: ไม่มีห้อง C / ปฏิเสธ: ชั่วโมงไม่ถูกต้อง: 5 / จองแล้ว B 4 ชม. / ปฏิเสธ: ชั่วโมงไม่ถูกต้อง: 1.5 / สำเร็จ 2 จาก 5
book ตรวจแล้ว throw เพราะไม่มีค่าปกติที่ถูกต้องให้คืน ผู้เรียกตัดสินใจเองว่าจะแสดงอะไร try/catch อยู่ในลูป error ของรายการหนึ่งจึงจบแค่รอบนั้น ถ้าครอบทั้งลูป รายการหลัง C จะไม่ถูกตรวจ okCount เพิ่มหลัง book สำเร็จเท่านั้น เพราะเมื่อ throw บรรทัดที่เหลือใน try จะถูกข้าม`,
  },
  "js-modules-json": {
    prompt: prompt(
      "สร้างสองไฟล์ .mjs ในโฟลเดอร์เดียวกัน: ไฟล์แรก export function คิดค่าซอง 3 บาทต่อชิ้น ไฟล์ที่สอง import function นั้น แล้ว parse ข้อความ JSON '{\"count\":4}' และแสดงยอด 12",
      "ทดลองเปลี่ยนข้อความเป็น JSON ที่ผิดรูปแบบ แล้วบันทึก error พร้อมอธิบายว่าเกิดตอนไหน ระบุคำสั่งที่ใช้รันจากโฟลเดอร์งาน",
    ),
    rubric: [
      "แยกเป็นสองไฟล์จริง และชื่อที่ import ตรงกับชื่อที่ export",
      "node main.mjs แสดง 12 และ JSON ที่ผิดรูปแบบเกิด SyntaxError ตอน JSON.parse",
      "แยกได้ว่า JSON เป็นข้อความ ส่วนผลของ parse เป็น object และบอกตำแหน่งที่ต้องแก้",
    ],
    modelAnswer: `// cost.mjs
export function envelope(count) {
  return count * 3;
}

// main.mjs
import { envelope } from "./cost.mjs";

const text = '{"count":4}';
const data = JSON.parse(text);
console.log(envelope(data.count));

ผลจริง: รันจากโฟลเดอร์ที่มีสองไฟล์ด้วย node main.mjs (เหมือนกันทั้ง PowerShell และ Bash) ได้ 12
เมื่อเปลี่ยน text เป็น '{count:4}' ได้ SyntaxError ตอน JSON.parse เพราะ key ใน JSON ต้องอยู่ในเครื่องหมายคำพูดคู่ text เป็น string ส่วน data เป็น object จึงอ่าน data.count ได้ ถ้าต้องการให้โปรแกรมไม่หยุด ให้ครอบ JSON.parse ด้วย try/catch แบบ safeParse ในกิจกรรมฝึก`,
  },
  "js-promises": {
    prompt: prompt(
      "ทำนายก่อนรันว่าโค้ดสามบรรทัดนี้พิมพ์อะไรตามลำดับ:",
      "",
      "console.log(\"A\");",
      "Promise.resolve(2).then((value) => console.log(value + 1));",
      "console.log(\"B\");",
      "",
      "จากนั้นสร้าง Promise ที่ reject ด้วย Error ข้อความ หยุด แล้วให้ผู้เรียกจับและแสดงข้อความนั้น อธิบายว่าลำดับที่เห็นหมายความว่า JavaScript รอ Promise หรือไม่",
    ),
    rubric: [
      "ลำดับ A, B, 3 พร้อมคำทำนายก่อนรัน",
      "rejection มี .catch (หรือ try/catch กับ await) และแสดงข้อความ หยุด",
      "อธิบายได้ว่า then ลงทะเบียนงานไว้ทำหลังโค้ด synchronous จบ ไม่ได้หยุดรอทั้งไฟล์",
    ],
    modelAnswer: `console.log("A");
Promise.resolve(2).then((value) => console.log(value + 1));
console.log("B");

Promise.reject(new Error("หยุด"))
  .catch((error) => console.log(error.message));

ผลจริง: A / B / 3 / หยุด
console.log("B") ทำทันทีโดยไม่รอ Promise ส่วน callback ใน then ถูกเรียกหลังโค้ด synchronous ของไฟล์ทำครบแล้ว จึงเห็น 3 หลัง B ถ้าไม่มี catch Node จะแจ้ง unhandled rejection และหยุดโปรแกรม`,
  },
  "js-async": {
    prompt: prompt(
      "เขียน async function ที่รับ Promise ของข้อมูลจำลอง รอผล แล้วคืน count + 2 ให้ผู้เรียก",
      "ผู้เรียก (async function main ที่ถูกเรียกจริง) ต้อง await ผลแล้วแสดง 5 เมื่อส่ง Promise.resolve({ count: 3 }) และในอีกกรณีส่ง Promise.reject(new Error(\"อ่านไม่ได้\")) แล้วต้องแสดงข้อความ อ่านไม่ได้ โดยรันทั้งสองกรณีจริง",
      "อธิบายว่าทำไม try/catch จับ rejection ได้เฉพาะเมื่อมี await และถ้าเรียก function นั้นโดยไม่มี await จะได้อะไร",
    ),
    rubric: [
      "ผลรันจริงแสดง 5 และ อ่านไม่ได้ (ทั้งสองกรณีถูกรันจริง ไม่ใช่แค่บรรยาย)",
      "function ที่คำนวณ return ค่าให้ผู้เรียก และ await อยู่ใน try เมื่อต้องการจับ rejection",
      "ไม่อ้างว่า async function คืน 5 ให้ผู้เรียกทันที: อธิบายได้ว่าการเรียกโดยไม่ await ได้ Promise",
    ],
    modelAnswer: `async function readCount(source) {
  const data = await source;
  return data.count + 2;
}

async function main() {
  console.log(readCount(Promise.resolve({ count: 3 })) instanceof Promise);
  try {
    const result = await readCount(Promise.resolve({ count: 3 }));
    console.log(result);
    await readCount(Promise.reject(new Error("อ่านไม่ได้")));
    console.log("บรรทัดนี้ไม่ถูกพิมพ์");
  } catch (error) {
    console.log(error.message);
  }
}

main();

ผลจริง: true / 5 / อ่านไม่ได้
readCount คืน Promise เสมอ (บรรทัดแรกของ main ยืนยันด้วย true) ผู้เรียกจึงต้อง await เพื่อได้ 5 เมื่อ source reject บรรทัด await source ใน readCount จะ throw และ Promise ของ readCount ก็ reject ต่อ await ใน main จึง throw เข้า catch และบรรทัดหลังจากนั้นใน try ถูกข้าม ถ้าไม่มี await catch จะไม่เห็น rejection แยกสองกรณีเป็นสอง try/catch ก็ถูก`,
  },
  "js-project-planner-2": {
    prompt: prompt(
      "ประเมินท้ายคอร์สในบริบทใหม่: รับรายการยืมอุปกรณ์ { name, day, units } ข้อมูลถูกต้องเมื่อ name ไม่ว่างหลัง trim, day เป็น mon หรือ tue และ units เป็นจำนวนเต็มบวก",
      "คืนรายงานยอด units แยกวัน และรายการ index ของข้อมูลที่ผิด ข้อมูลผิดหนึ่งรายการต้องไม่ทำให้รายการอื่นหยุดประมวลผล เลือก function, loop, array และโครงภายในเอง (ไม่ต้องทำเว็บหรือ API)",
      "ทดสอบ: รายการว่าง, ข้อมูลถูกหลายรายการวันเดียว, ข้อมูลปนผิด และ units เป็น 0 กับ 1 แนบเหตุผลการตัดสินใจ และบันทึกการ debug หนึ่งกรณี (expected, actual, สิ่งที่แก้)",
    ),
    rubric: [
      "[] ได้ยอดทั้งสองวันเป็น 0 และรายการ index ผิดเป็น []",
      "[{ name: \"Lamp\", day: \"mon\", units: 2 }, { name: \"Cable\", day: \"mon\", units: 1 }] ได้ mon 3 และ tue 0",
      "ข้อมูลผิดถูกรายงานตาม index และไม่ถูกรวมยอด แต่รายการถัดไปยังถูกประมวลผล",
      "units 1 ถูก units 0 ผิด ไม่แก้ข้อมูลตั้งต้น และมีบันทึก expected/actual ของการ debug หนึ่งกรณี",
    ],
    modelAnswer: `function report(rows) {
  const totals = { mon: 0, tue: 0 };
  const invalidIndexes = [];
  for (let i = 0; i < rows.length; i = i + 1) {
    const row = rows[i];
    const nameOk = typeof row.name === "string" && row.name.trim() !== "";
    const dayOk = row.day === "mon" || row.day === "tue";
    const unitsOk = Number.isInteger(row.units) && row.units > 0;
    if (!nameOk || !dayOk || !unitsOk) {
      invalidIndexes.push(i);
      continue;
    }
    totals[row.day] = totals[row.day] + row.units;
  }
  return { totals, invalidIndexes };
}

console.log(report([]));
console.log(report([
  { name: "Lamp", day: "mon", units: 2 },
  { name: "Cable", day: "mon", units: 1 },
]));
console.log(report([
  { name: "Lamp", day: "mon", units: 2 },
  { name: " ", day: "tue", units: 1 },
  { name: "Cable", day: "wed", units: 1 },
  { name: "Mic", day: "tue", units: 0 },
  { name: "Cable", day: "tue", units: 1 },
]));

ผลจริง: { totals: { mon: 0, tue: 0 }, invalidIndexes: [] } / { totals: { mon: 3, tue: 0 }, invalidIndexes: [] } / { totals: { mon: 2, tue: 1 }, invalidIndexes: [ 1, 2, 3 ] }
แยกการตรวจเป็นชื่อที่มีความหมาย (nameOk, dayOk, unitsOk) ให้อ่านและ debug ง่าย ใช้ continue เพื่อข้ามรายการผิดโดยไม่หยุดทั้งรายการ เริ่ม totals ทั้งสองวันที่ 0 ให้วันที่ไม่มีข้อมูลยังแสดง 0 ตัวอย่างบันทึก debug: expected ยอด tue เป็น 1 แต่ actual เป็น NaN เพราะเริ่ม totals เป็น {} แล้วบวกกับ undefined จึงแก้เป็นเริ่มทั้งสองวันที่ 0 สมมติว่าแต่ละรายการเป็น object ถ้าต้องรองรับ null ต้องเพิ่ม requirement ก่อน วิธีอื่น เช่น filter แล้ว reduce ก็ถูกถ้า behavior ตรง`,
  },
};
