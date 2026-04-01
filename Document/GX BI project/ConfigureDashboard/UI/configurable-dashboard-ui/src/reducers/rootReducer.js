import { combineReducers } from 'redux';
import administartionReducer from './administartionReducer';
import  dashboardReducer  from './dashboardReducer';
import enterpriseReducer from './enterpriseReducer';
import dashboardTableReducer from './dashboardTableReducer';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    administration: administartionReducer,
    enterprise:enterpriseReducer,
    dashboardtable:dashboardTableReducer,
    main: mainReducer
});

export default rootReducer;