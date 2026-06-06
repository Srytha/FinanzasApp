import { ReactNode, ChangeEvent } from "react";
import { s } from "./styles";

interface SelectWrapProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  children: ReactNode;
}

export default function SelectWrap({ value, onChange, placeholder, children }: SelectWrapProps) {
  return (
    <div style={{ position: "relative", marginBottom: 14 }}>
      <select style={s.select} value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {children}
      </select>
      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: 12 }}>▾</span>
    </div>
  );
}