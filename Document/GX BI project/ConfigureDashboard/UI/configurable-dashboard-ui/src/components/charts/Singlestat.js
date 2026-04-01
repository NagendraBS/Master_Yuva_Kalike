/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, memo } from "react";
import { getDatabaseDetails } from "../../services/AdminServices";
import { getDrillDown } from "../../services/DashboardServices";

const Singlestat = ({
  page,
  data,
  settingsData,
  setSettingsData,
  defaultData,
  drillDownPopup
}) => {
  const [value, setValue] = useState(null);
  const requestData = {
    dataSourceType: defaultData?.metadata?.dataSourceType,
    applicationId: defaultData?.applicationId,
    panelId: defaultData?.panelId,
    host: defaultData?.metadata?.host,
    schema: defaultData?.metadata?.schema,
    query: defaultData?.metadata?.query,
    pageId: defaultData?.pageId,
    dataSourceId: defaultData.metadata.dataSourceId
  }

  useEffect(() => {
    const temp = data?.[0];
    if (settingsData?.statData?.value && temp) {
      setValue(temp[settingsData?.statData?.value]);
    }
  }, [data, settingsData]);

  const getDefaultValues = (type) => {
    if (page === "query") {
      let headers = [];
      Object.keys(data[0]).forEach((item) => {
        headers.push(item);
      });
      const tempData = { ...settingsData };
      let show = {
        value: headers[0],
        options: {
          headers,
          events: {
            click: async function (config) {
              let label = config?.config?.labels[config?.dataPointIndex];
            let x = requestData.query.replace("limit", `where ${settingsData?.data?.value}='${label}' limit`);
            requestData.query = x;
            const getDataSourceResp = await getDatabaseDetails(requestData.dataSourceId);
            const respData = getDataSourceResp.data;
            requestData.cacheFlag = false;
            requestData.connectionType = requestData?.dataSourceType && requestData?.dataSourceType.trim();
            const drillDownData = await getDrillDown(respData, x);
            drillDownPopup(requestData, drillDownData.data.data);
            }
          }
        },
      };
      tempData.statData = show;
      tempData.fontSize = { value: 40 };
      setSettingsData(tempData, type);
    }
  };

  useEffect(() => {
    if (defaultData !== null) {
      getDefaultValues("default");
    }
  }, [defaultData]);

  useEffect(() => {
    getDefaultValues("updated");
  }, []);

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: `${settingsData?.fontSize?.value > 100
            ? 100
            : settingsData?.fontSize?.value
          }px`,
      }}
    >
      {settingsData?.prefix?.value} {value} {settingsData?.postfix?.value}
    </div>
  );
};

export default memo(Singlestat);
