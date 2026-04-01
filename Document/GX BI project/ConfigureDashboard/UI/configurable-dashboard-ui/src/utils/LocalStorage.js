export function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export function storeValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function clearItem(key) {
  localStorage.removeItem(key);
}

export function clearAll() {
  localStorage.clear();
  sessionStorage.clear();
}

export const getFilterKey = (dashboardRequest) => {
  return `${dashboardRequest.dashboardId},${dashboardRequest.panelId} `;
};

export const saveFiltereDataObject = (dashboardRequest, filterData) => {
  const filterKey = getFilterKey(dashboardRequest);
  if (filterData === "undefined") {
    localStorage.setItem(filterKey, JSON.stringify(null));
  } else {
    localStorage.setItem(filterKey, JSON.stringify(filterData));
  }
};

export const getFiltereDataobject = (dashboardRequest) => {
  const filterKey = getFilterKey(dashboardRequest);
  return JSON.parse(localStorage.getItem(filterKey));
};

export const getFiltereData = (dataSourceId) => {
  return JSON.parse(localStorage.getItem(dataSourceId));
};

export const saveFiltereData = (dataSourceId, filterData) => {
  if (filterData === "undefined") {
    localStorage.setItem(dataSourceId, JSON.stringify(null));
  } else {
    localStorage.setItem(dataSourceId, JSON.stringify(filterData));
  }
};

export const getExcelFilterKey = (dashboardRequest) => {
  return `${dashboardRequest.panelId} `;
};
export const getFiltereExcelDataobject = (dashboardRequest) => {
  const filterKey = getExcelFilterKey(dashboardRequest);
  return JSON.parse(localStorage.getItem(filterKey));
};
export const saveExcelFiltereData = (dashboardRequest, filterData) => {
  if (filterData === "undefined") {
    localStorage.setItem(dashboardRequest.panelId, JSON.stringify(null));
  } else {
    localStorage.setItem(
      dashboardRequest.panelId,
      JSON.stringify(filterData.data.fileInfo)
    );
  }
};