/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  IconButton,
  Tooltip,
  Button,
  Box,
  TextField,
  Dialog,
} from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import InfoIcon from "@material-ui/icons/Info";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import CreateGroup from "./group/CreateGroup";
import { makeStyles } from "@material-ui/core/styles";
import { getGroups } from "../services/AdminServices";
import "./AddUser.css";
import DeletePopUp from "./DeletePopUp";

const useStyles = makeStyles({
  redAsterisk: {
    color: "red",
  },
});

function AddUser(props, userRowData, openDialog, editUser) {
  const listofUsers = useSelector((state) => state.administration.allUsersData);
  const { setGroupIdFn } = props;
  const [allGroups, setAllGroups] = useState([]);
  const classes = useStyles();
  const [data, setData] = useState([
    {
      email: props.isEdit ? props.userRowData.email : "",
      username: props.isEdit ? props.userRowData.lanId : "",
      isEmailHasError: false,
      isUsernameHasError: false,
      userNameError: false,
      emailError: false,
      userNameDuplicate: false,
      emailDuplicate: false,
      emailErrorMessage: "",
      userNameErrorMessage: "",
    },
  ]);

  const [openGroup, setOpenGroup] = useState(false);
  const [get, setGet] = useState(false);
  const [personName, setPersonName] = React.useState(
    props.isEdit ? props.userRowData.groupId : ""
  );
  const [deletingUserIndex, setDeletingUserIndex] = React.useState(); //saving delete index of user in addUser pop up

  const validEmailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/
  );

  const getAllGroups = async () => {
    const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
    try {
      let groups = [];
      const group = await getGroups(orgId);
      if (group.data && group.data.groupInfoList) {
        groups = [...group.data.groupInfoList];
      }
      groups = groups.filter(function (group) {
        return group.status === "A";
      });

      setAllGroups(groups);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllGroups();
  }, []);

  let currentValue = [];

  listofUsers &&
    listofUsers?.map((x) => {
      currentValue.push(x.lanId);
    });
  const handleChange = (e) => {
    setPersonName(e.target.value);
    setGroupIdFn(e.target.value);
    if (e.target.value === props.userRowData.groupId) {
      props.setHasErrInEditUser(true);
    } else {
      props.setHasErrInEditUser(false);
    }
  };
  let currentEmail = [];

  listofUsers &&
    listofUsers?.map((x) => {
      currentEmail.push(x.email);
    });

  const changeEmail = (e, index) => {
    const newData = [...data];

    newData[index][e.target.name] = e.target.value.trim();
    newData[index].isEmailHasError = false;
    newData[index].emailError = false;

    //collecting all the emails entered
    let allEmails = newData.map((obj) => obj.email);

    //counting the occurance of the email 
    let count = allEmails.reduce(function (value, value2) {
      return value[value2] ? ++value[value2] : (value[value2] = 1), value;
    }, {});

    newData.forEach((user, i) => {
      console.log(allEmails.indexOf(user.email), 999);

      if (validEmailRegex.test(user.email) === false) 
      {
        user.isEmailHasError = true;
        user.emailErrorMessage = "Enter valid email";
      } 
      //if the count of the email is more than once
      else if (count[e.target.value] > 1) 
      {
        //if the index is equals to the current user obj then making the error true and updating the error message
        if (i === index) {
          user.isEmailHasError = true;
          user.emailErrorMessage = "Email Already Exist";
        }
      } 
      else if (count[e.target.value] === 1) {
        user.isEmailHasError = false;
        user.emailErrorMessage = "";
      } else if (currentEmail.indexOf(user.email) === -1) {
        user.emailError = false;
        user.emailErrorMessage = "";
      } else if (currentEmail.indexOf(user.email) === 0) {
        props.setHasErrInEditUser(true);
        user.emailError = false;
        user.emailErrorMessage = "";
      } else {
        user.emailError = true;
        // user.emailDuplicate = false;
        // user.emailErrorMessage = "Email already exist";
        props.setHasErrInEditUser(false);
      }
    });
    setData(newData);
    if (newData[index].username.length > 0) {
      props.setNewUsersFun(newData);
    }
  };

  const changeUsername = (e, index) => {
    const newData = [...data];
    newData[index].username = e.target.value.trim();
    newData[index].isUsernameHasError = false;
    newData[index].userNameError = false;

    //collecting all the emails entered
    let allUserNames = newData.map((obj) => obj.username);

    //counting the occurance of the email 
    let count = allUserNames.reduce(function (value, value2) {
      return value[value2] ? ++value[value2] : (value[value2] = 1), value;
    }, {});

    newData.forEach((user, i) => 
    {
      if (user.username.length < 3) 
      {
        user.isUsernameHasError = true;
        user.userNameErrorMessage = "Enter valid username";
      } 
      else if (count[e.target.value] > 1) 
      {
        //if the index is equals to the current user obj then making the error true and updating the error message
        if (i === index) 
        {
          user.isUsernameHasError = true;
          user.userNameErrorMessage = "Username Already Exist";
        }
      }
      else if(count[e.target.value] === 1)
      {
        user.isUsernameHasError = false;
        user.userNameErrorMessage = "";
      }
      else if (currentValue.indexOf(user.username) === -1) 
      {
        user.userNameError = false;
      } 
      else {
        user.userNameError = true;
      }
    });
    setData(newData);
    if (newData[index].email.length > 0) {
      props.setNewUsersFun(newData);
    }
  };

  const handleOpen = () => {
    setOpenGroup(true);
  };

  const addNewUser = () => {
    props.setHasErrorInUsersFn(true);
    const newData = [...data];
    let error = false;
    newData.forEach((user, i) => {
      if (user.isEmailHasError || user.email.trim() === "") {
        error = true;
        user.isEmailHasError = true;
      }
      if (user.isUsernameHasError || user.username.trim() === "") {
        error = true;
        user.isUsernameHasError = true;
      }
    });
    setData(newData);
    if (!error) {
      const newUser = {
        email: "",
        username: "",
      };
      setData((pre) => {
        return [...pre, newUser];
      });
    }
  };

  const handleNewUserDelete = () => {
    const allUsers = [...data];
    allUsers.splice(deletingUserIndex, 1);
    allUsers.forEach((user, i) => {
      if (user.isEmailHasError || user.email.trim() === "") {
        user.isEmailHasError = true;
      }
      if (user.isUsernameHasError || user.username.trim() === "") {
        user.isUsernameHasError = true;
      }
    });
    setData(allUsers);
    setGet(false);
    props.setNewUsersFun(allUsers);
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <TextField
                  required
                  autoComplete="off"
                  id={`input-email-${index}`}
                  type="email"
                  value={item.email}
                  label="Email"
                  size="small"
                  name={"email"}
                  onChange={(e) => changeEmail(e, index)}
                  error={item.isEmailHasError || item.emailError}
                  helperText={
                    item.isEmailHasError ? item.emailErrorMessage : item.emailError
                  }
                  InputLabelProps={{
                    classes: {
                      asterisk: classes.redAsterisk,
                    },
                    style: { fontSize: 12 },
                  }}
                />
              </div>

              <div>
                <TextField
                  required
                  autoComplete="off"
                  id={`input-username-${index}`}
                  label="Username"
                  size="small"
                  name="username"
                  type="text"
                  disabled={props.isEdit}
                  style={{
                    opacity: props.isEdit ? 0.5 : 1,
                    cursor: props.isEdit ? "not-allowed" : "pointer",
                    height: "35px",
                  }}
                  value={item.username}
                  error={item.isUsernameHasError || item.userNameError}
                  helperText={
                    item.isUsernameHasError
                      ? item.userNameErrorMessage
                      : item.userNameError &&
                        "Username already exists in the record"
                  }
                  onChange={(e) =>
                    changeUsername(
                      e,
                      index,
                      item.isUsernameHasError,
                      item.isEmailHasError
                    )
                  }
                  InputLabelProps={{
                    classes: {
                      asterisk: classes.redAsterisk,
                    },
                    style: { fontSize: 12 },
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {data.length > 1 && (
                  <IconButton
                    style={{
                      color: "#F16767",
                      padding: "0px 0px 0px 0px",
                      marginRight: "5px",
                      BoxSizing: "borderBox",
                    }}
                  >
                    <DeleteOutlineIcon
                      style={{ marginTop: "15px" }}
                      onClick={() => {
                        setDeletingUserIndex(index);
                        setGet(true);
                      }}
                    />
                  </IconButton>
                )}

                {!props.isEdit && (
                  <Button
                    style={{
                      color:
                        item.isEmailHasError || item.isUsernameHasError
                          ? "#567189"
                          : "var(--dashboardBgColor)",
                      opacity:
                        item.isEmailHasError || item.isUsernameHasError
                          ? 0.5
                          : 1,
                      visibility:
                        data.length - 1 !== index ? "hidden" : "visible",
                    }}
                    disabled={item.isEmailHasError || item.isUsernameHasError}
                    onClick={addNewUser}
                  >
                    <Tooltip
                      title="Add New User"
                      placement="bottom"
                      color="var(--colorforwhite)"
                    >
                      <GroupAddIcon
                        style={{
                          color: "var(--colorforwhite)",
                          marginTop: "15px",
                        }}
                      />
                    </Tooltip>
                  </Button>
                )}
                <DeletePopUp
                  userRowData={userRowData}
                  boolVar={get}
                  setBoolVarFun={setGet}
                  handleYesButnFn={handleNewUserDelete}
                />
              </div>
            </div>
          </div>
        );
      })}
      {/* //<br/> */}
      {props.showGroupTextField && (
        <div className="text-align1">
          <TextField
            required
            id="group-textfield"
            label="Group"
            size="small"
            name="group"
            type="text"
            style={{ width: "82%", height: "35px" }}
            value={props.groupValue}
            disabled
            InputLabelProps={{ style: { fontSize: 12 } }}
          />
        </div>
      )}
      {props.showGroupDropdown ? (
        allGroups.length < 0 ? (
          <Box
            style={{ height: "auto", width: "100%", padding: "3px" }}
            border="1px solid"
          >
            <div className="mainText">
              <div className="subText1">
                <div id="icon">
                  <InfoIcon fontSize="small" />
                </div>
                <div id="subText2">Get Started Groups</div>
              </div>
              <div>
                <Button
                  style={{ textTransform: "none", fontSize: "14px" }}
                  id="btn-3"
                  size="medium"
                  onClick={handleOpen}
                >
                  Create Group
                </Button>
                <Dialog open={openGroup}>
                  <CreateGroup
                    title="Create User Group"
                    open={openGroup}
                    handleClose={() => setOpenGroup(false)}
                  />
                </Dialog>
              </div>
            </div>
          </Box>
        ) : (
          <div className="text-align1">
            <FormControl
              style={{ width: "82%" }}
              size="small"
              //variant="outlined"
            >
              <InputLabel
                id="demo-mutiple-checkbox-label"
                style={{ fontSize: 12 }}
              >
                Groups
                <span style={{ color: "red" }}> *</span>
              </InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                name="groupid"
                label="Groups"
                value={personName}
                onChange={(e) => handleChange(e)}
                MenuProps={{
                  style: { width: "82%", fontSize: "12px" },
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
                {allGroups.map((group) => {
                  return (
                    <MenuItem key={group.groupId} value={group.groupId}>
                      <ListItemText primary={group.groupName} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        )
      ) : null}
    </>
  );
}
export default AddUser;
