import React, { useEffect, useState } from "react";
import groupicon from "../MainDashboard/images/Groups_o1.png";
import growth from "../MainDashboard/images/up.png";
import "./SearchDashHome.css"; 
import { getUsersCount } from "../../services/AdminServices";

const UserHome = () => {
  const [userCount, setUserCount] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const enterpriseId = JSON.parse(
          localStorage.getItem("userInfo")
        )?.enterpriseId;
        const response = await getUsersCount(enterpriseId);
        if (response.status === 200 && response.data) {
          setUserCount(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="user-container">
        <div className="user-info">
          <div className="group-title">Users</div>
          <div className="group-icon">
            <img src={growth} alt="logo" />
          </div>
        </div>
        <div>
        <div className="group-count">
        {userCount} 
        </div>
        <div className="group-active" > +Active Users</div>
        </div>
        <div className="user-logo">
          <img src={groupicon} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default UserHome;