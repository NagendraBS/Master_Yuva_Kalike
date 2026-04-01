import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PopupState from "material-ui-popup-state";
import AddUser from "./AddUser";
import DeletePopUp from "./DeletePopUp";
import { deleteUserDetails, updateUser } from "../services/AdminServices";
import administartionActions from "../actions/administrationActions";

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});

function Popup({ userRowData }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editData, setEditData] = useState();
  const [loading, setLoading] = useState(false);
  const [hasErrInEditUser, setHasErrInEditUser] = useState(true);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const classes = useStyles();

  const [usersGroupId, setUsersGroupId] = useState();
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
  const handleOk = (e) => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setHasErrInEditUser(true);
  };
  const changeCancel = () => {
    setOpen(false);
    setHasErrInEditUser(true);
  };

  const handleUserDelete = () => {
    setOpenDelete(true);
  };

  const updateUserDetails = async () => {
    const resp = await deleteUserDetails(userRowData.actorId);
    try {
      if (resp.status === 200) {
        toast.success("User deleted successfully");
      }
    } catch (err) {
      toast.error(err, { theme: "white", color: "red" });
    }
    setOpenDelete(false);
    dispatch(administartionActions.getAllUsers());
  };

  const handleEditUser = (data) => {
    setEditData(data);
    if (
      data[0].isEmailHasError ||
      data[0].isUsernameHasError ||
      data[0].emailError
    ) {
      setHasErrInEditUser(true);
    } else if (userRowData.email === data[0].email) {
      setHasErrInEditUser(true);
    } else {
      setHasErrInEditUser(false);
    }
  };

  const handleSaveEditUser = async (data) => {
    const emailAry = editData?.map((obj) => {
      return obj.email;
    });

    const groupAry = usersGroupId;

    setOpen(false);

    var dataObj = {
      actorId: userRowData.actorId,
      lanId: [userRowData.lanId],
      email: emailAry === undefined ? [userRowData.email] : emailAry,
      organizationId: orgId,
      createdBy: "tsing",
      groupId: groupAry === undefined ? userRowData.groupId : groupAry,
      existingGroupId: userRowData.groupId,
    };
    try {
      setLoading(true);
      await updateUser(dataObj);
      toast.success("Users updated successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.message, { theme: "white", color: "red" });
    }
    navigate("/user");
    setTimeout(() => {
      dispatch(administartionActions.getAllUsers());
    }, 500);
  };

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Box className="box-popup" style={{ display: "flex", gap: "7px" }}>
              <div>
                <Tooltip title="Edit User" placement="bottom">
                  <IconButton
                    color="primary"
                    id="btn-5"
                    style={{ padding: "0" }}
                  >
                    <Button
                      onClick={handleOk}
                      style={{
                        padding: "0",
                        minWidth: "unset",
                        textTransform: "none",
                        fontSize: "14px",
                      }}
                    >
                      <Edit style={{ color: "#0067a5" }} />
                    </Button>
                  </IconButton>
                </Tooltip>
                <Dialog
                  style={{ alignItems: "center" }}
                  open={open}
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
                    }}
                  >
                    <DialogTitle>Edit User</DialogTitle>
                    <IconButton
                      aria-label="close"
                      style={{ color: "var(--colorforwhite)" }}
                    >
                      <CloseIcon onClick={changeCancel} />
                    </IconButton>
                  </div>

                  <DialogContent
                    style={{ padding: "20px", overflow: "initial" }}
                  >
                    <AddUser
                      userRowData={userRowData}
                      isEdit={true}
                      setNewUsersFun={handleEditUser}
                      setGroupIdFn={setUsersGroupId}
                      setHasErrInEditUser={setHasErrInEditUser}
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
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <div
                      style={{
                        opacity: hasErrInEditUser ? 0.6 : 1,
                        cursor: hasErrInEditUser ? "not-allowed" : "pointer",
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
                        disabled={hasErrInEditUser}
                        onClick={handleSaveEditUser}
                      >
                        Save
                      </Button>
                    </div>
                  </DialogActions>
                </Dialog>
              </div>

              <div>
                <div>
                  <Tooltip title="Delete User" placement="bottom">
                    <IconButton
                      color="secondary"
                      id="btn-6"
                      style={{ padding: "0" }}
                    >
                      <Button
                        onClick={handleUserDelete}
                        style={{
                          padding: "0",
                          minWidth: "unset",
                          textTransform: "none",
                          fontSize: "14px",
                        }}
                      >
                        <DeleteOutline style={{ color: "#F16767" }} />
                      </Button>
                    </IconButton>
                  </Tooltip>
                </div>
                <DeletePopUp
                  boolVar={openDelete}
                  userRowData={userRowData}
                  setBoolVarFun={setOpenDelete}
                  handleYesButnFn={updateUserDetails}
                />
              </div>
            </Box>
          </div>
        )}
      </PopupState>
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

export default Popup;
