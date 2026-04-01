/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { getDatabaseDetails } from "../../services/AdminServices";
import { getDrillDown } from "../../services/DashboardServices";
import { toast } from "react-toastify";

const PieChart = ({
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
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
        toolbar: {
          show: true,
        },
        events: {
          click: async function (event, chartContext, config) {
            let label = config?.config?.labels[config?.dataPointIndex];
            let x = requestData.query.replace("limit", `where ${settingsData?.data?.value}='${label}' limit`);
            requestData.query = x;
            try {
              const getDataSourceResp = await getDatabaseDetails(requestData.dataSourceId);
              const respData = getDataSourceResp.data;
              requestData.cacheFlag = false;
              requestData.connectionType = requestData?.dataSourceType && requestData?.dataSourceType.trim();
              const drillDownData = await getDrillDown(respData, x);
              if (getDataSourceResp.status === 200 || drillDownData.status === 200) {
                drillDownPopup(requestData, drillDownData.data.data);
              }
            } catch (err) {
              toast.error(err.message, { theme: 'white', color: "red" })
            }

          }
        }
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const temp = [...data];
    const series = [];
    const labels = [];
    temp.forEach((item) => {
      series.push(item[settingsData?.data?.value] || "");
      labels.push(item[settingsData?.displayName?.value] || "");
    });
    let tempData = {
      series: series,
      options: {
        chart: {
          width: 380,
          type: "pie",
          toolbar: {
            show: true,
          },
        },
        legend: {
          show: settingsData?.legend ? settingsData?.legend?.value : true,
        },
        labels: labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    setChartData(tempData);
  }, [chartType, data, settingsData]);

  const getDefaultValues = (type) => {
    if (page === "query") {
      let headers = [];
      Object.keys(data[0]).forEach((item) => {
        headers.push(item);
      });
      const tempData = { ...settingsData };
      let options = {
        value: headers[0],
        options: headers,
      };
      tempData.data = options;
      tempData.displayName = options;
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
  }, []);

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type={chartType}
      height="100%"
    />
  );
};

export default memo(PieChart);
