import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { AddAPhoto, Clear } from "@mui/icons-material";
import { Component } from "react";
import RichTextEditor from "react-rte";
import MuiPhoneNumber from "material-ui-phone-number";
import { uploadChunk, uploadImage } from "../api/api";
import Context from "../context";

export const ImageInput = () => {
  const [fileData, setFileData] = useState(null);

  function getBinary(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        resolve(binaryStr);
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file);
    });
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadChunk(file);
    // getBinary(file)
    //   .then((binary) => {
    //    console.log( uploadImage(binary,file.type,file.name,file.size))
    //   })
    //   .catch((error) => {
    //     console.error("Error while reading file:", error);
    //   });
  };

  return (
    <Box
      sx={{ position: "absolute", left: "65px", top: "125px" }}
      onClick={() => document.getElementById("image_input").click()}
    >
      <Box
        style={{
          background: "white",
          padding: "10px",
          borderRadius: "50%",
          boxShadow: "3px 3px 4px 1px rgba(0,0,0,0.3)",
        }}
      >
        <AddAPhoto />{" "}
        <input
          id="image_input"
          style={{ display: "none" }}
          onChange={(e) => {
            handleFileChange(e);
          }}
          type="file"
        ></input>
      </Box>
    </Box>
  );
};

export const NormalInput = ({
  label,
  placeholder,
  setDataFunction,
  fieldName,
  type,
}) => {
  const [value, setValue] = useState("");
  const { newContactData } = useContext(Context);

  useEffect(() => {
    if (type === "mail" && newContactData.hasOwnProperty("emailAddress")) {
      // console.log(fieldName, ":", newContactData.emailAddress["name"]);
      setValue(newContactData?.emailAddress["name"]);
      return;
    }
    if (!!newContactData[fieldName]) {
      setValue(newContactData[fieldName]);
    }
  }, [newContactData, fieldName, type]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setDataFunction((data) => {
      if (!!type && type === "mail") {
        return {
          ...data,
          emailAddress: {
            [fieldName]: event.target.value,
          },
        };
      } else {
        return {
          ...data,
          [fieldName]: event.target.value,
        };
      }
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomLabel>{label}</CustomLabel>
      <TextField
        sx={{
          width: "100%",
          fontSize: "12px",
          "& .MuiInputBase-input": {
            fontSize: "14px",
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
      />
    </Box>
  );
};

export function StaticSelect({
  label,
  placeholder,
  setDataFunction,
  fieldName,
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const handleClear = () => {
    setSelectedValue("");
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setDataFunction((data) => {
      return {
        ...data,
        [event.target.name]: selectedValue,
      };
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CustomLabel>{label}</CustomLabel>
      <NativeSelect
        value={selectedValue}
        name={fieldName}
        onChange={handleChange}
        placeholder={placeholder}
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
          "& option[disabled]": {
            color: "grey",
          },
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
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
  const { newContactData } = useContext(Context);

  const handleOpen = async () => {
    const data = await fetchOptionFunction();
    setOptions(data);
  };
  // console.log(newContactData);
  useEffect(() => {
    if (!!searchByFullName && newContactData.hasOwnProperty("Address")) {
      // console.log(fieldName, ":", newContactData.fieldName["fullName"]);
      setValue(newContactData?.newContactData.fieldName["fullName"]);
      return;
    }
    if (!!newContactData[fieldName]) {
      setValue(newContactData[fieldName]);
    }
  }, [newContactData, fieldName, searchByFullName]);

  const handleChange = (event, value) => {
    // console.log("////",value);
    setValue(value);
    setDataFunction((data) => {
      return {
        ...data,
        [fieldName]: value,
      };
    });
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
        onChange={(e, v) => handleChange(e, v)}
        getOptionLabel={(option) => {
          let value;
          if (!!searchByFullName) {
            value = option.fullName;
          } else {
            value = option.name;
          }
          if (value) return value;
          return "";
        }}
        renderOption={(props, option) => {
          let value;
          if (!!searchByFullName) {
            value = option.fullName;
          } else {
            value = option.name;
          }
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
  const { newContactData } = useContext(Context);

  const handlePhoneNumberChange = (value) => {
    setDataFunction((data) => {
      return {
        ...data,
        [fieldName]: value,
      };
    });
  };
  useEffect(() => {
    setPhone(newContactData[fieldName])
  }, [fieldName, newContactData])
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
      <CustomLabel>{label}</CustomLabel>
      <MuiPhoneNumber
        onChange={(value) => handlePhoneNumberChange(value)}
        sx={{ width: "100%" }}
        value={phone}
        defaultCountry={"us"}
      />
    </Box>
  );
}

export const CustomCheckBox = ({ label, fieldName, setDataFunction }) => {
  const handleCheckChange = (event) => {
    setDataFunction((data) => {
      return {
        ...data,
        [fieldName]: event.target.checked,
      };
    });
  };
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

export const AssociatedCompanies = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
      <CustomLabel>Companies associated to</CustomLabel>
      <Autocomplete
        multiple
        id="size-small-standard-multi"
        size="small"
        sx={{ mt: 1 }}
        options={[{ title: "Axelor" }]}
        getOptionLabel={(option) => option.title}
        defaultValue={[{ title: "Axelor" }]}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </Box>
  );
};

export class MyStatefulEditor extends Component {
  state = {
    value: RichTextEditor.createEmptyValue(),
  };

  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value.toString("html"));
    }
  };

  render() {
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
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
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