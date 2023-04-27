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
  const [modifiedFields, setModifiedFields] = useState({});
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState(undefined);
  const [loading, setLoading] = useState({ a: "" });
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [toast, setToast] = useState(false);
  const [fetchOffset, setFetchOffset] = useState(0);

  const handleContact = (data) => {
    setContact(data);
  };
  const modifyContact = (data) => {
    setModifiedFields(data);
  };
  const showToast = (data) => {
    setToast(data);
  };
  const changeOffset = (data) => {
    setFetchOffset(data);
  };
  const addToSelectedContact = (data) => {
    setSelectedContacts(data);
  };
  const handlePageChange = (data) => {
    setPageNo(data);
  };

  const getContacts = useCallback(async (limit, offset) => {
    setLoading(true);
    const res = await fetchContacts(limit, offset);
    setTotalRecords(res.total);
    setLoading(false);
    setContacts(res.data || []);
  }, []);

  const handleDeleteRecords = async () => {
    const noOfRecords = selectedContacts.length;
    setLoading(true);
    const res = await deleteRecord(selectedContacts);
    getContacts(15, fetchOffset);
    setSelectedContacts([]);
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
    getContacts(15, fetchOffset);
    setSelectedContacts([]);
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
  const clearSelectedContacts = () => {
    setSelectedContacts([]);
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
        modifiedFields,
        modifyContact,
        selectedContacts,
        addToSelectedContact,
        handleDeleteRecords,
        clearSelectedContacts,
        getContacts,
        totalRecords,
        toast,
        showToast,
        handleSearch,
        fetchOffset,
        changeOffset,
        handleSingleDelete,
        handlePageChange,
        pageNo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
