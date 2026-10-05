import type { TopicSource } from "@/types/curriculum";

// Java code is written with String.raw so escapes such as \n stay exactly as the learner types them.
const java = String.raw;
const v = (a: string, b: string): [string, string] => [a, b];

const runLocally = "บันทึกเป็น Main.java ใน workspace ของตนเอง แล้วรัน javac -encoding UTF-8 Main.java ตามด้วย java Main (สองคำสั่งนี้เหมือนกันทั้งใน PowerShell และ Bash/WSL) เว็บไซต์นี้ไม่ compile Java ให้";
const checkLocally = "ตรวจเองในเครื่องด้วย JDK 21: javac -encoding UTF-8 Main.java แล้ว java Main เทียบ output จริงกับค่าที่คาด และจดคำสั่งกับ output ไว้ (การติ๊กหรือส่งข้อความในเว็บไม่ได้ยืนยันว่าโค้ดถูก)";
const assessment = "งานประเมินในบริบทใหม่ — เปิดเอกสาร Java (dev.java หรือ JDK API docs) และบทเรียนก่อนหน้าได้ แต่อย่าเปิด rubric หรือตัวอย่างคำตอบก่อนส่ง เขียนจากไฟล์ว่าง แล้วส่ง (1) โค้ด (2) คำสั่งที่รันและ output จริง (3) คำอธิบายสั้น ๆ ตามที่โจทย์ถาม ถ้ายังทำไม่เสร็จ ให้ส่งโค้ดที่ลองพร้อม error หรือ output ที่ได้";

export const javaBridgeTopics: TopicSource[] = [
  {
    id: "java-declarations",
    courseId: "java-foundations",
    unit: "สะพานพื้นฐาน Java",
    language: "java",
    standard: "v3",
    title: "ประกาศชื่อพร้อมชนิดก่อนคำนวณ",
    prerequisites: ["java-main"],
    objective: "แยกชนิด ชื่อ และค่าเริ่มของตัวแปร แล้วอ่านค่าจากชื่อใน println ได้",
    why: "Java ต้องรู้ชนิดของทุกชื่อก่อนใช้ ถ้าอ่าน int copies = 3; ออก จะอ่านใบเสร็จและนิพจน์ในบทถัดไปได้",
    explanation: "int copies = 3; อ่านว่า ประกาศตัวแปรชนิด int ชื่อ copies ค่าเริ่ม 3 — int เก็บจำนวนเต็ม, String เก็บข้อความ, double เก็บทศนิยม, boolean เก็บ true หรือ false เครื่องหมาย = ผูกค่าทางขวาให้ชื่อทางซ้าย (ไม่ใช่การเทียบ) และคำสั่งประกาศจบด้วย ;",
    example: java`public class Main {
    public static void main(String[] args) {
        int copies = 3;
        String shelf = "A";
        System.out.println(copies);
        System.out.println(shelf);
        System.out.println("copies");
    }
}`,
    expectedOutput: "3\nA\ncopies",
    tracePrompt: "ไม่ต้องรัน: ถ้าแก้บรรทัดแรกเป็น int copies = 12; และแก้ println บรรทัดสุดท้ายเป็น System.out.println(\"shelf\"); output สามบรรทัดจะเป็นอะไร และบรรทัดไหนไม่เปลี่ยน?",
    traceAnswer: "ได้ 12 / A / shelf — บรรทัดแรกเปลี่ยนเพราะ println(copies) อ่านค่าใหม่จากชื่อ copies, บรรทัดที่สองยังเป็น A เพราะไม่ได้แก้ shelf, บรรทัดสุดท้ายแสดงคำว่า shelf ตามตัวอักษรในเครื่องหมายคำพูด ไม่ได้อ่านค่า A ของตัวแปร shelf",
    practicePrompt: `เติมค่าเริ่มให้ rooms เป็นจำนวนเต็ม 4 และ building เป็นข้อความ North แล้วให้โปรแกรมแสดงค่าของ rooms, ค่าของ building และคำว่า rooms ตามลำดับ คนละบรรทัด\n${runLocally}`,
    starter: java`public class Main {
    public static void main(String[] args) {
        int rooms = 0;
        String building = "";
        System.out.println(rooms);
        System.out.println(building);
        System.out.println("rooms");
    }
}`,
    solution: java`public class Main {
    public static void main(String[] args) {
        int rooms = 4;
        String building = "North";
        System.out.println(rooms);
        System.out.println(building);
        System.out.println("rooms");
    }
}`,
    solutionCheck: { output: "4\nNorth\nrooms" },
    buggy: java`public class Main {
    public static void main(String[] args) {
        int count;
        System.out.println(count);
    }
}`,
    bugCheck: { kind: "compile", message: "variable count might not have been initialized" },
    bugExplanation: "คาดว่าจะเห็นตัวเลข แต่ javac แจ้ง variable count might not have been initialized เพราะตัวแปร local (ตัวแปรที่ประกาศใน main) ไม่ได้เริ่มที่ 0 ให้เอง แก้โดยใส่ค่าเริ่ม เช่น int count = 0; แล้ว compile และรันใหม่",
    vocabulary: [v("ตัวแปร (variable)", "ชื่อที่เก็บค่าหนึ่งค่า มีชนิดกำกับ"), v("ชนิด (type)", "บอกว่าชื่อนั้นเก็บข้อมูลแบบไหน เช่น int, String"), v("ค่าเริ่ม", "ค่าที่ใส่ตอนประกาศด้วย =")],
    checkpoint: {
      prompt: `${assessment}\n\nโจทย์: ข้อมูลพัสดุชิ้นหนึ่งมี รหัสติดตาม B07, จำนวนกล่อง 2 และสถานะว่าซื้อประกันแล้ว (ใช่) เขียนโปรแกรมเก็บข้อมูลทั้งสามในตัวแปร โดยเลือกชนิดเองให้ตรงข้อมูล แล้วแสดงค่าทีละบรรทัด จากนั้นแก้ค่าเริ่มของจำนวนกล่องเป็น 0 แล้วรันอีกครั้ง ส่ง output ทั้งสองรอบ และอธิบายว่า output บรรทัดไหนเปลี่ยนเพราะอะไร`,
      rubric: [
        "เลือกชนิดตรงข้อมูล: รหัสติดตามเป็น String, จำนวนกล่องเป็น int, สถานะประกันเป็น boolean",
        "รอบแรกได้ B07 / 2 / true และรอบที่สอง (ค่าเริ่มกล่องเป็น 0) ได้ B07 / 0 / true",
        "อธิบายได้ว่าเปลี่ยนเฉพาะบรรทัดที่สอง เพราะ println อ่านค่าจากชื่อ boxes ไม่ได้พิมพ์ตัวเลขตายตัว",
      ],
      modelAnswer: java`public class Main {
    public static void main(String[] args) {
        String tracking = "B07";
        int boxes = 2;
        boolean insured = true;
        System.out.println(tracking);
        System.out.println(boxes);
        System.out.println(insured);
    }
}` + "\n\nรอบแรก: B07 / 2 / true\nรอบที่สอง: แก้เฉพาะบรรทัด int boxes = 2; เป็น int boxes = 0; แล้ว javac และ java ใหม่ ได้ B07 / 0 / true\n\nทำไมถูก: ชนิดตรงกับข้อมูล (ข้อความ / จำนวนเต็ม / ใช่-ไม่ใช่) และ output บรรทัดที่สองเปลี่ยนตามค่าของ boxes เพราะ println(boxes) อ่านค่าจากชื่อ ส่วนอีกสองบรรทัดไม่เปลี่ยนเพราะค่าของ tracking และ insured ไม่ได้แก้ ตั้งชื่อตัวแปรอื่นได้ถ้าสื่อความหมาย",
    },
    lesson: {
      hook: "ใบยืมหนังสือมีช่อง “จำนวนเล่ม” ที่ต้องเป็นตัวเลข และช่อง “ชั้นวาง” ที่เป็นข้อความ โปรแกรม Java ก็ต้องบอกก่อนเหมือนกันว่าแต่ละชื่อเก็บข้อมูลชนิดใด",
      explain: [
        {
          heading: "ชนิด ชื่อ ค่า",
          text: [
            "int copies = 3; แบ่งเป็นสามส่วน: int คือชนิด, copies คือชื่อ, 3 คือค่าเริ่ม แล้วจบด้วย ; ชนิดที่ใช้บ่อย: int (จำนวนเต็ม), String (ข้อความ ใช้ S ตัวใหญ่), double (ทศนิยม), boolean (true หรือ false)",
            "เลือกชื่อที่สื่อข้อมูล ชื่อแยกตัวพิมพ์ใหญ่เล็ก (copies กับ Copies เป็นคนละชื่อ) และต้องประกาศก่อนใช้ ตัวแปรที่ประกาศใน main ต้องได้ค่าก่อนถูกอ่าน การเปลี่ยนค่าภายหลังและ final จะเรียนใน java-variables",
          ],
        },
        {
          heading: "อ่านค่าต่างจากแสดงข้อความ",
          text: [
            "System.out.println(copies) ไม่มีเครื่องหมายคำพูด จึงอ่านค่าที่ชื่อ copies เก็บอยู่ ส่วน System.out.println(\"copies\") มีเครื่องหมายคำพูด จึงแสดงตัวอักษร c-o-p-i-e-s ตรง ๆ",
          ],
        },
      ],
      walkthrough: [
        "int copies = 3; สร้างชื่อ copies ชนิด int และเก็บค่า 3",
        "String shelf = \"A\"; สร้างชื่อ shelf ชนิด String และเก็บข้อความ A",
        "println(copies) และ println(shelf) ไม่มีเครื่องหมายคำพูด จึงพิมพ์ค่าที่เก็บไว้: 3 และ A",
        "println(\"copies\") มีเครื่องหมายคำพูด จึงพิมพ์คำว่า copies ตามตัวอักษร",
      ],
      pitfalls: [
        "เขียน string shelf (s ตัวเล็ก) — Java แยกตัวพิมพ์ใหญ่เล็ก ชนิดข้อความต้องเขียน String",
        "ใส่ข้อความโดยไม่มีเครื่องหมายคำพูด เช่น String shelf = A; — javac จะมองว่า A เป็นชื่อตัวแปรที่ยังไม่ได้ประกาศ (cannot find symbol)",
        "ใส่ทศนิยมให้ int เช่น int copies = 2.5; — compile ไม่ผ่าน เพราะ int เก็บได้เฉพาะจำนวนเต็ม",
      ],
      checks: [
        { question: "String shelf กับ string shelf ต่างกันหรือไม่?", answer: "ต่าง — ชนิดข้อความของ Java คือ String (S ตัวใหญ่) ส่วน string ไม่ใช่ชนิดที่ Java รู้จัก จึง compile ไม่ผ่าน" },
        { question: "System.out.println(copies) กับ System.out.println(\"copies\") ต่างกันอย่างไร?", answer: "แบบแรกอ่านค่าที่ชื่อ copies เก็บ (เช่น 3) แบบที่สองแสดงคำว่า copies ตามตัวอักษร" },
      ],
      recap: [
        "ประกาศ = ชนิด + ชื่อ + ค่าเริ่ม แล้วจบด้วย ;",
        "ชื่อไม่มีเครื่องหมายคำพูดคือการอ่านค่า ข้อความในเครื่องหมายคำพูดคือการแสดงตัวอักษร",
      ],
      traceHint: "จดค่าของแต่ละชื่อหลังบรรทัดประกาศ แล้วดูว่า println แต่ละบรรทัดอ่านชื่อหรือแสดงข้อความ",
      practiceHints: [
        "int ต้องได้จำนวนเต็ม ส่วน String ต้องอยู่ในเครื่องหมายคำพูด",
        "แก้แค่สองบรรทัดประกาศ ไม่ต้องแตะ println",
        "บรรทัดแรกเปลี่ยน 0 เป็น 4 และบรรทัดที่สองใส่ North ไว้ระหว่างเครื่องหมายคำพูด",
      ],
      acceptance: [
        checkLocally,
        "output เป็น 4 / North / rooms คนละบรรทัด",
        "ลองเปลี่ยน rooms เป็น 2 แล้วบรรทัดแรกเปลี่ยน แต่คำว่า rooms บรรทัดสุดท้ายยังเหมือนเดิม",
      ],
      solutionNotes: [
        "println อ่านค่าจากชื่อ ไม่ได้พิมพ์ 4 ซ้ำเอง จึงเปลี่ยนค่าที่เดียวแล้ว output เปลี่ยนตาม",
        "การเปลี่ยนค่าหลังประกาศและ final จะเรียนใน java-variables",
      ],
      reflection: [
        "ถ้าเพื่อนเขียน System.out.println(\"rooms\") แล้วสงสัยว่าทำไมไม่ได้ 4 คุณจะอธิบายด้วยตัวอย่างใด?",
      ],
    },
  },
  {
    id: "java-for-basics",
    courseId: "java-foundations",
    unit: "สะพานพื้นฐาน Java",
    language: "java",
    standard: "v3",
    title: "for: ไล่ตัวนับและจำนวนรอบ",
    prerequisites: ["java-branch"],
    objective: "เขียน for หนึ่งลูป และไล่ขั้นเริ่ม → ตรวจ → ทำ → เพิ่ม ได้ รวมกรณีที่ลูปทำศูนย์รอบ",
    why: "ก่อนสะสมยอดหลายรอบ ต้องตอบให้ได้ว่าลูปทำกี่รอบ และรอบสุดท้ายรวมค่าขอบหรือไม่",
    explanation: "for (int i = 1; i <= 3; i = i + 1) { ... } มีสามช่องคั่นด้วย ; ช่องแรกตั้งค่า i ครั้งเดียวก่อนเริ่ม, ช่องกลางคือเงื่อนไขที่ตรวจก่อนทุกรอบ (เท็จเมื่อไรออกจากลูป), ช่องท้ายทำหลังคำสั่งใน { } จบแต่ละรอบ แล้วกลับไปตรวจใหม่",
    example: java`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i = i + 1) {
            System.out.println(i);
        }
        System.out.println("done");
    }
}`,
    expectedOutput: "1\n2\n3\ndone",
    tracePrompt: "ไม่ต้องรัน: ถ้าเปลี่ยนเงื่อนไขเป็น i <= 5 และเปลี่ยนช่องท้ายเป็น i = i + 2 จะพิมพ์อะไรบ้าง และ i มีค่าเท่าไรตอนลูปหยุด?",
    traceAnswer: "พิมพ์ 1, 3, 5 แล้วตามด้วย done — i เป็น 1 (1 <= 5 จริง) → 3 (จริง) → 5 (จริง) → 7 ซึ่ง 7 <= 5 เป็นเท็จ ลูปจึงหยุดตอน i เป็น 7 และไม่พิมพ์ 7",
    practicePrompt: `แก้เงื่อนไขของ for ให้พิมพ์ตัวเลขตั้งแต่ start ถึง end โดยรวม end ด้วย (start = 2, end = 4 ต้องได้ 2, 3, 4) แล้วลองเปลี่ยน start เป็น 5 เพื่อตรวจว่าไม่มี output เลย\n${runLocally}`,
    starter: java`public class Main {
    public static void main(String[] args) {
        int start = 2;
        int end = 4;
        for (int i = start; i < end; i = i + 1) {
            System.out.println(i);
        }
    }
}`,
    solution: java`public class Main {
    public static void main(String[] args) {
        int start = 2;
        int end = 4;
        for (int i = start; i <= end; i = i + 1) {
            System.out.println(i);
        }
    }
}`,
    solutionCheck: { output: "2\n3\n4" },
    buggy: java`public class Main {
    public static void main(String[] args) {
        for (int i = 1; i < 3; i = i + 1) {
            System.out.println(i);
        }
    }
}`,
    bugCheck: { kind: "logic", output: "1\n2" },
    bugExplanation: "คาดว่าจะเห็น 1, 2, 3 แต่ได้แค่ 1, 2 เพราะเมื่อ i เป็น 3 เงื่อนไข 3 < 3 เป็นเท็จ ลูปจึงออกก่อนพิมพ์ 3 แก้เป็น i <= 3 แล้วรันใหม่ บรรทัดสุดท้ายของ output ต้องเป็น 3",
    vocabulary: [v("loop", "ส่วนของโปรแกรมที่ทำซ้ำ"), v("ตัวนับ (counter)", "ตัวแปรที่บอกว่ากำลังอยู่รอบไหน เช่น i"), v("เงื่อนไขของลูป", "นิพจน์ boolean ที่ตรวจก่อนทุกรอบ")],
    checkpoint: {
      prompt: `${assessment}\n\nโจทย์: เครื่องจับเวลาต้องนับถอยหลังจากค่าในตัวแปร seconds ลงไปจนถึง 1 ทีละบรรทัด แล้วพิมพ์ Go ทดลองเมื่อ seconds เป็น 3, 1 และ 0 (เปลี่ยนค่าแล้วรันใหม่ทีละครั้ง) ส่งโค้ด output ทั้งสามกรณี และอธิบายว่าอะไรทำให้ลูปหยุด`,
      rubric: [
        "seconds = 3 ได้ 3 / 2 / 1 / Go, seconds = 1 ได้ 1 / Go, seconds = 0 ได้ Go อย่างเดียว",
        "ตัวเลขมาจากตัวแปร seconds ไม่ได้พิมพ์ตัวเลขตายตัว",
        "อธิบายได้ว่าค่าตัวนับเปลี่ยนทีละรอบจนเงื่อนไขเป็นเท็จ และทำไมกรณี 0 จึงไม่มีตัวเลข",
      ],
      modelAnswer: java`public class Main {
    public static void main(String[] args) {
        int seconds = 3;
        for (int left = seconds; left >= 1; left = left - 1) {
            System.out.println(left);
        }
        System.out.println("Go");
    }
}` + "\n\noutput: seconds = 3 → 3 / 2 / 1 / Go, seconds = 1 → 1 / Go, seconds = 0 → Go\n\nทำไมถูก: left เริ่มจาก seconds แล้วลดลงทีละ 1 หลังแต่ละรอบ เมื่อ left เป็น 0 เงื่อนไข left >= 1 เป็นเท็จ ลูปจึงหยุด ถ้า seconds เป็น 0 เงื่อนไขเป็นเท็จตั้งแต่ครั้งแรก จึงทำ 0 รอบแล้วพิมพ์ Go ทันที นับด้วย i จาก 0 แล้วพิมพ์ seconds - i ก็ถูกถ้าผลเหมือนกัน",
    },
    lesson: {
      hook: "ป้ายจองห้องประชุมต้องพิมพ์หมายเลขห้อง 1 ถึง 3 — ถ้าเขียน println สามบรรทัด พอมี 30 ห้องต้องแก้ใหม่หมด for ให้เขียนคำสั่งครั้งเดียวแล้วบอกจำนวนรอบแทน",
      explain: [
        {
          heading: "สามช่องของ for",
          text: [
            "for (int i = 1; i <= 3; i = i + 1) { ... } — ช่องแรก int i = 1 ทำครั้งเดียว, ช่องกลาง i <= 3 ตรวจก่อนทุกรอบ, ช่องท้าย i = i + 1 ทำหลังคำสั่งใน { } จบ แล้วกลับไปตรวจช่องกลางอีกครั้ง",
            "ช่องท้ายมักเขียนย่อเป็น i++ ซึ่งเพิ่ม 1 เหมือน i = i + 1 (เรียน ++ แล้วใน java-variables) บทนี้เขียนเต็มก่อนเพื่อให้เห็นว่าค่าเปลี่ยนอย่างไร",
          ],
        },
        {
          heading: "ขอบและการหยุด",
          text: [
            "เริ่ม 1 กับ i <= 3 ได้ 1, 2, 3 แต่ถ้าเป็น i < 3 ได้ 1, 2 ถ้าค่าเริ่มทำให้เงื่อนไขเท็จตั้งแต่แรก เช่นเริ่มที่ 4 จะทำ 0 รอบ เพราะตรวจก่อนทำ",
            "ช่องท้ายต้องพาค่าไปทางที่ทำให้เงื่อนไขเป็นเท็จได้ ไม่อย่างนั้นลูปจะไม่หยุด ถ้าโปรแกรมค้างใน terminal กด Ctrl+C เพื่อหยุด",
          ],
        },
      ],
      walkthrough: [
        "int i = 1 ทำครั้งเดียวก่อนเริ่มลูป",
        "ตรวจ 1 <= 3 จริง → พิมพ์ 1 → ช่องท้ายทำให้ i เป็น 2",
        "ตรวจ 2 <= 3 และ 3 <= 3 จริงทั้งคู่ → พิมพ์ 2 และ 3 ตามลำดับ หลังรอบที่สาม i เป็น 4",
        "ตรวจ 4 <= 3 เท็จ → ออกจากลูป แล้วทำบรรทัดถัดไปคือพิมพ์ done",
      ],
      pitfalls: [
        "ช่องท้ายพาค่าไปผิดทาง เช่นนับขึ้นแต่เขียน i = i - 1 ทำให้เงื่อนไขจริงตลอดและลูปไม่หยุด (กด Ctrl+C เพื่อหยุด)",
        "ใช้ , แทน ; คั่นสามช่องในวงเล็บของ for — compile ไม่ผ่าน",
        "ใส่ ; ต่อท้ายวงเล็บ เช่น for (int i = 1; i <= 3; i = i + 1); — ลูปจะวนโดยไม่มีคำสั่งใด และบล็อก { } ข้างล่างไม่ได้อยู่ในลูปอีกต่อไป",
      ],
      checks: [
        { question: "for ตรวจเงื่อนไขก่อนหรือหลังทำคำสั่งในรอบ?", answer: "ก่อน — ถ้าเงื่อนไขเท็จตั้งแต่ครั้งแรก ลูปจะทำ 0 รอบ" },
        { question: "i = i + 1 ในช่องท้ายทำงานตอนไหน?", answer: "หลังคำสั่งใน { } ของรอบนั้นจบ และก่อนตรวจเงื่อนไขครั้งถัดไป" },
      ],
      recap: [
        "ลำดับคือ เริ่ม (ครั้งเดียว) → ตรวจ → ทำ → เพิ่ม → ตรวจ ... จนเงื่อนไขเท็จ",
        "<= รวมค่าขอบ, < ไม่รวม",
      ],
      traceHint: "ทำตาราง 3 ช่อง: ค่า i ตอนตรวจ, เงื่อนไขจริงหรือเท็จ, สิ่งที่พิมพ์ ทำจนถึงครั้งที่เงื่อนไขเป็นเท็จ",
      practiceHints: [
        "ต้องการให้ end (4) ถูกพิมพ์ด้วย ลองไล่ว่าเงื่อนไขตอนนี้เป็นจริงหรือเท็จเมื่อ i เป็น 4",
        "แก้เฉพาะช่องกลางของ for ช่องอื่นถูกแล้ว",
        "เครื่องหมายที่รวมค่าขอบคือ <=",
      ],
      acceptance: [
        checkLocally,
        "start = 2, end = 4 ได้ 2 / 3 / 4 ตามลำดับ",
        "start = 5, end = 4 ไม่มี output เลย",
      ],
      solutionNotes: [
        "ใช้ตัวแปร start และ end ในเงื่อนไข จึงเปลี่ยนช่วงได้โดยไม่แก้ลูป",
        "ตั้งชื่อตัวนับอย่างอื่นแทน i ได้ ถ้าช่องเริ่ม เงื่อนไข และช่องท้ายใช้ชื่อเดียวกัน",
      ],
      reflection: [
        "ลูปของคุณทำศูนย์รอบเมื่อไร? เขียนค่าที่ทำให้เกิดกรณีนั้น และอธิบายจากลำดับ ตรวจ → ทำ",
      ],
    },
  },
  {
    id: "java-loop-sum",
    courseId: "java-foundations",
    unit: "สะพานพื้นฐาน Java",
    language: "java",
    standard: "v3",
    title: "ผลสะสมแยกจากตัวนับ",
    prerequisites: ["java-for-basics"],
    objective: "เลือกค่าเริ่มของตัวสะสม และไล่ค่าก่อนและหลังทุกรอบได้",
    why: "การพิมพ์ตัวเลขทีละรอบยังไม่ใช่การรวม ต้องมีตัวแปรที่จำยอดจากรอบก่อนหน้าไว้",
    explanation: "ตัวสะสม (accumulator) คือตัวแปรที่จำผลรวมข้ามรอบ ประกาศ int total = 0; ไว้ก่อน for แล้วในแต่ละรอบทำ total = total + day; ตัวนับ day บอกว่าอยู่รอบไหน ส่วน total บอกผลรวมของทุกรอบที่ผ่านมา",
    example: java`public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int day = 1; day <= 3; day = day + 1) {
            total = total + day;
            System.out.println(day + ":" + total);
        }
        System.out.println(total);
    }
}`,
    expectedOutput: "1:1\n2:3\n3:6\n6",
    tracePrompt: "ไม่ต้องรัน: ถ้าเปลี่ยนเงื่อนไขเป็น day <= 4 output จะเป็นอะไรทั้งหมด?",
    traceAnswer: "1:1 / 2:3 / 3:6 / 4:10 / 10 — สามรอบแรกเหมือนเดิม รอบใหม่ day เป็น 4 เอา total เดิม 6 บวก 4 ได้ 10 แล้วบรรทัดหลังลูปแสดง 10",
    practicePrompt: `ร้านแจกคูปองตามวัน: วันที่ d ได้ d * 2 ใบ (วันที่ 1 ได้ 2 ใบ, วันที่ 2 ได้ 4 ใบ, วันที่ 3 ได้ 6 ใบ) เขียนต่อจาก starter ให้แสดงจำนวนคูปองรวมของ days วัน (days = 3 ต้องได้ 12) แล้วลองเปลี่ยน days เป็น 0 และ 1\n${runLocally}`,
    starter: java`public class Main {
    public static void main(String[] args) {
        int days = 3;
        // คำนวณและแสดงจำนวนคูปองรวม
    }
}`,
    solution: java`public class Main {
    public static void main(String[] args) {
        int days = 3;
        int coupons = 0;
        for (int day = 1; day <= days; day = day + 1) {
            coupons = coupons + day * 2;
        }
        System.out.println(coupons);
    }
}`,
    solutionCheck: { output: "12" },
    buggy: java`public class Main {
    public static void main(String[] args) {
        int total = 0;
        for (int day = 1; day <= 3; day = day + 1) {
            total = day;
        }
        System.out.println(total);
    }
}`,
    bugCheck: { kind: "logic", output: "3" },
    bugExplanation: "คาดว่าจะได้ 6 แต่ได้ 3 เพราะ total = day; เขียนทับค่าเดิมด้วย day ของรอบนั้น ไม่ได้บวกเพิ่มจากยอดก่อนหน้า หลังรอบสุดท้ายจึงเหลือแค่ 3 แก้เป็น total = total + day; แล้วตรวจว่ากรณี 0 วันยังได้ 0",
    vocabulary: [v("ตัวสะสม (accumulator)", "ตัวแปรที่จำผลรวมข้ามรอบของลูป"), v("ค่าเริ่ม", "ค่าของตัวสะสมก่อนรอบแรก และเป็นผลเมื่อลูปทำ 0 รอบ")],
    checkpoint: {
      prompt: `${assessment}\n\nโจทย์: แผนออมเงิน วันแรกออม 1 บาท และแต่ละวันถัดไปออมเป็นสองเท่าของวันก่อนหน้า (1, 2, 4, ...) ให้จำนวนวันอยู่ในตัวแปร แล้วแสดงยอดออมรวมเมื่อครบจำนวนวันนั้น ทดลองกับ 0, 1 และ 5 วัน ส่งโค้ด output ทั้งสามกรณี และอธิบายว่าตัวแปรแต่ละตัวในโปรแกรมของคุณจำอะไร`,
      rubric: [
        "0 วันได้ 0, 1 วันได้ 1, 5 วันได้ 31",
        "จำนวนวันอยู่ในตัวแปร และไม่ได้พิมพ์คำตอบตายตัว",
        "อธิบายแยกได้ว่าตัวไหนคือตัวนับรอบ ตัวไหนคือยอดของวันนั้น และตัวไหนคือยอดรวม",
      ],
      modelAnswer: java`public class Main {
    public static void main(String[] args) {
        int days = 5;
        int today = 1;
        int total = 0;
        for (int day = 1; day <= days; day = day + 1) {
            total = total + today;
            today = today * 2;
        }
        System.out.println(total);
    }
}` + "\n\noutput: days = 0 → 0, days = 1 → 1, days = 5 → 31\n\nทำไมถูก: day เป็นตัวนับรอบ, today จำยอดที่ออมในวันนั้น, total สะสมยอดรวม แต่ละรอบบวก today เข้า total ก่อน แล้วค่อยเพิ่ม today เป็นสองเท่าสำหรับวันถัดไป (1 + 2 + 4 + 8 + 16 = 31) ถ้า days เป็น 0 ลูปทำ 0 รอบ total จึงเป็นค่าเริ่ม 0 จะเพิ่ม today ก่อนบวกก็ได้ถ้าปรับค่าเริ่มของ today ให้ผลตรงกัน",
    },
    lesson: {
      hook: "ตู้รับบริจาคนับเงินทุกวัน ถ้าจดแค่ยอดของวันล่าสุด จะไม่รู้ยอดรวมทั้งสัปดาห์ ต้องมีอีกช่องหนึ่งที่จำยอดรวมไว้แล้วบวกเพิ่มทุกวัน",
      explain: [
        {
          heading: "ตัวสะสมอยู่ก่อนลูป",
          text: [
            "int total = 0; ต้องอยู่ก่อน for เพื่อให้ค่าคงอยู่ข้ามรอบ และใช้ได้หลังลูปจบ ในลูป total = total + day; อ่านยอดเดิม บวกค่าของรอบนี้ แล้วเก็บกลับที่ชื่อเดิม",
            "ค่าเริ่มคือผลเมื่อทำ 0 รอบ สำหรับการบวกจึงเริ่มที่ 0",
          ],
        },
        {
          heading: "ทดสอบทีละขนาด",
          text: [
            "ตรวจอย่างน้อยสามกรณี: 0 รอบ (ได้ค่าเริ่ม), 1 รอบ (ค่าของรอบแรก), หลายรอบ ถ้าผลผิด ให้พิมพ์ตัวนับและตัวสะสมทุกรอบเหมือนในตัวอย่างเพื่อดูว่าเริ่มผิดรอบไหน",
          ],
        },
      ],
      walkthrough: [
        "ก่อนลูป total เป็น 0",
        "day 1: total = 0 + 1 ได้ 1 แล้วพิมพ์ 1:1",
        "day 2: total = 1 + 2 ได้ 3 แล้วพิมพ์ 2:3",
        "day 3: total = 3 + 3 ได้ 6 แล้วพิมพ์ 3:6",
        "day 4 ไม่ผ่านเงื่อนไข ออกจากลูป แล้วพิมพ์ total คือ 6",
      ],
      pitfalls: [
        "ประกาศ int total = 0; ไว้ใน { } ของ for — total จะเริ่มใหม่ทุกรอบ และใช้ total หลังลูปไม่ได้เพราะชื่อนั้นมีอยู่แค่ในบล็อก",
        "พิมพ์ตัวนับ day แทนผลรวม — day บอกแค่ว่าอยู่รอบไหน ผลรวมอยู่ใน total",
        "เลือกค่าเริ่มผิด เช่นเริ่ม total ที่ 1 — กรณี 0 รอบจะได้ 1 แทน 0 และทุกกรณีเกินไป 1",
      ],
      checks: [
        { question: "ทำไมต้องประกาศ total ก่อน for?", answer: "เพื่อให้ค่าคงอยู่ข้ามรอบ และยังใช้ total ได้หลังลูปจบ" },
        { question: "ถ้าลูปทำ 0 รอบ ผลรวมเป็นอะไร?", answer: "ค่าเริ่มที่ประกาศไว้ก่อนลูป คือ 0" },
      ],
      recap: [
        "ตัวนับบอกรอบ ตัวสะสมบอกผลรวม — แยกเป็นคนละตัวแปร",
        "ประกาศตัวสะสมก่อนลูป และเลือกค่าเริ่มให้ถูกกับกรณี 0 รอบ",
      ],
      traceHint: "ทำตารางสองคอลัมน์: day และ total หลังบรรทัด total = total + day ของแต่ละรอบ",
      practiceHints: [
        "ต้องมีตัวแปรใหม่สำหรับจำยอดรวม แยกจาก days และตัวนับ",
        "ประกาศตัวสะสมก่อน for แล้ววนวันที่ 1 ถึง days ในลูปบวกจำนวนคูปองของวันนั้น",
        "จำนวนคูปองของวันที่ day คือ day * 2 — บรรทัดในลูปคือการเอายอดเดิมบวกค่านี้แล้วเก็บกลับ",
      ],
      acceptance: [
        checkLocally,
        "days = 3 ได้ 12, days = 0 ได้ 0, days = 1 ได้ 2",
        "อธิบายค่าตัวสะสมก่อนและหลังแต่ละรอบได้",
      ],
      solutionNotes: [
        "days คือจำนวนวันที่ไม่เปลี่ยน, day คือตัวนับ, coupons คือยอดสะสม",
        "สูตรคณิตศาสตร์ days * (days + 1) ให้ผลเดียวกัน แต่แบบฝึกนี้ฝึกการไล่ตัวสะสมในลูป",
      ],
      reflection: [
        "ถ้าผลรวมของคุณผิดไป จะพิมพ์อะไรเพิ่มในลูปเพื่อหาว่าเริ่มผิดรอบไหน?",
      ],
    },
  },
  {
    id: "java-method-basics",
    courseId: "java-foundations",
    unit: "สะพานพื้นฐาน Java",
    language: "java",
    standard: "v3",
    title: "method หนึ่งงาน: รับค่าและคืนค่า",
    prerequisites: ["java-switch"],
    objective: "ประกาศ static method นอก main ที่รับ parameter หนึ่งตัว และคืนค่าที่ main นำไปใช้ต่อได้",
    why: "ก่อนแยกโปรแกรม CLI เป็นหลาย method ต้องเห็นว่าการประกาศ method ยังไม่ใช่การเรียก และการ println ไม่ใช่การ return",
    explanation: "static int twice(int value) { return value * 2; } — static ทำให้ main เรียกได้โดยไม่ต้องสร้าง object, int ตัวแรกคือชนิดของค่าที่คืน, twice คือชื่อ, int value ในวงเล็บคือ parameter ที่รับเข้ามา, return ส่งค่ากลับไปให้ผู้เรียกแล้วจบ method",
    example: java`public class Main {
    static int twice(int value) {
        return value * 2;
    }

    public static void main(String[] args) {
        int result = twice(3);
        System.out.println(result + 1);
        System.out.println(twice(0));
    }
}`,
    expectedOutput: "7\n0",
    tracePrompt: "ไม่ต้องรัน: ถ้าเปลี่ยนบรรทัดใน main เป็น int result = twice(twice(2)); แล้ว System.out.println(result); จะได้อะไร และ twice ถูกเรียกกี่ครั้ง?",
    traceAnswer: "ได้ 8 และเรียก 2 ครั้ง — twice(2) ด้านในทำก่อนแล้วคืน 4 จากนั้น twice(4) คืน 8 ซึ่งถูกเก็บใน result",
    practicePrompt: `แก้ method addFee ให้คืนยอดที่บวกค่าธรรมเนียม 5 บาทแล้ว (addFee(20) ต้องได้ 25 และ addFee(0) ต้องได้ 5) main แสดงผลทั้งสองแล้ว ไม่ต้องแก้ main\n${runLocally}`,
    starter: java`public class Main {
    static int addFee(int amount) {
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(addFee(20));
        System.out.println(addFee(0));
    }
}`,
    solution: java`public class Main {
    static int addFee(int amount) {
        return amount + 5;
    }

    public static void main(String[] args) {
        System.out.println(addFee(20));
        System.out.println(addFee(0));
    }
}`,
    solutionCheck: { output: "25\n5" },
    buggy: java`public class Main {
    static int twice(int value) {
        System.out.println(value * 2);
    }

    public static void main(String[] args) {
        System.out.println(twice(3));
    }
}`,
    bugCheck: { kind: "compile", message: "missing return statement" },
    bugExplanation: "javac แจ้ง missing return statement เพราะ method ประกาศว่าคืน int แต่ข้างในมีแค่ println ซึ่งแสดงผลอย่างเดียว ไม่ได้ส่งค่ากลับ แก้เป็น return value * 2; แล้ว main จะแสดง 6",
    vocabulary: [v("method", "ชุดคำสั่งที่มีชื่อ เรียกใช้ซ้ำได้"), v("parameter", "ชื่อที่ method ใช้รับค่า เช่น int value"), v("argument", "ค่าที่ส่งตอนเรียก เช่น 3 ใน twice(3)"), v("return", "ส่งค่ากลับไปแทนที่จุดที่เรียก แล้วจบ method")],
    checkpoint: {
      prompt: `${assessment}\n\nโจทย์: ค่าซองกันกระแทกคิดชิ้นละ 3 บาท ถ้าจำนวนชิ้นเป็น 0 หรือติดลบ ค่าซองเป็น 0 เขียน method ที่รับจำนวนชิ้นแล้วคืนค่าซอง (ตั้งชื่อเอง) ให้ main ทดสอบ -1, 0 และ 4 ชิ้น แล้วนำค่าซองของ 4 ชิ้นไปบวกค่าขนส่ง 10 บาทใน main ส่งโค้ด output และอธิบายว่าส่วนไหนคำนวณ ส่วนไหนแสดงผล`,
      rubric: [
        "output เป็น 0 / 0 / 22 (หรือแสดง 12 ก่อนแล้ว 22) — -1 และ 0 ชิ้นได้ 0, 4 ชิ้นได้ 12 และบวกค่าขนส่งได้ 22",
        "method ประกาศชนิดค่าที่คืนเป็น int และ return ได้ทุกเส้นทาง ไม่ใช้ println แทน return",
        "อธิบายได้ว่า method คำนวณและคืนค่า ส่วน main เป็นผู้แสดงผลและบวกค่าขนส่ง",
      ],
      modelAnswer: java`public class Main {
    static int envelopeCost(int count) {
        if (count <= 0) {
            return 0;
        }
        return count * 3;
    }

    public static void main(String[] args) {
        System.out.println(envelopeCost(-1));
        System.out.println(envelopeCost(0));
        System.out.println(envelopeCost(4) + 10);
    }
}` + "\n\noutput: 0 / 0 / 22\n\nทำไมถูก: envelopeCost มี return ทั้งกรณีจำนวนไม่บวก (0) และกรณีปกติ (count * 3) ค่าที่คืนไปแทนที่จุดเรียก main จึงบวก 10 ต่อได้ (12 + 10 = 22) method ไม่ได้พิมพ์อะไรเอง ใช้ if-else แทน return สองจุดก็ได้ถ้าคืนค่าครบทุกกรณี",
    },
    lesson: {
      hook: "เครื่องคิดเงินมีปุ่ม “บวก VAT” ที่ใช้ซ้ำได้กับทุกยอด method คือการตั้งชื่อให้งานคำนวณหนึ่งงาน แล้วเรียกใช้กับค่าใหม่ได้เรื่อย ๆ",
      explain: [
        {
          heading: "โครงของ method",
          text: [
            "static int twice(int value) { return value * 2; } — ชนิดหน้าชื่อ (int) บอกว่าคืนค่าอะไร, วงเล็บหลังชื่อบอกว่ารับอะไร, { } ครอบคำสั่ง, return ส่งค่ากลับแล้วจบ",
            "method เป็นสมาชิกของ class จึงวางไว้ใน class Main แต่อยู่นอก { } ของ main ถ้าวางไว้ข้างใน main จะ compile ไม่ผ่าน",
          ],
        },
        {
          heading: "เรียกและนำผลไปใช้",
          text: [
            "twice(3) คือการเรียกโดยส่ง argument 3 ให้ parameter value ค่าที่ return ไปแทนที่ตรงจุดเรียก เช่น int result = twice(3); ทำให้ result เป็น 6 ผู้เรียกจะเก็บ แสดง หรือคำนวณต่อก็ได้",
            "System.out.println แค่แสดงผลบนจอ ค่าไม่ได้กลับไปหาผู้เรียก method ที่ประกาศว่าคืน int จึงต้องมี return ในทุกเส้นทาง ส่วน void หมายถึงไม่คืนค่า",
          ],
        },
      ],
      walkthrough: [
        "การประกาศ twice ยังไม่ทำอะไร โปรแกรมเริ่มทำงานที่ main",
        "twice(3) ส่ง 3 ให้ value แล้ว return 6 กลับมาเก็บใน result",
        "println(result + 1) คำนวณ 6 + 1 แล้วแสดง 7",
        "println(twice(0)) เรียกอีกครั้งด้วย 0 ได้ค่าคืน 0 แล้วแสดง 0",
      ],
      pitfalls: [
        "วาง static int twice(...) ไว้ใน { } ของ main — compile ไม่ผ่าน method ต้องอยู่ใน class แต่อยู่นอก main",
        "ชนิดค่าที่คืนไม่ตรง เช่นประกาศ static int แต่ return \"6\" ซึ่งเป็นข้อความ — javac แจ้ง incompatible types",
        "เรียก twice(3); เฉย ๆ โดยไม่เก็บหรือใช้ค่าที่คืน — ไม่ error แต่ค่า 6 หายไปโดยไม่มีใครใช้",
      ],
      checks: [
        { question: "ประกาศ method แล้ว method ทำงานทันทีไหม?", answer: "ไม่ — ต้องเรียกก่อน เช่น twice(3) คำสั่งใน method จึงทำงาน" },
        { question: "ค่าที่ return ไปอยู่ที่ไหน?", answer: "ไปแทนที่ตรงจุดที่เรียก เช่น int result = twice(3); ทำให้ result เป็น 6" },
      ],
      recap: [
        "ประกาศ = บอกชนิดที่คืน ชื่อ และ parameter · เรียก = ส่ง argument แล้วได้ค่าคืน",
        "return ส่งค่ากลับ ส่วน println แค่แสดงผล",
      ],
      traceHint: "เมื่อเจอการเรียก method ให้จดว่า parameter ได้ค่าอะไร แล้ว return อะไรกลับมาแทนที่จุดเรียก",
      practiceHints: [
        "ผู้เรียกต้องได้ยอดที่บวกค่าธรรมเนียมแล้วกลับไป ตอนนี้ method คืน 0 เสมอ",
        "แก้เฉพาะบรรทัด return ใน addFee ให้ใช้ parameter amount",
        "นิพจน์ที่ต้องคืนคือ amount บวก 5",
      ],
      acceptance: [
        checkLocally,
        "output เป็น 25 / 5",
        "เปลี่ยน argument ใน main แล้วผลเปลี่ยนตาม และ addFee ไม่มี println อยู่ข้างใน",
      ],
      solutionNotes: [
        "ชนิดที่คืน int ตรงกับนิพจน์ amount + 5",
        "void ใช้กับ method ที่แสดงผลอย่างเดียว ไม่เหมาะกับงานคำนวณที่ผู้เรียกต้องนำผลไปใช้",
      ],
      reflection: [
        "ถ้า method ของคุณ println แทน return ผู้เรียกจะทำอะไรไม่ได้บ้าง? ยกตัวอย่างจากโค้ดของคุณ",
      ],
    },
  },
  {
    id: "java-array-basics",
    courseId: "java-foundations",
    unit: "สะพานพื้นฐาน Java",
    language: "java",
    standard: "v3",
    title: "array เล็ก: index, length และ split",
    prerequisites: ["java-methods"],
    objective: "สร้าง array อ่านค่าด้วย index วนรวมด้วย enhanced for และแยกข้อความเป็น String[] ด้วย split ได้ พร้อมตรวจขอบก่อนใช้",
    why: "ก่อนค้นค่าน้อยสุดหรือคัดลอกข้อมูล ต้องเข้าใจตำแหน่ง ความยาว และรายการว่างก่อน และคำสั่งที่ผู้ใช้พิมพ์ในบทหลัง ๆ จะถูกแยกเป็น array ด้วย split",
    explanation: "int[] values = {4, 7, 2}; สร้างรายการจำนวนเต็มสามช่อง index คือตำแหน่งที่เริ่มนับจาก 0 ดังนั้น values[0] คือ 4 และ values[2] คือ 2 ส่วน values.length คือจำนวนช่อง (3) index สุดท้ายจึงเป็น length - 1 การอ่าน values[3] ผิดขอบและเกิด ArrayIndexOutOfBoundsException",
    example: java`public class Main {
    public static void main(String[] args) {
        int[] values = {4, 7, 2};
        System.out.println(values.length);
        System.out.println(values[0]);
        int total = 0;
        for (int value : values) {
            total += value;
        }
        System.out.println(total);
    }
}`,
    expectedOutput: "3\n4\n13",
    tracePrompt: "ไม่ต้องรัน: ถ้าเปลี่ยนบรรทัดแรกเป็น int[] values = {4, 7, 2, 10}; output สามบรรทัดจะเป็นอะไร และ index สุดท้ายคือเท่าไร?",
    traceAnswer: "4 / 4 / 23 — length เป็น 4, values[0] ยังเป็น 4, total เป็น 4 → 11 → 13 → 23 และ index สุดท้ายคือ 3 (length - 1)",
    practicePrompt: `เขียน method countPositive ให้คืนจำนวนค่าที่มากกว่า 0 ใน array (0 ไม่นับ) starter มีชื่อ method และ main ที่ทดสอบ {0, -1, 4, 2} (ต้องได้ 2), array ว่าง (ต้องได้ 0) และ {-2} (ต้องได้ 0) ไว้แล้ว ห้ามแก้ค่าใน array\n${runLocally}`,
    starter: java`public class Main {
    static int countPositive(int[] values) {
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(countPositive(new int[]{0, -1, 4, 2}));
        System.out.println(countPositive(new int[0]));
        System.out.println(countPositive(new int[]{-2}));
    }
}`,
    solution: java`public class Main {
    static int countPositive(int[] values) {
        int count = 0;
        for (int value : values) {
            if (value > 0) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println(countPositive(new int[]{0, -1, 4, 2}));
        System.out.println(countPositive(new int[0]));
        System.out.println(countPositive(new int[]{-2}));
    }
}`,
    solutionCheck: { output: "2\n0\n0" },
    buggy: java`public class Main {
    public static void main(String[] args) {
        int[] values = {4, 7, 2};
        System.out.println(values[values.length]);
    }
}`,
    bugCheck: { kind: "runtime", message: "ArrayIndexOutOfBoundsException" },
    bugExplanation: "คาดว่าจะได้ 2 (ตัวสุดท้าย) แต่ตอนรันเกิด ArrayIndexOutOfBoundsException เพราะ values.length เป็น 3 ซึ่งเป็นจำนวนช่อง ไม่ใช่ index สุดท้าย index สุดท้ายคือ values.length - 1 แก้เป็น values[values.length - 1] และถ้า array อาจว่าง ต้องตรวจ length ก่อนอ่าน",
    vocabulary: [v("array", "รายการขนาดคงที่ที่ทุกช่องเป็นชนิดเดียวกัน เช่น int[]"), v("index", "ตำแหน่งในรายการ เริ่มจาก 0"), v("length", "จำนวนช่องของ array (ไม่มีวงเล็บ)"), v("split", "method ของ String ที่แยกข้อความตามตัวคั่น แล้วคืน String[]")],
    checkpoint: {
      prompt: `${assessment}\n\nโจทย์: ร้านมียอดขายรายวันเก็บใน int[] เขียน method ที่คืนว่ามีกี่วันที่ยอดขายสูงกว่าวันก่อนหน้า (วันแรกไม่มีวันก่อนหน้าจึงไม่นับ) ทดสอบ {3, 5, 5, 8, 2}, array ว่าง และ {7} ส่งโค้ด output และอธิบายว่าทำไมโค้ดของคุณไม่อ่านนอกขอบ array`,
      rubric: [
        "output 2 / 0 / 0 ตามลำดับ (วันที่ยอดเท่าเดิมไม่นับ)",
        "array ว่างและ array หนึ่งช่องไม่ทำให้เกิด ArrayIndexOutOfBoundsException และไม่แก้ค่าใน array",
        "อธิบายได้ว่าเทียบตำแหน่งใดกับตำแหน่งใด และทำไมช่วงของ index ไม่เกินขอบ",
      ],
      modelAnswer: java`public class Main {
    static int countRises(int[] sales) {
        int rises = 0;
        for (int i = 1; i < sales.length; i++) {
            if (sales[i] > sales[i - 1]) {
                rises++;
            }
        }
        return rises;
    }

    public static void main(String[] args) {
        System.out.println(countRises(new int[]{3, 5, 5, 8, 2}));
        System.out.println(countRises(new int[0]));
        System.out.println(countRises(new int[]{7}));
    }
}` + "\n\noutput: 2 / 0 / 0\n\nทำไมถูก: เริ่ม i ที่ 1 เพราะต้องเทียบกับ i - 1 (วันก่อนหน้า) จึงไม่มีการอ่าน sales[-1] และเงื่อนไข i < sales.length ทำให้ไม่อ่านเกินช่องสุดท้าย array ว่างและ array หนึ่งช่องจึงทำ 0 รอบแล้วได้ 0 ส่วน {3, 5, 5, 8, 2} นับ 5 > 3 และ 8 > 5 ได้ 2 (5 กับ 5 เท่ากันจึงไม่นับ) จะเริ่ม i ที่ 0 แล้วเทียบ sales[i + 1] โดยให้ i < sales.length - 1 ก็ถูกเช่นกัน",
    },
    lesson: {
      hook: "ตู้ล็อกเกอร์มีเลขช่องติดไว้และมีจำนวนช่องคงที่ array ก็เป็นแบบนั้น: แต่ละช่องมีตำแหน่ง และขอบของตู้คือ length",
      explain: [
        {
          heading: "สร้างรายการขนาดคงที่",
          text: [
            "int[] values = {4, 7, 2}; — int[] คือชนิด “รายการ int” ค่าใน { } คั่นด้วย comma values[0] อ่านช่องแรก และ values.length (ไม่มีวงเล็บ ต่างจาก String.length()) คือจำนวนช่อง",
            "new int[3] สร้างสามช่องที่เริ่มเป็น 0 ส่วน new int[]{0, -1, 4} สร้าง array พร้อมค่าได้ตรงจุดที่ต้องการ เช่นตอนส่งเป็น argument และ new int[0] คือ array ว่าง (length เป็น 0)",
          ],
        },
        {
          heading: "วนค่าแต่ละช่อง",
          text: [
            "for (int value : values) { ... } เรียกว่า enhanced for อ่านค่าทีละช่องตามลำดับ value เป็นสำเนาของค่าในช่องนั้น ไม่ใช่ index array ว่างทำ 0 รอบ ถ้าต้องรู้ตำแหน่งหรือแก้ค่าในช่อง ให้ใช้ for แบบมี index: for (int i = 0; i < values.length; i++) แล้วอ่านหรือเขียน values[i]",
            "Arrays.toString(values) จาก java.util.Arrays (ต้องเขียน import java.util.Arrays; บนสุดของไฟล์) แสดงรายการเป็น [4, 7, 2] ส่วน println(values) จะแสดงรหัสของ object ที่อ่านไม่ออก",
          ],
        },
        {
          heading: "แยกข้อความเป็น array ด้วย split",
          text: [
            "line.split(\" \") แยกข้อความ line ทุกจุดที่เจอช่องว่าง แล้วคืน String[] ส่วน line.split(\" \", 2) จำกัดผลไม่เกิน 2 ชิ้น: ชิ้นแรกคือข้อความก่อนช่องว่างแรก ชิ้นที่สองคือทั้งหมดที่เหลือ (รวมช่องว่างข้างใน) จึงเหมาะกับคำสั่งแบบ add ตามด้วยชื่อหลายคำ",
            "ถ้าข้อความไม่มีตัวคั่นเลย เช่น \"list\".split(\" \", 2) จะได้ array ยาว 1 ดังนั้นต้องตรวจ parts.length ก่อนอ่าน parts[1] ในคอร์สนี้ใช้ตัวคั่นเป็นอักขระธรรมดาเช่น \" \", \",\" หรือ \":\" (ตัวคั่นของ split จริง ๆ เป็น regular expression อักขระพิเศษอย่าง . หรือ | จึงทำงานต่างไป ยังไม่ใช้ในคอร์สนี้)",
          ],
          code: java`public class Main {
    public static void main(String[] args) {
        String line = "add Clean Code";
        String[] parts = line.split(" ", 2);
        System.out.println(parts.length);
        System.out.println(parts[0]);
        System.out.println(parts[1]);
        String[] colors = "red,green,blue".split(",");
        System.out.println(colors.length);
        System.out.println(colors[2]);
        System.out.println("list".split(" ", 2).length);
    }
}`,
          output: "2\nadd\nClean Code\n3\nblue\n1",
          language: "java",
        },
      ],
      walkthrough: [
        "values ชี้ไปที่ array สามช่อง: index 0 คือ 4, index 1 คือ 7, index 2 คือ 2",
        "values.length เป็น 3 และ values[0] เป็น 4 จึงพิมพ์ 3 แล้ว 4",
        "enhanced for อ่าน 4, 7, 2 ตามลำดับ total เป็น 0 → 4 → 11 → 13",
        "หลังลูปพิมพ์ total คือ 13",
      ],
      pitfalls: [
        "เขียน values.length() มีวงเล็บ — compile ไม่ผ่าน เพราะ length ของ array ไม่ใช่ method (ต่างจาก String)",
        "แก้ value = 9; ใน enhanced for แล้วคิดว่าช่องใน array เปลี่ยน — value เป็นสำเนา ต้องเขียนผ่าน values[i]",
        "อ่าน parts[1] หลัง split โดยไม่ตรวจ parts.length — ถ้าผู้ใช้พิมพ์คำเดียวจะเกิด ArrayIndexOutOfBoundsException",
      ],
      checks: [
        { question: "array ที่ length เป็น 3 มี index สุดท้ายเท่าไร?", answer: "2 (คือ length - 1)" },
        { question: "ใน enhanced for ถ้าเขียน value = 9; ค่าในช่องของ array เปลี่ยนไหม?", answer: "ไม่เปลี่ยน — value เป็นสำเนาของค่า ถ้าจะแก้ช่องต้องเขียนผ่าน index เช่น values[i] = 9" },
        { question: "\"take 3\".split(\" \", 2) ได้อะไร?", answer: "array ยาว 2: ช่อง 0 คือ \"take\" ช่อง 1 คือ \"3\" (ยังเป็นข้อความ ไม่ใช่ int)" },
      ],
      recap: [
        "index เริ่ม 0 และสุดท้ายคือ length - 1 · array ว่างมี length 0",
        "enhanced for เหมาะกับการอ่านค่า · split คืน String[] และต้องตรวจ length ก่อนอ่านชิ้นที่ต้องการ",
      ],
      traceHint: "เขียน index ใต้ค่าแต่ละช่องก่อน แล้วจดค่า total หลังแต่ละรอบ",
      practiceHints: [
        "ผลที่ต้องการคือจำนวนตัวที่ผ่านเงื่อนไข ไม่ใช่ผลรวมของค่า",
        "ใช้ตัวนับที่เริ่ม 0 ก่อนลูป แล้ววนอ่านทีละค่า",
        "ในลูปเพิ่มตัวนับเฉพาะเมื่อค่านั้นมากกว่า 0 (ใช้ if ที่มีวงเล็บปีกกา) แล้ว return ตัวนับหลังลูป",
      ],
      acceptance: [
        checkLocally,
        "สามกรณีใน main ได้ 2 / 0 / 0",
        "0 ไม่ถูกนับ และ method ไม่แก้ค่าใน array",
      ],
      solutionNotes: [
        "enhanced for เหมาะเพราะต้องการแค่ค่า ไม่ต้องรู้ตำแหน่ง",
        "array ว่างทำ 0 รอบ จึงคืนค่าเริ่ม 0 โดยไม่ต้องมี if พิเศษ",
      ],
      reflection: [
        "เมื่อไรควรใช้ for แบบมี index แทน enhanced for? ยกตัวอย่างจากงานที่ทำในบทนี้",
      ],
    },
  },
  {
    id: "java-array-minimum",
    courseId: "java-foundations",
    unit: "สะพานพื้นฐาน Java",
    language: "java",
    standard: "v3",
    title: "ค้นตำแหน่ง minimum ก่อนตัดข้อมูล",
    prerequisites: ["java-array-basics"],
    objective: "หาตำแหน่งของค่าน้อยสุดใน array ได้ ทั้งเมื่อมีค่าติดลบ ค่าซ้ำ และรายการว่าง",
    why: "ถ้าต้องตัดค่าน้อยสุดออก ต้องรู้ตำแหน่งของมันก่อน และค่าเริ่มที่เดาเอง เช่น 0 อาจไม่มีอยู่ในข้อมูลจริง",
    explanation: "เมื่อต้องตัดหรือแก้สมาชิก ให้เก็บ index ของค่าน้อยสุด ไม่ใช่แค่ค่า เริ่มด้วย lowestIndex = 0 (เมื่อ array ไม่ว่าง) แล้วเดิน i จาก 1 ถึงช่องสุดท้าย เทียบ values[i] กับ values[lowestIndex] และเปลี่ยน lowestIndex เฉพาะเมื่อเจอค่าที่น้อยกว่า",
    example: java`public class Main {
    public static void main(String[] args) {
        int[] values = {5, 2, 2, 8};
        int lowestIndex = 0;
        for (int i = 1; i < values.length; i++) {
            if (values[i] < values[lowestIndex]) {
                lowestIndex = i;
            }
            System.out.println(i + ":" + lowestIndex);
        }
        System.out.println(lowestIndex);
    }
}`,
    expectedOutput: "1:1\n2:1\n3:1\n1",
    tracePrompt: "ไม่ต้องรัน: ถ้าเปลี่ยนข้อมูลเป็น int[] values = {3, 8, 1, 1}; จะพิมพ์อะไรบ้าง?",
    traceAnswer: "1:0 / 2:2 / 3:2 / 2 — i = 1 ค่า 8 ไม่น้อยกว่า 3 ตำแหน่งยัง 0, i = 2 ค่า 1 น้อยกว่า 3 เปลี่ยนเป็น 2, i = 3 ค่า 1 เท่ากับค่าที่ตำแหน่ง 2 จึงไม่เปลี่ยน",
    practicePrompt: `เขียน method minIndex ให้คืนตำแหน่งของค่าน้อยสุด ถ้าค่าน้อยสุดซ้ำให้คืนตำแหน่งแรก และคืน -1 เมื่อ array ว่าง main ใน starter ทดสอบ {5, 2, 2, 8} (ได้ 1), {-2, -5} (ได้ 1), array ว่าง (ได้ -1) และ {9} (ได้ 0) ไว้แล้ว\n${runLocally}`,
    starter: java`public class Main {
    static int minIndex(int[] values) {
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(minIndex(new int[]{5, 2, 2, 8}));
        System.out.println(minIndex(new int[]{-2, -5}));
        System.out.println(minIndex(new int[0]));
        System.out.println(minIndex(new int[]{9}));
    }
}`,
    solution: java`public class Main {
    static int minIndex(int[] values) {
        if (values.length == 0) {
            return -1;
        }
        int lowestIndex = 0;
        for (int i = 1; i < values.length; i++) {
            if (values[i] < values[lowestIndex]) {
                lowestIndex = i;
            }
        }
        return lowestIndex;
    }

    public static void main(String[] args) {
        System.out.println(minIndex(new int[]{5, 2, 2, 8}));
        System.out.println(minIndex(new int[]{-2, -5}));
        System.out.println(minIndex(new int[0]));
        System.out.println(minIndex(new int[]{9}));
    }
}`,
    solutionCheck: { output: "1\n1\n-1\n0" },
    buggy: java`public class Main {
    public static void main(String[] args) {
        int[] values = {5, 2, 8};
        int lowest = 0;
        for (int value : values) {
            if (value < lowest) {
                lowest = value;
            }
        }
        System.out.println(lowest);
    }
}`,
    bugCheck: { kind: "logic", output: "0" },
    bugExplanation: "คาดว่าจะได้ 2 แต่ได้ 0 ซึ่งไม่มีอยู่ใน array เพราะเริ่ม lowest ที่ 0 แล้วทุกค่าในข้อมูลมากกว่า 0 เงื่อนไขจึงไม่เคยจริง แก้โดยเริ่มจากค่าจริง values[0] หลังตรวจว่า array ไม่ว่าง และถ้างานต้องการตำแหน่ง ให้เก็บ index แทนค่า",
    vocabulary: [v("minimum", "ค่าน้อยที่สุดในรายการ"), v("ผู้สมัคร (candidate)", "ตำแหน่งที่ดีที่สุดเท่าที่เจอมาถึงตอนนี้"), v("-1", "สัญญาว่า “ไม่มีตำแหน่ง” ห้ามนำไปใช้เป็น index")],
    checkpoint: {
      prompt: `${assessment}\n\nโจทย์: เครื่องวัดคะแนนบันทึกค่าติดลบเมื่อวัดพลาด (ค่าติดลบคือข้อมูลเสียที่ต้องข้าม) เขียน method ที่คืนตำแหน่งของคะแนนสูงสุดที่ไม่ติดลบ ถ้าคะแนนสูงสุดซ้ำให้คืนตำแหน่งแรก และคืน -1 ถ้าไม่มีคะแนนที่ใช้ได้เลย ทดสอบ {-1, 4, 9, 9, -5}, {-3, -2}, array ว่าง และ {0} ส่งโค้ด output และอธิบายว่าคุณเลือกค่าเริ่มของตำแหน่งอย่างไร`,
      rubric: [
        "output 2 / -1 / -1 / 0 ตามลำดับ",
        "ไม่เลือกตำแหน่งของค่าติดลบ แม้ค่าติดลบอยู่ที่ตำแหน่ง 0 และไม่อ่านนอกขอบเมื่อ array ว่าง",
        "อธิบายค่าเริ่มของตำแหน่งได้ (เช่นเริ่ม -1 ว่ายังไม่เจอคะแนนที่ใช้ได้) และอธิบายกฎค่าซ้ำได้",
      ],
      modelAnswer: java`public class Main {
    static int bestValid(int[] scores) {
        int best = -1;
        for (int i = 0; i < scores.length; i++) {
            if (scores[i] >= 0) {
                if (best == -1 || scores[i] > scores[best]) {
                    best = i;
                }
            }
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(bestValid(new int[]{-1, 4, 9, 9, -5}));
        System.out.println(bestValid(new int[]{-3, -2}));
        System.out.println(bestValid(new int[0]));
        System.out.println(bestValid(new int[]{0}));
    }
}` + "\n\noutput: 2 / -1 / -1 / 0\n\nทำไมถูก: เริ่ม best ที่ -1 หมายถึงยังไม่เจอคะแนนที่ใช้ได้ (เริ่มที่ 0 ไม่ได้เพราะช่อง 0 อาจเป็นค่าเสีย) ข้ามค่าติดลบทุกตัว คะแนนแรกที่ใช้ได้จะกลายเป็นผู้สมัคร แล้วเปลี่ยนเฉพาะเมื่อเจอค่าที่มากกว่าจริง (>) จึงได้ตำแหน่งแรกเมื่อค่าซ้ำ เพราะ || หยุดตรวจเมื่อ best == -1 เป็นจริง จึงไม่อ่าน scores[-1] array ว่างทำ 0 รอบจึงคืน -1 ใช้ if ซ้อนหรือ else if แทน || ก็ได้ถ้าผลเหมือนกัน",
    },
    lesson: {
      hook: "กรรมการหาผู้วิ่งที่ใช้เวลาน้อยที่สุดต้องจำว่า “ใคร” ไม่ใช่แค่ “กี่วินาที” เพราะจะต้องเรียกคนนั้นขึ้นรับรางวัล เช่นเดียวกับการเก็บ index ของค่าน้อยสุด",
      explain: [
        {
          heading: "เลือกผู้สมัครจากข้อมูลจริง",
          text: [
            "เริ่ม lowestIndex = 0 คือให้ช่องแรกเป็นผู้สมัครก่อน แล้วเดิน i จาก 1 เทียบ values[i] กับ values[lowestIndex] ถ้าน้อยกว่าจึงเปลี่ยนผู้สมัคร ค่าที่เทียบจึงมาจากข้อมูลจริงเสมอ ไม่ใช่ค่าที่เดาเอง",
            "กฎค่าซ้ำในบทนี้คือเลือกตัวแรก การใช้ < ทำให้ไม่เปลี่ยนเมื่อเท่ากัน ถ้าใช้ <= จะเลื่อนไปตัวท้าย ทั้งสองแบบถูกได้ แต่ต้องตรงกับ requirement",
          ],
        },
        {
          heading: "รายการว่างต้องตกลงก่อน",
          text: [
            "array ว่างไม่มีตำแหน่ง 0 จึงต้องตรวจ values.length == 0 ก่อนตั้งผู้สมัคร แล้วคืน -1 ซึ่งหมายถึงไม่มีตำแหน่ง ผู้เรียกต้องตรวจ -1 ก่อนนำไปใช้ array หนึ่งช่องคืน 0 โดยไม่เข้าลูป",
          ],
        },
      ],
      walkthrough: [
        "ผู้สมัครเริ่มที่ตำแหน่ง 0 (ค่า 5)",
        "i = 1 ค่า 2 น้อยกว่า 5 → ผู้สมัครเป็นตำแหน่ง 1 แล้วพิมพ์ 1:1",
        "i = 2 ค่า 2 เท่ากับค่าของผู้สมัคร (2 < 2 เท็จ) → ไม่เปลี่ยน พิมพ์ 2:1",
        "i = 3 ค่า 8 ไม่น้อยกว่า 2 → ไม่เปลี่ยน พิมพ์ 3:1 แล้วหลังลูปพิมพ์ 1",
      ],
      pitfalls: [
        "ตั้งผู้สมัครเป็น values[0] ก่อนตรวจว่า array ว่าง — array ว่างจะเกิด ArrayIndexOutOfBoundsException",
        "เก็บแค่ค่าน้อยสุดแล้วภายหลังต้องค้นตำแหน่งซ้ำ — ถ้างานต้องการ index ให้เก็บ index ตั้งแต่แรก",
        "นำ -1 ที่คืนตอน array ว่างไปอ่าน values[-1] — ต้องตรวจผลก่อนใช้เป็น index",
      ],
      checks: [
        { question: "ทำไมต้องตรวจ values.length == 0 ก่อนตั้ง lowestIndex = 0?", answer: "เพราะ array ว่างไม่มีตำแหน่ง 0 ถ้าอ่าน values[0] จะเกิด ArrayIndexOutOfBoundsException" },
        { question: "ถ้าเปลี่ยน < เป็น <= ผลกับ {5, 2, 2, 8} เปลี่ยนอย่างไร?", answer: "ได้ 2 แทน 1 เพราะค่าที่เท่ากันทำให้ผู้สมัครเลื่อนไปตำแหน่งท้าย" },
      ],
      recap: [
        "เก็บ index ของผู้สมัคร และเริ่มจากข้อมูลจริง",
        "ตกลงกรณี array ว่างก่อน (-1) และเลือก < หรือ <= ให้ตรงกฎค่าซ้ำ",
      ],
      traceHint: "ทำตาราง: i, values[i], values[lowestIndex], เงื่อนไขจริงหรือเท็จ, lowestIndex หลังรอบนั้น",
      practiceHints: [
        "เริ่มจากกรณีที่ไม่มีตำแหน่งให้คืนก่อน",
        "ตรวจ array ว่างแล้วคืน -1 จากนั้นให้ตำแหน่ง 0 เป็นผู้สมัคร แล้ววน i ตั้งแต่ 1",
        "จุดสำคัญคือเงื่อนไขเปลี่ยนผู้สมัคร: เปลี่ยนเฉพาะเมื่อค่าที่ i น้อยกว่าค่าของผู้สมัครจริง ๆ (ไม่รวมเท่ากัน)",
      ],
      acceptance: [
        checkLocally,
        "สี่กรณีใน main ได้ 1 / 1 / -1 / 0",
        "ค่าซ้ำได้ตำแหน่งแรก และ method ไม่แก้ค่าใน array",
      ],
      solutionNotes: [
        "เก็บ index เพราะขั้นต่อไป (ตัดข้อมูล) ต้องรู้ตำแหน่ง",
        "-1 เป็นสัญญาว่ากรณีว่างไม่มีตำแหน่ง ไม่ใช่ค่าที่นำไปใช้เป็น index ได้",
      ],
      reflection: [
        "ค่าเริ่มของผู้สมัครในโค้ดของคุณมาจากไหน? ถ้าข้อมูลบางตัวใช้ไม่ได้ คำตอบยังถูกไหม และคุณทดสอบอย่างไร?",
      ],
    },
  },
  {
    id: "java-array-copy",
    courseId: "java-foundations",
    unit: "สะพานพื้นฐาน Java",
    language: "java",
    standard: "v3",
    title: "คัดลอกโดยมีตำแหน่งอ่านและเขียน",
    prerequisites: ["java-array-minimum"],
    objective: "สร้าง array ใหม่และคัดลอกทุกช่องยกเว้น index ที่กำหนด โดยไม่แก้ array ต้นฉบับ",
    why: "หลังหาตำแหน่งที่ต้องตัดได้แล้ว ยังต้องสร้างผลลัพธ์ใหม่ และเมื่อข้ามหนึ่งช่อง ตำแหน่งที่อ่านกับตำแหน่งที่เขียนจะไม่ตรงกันอีกต่อไป",
    explanation: "int[] alias = values; ไม่ได้คัดลอก แต่ทำให้สองชื่อชี้ไปที่ array เดียวกัน ถ้าต้องการผลที่แยกจากต้นฉบับ ให้สร้าง new int[n] แล้วคัดลอกค่าทีละช่อง เมื่อข้ามบางช่อง ใช้ i เป็นตำแหน่งอ่านในต้นฉบับ และ next เป็นตำแหน่งเขียนในผลลัพธ์",
    example: java`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] original = {4, 2, 9};
        int[] result = new int[2];
        int next = 0;
        for (int i = 0; i < original.length; i++) {
            if (i != 1) {
                result[next] = original[i];
                next++;
            }
        }
        System.out.println(Arrays.toString(result));
        System.out.println(Arrays.toString(original));
    }
}`,
    expectedOutput: "[4, 9]\n[4, 2, 9]",
    tracePrompt: "ไม่ต้องรัน: ถ้าเปลี่ยน if (i != 1) เป็น if (i != 0) output สองบรรทัดจะเป็นอะไร? เขียนค่า next หลังแต่ละรอบด้วย",
    traceAnswer: "[2, 9] / [4, 2, 9] — i = 0 ถูกข้าม next ยัง 0; i = 1 เขียน result[0] = 2 แล้ว next เป็น 1; i = 2 เขียน result[1] = 9 แล้ว next เป็น 2; ต้นฉบับไม่เปลี่ยน",
    practicePrompt: `เขียน method copyExcept(values, skip) ให้คืน array ใหม่ที่มีทุกค่ายกเว้นตำแหน่ง skip และคืน array ว่างเมื่อ values ว่าง (สัญญาของแบบฝึกนี้: ถ้า values ไม่ว่าง skip จะเป็น index ที่มีอยู่จริงเสมอ) main ใน starter ทดสอบข้ามกลาง ข้ามแรก ข้ามท้าย array หนึ่งช่อง และ array ว่าง และพิมพ์ต้นฉบับเพื่อตรวจว่าไม่เปลี่ยน\n${runLocally}`,
    starter: java`import java.util.Arrays;

public class Main {
    static int[] copyExcept(int[] values, int skip) {
        return values;
    }

    public static void main(String[] args) {
        int[] source = {4, 2, 9};
        System.out.println(Arrays.toString(copyExcept(source, 1)));
        System.out.println(Arrays.toString(copyExcept(source, 0)));
        System.out.println(Arrays.toString(copyExcept(source, 2)));
        System.out.println(Arrays.toString(source));
        System.out.println(Arrays.toString(copyExcept(new int[]{7}, 0)));
        System.out.println(Arrays.toString(copyExcept(new int[0], -1)));
    }
}`,
    solution: java`import java.util.Arrays;

public class Main {
    static int[] copyExcept(int[] values, int skip) {
        if (values.length == 0) {
            return new int[0];
        }
        int[] result = new int[values.length - 1];
        int next = 0;
        for (int i = 0; i < values.length; i++) {
            if (i != skip) {
                result[next] = values[i];
                next++;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] source = {4, 2, 9};
        System.out.println(Arrays.toString(copyExcept(source, 1)));
        System.out.println(Arrays.toString(copyExcept(source, 0)));
        System.out.println(Arrays.toString(copyExcept(source, 2)));
        System.out.println(Arrays.toString(source));
        System.out.println(Arrays.toString(copyExcept(new int[]{7}, 0)));
        System.out.println(Arrays.toString(copyExcept(new int[0], -1)));
    }
}`,
    solutionCheck: { output: "[4, 9]\n[2, 9]\n[4, 2]\n[4, 2, 9]\n[]\n[]" },
    buggy: java`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] original = {4, 2, 9};
        int[] copy = original;
        copy[0] = 8;
        System.out.println(Arrays.toString(original));
    }
}`,
    bugCheck: { kind: "logic", output: "[8, 2, 9]" },
    bugExplanation: "คาดว่า original ยังเป็น [4, 2, 9] แต่ได้ [8, 2, 9] เพราะ int[] copy = original; ไม่ได้คัดลอก แต่ทำให้ copy ชี้ไปที่ array เดียวกับ original การแก้ copy[0] จึงแก้ original ด้วย แก้โดยสร้าง array ใหม่แล้วคัดลอกทีละช่อง (หรือใช้ Arrays.copyOf) แล้วลองแก้ copy[0] อีกครั้ง",
    vocabulary: [v("alias", "อีกชื่อหนึ่งที่ชี้ไปที่ array เดียวกัน ไม่ใช่สำเนา"), v("ตำแหน่งอ่าน / ตำแหน่งเขียน", "index ในต้นฉบับ (i) กับ index ในผลลัพธ์ (next) ที่เดินไม่เท่ากันเมื่อข้ามช่อง")],
    checkpoint: {
      prompt: `${assessment}\n\nโจทย์: ระบบคิวร้านซ่อมเก็บหมายเลขคิวใน int[] เขียน method ที่รับ array คิว ตำแหน่ง pos (ตั้งแต่ 0 ถึง length ของคิว) และหมายเลขคิวใหม่ แล้วคืน array ใหม่ที่แทรกหมายเลขใหม่ไว้ที่ตำแหน่ง pos โดย array เดิมต้องไม่เปลี่ยน ทดสอบแทรก 7 ลงใน {4, 2, 9} ที่ตำแหน่ง 1, 0 และ 3 แทรก 7 ลงในคิวว่างที่ตำแหน่ง 0 และพิมพ์คิวเดิมหลังทดสอบ ส่งโค้ด output และอธิบายว่าตำแหน่งอ่านกับตำแหน่งเขียนของคุณเดินอย่างไร`,
      rubric: [
        "output [4, 7, 2, 9] / [7, 4, 2, 9] / [4, 2, 9, 7] / [7] และคิวเดิมยังเป็น [4, 2, 9]",
        "สร้าง array ใหม่ขนาด length + 1 และไม่เกิด ArrayIndexOutOfBoundsException ทั้งตอนแทรกต้นและท้าย",
        "อธิบายได้ว่าตำแหน่งอ่านในคิวเดิมและตำแหน่งเขียนในคิวใหม่ต่างกันตั้งแต่จุดที่แทรก",
      ],
      modelAnswer: java`import java.util.Arrays;

public class Main {
    static int[] insertAt(int[] queue, int pos, int ticket) {
        int[] result = new int[queue.length + 1];
        int read = 0;
        for (int write = 0; write < result.length; write++) {
            if (write == pos) {
                result[write] = ticket;
            } else {
                result[write] = queue[read];
                read++;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] queue = {4, 2, 9};
        System.out.println(Arrays.toString(insertAt(queue, 1, 7)));
        System.out.println(Arrays.toString(insertAt(queue, 0, 7)));
        System.out.println(Arrays.toString(insertAt(queue, 3, 7)));
        System.out.println(Arrays.toString(insertAt(new int[0], 0, 7)));
        System.out.println(Arrays.toString(queue));
    }
}` + "\n\noutput: [4, 7, 2, 9] / [7, 4, 2, 9] / [4, 2, 9, 7] / [7] / [4, 2, 9]\n\nทำไมถูก: ผลลัพธ์ยาวกว่าเดิมหนึ่งช่อง จึงวนตามตำแหน่งเขียน write ทุกช่องของผลลัพธ์ ช่องที่ write เท่ากับ pos ใส่หมายเลขใหม่โดยไม่เลื่อน read ส่วนช่องอื่นอ่านจาก queue[read] แล้วเลื่อน read ดังนั้นหลังจุดแทรก read จะช้ากว่า write หนึ่งช่อง และ read ไม่เกิน queue.length - 1 คิวเดิมไม่ถูกเขียนเลย จะวนตามคิวเดิมแล้วจัดการกรณีแทรกท้ายแยกก็ถูกเช่นกันถ้าผ่านทุกกรณี",
    },
    lesson: {
      hook: "ถ่ายเอกสารสมุดรายชื่อโดยข้ามหน้าหนึ่ง หน้าที่อ่านจากต้นฉบับกับหน้าที่เขียนลงสมุดใหม่จะเลขไม่ตรงกันหลังจุดที่ข้าม",
      explain: [
        {
          heading: "สร้างใหม่ต่างจาก assign ชื่อ",
          text: [
            "int[] alias = values; ทำให้สองชื่อชี้ไปที่ array เดียวกัน ไม่ได้คัดลอกสมาชิก ถ้าต้องการผลที่แก้ได้โดยไม่กระทบต้นฉบับ ต้องสร้าง new int[n] แล้วคัดลอกค่าทีละช่อง",
            "Arrays.copyOf(values, values.length) เป็นทางลัดคัดลอกทั้งหมด (ต้อง import java.util.Arrays;) แต่ถ้าต้องข้ามบางช่อง ยังต้องเลือกตำแหน่งเอง",
          ],
        },
        {
          heading: "อ่านด้วย i เขียนด้วย next",
          text: [
            "ผลลัพธ์ยาว length - 1 ตั้ง next = 0 ก่อนลูป วน i ทุกช่องของต้นฉบับ ถ้า i ไม่ใช่ช่องที่ข้าม ให้เขียน result[next] = values[i]; แล้ว next++; เมื่อข้ามช่อง next ไม่เพิ่ม ผลลัพธ์จึงไม่มีช่องว่างค้าง",
            "array ว่างต้องคืน array ใหม่ที่ว่างก่อนสร้างผลลัพธ์ เพราะ new int[0 - 1] คือขนาด -1 ซึ่งสร้างไม่ได้",
          ],
        },
      ],
      walkthrough: [
        "result มีสองช่อง (เริ่มเป็น 0) และ next เริ่มที่ 0",
        "i = 0 ไม่ใช่ช่องที่ข้าม → result[0] = 4 แล้ว next เป็น 1",
        "i = 1 เป็นช่องที่ข้าม → ไม่เขียนอะไร next ยังเป็น 1",
        "i = 2 → result[1] = 9 แล้ว next เป็น 2 จึงพิมพ์ [4, 9] และต้นฉบับยังเป็น [4, 2, 9]",
      ],
      pitfalls: [
        "เขียน result[i] = values[i] แทน result[next] — หลังจุดที่ข้าม i จะเกินขนาดของ result และเกิด ArrayIndexOutOfBoundsException",
        "สร้าง result ขนาด values.length แทน values.length - 1 — ผลจะมี 0 ค้างท้ายหนึ่งช่อง",
        "สร้าง new int[values.length - 1] ตอน array ว่าง — ขนาด -1 ทำให้เกิด NegativeArraySizeException จึงต้องตรวจว่างก่อน",
      ],
      checks: [
        { question: "เมื่อข้ามช่อง next เพิ่มไหม?", answer: "ไม่เพิ่ม เพราะรอบนั้นไม่ได้เขียนอะไรลงผลลัพธ์" },
        { question: "array หนึ่งช่องแล้วข้ามช่องนั้น ผลลัพธ์ยาวเท่าไร?", answer: "0 — คืน array ว่าง และลูปไม่ได้เขียนอะไรเลย" },
      ],
      recap: [
        "assign ชื่อ = alias ไม่ใช่สำเนา · สำเนาต้องสร้าง array ใหม่",
        "เมื่อข้ามช่อง ให้แยกตำแหน่งอ่านกับตำแหน่งเขียน",
      ],
      traceHint: "ทำตาราง: i, ข้ามหรือไม่, next ก่อนเขียน, ค่าที่เขียน, next หลังรอบ",
      practiceHints: [
        "ผลลัพธ์สั้นกว่าต้นฉบับหนึ่งช่อง และต้องเป็น array ใหม่ ไม่ใช่ values",
        "ตรวจ array ว่างก่อน แล้วสร้าง result ใช้ i เป็นตำแหน่งอ่านและ next เป็นตำแหน่งเขียน",
        "next เพิ่มเฉพาะรอบที่เขียนจริง คือรอบที่ i ไม่เท่ากับ skip — เทียบกับตัวอย่างในบทนี้",
      ],
      acceptance: [
        checkLocally,
        "main ใน starter ได้ [4, 9] / [2, 9] / [4, 2] / [4, 2, 9] / [] / []",
        "ลองเก็บผลไว้ในตัวแปร เปลี่ยนช่อง 0 ของผล แล้วพิมพ์ source อีกครั้ง ต้องยังเป็น [4, 2, 9]",
      ],
      solutionNotes: [
        "ต้องมีสองตำแหน่ง เพราะหลังข้ามช่องตำแหน่งอ่านกับตำแหน่งเขียนไม่ตรงกัน",
        "skip ที่อยู่นอกช่วงอยู่นอกสัญญาของแบบฝึกนี้ (เช่น skip = 3 กับ {4, 2, 9} จะเกิด ArrayIndexOutOfBoundsException) หลังเรียน java-exceptions-basic ลองเพิ่มการตรวจ skip แล้ว throw IllegalArgumentException เอง",
      ],
      reflection: [
        "อธิบายด้วยผลทดลองของคุณว่าทำไม int[] copy = values; จึงไม่ใช่การคัดลอก และโค้ดของคุณพิสูจน์ได้อย่างไรว่าต้นฉบับไม่เปลี่ยน",
      ],
    },
  },
];
