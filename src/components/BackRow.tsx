import { ReactNode } from "react";
import { s } from "./styles";

interface BackRowProps {
  label: string;
  onBack: () => void;
  rightEl?: ReactNode;  // Agregar la propiedad opcional rightEl
}

export default function BackRow({ label, onBack, rightEl }: BackRowProps) {
  return (
    <div style={{ ...s.row, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={onBack}>
        <span style={{ fontSize: 18 }}>←</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>{label}</span>
      </div>
      {rightEl}
    </div>
  );
}