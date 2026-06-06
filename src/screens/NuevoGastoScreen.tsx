import { useState } from "react";
import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";
import { Gasto } from "../types";

interface NuevoGastoScreenProps {
  onGuardar: (form: Omit<Gasto, "id">) => void;
  onCancelar: () => void;
  isLoading?: boolean;
}

interface GastoForm {
  nombre: string;
  valor: string;
  fecha: string;
  categoria: string;
  descripcion: string;
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
          padding: "14px 22px",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          minWidth: 220,
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 20 }}>{colorStyle.icon}</span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{message}</span>
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

export default function NuevoGastoScreen({ onGuardar, onCancelar, isLoading }: NuevoGastoScreenProps) {
  const [form, setForm] = useState<GastoForm>({ nombre: "", valor: "", fecha: "", categoria: "", descripcion: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const set = (k: keyof GastoForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleGuardar = async () => {
    if (!form.nombre) {
      setErrorMessage("Por favor ingresa el nombre del gasto");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    if (!form.valor || parseFloat(form.valor) <= 0) {
      setErrorMessage("Por favor ingresa un valor válido");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    if (!form.fecha) {
      setErrorMessage("Por favor selecciona una fecha");
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    setLocalLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onGuardar(form);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);
  };

  // Estilo uniforme para cada campo
  const fieldStyle = { marginBottom: 20 };
  const labelStyle = { ...s.label, marginBottom: 6, fontSize: 13 };
  const inputStyle = { ...s.input, marginBottom: 0 };

  return (
    <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ marginTop: 20, marginBottom: 24 }}>
        <BackRow label="Nuevo Gasto" onBack={onCancelar} />
      </div>
      
      {/* Campo 1 - Nombre del gasto */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Nombre del gasto</p>
        <input 
          style={inputStyle} 
          placeholder="Ej: Snack matutino" 
          value={form.nombre} 
          onChange={(e) => set("nombre", e.target.value)} 
          disabled={localLoading || isLoading}
        />
      </div>
      
      {/* Campo 2 - Valor del gasto */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Valor del gasto</p>
        <input 
          style={inputStyle} 
          placeholder="$" 
          type="number" 
          value={form.valor} 
          onChange={(e) => set("valor", e.target.value)} 
          disabled={localLoading || isLoading}
        />
      </div>
      
      {/* Campo 3 - Fecha */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Seleccionar fecha:</p>
        <input 
          style={inputStyle} 
          type="date" 
          value={form.fecha} 
          onChange={(e) => set("fecha", e.target.value)} 
          disabled={localLoading || isLoading}
        />
      </div>
      
      {/* Campo 4 - Categoría */}
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
      
      {/* Campo 5 - Descripción */}
      <div style={{ ...fieldStyle, marginBottom: 28 }}>
        <p style={labelStyle}>Descripción</p>
        <input 
          style={inputStyle} 
          placeholder="Agrega una descripción." 
          value={form.descripcion} 
          onChange={(e) => set("descripcion", e.target.value)} 
          disabled={localLoading || isLoading}
        />
      </div>
      
      {/* Botones */}
      <button 
        style={{ 
          ...s.btnGray, 
          opacity: (localLoading || isLoading) ? 0.7 : 1, 
          cursor: (localLoading || isLoading) ? "not-allowed" : "pointer",
          marginBottom: 12
        }} 
        onClick={handleGuardar}
        disabled={localLoading || isLoading}
      >
        {(localLoading || isLoading) ? "Guardando..." : "Guardar"}
      </button>
      
      <button 
        style={{ ...s.btnSecondary, background: "#fff", color: "#111", border: "1px solid #ccc" }} 
        onClick={onCancelar}
        disabled={localLoading || isLoading}
      >
        Cancelar
      </button>

      {/* Notificaciones flotantes */}
      {localLoading && <FloatingMessage message="Guardando gasto..." type="loading" />}
      {showSuccess && <FloatingMessage message="¡Gasto registrado con éxito!" type="success" />}
      {showError && <FloatingMessage message={errorMessage} type="error" />}
    </div>
  );
}