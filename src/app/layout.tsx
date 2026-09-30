import type { Metadata } from "next";
import "./globals.css";
import "./modern-adventure.css";

export const metadata: Metadata = {
  title: "Sea’s Full-stack Quest",
  description: "พื้นที่ฝึก Full-stack, Java และ OOP แบบลงมือทำ",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
