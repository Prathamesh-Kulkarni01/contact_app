import { Alert, AlertTitle } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Context from "../context";

const Toast = () => {
  const { toast, showToast } = useContext(Context);
  useEffect(() => {
    const interval = setInterval(() => {
      showToast(false);
    }, 5000);
    return () => clearInterval(interval);
  }, [showToast]);
  return (
    <Alert
      severity={toast?.variant}
      sx={{
        position: "fixed",
        top: 60,
        right: 20,
        zIndex: 100,
        display: toast ? "flex" : "none",
      }}
    >
      <AlertTitle>{toast.variant?.toUpperCase()}</AlertTitle>
      {toast.text}
    </Alert>
  );
};

export default Toast;
