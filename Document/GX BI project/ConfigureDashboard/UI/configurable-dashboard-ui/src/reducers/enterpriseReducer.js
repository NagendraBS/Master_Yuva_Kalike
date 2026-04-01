import { enterpriseActions } from "../actions/index";
const initialState = {
  enterpriseData: [],
  updateGroup: false,
  updateOrganizationData: false,
 
};

const enterpriseReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${enterpriseActions.GET_ALL_DOMAINS}`:
      return { ...state, enterpriseData: action.payload };
    case `${enterpriseActions.UPDATE_GROUP}`:
      return { ...state, updateGroup: !state.updateGroup };
    case `${enterpriseActions.UPDATE_ORGANIZATION}`:
      return {
        ...state,
        updateOrganizationData: !state.updateOrganizationData,
      };
    case `${enterpriseActions.getAllenterprises}`:
      return { ...state, listEnterprise: action.payload };
         
    default:
      return state;
  }
};

export default enterpriseReducer;
