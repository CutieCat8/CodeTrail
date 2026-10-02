import { expect, test } from "@playwright/test";

test("fresh learner starts without invented progress", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".sidebar-progress")).toContainText("0 XP");
  await expect(page.locator(".sidebar-progress")).toContainText("0/22");
  await expect(page.getByText("จังหวะการฝึก 20 สัปดาห์")).toBeVisible();
  await expect(page.locator(".activity-cell.level-0")).toHaveCount(140);
});

test("lesson draft survives refresh and a wrong answer fails", async ({ page }) => {
  await page.goto("/#lesson/web-ts-narrowing");
  const editor = page.getByRole("textbox", { name: "พื้นที่เขียนโค้ด" });
  await editor.fill('function formatActivity() { return "wrong"; }');
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("seas-fullstack-quest:v1") ?? "{}").progress?.["web-ts-narrowing"]?.code)).toBe('function formatActivity() { return "wrong"; }');
  await page.reload();
  await expect(editor).toHaveValue('function formatActivity() { return "wrong"; }');
  await page.getByRole("button", { name: "Run tests" }).click();
  await expect(page.locator(".lesson-practice-pane").getByRole("heading", { name: "ยังมี test ที่ไม่ผ่าน" })).toBeVisible();
  await expect(page.locator(".lesson-practice-pane .test-results .fail")).toHaveCount(3);
});

test("correct answer earns XP once", async ({ page }) => {
  await page.goto("/#lesson/web-ts-narrowing");
  const editor = page.getByRole("textbox", { name: "พื้นที่เขียนโค้ด" });
  await editor.fill('function formatActivity(activity) { if (activity.kind === "online") return activity.title + " — Online"; return activity.title + " — ห้อง " + activity.room; }');
  await page.getByRole("button", { name: "Run tests" }).click();
  await expect(page.locator(".lesson-practice-pane").getByRole("heading", { name: "ผ่านเงื่อนไขรอบนี้" })).toBeVisible();
  await expect(page.locator(".sidebar-progress strong")).not.toHaveText("0 XP");
  const firstXp = await page.locator(".sidebar-progress strong").textContent();
  await page.getByRole("button", { name: "Run tests" }).click();
  await expect(page.locator(".sidebar-progress strong")).toHaveText(firstXp ?? "");
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  await page.reload();
  await expect(page.locator(".sidebar-progress strong")).toHaveText(firstXp ?? "");
});

test("mobile navigation opens and the roadmap fits the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#roadmap");
  await page.getByRole("button", { name: "เปิดเมนู" }).click();
  await expect(page.locator(".sidebar.open")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".sidebar.open")).toHaveCount(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("micro-step completion contributes to heatmap, streak, and weekly goal", async ({ page }) => {
  await page.goto("/#step/dev-program-concept");
  await page.locator(".micro-task textarea").fill("Source code คือข้อความที่เขียนให้โปรแกรมทำงาน");
  await page.getByRole("button", { name: "บันทึกหลักฐาน" }).click();
  await page.locator(".sidebar nav").getByRole("button", { name: "ฐานปฏิบัติการ" }).click();
  await expect(page.locator(".activity-cell.level-0")).toHaveCount(139);
  await expect(page.locator(".weekly-mini-card")).toContainText("1/5");
  await expect(page.locator(".profile-stats > div").last().locator("strong")).toHaveText("1");
});

test("browser history restores navigation between Home and Curriculum", async ({ page }) => {
  await page.goto("/");
  await page.locator(".sidebar nav").getByRole("button", { name: "คอร์ส" }).click();
  await expect(page).toHaveURL(/#curriculum$/);
  await expect(page.getByRole("heading", { name: "เลือกเส้นทางจากสิ่งที่อยากทำได้" })).toBeVisible();
  await page.goBack();
  await expect(page.locator(".sidebar nav").getByRole("button", { name: "ฐานปฏิบัติการ" })).toHaveAttribute("aria-current", "page");
  await page.goForward();
  await expect(page.getByRole("heading", { name: "เลือกเส้นทางจากสิ่งที่อยากทำได้" })).toBeVisible();
});

test("Web Platform course opens its authored steps and states the partial count", async ({ page }) => {
  await page.goto("/#curriculum");
  await page.getByRole("button", { name: /Web Platform Foundations/ }).click();
  await expect(page.locator(".featured-course")).toContainText("เปิดเรียนบางส่วน");
  await expect(page.locator(".featured-course")).toContainText("60/80");
  await expect(page.locator(".chapter-explorer")).toContainText("Browser, server และ HTTP response");
});

test("a v1 export can be imported without losing a saved journal entry", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("seas-fullstack-quest:v1", JSON.stringify({
      version: 1, mode: "mixed", weeklyGoal: 5, progress: {}, stepProgress: {},
      journal: [{ id: "old-entry", date: "2026-09-30", title: "ทดสอบ", learned: "อ่าน HTTP response", bug: "", fix: "", unclear: "", link: "", updatedAt: "2026-09-30T10:00:00.000Z" }],
    }));
  });
  await page.goto("/#settings");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^seas-quest-\d{4}-\d{2}-\d{2}\.json$/);
  const path = await download.path();
  expect(path).not.toBeNull();
  await page.locator('input[type="file"]').setInputFiles(path!);
  await expect(page.getByRole("status")).toContainText("นำเข้าข้อมูลสำเร็จ");
  await page.reload();
  await expect(page.locator(".settings-local-banner")).toContainText("1");
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("seas-fullstack-quest:v1") ?? "{}").journal);
  expect(saved[0].id).toBe("old-entry");
});

test("Journal and project evidence survive a reload", async ({ page }) => {
  await page.goto("/#journal");
  await page.getByRole("button", { name: "สร้างบันทึก" }).click();
  await page.getByRole("textbox", { name: /หัวข้อบันทึก/ }).fill("HTTP response");
  await page.getByRole("textbox", { name: "แนวคิดที่เข้าใจเพิ่ม" }).fill("status บอกผล request");
  await page.getByRole("button", { name: "เพิ่มบันทึก" }).click();
  await expect(page.locator(".journal-entry-list")).toContainText("HTTP response");

  await page.locator(".sidebar nav").getByRole("button", { name: "โปรเจกต์" }).click();
  await page.getByRole("checkbox", { name: "API มี error contract" }).check();
  await expect(page.locator(".project-status")).toContainText("1/4");
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  await page.reload();
  await expect(page.locator(".project-status")).toContainText("1/4");
  await page.locator(".sidebar nav").getByRole("button", { name: "สมุดบันทึก" }).click();
  await expect(page.locator(".journal-entry-list")).toContainText("HTTP response");
});
