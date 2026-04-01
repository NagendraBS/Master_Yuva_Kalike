/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getDatabase } from "../../services/AdminServices";
import { useNavigate } from "react-router";
import { useState } from "react";

const DatasourceHome = () => {
  let navigate = useNavigate();
  const engine = [];
  const filterEngine = [];
  const [newEngine, setNewEngine] = useState([]);

  const onClickChart = () => {
    navigate(`/addDatabase`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const organizationId = JSON.parse(
          localStorage.getItem("userInfo")
        )?.organizationId;
        const response = await getDatabase(organizationId);
        if (response.status === 200 && response.data) {
          for (let i = 0; i < response.data.length; i++) {
            engine[i] = response.data[i].dataSourceType;
          }
        }
        const upper = engine.map((element) => {
          return element.toUpperCase();
        });
        upper.forEach((value) => {
          if (!filterEngine.includes(value)) {
            filterEngine.push(value);
          }
        });
        const filtered = filterEngine.filter((element) => element);
        setNewEngine(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const state = {
    series: [5, 5, 5, 5, 5, 5],
    options: {
      labels: newEngine,
      dataLabels: {
        enabled: false,
      },
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            localStorage.setItem(
              "selectedValue",
              JSON.stringify(config.w.config.labels[config.dataPointIndex])
            );
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return "";
          },
        },
      },
    },
  };

  return (
    <div
      id="chart"
      style={{
        top: "10.3%",
        left: "5%",
        position: "absolute",
      }}
    >
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width="380"
        onClick={onClickChart}
        style={{
          border: "0.5px solid black",
        }}
      />
    </div>
  );
};

export default DatasourceHome;
