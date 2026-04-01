/* eslint-disable array-callback-return */
import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./formUtils.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: 200,
  },
}));

export const SelectBox = ({
  filterName,
  value,
  name,
  options,
  label,
  multiple,
  handleSelectChange,
  filterType,
  filterId,
  isViewFilterOnVar,
}) => (
  <FormControl
    style={{ width: "55%", marginLeft: "30px", marginBottom: "20px" }}
  >
    <InputLabel id="demo-simple-select-label">{filterName}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      name={name}
      value={value}
      label={filterName}
      onChange={(e) =>
        handleSelectChange(e, e.target.value, e.target.name, filterId)
      }
      disabled={isViewFilterOnVar}
    >
      {options.map((option) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const DateRangeTimePicker = ({
  startDate,
  endDate,
  getDates,
  filterName,
}) => {
  let ranges = {
    "Today Only": [moment(startDate), moment(endDate)],
    "Yesterday Only": [
      moment(startDate).subtract(1, "days"),
      moment(endDate).subtract(1, "days"),
    ],
    "3 Days": [moment(startDate).subtract(3, "days"), moment(endDate)],
  };
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
  };
  let maxDate = moment(startDate).add(24, "hour");
  return (
    <DateTimeRangeContainer
      ranges={ranges}
      start={startDate}
      end={endDate}
      local={local}
      maxDate={maxDate}
      applyCallback={getDates}
    >
      <FormControl
        style={{ width: "100px", marginLeft: "20px", marginTop: "-13px" }}
        size="small"
      >
        <TextField
          autoFocus
          margin="dense"
          id="groupName"
          type="text"
          // fullWidth
          value={`${startDate}-${endDate}`}
          label={filterName}
        />
      </FormControl>
    </DateTimeRangeContainer>
  );
};

export const DateRangePickerComponent = ({
  startDate,
  endDate,
  getDates,
  width,
  marginLeft,
  filterName,
  filterId,
}) => {
  const [focusedInput, setFocusedInput] = React.useState(null);

  return (
    <FormControl
      style={{
        width: "205px",
        marginBottom: "20px",
        marginLeft: `${marginLeft}`,
      }}
      size="small"
    >
      <label id="date-range-label">{filterName}</label>
      <DateRangePicker
        isOutsideRange={() => false}
        labelId="date-range-label"
        label={filterName}
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="start-date-id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="end-date-id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) =>
          getDates(startDate, endDate, filterId)
        } // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        // inputIconPosition="after"
        noBorder
        small
        // withFullScreenPortal
      />
    </FormControl>
  );
};
export const TimePickers = ({
  value,
  handleSelectChange,
  marginLeft,
  filterId,
  filterName,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      style={{ marginLeft: `${marginLeft}`, marginBottom: "20px" }}
      size="small"
    >
      <TextField
        id="time"
        label={filterName}
        name="Time"
        type="time"
        defaultValue=""
        className={classes.textField}
        onChange={(e) =>
          handleSelectChange(e, e.target.value, e.target.name, filterId)
        }
        value={value}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </FormControl>
  );
};
export const DateTimePickers = ({
  value,
  handleSelectChange,
  marginLeft,
  filterId,
  filterName,
}) => {
  const classes = useStyles();

  return (
    <FormControl
      noValidate
      style={{ marginLeft: `${marginLeft}`, marginBottom: "20px" }}
      size="small"
    >
      <TextField
        id="datetime-local"
        label={filterName}
        name="DateTime"
        type="datetime-local"
        defaultValue=""
        className={classes.textField}
        onChange={(e) =>
          handleSelectChange(e, e.target.value, e.target.name, filterId)
        }
        value={value}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
};
export const DatePickers = ({
  value,
  handleSelectChange,
  marginLeft,
  filterId,
  filterName,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      style={{ marginLeft: `${marginLeft}`, marginBottom: "20px" }}
      size="small"
    >
      <TextField
        id="date"
        label={filterName}
        type="date"
        name="Date"
        defaultValue=""
        className={classes.textField}
        onChange={(e) =>
          handleSelectChange(e, e.target.value, e.target.name, filterId)
        }
        value={value}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

export function App({
  filterName,
  value,
  name,
  options,
  label,
  handleSelectChange,
  filterType,
  filterId,
}) {
  return (
    <FormControl
      style={{ width: "55%", marginLeft: "30px", marginBottom: "20px" }}
    >
      <InputLabel id="mutiple-select-label">{filterName}</InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={value}
        name={name}
        onChange={(e) =>
          handleSelectChange(e, e.target.value, e.target.name, filterId)
        }
        renderValue={(value) => value.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={value.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const restAPIResponseSorting = (response) =>{
  let keys = Object.keys(response);
          let currentData;
          keys.map((item) => {
            if (typeof response[item] === "object") {
              if (Array.isArray(response[item])) {
                currentData = response[item];
              }
            }
          });

          let finalresp = currentData ? currentData : response; 
          return finalresp;
}
