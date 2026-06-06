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
  
  return (
    <div style={s.screen}>
      <div style={{ ...s.row, marginBottom: 16 }}>
        <span style={s.pageTitle}>Lista de pagos</span>
        <button style={s.newBtn} onClick={onNuevo}>＋ Nuevo</button>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Mis pagos</p>
      <p style={{ ...s.pageDesc, marginBottom: 12 }}>Estos son tus pagos definidos para la semana:</p>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Filtrar por categoría</p>
      <SelectWrap value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Elige una categoría">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      {filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", fontSize: 13 }}>Sin pagos registrados</div>
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