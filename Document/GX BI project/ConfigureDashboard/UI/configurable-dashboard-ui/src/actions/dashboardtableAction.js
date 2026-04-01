import { dashboardTableActions } from "./index";
import { getDashboards } from "../services/DashboardServices";

const actions = {
  getAllDashboards: () => {
    return async (dispatch) => {
      const dashboards = [];
      const dashboard = await getDashboards();
      if (dashboard.data) {
        dashboards.push(...dashboard.data);
      }

      dispatch({
        type: dashboardTableActions.GET_ALL_DASHBOARDS,
        payload: dashboards,
      });
    };
  },
  updateDashboardData: (payload) => ({
    type: dashboardTableActions.UPDATE_DASHBOARD,
    payload: payload,
  }),
  deleteDashboardData: (payload) => ({
    type: dashboardTableActions.GET_ALL_DASHBOARDS,
    payload: payload,
  }),
};

export default actions;
