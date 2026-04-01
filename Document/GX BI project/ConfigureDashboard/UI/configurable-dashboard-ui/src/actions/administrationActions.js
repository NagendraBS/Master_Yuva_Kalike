import { administrationActions } from "./index";
import {
  getUsers,
  getGroups,
  getOrganization,
  getDatabase,
} from "../services/AdminServices";


const actions = {
  getAllUsers: () => {
    let orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
    return async (dispatch) => {
      const users = [];
      const user = await getUsers(orgId);
      if (user.data && user.data.userDetailsList) {
        users.push(...user.data.userDetailsList);
      }

      dispatch({
        type: administrationActions.GET_ALL_USERS,
        payload: users,
      });
    };
  },
  updateGroup: (payload) => ({
    type: administrationActions.UPDATE_GROUP,
    payload: payload,
  }),
  updateOrganizationData: (payload) => ({
    type: administrationActions.UPDATE_ORGANIZATION,
    payload: payload,
  }),

  getAllGroups: () => {
    let orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
    return async (dispatch) => {
      const groups = [];
      const group = await getGroups(orgId);
      if (group.data && group.data.groupInfoList) {
        groups.push(...group.data.groupInfoList);
      }
      dispatch({
        type: administrationActions.GET_ALL_GROUPS,
        payload: groups,
      });
    };
  },
  getAllOrgs: () => {
    return async (dispatch) => {
      const orgs = [];

      const org = await getOrganization();
      if (org.data) {
        orgs.push(org.data);
      }
      dispatch({
        type: administrationActions.GET_ALL_ORG,
        payload: orgs,
      });
    };
  },

  getAllDatasources: () => {
    let orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
    return async (dispatch) => {
      let datasources;

      const datasource = await getDatabase(orgId);
      if (datasource.data) {
        datasources = datasource.data;
      }
      dispatch({
        type: administrationActions.GET_ALL_DATASOURCES,
        payload: datasources,
      });
    };
  },
};

export default actions;
