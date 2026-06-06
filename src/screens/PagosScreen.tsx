import { useState } from "react";
import { s } from "../components/styles";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";
import { Pago } from "../types";

interface PagosScreenProps {
  pagos: Pago[];
  onNuevo: () => void;
  onEditar: (pago: Pago) => void;
}

export default function PagosScreen({ pagos, onNuevo, onEditar }: PagosScreenProps) {
  const [filtro, setFiltro] = useState<string>("");
  const filtrados = filtro ? pagos.filter((p) => p.categoria === filtro) : pagos;
  
  // Mostrar empty state simple si no hay pagos
  if (pagos.length === 0) {
    return (
      <div style={{ ...s.screen, padding: "16px 24px 12px" }}>
        <div style={{ ...s.row, marginBottom: 16 }}>
          <span style={s.pageTitle}>Lista de pagos</span>
          <button 
            onClick={onNuevo}
            style={{
              background: "#e0e0e0",
              border: "none",
              borderRadius: 20,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              color: "#333",
              boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)",
              transition: "all 0.1s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "inset 0 -2px 0 rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "inset 0 -2px 0 rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(1px)";
              e.currentTarget.style.boxShadow = "inset 0 0 0 rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "inset 0 -2px 0 rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: "#333" }}>+</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#333" }}>Nuevo</span>
          </button>
        </div>
        <p style={s.pageDesc}>Aquí podrás empezar a llevar un registro de tus pagos</p>
        <div style={{
          background: "#f5f5f5",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          textAlign: "center",
          minHeight: 400,
        }}>
          {/* Texto descriptivo - reserva el mismo alto visual que la pantalla de presupuestos */}
          <div style={{ minHeight: 54, display: "flex", alignItems: "center", marginBottom: 34 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#555", textAlign: "center", lineHeight: 1.5 }}>
              Cada pago nuevo que realices lo verás en esta pantalla.
            </p>
          </div>
          
          {/* Illustration */}
          <div style={{ fontSize: 64, marginBottom: 16 }}>🧾</div>
          
          {/* CTA Text */}
          <p style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
            Inicia con tu primer pago
          </p>
          
          {/* Plus Button */}
          <button 
            onClick={onNuevo}
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "#1a1a1a",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              margin: "0 auto",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ＋
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ ...s.screen, padding: "16px 24px 12px" }}>
      <div style={{ ...s.row, marginBottom: 16 }}>
        <span style={s.pageTitle}>Lista de pagos</span>
        <button 
          onClick={onNuevo}
          style={{
            background: "#e0e0e0",
            border: "none",
            borderRadius: 20,
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            color: "#333",
            boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)",
            transition: "all 0.1s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "inset 0 -2px 0 rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "inset 0 -2px 0 rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(1px)";
            e.currentTarget.style.boxShadow = "inset 0 0 0 rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.05)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "inset 0 -2px 0 rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: "#333" }}>+</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#333" }}>Nuevo</span>
        </button>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Mis pagos</p>
      <p style={{ ...s.pageDesc, marginBottom: 12 }}>Estos son tus pagos definidos para la semana:</p>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Filtrar por categoría</p>
      <SelectWrap value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Elige una categoría">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      {filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", fontSize: 13 }}>
          No hay pagos en esta categoría
        </div>
      ) : (
        filtrados.map((p) => (
          <div key={p.id} style={s.gastoCard}>
            <div style={s.row}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{p.nombre} <span style={{ fontWeight: 400, color: "#888" }}>({p.categoria})</span></span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>$ {parseFloat(p.monto).toFixed(2)}</span>
                <button style={s.editBtn} onClick={() => onEditar(p)}>✏️</button>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{p.fecha}</p>
          </div>
        ))
      )}
    </div>
  );
}