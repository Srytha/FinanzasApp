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

export default function NuevoGastoScreen({ onGuardar, onCancelar, isLoading }: NuevoGastoScreenProps) {
  const [form, setForm] = useState<GastoForm>({ nombre: "", valor: "", fecha: "", categoria: "", descripcion: "" });
  const set = (k: keyof GastoForm, v: string) => setForm((f) => ({ ...f, [k]: v }));
  
  return (
    <div style={s.screen}>
      <BackRow label="Nuevo Gasto" onBack={onCancelar} />
      <p style={s.label}>Nombre del gasto</p>
      <input 
        style={s.input} 
        placeholder="Ej: Snack matutino" 
        value={form.nombre} 
        onChange={(e) => set("nombre", e.target.value)} 
        disabled={isLoading}
      />
      <p style={s.label}>Valor del gasto</p>
      <input 
        style={s.input} 
        placeholder="$" 
        type="number" 
        value={form.valor} 
        onChange={(e) => set("valor", e.target.value)} 
        disabled={isLoading}
      />
      <p style={s.label}>Seleccionar fecha:</p>
      <input 
        style={s.input} 
        type="date" 
        value={form.fecha} 
        onChange={(e) => set("fecha", e.target.value)} 
        disabled={isLoading}
      />
      <p style={s.label}>Categoría</p>
      <SelectWrap 
        value={form.categoria} 
        onChange={(e) => set("categoria", e.target.value)} 
        placeholder="Elige una categoría"
      >
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      <p style={s.label}>Descripción</p>
      <input 
        style={s.input} 
        placeholder="Agrega una descripción. Ejemplo: snack matutino" 
        value={form.descripcion} 
        onChange={(e) => set("descripcion", e.target.value)} 
        disabled={isLoading}
      />
      <button 
        style={{ ...s.btnGray, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }} 
        onClick={() => onGuardar(form)}
        disabled={isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
      <button 
        style={{ ...s.btnSecondary, background: "#fff", color: "#111", border: "1px solid #ccc" }} 
        onClick={onCancelar}
        disabled={isLoading}
      >
        Cancelar
      </button>
    </div>
  );
}