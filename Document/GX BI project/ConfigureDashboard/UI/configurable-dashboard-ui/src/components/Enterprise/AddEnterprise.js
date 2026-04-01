import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import { saveDomain, updateDomainDetails } from "../../services/AdminServices";

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  redAsterisk: {
    color: "red",
  },
});

const AddEnterprise = ({ handleDomainDialog, editDom, openDialog, title }) => {
  let EnterpriseNameArray = [];
  let EnterpriseCodeArray = [];

  const lanId = JSON.parse(localStorage.getItem("userInfo"))?.lanId;
  const classes = useStyles();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [data, setData] = useState({
    enterpriseName: "",
    enterpriseCode: "",
    enterpriseType: "",
  });
  const [error, setError] = useState({
    enterpriseNameError: false,
    enterpriseCodeError: false,
    enterpriseTypeError: false,
    enterpriseNameMsg: "",
    enterpriseCodeMsg: "",
    enterpriseTypeMsg: "",
  });

  useEffect(() => {
    if (editDom) {
      setData({
        ...data,
        enterpriseName: editDom?.enterpriseName,
        enterpriseCode: editDom?.enterpriseCode,
        enterpriseType: editDom?.enterpriseType,
      });
      setDisableSubmit(true);
    }
    if (openDialog === false) {
      setData({
        enterpriseName: "",
        enterpriseCode: "",
        enterpriseType: "",
      });
      setDisableSubmit(true);
      setError({
        enterpriseNameError: false,
        enterpriseCodeError: false,
        enterpriseTypeError: false,
        enterpriseNameMsg: "",
        enterpriseCodeMsg: "",
        enterpriseTypeMsg: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog]);

  const handleChange = async (e) => {
    const updatedData = { ...data };
    const updatedError = { ...error };

    if (e.target.name === "enterpriseName") {
      if (e.target.value === "") {
        updatedError.enterpriseNameError = true;
        updatedError.enterpriseNameMsg = "Enterprise Name Is Required";
      } else if (EnterpriseNameArray.indexOf(e.target.value) >= 0) {
        if (editDom?.enterpriseName === e.target.value) {
          updatedError.enterpriseNameError = false;
        } else {
          updatedError.enterpriseNameError = true;
          updatedError.enterpriseNameMsg = "Enterprise Name Already Exists";
        }
      } else {
        updatedError.enterpriseNameError = false;
      }
      setError(updatedError);
    }
    if (e.target.name === "enterpriseCode") {
      if (e.target.value === "") {
        updatedError.enterpriseCodeError = true;
        updatedError.enterpriseCodeMsg = "Enterprise Code Is Required";
      } else if (EnterpriseCodeArray.indexOf(e.target.value) >= 0) {
        if (editDom?.enterpriseCode === e.target.value) {
          updatedError.enterpriseCodeError = false;
        } else {
          updatedError.enterpriseCodeError = true;
          updatedError.enterpriseCodeMsg = "Enterprise Code Already Exists";
        }
      } else {
        updatedError.enterpriseCodeError = false;
      }
      setError(updatedError);
    }

    if (e.target.name === "enterpriseType") {
      if (e.target.value === "") {
        updatedError.enterpriseTypeError = true;
        updatedError.enterpriseTypeMsg = "Enterprise Type Is Required";
      } else {
        updatedError.enterpriseTypeError = false;
      }
      setError(updatedError);
    }

    updatedData[e.target.name] = e.target.value;

    setData(updatedData);
    if (
      data.enterpriseName &&
      data.enterpriseCode &&
      data.enterpriseType &&
      !editDom &&
      updatedError.enterpriseNameError === false &&
      updatedError.enterpriseCodeError === false &&
      updatedError.enterpriseTypeError === false
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    if (
      editDom.enterpriseName === updatedData.enterpriseName &&
      editDom.enterpriseCode === updatedData.enterpriseCode &&
      editDom.enterpriseType === updatedData.enterpriseType
    ) {
      setDisableSubmit(true);
    } else if (
      updatedData.enterpriseName &&
      updatedData.enterpriseCode &&
      updatedData.enterpriseType &&
      updatedError.enterpriseNameError === false &&
      updatedError.enterpriseCodeError === false &&
      updatedError.enterpriseTypeError === false
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editDom) {
        const datas = {
          updatedBy: lanId,
          status: editDom?.status,
          enterpriseId: editDom?.enterpriseId,
          enterpriseName: data?.enterpriseName,
          enterpriseCode: data?.enterpriseCode,
          enterpriseType: data?.enterpriseType,
        };
        const resp = await updateDomainDetails(datas);
        if (resp.status === 200) {
          toast.success(resp?.data?.msg);
        }
      } else {
        const datas = {
          createdBy: lanId,
          status: "A",
          enterpriseName: data?.enterpriseName,
          enterpriseCode: data?.enterpriseCode,
          enterpriseType: data?.enterpriseType,
        };
        const resp = await saveDomain(datas);
        if (resp.status === 201) {
          toast.success(resp?.data?.status);
        }
      }
    } catch (err) {
      toast.error(err);
    }
    handleDomainDialog();
  };

  return (
    <>
      <Dialog
        open={openDialog}
        maxWidth="xs"
        //fullWidth
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
            alignItems: "center", // Center vertically
            justifyContent: "space-between",
          }}
        >
          <DialogTitle
            id="customized-dialog-title-domain"
            onClose={handleDomainDialog}
          >
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            style={{ color: "var(--colorforwhite)" }}
          >
            <CloseIcon onClick={handleDomainDialog} />
          </IconButton>
        </div>
        <DialogContent>
          <TextField
            required
            autoFocus
            error={error.enterpriseNameError}
            helperText={
              error.enterpriseNameError ? error.enterpriseNameMsg : ""
            }
            autoComplete="off"
            margin="dense"
            id="enterpriseName"
            label="Enterprise Name"
            value={data.enterpriseName}
            name="enterpriseName"
            type="text"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{
              classes: {
                asterisk: classes.redAsterisk,
              },
              style: { fontSize: 12 },
            }}
          />
          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              required
              autoComplete="off"
              error={error.enterpriseCodeError}
              helperText={
                error.enterpriseCodeError ? error.enterpriseCodeMsg : ""
              }
              margin="dense"
              id="enterpriseCode"
              label="Enterprise Code"
              value={data.enterpriseCode}
              name="enterpriseCode"
              type="text"
              onChange={handleChange}
              InputLabelProps={{
                classes: {
                  asterisk: classes.redAsterisk,
                },
                style: { fontSize: 12 },
              }}
            />
            <TextField
              required
              autoComplete="off"
              error={error.enterpriseTypeError}
              helperText={
                error.enterpriseTypeError ? error.enterpriseTypeMsg : ""
              }
              margin="dense"
              id="enterpriseType"
              label="Enterprise Type"
              value={data.enterpriseType}
              name="enterpriseType"
              type="text"
              onChange={handleChange}
              InputLabelProps={{
                classes: {
                  asterisk: classes.redAsterisk,
                },
                style: { fontSize: 12 },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDomainDialog}
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
              cursor: disableSubmit ? "not-allowed" : "pointer",
              opacity: disableSubmit ? 0.6 : 1,
            }}
          >
            <Button
              onClick={handleSubmit}
              disabled={disableSubmit}
              style={{
                color: "var(--colorforwhite)",
                height: 36.5,
                width: 64,
                borderRadius: 0,
                backgroundColor: "var(--dashboardBgColor)",
                fontSize: "14px",
                textTransform: "none",
                border: "none",
                cursor: disableSubmit ? "not-allowed" : "pointer",
                opacity: disableSubmit ? 0.6 : 1,
              }}
              variant="contained"
            >
              Submit
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
    </>
  );
};

export default AddEnterprise;
