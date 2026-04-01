/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineFundView } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";

import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  getQueryData,
  getAPIData,
  getExcelData,
} from "../../services/DashboardServices";
import { renderChart, getDateAndTime } from "../../utils/helper";
import DashboardActions from "../../actions/dashboardAction";
import "./Widget.css";
import { restAPIResponseSorting } from "../../utils/formUtils";
import { storedDatabaseDetails } from "../../utils/reUseUtils";
import { getFiltereExcelDataobject } from "../../utils/LocalStorage";

const ITEM_HEIGHT = 30;

export default function Widget({
  id,
  onRemove,
  config,
  onEditItem,
  onDuplicateItem,
  dashboardId,
  islastItem,
  indexData,
  handleAddFilter,
  toggleDrawer,
  handleAddFilterPanelLvl,
  toggleDrawerPanelLvl,
  drillDownPopup,
  enablePopUp,
}) {
  const userRole = JSON.parse(localStorage.getItem("userInfo")).roleInfo
    .roleName;
  const roleName = JSON.parse(localStorage.getItem("roleName"));
  const actorId = JSON.parse(localStorage.getItem("userInfo")).actorId;

  const types = config?.metadata?.visualizationData?.type;

  const chartTypes = config?.metadata?.visualizationData?.chartType;

  const settingsData = config?.metadata?.settingsData;

  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panelData, setPanelData] = useState({});
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const dashboardConfig = useSelector((state) => state.dashboard);
  const chartDataArray = useSelector((state) => state.dashboard.chartDataArray);
  const dataSourceTypeId =
    dashboardConfig?.selectedDashboard?.settings?.dataSrcId;
  const dataSourceId = config.metadata.dataSourceId;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let checkData;
  chartDataArray?.forEach((obj) => {
    if (obj?.applicationId === dashboardId) {
      obj?.panelData?.forEach((pan) => {
        if (pan.panelId === id) {
          checkData = pan?.chartData;
        }
      });
    }
  });

  //   setLoading(true);
  //   const resp = {};
  //   try {
  //     if (query) {
  //       let dataSourceArg = dataSourceId || dataSourceTypeId;
  //       let respData = await storedDatabaseDetails(dataSourceArg);
  //       await getQueryData(respData, query);
  //     } else {
  //       await getAPIData(
  //         apiConfig.method,
  //         apiConfig.url,
  //         apiConfig.body,
  //         apiConfig.headers,
  //         apiConfig.auth
  //       );
  //     }
  //     let dateAndTime = getDateAndTime();
  //     if (query) {
  //       if (resp.status === 200 && resp?.data?.status === "success") {
  //         setChartData(resp?.data?.data);
  //         dispatch(
  //           DashboardActions.storeChartData([
  //             config.panelId,
  //             resp?.data?.data,
  //             types,
  //             chartTypes,
  //             settingsData,
  //           ])
  //         );
  //       } else {
  //         console.log(resp);
  //       }
  //     } else {
  //       if (resp.status === 200) {
  //         setChartData(restAPIResponseSorting(resp.data));
  //         dispatch(
  //           DashboardActions.storeChartData([
  //             config.panelId,
  //             restAPIResponseSorting(resp.data),
  //             types,
  //             chartTypes,
  //             settingsData,
  //           ])
  //         );
  //       } else {
  //         console.log(resp);
  //       }
  //     }

  //     setLoading(false);
  //     if (
  //       config.metadata.visualizationData.type !== "new" &&
  //       config.metadata.refreshRate > 0 &&
  //       //  5000 > 0 &&
  //       islastItem
  //     ) {
  //       dispatch(DashboardActions.updateLastRefresh(dateAndTime));
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };

  const fetchQueryDataInterval = async (
    query = null,
    apiConfig = null,
    excel = null
  ) => {
    setLoading(true);
    const resp = {};
    try {
      if (query) {
        let dataSourceArg = dataSourceId || dataSourceTypeId;
        let respData = await storedDatabaseDetails(dataSourceArg);
        await getQueryData(respData, query);
      } else if (excel) {
        resp = await getExcelData(actorId, config.panelId);
      } else {
        await getAPIData(
          apiConfig.method,
          apiConfig.url,
          apiConfig.body,
          apiConfig.headers,
          apiConfig.auth
        );
      }
      let dateAndTime = getDateAndTime();
      if (query) {
        if (resp.status === 200 && resp?.data?.status === "success") {
          setChartData(resp?.data?.data);
          dispatch(
            DashboardActions.storeChartData([
              config.panelId,
              resp?.data?.data,
              types,
              chartTypes,
              settingsData,
            ])
          );
        } else {
          console.log(resp);
        }
      } else if (excel) {
        if (resp.status === 200) {
          setChartData(resp?.data?.fileInfo);
          dispatch(
            DashboardActions.storeChartData([
              config.panelId,
              resp?.data?.fileInfo,
              types,
              chartTypes,
              settingsData,
            ])
          );
        } else {
          console.log(resp);
        }
      } else {
        if (resp.status === 200) {
          setChartData(restAPIResponseSorting(resp.data));
          dispatch(
            DashboardActions.storeChartData([
              config.panelId,
              restAPIResponseSorting(resp.data),
              types,
              chartTypes,
              settingsData,
            ])
          );
        } else {
          console.log(resp);
        }
      }

      setLoading(false);
      if (
        config.metadata.visualizationData.type !== "new" &&
        config.metadata.refreshRate > 0 &&
        //  5000 > 0 &&
        islastItem
      ) {
        dispatch(DashboardActions.updateLastRefresh(dateAndTime));
      }
    } catch (err) {
      setLoading(false);
    }
  };
  //   setLoading(true);

  //   try {
  //     let resp = {};
  //     let newData = true;
  //     const modifiedQuery = query
  //       ? query.replace(/\sLIMIT\s\d+\s*LIMIT\s\d+\s*;?$/i, ";")
  //       : null;
  //     // getChartData - panelId, applicationId
  //     if (checkData) {
  //       resp = query
  //         ? {
  //           status: 200,
  //           data: {
  //             status: "success",
  //             data: checkData,
  //           },
  //         }
  //         : { data: checkData, status: 200 };
  //       newData = false;
  //     } else {
  //       if (modifiedQuery) {
  //         let dataSourceArg = dataSourceId || dataSourceTypeId;
  //         let respData = await storedDatabaseDetails(dataSourceArg);
  //         resp = await getQueryData(respData, modifiedQuery);
  //       } else {
  //         resp = await getAPIData(
  //           apiConfig.method,
  //           apiConfig.url,
  //           apiConfig.body,
  //           apiConfig.headers,
  //           apiConfig.auth
  //         );
  //       }
  //     }

  //     let dateAndTime = getDateAndTime();

  //     if (query) {
  //       if (resp.status === 200 && resp?.data?.status === "success") {
  //         setChartData(resp?.data?.data);
  //         if (newData) {
  //           dispatch(
  //             DashboardActions.storeChartData([
  //               config.panelId,
  //               resp?.data?.data,
  //               types,
  //               chartTypes,
  //               settingsData,
  //             ])
  //           );
  //         }
  //       } else {
  //         console.log(resp);
  //       }
  //     } else {
  //       if (resp.status === 200) {
  //         setChartData(restAPIResponseSorting(resp.data));
  //         if (newData) {
  //           dispatch(
  //             DashboardActions.storeChartData([
  //               config.panelId,
  //               restAPIResponseSorting(resp.data),
  //               types,
  //               chartTypes,
  //               settingsData,
  //             ])
  //           );
  //         }
  //       } else {
  //         console.log(resp);
  //       }
  //     }

  //     setLoading(false);
  //     if (
  //       config.metadata.visualizationData.type !== "new" &&
  //       config.metadata.refreshRate > 0 &&
  //       islastItem
  //     ) {
  //       dispatch(DashboardActions.updateLastRefresh(dateAndTime));
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };

  const fetchQueryData = async (
    query = null,
    apiConfig = null,
    excel = null
  ) => {
    setLoading(true);

    try {
      let resp = {};
      let newData = true;
      const modifiedQuery = query
        ? query.replace(/\sLIMIT\s\d+\s*LIMIT\s\d+\s*;?$/i, ";")
        : null;
      // getChartData - panelId, applicationId
      if (checkData) {
        resp = query
          ? {
              status: 200,
              data: {
                status: "success",
                data: checkData,
              },
            }
          : { data: checkData, status: 200 };
        newData = false;
      } else {
        if (modifiedQuery) {
          let dataSourceArg = dataSourceId || dataSourceTypeId;
          let respData = await storedDatabaseDetails(dataSourceArg);
          resp = await getQueryData(respData, modifiedQuery);
        } else if (excel) {
          let dashboardRequest = {};
          dashboardRequest.actorId = actorId;
          dashboardRequest.panelId = config.panelId;
          let filteredData = getFiltereExcelDataobject(
            dashboardRequest.actorId,
            dashboardRequest.panelId
          );
          if (!filteredData) {
            resp = await getExcelData(
              dashboardRequest.actorId,
              dashboardRequest.panelId
            );
          } else {
            resp = filteredData.data;
          }
        } else {
          resp = await getAPIData(
            apiConfig.method,
            apiConfig.url,
            apiConfig.body,
            apiConfig.headers,
            apiConfig.auth
          );
        }
      }

      let dateAndTime = getDateAndTime();

      if (query) {
        if (resp.status === 200 && resp?.data?.status === "success") {
          setChartData(resp?.data?.data);
          if (newData) {
            dispatch(
              DashboardActions.storeChartData([
                config.panelId,
                resp?.data?.data,
                types,
                chartTypes,
                settingsData,
              ])
            );
          }
        } else {
          console.log(resp);
        }
      } else if (excel) {
        if (resp.status === 200) {
          setChartData(resp?.data?.fileInfo);
          if (newData) {
            dispatch(
              DashboardActions.storeChartData([
                config.panelId,
                resp?.data?.fileInfo,
                types,
                chartTypes,
                settingsData,
              ])
            );
          }
        } else {
          console.log(resp);
        }
      } else {
        if (resp.status === 200) {
          setChartData(restAPIResponseSorting(resp.data));
          if (newData) {
            dispatch(
              DashboardActions.storeChartData([
                config.panelId,
                restAPIResponseSorting(resp.data),
                types,
                chartTypes,
                settingsData,
              ])
            );
          }
        } else {
          console.log(resp);
        }
      }

      setLoading(false);
      if (
        config.metadata.visualizationData.type !== "new" &&
        config.metadata.refreshRate > 0 &&
        islastItem
      ) {
        dispatch(DashboardActions.updateLastRefresh(dateAndTime));
      }
    } catch (err) {
      setLoading(false);
    }
  };
  const [finalDataSourceId, setFinalDataSourceId] = useState(null);

  //Interval Refresh
  useEffect(() => {
    let interval;

    if (
      config.metadata.visualizationData.type !== "new" &&
      config.metadata.refreshRate > 0
    ) {
      if (config?.metadata?.query) {
        interval = setInterval(
          fetchQueryDataInterval,
          config.metadata.refreshRate,
          config.metadata.query,
          null
        ); //getting refreshRate as prop from dashboard component
      } else {
        interval = setInterval(
          fetchQueryDataInterval,
          config.metadata.refreshRate,
          null,
          config.metadata.apiConfig
        ); //getting refreshRate as prop from dashboard component
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    config.metadata.refreshRate,
    dashboardConfig.manualRefresh,
    dashboardConfig.refreshRate,
  ]);

  //manual refresh
  useEffect(() => {
    if (
      dashboardConfig.manualRefresh &&
      config.metadata.visualizationData.type !== "new"
    ) {
      if (config?.metadata?.query) {
        fetchQueryDataInterval(config.metadata.query, null);
      } else {
        fetchQueryDataInterval(null, config.metadata.apiConfig);
      }
      dispatch(DashboardActions.updateManualRefresh(false));
    }
  }, [dashboardConfig.manualRefresh]);

  //   setPanelData(config);
  //   if (config?.metadata?.visualizationData.type === "new") {
  //     // Set the dataSourceId to the dataSourceTypeId
  //     setFinalDataSourceId(dataSourceTypeId);
  //   } else {
  //     // Set the dataSourceId to the id from the metadata
  //     setFinalDataSourceId(config.metadata.dataSourceId);
  //   }
  //   if (config?.metadata?.query) {
  //     fetchQueryData(config.metadata.query, null);
  //   }
  //   else if (config?.metadata?.uploadedExcel) {
  //     fetchQueryData(null, null, config.metadata.uploadedExcel);
  //   }
  //   else {
  //     fetchQueryData(null, config.metadata.apiConfig);
  //   }
  // }, []);

  useEffect(() => {
    setPanelData(config);
    if (config?.metadata?.visualizationData.type === "new") {
      // Set the dataSourceId to the dataSourceTypeId
      setFinalDataSourceId(dataSourceTypeId);
    } else {
      // Set the dataSourceId to the id from the metadata
      setFinalDataSourceId(config.metadata.dataSourceId);
    }
    if (config?.metadata?.query) {
      fetchQueryData(config.metadata.query, null, null);
    } else if (config?.metadata?.uploadedExcel) {
      fetchQueryData(null, null, config.metadata.uploadedExcel);
    } else {
      fetchQueryData(null, config.metadata.apiConfig, null);
    }
  }, []);

  let dataFlag = chartData.length > 0;
  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        display:
          panelData?.metadata?.visualizationData?.chartType === "new" &&
          userRole === "ENDUSER"
            ? "none"
            : "flex",
        flexDirection: "column",
        boxShadow:
          "0 1px 2px rgb(55 63 66 / 7%), 0 2px 4px rgb(55 63 66 / 7%), 0 4px 8px rgb(55 63 66 / 7%), 0 8px 16px rgb(55 63 66 / 7%), 0 16px 24px rgb(55 63 66 / 7%)",
        borderRadius: "0px",
      }}
    >
      <div
        className="panel-head"
        style={{
          backgroundColor: "var(--dashboardBgColor)",
        }}
      >
        <div />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height:35
          }}
        >
          <div style={{ width: "50%" }}>
            <Typography
              gutterBottom
              style={{
                fontSize: "large",
                color: "var(--color)",
                margin: "7px 10px",
              }}
            >
              {panelData?.metadata?.visualizationData?.panelName}
            </Typography>
          </div>
          {panelData?.metadata?.visualizationData?.chartType !== "new" && (
            <div
              style={{ width: "50%", textAlign: "end" }}
              className="widget-filter"
            >
              {userRole !== "ENDUSER" && !enablePopUp && (
                <IconButton
                  style={{
                    padding: 0,
                    margin: 0,
                    color: "var(--colorforwhite)",
                  }}
                >
                  <FaFilter
                    size="17"
                    cursor="pointer"
                    onClick={() => handleAddFilterPanelLvl(true, config)}
                    style={{ padding: "4px 0 0 0", marginRight: "10px" }}
                  />
                </IconButton>
              )}
              {config?.metadata?.filters?.length > 0 && !enablePopUp && (
                <IconButton
                  style={{
                    padding: 0,
                    margin: 0,
                    color: "var(--colorforwhite)",
                  }}
                >
                  <AiOutlineFundView
                    size="25"
                    cursor="pointer"
                    onClick={toggleDrawerPanelLvl(true, config)}
                    style={{ padding: "0px 0px", color: "var(--color)" }}
                  />
                </IconButton>
              )}

              {roleName !== "ENDUSER" && !enablePopUp && (
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  style={{ color: "var(--color)" }}
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              )}
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClick={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    color: "var(--color)",
                  },
                }}
              >
                <MenuItem
                  key="edit"
                  onClick={() => onEditItem(id, panelData, chartData)}
                  disabled={!dataFlag}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  key="delete"
                  onClick={() =>
                    onRemove(
                      dashboardId,
                      id,
                      panelData,
                      config.metadata.uploadedExcel
                    )
                  }
                >
                  Delete
                </MenuItem>
                <MenuItem
                  key="duplicate"
                  onClick={() => onDuplicateItem(panelData)}
                  disabled={!dataFlag}
                >
                  Duplicate
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <div className="panel-body">
        {panelData?.metadata?.visualizationData?.chartType === "new" ? (
          <Button
            style={{
              textTransform: "none",
              fontSize: "14px",
              color: "var(--color)",
            }}
            variant="outlined"
            onClick={() => onEditItem(id, config, chartData)}
          >
            Add Panel
          </Button>
        ) : (
          <>
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <div style={{ display: "block", height: "100%", width: "100%" }}>
                {renderChart(
                  "dashboard",
                  panelData?.metadata?.visualizationData?.type,
                  panelData?.metadata?.visualizationData?.chartType,
                  chartData,
                  panelData?.metadata?.settingsData,
                  panelData?.metadata?.setSettingsData,
                  config,
                  drillDownPopup,
                  drillDownPopup
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
