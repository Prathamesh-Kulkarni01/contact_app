import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Delete  from "@mui/icons-material/Delete";
import Edit  from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../context";

export default function ContactCardHolder({ contactsData = [] }) {
  return (
    <Box>
      <Box sx={{ flexGrow: 1, p: 2, ml: 2, height: "95vh", overflowY: "auto" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {contactsData.map((item, index) => (
            <Grid item xs={4} sm={4} md={4} key={item.id}>
              <ContactCard row={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const ContactCard = ({ row }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    firstName,
    fixedPhone,
    mobilePhone,
    mainAddress,
    partnerSeq,
    picture,
  } = row;
  const imgId = picture?.id || 1;
  const { setDeleteRecords, handleSingleDelete } = useContext(Context);
  const handleDelete = (e) => {
    e.stopPropagation();
    handleSingleDelete({id: id})
  }
  const navigateToEdit = (e,id) => {
    e.stopPropagation();
    setDeleteRecords([]);
    navigate(`/axelor-erp/edit/profile/${id}`);
  };
  return (
    <Box
      onClick={() => navigate(`/axelor-erp/view/profile/${id}`)}
      sx={{
        width: "100%",
        height: "182px",
        display: "flex",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: "100%",
          position: "relative",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <CardMedia
          component="img"
          height="40%"
          sx={{
            maxWidth: "50%",
            margin: "15% 10% 0 15%",
            objectFit: "contain",
          }}
          image={
            imgId
              ? `/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/${imgId}/content/download`
              : "http://localhost:8080/axelor-erp/img/partner-m-default.png"
          }
        />
        <Typography
          variant="body2"
          color="#333333"
          sx={{ fontWeight: "550", pb: 0, width: "70%", textAlign: "center" }}
        >
          {partnerSeq}
        </Typography>
        <Typography
          variant="body2"
          color="#333333"
          sx={{ fontWeight: "550", pb: 0, width: "70%", textAlign: "center" }}
        >
          {firstName + " " + name}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "55%",
          backgroundColor: "white",
          height: "100%",
          ml: "-30px",
          transform: "skew(-20deg, 0deg)",
          display: "flex",
          alignItems: "center",
          borderLeft: "3px solid #f3f3f4",
        }}
      >
        <Box
          sx={{
            width: "30px",
            backgroundColor: "#20bcb5",
            height: "70%",
            color: "white",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PhoneIcon
            fontSize="10px"
            sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
          />
          <PhoneAndroidIcon
            fontSize="10px"
            sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
          />
          <MailIcon
            fontSize="10px"
            sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
          />
          <BusinessOutlinedIcon
            fontSize="10px"
            sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
          />
          <HomeIcon
            fontSize="10px"
            sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
          />
        </Box>
        <Box
          sx={{
            height: "70%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              transform: "skew(20deg, 0deg)",
              m: "0px 10px",
              fontSize: "14px",
            }}
          >
            {fixedPhone}
          </Typography>
          <Typography
            sx={{
              transform: "skew(20deg, 0deg)",
              m: "0px 10px ",
              fontSize: "14px",
            }}
          >
            {mobilePhone}
          </Typography>
          <Typography
            sx={{
              transform: "skew(20deg, 0deg)",
              m: "0px 10px",
              fontSize: "13px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {row["emailAddress.address"]}
          </Typography>
          <Typography
            sx={{
              transform: "skew(20deg, 0deg)",
              m: "0px 2px 0px 10px",
              fontSize: "12px",
            }}
          >
            {row["mainPartner.simpleFullName"]}
          </Typography>
          <Typography
            sx={{
              transform: "skew(20deg, 0deg)",
              m: "0px 12px 0px 10px",
              fontSize: "12px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {mainAddress?.fullName}
          </Typography>
        </Box>
        <Box sx={{ position: "absolute", top: "10px", right: 0 }}>
          <Edit
            onClick={(e) => navigateToEdit(e,id)}
            sx={{
              fontSize: "16px",
              color: "grey",
              mx: 1,
              "&:hover": {
                transition: "0.5s",
                color: "black",
              },
            }}
          />
          <Delete
            sx={{
              fontSize: "16px",
              color: "grey",
              "&:hover": {
                color: "black",
                transition: "0.5s",
              },
            }}
            onClick={(e) => handleDelete(e)}
          />
        </Box>
      </Box>
    </Box>
  );
};
