// Verifies Java lessons with a real JDK (the app itself never runs Java):
//
//   JAVA_HOME=/path/to/jdk-21 JUNIT_JAR=/path/to/junit-platform-console-standalone-6.x.jar \
//     npx vite-node --config vitest.config.ts scripts/verify-java-lessons.ts
//
// For every v3 topic with language "java":
//   - example (and explain blocks with output) compile and print exactly expectedOutput, fed `stdin` when given;
//     an example made of JUnit tests (no expectedOutput) must pass at least one test with no failures
//   - starter compiles; solution compiles and, with solutionCheck, prints exactly solutionCheck.output
//   - a solution that contains test-input.txt and expected-output.txt prints the expected file for that input
//   - sources that import org.junit compile against JUNIT_JAR; solutionCheck.junitTests runs the JUnit
//     console launcher and requires a clean run (exit 0, nothing failed/aborted/skipped) with exactly that many tests
//   - buggy behaves as bugCheck says: compile error containing the message, runtime error containing the
//     message, or a program that runs and prints the stated wrong output
//
// Code without file markers is saved as Main.java, the file name the lesson UI shows. Several files in one
// string are separated by lines `// File: path/Name.java`; nothing but blank lines may come before the first one.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { topicSources } from "@/content/curriculum";

const javaHome = process.env.JAVA_HOME;
if (!javaHome) throw new Error("Set JAVA_HOME to a JDK 21 installation");
const javac = path.join(javaHome, "bin", "javac");
const java = path.join(javaHome, "bin", "java");
const junitJar = process.env.JUNIT_JAR;
const usesJunit = (source: string) => source.includes("org.junit");

type SourceFile = { name: string; code: string };

export function splitFiles(source: string): SourceFile[] {
  const parts = source.split(/^\/\/ File: (\S+)[ \t]*$/m);
  if (parts.length === 1) return [{ name: "Main.java", code: source }];
  if (parts[0].trim() !== "") throw new Error("text before the first // File: marker: " + parts[0].trim().slice(0, 60));
  const files: SourceFile[] = [];
  for (let i = 1; i < parts.length; i += 2) files.push({ name: parts[i], code: parts[i + 1].replace(/^\n/, "") });
  return files;
}

const javaFiles = (files: SourceFile[]) => files.filter((file) => file.name.endsWith(".java"));

function mainClass(files: SourceFile[]) {
  const file = javaFiles(files).find((f) => /static\s+void\s+main\s*\(/.test(f.code));
  if (!file) return null;
  const pkg = /^\s*package\s+([\w.]+)\s*;/m.exec(file.code)?.[1];
  const name = path.basename(file.name, ".java");
  return pkg ? `${pkg}.${name}` : name;
}

type Compiled = { ok: true; dir: string; main: string | null } | { ok: false; message: string };

function compile(source: string): Compiled {
  const files = splitFiles(source);
  const dir = mkdtempSync(path.join(tmpdir(), "java-lesson-"));
  for (const file of javaFiles(files)) {
    mkdirSync(path.dirname(path.join(dir, "src", file.name)), { recursive: true });
    writeFileSync(path.join(dir, "src", file.name), file.code);
  }
  if (usesJunit(source) && !junitJar) throw new Error("JUNIT_JAR is not set but a lesson uses JUnit");
  const classpath = usesJunit(source) ? ["-cp", junitJar!] : [];
  try {
    execFileSync(javac, ["--release", "21", "-encoding", "UTF-8", ...classpath, "-d", path.join(dir, "out"), ...javaFiles(files).map((f) => path.join(dir, "src", f.name))], { encoding: "utf8", stdio: "pipe" });
    return { ok: true, dir, main: mainClass(files) };
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    const failure = error as NodeJS.ErrnoException & { stderr?: string; status?: number };
    // A missing or broken JDK is a setup problem, never evidence that lesson code fails to compile.
    if (failure.code === "ENOENT" || failure.status === undefined) throw error;
    return { ok: false, message: failure.stderr ?? String(error) };
  }
}

type RunResult = { kind: "compile-error"; text: string } | { kind: "runtime-error"; text: string } | { kind: "ok"; text: string };

function execute(source: string, stdin = ""): RunResult {
  const compiled = compile(source);
  if (!compiled.ok) return { kind: "compile-error", text: compiled.message };
  try {
    if (!compiled.main) return { kind: "runtime-error", text: "NO MAIN" };
    const out = execFileSync(java, ["-Dstdout.encoding=UTF-8", "-Dstderr.encoding=UTF-8", "-cp", path.join(compiled.dir, "out"), compiled.main], { input: stdin, encoding: "utf8", timeout: 20000, stdio: "pipe" });
    return { kind: "ok", text: out.replace(/\n$/, "") };
  } catch (error) {
    const failure = error as { stdout?: string; stderr?: string };
    return { kind: "runtime-error", text: (failure.stdout ?? "") + (failure.stderr ?? "") };
  } finally {
    rmSync(compiled.dir, { recursive: true, force: true });
  }
}

const show = (result: RunResult) => (result.kind === "ok" ? result.text : `${result.kind.toUpperCase()}: ${result.text}`);

// Runs every JUnit test in the compiled sources. A run is clean only when the launcher exits 0 and no test or
// container failed, aborted or was skipped (a failing @BeforeAll/@AfterAll fails a container, not a test).
function runJunit(source: string) {
  const compiled = compile(source);
  if (!compiled.ok) return { clean: false, successful: NaN, detail: "COMPILE ERROR: " + compiled.message };
  try {
    const output = execFileSync(java, ["-jar", junitJar!, "execute", "--class-path", path.join(compiled.dir, "out"), "--scan-class-path", "--disable-banner", "--details=summary"], { encoding: "utf8", timeout: 60000, stdio: "pipe" });
    return summary(output, true);
  } catch (error) {
    // The launcher exits non-zero when anything failed; its stdout still has the summary.
    return summary(String((error as { stdout?: string }).stdout ?? error), false);
  } finally {
    rmSync(compiled.dir, { recursive: true, force: true });
  }
}

function summary(output: string, exitedZero: boolean) {
  const count = (label: string) => Number(new RegExp(`(\\d+) ${label}`).exec(output)?.[1] ?? NaN);
  const problems = ["tests failed", "tests aborted", "tests skipped", "containers failed", "containers aborted"].map(count);
  return { clean: exitedZero && problems.every((n) => n === 0), successful: count("tests successful"), detail: output };
}

const topics = topicSources.filter((topic) => topic.language === "java" && topic.standard === "v3");
let failures = 0;
const report = (ok: boolean, label: string, detail?: string) => {
  if (!ok) failures += 1;
  console.log(`${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok && detail) console.log("  " + detail.replace(/\n/g, "\n  "));
};
const expectOutput = (label: string, result: RunResult, expected: string) =>
  report(result.kind === "ok" && result.text === expected, label, `expected:\n${expected}\nactual:\n${show(result)}`);

for (const topic of topics) {
  try {
    if (topic.expectedOutput !== undefined) expectOutput(`${topic.id} · example`, execute(topic.example, topic.stdin), topic.expectedOutput);
    if (topic.expectedOutput === undefined && usesJunit(topic.example)) {
      const result = runJunit(topic.example);
      report(result.clean && result.successful > 0, `${topic.id} · example JUnit tests pass`, result.detail.slice(-1500));
    }
    for (const block of topic.lesson?.explain ?? []) {
      if (block.code && block.output !== undefined) expectOutput(`${topic.id} · ${block.heading}`, execute(block.code), block.output);
    }
    const starter = compile(topic.starter);
    report(starter.ok, `${topic.id} · starter compiles`, starter.ok ? undefined : starter.message);
    if (starter.ok) rmSync(starter.dir, { recursive: true, force: true });

    if (topic.solutionCheck?.output !== undefined) expectOutput(`${topic.id} · solution output`, execute(topic.solution, topic.solutionCheck.stdin), topic.solutionCheck.output);
    const fixtures = splitFiles(topic.solution);
    const input = fixtures.find((f) => f.name === "test-input.txt");
    const expected = fixtures.find((f) => f.name === "expected-output.txt");
    if (input && expected) expectOutput(`${topic.id} · solution matches expected-output.txt`, execute(topic.solution, input.code), expected.code.replace(/\n$/, ""));
    if (topic.solutionCheck?.junitTests !== undefined) {
      const result = runJunit(topic.solution);
      const ok = result.clean && result.successful === topic.solutionCheck.junitTests;
      report(ok, `${topic.id} · solution passes ${topic.solutionCheck.junitTests} JUnit tests`, result.detail.slice(-1500));
    }
    if (!topic.solutionCheck && !(input && expected)) {
      const solution = compile(topic.solution);
      report(solution.ok, `${topic.id} · solution compiles`, solution.ok ? undefined : solution.message);
      if (solution.ok) rmSync(solution.dir, { recursive: true, force: true });
    }

    const bug = topic.bugCheck;
    if (!bug) {
      report(false, `${topic.id} · buggy has a bugCheck`);
    } else {
      const result = execute(topic.buggy, bug.kind === "compile" ? "" : bug.stdin);
      if (bug.kind === "compile") report(result.kind === "compile-error" && result.text.includes(bug.message), `${topic.id} · buggy fails to compile with “${bug.message}”`, show(result));
      if (bug.kind === "runtime") report(result.kind === "runtime-error" && result.text.includes(bug.message), `${topic.id} · buggy fails at runtime with “${bug.message}”`, show(result));
      if (bug.kind === "logic") expectOutput(`${topic.id} · buggy runs and prints the wrong output`, result, bug.output);
    }
  } catch (error) {
    report(false, `${topic.id} · verifier error`, String(error));
  }
}
console.log(`${topics.length} Java topics checked, ${failures} failing checks`);
process.exitCode = failures ? 1 : 0;
