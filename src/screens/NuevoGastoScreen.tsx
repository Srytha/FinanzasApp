import { useState } from "react";
import { s } from "../components/styles";
import BackRow from "../components/BackRow";
import SelectWrap from "../components/SelectWrap";
import { categorias } from "../data/categorias";
import { Gasto } from "../types";

interface NuevoGastoScreenProps {
  onGuardar: (form: Omit<Gasto, "id">) => void;
  onCancelar: () => void;
}

interface GastoForm {
  nombre: string;
  valor: string;
  fecha: string;
  categoria: string;
  descripcion: string;
}

export default function NuevoGastoScreen({ onGuardar, onCancelar }: NuevoGastoScreenProps) {
  const [form, setForm] = useState<GastoForm>({ nombre: "", valor: "", fecha: "", categoria: "", descripcion: "" });
  const set = (k: keyof GastoForm, v: string) => setForm((f) => ({ ...f, [k]: v }));
  
  return (
    <div style={s.screen}>
      <BackRow label="Nuevo Gasto" onBack={onCancelar} />
      <p style={s.label}>Nombre del gasto</p>
      <input style={s.input} placeholder="Ej: Matrícula" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
      <p style={s.label}>Valor del gasto</p>
      <input style={s.input} placeholder="$" type="number" value={form.valor} onChange={(e) => set("valor", e.target.value)} />
      <p style={s.label}>Seleccionar fecha:</p>
      <input style={s.input} type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} />
      <p style={s.label}>Categoría</p>
      <SelectWrap value={form.categoria} onChange={(e) => set("categoria", e.target.value)} placeholder="Elige una categoría o crea una nueva">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      <p style={s.label}>Descripción</p>
      <input style={s.input} placeholder="Ej: Matrícula del semestre I..." value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} />
      <button style={s.btnGray} onClick={() => onGuardar(form)}>Guardar</button>
      <button style={{ ...s.btnSecondary, background: "#fff", color: "#111", border: "1px solid #ccc" }} onClick={onCancelar}>Cancelar</button>
    </div>
  );
}