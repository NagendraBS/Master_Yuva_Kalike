import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});

const DeletePopUp = ({
  boolVar,
  setBoolVarFun,
  handleYesButnFn,
  userRowData,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={boolVar}
      maxWidth="xs"
      fullWidth
      // onClose={() => setBoolVarFun(false)}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <div
        style={{
          backgroundColor: "var(--dashboardBgColor)",
          color: "var(--colorforwhite)",
          fontSize: "16px",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent:"space-between",
        }}
      >
        <DialogTitle >Delete User</DialogTitle>
        <IconButton aria-label="close" style={{ color: "var(--colorforwhite)" }}>
            <CloseIcon onClick={() => {
            setBoolVarFun(false);
          }}  />
          </IconButton>
      </div>
      <DialogContent >
        Do you want to delete{" "}
        <span
          style={{
            color: "var(--dashboardBgColor)",
            fontWeight: "bold",
          }}
        >
          {userRowData.lanId}
        </span>{" "}
        user ?
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            setBoolVarFun(false);
          }}
          style={{
            backgroundColor: "var(--dashboardBgColor)",
            color: "var(--colorforwhite)",
            fontSize: "14px",
            textTransform: "none",
          }}
        >
          No
        </Button>

        <Button
          autoFocus
          color="primary"
          style={{
            backgroundColor: "var(--dashboardBgColor)",
            color: "var(--colorforwhite)",
            textTransform: "none",
            fontSize: "14px",
          }}
          onClick={handleYesButnFn}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeletePopUp;
