import React from "react";
import SearchDashHome from "./SearchDashHome";
import UserHome from "./UserHome";
import GroupHome from "./GroupHome";


const FirstPartHome = () => {
  return (
    <>
      <div style={{backgroundColor:"#f2f2f2   ", margin:"4rem 0.7rem 0.4rem 4.3rem"}}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "90px",
          }}
        >
          <p>
            <UserHome />
          </p>
          <p>
            <GroupHome />
          </p>
          <p>
            <SearchDashHome />
          </p>
        </div>
      </div>
    </>
  );
};

export default FirstPartHome;