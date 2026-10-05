import type { TopicSource } from "@/types/curriculum";

const OPEN = "ประเมินบริบทใหม่ — เปิด documentation ได้ แต่ไม่เปิด rubric หรือเฉลยก่อนส่ง";
const SUBMIT = "แนบโค้ด คำสั่ง ค่าที่ทำนาย และ output หรือ error จริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง";
const prompt = (...lines: string[]) => [OPEN, ...lines, SUBMIT].join("\n");

export const javaCheckpoints: Record<string, NonNullable<TopicSource["checkpoint"]>> = {
  "java-jdk": {
    prompt: prompt(
      "รับไฟล์ PackStart.java ที่มี public class PackStart และพิมพ์ Ready เขียนขั้นตอนตรวจว่า JDK พร้อม แล้ว compile และ run แยกกัน",
      "ถ้า compile ผ่านแต่ run แล้วหา class ไม่พบ จะเก็บหลักฐานอะไร และตั้งสมมติฐานอย่างไร?",
    ),
    rubric: [
      "ตรวจทั้ง java และ javac ว่าเป็นเวอร์ชัน 21",
      "javac ไฟล์ .java แล้ว java ตามชื่อ class โดยไม่ใส่นามสกุล (หรือใช้ java PackStart.java ที่บทนี้สอน)",
      "แยก PATH, working directory, ไฟล์ .class และขั้น compile / run ออกจากกัน ไม่แก้ source โดยเดา",
    ],
    modelAnswer: `java --version
javac --version
javac -encoding UTF-8 PackStart.java
java PackStart

รันทีละคำสั่ง ไม่รวมเป็นบรรทัดเดียว ผลที่ควรเห็นคือ Ready
ถ้า compile ผ่านแต่ run หา class ไม่พบ ให้ตรวจว่ามีไฟล์ PackStart.class ในโฟลเดอร์ปัจจุบันหรือไม่ และพิมพ์ชื่อ class ตรงตัวพิมพ์เล็กใหญ่ (ไม่ใส่ .class)
ถ้าคำสั่ง java หรือ javac ไม่พบ ให้ตรวจ PATH: PowerShell ใช้ Get-Command java ส่วน Bash ใช้ command -v java`,
  },
  "java-main": {
    prompt: prompt(
      "จากไฟล์ว่างสร้าง Main.java ที่แสดง Start / Packing / Done ทีละบรรทัด เขียนว่าคำสั่งไหนทำงานก่อน และทำไม public class ต้องตรงกับชื่อไฟล์",
      "ทดลองลบเครื่องหมาย ; ออกหนึ่งตัว บันทึก error แล้วใส่กลับ",
    ),
    rubric: [
      "output สามบรรทัดตามลำดับ",
      "โครง class และ main ถูกต้อง ชื่อ class ตรงกับชื่อไฟล์",
      "เก็บ compile error จากการทดลอง และยืนยันว่ารันได้หลังแก้",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        System.out.println("Start");
        System.out.println("Packing");
        System.out.println("Done");
    }
}

compile ด้วย javac Main.java แล้วรันด้วย java Main คำสั่งแรกใน main คือ Start ก่อน แล้วไล่ลงไปตามลำดับ
ถ้าลบ ; ออก javac จะแจ้ง compile error และยังไม่เริ่มโปรแกรม เมื่อใส่กลับก็ compile และรันผ่าน`,
  },
  "java-output": {
    prompt: prompt(
      "สร้างใบราคา Headphone ราคา 199.5 ใช้สองคอลัมน์: ชื่อกว้าง 12 ชิดซ้าย และราคากว้าง 8 ชิดขวา ทศนิยม 2 ตำแหน่ง ปิดด้วยบรรทัด End",
      "อธิบายความต่างของ print กับ println และทดลองใช้ %d กับค่า double ที่ไม่ตรงชนิด",
    ),
    rubric: [
      "แถว Headphone พร้อม 199.50 และช่องว่างตาม format",
      "End อยู่บรรทัดใหม่",
      "ชนิดไม่ตรงเป็น runtime format error และแก้ specifier ให้ตรงชนิด",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        System.out.printf("%-12s%8.2f%n", "Headphone", 199.5);
        System.out.println("End");
    }
}

ผลที่ได้คือแถว "Headphone     199.50" แล้ว End ในบรรทัดถัดไป
%n ขึ้นบรรทัดใหม่ printf ไม่ขึ้นบรรทัดให้เองจนกว่าจะใส่ %n
ถ้าใช้ %d กับ 199.5 จะเกิด IllegalFormatConversionException เพราะ %d ใช้กับจำนวนเต็ม ให้เปลี่ยนเป็น %f หรือ %.2f`,
  },
  "java-expressions": {
    prompt: prompt(
      "ห้องซ้อมดนตรีมี 4 ช่องเวลาต่อรอบ ลูกค้าได้หมายเลขคิวเริ่มที่ 0 แสดงว่าคิวหมายเลข queue อยู่รอบที่เท่าไร (รอบแรกเป็นรอบที่ 1) และช่องที่เท่าไร (ช่องเริ่มที่ 0) โดยไม่พิมพ์คำตอบเอง",
      "ทดลอง queue เป็น 0, 3, 4 และ 9 อธิบายว่า / กับ % ทำหน้าที่ต่างกันอย่างไร และทำนายผลของ 7 / 2 * 2.0 ก่อนรัน",
    ),
    rubric: [
      "ได้ round 1 slot 0, round 1 slot 3, round 2 slot 0 และ round 3 slot 1 ตามลำดับสำหรับ queue 0, 3, 4, 9",
      "ใช้ตัวแปร queue และคำนวณด้วย / กับ % ไม่เขียนผลลัพธ์ตรง ๆ",
      "7 / 2 * 2.0 ได้ 6.0 เพราะ 7 / 2 เป็นการหารจำนวนเต็มได้ 3 ก่อนแล้วจึงคูณ",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        int queue = 9;
        int round = queue / 4 + 1;
        int slot = queue % 4;
        System.out.println("round " + round + " slot " + slot);
        System.out.println(7 / 2 * 2.0);
    }
}

queue = 9 ได้ round 3 slot 1 และบรรทัดสุดท้ายได้ 6.0
ค่าอื่นที่ทดลองได้ผลตามลำดับ: queue 0 → round 1 slot 0, queue 3 → round 1 slot 3, queue 4 → round 2 slot 0
/ กับจำนวนเต็มได้ผลหารที่ตัดเศษ (จำนวนรอบเต็ม) ส่วน % ได้เศษที่เหลือ (ตำแหน่งในรอบ)
7 / 2 คำนวณเป็น int ได้ 3 ก่อน แล้วค่อยคูณ 2.0 จึงได้ 6.0 ไม่ใช่ 7.0`,
  },
  "java-variables": {
    prompt: prompt(
      "เครดิตเริ่มต้น 600 ซื้อครั้งแรก 120 และครั้งที่สอง 80 แสดงค่าเครดิตหลังซื้อแต่ละครั้ง",
      "ราคาสินค้าสองรายการนี้ต้องกันไม่ให้โปรแกรมเปลี่ยนโดยไม่ตั้งใจ ให้เลือกวิธีประกาศที่เหมาะสมเอง และอธิบายการเปลี่ยนค่าด้วย assignment พร้อมผลทดลอง",
    ),
    rubric: [
      "ผล 480 และ 400",
      "ราคาที่ไม่ควรเปลี่ยนใช้ final และอธิบายได้ ส่วน credit ต้องเปลี่ยนค่าได้",
      "การเปลี่ยนค่าตรวจได้จากการรันจริง",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        final int FIRST_COST = 120;
        final int SECOND_COST = 80;
        int credit = 600;

        credit -= FIRST_COST;
        System.out.println(credit);
        credit -= SECOND_COST;
        System.out.println(credit);
    }
}

ผลที่ได้คือ 480 แล้ว 400
= คือ assignment เอาค่าทางขวาไปเก็บในตัวแปรทางซ้าย credit -= FIRST_COST จึงแปลว่า credit = credit - FIRST_COST ส่วน == ใช้เทียบค่า ไม่ใช่การเก็บค่า
ราคาประกาศเป็น final และตั้งชื่อ UPPER_SNAKE_CASE ถ้าลองเขียน FIRST_COST = 100; จะเกิด compile error เพราะ final เปลี่ยนค่าซ้ำไม่ได้ ส่วน credit ไม่ใช่ final เพราะต้องเปลี่ยนค่าหลังซื้อแต่ละครั้ง`,
  },
  "java-primitives": {
    prompt: prompt(
      "ระบบเก็บไฟล์มีไฟล์สองไฟล์ ไฟล์ละ 1,200,000,000 ไบต์ ต้องแสดงขนาดรวมเป็นไบต์ ทำนายก่อนรันว่าการบวกด้วย int ได้ค่าอะไร แล้วแก้ให้ถูกต้อง",
      "ทดลอง long stillWrong = a + b; ด้วย แล้วอธิบายว่าทำไมการเปลี่ยนแค่ตัวรับผลเป็น long ไม่ช่วย จากนั้นแสดง 0.1 + 0.2 และเก็บ 10 สตางค์กับ 20 สตางค์เป็นจำนวนเต็มแทน",
    ),
    rubric: [
      "a + b ได้ -1894967296 เพราะ int overflow และค่าที่ถูกคือ 2400000000",
      "long stillWrong = a + b ยังผิด เพราะการบวกเป็น int ก่อนแล้วจึงเก็บลง long ต้องให้ operand ตัวหนึ่งเป็น long ก่อนคำนวณ (เช่น 1L * a + b)",
      "0.1 + 0.2 ได้ 0.30000000000000004 และสตางค์เป็นจำนวนเต็มรวมได้ 30 พอดี",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        int a = 1_200_000_000;
        int b = 1_200_000_000;

        System.out.println(a + b);
        long stillWrong = a + b;
        System.out.println(stillWrong);
        long total = 1L * a + b;
        System.out.println(total);

        System.out.println(0.1 + 0.2);
        int satang = 10 + 20;
        System.out.println(satang);
    }
}

ผลที่ได้: -1894967296 / -1894967296 / 2400000000 / 0.30000000000000004 / 30
a + b เป็นการบวก int กับ int จึง overflow ก่อน แม้ผลจะถูกเก็บลงตัวแปร long ก็ได้ค่าที่ผิดมาแล้ว ต้องทำให้ตัวหนึ่งเป็น long ก่อนบวก (1L * a)
double เก็บ 0.1 และ 0.2 ได้แค่ใกล้เคียง ผลรวมจึงมีเศษต่อท้าย เงินจึงเก็บเป็นสตางค์ (จำนวนเต็ม) แล้วหาร 100.0 ตอนแสดงผลเท่านั้น`,
  },
  "java-string": {
    prompt: prompt(
      "รหัส \"  Room A  \" ต้องได้ \"room a\" แต่ค่าเดิมต้องคงเดิม แสดงค่าเดิมและค่าที่ทำความสะอาดแล้ว เทียบเนื้อหากับ \"ROOM A\" โดยไม่สนตัวพิมพ์เล็กใหญ่",
      "ทดลอง substring จากตำแหน่ง 0 ถึง 4 และค้นคำที่ไม่มีในรหัส",
    ),
    rubric: [
      "ค่าที่ทำความสะอาดแล้วคือ room a และค่าเดิมยังมีช่องว่างหัวท้าย",
      "equalsIgnoreCase ได้ true ไม่ใช้ == เทียบเนื้อหา",
      "substring ได้ room และ indexOf เมื่อไม่พบได้ -1",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        String raw = "  Room A  ";
        String code = raw.strip().toLowerCase();

        System.out.println("[" + raw + "] [" + code + "]");
        System.out.println(code.equalsIgnoreCase("ROOM A"));
        System.out.println(code.substring(0, 4));
        System.out.println(code.indexOf("desk"));
    }
}

ผลที่ได้: [  Room A  ] [room a] / true / room / -1
strip และ toLowerCase คืน String ใหม่ ตัวแปร raw จึงไม่เปลี่ยน
equalsIgnoreCase เทียบเนื้อหาโดยไม่สนตัวพิมพ์ ส่วน == เทียบว่าเป็นอ็อบเจกต์เดียวกันหรือไม่ จึงไม่ควรใช้เทียบข้อความ`,
  },
  "java-casting": {
    prompt: prompt(
      "คะแนนรวม 7 จาก 2 รายการ ต้องแสดงค่าเฉลี่ย 3.5 ไม่ใช่ 3.0 เลือกวิธีแปลงเอง",
      "ทำนาย (int) 2.9 กับ (int) -2.9 ก่อนรัน และบอกว่าข้อความ \"12x\" ถ้าแปลงด้วย Integer.parseInt จะเกิดอะไร",
    ),
    rubric: [
      "ให้การหารเป็น double ก่อนตัดเศษ ได้ 3.5",
      "(int) 2.9 ได้ 2 และ (int) -2.9 ได้ -2 เพราะตัดเศษเข้าหาศูนย์",
      "\"12x\" เกิด NumberFormatException ไม่ใช่ 12",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        int sum = 7;
        int count = 2;
        double average = (double) sum / count;

        System.out.println(average);
        System.out.println((int) 2.9);
        System.out.println((int) -2.9);
    }
}

ผลที่ได้: 3.5 / 2 / -2
(double) sum แปลงตัวตั้งเป็น double ก่อนหาร จึงได้ 3.5 ถ้าเขียน (double) (sum / count) จะช้าเกินไป เพราะ int หารกันได้ 3 ไปแล้วจึงได้ 3.0
Integer.parseInt("12x") ไม่คืน 12 แต่เกิด NumberFormatException เพราะทั้งข้อความต้องเป็นตัวเลข`,
  },
  "java-scanner": {
    prompt: prompt(
      "อ่านชื่อห้อง เวลาเริ่ม และเวลาจบ (เป็นนาทีนับจากเที่ยงคืน) คนละบรรทัด เช่น Room A / 540 / 675 แล้วแสดง Room A: 2 h 15 min",
      "ทดลองชื่อห้องที่มีช่องว่างหัวท้าย และ input ที่ไม่ครบ เก็บ error ที่เห็น อธิบายว่าทำไมจึงไม่ใช้ nextInt แล้วตามด้วย nextLine โดยไม่จัดการตัวขึ้นบรรทัด",
    ),
    rubric: [
      "ผลตรงตามรูปแบบ และตัดช่องว่างหัวท้ายของชื่อห้อง",
      "อ่านทุกบรรทัดด้วยวิธีที่อธิบายได้ (เช่น nextLine แล้ว parse เอง)",
      "input ไม่ครบระบุ NoSuchElementException หรือ feedback ที่ออกแบบไว้ ไม่อ้างว่ารองรับถ้าไม่ได้รองรับ",
    ],
    modelAnswer: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String room = input.nextLine().strip();
        int start = Integer.parseInt(input.nextLine().strip());
        int end = Integer.parseInt(input.nextLine().strip());
        int minutes = end - start;
        System.out.println(room + ": " + minutes / 60 + " h " + minutes % 60 + " min");
    }
}

บันทึก input สามบรรทัดไว้ในไฟล์ input.txt แล้วรัน
PowerShell: Get-Content input.txt | java Main
Bash: java Main < input.txt
ผลที่ได้คือ Room A: 2 h 15 min และชื่อที่มีช่องว่างหัวท้ายก็ได้ผลเดิมเพราะใช้ strip
ถ้า input ไม่ครบ nextLine จะหาบรรทัดไม่ได้และเกิด NoSuchElementException
ไม่ใช้ nextInt แล้วตามด้วย nextLine เพราะ nextInt ทิ้งตัวขึ้นบรรทัดไว้ nextLine ถัดไปจึงอ่านได้บรรทัดว่าง`,
  },
  "java-branch": {
    prompt: prompt(
      "คิดค่าจอดรถจากจำนวนชั่วโมง hours: ติดลบแสดง invalid, น้อยกว่า 1 ชั่วโมงฟรี (0), 1 ถึง 2 ชั่วโมง 20 บาท, 3 ถึง 5 ชั่วโมง 50 บาท, 6 ชั่วโมงขึ้นไป 100 บาท (เพดานรายวัน)",
      "ทดลอง hours เป็น -1, 0, 2, 3, 5 และ 6 เลือกวิธีเขียนเอง และอธิบายกิ่งที่เลือก",
    ),
    rubric: [
      "ผล invalid, 0, 20, 50, 50, 100 ตามลำดับ",
      "ค่าขอบ 2 กับ 3 และ 5 กับ 6 ถูกต้อง",
      "ข้อมูลที่ผิด (ติดลบ) ไม่ถูกคิดค่าจอด",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        int hours = 6;
        if (hours < 0) {
            System.out.println("invalid");
        } else if (hours < 1) {
            System.out.println(0);
        } else if (hours < 3) {
            System.out.println(20);
        } else if (hours < 6) {
            System.out.println(50);
        } else {
            System.out.println(100);
        }
    }
}

เปลี่ยน hours ทีละค่า ผลที่ได้: -1 → invalid, 0 → 0, 2 → 20, 3 → 50, 5 → 50, 6 → 100
if / else if ตรวจจากบนลงล่างและเลือกกิ่งแรกที่เป็นจริง จึงตรวจค่าติดลบก่อน แล้วไล่ขอบเขตจากน้อยไปมาก`,
  },
  "java-loops": {
    prompt: prompt(
      "งานชิ้นที่ 1 ใช้เวลา 2 นาที ชิ้นที่ 2 ใช้ 4 ชิ้นที่ 3 ใช้ 6 เพิ่มชิ้นละ 2 นาที แต่รวมเวลาได้ไม่เกิน 10 นาที ให้หยุดก่อนชิ้นที่ทำให้เวลาเกิน",
      "อ่านจำนวนงานผ่านตัวแปร jobs แสดงจำนวนชิ้นที่ทำได้กับเวลารวมในรูป ชิ้น:เวลา เช่น 2:6 ทดลอง 0 ชิ้น 1 ชิ้น และ 4 ชิ้น เลือกวิธีเอง",
    ),
    rubric: [
      "ผล 0:0, 1:2 และ 2:6 ตามลำดับสำหรับ jobs 0, 1, 4",
      "ไม่นับชิ้นที่ทำให้เวลาเกิน ก่อนหยุด",
      "อธิบายตัวสะสม ตัวนับ และเงื่อนไขหยุด",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        int jobs = 4;
        int done = 0;
        int total = 0;
        for (int job = 1; job <= jobs; job++) {
            int cost = job * 2;
            if (total + cost > 10) {
                break;
            }
            total += cost;
            done++;
        }
        System.out.println(done + ":" + total);
    }
}

jobs = 4 ได้ 2:6 (ชิ้นที่ 3 ใช้ 6 รวมเป็น 12 เกิน 10 จึงหยุดก่อนนับ) jobs = 1 ได้ 1:2 และ jobs = 0 ได้ 0:0
total เป็นตัวสะสมเวลา done เป็นตัวนับชิ้น และ break หยุดเมื่อชิ้นถัดไปทำให้เกินงบ
ถ้าบวก total ก่อนตรวจ จะนับชิ้นที่เกินเข้าไปด้วย`,
  },
  "java-switch": {
    prompt: prompt(
      "รับชื่อโหมดผ่านตัวแปร ไม่สนตัวพิมพ์เล็กใหญ่และช่องว่างหัวท้าย: quiet แสดง Q, normal แสดง N, loud แสดง L, อื่น ๆ แสดง unknown: ตามด้วยค่าที่ตัดช่องว่างแล้ว",
      "ทดลอง \" QUIET \", \"normal\", \"Loud\" และ \"Fast\" ใช้ switch และอธิบายหน้าที่ของ default",
    ),
    rubric: [
      "ได้ Q, N, L และ unknown:Fast ตามลำดับ",
      "ไม่เกิด fallthrough และไม่ทำชื่อใน unknown หาย",
      "อธิบายว่า switch เลือกตามค่า และ default ทำงานเมื่อไม่ตรงทุก case",
    ],
    modelAnswer: `public class Main {
    public static void main(String[] args) {
        String raw = "Fast";
        String mode = raw.strip();
        String result = switch (mode.toLowerCase()) {
            case "quiet" -> "Q";
            case "normal" -> "N";
            case "loud" -> "L";
            default -> "unknown:" + mode;
        };
        System.out.println(result);
    }
}

" QUIET " ได้ Q, "normal" ได้ N, "Loud" ได้ L และ "Fast" ได้ unknown:Fast
switch แบบ -> คืนค่าของ expression และไม่ไหลต่อไปยัง case ถัดไป
default ทำงานเมื่อไม่ตรงทุก case เก็บค่า mode ที่ตัดช่องว่างแล้วไว้ใช้ในข้อความ unknown`,
  },
  "java-methods": {
    prompt: prompt(
      "ตั๋วราคาเริ่มต้น 80 บาท มีส่วนลดเป็นบาทส่งผ่าน parameter แต่ยอดสุดท้ายต้องไม่ติดลบ สร้าง method (เลือกชื่อเอง) ที่รับราคาและส่วนลดแล้วคืนยอดสุทธิ และ method อีกตัวที่คืนข้อความ Ticket: ยอด",
      "ทดสอบส่วนลด 0, 20 และ 100 กับราคา 80 อธิบาย return และเหตุที่การรับ parameter ไม่เปลี่ยนตัวแปรของผู้เรียก",
    ),
    rubric: [
      "ได้ Ticket: 80, Ticket: 60 และ Ticket: 0 ตามข้อความที่กำหนด",
      "method ทั้งสองทำงานประกอบกันได้",
      "อธิบายได้ว่า parameter รับสำเนาของค่า การเปลี่ยนค่าใน method ไม่เปลี่ยนตัวแปรใน main",
    ],
    modelAnswer: `public class Main {
    static int discounted(int price, int discount) {
        int result = price - discount;
        if (result < 0) {
            return 0;
        }
        return result;
    }

    static String label(int price, int discount) {
        return "Ticket: " + discounted(price, discount);
    }

    public static void main(String[] args) {
        int price = 80;
        System.out.println(label(price, 0));
        System.out.println(label(price, 20));
        System.out.println(label(price, 100));
        System.out.println(price);
    }
}

ผลที่ได้: Ticket: 80 / Ticket: 60 / Ticket: 0 และบรรทัดสุดท้ายยังเป็น 80
return ส่งค่ากลับให้ผู้เรียกนำไปใช้ต่อ (label นำค่าจาก discounted ไปต่อข้อความ)
parameter price ใน method รับสำเนาของค่า 80 จึงไม่แก้ตัวแปร price ใน main`,
  },
  "java-arrays": {
    prompt: prompt(
      "สถานีอ่านรหัสซ้ำ ๆ ได้ [1, 1, 2, 2, 2, 3, 1] ให้เขียน method ที่คืน array ใหม่โดยตัดค่าที่ซ้ำกับค่าก่อนหน้าที่อยู่ติดกันออก เหลือ [1, 2, 3, 1] ลำดับเดิม ต้นฉบับไม่เปลี่ยน",
      "ทดสอบกับ [], [5], [4, 4, 4] และ [1, 2, 1] เลือกวิธีเอง",
    ),
    rubric: [
      "ผล [1, 2, 3, 1], [], [5], [4], [1, 2, 1]",
      "ไม่เปลี่ยนต้นฉบับ และผลเป็น array ใหม่",
      "อธิบายการกำหนดขนาดผลลัพธ์และ index ที่ใช้อ่านกับเขียน (หรือวิธีอื่นที่ถูกต้อง)",
    ],
    modelAnswer: `import java.util.Arrays;

public class Main {
    static int[] compress(int[] values) {
        int count = 0;
        for (int i = 0; i < values.length; i++) {
            if (i == 0 || values[i] != values[i - 1]) {
                count++;
            }
        }
        int[] result = new int[count];
        int next = 0;
        for (int i = 0; i < values.length; i++) {
            if (i == 0 || values[i] != values[i - 1]) {
                result[next] = values[i];
                next++;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] readings = {1, 1, 2, 2, 2, 3, 1};
        int[] empty = {};
        int[] single = {5};
        int[] same = {4, 4, 4};
        int[] pattern = {1, 2, 1};
        System.out.println(Arrays.toString(compress(readings)));
        System.out.println(Arrays.toString(compress(empty)));
        System.out.println(Arrays.toString(compress(single)));
        System.out.println(Arrays.toString(compress(same)));
        System.out.println(Arrays.toString(compress(pattern)));
        System.out.println(Arrays.toString(readings));
    }
}

ผลที่ได้: [1, 2, 3, 1] / [] / [5] / [4] / [1, 2, 1] และต้นฉบับยังเป็น [1, 1, 2, 2, 2, 3, 1]
รอบแรกนับว่าต้องเก็บกี่ค่าเพื่อกำหนดขนาดของ result รอบสองอ่านด้วย i และเขียนลง result ด้วย next ที่เดินเฉพาะตอนเก็บค่า
ค่าที่ซ้ำแต่ไม่ติดกัน (1 ตัวสุดท้าย) ต้องถูกเก็บไว้ จึงเทียบกับค่าก่อนหน้าเท่านั้น`,
  },
  "java-arraylist": {
    prompt: prompt(
      "รายการรหัสอุปกรณ์ [2, 5, 2, 9] ให้ลบรหัส 2 เฉพาะตัวแรก แล้วเพิ่ม 7 ที่ท้าย ได้ [5, 2, 9, 7] โดยรายการต้นฉบับไม่เปลี่ยน",
      "ทดลองรายการที่ไม่มีรหัส 2 และรายการว่าง เลือกวิธีเอง และอธิบายความต่างของ remove ตามตำแหน่งกับ remove ตามค่า",
    ),
    rubric: [
      "ผลตรง และไม่ลบสมาชิกที่ index 2 โดยผิดความหมาย",
      "ต้นฉบับคงเดิม กรณีไม่มี 2 เพิ่ม 7 อย่างเดียว",
      "remove(Integer.valueOf(2)) ต่างจาก remove(2)",
    ],
    modelAnswer: `import java.util.ArrayList;

public class Main {
    static ArrayList<Integer> update(ArrayList<Integer> original) {
        ArrayList<Integer> next = new ArrayList<>(original);
        next.remove(Integer.valueOf(2));
        next.add(7);
        return next;
    }

    public static void main(String[] args) {
        ArrayList<Integer> codes = new ArrayList<>();
        codes.add(2);
        codes.add(5);
        codes.add(2);
        codes.add(9);
        ArrayList<Integer> noTwo = new ArrayList<>();
        noTwo.add(5);
        noTwo.add(9);
        ArrayList<Integer> empty = new ArrayList<>();

        System.out.println(update(codes));
        System.out.println(codes);
        System.out.println(update(noTwo));
        System.out.println(update(empty));
    }
}

ผลที่ได้: [5, 2, 9, 7] / [2, 5, 2, 9] (ต้นฉบับไม่เปลี่ยน) / [5, 9, 7] / [7]
remove(2) รับ int จึงลบสมาชิกที่ตำแหน่ง (index) 2 ส่วน remove(Integer.valueOf(2)) เลือกแบบลบตามค่า จึงลบเลข 2 ตัวแรก`,
  },
  "java-exceptions-basic": {
    prompt: prompt(
      "อ่านจำนวนกล่องทีละบรรทัดจนหมด input รับจำนวนเต็ม 1 ถึง 5 ถ้ารูปแบบเสียแสดง bad format ถ้านอกช่วงแสดง out of range และโปรแกรมต้องกลับไปอ่านบรรทัดถัดไปได้",
      "ทดลอง input abc, 0, 5, 6 และบรรทัดว่าง อธิบายว่าจับ exception อะไร และไม่ซ่อน error อะไร",
    ),
    rubric: [
      "แยก format เสียกับช่วงผิดออกจากกัน",
      "ข้อมูลถูกหลังข้อมูลผิดยังถูกประมวลผล",
      "catch เฉพาะปัญหาจาก input และเก็บหลักฐานจริง",
    ],
    modelAnswer: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        while (input.hasNextLine()) {
            String raw = input.nextLine().strip();
            try {
                int count = Integer.parseInt(raw);
                if (count < 1 || count > 5) {
                    System.out.println("out of range");
                } else {
                    System.out.println(count);
                }
            } catch (NumberFormatException error) {
                System.out.println("bad format");
            }
        }
    }
}

input abc, 0, 5, 6 และบรรทัดว่าง ได้ bad format / out of range / 5 / out of range / bad format ตามลำดับ
ช่วงที่ผิดเป็นเงื่อนไขที่ตรวจด้วย if ส่วน format ที่เสียเกิดจาก parseInt จึงจับด้วย NumberFormatException
ไม่ catch Exception กว้าง ๆ เพราะจะกลบบั๊กอื่นที่ไม่เกี่ยวกับ input`,
  },
  "java-multi-file": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: แยกapp.Mainกับapp.Priceคนละไฟล์ Priceมีstatic methodคืนราคาหลังเพิ่มค่าห่อ5 ให้Mainเรียกด้วย20แสดง25 ส่งโครงโฟลเดอร์ คำสั่งcompile/runและทดลองclasspathผิดก่อนแก้\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "package/pathตรงและผล25",
      "คำสั่งjavac -d outกับjava -cp out app.Mainครบ",
      "errorclasspathต่างจากsourcecompileerror"
    ],
    "modelAnswer": "src/app/Price.java: package app;public class Price{public static int wrapped(int amount){return amount+5;}}\nsrc/app/Main.java: package app;public class Main{public static void main(String[] args){System.out.println(Price.wrapped(20));}}\nPowerShellและBash: javac -encoding UTF-8 -d out src/app/Price.java src/app/Main.java แล้ว java -cp out app.Main; -cp wrongหาclassไม่พบ"
  },
  "java-project-library-0": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: ประเมินท้ายคอร์สบริบทใหม่: CLIอุปกรณ์รองรับ add ชื่อ, list, take หมายเลข, return หมายเลข, quit อ่านจนEOFหรือquit หมายเลขเริ่ม1ไม่ซ้ำ รายการใหม่available, takeเปลี่ยนเป็นborrowedเฉพาะที่available, returnกลับavailableเฉพาะที่borrowed; ข้อมูลว่าง/หมายเลขเสีย/ไม่มีรายการ/สถานะไม่ตรงให้ข้อความerrorและรับคำสั่งถัดไปต่อได้ เลือกarrayหรือArrayListและmethodเอง ไม่มีข้อบังคับclassOOP/file/database ใช้documentationได้ กำหนดรูปoutputให้ชัดแล้วส่งtestsปกติ/ขอบ/ผิดพร้อมdebugหนึ่งเรื่อง\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "add/list/take/returnทำตามสถานะและหมายเลข",
      "errorไม่เปลี่ยนข้อมูลและคำสั่งต่อยังทำได้",
      "EOFและquitหยุดโดยไม่ประมวลผลข้อความต่อ",
      "โค้ดแยกหน้าที่หรือวิธีอื่นอธิบายได้ พร้อมหลักฐานทดลอง",
      "rubricเทียบด้วยตนเอง ไม่อ้างว่าเว็บไซต์รันJavaให้"
    ],
    "modelAnswer": "ตัวอย่างหนึ่งที่ตรงพฤติกรรม ไม่บังคับใช้สถาปัตยกรรมนี้ บันทึก EquipmentMain.java; PowerShell/Bash: javac -encoding UTF-8 EquipmentMain.java แล้ว java EquipmentMain; ใช้inputไฟล์ PowerShell Get-Content input.txt | java EquipmentMain หรือ Bash java EquipmentMain < input.txt\n\nimport java.util.ArrayList;\nimport java.util.Scanner;\n\n// Model answer for the manual course assessment; JDK 21, no external dependencies.\npublic class EquipmentMain {\n    static String change(ArrayList<String> names, ArrayList<Boolean> borrowed,\n                         String argument, boolean take) {\n        final int id;\n        try {\n            id = Integer.parseInt(argument);\n        } catch (NumberFormatException error) {\n            return \"error: invalid id\";\n        }\n        if (id < 1 || id > names.size()) return \"error: missing id\";\n        int index = id - 1;\n        if (take && borrowed.get(index)) return \"error: already borrowed\";\n        if (!take && !borrowed.get(index)) return \"error: already available\";\n        borrowed.set(index, take);\n        return (take ? \"taken #\" : \"returned #\") + id;\n    }\n\n    public static void main(String[] args) {\n        ArrayList<String> names = new ArrayList<>();\n        ArrayList<Boolean> borrowed = new ArrayList<>();\n        Scanner input = new Scanner(System.in);\n        while (input.hasNextLine()) {\n            String line = input.nextLine().strip();\n            if (line.isEmpty()) {\n                System.out.println(\"error: empty command\");\n                continue;\n            }\n            int space = line.indexOf(' ');\n            String command = space < 0 ? line : line.substring(0, space);\n            String argument = space < 0 ? \"\" : line.substring(space + 1).strip();\n            if (command.equals(\"quit\")) {\n                if (!argument.isEmpty()) {\n                    System.out.println(\"error: unexpected argument\");\n                    continue;\n                }\n                System.out.println(\"bye\");\n                break;\n            }\n            switch (command) {\n                case \"add\" -> {\n                    if (argument.isEmpty()) {\n                        System.out.println(\"error: empty name\");\n                    } else {\n                        names.add(argument);\n                        borrowed.add(false);\n                        System.out.println(\"added #\" + names.size());\n                    }\n                }\n                case \"list\" -> {\n                    if (!argument.isEmpty()) {\n                        System.out.println(\"error: unexpected argument\");\n                    } else if (names.isEmpty()) {\n                        System.out.println(\"empty\");\n                    } else {\n                        for (int i = 0; i < names.size(); i++) {\n                            System.out.println((i + 1) + \" \" + names.get(i) + \" \"\n                                + (borrowed.get(i) ? \"borrowed\" : \"available\"));\n                        }\n                    }\n                }\n                case \"take\" -> System.out.println(change(names, borrowed, argument, true));\n                case \"return\" -> System.out.println(change(names, borrowed, argument, false));\n                default -> System.out.println(\"error: unknown command\");\n            }\n        }\n    }\n}\n\n\nกรณีปกติ add Lamp/add Cable/take 1/return 1/list/quit ได้added #1/added #2/taken #1/returned #1/1 Lamp available/2 Cable available/bye คนละบรรทัด; takeซ้ำerroralreadyborrowed,returnซ้ำerroralreadyavailable,idxxinvalid,idนอกช่วงmissing ไม่มีสถานะเปลี่ยน; EOFหยุดเอง ข้อความหลังquitไม่ประมวลผล เลือกoutputคำอื่นได้หากกำหนดก่อนและbehaviorตรง"
  }
};
