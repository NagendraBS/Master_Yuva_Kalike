/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DashboardActions from "../actions/dashboardAction";
import { createDashboard, savePanel } from "../services/DashboardServices";
import {
  DateRangePickerComponent,
  DatePickers,
  TimePickers,
  DateTimePickers,
} from "../utils/formUtils";
import "./AddUser.css";
const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});

const AddFilter = ({
  openAddFilter,
  handleAddFilter,
  handleAddFilterPanelLvl,
  selectedDashboard,
  filterId,
  selectedPanel,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [filter, setFilter] = useState({ filterType: "", filterName: "" });
  const [options, setOptions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const filtersData = useSelector((state) => state);
  const [enteredValue, setEnteredValue] = React.useState([]);
  const [validation, setvalidation] = useState({
    FilterNameErr: true,
    timeErr: true,
    dateErr: true,
    dateTimeErr: true,
    filterTypeErr: true,
    dateRangeErr: true,
    enteredValueErr: true,
  });

  const [disableSave, setDisableSave] = useState(true);

  const [error, setError] = useState({
    errorName: false,
    errorNameMsg: "",
  });

  //setting edit form if filter id is available
  useEffect(() => {
    let filterObject = {};
    if (selectedPanel) {
      filterObject = selectedPanel?.metadata?.filters?.find(
        (x) => x.filterId === filterId
      );
    } else {
      filterObject = filtersData?.dashboard?.filters?.find(
        (x) => x.filterId === filterId
      );
    }

    if (filterObject) {
      setDisableSave(false);
      setFilter(filterObject.filter);
      setOptions(filterObject.options);
      if (typeof filterObject.filter.selectedOption === "object") {
        setStartDate(
          moment(filterObject.filter.selectedOption.startDate, "MM-DD-YYYY")
        );
        setEndDate(
          moment(filterObject.filter.selectedOption.endDate, "MM-DD-YYYY")
        );
      }
      if (filterObject.filter.filterType === "calendar") {
        setvalidation({ ...validation, FilterNameErr: false, dateErr: false });
      }
      if (filterObject.filter.filterType === "timePicker") {
        setvalidation({ ...validation, FilterNameErr: false, timeErr: false });
      }
      if (filterObject.filter.filterType === "dateTimePicker") {
        setvalidation({ ...validation, FilterNameErr: false, dateErr: false });
      }
      if (filterObject.filter.filterType === "dateRangePicker") {
        setvalidation({
          ...validation,
          FilterNameErr: false,
          dateRangeErr: false,
        });
      }
      if (filterObject.filter.filterType === "select") {
        setEnteredValue(filterObject?.filter?.selectedOption);
        setvalidation({
          ...validation,
          FilterNameErr: false,
          selectedVal: false,
        });
      }
      if (filterObject.filter.filterType === "multiSelect") {
        setEnteredValue(filterObject?.filter?.selectedOption);
        setvalidation({
          ...validation,
          FilterNameErr: false,
          selectedVal: false,
        });
      }
    }
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedValidations = { ...validation };

    if (filterId) {
      if (enteredValue.length > 0) {
        updatedValidations.enteredValueErr = false;
      } else {
        updatedValidations.enteredValueErr = true;
      }
    }

    if (name === "addedOptions") {
      setEnteredValue(value);
      if (value.length > 0) {
        updatedValidations.enteredValueErr = false;
      } else {
        updatedValidations.enteredValueErr = true;
      }
    }

    //setFilterValidation(updatedValidations);

    if (name === "filterType") {
      // updatedValidations.FilterNameErr=true
      updatedValidations.dateErr = true;
      updatedValidations.dateTimeErr = true;
      updatedValidations.timeErr = true;
      updatedValidations.dateRangeErr = true;
      updatedValidations.enteredValueErr = true;
      setEnteredValue([]);
      setOptions([]);
      if (filter.filterValueType) {
        filter.filterValueType = "";
      }
    }
    //filter name validation
    if (name === "filterName") {
      if (value.length > 0) {
        updatedValidations.FilterNameErr = false;
      } else {
        updatedValidations.FilterNameErr = true;
      }
    }

    //date picker
    if (name === "Date" && value !== "") {
      updatedValidations.dateErr = false;
    } else if (name === "Date" && value === "") {
      updatedValidations.dateErr = true;
    }

    //Time Picker validation
    if (name === "Time" && value !== "") {
      updatedValidations.timeErr = false;
    } else if (name === "Time" && value === "") {
      updatedValidations.timeErr = true;
    }

    //date time picker
    if (name === "DateTime" && value !== "") {
      updatedValidations.dateTimeErr = false;
    } else if (name === "DateTime" && value === "") {
      updatedValidations.dateTimeErr = true;
    }

    //checking

    //setting validation state
    setvalidation(updatedValidations);

    //logic to enable/disbale save button on change
    if (
      (updatedValidations.FilterNameErr === false &&
        updatedValidations.timeErr === false) ||
      (updatedValidations.FilterNameErr === false &&
        updatedValidations.dateErr === false) ||
      (updatedValidations.FilterNameErr === false &&
        updatedValidations.dateTimeErr === false) ||
      (updatedValidations.FilterNameErr === false &&
        updatedValidations.filterTypeErr === false) ||
      (updatedValidations.FilterNameErr === false &&
        updatedValidations.dateRangeErr === false) ||
      (updatedValidations.FilterNameErr === false &&
        updatedValidations.enteredValueErr === false)
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }

    const updatedFilter = { ...filter };

    if (filter.filterValueType === "number" && name !== "filterName") {
      updatedFilter[name] = value.replace(/\D/g, "");
    } else {
      updatedFilter[name] = value;
    }

    if (
      filter.filterType === "calendar" ||
      filter.filterType === "dateRangePicker" ||
      filter.filterType === "timePicker" ||
      filter.filterType === "dateTimePicker"
    ) {
      setOptions([]);
    } else if (
      filter.filterType === "select" ||
      filter.filterType === "multiSelect"
    ) {
      setStartDate("");
      setEndDate("");
      delete updatedFilter.Date;
    }
    setFilter(updatedFilter);
  };

  const addOption = (e) => {
    const { name, value, type } = e.target;
    if (
      type === "click" ||
      (name === "optionName" && value && e.which === 13)
    ) {
      const values = value.split(",");

      const newOptions = [...options, ...values];
      setOptions(Array.from(new Set([...newOptions])));

      const updatedFilter = { ...filter };
      updatedFilter[name] = "";

      if (
        filter.filterType === "select" ||
        filter.filterType === "multiSelect"
      ) {
        delete updatedFilter.Date;
        delete updatedFilter.addedOptions;
      }
      setFilter(updatedFilter);
    }
  };

  const getSelectedValue = (filterName) => {
    if (filterName === "select") {
      if (enteredValue.length > 1) return [enteredValue[0]];
      else return enteredValue;
    } else if (filterName === "multiSelect") {
      return enteredValue;
    } else if (filterName === "dateRangePicker") {
      return {
        startDate: moment(startDate, "MM-DD-YYYY").format("MM-DD-YYYY"),
        endDate: moment(endDate, "MM-DD-YYYY").format("MM-DD-YYYY"),
      };
    } else if (filterName === "calendar") {
      return filter.Date;
    } else if (filterName === "timePicker") {
      return filter.Time;
    } else if (filterName === "DateTimePicker") {
      return filter;
    }
  };
  const saveFilter = async (deleteFilter) => {
    setLoading(true);
    const filterData = { filter, options };
    const { filterIdList } = filtersData?.dashboard;
    let payload;
    let resp;

    if (selectedPanel) {
      filterData.filter.selectedOption = getSelectedValue(
        filter.filterType,
        options
      );

      let pages = [...selectedDashboard.pages];
      pages.map((page, i) => {
        if (page?.pageName === selectedDashboard?.selectedPage?.pageName) {
          let totalFilters;
          page.panelInfos.map((ele, ind) => {
            if (ele.panelId === selectedPanel.panelId) {
              if (filterId) {
                let newData = pages[i].panelInfos[ind].metadata?.filters;

                pages[i].panelInfos[ind].metadata?.filters.map(
                  (filter, index) => {
                    if (filter.filterId === filterId) {
                      if (deleteFilter === true) {
                        newData.splice(index, 1);
                      } else {
                        newData[index] = { ...filterData, filterId };
                      }
                    }
                  }
                );
                totalFilters = newData;
              } else {
                let filterId = 0;
                let length = pages[i].panelInfos[ind].metadata?.filters
                  ? pages[i].panelInfos[ind].metadata?.filters.length
                  : 0;
                if (length !== 0) {
                  filterId =
                    pages[i].panelInfos[ind].metadata?.filters[length - 1]
                      .filterId + 1;
                } else {
                  filterId = 1;
                }
                totalFilters = [
                  ...(pages[i].panelInfos[ind].metadata?.filters
                    ? pages[i].panelInfos[ind].metadata?.filters
                    : []),
                  { ...filterData, filterId },
                ];
              }
              pages[i].panelInfos[ind].metadata = {
                ...pages[i].panelInfos[ind].metadata,

                filters: totalFilters,
              };
              payload = pages[i].panelInfos[ind];
            }
          });
        }
      });
      try {
        resp = await savePanel(selectedDashboard.dashboardId, payload);

        if (resp.status === 200) {
          if (deleteFilter === true) {
            toast.success("Filter deleted Successfully");
          } else if (filterId) {
            toast.success("Filter edited successfully");
          } else {
            toast.success("Filter added successfully");
          }
          dispatch(DashboardActions.addFilterPanelLvl(resp.data));
        }
      } catch (err) {}
      setLoading(true);
      cancelFilter();
    } else {
      filterData.filter.selectedOption = getSelectedValue(
        filter.filterType,
        options
      );

      if (!filter.filterName && deleteFilter !== true) {
        setError({
          ...error,
          errorName: true,
          errorNameMsg: "Please enter FilterName",
        });

        return false;
      }

      if (error.errorName === false) {
        let newFilters = [];
        if (!filterId && deleteFilter !== true) {
          let idAvailable = 0;
          for (let i = 1; i <= 20; i++) {
            if (filterIdList.indexOf(i) === -1) {
              idAvailable = i;
              break;
            }
          }
          filterData.filterId = idAvailable;
        } else {
          newFilters = filtersData?.dashboard?.filters?.filter(
            (x) => x.filterId !== filterId
          );
          if (deleteFilter !== true) {
            newFilters.push({ ...filterData, filterId });
          }
        }
        try {
          const data = {
            dashboardName: selectedDashboard.dashboardName,
            groupName: selectedDashboard.groupName,
            dashboardId: selectedDashboard.dashboardId,
            settings: {
              ...selectedDashboard?.settings,
              filters: filterId
                ? [...newFilters]
                : [...filtersData.dashboard.filters, filterData],
            },
          };
          const resp = await createDashboard(data);
          if (resp.status === 200) {
            if (deleteFilter === true) {
              toast.success("Filter deleted successfully");
            } else if (filterId) {
              toast.success("Filter edited successfully");
            } else {
              toast.success("Filter added successfully");
            }
            cancelFilter();
            dispatch(DashboardActions.addFilter(data.settings));
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          cancelFilter();
          console.error(err);
          toast.error(err.message, { theme: "white", color: "red" });
        }
      }
    }
  };

  const cancelFilter = () => {
    selectedPanel
      ? handleAddFilterPanelLvl(false, selectedPanel)
      : handleAddFilter(false);
    setFilter({});
    setOptions([]);
    setError("");
  };

  const getDates = (startDate, endDate) => {
    const updatedValidations = { ...validation };

    if (
      startDate === null ||
      startDate === "" ||
      endDate === null ||
      endDate === ""
    ) {
      updatedValidations.dateRangeErr = true;
    } else {
      updatedValidations.dateRangeErr = false;
    }
    setvalidation(updatedValidations);
    if (
      updatedValidations.FilterNameErr === false &&
      updatedValidations.dateRangeErr === false
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      <Dialog
        open={openAddFilter}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
        fullWidth
        maxWidth={"xs"}
      >
        <div
          className="headingbtn3"
          style={{
            backgroundColor: "var(--dashboardBgColor)",
            color: "var(--colorforwhite)",
            fontSize: "16px",
            height: "35px",
          }}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => cancelFilter(false)}
            style={{
              color: "var(--colorforwhite)",
              backgroundColor: "var(--dashboardBgColor)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>{filterId ? "Edit Filter" : "Add Filter"}</div>
          </DialogTitle>

          {/* <IconButton
                aria-label="close"
                style={{ color: "var(--colorforwhite)" }}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon onClick={() => cancelFilter(false)} />
              </IconButton> */}
          <IconButton
            aria-label="close"
            style={{ color: "var(--colorforwhite)" }}
          >
            <CloseIcon onClick={() => cancelFilter(false)} />
          </IconButton>
        </div>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="filterName"
            id="filterName"
            label="Filter Name"
            autoComplete="off"
            type="text"
            variant="outlined"
            required
            value={filter.filterName}
            error={error.errorName}
            helperText={error.errorName && error.errorNameMsg}
            onChange={(e) => {
              setError({ ...error, errorName: false });
              if (e.target.value === "") {
                setError({
                  ...error,
                  errorName: true,
                  errorNameMsg: "Filter Name should not be empty",
                });
              }
              handleFilterChange(e);
            }}
            style={{ marginBottom: "0px", width: "395px" }}
            InputLabelProps={{ style: { fontSize: 16 } }}
            InputProps={{ style: { padding: 0 } }}
          />
          <div className="text-align">
            <div className="text-align1">
              <FormControl
                style={{ width: "100%", marginTop: "10px" }}
                size="small"
                variant="outlined"
              >
                <InputLabel id="demo-select-small" required>
                  Filter Type
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter.filterType}
                  name="filterType"
                  label="Filter Type"
                  onChange={handleFilterChange}
                  style={{ width: "193px" }}
                  MenuProps={{
                    style: { height: "170px", width: "193px" },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                  }}
                >
                  <MenuItem value={"select"}>Select </MenuItem>
                  <MenuItem value={"multiSelect"}>Multi Select</MenuItem>
                  <MenuItem value={"calendar"}>Date Picker</MenuItem>
                  <MenuItem value={"dateRangePicker"}>
                    Date Range Picker
                  </MenuItem>
                  <MenuItem value={"timePicker"}>Time Picker</MenuItem>
                  <MenuItem value={"dateTimePicker"}>Date Time Picker</MenuItem>
                </Select>
              </FormControl>
            </div>
            {(filter.filterType === "select" ||
              filter.filterType === "multiSelect") && (
              <React.Fragment>
                <div className="text-align2">
                  <FormControl
                    style={{ width: "100%", marginTop: "10px" }}
                    size="small"
                    variant="outlined"
                  >
                    <InputLabel id="demo-select-small">
                      Filter Value Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filter.filterValueType}
                      name="filterValueType"
                      label="Filter Value Type"
                      onChange={handleFilterChange}
                      style={{ width: "193px" }}
                      MenuProps={{
                        style: { height: "170px", width: "193px" },
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      <MenuItem value={"string"}>String</MenuItem>
                      <MenuItem value={"number"}>Number</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </React.Fragment>
            )}
          </div>

          {filter.filterType === "dateRangePicker" && (
            <div style={{ marginTop: "10px" }}>
              <DateRangePickerComponent
                startDate={startDate}
                endDate={endDate}
                getDates={getDates}
                width="0%"
                marginLeft={0}
              />
            </div>
          )}
          {filter.filterType === "calendar" && (
            <div
              style={{
                marginTop: "10px",
                marginLeft: "-7px",
              }}
            >
              <DatePickers
                name="Date"
                handleSelectChange={handleFilterChange}
                value={filter.Date}
                marginLeft={0}
              />
            </div>
          )}
          {filter.filterType === "timePicker" && (
            <div
              style={{
                marginTop: "10px",
                marginLeft: "-7px",
              }}
            >
              <TimePickers
                label="Basic time picker"
                name="Time"
                handleSelectChange={handleFilterChange}
                value={filter.Time}
                marginLeft={0}
              />
            </div>
          )}

          {filter.filterType === "dateTimePicker" && (
            <div
              style={{
                marginTop: "10px",
                marginLeft: "-7px",
              }}
            >
              <DateTimePickers
                name="DateTime"
                handleSelectChange={handleFilterChange}
                value={filter.DateTime}
                marginLeft={0}
              />
            </div>
          )}
          {(filter.filterType === "select" ||
            filter.filterType === "multiSelect") && (
            <React.Fragment>
              <div className="text-align3">
                <div>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="optionName"
                    id="option"
                    label="Filter Value"
                    variant="outlined"
                    autoComplete="off"
                    value={filter.optionName}
                    disabled={!filter?.filterValueType}
                    onChange={handleFilterChange}
                    onKeyPress={addOption}
                    style={{ marginBottom: "0px", width: "193px" }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                  />
                  <div className="icons-row">
                    <div className="icons">
                      {filter.optionName && (
                        <IconButton aria-label="save">
                          <AddIcon
                            style={{
                              backgroundColor: "var(--dashboardBgColor)",
                              color: "var(--colorforwhite)",
                            }}
                            onClick={() =>
                              addOption({
                                target: {
                                  name: "optionName",
                                  value: filter.optionName,
                                  type: "click",
                                },
                              })
                            }
                          />
                        </IconButton>
                      )}
                    </div>

                    <div className="btn-btn">
                      {enteredValue?.length > 0 && (
                        <IconButton aria-label="remove">
                          <RemoveIcon
                            style={{
                              backgroundColor: "var(--dashboardBgColor)",
                              color: "var(--colorforwhite)",
                              marginLeft: "-10px",
                            }}
                            onClick={() => {
                              setOptions([]);
                              setEnteredValue([]);
                              setDisableSave(true);
                            }}
                          />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }} className="text-align5">
                  <FormControl
                    style={{ width: "100%" }}
                    size="small"
                    variant="outlined"
                  >
                    <InputLabel id="demo-select-small">
                      Entered Value
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      multiple
                      name="addedOptions"
                      label="Entered Value"
                      variant="outlined"
                      style={{ width: "193px" }}
                      value={enteredValue}
                      onChange={handleFilterChange}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={{
                        style: { height: "192px" },
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      {options?.map((name) => {
                        return (
                          <MenuItem key={name} value={name}>
                            <Checkbox
                              defaultChecked={true}
                              style={{ color: "var(--dashboardBgColor)" }}
                              checked={enteredValue.indexOf(name) > -1}
                            />
                            <ListItemText primary={name} />
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </React.Fragment>
          )}
        </DialogContent>

        <DialogActions style={{ padding: "0px" }}>
          {filterId && (
            <Button
              onClick={() => saveFilter(true)}
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                color: "var(--colorforwhite)",
                fontSize: "14px",
                padding: "5px 10px",
                textTransform: "none",
              }}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => cancelFilter(false)}
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
              opacity: disableSave ? 0.6 : 1,
              cursor: disableSave ? "not-allowed" : "pointer",
            }}
          >
            <Button
              autoFocus
              disabled={disableSave}
              onClick={saveFilter}
              style={{
                color: "var(--colorforwhite)",
                height: 36.5,
                width: 64,
                borderRadius: 0,
                backgroundColor: "var(--dashboardBgColor)",
                fontSize: "14px",
                textTransform: "none",
                border: "none",
              }}
            >
              Save
            </Button>
          </div>
        </DialogActions>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          style={{ width: "300px" }}
          theme="colored"
          toastStyle={{ backgroundColor: "white", color: "var(--color)" }}
        />
      </Dialog>
      <Backdrop style={{ color: "black", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AddFilter;
