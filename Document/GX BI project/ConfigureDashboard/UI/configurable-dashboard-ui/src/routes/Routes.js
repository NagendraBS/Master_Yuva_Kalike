import Group from "../components/group/Group";
import Groups from "../components/group/Groups";
import User from "../components/User";
import Dashboard from "../container/dashboard/Dashboard";
import Home from "../container/Home";
import Login from "../container/login/Login";
import MainLayout from "../container/MainLayout";
import MinimalLayout from "../container/MinimalLayout";
import QueryComponent from "../container/QueryComponent";
import SuperAdmin from "../components/SuperAdmin/SuperAdmin";
import BrowseData from "../components/databases/BrowseData";
import AddDatabase from "../components/databases/AddDatabase";
import Enterprise from "../components/Enterprise/Enterprise";
import DashboardList from "../components/DashboardPage/DashboardList";
import NetworkGraphHome from "../components/MainDashboard/NetworkGraphHome";
import NewtworkGraphIcon from "../components/MainDashboard/NewtworkGraphIcon";
import FirstPartHome from "../components/MainDashboard/FirstPartHome";
import PinDashHome from "../components/MainDashboard/PinDashHome"
export const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
  ],
};

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path:"dashboardlist",
      element:<DashboardList/>,
    },
  
    {
      path: "dashboard",
      children: [
        {
          path: ":name",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "dashboard/:name",
      children: [
        {
          path: "query",
          element: <QueryComponent />,
        },
      ],
    }, 
    {
      path: "user",
      element: <User />,
    },
    {
      path: "networknode",
      element: <NetworkGraphHome />,
    },
    {
      path: "networkicon",
      element: <NewtworkGraphIcon />,
    },
    
    {
     path: "firstlinesearch",
     element: <FirstPartHome/>,
    },
    {
      path:"enterprise",
      element:<Enterprise/>,
    },
   {
      path: "groups",
      element: <Groups />,
    },
    {
      path: "groups",
      children: [
        {
          path: ":id",
          element: <Group />,
        },
      ],
    },
    {
      path: "drill",
      element: <PinDashHome />,
    },
    {
      path: "organization",
      element: <SuperAdmin />,
    },
    {
      path: "databases",
      element: <BrowseData />,
    },
    {
      path: "addDatabase",
      element: <AddDatabase />,
    },
    {
      path: "*",
      element: <Home />,
    }
  ],
};
