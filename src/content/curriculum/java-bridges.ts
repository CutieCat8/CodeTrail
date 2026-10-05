import type { TopicSource } from "@/types/curriculum";

export const javaBridgeTopics: TopicSource[] = [
  {
    "id": "java-declarations",
    "courseId": "java-foundations",
    "unit": "สะพานพื้นฐาน Java",
    "language": "java",
    "standard": "v3",
    "title": "ประกาศชื่อพร้อมชนิดก่อนคำนวณ",
    "prerequisites": [
      "java-main"
    ],
    "objective": "แยกชนิด ชื่อ ค่าเริ่ม และอ่านชื่อในprintlnได้โดยไม่ต้องใช้operatorsหลายตัว",
    "why": "Javaต้องรู้ชนิดของชื่อก่อนใช้ การอ่าน int copies = 3; ออกช่วยอ่านใบเสร็จและนิพจน์ในบทถัดไป",
    "explanation": "int copies = 3; อ่านว่า ประกาศตัวแปรชนิดintชื่อcopiesเริ่มที่3 intเก็บจำนวนเต็ม Stringเก็บข้อความ doubleเก็บทศนิยม booleanเก็บtrue/false; = ผูกค่าทางขวากับชื่อ ไม่ใช่การเทียบ การประกาศจบด้วย ;",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int copies = 3;\n        String shelf = \"A\";\n        System.out.println(copies);\n        System.out.println(shelf);\n        System.out.println(\"copies\");\n    }\n}",
    "expectedOutput": "3\nA\ncopies",
    "tracePrompt": "วงชนิด ชื่อ และค่าเริ่มของสองตัวแปร ทำนายสามบรรทัด ทำไมบรรทัดแรกและท้ายต่างกัน?",
    "traceAnswer": "copiesเป็นintชื่อเก็บ3 · shelfเป็นStringเก็บA · printlnชื่ออ่านค่าได้3และA · printlnข้อความcopiesแสดงตัวอักษร ไม่ย้อนอ่านค่าของชื่อ",
    "practicePrompt": "เติมค่าเริ่มให้ roomsเป็นจำนวนเต็ม4 และ buildingเป็นข้อความNorth แสดงค่าทั้งคู่และคำroomsตามลำดับ\nบันทึกเป็น Main.java ใน workspace ของตนเอง ทั้ง PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main เว็บไซต์นี้ไม่ compile Java ให้",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        int rooms = 0;\n        String building = \"\";\n        System.out.println(rooms);\n        System.out.println(building);\n        System.out.println(\"rooms\");\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int rooms = 4;\n        String building = \"North\";\n        System.out.println(rooms);\n        System.out.println(building);\n        System.out.println(\"rooms\");\n    }\n}",
    "solutionCheck": {
      "output": "4\nNorth\nrooms"
    },
    "buggy": "public class Main {\n    public static void main(String[] args) {\n        int count;\n        System.out.println(count);\n    }\n}",
    "bugCheck": {
      "kind": "compile",
      "message": "variable count might not have been initialized"
    },
    "bugExplanation": "คาดตัวเลข แต่ javacแจ้งvariable count might not have been initialized ตัวแปรlocalไม่ได้เริ่ม0เอง เติมค่าเริ่มเช่น int count=0; แล้วcompile/runใหม่",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด คำสั่ง ผลทดลอง และเหตุผลหลังทำ ไม่เปิด feedback ก่อนส่ง: ข้อมูลพัสดุ: trackingเป็นข้อความB07, boxesจำนวนเต็ม2, insuredเป็นbooleantrue แสดงค่าทีละบรรทัด แล้วเปลี่ยนboxesเป็น0 อธิบายว่าบรรทัดไหนเปลี่ยนพร้อมคำสั่งรัน",
      "rubric": [
        "เลือกชนิดตรงข้อมูล",
        "ผลB07/2/trueและเมื่อเปลี่ยนB07/0/true",
        "แยกข้อความกับชื่อและทดลองจริง"
      ],
      "modelAnswer": "public class Main {\n    public static void main(String[] args) {\n        String tracking=\"B07\";\n        int boxes=2;\n        boolean insured=true;\n        System.out.println(tracking);\n        System.out.println(boxes);\n        System.out.println(insured);\n    }\n}\nผลตามrubric ชนิดผูกกับชื่อและอ่านค่าเมื่อprintln"
    },
    "lesson": {
      "hook": "Javaต้องรู้ชนิดของชื่อก่อนใช้ การอ่าน int copies = 3; ออกช่วยอ่านใบเสร็จและนิพจน์ในบทถัดไป",
      "explain": [
        {
          "heading": "ชนิด ชื่อ ค่า",
          "text": [
            "int copies = 3; อ่านว่า ประกาศตัวแปรชนิดintชื่อcopiesเริ่มที่3 intเก็บจำนวนเต็ม Stringเก็บข้อความ doubleเก็บทศนิยม booleanเก็บtrue/false; = ผูกค่าทางขวากับชื่อ ไม่ใช่การเทียบ การประกาศจบด้วย ;",
            "เลือกชื่อที่สื่อข้อมูล ชื่อแยกตัวพิมพ์ใหญ่เล็ก และต้องประกาศก่อนใช้ ยังไม่ต้องรู้ทุกชนิดหรือfinalในบทนี้"
          ]
        },
        {
          "heading": "อ่านค่าต่างจากข้อความ",
          "text": [
            "System.out.println(copies) อ่านค่าจากชื่อ ส่วน System.out.println(\"copies\") แสดงคำ copies; ชื่อไม่มีเครื่องหมายคำพูด ข้อความมี double quote; Stringใช้ S ใหญ่",
            "ถ้า int count; ยังไม่มีค่าแล้วอ่าน count compilerจะไม่ยอม ต้องกำหนดก่อนอ่าน ไม่เดาว่าเริ่ม0ให้ตัวแปรlocal"
          ]
        }
      ],
      "walkthrough": [
        "copiesเป็นintชื่อเก็บ3",
        "shelfเป็นStringเก็บA",
        "printlnชื่ออ่านค่าได้3และA",
        "printlnข้อความcopiesแสดงตัวอักษร ไม่ย้อนอ่านค่าของชื่อ"
      ],
      "pitfalls": [
        "คาดตัวเลข แต่ javacแจ้งvariable count might not have been initialized ตัวแปรlocalไม่ได้เริ่ม0เอง เติมค่าเริ่มเช่น int count=0; แล้วcompile/runใหม่"
      ],
      "checks": [
        {
          "question": "String shelf กับ string shelf ต่างกันหรือไม่?",
          "answer": "ต่าง Javaใช้StringตัวSใหญ่ stringไม่ใช่ชนิดนี้"
        },
        {
          "question": "ตัวแปรlocalยังไม่กำหนดแล้วอ่านได้0ไหม?",
          "answer": "ไม่ได้ compileerror ต้องกำหนดก่อนอ่าน"
        }
      ],
      "recap": [
        "แยกชนิด ชื่อ ค่าเริ่ม และอ่านชื่อในprintlnได้โดยไม่ต้องใช้operatorsหลายตัว"
      ],
      "traceHint": "เขียนค่าและชนิดก่อน/หลังแต่ละคำสั่ง แล้วรันเทียบค่าที่ทำนาย",
      "practiceHints": [
        "intต้องได้จำนวนเต็ม ส่วนStringต้องมีเครื่องหมายคำพูด",
        "เติม4แทน0 และNorthในคำพูดแทนข้อความว่าง",
        "int rooms=4; String building=\"North\";"
      ],
      "acceptance": [
        "ตรวจในเครื่องด้วย JDK21: javac -encoding UTF-8 Main.java แล้ว java Main; เทียบผลจริงกับค่าที่คาด บันทึกคำสั่งและoutput การติ๊กหรือส่งข้อความไม่ได้ยืนยันความถูกต้อง",
        "output4/North/roomsคนละบรรทัด",
        "เปลี่ยนroomsเป็น2แล้วบรรทัดแรกเปลี่ยน โดยคำroomsยังเหมือนเดิม"
      ],
      "solutionNotes": [
        "ใช้ชื่อให้พิมพ์ตามข้อมูล ไม่พิมพ์4ซ้ำแทนอ่านrooms",
        "ค่อยเรียนการเปลี่ยนค่าและfinalในjava-variables"
      ],
      "reflection": [
        "วิธีที่เลือกช่วยให้อ่านหรือแก้บั๊กอย่างไร? แสดงกรณีทดลองที่สนับสนุน ไม่ตอบเพียงว่าผ่าน"
      ]
    }
  },
  {
    "id": "java-for-basics",
    "courseId": "java-foundations",
    "unit": "สะพานพื้นฐาน Java",
    "language": "java",
    "standard": "v3",
    "title": "for: ไล่ตัวนับและจำนวนรอบ",
    "prerequisites": [
      "java-branch"
    ],
    "objective": "เขียนforหนึ่งลูปและไล่เริ่ม ตรวจ ทำ เพิ่ม รวมกรณีศูนย์รอบ",
    "why": "ก่อนสะสมค่าปรับต้องรู้ว่าทำกี่รอบและขอบรวมตัวสุดท้ายไหม",
    "explanation": "for(int i=1; i<=3; i=i+1){...} ช่องแรกตั้งค่าiครั้งเดียว ช่องกลางตรวจทุกครั้งก่อนทำ ถ้าเท็จออก ช่องท้ายเพิ่มค่าหลังทำ แล้วกลับไปตรวจ ; คั่นสามช่อง ส่วน { } ครอบคำสั่งในรอบ",
    "example": "public class Main {\n    public static void main(String[] args) {\n        for(int i=1;i<=3;i=i+1){\n            System.out.println(i);\n        }\n        System.out.println(\"done\");\n    }\n}",
    "expectedOutput": "1\n2\n3\ndone",
    "tracePrompt": "เขียนค่าตอนตรวจทุกครั้งรวมครั้งที่หยุด เปลี่ยนเริ่มเป็น4ได้อะไร?",
    "traceAnswer": "i1จริงพิมพ์1เพิ่ม2 · i2จริงพิมพ์2เพิ่ม3 · i3จริงพิมพ์3เพิ่ม4 · i4เท็จออกพิมพ์done; เริ่ม4ได้doneอย่างเดียว",
    "practicePrompt": "เติมช่องเงื่อนไขให้พิมพ์หมายเลข2ถึง4รวม4 ใช้ค่าตั้งต้นstartและend แล้วเปลี่ยนstartเป็น5ตรวจศูนย์รอบ\nบันทึกเป็น Main.java ใน workspace ของตนเอง ทั้ง PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main เว็บไซต์นี้ไม่ compile Java ให้",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        int start=2;\n        int end=4;\n        for(int i=start;i<end;i=i+1){\n            System.out.println(i);\n        }\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int start=2;\n        int end=4;\n        for(int i=start;i<=end;i=i+1){\n            System.out.println(i);\n        }\n    }\n}",
    "solutionCheck": {
      "output": "2\n3\n4"
    },
    "buggy": "public class Main {\n    public static void main(String[] args) {\n        for(int i=1;i<3;i=i+1){\n            System.out.println(i);\n        }\n    }\n}",
    "bugCheck": {
      "kind": "logic",
      "output": "1\n2"
    },
    "bugExplanation": "คาด1,2,3แต่actual1,2 เพราะ < ไม่รวม3 เปลี่ยน<=แล้วตรวจปลาย1ได้1บรรทัด",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด คำสั่ง ผลทดลอง และเหตุผลหลังทำ ไม่เปิด feedback ก่อนส่ง: นับถอยหลังจากตัวแปรsecondsถึง1แล้วพิมพ์Go ทดลองseconds3,1,0 เลือกวิธีเองและอธิบายการหยุด",
      "rubric": [
        "ผล3/2/1/Go;1/Go;Go",
        "เปลี่ยนข้อมูลได้ไม่พิมพ์ตัวเลขคงที่",
        "อธิบายการเปลี่ยนค่าให้หยุด"
      ],
      "modelAnswer": "public class Main {\n    public static void main(String[] args) {\n        int seconds=3;\n        for(int left=seconds;left>=1;left=left-1){System.out.println(left);}\n        System.out.println(\"Go\");\n    }\n}"
    },
    "lesson": {
      "hook": "ก่อนสะสมค่าปรับต้องรู้ว่าทำกี่รอบและขอบรวมตัวสุดท้ายไหม",
      "explain": [
        {
          "heading": "สามช่องของfor",
          "text": [
            "for(int i=1; i<=3; i=i+1){...} ช่องแรกตั้งค่าiครั้งเดียว ช่องกลางตรวจทุกครั้งก่อนทำ ถ้าเท็จออก ช่องท้ายเพิ่มค่าหลังทำ แล้วกลับไปตรวจ ; คั่นสามช่อง ส่วน { } ครอบคำสั่งในรอบ",
            "i++ เป็นรูปย่อเพิ่ม1 แต่เริ่มเขียนi=i+1เพื่อเห็นค่า ไม่มีการกลับไปประกาศiใหม่ทุกครั้ง"
          ]
        },
        {
          "heading": "ขอบและหยุด",
          "text": [
            "เริ่ม1และ<=3ทำ1,2,3;ถ้า<3ทำ1,2; ถ้าเริ่ม4ไม่มีรอบ เพราะตรวจก่อนทำ ต้องมีขั้นเปลี่ยนค่าให้หยุดได้ ถ้าค้างในterminalใช้Ctrl+C"
          ]
        }
      ],
      "walkthrough": [
        "i1จริงพิมพ์1เพิ่ม2",
        "i2จริงพิมพ์2เพิ่ม3",
        "i3จริงพิมพ์3เพิ่ม4",
        "i4เท็จออกพิมพ์done; เริ่ม4ได้doneอย่างเดียว"
      ],
      "pitfalls": [
        "คาด1,2,3แต่actual1,2 เพราะ < ไม่รวม3 เปลี่ยน<=แล้วตรวจปลาย1ได้1บรรทัด"
      ],
      "checks": [
        {
          "question": "ตรวจเงื่อนไขหลังทำหรือก่อน?",
          "answer": "ก่อนจึงศูนย์รอบได้"
        },
        {
          "question": "i++เกิดช่วงไหนในforนี้?",
          "answer": "หลังคำสั่งในblockก่อนตรวจครั้งถัดไป"
        }
      ],
      "recap": [
        "เขียนforหนึ่งลูปและไล่เริ่ม ตรวจ ทำ เพิ่ม รวมกรณีศูนย์รอบ"
      ],
      "traceHint": "เขียนค่าและชนิดก่อน/หลังแต่ละคำสั่ง แล้วรันเทียบค่าที่ทำนาย",
      "practiceHints": [
        "ต้องรวมendด้วย",
        "เทียบi<=endก่อนรอบ",
        "for(int i=start;i<=end;i=i+1)"
      ],
      "acceptance": [
        "ตรวจในเครื่องด้วย JDK21: javac -encoding UTF-8 Main.java แล้ว java Main; เทียบผลจริงกับค่าที่คาด บันทึกคำสั่งและoutput การติ๊กหรือส่งข้อความไม่ได้ยืนยันความถูกต้อง",
        "2/3/4ตามลำดับ",
        "start5,end4ไม่มีoutput"
      ],
      "solutionNotes": [
        "ใช้ตัวแปรขอบ ไม่เขียนหมายเลขคงที่",
        "ชื่อcounterใดก็ได้ถ้าเพิ่มและเงื่อนไขตรงกัน"
      ],
      "reflection": [
        "วิธีที่เลือกช่วยให้อ่านหรือแก้บั๊กอย่างไร? แสดงกรณีทดลองที่สนับสนุน ไม่ตอบเพียงว่าผ่าน"
      ]
    }
  },
  {
    "id": "java-loop-sum",
    "courseId": "java-foundations",
    "unit": "สะพานพื้นฐาน Java",
    "language": "java",
    "standard": "v3",
    "title": "ผลสะสมแยกจากตัวนับ",
    "prerequisites": [
      "java-for-basics"
    ],
    "objective": "เลือกค่าเริ่มของยอดรวมและไล่ก่อน/หลังทุกรอบได้",
    "why": "การแสดงตัวเลขทีละรอบไม่ใช่การรวม ต้องมีตัวแปรจำยอดก่อนหน้า",
    "explanation": "accumulatorคือตัวแปรสะสมผล ประกาศ int total=0; ก่อนfor แล้ว total=total+day; ทุกรอบ ถ้าประกาศในforจะเริ่มใหม่ทุกรอบ ตัวนับdayบอกว่ารอบไหน totalบอกผลรวมหลายรอบ",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int total=0;\n        for(int day=1;day<=3;day=day+1){\n            total=total+day;\n            System.out.println(day+\":\"+total);\n        }\n        System.out.println(total);\n    }\n}",
    "expectedOutput": "1:1\n2:3\n3:6\n6",
    "tracePrompt": "ไล่totalก่อน/หลังในแต่ละday ถ้าตั้งtotal=0ในลูปผลแต่ละรอบเป็นอะไร?",
    "traceAnswer": "ก่อนลูปtotal0 · day1บวก1ได้1 · day2เอา1บวก2ได้3 · day3เอา3บวก3ได้6 · ถ้าเริ่ม0ทุกครั้งจะได้1,2,3ไม่ใช่ผลรวม",
    "practicePrompt": "เขียนจากstarterที่มีเพียงจำนวนวัน: แจกคูปองวันแรก2ใบเพิ่มวันละ2ใบ แสดงผลรวม3วัน จากนั้นตรวจ0และ1วัน\nบันทึกเป็น Main.java ใน workspace ของตนเอง ทั้ง PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main เว็บไซต์นี้ไม่ compile Java ให้",
    "starter": "public class Main {\n    public static void main(String[] args) {\n        int days=3;\n        // คำนวณและแสดงผลรวม\n    }\n}",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int days=3;\n        int coupons=0;\n        for(int day=1;day<=days;day=day+1){coupons=coupons+day*2;}\n        System.out.println(coupons);\n    }\n}",
    "solutionCheck": {
      "output": "12"
    },
    "buggy": "public class Main {\n    public static void main(String[] args) {\n        int total=0;\n        for(int day=1;day<=3;day=day+1){\n            total=day;\n        }\n        System.out.println(total);\n    }\n}",
    "bugCheck": {
      "kind": "logic",
      "output": "3"
    },
    "bugExplanation": "คาด6แต่ได้3เพราะassignแทนค่าเดิมด้วยdayไม่ได้บวกtotalก่อนหน้า แก้total=total+dayแล้วตรวจ0วันยังได้0",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด คำสั่ง ผลทดลอง และเหตุผลหลังทำ ไม่เปิด feedback ก่อนส่ง: สะสมระยะเดิน วันแรก1กิโลเมตร เพิ่มวันละ1 แสดงระยะรวมเมื่อจำนวนวันผ่านตัวแปร ทดสอบ0,1,4วัน เลือกวิธีเองและอธิบาย",
      "rubric": [
        "ได้0,1,10",
        "อธิบายวิธีและขอบได้",
        "ไม่ใช้ตัวเลขคำตอบคงที่"
      ],
      "modelAnswer": "public class Main {\n    public static void main(String[] args) {\n        int days=4;int km=0;for(int day=1;day<=days;day++){km+=day;}System.out.println(km);\n    }\n}"
    },
    "lesson": {
      "hook": "การแสดงตัวเลขทีละรอบไม่ใช่การรวม ต้องมีตัวแปรจำยอดก่อนหน้า",
      "explain": [
        {
          "heading": "ตัวสะสมก่อนลูป",
          "text": [
            "accumulatorคือตัวแปรสะสมผล ประกาศ int total=0; ก่อนfor แล้ว total=total+day; ทุกรอบ ถ้าประกาศในforจะเริ่มใหม่ทุกรอบ ตัวนับdayบอกว่ารอบไหน totalบอกผลรวมหลายรอบ"
          ]
        },
        {
          "heading": "เพิ่มกฎทีละส่วน",
          "text": [
            "เริ่มรวม1ถึงnให้ได้ก่อน แล้วฝึกยอดที่เพิ่มวันละ2ด้วยday*2 บทjava-loopsจะเพิ่มwhile/เพดาน/break/continueภายหลัง อย่าเปลี่ยนหลายกฎพร้อมกันก่อนรู้ยอดแต่ละรอบ"
          ]
        }
      ],
      "walkthrough": [
        "ก่อนลูปtotal0",
        "day1บวก1ได้1",
        "day2เอา1บวก2ได้3",
        "day3เอา3บวก3ได้6",
        "ถ้าเริ่ม0ทุกครั้งจะได้1,2,3ไม่ใช่ผลรวม"
      ],
      "pitfalls": [
        "คาด6แต่ได้3เพราะassignแทนค่าเดิมด้วยdayไม่ได้บวกtotalก่อนหน้า แก้total=total+dayแล้วตรวจ0วันยังได้0"
      ],
      "checks": [
        {
          "question": "ถ้าtotal=dayแทน+=dayเกิดอะไร?",
          "answer": "เหลือค่าdayล่าสุดไม่ใช่รวม"
        },
        {
          "question": "ผลรวมศูนย์รอบควรเป็นอะไร?",
          "answer": "0ค่าเริ่มที่ประกาศก่อนลูป"
        }
      ],
      "recap": [
        "เลือกค่าเริ่มของยอดรวมและไล่ก่อน/หลังทุกรอบได้"
      ],
      "traceHint": "เขียนค่าและชนิดก่อน/หลังแต่ละคำสั่ง แล้วรันเทียบค่าที่ทำนาย",
      "practiceHints": [
        "แต่ละวันเพิ่มday*2ไม่ใช่2เท่าของยอดรวม",
        "ประกาศcoupons0ก่อนforวน1ถึงdays",
        "int coupons=0;for(int day=1;day<=days;day++){coupons+=day*2;}"
      ],
      "acceptance": [
        "ตรวจในเครื่องด้วย JDK21: javac -encoding UTF-8 Main.java แล้ว java Main; เทียบผลจริงกับค่าที่คาด บันทึกคำสั่งและoutput การติ๊กหรือส่งข้อความไม่ได้ยืนยันความถูกต้อง",
        "3วันได้12;0วันได้0;1วันได้2",
        "อธิบายยอดก่อน/หลังได้"
      ],
      "solutionNotes": [
        "แยกdaysที่คงที่กับdayตัวนับและcouponsยอดสะสม",
        "สูตรdays*(days+1)ใช้ได้ในการประเมิน แต่ฝึกนี้ให้ลองลูปก่อน"
      ],
      "reflection": [
        "วิธีที่เลือกช่วยให้อ่านหรือแก้บั๊กอย่างไร? แสดงกรณีทดลองที่สนับสนุน ไม่ตอบเพียงว่าผ่าน"
      ]
    }
  },
  {
    "id": "java-method-basics",
    "courseId": "java-foundations",
    "unit": "สะพานพื้นฐาน Java",
    "language": "java",
    "standard": "v3",
    "title": "method หนึ่งงาน: รับค่าและคืนค่า",
    "prerequisites": [
      "java-switch"
    ],
    "objective": "ประกาศstatic methodนอกmain รับparameterหนึ่งตัวและคืนค่าที่mainใช้ต่อได้",
    "why": "ก่อนแยกCLIหลายhelperต้องเห็นว่าการประกาศยังไม่เรียก และprintlnไม่ใช่return",
    "explanation": "static int doubleValue(int value){return value*2;} staticทำให้เรียกจากmainได้โดยไม่สร้างobject; intหน้าdoubleValueคือชนิดค่าที่คืน ชื่อและวงเล็บกำหนดการรับค่า int valueคือparameter { }ครอบคำสั่ง ใช้returnส่งintกลับแล้วจบ",
    "example": "public class Main {\n    static int doubleValue(int value){return value*2;}\n    public static void main(String[] args){\n        int result=doubleValue(3);\n        System.out.println(result+1);\n        System.out.println(doubleValue(0));\n    }\n}",
    "expectedOutput": "7\n0",
    "tracePrompt": "ระบุparameter,argument,result และทำไมบรรทัดแรกเป็น7ไม่ใช่6?",
    "traceAnswer": "ประกาศdoubleValueยังไม่ทำงาน · เรียกด้วย3ทำให้value3 return6เก็บในresult · printlnresult+1ได้7 · เรียก0คืน0",
    "practicePrompt": "เติมreturnให้static int addFee(int amount)คืนamount+5 แล้วmainแสดงaddFee(20)และaddFee(0)\nบันทึกเป็น Main.java ใน workspace ของตนเอง ทั้ง PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main เว็บไซต์นี้ไม่ compile Java ให้",
    "starter": "public class Main {\n    static int addFee(int amount){return 0;}\n    public static void main(String[] args){System.out.println(addFee(20));System.out.println(addFee(0));}\n}",
    "solution": "public class Main {\n    static int addFee(int amount){return amount+5;}\n    public static void main(String[] args){System.out.println(addFee(20));System.out.println(addFee(0));}\n}",
    "solutionCheck": {
      "output": "25\n5"
    },
    "buggy": "public class Main {\n    static int doubleValue(int value){System.out.println(value*2);}\n    public static void main(String[] args){System.out.println(doubleValue(3));}\n}",
    "bugCheck": {
      "kind": "compile",
      "message": "missing return statement"
    },
    "bugExplanation": "compileerror missing return statement เพราะmethodประกาศคืนintแต่printlnไม่ได้ส่งค่ากลับ เปลี่ยนเป็นreturn value*2 แล้วmainแสดง6",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด คำสั่ง ผลทดลอง และเหตุผลหลังทำ ไม่เปิด feedback ก่อนส่ง: ทำmethodคิดค่าซอง3บาทต่อชิ้น คืน0เมื่อจำนวนชิ้นไม่บวก ทดสอบ-1,0,4และนำผล4ชิ้นไปบวกค่าขนส่ง10บาท เลือกชื่อเอง",
      "rubric": [
        "คืน0,0,12และนำไปบวกได้22",
        "returnชนิดถูกทุกเส้นทาง",
        "อธิบายรับค่า/คืนค่าและแยกผู้แสดง"
      ],
      "modelAnswer": "public class Main {static int envelopes(int count){if(count<=0)return 0;return count*3;}public static void main(String[] args){System.out.println(envelopes(-1));System.out.println(envelopes(0));System.out.println(envelopes(4)+10);}}\nผล0/0/22"
    },
    "lesson": {
      "hook": "ก่อนแยกCLIหลายhelperต้องเห็นว่าการประกาศยังไม่เรียก และprintlnไม่ใช่return",
      "explain": [
        {
          "heading": "โครงของmethod",
          "text": [
            "static int doubleValue(int value){return value*2;} staticทำให้เรียกจากmainได้โดยไม่สร้างobject; intหน้าdoubleValueคือชนิดค่าที่คืน ชื่อและวงเล็บกำหนดการรับค่า int valueคือparameter { }ครอบคำสั่ง ใช้returnส่งintกลับแล้วจบ",
            "ประกาศmethodเป็นสมาชิกของclassอยู่นอกmain ถ้าวางmethodไว้ข้างในmainจะcompileไม่ได้"
          ]
        },
        {
          "heading": "เรียกและนำผลไปใช้",
          "text": [
            "doubleValue(3)เรียกโดยส่งargument3 ค่าที่returnไปแทนตรงจุดเรียก เช่น int answer=doubleValue(3); เก็บ6 ผู้เรียกเลือกแสดงหรือคำนวณต่อได้",
            "System.out.println(value*2)แค่แสดงผล ถ้าmethodประกาศคืนintต้องมีreturnบนทุกเส้นทาง; voidหมายถึงไม่คืนค่าจึงใช้เป็นค่าด้านขวาไม่ได้"
          ]
        }
      ],
      "walkthrough": [
        "ประกาศdoubleValueยังไม่ทำงาน",
        "เรียกด้วย3ทำให้value3 return6เก็บในresult",
        "printlnresult+1ได้7",
        "เรียก0คืน0"
      ],
      "pitfalls": [
        "compileerror missing return statement เพราะmethodประกาศคืนintแต่printlnไม่ได้ส่งค่ากลับ เปลี่ยนเป็นreturn value*2 แล้วmainแสดง6"
      ],
      "checks": [
        {
          "question": "ประกาศmethodแล้วมันทำงานทันทีไหม?",
          "answer": "ไม่ต้องเรียกก่อน"
        },
        {
          "question": "methodคืนintใช้printlnอย่างเดียวแทนreturnได้ไหม?",
          "answer": "ไม่ได้ compileerror"
        }
      ],
      "recap": [
        "ประกาศstatic methodนอกmain รับparameterหนึ่งตัวและคืนค่าที่mainใช้ต่อได้"
      ],
      "traceHint": "เขียนค่าและชนิดก่อน/หลังแต่ละคำสั่ง แล้วรันเทียบค่าที่ทำนาย",
      "practiceHints": [
        "ผู้เรียกต้องได้รับยอดรวมกลับมา",
        "returnนิพจน์amount+5",
        "static int addFee(int amount){return amount+5;}"
      ],
      "acceptance": [
        "ตรวจในเครื่องด้วย JDK21: javac -encoding UTF-8 Main.java แล้ว java Main; เทียบผลจริงกับค่าที่คาด บันทึกคำสั่งและoutput การติ๊กหรือส่งข้อความไม่ได้ยืนยันความถูกต้อง",
        "ผล25และ5",
        "เปลี่ยนinputแล้วผลเปลี่ยน ไม่printlnแทนreturn"
      ],
      "solutionNotes": [
        "ชนิดผลintตรงนิพจน์ที่คืน",
        "voidเหมาะกับงานแสดงเท่านั้นไม่เหมาะกับงานคำนวณนี้"
      ],
      "reflection": [
        "วิธีที่เลือกช่วยให้อ่านหรือแก้บั๊กอย่างไร? แสดงกรณีทดลองที่สนับสนุน ไม่ตอบเพียงว่าผ่าน"
      ]
    }
  },
  {
    "id": "java-array-basics",
    "courseId": "java-foundations",
    "unit": "สะพานพื้นฐาน Java",
    "language": "java",
    "standard": "v3",
    "title": "array เล็ก: index และ length",
    "prerequisites": [
      "java-methods"
    ],
    "objective": "สร้างarrayอ่านindexและวนรวมด้วยenhancedfor พร้อมตรวจขอบก่อนใช้",
    "why": "ก่อนค้นminimumและตัดข้อมูล ต้องเข้าใจตำแหน่งและรายการว่าง ไม่เริ่มจากหลายalgorithmพร้อมกัน",
    "explanation": "int[] values={4,7,2}; ชนิดint[]หมายถึงรายการจำนวนเต็ม { }ฝั่งขวาใส่สมาชิกคั่นด้วยcomma indexคือตำแหน่งเริ่ม0 values[0]อ่าน4 .lengthเป็นจำนวนสมาชิก3 ตำแหน่งสุดท้าย2 อ่านvalues[3]ผิดขอบและเกิดArrayIndexOutOfBoundsException",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int[] values={4,7,2};\n        System.out.println(values.length);\n        System.out.println(values[0]);\n        int total=0;\n        for(int value:values){total+=value;}\n        System.out.println(total);\n    }\n}",
    "expectedOutput": "3\n4\n13",
    "tracePrompt": "เขียนindexของ4,7,2 ไล่total ถ้าarrayว่างการรวมเป็นเท่าไร?",
    "traceAnswer": "index0คือ4 index1คือ7 index2คือ2 · total0→4→11→13 · รายการว่างไม่มีรอบtotalยัง0",
    "practicePrompt": "เขียนstatic int countPositive(int[] values)จากstarterชื่อmethodเท่านั้น คืนจำนวนค่าที่>0 ตรวจ[0,-1,4,2],[],[-2]\nบันทึกเป็น Main.java ใน workspace ของตนเอง ทั้ง PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main เว็บไซต์นี้ไม่ compile Java ให้",
    "starter": "public class Main {\n    static int countPositive(int[] values){return 0;}\n    public static void main(String[] args){System.out.println(countPositive(new int[]{0,-1,4,2}));System.out.println(countPositive(new int[0]));System.out.println(countPositive(new int[]{-2}));}\n}",
    "solution": "public class Main {\n    static int countPositive(int[] values){int count=0;for(int value:values){if(value>0)count++;}return count;}\n    public static void main(String[] args){System.out.println(countPositive(new int[]{0,-1,4,2}));System.out.println(countPositive(new int[0]));System.out.println(countPositive(new int[]{-2}));}\n}",
    "solutionCheck": {
      "output": "2\n0\n0"
    },
    "buggy": "public class Main {\n    public static void main(String[] args) {\n        int[] values={4,7,2};\n        System.out.println(values[values.length]);\n    }\n}",
    "bugCheck": {
      "kind": "runtime",
      "message": "ArrayIndexOutOfBoundsException"
    },
    "bugExplanation": "คาด2แต่runtimeerrorเพราะlength=3ไม่ใช่indexสุดท้าย ต้องvalues[values.length-1]เมื่อไม่ว่าง ก่อนอ่านต้องมีกฎกรณีว่าง",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด คำสั่ง ผลทดลอง และเหตุผลหลังทำ ไม่เปิด feedback ก่อนส่ง: รับคะแนน[18,25,25,31]นับค่าช่วง20ถึง30รวมขอบ แสดงจำนวน ตรวจ[],[20,30,19,31] เลือกวิธีเอง",
      "rubric": [
        "ผล2,0,2",
        "รวมขอบและไม่แก้array",
        "คำอธิบายอิงค่าจริง"
      ],
      "modelAnswer": "static int inRange(int[] readings){int count=0;for(int reading:readings){if(reading>=20 && reading<=30)count++;}return count;}\nเรียกจากmainสามรายการได้2/0/2"
    },
    "lesson": {
      "hook": "ก่อนค้นminimumและตัดข้อมูล ต้องเข้าใจตำแหน่งและรายการว่าง ไม่เริ่มจากหลายalgorithmพร้อมกัน",
      "explain": [
        {
          "heading": "สร้างรายการขนาดคงที่",
          "text": [
            "int[] values={4,7,2}; ชนิดint[]หมายถึงรายการจำนวนเต็ม { }ฝั่งขวาใส่สมาชิกคั่นด้วยcomma indexคือตำแหน่งเริ่ม0 values[0]อ่าน4 .lengthเป็นจำนวนสมาชิก3 ตำแหน่งสุดท้าย2 อ่านvalues[3]ผิดขอบและเกิดArrayIndexOutOfBoundsException",
            "new int[3]สร้างสามช่องที่เริ่ม0; ตัวแปรlocalint[]ยังไม่กำหนดใช้ไม่ได้เหมือนตัวแปรlocalอื่น .lengthไม่มีวงเล็บ ต่างจากString.length()"
          ]
        },
        {
          "heading": "วนค่าแต่ละช่อง",
          "text": [
            "for(int value : values){...} เรียกenhancedfor อ่านค่าทีละช่องตามลำดับ valueเป็นสำเนาของค่าแต่ละช่อง ไม่ใช่index รายการว่างวน0รอบ ถ้าจะแก้ช่องต้องใช้values[index]=ค่า",
            "Arrays.toString(values)เป็นmethodจากjava.util.Arrays ต้องimport java.util.Arrays; ด้านบนไฟล์ จะแสดงรายการให้อ่านได้ ต่างจากprintln(values)ที่แสดงรหัสobject"
          ]
        }
      ],
      "walkthrough": [
        "index0คือ4 index1คือ7 index2คือ2",
        "total0→4→11→13",
        "รายการว่างไม่มีรอบtotalยัง0"
      ],
      "pitfalls": [
        "คาด2แต่runtimeerrorเพราะlength=3ไม่ใช่indexสุดท้าย ต้องvalues[values.length-1]เมื่อไม่ว่าง ก่อนอ่านต้องมีกฎกรณีว่าง"
      ],
      "checks": [
        {
          "question": "length3indexสุดท้ายอะไร?",
          "answer": "2"
        },
        {
          "question": "enhancedforแก้value=9กระทบช่องจริงไหม?",
          "answer": "ไม่เป็นสำเนาค่า ต้องแก้ผ่านindex"
        }
      ],
      "recap": [
        "สร้างarrayอ่านindexและวนรวมด้วยenhancedfor พร้อมตรวจขอบก่อนใช้"
      ],
      "traceHint": "เขียนค่าและชนิดก่อน/หลังแต่ละคำสั่ง แล้วรันเทียบค่าที่ทำนาย",
      "practiceHints": [
        "จำนวนตัวที่ผ่านเป็นยอดสะสมไม่ใช่sumของค่า",
        "วนแต่ละvalueแล้วเพิ่มcountเฉพาะ>0",
        "int count=0;for(int value:values){if(value>0)count++;}return count;"
      ],
      "acceptance": [
        "ตรวจในเครื่องด้วย JDK21: javac -encoding UTF-8 Main.java แล้ว java Main; เทียบผลจริงกับค่าที่คาด บันทึกคำสั่งและoutput การติ๊กหรือส่งข้อความไม่ได้ยืนยันความถูกต้อง",
        "สามกรณีได้2/0/0",
        "ไม่รวม0และไม่แก้สมาชิกต้นฉบับ"
      ],
      "solutionNotes": [
        "enhancedforเหมาะกับการอ่านค่า",
        "new int[]{...}ใช้สร้างarrayที่ส่งเป็นargumentได้ทันที []ชนิดเดียวกับตัวแปร"
      ],
      "reflection": [
        "วิธีที่เลือกช่วยให้อ่านหรือแก้บั๊กอย่างไร? แสดงกรณีทดลองที่สนับสนุน ไม่ตอบเพียงว่าผ่าน"
      ]
    }
  },
  {
    "id": "java-array-minimum",
    "courseId": "java-foundations",
    "unit": "สะพานพื้นฐาน Java",
    "language": "java",
    "standard": "v3",
    "title": "ค้นตำแหน่งminimumก่อนตัดข้อมูล",
    "prerequisites": [
      "java-array-basics"
    ],
    "objective": "ไล่ตำแหน่งค่าน้อยสุด รวมค่าติดลบ ค่าซ้ำ และรายการว่างได้",
    "why": "withoutLowestต้องรู้ว่าจะตัดตำแหน่งใดก่อน การเริ่มminimumที่0ผิดเมื่อค่าทั้งหมดเป็นบวก",
    "explanation": "minimumหมายถึงค่าน้อยสุด แต่ถ้าต้องตัดสมาชิกต้องเก็บindexของค่านั้น เริ่มlowestIndex=0เมื่อมีข้อมูล แล้วเทียบvalues[i]กับvalues[lowestIndex]เมื่อเดินไปแต่ละตำแหน่ง เปลี่ยนindexเฉพาะเมื่อเจอค่าที่น้อยกว่า",
    "example": "public class Main {\n    public static void main(String[] args) {\n        int[] values={5,2,2,8};\n        int lowestIndex=0;\n        for(int i=1;i<values.length;i++){\n            if(values[i]<values[lowestIndex])lowestIndex=i;\n            System.out.println(i+\":\"+lowestIndex);\n        }\n        System.out.println(lowestIndex);\n    }\n}",
    "expectedOutput": "1:1\n2:1\n3:1\n1",
    "tracePrompt": "จดiและlowestIndexทุกครั้ง ทำไมเจอ2ครั้งที่สองแล้วindexไม่เปลี่ยน?",
    "traceAnswer": "เริ่มindex0ค่า5 · i1ค่า2น้อยกว่า5เปลี่ยนindex1 · i2ค่า2เท่ากับค่าที่index1ไม่เปลี่ยน · i3ค่า8ไม่น้อยกว่า2 indexยัง1",
    "practicePrompt": "เขียนstatic int minIndex(int[] values)คืนตำแหน่งค่าน้อยสุดตัวแรก หรือ-1เมื่อว่าง ตรวจ[5,2,2,8],[-2,-5],[],[9]\nบันทึกเป็น Main.java ใน workspace ของตนเอง ทั้ง PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main เว็บไซต์นี้ไม่ compile Java ให้",
    "starter": "public class Main {static int minIndex(int[] values){return 0;} public static void main(String[] args){System.out.println(minIndex(new int[]{5,2,2,8}));System.out.println(minIndex(new int[]{-2,-5}));System.out.println(minIndex(new int[0]));System.out.println(minIndex(new int[]{9}));}}",
    "solution": "public class Main {static int minIndex(int[] values){if(values.length==0)return -1;int lowestIndex=0;for(int i=1;i<values.length;i++){if(values[i]<values[lowestIndex])lowestIndex=i;}return lowestIndex;} public static void main(String[] args){System.out.println(minIndex(new int[]{5,2,2,8}));System.out.println(minIndex(new int[]{-2,-5}));System.out.println(minIndex(new int[0]));System.out.println(minIndex(new int[]{9}));}}",
    "solutionCheck": {
      "output": "1\n1\n-1\n0"
    },
    "buggy": "public class Main {\n    public static void main(String[] args) {\n        int[] values={5,2,8};\n        int lowest=0;\n        for(int value:values){if(value<lowest)lowest=value;}\n        System.out.println(lowest);\n    }\n}",
    "bugCheck": {
      "kind": "logic",
      "output": "0"
    },
    "bugExplanation": "คาด2แต่ได้0ที่ไม่มีในarray เพราะเริ่มlowest0แล้วข้อมูลทุกค่ามากกว่า0 จึงไม่เปลี่ยน เริ่มvalues[0]หลังตรวจไม่ว่าง และหากต้องคืนตำแหน่งให้เก็บindexแทนค่า",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด คำสั่ง ผลทดลอง และเหตุผลหลังทำ ไม่เปิด feedback ก่อนส่ง: หาตำแหน่งอุณหภูมิสูงสุดตัวสุดท้ายเมื่อค่าซ้ำ คืน-1เมื่อว่าง ตรวจ[-5,-2,-2],[],[3] เลือกวิธีเอง",
      "rubric": [
        "ได้2,-1,0",
        "เลือกตัวท้ายเมื่อค่าสูงสุดซ้ำ",
        "ค่าเริ่มจากข้อมูลจริงไม่ใช้0ตายตัว"
      ],
      "modelAnswer": "static int hottest(int[] values){if(values.length==0)return -1;int best=0;for(int i=1;i<values.length;i++){if(values[i]>=values[best])best=i;}return best;}"
    },
    "lesson": {
      "hook": "withoutLowestต้องรู้ว่าจะตัดตำแหน่งใดก่อน การเริ่มminimumที่0ผิดเมื่อค่าทั้งหมดเป็นบวก",
      "explain": [
        {
          "heading": "เลือกผู้สมัครจากข้อมูลจริง",
          "text": [
            "minimumหมายถึงค่าน้อยสุด แต่ถ้าต้องตัดสมาชิกต้องเก็บindexของค่านั้น เริ่มlowestIndex=0เมื่อมีข้อมูล แล้วเทียบvalues[i]กับvalues[lowestIndex]เมื่อเดินไปแต่ละตำแหน่ง เปลี่ยนindexเฉพาะเมื่อเจอค่าที่น้อยกว่า",
            "กฎค่าซ้ำในบทนี้เลือกตัวแรก ใช้<จึงไม่เปลี่ยนเมื่อเท่ากัน ถ้า<=จะเลือกตัวท้าย พฤติกรรมทั้งสองทำได้แต่ต้องตรงrequirements"
          ]
        },
        {
          "heading": "รายการว่างต้องตกลงก่อน",
          "text": [
            "ไม่มีตำแหน่ง0ในarrayว่าง จึงตรวจlength==0ก่อน คืน-1หมายถึงไม่มีตำแหน่ง ต้องไม่ใช้-1ไปอ่านarray กรณีหนึ่งตัวคืน0โดยไม่เข้าลูป"
          ]
        }
      ],
      "walkthrough": [
        "เริ่มindex0ค่า5",
        "i1ค่า2น้อยกว่า5เปลี่ยนindex1",
        "i2ค่า2เท่ากับค่าที่index1ไม่เปลี่ยน",
        "i3ค่า8ไม่น้อยกว่า2 indexยัง1"
      ],
      "pitfalls": [
        "คาด2แต่ได้0ที่ไม่มีในarray เพราะเริ่มlowest0แล้วข้อมูลทุกค่ามากกว่า0 จึงไม่เปลี่ยน เริ่มvalues[0]หลังตรวจไม่ว่าง และหากต้องคืนตำแหน่งให้เก็บindexแทนค่า"
      ],
      "checks": [
        {
          "question": "เริ่มminimum0ทำไมผิดกับ[5,2]?",
          "answer": "0ไม่ได้อยู่ในรายการและไม่มีค่าน้อยกว่า0"
        },
        {
          "question": "ใช้<=จะเปลี่ยนค่าซ้ำแบบใด?",
          "answer": "เปลี่ยนไปตำแหน่งท้ายที่เท่ากัน"
        }
      ],
      "recap": [
        "ไล่ตำแหน่งค่าน้อยสุด รวมค่าติดลบ ค่าซ้ำ และรายการว่างได้"
      ],
      "traceHint": "เขียนค่าและชนิดก่อน/หลังแต่ละคำสั่ง แล้วรันเทียบค่าที่ทำนาย",
      "practiceHints": [
        "ตรวจว่างก่อนอ่านตำแหน่ง0",
        "lowestIndexเริ่ม0 แล้วเทียบตั้งแต่i1 เปลี่ยนเมื่อ<เท่านั้น",
        "if(values.length==0)return -1;int lowestIndex=0;for(int i=1;i<values.length;i++){if(values[i]<values[lowestIndex])lowestIndex=i;}return lowestIndex;"
      ],
      "acceptance": [
        "ตรวจในเครื่องด้วย JDK21: javac -encoding UTF-8 Main.java แล้ว java Main; เทียบผลจริงกับค่าที่คาด บันทึกคำสั่งและoutput การติ๊กหรือส่งข้อความไม่ได้ยืนยันความถูกต้อง",
        "สี่กรณีได้1/1/-1/0",
        "ค่าซ้ำเลือกตำแหน่งแรก ไม่แก้array"
      ],
      "solutionNotes": [
        "เก็บindexเพราะขั้นตัดต้องรู้ตำแหน่ง",
        "-1เป็นสัญญากรณีว่าง ไม่ใช่ค่าที่ใช้เป็นindexได้"
      ],
      "reflection": [
        "วิธีที่เลือกช่วยให้อ่านหรือแก้บั๊กอย่างไร? แสดงกรณีทดลองที่สนับสนุน ไม่ตอบเพียงว่าผ่าน"
      ]
    }
  },
  {
    "id": "java-array-copy",
    "courseId": "java-foundations",
    "unit": "สะพานพื้นฐาน Java",
    "language": "java",
    "standard": "v3",
    "title": "คัดลอกโดยมีตำแหน่งอ่านและเขียน",
    "prerequisites": [
      "java-array-minimum"
    ],
    "objective": "สร้างarrayใหม่และคัดลอกทุกช่องยกเว้นindexที่กำหนดโดยไม่แก้ต้นฉบับ",
    "why": "หลังหาminimumยังต้องสร้างผลใหม่ ตำแหน่งอ่านและเขียนจะไม่เท่ากันหลังข้ามหนึ่งช่อง",
    "explanation": "int[] alias=values; ทำให้สองชื่ออ้างarrayเดียวกัน ไม่copyสมาชิก ถ้าต้องการผลอิสระสร้างnew int[n]แล้วคัดลอกค่าทุกช่อง สำหรับintแต่ละช่องเป็นค่าตัวเลข การแก้ผลใหม่ไม่เปลี่ยนต้นฉบับ",
    "example": "import java.util.Arrays;\npublic class Main {public static void main(String[] args){int[] original={4,2,9};int[] result=new int[2];int next=0;for(int i=0;i<original.length;i++){if(i!=1){result[next]=original[i];next++;}}System.out.println(Arrays.toString(result));System.out.println(Arrays.toString(original));}}",
    "expectedOutput": "[4, 9]\n[4, 2, 9]",
    "tracePrompt": "ทำตารางi,nextและค่าที่เขียน ทำไมnextไม่เพิ่มเมื่อi1?",
    "traceAnswer": "i0เขียนresult0ค่า4 nextจาก0เป็น1 · i1ข้ามไม่มีค่าที่เขียนnextยัง1 · i2เขียนresult1ค่า9 nextเป็น2 · ต้นฉบับยัง[4,2,9]",
    "practicePrompt": "เขียนcopyExcept(values,skip)รับskipถูกต้องสำหรับรายการไม่ว่าง คืนarrayใหม่ที่ข้ามหนึ่งตำแหน่ง และว่างคืนnew int[0] ตรวจข้ามกลาง ข้ามแรก ข้ามสุดท้าย หนึ่งตัว และว่าง; อย่าแก้ต้นฉบับ\nบันทึกเป็น Main.java ใน workspace ของตนเอง ทั้ง PowerShell และ Bash/WSL ใช้ javac -encoding UTF-8 Main.java แล้ว java Main เว็บไซต์นี้ไม่ compile Java ให้",
    "starter": "import java.util.Arrays;\npublic class Main {static int[] copyExcept(int[] values,int skip){return values;} public static void main(String[] args){int[] source={4,2,9};System.out.println(Arrays.toString(copyExcept(source,1)));System.out.println(Arrays.toString(source));System.out.println(Arrays.toString(copyExcept(new int[]{7},0)));System.out.println(Arrays.toString(copyExcept(new int[0],-1)));}}",
    "solution": "import java.util.Arrays;\npublic class Main {static int[] copyExcept(int[] values,int skip){if(values.length==0)return new int[0];int[] result=new int[values.length-1];int next=0;for(int i=0;i<values.length;i++){if(i!=skip){result[next]=values[i];next++;}}return result;} public static void main(String[] args){int[] source={4,2,9};System.out.println(Arrays.toString(copyExcept(source,1)));System.out.println(Arrays.toString(source));System.out.println(Arrays.toString(copyExcept(new int[]{7},0)));System.out.println(Arrays.toString(copyExcept(new int[0],-1)));}}",
    "solutionCheck": {
      "output": "[4, 9]\n[4, 2, 9]\n[]\n[]"
    },
    "buggy": "import java.util.Arrays;\npublic class Main {public static void main(String[] args){int[] original={4,2,9};int[] copy=original;copy[0]=8;System.out.println(Arrays.toString(original));}}",
    "bugCheck": {
      "kind": "logic",
      "output": "[8, 2, 9]"
    },
    "bugExplanation": "คาดoriginalยัง[4,2,9]แต่ได้[8,2,9] เพราะcopy=originalอ้างarrayเดียว ไม่คัดลอก สร้างarrayใหม่หรือArrays.copyOfแล้วทดลองแก้copy[0]อีกครั้ง",
    "vocabulary": [],
    "checkpoint": {
      "prompt": "ประเมินบริบทใหม่ — เปิด documentation ได้ เขียนจากไฟล์ว่าง ส่งโค้ด คำสั่ง ผลทดลอง และเหตุผลหลังทำ ไม่เปิด feedback ก่อนส่ง: รับรายการ[2,5,2,8] สร้างรายการใหม่ตัดค่าน้อยสุดตัวแรกออก ต้นฉบับต้องเหมือนเดิม ตรวจ[],[7]และค่าติดลบ เลือกmethod/วิธีเองไม่ต้องใช้ชื่อcopyExcept",
      "rubric": [
        "ผล[5,2,8],[],[]ตามกรณี",
        "ลบแค่ตัวแรกที่น้อยสุดและต้นฉบับไม่เปลี่ยน",
        "ตรวจค่าติดลบและอธิบายindexอ่าน/เขียนหรือวิธีอื่น"
      ],
      "modelAnswer": "static int[] removeMin(int[] values){if(values.length==0)return new int[0];int min=0;for(int i=1;i<values.length;i++){if(values[i]<values[min])min=i;}int[] result=new int[values.length-1];int next=0;for(int i=0;i<values.length;i++){if(i!=min)result[next++]=values[i];}return result;}\n[2,5,2,8]เลือกindex0ได้[5,2,8] [-1,-3,-3]เลือกindex1ได้[-1,-3] ใช้ArrayListหลังเรียนแล้วก็ถูกหากคืนพฤติกรรมตรง"
    },
    "lesson": {
      "hook": "หลังหาminimumยังต้องสร้างผลใหม่ ตำแหน่งอ่านและเขียนจะไม่เท่ากันหลังข้ามหนึ่งช่อง",
      "explain": [
        {
          "heading": "สร้างใหม่ต่างจากassignชื่อ",
          "text": [
            "int[] alias=values; ทำให้สองชื่ออ้างarrayเดียวกัน ไม่copyสมาชิก ถ้าต้องการผลอิสระสร้างnew int[n]แล้วคัดลอกค่าทุกช่อง สำหรับintแต่ละช่องเป็นค่าตัวเลข การแก้ผลใหม่ไม่เปลี่ยนต้นฉบับ",
            "Arrays.copyOf(values,values.length)เป็นทางลัดcopyเต็ม ต้องimport java.util.Arrays; ถ้าจะข้ามบางช่องยังต้องเลือกตำแหน่งเอง"
          ]
        },
        {
          "heading": "อ่านiเขียนnext",
          "text": [
            "กำหนดskipเป็นindexถูกต้องในarrayไม่ว่าง resultยาวlength-1 ตั้งnext=0ก่อนลูป วนiทุกช่อง ถ้าi!=skipทำresult[next]=values[i]; next++; เมื่อข้ามช่องไม่เพิ่มnext จึงไม่มีช่องว่างในผล",
            "ตัวอย่าง[4,2,9]skip1: i0→result0=4,next1; i1ข้าม,nextยัง1; i2→result1=9,next2 arrayว่างในบทนี้คืนarrayใหม่ว่างโดยไม่อ่านindex"
          ]
        }
      ],
      "walkthrough": [
        "i0เขียนresult0ค่า4 nextจาก0เป็น1",
        "i1ข้ามไม่มีค่าที่เขียนnextยัง1",
        "i2เขียนresult1ค่า9 nextเป็น2",
        "ต้นฉบับยัง[4,2,9]"
      ],
      "pitfalls": [
        "คาดoriginalยัง[4,2,9]แต่ได้[8,2,9] เพราะcopy=originalอ้างarrayเดียว ไม่คัดลอก สร้างarrayใหม่หรือArrays.copyOfแล้วทดลองแก้copy[0]อีกครั้ง"
      ],
      "checks": [
        {
          "question": "ข้ามช่องแล้วnextเพิ่มไหม?",
          "answer": "ไม่ เพราะยังไม่ได้เขียนผล"
        },
        {
          "question": "arrayหนึ่งตัวตัดตัวนั้นแล้วขนาดผล?",
          "answer": "0 ไม่อ่านตำแหน่ง0ของผล"
        }
      ],
      "recap": [
        "สร้างarrayใหม่และคัดลอกทุกช่องยกเว้นindexที่กำหนดโดยไม่แก้ต้นฉบับ"
      ],
      "traceHint": "เขียนค่าและชนิดก่อน/หลังแต่ละคำสั่ง แล้วรันเทียบค่าที่ทำนาย",
      "practiceHints": [
        "ผลยาวน้อยลงหนึ่งช่อง ต้องเป็นarrayใหม่",
        "แยกiตัวอ่านกับnextตัวเขียน nextเพิ่มเฉพาะเมื่อเขียน",
        "int[] result=new int[values.length-1];int next=0;for(int i=0;i<values.length;i++){if(i!=skip){result[next++]=values[i];}}return result; ตรวจว่างก่อน"
      ],
      "acceptance": [
        "ตรวจในเครื่องด้วย JDK21: javac -encoding UTF-8 Main.java แล้ว java Main; เทียบผลจริงกับค่าที่คาด บันทึกคำสั่งและoutput การติ๊กหรือส่งข้อความไม่ได้ยืนยันความถูกต้อง",
        "ผลตัวอย่างตามexpectedoutputและsourceเดิม",
        "ข้ามแรก[2,9],ข้ามท้าย[4,2],หนึ่งตัว[],ว่าง[]",
        "แก้สมาชิกผลที่ไม่ว่างแล้วsourceต้องคงเดิม ตรวจในเครื่องเอง"
      ],
      "solutionNotes": [
        "ใช้สองตำแหน่งเพราะข้ามช่องแล้วindexอ่านกับเขียนไม่ตรงกัน",
        "skipผิดช่วงอยู่นอกสัญญาของกิจกรรมนี้ ต้องเพิ่มกฎก่อนรองรับ"
      ],
      "reflection": [
        "วิธีที่เลือกช่วยให้อ่านหรือแก้บั๊กอย่างไร? แสดงกรณีทดลองที่สนับสนุน ไม่ตอบเพียงว่าผ่าน"
      ]
    }
  }
];
