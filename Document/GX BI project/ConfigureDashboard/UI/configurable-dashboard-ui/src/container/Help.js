import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { haveAccess } from "../utils/helper";
import { ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import "./App";

const Help = () => {
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const style = {
    fontSize: "0.9rem",
  };

  return (
    <div>
      {haveAccess([
        "SUPERADMIN",
        "ORGANIZATIONADMIN",
        "DEVELOPER",
        "ENDUSER",
      ]) && (
        <>
          <Accordion
            style={{ marginBottom: "0.3125rem" }}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMore style={{ color: "var(--colorforwhite)" }} />
              }
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                height: "35px",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", color: "var(--colorforwhite)" }}
              >
                About
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p style={style}>
                  <b>gx BI Application:</b>
                </p>
                <p style={style}>
                  The main scope of gx BI Application is to provide users with a
                  customize and user-friendly interface for viewing and
                  analysing data from various data sources.
                </p>
                <p style={style}>
                  This application allows users to create their own customize
                  dashboards with ability to add and organize the panels, pages
                  and filters and to select datasources they want to display.
                </p>
                <p style={style}>
                  Ultimately, this application aims to help organization make
                  better decisions by providing them with the information they
                  need in a clear and easier understandable format.
                </p>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{ marginBottom: "0.3125rem" }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMore style={{ color: "var(--colorforwhite)" }} />
              }
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                height: "35px",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", color: "var(--colorforwhite)" }}
              >
                User Roles
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p style={style}>
                  <b>Super Admin:</b> Super Admin is a role who can create user
                  with Admin privileges.
                </p>
                <p style={style}>
                  <b>Admin:</b> Users can have all Super Admin access except
                  Organizations & Domain.
                </p>
                <p style={style}>
                  <b>Developer:</b> Role of the Developer is to create only Data
                  source test connection and Dashboards.
                </p>
                <p style={style}>
                  <b>Users:</b> Users do not have any specific permissions but
                  they can only view the dashboards.
                </p>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{ marginBottom: "0.3125rem" }}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMore style={{ color: "var(--colorforwhite)" }} />
              }
              style={{
                backgroundColor: "var(--dashboardBgColor)",
                height: "35px",
              }}
            >
              <Typography
                style={{ fontWeight: "bold", color: "var(--colorforwhite)" }}
              >
                Modules
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p style={style}>
                  <b>Administration:</b> It contains Enterprises, Organizations,
                  Users, Groups and Datasource.
                </p>
                <p style={style}>
                  <b>Dashboards:</b> A dashboard is a user interface that
                  displays data and information in an easy-to-understand way.
                </p>
              </Typography>
            </AccordionDetails>
          </Accordion>

          {haveAccess(["SUPERADMIN"]) && (
            <>
              <Accordion
                style={{ marginBottom: "0.3125rem" }}
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{ color: "var(--colorforwhite)" }} />
                  }
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    height: "35px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "var(--colorforwhite)",
                    }}
                  >
                    Enterprise
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p style={style}>
                      Enterprise is like an organization. It typically refers to a
                      set of values that can be used to filter, group or
                      aggregate data.
                    </p>
                    <p style={style}>
                      It is a specific area of expertise or knowledge related
                      into a particular industry.
                    </p>
                    <p style={style}>
                      It refers to the unique name used to identify a website on
                      the internet.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          )}
          {haveAccess(["SUPERADMIN", "ORGANIZATIONADMIN"]) && (
            <>
              <Accordion
                style={{ marginBottom: "0.3125rem" }}
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{ color: "var(--colorforwhite)" }} />
                  }
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    height: "35px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "var(--colorforwhite)",
                    }}
                  >
                    Organization
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p style={style}>
                      An organization is a group or an entity that uses gx BI
                      tool to analyze data and make decisions.
                    </p>
                    <p style={style}>
                      Users are typically assigned to specific organization and
                      the organizational structure can also be used to group
                      data and generate reports based on specific business units
                      within the organization.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{ marginBottom: "0.3125rem" }}
                expanded={expanded === "panel6"}
                onChange={handleChange("panel6")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{ color: "var(--colorforwhite)" }} />
                  }
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    height: "35px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "var(--colorforwhite)",
                    }}
                  >
                    Users
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p style={style}>
                      Users are people who can be employees, customers or anyone
                      who needs to access and analyze data. Users can have
                      different levels of access to the data and functionality
                      depending on their role and responsibilities.
                    </p>
                    <p style={style}>
                      To manage user permissions and control access to data,
                      users can be organized into groups based on different
                      criteria.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{ marginBottom: "0.3125rem" }}
                expanded={expanded === "panel7"}
                onChange={handleChange("panel7")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{ color: "var(--colorforwhite)" }} />
                  }
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    height: "35px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "var(--colorforwhite)",
                    }}
                  >
                    Groups
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p style={style}>
                      A group is a collection of users who can share common
                      characteristics.
                    </p>
                    <p style={style}>
                      Assigning users to their respective groups, the
                      organization can ensure that each user only sees the data
                      that is relevant to their work.
                    </p>
                    <p style={style}>
                      Group membership can be used to manage user permissions
                      control access to data within the dashboard.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          )}
          {haveAccess(["DEVELOPER", "ENDUSER"]) && (
            <>
              {haveAccess(["DEVELOPER"]) && (
                <>
                  <Accordion
                    style={{ marginBottom: "0.3125rem" }}
                    expanded={expanded === "panel8"}
                    onChange={handleChange("panel8")}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMore style={{ color: "var(--colorforwhite)" }} />
                      }
                      style={{
                        backgroundColor: "var(--dashboardBgColor)",
                        height: "35px",
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: "bold",
                          color: "var(--colorforwhite)",
                        }}
                      >
                        Data Source
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <p style={style}>
                          Data source is the place where the dashboard retrieves
                          its data. This could be a database, web service, API
                          or any platform that provides data.
                        </p>
                        <p style={style}>
                          Configuring the data source involves setting up a
                          connection to that system and defining how the data
                          should be retrieved and displayed in the dashboard.
                        </p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              )}

              <Accordion
                style={{ marginBottom: "0.3125rem" }}
                expanded={expanded === "panel9"}
                onChange={handleChange("panel9")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{ color: "var(--colorforwhite)" }} />
                  }
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    height: "35px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "var(--colorforwhite)",
                    }}
                  >
                    Dashboard
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p style={style}>
                      A dashboard is a user interface that displays data and
                      information in an easy-to-understand way. It includes
                      various visualizations such as charts, graphs and tables
                      that allows users to quickly understand the metrics.
                    </p>
                    <p style={style}>
                      Essentially, the dashboard is the main component of gx BI
                      tool that provides users with a clear data.
                    </p>
                    <p style={style}>
                      View of dashboard includes multiple pages and panels added
                      in each page.
                    </p>
                    <p style={style}>
                      Ultimately 'Add Panel' window in gx BI Application is used
                      to display the data visualization which user is desired to
                      analyze or view it.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{ marginBottom: "0.3125rem" }}
                expanded={expanded === "panel10"}
                onChange={handleChange("panel10")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{ color: "var(--colorforwhite)" }} />
                  }
                  style={{
                    backgroundColor: "var(--dashboardBgColor)",
                    height: "35px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "var(--colorforwhite)",
                    }}
                  >
                    Filters
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p style={style}>
                      Filters in gx BI tool are used at dashboard level and
                      panel level and to allow the user to specify criteria for
                      which data is displayed on the dashboard.
                    </p>
                    <p style={style}>
                      Filters are used to restrict the data that is displayed
                      based on certain attributes or criteria such as data
                      range, time range specific values or any other relevant
                      information.
                    </p>
                    <p style={style}>
                      Filter types are{" "}
                      <b>
                        Select, Multi Select, Date Picker, Time Picker, Date
                        Time Picker
                      </b>
                      .
                    </p>
                    <p style={style}>
                      By using filters, users can quickly and easily define the
                      data displayed on the dashboard, allowing them to focus on
                      specific aspects of their data and gain valuable insights
                      into their business or operations.
                    </p>
                    <p style={style}>
                      Users can add, view or edit the filters.
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Help;
