import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  fetchAccountOwner,
  fetchAddress,
  fetchContactById,
  fetchDepartments,
  fetchFunctions,
  fetchLanguage,
  fetchMainCompany,
  fetchManager,
  fetchTeams,
} from "../api/api";
import {
  AssociatedCompanies,
  CustomCheckBox,
  ImageInput,
  MyStatefulEditor,
  NormalInput,
  PhoneNumberWithCountrySelect,
  SearchInput,
  StaticSelect,
} from "./InputComponents";

import { Context } from "../context";
import { useParams } from "react-router-dom";

const AddNewContact = () => {
  const { setNewContactData,newContactData } = useContext(Context);
console.log("newContactData",newContactData);
  const { id } = useParams();
  const getProfileData = useCallback(() => {
    fetchContactById(id).then((res) => {
      setNewContactData(res[0]);
    });
  }, [id, setNewContactData]);
  useEffect(() => {
    getProfileData();
  }, [getProfileData, id,]);
useEffect(()=>{
setNewContactData(data=>{
  console.log("--",data.hasOwnProperty("name"));
  return data
})
},[newContactData, setNewContactData])

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          mt: "10px",
          mx: { xs: "10px", sm: "20px", md: "30px" },
          margin: "0 20px",
        }}
      >
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <Box
            sx={{
              width: "91%",
              height: { xs: "auto", sm: "auto" },
              m: { xs: "0", sm: "0 30px 10% 10%" },
            }}
          >
            <ProfileTopForm setNewContactData={setNewContactData}  />
            <ContactBoxWithTabs setNewContactData={setNewContactData} />
          </Box>
        </Grid>
        <RightContent setNewContactData={setNewContactData} />
      </Grid>
    </Box>
  );
};

export default AddNewContact;

export const ProfileTopForm = ({ setNewContactData }) => {
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: "1px", border: "1px solid rgba(0,0,0,0.1)" }}
    >
      <Grid container sx={{ p: 2 }}>
        <Box
          sx={{
            width: { md: "100%", sm: "90%", xs: "90%", lg: "20%" },
            minHeight: "auto",
          }}
        >
          <Box
            sx={{
              width: { md: "100%", lg: "40%" },
              height: "100%",
              flexDirection: "column",
              display: "flex",
              position: "relative",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              height={160}
              sx={{
                width: "160px",
                margin: "15% auto",
                objectFit: "cover",
                border: "1px solid grey",
              }}
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            ></CardMedia>
           <ImageInput></ImageInput>
            <Typography
              variant="body2"
              color="#333333"
              sx={{ fontWeight: "550", pb: 0, ml: "30%" }}
            ></Typography>

            <Typography
              variant="body2"
              color="#333333"
              sx={{
                fontWeight: "550",
                fontSize: "12px",
                pt: 0,
                textAlign: "center",
                width: "70%",
                ml: "8%",
              }}
            ></Typography>
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "80%" }, minHeight: "170px" }}>
          <Grid container spacing={{ xs: 2, md: 4 }} sx={{ pt: 4 }}>
            <Grid item xs={12} md={3} lg={2}>
              <StaticSelect
                placeholder={"Civility"}
                setDataFunction={setNewContactData}
                fieldName={"titleSelect"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "stretch",
              }}
            >
              <Box sx={{ flex: "1 1 auto", mr: { xs: 0, md: 4 } }}>
                <NormalInput
                  setDataFunction={setNewContactData}
                  fieldName={"firstName"}
                />
              </Box>
              <Box sx={{ flex: "1 1 auto", mt: { xs: 4, md: 0 } }}>
                <NormalInput
                  setDataFunction={setNewContactData}
                  fieldName={"name"}
                />
              </Box>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            sx={{ fontWeight: "550", fontSize: "15px", mb: "8px" }}
          >
            Company
          </Typography>
          <Divider />
          <Grid container spacing={{ xs: 2, md: 4 }} sx={{ p: "10px 0px" }}>
            <Grid item xs={12} md={6}>
              <SearchInput
                label={"Main company"}
                searchByFullName="Address"
                fetchOptionFunction={async () => {
                  return await fetchMainCompany();
                }}
                setDataFunction={setNewContactData}
                fieldName={"mainPartner"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SearchInput
                label={"Department"}
                fetchOptionFunction={async () => {
                  return await fetchDepartments();
                }}
                setDataFunction={setNewContactData}
                fieldName={"companyDepartment"}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Paper>
  );
};

export const CustomTabs = ({ options, setTabIndex }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabs = [...options];

  const handleTabSwitch = (index) => {
    setSelectedTabIndex(index);
    setTabIndex(index);
  };
  return (
    <Box sx={{ display: "flex" }}>
      {tabs.map((tab, key) => {
        return (
          <Box
            key={tab}
            onClick={() => handleTabSwitch(key)}
            sx={{
              width: "120px",
              backgroundColor: "white",
              p: "8px",
              maxHeight: "14px",
              px: 0,
              borderLeft: "1px solid rgba(0,0,0,0.08)",
              borderRight: "1px solid rgba(0,0,0,0.08)",
              borderTop:
                selectedTabIndex === key
                  ? "3px solid #0275d8"
                  : "1px solid rgba(0,0,0,0.08)",
              textAlign: "center",
              overflow: "visible",
              fontSize: "13px",
              zIndex: selectedTabIndex === key ? "10" : "",
            }}
          >
            {" "}
            {tab}
            <Box
              sx={{
                width: "100%",
                height: "8px",
                m: "0",
                backgroundColor: "white",
              }}
            ></Box>
          </Box>
        );
      })}
    </Box>
  );
};

export const ContactBoxWithTabs = ({ setNewContactData }) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "60px",

        backgroundColor: "transparent",
      }}
    >
      <CustomTabs
        options={["Contact details", "Partners"]}
        setTabIndex={setTabIndex}
      />

      {/* --------------------------Contact Tab Contains-------------------- */}
      {tabIndex === 0 ? (
        <Grid
          container
          sx={{
            p: 0,
            backgroundColor: "white",
            paddingBottom: "20px",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* ---------Left--------------- */}
          <Grid
            sx={{
              backgroundColor: "white",
              width: { xs: "100%", sm: "50%" },
              minHeight: "215px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <CustomCheckBox
                label={"Do not call"}
                setDataFunction={setNewContactData}
                fieldName="isDoNotCall"
              />
              <CustomCheckBox
                label={"Do not mail"}
                setDataFunction={setNewContactData}
                fieldName="isDoNotEmail"
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <SearchInput
                label={"Function"}
                fetchOptionFunction={async () => {
                  return await fetchFunctions();
                }}
                setDataFunction={setNewContactData}
                fieldName={"jobTitleFunction"}
              />
              <SearchInput
                label={"Manager"}
                fetchOptionFunction={async () => {
                  return await fetchManager();
                }}
                setDataFunction={setNewContactData}
                fieldName={"reportsTo"}
                searchByFullName="Address"
              />
              <PhoneNumberWithCountrySelect
                label={"Mobile Number"}
                setDataFunction={setNewContactData}
                fieldName={"mobilePhone"}
              />
            </Box>
          </Grid>
          {/* ------------Right----------------- */}
          <Grid
            sx={{
              backgroundColor: "white",
              width: { xs: "100%", sm: "50%" },
              minHeight: "215px",
            }}
          >
            <Box sx={{ p: 2, mt: 8 }}>
              <NormalInput
                label={"Function / Business card"}
                fieldName="functionBusinessCard"
                setDataFunction={setNewContactData}
              />
              <PhoneNumberWithCountrySelect
                label={"Phone Number"}
                setDataFunction={setNewContactData}
                fieldName={"fixedPhone"}
              />
              <NormalInput
                label={"Email"}
                placeholder="whatever@example.com"
                setDataFunction={setNewContactData}
                fieldName={"address"}
                type={"mail"}
              />
            </Box>
          </Grid>
          {/* -----------bottom-------------- */}
          <Grid item lg={12} sm={12} sx={{ mx: 2 }}>
            <SearchInput
              label={"Address"}
              searchByFullName={"Address"}
              fetchOptionFunction={async () => {
                return await fetchAddress();
              }}
              setDataFunction={setNewContactData}
              fieldName={"mainAddress"}
            />
          </Grid>
        </Grid>
      ) : (
        // -----------------------------------Partner Content------------------------
        <Box
          sx={{
            width: "100%",
            height: "360px",
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.08)",
            backgroundColor: "white",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          No Content{" "}
        </Box>
      )}
    </Box>
  );
};

export const RightContent = ({ setNewContactData }) => {
  return (
    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ p: 1 }}>
      <Box
        sx={{
          width: { xs: "91vw", sm: "400px" },
          height: "100vh",

          m: { md: "0 0 10% 60px", sm: "0px" },
        }}
      >
        {/* ---------------------Settings Layout-------------------- */}
        <Box
          sx={{
            backgroundColor: "white",
            mb: 5,
            p: 1,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "550",
              p: "14px 0",
              maxHeight: "20px",
            }}
          >
            Settings
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <Typography
            sx={{ fontSize: "12px", fontWeight: "550", m: "10px 0", mb: 4 }}
          >
            Reference
          </Typography>
          <SearchInput
            label={"Language"}
            fetchOptionFunction={async () => {
              return await fetchLanguage();
            }}
            setDataFunction={setNewContactData}
            fieldName={"language"}
          ></SearchInput>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "550", m: "0px 0", mb: 4 }}
          >
            Created on
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "550",
              p: "14px 0",
              maxHeight: "20px",
            }}
          >
            Settings
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Grid container spacing={2}>
            <Grid item lg={6} xs={6} md={6} sm={6} sx={{ width: "50%" }}>
              <SearchInput
                label={"Account owner"}
                fetchOptionFunction={() => {
                  return fetchAccountOwner();
                }}
                setDataFunction={setNewContactData}
                fieldName={"user"}
                searchByFullName="Address"
              />
            </Grid>
            <Grid item lg={6} xs={6} md={6} sm={6}>
              <SearchInput
                label={"Team"}
                fetchOptionFunction={() => {
                  return fetchTeams();
                }}
                setDataFunction={setNewContactData}
                fieldName={"team"}
              />
            </Grid>
          </Grid>
          <AssociatedCompanies />
        </Box>

        {/* -------------------Editor Layout---------------- */}
        <Grid
          container
          height={200}
          sx={{
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: "6px",
          }}
        >
          <MyStatefulEditor />
        </Grid>
      </Box>
    </Grid>
  );
};