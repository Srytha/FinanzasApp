import { useState } from "react";
import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";

interface CrearPresupuestoScreenProps {
  onGuardar: (form: any) => void;
  onCancelar: () => void;
  isLoading?: boolean;
}

interface PresupuestoForm {
  nombre: string;
  limite: string;
  fecha: string;
  categoria: string;
  alerta80: boolean;
  alerta100: boolean;
  notificaciones: boolean;
}

// Componente de notificación flotante
const FloatingMessage = ({ message, type }: { message: string; type: "success" | "error" | "loading" }) => {
  const colors = {
    success: { bg: "#4caf50", icon: "✅" },
    error: { bg: "#f44336", icon: "❌" },
    loading: { bg: "#2196f3", icon: "⏳" }
  };

  const colorStyle = colors[type];

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <div
        style={{
          background: colorStyle.bg,
          color: "#fff",
          padding: "12px 20px",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          minWidth: 200,
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 18 }}>{colorStyle.icon}</span>
        <span style={{ fontSize: 12, fontWeight: 500 }}>{message}</span>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default function CrearPresupuestoScreen({ onGuardar, onCancelar, isLoading }: CrearPresupuestoScreenProps) {
  const [form, setForm] = useState<PresupuestoForm>({ 
    nombre: "", 
    limite: "", 
    fecha: "", 
    categoria: "", 
    alerta80: true, 
    alerta100: false, 
    notificaciones: true 
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const set = (k: keyof PresupuestoForm, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleGuardar = async () => {
    if (!form.nombre) {
      setErrorMessage("Por favor ingresa el nombre del presupuesto");
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
      return;
    }
    if (!form.limite || parseFloat(form.limite) <= 0) {
      setErrorMessage("Por favor ingresa un límite válido");
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
      return;
    }
    if (!form.fecha) {
      setErrorMessage("Por favor selecciona una fecha");
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
      return;
    }

    setLocalLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    onGuardar(form);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1200);
  };

  const fieldStyle = { marginBottom: 16 };
  const labelStyle = { ...s.label, marginBottom: 4, fontSize: 12 };
  const inputStyle = { ...s.input, marginBottom: 0, padding: "8px 10px", fontSize: 12 };
  
  return (
    <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <BackRow label="Crear presupuesto" onBack={onCancelar} />
      </div>

      {/* Nombre del presupuesto */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Nombre del presupuesto</p>
        <input 
          style={inputStyle} 
          placeholder="Almuerzos" 
          value={form.nombre} 
          onChange={(e) => set("nombre", e.target.value)}
          disabled={localLoading || isLoading}
        />
      </div>

      {/* Límite de gasto */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Límite de gasto</p>
        <input 
          style={inputStyle} 
          placeholder="$120.000" 
          type="number" 
          value={form.limite} 
          onChange={(e) => set("limite", e.target.value)}
          disabled={localLoading || isLoading}
        />
      </div>

      {/* Fecha del presupuesto */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Fecha del presupuesto</p>
        <input 
          style={inputStyle} 
          type="date" 
          value={form.fecha} 
          onChange={(e) => set("fecha", e.target.value)}
          disabled={localLoading || isLoading}
        />
      </div>

      {/* Categoría */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Categoría</p>
        <SelectWrap 
          value={form.categoria} 
          onChange={(e) => set("categoria", e.target.value)} 
          placeholder="Elige una categoría"
        >
          {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
        </SelectWrap>
      </div>

      {/* Alerta de presupuesto */}
      <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Alerta de presupuesto</p>
      <div style={{ ...s.card, padding: "6px 10px", marginBottom: 8 }}>
        <div style={s.row}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600 }}>Recibir notificaciones</p>
          </div>
          <div 
            style={s.toggle(form.notificaciones)} 
            onClick={() => !localLoading && !isLoading && set("notificaciones", !form.notificaciones)}
          >
            <div style={s.toggleDot} />
          </div>
        </div>
      </div>

      {/* Alertar cuando alcance */}
      <p style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Alertar cuando alcance</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
        <button 
          style={s.alertBtn(form.alerta80)} 
          onClick={() => !localLoading && !isLoading && set("alerta80", !form.alerta80)}
          disabled={localLoading || isLoading}
        >
          80%
        </button>
        <button 
          style={s.alertBtn(form.alerta100)} 
          onClick={() => !localLoading && !isLoading && set("alerta100", !form.alerta100)}
          disabled={localLoading || isLoading}
        >
          100%
        </button>
      </div>
      <p style={{ fontSize: 10, color: "#888", marginBottom: 20 }}>Puedes activar una o ambas alertas</p>

      {/* Botones */}
      <button 
        style={{ 
          ...s.btnPrimary, 
          opacity: (localLoading || isLoading) ? 0.7 : 1, 
          cursor: (localLoading || isLoading) ? "not-allowed" : "pointer",
          padding: "10px",
          fontSize: 13,
          marginBottom: 10
        }} 
        onClick={handleGuardar}
        disabled={localLoading || isLoading}
      >
        {(localLoading || isLoading) ? "Creando..." : "Crear presupuesto"}
      </button>
      
      <button 
        style={{ 
          ...s.btnSecondary, 
          background: "#fff", 
          color: "#111", 
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: 13
        }} 
        onClick={onCancelar}
        disabled={localLoading || isLoading}
      >
        Cancelar
      </button>

      {/* Notificaciones flotantes */}
      {localLoading && <FloatingMessage message="Creando presupuesto..." type="loading" />}
      {showSuccess && <FloatingMessage message="¡Presupuesto creado!" type="success" />}
      {showError && <FloatingMessage message={errorMessage} type="error" />}
    </div>
  );
}