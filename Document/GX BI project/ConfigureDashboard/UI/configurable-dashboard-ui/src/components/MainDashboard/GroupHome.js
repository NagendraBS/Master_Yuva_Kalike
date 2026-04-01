import React, { useEffect, useState } from "react";
import groupicon from "../MainDashboard/images/Groups_o1.png";
import growth from "../MainDashboard/images/up.png";
import "./SearchDashHome.css"; 
import { getGroupsCount } from "../../services/AdminServices";

const GroupHome = () => {
  const [groupCount, setGroupCount] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const enterpriseId = JSON.parse(
          localStorage.getItem("userInfo")
        )?.enterpriseId;
        const response = await getGroupsCount(enterpriseId);
        if (response.status === 200 && response.data) {
          setGroupCount(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="group-container">
        <div className="group-info">
          <div className="group-title">Groups</div>
          <div className="group-icon">
            <img src={growth} alt="logo" />
          </div>
        </div>
        <div>
        <div className="group-count">
        {groupCount} 
        </div>
        <div className="group-active" > +Active Groups</div>
        </div>
        <div className="group-logo">
          <img src={groupicon} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default GroupHome;