import React, { useEffect} from "react";
import DashboardActions from "../../actions/dashboardAction";
import "../../container/dashboard/Dashboard.css";
import { renderChart } from "../../utils/helper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import "../AddUser.css";
import ChartSettings from "../../components/charts/ChartSettings";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-between",
  },
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
});
function DashboardPanel(props) 
{
  const dashboardConfig = useSelector((state) => state.dashboard);
  const isBarChartClicked = dashboardConfig.isBarChartClicked;
  const { isPopUpEnable } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [firstLayerData, setFirstLayerData] = React.useState(props?.firstLayerData[0]);
  const dispatch = useDispatch();

  console.log("props.drilldata",props.drilldata);

  
  useEffect(() => {
    
    if (isPopUpEnable && !isBarChartClicked) {
      setExpanded("panel1");
    } else {
      setExpanded("panel2");
    }
  }, [isPopUpEnable, isBarChartClicked]);

  const handleChangeAccordian = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = (e) => {
    props.setenablePopUp(false);
    dispatch(DashboardActions.updateIsPopUpEnabled(false));
    dispatch(DashboardActions.updateisBarChartClicked(false));
  };

  const handleSettingsChange = (data) => {
    let firstLayerObj = {...firstLayerData};
    firstLayerObj.metadata.settingsData = data;
    console.log(firstLayerObj);
    setFirstLayerData(firstLayerObj,"settingsData");
    // props.firstLayerData[0].metadata?.setSettingsData(data);
    // setSettingsData(data);
  };

  const handleVisualizationChange = (e) =>{
    let data = { ...firstLayerData};
    // let visualizationData = {...firstLayerData?.metadata?.visualizationData}
    data.metadata.visualizationData[e.target.name] = e.target.value;
    console.log(data,"visualizationData");
    setFirstLayerData(data);
  }

  return (
    <Dialog
      open={props.setenablePopUp}
      fullWidth
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <DialogTitle
        style={{
          color: "#fff",
          backgroundColor: "var(--dashboardBgColor)",
          marginBottom: "0px",
          padding: "5px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="close"
            style={{ color: "white" }}
            sx={{
              position: "right",
              right: 8,
              top: 8,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChangeAccordian("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Drill Down Layer 1
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.root}>
            {renderChart(
              "dashboard",
              firstLayerData?.metadata?.visualizationData?.type,
              firstLayerData?.metadata?.visualizationData?.chartType,
              props.firstLayerDrillData,
              firstLayerData?.metadata?.settingsData,
              firstLayerData?.metadata?.setSettingsData,
              firstLayerData,
              props.drillDownPopup,
            props.drillDownPopup
            )}
            <ChartSettings
              chartData={props.drillData}
              visualizationData={firstLayerData?.metadata?.visualizationData}
              handleVisualizationChange={handleVisualizationChange}
              settingsData={firstLayerData?.metadata?.settingsData}
              dashboardConfig={dashboardConfig}
              handleSettingsChange={handleSettingsChange}
              drillDown = {true}
            />
          </AccordionDetails>
        </Accordion>
        {isPopUpEnable && isBarChartClicked && (
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChangeAccordian("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Drill Down Layer 2
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderChart(
                "dashboard",
                "table",
                props.config[0]?.metadata?.visualizationData?.chartType,
                props.drillData,
                props.config[0]?.metadata?.settingsData,
                props.config[0]?.metadata?.setSettingsData,
                props.config[0],
                props.drillDownPopup,
                props.drillDownPopup
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default DashboardPanel;
