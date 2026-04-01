import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Edit as EditIcon } from "@material-ui/icons";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  deleteDatabaseDetails,
  getDatabaseDetails,
} from "../../services/AdminServices";
import "./Database.css";
import Table from "../table/Table";
import mongodb from "../../assets/mongodb.png";
import restapi from "../../assets/api.png";
import postgresql from "../../assets/postgresql.png";
import oracle from "../../assets/oracleIcon.png";
import mysql from "../../assets/mysql.png";
import actions from "../../actions/administrationActions";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));

function BrowseData({ allDatasources, sidebarFlag }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [rowData, setRowData] = useState();

  const columns = [
    {
      headerName: "Data Source",
      field: "dataSourceType",
      headerTooltip: "Data Source",
      tooltipField: "dataSourceName",
      cellRendererFramework: (record) => {
        return (
          <>
            <div
              className="header-color"
              style={{ width: "20rem", justifyContent: "space-between" }}
            >
              <p id="img-div" style={{ marginTop: "0.2rem" }}>
                {imgSwitch(record.data.dataSourceType)}
              </p>
              <p id="text-div" style={{ marginTop: "-0.3rem" }}>
                {record.data.dataSourceType}
              </p>
            </div>
          </>
        );
      },
    },
    {
      headerName: "Display Name",
      field: "dataSourceName",
      headerTooltip: "Display Name",
      tooltipField: "dataSourceName",
    },
    {
      headerName: "Actions",
      headerTooltip: "Actions",
      tooltipField: "dataSourceName",
      cellRendererFramework: (rowData) => (
        <div style={{ marginTop: "0.2rem" }}>
          {
            <Tooltip title="Edit Data Source">
              <EditIcon
                style={{ color: "#0067a5", cursor: "pointer" }}
                onClick={() => onEditDataSource(rowData)}
                variant={"contained"}
              ></EditIcon>
            </Tooltip>
          }
          {
            <Tooltip title="Delete Data Source">
              <DeleteOutline
                style={{ color: "#F16767", marginLeft: "5px" }}
                onClick={() => handleDeletePopup(rowData)}
                variant={"contained"}
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

  const onEditDataSource = async (rowData, e) => {
    let rowDetails = await getDatabaseDetails(rowData.data.dataSourceId);
    navigate("/addDatabase", { state: { rowDetails: rowDetails.data } });
  };

  function imgSwitch(key) {
    switch (key) {
      case "mongodb":
        return <img id="image-div" src={mongodb} alt="" />;
      case "RESTAPI":
        return <img id="image-div" src={restapi} alt="" />;
      case "postgresql":
        return <img id="image-div" src={postgresql} alt="" />;
      case "RDBMS":
        return <img id="image-div" src={oracle} alt="" />;
      case "mysql":
        return <img id="image-div" src={mysql} alt="" />;
      default:
        return <img id="image-div" src={oracle} alt="" />;
    }
  }

  useEffect(() => {
    dispatch(actions.getAllDatasources());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePopup = (rowData) => {
    setOpenPopup(true);
    setRowData(rowData.data);
  };

  const handleDeleteDataSource = async () => {
    let rowDetails = await deleteDatabaseDetails(rowData.dataSourceId);
    try {
      if (rowDetails.status === 200) {
        toast.success("Data Source deleted successfully");
        dispatch(actions.getAllDatasources());
      }
    } catch (err) {
      toast.error(err, { theme: "white", color: "red" });
    }
    setOpenPopup(false);
  };

  return (
    <div style={{ marginLeft: "5%" }}>
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
          Data Source
        </h3>
      </div>
      <Divider style={{marginLeft:sidebarFlag ? "8%" : "0%",width:sidebarFlag ? "79%" : "99%"}}/>

      <div>
        <Dialog
          open={openPopup}
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
            <DialogTitle>Delete Data Source</DialogTitle>
            <IconButton
              aria-label="close"
              style={{ color: "var(--colorforwhite)" }}
            >
              <CloseIcon onClick={() => setOpenPopup(false)} />
            </IconButton>
          </div>
          <DialogContent>
            <div>
              Are you sure you want to delete the &nbsp;
              <span
                style={{ color: "var(--dashboardBgColor)", fontWeight: "bold" }}
              >
                {rowData?.dataSourceType?.charAt(0).toUpperCase() +
                  rowData?.dataSourceType?.slice(1)}
              </span>
              &nbsp; DataSource ?
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
              onClick={() => setOpenPopup(false)}
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
              onClick={() => handleDeleteDataSource()}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Table
          columns={columns}
          data={allDatasources}
          isGlobalCustomSeachFunctionRequired
        />
      </div>
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

function mapStateToProps(state) {
  const { administration, main } = state;
  return {
    allDatasources: administration.listDatasources,
    sidebarFlag: main.sidebarFlag,
  };
}

export default React.memo(connect(mapStateToProps)(BrowseData));
