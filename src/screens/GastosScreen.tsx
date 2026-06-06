import { useState } from "react";
import { s } from "../components/styles";
import SelectWrap from "../components/SelectWrap";
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
  
  return (
    <div style={s.screen}>
      <div style={{ ...s.row, marginBottom: 16 }}>
        <span style={s.pageTitle}>Gastos</span>
        <button style={s.newBtn} onClick={onNuevo}>＋ Nuevo</button>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Mis gastos</p>
      <p style={{ ...s.pageDesc, marginBottom: 12 }}>Estos han sido tus movimientos durante la última semana.</p>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Filtrar por categoría</p>
      <SelectWrap value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Elige una categoría">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
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