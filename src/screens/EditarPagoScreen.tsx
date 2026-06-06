import { useState } from "react";
import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";
import { Pago } from "../types";

interface EditarPagoScreenProps {
  pago: Pago;
  onGuardar: (pago: Pago) => void;
  onCancelar: () => void;
  onEliminar: (id: number) => void;
  isLoading?: boolean;
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

export default function EditarPagoScreen({ pago, onGuardar, onCancelar, onEliminar, isLoading }: EditarPagoScreenProps) {
  const [form, setForm] = useState<Pago>({ ...pago });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const set = (k: keyof Pago, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleGuardar = async () => {
    if (!form.monto || parseFloat(form.monto) <= 0) {
      setErrorMessage("Por favor ingresa un monto válido");
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
      return;
    }
    if (!form.nombre) {
      setErrorMessage("Por favor ingresa qué vas a pagar");
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

  const handleEliminar = async () => {
    setLocalLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    onEliminar(pago.id);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1200);
  };

  const fieldStyle = { marginBottom: 16 };
  const labelStyle = { ...s.label, marginBottom: 4, fontSize: 12 };
  const inputStyle = { ...s.input, marginBottom: 0, padding: "8px 10px", fontSize: 12 };

  return (
    <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <BackRow label="Editar Pago" onBack={onCancelar} />
      </div>

      {/* Monto a Pagar */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Monto a Pagar</p>
        <input 
          style={inputStyle} 
          placeholder="$ 1.00" 
          type="number" 
          value={form.monto} 
          onChange={(e) => set("monto", e.target.value)}
          disabled={localLoading || isLoading}
        />
      </div>

      {/* ¿Qué vas a pagar? */}
      <div style={fieldStyle}>
        <p style={labelStyle}>¿Qué vas a pagar?</p>
        <input 
          style={inputStyle} 
          value={form.nombre} 
          onChange={(e) => set("nombre", e.target.value)}
          disabled={localLoading || isLoading}
        />
      </div>

      {/* Fecha de vencimiento */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Fecha de vencimiento</p>
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

      {/* Alerta de pago - COMPACTA */}
      <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Alerta de pago</p>
      <div style={{ ...s.card, padding: "6px 10px", marginBottom: 16 }}>
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

      {/* Botones - más anchos */}
      <button 
        style={{ 
          ...s.btnPrimary, 
          opacity: (localLoading || isLoading) ? 0.7 : 1, 
          cursor: (localLoading || isLoading) ? "not-allowed" : "pointer",
          padding: "12px",
          fontSize: 14,
          marginBottom: 10,
          width: "100%"
        }} 
        onClick={handleGuardar}
        disabled={localLoading || isLoading}
      >
        {(localLoading || isLoading) ? "Guardando..." : "Guardar Cambios"}
      </button>

      <button 
        style={{ 
          ...s.btnSecondary, 
          background: "#fff", 
          color: "#111", 
          border: "1px solid #ccc",
          padding: "12px",
          fontSize: 14,
          marginBottom: 10,
          width: "100%"
        }} 
        onClick={onCancelar}
        disabled={localLoading || isLoading}
      >
        Cancelar
      </button>

      <button 
        style={{ 
          ...s.btnDanger, 
          opacity: (localLoading || isLoading) ? 0.7 : 1, 
          cursor: (localLoading || isLoading) ? "not-allowed" : "pointer",
          background: "#fff",
          border: "1.5px solid #e05252",
          color: "#e05252",
          padding: "12px",
          fontSize: 14,
          width: "100%"
        }} 
        onClick={() => setShowDeleteConfirm(true)}
        disabled={localLoading || isLoading}
      >
        Eliminar pago
      </button>

      {/* Confirmación de eliminación */}
      {showDeleteConfirm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1001,
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            width: "80%",
            maxWidth: 260,
            textAlign: "center",
          }}>
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>¿Eliminar pago?</p>
            <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 12
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  border: "none",
                  background: "#e05252",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 12
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificaciones flotantes */}
      {localLoading && <FloatingMessage message="Guardando cambios..." type="loading" />}
      {showSuccess && <FloatingMessage message="¡Pago actualizado!" type="success" />}
      {showError && <FloatingMessage message={errorMessage} type="error" />}
    </div>
  );
}