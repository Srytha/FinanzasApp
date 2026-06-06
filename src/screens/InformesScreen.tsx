import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import MiniChart from "./MiniChart";
import { Gasto, Presupuesto } from "../types";

interface InformesScreenProps {
  gastos: Gasto[];
  presupuestos: Presupuesto[];
}

export default function InformesScreen({ gastos, presupuestos }: InformesScreenProps) {
  const total = gastos.reduce((acc, g) => acc + parseFloat(g.valor || "0"), 0);
  
  return (
    <div style={{ ...s.screen, padding: "16px 24px 12px" }}>
      <BackRow label="Informe de movimientos" onBack={() => {}} />
      <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>Aquí está tu resumen semanal:</p>
      <div style={s.card}>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Total gastado esta semana:</p>
        <p style={{ fontSize: 22, fontWeight: 500 }}>$ {total.toFixed(2)}</p>
      </div>
      {presupuestos.length > 0 && (
        <div style={s.card}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Presupuestos</p>
          {presupuestos.map((p) => {
            const gastado = parseFloat(p.gastado || "0");
            const limite = parseFloat(p.limite);
            const pct = Math.round((gastado / limite) * 100);
            return (
              <div key={p.id} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{p.categoria}</p>
                <p style={{ fontSize: 11, color: "#888", margin: "2px 0 6px" }}>${gastado.toLocaleString()} / ${limite.toLocaleString()}</p>
                <div style={{ background: "#e0e0e0", borderRadius: 4, height: 8, marginBottom: 2, display: "flex", alignItems: "center" }}>
                  <div style={{ ...s.progressBar(pct), transition: "width 0.3s" }} />
                </div>
                <p style={{ fontSize: 11, textAlign: "right", color: pct > 100 ? "#e05252" : "#555" }}>{pct}%</p>
              </div>
            );
          })}
        </div>
      )}
      <div style={s.card}>
        <p style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Así se ha estado comportando tu dinero en los últimos 7 días:</p>
        <MiniChart gastos={gastos} />
      </div>
    </div>
  );
}