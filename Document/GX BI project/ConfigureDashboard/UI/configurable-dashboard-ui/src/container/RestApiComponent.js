import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Typography,
  Button,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Box,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { httpMethods } from "../utils/Config";
import { getAPIData } from "../services/DashboardServices";
import { useStyles } from "./RestApiComponentStyles";
import {restAPIResponseSorting} from "../utils/formUtils";


export const RestApiComponent = (props) => {
  const classes = useStyles(props);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    method: props.defaultValues.method || httpMethods[0].name,
    url: props.defaultValues.url || "",
    header: {},
    auth: "None",
    bodyType: props.defaultValues.headers || "Custom",
    body: props.defaultValues.body || "",
  });

  const [header, setHeader] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [testResult, setTestResult] = useState("");
  const [hasError, setHasError] = useState(true);
  const [response, setResponse] = useState("");
  const [disableBtnRun, setDisableBtnRun] = useState(false);
  const [disableBtnTest] = useState(true);

  const onUrlChange = (e) => {
    setFormData({ ...formData, url: e.target.value });
    setTestResult("");
  };

  const handleMethodChange = (e) => {
    setFormData({ ...formData, method: e.target.value });
  };

  const handleApiTab = (e, val) => {
    setSelectedTab(val);
  };

  const handleAuth = (e) => {
    setFormData({ ...formData, auth: e.target.value });
  };

  const handleBodyDropDown = (e) => {
    setFormData({
      ...formData,
      bodyType: e.target.value,
      header: { "Content-Type": e.target.value },
    });
  };

  const handleBodyValue = (e) => {
    setFormData({ ...formData, body: e.target.value });
  };

  const onHeaderTextChange = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({ ...formData, header: { [header.key]: header.value } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [header]);

  const onSendClick = async (e) => {
    formData.method === "GET" ? setSelectedTab(2) : setSelectedTab(3);
    setIsLoading(true);
    setTestResult("Loading...");
    try {
      const resp = await getAPIData(
        formData.method,
        formData.url,
        formData.body,
        formData.header
      );
      if (resp.status === 200) {
        setDisableBtnRun(true);
        setHasError(false);
        setTestResult(JSON.stringify(resp.data, null, 2));
        
        setResponse(restAPIResponseSorting(resp.data));
        setIsLoading(false);
        toast.success("Success"); // resp.statusText

      }
    } catch (err) {
      setIsLoading(false);
      setTestResult(JSON.stringify(err.response.data, null, 2));
      setHasError(true);
      toast.error(err, { theme: "white", color: "red" });
    }
  };

  return (
    <>
      {/* method url and test button section */}
      <Box className={classes.component}>
        <Select
          variant="outlined"
          className={classes.select}
          value={formData.method}
          style={{ marginRight: "5px" }}
          onChange={(e) => handleMethodChange(e)}
          MenuProps={{
            style: { height: "170px", width: "200px" },
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
          {httpMethods.map((method) => {
            return <MenuItem value={method.name}>{method.name}</MenuItem>;
          })}
        </Select>
        <TextField
          size="small"
          variant="outlined"
          className={classes.textfield}
          value={formData.url}
          onChange={(e) => onUrlChange(e)}
        />
        <div
            style={{
              cursor: formData.url.length > 0 ? "pointer" : "not-allowed",
              opacity: formData.url.length > 0 ? 1 : 0.6,
            }}
        >
          <Button
            disabled={formData.url.length > 0 ? !disableBtnTest : disableBtnTest}
            color="primary"
            className={classes.button}
            variant="contained"
            onClick={() => onSendClick()}
            style={{
              margin: "10px",
              backgroundColor: "var(--dashboardBgColor)",
              color: "var(--colorforwhite)",
              padding: "5px 10px",
              fontSize: 14,
              textTransform: "none",
            }}
          >
            Test
          </Button>
        </div>
      </Box>

      {/* auth headers body testResult section */}
      <Box className={classes.component2}>
        <Tabs
          value={selectedTab}
          onChange={handleApiTab}
          indicatorColor="primary"
          textColor="none"
          className={classes.tabs}
        >
          <Tab
            style={{
              fontSize: "14px",
              marginRight: "40px",
              fontWeight: "normal",
            }}
            label="Auth"
            className={classes.tab}
          />
          <Tab
            style={{
              fontSize: "14px",
              marginRight: "40px",
              fontWeight: "normal",
            }}
            label="Headers"
            className={classes.tab}
          />
          {formData.method === "POST" && (
            <Tab
              style={{
                fontSize: "14px",
                marginRight: "40px",
                fontWeight: "normal",
              }}
              label="Body"
              className={classes.tab}
            />
          )}
          <Tab
            style={{
              fontSize: "14px",
              marginRight: "40px",
              fontWeight: "normal",
            }}
            label="Test Request"
            className={classes.tab}
          />
        </Tabs>

        {/* Tab1 */}
        <Box
          role="tabpanel"
          hidden={selectedTab !== 0}
          id={`simple-tabpanel-${0}`}
          aria-labelledby={`simple-tab-${0}`}
        >
          {/* Tab 1 content */}
          <Box className={classes.container}>
            <Typography style={{ fontSize: "16px" }}>
              Choose the authorization profile you want to use for this request
            </Typography>
            <Select
              variant="outlined"
              className={classes.tab1Content}
              value={formData.auth}
              // label="Auth"
              style={{ width: "300px", height: "50px" }}
              onChange={(e) => handleAuth(e)}
              MenuProps={{
                style: { height: "170px", width: "200px" },
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
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"API KEY"}>API Key</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Tab 2 */}
        <Box
          role="tabpanel"
          hidden={selectedTab !== 1}
          id={`simple-tabpanel-${1}`}
          aria-labelledby={`simple-tab-${1}`}
        >
          {/* Tab 2 content */}
          <Box className={classes.container}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablecell}>Key</TableCell>
                  <TableCell className={classes.tablecell}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tablecell}>
                    <TextField
                      className={classes.tabletextfield}
                      inputProps={{ style: { height: 30, padding: "0 5px" } }}
                      name="key"
                      variant="outlined"
                      onChange={(e) => onHeaderTextChange(e)}
                    />
                  </TableCell>
                  <TableCell className={classes.tablecell}>
                    <TextField
                      className={classes.tabletextfield}
                      inputProps={{ style: { height: 30, padding: "0 5px" } }}
                      name="value"
                      variant="outlined"
                      onChange={(e) => onHeaderTextChange(e)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* Tab 3 */}

        <Box
          role="tabpanel"
          hidden={
            formData.method === "POST" ? selectedTab !== 2 : selectedTab !== -1
          }
          id={`simple-tabpanel-${1}`}
          aria-labelledby={`simple-tab-${1}`}
        >
          {/* Tab 3 content */}
          <Box className={classes.container}>
            <Select
              style={{ marginBottom: "20px" }}
              variant="outlined"
              className={classes.tab1Content}
              value={formData.bodyType}
              placeholder="Body"
              // label="Body"
              onChange={(e) => handleBodyDropDown(e)}
              MenuProps={{
                style: { height: "170px", width: "200px" },
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
              <MenuItem style={{ fontSize: "14px" }} value={"Custom"}>
                Custom
              </MenuItem>
              <MenuItem style={{ fontSize: "14px" }} value={"application/json"}>
                Application/JSON
              </MenuItem>
            </Select>
            <TextareaAutosize
              minRows={3}
              maxRows={10}
              className={classes.textarea}
              value={formData.body}
              onChange={handleBodyValue}
            />
          </Box>
        </Box>
        {/* Tab 4 */}
        <Box
          role="tabpanel"
          hidden={
            formData.method === "POST" ? selectedTab !== 3 : selectedTab !== 2
          }
          id={`simple-tabpanel-${2}`}
          aria-labelledby={`simple-tab-${2}`}
        >
          {/* Tab 4 content */}
          <Box className={classes.container}>
            <TextareaAutosize
              minRows={3}
              maxRows={10}
              className={classes.textarea}
              style={{
                textAlign: isLoading && "center",
                color: isLoading ? "black" : hasError ? "#F55050" : "#3C84AB",
                padding: "10px 0px 10px 20px",
                boxSizing: "border-box",
              }}
              value={testResult}
            />
          </Box>
        </Box>
      </Box>
      {disableBtnRun && (
        <div>
          <Button
            disabled={hasError}
            variant="contained"
            color="primary"
            // style={{ float: "right" }}
            style={{
              margin: "10px",
              backgroundColor: "var(--dashboardBgColor)",
              color: "white",
              padding: "5px 10px",
              fontSize: 14,
              float: "right",
              textTransform: "none",
            }}
            onClick={() => props.handleRunRESTAPI(formData, response)}
          >
            Run
          </Button>

          <Button
            //style={{ float: "right" }}
            style={{
              margin: "10px",
              backgroundColor: "var(--dashboardBgColor)",
              color: "white",
              padding: "5px 10px",
              fontSize: 14,
              float: "right",
              textTransform: "none",
            }}
            onClick={() => {
              setFormData({
                method: "GET",
                header: {},
                auth: "None",
                bodyType: "Custom",
                body: "",
                url: "",
              });
              setTestResult("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ width: "300px" }}
        theme="colored"
        toastStyle={{ backgroundColor: "white", color: "var(--selectedTab)"}}
      />
    </>
  );
};
