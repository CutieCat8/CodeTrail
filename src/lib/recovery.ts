import type { AppData } from "@/types/domain";
import { importAppData, normalizeAppData, REJECTED_STORAGE_KEY, STORAGE_KEY } from "./storage";

export type BackupRecord = {
  key: string;
  timestamp: string | null;
  raw: string;
  status: "valid" | "invalid-schema" | "invalid-json";
  data: AppData | null;
};
export type BackupList = { ok: true; backups: BackupRecord[] } | { ok: false; error: string };
const prefix = `${REJECTED_STORAGE_KEY}:`;

export function inspectBackup(key: string, raw: string): BackupRecord {
  let data: AppData | null = null;
  let status: BackupRecord["status"] = "invalid-json";
  try {
    data = normalizeAppData(JSON.parse(raw));
    status = data ? "valid" : "invalid-schema";
  } catch { /* Keep malformed files available for raw export. */ }
  const timestamp = key.slice(prefix.length, prefix.length + 24);
  return { key, raw, status, data, timestamp: Number.isFinite(Date.parse(timestamp)) ? timestamp : null };
}

export function listBackups(storage?: Storage): BackupList {
  try {
    storage ??= globalThis.localStorage;
    const backups: BackupRecord[] = [];
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (!key?.startsWith(prefix)) continue;
      const raw = storage.getItem(key);
      if (raw !== null) backups.push(inspectBackup(key, raw));
    }
    backups.sort((a, b) => b.key.localeCompare(a.key));
    return { ok: true, backups };
  } catch {
    return { ok: false, error: "อ่านข้อมูลสำรองไม่ได้ โปรดตรวจสิทธิ์การเก็บข้อมูลของ browser แล้วลองใหม่" };
  }
}

export function readBackupRaw(key: string, storage?: Storage): string {
  storage ??= globalThis.localStorage;
  if (!key.startsWith(prefix)) throw new Error("ไม่ใช่รายการสำรองของแอป");
  const raw = storage.getItem(key);
  if (raw === null) throw new Error("ไม่พบรายการสำรองนี้แล้ว กรุณาโหลดรายการใหม่");
  return raw;
}

export type RestoreResult = { ok: true; data: AppData; preservedKey: string | null } | { ok: false; error: string };

export function restoreBackup(backup: BackupRecord, storage?: Storage, now = new Date(), currentData?: AppData): RestoreResult {
  try {
    const targetStorage = storage ?? globalThis.localStorage;
    const raw = readBackupRaw(backup.key, targetStorage);
    if (raw !== backup.raw) return { ok: false, error: "รายการสำรองเปลี่ยนหลังเปิดดู กรุณาโหลดรายการใหม่" };
    const inspected = inspectBackup(backup.key, raw);
    if (!inspected.data) return { ok: false, error: "ข้อมูลสำรองไม่ตรง schema v1 ดาวน์โหลดไฟล์เก็บไว้ได้ แต่กู้คืนไม่ได้" };
    const currentRaw = targetStorage.getItem(STORAGE_KEY);
    const currentDraft = currentData ? normalizeAppData(currentData) : null;
    if (currentData && !currentDraft) return { ok: false, error: "ข้อมูลปัจจุบันตรวจสอบไม่ผ่าน กู้คืนไม่ได้" };
    const draftRaw = currentDraft ? JSON.stringify(currentDraft) : null;
    let preservedKey: string | null = null;
    const result = importAppData(raw, data => {
      const preserve = (text: string) => {
        const base = `${prefix}${now.toISOString()}`;
        let backupKey = base;
        for (let suffix = 2; targetStorage.getItem(backupKey) !== null; suffix += 1) backupKey = `${base}:${suffix}`;
        targetStorage.setItem(backupKey, text);
        preservedKey = backupKey;
      };
      // Preserve both stored raw data and newer in-memory drafts before replacing either.
      if (currentRaw !== null) preserve(currentRaw);
      if (draftRaw !== null && draftRaw !== currentRaw) preserve(draftRaw);
      if (targetStorage.getItem(STORAGE_KEY) !== currentRaw || readBackupRaw(backup.key, targetStorage) !== raw) {
        throw new Error("Stored data changed during recovery");
      }
      targetStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    });
    return result.ok ? { ...result, preservedKey } : result;
  } catch {
    return { ok: false, error: "กู้คืนไม่สำเร็จ อ่านหรือสำรองข้อมูลปัจจุบันไม่ได้ ข้อมูลปัจจุบันยังคงอยู่" };
  }
}
