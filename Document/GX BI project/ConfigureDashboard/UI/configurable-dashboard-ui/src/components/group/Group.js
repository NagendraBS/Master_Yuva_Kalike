import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { styled } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { saveUser } from "../../services/AdminServices";
import {
  AppBar,
  Box,
  TextField,
  Button,
  Tab,
  Tabs,
  Typography,
  Dialog,
  IconButton,
  Tooltip,
  Backdrop,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import moment from "moment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomDialog from "./CreateGroup";
import Table from "../table/Table";
import "../AddUser.css";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import administartionActions from "../../actions/administrationActions";
import {
  addGroupRole,
  addUserGroups,
  getGroupRoles,
  getGroupUsers,
  getRole,
  removeGroupRole,
  removeUserGroups,
  removeGroup,
} from "../../services/AdminServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit as EditIcon } from "@material-ui/icons";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { KeyboardBackspace } from "@material-ui/icons";
import AddUser from "../AddUser";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const useStyles = makeStyles({
  AppBar: {
    zIndex: "0",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Group() {
  const dispatch = useDispatch();
  const location = useLocation();
  const lanId = JSON.parse(localStorage.getItem("userInfo"))?.lanId;
  const groupDatas = location.state.rowData;
  const allUsersData = useSelector(
    (state) => state.administration.allUsersData
  );
  const tableRef = useRef(null);
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editGroup, setEditGroup] = useState();
  const [openGrpDialog, setOpenGrpDialog] = useState(false);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openNewUsers, setOpenNewUsers] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);
  const [savedUser, setSavedUser] = useState();
  const [addRmvUser, setAddRmvUser] = useState();
  const [updateUser, setUpdateUser] = useState();
  const [updateRoles, setUpdateRoles] = useState([]);
  const [showRoles, setShowRoles] = useState();
  const [showRemoveUser, setShowRemoveUser] = useState(false);
  const classes = useStyles();
  const [userValue, setUserValue] = useState("");
  const [error, setError] = useState(false);
  const [userDisabled, setUserDisabled] = useState(true);
  const [permissionDisabled, setPermissionDisabled] = useState(true);
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState();
  const [data, setData] = useState([
    {
      email: "",
      username: "",
      isEmailHasError: false,
      isUsernameHasError: false,
      userNameError: false,
      emailError: false,
      groupId: groupDatas.groupId,
    },
  ]);

  const groupName = groupDatas.groupName; // Replace with your actual group name
  const [hasErrorinUsers, setHasErrorInUsers] = useState(true);

  const [newUsers, setNewUsers] = useState([
    {
      isEmailHasError: true,
      isUsernameHasError: true,
      userNameError: true,
      emailError: true,
    },
  ]);
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
  const [openAddUser, setOpenAddUser] = useState(false);
  const [groupId, setGroupId] = useState(groupDatas.groupId);
  const handleNewUsersSave = async () => {
    const emailAry = newUsers.map((obj) => {
      return obj.email;
    });
    const userAry = newUsers.map((obj) => {
      return obj.username;
    });
    const selectedGroupid = groupDatas.groupId;
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
      setGroupId(selectedGroupid);
      changeCancel();
      toast.success(resp.data.status);
      fetchGroupUsers();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.status, { theme: "white", color: "red" });
    }
    //navigate("/user");
    setTimeout(() => {
      dispatch(administartionActions.getAllUsers());
    }, 500);
  };

  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);
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
  const columnsUser = [
    {
      headerName: "UserName",
      field: "lanId",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Email", field: "email", resizable: false },
  ];

  const permissionColumns = [
    { headerName: "Role Name", field: "roleName", resizable: true, flex: 1 },
    { headerName: "Type", field: "roletype", resizable: false, flex: 1 },
  ];
  const handleRadioChange = (event) => {
    setUserValue(parseInt(event.target.value));
    setPermissionDisabled(false);
    setError(false);
  };

  useEffect(() => {
    dispatch(administartionActions.getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGroupUsers = async () => {
    try {
      const data = location.state.rowData.groupId;
      const resp = await getGroupUsers(data);
      setUpdateUser(resp?.data?.userDetailsList);
    } catch (error) {
      console.log(error);
      setUpdateUser([]);
    }
  };

  const fetchGroupRoles = async () => {
    try {
      const arrData = [];
      const data = location.state.rowData.groupId;
      const resp = await getGroupRoles(data);
      setRoleId(resp?.data?.roleId);
      arrData.push(resp?.data);
      setUpdateRoles(arrData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRoles = async () => {
    try {
      const resp = await getRole();
      setShowRoles(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroupUsers();
    fetchGroupRoles();
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.rowData.groupId]);

  const columns = [
    {
      headerName: "User Name",
      field: "lanId",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Email", field: "email" },
    { headerName: "Group", field: "groupName", resizable: false },
  ];
  const handleGroupEdit = async () => {
    setOpenDialog(true);
    setEditGroup(groupDatas);
  };

  const handleDelete = async () => {
    setLoading(true);
    const resp = await removeGroup(location?.state?.rowData.groupId, "D", {
      status: "D",
    });
    if (resp.status === 200) {
      toast.success("Group deactivated succesfully");
      navigate("./..");
    }
    setLoading(false);
  };

  const onGrpOpenDialog = async (rowData) => {
    setOpenGrpDialog(true);
  };

  const onGrpCloseDialog = () => {
    setOpenGrpDialog(null);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onRemoveSlected = (e) => {
    let row = e.api.getSelectedRows();
    if (row?.length > 0) {
      setShowRemoveUser(true);
    } else {
      setShowRemoveUser(false);
    }
    let userArr = [];
    for (let value of row) {
      userArr.push(value.actorId);
    }
    setAddRmvUser(userArr);
  };

  const handleAddUser = (e) => {
    let row = e.api.getSelectedRows();
    if (row?.length > 0) {
      setUserDisabled(false);
    } else {
      setUserDisabled(true);
    }
    let userArr = [];
    for (let value of Object.values(row)) {
      userArr.push(value.actorId);
    }
    setSavedUser(userArr);
  };

  const handleUpdateUser = async () => {
    setShowRemoveUser(false);
    try {
      setLoading(true);
      const data = {
        groupId: groupDatas.groupId,
        createdBy: lanId,
        actorIds: addRmvUser,
      };
      const resp = await removeUserGroups(data);
      if (resp.status === 200) {
        toast.success("Users removed successfully");
        fetchGroupUsers();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { theme: "white", color: "red" });
    }
  };

  const handleRemoveRole = async () => {
    try {
      setLoading(true);
      const data = {
        groupId: groupDatas.groupId,
        createdBy: lanId,
        roleId: roleId,
      };
      const resp = await removeGroupRole(data);
      if (resp.status === 200) {
        toast.success("Permission removed successfully");
        setUpdateRoles([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { theme: "white", color: "red" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userValue === "") {
      setPermissionDisabled(true);
      setError(true);
    } else {
      setPermissionDisabled(false);
      setError(false);
      setOpenPermission(false);
    }
    try {
      setLoading(true);
      const data = {
        roleId: parseInt(userValue),
        createdBy: lanId,
        groupId: parseInt(groupDatas.groupId),
      };
      const resp = await addGroupRole(data);
      if (resp.status === 200) {
        fetchGroupRoles();
        toast.success("Permission added successfully");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(error.message, { theme: "white", color: "red" });
      console.log(err);
    }
  };
  const handleSaveUser = async () => {
    setOpenNewUser(false);
    try {
      setLoading(true);
      const data = {
        groupId: groupDatas.groupId,
        createdBy: lanId,
        actorIds: savedUser,
      };
      const resp = await addUserGroups(data);
      if (resp.status === 200) {
        toast.success("Users added successfully");
        fetchGroupUsers();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { theme: "white", color: "red" });
    }
  };
  const changeCancel = () => {
    setOpenNewUsers(false);
    //setHasErrInEditUser(true);
  };
  const filterUsers = () => {
    let indices = [];
    let dummy;
    if (updateUser && updateUser?.length > 0) {
      updateUser.forEach((user) => {
        allUsersData.forEach((allUser, i) => {
          if (allUser.lanId === user.lanId && allUser.email === user.email) {
            indices.push({ lanId: allUser.lanId, email: allUser.email });
          }
        });
      });

      dummy = [...allUsersData];
      for (var i = dummy.length - 1; i >= 0; i--) {
        for (var j = 0; j < indices.length; j++) {
          if (
            dummy[i] &&
            dummy[i].lanId === indices[j].lanId &&
            dummy[i].email === indices[j].email
          ) {
            dummy.splice(i, 1);
          }
        }
      }
    } else {
      dummy = allUsersData;
    }

    setFilteredUsersData(dummy);
  };

  return (
    <div style={{ width: sidebarFlag ? "98vw" : "95vw", marginLeft: "auto" }}>
      <DrawerHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: sidebarFlag ? "84.5vw" : "92.8vw",
          position: "relative",
          bottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            position: "relative",
            bottom: 10,
          }}
        >
          <div class="menu-item-hover" onClick={() => navigate("/groups")}>
            <KeyboardBackspace
              style={{
                cursor: "pointer",
                alignItems: "center",
                color: "#000",
              }}
            />
          </div>
          <div style={{ display: "block" }}>
            <div>
              <p
                style={{
                  margin: "0px",
                  color: "var(--color)",
                  fontWeight: "bold",
                }}
              >
                {groupDatas?.groupName?.charAt(0).toUpperCase() +
                  groupDatas?.groupName?.slice(1)}
              </p>
            </div>
            <div>
              <h5
                style={{
                  color: "var(--color)",
                  margin: "0",
                  display: "flex",
                  gap: "8px",
                  fontWeight: "400",
                }}
              >
                Group Description:
                <p
                  style={{ margin: "0", color: "black", fontWeight: "normal" }}
                >
                  {groupDatas?.description}
                </p>
              </h5>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginRight: sidebarFlag ? "30px" : "0px",
          }}
        >
          <div style={{ marginTop: "5px", gap: "10px", marginLeft: "10px" }}>
            <span style={{ color: "var(--dashboardBgColor)" }}>
              {moment(groupDatas?.creationDate).format("MM-DD-YYYY")}
            </span>
          </div>
          <div>
            {groupDatas?.status === "A" && (
              <>
                <div
                  style={{ display: "flex", gap: "10px", marginLeft: "3px" }}
                >
                  <div>
                    <Tooltip title="Edit">
                      <EditIcon
                        style={{
                          color: "#3f51b5",
                          cursor: "pointer",
                          position: "relative",
                          left: 15,
                        }}
                        onClick={handleGroupEdit}
                      />
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Deactivate">
                      <DeleteOutline
                        style={{
                          color: "#F16767",
                          cursor: "pointer",
                          position: "relative",
                          left: 15,
                        }}
                        onClick={onGrpOpenDialog}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <Dialog
                    open={openGrpDialog}
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
                      <DialogTitle>Modify Status</DialogTitle>
                      <IconButton
                        aria-label="close"
                        style={{ color: "var(--colorforwhite)" }}
                      >
                        <CloseIcon onClick={onGrpCloseDialog} />
                      </IconButton>
                    </div>
                    <DialogContent>
                      <div>
                        Are you sure want to deactivate groups{" "}
                        <span
                          style={{
                            color: "var(--dashboardBgColor)",
                            fontWeight: "bold",
                          }}
                        >
                          {groupDatas.groupName}
                        </span>{" "}
                        ?
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        style={{
                          backgroundColor: "var(--dashboardBgColor)",
                          color: "var(--colorforwhite)",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                        onClick={onGrpCloseDialog}
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
                        onClick={handleDelete}
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
          overflow: "auto",
          maxWidth: sidebarFlag ? "78vw" : "89vw",
          height: sidebarFlag ? "428px" : "428px",
          position: "relative",
          bottom: 20,
        }}
      >
        <div>
          <hr />
        </div>
        <div style={{ width: "50%", margin: "0 auto -10px " }}>
          <AppBar position="static" color="default" className={classes.AppBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant=""
              aria-label="full width tabs example"
              centered
            >
              <Tab
                label="Users"
                style={{ textTransform: "none" }}
                {...a11yProps(0)}
              />
              <Tab
                label="Permissions"
                style={{ textTransform: "none" }}
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
        </div>
        {groupDatas?.status === "A" && (
          <>
            <TabPanel value={value} index={0}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                  padding: "0",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    color: "var(--colorforwhite)",
                    fontSize: "14px",
                    textTransform: "none",
                    marginTop: "20px",
                  }}
                  onClick={() => {
                    filterUsers();
                    setOpenNewUser(true);
                  }}
                >
                  Add Users
                </Button>
                <Button
                  variant="contained"
                  style={{
                    marginLeft: 20,
                    backgroundColor: "var(--dashboardBgColor)",
                    color: "var(--colorforwhite)",
                    fontSize: "14px",
                    textTransform: "none",
                    marginTop: "20px",
                  }}
                  onClick={() => {
                    setOpenNewUsers(true);
                    // Add functionality for the "Add New User" button here
                  }}
                >
                  Add New User
                </Button>
                <Dialog
                  style={{ alignItems: "center" }}
                  open={openNewUsers}
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
                      fontSize: "20px",
                      height: "35px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <DialogTitle>Add New User</DialogTitle>
                    <IconButton
                      aria-label="close"
                      style={{ color: "var(--colorforwhite)" }}
                    >
                      <CloseIcon onClick={changeCancel} />
                    </IconButton>
                  </div>

                  <DialogContent>
                    <AddUser
                      showGroupDropdown={false}
                      showGroupTextField={true}
                      groupValue={groupName}
                      setNewUsersFun={setNewUsers}
                      setHasErrorInUsersFn={setHasErrorInUsers}
                      setGroupIdFn={setGroupId}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button
                      autoFocus
                      style={{
                        color: "var(--colorforwhite)",
                        backgroundColor: "var(--dashboardBgColor)",
                        fontSize: "14px",
                        textTransform: "none",
                      }}
                      onClick={changeCancel}
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
                <Dialog
                  open={openNewUser}
                  maxWidth="xs"
                  style={{ height: "96vh", top: "5.5%" }}
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
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <DialogTitle>Select Users</DialogTitle>
                    <div>
                      <IconButton
                        aria-label="close"
                        style={{ color: "var(--colorforwhite)" }}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                        }}
                        onClick={() => setOpenNewUser(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                  <Table
                    id="usertable"
                    columns={columns}
                    data={filteredUsersData}
                    onRowSelected={handleAddUser}
                    tableRef={tableRef}
                    isGlobalCustomSeachFunctionRequired
                    onPageTable="AddUser"
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "97%",
                      gap: "13px",
                      padding: "0px 0px 10px 0px",
                    }}
                  >
                    <div
                      style={{
                        cursor: userDisabled ? "not-allowed" : "pointer",
                        opacity: userDisabled ? 0.6 : 1,
                      }}
                    >
                      <Button
                        style={{
                          color: "var(--colorforwhite)",
                          backgroundColor: "var(--dashboardBgColor)",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                        onClick={handleSaveUser}
                        disabled={userDisabled}
                      >
                        Add User
                      </Button>
                    </div>
                    <div>
                      <Button
                        style={{
                          color: "var(--colorforwhite)",
                          backgroundColor: "var(--dashboardBgColor)",
                          fontSize: "14px",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          setOpenNewUser(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Dialog>
                {showRemoveUser && (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "var(--dashboardBgColor)",
                      color: "var(--colorforwhite)",
                      fontSize: "14px",
                      textTransform: "none",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                    onClick={handleUpdateUser}
                  >
                    Remove Users
                  </Button>
                )}
              </div>

              <Table
                title="Users Group"
                columns={columnsUser}
                data={updateUser}
                onRowSelected={onRemoveSlected}
                onPageTable="UsersGroup"
                isGlobalCustomSeachFunctionRequired
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "5px",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    color: "var(--colorforwhite)",
                    fontSize: "14px",
                    textTransform: "none",
                    marginTop: "20px",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    if (updateUser && updateUser?.length > 0) {
                      setOpenPermission(true);
                      setUserValue("");
                      setError(false);
                      setPermissionDisabled(true);
                    } else {
                      setOpenPermission(false);
                      toast.error("Users not found to add group permission", {
                        theme: "white",
                        color: "red",
                      });
                    }
                  }}
                >
                  {updateRoles?.length > 0
                    ? "Edit Permission"
                    : "Add Permission"}
                </Button>
                <div
                  style={{
                    flexDirection: "inherit !important",
                  }}
                >
                  <Dialog
                    open={openPermission}
                    BackdropProps={{
                      classes: {
                        root: classes.backDrop,
                      },
                    }}
                  >
                    <div
                      style={{
                        height: "auto",
                        width: "450px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "var(--dashboardBgColor)",
                          color: "var(--colorforwhite)",
                          fontSize: "16px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingLeft: "13px",
                        }}
                      >
                        <div>Select Permissions</div>
                        <div>
                          <IconButton
                            aria-label="close"
                            style={{ color: "var(--colorforwhite)" }}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                            }}
                            onClick={() => setOpenPermission(false)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      </div>
                      <div>
                        <form onSubmit={handleSubmit}>
                          <FormControl
                            style={{ width: "100%" }}
                            component="fieldset"
                            error={error}
                            className={classes.formControl}
                          >
                            <RadioGroup
                              aria-label="quiz"
                              name="quiz"
                              value={userValue}
                              key={userValue}
                              onChange={handleRadioChange}
                            >
                              {showRoles?.map((data) => {
                                return (
                                  <FormControlLabel
                                    style={{ marginLeft: "0px" }}
                                    value={data?.roleId}
                                    control={<Radio color="primary" />}
                                    label={data?.roleName}
                                    key={data?.roleId}
                                  />
                                );
                              })}
                            </RadioGroup>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                                gap: "13px",
                                padding: "10px 10px",
                              }}
                            >
                              <div
                                style={{
                                  opacity: permissionDisabled ? 0.6 : 1,
                                  cursor: permissionDisabled
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                <Button
                                  type="submit"
                                  style={{
                                    color: "var(--colorforwhite)",
                                    backgroundColor: "var(--dashboardBgColor)",
                                    fontSize: "14px",
                                    textTransform: "none",
                                  }}
                                  disabled={permissionDisabled}
                                >
                                  Add Permission
                                </Button>
                              </div>
                              <div>
                                <Button
                                  style={{
                                    color: "var(--colorforwhite)",
                                    backgroundColor: "var(--dashboardBgColor)",
                                    fontSize: "14px",
                                    textTransform: "none",
                                  }}
                                  onClick={() => {
                                    setOpenPermission(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                        </form>
                      </div>
                    </div>
                  </Dialog>
                </div>

                {updateRoles?.length > 0 && (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "var(--dashboardBgColor)",
                      color: "var(--colorforwhite)",
                      fontSize: "14px",
                      textTransform: "none",
                      marginTop: "20px",
                    }}
                    onClick={handleRemoveRole}
                  >
                    Remove Permission
                  </Button>
                )}
              </div>
              <Table
                title="Permissions"
                columns={permissionColumns}
                data={updateRoles}
                ref={tableRef}
                onPageTable="Permissions"
                isGlobalCustomSeachFunctionRequired
              />
            </TabPanel>
          </>
        )}
        {groupDatas?.status === "D" && (
          <>
            <TabPanel value={value} index={0}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                  padding: "0",
                }}
              ></div>

              <Table
                // style={{ maxWidth: "80%", marginLeft: "10%" }}
                title="Users Group"
                columns={columnsUser}
                data={updateUser}
                onRowSelected={onRemoveSlected}
                tableRef={tableRef}
                onPageTable="UsersGroup"
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Table
                title="Permissions"
                columns={permissionColumns}
                data={updateRoles}
                ref={tableRef}
                onPageTable="Permissions"
              />
            </TabPanel>
          </>
        )}
      </div>

      <CustomDialog
        title="Edit User Group"
        open={openDialog}
        handleClose={handleClose}
        groupDatas={editGroup}
      />
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
    </div>
  );
}

export default Group;
