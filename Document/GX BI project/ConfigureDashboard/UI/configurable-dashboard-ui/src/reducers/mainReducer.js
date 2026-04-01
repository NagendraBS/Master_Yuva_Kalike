import { mainActions } from "../actions/index";
const initialState = {
  sidebarFlag: false
};

const enterpriseReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${mainActions.SIDEBAR_FLAG}`:
      return { ...state, sidebarFlag: action.payload };
    default:
      return state;
  }
};

export default enterpriseReducer;
