/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import Header from "../components/Header";
import { drawerWidth } from "../utils/Config";
import { getStorageValue } from "../utils/LocalStorage";
import "./App.css";
import { haveAccess } from "../utils/helper";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import MainActions from "../actions/mianActions";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    ...(open && {
      width: `calc(100% + ${drawerWidth}px)`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const Footer = styled("footer", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function MainLayout() {
  let navigate = useNavigate();
  const userInfo = getStorageValue("userInfo");
  const { name } = useParams();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MainActions.updateSidebarFlag(open));
  }, [open]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userInfo === undefined) {
      navigate("../login");
    } else {
      document.body.style.backgroundColor = "#f2f6fe";
      document.getElementById("year").innerHTML = new Date().getFullYear();
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (location.pathname === "/organization") {
        haveAccess(["SUPERADMIN"])
          ? navigate("../organization")
          : navigate("../home");
      } else if (location.pathname === "/user") {
        haveAccess(["SUPERADMIN", "ORGANIZATIONADMIN"])
          ? navigate("../user")
          : navigate("../home");
      } else if (location.pathname === "/groups") {
        haveAccess(["SUPERADMIN", "ORGANIZATIONADMIN"])
          ? navigate("../groups")
          : navigate("../user");
      } else if (location.pathname === "/databases") {
        haveAccess(["SUPERADMIN", "ORGANIZATIONADMIN", "DEVELOPER"])
          ? navigate("../databases")
          : navigate("../home");
      }
    }
  }, [location.pathname]);

  if (userInfo === undefined) {
    return <div></div>;
  }

  return (
    <div>
      <Header handleDrawerToggle={handleDrawerToggle} open={open} />
      <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
      <div
        className={
          location.pathname === `/dashboard/${name?.split(" ").join("")}`
            ? "main1"
            : "main2"
        }
      >
        <Main
          open={open}
          style={{
            padding: "unset",
            overflow: "hidden",
            marginLeft: "unset",
            height:
              location.pathname === `/dashboard/${name?.split(" ").join("")}`
                ? "calc(100vh - 25px)"
                : "",
            width: "94vw !important",
          }}
        >
          <Outlet />
        </Main>
      </div>
      <div>
        <Footer position="fixed" open={open} style={{ height: 35 }}>
          <div>
            <p style={{ padding: "0 10px", textAlign: "center" }}>
              Copyright <span id="year"></span> GalaxE.Solutions, Inc | All
              Rights Reserved
            </p>
          </div>
        </Footer>
      </div>
    </div>
  );
}

export default MainLayout;
