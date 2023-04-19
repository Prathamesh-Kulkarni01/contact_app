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
  if (!Token) await login();
  if (!window.location.href.includes("axelor-erp"))
    window.location.href = "/axelor-erp/";
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
      "partnerSeq",
      "mainPartner.simpleFullName",
      "fixedPhone",
      "picture",
      "mainAddress",
      "firstName",
      "name",
    ],
    sortBy: null,
    data: {
      _domain:
        "self.isContact = true AND (self.mainPartner.isCustomer = true OR self.mainPartner.isProspect = true)",
      _domainContext: {
        _domain:
          "self.isContact = true AND (self.mainPartner.isCustomer = true OR self.mainPartner.isProspect = true)",
        _model: "com.axelor.apps.base.db.Partner",
      },
      operator: "and",
      criteria: [],
    },
    limit: limit,
    offset: offset,
    translate: true,
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Partner/search",
    params
  );
  return response;
};

export const fetchFunctions = async (value = "") => {
  const params = {
    data: {
      _domainContext: {},
      name: value,
      code: value,
    },
    limit: 10,
    fields: ["id", "id", "name", "name"],
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Function/search",
    params
  );
  return response.data || [];
};

export const fetchMainCompany = async (query) => {
  const params = {
    data: {
      fullName: query,

      _domain:
        "self.isContact = false  AND self in (SELECT p FROM Partner p join p.companySet c where c in :companySet)",
      _domainContext: {
        _domain:
          "self.isContact = true AND (self.mainPartner.isCustomer = true OR self.mainPartner.isProspect = true)",
        _id: null,
        titleSelect: 0,
        isDoNotCall: false,
        isDoNotEmail: false,
        isContact: true,
        partnerTypeSelect: 2,
        language: {
          code: "en",
          name: "English",
          id: 1,
        },
        team: {
          code: "GRL",
          name: "General",
          id: 4,
        },
        companySet: [
          {
            id: 1,
            selected: false,
          },
        ],
        user: {
          code: "admin",
          fullName: "Admin",
          id: 1,
        },
        contactAttrs: "{}",
        _model: "com.axelor.apps.base.db.Partner",
        partnerRoleSet: [],
      },
    },
    fields: ["id", "fullName"],
    offset: 0,
    limit: 10,
    sortBy: null,
    translate: true,
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Partner/search",
    params
  );
  return response.data || [];
};

export const fetchDepartments = async (query = "") => {
  const params = {
    data: {
      code: query,
      name: query,
      _domainContext: {},
    },
    fields: ["id", "code", "name"],
    limit: 10,
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.CompanyDepartment/search",
    params
  );
  return response.data || [];
};

export const fetchLanguage = async () => {
  const params = {
    fields: ["id", "id", "code", "code", "name", "name"],
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Language/search",
    params
  );
  return response.data || [];
};

export const fetchAccountOwner = async (value = "") => {
  const params = {
    data: {
      _domainContext: {},
      fullName: value,
      partner: value,
      name: value,
      code: value,
    },
    limit: 10,
    offset: 0,
    fields: ["fullName", "fullName"],
    sortBy: ["name", "-createdOn"],
  };
  const response = await makeApiCall("com.axelor.auth.db.User/search", params);
  return response.data || [];
};

export const fetchTeams = async () => {
  const params = {
    fields: ["id", "name"],
  };
  const response = await makeApiCall("com.axelor.team.db.Team/search", params);
  return response.data || [];
};

export const fetchAddress = async (value = "") => {
  const params = {
    data: {
      _domainContext: {},
      fullName: value,
      addressL2: value,
      addressL3: value,
      addressL4: value,
      addressL5: value,
      addressL6: value,
    },
    offset: 0,
    fields: ["id", "name", "fullName"],
    limit: 10,
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Address/search",
    params
  );
  return response.data || [];
};

export const fetchManager = async (value = "") => {
  const params = {
    data: {
      _domain: "self.isContact = true",
      _domainContext: {
        _domain:
          "self.isContact = true AND (self.mainPartner.isCustomer = true OR self.mainPartner.isProspect = true)",
        _model: "com.axelor.apps.base.db.Partner",
      },
      fullName: value,
    },
    limit: 10,
    fields: ["id", "id", "name", "fullName"],
  };
  const response = await makeApiCall(
    "com.axelor.apps.base.db.Partner/search",
    params
  );
  return response.data || [];
};

export const createOrUpdateNewContact = async (payload) => {
  const params = {
    data: payload,
  };
  const response = await makeApiCall("com.axelor.apps.base.db.Partner", params);
  return response.data || [];
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
//////////////////////////////Search /////////////////////////////////////////////////////////////
export const searchContact = async (text) => {
  const params = {
    fields: [
      "partnerCategory",
      "mobilePhone",
      "simpleFullName",
      "firstName",
      "name",
      "emailAddress.address",
      "mainPartner.simpleFullName",
      "partnerSeq",
      "fullName",
      "fixedPhone",
      "mainAddress",
      "picture",
      "titleSelect",
    ],
    sortBy: null,
    data: {
      _domain:
        "self.isContact = true AND (self.mainPartner.isCustomer = true OR\n    self.mainPartner.isProspect = true)",
      _domainContext: {
        _domain:
          "self.isContact = true AND (self.mainPartner.isCustomer = true OR self.mainPartner.isProspect = true)",
      },
      operator: "or",
      criteria: [
        {
          fieldName: "partnerCategory.name",
          operator: "like",
          value: text,
        },
        {
          fieldName: "mobilePhone",
          operator: "like",
          value: text,
        },
        {
          fieldName: "simpleFullName",
          operator: "like",
          value: text,
        },
        {
          fieldName: "emailAddress.address",
          operator: "like",
          value: text,
        },
        {
          fieldName: "mainPartner.simpleFullName",
          operator: "like",
          value: text,
        },
        {
          fieldName: "partnerSeq",
          operator: "like",
          value: text,
        },
        {
          fieldName: "fullName",
          operator: "like",
          value: text,
        },
        {
          fieldName: "fixedPhone",
          operator: "like",
          value: text,
        },
        {
          fieldName: "mainAddress.fullName",
          operator: "like",
          value: text,
        },
        {
          fieldName: "picture.fileName",
          operator: "like",
          value: text,
        },
      ],
      _searchText: text,
      _domains: [],
    },
    offset: 0,
    translate: true,
  };
  const response = await makeApiCall(
    `com.axelor.apps.base.db.Partner/search`,
    params
  );
  return response;
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
