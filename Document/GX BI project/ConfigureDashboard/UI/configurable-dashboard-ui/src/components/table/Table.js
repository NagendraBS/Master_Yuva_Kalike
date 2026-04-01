/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo,
  forwardRef,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Table.css";

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} style={{ color: "#F16767" }} />
  )),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

function EnhancedTable({
  title,
  data = [],
  onRowSelected,
  actions,
  columns, // Use columns array directly,
  isGlobalCustomSeachFunctionRequired = false,
  onPageTable,
}) {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [searchText, setSearchText] = useState("");
  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);
  const [lastPageFlag, setLastPageFlag] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState("370px");

  const groupTableCondition =
    onPageTable === "UsersGroup" || onPageTable === "Permissions";

  const textFormatter = (inputText) =>
    inputText?.replaceAll(" ", "")?.toLowerCase();

  const filterParams = {
    comparator: (dateFromFilter, cellValue) => {
      if (cellValue == null) {
        return 0;
      }
      const dateParts = cellValue.split("-");
      var cellDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
      );
      if (cellDate < dateFromFilter) {
        return -1;
      }
      if (cellDate > dateFromFilter) {
        return 1;
      }
      return 0;
    },
    browserDatePicker: true,
    textFormatter,
  };

  const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    suppressScrollOnNewData: true,
    onFirstDataRendered: onFirstDataRendered,
    headerHeight: 38,
    rowHeight: 33,
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
      cellDataType: false,
      filterParams: filterParams,
      filter: true,
    }),
    []
  );

  function onFirstDataRendered(params) {
    params.api.paginationGoToPage(0);
  }

  function onPageSizeChanged() {
    var arrayPageSize = document.getElementsByClassName("page-size");
    var value = arrayPageSize[arrayPageSize.length - 1].value;
    gridRef.current.api.paginationSetPageSize(Number(value));
   
  }

  const customFilter = (searchStr, tableData) => {
    let finalSearchData = {};
    const splittedSearch = searchStr.split(" ");
    tableData.forEach((dataRow, rowIndex) => {
      columns.forEach((column) => {
        if (
          splittedSearch.every((str) => {
            return dataRow[column["field"]]
              ?.toString()
              ?.replaceAll(" ", "")
              ?.toLowerCase()
              ?.includes(str?.toLowerCase());
          })
        ) {
          finalSearchData[rowIndex] = dataRow;
        }
      });
    });
    return Object.values(finalSearchData);
  };

  const getTableData = () => {
    if (searchText.trim() && isGlobalCustomSeachFunctionRequired) {
      return customFilter(searchText, data);
    }
    return data;
  };

  const onPaginationChanged = useCallback(() => {
    const rowCount =
      gridRef.current.api.paginationGetRowCount() -
      gridRef.current.api.paginationGetPageSize() *
        (gridRef.current.api.paginationGetTotalPages() - 1);
    const currentPage = gridRef.current.api.paginationGetCurrentPage() + 1;
    const lastPage = gridRef.current.api.paginationGetTotalPages();
    const arrayGridSize = document.getElementsByClassName("ag-theme-alpine");
    const userTableHeight = onPageTable === "AddUser" ? "320px" : "408px";
    if (currentPage === lastPage) {
      setLastPageFlag(true);
      if (rowCount <= 5) {
        setDynamicHeight(gridRef.current.api.setDomLayout("autoHeight"));
      } else {
        setDynamicHeight(gridRef.current.api.setDomLayout("normal"));
        document
          .getElementsByClassName("ag-theme-alpine")
          .item(arrayGridSize.length - 1).style.height = userTableHeight;
      }
    } else {
      if (getTableData().length === 0) {
        setDynamicHeight(gridRef.current.api.setDomLayout("normal"));
        document
          .getElementsByClassName("ag-theme-alpine")
          .item(arrayGridSize.length - 1).style.height = "230px";
      } else {
        setLastPageFlag(false);
        setDynamicHeight(gridRef.current.api.setDomLayout("normal"));
        document
          .getElementsByClassName("ag-theme-alpine")
          .item(arrayGridSize.length - 1).style.height = userTableHeight;
      }
    }
  }, [getTableData]);
  
  return (
    <div>
      <div
        style={{
          width: sidebarFlag ? "87%" : "99%",
          height: "2.3rem",
          display: "flex",
          justifyContent: "flex-end",
          color: "var(--color)",
          marginTop: 10,
          marginLeft:
            sidebarFlag && groupTableCondition
              ? "13%"
              : sidebarFlag && onPageTable === "AddUser" ? "10%"
              : groupTableCondition
              ? "1%"
              : "0%",
        }}
      >
        <TextField
          type="search"
          placeholder="Search"
          variant="outlined"
          classes={{
            root: "textfield-root", // Create a CSS class for the root element
            notchedOutline: "textfield-notched-outline", // Create a CSS class for the outline
          }}
          onChange={(event) => {
            if (isGlobalCustomSeachFunctionRequired) {
              return setSearchText(event.target.value.trim());
            }
            gridApi.setQuickFilter(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            ),
            style: { color: "#000", paddingRight: 0, height: 35 }, // Change input text color
          }}
        />
      </div>
      <div
        className="example-header"
        style={{
          fontSize: 14,
          marginLeft:sidebarFlag && groupTableCondition
          ? "0%": sidebarFlag && onPageTable === "AddUser" ? "2%": sidebarFlag ? "8%" : onPageTable === "AddUser"
          ? "2.2%": "0%",
          whiteSpace: "nowrap",
        }}
      >
        Row Selection:
        <select
          onChange={onPageSizeChanged}
          className="page-size"
          style={{
            marginLeft: 5,
            width: 50,
            height: 20,
            color: "#000",
            backgroundColor: "#f9f5fa",
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div
        id="myGrid"
        className={"ag-theme-alpine"}
        style={{
          width:
            sidebarFlag && groupTableCondition
              ? "100%"
              : sidebarFlag && onPageTable === "AddUser" ? "95%"
              : sidebarFlag
              ? "79%"
              : groupTableCondition
              ? "100%"
              : onPageTable === "AddUser" ? "95%"
              : "99%",
          marginLeft:
            sidebarFlag && groupTableCondition
              ? "0%"
              : sidebarFlag && onPageTable === "AddUser" ? "2%"
              : sidebarFlag
              ? "8%"
              : groupTableCondition
              ? "0%"
              : onPageTable === "AddUser"
              ? "2.2%"
              : "0%",
          height: lastPageFlag ? dynamicHeight : 408,
          position: "relative",
          bottom: 13,
        }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          rowData={getTableData()}
          actions={actions}
          title={title}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          enableBrowserTooltips={true}
          onSelectionChanged={onRowSelected}
          onGridReady={(params) => {
            setGridApi(params.api);
          }}
          gridOptions={gridOptions}
          onPaginationChanged={onPaginationChanged}
        />
      </div>
    </div>
  );
}

export default memo(EnhancedTable);
