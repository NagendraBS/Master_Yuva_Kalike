import { administrationActions } from "../actions/index";
const initialState = {
  allUsersData: [],
  updateGroup: false,
  updateOrganizationData: false,
  listEnterprise:[],
  listOrg:[],
  listGroup:[],
  listDatasources:[]
};

const administartionReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${administrationActions.GET_ALL_USERS}`:
      return { ...state, allUsersData: action.payload };
    case `${administrationActions.UPDATE_GROUP}`:
      return { ...state, updateGroup: !state.updateGroup };
    case `${administrationActions.UPDATE_ORGANIZATION}`:
      return { ...state, updateOrganizationData: !state.updateOrganizationData };
      case `${administrationActions.getAllenterprises}`:
        return { ...state, listEnterprise:action.payload }; 
      case `${administrationActions.GET_ALL_ORG}`:
        return {...state,listOrg:action.payload};
        case `${administrationActions.GET_ALL_GROUPS}`:
          return { ...state, listGroup: action.payload };
          case `${administrationActions.GET_ALL_DATASOURCES}`:
            return { ...state, listDatasources: action.payload };
    default:
      return state;
  }
};

export default administartionReducer;
