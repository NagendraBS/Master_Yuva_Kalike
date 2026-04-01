/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import ReactApexChart from "react-apexcharts";

const MultiYAxis = ({
  page,
  chartType,
  data,
  settingsData,
  setSettingsData,
  defaultData,
  drillDownPopup
}) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Income",
        type: "bar",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: "Cashflow",
        type: "bar",
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: "Revenue",
        type: "line",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        events: {
          click: async function (event, chartContext, config) {
            drillDownPopup(data);
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      title: {
        align: "left",
        offsetX: 110,
      },
      xaxis: {
        categories: [],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#008FFB",
            },
          },
          title: {
            style: {
              color: "#008FFB",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#00E396",
          },
          labels: {
            style: {
              colors: "#00E396",
            },
          },
          title: {
            style: {
              color: "#00E396",
            },
          },
        },
      ],
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  });
  const xAxisValues = [];
  const yAxisValues = [];
  const zAxisValues = [];
  useEffect(() => {
    const temp = [...data];

    temp.forEach((item) => {
      if (temp?.length > 0) {
        xAxisValues.push((item && item[settingsData?.xAxisData?.value]) || "");
        yAxisValues.push((item && item[settingsData?.yAxisData?.value]) || "");
        zAxisValues.push((item && item[settingsData?.zAxisData?.value]) || "");
      }
    });
    let tempData = {
      series: [
        {
          name: settingsData?.xAxisData?.value,
          type: "bar",
          data: xAxisValues,
        },
        {
          name: settingsData?.yAxisData?.value,
          type: "bar",
          data: yAxisValues,
        },
        {
          name: settingsData?.zAxisData?.value,
          type: "line",
          data: zAxisValues,
        },
      ],
      options: {
        chart: {
          width: 380,
          type: "line",
          toolbar: {
            show: true,
          },
        },
        legend: {
          show: settingsData?.legend ? settingsData?.legend?.value : true,
        },
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
      tempData.xAxisData = options;
      tempData.yAxisData = options;
      tempData.zAxisData = options;
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

export default memo(MultiYAxis);
