import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "loading";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (type !== "loading") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return { background: "#4caf50", color: "#fff", icon: "✅" };
      case "error":
        return { background: "#f44336", color: "#fff", icon: "❌" };
      case "loading":
        return { background: "#2196f3", color: "#fff", icon: "⏳" };
      default:
        return { background: "#333", color: "#fff", icon: "ℹ️" };
    }
  };

  const styles = getStyles();

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      animation: "slideDown 0.3s ease-out",
    }}>
      <div style={{
        background: styles.background,
        color: styles.color,
        padding: "12px 20px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "280px",
        justifyContent: "center",
      }}>
        <span style={{ fontSize: "20px" }}>{styles.icon}</span>
        <span style={{ fontSize: "14px", fontWeight: 500 }}>{message}</span>
      </div>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}