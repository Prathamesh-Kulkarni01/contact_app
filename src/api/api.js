import Cookies from "js-cookie";

const Token = Cookies.get("CSRF-TOKEN");
const BASE_URL = "http://localhost:3000/axelor-erp/ws/rest";

const makeApiCall = async (path, params) => {
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
  return data.data;
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
    fields: ["name", "user"],
    sortBy: ["name", "-createdOn"],
  };
  return await makeApiCall("com.axelor.auth.db.User/search", params);
};

export const fetchTeams = async () => {
  const params = {
    fields: ["id", "id", "name", "name"],
  };
  return await makeApiCall("com.axelor.team.db.Team/search", params);
};

export const fetchAddress = async () => {
  const params = {
    offset: 0,
    limit: 30,
    fields: ["id", "id", "name", "fullName"],
  };

  return await makeApiCall("com.axelor.apps.base.db.Address/search", params);
};

export const fetchManager = async () => {
  const params = {
    fields: ["id", "id", "name", "fullName"],
  };
  return await makeApiCall("com.axelor.apps.base.db.Partner/search", params);
};

export const createNewContact = async (payload) => {
  const params = {
    data: payload,
  };
  return makeApiCall("com.axelor.apps.base.db.Partner", params);
};

//////////////////////////Profile Page API Calls/////////////////////////////////

export const fetchContactById = async (id) => {
  const params = { sortBy: ["fullName", "-createdOn"] };
  return await makeApiCall(
    `com.axelor.apps.base.db.Partner/${id}/fetch`,
    params
  );
};
