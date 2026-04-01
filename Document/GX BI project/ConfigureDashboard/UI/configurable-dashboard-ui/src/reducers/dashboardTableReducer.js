import { dashboardTableActions } from "../actions/index";
const initialState = {
    allDashboardData: [],
    listDashboards:[],
    deleteDashboard:[]
  };


const dashboardTableReducer = (state=initialState,action) => {
 switch(action.type)
 {
    case `${dashboardTableActions.GET_ALL_DASHBOARDS}`:
        return {...state,allDashboardData:action.payload};
    case `${dashboardTableActions.getAlldashboards}`:
        return {...state,listDashboards:action.payload};
    case `${dashboardTableActions.DELETE_DASHBOARD}`:
            return {...state,deleteDashboard:action.payload};
    default:
            return state;
 }
};

export default dashboardTableReducer;
