import React from "react";
import Table from "../table/Table";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import DeletePopUpdashboard from "./DeletePopUpdashboard";
import { useNavigate } from "react-router-dom";
import { Divider } from "@material-ui/core";

function DashboardList() {
  const updateDashboardDetails = useSelector(
    (state) => state.dashboardtable.allDashboardData
  );

  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);
  const roleName = JSON.parse(localStorage.getItem("roleName"));

  const navigate = useNavigate();

  const columns = [
    {
      headerName: "Dashboard ID",
      field: "dashboardId",
      headerTooltip: "Dashboard ID",
      tooltipField: "dashboardName",
    },
    {
      headerName: "Dashboard Name",
      field: "dashboardName",
      headerTooltip: "Dashboard Name",
      tooltipField: "dashboardName",
      cellRendererFramework: (rowData) => (
        <span
          onClick={() => {
            sessionStorage.setItem("applicationId", rowData.data.dashboardId);
            sessionStorage.setItem("dashboardName", rowData.data.dashboardName);
            navigate(
              `../dashboard/${rowData?.data.dashboardName?.split(" ").join("")}`
            );
          }}
          style={{ cursor: "pointer", color: "#3f51b5" }}
        >
          {rowData?.data.dashboardName}
        </span>
      ),
    },
    {
      headerName: "Group Name",
      field: "groupName",
      headerTooltip: "Group Name",
      tooltipField: "dashboardName",
    },

    {
      headerName: "Actions",
      headerTooltip: "Actions",
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }),
      cellRendererFramework: (rowData) => {
        return <DeletePopUpdashboard userRowData={rowData.data} />;
      },
      filter: false,
      floatingFilter: false,
      tooltipField: "dashboardName",
      hide: roleName === "ENDUSER" ? true : false,
      resizable: false,
    },
  ];

  return (
    <>
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
            Dashboard List
          </h3>
        </div>
        <Divider style={{marginLeft:sidebarFlag ? "8%" : "0%",width:sidebarFlag ? "79%" : "99%"}}/>
        

        <div>
          <Table
            columns={columns}
            data={updateDashboardDetails}
            isGlobalCustomSeachFunctionRequired
          />
        </div>
      </div>
    </>
  );
}

export default DashboardList;
