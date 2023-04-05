import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContactById } from "../api/api";

import {
  AssociatedCompanies,
  CustomBlueText,
  CustomLabel,
  MyStatefulEditor,
} from "./InputComponents";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const { id } = useParams();
  const getProfileData = useCallback(async () => {
    const res = await fetchContactById(id);
    return res[0] || [];
  }, [id]);
  useEffect(() => {
    (async () => setProfileData(await getProfileData()))();
  }, [getProfileData]);

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
            <ProfileTopForm profileData={profileData} />
            <ContactBoxWithTabs profileData={profileData} />
          </Box>
        </Grid>

        <RightContent profileData={profileData} />
      </Grid>
    </Box>
  );
};
export default Profile;

export const ProfileTopForm = ({ profileData }) => {
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
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              height={160}
              sx={{
                width: "160px",
                margin: "10% auto",
                objectFit: "cover",
                border: "1px solid grey",
              }}
              image={
                !!profileData?.picture?.id
                  ? `/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/${profileData?.picture?.id}/content/download`
                  : "http://localhost:8080/axelor-erp/img/partner-m-default.png"
              }
            />
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "80%" } }}>
          <Grid container spacing={{ xs: 2, md: 4 }} sx={{ p: "10px 0px" }}>
            <Grid
              item
              mt={2}
              xs={12}
              md={10}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "stretch",
              }}
            >
              <Box sx={{ flex: "1 1 auto", mr: { xs: 0, md: 4 } }}>
                <Typography
                  variant="h2"
                  mb={2}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "550",
                    color: "rgba(0,0,0,0.7)",
                  }}
                >
                  {profileData?.simpleFullName}
                </Typography>
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
              <CustomLabel>Main Company</CustomLabel>
              <Typography
                variant="h2"
                mt={1}
                sx={{ fontSize: "13px", color: "#0275d8" }}
              >
                {profileData?.mainPartner?.fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomLabel>Department</CustomLabel>
              <Typography
                variant="h2"
                mt={1}
                sx={{ fontSize: "13px", color: "#0275d8" }}
              >
                {profileData?.companyDepartment?.name}
              </Typography>
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

export const ContactBoxWithTabs = ({ profileData }) => {
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
            <Box sx={{ p: 2 }}>
              <CustomLabel>Function</CustomLabel>
              <CustomBlueText>
                {" "}
                {profileData?.jobTitleFunction?.name}
              </CustomBlueText>

              <CustomLabel>Manager</CustomLabel>
              <CustomBlueText>
                {" "}
                {profileData?.reportsTo?.fullName}
              </CustomBlueText>

              <CustomLabel>Mobile phone</CustomLabel>
              <CustomBlueText> {profileData?.mobilePhone}</CustomBlueText>
              <CustomLabel>Address</CustomLabel>
              <CustomBlueText>
                {profileData?.mainAddress?.fullName}
              </CustomBlueText>
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
              <CustomLabel>Function / Business card</CustomLabel>
              <CustomBlueText> P0005 - BLUEBERRY TELECOM</CustomBlueText>

              <CustomLabel>Phone number</CustomLabel>
              <CustomBlueText>{profileData?.fixedPhone}</CustomBlueText>

              <CustomLabel>Email</CustomLabel>
              <CustomBlueText>
                {" "}
                {profileData?.emailAddress?.name.substring(
                  profileData?.emailAddress?.name?.indexOf("[") + 1,
                  profileData?.emailAddress?.name?.indexOf("]")
                )}
              </CustomBlueText>
            </Box>
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

export const RightContent = ({ profileData }) => {
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
          <CustomLabel>Language</CustomLabel>
          <CustomBlueText> {profileData?.language?.name}</CustomBlueText>
          <CustomLabel>Created On</CustomLabel>
          <CustomBlueText>{profileData?.updatedOn}</CustomBlueText>
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
              <CustomLabel>Account Owner</CustomLabel>
              <CustomBlueText> {profileData?.user?.fullName}</CustomBlueText>
            </Grid>
            <Grid item lg={6} xs={6} md={6} sm={6}>
              <CustomLabel>Team</CustomLabel>
              <CustomBlueText> {profileData?.team?.name} </CustomBlueText>
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
