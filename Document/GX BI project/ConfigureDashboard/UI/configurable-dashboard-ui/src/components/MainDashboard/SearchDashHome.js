/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import { getDashboards } from "../../services/DashboardServices";
import { getGroups } from "../../services/AdminServices";
import { useNavigate } from "react-router-dom";
import './SearchDashHome.css';
import { InputAdornment } from "@material-ui/core";

const SearchDashHome = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardNames, setDashboardNames] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const orgId = JSON.parse(localStorage.getItem("userInfo"))?.organizationId;
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await getDashboards(); // Assuming getDashboards() returns the API response
      setDashboardNames(resp?.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const [rowData, setRowData] = useState([]);
  const fetchGroup = async () => {
    setLoading(true);
    try {
      const resp = await getGroups(orgId);
      const groupList = resp?.data.groupInfoList || [];
      setRowData(groupList); // Make sure to extract the groupInfoList array
      setGroupNames(groupList); // Set group objects as an array

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGroup();
  }, []);

  const handleOptionChange = (event, newOption) => {
    setSelectedOption(newOption);
    setSearchQuery("");
  };

  const getFilteredNames = () => {
    if (selectedOption === "Dashboard") {
      return dashboardNames.map((dashboard) => dashboard.dashboardName);
    } else if (selectedOption === "Groups") {
      return groupNames.map((group) => group.groupName); // Assuming group object has groupName property
    }
    return [];
  };

  const filteredNames = getFilteredNames().filter(
    (name) => name && name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleNavigateToGroup = (rowData) => {
    const selectedGroup = groupNames.find(
      (group) => group.groupName.toLowerCase() === searchQuery.toLowerCase()
    );
    if (selectedGroup) {
      rowData = selectedGroup;
      const groupId = selectedGroup.groupId;
      navigate(`/groups/${groupId}`, { state: { rowData } });
    }
  };
  return (
    <div
      style={{
        width: "460px",
        height: "2.8rem",
        display: "flex",
        margin: "0px 30px 10px 40px",
        padding: "7px 10px 2px 10px",
        backgroundColor: "white",
        borderRadius: "0px",
        justifyContent:"center"
      }}
    >
      <div
        className="search"
        style={{
          width: "200px",
          height: "3rem",
        }}
      >
        <Autocomplete
          style={{ width: "140px", padding: "0px 10px 0px 0px" }}
          options={["Dashboard", "Groups"]}
          value={selectedOption}
          onChange={handleOptionChange}
          disableClearable
          className="custom-autocomplete"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Type"
              variant="outlined"
              className="custom-input"
            />
          )}
        />
      </div>
      <div
        style={{
          width: "370px",
          height: "2.8rem"
        }}
      >
        <Autocomplete
          freeSolo
          options={filteredNames}
          inputValue={searchQuery}
          onInputChange={(event, newInputValue) => {
            setSearchQuery(newInputValue);
          }}
          className="custom-autocomplete"
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search Name"
              className="custom-inputs"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                  <InputAdornment>
                    <SearchIcon
                      style={{
                        cursor: "pointer",
                        marginRight: "0px",
                        marginTop:"-10px"
                      }}
                      onClick={() => {
                        if (selectedOption === "Dashboard") {
                          const selectedDashboard = dashboardNames.find(
                            (dashboard) =>
                              dashboard.dashboardName.toLowerCase() ===
                              searchQuery.toLowerCase()
                          );
                          if (selectedDashboard) {
                            sessionStorage.setItem(
                              "applicationId",
                              selectedDashboard.dashboardId
                            );
                            sessionStorage.setItem(
                              "dashboardName",
                              searchQuery
                            );
                            navigate(`../dashboard/${searchQuery}`);
                          }
                        } else if (selectedOption === "Groups") {
                          handleNavigateToGroup(rowData);
                        }
                      }}
                    />
                    </InputAdornment>

                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default SearchDashHome;