import Box from "@mui/material/Box";
import ListView from "./components/ListView";
import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AddNewContact from "./components/AddNewContact";
import Context from "./context";
import ContactCardHolder from "./components/ContactCardHolder";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import { Layout } from "./components/Layout";
import "./App.css";

function App() {
  const {getDataFromServer,contacts}=useContext(Context)
  useEffect(() => {getDataFromServer()},[getDataFromServer]);
  return (
    <Box
      sx={{
        backgroundColor: "#f3f3f4",
        p: 0,
        minHeight: "95vh",
        overflow:'hidden',
        minWidth: "100vw",
      }}
    >
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
