import { useState } from "react";
import { s } from "../components/styles";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";
import { Presupuesto } from "../types";

interface PresupuestosScreenProps {
  presupuestos: Presupuesto[];
  onNuevo: () => void;
  onEditar: (presupuesto: Presupuesto) => void;
}

export default function PresupuestosScreen({ presupuestos, onNuevo, onEditar }: PresupuestosScreenProps) {
  const [filtro, setFiltro] = useState<string>("");
  const filtrados = filtro ? presupuestos.filter((p) => p.categoria === filtro) : presupuestos;
  
  // Mostrar empty state si no hay presupuestos
  if (presupuestos.length === 0) {
    return (
      <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ ...s.row, marginTop: 8, marginBottom: 16 }}>
          <span style={s.pageTitle}>Presupuestos</span>
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
        <p style={s.pageDesc}>Aquí podrás establecer tus presupuestos semanales:</p>
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
          {/* Texto que estaba dentro del cuadro - ahora sin cuadro */}
          <p style={{ margin: "0 0 40px 0", fontSize: 13, color: "#555", textAlign: "center", lineHeight: 1.5 }}>
            Llevar un presupuesto te permitirá mantener un mejor control en tus pagos y tus gastos.
          </p>
          
          {/* Illustration */}
          <div style={{ fontSize: 64, marginBottom: 16 }}>📊</div>
          
          {/* CTA Text */}
          <p style={{ fontSize: 14, color: "#888", marginBottom: 20 }}>
            Crea tu primer presupuesto
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
    <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ ...s.row, marginTop: 8, marginBottom: 16 }}>
        <span style={s.pageTitle}>Presupuestos</span>
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
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Mis presupuestos</p>
      <p style={{ ...s.pageDesc, marginBottom: 12 }}>Estos son tus presupuestos definidos para la semana:</p>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Filtrar por categoría</p>
      <SelectWrap value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Elige una categoría">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      {filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", fontSize: 13 }}>
          No hay presupuestos en esta categoría
        </div>
      ) : (
        filtrados.map((p) => {
          const pct = Math.round((parseFloat(p.gastado || "0") / parseFloat(p.limite)) * 100);
          return (
            <div key={p.id} style={s.gastoCard}>
              <div style={s.row}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{p.nombre} <span style={{ fontWeight: 400, color: "#888" }}>({p.categoria})</span></span>
                <button style={s.editBtn} onClick={() => onEditar(p)}>✏️</button>
              </div>
              <p style={{ fontSize: 11, color: "#888", margin: "4px 0 2px" }}>Gastado ${parseFloat(p.gastado || "0").toLocaleString()}</p>
              <p style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>Disponible: ${(parseFloat(p.limite) - parseFloat(p.gastado || "0")).toLocaleString()} de ${parseFloat(p.limite).toLocaleString()}</p>
              <div style={{ background: "#e0e0e0", borderRadius: 4, height: 8, marginBottom: 4 }}>
                <div style={s.progressBar(pct)} />
              </div>
              <p style={{ fontSize: 11, textAlign: "right", color: pct > 100 ? "#e05252" : "#555" }}>{pct}%</p>
            </div>
          );
        })
      )}
    </div>
  );
}