import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context";
import { PUBLIC_URL } from "../constants";

const header = [
  "",
  "Reference",
  "Name",
  "Phone Number",
  "Mobile Number",
  "Email",
  "Main Company",
  "Function",
  " ",
  " ",
];
const StyledTableHeaderCell = styled(TableCell)(() => ({
  border: "0.2px solid #efeeef",
  fontSize: "12px",
  textAlign: "center",
  padding: "0",
  fontWeight: "inherit",
}));
const StyledTableInputCell = styled(TableCell)(() => ({
  border: "0.2px solid #efeeef",
  padding: "2px",
  minWidth: "30px",
  textAlign: "center",
}));
const StyledTableBodyCell = styled(TableCell)(() => ({
  fontSize: "12px",
  fontWeight: "inherit",
}));
const StyledTableHeaderInput = styled("input")(() => ({
  border: "none",
  fontSize: "12px",
  width: "100%",
  padding: "10px",
  background: "transparent",
  "&::placeholder": {
    color: "transparent",
  },
  "&:focus": {
    outline: "none",
    "&::placeholder": {
      color: "gray",
    },
  },
}));

export default function ListView({ contactsData = [] }) {
  return (
    <TableContainer sx={{ height: "98vh"}} component={Paper}>
      <HeaderRow />
      <Table>
        <TableBody>
          {contactsData.map((row) => (
            <ListRow key={row.updatedOn} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const ListRow = ({ row }) => {
  const { handleDelete, deleteRecords } = useContext(Context);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const {
    id,
    firstName,
    name,
    fixedPhone,
    mobilePhone,
    partnerSeq,
    jobTitleFunction,
    version,
  } = row;
  const handleDeleteRecord = (e) => {
    setChecked(true);
    if (e.target.checked) {
      handleDelete((data) => [
        ...data,
        {
          id: id,
          version: version,
        },
      ]);
    } else {
      handleDelete((data) => data.filter((obj) => obj.id !== id));
      setChecked(false);
    }
  };
  const navigateToEdit = (id) => {
    handleDelete([])
    navigate(`${PUBLIC_URL}/edit/profile/${id}`);
  };
  const navigateToProfile = (id) => {
    handleDelete([])
    navigate(`${PUBLIC_URL}/view/profile/${id}`);
  };
  useEffect(() => {
    if (!deleteRecords.length) setChecked(false);
  }, [deleteRecords.length]);

  return (
    <TableRow
      onClick={() => navigateToProfile(id)}
      sx={{ width: "100vw", "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <StyledTableBodyCell
        align="left"
        onClick={(e) => e.stopPropagation()}
        sx={{ minWidth: "25px", fontWeight: "800" }}
      >
        <EditIcon onClick={()=>navigateToEdit(id)} sx={{ fontSize: "16px" }} />
        <input type="checkbox" checked={checked} onChange={handleDeleteRecord} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>{partnerSeq}</StyledTableBodyCell>
      <StyledTableBodyCell>{firstName + " " + name}</StyledTableBodyCell>
      <StyledTableBodyCell>{fixedPhone}</StyledTableBodyCell>
      <StyledTableBodyCell>{mobilePhone}</StyledTableBodyCell>
      <StyledTableBodyCell> {row["emailAddress.address"]}</StyledTableBodyCell>
      <StyledTableBodyCell>
        {row["mainPartner.simpleFullName"]}
      </StyledTableBodyCell>
      <StyledTableBodyCell>{jobTitleFunction?.name}</StyledTableBodyCell>
      <StyledTableBodyCell sx={{ width: "8px", color: "#0275d8" }}>
        <EmailIcon sx={{ fontSize: "16px" }} />
      </StyledTableBodyCell>
      <StyledTableBodyCell sx={{ width: "0px", color: "#0275d8" }}>
        <Diversity3Icon sx={{ fontSize: "16px" }} />
      </StyledTableBodyCell>
    </TableRow>
  );
};

const HeaderRow = () => {
  const { deleteRecords, handleDeleteRecords } = useContext(Context);
  return (
    <Box className="header_tb">
      <Table size="small" aria-label="a dense table">
        <TableHead sx={{ maxWidth: 650 }}>
          <TableRow sx={{ fontWeight: "600", height: "20px" }}>
            {header.map((val, key) => (
              <StyledTableHeaderCell key={key}>{val}</StyledTableHeaderCell>
            ))}
          </TableRow>
          <TableRow sx={{ fontWeight: "600", height: "20px" }}>
            {header.map((val, key) => (
              <StyledTableInputCell key={key}>
                {key === 0 && deleteRecords.length > 0 && (
                  <Delete onClick={handleDeleteRecords} />
                )}
                {key !== 0 && (
                  <StyledTableHeaderInput placeholder="Search..." />
                )}
              </StyledTableInputCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </Box>
  );
};
