/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({
  page,
  chartType,
  data,
  settingsData,
  setSettingsData,
  defaultData,
  drillDownPopup
}) => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "donut",
        toolbar: {
          show: true,
          events: {
            click: async function (event, chartContext, config) {
              drillDownPopup(data);
            }
          }
        },
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
          type: "donut",
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

export default memo(DonutChart);
