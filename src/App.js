import Box from "@mui/material/Box";
import ListView from "./components/ListView";
import ToolBar from "./components/ToolBar";
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewContact from "./components/AddNewContact";
import { AppContext } from "./context";
import { fetchContacts } from "./api/api";
import ContactCardHolder from "./components/ContactCardHolder";
import Profile from "./components/Profile";

import "./App.css";

function App() {
  const [contacts, setContacts] = useState(undefined);

  const filterIncompleteData = useCallback((data) => {
    const filteredData = data.filter((item) => {
      if (
        item.name &&
        item.simpleFullName &&
        item.fixedPhone &&
        item.mobilePhone &&
        item.emailAddress &&
        item.mainPartner &&
        item.mainAddress
      ) {
        return true;
      }
      return false;
    });

    setContacts(filteredData);
  }, []);

  const getContactsData = useCallback(() => {
    fetchContacts().then((res) => {
      filterIncompleteData(res.reverse());
    });
  }, [filterIncompleteData]);

  useEffect(() => {
    getContactsData();
  }, [getContactsData]);

  return (
    <AppContext>
      <Box
        sx={{
          backgroundColor: "#f3f3f4",
          p: 0,
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <img src="http://localhost:3000/axelor-erp/ws/rest/com.axelor.auth.db.User/1/image/download?image=true&v=6"></img>
        <ToolBar />
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/axelor-erp"
              element={
                contacts && <ContactCardHolder contactsData={contacts} />
              }
            />
            <Route
              exact
              path="/axelor-erp/list"
              element={contacts && <ListView contactsData={contacts} />}
            />
            <Route
              exact
              path="/axelor-erp/add-contact"
              element={<AddNewContact />}
            />
            <Route exact path="/axelor-erp/view/profile/:id" element={<Profile />} />
            <Route exact path="/axelor-erp/edit/profile/:id" element={<AddNewContact/>} />
          </Routes>
        </BrowserRouter>
      </Box>
    </AppContext>
  );
}

export default App;