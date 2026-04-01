import React, { useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core";
import "./DashboardTab.css";

const ITEM_HEIGHT = 30;
const useStyles = makeStyles({
  root: {
    padding: "6px 12px",
    minWidth: "fit-content",
    boxSizing: "border-box",
    alignItems: "center",
    display: "inline-flex",
    cursor: "pointer",
    maxHeight: "45px",
    textTransform: "uppercase",
    color: "gray",
    marginTop: "8px",
  },
});

export default function DashboardTab({
  item,
  pages,
  index,
  handleChange,
  handlePageDialog,
  selected,
}) {
  // const userRole = JSON.parse(localStorage.getItem("userInfo")).roleInfo
  //   .roleName;
  const roleName = JSON.parse(localStorage.getItem("roleName"));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className="dashboardtab"
      style={{
        borderRight: pages?.length > 1 && "1px solid #b2bec9",
        borderLeft: pages?.length > 1 && "2px solid #b2bec9",
        backgroundColor: selected && "#f9f5fa",
        minHeight: "35px",
      }}
    >
      <Button
        disableRipple
        className={classes.root}
        style={{
          color: "var(--color)",
          textTransform: "none",
          fontSize: "14px",
          padding:"0px 5px"
        }}
        onClick={(e) => handleChange(e, index)}
      >
        {item.pageName}
      </Button>
      {roleName !== "ENDUSER" && (
        <IconButton
          disableRipple
          style={{ padding: "2px", marginTop: "5px", color: "var(--color)" }}
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
          },
        }}
      >
        <MenuItem key="edit" onClick={() => handlePageDialog("EDIT", item)}>
          Edit
        </MenuItem>
        <MenuItem key="delete" onClick={() => handlePageDialog("DELETE", item)}>
          Delete
        </MenuItem>
        <MenuItem
          key="duplicate"
          onClick={() => handlePageDialog("DUPLICATE", item)}
        >
          Duplicate
        </MenuItem>
      </Menu>
    </div>
  );
}
