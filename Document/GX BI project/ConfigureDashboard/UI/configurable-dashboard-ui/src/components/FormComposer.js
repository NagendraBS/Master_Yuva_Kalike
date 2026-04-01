/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { tableConfig } from "../utils/Config";
import { chartConfig } from "../utils/helper";

const AddSeries = () => {
  const [series, setSeries] = useState([]);

  const onAdd = () => {
    const temp = [...series];
    temp.push({
      label: "a",
      name: "b",
    });
    setSeries(temp);
  };

  return (
    <>
      {series.forEach((item) => {
        <TextField
          style={{ marginBottom: "20px", width: "100%" }}
          id="outlined-basic"
          variant="outlined"
          size="small"
        />;
      })}
      <Button
        style={{ textTransform: "none", fontSize: "14px" }}
        onClick={onAdd}
      >
        + Add Series
      </Button>
    </>
  );
};

const FormComposer = ({ formData, onFormChange, type, chartType }) => {
  const handleOnChange = (type, field) => (event) => {
    let value = "";
    switch (type) {
      case "autocomplete":
        value = event;
        break;
      case "switch":
        value = event.target.checked;
        break;
      default:
        value = event.target.value;
        break;
    }
    onFormChange(field, value);
  };

  const config = useMemo(() => {
    switch (type) {
      case "chart":
        return chartConfig({ chartType, formData, onChange: handleOnChange });
      case "table":
        return tableConfig({ formData, onChange: handleOnChange });
      default:
        return chartConfig({ chartType, formData, onChange: handleOnChange });
    }
  }, [type, formData]);

  const renderComponent = (data, key, index) => {
    switch (data.type) {
      case "accordian":
        return (
          <Accordion
            style={{
              border: "1px solid rgba(0, 0, 0, 0.20)",
            }}
            defaultExpanded={index === 0 ? true : false}
            key={key}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: "rgb(242, 246, 254)" }}
            >
              <Typography component={"div"}>{data.title}</Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "block", padding: "18px 16px 0px 16px" }}
            >
              {data.groups &&
                data.groups?.map(
                  (group, i) =>
                    group.visible && (
                      <React.Fragment key={`${group.title}+${i}`}>
                        {renderComponent(group, `${group.id}+${i}`, i)}
                        {i !== data.groups.length - 1 && (
                          <hr
                            style={{ border: "1px solid rgba(0, 0, 0, 0.20)" }}
                          />
                        )}
                      </React.Fragment>
                    )
                )}
              {data.items &&
                data.items?.map(
                  (item, i) =>
                    item.visible && renderComponent(item, `${item.id}+${i}`)
                )}
            </AccordionDetails>
          </Accordion>
        );
      case "withHeading":
        return (
          <React.Fragment key={`${data.title}+${index}`}>
            <div style={{ margin: "0", fontSize: "1.1rem", fontWeight: 500 }}>
              {data.title}
            </div>
            {data.items?.map(
              (item, ind) =>
                item.visible && renderComponent(item, `${item.id}+${ind}`)
            )}
          </React.Fragment>
        );
      case "text":
        return (
          <TextField
            key={key}
            style={{ marginBottom: "20px", width: "100%" }}
            id="outlined-basic"
            label={data.label}
            variant="outlined"
            size="small"
            name={data.name}
            value={formData[data.name]?.value}
            onChange={data.onChange}
          />
        );
      case "number":
        return (
          <TextField
            key={key}
            style={{ marginBottom: "20px", width: "100%" }}
            id="outlined-basic"
            label={data.label}
            variant="outlined"
            size="small"
            type="number"
            name={data.name}
            value={formData[data.name]?.value}
            onChange={data.onChange}
          />
        );
      case "dropdown":
        return (
          <FormControl
            key={key}
            style={{ width: "100%", marginBottom: "20px" }}
            size="small"
          >
            <InputLabel id="demo-select-small">{data.label}</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              name={data.name}
              value={formData[data.name]?.value}
              label="Chart Type"
              onChange={data.onChange}
            >
              {formData[data.name]?.options.map((item, index) => (
                <MenuItem key={`${item}+${index}`} value={item.key}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "autocomplete":
        return (
          <Autocomplete
            size="small"
            key={key}
            id="combo-box-demo"
            style={{ marginBottom: "20px", width: "100%" }}
            options={formData[data.name]?.options || []}
            value={formData[data.name]?.value}
            onChange={(event, newValue) => data.onChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} label={data.label} variant="outlined" />
            )}
          />
        );
      case "switch":
        return (
          <FormControlLabel
            key={key}
            style={{
              margin: "10px 0",
              //width: "fit-content",
              justifyContent: "flex-end", 
              cursor:"default"
            }}
            checked={
              formData[data.name] ? formData[data.name]?.value : data.value
            }
            control={<Switch color="primary" />}
            label={data.label}
            labelPlacement="start"
            onChange={data.onChange}
          />
        );
      case "addMore":
        return (
          <AddSeries
            key={key}
            style={{ marginBottom: "20px", width: "100%" }}
            id="outlined-basic"
            label={data.label}
            variant="outlined"
            size="small"
            name={data.name}
            value={formData[data.name]?.value}
            onChange={data.onChange}
          />
        );
      default:
        return (
          <TextField
            key={key}
            style={{ marginBottom: "20px", width: "100%" }}
            id="outlined-basic"
            label={data.label}
            variant="outlined"
            size="small"
            name={data.name}
            value={formData[data.name]?.value}
            onChange={data.onChange}
          />
        );
    }
  };

  return config.map(
    (data, index) =>
      data.visible && renderComponent(data, `${data.title}+${index}`, index)
  );
};

export default memo(FormComposer);
