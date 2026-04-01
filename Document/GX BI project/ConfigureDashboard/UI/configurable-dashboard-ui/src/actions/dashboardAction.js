import { getDashboards } from "../services/DashboardServices";
import { dashboardActions } from "./index";

const actions = {
  switchDashboard: (selectedDashboard) => ({
    type: dashboardActions.SWITCH_DASHBOARD,
    payload: selectedDashboard,
  }),
  updateDashboards: (payload) => ({
    type: dashboardActions.UPDATE_DASHBOARD,
    payload: payload,
  }),
  updateDashboardRefresh: (payload) => ({
    type: dashboardActions.UPDATE_DASHBOARD_REFRESH,
    payload: payload,
  }),
  updateSelectedDashboardRefresh: (payload) => ({
    type: dashboardActions.UPDATE_SELECTEDDASHBOARD_REFRESH,
    payload: payload,
  }),
  addDashboard: (payload) => ({
    type: dashboardActions.ADD_DASHBOARD,
    payload: payload,
  }),
  updatePanels: (payload) => ({
    type: dashboardActions.UPDATE_PANELS,
    payload: payload,
  }),
  editLayout: (payload) => ({
    type: dashboardActions.EDIT_LAYOUT,
    payload: payload,
  }),
  addFilter: (filter) => ({
    type: dashboardActions.ADD_FILTER,
    payload: filter,
  }),
  addFilterPanelLvl: (filter) => ({
    type: dashboardActions.ADD_FILTERPANELLVL,
    payload: filter,
  }),
  updateLastRefresh: (payload) => ({
    type: dashboardActions.UPDATE_LAST_REFRESH,
    payload: payload,
  }),
  updateRefreshRateValue: (payload) => ({
    type: dashboardActions.UPDATE_REFRESH_RATE_VALUE,
    payload: payload,
  }),
  updateManualRefresh: (payload) => ({
    type: dashboardActions.UPDATE_MANUAL_REFRESH,
    payload: payload,
  }),
  filteredName: (payload) => ({
    type: dashboardActions.FILTERED_NAME,
    payload: payload,
  }),
  fileterDashboardNames: (payload) => ({
    type: dashboardActions.FILTER_DASHBOARD_NAMES,
    payload: payload,
  }),
  searchDashboardNames: (payload) => ({
    type: dashboardActions.SEARCH_DASHBOARD_NAMES,
    payload: payload,
  }),
  storeChartData: (payload) => ({
    type: dashboardActions.STORE_CHART_DATA,
    payload: payload,
  }),
  storedDashboardData: (payload) => ({
    type: dashboardActions.STORED_DASHBOARD_DATA,
    payload: payload,
  }),
  storedPannelData: (payload) => ({
    type: dashboardActions.STORED_PANNEL_DATA,
    payload: payload,
  }),
  dataSrcName: (payload) => ({
    type: dashboardActions.DATA_SRC_NAME,
    payload: payload,
  }),
  updateSelectedDashboard: (payload) => ({
    type: dashboardActions.UPDATE_SELECTED_DASHBOARD,
    payload: payload,
  }),
  updateAllDashboards: () => {
    return async (dispatch) => 
    {
      const dashboards = await getDashboards();
      
      if (dashboards.data) 
      {
          dispatch({
            type: dashboardActions.UPDATE_ALL_DASHBOARDS,
            payload: dashboards.data,
          });
      }
      return dashboards
    };
  },
  updateIsPopUpEnabled: (payload) => ({
    type: dashboardActions.UPDATE_ISPOPUP_ENABLED,
    payload: payload,
  }),
  updateisBarChartClicked: (payload) => ({
    type: dashboardActions.UPDATE_ISBARCHART_CLICKED,
    payload: payload,
  })
};

export default actions;
