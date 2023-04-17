import Box from "@mui/material/Box";
import ListView from "./components/ListView";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNewContact from "./components/AddNewContact";
import Context from "./context";
import ContactCardHolder from "./components/ContactCardHolder";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import { Layout } from "./components/Layout";
import "./App.css";
import Toast from "./components/Toast";

function App() {
  const { getDataFromServer, contacts } = useContext(Context);
  useEffect(() => {
    getDataFromServer();
  }, [getDataFromServer]);
  return (
    <Box
      sx={{
        backgroundColor: "#f3f3f4",
        p: 0,
        height: "100vh",
        minWidth: "100vw",
        overflow:'hidden'
      }}
    >
      <Toast />
      <Router>
        <Box mt={5}>
          <Loader />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path={"/axelor-erp/"}
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
                path="/axelor-erp/create"
                element={<AddNewContact />}
              />
              <Route
                exact
                path="/axelor-erp/view/profile/:id"
                element={<Profile />}
              />
              <Route
                exact
                path="/axelor-erp/edit/profile/:id"
                element={<AddNewContact />}
              />
            </Route>
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}

export default App;

//TODO:

// Selection search & whole list is not working (main company, other)

// notes not working

// Edit mode is not properly working for notes/multiselect of side panel

// manage view on back (from to card/grid)

// optimise back api calls

// add common search for grid

// Update alert dialog (don't use browser alert)
