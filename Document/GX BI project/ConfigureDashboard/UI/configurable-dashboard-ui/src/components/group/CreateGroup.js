/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {
  IconButton,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogTitle,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import { createGroups, updateGroups } from "../../services/AdminServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import administartionActions from "../../actions/administrationActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getOrganization } from "../../services/AdminServices";

const styles = (theme) => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogContent = withStyles(() => ({
  root: {
    padding: "0px 24px",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  redAsterisk: {
    color: "red",
  },
});

export default function CustomDialog({ title, open, handleClose, groupDatas }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
  const lanId = JSON.parse(localStorage.getItem("userInfo"))?.lanId;
  const userRole = JSON.parse(localStorage.getItem("roleName"));
  const [details, setDetails] = useState({
    groupName: "",
    description: "",
    selectOrganization: "",
    groupNameError: true,
  });

  const [disableSaveGroup, setDisableSaveGroup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [groupError, setGroupError] = useState(false);
  const [allOrgs, setAllOrgs] = useState([]);

  const allUsersData = useSelector((state) => state.administration.listGroup);

  useEffect(() => {
    if (groupDatas) {
      setDetails({
        ...details,
        groupName: groupDatas?.groupName,
        description: groupDatas?.description,
        selectOrganization: groupDatas?.selectOrganization,
      });
      setDisableSaveGroup(true);
    }
    if (open === false) {
      setDetails({
        ...details,
        groupName: "",
        description: "",
        selectOrganization: "",
      });
      setDisableSaveGroup(true);
      setGroupError(false);
    }
  }, [open]);

  let currentValue = [];
  allUsersData.map((x) => {
    currentValue.push(x.groupName);
  });

  const handleChangeGroup = async (e) => {
    const newDetails = { ...details };
    if (e.target.name === "groupName") {
      if (currentValue.indexOf(e.target.value) === -1) {
        setGroupError(false);
        newDetails["groupNameError"] = false;
        setDetails(newDetails);
      } else if (groupDatas?.groupName === e.target.value) {
        setGroupError(false);
        newDetails["groupNameError"] = false;
        setDetails(newDetails);
      } else {
        setGroupError(true);
        newDetails["groupNameError"] = true;
        setDetails(newDetails);
      }
    }
    newDetails[e.target.name] = e.target.value;

    await setDetails(newDetails);

    if (groupDatas) {
      if (
        userRole === "SUPERADMIN" &&
        groupDatas &&
        groupDatas.groupName === newDetails.groupName &&
        groupDatas.description === newDetails.description &&
        groupDatas.selectOrganization === newDetails.selectOrganization
      ) {
        setDisableSaveGroup(true);
      } else if (
        userRole !== "SUPERADMIN" &&
        groupDatas &&
        groupDatas.groupName === newDetails.groupName &&
        groupDatas.description === newDetails.description
      ) {
        setDisableSaveGroup(true);
      } else {
        setDisableSaveGroup(false);
      }
    } else {
      if (
        userRole === "SUPERADMIN" &&
        newDetails.groupName &&
        newDetails.description &&
        newDetails.selectOrganization &&
        !groupDatas &&
        newDetails.groupNameError === false
      ) {
        setDisableSaveGroup(false);
      } else if (
        userRole !== "SUPERADMIN" &&
        newDetails.groupName &&
        newDetails.description &&
        !groupDatas &&
        newDetails.groupNameError === false
      ) {
        setDisableSaveGroup(false);
      } else {
        setDisableSaveGroup(true);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      var resp;
      if (groupDatas) {
        const data = {
          groupName: details.groupName,
          description: details.description,
          selectOrganization: details.selectOrganization,
          groupId: groupDatas?.groupId,
          createdBy: lanId,
          status: groupDatas.status,
        };

        resp = await updateGroups(data);
        navigate(`./../${groupDatas?.groupName}`, {
          state: { rowData: data },
        });
        if (resp?.status === 200) {
          toast.success("Group edited succesfully");
          dispatch(administartionActions.updateGroup());
        }
      } else {
        const data = {
          groupName: details.groupName,
          description: details.description,
          selectOrganization: details.selectOrganization,
          organizationId:
            userRole === "SUPERADMIN" ? details.selectOrganization : orgId,
          createdBy: lanId,
        };
        resp = await createGroups(data);
        if (resp?.status === 200) {
          toast.success("Group created succesfully");
          dispatch(administartionActions.updateGroup());
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { theme: "white", color: "red" });
    }
    handleClose();
  };

  const getAllOrgs = async () => {
    try {
      if (allOrgs.length === 0) {
        const org = await getOrganization();

        if (org.data) {
          const filteredOrgs = org.data.filter((org) => org.status === "A");
          setAllOrgs(filteredOrgs);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllOrgs();
  }, []);

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
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
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            style={{ color: "var(--colorforwhite)" }}
          >
            <CloseIcon onClick={handleClose} />
          </IconButton>
        </div>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              margin="dense"
              error={groupError}
              helperText={groupError ? "Group Name already exists" : ""}
              name="groupName"
              label="Group Name"
              type="text"
              size="small"
              autoComplete="off"
              value={details.groupName}
              onChange={handleChangeGroup}
              style={{ height: "35px" }}
              InputLabelProps={{
                classes: {
                  asterisk: classes.redAsterisk,
                },
                style: { fontSize: 12 },
              }}
              required
            />
            <TextField
              name="description"
              label="Description"
              size="small"
              minRows={2}
              maxRows={4}
              autoComplete="off"
              required
              value={details.description}
              onChange={handleChangeGroup}
              style={{ height: "35px", marginTop: "8px", marginLeft: "5px" }}
              InputLabelProps={{
                classes: {
                  asterisk: classes.redAsterisk,
                },
                style: { fontSize: 12 },
              }}
            />
          </div>
          <div>
            {userRole === "SUPERADMIN" && (
              <FormControl
                style={{ width: "100%", marginTop: "10px" }}
                size="small"
              >
                <InputLabel
                  id="demo-mutiple-checkbox-label"
                  style={{ fontSize: 12 }}
                >
                  Organization
                  <span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  name="selectOrganization"
                  label="Organisations"
                  value={details.selectOrganizationorgName}
                  size="small"
                  onChange={handleChangeGroup}
                  MenuProps={{
                    style: { height: "150px", width: "100%", fontSize: "12px" },
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
                  {allOrgs.map((org) => (
                    <MenuItem
                      key={org.organizationId}
                      value={org.organizationId}
                    >
                      {org.organizationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              color: "var(--colorforwhite)",
              backgroundColor: "var(--dashboardBgColor)",
              fontSize: "14px",
              margin: "10px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <div
            style={{
              opacity: disableSaveGroup ? 0.6 : 1,
              cursor: disableSaveGroup ? "not-allowed" : "pointer",
            }}
          >
            <Button
              autoFocus
              disabled={disableSaveGroup}
              onClick={handleSave}
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
            >
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ width: "300px" }}
        theme="colored"
        toastStyle={{ backgroundColor: "white", color: "var(--selectedTab)" }}
      />
      <Backdrop style={{ color: "black", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
