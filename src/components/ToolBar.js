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
import { memo, useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { PUBLIC_URL } from "../constants";

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
  const [isRefreshed, setIsRefreshed] = useState(false);
  const {
    contact,
    modifiedFields,
    handleContact,
    modifyContact,
    clearSelectedContacts,
    setContacts,
    showToast,
  } = useContext(Context);
  const currentPage = location.pathname.split("/");
  const redirectToHome = () => {
    clearSelectedContacts();
    handleContact([]);
    navigate(PUBLIC_URL);
  };
  const handleSave = async () => {
    const fullName = contact.firstName? contact.firstName+ " " + contact.name:contact.name
    if (currentPage[2] === "edit") {
      if (modifiedFields.name === "")
        return showToast({
          variant: "error",
          text: "The following fields are invalid: Name",
        });
      const _id = contact.id;
      const _version = contact.version;
      if (modifiedFields.name || modifiedFields.firstName)
        modifiedFields.simpleFullName = modifiedFields.name;
      contact.companySet = "";
      const updatingData = {
        id: _id,
        version: _version,
        ...modifiedFields,
        _original: { ...contact },
      };
      await createOrUpdateNewContact(updatingData);
      modifyContact([]);
      setContacts((data) => {
        const newData = [...data];
        const index = data.findIndex((item) => item.id === _id);
        newData[index] = { ...newData[index], ...modifiedFields };
        return newData;
      });
      showToast({
        variant: "success",
        text: "Updated successfully (" + contact.name + ")",
      });
    } else {
      if (!contact.name || !contact.mainPartner)
        return showToast({
          variant: "error",
          text: "The following fields are invalid: Name/Main Company",
        });
      contact.fullName = fullName;
      contact.simpleFullName = fullName;
      contact.isContact = true;
      contact._original = {};
      contact.partnerTypeSelect = 2;
      await createOrUpdateNewContact(contact);
      handleContact([]);
      showToast({
        variant: "success",
        text: "New contact added successfully (" + contact.name + ")",
      });
      setContacts((data) => [...data, contact]);
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
            <Link
              onClick={() => {
                clearSelectedContacts();
                handleContact([]);
              }}
              to={`${PUBLIC_URL}/create`}
            >
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
            <Link
              onClick={() => handleContact([])}
              to={`${PUBLIC_URL}/edit/profile/${currentPage[4]}`}
            >
              <Edit />
            </Link>
          )}
        </Box>
        {/* -------------------------------------------------------------------------------------------------------- */}
        {(!currentPage[2] || currentPage[2] === "list") && (
          <Box onClick={() => setIsRefreshed(!isRefreshed)}>
            <Refresh />
          </Box>
        )}
        {
          <Box
            sx={{
              display:
                !currentPage[2] || currentPage[2] === "list" ? "flex" : "none",
            }}
          >
            {" "}
            <SearchBar
              isRefreshed={isRefreshed}
              setIsRefreshed={setIsRefreshed}
            />
          </Box>
        }
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
          <Link to={`${PUBLIC_URL}/list`}>
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
          <Link to={PUBLIC_URL}>
            {" "}
            <ViewModuleIcon color="gray" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const SearchBar = memo(({ isRefreshed, setIsRefreshed }) => {
  const [searchText, setSearchText] = useState("");
  const { handleSearch, handlePageChange } = useContext(Context);
  useEffect(() => {
    if (isRefreshed) setSearchText("");
  }, [isRefreshed]);

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
        value={searchText}
        onFocus={() => setIsRefreshed(false)}
        sx={{ padding: "1px 3px" }}
        onChange={(e) => {
          setSearchText(e.target.value);
          handlePageChange(0);
          handleSearch(e.target.value);
        }}
        inputProps={{ "aria-label": "search" }}
      />
      <Box
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
});

const Refresh = () => {
  const { getContacts, handlePageChange } = useContext(Context);
  return (
    <Box
      edge="start"
      color="rgba(0,0,0,0.7)"
      onClick={() => {
        getContacts(15, 0);
        handlePageChange(0);
      }}
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
