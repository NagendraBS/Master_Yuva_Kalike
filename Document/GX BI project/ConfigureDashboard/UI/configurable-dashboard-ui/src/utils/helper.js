import Charts from "../components/charts/Chart";
import PieChart from "../components/charts/PieChart";
import Singlestat from "../components/charts/Singlestat";
import BarChart from "../components/charts/BarChart"
import EnhancedTable from "../components/charts/Table";
import DonutChart from "../components/charts/DonutChart";
import MultiYAxis from "../components/charts/MultiYAxis";
import CircularGauge from "../components/charts/CircularGauge";
import {
  lineChartConfig,
  pieChartConfig,
  singleStatConfig,
  barChartConfig,
  donutChartConfig,
  circularGaugeChartConfig,
  MultiYAxisChartConfig,
} from "./Config";

export const renderChart = (
  page,
  type,
  chartType,
  chartData,
  settingsData,
  setSettingsData,
  defaultData,
  config,
  drillDownPopup
) => {
  switch (type) {
    case "chart":
      return getChart(
        page,
        type,
        chartType,
        chartData,
        settingsData,
        setSettingsData,
        defaultData,
        drillDownPopup
      );
    case "table":
      return (
        <EnhancedTable
          type={type}
          data={chartData}
          settingsData={settingsData}
        />
      );
    default:
      return (
        <Charts
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
          drillDownPopup={drillDownPopup}
        />
      );
  }
};
const getChart = (
  page,
  type,
  chartType,
  chartData,
  settingsData,
  setSettingsData,
  defaultData,
  drillDownPopup,
  config
) => {
  switch (chartType) {
    case "line":
    case "area":
      return (
        <Charts
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
          drillDownPopup={drillDownPopup}
        />
      );
    case "pie":
      return (
        <PieChart
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
          drillDownPopup={drillDownPopup}
          dataSourceConfig={config}
        />
      );
    case "bar":
      return (
        <BarChart
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
          drillDownPopup={drillDownPopup}
          dataSourceConfig={config}
        />
      );
    case "donut":
      return (
        <DonutChart
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
        // drillDownPopup={drillDownPopup}
        />
      );
    case "radialBar":
      return (
        <CircularGauge
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
        // drillDownPopup={drillDownPopup}
        />
      );

    case "singlestat":
      return (
        <Singlestat
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
        // drillDownPopup={drillDownPopup}
        />
      );

    case "histogram":
      return (
        <MultiYAxis
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
        // drillDownPopup={drillDownPopup}
        />
      );
    default:
      return (
        <Charts
          page={page}
          type={type}
          chartType={chartType}
          data={chartData}
          settingsData={settingsData}
          setSettingsData={setSettingsData}
          defaultData={defaultData}
        // drillDownPopup={drillDownPopup}
        />
      );
  }
};

export const chartConfig = ({ chartType, formData, onChange }) => {
  switch (chartType) {
    case "line":
    case "area":
      return lineChartConfig(formData, onChange);
    case "pie":
      return pieChartConfig(formData, onChange);
    case "bar":
      return barChartConfig(formData, onChange);
    case "donut":
      return donutChartConfig(formData, onChange);
    case "radialBar":
      return circularGaugeChartConfig(formData, onChange);
    case "singlestat":
      return singleStatConfig(formData, onChange);
    case "histogram":
      return MultiYAxisChartConfig(formData, onChange);
    default:
      return lineChartConfig(formData, onChange);
  }
};
export const getUpdatedQuery = (query, filters) => {
  if (filters && filters !== null) {
    let updatedQuery = query;
    filters.forEach((element) => {
      const filter = element.filter?.filterName;
      let value = `'${element.filter?.selectedOption}'`;
      switch (element.filter?.filterType) {
        case "select":
          value = getValues(
            element.filter?.filterType,
            element.filter?.filterValueType,
            element.filter?.selectedOption
          );
          break;
        case "multiSelect":
          value = `(${getValues(
            element.filter?.filterType,
            element.filter?.filterValueType,
            element.filter?.selectedOption
          )})`;
          break;
        case "dateRangePicker":
          value = `startDate = ${getValues(
            element.filter.filterType,
            element.filter.filterValueType,
            element.filter.selectedOption.startDate
          )} AND endDate = ${getValues(
            element.filter.filterType,
            element.filter.filterValueType,
            element.filter.selectedOption.endDate
          )}`;
          break;
        default:
          break;
      }
      var re = new RegExp(`{{${filter}}}`, "g");
      updatedQuery = updatedQuery.replace(re, value);
    });
    return updatedQuery;
  } else {
    return query;
  }
};

const getValues = (filterType, valueType, data) => {
  if (valueType === "number") {
    if (filterType === "multiSelect") {
      return data?.toString();
    }
    return data;
  } else {
    if (filterType === "multiSelect") {
      let string = data?.toString();
      let updatedString = "'" + string.split(",").join("','") + "'";
      return updatedString;
    }
    return `'${data}'`;
  }
};

export const haveAccess = (allowedRoles) => {
  const roleName = JSON.parse(localStorage.getItem("roleName"));
  const canAccess = allowedRoles.includes(roleName);
  return canAccess;
};

export const getDateAndTime = () => {
  let newDate = new Date();
  let date = newDate.getDate().toString();
  date = date < 10 ? `0${date}` : date;
  let month = (newDate.getMonth() + 1).toString();
  month = month < 10 ? `0${month}` : month;
  let year = newDate.getFullYear().toString();

  let time = newDate.toLocaleTimeString("en-US");
  let dateAndTime = `${date}-${month}-${year} ${time} IST`;

  return dateAndTime;
};
