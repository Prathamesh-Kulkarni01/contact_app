import { createContext, useCallback, useState } from "react";
import { deleteRecord, fetchContacts } from "./api/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [newContactData, setNewContactData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [deleteRecords, setDeleteRecords] = useState([]);
  const [contacts, setContacts] = useState(undefined);
  const [loading, setLoading] = useState({a:""});
  const [totalRecords, setTotalRecords] = useState(0);
  const [toast, setToast] = useState(true);
  const getDataFromServer = useCallback(async (limit, offset) => {
    setLoading(true);
    const res = (await fetchContacts(limit, offset)) || [];
    setTotalRecords(res.total);
    setLoading(false);
    setContacts(res.data || []);
  }, []);

  const handleDeleteRecords = async () => {
    const noOfRecords = deleteRecords.length;
    setLoading(true);
    const res = await deleteRecord(deleteRecords);
    getDataFromServer();
    setDeleteRecords([]);
    setLoading(false);
    res.message
      ?
    setToast({
        variant: "error",
        text: "You can't delete referenced record",
      })
      : 
      setToast({
        variant: "success",
        text: noOfRecords + " Contacts Deleted...",
      })
    }
  const clearDeleteRecords = () => {
    setDeleteRecords([]);
  };
  return (
    <Context.Provider
      value={{
        contacts,
        loading,
        setNewContactData,
        newContactData,
        updatedData,
        setUpdatedData,
        deleteRecords,
        setDeleteRecords,
        handleDeleteRecords,
        setLoading,
        clearDeleteRecords,
        getDataFromServer,
        totalRecords,
        toast,
        setToast,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
