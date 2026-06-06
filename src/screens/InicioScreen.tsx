import { s } from "../components/styles";

export default function InicioScreen() {
  return (
    <div style={s.screen}>
      <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#111" }}>¡Hola, Nombre!</p>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Controlar tu dinero es el primer paso hacia tu libertad financiera.</p>
      <div style={s.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span>💡</span><span style={{ fontWeight: 700, fontSize: 13 }}>Tip financiero del día</span>
        </div>
        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>Empieza registrando tus gastos diarios, incluso los pequeños.</p>
      </div>
      <div style={s.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span>⚡</span><span style={{ fontWeight: 700, fontSize: 13 }}>Tips rápidos</span>
        </div>
        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.8 }}>• Registra todo{"\n"}• Revisa tus gastos semanalmente{"\n"}• Define presupuestos</p>
      </div>
      <div style={{ ...s.card, background: "#f9f9f9" }}>
        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>Utiliza el menú inferior para navegar por la app y comenzar a registrar gastos, crear presupuestos y ver tus informes financieros.</p>
      </div>
    </div>
  );
}