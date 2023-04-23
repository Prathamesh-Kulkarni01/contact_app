import TablePagination from '@mui/material/TablePagination';
import { useContext, useEffect, useState } from 'react';
import Context from '../context';

export default function Pagination() {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0)
  const {getDataFromServer,totalRecords,handleOffset}=useContext(Context)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getDataFromServer(15,newPage*15)
    handleOffset(newPage*15)
  };
  useEffect(() => {
   setTotal(totalRecords)
   setPage(0)
  }, [totalRecords])
  
  return (
    <TablePagination
      component="div"
      count={total||0}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={15}
    />
  );
}