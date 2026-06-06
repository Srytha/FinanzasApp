import { useState } from "react";
import { s } from "./components/styles";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Gasto, Presupuesto, Pago, TabType, SubScreenType } from "./types";
import AuthScreen from "./screens/AuthScreen";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [tab, setTab] = useState<TabType>("inicio");
  const [subScreen, setSubScreen] = useState<SubScreenType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [gastos, setGastos] = useLocalStorage<Gasto[]>("finanzas_gastos", []);
  const [presupuestos, setPresupuestos] = useLocalStorage<Presupuesto[]>("finanzas_presupuestos", []);
  const [pagos, setPagos] = useLocalStorage<Pago[]>("finanzas_pagos", []);

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

  const handleAuthSuccess = (nombre: string) => {
    setUserName(nombre);
    setIsAuthenticated(true);
  };

  const guardarGasto = (form: Omit<Gasto, "id">) => {
    if (!form.nombre) return;
    if (gastoActivo) {
      setGastos(gastos.map((g) => g.id === gastoActivo.id ? { ...form, id: gastoActivo.id } : g));
    } else {
      setGastos([...gastos, { ...form, id: Date.now() }]);
    }
    back();
  };

  const eliminarGasto = (id: number) => { 
    setGastos(gastos.filter((g) => g.id !== id)); 
    back(); 
  };

  const guardarPresupuesto = (form: Omit<Presupuesto, "id" | "gastado">) => {
    if (!form.nombre) return;
    if (presupuestoActivo) {
      setPresupuestos(presupuestos.map((p) => p.id === presupuestoActivo.id ? { ...form, id: presupuestoActivo.id, gastado: p.gastado } : p));
    } else {
      setPresupuestos([...presupuestos, { ...form, id: Date.now(), gastado: "0" }]);
    }
    back();
  };

  const eliminarPresupuesto = (id: number) => { 
    setPresupuestos(presupuestos.filter((p) => p.id !== id)); 
    back(); 
  };

  const guardarPago = (form: Omit<Pago, "id">) => {
    if (!form.nombre) return;
    if (pagoActivo) {
      setPagos(pagos.map((p) => p.id === pagoActivo.id ? { ...form, id: pagoActivo.id } : p));
    } else {
      setPagos([...pagos, { ...form, id: Date.now() }]);
    }
    back();
  };

  const eliminarPago = (id: number) => { 
    setPagos(pagos.filter((p) => p.id !== id)); 
    back(); 
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
    }
    
    if (subScreen === "detalle-gasto" && gastoActivo) 
      return <DetalleGastoScreen gasto={gastoActivo} onBack={back} onEditar={(g) => { setGastoActivo(g); go("editar-gasto"); }} />;
    if (subScreen === "nuevo-gasto") 
      return <NuevoGastoScreen onGuardar={guardarGasto} onCancelar={back} isLoading={isLoading} />;
    if (subScreen === "editar-gasto" && gastoActivo) 
      return <EditarGastoScreen gasto={gastoActivo} onGuardar={guardarGasto} onCancelar={back} onEliminar={eliminarGasto} isLoading={isLoading} />;
    if (subScreen === "nuevo-presupuesto") 
      return <CrearPresupuestoScreen onGuardar={guardarPresupuesto} onCancelar={back} isLoading={isLoading} />;
    if (subScreen === "editar-presupuesto" && presupuestoActivo) 
      return <EditarPresupuestoScreen presupuesto={presupuestoActivo} onGuardar={guardarPresupuesto} onCancelar={back} onEliminar={eliminarPresupuesto} isLoading={isLoading} />;
    if (subScreen === "nuevo-pago") 
      return <ProgramarPagoScreen onGuardar={guardarPago} onCancelar={back} isLoading={isLoading} />;
    if (subScreen === "editar-pago" && pagoActivo) 
      return <EditarPagoScreen pago={pagoActivo} onGuardar={guardarPago} onCancelar={back} onEliminar={eliminarPago} isLoading={isLoading} />;

    switch (tab) {
      case "inicio": return <InicioScreen nombre={userName} />;
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
        {isAuthenticated && <Navbar active={tab} onTab={navTo} />}
      </div>
    </div>
  );
}