import { s } from "./styles";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  hint: string;
  illustration: React.ReactNode;
  cta: string;
  showPlus?: boolean;
  onPlusClick?: () => void;
  onBack?: () => void;
}

export default function EmptyState({ 
  title, 
  subtitle, 
  hint, 
  illustration, 
  cta, 
  showPlus = false,
  onPlusClick,
  onBack 
}: EmptyStateProps) {
  return (
    <div style={s.screen}>
      {/* Header */}
      <div style={{ ...s.row, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {onBack && (
            <button 
              onClick={onBack}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#1a1a1a",
                padding: 0,
                display: "flex",
                alignItems: "center",
                fontSize: 20
              }}
            >
              ←
            </button>
          )}
          <span style={s.pageTitle}>{title}</span>
        </div>
      </div>

      {/* Subtitle */}
      <p style={s.pageDesc}>{subtitle}</p>

      {/* Main card */}
      <div style={{
        background: "#f5f5f5",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        minHeight: 400,
        position: "relative",
      }}>
        {/* Hint text */}
        <div style={{
          position: "absolute",
          top: 20,
          left: 20,
          right: 20,
          background: "#ebebeb",
          borderRadius: 12,
          padding: "14px 16px",
        }}>
          <p style={{
            margin: 0,
            fontSize: 13,
            color: "#555",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.5,
          }}>
            {hint}
          </p>
        </div>

        {/* Illustration + CTA */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          marginTop: 80,
        }}>
          {illustration}
          <p style={{
            margin: 0,
            fontSize: 14,
            color: "#888",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
            textAlign: "center",
          }}>
            {cta}
          </p>
          {showPlus && onPlusClick && (
            <button 
              onClick={onPlusClick}
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "#1a1a1a",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                marginTop: 4,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
              }}
            >
              ＋
            </button>
          )}
        </div>
      </div>
    </div>
  );
}