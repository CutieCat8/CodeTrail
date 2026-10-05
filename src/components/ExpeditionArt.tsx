type Landmark = "camp" | "java" | "oop" | "frontend" | "typescript" | "backend" | "data" | "integration" | "quality";

const landmarkLabels: Record<Landmark, string> = {
  camp: "Developer Camp",
  java: "Java Grove",
  oop: "Object Workshop",
  frontend: "Front-end City",
  typescript: "Type Observatory",
  backend: "Back-end Engine Room",
  data: "Data Vault",
  integration: "Integration Bridge",
  quality: "Quality Summit",
};

export function WorldLandmark({ world, decorative = false }: { world: Landmark; decorative?: boolean }) {
  return <span className={`world-landmark-art ${world}`} role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : landmarkLabels[world]} />;
}

export function ExpeditionBase({ decorative = true }: { decorative?: boolean }) {
  return <span className="expedition-base-art" role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : "ฐานฝึกเขียนโปรแกรมยามค่ำคืนของ Sea’s Full-stack Quest"} />;
}
