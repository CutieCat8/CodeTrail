type PixelCatVariant = "welcome" | "study" | "celebrate" | "rest";

const labels: Record<PixelCatVariant, string> = {
  welcome: "แมวหุ่นยนต์นักสำรวจโบกมือต้อนรับ",
  study: "แมวหุ่นยนต์นักสำรวจกำลังเรียน",
  celebrate: "แมวหุ่นยนต์นักสำรวจฉลองผ่านด่าน",
  rest: "แมวหุ่นยนต์นักสำรวจกำลังพัก",
};

export function PixelCat({ small = false, variant = "welcome", decorative = false }: { small?: boolean; variant?: PixelCatVariant; decorative?: boolean }) {
  return (
    <span
      className={`pixel-cat ${small ? "small" : ""}`}
      data-variant={variant}
      aria-label={decorative ? undefined : labels[variant]}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
    />
  );
}
