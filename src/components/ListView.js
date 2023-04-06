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
import Delete from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Context from "../context";

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
  const { deleteRecords, handleDeleteRecords } = React.useContext(Context);
  return (
    <TableContainer component={Paper}  sx={{overflow:"hidden",maxHeight:"calc(100vh-100px)"}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead >
          <TableRow sx={{ fontWeight: "600", height: "20px" ,}}>
            {header.map((val, key) => (
              <StyledTableHeaderCell key={key}>{val}</StyledTableHeaderCell>
            ))}
          </TableRow>
          <TableRow sx={{ fontWeight: "600", height: "20px" }}>
            {header.map((val, key) => {
              if (key !== 0) {
                return (
                  <StyledTableInputCell key={key}>
                    <StyledTableHeaderInput placeholder="Search..." />
                  </StyledTableInputCell>
                );
              } else {
                return (
                  <StyledTableInputCell key={key}>
                    {!!deleteRecords.length && (
                      <Delete onClick={handleDeleteRecords} />
                    )}
                  </StyledTableInputCell>
                );
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {contactsData.map((row) => (
            <React.Fragment>
              <ListRow key={row.updatedOn} row={row} />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const ListRow = ({ row }) => {
  const { setDeleteRecords, deleteRecords } = React.useContext(Context);
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
  const {
    id,
    simpleFullName,
    fixedPhone,
    mobilePhone,
    emailAddress,
    jobTitleFunction,
    mainPartner,
    version,
  } = row;
  const pattern = /\[(.*?)\]/;
  const match = emailAddress?.name?.match(pattern);
  const emailLabel = match ? match[1] : "";
  const handleDelete = (e) => {
    setChecked(true);
    if (e.target.checked) {
      setDeleteRecords((data) => [
        ...data,
        {
          id: id,
          version: version,
        },
      ]);
    } else {
      setDeleteRecords((data) => data.filter((obj) => obj.id !== id));
      setChecked(false);
    }
  };
  React.useEffect(() => {
    if (deleteRecords.length === 0) setChecked(false);
  }, [deleteRecords.length]);

  return (
    <TableRow
      onClick={() => navigate(`/axelor-erp/view/profile/${id}`)}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <StyledTableBodyCell
        align="left"
        onClick={(e) => e.stopPropagation()}
        sx={{ minWidth: "25px", fontWeight: "800" }}
      >
        <a href={`/axelor-erp/edit/profile/${id}`}>
          <EditIcon sx={{ fontSize: "16px" }} />
        </a>
        <input type="checkbox" checked={checked} onChange={handleDelete} />
      </StyledTableBodyCell>

      <StyledTableBodyCell component="th" scope="row"></StyledTableBodyCell>
      <StyledTableBodyCell>{simpleFullName}</StyledTableBodyCell>
      <StyledTableBodyCell>{fixedPhone}</StyledTableBodyCell>
      <StyledTableBodyCell>{mobilePhone}</StyledTableBodyCell>
      <StyledTableBodyCell>{emailLabel}</StyledTableBodyCell>
      <StyledTableBodyCell>
        {mainPartner?.fullName?.split(" - ")[1]}
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
