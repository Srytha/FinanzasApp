import { useState } from "react";
import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";

interface CrearPresupuestoScreenProps {
  onGuardar: (form: any) => void;
  onCancelar: () => void;
  isLoading?: boolean;  // Agregar esta línea
}

interface PresupuestoForm {
  nombre: string;
  limite: string;
  fechaInicio: string;
  fechaFin: string;
  categoria: string;
  alerta80: boolean;
  alerta100: boolean;
  notificaciones: boolean;
}

export default function CrearPresupuestoScreen({ onGuardar, onCancelar, isLoading }: CrearPresupuestoScreenProps) {
  const [form, setForm] = useState<PresupuestoForm>({ 
    nombre: "", 
    limite: "", 
    fechaInicio: "", 
    fechaFin: "", 
    categoria: "", 
    alerta80: true, 
    alerta100: false, 
    notificaciones: true 
  });
  const set = (k: keyof PresupuestoForm, v: any) => setForm((f) => ({ ...f, [k]: v }));
  
  return (
    <div style={s.screen}>
      <BackRow label="Crear presupuesto" onBack={onCancelar} />
      <p style={s.label}>Nombre del presupuesto</p>
      <input 
        style={s.input} 
        placeholder="Almuerzos" 
        value={form.nombre} 
        onChange={(e) => set("nombre", e.target.value)}
        disabled={isLoading}
      />
      <p style={s.label}>Límite de gasto</p>
      <input 
        style={s.input} 
        placeholder="$120.000" 
        type="number" 
        value={form.limite} 
        onChange={(e) => set("limite", e.target.value)}
        disabled={isLoading}
      />
      <p style={s.label}>Seleccionar fecha:</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input 
          style={{ ...s.input, marginBottom: 0, flex: 1 }} 
          type="date" 
          value={form.fechaInicio} 
          onChange={(e) => set("fechaInicio", e.target.value)}
          disabled={isLoading}
        />
        <input 
          style={{ ...s.input, marginBottom: 0, flex: 1 }} 
          type="date" 
          value={form.fechaFin} 
          onChange={(e) => set("fechaFin", e.target.value)}
          disabled={isLoading}
        />
      </div>
      <p style={s.label}>Categoría</p>
      <SelectWrap 
        value={form.categoria} 
        onChange={(e) => set("categoria", e.target.value)} 
        placeholder="Elige una categoría"
      >
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Alerta de presupuesto</p>
      <div style={{ ...s.card, padding: "12px 14px" }}>
        <div style={s.row}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600 }}>Recibir notificaciones</p>
            <p style={{ fontSize: 11, color: "#888" }}>Activa o desactiva las alertas de este presupuesto</p>
          </div>
          <div 
            style={s.toggle(form.notificaciones)} 
            onClick={() => !isLoading && set("notificaciones", !form.notificaciones)}
          >
            <div style={s.toggleDot} />
          </div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Alertar cuando alcance</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
        <button 
          style={s.alertBtn(form.alerta80)} 
          onClick={() => !isLoading && set("alerta80", !form.alerta80)}
          disabled={isLoading}
        >
          80% del límite
        </button>
        <button 
          style={s.alertBtn(form.alerta100)} 
          onClick={() => !isLoading && set("alerta100", !form.alerta100)}
          disabled={isLoading}
        >
          100% del límite
        </button>
      </div>
      <p style={{ fontSize: 11, color: "#888", marginBottom: 16 }}>Puedes activar una o ambas alertas.</p>
      <button 
        style={{ ...s.btnPrimary, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }} 
        onClick={() => onGuardar(form)}
        disabled={isLoading}
      >
        {isLoading ? "Creando..." : "Crear presupuesto"}
      </button>
      <button 
        style={s.btnSecondary} 
        onClick={onCancelar}
        disabled={isLoading}
      >
        Cancelar
      </button>
    </div>
  );
}