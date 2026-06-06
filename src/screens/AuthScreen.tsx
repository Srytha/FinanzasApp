import { useState } from "react";
import { s } from "../components/styles";

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = ({ off }: { off: boolean }) => off ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// Componente de notificación flotante
const FloatingMessage = ({ message, type, onClose }: { message: string; type: "success" | "error" | "loading"; onClose: () => void }) => {
  const colors = {
    success: { bg: "#4caf50", icon: "✅" },
    error: { bg: "#f44336", icon: "❌" },
    loading: { bg: "#2196f3", icon: "⏳" }
  };

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease-out"
    }}>
      <div style={{
        background: colors[type].bg,
        color: "#fff",
        padding: "16px 24px",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        minWidth: 240,
        justifyContent: "center"
      }}>
        <span style={{ fontSize: 24 }}>{colors[type].icon}</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{message}</span>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
};

interface AuthScreenProps {
  onAuthSuccess: (nombre: string) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "loading" } | null>(null);

  const showNotification = (message: string, type: "success" | "error" | "loading") => {
    setNotification({ message, type });
    if (type !== "loading") {
      setTimeout(() => setNotification(null), 1500);
    }
  };

  const handleSubmit = async () => {
    if (isLogin) {
      setIsLoading(true);
      showNotification("Iniciando sesión...", "loading");
      
      // Simular carga rápida
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      setIsLoading(false);
      
      if (user) {
        showNotification("¡Sesión iniciada!", "success");
        setTimeout(() => {
          onAuthSuccess(user.nombre);
        }, 500);
      } else {
        showNotification("Correo o contraseña incorrectos", "error");
      }
    } else {
      if (password !== confirmPassword) {
        showNotification("Las contraseñas no coinciden", "error");
        return;
      }
      
      setIsLoading(true);
      showNotification("Registrando usuario...", "loading");
      
      // Simular carga rápida
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
      const userExists = users.some((u: any) => u.email === email);
      
      if (userExists) {
        showNotification("El correo ya está registrado", "error");
        setIsLoading(false);
        return;
      }
      
      users.push({ nombre, email, password });
      localStorage.setItem("usuarios", JSON.stringify(users));
      
      showNotification("¡Registro exitoso!", "success");
      setIsLoading(false);
      
      // Cambiar a login después de 1 segundo
      setTimeout(() => {
        setIsLogin(true);
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setNotification(null);
      }, 1000);
    }
  };

  return (
    <div style={{ ...s.wrapper, background: "#fff", position: "relative" }}>
      <div style={{ ...s.phone, width: "100%", height: "100%", borderRadius: 0, border: "none", boxShadow: "none" }}>
        {/* Rectángulo superior con moneda difuminada */}
        <div style={{
          width: "100%",
          height: 160,
          backgroundColor: "#1a6e3d7c",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Moneda difuminada (watermark) */}
          <div style={{
            position: "absolute",
            right: -55,
            bottom: -5,
            opacity: 0.09
          }}>
            <svg width="150" height="150" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" stroke="#000000" strokeWidth="2"/>
              <circle cx="32" cy="32" r="22" stroke="#000000" strokeWidth="1.5"/>
              <text x="32" y="40" textAnchor="middle" fontSize="24" fill="#000000" fontFamily="serif" fontWeight="bold">$</text>
            </svg>
          </div>
          
          <h1 style={{
            position: "absolute",
            left: 20,
            bottom: 5,
            fontSize: 32,
            fontWeight: 700,
            color: "#111",
            margin: 0,
            zIndex: 2
          }}>
            MoniApp
          </h1>
        </div>

        <div style={{ ...s.screen, paddingTop: 20, paddingBottom: 20 }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: 0, textAlign: "center" }}>
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
          </div>

          {/* Formulario */}
          {!isLogin && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ ...s.label, marginBottom: 4, fontSize: 12 }}>Nombre completo</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 10px" }}>
                <UserIcon />
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 12 }}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <p style={{ ...s.label, marginBottom: 4, fontSize: 12 }}>Correo electrónico</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 10px" }}>
              <MailIcon />
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12 }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <p style={{ ...s.label, marginBottom: 4, fontSize: 12 }}>Contraseña</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 10px" }}>
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12 }}
                disabled={isLoading}
              />
              <span onClick={() => !isLoading && setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                <EyeIcon off={showPassword} />
              </span>
            </div>
          </div>

          {isLogin && (
            <div style={{ textAlign: "right", marginTop: -4, marginBottom: 12 }}>
              <button 
                onClick={() => {}} 
                style={{
                  background: "none",
                  border: "none",
                  color: "#1e3a5f",
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {!isLogin && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ ...s.label, marginBottom: 4, fontSize: 12 }}>Confirmar contraseña</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 10px" }}>
                <LockIcon />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 12 }}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              width: "100%",
              background: isLoading ? "#9e9e9e" : "#1a5c6e",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px",
              fontSize: 14,
              fontWeight: 700,
              cursor: isLoading ? "not-allowed" : "pointer",
              marginTop: 8,
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Crear Cuenta")}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
            <span style={{ fontSize: 11, color: "#888" }}>o</span>
            <div style={{ flex: 1, height: 1, background: "#e0e0e0" }} />
          </div>

          <button
            style={{
              width: "100%",
              background: "#fff",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: 10,
              padding: "10px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <GoogleIcon /> Continuar con Google
          </button>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button
              onClick={() => !isLoading && setIsLogin(!isLogin)}
              style={{
                background: "none",
                border: "none",
                color: "#1a5c6e",
                fontSize: 13,
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.5 : 1
              }}
              disabled={isLoading}
            >
              {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Notificación flotante */}
      {notification && (
        <FloatingMessage 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
}