import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { charts, types } from "../../utils/Config";
import FormComposer from "../FormComposer";

const validNameRegex = new RegExp(/^([a-zA-Z ]){1,30}$/);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ChartSettings({
  chartData,
  visualizationData,
  handleVisualizationChange,
  handlePanelNameError,
  settingsData,
  panelNameError,
  setPanelNameError,
  handleSettingsChange,
  drillDown
}) {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState(settingsData || {});
  const [chartTypes, setChartTypes] = useState([]);
  const [isPanaleNameError, setIsPanaleNameError] = useState(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onFormChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: { ...formData[field], value: value },
    }));
    handleSettingsChange({
      ...formData,
      [field]: { ...formData[field], value: value },
    });
  };

  useEffect(() => {
    const chart = charts({ chartData });
    setChartTypes(chart);
  }, [chartData]);

  useEffect(() => {
    setFormData(settingsData);
  }, [settingsData]);

  return (
    <>
      <div className="card" style={{ height: "84vh", width: drillDown? "32%": "20%" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ marginBottom: "30px", color: "var(--dashboardBgColor)" }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label="Visualization"
            style={{
              textTransform: "none",
              minWidth: "50%",
              color: "var(--dashboardBgColor)",
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Settings"
            required
            style={{
              textTransform: "none",
              minWidth: "50%",
              color: "var(--dashboardBgColor)",
            }}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          {!drillDown && <TextField
            style={{ marginBottom: "20px", width: "100%" }}
            autoComplete="off"
            id="outlined-basic"
            label="Panel Name"
            variant="outlined"
            size="small"
            name="panelName"
            required
            value={visualizationData?.panelName}
            onChange={(e) => {
              setPanelNameError(false);
              if (validNameRegex.test(e.target.value) === false) {
                setIsPanaleNameError(true);
                handlePanelNameError(true);
              } else {
                setIsPanaleNameError(false);
                handlePanelNameError(false);
              }
              handleVisualizationChange(e);
            }}
            error={isPanaleNameError || panelNameError}
            helperText={
              (isPanaleNameError &&
                "No special characters and numbers are allowed") ||
              (panelNameError && "Panel Name already exists")
            }
          />}
          <FormControl
            style={{ width: "100%", marginBottom: "20px" }}
            size="small"
            variant="outlined"
          >
            <InputLabel id="demo-select-small" required>
              Type
            </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              name="type"
              value={visualizationData?.type}
              label="Type"
              onChange={handleVisualizationChange}
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
              {types.map((item, index) => (
                <MenuItem
                  key={`${item.type}+${index}`}
                  value={item.type}
                  disabled={item.disabled}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {visualizationData?.type === "chart" && (
            <FormControl
              style={{ width: "100%", marginBottom: "20px" }}
              size="small"
              variant="outlined"
            >
              <InputLabel id="demo-select-small">Chart Type</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                name="chartType"
                value={visualizationData?.chartType}
                label="Chart Type"
                onChange={handleVisualizationChange}
                MenuProps={{
                  style: { height: "200px" },
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
                {chartTypes?.map((item, index) => (
                  <MenuItem
                    key={`${item.type}+${index}`}
                    value={item.type}
                    disabled={item.disabled}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </TabPanel>
        <TabPanel
          value={tabValue}
          index={1}
          style={{ overflow: "auto", overflowX: "hidden" , height:"58vh" }}
        >
          <FormComposer
            formData={formData}
            onFormChange={onFormChange}
            type={visualizationData?.type}
            chartType={visualizationData?.chartType}
          />
        </TabPanel>
      </div>
    </>
  );
}

export default ChartSettings;
