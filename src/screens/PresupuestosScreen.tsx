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
  
  return (
    <div style={s.screen}>
      <div style={{ ...s.row, marginBottom: 16 }}>
        <span style={s.pageTitle}>Presupuestos</span>
        <button style={s.newBtn} onClick={onNuevo}>＋ Nuevo</button>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Mis presupuestos</p>
      <p style={{ ...s.pageDesc, marginBottom: 12 }}>Estos son tus presupuestos definidos para la semana:</p>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Filtrar por categoría</p>
      <SelectWrap value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Elige una categoría">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      {filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", fontSize: 13 }}>Sin presupuestos creados</div>
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