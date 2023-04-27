import TablePagination from "@mui/material/TablePagination";
import { useContext, useEffect, useState } from "react";
import Context from "../context";

export default function Pagination() {
  const [total, setTotal] = useState(0);
  const {
    getContacts,
    totalRecords,
    changeOffset,
    pageNo,
    handlePageChange,
  } = useContext(Context);

  const handleChangePage = (event, newPage) => {
    handlePageChange(newPage);
    getContacts(15, newPage * 15);
    changeOffset(newPage * 15);
  };
  useEffect(() => {
    setTotal(totalRecords);
  }, [totalRecords]);

  return (
    <TablePagination
      component="div"
      count={total || 0}
      page={pageNo}
      onPageChange={handleChangePage}
      rowsPerPage={15}
    />
  );
}
