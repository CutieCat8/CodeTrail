export function PixelCat({ small = false }: { small?: boolean }) {
  return (
    <div className={`pixel-cat ${small ? "small" : ""}`} aria-label="แมวนักสำรวจระบบ" role="img">
      <span className="ear left" /><span className="ear right" />
      <span className="face"><i /><i /><b /></span>
      <span className="body" /><span className="tail" />
    </div>
  );
}
