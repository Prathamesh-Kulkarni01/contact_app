import { createContext, useState } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [newContactData, setNewContactData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  console.log(updatedData);
  return (
    <Context.Provider
      value={{ setNewContactData, newContactData, updatedData, setUpdatedData }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
