import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Save from "@mui/icons-material/Save";
import { makeStyles } from "@mui/styles";
import { Context } from "../context";
import { createOrUpdateNewContact } from "../api/api";
import Edit from "@mui/icons-material/Edit";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { newContactData, updatedData, setNewContactData, setUpdatedData } =
    React.useContext(Context);
  const redirectToHome = () => navigate("/axelor-erp");
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
      await createOrUpdateNewContact(updatingData);
      setUpdatedData([]);
      alert("Updated Successfully");
    } else {
      if (!newContactData.mainPartner) {
        alert("The following fields are invalid: Name/Company Name");
        return;
      }
      await createOrUpdateNewContact(newContactData);
      setNewContactData([]);
      alert("Added Successfully");
    }
    redirectToHome();
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
          {(location.pathname.split("/")[2] === "create" ||
            location.pathname.split("/")[2] === "edit") && (
            <Save sx={{ mx: 2 }} color="gray" onClick={() => handleSave()} />
          )}

          {location.pathname.split("/")[2] === "view" && (
            <Link
              to={`/axelor-erp/edit/profile/${location.pathname.split("/")[4]}`}
            >
              <Edit />
            </Link>
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
