import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import { Gasto } from "../types";

interface DetalleGastoScreenProps {
  gasto: Gasto;
  onBack: () => void;
  onEditar: (gasto: Gasto) => void;
}

export default function DetalleGastoScreen({ gasto, onBack, onEditar }: DetalleGastoScreenProps) {
  return (
    <div style={s.screen}>
      <BackRow 
        label="Detalle" 
        onBack={onBack} 
        rightEl={<button style={s.newBtn} onClick={() => onEditar(gasto)}>＋ Editar</button>} 
      />
      <div style={s.card}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#888", marginBottom: 8 }}>
          {gasto.nombre} <span style={{ fontWeight: 400 }}>({gasto.categoria})</span>
        </p>
        <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
          $ {parseFloat(gasto.valor).toFixed(2)}
        </p>
        <p style={{ fontSize: 13, color: "#888" }}>
          {gasto.descripcion || "Sin descripción"}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
        <span style={{ fontSize: 20 }}>📅</span>
        <div>
          <p style={{ fontSize: 11, color: "#888" }}>Fecha</p>
          <p style={{ fontSize: 13, fontWeight: 500 }}>{gasto.fecha}</p>
        </div>
      </div>
    </div>
  );
}