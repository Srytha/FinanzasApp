interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const pastelColors = [
  { name: "Verde", value: "#1a5c6e", code: "#1a5c6e" },
  { name: "Rosa", value: "#f8c4d4", code: "#f8c4d4" },
  { name: "Azul", value: "#b3d9ff", code: "#b3d9ff" },
  { name: "Lavanda", value: "#e0cff5", code: "#e0cff5" },
  { name: "Melón", value: "#ffd4b5", code: "#ffd4b5" },
];

export default function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  return (
    <div style={{
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
    }}>
      {pastelColors.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelectColor(color.value)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: color.value,
            border: selectedColor === color.value ? "3px solid #333" : "2px solid #fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.1s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      ))}
    </div>
  );
}