import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import RichTextEditor from "react-rte";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiPhoneNumber from "material-ui-phone-number";
import Delete from "@mui/icons-material/Delete";
import Clear from "@mui/icons-material/Clear";
import AddAPhoto from "@mui/icons-material/AddAPhoto";

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchAssociatedCompanies, uploadImage } from "../api/api";
import Context from "../context";

export const ImageInput = ({ setDataFunction }) => {
  const { handleUpdatedData } = useContext(Context);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const res = await uploadImage(file, file.type, file.name, file.size);
    if (res !== 1) {
      if (window.location.pathname.split("/")[2] === "edit") {
        handleUpdatedData((data) => ({
          ...data,
          picture: { ...res },
        }));
      }
      setDataFunction((data) => ({
        ...data,
        picture: { ...res },
      }));
    }
  };

  return (
    <Box onClick={() => document.getElementById("image_input").click()}>
      <Box
        sx={{
          background: "white",
          padding: "10px",
          m: 0.5,
          borderRadius: "50%",
          boxShadow: "3px 3px 4px 1px rgba(0,0,0,0.3)",
        }}
      >
        <AddAPhoto />{" "}
        <input
          id="image_input"
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e)}
          type="file"
        ></input>
      </Box>
    </Box>
  );
};
export const ImageDelete = ({ setDataFunction }) => {
  const { handleUpdatedData, contact } = useContext(Context);
  const checkVisibility = () => contact.picture;
  const handleDelete = async (e) => {
    if (window.location.pathname.split("/")[2] === "edit") {
      setDataFunction((data) => ({
        ...data,
        picture: null,
      }));
      handleUpdatedData((data) => ({
        ...data,
        picture: null,
      }));
    }
  };
  return (
    <Box onClick={() => handleDelete()}>
      {checkVisibility() && (
        <Box
          sx={{
            background: "white",
            padding: "10px",
            m: 0.5,
            borderRadius: "50%",
            boxShadow: "3px 3px 4px 1px rgba(0,0,0,0.3)",
          }}
        >
          <Delete />
        </Box>
      )}
    </Box>
  );
};
export const NormalInput = ({
  label,
  placeholder,
  setDataFunction,
  fieldName,
  type,
  required,
}) => {
  const [value, setValue] = useState("");
  const { contact, handleUpdatedData } = useContext(Context);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (window.location.pathname.split("/")[2] === "edit") {
      handleUpdatedData((data) => {
        if (type && type === "mail") {
          return {
            ...data,
            emailAddress: {
              [fieldName]: event.target.value.trim(),
            },
          };
        } else {
          return {
            ...data,
            [fieldName]: event.target.value.trim(),
          };
        }
      });
      return;
    } else {
      setDataFunction((data) => {
        if (type && type === "mail") {
          return {
            ...data,
            emailAddress: {
              [fieldName]: event.target.value.trim(),
            },
          };
        } else {
          return {
            ...data,
            [fieldName]: event.target.value.trim(),
          };
        }
      });
    }
  };

  useEffect(() => {
    if (type === "mail" && contact.hasOwnProperty("emailAddress")) {
      setValue(
        contact?.emailAddress?.name?.substring(
          contact?.emailAddress?.name?.indexOf("[") + 1,
          contact?.emailAddress?.name?.indexOf("]")
        )
      );
      return;
    }
    if (contact[fieldName]) setValue(contact[fieldName]);
  }, [contact, fieldName, type]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomLabel>{label}</CustomLabel>
      <TextField
        sx={{
          width: "100%",
          fontSize: "12px",
          "& .MuiInputBase-input": {
            fontSize: "14px",
            borderBottom: !value && required ? "1.5px solid red" : "",
          },
          "& .MuiFormLabel-root": {
            fontSize: "14px",
          },
        }}
        id="standard-basic"
        size="small"
        value={value}
        name={fieldName}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        variant="standard"
        required
      />
    </Box>
  );
};

export function StaticSelect({ label, setDataFunction, fieldName }) {
  const [selectedValue, setSelectedValue] = useState("");
  const { handleUpdatedData, contact } = useContext(Context);
  const location = useLocation();
  const handleClear = () => setSelectedValue("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (location.pathname.split("/")[2] === "edit") {
      handleUpdatedData((data) => {
        return {
          ...data,
          [event.target.name]: event.target.value,
        };
      });
    }
    setDataFunction((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    if (location.pathname.split("/")[2] === "edit")
      setSelectedValue(contact[fieldName]);
  }, [fieldName, location.pathname, contact]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomLabel>{label}</CustomLabel>
      <NativeSelect
        name={fieldName}
        onChange={handleChange}
        value={selectedValue}
        endAdornment={
          selectedValue && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear}>
                <Clear
                  sx={{
                    fontSize: "15px",
                    marginRight: "10px",
                    marginLeft: "0px",
                  }}
                />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{
          fontSize: "small",
          "& option": {
            color: "blue",
          },
          "& option[selected]": {
            color: "black",
          },
        }}
      >
        <option value="">Civility</option>
        <option value={1}>M.</option>
        <option value={2}>Ms.</option>
      </NativeSelect>
    </Box>
  );
}

export function SearchInput({
  label,
  fetchOptionFunction,
  setDataFunction,
  fieldName,
  searchByFullName,
}) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { contact, handleUpdatedData } = useContext(Context);
  const handleOpen = async () => {
    setOptions(await fetchOptionFunction());
    setIsOpen(true);
  };

  useEffect(() => {
    if (contact[fieldName]) setValue(contact[fieldName]);
  }, [contact, fieldName, searchByFullName]);

  const handleInputChange = async (e) => {
    if (isOpen) setOptions(await fetchOptionFunction(e?.target?.value));
  };

  const handleChange = async (event, value) => {
    setValue(value);
    if (window.location.pathname.split("/")[2] === "edit") {
      handleUpdatedData((data) => ({
        [fieldName]: value,
        ...data,
      }));

      setDataFunction((data) => ({
        ...data,
        [fieldName]: value,
      }));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomLabel>{label}</CustomLabel>
      <Autocomplete
        options={options}
        size="small"
        name="0000"
        value={value}
        onOpen={() => handleOpen()}
        onInputChange={handleInputChange}
        onChange={(e, v) => handleChange(e, v)}
        getOptionLabel={(option) => {
          let value = searchByFullName ? option.fullName : option.name;
          if (value) return value;
          return "";
        }}
        renderOption={(props, option) => {
          let value = searchByFullName ? option.fullName : option.name;
          return (
            <li
              {...props}
              style={{
                fontSize: "12px",
                color: "#0275d8",
                height: "12px",
                padding: "15px",
              }}
            >
              {value}
            </li>
          );
        }}
        sx={{
          width: "100%",
          margin: "0 0px",
          mb: 1,
          fontSize: "small",
          padding: "0px",
          "& .MuiAutocomplete-inputRoot.Mui-focused .MuiAutocomplete-input": {
            borderBottomColor: "blue",
          },
          "& .MuiAutocomplete-option": {
            paddingTop: "3px",
            paddingBottom: "3px",
            margin: "10px",
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
          },
          "& .MuiFormLabel-root": {
            fontSize: "14px",
            paddingRight: "0px",
          },
          "& .MuiAutocomplete-input": {},
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment sx={{ mr: "-30px" }} position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}

export function PhoneNumberWithCountrySelect({
  label,
  setDataFunction,
  fieldName,
}) {
  const [phone, setPhone] = useState("");
  const { contact, handleUpdatedData } = useContext(Context);
  const handlePhoneNumberChange = (value) => {
    if (window.location.pathname.split("/")[2] === "edit") {
      handleUpdatedData((data) => ({
        ...data,
        [fieldName]: value,
      }));
    }
    setDataFunction((data) => ({
      ...data,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    setPhone(contact[fieldName]);
  }, [fieldName, contact]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
      <CustomLabel>{label}</CustomLabel>
      <MuiPhoneNumber
        onChange={(value) => handlePhoneNumberChange(value)}
        sx={{ width: "100%" }}
        value={phone}
        defaultCountry="us"
      />
    </Box>
  );
}

export const CustomCheckBox = ({ label, fieldName, setDataFunction }) => {
  const [value, setValue] = useState(false);
  const { contact, handleUpdatedData } = useContext(Context);
  const handleCheckChange = (event) => {
    setValue(event.target.checked);
    if (window.location.pathname.split("/")[2] === "edit") {
      handleUpdatedData((data) => ({
        ...data,
        [fieldName]: event.target.checked,
      }));
      return;
    }
    setDataFunction((data) => ({
      ...data,
      [fieldName]: event.target.checked,
    }));
  };
  useEffect(() => {
    if (contact[fieldName]) setValue(contact[fieldName]);
  }, [fieldName, contact]);

  return (
    <Box
      sx={{
        display: "flex",
        mx: 2,
        flexDirection: "column",
      }}
    >
      <Typography sx={{ mr: 1, fontSize: "12px", fontWeight: "550" }}>
        {label}
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            onClick={(e) => handleCheckChange(e)}
            checked={value}
            sx={{
              borderRadius: "0",
              fontWeight: "100",
              p: 0,
              m: 0,
              ml: "8px",
              "& .MuiSvgIcon-root": {
                fontSize: 28,
                borderRadius: "0px",
              },
              "& .Mui-checked": {
                color: "blue",
              },
            }}
          />
        }
      />
    </Box>
  );
};

export const AssociatedCompanies = ({ setDataFunction }) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const { contact, handleUpdatedData } = useContext(Context);
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = async () => {
    if (isOpen) setOptions(await fetchAssociatedCompanies());
    setIsOpen(false);
  };
  const handleChange = (e, v) => {
    let option = [];
    if (v.length !== 0) option = [v[0]];
    setValue(v);
    if (window.location.pathname.split("/")[2] === "edit") 
      handleUpdatedData((data) => ({
        ...data,
        companySet: option,
      }));
    setDataFunction((data) => ({
      ...data,
      companySet: option,
    }));
  };
  useEffect(() => {
    if (contact?.companySet?.length > 0) setValue([contact?.companySet[0]]);
  }, [contact]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
      <CustomLabel>Companies associated to</CustomLabel>
      <Autocomplete
        multiple
        id="size-small-standard-multi"
        size="small"
        sx={{ mt: 1 }}
        limitTags={1}
        onOpen={() => handleOpen()}
        options={options}
        onChange={handleChange}
        getOptionLabel={(option) => option?.name}
        value={value}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </Box>
  );
};

export function MyStatefulEditor({ fieldName, setDataFunction }) {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  const { contact, handleUpdatedData } = useContext(Context);
  const onChange = (value) => {
    setValue(value);
    if (window.location.pathname.split("/")[2] === "edit") {
      handleUpdatedData((data) => ({
        ...data,
        [fieldName]: value.toString("html"),
      }));
      return;
    }
    setDataFunction((data) => ({
      ...data,
      [fieldName]: value.toString("html"),
    }));
  };

  useEffect(() => {
    if (contact[fieldName] && window.location.pathname.split("/")[2] === "edit")
      setValue(
        RichTextEditor.createValueFromString(contact[fieldName], "html")
      );
  }, [fieldName, contact]);

  const toolbarConfig = {
    display: [
      "INLINE_STYLE_BUTTONS",
      "BLOCK_TYPE_BUTTONS",
      "LINK_BUTTONS",
      "BLOCK_TYPE_DROPDOWN",
      "HISTORY_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
      { label: "Bold", style: "BOLD", className: "custom-css-class" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: "UL", style: "unordered-list-item" },
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
    ],
  };

  return (
    <RichTextEditor
      toolbarConfig={toolbarConfig}
      value={value}
      onChange={onChange}
    />
  );
}

export const CustomLabel = ({ children }) => {
  return (
    <Typography sx={{ mr: 1, fontSize: "12px", fontWeight: "550" }}>
      {children}
    </Typography>
  );
};

export const CustomBlueText = ({ children }) => {
  return (
    <Typography
      variant="h2"
      mt={1}
      mb={3}
      sx={{ fontSize: "13px", color: "#0275d8" }}
    >
      {children}
    </Typography>
  );
};
