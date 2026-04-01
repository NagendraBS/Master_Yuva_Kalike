/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dashboardtableAction from "../../actions/dashboardtableAction";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const navigate = useNavigate();
  const updateDashboardDetails = useSelector(
    (state) => state.dashboardtable.allDashboardData
  );

  useEffect(() => {
    dispatch(dashboardtableAction.getAllDashboards());
  }, []);

  const handleDashboardSelect = (dashboard) => {
    setSelectedDashboard(dashboard);
  };

  const handleChartClick = (event,config) => {

    if (config && config.dataPointIndex !== undefined) {
      const clickedPageIndex = config.dataPointIndex;

      if (
        selectedDashboard &&
        selectedDashboard.pages &&
        clickedPageIndex >= 0 &&
        clickedPageIndex < selectedDashboard.pages.length
      ) {
        const clickedPage = selectedDashboard.pages[clickedPageIndex];
        sessionStorage.setItem("applicationId", selectedDashboard.dashboardId);
        sessionStorage.setItem("dashboardName", selectedDashboard.dashboardName);
        sessionStorage.setItem("pageName",clickedPage.pageId)
        // Navigate to the selected page with the page name included in the URL
        navigate(`/dashboard/${selectedDashboard.dashboardName}`);
        
      }
    }
  };

  const getPageBarChartData = () => {
    if (
      selectedDashboard &&
      selectedDashboard.pages &&
      selectedDashboard.pages.length > 0
    ) {
      const labels = selectedDashboard.pages.map((page) => page.pageName);
      const data = selectedDashboard.pages.map((page) =>
        page.panelInfos ? page.panelInfos.length : 0
      );

      return {
        series: [{ data }],
        options: {
          chart: {
            type: "bar",
            height: 350,
            events: {
              dataPointSelection: handleChartClick,
            },
          },
          xaxis: {
            categories: labels,
          },
        },
      };
    }
    return null;
  };

  return (
    <div>
      <h1>Dashboard List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {updateDashboardDetails.map((dashboard) => (
                <TableCell
                  key={dashboard.dashboardId}
                  onClick={() => handleDashboardSelect(dashboard)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedDashboard === dashboard ? "#eee" : "transparent",
                  }}
                >
                  {dashboard.dashboardName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      {selectedDashboard && (
        <div>
          <h2>Page Bar Chart</h2>
          <ReactApexChart
            options={{
              chart: {
                type: "bar",
                height: 50,
                events: {
                  click: handleChartClick, 
                },
              },
              xaxis: {
                categories: selectedDashboard.pages.map(
                  (page) => page.pageName
                ),
              },
            }}
            series={getPageBarChartData()?.series}
            type="bar"
            height={350}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
