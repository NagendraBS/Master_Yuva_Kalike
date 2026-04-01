/* eslint-disable array-callback-return */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";
import DashboardActions from "../actions/dashboardAction";
import { createDashboard, savePanel } from "../services/DashboardServices";
import UiUtils from "./UiUtils";

const FilterControls = ({ filters, handleAddFilter, handleAddFilterPanelLvl, selectedPanel }) => {
  const userRole = JSON.parse(localStorage.getItem("userInfo")).roleInfo
    .roleName;
  const dashboardConfig = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const { selectedDashboard } = dashboardConfig;

  const handleSelectChange = async (e, value, name, filterId) => {
    const updatedFilters = filters.map((filter) => 
    {
      if (filter.filterId === filterId) 
      {
        if (name) 
        {
          return {
            ...filter,
            filter: { ...filter.filter, selectedOption: value, [name]: value, },
          };
        } 
        else 
        {

          if (filter.filter.filterType === "select") 
          {
            return {
              ...filter,
              filter: { ...filter.filter, selectedOption: [value] },
            };
          }
          else if ((filter.filter.filterType === "multiSelect") )
          {
            return {
              ...filter,
              filter: { ...filter.filter, selectedOption: value },
            };
          }
          else if((filter.filter.filterType === "dateRangePicker"))
          {
            return {
              ...filter,
              filter: { ...filter.filter, selectedOption: value },
            };
          }
        }
      } else {
        return filter;
      }
    });
    if(selectedPanel)
    {
      let payload = {...selectedPanel}
      payload.metadata = {...payload.metadata, filters : updatedFilters}
        try{
           const resp = await savePanel(selectedDashboard.dashboardId, payload);
           if (resp.status === 200) {
            dispatch(DashboardActions.addFilterPanelLvl(resp.data));
          }
        }
        catch(err)
        {
          console.log(err)
        }
    }
    
    else{
      try {
        const data = {
          dashboardName: selectedDashboard.dashboardName,
          groupName: selectedDashboard.groupName,
          dashboardId: selectedDashboard.dashboardId,
          settings: { ...selectedDashboard.settings, filters: updatedFilters },
        };
        const resp = await createDashboard(data);
        if (resp.status === 200) {
          dispatch(DashboardActions.addFilter(data.settings));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div 
    style={{display:"flex",justifyContent:"flex-start"}}
    >
      <List>
        {filters?.map((f) => {
          return (
            < >
            <div style={{width:"380px"}}>
              <ListItem button key={f.filterId}>
                <UiUtils
                  {...f}
                  handleSelectChange={handleSelectChange}
                  handleAddFilter={handleAddFilter}
                />
                {userRole !== "ENDUSER" && (
                
                  <ListItemIcon>
                    <EditIcon
                      title="Edit Filter"
                      fontSize="medium"
                      color="primary"
                      style={{marginLeft:"20px"}}
                      onClick={() => {selectedPanel ? handleAddFilterPanelLvl(true, selectedPanel,f.filterId) : handleAddFilter(true,f.filterId)}}
                      cursor="pointer"
                    />
                  </ListItemIcon>
                )}
              </ListItem>
              <Divider />
              </div>
            </>
          );
        })}
      </List>
    </div>
  );
};

export default FilterControls;
