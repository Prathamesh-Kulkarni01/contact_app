import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Save from "@mui/icons-material/Save";
import Edit from "@mui/icons-material/Edit";
import ArrowBack from "@mui/icons-material/ArrowBack";
import RefreshRounded from "@mui/icons-material/RefreshRounded";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import Pagination from "./Pagination";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrUpdateNewContact } from "../api/api";
import { useContext, useState } from "react";
import { Context } from "../context";

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
    clearDeleteRecords,
    setContacts,
    setToast,
    fetchOffset,
  } = useContext(Context);
  const currentPage = location.pathname.split("/");
  const redirectToHome = () => {
    clearDeleteRecords();
    setNewContactData([]);
    navigate("/axelor-erp");
  };
  const handleSave = async () => {
    const fullName = newContactData.firstName + " " + newContactData.name;
    if (currentPage[2] === "edit") {
      if (updatedData.name === "")
        return setToast({
          variant: "error",
          text: "The following fields are invalid: Name",
        });
      const _id = newContactData.id;
      const _version = newContactData.version;
      if (updatedData.name || updatedData.firstName)
        updatedData.simpleFullName = updatedData.name;
      const updatingData = {
        id: _id,
        version: _version,
        ...updatedData,
        _original: { ...newContactData },
      };
      await createOrUpdateNewContact(updatingData);
      setUpdatedData([]);
      setContacts((data) => {
        const newData = [...data];
        const index = data.findIndex((item) => item.id === _id);
        newData[index] = { ...newData[index], ...updatedData };
        return newData;
      });
      setToast({
        variant: "success",
        text: "Updated successfully (" + newContactData.name + ")",
      });
    } else {
      if (!newContactData.name)
        return setToast({
          variant: "error",
          text: "The following fields are invalid: Name",
        });
      newContactData.fullName = fullName;
      newContactData.simpleFullName = fullName;
      newContactData.isContact = true;
      newContactData._original = {};
      await createOrUpdateNewContact(newContactData);
      setNewContactData([]);
      setToast({
        variant: "success",
        text: "New Contact added successfully (" + newContactData.name + ")",
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
            <ArrowBack onClick={() => navigate(-1)} />
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
            <Link onClick={() => clearDeleteRecords()} to="/axelor-erp/create">
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
        {/* -------------------------------------------------------------------------------------------------------- */}
        {(!currentPage[2] || currentPage[2] === "list") && <Refresh />}
        {(!currentPage[2] || currentPage[2] === "list") && <SearchBar />}
        <div className={classes.spacer} />
        {(!currentPage[2] || currentPage[2] === "list") && <Pagination />}
        {/* ---------------------------------------------------------------------------------------------------------------- */}
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

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { handleSearch } = useContext(Context);

  return (
    <Box
      sx={{
        border: "1px solid grey",
        height: "30px",
        display: "flex",
        ml: "30px",
      }}
    >
      <InputBase
        placeholder="Search…"
        sx={{ padding: "1px 3px" }}
        onChange={(e) => setSearchText(e.target.value)}
        inputProps={{ "aria-label": "search" }}
      />
      <Box
        onClick={() => handleSearch(searchText)}
        sx={{
          backgroundColor: "rgba(0,0,0, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0, 0.35)",
          },
        }}
      >
        <SearchOutlined sx={{ color: "grey", m: "3px" }} />
      </Box>
    </Box>
  );
};

const Refresh = () => {
  const { getDataFromServer, fetchOffset } = useContext(Context);
  return (
    <Box
      edge="start"
      color="rgba(0,0,0,0.7)"
      onClick={() => getDataFromServer(15, fetchOffset)}
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
      <RefreshRounded sx={{ mx: 2 }} color="gray" />{" "}
    </Box>
  );
};
