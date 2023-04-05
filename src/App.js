import Box from "@mui/material/Box";
import ListView from "./components/ListView";
import ToolBar from "./components/ToolBar";
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewContact from "./components/AddNewContact";
import Context from "./context";
import ContactCardHolder from "./components/ContactCardHolder";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const { contacts } = useContext(Context);
  return (
    <Box
      sx={{
        backgroundColor: "#f3f3f4",
        p: 0,
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <BrowserRouter>
        <ToolBar />
        <Box mt={8}>
          <Loader />
          <Routes>
            <Route
              path={"/axelor-erp"}
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
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
