import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import Graph from 'react-vis-network-graph';

function NetworkGraphHome() {
  const navigate = useNavigate();
  const [navigationButtonsEnabled, setNavigationButtonsEnabled] =
    useState(false);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const graph = {
    nodes: [
      {
        id: 1,
        label: "Enterprise",
        title: "Enterprise",
        shape: "box",
        color: "#c2cfe7",
        font: { color: "black", opacity: 3 },
        x: 447,
        y: 82,
      },
      {
        id: 2,
        label: "Organization",
        title: "Organization",
        shape: "box",
        font: { color: "black" },
        color: "#c2cfe7",
        x: 581,
        y: 354,
      },
      {
        id: 3,
        label: "Groups",
        title: "Groups",
        shape: "box",
        color: "#c2cfe7",
        font: { color: "black" },
        x: 577,
        y: 165,
      },
      {
        id: 4,
        label: "Users",
        title: "Users",
        shape: "box",
        color: "#c2cfe7",
        font: { color: "black" },
        x: 446,
        y: 417,
      },
      {
        id: 5,
        label: "DataSource",
        title: "DataSource",
        shape: "box",
        font: { color: "black" },
        color: "#c2cfe7",
        x: 335,
        y: 157,
      },
      {
        id: 6,
        label: "DashboardList",
        title: "DashboardList",
        shape: "box",
        color: "#c2cfe7",
        font: { color: "black" },
        x: 316,
        y: 359,
      },
      {
        id: 7,
        label: "gxBI",
        title: "gxBI",
        shape: "circle",
        color: "#000080",
        font: { color: "white" },
        x: 422,
        y: 259,
      },
    ],
    edges: [
      {
        from: 7,
        to: 1,
        opacity: 0.2,
        color: { highlight: "red", opacity: 0.2 },
      },
      { from: 7, to: 2, color: { highlight: "red", opacity: 0.2 } },
      { from: 7, to: 3, color: { highlight: "red", opacity: 0.2 } },
      { from: 7, to: 4, color: { highlight: "red", opacity: 0.2 } },
      { from: 7, to: 5, color: { highlight: "red", opacity: 0.2 } },
      { from: 7, to: 6, color: { highlight: "red", opacity: 0.2 } },
      { from: 1, to: 2, color: { highlight: "#04346c", opacity: 0.2 } },
      { from: 1, to: 3, color: { highlight: "#04346c", opacity: 0.2 } },
      { from: 1, to: 4, color: { highlight: "#04346c", opacity: 0.2 } },
      { from: 1, to: 5, color: { highlight: "#04346c", opacity: 0.2 } },
      { from: 1, to: 6, color: { highlight: "#04346c", opacity: 0.2 } },
      { from: 2, to: 3, color: { highlight: "#aa5468", opacity: 0.2 } },
      { from: 2, to: 4, color: { highlight: "#aa5468", opacity: 0.2 } },
      { from: 2, to: 5, color: { highlight: "#aa5468", opacity: 0.2 } },
      { from: 2, to: 6, color: { highlight: "#aa5468", opacity: 0.2 } },
      { from: 3, to: 4, color: { highlight: "#aa5468", opacity: 0.2 } },
      { from: 3, to: 5, color: { highlight: "#04346c", opacity: 0.2 } },
      { from: 5, to: 6, color: { highlight: "#aa5468", opacity: 0.2 } },
    ],
  };

  const options = {
    physics: {
      enabled: false,
    },
    interaction: {
      navigationButtons: navigationButtonsEnabled,
    },
    nodes: {
      borderWidth: 2,
      size: 40,
      color: {
        border: "black",
        background: "white",
      },
      font: { color: "blue" },
    },
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#04346c",
      opacity: 1,
    },
    height: "500px",
  };

  const handleNodeDoubleClick = (event) => {
    const nodeId = event.nodes[0];
    if (nodeId) {
      if (nodeId === 1) {
        navigate(`/enterprise`);
      } else if (nodeId === 2) {
        navigate(`/organization`);
      } else if (nodeId === 3) {
        navigate(`/groups`);
      } else if (nodeId === 4) {
        navigate(`/user`);
      } else if (nodeId === 5) {
        navigate(`/databases`);
      } else if (nodeId === 6) {
        navigate(`/dashboardlist`);
      }
    }
  };
  const handleNodeClick = (event) => {
    const nodeId = event.nodes[0];
    if (nodeId) {
      const clickedNode = graph.nodes.find((node) => node.id === nodeId);
      const connectedEdges = graph.edges.filter(
        (edge) => edge.from === nodeId || edge.to === nodeId
      );
      console.log("clicked node:", clickedNode);
      console.log("Connected edges:", connectedEdges);
    }
  };

  const events = {
    select: handleNodeClick,
    doubleClick: handleNodeDoubleClick,
  };
  const handleToggleButtons = () => {
    setNavigationButtonsEnabled((prevState) => !prevState);
  };
  const handleToggleButtonClick = () => {
    setButtonEnabled((prevState) => !prevState);
  };
  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    position: "absolute",
    left: "1100px",
    top: "100px",
    width: "100px",
    height: "20px",
  };
  const bs = {
    backgroundColor: "#000080",
    color: "white",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    position: "absolute",
    left: "1100px",
    top: "70px",
    width: "100px",
    height: "20px",
  };

  return (
    <>
      {/* <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {}}
      /> */}
      <button onClick={handleToggleButtons} style={buttonStyle}>
        {navigationButtonsEnabled ? "Disable" : "Enable"}
      </button>
      <button onClick={handleToggleButtonClick} style={bs}>
        {isButtonEnabled ? "NodeVersion" : "ImageVersion"}
      </button>
      {isButtonEnabled ? navigate(`/networkicon`) : ""}
    </>
  );
}

export default NetworkGraphHome;
