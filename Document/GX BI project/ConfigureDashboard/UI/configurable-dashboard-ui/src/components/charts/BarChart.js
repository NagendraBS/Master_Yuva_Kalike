/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getDrillDown } from "../../services/DashboardServices";
import { getDatabaseDetails } from "../../services/AdminServices";
import DashboardActions from "../../actions/dashboardAction";

const BarChart = ({
  page,
  chartType,
  data,
  settingsData,
  setSettingsData,
  defaultData,
  drillDownPopup,
}) => {
  const dashboard = useSelector((state) => state.dashboard);
  const isPopUpEnable = dashboard.isPopUpEnable;
  const dispatch = useDispatch();

  const requestData = {
    dataSourceType: defaultData?.metadata?.dataSourceType,
    applicationId: defaultData?.applicationId,
    panelId: defaultData?.panelId,
    host: defaultData?.metadata?.host,
    schema: defaultData?.metadata?.schema,
    query: defaultData?.metadata?.query,
    pageId: defaultData?.pageId,
    dataSourceId: defaultData?.metadata?.dataSourceId,
  };
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [44, 55, 13, 43, 22],
      },
    ],
    options: {
      chart: {
        width: 380,
        type: "bar",
        toolbar: {
          show: true,
        },
        events: {
          click: async function (event, chartContext, config) {
            dispatch(DashboardActions.updateisBarChartClicked(true));
            let label = config?.config?.labels[config?.dataPointIndex];
            let intialQuery = requestData?.query;
            let x;
            if (isPopUpEnable) {
              // x = `SELECT  business_unit, server, origin FROM dashboard_dev.interaction where data_id='${label}';`
              x = `SELECT  business_unit, server, origin FROM interaction where data_id='822';`;
            } else {
              if (intialQuery.includes("limit")) {
                x = requestData.query.replace(
                  "limit",
                  `where ${settingsData?.data?.value}='${label}' limit`
                );
              } else {
                x = requestData.query.replace(
                  ";",
                  ` where ${settingsData?.data?.value}='${label}'`
                );
              }
            }

            requestData.query = x;
            try 
            {
              const getDataSourceResp = await getDatabaseDetails(
                requestData?.dataSourceId
              );
              const respData = getDataSourceResp.data;
              requestData.cacheFlag = false;
              requestData.connectionType =
                requestData?.dataSourceType &&
                requestData?.dataSourceType.trim();
              const drillDownData = await getDrillDown(respData, x);
              requestData.query = intialQuery;
              drillDownPopup(requestData, drillDownData?.data?.data);
            } 
            catch (err) 
            {
              console.log("err123",err?.response?.data);
            }
          },
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
    const labels = [];
    const seriesData = [];
    temp.forEach((item) => {
      seriesData.push((item && item[settingsData?.yAxisData?.value]) || "");
      labels.push((item && item[settingsData?.xAxisData?.value]) || "");
    });

    let tempData = {
      series: [
        {
          data: seriesData,
        },
      ],
      options: {
        xaxis: {
          show: settingsData?.xAxis ? settingsData?.xAxis?.value : true,
          title: {
            ...chartData?.options?.xaxis?.title,
            text: settingsData?.xAxis?.value
              ? settingsData?.xAxisDisplayName?.value
              : typeof settingsData?.xAxis?.value == "undefined"
              ? settingsData?.xAxisDisplayName?.value
              : "",
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

          type:
            settingsData?.orientation?.value === "Horizontal" ? "" : "category",
        },
        yaxis: {
          show: settingsData?.yAxis ? settingsData?.yAxis?.value : true,
          title: {
            ...chartData?.options?.yaxis?.title,
            text: settingsData?.yAxisDisplayName?.value,
          },
        },
        chart: {
          width: 380,
          type: "bar",
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            distributed: true,
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
  }, [chartType]);

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type={chartType}
      height="100%"
    />
  );
};

export default memo(BarChart);
