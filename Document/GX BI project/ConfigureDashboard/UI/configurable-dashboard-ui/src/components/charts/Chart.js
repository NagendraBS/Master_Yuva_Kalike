/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import Chart from "react-apexcharts";
import { getDatabaseDetails } from "../../services/AdminServices";
import { getDrillDown } from "../../services/DashboardServices";

const Charts = ({
  page,
  chartType,
  data,
  settingsData,
  setSettingsData,
  defaultData,
  drillDownPopup
}) => {
  const requestData = {
    dataSourceType: defaultData?.metadata?.dataSourceType,
    applicationId: defaultData?.applicationId,
    panelId: defaultData?.panelId,
    host: defaultData?.metadata?.host,
    schema: defaultData?.metadata?.schema,
    query: defaultData?.metadata?.query,
    pageId: defaultData?.pageId,
    dataSourceId: defaultData?.metadata?.dataSourceId
  }
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        height: "100%",
        width: "100%",
        events: {
          click: async function (event, chartContext, config) {
            let label = config?.config?.labels[config?.dataPointIndex];
            let x = requestData.query.replace("limit", `where ${settingsData?.data?.value}='${label}' limit`);
            requestData.query = x;
            const getDataSourceResp = await getDatabaseDetails(requestData.dataSourceId);
            const respData = getDataSourceResp.data;
            requestData.cacheFlag = false;
            requestData.connectionType = requestData?.dataSourceType && requestData?.dataSourceType.trim();
            const drillDownData = await getDrillDown(respData, x);
            drillDownPopup(requestData, drillDownData.data.data);
          }
        }
      },
      xaxis: {
        categories: [],
        show: true,
        title: {
          text: "",
        },
      },
      yaxis: {
        show: true,
        title: {
          text: "",
        },
      },
      zaxis: {
        show: true,
        title: {
          text: "",
        },
      },
      legend: {
        show: true,
      },
    },
    series: [],
  });

  useEffect(() => {
    const xAxis = [];
    const yAxis = [];
    const zAxis = [];
    let temp = [...data];
    let groupedData = {};
    let groupedDataCompare = {};
    let categories = [];
    let compareData = {};
    let series = [];
    temp.sort(
      (a, b) =>
        a[settingsData?.xAxisData?.value] - b[settingsData?.xAxisData?.value]
    );
    if (settingsData?.comparison?.value === "None") {
      temp.forEach((element) => {
        xAxis.push(element[settingsData?.xAxisData?.value]);
        yAxis.push(element[settingsData?.yAxisData?.value]);
        zAxis.push(element[settingsData?.zAxisData?.value]);
      });
      categories = xAxis;
      series = [
        {
          name:
            settingsData?.yAxisDisplayName?.value ||
            settingsData?.yAxisData?.value,
          type: chartType,
          data: yAxis,
        },
        {
          name:
            settingsData?.zAxisDisplayName?.value ||
            settingsData?.zAxisData?.value,
          type: chartType,
          data: zAxis,
        },
      ];
    } else {
      temp.forEach((element) => {
        groupedData[element[settingsData?.xAxisData?.value]] = groupedData?.[
          element[settingsData?.xAxisData?.value]
        ]
          ? [...groupedData?.[element[settingsData?.xAxisData?.value]], element]
          : [element];
        groupedDataCompare[element[settingsData?.comparison?.value]] =
          groupedDataCompare?.[element[settingsData?.comparison?.value]]
            ? [
                ...groupedDataCompare?.[
                  element[settingsData?.comparison?.value]
                ],
                element,
              ]
            : [element];
        categories.push(element[settingsData?.xAxisData?.value]);
        xAxis.push(element[settingsData?.xAxisData?.value]);
        yAxis.push(element[settingsData?.yAxisData?.value]);
        zAxis.push(element[settingsData?.zAxisData?.value]);
      });
      categories = [...new Set(categories)];
      for (const key in groupedDataCompare) {
        categories.forEach((category) => {
          let value = 0;
          groupedDataCompare[key].forEach((item) => {
            if (category === item[settingsData?.xAxisData?.value]) {
              value = item[settingsData?.yAxisData?.value];
            }
          });
          compareData[key] = compareData?.[key]
            ? [...compareData?.[key], value]
            : [value];
        });
      }
      for (const key in compareData) {
        series.push({
          name: key,
          data: compareData[key],
          type: chartType,
        });
      }
    }

    const yMin =
      settingsData?.yAxisMinValue?.value &&
      settingsData?.yAxisMinValue?.value !== ""
        ? parseInt(settingsData?.yAxisMinValue?.value)
        : undefined;
    const yMax =
      settingsData?.yAxisMaxValue?.value &&
      settingsData?.yAxisMaxValue?.value !== ""
        ? parseInt(settingsData?.yAxisMaxValue?.value)
        : undefined;
    const zMin =
      settingsData?.zAxisMinValue?.value &&
      settingsData?.zAxisMinValue?.value !== ""
        ? parseInt(settingsData?.zAxisMinValue?.value)
        : undefined;
    const zMax =
      settingsData?.zAxisMaxValue?.value &&
      settingsData?.zAxisMaxValue?.value !== ""
        ? parseInt(settingsData?.zAxisMaxValue?.value)
        : undefined;

    let tempData = {
      ...chartData,
      options: {
        ...chartData.options,
        xaxis: {
          show: settingsData?.xAxis ? settingsData?.xAxis?.value : true,
          title: {
            ...chartData?.options?.xaxis?.title,
            text:settingsData?.xAxis?.value
            ? settingsData?.xAxisDisplayName?.value
            : typeof settingsData?.xAxis?.value == "undefined"
            ? settingsData?.xAxisDisplayName?.value
            : ""
          },
          labels: {
            show: settingsData?.xAxis ? settingsData?.xAxis?.value : true,
          },
          axisBorder: {
            show: settingsData?.xAxis ? settingsData?.xAxis?.value : true,
          },
          axisTicks: {
            show: settingsData?.xAxis ? settingsData?.xAxis?.value : true,
          },
          categories: categories,

          type:
            settingsData?.orientation?.value === "Horizontal" ? "" : "category",
        },

        yaxis: {
          show: settingsData?.yAxis ? settingsData?.yAxis?.value : true,
          title: {
            ...chartData?.options?.yaxis?.title,
            text: settingsData?.yAxisDisplayName?.value,
          },
          min: yMin,
          max: yMax,
        },

        zaxis: {
          show: settingsData?.zAxis ? settingsData?.zAxis?.value : true,
          title: {
            ...chartData?.options?.zaxis?.title,
            text: settingsData?.zAxisDisplayName?.value,
          },
          min: zMin,
          max: zMax,
        },
        legend: {
          show: settingsData?.legend ? settingsData?.legend?.value : true,
        },
        fill: {
          opacity: chartType === "area" ? 0.2 : 1,
        },
      },
      series: series,
    };
    if (chartType === "bar") {
      tempData.options.plotOptions = {
        bar: {
          borderRadius: 0,
          horizontal: settingsData?.orientation?.value === "Horizontal",
        },
      };
      tempData.options.chart = {
        stacked: settingsData?.stacked?.value,
      };
    }
    setChartData(tempData);
  }, [chartType, data, settingsData]);

  const getDefaultValues = (type) => {
    if (page === "query") {
      let headers = [];
      let axisValues = [];
      Object.keys(data[0]).forEach((item) => {
        headers.push({
          label: item,
          key: item,
        });
        axisValues.push(item);
      });
      const tempData = { ...settingsData };
      let xAxisData = {
        value: headers[0].label,
        options: axisValues,
      };
      let yAxisData = {
        //issue
        value: headers[1]?.label,
        options: axisValues,
      };
      let zAxisData = {
        value: headers[1]?.label,
        options: axisValues,
      };
      tempData.xAxisData = xAxisData;
      tempData.yAxisData = yAxisData;
      tempData.zAxisData = zAxisData;
      if (chartType === "bar") {
        tempData.orientation = {
          value: "Vertical",
          options: ["Horizontal", "Vertical"],
        };
        tempData.comparison = {
          value: "None",
          options: ["None", ...axisValues],
        };
      }
      setSettingsData(tempData, type);
    }
  };

  useEffect(() => {
    if (defaultData !== null) {
      getDefaultValues("default");
    }
  }, [defaultData]);

  useEffect(() => {
    getDefaultValues("updated");
  }, [chartType]);

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type={chartType}
      height="100%"
    />
  );
};

export default memo(Charts);
