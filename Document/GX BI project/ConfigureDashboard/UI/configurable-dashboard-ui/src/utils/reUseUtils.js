import {getDatabaseDetails} from '../services/AdminServices'
import {getFiltereData} from '../utils/LocalStorage'

export const storedDatabaseDetails = async (dataSourceId)=>{
    let respData;
    let filteredData = getFiltereData(dataSourceId);
    if (!filteredData || filteredData.length === 0 || filteredData == null) {
      const getDataSourceResp =  await getDatabaseDetails(
        dataSourceId
      );
      respData = getDataSourceResp.data;
    } else {
      respData = filteredData.data;
    }
    return respData;
}