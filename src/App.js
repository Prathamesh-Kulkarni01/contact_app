import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Context from "./context";
import GridView from "./components/GridView";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import ListView from "./components/ListView";
import { Layout } from "./components/Layout";
import "./App.css";
import { PUBLIC_URL } from "./constants";
import Form from "./components/Form";

function App() {
  const { getContacts, contacts } = useContext(Context);
  useEffect(() => {
    getContacts();
  }, [getContacts]);
  return (
    <Box
      sx={{
        backgroundColor: "#f3f3f4",
        p: 0,
        height: "100vh",
        minWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <Toast />
      <Router>
        <Box mt={5}>
          <Loader />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path={PUBLIC_URL}
                element={<GridView contactsData={contacts} />}
              />
              <Route
                exact
                path={`${PUBLIC_URL}/list`}
                element={<ListView contactsData={contacts} />}
              />
              <Route exact path={`${PUBLIC_URL}/create`} element={<Form />} />
              <Route
                exact
                path={`${PUBLIC_URL}/view/profile/:id`}
                element={<Profile />}
              />
              <Route
                exact
                path={`${PUBLIC_URL}/edit/profile/:id`}
                element={<Form />}
              />
            </Route>
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}

export default App;
