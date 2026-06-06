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
    <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
      <BackRow 
        label="Detalle" 
        onBack={onBack} 
        rightEl={
          <button 
            onClick={() => onEditar(gasto)}
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
            <span style={{ fontSize: 16, fontWeight: 600, color: "#333" }}>✏️</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#333" }}>Editar</span>
          </button>
        } 
      />

      {/* Tarjeta principal */}
      <div style={{ 
        ...s.card, 
        marginBottom: 20,
        borderRadius: 16,
        padding: "20px 16px",
        textAlign: "center"
      }}>
        {/* Categoría - centrada */}
        <div style={{
          display: "inline-block",
          background: "#f0f0f0",
          padding: "4px 16px",
          borderRadius: 20,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#555" }}>{gasto.categoria}</span>
        </div>
        
        {/* Nombre del gasto */}
        <p style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 12 }}>
          {gasto.nombre}
        </p>
        
        {/* Valor - negro en negrilla */}
        <p style={{ fontSize: 32, fontWeight: 700, color: "#111", marginBottom: 16 }}>
          $ {parseFloat(gasto.valor).toFixed(2)}
        </p>
        
        {/* Descripción */}
        <div style={{ borderTop: "1px solid #e0e0e0", paddingTop: 12 }}>
          <p style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Descripción</p>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>
            {gasto.descripcion || "Sin descripción"}
          </p>
        </div>
      </div>

      {/* Información de fecha - más compacta */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 12, 
        padding: "12px 16px",
        background: "#f9f9f9",
        borderRadius: 12,
      }}>
        {/* Icono de calendario SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#555" }}>Fecha:</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{gasto.fecha}</span>
        </div>
      </div>
    </div>
  );
}