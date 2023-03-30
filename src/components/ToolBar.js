import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { makeStyles } from "@mui/styles";
import { Save } from "@mui/icons-material";
import { Context } from "../context";
import { createNewContact } from "../api/api";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: "0px",

    backgroundColor: "#ffffff",
  },
  iconButton: {
    marginRight: "10px",
  },
  "&:hover .iconButton": {
    borderRadius: "2px",
  },
  spacer: {
    flexGrow: 1,
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const { newContactData } = React.useContext(Context);

  const handleSave = () => {
    createNewContact(newContactData);
  };
  return (
    <AppBar
      style={{ padding: 0 }}
      position="static"
      sx={{ boxShadow: "0", padding: "0px", m: 0 }}
    >
      <Toolbar variant="dense" sx={{ p: 0 }} className={classes.appBar}>
        <Box
          edge="start"
          color="rgba(0,0,0,0.7)"
          aria-label="menu"
          sx={{
            ml: 2,
            width: "30px",
            justifyContent: "center",
            display: "flex",
            "&:hover": {
              borderRadius: "1px",
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
        >
          <a href="/axelor-erp/add-contact">
            {" "}
            <AddIcon sx={{ mx: 2 }} color="gray" />{" "}
          </a>
        </Box>
        <Box
          onClick={() => handleSave()}
          edge="start"
          color="rgba(0,0,0,0.7)"
          aria-label="menu"
          sx={{
            ml: 2,
            width: "30px",
            justifyContent: "center",
            display: "flex",
            "&:hover": {
              borderRadius: "1px",
              backgroundColor: "rgba(0,0,0,0.2)", 
            },
          }}
        >
          {window.location.pathname.split("/")[2] === "add-contact" && (
            <Save sx={{ mx: 2 }} color="gray" />
          )}
        </Box>
        <div className={classes.spacer} />
        <Box
          edge="start"
          color="black"
          aria-label="menu"
          sx={{
            mr: 2,
            width: "30px",
            justifyContent: "center",
            display: "flex",
            "&:hover": {
              borderRadius: "1px",
              backgroundColor: "rgba(0,0,0,0.2)", 
            },
          }}
        >
          <a href="/axelor-erp/list">
            <FormatListBulletedIcon color="gray" />
          </a>
        </Box>
        <Box
          edge="start"
          color="rgba(0,0,0,0.7)"
          aria-label="menu"
          sx={{
            mr: 2,
            width: "30px",
            justifyContent: "center",
            display: "flex",
            "&:hover": {
              borderRadius: "1px",
              backgroundColor: "rgba(0,0,0,0.2)", 
            },
          }}
        >
          <a href="/axelor-erp/">
            {" "}
            <ViewModuleIcon color="gray" />
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
