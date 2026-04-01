import axios from "axios";
import { DASHBOARD_BASE_URL } from "../utils/Config";
import {
  saveExcelFiltereData,
  saveFiltereDataObject,
} from "../utils/LocalStorage";

export async function getAPIData(
  method,
  url,
  body = {},
  headers = {},
  auth = {}
) {
  return await axios({
    method: method,
    url: url,
    data: body,
    headers: headers,
  });
}

export async function getDashboards() {
  const data = {
    groupName: "CAI_DASHBOARD_DEV",
  };
  return await axios.post(DASHBOARD_BASE_URL + "dashboard/getDetails", data);
}

export async function createDashboard(formvalues) {
  return await axios.post(DASHBOARD_BASE_URL + "dashboard/save", formvalues);
}

export async function createDuplicateDashboard(formvalues) {
  return await axios.post(
    DASHBOARD_BASE_URL + "dashboard/duplicate",
    formvalues
  );
}

export async function getPanels(id = 1) {
  return await axios.get(DASHBOARD_BASE_URL + "panel/getDashboardPanels/" + id);
}

export async function getPanelDetails(dashboardRequest) {
  let response = await axios.get(
    DASHBOARD_BASE_URL +
      "panel/getPanelInfo/" +
      dashboardRequest.dashboardId +
      "/" +
      dashboardRequest.panelId
  );
  saveFiltereDataObject(dashboardRequest, response);
  return response;
}

export async function getQueryData(respData, modifiedQuery) {
  const data = {
    dataSourceConfig: respData,
    metricsRequest: {
      query: modifiedQuery,
    },
  };
  return await axios.post(DASHBOARD_BASE_URL + "metrics/find", data);
}
export async function getDrillDown(respData, modifiedQuery) {
  const data = {
    dataSourceConfig: respData,
    metricsRequest: {
      query: modifiedQuery,
    },
  };

  return await axios.post(DASHBOARD_BASE_URL + "metrics/find", data);
}
export async function getTableData(respData, schema) {
  const data = {
    dataSourceConfig: respData,
    metricsRequest: {
      schema: schema,
    },
  };
  return await axios.post(DASHBOARD_BASE_URL + "dsschemas/find", data);
}

export async function validateQuery(respData, modifiedQuery) {
  const data = {
    dataSourceConfig: respData,
    metricsRequest: {
      query: modifiedQuery,
    },
  };
  return await axios.post(DASHBOARD_BASE_URL + "metrics/query", data);
}

export async function savePanel(dashboardId, formvalues) {
  const data = {
    ...formvalues,
    accountId: "100",
    applicationId: dashboardId,
  };
  return await axios.post(DASHBOARD_BASE_URL + "panel/save", data);
}

export async function deletePanel(dashboardId, panelId) {
  return await axios.delete(
    DASHBOARD_BASE_URL + `panel/delete/${dashboardId}/${panelId}`
  );
}
export async function deleteDashboard(dashboardId) {
  return await axios.delete(
    DASHBOARD_BASE_URL + `dashboard/delete/${dashboardId}`
  );
}

export async function createPage(pageName, applicationId) {
  const data = {
    pageName: pageName,
    applicationId: applicationId,
  };
  return await axios.post(DASHBOARD_BASE_URL + "page/save", data);
}

export async function testconnection(data) {
  return await axios.post(
    DASHBOARD_BASE_URL + "datasource/testconnection",
    data
  );
}

export async function duplicatePage(pageName, pageId) {
  const data = {
    pageId: pageId,
    pageName: pageName,
  };
  return await axios.post(DASHBOARD_BASE_URL + "page/duplicate", data);
}

export async function editPage(pageId, pageName, applicationId) {
  const data = {
    pageName: pageName,
    applicationId: applicationId,
  };
  return await axios.put(DASHBOARD_BASE_URL + `page/update/${pageId}`, data);
}

export async function deletePage(pageId) {
  return await axios.delete(DASHBOARD_BASE_URL + `page/delete/${pageId}`);
}
export async function SaveExcelData(data) {
  return await axios.post(DASHBOARD_BASE_URL + "file/add", data);
}

export async function getExcelData(actorId, panelId) {
  let response = await axios.get(
    DASHBOARD_BASE_URL + `file/fetch/${actorId}/${panelId}`
  );
  let dashboardRequest = {};
  dashboardRequest.actorId = actorId;
  dashboardRequest.panelId = panelId;
  saveExcelFiltereData(dashboardRequest, response);
  return response;
}

export async function editExcelData(data) {
  return await axios.put(DASHBOARD_BASE_URL + `file/update`, data);
}

export async function deleteExlPanel(actorId, panelId) {
  return await axios.delete(
    DASHBOARD_BASE_URL + `file/delete/${actorId}/${panelId}`
  );
}
