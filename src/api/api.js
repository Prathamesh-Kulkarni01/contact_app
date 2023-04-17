import axios from "axios";
import Cookies from "js-cookie";

const Token = Cookies.get("CSRF-TOKEN");
const BASE_URL = "/axelor-erp/ws/rest/";

const login = async () => {
  const url = "/axelor-erp/callback";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "admin",
      password: "admin",
    }),
  });
  return await response.json();
};

const makeApiCall = async (path, params) => {
  if (!Token)await login()
  if (!window.location.href.includes("axelor-erp")) window.location.href = "/axelor-erp/";
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
  return data || [];
};

export const fetchContacts = async (limit = 15, offset = 0) => {
  const params = {
    fields: [
      "jobTitleFunction",
      "mobilePhone",
      "simpleFullName",
      "emailAddress.address",
      'partnerSeq',
      "mainPartner.simpleFullName",
      "fixedPhone",
      "picture",
      "mainAddress"
    ],
    sortBy: null,
    data: {
      _domain:
        "self.isContact = true AND (self.mainPartner.isCustomer = true OR\n    self.mainPartner.isProspect = true)",
      _domainContext: {
        _domain:
          "self.isContact = true AND (self.mainPartner.isCustomer = true OR self.mainPartner.isProspect = true)",
        _id: null,
        _model: "com.axelor.apps.base.db.Partner",
      },
      operator: "and",
      criteria: [],
    },
    limit:limit ,
    offset: offset,
    translate: true,
  };

  const response = await makeApiCall(
    "com.axelor.apps.base.db.Partner/search",
    params
  );
  console.log(response);
  return response;
};

export const fetchFunctions = async () => {
  const params = {
    fields: ["id", "id", "name", "name"],
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Function/search",
    params
  );
  return response.data;
};

export const fetchMainCompany = async () => {
  const params = {
    data: {
      _domain:
        "self.isContact = false  AND self in (SELECT p FROM Partner p join p.companySet c where c in :companySet)",
      _domainContext: {
        companySet: [{ id: 1, selected: false }],
        contactAttrs: "{}",
        isContact: true,
        isDoNotCall: false,
        isDoNotEmail: false,
        language: { code: "en", name: "English", id: 1 },
        partnerRoleSet: [],
        partnerTypeSelect: 2,
        team: { code: "GRL", name: "General", id: 4 },
        titleSelect: 0,
        user: { code: "admin", fullName: "Admin", id: 1 },
        _domain:
          "self.isContact = true AND (self.mainPartner.isCustomer = true OR self.mainPartner.isProspect = true)",
        _id: null,
        _model: "com.axelor.apps.base.db.Partner",
      },
    },
    fields: ["id", "fullName"],
    limit: 10,
    offset: 0,
    sortBy: null,
    translate: true,
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Partner/search",
    params
  );
  return response.data;
};

export const fetchDepartments = async () => {
  const params = {
    fields: ["id", "id", "code", "code", "name", "name"],
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.CompanyDepartment/search",
    params
  );
  return response.data;
};

export const fetchLanguage = async () => {
  const params = {
    fields: ["id", "id", "code", "code", "name", "name"],
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Language/search",
    params
  );
  return response.data;
};

export const fetchAccountOwner = async () => {
  const params = {
    offset: 0,
    limit: 10,
    fields: ["fullName", "fullName"],
    sortBy: ["name", "-createdOn"],
  };
  const response = await makeApiCall("com.axelor.auth.db.User/search", params);
  return response.data;
};

export const fetchTeams = async () => {
  const params = {
    fields: ["id", "id", "name", "name"],
  };
  const response = await makeApiCall("com.axelor.team.db.Team/search", params);
  return response.data;
};

export const fetchAddress = async () => {
  const params = {
    offset: 0,
    limit: 30,
    fields: ["id", "id", "name", "name", "fullName", "fullName"],
  };

  const response = await makeApiCall(
    "com.axelor.apps.base.db.Address/search",
    params
  );
  return response.data;
};

export const fetchManager = async () => {
  const params = {
    fields: ["id", "id", "name", "fullName"],
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Partner/search",
    params
  );
  return response.data;
};

export const createOrUpdateNewContact = async (payload) => {
  const params = {
    data: payload,
  };

  const response = await makeApiCall("com.axelor.apps.base.db.Partner", params);
  return response.data;
};

//////////////////////////Profile Page API Calls/////////////////////////////////

export const fetchContactById = async (id) => {
  const params = { sortBy: ["fullName", "-createdOn"] };
  const response = await makeApiCall(
    `com.axelor.apps.base.db.Partner/${id}/fetch`,
    params
  );
  return response.data;
};

// ????????????????? Upload Image Function Tries ???????????????????????????//

export const uploadImage = async (binary, type, name, size) => {
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
  const url = "/axelor-erp/ws/rest/com.axelor.meta.db.MetaFile/upload";
  const res = await axios
    .post(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data;  boundary="another cool boundary";`,
        Accept: "*/*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "X-CSRF-Token": Token,
      },
    })
    .catch((err) => {
      console.log(err);
      return 1;
    });

  return res.data.data[0];
};

export const deleteRecord = async (records) => {
  const params = {
    records: records,
  };
  const response = await makeApiCall(
    `com.axelor.apps.base.db.Partner/removeAll`,
    params
  );
  return response.data;
};
