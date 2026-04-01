import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PopupState from "material-ui-popup-state";
import { deleteDashboard } from "../../services/DashboardServices";
import dashboardtableAction from "../../actions/dashboardtableAction";

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});

function DeletePopUpdashboard({ userRowData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasErrInEditUser,setHasErrInEditUser] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOk = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const changeCancel = () => {
    setOpen(false);
  };

  const deletedb = async () => {
    setLoading(true);
    const resp = await deleteDashboard(userRowData.dashboardId);
    try {
      if (resp.status === 200) {
        toast.success("Dashboard Deleted Successfully");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err, { theme: "white", color: "red" });
    }
    setOpen(false);
    dispatch(dashboardtableAction.getAllDashboards());
  };

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Box
              className="box-popup"
              style={{ display: "flex", gap: "10px", paddingLeft: "10px" }}
            >
              <div>
                <Tooltip title="Delete Dashboard" placement="bottom">
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
                      <DeleteOutline
                        style={{ color: "#F16767" }}
                        className="px-2"
                      />
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
                      minWidth: "400px",
                    }}
                  >
                    <DialogTitle>Delete Dashboard</DialogTitle>
                    <IconButton
                      aria-label="close"
                      style={{ color: "var(--colorforwhite)" }}
                    >
                      <CloseIcon onClick={changeCancel} />
                    </IconButton>
                  </div>
                  <DialogContent>
                    Are you sure you want to delete{" "}
                    <span
                      style={{
                        color: "var(--dashboardBgColor)",
                        fontWeight: "bold",
                      }}
                    >
                      {userRowData.dashboardName}
                    </span>{" "}
                    Dashboard ?
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
                      No
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
                        onClick={deletedb}
                      >
                        Yes
                      </Button>
                    </div>
                  </DialogActions>
                </Dialog>
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

export default DeletePopUpdashboard;
