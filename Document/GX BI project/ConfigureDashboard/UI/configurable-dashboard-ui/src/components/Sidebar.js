import React, { useEffect, useState } from "react";
import {
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import BusinessIcon from "@material-ui/icons/Business";
import GroupIcon from "@material-ui/icons/Group";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import StorageIcon from "@material-ui/icons/Storage";
import { makeStyles, styled } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { drawerWidth } from "../utils/Config";
import { useLocation, useNavigate } from "react-router-dom";
import { haveAccess } from "../utils/helper";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(
      ["width", "margin"],

      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }
    ),
  },
  menuButton: {
    marginRight: 36,
  },

  hide: {
    display: "none",
  },
  customHeader: {
    height: "103.3%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    overflowX: "hidden",
    background: "#f9f5fa !important",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#f9f5fa !important",
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(5.7) + 1,
    },
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom:7
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  zIndex: "99999",
}));

let dashboardList = [];

export default function Sidebar({ open, handleDrawerClose }) {
  const classes = useStyles();
  let navigate = useNavigate();
  const location = useLocation();
  const dashboardConfig = useSelector((state) => state.dashboard);
  const [selectedDashboard, setSelectedDashboard] = useState("");

  const handleUserClick = () => {
    navigate("./user");
  };

  useEffect(() => {
    if (dashboardConfig.selectedDashboard) {
      setSelectedDashboard(dashboardConfig.selectedDashboard);
    } else {
      setSelectedDashboard(dashboardConfig.dashboards?.[0]);
    }
  }, [dashboardConfig?.dashboards, dashboardConfig?.selectedDashboard]);

  useEffect(() => {
    if (dashboardConfig.dashboards) {
      dashboardList = dashboardConfig?.dashboards;
    }
  }, [dashboardConfig?.dashboards]);

  return (
    <Drawer
      PaperProps={{
        classes: {
          root: classes.customHeader,
        },
      }}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <DrawerHeader
        style={{
          minHeight: 40,
          background: "var(--activeStateColor) !important",
          marginTop: 0,
          position: "sticky",
          top: "0",
          height: 35,
          zIndex: 100,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </DrawerHeader>
      <Divider style={{bottom:5,position:"relative"}} />
      <div className="" >
        <List style={{bottom:5,position:"relative"}}>
          {haveAccess(["SUPERADMIN", "ORGANIZATIONADMIN"]) && (
            <>
              {haveAccess(["SUPERADMIN"]) && (
                <>
                  <ListItem
                    button
                    onClick={() => navigate("./enterprise")}
                    selected={location.pathname.includes("/enterprise")}
                    style={
                      location.pathname.includes("/enterprise")
                        ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                        : {}
                    }
                  >
                    <ListItemIcon style={{ minWidth: 35, marginLeft: "-5px" , 
                            backgroundColor: "#000 !important",
                          }}>
                      {open ? (
                        <BusinessCenterIcon
                          style={{
                          }}
                        />
                      ) : (
                        <Tooltip title="Enterprises" PopperProps={{ style: { marginTop: -8 } }}>
                          <BusinessCenterIcon />
                        </Tooltip>
                      )}
                    </ListItemIcon>
                    <ListItemText primary="Enterprise" style={{ minWidth: 30 }} />
                  </ListItem>

                  <ListItem
                    button
                    onClick={() => navigate("./organization")}
                    selected={location.pathname.includes("/organization")}
                    style={
                      location.pathname.includes("/organization")
                        ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                        : {}
                    }
                  >
                    <ListItemIcon style={{ minWidth: 35, marginLeft: "-5px" }}>
                      {open ? (
                        <BusinessIcon />
                      ) : (
                        <Tooltip
                          title="Organizations"
                          PopperProps={{ style: { marginTop: -8 } }}
                        >
                          <BusinessIcon />
                        </Tooltip>
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary="Organization"
                      style={{ minWidth: "45px" }}
                    />
                  </ListItem>
                </>
              )}
              <ListItem
                button
                onClick={() => navigate("./groups")}
                selected={location.pathname.includes("/group")}
                style={
                  location.pathname.includes("/groups")
                    ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                    : {}
                }
              >
                <ListItemIcon style={{ minWidth: 35, marginLeft: "-5px" }}>
                  {open ? (
                    <GroupWorkIcon />
                  ) : (
                    <Tooltip
                      title="Groups"
                      PopperProps={{ style: { marginTop: -8 } }}
                    >
                      <GroupWorkIcon />
                    </Tooltip>
                  )}
                </ListItemIcon>
                <ListItemText primary="Groups" style={{ minWidth: "30px" }} />
              </ListItem>
              <ListItem
                button
                onClick={handleUserClick}
                selected={location.pathname.includes("/user")}
                style={
                  location.pathname.includes("/user")
                    ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                    : {}
                }
              >
                <ListItemIcon style={{ minWidth: 35, marginLeft: "-5px" }}>
                  {open ? (
                    <GroupIcon />
                  ) : (
                    <Tooltip
                      title="Users"
                      PopperProps={{ style: { marginTop: -8 } }}
                    >
                      <GroupIcon />
                    </Tooltip>
                  )}
                </ListItemIcon>
                <ListItemText primary="Users" style={{ minWidth: "30px" }} />
              </ListItem>

              <ListItem
                button
                onClick={() => navigate("./databases")}
                selected={location.pathname.includes("/databases")}
                style={
                  location.pathname.includes("/databases")
                    ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                    : {}
                }
              >
                <ListItemIcon style={{ minWidth: 35, marginLeft: "-5px" }}>
                  {open ? (
                    <StorageIcon />
                  ) : (
                    <Tooltip
                      title="Datasources"
                      PopperProps={{ style: { marginTop: -8 } }}
                    >
                      <StorageIcon />
                    </Tooltip>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary="Data Source"
                  style={{ minWidth: "45px" }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("./dashboardlist")}
                selected={location.pathname.includes("/dashboardlist")}
                style={
                  location.pathname.includes("/dashboardlist")
                    ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                    : {}
                }
              >
                <ListItemIcon style={{ minWidth: 35, marginLeft: "-5px" }}>
                  {open ? (
                    <DashboardIcon />
                  ) : (
                    <Tooltip
                      title="Dashboards"
                      PopperProps={{ style: { marginTop: -8 } }}
                    >
                      <DashboardIcon />
                    </Tooltip>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard List"
                  style={{ minWidth: "45px" }}
                />
              </ListItem>
            </>
          )}

          {haveAccess(["DEVELOPER"]) && (
            <>
              <ListItem
                button
                onClick={() => navigate("./databases")}
                selected={location.pathname.includes("/databases")}
                style={
                  location.pathname.includes("/databases")
                    ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                    : {}
                }
              >
                <ListItemIcon>
                  {open ? (
                    <StorageIcon />
                  ) : (
                    <Tooltip title="Datasources">
                      <StorageIcon />
                    </Tooltip>
                  )}
                </ListItemIcon>
                <ListItemText primary="Data Source" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("./dashboardlist")}
                selected={location.pathname.includes("/dashboardlist")}
                style={
                  location.pathname.includes("/dashboardlist")
                    ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                    : {}
                }
              >
                <ListItemIcon>
                  <Tooltip title="Dashboards">
                    <DashboardIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Dashboard List" />
              </ListItem>
            </>
          )}

          {haveAccess(["ENDUSER"]) && (
            <>
              <ListItem
                button
                onClick={() => navigate("./dashboardlist")}
                selected={location.pathname.includes("/dashboardlist")}
                style={
                  location.pathname.includes("/dashboardlist")
                    ? { backgroundColor: "rgba(25, 118, 210, 0.3)" }
                    : {}
                }
              >
                <ListItemIcon>
                  <Tooltip title="Dashboards" placement="top">
                    <DashboardIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Dashboard List" />
              </ListItem>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );
}
