// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuestApp } from "@/components/QuestApp";
import { STORAGE_KEY, emptyData } from "@/lib/storage";

vi.stubGlobal("React", React);

beforeEach(() => {
  localStorage.clear();
  window.location.hash = "#step/dev-files-checkpoint";
});
afterEach(() => { cleanup(); localStorage.clear(); window.location.hash = ""; });

describe("manual assessment workspace", () => {
  it("uses the actual brief, removes the practice starter and gates feedback until submission", async () => {
    render(<QuestApp />);
    await screen.findByRole("heading", { name: /ประเมินการอ่าน path/ });
    const editor = screen.getByRole("textbox", { name: /Code editor/ }) as HTMLTextAreaElement;
    expect(editor.value).toBe("");
    expect(screen.queryByRole("button", { name: "Hint / Solution" })).toBeNull();
    const submit = screen.getByRole("button", { name: "ส่งคำตอบเพื่อเทียบเกณฑ์" });
    expect((submit as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(editor, { target: { value: "../data/menu.txt; .. ถอยหนึ่งระดับ" } });
    fireEvent.click(submit);
    fireEvent.click(screen.getByRole("button", { name: "Hint / Solution" }));
    expect(screen.getByText(/จาก club\/src ใช้/)).toBeTruthy();
    expect(screen.getByText("บันทึกการส่งแล้ว — ยังต้องเทียบเกณฑ์ด้วยตนเอง")).toBeTruthy();
    fireEvent.change(editor, { target: { value: "แก้คำตอบใหม่" } });
    expect(screen.queryByRole("button", { name: "Hint / Solution" })).toBeNull();
    expect(screen.queryByText(/จาก club\/src ใช้/)).toBeNull();
  });

  it("restores a submitted answer and feedback using existing progress IDs", async () => {
    const data = emptyData();
    data.stepProgress["dev-files-checkpoint"] = { stepId: "dev-files-checkpoint", answer: "saved response", notes: "", completed: true, answerRevealed: true, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    render(<QuestApp />);
    await screen.findByText(/จาก club\/src ใช้/);
    expect((screen.getByRole("textbox", { name: /Code editor/ }) as HTMLTextAreaElement).value).toBe("saved response");
  });

  it("keeps a previously revealed but unsubmitted draft behind the gate", async () => {
    const data = emptyData();
    data.stepProgress["dev-files-checkpoint"] = { stepId: "dev-files-checkpoint", answer: "draft", notes: "", completed: false, answerRevealed: true, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    render(<QuestApp />);
    await screen.findByRole("heading", { name: /ประเมินการอ่าน path/ });
    expect(screen.queryByText(/จาก club\/src ใช้/)).toBeNull();
  });
});
