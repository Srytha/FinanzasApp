import { useState } from "react";
import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";
import { Presupuesto } from "../types";

interface EditarPresupuestoScreenProps {
  presupuesto: Presupuesto;
  onGuardar: (presupuesto: Presupuesto) => void;
  onCancelar: () => void;
  onEliminar: (id: number) => void;
  isLoading?: boolean;  // Agregar esta línea
}

export default function EditarPresupuestoScreen({ 
  presupuesto, 
  onGuardar, 
  onCancelar, 
  onEliminar, 
  isLoading 
}: EditarPresupuestoScreenProps) {
  const [form, setForm] = useState<Presupuesto>({ ...presupuesto });
  const set = (k: keyof Presupuesto, v: any) => setForm((f) => ({ ...f, [k]: v }));
  
  return (
    <div style={s.screen}>
      <BackRow label="Editar presupuesto" onBack={onCancelar} />
      <p style={s.label}>Nombre del presupuesto</p>
      <input 
        style={s.input} 
        value={form.nombre} 
        onChange={(e) => set("nombre", e.target.value)}
        disabled={isLoading}
      />
      <p style={s.label}>Nuevo límite</p>
      <input 
        style={s.input} 
        type="number" 
        value={form.limite} 
        onChange={(e) => set("limite", e.target.value)}
        disabled={isLoading}
      />
      <p style={{ fontSize: 11, color: "#888", marginBottom: 12, marginTop: -10 }}>Modificar el límite no elimina los gastos ya registrados.</p>
      <p style={s.label}>Editar fecha:</p>
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
      <p style={s.label}>Cambiar de categoría</p>
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
            <p style={{ fontSize: 13, fontWeight: 600 }}>Notificaciones activas</p>
            <p style={{ fontSize: 11, color: "#888" }}>Desactiva si no deseas recibir alertas</p>
          </div>
          <div 
            style={s.toggle(form.notificaciones)} 
            onClick={() => !isLoading && set("notificaciones", !form.notificaciones)}
          >
            <div style={s.toggleDot} />
          </div>
        </div>
      </div>
      <button 
        style={{ ...s.btnPrimary, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }} 
        onClick={() => onGuardar(form)}
        disabled={isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar cambios"}
      </button>
      <button 
        style={s.btnSecondary} 
        onClick={onCancelar}
        disabled={isLoading}
      >
        Cancelar
      </button>
      <button 
        style={s.btnDanger} 
        onClick={() => onEliminar(presupuesto.id)}
        disabled={isLoading}
      >
        Eliminar presupuesto
      </button>
    </div>
  );
}