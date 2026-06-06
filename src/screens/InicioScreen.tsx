import { s } from "../components/styles";

interface InicioScreenProps {
  nombre: string;
  hasData: boolean;
  onRegistrarGasto: () => void;
  onCrearPresupuesto: () => void;
  onProgramarPago: () => void;
}

const moneyFormatter = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function ActionButton({
  label,
  onClick,
  variant,
}: {
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary" | "gray";
}) {
  const baseStyle = {
    width: "100%",
    border: "none",
    borderRadius: 12,
    padding: "11px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
  } as const;

  const variantStyle =
    variant === "primary"
      ? { background: "#1a5c6e", color: "#fff" }
      : variant === "secondary"
        ? { background: "#2a8fa8", color: "#fff" }
        : { background: "#ebebeb", color: "#222" };

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...variantStyle }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.08)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(1px)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
    >
      {label}
    </button>
  );
}

export default function InicioScreen({
  nombre,
  hasData,
  onRegistrarGasto,
  onCrearPresupuesto,
  onProgramarPago,
}: InicioScreenProps) {
  if (!hasData) {
    return (
      <div style={{ ...s.screen, padding: "16px 24px 12px", background: "linear-gradient(180deg, #efefef 0%, #ffffff 14%)" }}>
        
        <p style={{ fontSize: 23, fontWeight: 800, marginBottom: 12, color: "#111" }}>¡Hola, {nombre}!</p>

        <div style={{ ...s.card, padding: "14px 14px 12px", marginBottom: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 10 }}>Total gastado esta semana:</p>
          <div style={{ background: "#fbfbfb", border: "1px solid #f0f0f0", borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 6 }}>$ {moneyFormatter.format(0)}</p>
          </div>
        </div>

        <div style={{ ...s.card, padding: "18px 14px", marginBottom: 12, textAlign: "center" }}>
          <p style={{ fontSize: 16, color: "#444", lineHeight: 1.25, marginBottom: 18 }}>Agrega tu primer movimiento para comenzar</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 180, margin: "0 auto" }}>
            <ActionButton label="Registrar gasto" onClick={onRegistrarGasto} variant="primary" />
            <ActionButton label="Crear presupuesto" onClick={onCrearPresupuesto} variant="secondary" />
            <ActionButton label="Programar pago" onClick={onProgramarPago} variant="gray" />
          </div>
        </div>

        <div style={{ ...s.card, padding: "12px 14px 14px" }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#111", marginBottom: 6, paddingBottom: 8, borderBottom: "1px solid #e6eef2" }}>Sin actividad todavía</p>
          <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>Cuando registres gastos o pagos, aparecerán aquí para mostrar tu resumen.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...s.screen, padding: "16px 24px 12px" }}>
      <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#111" }}>¡Hola, {nombre}!</p>
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
        <div style={{ fontSize: 12, color: "#666", lineHeight: 2 }}>
          <div style={{ marginBottom: 4 }}>• Registra todo</div>
          <div style={{ marginBottom: 4 }}>• Revisa tus gastos semanalmente</div>
          <div>• Define presupuestos</div>
        </div>
      </div>
      <div style={{ ...s.card, background: "#f9f9f9" }}>
        <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>Utiliza el menú inferior para navegar por la app y comenzar a registrar gastos, crear presupuestos y ver tus informes financieros.</p>
      </div>
    </div>
  );
}