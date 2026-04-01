/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  IconButton,
  Tooltip,
  createTheme,
} from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";
import UpdateIcon from "@material-ui/icons/Update";
import DashboardActions from "../actions/dashboardAction";

const Refresh = ({ editLayout, handleDialogOpen }) => {
  const dispatch = useDispatch();
  const theme = createTheme({
    typography: {
      caption: {
        fontSize: 5,
      },
    },
  });
  const dashboardConfig = useSelector((state) => state.dashboard);
  //code for next refresh timer
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [nextRefresh, setNextRefresh] = useState("0 sec");

  let deadline;
  useEffect(() => {
    if (dashboardConfig.refreshRate) 
    {
      const deadlineTime = new Date().getTime() + dashboardConfig.refreshRate;
      deadline = new Date(deadlineTime);
    } 
    else 
    {
      setNextRefresh("No Default Refresh");
    }
  }, [
    dashboardConfig.lastRefreshed,
    dashboardConfig.updateManualRefresh,
    dashboardConfig.refreshRate,
  ]);

  useEffect(() => {
    const message = "Next refresh will be in";
    if (dashboardConfig.refreshRate) {
      if (days !== 0) {
        setNextRefresh(`${message} ${days} day(s)`);
      } else if (hours !== 0) {
        setNextRefresh(`${message} ${hours} hour(s)`);
      } else if (minutes !== 0) {
        setNextRefresh(`${message} ${minutes} minute(s)`);
      } else if (seconds !== 0) {
        setNextRefresh(`${message} ${seconds} second(s)`);
      } else {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setNextRefresh(`${message} 0 seconds`);
      }
    }
  }, [days, hours, minutes, seconds]);

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
    return () => clearInterval(interval);
  }, [
    dashboardConfig.lastRefreshed,
    dashboardConfig.updateManualRefresh,
    dashboardConfig.refreshRate,
  ]);

  return (
    <Tooltip title={nextRefresh} PopperProps={{ style: { marginTop: -12 } }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "11px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography theme={theme} variant="caption" mb={0}  style={{fontSize:11,display:"block"}}>
            Last refresh
          </Typography>
          {!editLayout ? (
            <Tooltip
              title="Manual Refresh"
              PopperProps={{ style: { marginTop: -12 } }}
            >
              <IconButton
              style={{padding:'0 12px'}}
                onClick={() =>{
                  dispatch(DashboardActions.updateManualRefresh(true));
                  dispatch(DashboardActions.updateRefreshRateValue(dashboardConfig.refreshRate));
                }
                }
              >
                <SyncIcon style={{ color: "white",fontSize:18}} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              title="Update Refresh Rate"
              PopperProps={{ style: { marginTop: -12 } }}
            >
              <IconButton
                style={{padding:'0 12px'}}
                onClick={() => handleDialogOpen("UPDATE_REFRESH_RATE")}
              >
                <UpdateIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <Typography variant="caption" display="block" style={{fontSize:10}}>
          {dashboardConfig.lastRefreshed}
        </Typography>
      </div>
    </Tooltip>
  );
};
export default Refresh;
