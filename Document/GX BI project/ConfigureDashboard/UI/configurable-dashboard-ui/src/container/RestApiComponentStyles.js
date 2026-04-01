import { makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
  createStyles({
    component: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    component2: {
      marginTop: 20,
    },
    container: {
      widht: "100%",
      minHeight: "150px",
      marginTop: "10px",
    },
    select: {
      width: 150,
      height: 40,
      background: "#F6F6F6",
      fontSize: "12px",
    },
    button: {
      width: 100,
      height: 40,
      marginLeft: [5, "!important"],
    },
    textfield: {
      width: "100%",
      background: "#F6F6F6",
    },
    tabs: {
      borderBottom: "1px solid #7B8FA1",
      "& .MuiButtonBase-root.MuiTab-root": {
        fontSize: 12,
        fontWeight: "bold",
        marginRight: "12px",
        padding: 0,
      },
    },
    tab: {
      minWidth: "auto",
      textTransform: "none",
    },
    tab1Content: {
      width: 300,
      height: 30,
      marginTop: "10px",
      padding: "0px",
      fontSize: "12px",
      "&:focus": {
        borderRadius: 0,
        background: "white",
        borderColor: "black",
      },
    },
    tableRow: {
      border: "none",
    },
    tablecell: {
      padding: 0,
      border: "none",
      fontSize: "12px",
      fontWeight: "bold",
    },
    tabletextfield: {
      width: "95%",
    },
    textarea: {
      boxModel: "border-box",
      width: "100%",
      minHeight: "50px",
      padding: 0,
      borderColor: "#ccc",
    },
  })
);
export { useStyles };
