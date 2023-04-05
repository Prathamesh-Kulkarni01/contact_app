import axios from "axios";
import Cookies from "js-cookie";

const Token = Cookies.get("CSRF-TOKEN");
const BASE_URL = "/axelor-erp/ws/rest/";

const login=async()=>{
 const url= "/axelor-erp/callback"

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username:"admin",
      password:"admin"

    }),
  });
  return await response.json();
}

const makeApiCall = async (path, params) => {

if(!Token){await login(); return}

  const url = `${BASE_URL}/${path}`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-Token": Token,
    },
    body: JSON.stringify(params),
  });
  const data = await response.json();
  return data.data||[];
};

export const fetchContacts = async () => {
  const params = { sortBy: ["fullName", "-createdOn"] };
  return await makeApiCall("com.axelor.apps.base.db.Partner/search", params);
};

export const fetchFunctions = async () => {
  const params = {
    fields: ["id", "id", "name", "name"],
  };
  return await makeApiCall("com.axelor.apps.base.db.Function/search", params);
};

export const fetchMainCompany = async () => {
  const params = {};
  return await makeApiCall("com.axelor.apps.base.db.Partner/search", params);
};

export const fetchDepartments = async () => {
  const params = {
    fields: ["id", "id", "code", "code", "name", "name"],
  };
  return await makeApiCall(
    "com.axelor.apps.base.db.CompanyDepartment/search",
    params
  );
};

export const fetchLanguage = async () => {
  const params = {
    fields: ["id", "id", "code", "code", "name", "name"],
  };
  return await makeApiCall("com.axelor.apps.base.db.Language/search", params);
};

export const fetchAccountOwner = async () => {
  const params = {
    offset: 0,
    limit: 10,
    fields:["fullName","fullName"],
    sortBy: ["name", "-createdOn"],
  };
  return await makeApiCall("com.axelor.auth.db.User/search", params);
};

export const fetchTeams = async () => {
  const params = {
    fields: ["id", "id","name", "name"],
  };
  return await makeApiCall("com.axelor.team.db.Team/search", params);
};

export const fetchAddress = async () => {
  const params = {
    offset: 0,
    limit: 30,
    fields: ["id", "id", "name","name", "fullName","fullName"],
  };

  return await makeApiCall("com.axelor.apps.base.db.Address/search", params);
};

export const fetchManager = async () => {
  const params = {
    fields: ["id", "id", "name", "fullName"],
  };
  return await makeApiCall("com.axelor.apps.base.db.Partner/search", params);
};

export const createOrUpdateNewContact = async (payload) => {
  const params = {
    data: payload,
  };
  
  return await makeApiCall("com.axelor.apps.base.db.Partner", params);
};

//////////////////////////Profile Page API Calls/////////////////////////////////

export const fetchContactById = async (id) => {
  const params = { sortBy: ["fullName", "-createdOn"] };
  return await makeApiCall(
    `com.axelor.apps.base.db.Partner/${id}/fetch`,
    params
  );
};

// ????????????????? Upload Image Function Tries ???????????????????????????//

export const uploadImage = async(binary, type, name, size) => {
  const formData = new FormData();
  formData.append("file", binary);
  formData.append("field", undefined);
  formData.append(
    "request",
    JSON.stringify({
      data: {
        fileName: name,
        fileType: type,
        fileSize: size,
        $upload: {
          file: { binary },
        },
      },
    })
  );
  const url =
    "/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/upload";
  const res= await axios
    .post(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data;  boundary="another cool boundary";`,
        Accept: "*/*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "X-CSRF-Token": Token, 
      },
    }).catch(err=>{
      console.log(err);
      return 1
    })
  
    return res.data.data[0]
};

export const deleteRecord=async (records)=>{
const params={
  records:records
}
return await makeApiCall(
  `com.axelor.apps.base.db.Partner/removeAll`,
  params
);
}