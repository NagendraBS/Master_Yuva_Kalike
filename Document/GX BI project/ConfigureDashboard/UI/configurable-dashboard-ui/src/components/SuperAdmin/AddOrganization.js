/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  saveOrganization,
  updateOrganization,
} from "../../services/AdminServices";
import { makeStyles } from "@material-ui/core/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  redAsterisk: {
    color: "red",
  },
});
const AddOrganization = ({
  handleOrgDialog,
  openDialog,
  orgData,
  editOrg,
  title,
}) => {
  const classes = useStyles();
  const lanId = JSON.parse(localStorage.getItem("userInfo"))?.lanId;
  const actorId = JSON.parse(localStorage.getItem("userInfo"))?.actorId;
  const [disableSubmit, setDisableSubmit] = useState(true);
  const listOrganisation = useSelector((state) => state.administration.listOrg);
  const enterPriseIds = JSON.parse(localStorage.getItem("enterpriseId"));
  const loginEnterpriseId = JSON.parse(
    localStorage.getItem("userInfo")
  )?.enterpriseId;
  const loggedInEnterpriseName = enterPriseIds?.filter((obj) => {
    return obj.enterpriseId === loginEnterpriseId;
  })[0].enterpriseName;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    createdBy: "",
    organizationName: "",
    organizationAcronnym: "",
    orgAdminEmail: "",
    enterpriseName: "",
    organizationId: "",
    lanId: "",
    actorId: "",
    organisationNameError: true,
    organisationAdminLanIdError: true,
    organisationAdminEmailError: true,
  });
  const [orgHasError, setOrgHasError] = useState({
    orgNameError: false,
    orgNameErrMsg: "",
    orgEnterpriseErr: false,
    orgEnterpriseErrMsg: "",
    orgAdminLanIdErr: false,
    orgAdminLanIdErrmsg: "",
    orgAdminEmailErr: false,
    orgAdminEmailErrMsg: "",
  });

  useEffect(() => {
    if (editOrg) {
      setData({
        ...data,
        createdBy: editOrg.createdBy,
        organizationName: editOrg.organizationName,
        organizationAcronnym: editOrg.organizationAcronym,
        orgAdminEmail: editOrg.email,
        enterpriseName: editOrg.enterpriseId,
        organizationId: editOrg.organizationId,
        orgAdminLanId: editOrg.lanId,
        actorId: editOrg.actorId,
      });
      setDisableSubmit(true);
    }
    if (openDialog === false) {
      setData({
        ...data,
        createdBy: lanId,
        organizationName: "",
        organizationAcronnym: "",
        orgAdminLanId: "",
        orgAdminEmail: "",
        enterpriseName: "",
        organizationId: "",
        actorId: actorId,
        organisationNameError: false,
        organisationAdminLanIdError: false,
        organisationAdminEmailError: false,
      });
      setDisableSubmit(true);
      setOrgHasError(false);
    }
  }, [openDialog]);
  let currentOrgNames = [];
  let currentOrgAdminLanIds = [];
  let currentOrgAdminEmails = [];
  listOrganisation[0]?.map((x) => {
    currentOrgNames.push(x.organizationName);
    currentOrgAdminLanIds.push(x.lanId);
    currentOrgAdminEmails.push(x.email);
  });
  const handleChange = async (e) => {
    const updatedData = { ...data };
    if (e.target.name === "organizationName") {
      if (currentOrgNames.indexOf(e.target.value) === -1) {
        updatedData["organisationNameError"] = false;
        setData(updatedData);
      } else {
        if (editOrg && editOrg.organizationName === e.target.value) {
          updatedData["organisationNameError"] = false;
          setData(updatedData);
        } else {
          updatedData["organisationNameError"] = true;
          setData(updatedData);
        }
      }
      updatedData[e.target.name] = e.target.value;
    } else if (e.target.name === "orgAdminLanId") {
      if (currentOrgAdminLanIds.indexOf(e.target.value) === -1) {
        updatedData["organisationAdminLanIdError"] = false;
        setData(updatedData);
      } else {
        if (editOrg && editOrg.lanId === e.target.value) {
          updatedData["organisationAdminLanIdError"] = false;
          setData(updatedData);
        } else {
          updatedData["organisationAdminLanIdError"] = true;
          setData(updatedData);
        }
      }
      updatedData[e.target.name] = e.target.value;
    } else if (e.target.name === "orgAdminEmail") {
      if (currentOrgAdminEmails.indexOf(e.target.value) === -1) {
        updatedData["organisationAdminEmailError"] = false;
        setData(updatedData);
      } else {
        if (editOrg && editOrg.email === e.target.value) {
          updatedData["organisationAdminEmailError"] = false;
          setData(updatedData);
        } else {
          updatedData["organisationAdminEmailError"] = true;
          setData(updatedData);
        }
      }
      updatedData[e.target.name] = e.target.value;
    }
    await setData(updatedData);
    if (
      data.organizationName &&
      data.orgAdminEmail &&
      data.orgAdminLanId &&
      !editOrg &&
      updatedData["organisationNameError"] === false &&
      updatedData["organisationAdminEmailError"] === false &&
      updatedData["organisationAdminLanIdError"] === false
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    if (
      editOrg &&
      editOrg.organizationName === updatedData.organizationName &&
      editOrg.lanId === updatedData.orgAdminLanId &&
      editOrg.email === updatedData.orgAdminEmail
    ) {
      setDisableSubmit(true);
    } else if (
      updatedData.organizationName &&
      updatedData.orgAdminLanId &&
      updatedData.orgAdminEmail &&
      updatedData.organisationNameError === false &&
      updatedData.organisationAdminEmailError === false &&
      updatedData.organisationAdminLanIdError === false
    ) {
      const emailParts = updatedData.orgAdminEmail.split("@");
      if (emailParts.length === 2 && emailParts[1].trim().length > 0) {
        setDisableSubmit(false); // Enable submit button if email has one character after "@"
      } else {
        setDisableSubmit(true); // Disable submit button if email doesn't have one character after "@"
      }
    } else {
      setDisableSubmit(true); // Disable submit button if email doesn't have one character after "@"

      // Disable submit button if org name or email is empty
    }
  };

  const handleSubmit = async () => {
    const orgAry = orgData?.map((obj) => {
      return obj.organizationName;
    });

    if (!editOrg && orgAry && orgAry.indexOf(data.organizationName) !== -1) {
      setOrgHasError({
        ...orgHasError,
        orgNameError: true,
        orgNameErrMsg: "Organization Name is already exist",
      });
    } else {
      if (data.organizationName === "") {
        setOrgHasError({
          ...orgHasError,
          orgNameError: true,
          orgNameErrMsg: "Organization name should not be empty",
        });
      }
      if (data.orgAdminLanId === "") {
        setOrgHasError({
          ...orgHasError,
          orgAdminLanIdErr: true,
          orgAdminLanIdErrmsg: "Organization Admin Lan Id should not be empty",
        });
      }
      if (data.orgAdminEmail === "" || undefined) {
        setOrgHasError({
          ...orgHasError,
          orgAdminEmailErr: true,
          orgAdminEmailErrMsg: "Organization Admin email should not be empty",
        });
      } else {
        const datas = {
          createdBy: lanId,
          organizationName: data?.organizationName,
          orgAdminEmail: data?.orgAdminEmail,
          enterpriseId: loginEnterpriseId,
          organizationId: data?.organizationId,
          actorId: data?.actorId,
          orgAdminLanId: data?.orgAdminLanId,
        };
        try {
          setLoading(true);
          var resp;
          if (editOrg) {
            resp = await updateOrganization(datas);
            if (resp.status === 200) {
              toast.success("Organization updated successfully"); //resp?.data
              handleOrgDialog();
            }
          } else {
            resp = await saveOrganization(datas);
            if (resp.status === 200) {
              toast.success(resp?.data?.status);
              handleOrgDialog();
            }
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    }
  };
  return (
    <>
      <Dialog
        open={openDialog}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
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
          <DialogTitle id="customized-dialog-title" onClose={handleOrgDialog}>
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            style={{ color: "var(--colorforwhite)" }}
          >
            <CloseIcon onClick={handleOrgDialog} />
          </IconButton>
        </div>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                id="organizationName"
                label="Organization Name"
                value={data.organizationName}
                name="organizationName"
                type="text"
                required
                error={orgHasError.orgNameError || data.organisationNameError}
                helperText={
                  orgHasError.orgNameError
                    ? orgHasError.orgNameErrMsg
                    : "" || data.organisationNameError
                    ? "Organization Name Already Exists in the Record"
                    : ""
                }
                onChange={(e) => {
                  setOrgHasError({
                    ...orgHasError,
                    orgNameError: false,
                    orgNameErrMsg: "",
                  });
                  if (e.target.value === "") {
                    setOrgHasError({
                      ...orgHasError,
                      orgNameError: true,
                      orgNameErrMsg: "Organization name should not be empty",
                    });
                  }
                  handleChange(e);
                }}
                InputLabelProps={{
                  classes: {
                    asterisk: classes.redAsterisk,
                  },
                  style: { fontSize: 12 },
                }}
                style={{ marginBottom: "8px", height: "35px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                autoComplete="off"
                margin="dense"
                id="orgAdminLanId"
                label="OrgAdminLanId"
                value={data.orgAdminLanId}
                name="orgAdminLanId"
                type="text"
                error={
                  orgHasError.orgAdminLanIdErr ||
                  data.organisationAdminLanIdError
                }
                helperText={
                  orgHasError.orgAdminLanIdErr
                    ? orgHasError.orgAdminLanIdErrmsg
                    : "" || data.organisationAdminLanIdError
                    ? "Organisation Admin LanId Already Exists in the Record"
                    : ""
                }
                onChange={(e) => {
                  setOrgHasError({
                    ...orgHasError,
                    orgAdminLanIdErr: false,
                    orgAdminLanIdErrmsg: "",
                  });
                  if (e.target.value === "") {
                    setOrgHasError({
                      ...orgHasError,
                      orgAdminLanIdErr: true,
                      orgAdminLanIdErrmsg:
                        "Organization Admin Lan Id should not be empty",
                    });
                  }
                  handleChange(e);
                }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                style={{ marginBottom: "8px" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                id="EnterpriseName"
                label="Enterprise Name"
                value={loggedInEnterpriseName}
                name="EnterpriseName"
                required
                disabled
                style={{ height: "35px" }}
                InputLabelProps={{
                  classes: {
                    asterisk: classes.redAsterisk,
                  },
                  style: { fontSize: 12 },
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <TextField
                margin="dense"
                id="orgAdminEmail"
                label="Admin Email"
                value={data.orgAdminEmail}
                name="orgAdminEmail"
                type="email"
                autoComplete="off"
                //variant="standard"
                required
                error={
                  orgHasError.orgAdminEmailErr ||
                  data.organisationAdminEmailError
                }
                helperText={
                  orgHasError.orgAdminEmailErr
                    ? orgHasError.orgAdminEmailErrMsg
                    : "" || data.organisationAdminEmailError
                    ? "Organisation Admin EmailId Already Exists in the Record"
                    : ""
                }
                onChange={(e) => {
                  setOrgHasError({
                    ...orgHasError,
                    orgAdminEmailErr: false,
                    orgAdminEmailErrMsg: "",
                  });
                  if (e.target.value === "") {
                    setOrgHasError({
                      ...orgHasError,
                      orgAdminEmailErr: true,
                      orgAdminEmailErrMsg:
                        "Organization Admin Email should not be empty",
                    });
                  }
                  handleChange(e);
                }}
                InputLabelProps={{
                  classes: {
                    asterisk: classes.redAsterisk,
                  },
                  style: { fontSize: 12 },
                }}
                style={{ marginBottom: "8px", height: "35px" }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOrgDialog}
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
          <button
            onClick={handleSubmit}
            disabled={
              disableSubmit ||
              orgHasError.orgNameError ||
              orgHasError.orgAdminEmailErr ||
              orgHasError.orgAdminLanIdErr
            }
            style={{
              color: "var(--colorforwhite)",
              height: 36.5,
              width: 64,
              backgroundColor: disableSubmit
                ? "var(--dashboardBgColor)"
                : "var(--dashboardBgColor)",
              fontSize: "14px",
              textTransform: "none",
              border: "none",
              cursor: disableSubmit ? "not-allowed" : "pointer",
              opacity: disableSubmit ? 0.5 : 1,
            }}
            variant="contained"
          >
            Submit
          </button>
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
    </>
  );
};
export default AddOrganization;
