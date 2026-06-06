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
  const screenStyle = {
    ...s.screen,
    padding: "16px 24px 12px",
    overflowY: gastos.length === 0 ? "hidden" : "auto",
  } as const;

  if (!gastos) {
    return <div style={s.screen}>Cargando...</div>;
  }

  return (
    <div style={screenStyle}>
      <div style={{ ...s.row, marginBottom: 16 }}>
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

      {gastos.length > 0 ? (
        <p style={{ ...s.pageDesc, marginBottom: 12 }}>Estos han sido tus movimientos durante la última semana.</p>
      ) : (
        <p style={{ ...s.pageDesc, marginBottom: 12 }}>Aquí podrás empezar a llevar un registro de tus gastos</p>
      )}

      {gastos.length === 0 ? (
        <div style={{ background: "#f5f5f5", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center", minHeight: 400 }}>
          <p style={{ margin: "0 0 40px 0", fontSize: 13, color: "#555", textAlign: "center", lineHeight: 1.5 }}>
            Cada gasto nuevo que registres lo verás en esta pantalla.
          </p>

          <div style={{ fontSize: 64, marginBottom: 16 }}>💸</div>

          <p style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
            Inicia con tu nuevo gasto
          </p>

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
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}