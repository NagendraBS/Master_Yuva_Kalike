/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Table from "../table/Table";
import { useDispatch, connect } from "react-redux";
import { Edit as EditIcon } from "@material-ui/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "@material-ui/core/Tooltip";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { updateDomainStatus } from "../../services/AdminServices";
import AddDomains from "./AddEnterprise";
import enterpriseActions from "../../actions/enterpriseActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));

let selectedEnterpriseId;
let selectedStatus;
let selectedEnterpriseName;

function Enterprises({ enterpriseData, sidebarFlag }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editDom, setEditDom] = useState();
  const [loading, setLoading] = useState(false);
  const [openModifyDialog, setOpenModifyDialog] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEdit = (rowdata) => {
    if (rowdata.data.status === "A") {
      setEditDom(rowdata.data);
      setOpenDialog(true);
    } else {
      toast.error("Cannot edit a deactivated Enterprise");
    }
  };

  const columns = [
    {
      headerName: "Name",
      field: "enterpriseName",
      headerTooltip: "Name",
      tooltipField: "enterpriseName",
      valueGetter: (params) => {
        return `${params.data.enterpriseName}-${params.data.enterpriseCode}`;
      },
    },
    {
      headerName: "Type",
      field: "enterpriseType",
      headerTooltip: "Type",
      tooltipField: "enterpriseName",
    },
    {
      headerName: "Current Status",
      field: "status",
      headerTooltip: "Current Status",
      cellRendererFramework: (rowData) => (
        <span>{rowData.data.status === "A" ? "Active" : "Deactive"}</span>
      ),
      tooltipField: "enterpriseName",
    },
    {
      headerName: "Actions",
      headerTooltip: "Actions",
      cellRendererFramework: (rowData) => (
        <div style={{ marginTop: "0.2rem" }}>
          {rowData.data.status === "D" ? (
            <Tooltip title="Activate Enterprise">
              <CancelIcon
                style={{ color: "#FF0000", cursor: "pointer" }}
                onClick={() => onModifyStatus(rowData)}
                variant={"contained"}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Dectivate Enterprise">
              <CheckCircleIcon
                style={{ color: "#4BB543", cursor: "pointer" }}
                onClick={() => onModifyStatus(rowData)}
                variant={"contained"}
              />
            </Tooltip>
          )}
          {
            <Tooltip title="Edit Enterprise">
              <EditIcon
                style={{ color: "#0067a5", cursor: "pointer", marginLeft: 10 }}
                onClick={() => {
                  handleEdit(rowData);
                }}
              />
            </Tooltip>
          }
        </div>
      ),
      filter: false,
      floatingFilter: false,
      resizable: false,
    },
  ];

  useEffect(() => {
    dispatch(enterpriseActions.getAllDomains());
  }, []);

  const handleDeactivateDom = async () => {
    setLoading(true);
    const resp = await updateDomainStatus(selectedEnterpriseId, "D");
    if (resp.status === 200) {
      toast.success("Enterprise deactivated succesfully");
      dispatch(enterpriseActions.getAllDomains());
      setOpenModifyDialog(null);
      setLoading(false);
    }
  };

  const handleActivateDom = async () => {
    setLoading(true);
    const resp = await updateDomainStatus(selectedEnterpriseId, "A");
    if (resp.status === 200) {
      toast.success("Enterprise Activated succesfully");
      setOpenModifyDialog(null);
      setLoading(false);
      dispatch(enterpriseActions.getAllDomains());
    }
  };

  const onModifyStatus = async (rowData) => {
    selectedEnterpriseId = rowData.data.enterpriseId;
    selectedStatus = rowData.data.status;
    selectedEnterpriseName = rowData.data.enterpriseName;
    setOpenModifyDialog(true);
  };

  const onCloseModifyStatus = () => {
    setOpenModifyDialog(null);
  };

  const handleDomainDialog = () => {
    dispatch(enterpriseActions.getAllDomains());
    setOpenDialog(!openDialog);
  };

  return (
    <>
      <AddDomains
        handleDomainDialog={handleDomainDialog}
        openDialog={openDialog}
        editDom={editDom}
        title="Edit Enterprise"
      />
      <div style={{ marginLeft: "5%" }}>
        <div
          style={{ marginTop: "50px", marginLeft: sidebarFlag ? "8%" : "0%" }}
        >
          <h3
            style={{
              margin: "0px",
              textAlign: "start",
              fontWeight: "bold",
              color: "#000",
              marginBottom: 5,
            }}
          >
            Enterprise
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
            open={openModifyDialog}
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
                <CloseIcon onClick={onCloseModifyStatus} />
              </IconButton>
            </div>
            <DialogContent>
              {selectedStatus === "A" ? (
                <div>
                  Are you sure want to deactivate Enterprise{" "}
                  <span
                    style={{
                      color: "var(--dashboardBgColor)",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedEnterpriseName}
                  </span>{" "}
                  ?
                </div>
              ) : (
                <div>
                  Are you sure want to activate Enterprise{" "}
                  <span
                    style={{
                      color: "var(--dashboardBgColor)",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedEnterpriseName}
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
                onClick={onCloseModifyStatus}
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
                    ? handleDeactivateDom
                    : handleActivateDom
                }
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Table
            id="Domaintable"
            columns={columns}
            data={enterpriseData}
            isGlobalCustomSeachFunctionRequired
          />
        </div>
      </div>
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

function mapStateToProps(state) {
  const { enterprise, main } = state;
  return {
    enterpriseData: enterprise.enterpriseData,
    sidebarFlag: main.sidebarFlag,
  };
}

export default connect(mapStateToProps)(Enterprises);
