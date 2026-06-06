import { useState } from "react";
import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";
import { Gasto } from "../types";

interface EditarGastoScreenProps {
  gasto: Gasto;
  onGuardar: (gasto: Gasto) => void;
  onCancelar: () => void;
  onEliminar: (id: number) => void;
}

// Componente de notificación flotante
const FloatingMessage = ({ message, type, onClose }: { message: string; type: "success" | "error" | "loading"; onClose: () => void }) => {
  const colors = {
    success: { bg: "#4caf50", icon: "✅" },
    error: { bg: "#f44336", icon: "❌" },
    loading: { bg: "#2196f3", icon: "⏳" }
  };

  const colorStyle = colors[type];

  setTimeout(() => onClose(), 1500);

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
          padding: "16px 28px",
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          minWidth: 240,
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 24 }}>{colorStyle.icon}</span>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{message}</span>
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

export default function EditarGastoScreen({ gasto, onGuardar, onCancelar, onEliminar }: EditarGastoScreenProps) {
  const [form, setForm] = useState<Gasto>({ ...gasto });
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "loading" } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const set = (k: keyof Gasto, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const showNotification = (message: string, type: "success" | "error" | "loading") => {
    setNotification({ message, type });
  };

  const handleGuardar = () => {
    if (!form.nombre) {
      showNotification("Por favor ingresa el nombre del gasto", "error");
      return;
    }
    if (!form.valor || parseFloat(form.valor) <= 0) {
      showNotification("Por favor ingresa un valor válido", "error");
      return;
    }
    if (!form.fecha) {
      showNotification("Por favor selecciona una fecha", "error");
      return;
    }

    showNotification("Guardando cambios...", "loading");
    setTimeout(() => {
      onGuardar(form);
      showNotification("¡Gasto actualizado con éxito!", "success");
    }, 500);
  };

  const handleEliminar = () => {
    showNotification("Eliminando gasto...", "loading");
    setTimeout(() => {
      onEliminar(gasto.id);
      showNotification("¡Gasto eliminado con éxito!", "success");
    }, 500);
  };

  const fieldStyle = { marginBottom: 16 };
  const labelStyle = { ...s.label, marginBottom: 4, fontSize: 12 };
  const inputStyle = { ...s.input, marginBottom: 0, padding: "8px 10px", fontSize: 12 };

  return (
    <div style={{ ...s.screen, paddingLeft: 24, paddingRight: 24 }}>
      <BackRow label="Editar gasto" onBack={onCancelar} />

      {/* Nombre del gasto */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Nombre del gasto</p>
        <input 
          style={inputStyle} 
          value={form.nombre} 
          onChange={(e) => set("nombre", e.target.value)} 
        />
      </div>

      {/* Valor del gasto */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Valor del gasto</p>
        <input 
          style={inputStyle} 
          placeholder="$" 
          type="number" 
          value={form.valor} 
          onChange={(e) => set("valor", e.target.value)} 
        />
      </div>

      {/* Fecha */}
      <div style={fieldStyle}>
        <p style={labelStyle}>Seleccionar fecha:</p>
        <input 
          style={inputStyle} 
          type="date" 
          value={form.fecha} 
          onChange={(e) => set("fecha", e.target.value)} 
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

      {/* Descripción */}
      <div style={{ ...fieldStyle, marginBottom: 24 }}>
        <p style={labelStyle}>Descripción</p>
        <input 
          style={inputStyle} 
          value={form.descripcion} 
          onChange={(e) => set("descripcion", e.target.value)} 
        />
      </div>

      {/* Botón Guardar cambios */}
      <button 
        style={{ 
          ...s.btnGray, 
          padding: "12px",
          fontSize: 14,
          marginBottom: 10,
          width: "100%"
        }} 
        onClick={handleGuardar}
      >
        Guardar cambios
      </button>

      {/* Botón Cancelar */}
      <button 
        style={{ 
          ...s.btnSecondary, 
          background: "#fff", 
          color: "#111", 
          border: "1px solid #ccc",
          padding: "12px",
          fontSize: 14,
          width: "100%",
          marginBottom: 10
        }} 
        onClick={onCancelar}
      >
        Cancelar
      </button>

      {/* Botón Eliminar */}
      <button 
        style={{ 
          ...s.btnDanger, 
          background: "#fff",
          border: "1.5px solid #e05252",
          color: "#e05252",
          padding: "12px",
          fontSize: 14,
          width: "100%"
        }} 
        onClick={() => setShowDeleteConfirm(true)}
      >
        Eliminar gasto
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
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>¿Eliminar gasto?</p>
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

      {/* Notificación flotante */}
      {notification && (
        <FloatingMessage 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
}