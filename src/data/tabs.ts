export interface Tab {
  key: string;
  label: string;
  icon: string;
}

export const tabs: Tab[] = [
  { key: "gastos", label: "Gastos", icon: "💲" },
  { key: "informes", label: "Informes", icon: "📄" },
  { key: "inicio", label: "Inicio", icon: "🏠" },
  { key: "presupuestos", label: "Presupuestos", icon: "📊" },
  { key: "pagos", label: "Pagos", icon: "💳" },
];