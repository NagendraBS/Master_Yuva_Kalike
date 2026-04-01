import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStorageValue } from "../utils/LocalStorage";
import { getDashboards } from "../services/DashboardServices";
import DashboardActions from "../actions/dashboardAction";

function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //const dashboardDetails = useSelector((state) => state.dashboard);

  const navigateDash = async () => {
    const dName = await getDashboards();
    sessionStorage.setItem("applicationId", dName?.data[0]?.dashboardId);
    sessionStorage.setItem("dashboardName", dName?.data[0]?.dashboardName);
    dispatch(DashboardActions.switchDashboard(dName?.data[0]));
    navigate(
      `../dashboard/${dName?.data[0]?.dashboardName?.split(" ").join("")}`
    );
  };

  useEffect(() => {
    const userInfo = getStorageValue("userInfo");
    const userRole = JSON.parse(localStorage.getItem("userInfo")).roleInfo
      .roleName;
    if (userInfo && userRole === "SUPERADMIN") {
      navigate("../organization");
    } else if (userRole === "ORGANIZATIONADMIN") {
      navigate("../user");
    } else if (userRole === "ENDUSER") {
      navigate("../dashboardlist");
    } else if (userRole === "DEVELOPER") {
      navigateDash("../dashboardlist");
    } else {
      navigate("../login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}

export default Home;
