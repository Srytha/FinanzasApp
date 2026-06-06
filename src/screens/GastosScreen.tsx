import { useState } from "react";
import { s } from "../components/styles";
import { categorias } from "../data/categorias";
import { Gasto } from "../types";

interface GastosScreenProps {
  gastos: Gasto[];
  onNuevo: () => void;
  onEditar: (gasto: Gasto) => void;
  onDetalle: (gasto: Gasto) => void;
}

export default function GastosScreen({ gastos, onNuevo, onEditar, onDetalle }: GastosScreenProps) {
  const [filtro, setFiltro] = useState<string>("");
  const filtrados = filtro ? gastos.filter((g) => g.categoria === filtro) : gastos;

  if (!gastos) {
    return <div style={s.screen}>Cargando...</div>;
  }

  return (
    <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ ...s.row, marginTop: 8, marginBottom: 16 }}>
        <span style={s.pageTitle}>Gastos</span>
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

      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Mis gastos</p>
      <p style={{ ...s.pageDesc, marginBottom: 12 }}>Estos han sido tus movimientos durante la última semana.</p>

      <div style={{ position: "relative", marginBottom: 14 }}>
        <select style={s.select} value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Elige una categoría</option>
          {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: 12 }}>▾</span>
      </div>

      {filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", fontSize: 13 }}>Sin gastos registrados</div>
      ) : (
        filtrados.map((g) => (
          <div key={g.id} style={s.gastoCard}>
            <div style={s.row}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{g.nombre} <span style={{ fontWeight: 400, color: "#888" }}>({g.categoria})</span></span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>$ {parseFloat(g.valor).toFixed(2)}</span>
            </div>
            <p style={{ fontSize: 11, color: "#888", margin: "4px 0 8px" }}>{g.fecha}</p>
            <div style={s.row}>
              <button style={s.detailBtn} onClick={() => onDetalle(g)}>＋ Detalle</button>
              <button style={s.editBtn} onClick={() => onEditar(g)}>✏️</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}