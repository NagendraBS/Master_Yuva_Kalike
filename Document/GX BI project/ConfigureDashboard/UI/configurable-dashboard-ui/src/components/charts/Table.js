/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect, useMemo } from "react";
import "./Table.css";
import { useSelector } from "react-redux";

function EnhancedTable({ data }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
      cellDataType: false,
    }),
    []
  );
  const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    suppressScrollOnNewData: true,
    headerHeight: 35,
    rowHeight: 32,
  };

  useEffect(() => {
    generateColumns(data);
  }, [data]);

  const generateColumns = (data) => {
    if (data.length > 0) {
      setRows(data);
      const firstRow = data[0];
      const newColumns = Object.keys(firstRow).map((key) => ({
        headerName: key,
        headerTooltip: key,
        field: key,
      }));
      setColumns(newColumns);
    }
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        width: sidebarFlag ? "95%" : "99%",
        marginLeft: sidebarFlag ? "2%" : "0%",
        height: "68.6vh",
        bottom: 13,
        overflowX: "hidden !important",
      }}
    >
      <AgGridReact
        columnDefs={columns}
        rowData={rows}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
}

export default EnhancedTable;
