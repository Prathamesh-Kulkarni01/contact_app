import { createContext, useCallback, useMemo, useState } from "react";
import { deleteRecord, fetchContacts, searchContact } from "./api/api";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [contact, setContact] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [deleteRecords, setDeleteRecords] = useState([]);
  const [contacts, setContacts] = useState(undefined);
  const [loading, setLoading] = useState({ a: "" });
  const [totalRecords, setTotalRecords] = useState(0);
  const [toast, setToast] = useState(false);
  const [fetchOffset, setFetchOffset] = useState(0);

  const handleContact = (data) => {
    setContact(data);
  };
  const handleUpdatedData = (data) => {
    setUpdatedData(data)
  };
  const handleToast = (data) => {
    setToast(data)
  };
  const handleOffset = (data) => {
    setFetchOffset(data)
  };
  const handleDelete = (data) => {
    setDeleteRecords(data)
  };

  const getDataFromServer = useCallback(async (limit, offset) => {
    setLoading(true);
    const res = await fetchContacts(limit, offset);
    setTotalRecords(res.total);
    setLoading(false);
    setContacts(res.data || []);
  }, []);

  const handleDeleteRecords = async () => {
    const noOfRecords = deleteRecords.length;
    setLoading(true);
    const res = await deleteRecord(deleteRecords);
    getDataFromServer(15, fetchOffset);
    setDeleteRecords([]);
    setLoading(false);
    res.message
      ? setToast({
          variant: "error",
          text: "You can't delete referenced record",
        })
      : setToast({
          variant: "success",
          text: noOfRecords + " Contacts Deleted...",
        });
  };
  const handleSingleDelete = async (record) => {
    setLoading(true);
    const res = await deleteRecord([{ ...record }]);
    getDataFromServer(15, fetchOffset);
    setDeleteRecords([]);
    setLoading(false);
    res.message
      ? setToast({
          variant: "error",
          text: "You can't delete referenced record",
        })
      : setToast({
          variant: "success",
          text: 1 + " Contacts Deleted...",
        });
  };
  const clearDeleteRecords = () => {
    setDeleteRecords([]);
  };


  const handleSearch = useMemo(
    () =>
      debounce(async (text) => {
        setLoading(true);
        const res = await searchContact(text);
        setTotalRecords(res.total);
        setLoading(false);
        setContacts(res.data || []);
      }, 500),
    []
  );

  return (
    <Context.Provider
      value={{
        contact,
        setContacts,
        loading,
        handleContact,
        contacts,
        updatedData,
        handleUpdatedData,
        deleteRecords,
        handleDelete,
        handleDeleteRecords,
        clearDeleteRecords,
        getDataFromServer,
        totalRecords,
        toast,
        handleToast,
        handleSearch,
        fetchOffset,
        handleOffset,
        handleSingleDelete,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;

