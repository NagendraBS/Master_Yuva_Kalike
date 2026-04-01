import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddUser.css";
import Popup from "./Popup";
import Table from "./table/Table";
import administartionActions from "../actions/administrationActions";
import { Divider } from "@material-ui/core";

function User() {
  const columns = [
    {
      headerName: "Username",
      field: "lanId",
      headerTooltip: "Username",
      tooltipField: "lanId",
    },
    {
      headerName: "Email",
      field: "email",
      headerTooltip: "Email",
      tooltipField: "lanId",
    },
    {
      headerName: "Group",
      field: "groupName",
      headerTooltip: "Group",
      tooltipField: "lanId",
    },
    {
      headerName: "Role",
      field: "roleName",
      headerTooltip: "Role",
      render: (rowData, _record) => {
        return (
          rowData.data.roleName.charAt(0).toUpperCase() +
          rowData.data.roleName.slice(1).toLowerCase()
        );
      },
      tooltipField: "lanId",
    },
    {
      headerName: "Actions",
      headerTooltip: "Actions",
      cellStyle: () => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
      cellRendererFramework: (rowData) => (
        <>
          <Popup userRowData={rowData.data} />
        </>
      ),
      filter: false,
      floatingFilter: false,
      tooltipField: "lanId",
      resizable: false,
    },
  ];

  const dispatch = useDispatch();
  const allUsersData = useSelector(
    (state) => state.administration.allUsersData
  );

  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);
  useEffect(() => {
    dispatch(administartionActions.getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Users
        </h3>
      </div>
      <Divider style={{marginLeft:sidebarFlag ? "8%" : "0%",width:sidebarFlag ? "79%" : "99%"}}/>

      <div>
        <Table
          columns={columns}
          data={allUsersData}
          isGlobalCustomSeachFunctionRequired
        />
      </div>
    </div>
  );
}

export default User;
