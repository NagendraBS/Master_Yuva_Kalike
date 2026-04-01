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
  drillDownPopup
}) => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 67, 83],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true
        },
        events: {
          click: async function (event, chartContext, config) {
            drillDownPopup(data);
          }
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: '97%',
            margin: 5, 
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: '22px'
            }
          }
        }
      },
      grid: {
        padding: {
          top: -10
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        },
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D'],
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
          type: 'radialBar',
          offsetY: 50,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: '97%',
              margin: 5, 
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 1,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                offsetY: 5,
                offsetX: 10,
                fontSize: '22px'
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
          },
        },
        labels: labels,
        legend: {
          show: settingsData?.legend ? settingsData?.legend?.value : true,
        },
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
      let show = {
        value: headers[0],
        options: headers,
      };
      tempData.data = show;
      tempData.displayName = show;
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
