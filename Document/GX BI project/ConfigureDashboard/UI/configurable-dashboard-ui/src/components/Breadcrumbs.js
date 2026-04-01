import React from "react";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/dashboard": "Dashboard",
  "/dashboard/query": "Panel Details",
  "/user": "User",
  "/groups": "Groups",
  "/groups/1": "Group Details",
  "/addDatabase": "Add Data Source",
  "/databaseInfo": "Data Source Query Execution",
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs aria-label="Breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="textPrimary" key={to} variant="p">
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <RouterLink color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </RouterLink>
        );
      })}
    </Breadcrumbs>
  );
}
