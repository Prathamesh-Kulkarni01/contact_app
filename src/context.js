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
    const res = await fetchContacts();
    return res.reverse() || [];
  }, []);
  const filterIncompleteData = useCallback(
    async () => {
      const data=await getContactsData();
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
      return filteredData||[];
    },
    [getContactsData]
  );

  const handleDeleteRecords = async () => {
    const noOfRecords = deleteRecords.length;
    setLoading(true);
    const res = await deleteRecord(deleteRecords);
    filterIncompleteData();
    setDeleteRecords([]);
    setLoading(false);
    res.message
      ? alert("You can't delete referenced record")
      : alert(noOfRecords + " Contacts Deleted...");
  };

  useEffect(() => {
    (async () => setContacts(await filterIncompleteData()))();
    setLoading(false);
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
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
