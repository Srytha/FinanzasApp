export interface Gasto {
  id: number;
  nombre: string;
  categoria: string;
  valor: string;
  fecha: string;
  descripcion: string;
}

export interface Presupuesto {
  id: number;
  nombre: string;
  categoria: string;
  limite: string;
  gastado: string;
  fechaInicio: string;
  fechaFin: string;
  notificaciones: boolean;
  alerta80: boolean;
  alerta100: boolean;
}

export interface Pago {
  id: number;
  nombre: string;
  categoria: string;
  monto: string;
  fecha: string;
  notificaciones: boolean;
}

export interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

export type TabType = "inicio" | "gastos" | "presupuestos" | "pagos" | "informes";
export type SubScreenType = 
  | "detalle-gasto" 
  | "nuevo-gasto" 
  | "editar-gasto" 
  | "nuevo-presupuesto" 
  | "editar-presupuesto" 
  | "nuevo-pago" 
  | "editar-pago" 
  | null;
export type AuthScreenType = "login" | "register" | "forgot";