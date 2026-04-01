/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Responsive as ResponsiveReactGridLayout } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { withSize } from "react-sizeme";
import { makeStyles, styled } from "@material-ui/core/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import CloseIcon from "@material-ui/icons/Close";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineFundView } from "react-icons/ai";
import SearchIcon from "@material-ui/icons/Search";
import { FaFilter } from "react-icons/fa";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  createPage,
  deleteExlPanel,
  deletePage,
  deletePanel,
  duplicatePage,
  editPage,
  getDashboards,
  getPanelDetails,
  savePanel,
} from "../../services/DashboardServices";
import Widget from "../../components/panel/Widget";
import DashboardActions from "../../actions/dashboardAction";
import FilterControls from "../../components/FilterControls";
import AddFilter from "../../components/AddFilter";
import DashboardTab from "../../components/DashboardTab";
import "./Dashboard.css";
import "../../container/App.css";
import { dashboardActions } from "../../actions";
import DashboardPanel from "../../components/DashboardPage/DashboardPanel";

import { getFiltereDataobject } from "../../utils/LocalStorage";

const useStyles = makeStyles((theme) => ({
  drawer: {
    borderRadius: 0,
    width: "27%",
    top: "119px !important",
    height: "calc(100% - 190px) !important",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

let panels = {};
let selectedDashboard = {};
let duplicatePanelData = {};
let refreshRate = 0;
let selectedDashboardId;
let selectedItemId;
let selectedPanelName;
let isExcelData;

function Dashboard({ size: { width }, settingName }) {
  let navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("userInfo")).roleInfo
    .roleName;
  const actorId = JSON.parse(localStorage.getItem("userInfo")).actorId;
  const dashboardConfig = useSelector((state) => state.dashboard);
  const dashboardData = useSelector((state) => state.dashboard.dashboards);

  const dashId = sessionStorage.getItem("applicationId")
    ? sessionStorage.getItem("applicationId")
    : dashboardConfig?.selectedDashboard?.dashboardId;

  const dashboardPageName = sessionStorage.getItem("dashboardName")
    ? sessionStorage.getItem("dashboardName")
    : dashboardConfig?.selectedDashboard?.dashboardName;
  const dispatch = useDispatch();
  const sidebarFlag = useSelector((state) => state.main.sidebarFlag);

  const [layouts, setLayouts] = useState({});
  const [cols, setCols] = useState(12);
  const [loading, setLoading] = useState(false);
  const [openAddFilter, setOpenAddFilter] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [duplicatePanelName, setDuplicatePanelName] = useState("");
  const [filterId, setFilterId] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [openPageDialog, setOpenPageDialog] = useState(null);
  const [openPanelDialog, setOpenPanelDialog] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [newPageName, setNewPageName] = useState("");
  const [selectedPageData, setSelectedPageData] = useState({});
  const [modifiedPageData, setModifiedPageData] = useState({});
  const [error, setError] = useState(null);
  const [openFilterList, setOpenFilterList] = useState(false);
  const [filteredPages, setFilteredPages] = useState([]);
  const [enablePopUp, setenablePopUp] = useState(false);
  const [drillData, setDrillData] = useState([]);
  const [drillPanelData, setDrillPanelData] = useState([]);
  const anchor = "right"; // this variable is related to show filters modal.
  const [pageHasError, setPageHasError] = useState({
    pageError: false,
    pageErrorMessage: "",
  });
  const [selectedPanel, setSelectedPanel] = useState();
  const [panelCloneError, setPanelCloneError] = useState(false);
  const [firstLayerData, setFirstLayerData] = useState([]);
  const [firstLayerDrillData, setFirstLayerDrillData] = useState();
  const [buttonDisable, setButtonDisable] = useState(false);

  const classes = useStyles();
  //getting the settings of selected dashboard
  refreshRate =
    dashboardConfig?.selectedDashboard &&
    dashboardConfig?.selectedDashboard.settings
      ? dashboardConfig?.selectedDashboard?.settings?.refreshRate
      : 0;
  const selectedDashboardVar = dashboardConfig?.dashboards?.filter((dash) => {
    return dash.dashboardId === dashId;
  });

  const updateDashboardDetails = useSelector(
    (state) => state.dashboardtable.allDashboardData
  );
  const location = useLocation();
  useEffect(() => {
    setSelectedPage(location.state?.currentPage || 0);
  }, []);
  useEffect(() => {
    if (refreshRate) {
      dispatch(
        DashboardActions.updateRefreshRateValue(
          selectedDashboardVar[0]?.settings?.refreshRate
        )
      );
    }

    if (layouts.hasOwnProperty("dashboard_config")) {
      let layoutCopy = { ...layouts };
      layoutCopy.dashboard_config[0].metadata.refreshRate = refreshRate;
      setLayouts(layoutCopy);
    }
  }, [refreshRate]);

  useEffect(() => {
    if (
      selectedDashboardVar[0] !== undefined ||
      selectedDashboardVar[0] !== null
    ) {
      refreshRate &&
        selectedDashboardVar[0]?.settings &&
        (selectedDashboardVar[0].settings.refreshRate = refreshRate);
      dispatch(
        DashboardActions.updateSelectedDashboard(selectedDashboardVar[0])
      );
    }
  }, [dashboardConfig.dashboards]);

  useEffect(() => {
    selectedDashboard = dashboardConfig?.selectedDashboard;
    setSelectedPanel(dashboardConfig?.selectedDashboard?.selectedPage);
    fetchData();
  }, [dashboardConfig?.isFilterUpdate]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClosePageDialog = () => {
    setOpenPageDialog(null);
  };
  const handleClosePanelDialog = () => {
    setOpenPanelDialog(null);
  };

  const onBreakpointChange = (breakpoint, cols) => {
    setCols(cols);
  };

  const handleSearchPage = (data) => {
    setFilteredPages(pages.filter((item) => item.pageName?.includes(data)));
  };

  // const onRemoveItem = async () => {
  //   setLoading(true);
  //   const resp = await deletePanel(selectedDashboardId, selectedItemId);
  //   if (resp.status === 200) {
  //     toast.success("Panel deleted successfully");
  //     let layout = [...layouts?.dashboard_config];
  //     layout = layout?.filter((i) => i.metadata.i !== selectedItemId);
  //     setLayouts({
  //       ...layouts,
  //       dashboard_config: layout,
  //     });
  //     let allDashboards = dashboardConfig;
  //     allDashboards.dashboards.map((dashObj) => {
  //       if (dashObj.dashboardId === selectedDashboard.dashboardId) {
  //         dashObj.pages.map((pageObj) => {
  //           if (pageObj.pageId === selectedDashboard.selectedPage.pageId) {
  //             pageObj.panelInfos = layout;
  //           }
  //         });
  //       }
  //     });
  //     dispatch({
  //       type: dashboardActions.UPDATE_ALL_DASHBOARDS,
  //       payload: allDashboards.dashboards,
  //     });
  //   }
  //   setLoading(false);
  //   setOpenPanelDialog(null);
  // };

  const onRemoveItem = async () => {
    console.log("isExcelData", isExcelData);
    setLoading(true);
    let resp;
    if (isExcelData) {
      resp = await deleteExlPanel(actorId, selectedItemId);
    } else {
      resp = await deletePanel(selectedDashboardId, selectedItemId);
    }

    if (resp.status === 200) {
      toast.success("Panel deleted successfully");
      let layout = [...layouts?.dashboard_config];
      layout = layout?.filter((i) => i.metadata.i !== selectedItemId);
      setLayouts({
        ...layouts,
        dashboard_config: layout,
      });
      let allDashboards = dashboardConfig;
      allDashboards.dashboards.map((dashObj) => {
        if (dashObj.dashboardId === selectedDashboard.dashboardId) {
          dashObj.pages.map((pageObj) => {
            if (pageObj.pageId === selectedDashboard.selectedPage.pageId) {
              pageObj.panelInfos = layout;
            }
          });
        }
      });
      dispatch({
        type: dashboardActions.UPDATE_ALL_DASHBOARDS,
        payload: allDashboards.dashboards,
      });
    }
    setLoading(false);
    setOpenPanelDialog(null);
  };

  const onEditItem = (id, data, chartData) => {
    navigate("./query", { state: { id, data, chartData, selectedPage } });
  };

  const onDuplicateItem = async (panelData) => {
    duplicatePanelData = panelData;
    setOpenDialog(true);
    setDuplicatePanelName("");
  };

  const onRemove = async (dashboardId, itemId, panelData, ExcelData) => {
    console.log("isExcelData in onremove", ExcelData);
    selectedPanelName = panelData?.metadata?.visualizationData?.panelName;
    selectedDashboardId = dashboardId;
    selectedItemId = itemId;
    isExcelData = ExcelData;
    setOpenPanelDialog(true);
  };

  const handleDuplicateSave = async () => {
    var x = dashboardConfig.selectedDashboard.selectedPage.panelInfos.some(
      (e) => e.metadata.visualizationData.panelName === duplicatePanelName
    );
    if (x === true) {
      setPanelCloneError(true);
    } else {
      setPanelCloneError(false);
    }

    if (duplicatePanelName === "") {
      setError(true);
    } else {
      const metadatas = Object.assign({}, duplicatePanelData.metadata);
      const metaVisualizationData = {
        panelName: duplicatePanelName,
        type: metadatas.visualizationData.type,
        chartType: metadatas.visualizationData.chartType,
      };

      delete metadatas.visualizationData;
      metadatas["visualizationData"] = metaVisualizationData;
      const layout = { ...layouts };
      let tempData = {
        applicationId: duplicatePanelData.applicationId,
        accountId: duplicatePanelData.accountId,
        pageId: duplicatePanelData.pageId,
        metadata: metadatas,
      };
      let total = 0;
      layout?.dashboard_config?.forEach((element) => {
        total += element.metadata.w;
      });
      tempData.metadata.x = (total - 4) % (cols || 12);
      tempData.metadata.y = Infinity;
      const dashboardId = tempData.applicationId;
      try {
        if (!x) {
          setLoading(true);
          const resp = await savePanel(dashboardId, tempData);
          if (resp.status === 200) {
            dispatch(DashboardActions.updateAllDashboards());
            const arr = [];
            fetchPanelData(dashId, resp.data.panelId, arr, resp.data.pageId);
            toast.success(" Panel cloned successfully");
            setLoading(false);
          }
          setOpenDialog(false);
        }
      } catch (err) {
        setLoading(false);
        toast.error(err, { theme: "white", color: "red" });
      }
    }
  };

  const onLayoutChange = async (layout, oldItem, newItem) => {
    let item = {};
    layouts?.dashboard_config?.forEach((element) => {
      if (element.metadata.i === newItem.i) {
        const metadata = element.metadata;
        metadata.x = newItem.x;
        metadata.y = newItem.y;
        metadata.w = newItem.w;
        metadata.h = newItem.h;
        item = {
          ...element,
          metadata: metadata,
        };
      }
    });
    if (item.metadata.visualizationData.type !== "new") {
      const dashboardId = item.applicationId;
      await savePanel(dashboardId, item);
    }
  };

  const handleChange = (newValue) => {
    setSelectedPage(newValue);
    const selectedPageData =
      dashboardConfig?.selectedDashboard?.pages[newValue];

    const selectedDashboard = dashboardConfig?.selectedDashboard;
    selectedDashboard.selectedPage = selectedPageData;
    setNewPageName(selectedPageData.pageName);
    setSelectedPageData(selectedPageData);
    const dataThere = dashboardConfig.fullDashboardData.find(
      (obj) => obj.id === selectedDashboard.dashboardId
    );

    if (!dataThere) {
      dispatch(DashboardActions.switchDashboard(selectedDashboard));
    } else {
      dispatch(DashboardActions.storedDashboardData(selectedDashboard));
    }
    const ids = selectedPageData.panelInfos?.reduce(
      (acc, obj) => [...acc, obj.panelId],
      []
    );
    const max = ids && ids.length ? Math.max(...ids) : 0;
    let layout = layouts;
    layout.dashboard_config = [];
    panels = {};
    layout.newCounter = max;
    const dashboardId = dashboardConfig?.selectedDashboard?.dashboardId;
    if (ids === undefined || ids.length === 0) {
      layout.dashboard_config = [
        {
          applicationId: dashboardId,
          pageId: selectedPageData.pageId,
          metadata: {
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
        },
      ];
    }
    setLayouts(layout);
    for (const key in ids) {
      fetchPanelData(dashboardId, ids[key], ids, selectedPageData.pageId);
    }
  };

  const handlePageDialog = (type, data) => {
    switch (type) {
      case "ADD":
        setDialogTitle("Add New Page");
        setOpenPageDialog(type);
        setNewPageName("");
        setPageHasError(false);
        break;
      case "EDIT":
        setNewPageName(data.pageName);
        setModifiedPageData(data);
        setButtonDisable(true);
        setDialogTitle("Edit Page");
        setOpenPageDialog(type);
        setPageHasError(false);
        break;
      case "DELETE":
        setButtonDisable(false);
        setModifiedPageData(data);
        setDialogTitle("Delete Page");
        setOpenPageDialog(type);
        break;
      case "DUPLICATE":
        setButtonDisable(true);
        setModifiedPageData(data);
        setDialogTitle("Duplicate Page");
        setOpenPageDialog(type);
        setNewPageName("");
        setPageHasError(false);
        setDuplicatePanelName("");
        break;
      default:
        break;
    }
  };

  const handleDialogSave = async () => {
    switch (openPageDialog) {
      case "ADD":
        await handlePageSave();
        break;
      case "EDIT":
        await handlePageEdit();
        break;
      case "DELETE":
        await handlePageDelete();
        break;
      case "DUPLICATE":
        await handlePageDuplicate();
        break;
      default:
        break;
    }
  };

  const handlePageSave = async () => {
    if (newPageName === "") {
      setPageHasError({
        ...pageHasError,
        pageError: true,
        pageErrorMessage: "Page name should not be empty",
      });
    } else {
      try {
        const resp = await createPage(
          newPageName,
          dashboardConfig?.selectedDashboard?.dashboardId
        );
        if (resp.status === 200) {
          setOpenPageDialog(null);
          const page = [...pages, resp.data];
          setPages(page);
          if (page.length === 1) {
            let layout = layouts;
            layout.pages = page;
            getPanelsData(
              dashboardConfig?.selectedDashboard?.dashboardId,
              layouts,
              0
            );
          }
          const selectedDashboard = dashboardConfig?.selectedDashboard;
          // const selectedDashboard = selectedDashboardVar[0];
          selectedDashboard.pages = page;
          dashboardConfig.selectedDashboard = page;
          setSelectedPage(page.length - 1);
          dispatch(DashboardActions.switchDashboard(selectedDashboard));
          toast.success(" Page added successfully");
        }
      } catch (err) {
        setLoading(false);
        if (err.response.data === "Page Name already exists") {
          toast.error(err.response.data, { theme: "white", color: "red" });
        }
        toast.error(err, { theme: "white", color: "red" });
      }
    }
  };

  let Error = false;
  const handlePageEdit = async () => {
    const pageAry = pages.map((obj) => {
      return obj.pageName;
    });

    if (pageAry.indexOf(newPageName) !== -1) {
      pageAry.find((x) => {
        if (x === newPageName) {
          setPageHasError({
            ...pageHasError,
            pageError: false,
            pageErrorMessage: "",
          });
          Error = false;
        } else {
          setPageHasError({
            ...pageHasError,
            pageError: true,
            pageErrorMessage: "Page name is already exists",
          });
          setButtonDisable(true);
          Error = true;
        }
      });
    } else {
      if (newPageName === "") {
        Error = true;
        setPageHasError({
          ...pageHasError,
          pageError: true,
          pageErrorMessage: "Page name should not be empty",
        });
        setButtonDisable(true);
      }
    }

    if (Error === false) {
      try {
        setLoading(true);
        const resp = await editPage(
          modifiedPageData.pageId,
          newPageName,
          dashboardConfig?.selectedDashboard?.dashboardId
        );

        if (resp.status === 200) {
          let page = [...pages];
          page = page.map((item) => {
            if (item.pageId === modifiedPageData.pageId) {
              item.pageName = resp.data.pageName;
            }
            return item;
          });
          setPages(page);
          await updateStoreData();
          setOpenPageDialog(null);
          setLoading(false);
          setButtonDisable(false);
          toast.success("Page Name edited successfully");
        }
      } catch (err) {
        setLoading(false);
        toast.error(err, { theme: "white", color: "red" });
      }
    } else {
      setButtonDisable(true);
    }
  };

  const updateStoreData = async () => {
    try {
      setLoading(true);
      const dashboardResp = await getDashboards();
      if (dashboardResp.status === 200 && dashboardResp?.data) {
        let allDashboards = dashboardResp.data;
        let selectedDashboard = dashboardConfig?.selectedDashboard;
        const updatedDashboard = allDashboards.find(
          (item) => item.dashboardId === selectedDashboard.dashboardId
        );
        selectedDashboard.pages = updatedDashboard.pages;
        // if (selectedDashboard.selectedPage?.pageId) {
        //   const updatedPage = updatedDashboard.pages.find(
        //     (item) => item.pageId === selectedDashboard.pages[selectedDashboard.pages.length-1]?.pageId
        //   );
        //   selectedDashboard.selectedPage = updatedPage;
        // }
        const index = selectedDashboard.pages.findIndex(
          (item) => item.pageName === newPageName
        );
        index === -1 ? setSelectedPage(0) : setSelectedPage(index);
        dispatch(
          DashboardActions.updateDashboardRefresh({
            allDashboards,
            selectedDashboard,
          })
        );
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const handlePageDelete = async () => {
    try {
      setLoading(true);
      const resp = await deletePage(modifiedPageData.pageId);
      if (resp.status === 200) {
        let page = [...pages];
        page = page.filter((item) => item.pageId !== modifiedPageData.pageId);
        setPages(page);
        if (page.length === 0) {
          await updateStoreData();
          fetchData();
        } else if (modifiedPageData.pageId === selectedPageData.pageId) {
          handleChange(0);
          updateStoreData();
        } else {
          updateStoreData();
        }
        setOpenPageDialog(null);
        setLoading(false);
        toast.success(" Page deleted sucessfully");
      }
    } catch (err) {
      setLoading(false);

      toast.error(err, { theme: "white", color: "red" });
    }
  };

  const handlePageDuplicate = async () => {
    const pageAry = pages?.map((obj) => {
      return obj.pageName;
    });
    if (pageAry.indexOf(newPageName) !== -1) {
      setPageHasError({
        ...pageHasError,
        pageError: true,
        pageErrorMessage: "Page name is already exist",
      });
    } else {
      setOpenPageDialog(null);
      try {
        setLoading(true);
        const pageResp = await duplicatePage(
          newPageName,
          modifiedPageData.pageId
        );
        if (pageResp.status === 200) {
          await updateStoreData();
          toast.success(pageResp.data.msg);
        }
      } catch (err) {
        setLoading(false);
        if (err.response.data === "Page Name already exists") {
          toast.error(err.response.data, { theme: "white", color: "red" });
        }
        toast.error(err, { theme: "white", color: "red" });
      }
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      panels = {};
      let layout = {};
      if (
        dashboardConfig?.selectedDashboard &&
        dashboardConfig?.selectedDashboard?.dashboardId
      ) {
        layout = { ...dashboardConfig.selectedDashboard };

        if (dashboardConfig?.selectedDashboard.selectedPage) {
          setNewPageName(
            dashboardConfig?.selectedDashboard.selectedPage.pageName
          );
          setSelectedPageData(dashboardConfig?.selectedDashboard.selectedPage);
        } else if (dashboardConfig?.selectedDashboard.pages?.length) {
          setNewPageName(
            dashboardConfig?.selectedDashboard.pages[selectedPage].pageName
          );
          setSelectedPageData(
            dashboardConfig?.selectedDashboard.pages[selectedPage]
          );
        }
        layout = dashboardConfig.dashboards.filter(
          (data) => data.dashboardId === dashId
        )[0];
        selectedDashboard = dashboardConfig?.selectedDashboard;
        selectedDashboard.selectedPage =
          dashboardConfig?.selectedDashboard?.pages?.[selectedPage];
        getPanelsData(dashId, layout, selectedPage);
      } else {
        let dashboardResp = dashboardData[0] ? dashboardData[0] : dashboardData;
        if (!dashboardResp) {
          dashboardResp = await getDashboards();
        } else {
          dashboardResp = dashboardData;
        }
        if (dashboardResp.status === 200 && dashboardResp?.data) {
          layout = dashboardResp.data.filter(
            (data) => data.dashboardId === dashId
          )[0];
          getPanelsData(dashId, layout, selectedPage);
        } else {
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getPanelsData = async (dashboardId, layout, currentPage) => {
    if (layout?.pages && layout?.pages.length) {
      const pages = layout.pages;
      setPages(pages);
      let pageData =
        layout.pages[currentPage || location.state?.currentPage || 0];
      let currentPageIndex;
      let pageId = sessionStorage.getItem("pageName");
      let info = updateDashboardDetails;
      info &&
        info?.map((x, index) => {
          x?.pages?.map((currentPageId, index) => {
            if (currentPageId?.pageId === pageId) {
              currentPageIndex = index;
            }
          });
        });
      setSelectedPage(
        currentPageIndex || currentPage || location.state?.currentPage || 0
      );

      setFilteredPages(pages);
      const ids = pageData?.panelInfos?.reduce(
        (acc, obj) => [...acc, obj.panelId],
        []
      );
      const max = ids && ids.length ? Math.max(...ids) : 0;
      layout.newCounter = max;
      if (ids === undefined || ids.length === 0) {
        layout.dashboard_config = [
          {
            applicationId: dashboardId,
            pageId: pageData?.pageId,
            metadata: {
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
          },
        ];
        setLayouts(layout);
        setLoading(false);
      }
      for (const key in ids) {
        fetchPanelData(
          dashboardId,
          ids[key],
          ids,
          dashboardConfig?.selectedDashboard?.selectedPage?.pageId
            ? dashboardConfig?.selectedDashboard?.selectedPage?.pageId
            : layout.pages[0].pageId,
          layout
        );
      }
    } else {
      setPages([]);
      setLayouts(layout);
      setLoading(false);
    }
  };

  const fetchPanelData = async (dashboardId, panelId, panelIds, pageId) => {
    let panelResp = {};
    let newData = true;
    try {
      let panelDataToUse = {}; // if data already in reducer
      dashboardConfig?.dashboards?.forEach((obj) => {
        if (obj.dashboardId === dashboardId) {
          obj?.pages.forEach((pageData) => {
            if (pageData.pageId === pageId) {
              pageData?.panelInfos.forEach((panelData) => {
                if (panelData.panelId === panelId) {
                  panelDataToUse = panelData;
                }
              });
            }
          });
        }
      });
      if (panelDataToUse?.metadata) {
        panelResp = { status: 200, data: panelDataToUse };
        newData = false;
      } else {
        let dashboardRequest = {};
        dashboardRequest.panelId = panelId;
        dashboardRequest.dashboardId = dashboardId;
        let filteredData = getFiltereDataobject(dashboardRequest);
        if (!filteredData) {
          panelResp = await getPanelDetails(dashboardRequest);
        } else {
          panelResp = filteredData.data;
        }
      }
      setLoading(false);
      if (panelResp.status === 200 && panelResp?.data) {
        if (newData) {
          dispatch(
            DashboardActions.storedPannelData({
              pageId: pageId,
              data: panelResp?.data,
            })
          );
        }
        const data = panelResp?.data;
        data.pageId = pageId;
        let metadata = panelResp?.data?.metadata;
        if (metadata.x !== undefined && metadata.y !== undefined) {
          if (metadata.x === null) {
            metadata.x = 0;
          }
          if (metadata.y === null) {
            metadata.y = Infinity;
          }
          metadata.i = panelResp.data.panelId;
          metadata.refreshRate = refreshRate;
          data.metadata = metadata;
          panels[panelId] = data;
          let total = 0;
          Object.values(panels).forEach((element) => {
            total += element.metadata.w;
          });
          if (Object.keys(panels).length === panelIds.length) {
            panels["9999"] = {
              applicationId: dashboardId,
              pageId: pageId,
              metadata: {
                i: 9999,
                x: total % (cols || 12),
                y: Infinity,
                w: 4,
                h: 4,
                visualizationData: { type: "new", chartType: "new" },
              },
            };
          }
          const temp = { ...layouts };
          temp.dashboard_config = Object.values(panels);
          setLayouts(temp);
          temp.dashboardId = dashboardId;
          dispatch(DashboardActions.updatePanels(temp));
        }
      } else {
        console.log(panelResp);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dashboardConfig?.selectedDashboard !== selectedDashboard) {
      selectedDashboard = dashboardConfig?.selectedDashboard;

      if (dashboardConfig?.selectedDashboard?.selectedPage) {
        selectedDashboard.selectedPage =
          dashboardConfig?.selectedDashboard?.selectedPage;
      } else if (dashboardConfig?.selectedDashboard?.pages) {
        selectedDashboard.selectedPage =
          dashboardConfig?.selectedDashboard?.pages[0];
      }
      fetchData();
    }
  }, [dashboardConfig?.selectedDashboard]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFilter = (open, filterId) => {
    setOpenAddFilter(open);
    setFilterId(filterId);
    setSelectedPanel(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setOpenFilterList(open);
    setSelectedPanel(null);
  };
  const handleAddFilterPanelLvl = (open, selectedPanel, PanelLvlFilterId) => {
    setOpenAddFilter(open);
    setFilterId(PanelLvlFilterId);
    setSelectedPanel(selectedPanel);
    setOpenFilterList(null);
  };

  const toggleDrawerPanelLvl = (open, selectedPanel) => (event) => {
    setOpenFilterList(open);
    setSelectedPanel(selectedPanel);
  };

  const isBarChartClicked = dashboardConfig.isBarChartClicked;
  const drillDownPopup = (requestData, apiDrillData) => {
    dispatch(DashboardActions.updateIsPopUpEnabled(true));

    if (enablePopUp === false && isBarChartClicked === false) {
      setFirstLayerData(
        layouts?.dashboard_config.filter(
          (item) => item?.panelId === requestData?.panelId
        )
      );
      setFirstLayerDrillData(apiDrillData);
    }
    setDrillPanelData(
      layouts?.dashboard_config.filter(
        (item) => item?.panelId === requestData?.panelId
      )
    );

    setDrillData(apiDrillData);
    setenablePopUp(true);
  };

  useEffect(() => {
    if (enablePopUp) {
      dispatch(DashboardActions.updateisBarChartClicked(false));
    }
  }, [enablePopUp]);

  return (
    <>
      {enablePopUp && (
        <DashboardPanel
          drillData={drillData}
          setenablePopUp={setenablePopUp}
          drillDownPopup={drillDownPopup}
          config={drillPanelData}
          isPopUpEnable={enablePopUp}
          firstLayerData={firstLayerData}
          firstLayerDrillData={firstLayerDrillData}
        />
      )}
      <DrawerHeader style={{ minHeight: "30px" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: sidebarFlag ? "75%" : "95%",
          padding: "5px 20px",
          color: "var(--dashboardBgColor)",
          fontSize: "16px",
          position: "relative",
          bottom: 25,
          marginLeft: sidebarFlag ? "11.2%" : "3%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            style={{
              padding: 0,
              marginLeft: 0,
              marginTop: "10px",
              color: "#000",
            }}
          >
            <KeyboardBackspaceIcon
              onClick={() => {
                navigate(`/dashboardlist`);
              }}
            />
          </IconButton>

          <h3
            style={{
              margin: "1px",
              textAlign: "start",
              fontWeight: "bold",
              color: "#000",
              padding: "5px",
              whiteSpace: "nowrap",
              marginTop: "10px",
            }}
          >
            {dashboardPageName ? (
              dashboardPageName
            ) : (
              <CircularProgress color="inherit" />
            )}
          </h3>
        </div>

        <div
          style={{
            width: "98%",
            height: "3rem",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "50px",
          }}
        >
          <TextField
            type="search"
            size="small"
            variant="outlined"
            placeholder="Search Page"
            style={{
              height: "30px",
              width: "15rem",
              marginTop: "10px",
              position: "relative",
              left: 30,
            }}
            onChange={(e) => {
              handleSearchPage(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                color: "#000",
                paddingRight: 0,
                marginLeft: 20,
                height: 35,
              }, // Change input text color
            }}
          />
        </div>

        <div
          style={{ display: "flex", padding: "5px 0 0 0", marginTop: "7px" }}
        >
          {userRole !== "ENDUSER" && (
            <div>
              <Tooltip
                title="Add Filter"
                // PopperProps={{ style: { marginTop: -12 } }}
              >
                <IconButton style={{ padding: 0, margin: 0 }}>
                  <FaFilter
                    size="20"
                    cursor="pointer"
                    onClick={() => handleAddFilter(true)}
                    style={{ padding: "4px 0 0 0", marginRight: "10px" }}
                    color="#000"
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}

          {(selectedDashboard?.settings?.filters?.length > 0 ||
            selectedPanel?.metadata?.filters?.length > 0) && (
            <div>
              <Tooltip
                title="View Filters"
                PopperProps={{ style: { marginTop: -12 } }}
              >
                <IconButton style={{ padding: 0, margin: 0 }}>
                  {selectedDashboard?.settings?.filters?.length > 0 && (
                    <AiOutlineFundView
                      size="30"
                      cursor="pointer"
                      onClick={toggleDrawer(anchor, true)}
                      color="#000"
                      style={{ padding: "0px 0px" }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Drawer
                anchor={anchor}
                open={openFilterList}
                onClose={toggleDrawer(anchor, false)}
                classes={{ paper: classes.drawer }}
              >
                <div
                  style={{
                    color: "#fff",
                    background: "var(--headerColor)",
                    marginTop: 0,
                    position: "sticky",
                    top: "0",
                    zIndex: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "380px",
                    height: "35px",
                    marginLeft: sidebarFlag ? "2.2%" : "4%",
                  }}
                >
                  <IconButton
                    style={{ position: "absolute", left: 0, color: "white" }}
                  >
                    <ChevronRightIcon
                      onClick={
                        selectedPanel
                          ? toggleDrawerPanelLvl(false, selectedPanel)
                          : toggleDrawer(anchor, false)
                      }
                    />
                  </IconButton>
                  <h3 style={{ margin: 0, padding: 12 }}>Filters</h3>
                </div>
                {selectedDashboard &&
                  Object.keys(selectedDashboard).length > 0 && (
                    <FilterControls
                      filters={
                        selectedPanel
                          ? selectedPanel?.metadata?.filters
                          : selectedDashboard?.settings?.filters
                      }
                      handleAddFilter={handleAddFilter}
                      handleAddFilterPanelLvl={handleAddFilterPanelLvl}
                      selectedPanel={selectedPanel}
                    />
                  )}
              </Drawer>
            </div>
          )}
        </div>
      </div>

      {openAddFilter && (
        <AddFilter
          openAddFilter={openAddFilter}
          handleAddFilter={handleAddFilter}
          handleAddFilterPanelLvl={handleAddFilterPanelLvl}
          selectedDashboard={selectedDashboard}
          filterId={filterId || null}
          toggleDrawerPanelLvl={toggleDrawerPanelLvl}
          selectedPanel={selectedPanel}
        />
      )}
      <div
        style={{
          height: "82%",
          position: "relative",
          bottom: 23,
          marginLeft: sidebarFlag ? "2.2%" : "4%",
          Width: sidebarFlag ? "98%" : "95%",
        }}
      >
        <AppBar
          position="static"
          color="inherit"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: sidebarFlag ? "76%" : "98%",
            background: "var(--dashboardBgColor)",
            height: 35,
            marginLeft: sidebarFlag ? "11%" : "1%",
          }}
        >
          <div style={{ display: "flex" }}>
            <Tooltip title="First Page">
              <IconButton
                disabled={selectedPage === 0}
                style={{ paddingLeft: 6, paddingRight: 2 }}
              >
                <FirstPageIcon
                  onClick={() => {
                    handleChange(0);
                  }}
                  id="firstButton"
                  style={{
                    color: "var(--colorforwhite)",
                    cursor: "pointer",
                    opacity: selectedPage === 0 ? 0.6 : 1,
                  }}
                ></FirstPageIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Previous Page">
              <IconButton
                disabled={selectedPage === 0}
                style={{ paddingLeft: 0 }}
              >
                <NavigateBeforeIcon
                  onClick={() => {
                    let pageIndex;
                    if (selectedPage > 0) {
                      pageIndex = selectedPage - 1;
                    } else {
                      pageIndex = 0;
                    }
                    handleChange(pageIndex);
                  }}
                  id="prevButton"
                  disableRipple
                  style={{
                    color: "var(--colorforwhite)",
                    cursor: "pointer",
                    opacity: selectedPage === 0 ? 0.6 : 1,
                  }}
                ></NavigateBeforeIcon>
              </IconButton>
            </Tooltip>
            <div style={{ width: sidebarFlag ? "73vw" : "83vw" }}>
              <Tabs
                value={selectedPage}
                onChange={handleChange}
                aria-label="full width tabs example"
                variant="scrollable"
                textColor="var(--color)"
                TabIndicatorProps={{
                  style: {
                    height: "2px",
                    margin: "0px",
                    backgroundColor: "transparent",
                  },
                }}
                scrollButtons="auto"
              >
                {filteredPages?.map((item, index) => (
                  <Tab
                    className="tab-css"
                    label={item.pageName}
                    {...a11yProps(item.pageId)}
                    component={() => (
                      <DashboardTab
                        pages={pages}
                        item={item}
                        index={index}
                        handleChange={() => handleChange(index)}
                        handlePageDialog={handlePageDialog}
                        selected={selectedPage === index}
                      />
                    )}
                  />
                ))}
                {(dashboardConfig?.editLayout ||
                  pages.length === 0 ||
                  filteredPages.length === 0) && (
                  <div
                    style={{
                      minWidth: "72px",
                      boxSizing: "border-box",
                      alignItems: "center",
                      display: "inline-flex",
                      cursor: "pointer",
                      color: "var(--colorforwhite)",
                      minHeight: "35px",
                      width: 1000,
                    }}
                    onClick={() => handlePageDialog("ADD")}
                  >
                    + Add Page
                  </div>
                )}
              </Tabs>
            </div>

            <Tooltip title="Next Page">
              <IconButton
                disabled={selectedPage === pages.length - 1}
                style={{ paddingRight: 0 }}
              >
                <NavigateNextIcon
                  onClick={() => {
                    let pageIndex;
                    if (selectedPage + 1 < pages.length) {
                      pageIndex = selectedPage + 1;
                    } else {
                      pageIndex = pages.length - 1;
                    }
                    handleChange(pageIndex);
                  }}
                  style={{
                    color: "var(--colorforwhite)",
                    cursor: "pointer",
                    opacity: selectedPage === pages.length - 1 ? 0.6 : 1,
                  }}
                ></NavigateNextIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Last Page">
              <IconButton
                disabled={selectedPage === pages.length - 1}
                style={{ paddingLeft: 5 }}
              >
                <LastPageIcon
                  onClick={() => {
                    handleChange(pages.length - 1);
                  }}
                  style={{
                    color: "var(--colorforwhite)",
                    cursor: "pointer",
                    opacity: selectedPage === pages.length - 1 ? 0.6 : 1,
                  }}
                ></LastPageIcon>
              </IconButton>
            </Tooltip>
          </div>
        </AppBar>
        <div
          style={{
            backgroundColor: "#fff",
            boxShadow:
              "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            height: "90%",
            overflow: "scroll",
            width: sidebarFlag ? "76%" : "98%",
            marginLeft: sidebarFlag ? "11%" : "1%"
          }}
        >
          {pages.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "40px",
              }}
            >
              Create a new page
            </div>
          )}
          <TabPanel value={selectedPage} index={selectedPage}>
            <ResponsiveReactGridLayout
              style={{ background: "white" }}
              className="layout"
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={60}
              isDraggable={dashboardConfig?.editLayout}
              isResizable={dashboardConfig?.editLayout}
              onBreakpointChange={onBreakpointChange}
              width={width}
              layouts={layouts?.dashboard_config}
              onDragStop={onLayoutChange}
              onResizeStop={onLayoutChange}
            >
              {layouts?.dashboard_config?.map((item, index, arr) => (
                <div
                  key={item?.metadata?.i}
                  className="widget"
                  data-grid={item?.metadata}
                >
                  <Widget
                    id={item?.metadata?.i}
                    indexData={index}
                    config={item}
                    dashboardId={layouts?.dashboardId}
                    onRemoveItem={onRemoveItem}
                    backgroundColor="#867ae9"
                    onEditItem={onEditItem}
                    onDuplicateItem={onDuplicateItem}
                    onRemove={onRemove}
                    islastItem={arr.length - 2 === index}
                    handleAddFilter={handleAddFilter}
                    toggleDrawer={toggleDrawer}
                    toggleDrawerPanelLvl={toggleDrawerPanelLvl}
                    handleAddFilterPanelLvl={handleAddFilterPanelLvl}
                    drillDownPopup={drillDownPopup}
                  />
                </div>
              ))}
            </ResponsiveReactGridLayout>
          </TabPanel>
        </div>
      </div>
      <Dialog
        open={openDialog}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <div
          style={{
            backgroundColor: "var(--dashboardBgColor)",
            color: "var(--colorforwhite)",
            fontSize: "16px",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle>Duplicate Panel</DialogTitle>
          <IconButton
            aria-label="close"
            style={{ color: "var(--colorforwhite)" }}
          >
            <CloseIcon onClick={handleCloseDialog} />
          </IconButton>
        </div>

        <DialogContent>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="panelName"
            label="Panel Name"
            type="text"
            fullWidth
            variant="standard"
            value={duplicatePanelName}
            //onChange={(e) => setDuplicatePanelName(e.target.value)}
            error={error || panelCloneError}
            helperText={
              (error && "Please Enter Panel Name") ||
              (panelCloneError && "Panel Name shouldn't be same")
            }
            onChange={(e) => {
              setError(null);
              if (e.target.value === "") {
                setError(true);
              }
              setDuplicatePanelName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              textTransform: "none",
              fontSize: "14px",
              backgroundColor: "var(--dashboardBgColor)",
              color: "white",
            }}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            style={{
              textTransform: "none",
              fontSize: "14px",
              backgroundColor: "var(--dashboardBgColor)",
              color: "white",
            }}
            onClick={handleDuplicateSave}
          >
            Clone
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Dialog
          open={openPanelDialog}
          maxWidth="xs"
          fullWidth
          BackdropProps={{
            classes: {
              root: classes.backDrop,
            },
          }}
        >
          <div
            style={{
              backgroundColor: "var(--dashboardBgColor)",
              color: "var(--colorforwhite)",
              fontSize: "16px",
              height: "50px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <DialogTitle>Delete Panel</DialogTitle>

            <IconButton
              aria-label="close"
              style={{ color: "var(--colorforwhite)" }}
            >
              <CloseIcon onClick={handleClosePanelDialog} />
            </IconButton>
          </div>
          <DialogContent>
            <div>
              Are you sure you want to delete{" "}
              <span
                style={{
                  color: "var(--dashboardBgColor)",
                  fontWeight: "bold",
                }}
              >
                {selectedPanelName}
              </span>{" "}
              panel ?
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                color: "white",
                fontSize: "14px",
                textTransform: "none",
              }}
              onClick={handleClosePanelDialog}
            >
              No
            </Button>
            <Button
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                color: "white",
                fontSize: "14px",
                textTransform: "none",
              }}
              onClick={onRemoveItem}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog
        open={openPageDialog}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <div
          style={{
            backgroundColor: "var(--dashboardBgColor)",
            color: "var(--colorforwhite)",
            fontSize: "16px",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle>{dialogTitle}</DialogTitle>
          <IconButton
            aria-label="close"
            style={{ color: "var(--colorforwhite)" }}
          >
            <CloseIcon onClick={handleClosePageDialog} />
          </IconButton>
        </div>

        <DialogContent>
          {(openPageDialog === "ADD" ||
            openPageDialog === "EDIT" ||
            openPageDialog === "DUPLICATE") && (
            <TextField
              autoFocus
              autoComplete="off"
              margin="dense"
              id="pageName"
              label="Page Name"
              type="text"
              fullWidth
              required
              variant="standard"
              value={newPageName}
              error={pageHasError.pageError}
              helperText={
                pageHasError.pageError ? pageHasError.pageErrorMessage : ""
              }
              onChange={(e) => {
                const pageAry = pages.map((obj) => {
                  return obj.pageName;
                });
                setPageHasError({
                  ...pageHasError,
                  pageError: false,
                  pageErrorMessage: "",
                });
                if (e.target.value === "") {
                  setPageHasError({
                    ...pageHasError,
                    pageError: true,
                    pageErrorMessage: "Page name should not be empty",
                  });
                  setButtonDisable(true);
                } else if (pageAry.includes(e.target.value)) {
                  setPageHasError({
                    ...pageHasError,
                    pageError: true,
                    pageErrorMessage: "Page Name Already Exists",
                  });
                  setButtonDisable(true);
                } else {
                  setButtonDisable(false);
                }
                setNewPageName(e.target.value);
              }}
            />
          )}
          {openPageDialog === "DELETE" && (
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "black" }}
            >
              Are you sure you want to delete{" "}
              <span
                style={{
                  color: "var(--dashboardBgColor)",
                  fontWeight: "bold",
                }}
              >
                {modifiedPageData.pageName}
              </span>{" "}
              page?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              textTransform: "none",
              fontSize: "14px",
              color: "white",
              backgroundColor: "var(--dashboardBgColor)",
            }}
            onClick={handleClosePageDialog}
          >
            Cancel
          </Button>
          <Button
            style={{
              textTransform: "none",
              fontSize: "14px",
              color: "white",
              backgroundColor: "var(--dashboardBgColor)",

              cursor: buttonDisable ? "not-allowed" : "pointer",
              opacity: buttonDisable ? 0.6 : 1,
            }}
            onClick={handleDialogSave}
            disabled={openPageDialog === "DELETE" ? false : buttonDisable}
          >
            {openPageDialog === "DELETE" ? "Delete" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop style={{ color: "black", zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <renderChart
      pages={pages}
      /> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ width: "300px" }}
        theme="colored"
        toastStyle={{ backgroundColor: "white", color: "var(--selectedTab)" }}
      />
    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(
  Dashboard
);
