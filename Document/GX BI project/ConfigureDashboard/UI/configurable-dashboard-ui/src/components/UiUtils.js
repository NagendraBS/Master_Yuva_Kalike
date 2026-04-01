import React, { useState } from "react";
import moment from "moment";
import {
  SelectBox,
  DateRangePickerComponent,
  DatePickers,
  App,
  TimePickers,
  DateTimePickers,
} from "../utils/formUtils";

const UiUtils = ({
  filter,
  options,
  filterId,
  handleSelectChange,
  handleAddFilter,
}) => {
  const [startDate, setStartDate] = useState(
    filter?.filterType === "dateRangePicker"
      ? moment(filter.selectedOption.startDate, "MM-DD-YYYY")
      : moment()
  );
  const [endDate, setEndDate] = useState(
    filter?.filterType === "dateRangePicker"
      ? moment(filter.selectedOption.endDate, "MM-DD-YYYY")
      : moment()
  );

  if (filter?.filterType === "dateRangePicker") {
  }

  const getDates = (startDate, endDate, filterId) => {
    setStartDate(startDate);
    setEndDate(endDate);
    handleSelectChange(
      null,
      {
        startDate: moment(startDate).format("MM-DD-YYYY"),
        endDate: moment(endDate).format("MM-DD-YYYY"),
      },
      null,
      filterId
    );
  };

  if (filter?.filterType === "select") {
    return (
      <SelectBox
        filterName={filter?.filterName}
        value={filter?.selectedOption}
        label={filter?.filterName}
        multiple={false}
        options={options}
        handleSelectChange={handleSelectChange}
        filterType={filter?.filterType}
        filterId={filterId}
      />
    );
  } else if (filter?.filterType === "multiSelect") {
    return (
      <App
        filterName={filter?.filterName}
        value={filter?.selectedOption}
        label={filter?.filterName}
        multiple={true}
        options={options}
        handleSelectChange={handleSelectChange}
        filterType={filter.filterType}
        filterId={filterId}
      />
    );
  } else if (filter?.filterType === "dateRangeTimePicker") {
  } else if (filter?.filterType === "dateRangePicker") {
    return (
      <DateRangePickerComponent
        startDate={moment(filter.selectedOption.startDate, "MM-DD-YYYY")}
        endDate={moment(filter.selectedOption.endDate, "MM-DD-YYYY")}
        getDates={getDates}
        width={"80%"}
        marginLeft={"26px"}
        filterName={filter?.filterName}
        filterId={filterId}
      />
    );
  } else if (filter?.filterType === "calendar") {
    return (
      <DatePickers
        handleSelectChange={handleSelectChange}
        value={filter?.selectedOption}
        name={filter?.filterName}
        marginLeft={"20px"}
        filterId={filterId}
        filterName={filter?.filterName}
      />
    );
  } else if (filter?.filterType === "timePicker") {
    return (
      <TimePickers
        handleSelectChange={handleSelectChange}
        value={filter?.selectedOption}
        name={filter?.filterName}
        marginLeft={"20px"}
        filterId={filterId}
        filterName={filter?.filterName}
      />
    );
  } else if (filter?.filterType === "dateTimePicker") {
    return (
      <DateTimePickers
        handleSelectChange={handleSelectChange}
        value={filter?.DateTime}
        name={filter?.filterName}
        marginLeft={"20px"}
        filterId={filterId}
        filterName={filter?.filterName}
      />
    );
  }
  return null;
};

export default UiUtils;
