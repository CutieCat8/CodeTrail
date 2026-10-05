// Developer content checks, NOT the learner website's runner.
// JAVA_HOME=/path/to/jdk21 npx vite-node --config vitest.config.ts scripts/verify-java-repair.ts
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { topicSources } from "@/content/curriculum";

const javaHome = process.env.JAVA_HOME;
if (!javaHome) throw new Error("Set JAVA_HOME to JDK 21");
const javac = path.join(javaHome, "bin", "javac");
const java = path.join(javaHome, "bin", "java");
const version = execFileSync(javac, ["--version"], { encoding: "utf8" });
if (!version.startsWith("javac 21.")) throw new Error("These checks require JDK 21");

function run(source: string, className: string, stdin = "", check?: string) {
  const directory = mkdtempSync(path.join(tmpdir(), "sea-java-repair-"));
  try {
    writeFileSync(path.join(directory, `${className}.java`), source);
    const files = [path.join(directory, `${className}.java`)];
    if (check) { writeFileSync(path.join(directory, "Check.java"), check); files.push(path.join(directory, "Check.java")); }
    execFileSync(javac, ["-encoding", "UTF-8", "-d", directory, ...files], { stdio: "pipe", timeout: 20000 });
    return execFileSync(java, ["-Dstdout.encoding=UTF-8", "-cp", directory, check ? "Check" : className], { input: stdin, encoding: "utf8", stdio: "pipe", timeout: 20000 }).trimEnd();
  } finally { rmSync(directory, { recursive: true, force: true }); }
}
const harness = (body: string) => `import java.util.Arrays;
class Check {
  static void eq(int actual, int expected) { if(actual != expected) throw new AssertionError(actual+" != "+expected); }
  static void array(int[] actual, int[] expected) { if(!Arrays.equals(actual,expected)) throw new AssertionError(Arrays.toString(actual)); }
  public static void main(String[] args) { ${body} System.out.println("PASS"); }
}`;
const contracts = [
  { id: "java-array-basics", checks: "eq(Main.countPositive(new int[]{0,-1,4,2}),2); eq(Main.countPositive(new int[0]),0);", mutants: [(s: string) => s.replace("value>0", "value>=0")] },
  { id: "java-array-minimum", checks: "eq(Main.minIndex(new int[]{5,2,2,8}),1); eq(Main.minIndex(new int[]{-2,-5}),1); eq(Main.minIndex(new int[0]),-1); eq(Main.minIndex(new int[]{9}),0);", mutants: [(s: string) => s.replace("values[i]<values[lowestIndex]", "values[i]<=values[lowestIndex]")] },
  { id: "java-array-copy", checks: `int[] source={4,2,9};
    array(Main.copyExcept(source,0),new int[]{2,9}); array(Main.copyExcept(source,1),new int[]{4,9}); array(Main.copyExcept(source,2),new int[]{4,2});
    array(Main.copyExcept(new int[]{7},0),new int[0]); array(Main.copyExcept(new int[0],-1),new int[0]);
    int[] result=Main.copyExcept(source,1); result[0]=99; array(source,new int[]{4,2,9});`, mutants: [(s: string) => s.replace("result[next]=values[i]", "result[next]=values[next]")] },
  { id: "java-arrays", checks: `int[] source={2,5,2,8}; array(Main.withoutLowest(source),new int[]{5,2,8}); array(source,new int[]{2,5,2,8});
    array(Main.withoutLowest(new int[0]),new int[0]); array(Main.withoutLowest(new int[]{7}),new int[0]);
    array(Main.withoutLowest(new int[]{-1,-3,-3}),new int[]{-1,-3});
    int[] result=Main.withoutLowest(source); result[0]=99; array(source,new int[]{2,5,2,8});
    if(Main.average(new int[0])!=0.0) throw new AssertionError("empty average");`, mutants: [(s: string) => s.replace("ratings[i] < ratings[lowestIndex]", "ratings[i] <= ratings[lowestIndex]")] },
];
for (const contract of contracts) {
  const topic = topicSources.find(t => t.id === contract.id)!;
  const check = harness(contract.checks);
  if (run(topic.solution, "Main", "", check) !== "PASS") throw new Error(`${contract.id}: solution failed`);
  for (const mutation of contract.mutants) {
    const wrong = mutation(topic.solution);
    if (wrong === topic.solution) throw new Error(`${contract.id}: mutation did not apply`);
    let rejected = false;
    try { run(wrong, "Main", "", check); } catch (error) {
      const failure = error as { stderr?: Buffer };
      // Compile errors do not establish that a plausible wrong algorithm was rejected.
      if (!String(failure.stderr).includes("AssertionError")) throw error;
      rejected = true;
    }
    if (!rejected) throw new Error(`${contract.id}: wrong algorithm passed`);
  }
  console.log(`PASS ${contract.id}: normal, boundary, input preservation; plausible wrong algorithm rejected`);
}
const equipment = readFileSync("docs/verification/R2-Java/EquipmentMain.java", "utf8");
const visibleAnswer = topicSources.find(topic => topic.id === "java-project-library-0")!.checkpoint!.modelAnswer;
if (!visibleAnswer.includes(equipment)) throw new Error("The compiled equipment fixture differs from the gated model answer");
const fixtures = [
  { name: "normal and quit", input: "add Lamp\nadd Cable\ntake 1\nreturn 1\nlist\nquit\nadd Hidden\n", expected: "added #1\nadded #2\ntaken #1\nreturned #1\n1 Lamp available\n2 Cable available\nbye" },
  { name: "invalid commands preserve state and continue", input: "list\nadd\n\nunknown\nadd Lamp\nreturn 1\ntake xx\ntake 0\ntake 9\ntake 1\ntake 1\nreturn 1\nreturn 1\nlist\n", expected: "empty\nerror: empty name\nerror: empty command\nerror: unknown command\nadded #1\nerror: already available\nerror: invalid id\nerror: missing id\nerror: missing id\ntaken #1\nerror: already borrowed\nreturned #1\nerror: already available\n1 Lamp available" },
  { name: "empty EOF", input: "", expected: "" },
  { name: "bad arguments do not quit or list", input: "quit extra\nadd Work Lamp\nlist extra\nlist\nquit\n", expected: "error: unexpected argument\nadded #1\nerror: unexpected argument\n1 Work Lamp available\nbye" },
];
for (const fixture of fixtures) {
  if (run(equipment, "EquipmentMain", fixture.input) !== fixture.expected) throw new Error(`Equipment: ${fixture.name}`);
  console.log(`PASS equipment: ${fixture.name}`);
}
const wrongEquipment = equipment.replace("borrowed.set(index, take);", "borrowed.set(index, false);");
if (wrongEquipment === equipment) throw new Error("Equipment mutation did not apply");
if (run(wrongEquipment, "EquipmentMain", fixtures[1].input) === fixtures[1].expected) throw new Error("Wrong state transition passed");
console.log("PASS equipment: wrong state transition rejected");
