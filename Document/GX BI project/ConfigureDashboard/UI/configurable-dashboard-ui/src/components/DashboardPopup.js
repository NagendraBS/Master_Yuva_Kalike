/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DashboardActions from "../actions/dashboardAction";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createDashboard,
  createDuplicateDashboard,
  getDashboards,
} from "../services/DashboardServices";
import { useNavigate } from "react-router-dom";
import { getDatabase } from "../services/AdminServices";

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  redAsterisk: {
    color: "red",
  },
});

const AddNewDashboard = (props) => {
  const { openDialog, setOpenDialog, type } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const dashboardConfig = useSelector((state) => state.dashboard);
  const dashId = sessionStorage.getItem("applicationId")
    ? sessionStorage.getItem("applicationId")
    : dashboardConfig?.selectedDashboard?.dashboardId;
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;

  const [dashboardName, setDashboardName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [cRefreshRate, setCRefreshRate] = useState();
  const [dataSources, setDataSources] = useState([]);
  const [dataSrcId, setDataSrcId] = useState();
  const [loading, setLoading] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [error, setError] = useState({
    groupError: false,
    dashboardError: false,
    groupErrorMessage: " Group Name should not be empty",
    dashboardErrorMessage: "Dashboard Name should not be empty",
  });

  const handleClose = () => {
    setOpenDialog(null);
    setError({
      ...error,
      groupError: false,
      dashboardError: false,
      refreshError: false,
      datasourceError: false,
    });
    setCRefreshRate();
    setDashboardName("");
    setGroupName("");
  };

  const handleSelectedDataSource = (e) => {
    let selectedDataSrc;
    dataSources.map((event, i) => {
      if (event.dataSourceId === e.target.value) {
        selectedDataSrc = event;
      }
    });
    const dataName = `${selectedDataSrc.dataSourceType} - ${selectedDataSrc.dataSourceName}`;
    sessionStorage.setItem("dataSrcName", dataName);
    sessionStorage.setItem("dataSrcType", selectedDataSrc.dataSourceType);
    dispatch(DashboardActions.dataSrcName(dataName));
    setDataSrcId(e.target.value);
  };

  const hasErrorInDashboard = () => {
    if (groupName && dashboardName) {
      return true;
    } else {
      return false;
    }
  };

  const filteredGroupSelect = useSelector((state) => {
    let groups = [];
    state.dashboard.dashboards.forEach((dashboardObj) => {
      Object.keys(dashboardObj).forEach((property) => {
        if (property === "groupName") {
          groups.push(dashboardObj[property]);
        }
      });
    });
    return groups;
  });

  const filteredDashboardNameSelect = useSelector((state) => {
    let names = [];
    state.dashboard.dashboards.forEach((dashboardObj) => {
      Object.keys(dashboardObj).forEach((property) => {
        if (property === "dashboardName") {
          names.push(dashboardObj[property].toLowerCase());
        }
      });
    });
    return names;
  });

  const handleSave = async () => {
    let updatedErr = { ...error };
    if (groupName === "") {
      updatedErr.groupError = true;
    } else if (filteredGroupSelect.indexOf(groupName) === -1) {
      updatedErr.groupError = true;
      updatedErr.groupErrorMessage = " Group Name should be CAI_DASHBOARD_DEV";
    }
    if (dashboardName === "") {
      updatedErr.dashboardError = true;
      updatedErr.dashboardErrorMessage = " Dashboard Name should not be empty.";
    } else if (
      filteredDashboardNameSelect.indexOf(dashboardName.toLowerCase()) !== -1
    ) {
      updatedErr.dashboardError = true;
      updatedErr.dashboardErrorMessage = " Dashboard name already exist";
    }
    setError(updatedErr);
    if (
      updatedErr.groupError === false &&
      updatedErr.dashboardError === false
    ) {
      switch (openDialog) {
        case "NEW":
          setLoading(true);
          await newDashboard();
          setLoading(false);

          break;
        case "DUPLICATE":
          setLoading(true);
          await duplicateDashboard();
          setLoading(false);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    switch (type) {
      case "NEW":
        setDialogTitle("Add New Dashboard");
        setOpenDialog(type);
        setDashboardName("");
        setGroupName("");
        setCRefreshRate();
        setDataSrcId();
        break;
      case "DUPLICATE":
        setDialogTitle("Duplicate Dashboard");
        setGroupName(dashboardConfig.selectedDashboard.groupName);
        setDashboardName(dashboardConfig.selectedDashboard.dashboardName);
        setCRefreshRate(dashboardConfig.selectedDashboard.settings.refreshRate);
        setDataSrcId(dashboardConfig.selectedDashboard.settings.dataSrcId);
        setOpenDialog(type);
        break;
      default:
        break;
    }
  }, [type]);

  const duplicateDashboard = async () => {
    const data = {
      dashboardId: dashId,
      dashboardName: dashboardName,
      groupName: groupName,
      settings: {
        ...dashboardConfig?.selectedDashboard?.settings,
        refreshRate: cRefreshRate,
        dataSrcId,
      },
    };
    setOpenDialog(null);
    try {
      const resp = await createDuplicateDashboard(data);
      if (resp.status === 200 && resp?.data) {
        sessionStorage.setItem("applicationId", resp.data.dashboardId);
        sessionStorage.setItem("dashboardName", resp.data.dashboardName);

        const resp1 = await getDashboards();
        if (resp1.status === 200 && resp1?.data) {
          dispatch(DashboardActions.updateDashboards(resp1.data));
          toast.success("Duplicate Dashboard created successfully");
        }
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message, { theme: "white", color: "red" });
    }
  };

  const newDashboard = async () => {
    toast.success("New Dashboard added successfully");
    try {
      const data = {
        dashboardName: dashboardName,
        groupName: groupName,
        settings: { refreshRate: cRefreshRate, dataSrcId },
      };
      const resp = await createDashboard(data);
      if (resp.status === 200) {
        sessionStorage.setItem("applicationId", resp.data.dashboardId);
        sessionStorage.setItem("dashboardName", resp.data.dashboardName);
        dispatch(DashboardActions.addDashboard(resp?.data));
        dispatch(DashboardActions.updateSelectedDashboard(resp?.data));
        setOpenDialog(null);
        setDashboardName("");
        setGroupName("");
        setCRefreshRate();
        navigate(
          `./dashboard/${resp?.data?.dashboardName?.split(" ").join("")}`
        );
      }
      return resp;
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    getDataSource();
  }, []);

  useEffect(() => {
    getDataSource();
  }, [openDialog]);

  const getDataSource = async () => {
    const resp = await getDatabase(orgId);
    setDataSources(resp.data);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <div
          style={{
            backgroundColor: "var(--dashboardBgColor)",
            color: "var(--colorforwhite)",
            fontSize: "20px",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle>{dialogTitle}</DialogTitle>
          <IconButton
            aria-label="close"
            style={{ color: "var(--colorforwhite)" }}
          >
            <CloseIcon onClick={handleClose} />
          </IconButton>
        </div>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="groupName"
                label="Group Name"
                type="text"
                autoComplete="off"
                value={groupName}
                error={error.groupError}
                helperText={error.groupError && error.groupErrorMessage}
                onChange={(e) => {
                  setError({ ...error, groupError: false });
                  if (e.target.value === "") {
                    setError({
                      ...error,
                      groupError: true,
                      groupErrorMessage: "Group name should not be empty",
                    });
                  }
                  setGroupName(e.target.value);
                }}
                InputLabelProps={{
                  classes: {
                    asterisk: classes.redAsterisk,
                  },
                  style: { fontSize: 12 },
                }}
                style={{ height: "35px" }}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              <TextField
                required
                margin="dense"
                id="name"
                label="Dashboard Name"
                autoComplete="off"
                type="text"
                value={dashboardName}
                error={error.dashboardError}
                helperText={error.dashboardError && error.dashboardErrorMessage}
                onChange={(e) => {
                  setError({ ...error, dashboardError: false });
                  if (e.target.value === "") {
                    setError({
                      ...error,
                      dashboardError: true,
                      dashboardErrorMessage:
                        "Dashboard Name should not be empty",
                    });
                  }

                  setDashboardName(e.target.value);
                }}
                InputLabelProps={{
                  classes: {
                    asterisk: classes.redAsterisk,
                  },
                  style: { fontSize: 12 },
                }}
                style={{ height: "35px" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <FormControl fullWidth>
                <InputLabel
                  id="refresh-in-add-dashboard"
                  style={{ fontSize: 12 }}
                >
                  Refresh Rate
                </InputLabel>
                <Select
                  labelId="refresh-in-add-dashboard"
                  id="Refresh"
                  value={cRefreshRate}
                  onChange={(e) => {
                    setCRefreshRate(e.target.value);
                  }}
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
                  style={{ height: "35px" }}
                >
                  <MenuItem value={60000}>1 minute</MenuItem>
                  <MenuItem value={120000}>2 minute</MenuItem>
                  <MenuItem value={300000}>5 minute</MenuItem>
                  <MenuItem value={600000}>10 minute</MenuItem>
                  <MenuItem value={900000}>15 minute</MenuItem>
                  <MenuItem value={1200000}>20 minute</MenuItem>
                  <MenuItem value={25200000}>stop</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              <FormControl
                fullWidth
                style={{ marginBottom: 10, marginTop: 10 }}
              >
                <InputLabel
                  id="refresh-in-add-dashboard"
                  style={{ fontSize: 12 }}
                >
                  Data source
                </InputLabel>
                <Select
                  labelId="data-souce"
                  id="data-souce"
                  name="Datasource"
                  value={dataSrcId}
                  onChange={(e) => {
                    handleSelectedDataSource(e);
                  }}
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
                  style={{ height: "35px" }}
                >
                  {dataSources.length > 0 &&
                    dataSources.map((item) => {
                      return (
                        <MenuItem
                          key={item.dataSourceId}
                          value={item.dataSourceId}
                        >
                          {`${item.dataSourceType} - ${item.dataSourceName}`}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ marginBottom: 10, gap: 10 }}>
          <Button
            onClick={handleClose}
            className="saveBtn"
            color="var(--colorforwhite)"
          >
            Cancel
          </Button>
          <div
            style={{
              cursor:
                !hasErrorInDashboard() || error.dashboardError
                  ? "not-allowed"
                  : "pointer",
              opacity: !hasErrorInDashboard() || error.dashboardError ? 0.6 : 1,
            }}
          >
            <Button
              onClick={handleSave}
              disabled={!hasErrorInDashboard() || error.dashboardError}
              className="saveBtnDisabled"
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                color: "var(--colorforwhite)",
              }}
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Backdrop style={{ color: "black", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AddNewDashboard;
