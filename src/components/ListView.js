import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";


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
const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  border: "0.2px solid #efeeef",
  fontSize: "12px",
  textAlign: "center",
  padding: "0",
  fontWeight: "inherit",
}));
const StyledTableInputCell = styled(TableCell)(({ theme }) => ({
  border: "0.2px solid #efeeef",
  padding: "2px",
  textAlign: "center",
}));
const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "inherit",
}));
const StyledTableHeaderInput = styled("input")(({ theme }) => ({
  border: "none",
  fontSize: "12px",
  width: "100%",
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

export default function ListView({ contactsData }) {
  const navigate=useNavigate()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ fontWeight: "600", height: "20px" }}>
            {header.map((val) => (
              <StyledTableHeaderCell key={val}>{val}</StyledTableHeaderCell>
            ))}
          </TableRow>
          <TableRow sx={{ fontWeight: "600", height: "20px" }}>
            {header.map((val, key) => (
              <StyledTableInputCell key={val}>
                <StyledTableHeaderInput placeholder="Search..." />
              </StyledTableInputCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contactsData &&
            contactsData.map((row) => (
            
              <TableRow
                key={row.id+row.updatedOn}
                onClick={()=>navigate(`/axelor-erp/view/profile/${row.id}`)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableBodyCell
                  align="left"
                  sx={{ width: "10px", fontWeight: "800" }}
                >
                  <EditIcon sx={{ fontSize: "16px" }}   onClick={(e)=>{e.stopPropagation(); navigate(`/axelor-erp/edit/profile/${row.id}`)}}/>
                </StyledTableBodyCell>
                <StyledTableBodyCell component="th" scope="row">
                  
                </StyledTableBodyCell>
                <StyledTableBodyCell>{row.simpleFullName}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.fixedPhone}</StyledTableBodyCell>
                <StyledTableBodyCell>{row.mobilePhone}</StyledTableBodyCell>
                <StyledTableBodyCell>
                  {row.emailAddress?.name?.substring(
                    row.emailAddress?.name?.indexOf("[") + 1,
                    row?.emailAddress?.name.indexOf("]")
                  )}
                </StyledTableBodyCell>
                <StyledTableBodyCell>
                  {row.mainPartner?.fullName?.split(" - ")[1]}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{""}</StyledTableBodyCell>
                <StyledTableBodyCell sx={{ width: "8px", color: "#0275d8" }}>
                  <EmailIcon sx={{ fontSize: "16px" }} />
                </StyledTableBodyCell>
                <StyledTableBodyCell sx={{ width: "0px", color: "#0275d8" }}>
                  <Diversity3Icon sx={{ fontSize: "16px" }} />
                </StyledTableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
