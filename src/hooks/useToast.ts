import { useState } from "react";

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info" | "loading";
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message: string, type: "success" | "error" | "info" | "loading") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "info" });
  };

  return { toast, showToast, hideToast };
}