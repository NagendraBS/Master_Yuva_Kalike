import React from "react";
import { useEffect, useState } from "react";
import Table from "../table/Table";
import { Link, useNavigate } from "react-router-dom";
import CustomDialog from "./CreateGroup";
import "../AddUser.css";
import Tooltip from "@material-ui/core/Tooltip";
import { removeGroup } from "../../services/AdminServices";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Backdrop,
  CircularProgress,
  Divider,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import administrationActions from "../../actions/administrationActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));
let selectedGrpId;
let selectedStatus;
let selectedGrpName;

function Groups({ groupsList, sidebarFlag }) {
  const [grpModifyStatus, setGrpModifyStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onGrpStatus = async (rowData) => {
    selectedGrpId = rowData.data.groupId;
    selectedStatus = rowData.data.status;
    selectedGrpName = rowData.data.groupName;
    setGrpModifyStatus(true);
  };

  const onCloseGrpStatus = () => {
    setGrpModifyStatus(null);
  };

  const handleDeactivateGroup = async () => {
    setLoading(true);
    const resp = await removeGroup(selectedGrpId, "D", { status: "D" });
    if (resp.status === 200) {
      toast.success("Group deactivated succesfully");
      dispatch(administrationActions.getAllGroups());
      setGrpModifyStatus(null);
      setLoading(false);
    }
  };
  const handleActivateGroup = async () => {
    setLoading(true);
    const resp = await removeGroup(selectedGrpId, "A", { status: "A" });
    if (resp.status === 200) {
      toast.success("Group activated succesfully");
      dispatch(administrationActions.getAllGroups());
      setGrpModifyStatus(null);
      setLoading(false);
    }
  };

  const columns = [
    {
      headerName: "Group Name",
      field: "groupName",
      headerTooltip: "Group Name",
      cellRendererFramework: (rowData) => (
        <span
          onClick={() => {
            navigate(`./${rowData?.data?.groupName}`, {
              state: { rowData: rowData.data },
            });
          }}
          style={{ cursor: "pointer" }}
        >
          <Link>{rowData?.data?.groupName}</Link>
        </span>
      ),
      tooltipField: "groupName",
    },
    {
      headerName: "Creation Time",
      field: "creationDate",
      headerTooltip: "Creation Time",
      filter: "agDateColumnFilter",
      tooltipField: "groupName",
    },
    {
      headerName: "Status",
      field: "status",
      headerTooltip: "Status",
      cellRendererFramework: (rowData) => (
        <span>{rowData.data.status === "A" ? "Active" : "Deactive"}</span>
      ),
      tooltipField: "groupName",
    },
    {
      headerName: "Actions",
      headerTooltip: "Actions",
      cellRendererFramework: (rowData) => (
        <div style={{ marginTop: "0.2rem" }}>
          {rowData.data.status === "A" ? (
            <Tooltip title="Deactivate Group">
              <CheckCircleIcon
                style={{ color: "#4BB543", cursor: "pointer" }}
                onClick={() => onGrpStatus(rowData)}
                variant={"contained"}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Activate Group">
              <CancelIcon
                style={{ color: "#FF0000", cursor: "pointer" }}
                onClick={() => onGrpStatus(rowData)}
                variant={"contained"}
              />
            </Tooltip>
          )}
        </div>
      ),
      filter: false,
      floatingFilter: false,
      tooltipField: "groupName",
      resizable: false,
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(administrationActions.getAllGroups());
  }, [dispatch]);

  return (
    <div style={{ marginLeft: "5%" }}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ width: "300px" }}
        theme="colored"
        toastStyle={{ backgroundColor: "white", color: "var(--selectedTab)" }}
      />
      <div style={{ marginTop: "50px", marginLeft: sidebarFlag ? "8%" : "0%" }}>
        <h3
          style={{
            margin: "0px",
            textAlign: "start",
            fontWeight: "bold",
            color: "#000",
            marginBottom: 5,
          }}
        >
          Groups
        </h3>
      </div>
      <Divider
        style={{
          marginLeft: sidebarFlag ? "8%" : "0%",
          width: sidebarFlag ? "79%" : "99%",
        }}
      />

      <div>
        <Dialog
          open={grpModifyStatus}
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
              <CloseIcon onClick={onCloseGrpStatus} />
            </IconButton>
          </div>
          <DialogContent>
            {selectedStatus === "A" ? (
              <div>
                Are you sure want to deactivate group{" "}
                <span
                  style={{
                    color: "var(--dashboardBgColor)",
                    fontWeight: "bold",
                  }}
                >
                  {selectedGrpName}
                </span>{" "}
                ?
              </div>
            ) : (
              <div>
                Are you sure want to activate group{" "}
                <span
                  style={{
                    color: "var(--dashboardBgColor)",
                    fontWeight: "bold",
                  }}
                >
                  {selectedGrpName}
                </span>{" "}
                ?
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                color: "var(--colorforwhite)",
                fontSize: "14px",
                textTransform: "none",
              }}
              onClick={onCloseGrpStatus}
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
              onClick={
                selectedStatus === "A"
                  ? handleDeactivateGroup
                  : handleActivateGroup
              }
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Table
        columns={columns}
        data={groupsList}
        onPageTable="Groups"
        isGlobalCustomSeachFunctionRequired
      />

      <CustomDialog
        title="Create User Group"
        open={openDialog}
        handleClose={handleClose}
      />
      <Backdrop style={{ color: "black", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

function mapStateToProps(state) {
  const { administration, main } = state;
  return {
    groupsList: administration.listGroup,
    sidebarFlag: main.sidebarFlag,
  };
}

export default connect(mapStateToProps)(Groups);
