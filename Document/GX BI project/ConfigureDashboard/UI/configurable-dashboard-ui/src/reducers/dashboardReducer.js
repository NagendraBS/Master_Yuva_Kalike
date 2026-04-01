/* eslint-disable array-callback-return */
import { dashboardActions } from "../actions/index";
import { getDateAndTime } from "../utils/helper";

const initialState = {
  dashboards: [
    {
      dashboardName: "Dashboard1",
      dashboard_config: [
        {
          i: 1,
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          visualizationData: {
            type: "new",
            chartType: "new",
          },
        },
      ],
    },
  ],
  fullDashboardData: [],
  editLayout: false,
  filters: [],
  filterIdList: [],
  lastRefreshed: getDateAndTime(),
  refreshRate: 0,
  manualRefresh: false,
  filteredName: "",
  filterDashboardNames: [],
  filterDashboardNames1: [],
  chartDatas: [],
  chartDataArray: [],
  applicationDataArray: [],
  storedDashboardData: [],
  storedPannelData: [],
  dataSrcName: "",
  dashId: "",
  isFilterUpdate:false,
  isPopUpEnable: false,
  isBarChartClicked: false,
};

const getFilterData = (dashboards) => {
  return dashboards?.settings?.filters ? dashboards?.settings?.filters : [];
};
const getFilterIdList = (dashboard) => {
  let filterIdList = [];
  if (dashboard?.settings?.filters) {
    filterIdList = dashboard?.settings?.filters?.map(
      (filter) => filter?.filterId
    );
  }
  return filterIdList;
};

const getFilteredIdListsFromFilters = (filters) => {
  let filterIdList = [];
  if (filters) {
    filterIdList = filters.map((filter) => filter.filterId);
  }
  return filterIdList;
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${dashboardActions.FILTER_DASHBOARD_NAMES}`:
      return {
        ...state,
        filterDashboardNames: action.payload,
        filterDashboardNames1: action.payload,
      };
    case `${dashboardActions.SEARCH_DASHBOARD_NAMES}`:
      return {
        ...state,
        filterDashboardNames: action.payload,
      };
    case `${dashboardActions.DATA_SRC_NAME}`:
      return {
        ...state,
        dataSrcName: action.payload,
      };
    case `${dashboardActions.STORED_DASHBOARD_DATA}`:
      return {
        ...state,
        storedDashboardData: action.payload,
        selectedDashboard: action.payload,
        filters: getFilterData(action.payload),
        filterIdList: getFilterIdList(action.payload),
      };
    case `${dashboardActions.STORE_CHART_DATA}`:
      const [panelId, data, types, chartTypes, settingsData] = action.payload;
      for (let dashboard of state.fullDashboardData) {
        for (let page of dashboard?.data?.pages) {
          if (page.panelInfos) {
            let dataInfo;
            for (let panel of page?.panelInfos) {
              if (panel.panelId === panelId) {
                const secondObj = {
                  panelId: panelId,
                  chartData: data,
                  types,
                  chartTypes,
                  settingsData,
                };

                const panelDataThere = state.applicationDataArray.find(
                  (item) => item.panelId === panel.panelId
                );
                if (!panelDataThere) {
                  state.applicationDataArray.push(secondObj);
                  dataInfo = state.applicationDataArray;
                } else {
                  state.applicationDataArray.find(
                    (item) => item.panelId === panel.panelId
                  ).chartData = data;
                }
              }
            }

            const firstObj = {
              applicationId: page.applicationId,
              panelData: dataInfo,
            };
            const dataThere = state.chartDataArray.find(
              (item) => item.applicationId === page.applicationId
            );
            if (!dataThere) {
              state.chartDataArray.push(firstObj);
            }
          }
        }
      }
      return {
        ...state,
        chartDatas: state.chartDatas,
      };
    case `${dashboardActions.FILTERED_NAME}`:
      return {
        ...state,
        filteredName: action.payload,
      };
    case `${dashboardActions.SWITCH_DASHBOARD}`:
      const dataThere = state.fullDashboardData.find(
        (item) => item.id === action.payload.dashboardId
      );

      if (!dataThere) {
        state.fullDashboardData.push({
          id: action.payload.dashboardId,
          data: action.payload,
        });
      }

      return {
        ...state,
        selectedDashboard: action.payload,
        filters: getFilterData(action.payload),
        filterIdList: getFilterIdList(action.payload),
        fullDashboardData: state.fullDashboardData,
        applicationDataArray: [],
      };

    case `${dashboardActions.UPDATE_DASHBOARD}`:
      return {
        ...state,
        dashboards: action.payload,
        // filterDashboardNames: action.payload,
        filterDashboardNames:  action.payload,
        filterDashboardNames1: action.payload,
        filters: getFilterData(action.payload[0]),
        selectedDashboard: action.payload[0],
        filterIdList: getFilterIdList(action.payload[0]),
      };
    case `${dashboardActions.UPDATE_DASHBOARD_REFRESH}`:
      return {
        ...state,
        dashboards: action.payload.allDashboards,
        filters: getFilterData(action.payload.selectedDashboard),
        selectedDashboard: action.payload.selectedDashboard,
        filterIdList: getFilterIdList(action.payload.selectedDashboard),
      };
    case `${dashboardActions.UPDATE_SELECTEDDASHBOARD_REFRESH}`:
      return {
        ...state,
        // dashboards: action.payload.allDashboards,
        filters: getFilterData(action.payload.selectedDashboard),
        selectedDashboard: action.payload.selectedDashboard,
        filterIdList: getFilterIdList(action.payload.selectedDashboard),
      };
    case `${dashboardActions.ADD_DASHBOARD}`:
      const dashboard = [...state.dashboards];
      dashboard.push({
        dashboardName: action.payload.dashboardName,
        groupName: action.payload.groupName,
        dashboardId: action.payload.dashboardId,
        dashboard_config: [
          {
            i: 1,
            x: 0,
            y: 0,
            w: 4,
            h: 4,
            visualizationData: {
              type: "new",
              chartType: "new",
            },
          },
        ],
        settings: action.payload.settings,
        dashId: action.payload.dashboardId,
      });
      return {
        ...state,
        dashboards: dashboard,
        filterDashboardNames: [...state.filterDashboardNames, action.payload],
        filterDashboardNames1: [...state.filterDashboardNames1, action.payload],
        // refreshRate:action.payload?.settings?.refreshRate
      };
    case `${dashboardActions.UPDATE_PANELS}`:
      const dashboards = state.dashboards.map((item) => {
        if (item.dashboardId === action.payload?.dashboardId) 
        {
          item.dashboard_config = action.payload?.dashboard_config;
        }
        return item;
      });
      return { ...state, dashboards: dashboards };
    case `${dashboardActions.EDIT_LAYOUT}`:
      return { ...state, editLayout: action.payload };
    case `${dashboardActions.ADD_FILTER}`:

      let dashboardsCopy = [...state.dashboards]

      dashboardsCopy.map((dash,index)=>{
        if(dash.dashboardId === state.selectedDashboard.dashboardId)
        {
          dashboardsCopy[index].settings = action.payload
          return index;
        }
      })

      return {
        ...state,
        dashboards: dashboardsCopy, //updating filters in dashboard
        selectedDashboard: {
          ...state.selectedDashboard,
          settings: action.payload,
        }, // updating filters in selected dashboard
        filters: action.payload.filters, // updatind filters in filters
        filterIdList: getFilteredIdListsFromFilters(action.payload.filters),
      };
      //reducer for panel lvl filter
    case `${dashboardActions.ADD_FILTERPANELLVL}`:

    let dashboardsArray = [...state.dashboards];
    let dashboardIndex = 0;
    dashboardsArray.map((dash,index)=>{
      if(dash.dashboardId === state.selectedDashboard.dashboardId)
      {
        dashboardIndex = index;
        dashboardsArray[index].pages?.map((page,pageIndex)=>{
          if(page?.pageId === state.selectedDashboard?.selectedPage?.pageId){
            dashboardsArray[index].pages[pageIndex].panelInfos.map((panel,panelIndex)=>{
              if(panel.panelId === action.payload.panelId){
                dashboardsArray[index].pages[pageIndex].panelInfos[panelIndex] = action.payload;
                dashboardsArray[index].selectedPanel = action.payload;
              }
            })
          }
        })
        return index;
      }
    })
    return {
      ...state,
      dashboards: dashboardsArray, //updating filters in dashboard
      selectedDashboard: dashboardsArray[dashboardIndex],
      isFilterUpdate:!state.isFilterUpdate
    };
    case `${dashboardActions.UPDATE_LAST_REFRESH}`:
      return { ...state, lastRefreshed: action.payload };
    case `${dashboardActions.UPDATE_REFRESH_RATE_VALUE}`:
      return { ...state, refreshRate: action.payload };
    case `${dashboardActions.UPDATE_MANUAL_REFRESH}`:
      return { ...state, manualRefresh: action.payload };
    case `${dashboardActions.STORED_PANNEL_DATA}`:
      let fullDashboardDataUpdate = [...state.fullDashboardData];
      fullDashboardDataUpdate.map((obj) => {
        if (obj.id === action.payload?.data?.applicationId) {
          obj.data?.pages.map((pageData) => {
            if (pageData.pageId === action.payload.pageId) {
              pageData?.panelInfos.map((panelData) => {
                if (panelData.panelId === action.payload.data.panelId) {
                  panelData.metadata = action.payload.data.metadata;
                }
                return panelData;
              });
            }
            return pageData;
          });
        }
        return obj;
      });
      return { ...state, fullDashboardData: fullDashboardDataUpdate };
    case `${dashboardActions.UPDATE_SELECTED_DASHBOARD}`:
        return {...state, selectedDashboard: action.payload, 
          filters: getFilterData(action.payload)
        }
    case `${dashboardActions.UPDATE_ALL_DASHBOARDS}`:
        return {...state, dashboards: action.payload};

    case `${dashboardActions.UPDATE_ISPOPUP_ENABLED}`:
        return {...state, isPopUpEnable: action.payload};
        
    case `${dashboardActions.UPDATE_ISBARCHART_CLICKED}`:
        return {...state, isBarChartClicked: action.payload};
    default:
      return state;
  }
};

export default dashboardReducer;
