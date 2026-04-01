import React from "react";
import { Popover, List, ListItem, ListItemText, Tooltip,IconButton} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFontFamily } from "./FontFamilyContext"; // Import the FontFamilyContext hook
import fontIcon from "../assets/icons8-font-60.png";
const useStyles = makeStyles((theme) => ({
  fontFamilySelectorIcon: {
    // Define styles for the fontFamilySelectorIcon
    // Add any custom styles as needed
  },
  fontFamilySelectorPopup: {
    padding: theme.spacing(1),
  },
}));

const FontFamilySelector = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { fontFamily, changeFontFamily } = useFontFamily(); // Access the font family and changeFontFamily function from the FontFamilyContext

  const fontFamilies = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
    "Lucida Sans Unicode",
    "Tahoma",
    "Courier",
    "Palatino Linotype",
    "Arial Narrow",
    "Garamond",
    "Book Antiqua",
    "Helvetica Neue",
    "Century Gothic",
    "Lucida Console",
    "Franklin Gothic Medium",
    "Century Schoolbook",
    "Consolas",
    "Cambria",
    "MS Sans Serif",
    "MS Serif"
  ]

  const handleFontFamilySelectorOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFontFamilySelectorClose = () => {
    setAnchorEl(null);
  };

  const handleFontFamilySelect = (selectedFontFamily) => {
    changeFontFamily(selectedFontFamily);
    handleFontFamilySelectorClose();
    // Update the CSS variable to store the selected font family
    document.documentElement.style.setProperty("--fontfamily", selectedFontFamily);
    

  };
  return (
    <>

        <Tooltip title="Font Family" >
        <IconButton>
          <img src={fontIcon} alt="Icon" onClick={handleFontFamilySelectorOpen} width="25" height="25" />
            
          </IconButton>
        </Tooltip>
      

      {/* Font Family Selector Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleFontFamilySelectorClose}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "left",
        // }}
        // transformOrigin={{
        //   vertical: "center",
        //   horizontal: "right",
        // }}
      >
        <div className={classes.fontFamilySelectorPopup}>
          <List>
            {fontFamilies.map((fontFamily) => (
              <ListItem button key={fontFamily} onClick={() => handleFontFamilySelect(fontFamily)}>
                <ListItemText primary={fontFamily} />
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    
    </>
  );
};

export default FontFamilySelector;
