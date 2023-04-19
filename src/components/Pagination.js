import TablePagination from '@mui/material/TablePagination';
import { useContext, useState } from 'react';
import Context from '../context';

export default function Pagination() {
  const [page, setPage] = useState(0);
  const {getDataFromServer,totalRecords,setFetchOffset}=useContext(Context)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage*15);
    getDataFromServer(15,newPage*15)
    setFetchOffset(newPage*15)
  };
  return (
    <TablePagination
      component="div"
      count={totalRecords||0}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={15}
    />
  );
}