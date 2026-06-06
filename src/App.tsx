import { useState } from "react";
import { s } from "./components/styles";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useToast } from "./hooks/useToast";
import Toast from "./components/Toast";
import { Gasto, Presupuesto, Pago, TabType, SubScreenType } from "./types";
import Navbar from "./components/Navbar";
import InicioScreen from "./screens/InicioScreen";
import GastosScreen from "./screens/GastosScreen";
import NuevoGastoScreen from "./screens/NuevoGastoScreen";
import EditarGastoScreen from "./screens/EditarGastoScreen";
import DetalleGastoScreen from "./screens/DetalleGastoScreen";
import PresupuestosScreen from "./screens/PresupuestosScreen";
import CrearPresupuestoScreen from "./screens/CrearPresupuestoScreen";
import EditarPresupuestoScreen from "./screens/EditarPresupuestoScreen";
import PagosScreen from "./screens/PagosScreen";
import ProgramarPagoScreen from "./screens/ProgramarPagoScreen";
import EditarPagoScreen from "./screens/EditarPagoScreen";
import InformesScreen from "./screens/InformesScreen";

export default function App() {
  const [tab, setTab] = useState<TabType>("inicio");
  const [subScreen, setSubScreen] = useState<SubScreenType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const [gastos, setGastos] = useLocalStorage<Gasto[]>("finanzas_gastos", [
    { id: 1, nombre: "Café", categoria: "Alimentación", valor: "2.50", fecha: new Date().toISOString().split('T')[0], descripcion: "Café de la mañana" },
    { id: 2, nombre: "Bus", categoria: "Transporte", valor: "1.20", fecha: new Date().toISOString().split('T')[0], descripcion: "Transporte al trabajo" },
    { id: 3, nombre: "Medicina", categoria: "Salud", valor: "15.00", fecha: new Date().toISOString().split('T')[0], descripcion: "Farmacia" },
  ]);

  const [presupuestos, setPresupuestos] = useLocalStorage<Presupuesto[]>("finanzas_presupuestos", [
    { id: 1, nombre: "Almuerzos", categoria: "Comida", limite: "120000", gastado: "90000", fechaInicio: "2026-05-01", fechaFin: "2026-05-07", notificaciones: true, alerta80: true, alerta100: false },
    { id: 2, nombre: "Movilidad", categoria: "Transporte", limite: "40000", gastado: "50000", fechaInicio: "2026-05-01", fechaFin: "2026-05-07", notificaciones: true, alerta80: true, alerta100: true },
  ]);

  const [pagos, setPagos] = useLocalStorage<Pago[]>("finanzas_pagos", [
    { id: 1, nombre: "Netflix", categoria: "Entretenimiento", monto: "15.99", fecha: "2026-05-23", notificaciones: true },
  ]);

  const [gastoActivo, setGastoActivo] = useState<Gasto | null>(null);
  const [presupuestoActivo, setPresupuestoActivo] = useState<Presupuesto | null>(null);
  const [pagoActivo, setPagoActivo] = useState<Pago | null>(null);

  const go = (screen: SubScreenType) => setSubScreen(screen);
  const back = () => { 
    setSubScreen(null); 
    setGastoActivo(null); 
    setPresupuestoActivo(null); 
    setPagoActivo(null); 
  };
  const navTo = (t: TabType) => { 
    setTab(t); 
    back(); 
  };

  const guardarGasto = async (form: Omit<Gasto, "id">) => {
    if (!form.nombre) {
      showToast("Por favor complete el nombre del gasto", "error");
      return;
    }
    
    setIsLoading(true);
    showToast("Por favor espere...", "loading");
    
    // Simular un pequeño retraso para mostrar el loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (gastoActivo) {
      setGastos(gastos.map((g) => g.id === gastoActivo.id ? { ...form, id: gastoActivo.id } : g));
      showToast("Gasto modificado con éxito", "success");
    } else {
      setGastos([...gastos, { ...form, id: Date.now() }]);
      showToast("Gasto registrado con éxito", "success");
    }
    
    setIsLoading(false);
    back();
  };

  const eliminarGasto = async (id: number) => { 
    setIsLoading(true);
    showToast("Por favor espere...", "loading");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setGastos(gastos.filter((g) => g.id !== id)); 
    showToast("Gasto eliminado con éxito", "success");
    
    setIsLoading(false);
    back(); 
  };

  const guardarPresupuesto = async (form: Omit<Presupuesto, "id" | "gastado">) => {
    if (!form.nombre) {
      showToast("Por favor complete el nombre del presupuesto", "error");
      return;
    }
    
    setIsLoading(true);
    showToast("Por favor espere...", "loading");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (presupuestoActivo) {
      setPresupuestos(presupuestos.map((p) => p.id === presupuestoActivo.id ? { ...form, id: presupuestoActivo.id, gastado: p.gastado } : p));
      showToast("Presupuesto modificado con éxito", "success");
    } else {
      setPresupuestos([...presupuestos, { ...form, id: Date.now(), gastado: "0" }]);
      showToast("Presupuesto creado con éxito", "success");
    }
    
    setIsLoading(false);
    back();
  };

  const eliminarPresupuesto = async (id: number) => { 
    setIsLoading(true);
    showToast("Por favor espere...", "loading");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPresupuestos(presupuestos.filter((p) => p.id !== id)); 
    showToast("Presupuesto eliminado con éxito", "success");
    
    setIsLoading(false);
    back(); 
  };

  const guardarPago = async (form: Omit<Pago, "id">) => {
    if (!form.nombre) {
      showToast("Por favor complete el nombre del pago", "error");
      return;
    }
    
    setIsLoading(true);
    showToast("Por favor espere...", "loading");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (pagoActivo) {
      setPagos(pagos.map((p) => p.id === pagoActivo.id ? { ...form, id: pagoActivo.id } : p));
      showToast("Pago modificado con éxito", "success");
    } else {
      setPagos([...pagos, { ...form, id: Date.now() }]);
      showToast("Pago registrado con éxito", "success");
    }
    
    setIsLoading(false);
    back();
  };

  const eliminarPago = async (id: number) => { 
    setIsLoading(true);
    showToast("Por favor espere...", "loading");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPagos(pagos.filter((p) => p.id !== id)); 
    showToast("Pago eliminado con éxito", "success");
    
    setIsLoading(false);
    back(); 
  };

  const renderScreen = () => {
    if (subScreen === "detalle-gasto" && gastoActivo) 
      return <DetalleGastoScreen gasto={gastoActivo} onBack={back} onEditar={(g) => { setGastoActivo(g); go("editar-gasto"); }} />;
    if (subScreen === "nuevo-gasto") 
      return <NuevoGastoScreen onGuardar={guardarGasto} onCancelar={back} isLoading={isLoading} />;
    if (subScreen === "editar-gasto" && gastoActivo) 
      return <EditarGastoScreen gasto={gastoActivo} onGuardar={(g) => guardarGasto(g)} onCancelar={back} onEliminar={eliminarGasto} isLoading={isLoading} />;
    if (subScreen === "nuevo-presupuesto") 
      return <CrearPresupuestoScreen onGuardar={guardarPresupuesto} onCancelar={back} isLoading={isLoading} />;
    if (subScreen === "editar-presupuesto" && presupuestoActivo) 
      return <EditarPresupuestoScreen presupuesto={presupuestoActivo} onGuardar={(p) => guardarPresupuesto(p)} onCancelar={back} onEliminar={eliminarPresupuesto} isLoading={isLoading} />;
    if (subScreen === "nuevo-pago") 
      return <ProgramarPagoScreen onGuardar={guardarPago} onCancelar={back} isLoading={isLoading} />;
    if (subScreen === "editar-pago" && pagoActivo) 
      return <EditarPagoScreen pago={pagoActivo} onGuardar={(p) => guardarPago(p)} onCancelar={back} onEliminar={eliminarPago} isLoading={isLoading} />;

    switch (tab) {
      case "inicio": return <InicioScreen />;
      case "gastos": return <GastosScreen gastos={gastos} onNuevo={() => { setGastoActivo(null); go("nuevo-gasto"); }} onEditar={(g) => { setGastoActivo(g); go("editar-gasto"); }} onDetalle={(g) => { setGastoActivo(g); go("detalle-gasto"); }} />;
      case "presupuestos": return <PresupuestosScreen presupuestos={presupuestos} onNuevo={() => { setPresupuestoActivo(null); go("nuevo-presupuesto"); }} onEditar={(p) => { setPresupuestoActivo(p); go("editar-presupuesto"); }} />;
      case "pagos": return <PagosScreen pagos={pagos} onNuevo={() => { setPagoActivo(null); go("nuevo-pago"); }} onEditar={(p) => { setPagoActivo(p); go("editar-pago"); }} />;
      case "informes": return <InformesScreen gastos={gastos} presupuestos={presupuestos} />;
      default: return null;
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.phone}>
        {renderScreen()}
        <Navbar active={tab} onTab={navTo} />
      </div>
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}