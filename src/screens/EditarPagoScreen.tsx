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
}

export default function EditarPagoScreen({ pago, onGuardar, onCancelar, onEliminar }: EditarPagoScreenProps) {
  const [form, setForm] = useState<Pago>({ ...pago });
  const set = (k: keyof Pago, v: any) => setForm((f) => ({ ...f, [k]: v }));
  
  return (
    <div style={s.screen}>
      <BackRow label="Editar Pago" onBack={onCancelar} />
      <p style={s.label}>Monto a Pagar</p>
      <input style={s.input} placeholder="$ 1.00" type="number" value={form.monto} onChange={(e) => set("monto", e.target.value)} />
      <p style={s.label}>¿Qué vas a pagar?</p>
      <input style={s.input} value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
      <p style={s.label}>Fecha de vencimiento</p>
      <input style={s.input} type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} />
      <p style={s.label}>Categoría</p>
      <SelectWrap value={form.categoria} onChange={(e) => set("categoria", e.target.value)} placeholder="Elige una categoría o crea una nueva">
        {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
      </SelectWrap>
      <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Alerta de pago</p>
      <div style={{ ...s.card, padding: "12px 14px" }}>
        <div style={s.row}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600 }}>Notificaciones activas</p>
            <p style={{ fontSize: 11, color: "#888" }}>Desactiva si no deseas recibir alertas</p>
          </div>
          <div style={s.toggle(form.notificaciones)} onClick={() => set("notificaciones", !form.notificaciones)}><div style={s.toggleDot} /></div>
        </div>
      </div>
      <button style={s.btnPrimary} onClick={() => onGuardar(form)}>Guardar Cambios</button>
      <button style={s.btnSecondary} onClick={onCancelar}>Cancelar</button>
      <button style={s.btnDanger} onClick={() => onEliminar(pago.id)}>Eliminar pago</button>
    </div>
  );
}