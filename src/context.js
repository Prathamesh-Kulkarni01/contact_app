import { createContext, useCallback, useEffect, useState } from "react";
import { deleteRecord, fetchContacts } from "./api/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [newContactData, setNewContactData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [deleteRecords, setDeleteRecords] = useState([]);
  const [contacts, setContacts] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const getContactsData = useCallback(async () => {
    setLoading(true);
    const res = await fetchContacts()||[];
    return res.reverse();
  }, []);
  const getDataFromServer = useCallback(async () => {
    const data = await getContactsData();
    const filteredData = data.filter((item) =>
      item.name &&
      item.simpleFullName &&
      item.fixedPhone &&
      item.mobilePhone &&
      item.emailAddress &&
      item.mainPartner
        ? true
        : false
    );
    return filteredData || [];
  }, [getContactsData]);

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
  const clearDeleteRecords=()=>{
    setDeleteRecords([]);
  }

  useEffect(() => {
    (async () => setContacts(await getDataFromServer()))();
    setLoading(false);
  }, [getDataFromServer, getContactsData]);

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
        clearDeleteRecords
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
