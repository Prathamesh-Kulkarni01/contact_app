import { createContext, useCallback, useState } from "react";
import { deleteRecord, fetchContacts } from "./api/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [newContactData, setNewContactData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [deleteRecords, setDeleteRecords] = useState([]);
  const [contacts, setContacts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0)

  // const getContactsData = useCallback(async () => {
  //   setLoading(true);
  //   const res = (await fetchContacts()) || [];
  //   return res.reverse();
  // }, []);
  const getDataFromServer = useCallback(async (limit,offset) => {
    setLoading(true);
    const res = (await fetchContacts(limit,offset)) || [];
    setTotalRecords(res.total)
    // res.data.reverse();
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
      ? alert("You can't delete referenced record")
      : alert(noOfRecords + " Contacts Deleted...");
  };
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
