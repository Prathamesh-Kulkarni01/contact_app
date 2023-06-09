import { Box } from "@mui/material";
import React, { useContext } from "react";
import Context from "../context";

const Loader = () => {
  const { loading } = useContext(Context);
  return (
    loading && (
      <Box
        sx={{
          position: "absolute",
          top: "40px",
          margin: "0px auto",
          backgroundColor: "red",
          left: "46%",
          opacity: 0.7,
          zIndex: 9000,
          padding: "5px 60px",
          color: "white",
          fontWeight: "550",
          borderRadius: "4px",
        }}
      >
        Loading...
      </Box>
    )
  );
};

export default Loader;
