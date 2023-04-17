import TablePagination from '@mui/material/TablePagination';
import { useContext, useState } from 'react';
import Context from '../context';

export default function Pagination() {
  const [page, setPage] = useState(0);
  const {getDataFromServer,totalRecords}=useContext(Context)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
    getDataFromServer(17,newPage*17)
  };
  return (
    <TablePagination
      component="div"
      count={totalRecords||0}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={10}
    />
  );
}