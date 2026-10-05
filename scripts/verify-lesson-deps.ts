// Verifies lesson examples that need npm packages the app does not depend on (Express, PGlite).
// The packages live outside the repo so package.json stays unchanged:
//
//   mkdir -p /tmp/lesson-verify && cd /tmp/lesson-verify
//   npm init -y && npm pkg set type=module && npm install express@5 @electric-sql/pglite
//   cd <repo> && VERIFY_DIR=/tmp/lesson-verify npx vite-node --config vitest.config.ts scripts/verify-lesson-deps.ts
//
// Node examples run with VERIFY_DIR/node_modules on the resolution path; SQL examples run in PGlite
// (PostgreSQL compiled to WASM) and print each row of the last result as JSON, one row per line.
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { topicSources } from "@/content/curriculum";

const verifyDir = process.env.VERIFY_DIR;
if (!verifyDir) throw new Error("Set VERIFY_DIR to a folder with express and @electric-sql/pglite installed");

const sqlRunner = `import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
const db = new PGlite();
const results = await db.exec(readFileSync(process.argv[2], "utf8"));
const last = [...results].reverse().find((result) => result.fields.length > 0);
for (const row of last?.rows ?? []) console.log(JSON.stringify(row));
`;

function run(source: string, language: string) {
  const dir = path.join(verifyDir!, "run");
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  if (language === "sql") {
    writeFileSync(path.join(dir, "runner.mjs"), sqlRunner);
    writeFileSync(path.join(dir, "example.sql"), source);
    return execFileSync(process.execPath, ["runner.mjs", "example.sql"], { cwd: dir, encoding: "utf8", timeout: 30000 }).replace(/\n$/, "");
  }
  writeFileSync(path.join(dir, "example.mjs"), source);
  return execFileSync(process.execPath, ["example.mjs"], { cwd: dir, encoding: "utf8", timeout: 30000 }).replace(/\n$/, "");
}

const targets = topicSources.filter((topic) => topic.requires?.length || topic.language === "sql");
let failures = 0;
for (const topic of targets) {
  const samples = [
    ...(topic.expectedOutput !== undefined ? [{ label: "example", code: topic.example, output: topic.expectedOutput, language: topic.language ?? "node" }] : []),
    ...(topic.lesson?.explain ?? []).filter((block) => block.code && block.output !== undefined).map((block) => ({ label: block.heading, code: block.code!, output: block.output!, language: /^\s*(SELECT|CREATE|INSERT|WITH|BEGIN)\b/i.test(block.code!) ? "sql" : "node" })),
  ];
  for (const sample of samples) {
    let actual: string;
    try {
      actual = run(sample.code, sample.language);
    } catch (error) {
      actual = "ERROR: " + (error instanceof Error ? error.message : String(error));
    }
    const ok = actual === sample.output;
    if (!ok) failures += 1;
    console.log(`${ok ? "ok  " : "FAIL"} ${topic.id} · ${sample.label}`);
    if (!ok) console.log("  expected:\n" + sample.output + "\n  actual:\n" + actual);
  }
}
console.log(`${targets.length} topics checked, ${failures} failing samples`);
process.exitCode = failures ? 1 : 0;
