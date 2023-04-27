import { useContext, useEffect, useState } from "react"; 

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
  textAlign: "center",
  height: "30px",
  borderCollapse: "collapse",
  border: "0.8px solid rgba(0,0,0,0.08)",
  padding: "6px",
}));

const StyledTableBodyCell = styled(TableCell)(() => ({
  fontSize: "12px",
  fontWeight: "inherit",
}));

export default function ListView({ contactsData = [] }) {
  return (
    <TableContainer sx={{ height: "98vh", mt: "60px" }} component={Paper}>
      <Table stickyHeader>
        <HeaderRow />
        <TableBody>
          {contactsData.map((row,key) => (
            <ListRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const ListRow = ({ row }) => {
  const { addToSelectedContact, selectedContacts } = useContext(Context);
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
      addToSelectedContact((data) => [
        ...data,
        {
          id: id,
          version: version,
        },
      ]);
    } else {
      addToSelectedContact((data) => data.filter((obj) => obj.id !== id));
      setChecked(false);
    }
  };
  const navigateToEdit = (id) => {
    addToSelectedContact([]);
    navigate(`${PUBLIC_URL}/edit/profile/${id}`);
  };
  const navigateToProfile = (id) => {
    addToSelectedContact([]);
    navigate(`${PUBLIC_URL}/view/profile/${id}`);
  };
  useEffect(() => {
    if (!selectedContacts.length) setChecked(false);
  }, [selectedContacts.length]);

  return (
    <TableRow
      onClick={() => navigateToProfile(id)}
      sx={{ width: "100vw",  }}
    >
      <StyledTableBodyCell
        align="left"
        onClick={(e) => e.stopPropagation()}
        sx={{ minWidth: "25px",maxWidth:'30px', fontWeight: "800" }}
      >
        <EditIcon
          onClick={() => navigateToEdit(id)}
          sx={{ fontSize: "16px", mx:"5px" ,p:"2px", backgroundColor:"#0275d8",color:'white',borderRadius:'5px' }}
        />
        <input
          type="checkbox"
          style={{ width: "20px",
            height: "20px"}}
          checked={checked}
          onChange={handleDeleteRecord}
        />
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
  const { selectedContacts, handleDeleteRecords } = useContext(Context);
  return (
    <>
      <TableHead sx={{ maxWidth: 650 }}>
        <TableRow sx={{ fontWeight: "600", height: "20px" }}>
          {header.map((val, key) => (
            <StyledTableHeaderCell  sx={{maxWidth:'30px'}} key={key}>
              {key === 0 && selectedContacts.length > 0 && (
                <Delete onClick={handleDeleteRecords} />
              )}
               {key === 0 && selectedContacts.length===0 && (
                <Delete sx={{color:"rgba(0,0,0,0.3)"}}/>
              )}
              {key !== 0 && val}
            </StyledTableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};
