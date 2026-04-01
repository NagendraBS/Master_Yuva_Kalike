/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Popover,
  Box,
  ListItem,
  ListItemText,
  Menu,
  Divider,
} from "@material-ui/core";
import { ChromePicker } from "react-color";
import ColorPaletteIcon from "../assets/colorpallette2.png";
import colorpicker from "../assets/colorpicker.png";
import { useFontFamily } from "./FontFamilyContext";
import fontIcon from "../assets/icons8-font-60.png";
import { REACT_APP_ADMIN_BASE_URL } from "../utils/urlUtils";
import {
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import StorageIcon from "@material-ui/icons/Storage";
import MenuIcon from "@material-ui/icons/Menu";
import WidgetsIcon from "@material-ui/icons/Widgets";
import BusinessIcon from "@material-ui/icons/Business";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import administartionActions from "../actions/administrationActions";
import { clearAll } from "../utils/LocalStorage";
import AddUser from "./AddUser";
import Refresh from "./Refresh";
import AddOrganization from "./SuperAdmin/AddOrganization";
import CreateGroup from "./group/CreateGroup";
import "./Header.css";
import AddDatabase from "./databases/AddDatabase";
import "./AddUser.css";
import DashboardActions from "../actions/dashboardAction";
import enterpriseActions from "../actions/enterpriseActions";
import administrationActions from "../actions/administrationActions";
import { drawerWidth } from "../utils/Config";
import {
  createDashboard,
  deleteDashboard,
  getDashboards,
} from "../services/DashboardServices";
import { saveUser, UpdateTheme, postTheme } from "../services/AdminServices";
import logo from "../assets/GxBI-white_logo.png";
import userIcon from "../assets/user_icon.jpg";
import DashboardPopup from "./DashboardPopup";
import { AccountCircle, HelpOutline } from "@material-ui/icons";
import Help from "../container/Help";
import { dashboardTableActions } from "../actions";
import AddEnterprise from "./Enterprise/AddEnterprise";

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    right: 0,
    marginTop: "52px",
    height: "auto",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});
const useStyle = makeStyles((theme) => ({
  fontFamilySelectorPopup: {
    padding: theme.spacing(1),
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#1976d2",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerToggle }) {
  let navigate = useNavigate();
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
  const roleName = JSON.parse(localStorage.getItem("roleName"));
  const username = JSON.parse(localStorage.getItem("userInfo"))?.lanId;
  const dashboardConfig = useSelector((state) => state.dashboard);
  let anchor = "right";

  const dispatch = useDispatch();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(null);
  const [openRefreshDialog, setOpenRefreshDialog] = useState(null);
  const [selectedDashboard, setSelectedDashboard] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [editLayout, setEditLayout] = useState(false);
  const [openDatabaseItems] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [orgItems, setOrgItems] = useState(false);
  const [domainItems, setDomainItems] = useState(false);
  const [groupItem, setGroupItem] = useState(false);
  const [cRefreshRate, setCRefreshRate] = useState(); // component refreshrate variable
  const [customRefreshRateSeconds, setCustomRefreshRateSeconds] = useState("");
  const [customRefreshRateHours, setCustomRefreshRateHours] = useState("");
  const [customRefreshRateMinutes, setCustomRefreshRateMinutes] = useState("");
  const [newUsers, setNewUsers] = useState([
    {
      isEmailHasError: true,
      isUsernameHasError: true,
      isGroupHasError: true,
      userNameError: true,
      emailError: true,
    },
  ]);
  const [groupId, setGroupId] = useState("");
  const [hasErrorinUsers, setHasErrorInUsers] = useState(true);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => {
    setOpenModal(true);
    handleClosing();
  };
  const handleClose = () => setOpenModal(false);

  const classes = useStyles();
  const classes1 = useStyle();
  const [openFilterList, setOpenFilterList] = React.useState(false);
  const [openDashPopup, setOpenDashPopup] = useState(false);

  const toggleDrawer = (anchor, open) => () => {
    setOpenFilterList(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List
        style={{
          backgroundColor: "transparent",
          padding: "0px",
        }}
      >
        <div
          className="Menudrawer"
          style={{
            display: "flex",
          }}
        >
          <MenuItem>
            <Tooltip
              title="Edit layout"
              PopperProps={{ style: { marginTop: -6 } }}
            >
              <IconButton
                aria-label="edit"
                onClick={onLayoutEdit}
                style={{ borderRight: "1px solid #b2bec9" }}
              >
                <EditIcon style={{ color: "var(--dashboardBgColor)" }} />
              </IconButton>
            </Tooltip>
          </MenuItem>

          <MenuItem>
            <Tooltip
              title="Duplicate Dashboard"
              PopperProps={{ style: { marginTop: -6 } }}
            >
              <IconButton
                onClick={() => handleDialogOpen("DUPLICATE")}
                style={{ borderRight: "1px solid #b2bec9" }}
              >
                <FileCopyIcon style={{ color: "var(--dashboardBgColor)" }} />
              </IconButton>
            </Tooltip>
          </MenuItem>

          <MenuItem>
            <Tooltip
              title="Add New Dashboard"
              PopperProps={{ style: { marginTop: -6 } }}
            >
              <IconButton
                onClick={() => handleDialogOpen("NEW")}
                style={{ borderRight: "1px solid #b2bec9" }}
              >
                <AddToQueueIcon style={{ color: "var(--dashboardBgColor)" }} />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <Tooltip
              title="Delete Dashboard"
              PopperProps={{ style: { marginTop: -6 } }}
            >
              <IconButton
                onClick={() => setOpenDashPopup(true)}
                style={{ borderRight: "1px solid #b2bec9" }}
              >
                <DeleteOutline style={{ color: "var(--dashboardBgColor)" }} />
              </IconButton>
            </Tooltip>
          </MenuItem>
        </div>
      </List>
    </div>
  );

  const fetchData = useCallback(async () => {
    try {
      const resp = await getDashboards();
      if (resp.status === 200 && resp?.data) {
        dispatch(DashboardActions.updateDashboards(resp.data));
        dispatch(DashboardActions.fileterDashboardNames(resp.data));
        dispatch({
          type: dashboardTableActions.GET_ALL_DASHBOARDS,
          payload: resp.data,
        });
      } else {
        console.log("dashboard response:", resp);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDialogOpen = (type) => {
    switch (type) {
      case "NEW":
        setDialogTitle("Add New Dashboard");
        setOpenDialog(type);
        break;
      case "DUPLICATE":
        setDialogTitle("Duplicate Dashboard");
        setOpenDialog(type);
        break;
      case "UPDATE_REFRESH_RATE":
        setDialogTitle("Update Refresh Rate");
        setOpenRefreshDialog(type);
        break;
      default:
        break;
    }
  };

  const handleRefresh = () => {
    if (cRefreshRate) {
      if (cRefreshRate === "custom") {
        if (
          customRefreshRateHours.length > 0 ||
          customRefreshRateMinutes.length > 0 ||
          customRefreshRateSeconds.length > 0
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  const changeCancel = () => {
    setOpenAddUser(false);
    setHasErrorInUsers(true);
    setGroupId(undefined);
  };

  const changeClose = () => {
    setOpenAddUser(false);
    setGroupId(undefined);
    setNewUsers([
      {
        isEmailHasError: true,
        isUsernameHasError: true,
        isGroupHasError: true,
        userNameError: true,
        emailError: true,
      },
    ]);
    setHasErrorInUsers(true);
  };

  const onLayoutSave = () => {
    setEditLayout(false);
    dispatch(DashboardActions.editLayout(false));
  };

  const onLayoutEdit = () => {
    setEditLayout(true);
    dispatch(DashboardActions.editLayout(true));
  };
  const [fontColorPickerAnchorEl, setFontColorPickerAnchorEl] = useState(null);

  const handleFontColorPickerToggle = (event) => {
    if (fontColorPickerAnchorEl) {
      setFontColorPickerAnchorEl(null);
    } else {
      setFontColorPickerAnchorEl(event.currentTarget);
    }
  };

  const handleFontColorPickerClose = () => {
    setFontColorPickerAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { fontFamily, changeFontFamily } = useFontFamily();
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const fontFamilies = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
    "Lucida Sans Unicode",
    "Tahoma",
    "Courier",
    "Palatino Linotype",
    "Arial Narrow",
    "Garamond",
    "Book Antiqua",
    "Helvetica Neue",
    "Century Gothic",
    "Lucida Console",
    "Franklin Gothic Medium",
    "Century Schoolbook",
    "Consolas",
    "Cambria",
    "MS Sans Serif",
    "MS Serif",
  ];

  const handleFontFamilySelectorOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFontFamilySelectorClose = () => {
    setAnchorEl(null);
  };

  const handleFontFamilySelect = (selectedFontFamily) => {
    changeFontFamily(selectedFontFamily);
    handleFontFamilySelectorClose();
    document.documentElement.style.setProperty(
      "--fontfamily",
      selectedFontFamily
    );
  };
  const handleSaveDialogClose = () => {
    setIsSaveDialogOpen(false);
    fetchTheme();
  };
  const [selectedColor, setSelectedColor] = useState("#1c4e80");
  const [selectedFontColor, setSelectedFontColor] = useState("#000");
  const [selectedfontcolors, setselectedfontcolors] = useState("#ffffff");
  const [activeStateColor, setActiveStateColor] = useState("#ffffff");
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);
  const [bodyColorPickerAnchorEl, setBodyColorPickerAnchorEl] = useState(null);
  const [colorPickerType, setColorPickerType] = useState(null);
  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
    handleClosing();
  };
  const handleColorPickerToggle = (event) => {
    if (colorPickerAnchorEl) {
      setColorPickerAnchorEl(null);
    } else {
      setColorPickerAnchorEl(event.currentTarget);
    }
  };
  const handleBodyColorPickerToggle = (event) => {
    if (bodyColorPickerAnchorEl) {
      setBodyColorPickerAnchorEl(null);
    } else {
      setBodyColorPickerAnchorEl(event.currentTarget);
    }
  };

  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const handleFontColorChange = (color) => {
    setSelectedFontColor(color.hex);
    setselectedfontcolors(color.hex);
    const isSameColor =
      selectedColor === color.hex && activeStateColor === color.hex;
    const isSameFontAndHeader =
      color.hex === color.hex && selectedColor === color.hex;
    const isSameFontAndBackground = color.hex && activeStateColor === color.hex;
    const shouldShowWarning =
      isSameFontAndHeader || isSameFontAndBackground || isSameColor;
    setShowWarningDialog(shouldShowWarning);
    document.documentElement.style.setProperty("--color", color.hex);
    document.documentElement.style.setProperty("--colorforwhite", color.hex);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setColorPickerType(null);
  };
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    if (colorPickerType === "header") {
      document.documentElement.style.setProperty("--headerColor", color.hex);
      document.documentElement.style.setProperty(
        "--dashboardBgColor",
        color.hex
      );
    }
  };
  const handleBodyColorChange = (color) => {
    const { hex } = color;
    setActiveStateColor(hex);
    document.documentElement.style.setProperty("--activeStateColor", hex);
    document.documentElement.style.setProperty(
      "--selectedTab",
      activeStateColor
    );
    document.documentElement.style.setProperty("--hoverStateColor", hex);
  };
  const handleBodyColorPickerClose = () => {
    setBodyColorPickerAnchorEl(null);
  };
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--dashboardBgColor",
      selectedColor
    );
    document.documentElement.style.setProperty(
      "--activeStateColor",
      activeStateColor
    );
  }, [selectedColor, activeStateColor]);
  const [themeExists, setThemeExists] = useState(false);
  const selectedroleName = JSON.parse(localStorage.getItem("roleName"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const selectedRole = userInfo?.roleInfo.find(
    (role) => role.roleName === selectedroleName
  );
  const roleId = selectedRole?.roleId;
  const actorId = JSON.parse(localStorage.getItem("userInfo"))?.actorId;
  const fetchTheme = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_ADMIN_BASE_URL}theme/fetch/${actorId}/${roleId}`,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      if (response.status === 200) {
        setThemeExists(true);
        const data = await response.json();
        const fetchedTheme = data.themePattern;

        if (fetchedTheme) {
          setSelectedColor(fetchedTheme.colour);
          changeFontFamily(fetchedTheme.font);
          setActiveStateColor(fetchedTheme.bgcolour);
          setSelectedFontColor(fetchedTheme.fontcolor);
          setselectedfontcolors(fetchedTheme.fontcolor1);
          document.documentElement.style.setProperty(
            "--headerColor",
            fetchedTheme.colour
          );
          document.documentElement.style.setProperty(
            "--fontfamily",
            fetchedTheme.font
          );
          document.documentElement.style.setProperty(
            "--activeStateColor",
            fetchedTheme.bgcolour
          );
          document.documentElement.style.setProperty(
            "--dashboardBgColor",
            fetchedTheme.colour
          );
          document.documentElement.style.setProperty(
            "--selectedtab",
            fetchedTheme.color
          );
          document.documentElement.style.setProperty(
            "--hoverStateColor",
            fetchedTheme.bgcolour
          );

          document.documentElement.style.setProperty(
            "--color",
            fetchedTheme.fontcolor
          );

          document.documentElement.style.setProperty(
            "--colorforwhite",
            fetchedTheme.fontcolor1
          );
        }
      } else {
        setThemeExists(false);
      }
    } catch (error) {
      console.error("Error fetching theme:", error);
      setThemeExists(false);
    }
  };
  useEffect(() => {
    fetchTheme();
  }, []);
  const handleSaveChanges = async () => {
    setIsSaveDialogOpen(false);

    try {
      const updatedThemeData = {
        actorId: actorId,
        roleId: roleId,
        createdBy: userInfo.lanId,
        themePattern: {
          colour: selectedColor,
          font: fontFamily,
          bgcolour: activeStateColor,
          fontcolor: selectedFontColor,
          fontcolor1: selectedfontcolors,
        },
      };
      if (themeExists) {
        await UpdateTheme(
          actorId,
          roleId,
          updatedThemeData.createdBy,
          updatedThemeData.themePattern.colour,
          updatedThemeData.themePattern.font,
          updatedThemeData.themePattern.bgcolour,
          updatedThemeData.themePattern.fontcolor,
          updatedThemeData.themePattern.fontcolor1
        );
        fetchTheme();
      } else {
        const newThemeData = {
          actorId: actorId,
          roleId: roleId,
          createdBy: userInfo.lanId,
          themePattern: {
            colour: selectedColor,
            font: fontFamily,
            bgcolour: activeStateColor,
            fontcolor: selectedFontColor,
            fontcolor1: selectedfontcolors,
          },
        };
        await postTheme(
          newThemeData.actorId,
          newThemeData.roleId,
          newThemeData.createdBy,
          newThemeData.themePattern.colour,
          newThemeData.themePattern.font,
          newThemeData.themePattern.bgcolour,
          newThemeData.themePattern.fontcolor,
          newThemeData.themePattern.fontcolor1
        );
        fetchTheme();
      }
    } catch (error) {
      console.error("Error updating/posting theme:", error);
    }
  };
  const updateDashboardRefreshRate = async () => {
    try {
      var refreshRate = cRefreshRate;
      if (refreshRate === "custom") {
        refreshRate = 0;
        if (customRefreshRateHours.length > 0) {
          refreshRate = customRefreshRateHours * 60000 * 60;
        }
        if (customRefreshRateMinutes.length > 0) {
          refreshRate = refreshRate + customRefreshRateMinutes * 60000;
        }
        if (customRefreshRateSeconds.length > 0) {
          refreshRate = refreshRate + customRefreshRateSeconds * 1000;
        }
      }
      const data = {
        dashboardName: dashboardConfig.selectedDashboard.dashboardName,
        groupName: dashboardConfig.selectedDashboard.groupName,
        dashboardId: dashboardConfig.selectedDashboard.dashboardId,
        settings: {
          ...dashboardConfig.selectedDashboard.settings,
          refreshRate: refreshRate,
        },
      };
      const resp = await createDashboard(data);
      if (resp.status === 200) {
        const allDashboards = [...dashboardConfig.dashboards];
        let sdb = {}; //selected Dashboard
        allDashboards.forEach((dash) => {
          if (dash.dashboardId === data.dashboardId) {
            sdb = { ...dash };
            sdb.settings = { ...dash.settings, refreshRate: refreshRate };
          }
        });
        dispatch(
          DashboardActions.updateDashboardRefresh({
            selectedDashboard: sdb,
            allDashboards: allDashboards,
          })
        );
        dispatch(DashboardActions.updateRefreshRateValue(refreshRate));
        setOpenRefreshDialog(null);
        toast.success("Refresh rate is updated successfully");
      }
      fetchData();
      return resp;
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error(err.message, { theme: "white", color: "red" });
    }
  };

  const handleSaveRefresh = async () => {
    setLoading(true);
    await updateDashboardRefreshRate();
    setLoading(false);
    setCRefreshRate();
    setCustomRefreshRateMinutes("");
    setCustomRefreshRateHours("");
    setCustomRefreshRateSeconds("");
    fetchData();
  };

  const handleCloseRefresh = () => {
    setOpenRefreshDialog(null);
    setCRefreshRate();
    setCustomRefreshRateMinutes("");
    setCustomRefreshRateHours("");
    setCustomRefreshRateSeconds("");
    fetchData();
  };

  const handleLogout = () => {
    clearAll();
    navigate("../login");
  };

  const handleOpenDatabase = () => {
    navigate("/addDatabase");
  };

  const handleDomain = () => setDomainItems(true);

  const handleOrganization = () => setOrgItems(true);

  const handleGroup = () => setGroupItem(true);

  const getItems = () => {
    if (location.pathname.includes("/dashboardlist")) {
      return getdblist();
    } else if (location.pathname.includes("/dashboard")) {
      return getDashboardItems();
    } else if (location.pathname.includes("/user")) {
      return getAdminItems();
    } else if (location.pathname.includes("/databases")) {
      return getDatabaseItems();
    } else if (location.pathname.includes("/organization")) {
      return getOrganisationItems();
    } else if (location.pathname.includes("/groups")) {
      return getGroupItems();
    } else if (location.pathname.includes("/enterprise")) {
      return getDomainItems();
    }
  };

  const handleDeleteDash = async () => {
    const dashboardsUp = dashboardConfig?.dashboards.map((data) => {
      if (
        data?.dashboardId !== dashboardConfig?.selectedDashboard?.dashboardId
      ) {
        return data;
      }
    });
    try {
      const resp = await deleteDashboard(
        dashboardConfig?.selectedDashboard?.dashboardId
      );
      if (resp?.data?.status === "SUCCESS") {
        if (!dashboardsUp[0]) {
          sessionStorage.setItem("applicationId", dashboardsUp[1].dashboardId);
          sessionStorage.setItem(
            "dashboardName",
            dashboardsUp[1].dashboardName
          );
          dispatch(DashboardActions.switchDashboard(dashboardsUp[1]));
          navigate(
            `./dashboard/${dashboardsUp[1]?.dashboardName?.split(" ").join("")}`
          );
        } else {
          sessionStorage.setItem("applicationId", dashboardsUp[0].dashboardId);
          sessionStorage.setItem(
            "dashboardName",
            dashboardsUp[0].dashboardName
          );
          dispatch(DashboardActions.switchDashboard(dashboardsUp[0]));
          navigate(
            `./dashboard/${dashboardsUp[0]?.dashboardName?.split(" ").join("")}`
          );
        }
        toast.success("Dashboard deleted successfully"); //resp?.data?.status
      }
    } catch (err) {
      toast.error(err.message, { theme: "white", color: "red" });
    }
    setOpenDashPopup(false);
  };

  const getDashboardItems = () => {
    return (
      <>
        <Refresh editLayout={editLayout} handleDialogOpen={handleDialogOpen} />
        {!editLayout ? (
          roleName !== "ENDUSER" ? (
            <>
              <div style={{ display: "flex" }}>
                <Tooltip
                  title="Dashboard Menu"
                  PopperProps={{ style: { marginTop: -12 } }}
                >
                  <IconButton onClick={toggleDrawer(anchor, true)}>
                    <WidgetsIcon style={{ color: "var(--colorforwhite)" }} />
                  </IconButton>
                </Tooltip>
                <Drawer
                  id="drawer"
                  anchor={anchor}
                  open={openFilterList}
                  onClose={toggleDrawer(anchor, false)}
                  classes={{ paper: classes.drawer }}
                >
                  {list(anchor)}
                </Drawer>
              </div>
              <div>
                <Dialog
                  open={openDashPopup}
                  maxWidth="xs"
                  fullWidth
                  BackdropProps={{
                    classes: {
                      root: classes.backDrop,
                    },
                  }}
                >
                  <div
                    className="headingbtn2"
                    style={{
                      backgroundColor: "var(--dashboardBgColor)",
                      color: "var(--colorforwhite)",
                      fontSize: "16px",
                      height: "50px",
                      minWidth: "400px",
                    }}
                  >
                    <DialogTitle>Delete Dashboard</DialogTitle>
                    <IconButton
                      aria-label="close"
                      style={{ color: "var(--colorforwhite)" }}
                    >
                      <CloseIcon onClick={() => setOpenDashPopup(false)} />
                    </IconButton>
                  </div>
                  <DialogContent>
                    Are you sure you want to delete the{" "}
                    <span
                      style={{
                        color: "var(--dashboardBgColor)",
                        fontWeight: "bold",
                      }}
                    >
                      {dashboardConfig?.selectedDashboard?.dashboardName
                        ?.charAt(0)
                        .toUpperCase() +
                        dashboardConfig?.selectedDashboard?.dashboardName?.slice(
                          1
                        )}
                    </span>{" "}
                    dashboard ?
                  </DialogContent>
                  <DialogActions>
                    <Button
                      style={{
                        backgroundColor: "var(--dashboardBgColor)",
                        color: "var(--colorforwhite)",
                        fontSize: "14px",
                        textTransform: "none",
                      }}
                      onClick={() => setOpenDashPopup(false)}
                    >
                      No
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "var(--dashboardBgColor)",
                        color: "var(--colorforwhite)",
                        fontSize: "14px",
                        textTransform: "none",
                      }}
                      onClick={handleDeleteDash}
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          ) : (
            <Tooltip
              title="Edit layout"
              PopperProps={{ style: { marginTop: -6 } }}
            >
              <IconButton aria-label="edit" onClick={onLayoutEdit}>
                <EditIcon style={{ color: "var(--colorforwhite)" }} />
              </IconButton>
            </Tooltip>
          )
        ) : (
          <Tooltip
            title="Save layout"
            PopperProps={{ style: { marginTop: -12 } }}
          >
            <IconButton aria-label="save" onClick={onLayoutSave}>
              <SaveIcon style={{ color: "var(--colorforwhite)" }} />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  };
  const getdblist = () => {
    return (
      <>
        {roleName !== "ENDUSER" && (
          <Tooltip
            title="Add New Dashboard"
            PopperProps={{ style: { marginTop: -6 } }}
          >
            <IconButton onClick={() => handleDialogOpen("NEW")}>
              <AddToQueueIcon style={{ color: "var(--colorforwhite)" }} />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  };

  const getAdminItems = () => {
    return (
      <Tooltip title="Add User" PopperProps={{ style: { marginTop: -12 } }}>
        <IconButton onClick={() => setOpenAddUser(true)}>
          <PersonAddIcon style={{ color: "var(--colorforwhite)" }} />
        </IconButton>
      </Tooltip>
    );
  };

  const getDatabaseItems = () => {
    return (
      <Tooltip
        title="Add Data Source"
        PopperProps={{ style: { marginTop: -12 } }}
      >
        <IconButton onClick={handleOpenDatabase}>
          <StorageIcon style={{ color: "var(--colorforwhite)" }} />
        </IconButton>
      </Tooltip>
    );
  };

  const getDomainItems = () => {
    return (
      <Tooltip
        title="Add Enterprise"
        PopperProps={{ style: { marginTop: -12 } }}
      >
        <IconButton onClick={handleDomain}>
          <BusinessCenterIcon style={{ color: "var(--colorforwhite)" }} />
        </IconButton>
      </Tooltip>
    );
  };

  const getOrganisationItems = () => {
    return (
      <Tooltip
        title="Add Organization"
        PopperProps={{ style: { marginTop: -12 } }}
      >
        <IconButton onClick={handleOrganization}>
          <BusinessIcon style={{ color: "var(--colorforwhite)" }} />
        </IconButton>
      </Tooltip>
    );
  };

  const getGroupItems = () => {
    return (
      <Tooltip title="Create Group" PopperProps={{ style: { marginTop: -12 } }}>
        <IconButton onClick={handleGroup}>
          <GroupWorkIcon style={{ color: "var(--colorforwhite)" }} />
        </IconButton>
      </Tooltip>
    );
  };

  useEffect(() => {
    if (dashboardConfig.selectedDashboard) {
      setSelectedDashboard(dashboardConfig.selectedDashboard);
    } else {
      setSelectedDashboard(dashboardConfig.dashboards?.[0]);
    }
  }, [dashboardConfig?.dashboards, dashboardConfig?.selectedDashboard]);

  const handleNewUsersSave = async () => {
    const emailAry = newUsers.map((obj) => {
      return obj.email;
    });
    const userAry = newUsers.map((obj) => {
      return obj.username;
    });
    const selectedGroupid = groupId;

    setOpenAddUser(false);
    var dataObj = {
      createdBy: "tsing",
      organizationId: orgId,
      lanId: userAry,
      email: emailAry,
      groupId: selectedGroupid,
    };
    try {
      const resp = await saveUser(dataObj);
      setHasErrorInUsers(true);
      setGroupId(undefined);
      toast.success(resp.data.status);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.status, { theme: "white", color: "red" });
    }
    navigate("/user");
    setTimeout(() => {
      dispatch(administartionActions.getAllUsers());
    }, 500);
  };

  useEffect(() => {
    newUsers.forEach((user) => {
      if (
        user.isEmailHasError ||
        user.isUsernameHasError ||
        user.userNameError ||
        user.emailError ||
        typeof groupId === "undefined" ||
        groupId.length === 0
      ) {
        setHasErrorInUsers(true);
      } else {
        setHasErrorInUsers(false);
      }
    });
  }, [newUsers, groupId]); //to caught all the change

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosing = () => {
    setAnchorEl(null);
  };

  const handleDomainDialog = () => {
    dispatch(enterpriseActions.getAllDomains());
    setDomainItems(!domainItems);
  };

  const handleUpdateOrganization = () => {
    dispatch(administrationActions.getAllOrgs());
    setOrgItems(!orgItems);
  };

  const handlegetAllGroups = () => {
    dispatch(administrationActions.getAllGroups());
    setGroupItem(false);
  };
  return (
    <>
      <AppBar position="fixed" open={open} className="appBar">
        <Toolbar id="headerItems">
          <div className={`headerDivOne ${open ? "headerDivOpen" : ""}`}>
            {!open && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
                style={{ marginLeft: "-25px" }}
              >
                <MenuIcon style={{ color: "var(--colorforwhite)" }} />
              </IconButton>
            )}

            <div className="logoDiv" style={{ marginLeft: open ? "-18px" : 0 }}>
              <img
                src={logo}
                alt="logo"
                className=""
                style={{ width: "60%" }}
              />
            </div>
          </div>
          <div className="hrBar">
            <div style={{ display: "flex",position:"relative",left:35 }}>
              {getItems()}
            </div>
            <IconButton
              onClick={handlePopoverOpen}
              style={{ height: 30, top: 17, left: 35 }}
            >
              <img src={ColorPaletteIcon} alt="Icon" width="25" height="25" />
            </IconButton>
            <div
              style={{
                left: 30,
                position: "relative",
                lineHeight: 0.5,
                padding: 10,
              }}
            >
              <p style={{ fontSize: 12,marginBottom:10 }}>Hi,{username}</p>
              <p style={{ fontSize: 10,marginBottom:13}}>[{roleName?.toLowerCase()}]</p>
            </div>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{
                  position: "relative",
                  left: 20,
                  top: 9,
                }}
              >
                <AccountCircle
                  style={{
                    fontSize: "x-large",
                    color: "var(--colorforwhite)",
                  }}
                />
              </IconButton>
              <div>
                <Menu
                  className="popup-place"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClosing}
                  style={{ width: 200, height: 300 }}
                >
                  <MenuItem style={{ width: 150, height: 45, right: 5 }}>
                    <div style={{ display: "flex" }}>
                      <img
                        src={userIcon}
                        alt="userIcon"
                        style={{ width: 40, height: 40 }}
                      />
                      <div style={{ marginLeft: 10 }}>
                        <div style={{ fontSize: 14, fontWeight: "bold" }}>
                          {username}
                        </div>
                        <div style={{ fontSize: 10 }}>
                          {roleName?.toLowerCase()}
                        </div>
                      </div>
                    </div>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={handleOpen}
                    style={{ width: 150, height: 40, right: 10 }}
                  >
                    <IconButton>
                      <HelpOutline
                        style={{
                          fontSize: "x-large",
                          color: "var(--colorforwhite)",
                        }}
                      />
                    </IconButton>{" "}
                    <h5>Help</h5>
                  </MenuItem>

                  <Divider />
                  <MenuItem
                    onClick={handleLogout}
                    style={{ width: 150, height: 40, right: 10 }}
                  >
                    <IconButton>
                      <PowerSettingsNewIcon
                        style={{ color: "var(--colorforwhite)" }}
                      />
                    </IconButton>{" "}
                    <h5>Logout</h5>
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div>
              <Popover
                open={Boolean(popoverAnchorEl)}
                anchorEl={popoverAnchorEl}
                onClose={() => {
                  handlePopoverClose();
                  setIsSaveDialogOpen(true);
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Box
                  p={2}
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                >
                  <Tooltip
                    title="Change Header Color"
                    PopperProps={{ style: { marginTop: -12 } }}
                  >
                    <IconButton
                      id="color-picker-img"
                      aria-label="Change Header Color"
                      onClick={handleColorPickerToggle}
                    >
                      <img
                        src={colorpicker}
                        alt="Icon"
                        width="25"
                        height="25"
                      />
                      <span style={{ fontSize: "12px", marginLeft: "10px" }}>
                        Change Header Color
                      </span>
                    </IconButton>
                  </Tooltip>
                  {colorPickerAnchorEl && (
                    <ChromePicker
                      color={selectedColor}
                      onChange={handleColorChange}
                      disableAlpha
                      anchorEl={colorPickerAnchorEl}
                      open={Boolean(colorPickerAnchorEl)}
                      onClose={handleColorPickerToggle} // Toggle Chrome picker
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    />
                  )}
                  <div>
                    <Tooltip title="Font Family">
                      <IconButton onClick={handleFontFamilySelectorOpen}>
                        <img src={fontIcon} alt="Icon" width="25" height="25" />
                        <span style={{ fontSize: "14px", marginLeft: "10px" }}>
                          font selector
                        </span>
                      </IconButton>
                    </Tooltip>

                    {/* Font Family Selector Popover */}
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleFontFamilySelectorClose}
                    >
                      <div className={classes1.fontFamilySelectorPopup}>
                        <List>
                          {fontFamilies.map((fontFamily) => (
                            <ListItem
                              button
                              key={fontFamily}
                              onClick={() => handleFontFamilySelect(fontFamily)}
                            >
                              <ListItemText primary={fontFamily} />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    </Popover>
                  </div>
                  {/*  <div>
                    <Tooltip
                      title="Change Body Background Color"
                      PopperProps={{ style: { marginTop: -12 } }}
                    >
                      <IconButton onClick={handleBodyColorPickerToggle}>
                        <img
                          src={colorpicker}
                          alt="Icon"
                          label="body color"
                          width="25"
                          height="25"
                        />
                        <span style={{ fontSize: "12px", marginLeft: "10px" }}>
                          Change body Color
                        </span>
                      </IconButton>
                    </Tooltip>
                    {bodyColorPickerAnchorEl && (
                      <ChromePicker
                        color={activeStateColor}
                        onChange={handleBodyColorChange}
                        disableAlpha
                        anchorEl={bodyColorPickerAnchorEl}
                        open={Boolean(bodyColorPickerAnchorEl)}
                        onClose={handleBodyColorPickerClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      />
                    )}
                  </div> */}
                  <div style={{ marginBottom: "10px" }}>
                    <Tooltip
                      title="Change Font Color"
                      PopperProps={{ style: { marginTop: -12 } }}
                    >
                      <IconButton onClick={handleFontColorPickerToggle}>
                        <img
                          src={colorpicker}
                          alt="Icon"
                          label="font color"
                          width="25"
                          height="25"
                        />
                        <span style={{ fontSize: "12px", marginLeft: "10px" }}>
                          Change Font Color
                        </span>
                      </IconButton>
                    </Tooltip>
                    {fontColorPickerAnchorEl && (
                      <ChromePicker
                        color={selectedFontColor}
                        onChange={handleFontColorChange}
                        disableAlpha
                        anchorEl={fontColorPickerAnchorEl}
                        open={Boolean(fontColorPickerAnchorEl)}
                        onClose={handleFontColorPickerClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      />
                    )}
                  </div>
                </Box>
              </Popover>
              <Dialog
                open={isSaveDialogOpen}
                onClose={handleSaveDialogClose}
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
                    fontSize: "16px",
                    height: "50px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <DialogTitle
                    style={{
                      backgroundColor: "var(--dashboardBgColor)",
                      color: "var(--colorforwhite)",
                      fontWeight: "bold",
                    }}
                  >
                    Save Changes
                  </DialogTitle>

                  <IconButton
                    aria-label="close"
                    style={{ color: "var(--colorforwhite)" }}
                  >
                    <CloseIcon onClick={handleSaveDialogClose} />
                  </IconButton>
                </div>
                <DialogContent>Do you want to save the changes?</DialogContent>
                <DialogActions>
                  <Button
                    style={{
                      backgroundColor: "var(--dashboardBgColor)",
                      color: "var(--colorforwhite)",
                      textTransform: "none",
                    }}
                    onClick={handleSaveDialogClose}
                  >
                    No
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "var(--dashboardBgColor)",
                      color: "var(--colorforwhite)",
                      textTransform: "none",
                    }}
                    onClick={handleSaveChanges}
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={showWarningDialog}
                onClose={() => setShowWarningDialog(false)}
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
                    fontSize: "16px",
                    height: "50px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <DialogTitle
                    style={{
                      backgroundColor: "var(--dashboardBgColor)",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Font Color Might Not Be Visible
                  </DialogTitle>

                  <IconButton
                    aria-label="close"
                    style={{ color: "var(--colorforwhite)" }}
                  >
                    <CloseIcon onClick={() => setShowWarningDialog(false)} />
                  </IconButton>
                </div>
                <DialogContent>
                  The selected font color might not be clearly visible on the
                  background color. Consider choosing a different font color for
                  better visibility.
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{
                      color: "white",
                      textTransform: "none",
                      backgroundColor: "var(--dashboardBgColor)", // Match the button's background color
                    }}
                    onClick={() => setShowWarningDialog(false)}
                    color="primary"
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Dialog
              open={openModal}
              style={{
                height: "90vh",
                top: "5%",
                position: "absolute",
              }}
              BackdropProps={{
                classes: {
                  root: classes.backDrop,
                },
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--dashboardBgColor)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <DialogTitle
                  style={{
                    padding: "10px 0 10px 22px",
                    color: "var(--colorforwhite)",
                  }}
                  title="Help"
                >
                  <b>Help</b>
                </DialogTitle>
                <IconButton onClick={handleClose}>
                  <CloseIcon style={{ color: "var(--colorforwhite)" }} />
                </IconButton>
              </div>
              <DialogContent>
                <Help />
              </DialogContent>
            </Dialog>

            {/* <Tooltip
              title="Log Out"
              PopperProps={{ style: { marginTop: -12 } }}
            >
              <IconButton onClick={handleLogout}>
                <PowerSettingsNewIcon
                  style={{ color: "var(--colorforwhite)" }}
                />
              </IconButton>
            </Tooltip> */}
          </div>
        </Toolbar>

        {(openDialog === "NEW" || openDialog === "DUPLICATE") && (
          <DashboardPopup
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            type={openDialog}
          />
        )}
        <Dialog
          open={openRefreshDialog}
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
              fontSize: "16px",
              height: "50px",
            }}
          >
            <DialogTitle>{dialogTitle}</DialogTitle>
          </div>

          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="refresh-in-edit">Refresh Rate</InputLabel>
              <Select
                labelId="refresh-in-edit"
                id="Refresh"
                onChange={(e) => setCRefreshRate(e.target.value)}
                value={cRefreshRate}
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
                <MenuItem value={60000}>1 minute</MenuItem>
                <MenuItem value={120000}>2 minute</MenuItem>
                <MenuItem value={300000}>5 minute</MenuItem>
                <MenuItem value={600000}>10 minute</MenuItem>
                <MenuItem value={900000}>15 minute</MenuItem>
                <MenuItem value={1200000}>20 minute</MenuItem>
                <MenuItem value={25200000}>stop</MenuItem>
                <MenuItem value={"custom"}>Custom</MenuItem>
              </Select>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {cRefreshRate === "custom" && (
                  <TextField
                    type="number"
                    label="Hours"
                    value={customRefreshRateHours}
                    onChange={(e) =>
                      setCustomRefreshRateHours(e.target.value.slice(0, 3))
                    }
                    inputProps={{
                      maxLength: 3,
                      type: "number",
                    }}
                    style={{
                      marginTop: "8px",
                      maxWidth: "30%",
                      display: "inline",
                    }}
                  />
                )}
                {cRefreshRate === "custom" && (
                  <TextField
                    type="number"
                    label="Minutes"
                    value={customRefreshRateMinutes}
                    onChange={(e) =>
                      setCustomRefreshRateMinutes(e.target.value.slice(0, 3))
                    }
                    inputProps={{
                      maxLength: 3,
                      type: "number",
                    }}
                    style={{ marginTop: "8px", maxWidth: "30%" }}
                  />
                )}
                {cRefreshRate === "custom" && (
                  <TextField
                    type="number"
                    label="Seconds"
                    value={customRefreshRateSeconds}
                    onChange={(e) =>
                      setCustomRefreshRateSeconds(e.target.value.slice(0, 3))
                    }
                    inputProps={{
                      maxLength: 3,
                      type: "number",
                    }}
                    style={{ marginTop: "8px", maxWidth: "30%" }}
                  />
                )}
              </div>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                color: "var(--colorforwhite)",
                textTransform: "none",
                fontSize: "14px",
              }}
              onClick={handleCloseRefresh}
            >
              Cancel
            </Button>
            <div
              style={{
                cursor: !handleRefresh() ? "not-allowed" : "pointer",
                opacity: !handleRefresh() ? 0.6 : 1,
              }}
            >
              <Button
                style={{
                  backgroundColor: "var(--dashboardBgColor)",
                  color: "var(--colorforwhite)",
                  textTransform: "none",
                  fontSize: "14px",
                }}
                disabled={!handleRefresh()}
                onClick={handleSaveRefresh}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDatabaseItems}
          maxWidth="xs"
          fullWidth
          BackdropProps={{
            classes: {
              root: classes.backDrop,
            },
          }}
          style={{ borderRadius: "0px" }}
        >
          <DialogTitle>Add Data Source</DialogTitle>
          <DialogContent>
            <AddDatabase />
          </DialogContent>
        </Dialog>
        <Dialog
          open={openAddUser}
          maxWidth="xs"
          fullWidth
          BackdropProps={{
            classes: {
              root: classes.backDrop,
            },
          }}
          style={{ alignItems: "center" }}
        >
         <div
          className="headingbtn3"
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
            <DialogTitle>Add User</DialogTitle>
            <IconButton
              aria-label="close"
              style={{ color: "var(--colorforwhite)" }}
            >
              <CloseIcon onClick={changeClose} />
            </IconButton>
          </div>
          <DialogContent>
            <AddUser
              isEdit={false}
              setNewUsersFun={setNewUsers}
              setHasErrorInUsersFn={setHasErrorInUsers}
              setGroupIdFn={setGroupId}
              showGroupDropdown ={true}
            />
          </DialogContent>

          <DialogActions>
            <Button
              autoFocus
              className="saveBtn"
              onClick={changeCancel}
              style={{ color: "var(--colorforwhite)" }}
              color="black"
            >
              Cancel
            </Button>
            <div
              style={{
                opacity: hasErrorinUsers ? 0.6 : 1,
                cursor: hasErrorinUsers ? "not-allowed" : "pointer",
              }}
            >
              <Button
                autoFocus
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
                disabled={hasErrorinUsers}
                onClick={handleNewUsersSave}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
        <AddEnterprise
          title="Onboard New Enterprise"
          handleDomainDialog={() => handleDomainDialog()}
          openDialog={domainItems}
        />
        <AddOrganization
          title="Create New Organization"
          handleOrgDialog={() => handleUpdateOrganization()}
          openDialog={orgItems}
        />
        <CreateGroup
          title="Create User Group"
          open={groupItem}
          handleClose={() => handlegetAllGroups()}
        />
      </AppBar>
      <Backdrop style={{ color: "black", zIndex: 9999 }} open={loading}>
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
