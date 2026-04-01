import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Select,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Tabs,
  Tab,
  Radio,
  FormControl,
  Button,
  FormGroup,
  Switch,
  RadioGroup,
  FormControlLabel,
  Paper,
  Backdrop,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";
import ErrorTwoTone from "@material-ui/icons/ErrorTwoTone";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Close from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveDatabase, updateDatabase } from "../../services/AdminServices";
import dataImage from "../../assets/datatransfer.png";
import "./Database.css";
import { useSelector } from "react-redux";
import { DeleteOutline } from "@material-ui/icons";
import { testconnection } from "../../services/DashboardServices";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0, 0),
    minWidth: 425,
    paddingLeft: 0,
  },
  root: {
    flexGrow: 1,
  },
  design: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  redAsterisk: {
    color: "red",
  },
}));

function AddDatabase() {
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
  const user = JSON.parse(localStorage.getItem("userInfo"))?.lanId;

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);

  const [editData, setEditData] = useState(location.state?.rowDetails);

  const [showdata, setShowdata] = useState(
    editData?.details?.ssl ? editData.details.ssl : false
  );
  const [value, setValue] = useState(0);
  const [disableSave, setDisableSave] = useState(true);
  const [disableTest, setDisableTest] = useState(true);
  const [state, setState] = useState({
    checkedB: editData?.details?.ssl ? editData.details.ssl : false,
  });
  const [radioBtn, setRadioBtn] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [dataFields, setDataFields] = useState({
    dataSourceId: editData?.dataSourceId ? editData.dataSourceId : "",
    databaseName: editData?.dataSourceType ? editData.dataSourceType : "",
    displayName: editData?.dataSourceName ? editData.dataSourceName : "",
    dataSourceType: editData?.dataSourceType ? editData.dataSourceType : "",
    urlLink: editData?.details?.urlLink ? editData.details.urlLink : "",
    host: editData?.details?.host ? editData.details.host : "",
    port: editData?.details?.port ? editData.details.port : "",
    schema: editData?.details?.schema ? editData.details.schema : "",
    dbName: editData?.details?.dbName ? editData.details.dbName : "",
    username: editData?.details?.username ? editData.details.username : "",
    password: editData?.details?.password ? editData.details.password : "",
    payloadBody: editData?.details?.payloadBody
      ? editData.details.payloadBody
      : "",
    headers: [{}],
    queryParams: [{}],
    url: editData?.details?.url ? editData.details.url : "",
    method: editData?.details?.method ? editData.details.method : "",
    accessTokenUrl: editData?.details?.accessTokenUrl
      ? editData.details.accessTokenUrl
      : "",
    clientId: editData?.details?.clientId ? editData.details.clientId : "",
    clientSecret: editData?.details?.clientSecret
      ? editData.details.clientSecret
      : "",
    sslMode: editData?.details?.sslMode ? editData.details.sslMode : "",
    sslClientKey: editData?.details?.sslClientKey
      ? editData.details.sslClientKey
      : "",
    sslClientCertificate: editData?.details?.sslClientCertificate
      ? editData.details.sslClientCertificate
      : "",
    sslRootCertificate: editData?.details?.sslRootCertificate
      ? editData.details.sslRootCertificate
      : "",
    uploadFileA: editData?.details?.uploadFileA
      ? editData.details.uploadFileA
      : "",
    fileContentA: editData?.details?.fileContentA
      ? editData.details.fileContentA
      : "",
    uploadFileB: editData?.details?.uploadFileB
      ? editData.details.uploadFileB
      : "",
    fileContentB: editData?.details?.fileContentB
      ? editData.details.fileContentB
      : "",
    uploadFileC: editData?.details?.uploadFileC
      ? editData.details.uploadFileC
      : "",
    fileContentC: editData?.details?.fileContentC
      ? editData.details.fileContentC
      : "",
  });

  useEffect(() => {
    if (location.state?.rowDetails) {
      setDisableTest(false);
      setEditData(location.state?.rowDetails);
    }
  }, [location.state?.rowDetails]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseFile = () => {
    setDataFields({
      ...dataFields,
      uploadFileA: "",
      uploadFileB: "",
      uploadFileC: "",
    });
  };

  const handledeleteheaderrow = (e, index) => {
    setDataFields((prevDataFields) => {
      const updatedHeaders = [...prevDataFields.headers];
      updatedHeaders.splice(index, 1);
      return { ...prevDataFields, headers: updatedHeaders };
    });
  };

  const handledeletequeryrow = (e, index) => {
    setDataFields((prevDataFields) => {
      const updatedQueryParams = [...prevDataFields.queryParams];
      updatedQueryParams.splice(index, 1);
      return { ...prevDataFields, queryParams: updatedQueryParams };
    });
  };

  const handleaddnewrow = (e) => {
    const newdetails = { ...dataFields };
    const newRow = {
      headerKey: "",
      headerValue: "",
    };
    newdetails.headers.push(newRow);
    setDataFields(newdetails);
  };

  const handleaddrow = (e) => {
    const rowdetails = { ...dataFields };
    const addRow = {
      queryKey: "",
      queryValue: "",
      queryDescription: "",
    };
    rowdetails.queryParams.push(addRow);
    setDataFields(rowdetails);
  };

  const handleOkSave = async (e) => {
    e.preventDefault();
    if (dataFields.databaseName === "mongodb") {
      const newDatabaseDetails = {
        organizationId: orgId,
        dataSourceId: dataFields.dataSourceId,
        dataSourceType: dataFields.databaseName,
        dataSourceName: dataFields.displayName,
        engine: dataFields.databaseName,
        createdBy: user,
        details: {
          host: dataFields.host,
          port: dataFields.port,
          dbName: dataFields.dbName,
          username: dataFields.username,
          password: dataFields.password,
          ssl: false,
          schema: dataFields.schema,
          useconnectionuri: false,
          connectionuri: `${dataFields.databaseName}://${dataFields.username}:${dataFields.password}@${dataFields.host}:${dataFields.port}`, //jdbc+datasrctype+host+port+dbname ? currentSchema = schema ::  "jdbc:postgresql://10.11.10.115:5432/training?currentSchema=dashboard"
        },
      };
      if (editData) {
        setLoading(true);
        await updateDatabase(newDatabaseDetails, editData.dataSourceId)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Data Source edited successfully");
            }
            navigate("/databases");
          })
          .catch((error) => {
            toast.error(error, { theme: "white", color: "red" });
          });
        setLoading(true);
      } else {
        setLoading(true);
        await saveDatabase(newDatabaseDetails)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Data Source added successfully");
            }
            navigate("/databases");
          })
          .catch((error) => {
            toast.error(error, { theme: "white", color: "red" });
          });
        setLoading(true);
      }
    } else if (
      dataFields.databaseName === "mysql" ||
      dataFields.databaseName === "postgresql"
    ) {
      const newDatabaseDetails = {
        organizationId: orgId,
        dataSourceId: dataFields.dataSourceId,
        dataSourceType: dataFields.databaseName,
        dataSourceName: dataFields.displayName,
        engine: dataFields.databaseName,
        createdBy: user,
        details: {
          host: dataFields.host,
          port: dataFields.port,
          dbName: dataFields.dbName,
          username: dataFields.username,
          password: dataFields.password,
          payloadBody: dataFields.payloadBody,
          headers: dataFields.headers,
          queryParams: dataFields.queryParams,
          schema: dataFields.schema,
          urlLink: dataFields.urlLink,
          url: dataFields.url,
          method: dataFields.method,
          accessTokenUrl: dataFields.accessTokenUrl,
          clientId: dataFields.clientId,
          clientSecret: dataFields.clientSecret,
          authType: dataFields.authType,
          ssl: state.checkedB,
          sslMode: dataFields.sslMode,
          sslClientKey: dataFields.sslClientKey,
          sslClientCertificate: dataFields.sslClientCertificate,
          sslRootCertificate: dataFields.sslRootCertificate,
          uploadFileA: dataFields.uploadFileA,
          uploadFileB: dataFields.uploadFileB,
          uploadFileC: dataFields.uploadFileC,
          fileContentA: dataFields.fileContentA,
          fileContentB: dataFields.fileContentB,
          fileContentC: dataFields.fileContentC,
          useconnectionuri: false,
          connectionuri: `jdbc:${dataFields.databaseName}://${dataFields.host}:${dataFields.port}/${dataFields.dbName}?currentSchema=${dataFields.schema}`,
        },
      };
      if (editData) {
        setLoading(true);
        await updateDatabase(newDatabaseDetails, editData.dataSourceId)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Data Source edited successfully");
            }
            navigate("/databases");
          })
          .catch((error) => {
            toast.error(error, { theme: "white", color: "red" });
          });
        setLoading(true);
      } else {
        setLoading(true);
        await saveDatabase(newDatabaseDetails)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Data Source added successfully");
            }
            navigate("/databases");
          })
          .catch((error) => {
            toast.error(error, { theme: "white", color: "red" });
          });
        setLoading(true);
      }
    }
  };

  const handleCancel = () => {
    navigate("/databases");
  };

  const addHeaderDetails = (e, index) => {
    const datainfo = { ...dataFields };

    const { name, value } = e.target;
    const rows = [...dataFields.headers];
    rows[index][name] = value;

    setDataFields({ ...datainfo });
  };

  const addQueryParamsDetails = (e, index) => {
    const queryinfo = { ...dataFields };

    const { name, value } = e.target;
    const rows = [...dataFields.queryParams];

    rows[index][name] = value;

    setDataFields({ ...queryinfo });
  };

  // window.addEventListener('unload', function() {
  //   localStorage.removeItem('selectedValue');
  // })

  const handleChangeDatabase = async (e) => {
    const newDatabase = { ...dataFields };
    setDisableSave(true);
    newDatabase[e.target.name] = e.target.value;

    if (e.target.name === "sslClientKey") {
      newDatabase.uploadFileA = newDatabase.fileContentA = "";
    }
    if (e.target.name === "sslClientCertificate") {
      newDatabase.uploadFileB = newDatabase.fileContentB = "";
    }
    if (e.target.name === "sslRootCertificate") {
      newDatabase.uploadFileC = newDatabase.fileContentC = "";
    }
    await setDataFields(newDatabase);

    if (
      (dataFields.databaseName === "mysql" ||
        dataFields.databaseName === "postgresql" ||
        dataFields.databaseName === "mongodb") &&
      state.checkedB === false
    ) {
      if (
        newDatabase.displayName &&
        newDatabase.dbName &&
        newDatabase.host &&
        newDatabase.port &&
        newDatabase.schema &&
        newDatabase.username &&
        newDatabase.password
      ) {
        setDisableTest(false);
      } else {
        setDisableTest(true);
      }
    } else if (
      (dataFields.databaseName === "mysql" ||
        dataFields.databaseName === "postgresql" ||
        dataFields.databaseName === "mongodb") &&
      state.checkedB === true
    ) {
      if (
        newDatabase.displayName &&
        newDatabase.dbName &&
        newDatabase.host &&
        newDatabase.port &&
        newDatabase.schema &&
        newDatabase.username &&
        newDatabase.password &&
        newDatabase.sslMode &&
        newDatabase.sslClientKey &&
        newDatabase.sslClientCertificate &&
        newDatabase.sslRootCertificate &&
        (newDatabase.uploadFileA || newDatabase.fileContentA) &&
        (newDatabase.uploadFileB || newDatabase.fileContentB) &&
        (newDatabase.uploadFileC || newDatabase.fileContentC)
      ) {
        setDisableTest(false);
      } else {
        setDisableTest(true);
      }
    }
    if (dataFields.databaseName === "RDBMS") {
      if (newDatabase.displayName) {
        setDisableTest(false);
      } else {
        setDisableTest(true);
      }
    }
    if (dataFields.databaseName === "RESTAPI") {
      if (newDatabase.displayName && newDatabase.method && newDatabase.url) {
        setDisableTest(false);
        /*  if (value === 0) {
          if (radioBtn === "") {
            setDisableTest(false);
          } else if (
            radioBtn === "basicAuth" &&
            newDatabase.displayName &&
            newDatabase.method &&
            newDatabase.url &&
            newDatabase.username &&
            newDatabase.password
          ) {
            setDisableTest(false);
          } else if (
            radioBtn === "OAuth2" &&
            newDatabase.displayName &&
            newDatabase.method &&
            newDatabase.url &&
            newDatabase.accessTokenUrl &&
            newDatabase.clientId &&
            newDatabase.clientSecret
          ) {
            setDisableTest(false);
          } else {
            setDisableTest(true);
          }
        } else if (value === 1 && newDatabase.payloadBody) {
          setDisableTest(false);
        } else if (
          value === 2 &&
          newDatabase.headerKey &&
          newDatabase.headerValue
        ) {
          setDisableTest(false);
        } else if (
          value === 3 &&
          newDatabase.queryKey &&
          newDatabase.queryValue &&
          newDatabase.queryDescription
        ) {
          setDisableTest(false);
        } else {
          setDisableTest(true);
        } */
      } else {
        setDisableTest(true);
      }
    }
  };
  // useEffect(() => {
  //   const storedValue = JSON.parse(localStorage.getItem('selectedValue'));
  //   if (storedValue) {
  //     setSelectedValue(storedValue);
  //   }
  // }, []);

  const handleDropdownChange = (e) => {
    // const newValue = e.target.value;
    // setSelectedValue(newValue);
    setDataFields({
      ...dataFields,
      databaseName: e.target.value,
      displayName: "",
      urlLink: "",
      host: "",
      port: "",
      schema: "",
      dbName: "",
      username: "",
      password: "",
      payloadBody: "",
      queryKey: "",
      queryValue: "",
      queryDescription: "",
      url: "",
      method: "",
      accessTokenUrl: "",
      clientId: "",
      clientSecret: "",
      sslMode: "",
      sslClientKey: "",
      sslClientCertificate: "",
      sslRootCertificate: "",
      uploadFileA: "",
      fileContentA: "",
      uploadFileB: "",
      fileContentB: "",
      uploadFileC: "",
      fileContentC: "",
    });
    setRadioBtn("");
    setShowdata(false);
    setDisableSave(true);
    setDisableTest(true);
    setState({ ...state, checkedB: false });
    // localStorage.setItem('selectedValue', JSON.stringify(newValue));
  };

  const handleChange = async (e, newValue) => {
    await setValue(newValue);
    /* if (newValue === 0) {
      if (dataFields.url && dataFields.method && dataFields.displayName) {
        setDisableTest(false);
      } else {
        setDisableTest(true);
      }
      setRadioBtn("");
      setDataFields({
        ...dataFields,
        headers: [{}],
        queryParams: [{}],
        payloadBody: "",
      });
    } else if (newValue === 1) {
      setRadioBtn("");
      setDataFields({
        ...dataFields,
        username: "",
        password: "",
        accessTokenUrl: "",
        clientId: "",
        clientSecret: "",
        headers: [{}],
        queryParams: [{}],
      });
      setDisableTest(true);
    } else if (newValue === 2) {
      setRadioBtn("");
      setDataFields({
        ...dataFields,
        username: "",
        password: "",
        accessTokenUrl: "",
        clientId: "",
        clientSecret: "",
        payloadBody: "",
        queryParams: [{}],
      });
      setDisableTest(true);
    } else if (newValue === 3) {
      setRadioBtn("");
      setDataFields({
        ...dataFields,
        username: "",
        password: "",
        accessTokenUrl: "",
        clientId: "",
        clientSecret: "",
        payloadBody: "",
        headers: [{}],
      });
      setDisableTest(true);
    } else {
      setDisableTest(false);
    } */
  };

  const handleBasic = (e) => {
    if (e.target.value === radioBtn) {
      e.target.checked = false;
      setRadioBtn("");
      setDisableTest(false);
    } else {
      setRadioBtn(e.target.value);
      setDataFields({
        ...dataFields,
        accessTokenUrl: "",
        clientId: "",
        clientSecret: "",
        username: "",
        password: "",
        payloadBody: "",
        queryDescription: "",
        queryKey: "",
        queryValue: "",
      });
      setDisableTest(true);
    }
  };

  const handleChangeToggle = (event) => {
    setDisableSave(true);
    setShowdata(!showdata);
    setDataFields({
      ...dataFields,
      sslMode: "",
      sslClientCertificate: "",
      sslClientKey: "",
      sslRootCertificate: "",
      uploadFileA: "",
      uploadFileB: "",
      uploadFileC: "",
      fileContentA: "",
      fileContentB: "",
      fileContentC: "",
    });
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked === true) {
      setDisableTest(true);
    } else {
      setDisableTest(false);
    }
  };

  const handleClickTest = async (e) => {
    e.preventDefault();
    if (dataFields.databaseName === "RESTAPI") {
      const headerObject = Object.fromEntries(
        dataFields.headers.map((obj) => [obj.headerKey, obj.headerValue])
      );
      const queryParamsObject = Object.fromEntries(
        dataFields.queryParams.map((obj) => [obj.queryKey, obj.queryValue])
      );
      const newDatabaseDetails = {
        url: dataFields.url,
        method: dataFields.method,
        body:
          dataFields.method.toLowerCase() === "post"
            ? dataFields.payloadBody
            : "",
        headers: dataFields.method.toLowerCase() === "post" ? headerObject : "",
        queryParams:
          dataFields.method.toLowerCase() === "post" ? queryParamsObject : "",
      };
      let requestPayload =
        newDatabaseDetails.method.toLowerCase() === "post"
          ? newDatabaseDetails
          : [];
      axios[newDatabaseDetails.method.toLowerCase()](
        newDatabaseDetails.url,
        requestPayload
      )
        .then((response) => {
          if (response.status === 200) {
            setDisableSave(false);
            setDisableTest(true);
            toast.success(response.data.status);
          }
        })
        .catch((error) => {
          toast.error(error.message, { theme: "white", color: "red" });
        });
    } else if (
      dataFields.databaseName.toLowerCase() === "postgresql" ||
      dataFields.databaseName.toLowerCase() === "mysql"
    ) {
      const newDatabaseDetails = {
        organizationId: orgId,
        dataSourceType: dataFields.databaseName,
        dataSourceName: dataFields.displayName,
        engine: dataFields.databaseName,
        createdBy: user,
        details: {
          host: dataFields.host,
          port: dataFields.port,
          dbName: dataFields.dbName,
          username: dataFields.username,
          password: dataFields.password,
          urlLink: dataFields.urlLink,
          url: dataFields.url,
          method: dataFields.method,
          accessTokenUrl: dataFields.accessTokenUrl,
          clientId: dataFields.clientId,
          clientSecret: dataFields.clientSecret,
          ssl: dataFields.ssl,
          sslMode: dataFields.sslMode,
          sslClientKey: dataFields.sslClientKey,
          sslClientCertificate: dataFields.sslClientCertificate,
          sslRootCertificate: dataFields.sslRootCertificate,
          uploadFileA: dataFields.uploadFileA,
          uploadFileB: dataFields.uploadFileB,
          uploadFileC: dataFields.uploadFileC,
          fileContentA: dataFields.fileContentA,
          fileContentB: dataFields.fileContentB,
          fileContentC: dataFields.fileContentC,
          schema: dataFields.schema,
          useconnectionuri: false,
          connectionuri: `jdbc:${dataFields.databaseName}://${dataFields.host}:${dataFields.port}/${dataFields.dbName}?currentSchema=${dataFields.schema}`,
        },
      };
      await testconnection(newDatabaseDetails)
        .then((response) => {
          if (response.status === 200) {
            setDisableSave(false);
            setDisableTest(true);
            toast.success(response.data.status);
          }
        })
        .catch((error) => {
          toast.error(error.message, { theme: "white", color: "red" });
        });
    } else if (dataFields.databaseName.toLowerCase() === "mongodb") {
      const newDatabaseDetails = {
        organizationId: orgId,
        dataSourceType: dataFields.databaseName,
        dataSourceName: dataFields.displayName,
        engine: dataFields.databaseName,
        createdBy: user,
        details: {
          host: dataFields.host,
          port: dataFields.port,
          dbName: dataFields.dbName,
          username: dataFields.username,
          password: dataFields.password,
          ssl: false,
          schema: dataFields.schema,
          useconnectionuri: false,
          connectionuri: `${dataFields.databaseName}://${dataFields.username}:${dataFields.password}@${dataFields.host}:${dataFields.port}`,
        },
      };
      await testconnection(newDatabaseDetails)
        .then((response) => {
          if (response.status === 200) {
            setDisableSave(false);
            setDisableTest(true);
            toast.success(response.data.status);
          }
        })
        .catch((error) => {
          toast.error(error.message, { theme: "white", color: "red" });
        });
    }

    navigate("./");
  };

  return (
    <div
      style={{
        width: sidebarFlag ? "90%" : "94%",
        marginLeft: sidebarFlag ? "7%" : "5%",
      }}
    >
      <Box className="main-layout" style={{ maxWidth: sidebarFlag && "175vh" }}>
        <div style={{ marginTop: "50px", display: "flex" }}>
          <IconButton style={{ padding: 0, margin: 0, color: "#000" }}>
            <KeyboardBackspaceIcon
              onClick={() => {
                navigate(-1);
              }}
            />
          </IconButton>
          <h3
            style={{
              margin: "2px 5px",
              textAlign: "start",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {editData ? "Edit Data Source" : "Add New Data Source"}
          </h3>
        </div>
        <div className="card" style={{ height: "70vh", overflow: "scroll" }}>
          <FormControl
            className={classes.formControl}
            size="small"
            variant="outlined"
          >
            <InputLabel id="demo-select-small">
              Data Source
              <span style={{ color: "red" }}> *</span>
            </InputLabel>
            <Select
              value={dataFields.databaseName}
              name="databaseName"
              labelId="demo-simple-select"
              id="demo-simple-select"
              label="Data Source"
              onChange={handleDropdownChange}
              MenuProps={{
                style: { height: "192px" },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value={"mongodb"}>MongoDB</MenuItem>
              <MenuItem value={"RESTAPI"}>REST API </MenuItem>
              <MenuItem value={"postgresql"}>POSTGRES</MenuItem>
              <MenuItem value={"mysql"}>MYSQL</MenuItem>
            </Select>
          </FormControl>
          <div className="div-1">
            <div className="data-div">
              <img className="dataimage" src={dataImage} alt="" />
              <p className="text-data">Set-up Data Source</p>
            </div>
            <TextField
              id="displayName"
              variant="outlined"
              label="Display Name"
              size="small"
              name="displayName"
              autoComplete="off"
              value={dataFields.displayName}
              onChange={handleChangeDatabase}
              className="Text-21"
              required
              InputLabelProps={{
                classes: {
                  asterisk: classes.redAsterisk,
                },
                style: { fontSize: 12 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ErrorTwoTone />
                  </InputAdornment>
                ),
              }}
            />
            {dataFields.databaseName === "RESTAPI" && (
              <div className="test-1">
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "30%" }}>
                    <FormControl
                      size="small"
                      variant="outlined"
                      style={{ width: "100%" }}
                    >
                      <InputLabel id="demo-select-small" required>
                        Method
                      </InputLabel>
                      <Select
                        defaultValue=""
                        name="method"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dataFields.method}
                        label="Method"
                        onChange={handleChangeDatabase}
                        MenuProps={{
                          style: { height: "192px" },
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        <MenuItem value={"Get"}>Get</MenuItem>
                        <MenuItem value={"Post"}>Post</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ width: "70%" }}>
                    <TextField
                      style={{ width: "100%" }}
                      size="small"
                      name="url"
                      autoComplete="off"
                      label="URL"
                      value={dataFields.url}
                      variant="outlined"
                      required
                      onChange={handleChangeDatabase}
                    />
                  </div>
                </div>

                {/* Tabs */}
                <Paper className={classes.design} id="test-2">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab
                      style={{ textTransform: "none" }}
                      label="Authentication"
                    />
                    <Tab style={{ textTransform: "none" }} label="Body" />
                    <Tab style={{ textTransform: "none" }} label="Headers" />
                    <Tab
                      style={{ textTransform: "none" }}
                      label="Query Params"
                    />
                  </Tabs>
                </Paper>

                {/* Authentication */}
                <Box
                  role="tabpanel"
                  hidden={value !== 0}
                  id={`simple-tabpanel-${0}`}
                  aria-labelledby={`simple-tab-${0}`}
                >
                  <Box>
                    <div className="test-3">
                      <FormControl className="form-input">
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          value={radioBtn}
                          name="radio-buttons-group"
                          id="div-row"
                        >
                          <FormControlLabel
                            className="div-row-a"
                            value="basicAuth"
                            name="basicAuth"
                            control={
                              <Radio
                                onClick={handleBasic}
                                style={{ color: "var(--dashboardBgColor)" }}
                              />
                            }
                            label="Basic Auth"
                          />
                          <FormControlLabel
                            className="div-row-b"
                            value="OAuth2"
                            name="OAuth2"
                            control={
                              <Radio
                                onClick={handleBasic}
                                style={{ color: "var(--dashboardBgColor)" }}
                              />
                            }
                            label="OAuth 2.0"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Box>
                </Box>

                {/* Basic auth */}
                {radioBtn === "basicAuth" && value === 0 && (
                  <div className="test-43">
                    <TextField
                      variant="outlined"
                      size="small"
                      style={{ width: "47%", marginRight: "70px" }}
                      label="Username"
                      name="username"
                      autoComplete="off"
                      value={dataFields.username}
                      onChange={handleChangeDatabase}
                    />
                    <TextField
                      type={showPassword ? "text" : "password"}
                      onChange={handleChangeDatabase}
                      value={dataFields.password}
                      label="Password"
                      variant="outlined"
                      autoComplete="off"
                      size="small"
                      style={{ width: "47%", marginBottom: 20 }}
                      name="password"
                      InputProps={{
                        style: { height: 40 },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                )}

                {/* OAuth2 */}
                {radioBtn === "OAuth2" && value === 0 && (
                  <div className="test-4">
                    <TextField
                      variant="outlined"
                      size="small"
                      autoComplete="off"
                      label="Access Token URL"
                      value={dataFields.accessTokenUrl}
                      name="accessTokenUrl"
                      style={{ width: "100%" }}
                      onChange={handleChangeDatabase}
                    />
                    <div className="test-6">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={dataFields.clientId}
                        label="Client Id"
                        name="clientId"
                        onChange={handleChangeDatabase}
                        style={{ width: "47%", marginRight: "76px" }}
                      />
                      <TextField
                        variant="outlined"
                        size="small"
                        value={dataFields.clientSecret}
                        label="Client Secret"
                        name="clientSecret"
                        style={{ width: "47%", marginBottom: 20 }}
                        onChange={handleChangeDatabase}
                      />
                    </div>
                  </div>
                )}
                {value === 1 && (
                  <>
                    <Box
                      role="tabpanel"
                      hidden={value !== 1}
                      id={`simple-tabpanel-${1}`}
                      aria-labelledby={`simple-tab-${1}`}
                    >
                      <TextField
                        variant="outlined"
                        size="large"
                        name="payloadBody"
                        label="Fill the details of the Payload object"
                        autoComplete="off"
                        value={dataFields.payloadBody}
                        style={{ marginTop: 20, width: "100%" }}
                        onChange={(e) => handleChangeDatabase(e)}
                      />
                    </Box>
                  </>
                )}
                {value === 2 && (
                  <>
                    <Box
                      role="tabpanel"
                      hidden={value !== 2}
                      id={`simple-tabpanel-${2}`}
                      aria-labelledby={`simple-tab-${2}`}
                    >
                      <Box
                        style={{
                          width: "100%",
                        }}
                      >
                        {dataFields.headers &&
                          dataFields.headers.map((item, index) => {
                            return (
                              <div>
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    margin: "10px 0 0px 0",
                                  }}
                                >
                                  <div style={{ width: "50%" }}>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      id={index}
                                      name="headerKey"
                                      label="Key"
                                      autoComplete="off"
                                      className="Text-3"
                                      value={item.headerKey}
                                      onChange={(e) =>
                                        addHeaderDetails(e, index)
                                      }
                                    />
                                  </div>
                                  <div style={{ width: "50%" }}>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      id={index}
                                      name="headerValue"
                                      label="Value"
                                      autoComplete="off"
                                      className="Text-3"
                                      value={item.headerValue}
                                      onChange={(e) =>
                                        addHeaderDetails(e, index)
                                      }
                                    />
                                  </div>
                                  <div
                                    style={{
                                      marginTop: 21,
                                      display: "flex",
                                      gap: 5,
                                    }}
                                  >
                                    {dataFields.headers.length > 1 && (
                                      <IconButton
                                        color="secondary"
                                        style={{
                                          marginTop: -15,
                                          color: "#F16767",
                                          padding: "0px 0px 0px 0px",
                                          marginRight: "5px",
                                          BoxSizing: "borderBox",
                                        }}
                                      >
                                        <Tooltip
                                          title="Delete Row"
                                          placement="bottom"
                                          PopperProps={{
                                            style: { marginTop: -6 },
                                          }}
                                        >
                                          <DeleteOutline
                                            onClick={(e) =>
                                              handledeleteheaderrow(e, index)
                                            }
                                          />
                                        </Tooltip>
                                      </IconButton>
                                    )}
                                  </div>
                                </div>
                                {dataFields.headers.length - 1 === index && (
                                  <Button
                                    style={{
                                      textTransform: "none",
                                      fontSize: "14px",
                                      backgroundColor:
                                        "var(--dashboardBgColor)",
                                      color: "#fff",
                                      marginTop: 15,
                                    }}
                                    variant="contained"
                                    onClick={handleaddnewrow}
                                  >
                                    Add Row
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                      </Box>
                    </Box>
                  </>
                )}
                {value === 3 && (
                  <>
                    <Box
                      role="tabpanel"
                      hidden={value !== 3}
                      id={`simple-tabpanel-${3}`}
                      aria-labelledby={`simple-tab-${3}`}
                    >
                      <Box
                        style={{
                          width: "100%",
                        }}
                      >
                        {dataFields.queryParams &&
                          dataFields.queryParams.map((item, index) => {
                            return (
                              <div>
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    margin: "10px 0 0px 0",
                                  }}
                                >
                                  <div style={{ width: "33.5%" }}>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      id={index}
                                      name="queryKey"
                                      label="Key"
                                      autoComplete="off"
                                      className="Text-3"
                                      value={item.queryKey}
                                      onChange={(e) =>
                                        addQueryParamsDetails(e, index)
                                      }
                                    />
                                  </div>
                                  <div style={{ width: "33.5%" }}>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      id={index}
                                      name="queryValue"
                                      label="Value"
                                      autoComplete="off"
                                      className="Text-3"
                                      value={item.queryValue}
                                      onChange={(e) =>
                                        addQueryParamsDetails(e, index)
                                      }
                                    />
                                  </div>
                                  <div style={{ width: "33.5%" }}>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      id={index}
                                      name="queryDescription"
                                      label="Description"
                                      autoComplete="off"
                                      className="Text-3"
                                      value={item.queryDescription}
                                      onChange={(e) =>
                                        addQueryParamsDetails(e, index)
                                      }
                                    />
                                  </div>
                                  <div
                                    style={{
                                      marginTop: 21,
                                      display: "flex",
                                      gap: 5,
                                    }}
                                  >
                                    {dataFields.queryParams.length > 1 && (
                                      <IconButton
                                        color="secondary"
                                        style={{
                                          marginTop: -15,
                                          color: "#F16767",
                                          padding: "0px 0px 0px 0px",
                                          marginRight: "5px",
                                          BoxSizing: "borderBox",
                                        }}
                                      >
                                        <Tooltip
                                          title="Delete Row"
                                          placement="bottom"
                                          PopperProps={{
                                            style: { marginTop: -6 },
                                          }}
                                        >
                                          <DeleteOutline
                                            onClick={(e) =>
                                              handledeletequeryrow(e, index)
                                            }
                                          />
                                        </Tooltip>
                                      </IconButton>
                                    )}
                                  </div>
                                </div>
                                {dataFields.queryParams.length - 1 ===
                                  index && (
                                  <Button
                                    style={{
                                      textTransform: "none",
                                      fontSize: "14px",
                                      backgroundColor:
                                        "var(--dashboardBgColor)",
                                      color: "#fff",
                                      marginTop: 15,
                                    }}
                                    variant="contained"
                                    onClick={handleaddrow}
                                  >
                                    Add Row
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                      </Box>
                    </Box>
                  </>
                )}
              </div>
            )}
            <div>
              {(dataFields.databaseName === "mysql" ||
                dataFields.databaseName === "postgresql" ||
                dataFields.databaseName === "mongodb") && (
                <div style={{ flexDirection: "row", gap: "10px" }}>
                  <TextField
                    variant="outlined"
                    label="Data Source Name"
                    size="small"
                    name="dbName"
                    className="Text-2"
                    autoComplete="off"
                    value={dataFields.dbName}
                    required
                    onChange={(e) => handleChangeDatabase(e)}
                    style={{ marginRight: "2%" }}
                  />
                  <TextField
                    variant="outlined"
                    label="Host"
                    size="small"
                    autoComplete="off"
                    name="host"
                    className="Text-2"
                    value={dataFields.host}
                    required
                    onChange={(e) => handleChangeDatabase(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ErrorTwoTone />
                        </InputAdornment>
                      ),
                    }}
                    style={{ marginRight: "2%", height: "35px" }}
                  />
                  <TextField
                    variant="outlined"
                    label="Port"
                    size="small"
                    autoComplete="off"
                    name="port"
                    className="Text-2"
                    value={dataFields.port}
                    required
                    onChange={(e) => handleChangeDatabase(e)}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    name="username"
                    label="Username"
                    autoComplete="off"
                    className="Text-2"
                    value={dataFields.username}
                    required
                    style={{ marginRight: "2%" }}
                    onChange={(e) => handleChangeDatabase(e)}
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => handleChangeDatabase(e)}
                    value={dataFields.password}
                    label="Password"
                    className="Text-2"
                    autoComplete="off"
                    name="password"
                    size="small"
                    variant="outlined"
                    style={{ marginRight: "2%" }}
                    required
                    InputProps={{
                      style: { height: 40 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Schema"
                    size="small"
                    autoComplete="off"
                    name="schema"
                    className="Text-2"
                    required
                    value={dataFields.schema}
                    onChange={(e) => handleChangeDatabase(e)}
                  />
                  <div className="toggle-btn">
                    <p style={{ marginRight: "20px", fontSize: "20px" }}>
                      Secure Connection
                    </p>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={state.checkedB}
                            onChange={handleChangeToggle}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        className="toggle-switch"
                      />
                    </FormGroup>
                  </div>
                  {showdata && (
                    <>
                      <FormControl
                        variant="outlined"
                        className="sslMode-div"
                        size="small"
                      >
                        <InputLabel id="demo-simple-select-label">
                          SSL Mode
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="SSL Mode"
                          name="sslMode"
                          value={dataFields.sslMode}
                          onChange={handleChangeDatabase}
                          MenuProps={{
                            style: { height: "192px" },
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem value={"Verify CA"}>Verify CA</MenuItem>
                          <MenuItem value={"AAA"}>AAA</MenuItem>
                          <MenuItem value={"aaa"}>aaa</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl
                        variant="outlined"
                        className="sslMode-div"
                        size="small"
                      >
                        <InputLabel id="demo-simple-select-label">
                          SSL Client Key
                        </InputLabel>
                        <Select
                          id="sslClientKey"
                          label="SSL Client Key"
                          name="sslClientKey"
                          value={dataFields.sslClientKey}
                          onChange={handleChangeDatabase}
                          MenuProps={{
                            style: { height: "192px" },
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem value={"Uploadfile"}>Upload file</MenuItem>
                          <MenuItem value={"FileContent"}>
                            File Content
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {dataFields.sslClientKey === "FileContent" && (
                        <TextField
                          label="Mention File Content"
                          name="fileContentA"
                          style={{
                            width: "50%",
                            marginTop: -10,
                            marginBottom: 10,
                          }}
                          value={dataFields.fileContentA}
                          variant="outlined"
                          onChange={handleChangeDatabase}
                        />
                      )}
                      {dataFields.sslClientKey === "Uploadfile" && (
                        <input
                          type="file"
                          style={{ marginBottom: 20 }}
                          name="uploadFileA"
                          value={dataFields.uploadFileA}
                          label="Upload File"
                          onChange={handleChangeDatabase}
                        />
                      )}
                      {dataFields.uploadFileA !== "" && (
                        <IconButton
                          style={{ marginLeft: 0 }}
                          onClick={handleCloseFile}
                        >
                          <Close style={{ color: "var(--dashboardBgColor)" }} />
                        </IconButton>
                      )}
                      <FormControl
                        variant="outlined"
                        className="sslMode-div"
                        size="small"
                      >
                        <InputLabel id="demo-simple-select-label">
                          SSL Client Certificate
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="SSL Client Certificate"
                          name="sslClientCertificate"
                          value={dataFields.sslClientCertificate}
                          onChange={handleChangeDatabase}
                          MenuProps={{
                            style: { height: "192px" },
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem value={"Uploadfile"}>Upload file</MenuItem>
                          <MenuItem value={"FileContent"}>
                            File Content
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {dataFields.sslClientCertificate === "FileContent" && (
                        <TextField
                          label="Mention File Content"
                          name="fileContentB"
                          style={{
                            width: "50%",
                            marginTop: -10,
                            marginBottom: 10,
                          }}
                          value={dataFields.fileContentB}
                          variant="outlined"
                          onChange={handleChangeDatabase}
                        />
                      )}
                      {dataFields.sslClientCertificate === "Uploadfile" && (
                        <input
                          type="file"
                          name="uploadFileB"
                          style={{ marginBottom: 20, marginTop: -20 }}
                          value={dataFields.uploadFileB}
                          label="Upload File"
                          onChange={handleChangeDatabase}
                        />
                      )}
                      {dataFields.uploadFileB !== "" && (
                        <IconButton
                          style={{ marginLeft: 0 }}
                          onClick={handleCloseFile}
                        >
                          <Close style={{ color: "var(--dashboardBgColor)" }} />
                        </IconButton>
                      )}
                      <FormControl
                        variant="outlined"
                        className="sslMode-div"
                        size="small"
                      >
                        <InputLabel id="demo-simple-select-label">
                          SSL Root Certificate
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="SSL Root Certificate"
                          name="sslRootCertificate"
                          value={dataFields.sslRootCertificate}
                          onChange={handleChangeDatabase}
                          MenuProps={{
                            style: { height: "192px" },
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem value={"Uploadfile"}>Upload file</MenuItem>
                          <MenuItem value={"FileContent"}>
                            File Content
                          </MenuItem>
                        </Select>
                      </FormControl>
                      {dataFields.sslRootCertificate === "FileContent" && (
                        <TextField
                          label="Mention File Content"
                          name="fileContentC"
                          style={{
                            width: "50%",
                            marginTop: -10,
                            marginBottom: 10,
                          }}
                          value={dataFields.fileContentC}
                          variant="outlined"
                          onChange={(e) => handleChangeDatabase(e)}
                        />
                      )}
                      {dataFields.sslRootCertificate === "Uploadfile" && (
                        <input
                          type="file"
                          style={{ marginBottom: 20, marginTop: -20 }}
                          name="uploadFileC"
                          value={dataFields.uploadFileC}
                          label="Upload File"
                          onChange={handleChangeDatabase}
                        />
                      )}
                      {dataFields.uploadFileC !== "" && (
                        <IconButton
                          style={{ marginLeft: 0 }}
                          onClick={handleCloseFile}
                        >
                          <Close style={{ color: "var(--dashboardBgColor)" }} />
                        </IconButton>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <div
                style={{
                  opacity: disableTest ? 0.6 : 1,
                  cursor: disableTest ? "not-allowed" : "pointer",
                }}
              >
                <Button
                  style={{
                    color: "white",
                    height: 40,
                    width: 140,
                    borderRadius: 0,
                    backgroundColor: "var(--dashboardBgColor)",
                    fontSize: "14px",
                    textTransform: "none",
                    border: "none",
                  }}
                  variant="contained"
                  onClick={handleClickTest}
                  disabled={disableTest}
                >
                  Test Connection
                </Button>
              </div>
            </div>
          </div>
          <div className="btn-div">
            <Button
              style={{
                textTransform: "none",
                fontSize: "14px",
                backgroundColor: "var(--dashboardBgColor)",
                color: "#fff",
              }}
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <div
              style={{
                opacity: disableSave ? 0.6 : 1,
                cursor: disableSave ? "not-allowed" : "pointer",
              }}
            >
              <Button
                variant="contained"
                onClick={handleOkSave}
                disabled={disableSave}
                style={{
                  color: "white",
                  height: 36.5,
                  width: 64,
                  borderRadius: 0,
                  backgroundColor: "var(--dashboardBgColor)",
                  fontSize: "14px",
                  textTransform: "none",
                  border: "none",
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ width: "300px" }}
        theme="colored"
        toastStyle={{ backgroundColor: "white", color: "var(--selectedTab)" }}
      />
      <Backdrop style={{ color: "black", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default AddDatabase;
