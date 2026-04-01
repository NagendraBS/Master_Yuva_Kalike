import React, { useEffect, useState } from "react";
import Table from "../table/Table";
import AddOrganization from "./AddOrganization";
import { removeOrg } from "../../services/AdminServices";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { Edit as EditIcon } from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import administrationActions from "../../actions/administrationActions";

const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));

let selectedOrgId;
let selectedStatus;
let selectedOrgname;

function Organization() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editOrg, setEditOrg] = useState();
  const [loading, setLoading] = useState(false);
  const [openModifyDialog, setOpenModifyDialog] = useState(false);
  const dispatch = useDispatch();
  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);
  const OrganizationData = useSelector((state) => state.administration.listOrg);
  const classes = useStyles();

  const handleEdit = (rowData) => {
    if (rowData.data.status === "A") {
      setEditOrg(rowData.data);
      setOpenDialog(true);
    } else {
      toast.error("Cannot edit a deactivated organization");
    }
  };

  const columns = [
    {
      headerName: "Organization Name",
      field: "organizationName",
      headerTooltip: "Organization Name",
      tooltipField: "organizationName",
    },
    {
      headerName: "Email",
      field: "email",
      headerTooltip: "Email",
      tooltipField: "organizationName",
    },
    {
      headerName: "Created By",
      field: "createdBy",
      headerTooltip: "Created By",
      tooltipField: "organizationName",
    },
    {
      headerName: "Created Date",
      field: "creationDate",
      headerTooltip: "Created Date",
      filter: "agDateColumnFilter",
      tooltipField: "organizationName",
    },

    {
      headerName: "Updated Date",
      field: "updateDate",
      headerTooltip: "Updated Date",
      filter: "agDateColumnFilter",
      tooltipField: "organizationName",
    },

    {
      headerName: "Current Status",
      field: "status",
      headerTooltip: "Current Status",
      cellRendererFramework: (rowData) => (
        <span>{rowData.data.status === "A" ? "Active" : "Deactive"}</span>
      ),
      tooltipField: "organizationName",
    },
    {
      headerName: "Actions",
      field: "organizationId",
      headerTooltip: "Actions",
      cellRendererFramework: (rowData) => (
        <div style={{ marginTop: "0.2rem" }}>
          {rowData.data.status === "A" ? (
            <Tooltip title="Deactive Organization">
              <CheckCircleIcon
                style={{ color: "#4BB543", cursor: "pointer" }}
                onClick={() => onModifyStatus(rowData)}
                variant={"contained"}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Activate Organization">
              <CancelIcon
                style={{ color: "#FF0000", cursor: "pointer" }}
                onClick={() => onModifyStatus(rowData)}
                variant={"contained"}
              />
            </Tooltip>
          )}
          {
            <Tooltip title="Edit Organization">
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
      tooltipField: "organizationName",
      resizable: false,
    },
  ];

  useEffect(() => {
    dispatch(administrationActions.getAllOrgs());
  }, [dispatch]);

  const handleDeactivateOrg = async () => {
    setLoading(true);
    const resp = await removeOrg(selectedOrgId, "D", { status: "D" });
    if (resp.status === 200) {
      toast.success("Organization deactivated succesfully");
      dispatch(administrationActions.getAllOrgs());
      setOpenModifyDialog(null);
      setLoading(false);
    }
  };
  const handleActivateOrg = async () => {
    setLoading(true);
    const resp = await removeOrg(selectedOrgId, "A", { status: "A" });
    if (resp.status === 200) {
      toast.success("Organization activated succesfully");
      dispatch(administrationActions.getAllOrgs());
      setOpenModifyDialog(null);
      setLoading(false);
    }
  };
  const onModifyStatus = async (rowData) => {
    selectedOrgId = rowData.data.organizationId;
    selectedStatus = rowData.data.status;
    selectedOrgname = rowData.data.organizationName;
    setOpenModifyDialog(true);
  };

  const onCloseModifyStatus = () => {
    setOpenModifyDialog(null);
  };

  const handleOrgDialog = () => {
    dispatch(administrationActions.getAllOrgs());
    setOpenDialog(!openDialog);
  };

  return (
    <>
      <AddOrganization
        handleOrgDialog={handleOrgDialog}
        openDialog={openDialog}
        editOrg={editOrg}
        orgData={OrganizationData[0]}
        title="Edit Organization"
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
            Organization
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
                  Are you sure want to deactivate organization{" "}
                  <span
                    style={{
                      color: "var(--dashboardBgColor)",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedOrgname}
                  </span>{" "}
                  ?
                </div>
              ) : (
                <div>
                  Are you sure want to activate organization{" "}
                  <span
                    style={{
                      color: "var(--dashboardBgColor)",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedOrgname}
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
                    ? handleDeactivateOrg
                    : handleActivateOrg
                }
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Table
            id="Organizationtable"
            title="Organization"
            columns={columns}
            data={OrganizationData[0]}
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

export default Organization;
