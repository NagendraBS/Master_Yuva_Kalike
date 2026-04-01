/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import Chart from "react-apexcharts";

const Charts = ({
  page,
  chartType,
  data,
  settingsData,
  setSettingsData,
  defaultData,
}) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -110,
          endAngle: 110,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, 
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              fontSize: "1rem",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
          bottom: -25,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
    },
  });

  useEffect(() => {
    const temp = data?.[0];
    if (settingsData?.gaugeData?.value && temp) {
      const series =
        temp[settingsData?.gaugeData?.value] > 100
          ? 100
          : temp[settingsData?.gaugeData?.value];
      let tempData = {
        series: [series],
        options: {
          chart: {
            type: "radialBar",
            sparkline: {
              enabled: true,
            },
            toolbar: {
              show: true,
            },
          },
          plotOptions: {
            radialBar: {
              startAngle: -110,
              endAngle: 110,
              track: {
                background: "#e7e7e7",
                strokeWidth: "97%",
                margin: 5,
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: "#999",
                  opacity: 1,
                  blur: 2,
                },
              },
              dataLabels: {
                name: {
                  show: true,
                },
                value: {
                  fontSize: "1rem",
                },
              },
            },
          },
          grid: {
            padding: {
              top: -10,
              bottom: -25,
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91],
            },
          },
          labels: [settingsData?.displayName?.value || ""],
        },
      };
      setChartData(tempData);
    }
  }, [chartType, data, settingsData]);

  const getDefaultValues = (type) => {
    if (page === "query") {
      let headers = [];
      Object.keys(data[0]).forEach((item) => {
        headers.push(item);
      });
      const tempData = { ...settingsData };
      let show = {
        value: headers[0],
        options: headers,
      };
      tempData.gaugeData = show;
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
    <Chart
      options={chartData.options}
      series={chartData.series}
      type={chartType}
      height="125%"
    />
  );
};

export default memo(Charts);
