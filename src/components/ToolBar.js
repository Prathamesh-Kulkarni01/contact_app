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
import { createOrUpdateNewContact } from "../api/api";
import Edit from "@mui/icons-material/Edit";

const useStyles = makeStyles(() => ({
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
  const { newContactData, updatedData } = React.useContext(Context);

  const redirectToHome=()=>{

    window.location.href="/axelor-erp"
  }
  const handleSave = async () => {
    if (window.location.pathname.split("/")[2] === "edit") {
      const _id = newContactData.id;
      const _version = newContactData.version;
      const updatingData = {
        id: _id,
        version: _version,
        ...updatedData,
        _original: { ...newContactData },
      };
      console.log("updating",updatedData);
      console.log(await createOrUpdateNewContact(updatingData));
      alert("Updated Successfully");
      return;
    } else {
      await createOrUpdateNewContact(newContactData);
      alert("Added Successfully");
      
    }
    redirectToHome()
  };
  return (
    <AppBar
      position="fixed"
      style={{ top: 0, padding: 0 }}
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
          <a href="/axelor-erp/create">
            {" "}
            <AddIcon sx={{ mx: 2 }} color="gray" />{" "}
          </a>
        </Box>
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
          {(window.location.pathname.split("/")[2] === "create" ||
            window.location.pathname.split("/")[2] === "edit") && (
            <Save sx={{ mx: 2 }} color="gray" onClick={() => handleSave()} />
          )}
          {window.location.pathname.split("/")[2] === "view" && (
            <a
              href={`/axelor-erp/edit/profile/${
                window.location.pathname.split("/")[4]
              }`}
            >
              <Edit />
            </a>
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
