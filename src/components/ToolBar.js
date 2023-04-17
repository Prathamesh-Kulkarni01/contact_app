import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Save from "@mui/icons-material/Save";
import Edit from "@mui/icons-material/Edit";
import { ArrowBack } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrUpdateNewContact } from "../api/api";
import { useContext } from "react";
import { Context } from "../context";
import Pagination from "./Pagination";

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
  const {
    newContactData,
    updatedData,
    setNewContactData,
    setUpdatedData,
    getDataFromServer,
    clearDeleteRecords,
    setToast,
  } = useContext(Context);
  const currentPage = location.pathname.split("/");
  const redirectToHome = () => {
    clearDeleteRecords();
    setNewContactData([]);
    getDataFromServer();
    navigate("/axelor-erp");
  };
  const handleSave = async () => {
    const fullName = newContactData.firstName + " " + newContactData.name;
    if (currentPage[2] === "edit") {
      if (!updatedData.name || updatedData.name === "")
        return setToast({
          variant: "error",
          text: "The following fields are invalid: Name",
        });
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
      if (!newContactData.name)
        return setToast({
          variant: "error",
          text: "The following fields are invalid: Name",
        });

      newContactData.fullName = fullName;
      newContactData.simpleFullName = fullName;
      newContactData.isContact = true;
      await createOrUpdateNewContact(newContactData);
      setNewContactData([]);
      alert("Added Successfully" + newContactData.name);
       setToast({
        variant: "success",
        text: "Added Successfully" + newContactData.name,
      });
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
          {(currentPage[2] === "create" ||
            currentPage[2] === "edit" ||
            currentPage[2] === "view") && (
            <ArrowBack onClick={() => redirectToHome()} />
          )}
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
          {currentPage[2] !== "create" && currentPage[2] !== "edit" && (
            <Link to="/axelor-erp/create">
              {" "}
              <AddIcon sx={{ mx: 2 }} color="gray" />{" "}
            </Link>
          )}
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
          {(currentPage[2] === "create" || currentPage[2] === "edit") && (
            <Save sx={{ mx: 2 }} color="gray" onClick={() => handleSave()} />
          )}

          {currentPage[2] === "view" && (
            <Link to={`/axelor-erp/edit/profile/${currentPage[4]}`}>
              <Edit />
            </Link>
          )}
        </Box>
        <div className={classes.spacer} />
        <Pagination />
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
          <Link to="/axelor-erp/list">
            <FormatListBulletedIcon color="gray" />
          </Link>
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
          <Link to="/axelor-erp/">
            {" "}
            <ViewModuleIcon color="gray" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
