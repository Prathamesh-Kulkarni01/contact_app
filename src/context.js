import { createContext, useCallback, useEffect, useState } from "react";
import { deleteRecord, fetchContacts } from "./api/api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [newContactData, setNewContactData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [deleteRecords, setDeleteRecords] = useState([]);
  const [contacts, setContacts] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const filterIncompleteData = useCallback((data) => {
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
    setContacts(filteredData);
    setLoading(false);
  }, []);

  const getContactsData = useCallback(async () => {
    setLoading(true);
    const res = await fetchContacts();
    return res.reverse() || [];
  }, []);

  const handleDeleteRecords = async () => {
    const noOfRecords = deleteRecords.length;
    setLoading(true);
    const res = await deleteRecord(deleteRecords);
    filterIncompleteData(await getContactsData());
    setDeleteRecords([]);
    setLoading(false);
    res.message
      ? alert("You can not delete AOS predefined contacts...")
      : alert(noOfRecords + " Contacts Deleted...");
  };

  useEffect(() => {
    (async () => filterIncompleteData(await getContactsData()))();
  }, [filterIncompleteData, getContactsData]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
