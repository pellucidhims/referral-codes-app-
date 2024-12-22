import React, { useEffect, ReactNode } from "react";

type AnchorOrigin = {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
};

interface SnackbarProps {
  anchorOrigin?: AnchorOrigin;
  open: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
  children: ReactNode;
}

const Snackbar: React.FC<SnackbarProps> = ({
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  open,
  autoHideDuration = 3000,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (open && autoHideDuration) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoHideDuration);
      return () => clearTimeout(timer); // Cleanup timer on unmount or when `open` changes
    }
  }, [open, autoHideDuration, onClose]);

  const getPositionStyle = () => {
    const verticalStyles = {
      top: { top: "1rem" },
      bottom: { bottom: "1rem" },
    };

    const horizontalStyles = {
      center: { left: "50%", transform: "translateX(-50%)" },
      left: { left: "1rem" },
      right: { right: "1rem" },
    };

    return {
      position: "fixed",
      ...(verticalStyles[anchorOrigin.vertical] || {}),
      ...(horizontalStyles[anchorOrigin.horizontal] || {}),
      zIndex: 1000,
    };
  };

  if (!open) return null;

  return (
    <div style={getPositionStyle()} className="snackbar">
      <div
        style={{
          background: "green",
          color: "#fff",
          padding: "1rem",
          borderRadius: "4px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Snackbar;
