import * as React from "react";
import { XIcon } from "lucide-react";
import { type Toast as ToastType } from "../../../providers/ToastProvider/ToastProvider";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: ToastType;
  onClose?: () => void;
}

export function Toast({ toast, onClose, className, ...props }: ToastProps) {
  const { title, description, variant = "info" } = toast;

  // Color scheme based on variant
  const getColorScheme = (variant: string) => {
    switch (variant) {
      case "success":
        return {
          backgroundColor: "#dcfce7", // green-100
          color: "#166534", // green-800
          borderColor: "#bbf7d0", // green-200
        };
      case "error":
        return {
          backgroundColor: "#fee2e2", // red-100
          color: "#991b1b", // red-800
          borderColor: "#fecaca", // red-200
        };
      case "warning":
        return {
          backgroundColor: "#fef3c7", // yellow-100
          color: "#92400e", // yellow-800
          borderColor: "#fde68a", // yellow-200
        };
      case "info":
        return {
          backgroundColor: "#dbeafe", // blue-100
          color: "#1e3a8a", // blue-800
          borderColor: "#bfdbfe", // blue-200
        };
      default:
        return {
          backgroundColor: "#f3f4f6", // gray-100
          color: "#1f2937", // gray-800
          borderColor: "#d1d5db", // gray-300
        };
    }
  };

  const colorScheme = getColorScheme(variant);

  const handleClose = React.useCallback(() => {
    onClose?.();
    toast.onClose?.();
  }, [onClose, toast]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={className}
      style={{
        position: "relative",
        backgroundColor: colorScheme.backgroundColor,
        color: colorScheme.color,
        border: `1px solid ${colorScheme.borderColor}`,
        borderRadius: "8px",
        padding: "12px",
        minHeight: "60px",
        fontSize: "14px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        maxWidth: "384px",
        width: "100%",
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          {title && (
            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
              {title}
            </div>
          )}
          {description && (
            <div
              style={{
                fontSize: "12px",
                color: colorScheme.color,
                opacity: 0.8,
              }}
            >
              {description}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: "absolute",
            right: "8px",
            top: "8px",
            padding: "4px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            pointerEvents: "auto",
            color: colorScheme.color,
            fontSize: "16px",
            lineHeight: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colorScheme.borderColor;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Close toast"
        >
          <XIcon style={{ width: "16px", height: "16px" }} />
        </button>
      </div>
    </div>
  );
}

Toast.displayName = "Toast";

export default Toast;
