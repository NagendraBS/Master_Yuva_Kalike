/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import { styled } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  TextField,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  Popper,
} from "@material-ui/core";
import { CSVLink } from "react-csv";
import GetAppIcon from "@material-ui/icons/GetApp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import "@webscopeio/react-textarea-autocomplete/style.css";
import ChartSettings from "../components/charts/ChartSettings";
import "./QueryComponent.css";
import DashboardActions from "../actions/dashboardAction";
import { getDatabase, getDatabaseDetails } from "../services/AdminServices";
import { getUpdatedQuery, renderChart } from "../utils/helper";
import { RestApiComponent } from "./RestApiComponent";
import { storedDatabaseDetails } from "../utils/reUseUtils";
import {
  getDashboards,
  getQueryData,
  getTableData,
  savePanel,
  validateQuery,
  SaveExcelData,
  editExcelData,
} from "../services/DashboardServices";
import * as XLSX from "xlsx";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const useStyles = makeStyles(() => ({
  autocomplete: {
    maxWidth: "xs",
    marginBottom: 10,
  },
  fieldsContainer: {
    maxWidth: "500px",
    margin: "auto",
  },

  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));
function QueryComponent() {
  let navigate = useNavigate();
  const classes = useStyles();
  const [excelData, setExcelData] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [fileData, setFileData] = useState({
    actorId: "",
    pageId: "",
    panelId: "",
    fileName: "",
    fileInfo: "",
    createdBy: "",
  });
  const [panelNameError, setPanelNameError] = useState(false);
  const [aphabeticalPanelError, setAphabeticalPanelError] = useState(false);
  const [host, sethost] = useState();
  const [schema, setschema] = useState();
  const dashboardConfig = useSelector((state) => state.dashboard);
  const [tableNames, setTableNames] = useState([]);
  const [tableColumns, setTableColumns] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);
  const currentDashData = dashboardConfig?.dashboards?.filter(
    (data) => data?.dashboardId === location?.state?.data?.applicationId
  );
  const [fileName, setFileName] = useState(
    location?.state?.data?.metadata?.filename
      ? location.state.data.metadata.filename
      : null
  );
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //.const actorId = JSON.parse(localStorage.getItem("userInfo"))?.actorId;

  const dataSourceId = currentDashData[0]?.settings?.dataSrcId;
  const currentDashName = currentDashData[0]?.dashboardName;
  const [query, setQuery] = useState(
    location?.state?.data?.metadata?.query || ""
  );

  const [aggQuery, setAggQuery] = useState(
    location?.state?.data?.metadata?.aggregationQuery || ""
  );

  const [apiConfig, setRestAPIConfig] = useState(
    location?.state?.data?.metadata?.apiConfig || ""
  );
  const [error, setError] = useState("");
  const [showChart, setShowChart] = useState(
    location?.state?.data?.metadata?.visualizationData?.chartType === "new"
      ? false
      : true
  );
  const [chartData, setChartData] = useState(location?.state?.chartData || []);
  const [visualizationData, setVisualizationData] = useState(
    location?.state?.data?.metadata?.visualizationData
  );
  const [settingsData, setSettingsData] = useState({});
  const [headers, setHeaders] = useState([]);
  const [expanded, setExpanded] = useState("panel1");
  const [schemadup, setSchema] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [defaultData, setDefaultData] = useState(null);
  const [suggestions, setSuggestion] = useState([]);
  const [accumulation, setAccumulation] = useState("");
  const [aggregator, setAggregator] = useState(false);
  const aggregatorType = { frequency: "" };
  const [isAggQuery, setIsAggQuery] = useState(false);
  const [isSqlValid, setIsSqlValid] = useState(false);
  const [dataSources, setDataSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [limitValue, setLimitValue] = useState(5);
  const [conditions, setConditions] = useState([]);
  const [isCustomQuery, setIsCustomQuery] = useState(false);

  const handleColumnChange = (tableName, newValue) => {
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [tableName]: newValue,
    }));
  };

  const handleAddCondition = () => {
    setConditions((prevConditions) => [
      ...prevConditions,
      {
        column:
          selectedTables.length === 1
            ? ""
            : `${selectedTables[selectedTables.length - 1]}.`,
        operator: "",
        value: "",
      },
    ]);
  };

  const handleRemoveCondition = (index) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };
  const generateQuery = () => {
    if (selectedTables.length === 0) {
      // No tables are selected, return an empty query
      return "";
    }
    if (selectedDatasource.split("-")[0] === "mongodb ") {
      const table = selectedTables[0].label;
      const columns = selectedColumns[table] || [];
      const columnString = columns.join(",");
      let query = `${table}#{}#${limitValue}#${columnString}`;

      if (conditions.length > 0) {
        const whereConditions = conditions
          .filter(
            (condition) =>
              condition.column.trim() !== "" &&
              condition.operator.trim() !== "" &&
              condition.value.trim() !== ""
          )
          .map((condition) => {
            const { column, operator, value } = condition;
            return `${column} :  {${operator} : ${value} }`;
          });
        query = `${table}#{${whereConditions}}#${limitValue}#${columnString}`;
      }
      return query;
    } else {
      if (selectedTables.length === 1) {
        // Only one table is selected, generate the query without table name prefix
        const table = selectedTables[0].label;
        const columns = selectedColumns[table] || [];
        const columnString = columns.join(", ");
        let query = `SELECT ${columnString} FROM ${schemadup}.${table}`;

        // If conditions are present, add the WHERE clause to the query
        if (conditions.length > 0) {
          const whereConditions = conditions
            .filter(
              (condition) =>
                condition.column.trim() !== "" &&
                condition.operator.trim() !== "" &&
                condition.value.trim() !== ""
            )
            .map((condition) => {
              const { column, operator, value } = condition;
              return `${column} ${operator} '${value}'`;
            });

          if (whereConditions.length > 0) {
            query += ` WHERE ${whereConditions.join(" AND ")}`;
          }
        }

        return query;
      } else {
        // Multiple tables are selected, generate the query with table name prefixes
        let query = "SELECT ";

        // Generate SELECT clause
        const selectColumns = selectedTables.flatMap((table) =>
          selectedColumns[table.label]?.map(
            (column) => `${table.label}.${column}`
          )
        );
        query += selectColumns.join(", ");

        // Generate FROM clause
        query +=
          " FROM " +
          schemadup +
          "." +
          selectedTables.map((table) => table.label).join(", ");

        // If conditions are present, add the WHERE clause to the query
        if (conditions.length > 0) {
          const whereConditions = conditions
            .filter(
              (condition) =>
                condition.column.trim() !== "" &&
                condition.operator.trim() !== "" &&
                condition.value.trim() !== ""
            )
            .map((condition) => {
              const { column, operator, value } = condition;
              return `${column} ${operator} '${value}'`;
            });
          if (whereConditions.length > 0) {
            query += ` WHERE ${whereConditions.join(" AND ")}`;
          }
        }
        return query;
      }
    }
  };

  const removeEmptyConditions = () => {
    const validConditions = conditions.filter(
      (condition) =>
        condition.column.trim() !== "" &&
        condition.operator.trim() !== "" &&
        condition.value.trim() !== ""
    );
    setConditions(validConditions);
  };

  const handleGenerateQuery = () => {
    removeEmptyConditions();
    const query = generateQuery();

    setQuery(query);
    setOpen(false);
  };

  const PopperMy = function (props) {
    return (
      <Popper
        {...props}
        style={{ width: "fit-content" }}
        placement="bottom-start"
      />
    );
  };
  const popperTable = function (props) {
    return <Popper {...props} placement="bottom-start" />;
  };

  const operators = ["=", ">", "<", ">=", "<=", "!="];

  const areAllFieldsSelected = () => {
    if (selectedTables.length === 0) {
      return false;
    }

    for (const table of selectedTables) {
      if (!selectedColumns[table.label]?.length) {
        return false;
      }
    }

    for (const condition of conditions) {
      if (
        condition?.column?.trim() === "" ||
        condition?.operator?.trim() === "" ||
        condition?.value?.trim() === ""
      ) {
        return false;
      }
    }
    return true;
  };
  const [allFieldsSelected, setAllFieldsSelected] = useState(false);

  useEffect(() => {
    const allFieldsSelected = areAllFieldsSelected();
    setAllFieldsSelected(allFieldsSelected);
  }, [selectedTables, selectedColumns, conditions]);

  // Function to handle the dialog close event
  const handleClose = () => {
    setSelectedTables([]);
    setSelectedColumns({});
    setSelectedTables([]);
    setConditions([]);
    setOpen(false);
    setIsCustomQuery(false);
  };
  const [selectedDatasource, setSelectedDatasource] = useState(
    location?.state?.data?.metadata?.dataSource || ""
  );
  const [selectedDatasourceId, setSelectedDatasourceId] = useState(
    currentDashData[0]?.settings?.dataSrcId || ""
  );

  const dataSourceTypeId =
    dashboardConfig?.selectedDashboard?.settings?.dataSrcId;
  const dataSourceTypeName =
    dataSources &&
    dataSources?.filter((data) => data?.dataSourceId === dataSourceTypeId);

  const dSoureName =
    dataSourceTypeName[0]?.dataSourceType +
    " - " +
    dataSourceTypeName[0]?.dataSourceName;
  const dSouretype = dataSourceTypeName[0]?.dataSourceType;

  const [selectedDatasourceType, setSelectedDatasourceType] = useState(
    location?.state?.data?.metadata?.dataSourceType || ""
  );
  const filterDataSource = [];
  for (let i = 0; i < dataSources.length; i++) {
    var temp = filterDataSource.find(
      (data) => data.dataSourceType === dataSources[i].dataSourceType
    );
    if (!temp) {
      filterDataSource.push(dataSources[i]);
    }
  }

  useEffect(() => {
    if (!location?.state?.data?.metadata?.dataSource) {
      setSelectedDatasource(dSoureName);
      setSelectedDatasourceType(dSouretype);
    }
  }, [dSoureName, dSouretype]);
  const handleAccordianChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onQueryChange = (e) => {
    setQuery(e.target.value);
    setError("");
    setDisableButton(false);
    setDisableBtn(true);
    setIsSqlValid(false);
  };

  const onAggQueryChange = (e) => {
    setAggQuery(e.target.value);
    setError("");
    setDisableButton(false);
    setDisableBtn(true);
    setIsSqlValid(false);
  };

  const queryButtonHandler = () => {
    setIsAggQuery(false);
    setIsCustomQuery(false);
  };

  const aggQueryButtonHandler = () => {
    setIsAggQuery(true);
  };

  const onClear = () => {
    setQuery("");
    setAggQuery("");
  };

  const handleVisualizationChange = (e) => {
    let data = { ...visualizationData };
    data[e.target.name] = e.target.value;
    setVisualizationData(data);
  };

  const handleSettingsChange = (data) => {
    setSettingsData(data);
  };

  const handlePanelNameError = (data) => {
    setAphabeticalPanelError(data);
  };

  const handleQueryEdit = () => {
    if (isCustomQuery) {
      handleButtonClick();
    } else {
      setDisableEdit(false);
    }
  };
  const onRun = async () => {
    let filters = [];
    if (dashboardConfig?.selectedDashboard?.settings?.filters) {
      dashboardConfig?.selectedDashboard?.settings?.filters.forEach(
        (element) => {
          filters.push(element);
        }
      );
    }
    if (location?.state?.data?.metadata?.filters) {
      location?.state?.data?.metadata?.filters.forEach((element) => {
        filters.push(element);
      });
    }
    let updatedQuery = isAggQuery
      ? getUpdatedQuery(aggQuery.trim(), filters)
      : getUpdatedQuery(query.trim(), filters);

    if (selectedDatasource.split("-")[0] === "mongodb ") {
      if (updatedQuery.charAt(updatedQuery.length - 1) === ";") {
        updatedQuery = updatedQuery.substring(0, updatedQuery.length - 1);
        setQuery(updatedQuery);
      } else {
        setQuery(updatedQuery);
      }
    } else {
      if (updatedQuery.charAt(updatedQuery.length - 1) === ";") {
        updatedQuery =
          updatedQuery.substring(0, updatedQuery.length - 1) +
          " limit " +
          limitValue +
          ";";
        setQuery(updatedQuery);
      } else {
        updatedQuery = updatedQuery + " limit " + limitValue;
        setQuery(updatedQuery);
      }
    }

    let queryArr = updatedQuery.split(" ");
    let isQueryValid = false;
    if (
      updatedQuery !== "" &&
      queryArr[0] &&
      queryArr[0].toUpperCase() === "SELECT"
    ) {
      isQueryValid = true;
    } else if (isSqlValid === true) {
      isQueryValid = true;
    }

    if (isQueryValid) {
      try {
        let dataSourceArg = selectedDatasourceId || dataSourceTypeId;
        let respData = await storedDatabaseDetails(dataSourceArg);

        setLoading(true);
        const resp = await getQueryData(respData, updatedQuery);
        handleClose();
        if (resp.status === 200 && resp?.data?.status === "success") {
          setShowChart(true);
          setError("");
          let headers = [];
          let data = resp?.data?.data;
          Object.keys(data[0]).forEach((item) => {
            headers.push({
              label: item,
              key: item,
            });
          });
          setHeaders(headers);
          setChartData(data);
          setExpanded(false);
          setDefaultData(!defaultData);
          toast.success("Success"); //resp.data.status
        } else {
          setError("Please enter a valid SELECT query");
          toast.error(error, { theme: "white", color: "red" });
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(
          err?.response?.data?.errorMessage ||
            "Please enter a valid SELECT query"
        );
      }
    } else {
      setError("Please enter a valid SELECT query");
    }
  };

  const hasEnableSave = () => {
    if (visualizationData.panelName) {
      console.log("521",location?.state?.data?.metadata?.visualizationData?.panelName,visualizationData.panelName,
        visualizationData.type,location?.state?.data?.metadata?.visualizationData?.type,location?.state?.data?.metadata?.visualizationData?.chartType,location?.state?.data?.metadata?.visualizationData?.chartType)
      if (
        location?.state?.data?.metadata?.visualizationData?.panelName ===
        visualizationData.panelName &&location?.state?.data?.metadata?.visualizationData?.type ===
        visualizationData.type &&location?.state?.data?.metadata?.visualizationData?.chartType ===
        visualizationData.chartType
      ) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const handleRunRESTAPI = (apiConfig, apiData) => {
    setRestAPIConfig(apiConfig);
    setLoading(true);
    setShowChart(true);
    setError("");
    let headers = [];
    let data = apiData.data ? apiData.data : apiData;
    let optionValues = Object.keys(data[0]);
    let setInfo = location?.state?.data?.metadata?.settingsData;
    if (setInfo?.length > 0) {
      setInfo.xAxisData.options = optionValues;
      setInfo.yAxisData.options = optionValues;
    }

    Object.keys(data)?.forEach((item) => {
      headers.push({
        label: item,
        key: item,
      });
    });
    setHeaders(headers);
    setChartData(data);
    setExpanded(false);
    setDefaultData(!defaultData);
    setLoading(false);
    setSettingsData(setInfo);
    toast.success("Success");
  };
  // Function to handle the button click and open the dialog
  const handleButtonClick = async () => {
    setOpen(true);
    setIsCustomQuery(true);
    try {
      const getDataSourceResp = await getDatabaseDetails(
        selectedDatasourceId || dataSourceTypeId
      );
      const respData = getDataSourceResp.data;
      const schema =
        getDataSourceResp.data.dataSourceType === "mongodb "
          ? respData.details.dbName
          : respData.details.schema;
      setSchema(schema);
      const response = await getTableData(respData, schema);
      if (response.status === 200) {
        const schemaData = response.data.schemaData[0];
        const names = Object.keys(schemaData);
        const tableNames = names.map((name) => ({
          label: name,
        }));
        const columns = {};
        names.forEach((name) => {
          columns[name] = schemaData[name];
        });
        setTableNames(tableNames); // Set the tableNames state here
        setTableColumns(columns); // Access the tableColumns state here
      }
    } catch (error) {
      // Process the response data as needed
      console.error("Error:", error);
    }
  };
  const onValidate = async () => {
    let filters = [];
    if (dashboardConfig?.selectedDashboard?.settings?.filters) {
      dashboardConfig?.selectedDashboard?.settings?.filters.forEach(
        (element) => {
          filters.push(element);
        }
      );
    }
    if (location?.state?.data?.metadata?.filters) {
      location?.state?.data?.metadata?.filters.forEach((element) => {
        filters.push(element);
      });
    }
    let updatedQuery = isAggQuery
      ? getUpdatedQuery(aggQuery.trim(), filters)
      : getUpdatedQuery(query.trim(), filters);
    if (selectedDatasource.split("-")[0] === "mongodb ") {
      if (updatedQuery.charAt(updatedQuery.length - 1) === ";") {
        updatedQuery = updatedQuery.substring(0, updatedQuery.length - 1);
        setQuery(updatedQuery);
      } else {
        setQuery(updatedQuery);
      }
    } else {
      if (updatedQuery.charAt(updatedQuery.length - 1) === ";") {
        updatedQuery =
          updatedQuery.substring(0, updatedQuery.length - 1) +
          " limit " +
          limitValue +
          ";";
      } else {
        updatedQuery = updatedQuery + " limit " + limitValue;
      }
    }
    try {
      let dataSourceArg = selectedDatasourceId || dataSourceTypeId;
      let respData = await storedDatabaseDetails(dataSourceArg);
      setLoading(true);
      const modifiedQuery = query.replace(
        /\sLIMIT\s\d+(\s*,\s*\d+)?\s*;?$/i,
        ";"
      );
      setQuery(modifiedQuery);
      const resp = await validateQuery(respData, modifiedQuery);
      const isQueryValid = resp.data.validQuery;
      setIsSqlValid(isQueryValid);
      setError("Invalid query");
      if (isQueryValid) {
        setDisableBtn(false);
        setDisableButton(true);
        setDisableEdit(true);
        setError("");
        toast.success("Validated successfully");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.errorMessage || "Please enter a valid SELECT query"
      );
      toast.error(err, { theme: "white", color: "red" });
    }
  };

  const onCancel = () => {
    navigate(-1, { state: { currentPage: location.state.selectedPage } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(sheetData);
      setSelectedDatasource("");
      setShowChart(false);
      setExpanded(false);
      onClear();
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSaveJson = () => {
    if (excelData) {
      setJsonData(excelData);
      setChartData(excelData);
      setShowChart(true);
      setExpanded(false);
    }
  };

  const ExcelSave = async () => {
    let savedPanelId;
    let data = { ...location?.state?.data };
    let isEdit = data?.panelId;
    data.metadata = {
      ...location?.state?.data?.metadata,
      visualizationData: visualizationData,
      filename: fileName,
      uploadedExcel: true,
      settingsData: settingsData,
    };

    var x =
      dashboardConfig?.selectedDashboard?.selectedPage?.panelInfos?.filter(
        (e) =>
          e.metadata.visualizationData.panelName ===
            visualizationData.panelName && e.panelId !== data.panelId
      );
    var flag = false;
    if (x?.length > 0) {
      flag = true;
      setPanelNameError(true);
    } else {
      flag = false;
      setPanelNameError(false);
    }

    const dashboardId = dashboardConfig?.selectedDashboard?.dashboardId;
    if (!flag) {
      setLoading(true);

      savedPanelId = await savePanel(dashboardId, data);
      try {
        const Data = {
          actorId: userInfo.actorId,
          pageId: location?.state?.data.pageId,
          panelId: savedPanelId.data.panelId,
          fileName: fileName,
          fileInfo: excelData,
          createdBy: userInfo.lanId,
        };
        let resp;
        if (isEdit) {
          resp = await editExcelData(Data);
        } else {
          resp = await SaveExcelData(Data);
        }

        if (resp.status === 200) {
          console.log(resp.status, "exceldata");
        }
      } catch (err) {
        toast.error(err);
      }
      const dashboardResp = await getDashboards();
      if (dashboardResp.status === 200 && dashboardResp?.data) {
        let allDashboards = dashboardResp.data;
        let selectedDashboard = dashboardConfig?.selectedDashboard;
        const updatedDashboard = allDashboards.find(
          (item) => item.dashboardId === selectedDashboard?.dashboardId
        );
        selectedDashboard.pages = updatedDashboard.pages;
        if (selectedDashboard?.selectedPage?.pageId) {
          const updatedPage = updatedDashboard.pages.find(
            (item) => item.pageId === selectedDashboard?.selectedPage?.pageId
          );
          selectedDashboard.selectedPage = updatedPage;
        }
        dispatch(
          DashboardActions.updateSelectedDashboardRefresh({
            allDashboards,
            selectedDashboard,
          })
        );
        setLoading(false);

        if (
          location?.state?.data?.metadata?.visualizationData?.chartType ===
          "new"
        ) {
          toast.success("Panel created successfully");
        } else {
          toast.success("Panel edited successfully");
        }
      } else {
        setLoading(false);
        toast.error(error, { theme: "white", color: "red" });
      }
      navigate(`/dashboard/${currentDashName?.split(" ").join("")}`, {
        state: { currentPage: location.state.selectedPage },
      });
    }
  };

  const onItemSave = async () => {
    let data = { ...location?.state?.data };
    data.metadata = {
      ...location?.state?.data?.metadata,
      aggregationQuery: aggQuery.trim(),
      visualizationData: visualizationData,
      settingsData: settingsData,
      uploadedExcel: false,
      dataSource: selectedDatasource,
      dataSourceType: selectedDatasourceType,
      dataSourceId: selectedDatasourceId || dataSourceTypeId,
      host: host,
      schema: schema,
    };

    var x =
      dashboardConfig?.selectedDashboard?.selectedPage?.panelInfos?.filter(
        (e) =>
          e.metadata.visualizationData.panelName ===
            visualizationData.panelName && e.panelId !== data.panelId
      );
    var flag = false;
    if (x?.length > 0) {
      flag = true;
      setPanelNameError(true);
    } else {
      flag = false;
      setPanelNameError(false);
    }

    if (selectedDatasourceType === "RESTAPI ") {
      delete data.metadata.query;
      data.metadata.apiConfig = apiConfig;
    } else {
      data.metadata.query = query.trim();
    }

    const dashboardId = dashboardConfig?.selectedDashboard?.dashboardId;
    if (!flag) {
      setLoading(true);
      await savePanel(dashboardId, data);

      const dashboardResp = await getDashboards();
      if (dashboardResp.status === 200 && dashboardResp?.data) {
        let allDashboards = dashboardResp.data;
        let selectedDashboard = dashboardConfig?.selectedDashboard;
        const updatedDashboard = allDashboards.find(
          (item) => item.dashboardId === selectedDashboard?.dashboardId
        );
        selectedDashboard.pages = updatedDashboard.pages;
        if (selectedDashboard?.selectedPage?.pageId) {
          const updatedPage = updatedDashboard.pages.find(
            (item) => item.pageId === selectedDashboard?.selectedPage?.pageId
          );
          selectedDashboard.selectedPage = updatedPage;
        }
        dispatch(
          DashboardActions.updateSelectedDashboardRefresh({
            allDashboards,
            selectedDashboard,
          })
        );
        setLoading(false);

        if (
          location?.state?.data?.metadata?.visualizationData?.chartType ===
          "new"
        ) {
          toast.success("Panel created successfully");
        } else {
          toast.success("Panel edited successfully");
        }
      } else {
        setLoading(false);
        toast.error(error, { theme: "white", color: "red" });
      }
      navigate(`/dashboard/${currentDashName?.split(" ").join("")}`, {
        state: { currentPage: location.state.selectedPage },
      });
    }
  };

  const updateSettingsData = (defaultData, type) => {
    let data = {};
    if (type === "default") {
      data = {
        ...(location?.state?.data?.metadata?.settingsData || {}),
        ...defaultData,
      };
    } else {
      data = {
        ...defaultData,
        ...(location?.state?.data?.metadata?.settingsData || {}),
      };
    }
    setSettingsData(data);
  };

  const handleSelectedDataSource = (e, dataSource) => {
    e.stopPropagation();
    setAggQuery("");
    setQuery("");

    setDisableEdit(false);
    setSelectedDatasource(dataSource);
    const selDsType = dataSource.split("-");
    setSelectedDatasourceType(selDsType[0]);
    dataSources.map((data) => {
      if (
        data.dataSourceType.trim() === selDsType[0].trim() &&
        data.dataSourceName.trim() === selDsType[1].trim()
      ) {
        setSelectedDatasourceId(data.dataSourceId);
      }
    });
  };

  useEffect(() => {
    setSelectedDatasourceId(location?.state?.data?.metadata?.dataSourceId);
    if (location?.state?.data) {
      setVisualizationData({
        panelName:
          location?.state?.data?.metadata?.visualizationData?.panelName || "",
        type:
          location?.state?.data?.metadata?.visualizationData?.type !== "new"
            ? location?.state?.data?.metadata?.visualizationData?.type
            : "table",
        chartType:
          location?.state?.data?.metadata?.visualizationData?.chartType !==
          "new"
            ? location?.state?.data?.metadata?.visualizationData?.chartType
            : "line",
      });
    }
  }, [location?.state?.data]);

  useEffect(() => {
    let filters = [];
    if (dashboardConfig?.selectedDashboard?.settings?.filters) {
      dashboardConfig?.selectedDashboard?.settings?.filters.forEach(
        (element) => {
          filters.push({ name: element.filter.filterName });
        }
      );
    }
    if (location?.state?.data?.metadata?.filters) {
      location?.state?.data?.metadata?.filters.forEach((element) => {
        filters.push({ name: element.filter.filterName });
      });
    }
    setSuggestion(filters);
  }, []);
  useEffect(() => {
    getDataSource();
  }, []);
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
  const getDataSource = async () => {
    const resp = await getDatabase(orgId);
    setDataSources(resp.data);

    if (location?.state?.data?.metadata?.dataSourceId) {
      const getDataSourceResp = await getDatabaseDetails(
        location?.state?.data?.metadata?.dataSourceId || dataSourceTypeId
      );
      const hostName = getDataSourceResp.data.details.host;
      const schemaName = getDataSourceResp.data.details.schema;
      setschema(schemaName);
      sethost(hostName);
    }
  };

  return (
    <>
      <DrawerHeader style={{ minHeight: "60px" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          fontSize: "16px",
          position: "relative",
          bottom: 10,
          marginLeft: sidebarFlag ? "12.5%" : "4.5%",
        }}
      >
        <IconButton style={{ padding: 0, margin: 0 }}>
          <KeyboardBackspaceIcon
            onClick={() => {
              navigate(-1);
            }}
          />
        </IconButton>
        <h3
          style={{
            margin: "2px",
            textAlign: "start",
            fontWeight: "bold",
            color: "var(--color)",
            padding: "5px",
          }}
        >
          {currentDashName ? (
            currentDashName?.charAt(0).toUpperCase() + currentDashName?.slice(1)
          ) : (
            <CircularProgress color="inherit" />
          )}
        </h3>
      </div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleAccordianChange("panel1")}
        style={{
          borderRadius: 0,
          width: sidebarFlag ? "74%" : "94%",
          marginLeft: sidebarFlag ? "13%" : "5%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ marginTop: 7 }}>Data Source: </Typography>
          <FormControl style={{ width: "400px", marginLeft: "10px" }}>
            <Select
              labelId="data-souce"
              id="data-souce"
              name="Datasource"
              variant="outlined"
              value={selectedDatasource}
              onChange={(e) => {
                handleSelectedDataSource(e, e.target.value);
                setShowChart(false);
              }}
              style={{
                height: "40px",
              }}
              MenuProps={{
                style: { height: "500px", width: "193px" },
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
              {dataSources &&
                dataSources
                  .filter(
                    (data) =>
                      data.dataSourceType !== "" && data.dataSourceName !== ""
                  )
                  .map((item) => {
                    return (
                      <MenuItem
                        key={item.dataSourceId}
                        value={`${item.dataSourceType} - ${item.dataSourceName}`}
                      >{`${item.dataSourceType} - ${item.dataSourceName}`}</MenuItem>
                    );
                  })}
            </Select>
          </FormControl>
        </AccordionSummary>
        {/* for databases */}
        {selectedDatasourceType && selectedDatasourceType !== "RESTAPI " && (
          <AccordionDetails style={{ flexDirection: "column" }}>
            <div>
              <Button
                style={{
                  backgroundColor: isAggQuery ? " " : "var(--dashboardBgColor)",
                  textTransform: "none",
                  fontSize: "14px",
                }}
                onClick={queryButtonHandler}
              >
                Query
              </Button>
              <Button
                style={{
                  backgroundColor: isAggQuery ? "var(--dashboardBgColor)" : "",
                  textTransform: "none",
                  fontSize: "14px",
                }}
                onClick={handleButtonClick}
              >
                Custom Query
              </Button>
              <Dialog
                open={open}
                style={{ maxHeight: "calc(100% - 45px)" }}
                maxWidth="xs"
                fullWidth
                BackdropProps={{
                  classes: {
                    root: classes.backDrop,
                  },
                }}
              >
                <div
                  className="headingbtn3"
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    color: "var(--colorforwhite)",
                    fontSize: "16px",
                    height: "50px",
                  }}
                >
                  <DialogTitle
                    id="customized-dialog-title-domain"
                    onClose={handleClose}
                    style={{
                      color: "var(--colorforwhite)",
                      backgroundColor: "var(--dashboardBgColor)",
                    }}
                  >
                    Custom Query Generator
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    style={{ color: "var(--colorforwhite)" }}
                  >
                    <CloseIcon onClick={handleClose} />
                  </IconButton>
                </div>
                <DialogContent>
                  <div className={classes.fieldsContainer}>
                    <Autocomplete
                      PopperComponent={popperTable}
                      size="small"
                      multiple
                      fullWidth
                      options={tableNames}
                      value={selectedTables || []}
                      onChange={(event, newValue) => {
                        if (
                          newValue.length === 0 ||
                          newValue[newValue.length - 1].label !== ""
                        ) {
                          setSelectedTables(newValue);
                        }
                      }}
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Tables"
                          placeholder="Search tables"
                          size="small"
                          InputLabelProps={{
                            classes: {
                              root: classes.labelRoot,
                            },
                          }}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option) => (
                          <Chip
                            size="small"
                            key={option.label}
                            label={option.label}
                            InputLabelProps={{
                              classes: {
                                root: classes.labelRoot,
                              },
                            }}
                            {...getTagProps({ label: option.label })}
                          />
                        ))
                      }
                      className={classes.autocomplete}
                    />
                    {selectedTables.map((table) => (
                      <Autocomplete
                        PopperComponent={popperTable}
                        size="small"
                        key={table.label}
                        options={tableColumns[table.label] || []}
                        multiple
                        value={selectedColumns[table.label] || []}
                        onChange={(event, newValue) =>
                          handleColumnChange(table.label, newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label={table.label}
                            placeholder="Select columns"
                            InputLabelProps={{
                              classes: {
                                root: classes.labelRoot,
                              },
                            }}
                          />
                        )}
                        className={classes.autocomplete}
                      />
                    ))}
                    {conditions.map((condition, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "1%",
                          marginBottom: "10px",
                        }}
                      >
                        <Autocomplete
                          PopperComponent={PopperMy}
                          options={selectedTables.flatMap((table) =>
                            (selectedColumns[table.label] || []).map(
                              (column) => `${table.label}.${column}`
                            )
                          )}
                          value={condition.column}
                          onChange={(event, newValue) => {
                            const newConditions = [...conditions];
                            newConditions[index].column = newValue;
                            setConditions(newConditions);
                          }}
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Column"
                              variant="outlined"
                              InputLabelProps={{
                                classes: {
                                  root: classes.labelRoot,
                                },
                              }}
                              style={{ width: "140px" }}
                            />
                          )}
                          className={classes.conditionTextBox}
                        />
                        <Autocomplete
                          PopperComponent={PopperMy}
                          options={operators}
                          value={condition.operator}
                          size="small"
                          onChange={(event, newValue) => {
                            const newConditions = [...conditions];
                            newConditions[index].operator = newValue;
                            setConditions(newConditions);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Operator"
                              variant="outlined"
                              InputLabelProps={{
                                classes: {
                                  root: classes.labelRoot,
                                },
                              }}
                              style={{ width: "140px" }}
                            />
                          )}
                          className={classes.operatorBox}
                        />

                        <TextField
                          label="Value"
                          variant="outlined"
                          size="small"
                          value={condition.value}
                          onChange={(event) => {
                            const newConditions = [...conditions];
                            newConditions[index].value = event.target.value;
                            setConditions(newConditions);
                          }}
                          InputLabelProps={{
                            classes: {
                              root: classes.labelRoot,
                            },
                          }}
                          style={{ width: "20%", marginRight: "-11px" }}
                        />
                        <Tooltip title="Remove">
                          <IconButton>
                            <HighlightOffIcon
                              variant="contained"
                              color="secondary"
                              onClick={() => handleRemoveCondition(index)}
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </DialogContent>
                <DialogActions>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      variant="contained"
                      onClick={handleAddCondition}
                      disabled={!areAllFieldsSelected()} // Disable if tables and columns are not selected
                      style={{
                        fontSize: "12px",
                        color: "var(--colorforwhite)",
                        backgroundColor: "var(--dashboardBgColor)",
                        marginRight: "10px",
                        opacity: areAllFieldsSelected() ? 1 : 0.5,
                        cursor: areAllFieldsSelected()
                          ? "pointer"
                          : "not-allowed",
                        textTransform: "capitalize",
                      }}
                    >
                      Add Condition
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleGenerateQuery}
                      style={{
                        fontSize: "12px",
                        color: "var(--colorforwhite)",
                        backgroundColor: "var(--dashboardBgColor)",
                        opacity: areAllFieldsSelected() ? 1 : 0.5,
                        cursor: areAllFieldsSelected()
                          ? "pointer"
                          : "not-allowed",
                        textTransform: "capitalize",
                      }}
                      disabled={!areAllFieldsSelected()} // Disable if all fields are empty
                    >
                      Generate Query
                    </Button>
                  </div>
                </DialogActions>
              </Dialog>
              <Button
                style={{
                  backgroundColor: isAggQuery ? "var(--dashboardBgColor)" : "",
                  textTransform: "none",
                  fontSize: "14px",
                }}
                onClick={aggQueryButtonHandler}
                disabled={!aggregator}
              >
                Aggregator
              </Button>
            </div>
            <ReactTextareaAutocomplete
              id="query"
              name="query"
              className="my-textarea"
              rows="4"
              disabled={disableEdit}
              value={isAggQuery ? aggQuery : query}
              onChange={isAggQuery ? onAggQueryChange : onQueryChange}
              loadingComponent={() => <span>Loading</span>}
              trigger={{
                "{{": {
                  dataProvider: () => suggestions,
                  component: ({ entity: { name } }) => <div>{name}</div>,
                  output: (item) => `{{${item.name}}}`,
                },
              }}
              Style={{
                marginBottom: 20,
              }}
            />
            {error !== "" && <p className="error">{error}</p>}
            <div className="QueryBtn">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={aggregator}
                      onChange={() => {
                        setAggregator(!aggregator);
                        setIsAggQuery(!aggregator);
                      }}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Aggregator"
                />
                <FormControl
                  style={{
                    width: "100%",
                  }}
                  size="small"
                  disabled={!aggregator}
                >
                  <InputLabel id="demo-select-small">Frequency</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    name="Aggregator"
                    value={accumulation}
                    label="Frequency"
                    onChange={(e) => setAccumulation(e.target.value)}
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
                    <MenuItem key="None" value="None">
                      Daily
                    </MenuItem>
                    <MenuItem key="Weekly" value="Weekly">
                      Weekly
                    </MenuItem>
                    <MenuItem key="Monthly" value="Monthly">
                      Monthly
                    </MenuItem>
                    <MenuItem key="Yearly" value="Yearly">
                      Yearly
                    </MenuItem>
                    <MenuItem key="dateRangePicker" value={"dateRangePicker"}>
                      Date Range Picker
                    </MenuItem>
                    <MenuItem key="timePicker" value={"timePicker"}>
                      Time Picker
                    </MenuItem>
                    <MenuItem key="dateTimerPicker" value={"dateTimePicker"}>
                      Date Time Picker
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  autoComplete="off"
                  margin="dense"
                  name="AggregatorType"
                  id="AggregatorType"
                  label="Aggregator Type"
                  type="text"
                  variant="outlined"
                  value={aggregatorType.AggregatorType}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    style: {
                      fontSize: 16,
                    },
                  }}
                />

                <TextField
                  autoComplete="off"
                  margin="dense"
                  name="Limit"
                  id="Limit"
                  label="Limit"
                  type="text"
                  variant="outlined"
                  value={limitValue}
                  onChange={(e) => setLimitValue(e.target.value)}
                  style={{ width: "100%" }}
                  inputProps={{
                    maxLength: 2,
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: 16,
                    },
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                {disableButton && (
                  <>
                    <Button
                      disabled={!isSqlValid}
                      variant="contained"
                      color="primary"
                      style={{
                        color: "var(--colorforwhite)",
                        backgroundColor: "var(--dashboardBgColor)",
                        fontSize: "14px",
                        textTransform: "none",
                      }}
                      onClick={handleQueryEdit}
                    >
                      Query Edit
                    </Button>
                    <Button
                      disabled={!isSqlValid}
                      variant="contained"
                      color="primary"
                      style={{
                        color: "var(--colorforwhite)",
                        backgroundColor: "var(--dashboardBgColor)",
                        fontSize: "14px",
                        textTransform: "none",
                      }}
                      onClick={onRun}
                    >
                      Run
                    </Button>
                  </>
                )}
                {disableBtn && (
                  <>
                    <div
                      style={{
                        opacity: query.length > 0 ? 1 : 0.6,
                        cursor: query.length > 0 ? "pointer" : "not-allowed",
                      }}
                    >
                      <Button
                        disabled={query.length > 0 ? !disableBtn : disableBtn}
                        variant="contained"
                        style={{
                          color: "var(--colorforwhite)",

                          backgroundColor: "var(--dashboardBgColor)",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                        onClick={onValidate}
                      >
                        Validate
                      </Button>
                    </div>
                    <div
                      style={{
                        opacity: query.length > 0 ? 1 : 0.6,
                        cursor: query.length > 0 ? "pointer" : "not-allowed",
                      }}
                    >
                      <Button
                        variant="text"
                        style={{
                          color: "var(--colorforwhite)",

                          backgroundColor: "var(--dashboardBgColor)",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                        onClick={onClear}
                        disabled={query.length > 0 ? !disableBtn : disableBtn}
                      >
                        Clear
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </AccordionDetails>
        )}
        {/* for RESTAPIs */}
        {selectedDatasourceType && selectedDatasourceType === "RESTAPI " && (
          <AccordionDetails style={{ flexDirection: "column" }}>
            <RestApiComponent
              defaultValues={location?.state?.data?.metadata?.apiConfig || ""}
              handleRunRESTAPI={handleRunRESTAPI}
            />
          </AccordionDetails>
        )}
      </Accordion>

      <Accordion
        style={{
          top: "12px",
          paddingBottom: "15px",
          borderRadius: "5px",
          width: sidebarFlag ? "74%" : "94%",
          marginLeft: sidebarFlag ? "13%" : "5%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Upload Excel File : {chartData && <div>{fileName}</div>}
        </AccordionSummary>

        <AccordionDetails>
          <div>
            <input
              type="file"
              id="files"
              accept=".xlsx"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              onClick={handleSaveJson}
              disabled={!excelData}
            >
              Save ExcelData as JSON
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
      {jsonData && (
        <Accordion
          style={{
            top: "5px",
            borderRadius: "5px",
            width: sidebarFlag ? "74%" : "94%",
            marginLeft: sidebarFlag ? "13%" : "5%",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            JSON Data
          </AccordionSummary>
          <AccordionDetails>
            {jsonData && (
              <div>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      )}
      {showChart && (
        <>
          <div
            className="chart-div"
            style={{
              width: sidebarFlag ? "74%" : "94%",
              marginLeft: sidebarFlag ? "13%" : "5%",
            }}
          >
            <div className="card" style={{ height: "84vh", width: "70%" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ position: "absolute" }}
                >
                  {visualizationData?.panelName}
                </Typography>
                <CSVLink
                  data={chartData}
                  headers={headers}
                  filename={"chart1.csv"}
                  style={{ marginLeft: "auto" }}
                >
                  <Tooltip
                    title="Export as CSV"
                    PopperProps={{ style: { marginTop: -12 } }}
                  >
                    <IconButton
                      style={{
                        float: "right",
                        color: "var(--dashboardBgColor)",
                      }}
                    >
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                </CSVLink>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <div style={{ height: "90%", width: "90%" }}>
                  {renderChart(
                    "query",
                    visualizationData?.type,
                    visualizationData?.chartType,
                    chartData,
                    settingsData,
                    updateSettingsData,
                    defaultData,
                    location?.state?.data?.metadata
                  )}
                </div>
              </div>
            </div>
            <ChartSettings
              chartData={chartData}
              visualizationData={visualizationData}
              handleVisualizationChange={handleVisualizationChange}
              handlePanelNameError={handlePanelNameError}
              settingsData={settingsData}
              panelNameError={panelNameError}
              setPanelNameError={setPanelNameError}
              dashboardConfig={dashboardConfig}
              handleSettingsChange={handleSettingsChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: "10px",
              width: sidebarFlag ? "88%" : "99%",
              position: "relative",
              bottom: "13vh",
            }}
          >
            <div
              style={{
                opacity:
                  fileName === null
                    ? !hasEnableSave() || aphabeticalPanelError
                      ? 0.6
                      : 1
                    : !hasEnableSave() || !excelData || aphabeticalPanelError
                    ? 0.6
                    : 1,
                cursor:
                  !hasEnableSave() || aphabeticalPanelError
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <Button
                variant="contained"
                style={{
                  color: "var(--colorforwhite)",
                  height: 36.5,
                  width: 64,
                  borderRadius: 0,
                  backgroundColor: "var(--dashboardBgColor)",
                  fontSize: "14px",
                  textTransform: "none",
                  border: "none",
                }}
                onClick={() => (fileName === null ? onItemSave() : ExcelSave())}
                disabled={
                  fileName === null
                    ? !hasEnableSave() || aphabeticalPanelError
                    : !hasEnableSave() || !excelData || aphabeticalPanelError
                }
              >
                Save
              </Button>
            </div>

            <Button
              variant="text"
              style={{
                color: "var(--colorforwhite)",
                backgroundColor: "var(--dashboardBgColor)",
                fontSize: "14px",
                textTransform: "none",
                marginRight: 40,
              }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ width: "300px" }}
        theme="colored"
        toastStyle={{ backgroundColor: "white", color: "var(--selectedTab)" }}
      />
    </>
  );
}

export default QueryComponent;
