import { readFile } from "node:fs/promises";
import { expect, test, type Page } from "@playwright/test";

const repositoryMilestone = (page: Page) => page.getByRole("navigation", { name: "เลือก milestone" }).getByRole("button", { name: /ตั้งต้น repo/ });
const submitButton = (page: Page) => page.getByRole("button", { name: "ส่งหลักฐาน milestone", exact: true });

async function readyRepository(page: Page) {
  for (const checkbox of await page.locator(".milestone-evidence input[type=checkbox]").all()) await checkbox.check();
  await page.getByRole("textbox", { name: "ลิงก์หลักฐานของ milestone" }).fill("https://github.com/example/planner/commit/abc123");
  await page.getByRole("textbox", { name: "สิ่งที่ทำและผลตรวจ" }).fill("ทำ README และรันตามขั้นตอนจาก checkout ใหม่แล้ว");
}

test("milestone submission requires evidence, persists, and becomes a draft after editing", async ({ page }) => {
  await page.goto("/#projects");
  await expect(page.locator(".project-status")).toContainText("0/9");
  await submitButton(page).click();
  await expect(page.locator(".milestone-notice")).toContainText("ติ๊กเกณฑ์");
  await readyRepository(page);
  await page.getByRole("textbox", { name: "ลิงก์หลักฐานของ milestone" }).fill("javascript:alert(1)");
  await submitButton(page).click();
  await expect(page.locator(".milestone-notice")).toContainText("http://");
  await expect(page.getByRole("link", { name: "เปิดหลักฐาน" })).toHaveCount(0);
  await page.getByRole("textbox", { name: "ลิงก์หลักฐานของ milestone" }).fill("https://github.com/example/planner/commit/abc123");
  await submitButton(page).click();
  await expect(page.locator(".project-status")).toContainText("1/9");
  await expect(page.locator(".milestone-submitted")).toContainText("ผู้เรียนตรวจเอง");
  await expect(page.getByRole("button", { name: "ส่งหลักฐานแล้ว", exact: true })).toBeDisabled();
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  await page.reload();
  await expect(page.getByRole("heading", { name: "ออกแบบ Activity, Member และ Vote", exact: true })).toBeVisible();
  await repositoryMilestone(page).click();
  await expect(page.getByRole("textbox", { name: "สิ่งที่ทำและผลตรวจ" })).toHaveValue("ทำ README และรันตามขั้นตอนจาก checkout ใหม่แล้ว");
  await page.getByRole("textbox", { name: "สิ่งที่ทำและผลตรวจ" }).fill("แก้ขั้นตอน setup แล้ว ต้องตรวจใหม่");
  await expect(page.locator(".project-status")).toContainText("0/9");
  await submitButton(page).click();
  await expect(page.locator(".project-status")).toContainText("1/9");
  await page.locator(".sidebar nav").getByRole("button", { name: "ฐานปฏิบัติการ" }).click();
  await expect(page.locator(".home-project-progress")).toContainText("1/9");
  await expect(page.locator(".home-project-card")).toContainText("ออกแบบ Activity, Member และ Vote");
  await page.getByRole("button", { name: "ไปทำโปรเจกต์" }).click();
  await expect(page).toHaveURL(/#projects$/);
});

test("old project data stays intact and new milestone evidence survives export/import", async ({ page }) => {
  await page.goto("/#projects");
  await page.evaluate(() => localStorage.setItem("seas-fullstack-quest:v1", JSON.stringify({
    version: 1, mode: "mixed", weeklyGoal: 5, progress: {}, journal: [], stepProgress: {},
    projectProgress: { "friends-activity-planner": { repositoryUrl: "https://github.com/example/old", demoUrl: "https://example.com/demo", checklist: [true, false, false, false], updatedAt: "2026-10-01T12:00:00.000Z" } },
  })));
  await page.reload();
  await expect(page.getByRole("textbox", { name: "Repository URL" })).toHaveValue("https://github.com/example/old");
  await expect(page.getByRole("checkbox", { name: "API มี error contract" })).toBeChecked();
  await readyRepository(page);
  await submitButton(page).click();
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  await page.getByRole("button", { name: "ตั้งค่า", exact: true }).click();
  const downloading = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const file = await downloading;
  const path = await file.path();
  expect(path).not.toBeNull();
  await page.evaluate(() => localStorage.removeItem("seas-fullstack-quest:v1"));
  await page.reload();
  await page.locator('input[type="file"]').setInputFiles(path!);
  await expect(page.getByRole("status")).toContainText("นำเข้าข้อมูลสำเร็จ");
  await expect(page.locator(".save-pill")).toContainText("บันทึกแล้ว");
  await page.reload();
  await page.getByRole("button", { name: "โปรเจกต์", exact: true }).click();
  await expect(page.locator(".project-status")).toContainText("1/9");
  await expect(page.getByRole("textbox", { name: "Repository URL" })).toHaveValue("https://github.com/example/old");
  await expect(page.getByRole("checkbox", { name: "API มี error contract" })).toBeChecked();
  await repositoryMilestone(page).click();
  await expect(page.getByRole("textbox", { name: "ลิงก์หลักฐานของ milestone" })).toHaveValue("https://github.com/example/planner/commit/abc123");
});

test("project brief downloads and linked lessons open without losing drafts", async ({ page }) => {
  await page.goto("/#projects");
  const downloading = page.waitForEvent("download");
  await page.getByRole("button", { name: "ดาวน์โหลดโจทย์โปรเจกต์ (.md)" }).click();
  const file = await downloading;
  expect(file.suggestedFilename()).toBe("friends-activity-planner-brief.md");
  const path = await file.path();
  const brief = await readFile(path!, "utf8");
  expect(brief).toContain("## 9. จัดชุดผลงานและสาธิต");
  await page.getByRole("textbox", { name: "สิ่งที่ทำและผลตรวจ" }).fill("กำลังเขียน README");
  await page.getByRole("button", { name: /ทำความเข้าใจ: repository, working tree และ commit/ }).click();
  await expect(page).toHaveURL(/#step\/dev-git-concept$/);
  await page.goBack();
  await expect(page.getByRole("textbox", { name: "สิ่งที่ทำและผลตรวจ" })).toHaveValue("กำลังเขียน README");
});

test("milestone workspace fits mobile and supports keyboard controls", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#projects");
  await page.getByRole("navigation", { name: "เลือก milestone" }).getByRole("button", { name: /เก็บข้อมูลใน PostgreSQL/ }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "เก็บข้อมูลใน PostgreSQL", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: testInfo.outputPath("projects-mobile.png"), fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: testInfo.outputPath("projects-desktop.png"), fullPage: true });
});
