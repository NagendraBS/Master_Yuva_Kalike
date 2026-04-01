import { mainActions } from "./index";

const actions = {
  updateSidebarFlag: (payload) => ({
    type: mainActions.SIDEBAR_FLAG,
    payload: payload,
  }),
};

export default actions;
