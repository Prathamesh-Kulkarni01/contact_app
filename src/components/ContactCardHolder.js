// import * as React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import PhoneIcon from "@mui/icons-material/Phone";
// import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
// import HomeIcon from "@mui/icons-material/Home";
// import MailIcon from "@mui/icons-material/Mail";
// import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
// import { useNavigate } from "react-router-dom";

// export default function ContactCardHolder({ contactsData }) {
//   return (
//     <Box sx={{ flexGrow: 1, p: 2, ml: 2 }}>
//       <Grid
//         container
//         spacing={{ xs: 2, md: 3 }}
//         columns={{ xs: 4, sm: 8, md: 12 }}
//       >
//         {!!contactsData &&
//           contactsData.map((item, index) => (
//             <Grid item xs={4} sm={4} md={4} key={item.id}>
//               <ContactCard row={item} />
//             </Grid>
//           ))}
//       </Grid>
//     </Box>
//   );
// }

// const ContactCard = ({ row }) => {
//   const navigate = useNavigate();
//     return (
//     <Box
//       onClick={() => navigate(`/axelor-erp/profile/${row.id}`)}
//       sx={{
//         width: "100%",
//         height: "182px",
//         display: "flex",
//         backgroundColor: "white",
//       }}
//     >
//       <Box
//         sx={{
//           width: "40%",
//           height: "100%",
//           flexDirection: "column",
//           display: "flex",
//         }}
//       >
//         <CardMedia
//           component="img"
//           height="40%"
//           sx={{ maxWidth: "50%", margin: "15% 10% 0 15%" }}
//           image={true?`http://localhost:8080/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/${row?.picture?.id}/content/download`:"/axelor-erp/ws/rest/com.axelor.auth.db.User/1/image/download?image=true&v=61"}
//         ></CardMedia>
//         <Typography
//           variant="body2"
//           color="#333333"
//           sx={{ fontWeight: "550", pb: 0, ml: "30%" }}
//         >
//           {row.fullName?.split(" - ")[0]}
//         </Typography>

//         <Typography
//           variant="body2"
//           color="#333333"
//           sx={{
//             fontWeight: "550",
//             fontSize: "12px",
//             pt: 0,
//             textAlign: "center",
//             width: "70%",
//             ml: "8%",
//           }}
//         >
//           {row.fullName?.split(" - ")[1]}
//         </Typography>
//       </Box>

//       <Box
//         sx={{
//           width: "55%",
//           backgroundColor: "white",
//           height: "100%",
//           ml: "-30px",
//           transform: "skew(-20deg, 0deg)",
//           display: "flex",
//           alignItems: "center",
//           borderLeft: "3px solid #f3f3f4",
//         }}
//       >
//         <Box
//           sx={{
//             width: "30px",
//             backgroundColor: "#20bcb5",
//             height: "70%",
//             color: "white",
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <PhoneIcon
//             fontSize="10px"
//             sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
//           />
//           <PhoneAndroidIcon
//             fontSize="10px"
//             sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
//           />
//           <MailIcon
//             fontSize="10px"
//             sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
//           />
//           <BusinessOutlinedIcon
//             fontSize="10px"
//             sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
//           />
//           <HomeIcon
//             fontSize="10px"
//             sx={{ transform: "skew(20deg, 0deg)", m: "2px" }}
//           />
//         </Box>
//         <Box
//           sx={{
//             height: "70%",
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <Typography
//             sx={{
//               transform: "skew(20deg, 0deg)",
//               m: "0px 10px",
//               fontSize: "14px",
//             }}
//           >
//             {row.fixedPhone}
//           </Typography>
//           <Typography
//             sx={{
//               transform: "skew(20deg, 0deg)",
//               m: "0px 10px ",
//               fontSize: "14px",
//             }}
//           >
//             {row.mobilePhone}
//           </Typography>
//           <Typography
//             sx={{
//               transform: "skew(20deg, 0deg)",
//               m: "0px 10px",
//               fontSize: "13px",
//             }}
//           >
//             {row.emailAddress?.name?.substring(
//               row.emailAddress?.name?.indexOf("[") + 1,
//               row?.emailAddress?.name.indexOf("]")
//             )}
//           </Typography>
//           <Typography
//             sx={{
//               transform: "skew(20deg, 0deg)",
//               m: "0px 2px 0px 10px",
//               fontSize: "12px",
//             }}
//           >
//             {row.mainPartner?.fullName?.split(" - ")[1]}
//           </Typography>
//           <Typography
//             sx={{
//               transform: "skew(20deg, 0deg)",
//               m: "0px 12px 0px 10px",
//               fontSize: "12px",
//               width: "310px",
//             }}
//           >
//             {row.mainAddress?.fullName}
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
import React from "react";
import Cookies from "js-cookie";
const Token = Cookies.get("CSRF-TOKEN");
// const handle = async (e) => {
//   const selectedFile = e.target.files[0];
//   const formData = new FormData();
//   formData.append("file", selectedFile);
//   formData.append("field", undefined);
//   formData.append(
//     "request",
//     JSON.stringify({
//       data: {
//         // fileName: selectedFile.name,
//         fileType: selectedFile.type,
//         fileSize: selectedFile.size,
//         $upload: {
//           file: {},
//         },
//       },
//     })
//   );

//   const url =
//     "http://localhost:3000/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/upload";
//   const response = await fetch(url, {
//     method: "POST",
//     mode: "cors",
//     credentials: "include",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Accept: "*/*",
//       "X-CSRF-Token": Token,
//     },
//     body: formData,
//   });
//   const data = await response.json();
//   return data.data;
// };
// const handleFileSelect = (event) => {
//   const selectedFile = event.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(selectedFile);
//   reader.onload = () => {
//     const base64 = reader.result.split(",")[1];

//     const byteArray = new Uint8Array(
//       atob(base64)
//         .split("")
//         .map((char) => char.charCodeAt(0))
//     );
//     const blob = new Blob([byteArray], { type: selectedFile.type });
//     const formData = new FormData();
//     formData.append("file", blob);
//     formData.append("field", "undefined");
//     formData.append(
//       "request",
//       JSON.stringify({
//         data: {
//           fileName: selectedFile.name,
//           fileType: selectedFile.type,
//           fileSize: selectedFile.size,
//           $upload: { file: {} },
//         },
//       })
//     );
//     const requestHeaders = new Headers({
//       Accept: "*/*",
//       "Content-Type": "multipart/form-data",
//       "X-CSRF-Token": "12383e44d9b74fa99fc00c0eed940107",
//     });

//     const request = new Request(
//       "http://localhost:3000/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/upload",
//       {
//         method: "POST",
//         headers: requestHeaders,
//         body: formData,
//       }
//     );

//     fetch(request)
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));
//   };
// };

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  console.log(file);
  if (file === undefined) return;
  const headers = {
    "X-File-Name": file.name,
    "X-File-Offset": 0,
    "X-File-Size": file.size,
    "X-File-Type": file.type,
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
    "X-CSRF-Token": Token,
  };
  const formData = new FormData();
  formData.append("file", file);
  fetch(
    "http://localhost:3000/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/upload",
    {
      method: "POST",
      headers: headers,
      body: file,
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
const ContactCardHolder = () => {
  return <input type="file" onChange={(e)=>handleImageUpload(e)}></input>;
};

export default ContactCardHolder;
