import { Gasto } from "../types";

interface MiniChartProps {
  gastos: Gasto[];
}

export default function MiniChart({ gastos }: MiniChartProps) {
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const vals = days.map((_, i) => {
    const total = gastos.filter((g) => {
      const d = new Date(g.fecha);
      return d.getDay() === (i + 1) % 7;
    }).reduce((a, g) => a + parseFloat(g.valor || "0"), 0);
    return total;
  });
  const max = Math.max(...vals, 1);
  
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60, padding: "0 4px" }}>
      {vals.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", background: v > 0 ? "#555" : "#ddd", borderRadius: 3, height: `${Math.max((v / max) * 48, 4)}px` }} />
          <span style={{ fontSize: 9, color: "#888" }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}