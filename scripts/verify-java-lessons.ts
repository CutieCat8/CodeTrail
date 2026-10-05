// Verifies Java lessons with a real JDK (the app itself never runs Java):
//
//   JAVA_HOME=/path/to/jdk-21 npx vite-node --config vitest.config.ts scripts/verify-java-lessons.ts
//
// For every topic with language "java":
//   - example (and explain blocks with output) compile and print exactly expectedOutput, fed `stdin` when given
//   - starter compiles; solution compiles and, with solutionCheck, prints exactly solutionCheck.output
//   - buggy fails to compile when bugExplanation says it is a compile error, and compiles otherwise
// Several files in one string are separated by lines of the form `// File: path/Name.java`.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { topicSources } from "@/content/curriculum";

const javaHome = process.env.JAVA_HOME;
if (!javaHome) throw new Error("Set JAVA_HOME to a JDK 21 installation");
const javac = path.join(javaHome, "bin", "javac");
const java = path.join(javaHome, "bin", "java");

type SourceFile = { name: string; code: string };

export function splitFiles(source: string): SourceFile[] {
  const parts = source.split(/^\/\/ File: (\S+)\s*$/m);
  if (parts.length === 1) {
    const name = /public\s+(?:final\s+|abstract\s+)*(?:class|record|interface|enum)\s+(\w+)/.exec(source)?.[1] ?? "Main";
    return [{ name: name + ".java", code: source }];
  }
  const files: SourceFile[] = [];
  for (let i = 1; i < parts.length; i += 2) files.push({ name: parts[i], code: parts[i + 1].replace(/^\n/, "") });
  return files;
}

function mainClass(files: SourceFile[]) {
  const file = files.find((f) => /static\s+void\s+main\s*\(/.test(f.code));
  if (!file) return null;
  const pkg = /^\s*package\s+([\w.]+)\s*;/m.exec(file.code)?.[1];
  const name = path.basename(file.name, ".java");
  return pkg ? `${pkg}.${name}` : name;
}

function compile(source: string) {
  const dir = mkdtempSync(path.join(tmpdir(), "java-lesson-"));
  const files = splitFiles(source);
  for (const file of files) {
    mkdirSync(path.dirname(path.join(dir, "src", file.name)), { recursive: true });
    writeFileSync(path.join(dir, "src", file.name), file.code);
  }
  try {
    execFileSync(javac, ["--release", "21", "-encoding", "UTF-8", "-d", path.join(dir, "out"), ...files.map((f) => path.join(dir, "src", f.name))], { encoding: "utf8", stdio: "pipe" });
    return { ok: true as const, dir, main: mainClass(files) };
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    return { ok: false as const, message: String((error as { stderr?: string }).stderr ?? error) };
  }
}

function run(source: string, stdin = "") {
  const compiled = compile(source);
  if (!compiled.ok) return "COMPILE ERROR: " + compiled.message;
  try {
    if (!compiled.main) return "NO MAIN";
    return execFileSync(java, ["-Dstdout.encoding=UTF-8", "-cp", path.join(compiled.dir, "out"), compiled.main], { input: stdin, encoding: "utf8", timeout: 20000, stdio: "pipe" }).replace(/\n$/, "");
  } catch (error) {
    const failure = error as { stdout?: string; stderr?: string };
    return "RUNTIME ERROR: " + (failure.stdout ?? "") + (failure.stderr ?? "");
  } finally {
    rmSync(compiled.dir, { recursive: true, force: true });
  }
}

function compiles(source: string) {
  const compiled = compile(source);
  if (compiled.ok) rmSync(compiled.dir, { recursive: true, force: true });
  return compiled.ok;
}

const claimsCompileError = (text: string) => /compile error|javac แจ้ง|compile ไม่ผ่าน/.test(text);

const topics = topicSources.filter((topic) => topic.language === "java" && topic.standard === "v3");
let failures = 0;
const report = (ok: boolean, label: string, detail?: string) => {
  if (!ok) failures += 1;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok && detail) console.log("  " + detail.replace(/\n/g, "\n  "));
};

for (const topic of topics) {
  if (topic.expectedOutput !== undefined) {
    const actual = run(topic.example, topic.stdin);
    report(actual === topic.expectedOutput, `${topic.id} · example`, `expected:\n${topic.expectedOutput}\nactual:\n${actual}`);
  }
  for (const block of topic.lesson?.explain ?? []) {
    if (block.code && block.output !== undefined) {
      const actual = run(block.code);
      report(actual === block.output, `${topic.id} · ${block.heading}`, `expected:\n${block.output}\nactual:\n${actual}`);
    }
  }
  report(compiles(topic.starter), `${topic.id} · starter compiles`);
  if (topic.solutionCheck) {
    const actual = run(topic.solution, topic.solutionCheck.stdin);
    report(actual === topic.solutionCheck.output, `${topic.id} · solution output`, `expected:\n${topic.solutionCheck.output}\nactual:\n${actual}`);
  } else {
    report(compiles(topic.solution), `${topic.id} · solution compiles`);
  }
  const expectFailure = claimsCompileError(topic.bugExplanation);
  report(compiles(topic.buggy) !== expectFailure, `${topic.id} · buggy ${expectFailure ? "fails to compile" : "compiles (runtime/logic bug)"}`);
}
console.log(`${topics.length} Java topics checked, ${failures} failing checks`);
process.exitCode = failures ? 1 : 0;
