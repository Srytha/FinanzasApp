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

export default function EditarGastoScreen({ gasto, onGuardar, onCancelar, onEliminar }: EditarGastoScreenProps) {
  const [form, setForm] = useState<Gasto>({ ...gasto });
  const set = (k: keyof Gasto, v: string) => setForm((f) => ({ ...f, [k]: v }));
  
  return (
    <div style={s.screen}>
      <BackRow label="Editar gasto" onBack={onCancelar} />
      <p style={s.label}>Nombre del gasto</p>
      <input style={s.input} value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
      <p style={s.label}>Editar valor del gasto</p>
      <input style={s.input} placeholder="$" type="number" value={form.valor} onChange={(e) => set("valor", e.target.value)} />
      <p style={s.label}>Seleccionar fecha:</p>
      <input style={s.input} type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} />
      <p style={s.label}>Categoría</p>
      <SelectWrap value={form.categoria} onChange={(e) => set("categoria", e.target.value)} placeholder="Elige una categoría o crea una nueva">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      <p style={s.label}>Descripción</p>
      <input style={s.input} value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} />
      <button style={s.btnGray} onClick={() => onGuardar(form)}>Guardar</button>
      <button style={{ ...s.btnSecondary, background: "#fff", color: "#111", border: "1px solid #ccc" }} onClick={onCancelar}>Cancelar</button>
      <button style={s.btnDanger} onClick={() => onEliminar(gasto.id)}>Eliminar gasto</button>
    </div>
  );
}