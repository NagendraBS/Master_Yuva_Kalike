import { enterpriseActions } from "./index";
import { getallDomains } from "../services/AdminServices";

const actions = {
  getAllDomains: () => {
    return async (dispatch) => {
      const enterprises = [];
      const enterprise = await getallDomains();
      if (enterprise.data) {
        enterprises.push(...enterprise.data);
      }
      dispatch({
        type: enterpriseActions.GET_ALL_DOMAINS,
        payload: enterprises,
      });
    };
  },
  updateDomainData: (payload) => ({
    type: enterpriseActions.UPDATE_ORGANIZATION,
    payload: payload,
  }),
};

export default actions;
