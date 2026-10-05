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
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: เครดิต600 ซื้อครั้งแรก120 ครั้งสอง80 แสดงค่าหลังซื้อแต่ละครั้ง ราคาคงที่ในโปรแกรมนี้ เลือกfinal/ตัวแปรให้เหมาะและอธิบายการเปลี่ยนค่าด้วยassignmentพร้อมผลทดลอง\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ผล480/400",
      "ราคาคงที่อธิบายfinalได้ creditต้องเปลี่ยนหรือใช้ชื่อผลใหม่",
      "การเปลี่ยนค่าตรวจได้จากการรันจริง"
    ],
    "modelAnswer": "final int first=120;final int second=80;int credit=600;credit-=first;System.out.println(credit);credit-=second;System.out.println(credit); =assignส่วน==เทียบค่า ไม่ใช่การassign เปลี่ยนโครงเป็นconstไม่มีในJava; ใช้finalชื่อใหม่ทุกขั้นก็ได้"
  },
  "java-primitives": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: ยอดวิวเริ่ม3,000,000,000 เพิ่ม1 เก็บชนิดใด? ราคา10.10+20.20บาทต้องรวมแม่นยำเป็นสตางค์ แสดงยอดวิวและยอดราคา อธิบายว่าทำไมแค่เปลี่ยนตัวรับผลเป็นlongไม่ป้องกันintoverflowก่อนหน้า\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ยอดวิว3000000001",
      "เก็บ1010+2020เป็นจำนวนเต็มและแสดง30.30",
      "ให้operandเป็นlongก่อนคำนวณเมื่อช่วงintไม่พอ"
    ],
    "modelAnswer": "long views=3_000_000_000L;views++;System.out.println(views);long satang=1010+2020;System.out.printf(\"%.2f%n\",satang/100.0); long ms=30*24*60*60*1000 ยังoverflowฝั่งขวา ต้องเริ่ม30Lก่อนคูณ"
  },
  "java-string": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: รหัส \"  Room A  \" ต้องเป็น \"room a\" แต่ค่าเดิมยังคงเดิม แสดงค่าเดิมและค่าที่ทำสะอาด เทียบเนื้อหากับ \"ROOM A\" โดยไม่สนตัวพิมพ์ ทดลองsubstring0ถึง4และรหัสที่ไม่มีคำที่ค้น\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ค่าทำสะอาดroom a ค่าเดิมยังมีช่องว่าง",
      "equalsIgnoreCaseได้true ไม่ใช้==แทนเนื้อหา",
      "substringได้roomและindexOfเมื่อไม่พบได้-1"
    ],
    "modelAnswer": "String raw=\"  Room A  \";String code=raw.strip().toLowerCase();System.out.println(\"[\"+raw+\"] [\"+code+\"]\");System.out.println(code.equalsIgnoreCase(\"ROOM A\"));System.out.println(code.substring(0,4));System.out.println(code.indexOf(\"desk\")); ผลtrue/room/-1"
  },
  "java-casting": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: คะแนนรวม7จาก2รายการ ต้องแสดงเฉลี่ย3.5 ไม่ใช่3.0 เลือกวิธีแปลงเอง แล้วทำนาย (int)2.9 กับ (int)-2.9 ก่อนรัน; ข้อความ \"12x\" แปลงด้วยparseIntเกิดอะไร?\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ให้การหารเป็นdoubleก่อนตัดเศษ ได้3.5",
      "cast2.9เป็น2,-2.9เป็น-2 ตัดเข้าหาศูนย์",
      "12xเกิดNumberFormatExceptionไม่ใช่12"
    ],
    "modelAnswer": "int sum=7;int count=2;double average=(double)sum/count;System.out.println(average);System.out.println((int)2.9);System.out.println((int)-2.9); (double)(sum/count)ช้าเกินไปเพราะintหารไปแล้ว; Integer.parseInt(\"12x\")รันแล้วexception"
  },
  "java-scanner": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: อ่านชื่อสินค้า จำนวน และราคาต่อชิ้นคนละบรรทัด เช่น \"Lamp\",3,2.5 แล้วแสดง Lamp: 7.50 ทดลองชื่อมีช่องว่างหัวท้ายและinputไม่ครบ เก็บerror อธิบายว่าทำไมไม่ใช้nextIntแล้วnextLineโดยไม่จัดการnewline\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ผลตรงและstripชื่อ",
      "อ่านทุกบรรทัดด้วยวิธีที่อธิบายได้",
      "inputไม่ครบระบุNoSuchElementExceptionหรือfeedbackที่ออกแบบไว้ ไม่อ้างรองรับถ้าไม่รองรับ"
    ],
    "modelAnswer": "import java.util.Scanner; public class Main {public static void main(String[] args){Scanner input=new Scanner(System.in);String name=input.nextLine().strip();int count=Integer.parseInt(input.nextLine().strip());double price=Double.parseDouble(input.nextLine().strip());System.out.printf(\"%s: %.2f%n\",name,count*price);}} บันทึกสามบรรทัดinput.txt; PowerShellใช้Get-Content input.txt | java Main ส่วนBashใช้java Main < input.txt; inputไม่ครบnextLineหาไม่ได้"
  },
  "java-branch": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: ค่าผ่านทาง:อายุติดลบแสดงinvalid ต่ำกว่า12ฟรี อายุ12ถึง59ราคา40 ตั้งแต่60ราคา20 ทดลอง-1,0,11,12,59,60 เลือกวิธีเองและอธิบายกิ่งที่เลือก\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ผลinvalid,0,0,40,40,20",
      "ขอบ12และ60ถูกต้อง",
      "กิ่งผิดข้อมูลไม่ถูกคิดค่าบริการ"
    ],
    "modelAnswer": "int age=60;if(age<0){System.out.println(\"invalid\");}else if(age<12){System.out.println(0);}else if(age<60){System.out.println(40);}else{System.out.println(20);} ตรวจตามลำดับและเลือกกิ่งแรกที่จริง"
  },
  "java-loops": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: อ่านจำนวนงานผ่านตัวแปร: งานชิ้น1ใช้2นาที ชิ้น2ใช้4 ชิ้น3ใช้6 เพิ่มทีละ2นาที แต่รวมเวลาได้ไม่เกิน10 หยุดก่อนชิ้นที่ทำให้งบเกิน แสดงจำนวนชิ้นกับเวลารวม ทดลอง0ชิ้น,1ชิ้น,4ชิ้น เลือกวิธีเอง\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ผล0/0,1/2,2/6ตามกรณี",
      "ไม่เพิ่มชิ้นที่ทำให้เกินก่อนหยุด",
      "อธิบายตัวสะสม ตัวนับ และเงื่อนไขหยุด"
    ],
    "modelAnswer": "int jobs=4;int done=0;int total=0;for(int job=1;job<=jobs;job++){int cost=job*2;if(total+cost>10)break;total+=cost;done++;}System.out.println(done+\":\"+total); ถ้ารวมก่อนตรวจจะนับงานที่เกินด้วย"
  },
  "java-switch": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: รับชื่อโหมดผ่านตัวแปร ไม่สนตัวพิมพ์และช่องว่างหัวท้าย: quietแสดงQ, normalแสดงN, loudแสดงL,อื่นแสดงunknown:พร้อมค่าหลังstrip ทดลอง \" QUIET \",\"normal\",\"Loud\",\"Fast\" ใช้switchเพื่อฝึกและอธิบายdefault\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "Q,N,L,unknown:Fast",
      "ไม่เกิดfallthroughและไม่ทำชื่อunknownหาย",
      "อธิบายswitchเลือกตามค่ากับdefault"
    ],
    "modelAnswer": "String raw=\"Fast\".strip();String result=switch(raw.toLowerCase()){case \"quiet\"->\"Q\";case \"normal\"->\"N\";case \"loud\"->\"L\";default->\"unknown:\"+raw;};System.out.println(result); ->คืนค่าของexpressionโดยไม่ไหลไปcaseถัดไป"
  },
  "java-methods": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: ค่าตั๋วเริ่ม80 ส่วนลดเป็นบาทผ่านparameter แต่ยอดสุดท้ายต้องไม่ติดลบ สร้างmethodเลือกชื่อเองรับราคาและส่วนลด คืนยอด แล้วmethodอีกตัวจัดข้อความ Ticket: ยอด ทดสอบส่วนลด0,20,100กับราคา80 อธิบายreturnและpass-by-value\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ผล80,60,0และข้อความตรง",
      "ทั้งสองmethodประกอบกันได้",
      "อธิบายการassignparameterไม่เปลี่ยนตัวแปรcaller"
    ],
    "modelAnswer": "static int discounted(int price,int discount){return Math.max(0,price-discount);}static String label(int price,int discount){return \"Ticket: \"+discounted(price,discount);} mainเรียกlabel(80,0/20/100)ได้ตามrubric; parameterรับสำเนาค่าint ไม่แก้priceในmain"
  },
  "java-arrays": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: มีอุณหภูมิ[18,25,25,31] คืนarrayใหม่เฉพาะค่าระหว่าง20ถึง30รวมขอบ ลำดับเดิมและค่าซ้ำต้องอยู่ ต้นฉบับไม่เปลี่ยน ตรวจ[],[20,30,19,31] เลือกวิธีเอง\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ผล[25,25],[],[20,30]",
      "ไม่เปลี่ยนต้นฉบับและผลเป็นarrayใหม่",
      "อธิบายขนาดผลกับindexอ่าน/เขียนหรือวิธีอื่น"
    ],
    "modelAnswer": "static int[] range(int[] values){int count=0;for(int value:values){if(value>=20 && value<=30)count++;}int[] result=new int[count];int next=0;for(int value:values){if(value>=20 && value<=30)result[next++]=value;}return result;} ต้องแสดงArrays.toStringทั้งต้นฉบับและผลและทดลองแก้resultเมื่อไม่ว่างก่อนยืนยันต้นฉบับ"
  },
  "java-arraylist": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: รายการรหัสอุปกรณ์[2,5,2,9] ลบรหัส2เฉพาะครั้งแรก เพิ่ม7ท้าย ให้ได้[5,2,9,7] โดยต้นฉบับไม่เปลี่ยน ทดลองไม่มีรหัส2และรายการว่าง เลือกวิธีเองและอธิบายremoveตำแหน่งกับremoveค่า\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "ผลตรงและไม่ลบสมาชิกindex2โดยผิดความหมาย",
      "ต้นฉบับคงเดิม;ไม่มี2เพิ่ม7อย่างเดียว",
      "remove(Integer.valueOf(2))ต่างจากremove(2)"
    ],
    "modelAnswer": "ArrayList<Integer> next=new ArrayList<>(original);next.remove(Integer.valueOf(2));next.add(7);System.out.println(next); remove(2)รับintจึงลบindex2 ส่วนIntegervalueเลือกoverloadลบค่า; []ได้[7]"
  },
  "java-exceptions-basic": {
    "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ ไม่เปิดrubric/เฉลยก่อนส่ง: อ่านจำนวนกล่องจากข้อความ รับจำนวนเต็ม1ถึง5 ถ้ารูปแบบเสียแสดงbad format ถ้านอกช่วงแสดงout of range ให้โปรแกรมกลับอ่านคำสั่งต่อได้จนEOF ทดลองabc,0,5,6และบรรทัดว่าง อธิบายว่าจับอะไรและไม่ซ่อนerrorอะไร\nแนบโค้ด/คำสั่ง/ค่าทำนายและoutputหรือerrorจริง การส่งเป็นบันทึกความพยายาม ยังต้องเทียบเกณฑ์ด้วยตนเอง",
    "rubric": [
      "formatเสียและช่วงผิดแยกกัน",
      "ข้อมูลถูกหลังข้อมูลผิดยังประมวลผล",
      "catchเฉพาะปัญหาinputและเก็บหลักฐานจริง"
    ],
    "modelAnswer": "ในwhile(input.hasNextLine()): String raw=input.nextLine().strip();try{int count=Integer.parseInt(raw);if(count<1 || count>5){System.out.println(\"out of range\");}else{System.out.println(count);}}catch(NumberFormatException error){System.out.println(\"bad format\");} abcกับว่างbadformat,0/6นอกช่วง,5แสดง5 ไม่catchExceptionกว้างเพื่อกลบบั๊กอื่น"
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
