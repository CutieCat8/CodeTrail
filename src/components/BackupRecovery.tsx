"use client";

import { useState } from "react";
import type { AppData } from "@/types/domain";
import { listBackups, readBackupRaw, restoreBackup, type BackupRecord } from "@/lib/recovery";

const labels = { valid: "พร้อมกู้คืน", "invalid-schema": "รูปแบบข้อมูลไม่ตรง schema v1", "invalid-json": "JSON อ่านไม่ได้" };

export default function BackupRecovery({ currentData, onRestore }: { currentData: AppData; onRestore: (data: AppData) => void }) {
  const [backups, setBackups] = useState<BackupRecord[] | null>(null);
  const [selected, setSelected] = useState<BackupRecord | null>(null);
  const [message, setMessage] = useState("");
  const refresh = () => {
    setSelected(null);
    const result = listBackups();
    if (result.ok) { setBackups(result.backups); setMessage(""); }
    else { setBackups(null); setMessage(result.error); }
  };
  const download = (backup: BackupRecord) => {
    try {
      const raw = readBackupRaw(backup.key);
      const url = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `codetrail-backup-${(backup.timestamp ?? "unknown").replaceAll(":", "-")}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage("ดาวน์โหลดข้อมูลสำรองแล้ว");
    } catch (error) { setMessage(error instanceof Error ? error.message : "ดาวน์โหลดข้อมูลสำรองไม่สำเร็จ"); }
  };
  const restore = () => {
    if (!selected) return;
    const result = restoreBackup(selected, undefined, new Date(), currentData);
    if (!result.ok) { setMessage(result.error); return; }
    onRestore(result.data);
    refresh();
    setMessage(result.preservedKey ? "กู้คืนแล้ว และเก็บข้อมูลเดิมเป็นรายการสำรองใหม่แล้ว" : "กู้คืนข้อมูลแล้ว");
  };
  return <section className="settings-panel backup"><span className="settings-index">03</span><div>
    <span className="eyebrow">LOCAL RECOVERY</span><h2>กู้คืนข้อมูลสำรองใน browser</h2>
    <p>ตรวจรายการที่แอปเก็บไว้เมื่ออ่านข้อมูลไม่ได้ และข้อมูลเดิมก่อนกู้คืน รายการอยู่เฉพาะ browser/profile นี้ ดาวน์โหลด JSON ที่เสียได้เพื่อเก็บต้นฉบับ</p>
    <button className="secondary" onClick={refresh}>โหลดรายการสำรองใหม่</button>
    {backups?.length === 0 && <p>ยังไม่มีข้อมูลสำรองใน browser นี้</p>}
    {backups && <ul>{backups.map(backup => <li key={backup.key}>
      <p><strong>{backup.timestamp ? new Date(backup.timestamp).toLocaleString("th-TH") : "ไม่ทราบวันที่สำรอง"}</strong> — {labels[backup.status]}</p>
      <p>{backup.key.slice(backup.key.indexOf(":rejected:") + 10)}</p>
      <div className="button-row"><button className="secondary" onClick={() => download(backup)}>ดาวน์โหลดต้นฉบับ JSON</button>
      {backup.data && <button className="secondary" onClick={() => { setSelected(backup); setMessage(""); }}>ดูก่อนกู้คืน</button>}</div>
    </li>)}</ul>}
    {selected?.data && <div role="region" aria-label="ยืนยันกู้คืนข้อมูลสำรอง">
      <h3>แทนข้อมูลปัจจุบันด้วยรายการที่เลือก</h3>
      <p>Lab {Object.keys(selected.data.progress).length} รายการ · ขั้นเรียน {Object.keys(selected.data.stepProgress ?? {}).length} รายการ · Journal {selected.data.journal.length} รายการ · Projects {Object.keys(selected.data.projectProgress ?? {}).length} รายการ</p>
      <p>คำตอบและความคืบหน้าปัจจุบันจะถูกแทนที่ แอปจะสำรองข้อมูลเดิมก่อนเขียน และเก็บรายการสำรองทั้งหมดไว้</p>
      <div className="button-row"><button className="primary" onClick={restore}>ยืนยันแทนข้อมูลและกู้คืน</button><button className="secondary" onClick={() => setSelected(null)}>ยกเลิก</button></div>
    </div>}
    {message && <p className="status-message" role="status" aria-live="polite">{message}</p>}
  </div></section>;
}
