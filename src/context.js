import { createContext, useState } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [newContactData, setNewContactData] = useState([]);

  return (
    <Context.Provider value={{ setNewContactData, newContactData }}>
      {children}
    </Context.Provider>
  );
};

export default Context;