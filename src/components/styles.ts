import { CSSProperties } from "react";

interface Styles {
  wrapper: CSSProperties;
  phone: CSSProperties;
  screen: CSSProperties;
  navbar: CSSProperties;
  navItem: (active: boolean) => CSSProperties;
  navLabel: (active: boolean) => CSSProperties;
  card: CSSProperties;
  row: CSSProperties;
  pageTitle: CSSProperties;
  pageDesc: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
  select: CSSProperties;
  filterSelect: CSSProperties;
  btnPrimary: CSSProperties;
  btnSecondary: CSSProperties;
  btnDanger: CSSProperties;
  btnGray: CSSProperties;
  gastoCard: CSSProperties;
  detailBtn: CSSProperties;
  editBtn: CSSProperties;
  newBtn: CSSProperties;
  toggle: (on: boolean) => CSSProperties;
  toggleDot: CSSProperties;
  alertBtn: (on: boolean) => CSSProperties;
  progressBar: (pct: number) => CSSProperties;
}

export const s: Styles = {
  wrapper: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#e5e5e5", fontFamily: "system-ui, sans-serif" },
  phone: { width: 360, height: 720, background: "#fff", borderRadius: 32, border: "1px solid #ddd", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" },
  screen: { flex: 1, overflowY: "auto", padding: "20px 16px 12px" },
  navbar: { height: 64, borderTop: "1px solid #e8e8e8", display: "flex", alignItems: "center", background: "#fff", flexShrink: 0 },
  navItem: (active: boolean): CSSProperties => ({ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", flex: 1, padding: "6px 0", opacity: active ? 1 : 0.35 }),
  navLabel: (active: boolean): CSSProperties => ({ fontSize: 10, color: active ? "#111" : "#888", fontWeight: active ? 600 : 400 }),
  card: { background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "14px 16px", marginBottom: 12 },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  pageTitle: { fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 2 },
  pageDesc: { fontSize: 13, color: "#888", marginBottom: 14 },
  label: { fontSize: 13, color: "#111", marginBottom: 6, fontWeight: 500 },
  input: { width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#111", outline: "none", marginBottom: 14, boxSizing: "border-box" },
  select: { width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#888", outline: "none", marginBottom: 0, background: "#fff", appearance: "none", cursor: "pointer" },
  filterSelect: { width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#111", outline: "none", marginBottom: 14, background: "#fff", appearance: "none", cursor: "pointer" },
  btnPrimary: { width: "100%", background: "#1a5c6e", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10 },
  btnSecondary: { width: "100%", background: "#2a8fa8", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 10 },
  btnDanger: { width: "100%", background: "#fff", color: "#e05252", border: "1.5px solid #e05252", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnGray: { width: "100%", background: "#333", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10 },
  gastoCard: { border: "1px solid #e0e0e0", borderRadius: 12, padding: "12px 14px", marginBottom: 10 },
  detailBtn: { fontSize: 12, color: "#555", border: "1px solid #ddd", borderRadius: 6, padding: "4px 10px", cursor: "pointer", background: "#fff" },
  editBtn: { fontSize: 16, cursor: "pointer", color: "#555", background: "none", border: "none" },
  newBtn: { fontSize: 12, fontWeight: 600, border: "1px solid #333", borderRadius: 20, padding: "5px 14px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 },
  toggle: (on: boolean): CSSProperties => ({ width: 42, height: 24, borderRadius: 12, background: on ? "#1a5c6e" : "#ccc", display: "flex", alignItems: "center", padding: "0 3px", cursor: "pointer", transition: "background 0.2s", justifyContent: on ? "flex-end" : "flex-start" }),
  toggleDot: { width: 18, height: 18, borderRadius: "50%", background: "#fff" },
  alertBtn: (on: boolean): CSSProperties => ({ flex: 1, padding: "8px 0", fontSize: 12, borderRadius: 8, border: on ? "1.5px solid #1a5c6e" : "1px solid #ddd", background: on ? "#e8f4f7" : "#fff", color: on ? "#1a5c6e" : "#888", fontWeight: on ? 700 : 400, cursor: "pointer" }),
  progressBar: (pct: number): CSSProperties => ({ height: 8, borderRadius: 4, background: pct > 100 ? "#e05252" : "#555", width: `${Math.min(pct, 100)}%` }),
};