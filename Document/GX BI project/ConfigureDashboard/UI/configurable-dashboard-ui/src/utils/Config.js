import {REACT_APP_ADMIN_BASE_URL,REACT_APP_DASHBOARD_BASE_URL} from './urlUtils'

export const DASHBOARD_BASE_URL = REACT_APP_DASHBOARD_BASE_URL;
export const ADMIN_BASE_URL = REACT_APP_ADMIN_BASE_URL;

export const drawerWidth = 165;

export const types = [
  { type: "chart", name: "Chart" },
  { type: "table", name: "Table" },
];

export const httpMethods = [{ name: "GET" }, { name: "POST" }];

export const charts = ({ chartData }) => {
  return [
    {
      type: "line",
      name: "Line Chart",
      disabled: chartData?.length === 1 ? true : false,
    },
    {
      type: "area",
      name: "Area Chart",
      disabled: chartData?.length === 1 ? true : false,
    },
    {
      type: "bar",
      name: "Bar Chart",
      disabled: chartData?.length === 1 ? true : false,
    },
    {
      type: "pie",
      name: "Pie Chart",
      disabled: chartData?.length === 1 ? true : false,
    },
    {
      type: "donut",
      name: "Donut Chart",
      disabled: chartData?.length === 1 ? true : false,
    },
    {
      type: "radialBar",
      name: "Circular Gauge",
      disabled: chartData?.length === 1 ? true : false,
    },
    {
      type: "histogram",
      name: "Multi Y-Axis",
      disabled: chartData?.length === 1 ? true : false,
    },
    {
      type: "singlestat",
      name: "Singlestat",
      disabled: chartData?.length === 1 ? false : true,
    },
  ];
};

export const lineChartConfig = (formData, onChange) => {
  return [
    {
      title: "Axes",
      type: "accordian",
      visible: true,
      groups: [
        {
          title: "X-Axis",
          type: "withHeading",
          visible: true,
          items: [
            {
              name: "xAxis",
              id: "xAxis",
              type: "switch",
              value: true,
              label: "Show",
              visible: true,
              onChange: onChange("switch", "xAxis"),
            },
            {
              name: "xAxisDisplayName",
              id: "xAxisDisplayName",
              type: "text",
              value: "",
              label: "X-axis Name",
              visible: formData?.["xAxis"] ? formData?.["xAxis"]?.value : true,
              onChange: onChange("text", "xAxisDisplayName"),
            },
            {
              name: "xAxisData",
              id: "xAxisData",
              type: "autocomplete",
              value: "count",
              label: "X-axis",
              visible: true,
              onChange: onChange("autocomplete", "xAxisData"),
            },
          ],
        },
        {
          title: "Left Y",
          type: "withHeading",
          visible: true,
          items: [
            {
              name: "yAxis",
              id: "yAxis",
              type: "switch",
              value: true,
              label: "Show",
              visible: true,
              onChange: onChange("switch", "yAxis"),
            },
            {
              name: "yAxisDisplayName",
              id: "yAxisDisplayName",
              type: "text",
              value: "",
              label: "Y-axis Name",
              visible: formData?.["yAxis"] ? formData?.["yAxis"]?.value : true,
              onChange: onChange("text", "yAxisDisplayName"),
            },
            {
              name: "yAxisData",
              id: "yAxisData",
              type: "autocomplete",
              value: "date_part",
              label: "Y-axis",
              visible: true,
              onChange: onChange("autocomplete", "yAxisData"),
            },
            {
              name: "yAxisMinValue",
              id: "yAxisMinValue",
              type: "text",
              value: "0",
              label: "Y-Min",
              visible: true,
              onChange: onChange("text", "yAxisMinValue"),
            },
            {
              name: "yAxisMaxValue",
              id: "yAxisMaxValue",
              type: "text",
              value: "100",
              label: "Y-Max",
              visible: true,
              onChange: onChange("text", "yAxisMaxValue"),
            },
          ],
        },
      ],
    },
    {
      title: "Legend",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "legend",
          id: "legend",
          type: "switch",
          value: true,
          label: "Show",
          visible: true,
          onChange: onChange("switch", "legend"),
        },
      ],
    },
  ];
};

export const barChartConfig = (formData, onChange) => {
  return [
    {
      title: "Axes",
      type: "accordian",
      visible: true,
      groups: [
        {
          title: "X-Axis",
          type: "withHeading",
          visible: true,
          items: [
            {
              name: "xAxis",
              id: "xAxis",
              type: "switch",
              value: true,
              label: "Show",
              visible: true,
              onChange: onChange("switch", "xAxis"),
            },
            {
              name: "xAxisDisplayName",
              id: "xAxisDisplayName",
              type: "text",
              value: "",
              label: "X-axis Name",
              visible: formData?.["xAxis"] ? formData?.["xAxis"]?.value : true,
              onChange: onChange("text", "xAxisDisplayName"),
            },
            {
              name: "xAxisData",
              id: "xAxisData",
              type: "autocomplete",
              value: "count",
              label: "X-axis",
              visible: true,
              onChange: onChange("autocomplete", "xAxisData"),
            },
          ],
        },
        {
          title: "Left Y",
          type: "withHeading",
          visible: true,
          items: [
            {
              name: "yAxis",
              id: "yAxis",
              type: "switch",
              value: true,
              label: "Show",
              visible: true,
              onChange: onChange("switch", "yAxis"),
            },
            {
              name: "yAxisDisplayName",
              id: "yAxisDisplayName",
              type: "text",
              value: "",
              label: "Y-axis Name",
              visible: formData?.["yAxis"] ? formData?.["yAxis"]?.value : true,
              onChange: onChange("text", "yAxisDisplayName"),
            },
            {
              name: "yAxisData",
              id: "yAxisData",
              type: "autocomplete",
              value: "date_part",
              label: "Y-axis",
              visible: true,
              onChange: onChange("autocomplete", "yAxisData"),
            },
            {
              name: "yAxisMinValue",
              id: "yAxisMinValue",
              type: "text",
              value: "0",
              label: "Y-Min",
              visible: true,
              onChange: onChange("text", "yAxisMinValue"),
            },
            {
              name: "yAxisMaxValue",
              id: "yAxisMaxValue",
              type: "text",
              value: "100",
              label: "Y-Max",
              visible: true,
              onChange: onChange("text", "yAxisMaxValue"),
            },
          ],
        },
      ],
    },
    {
      title: "Others",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "orientation",
          id: "orientation",
          type: "autocomplete",
          value: "",
          label: "Type",
          visible: true,
          onChange: onChange("autocomplete", "orientation"),
        },
        {
          name: "stacked",
          id: "stacked",
          type: "switch",
          value: false,
          label: "Stacked",
          visible: true,
          onChange: onChange("switch", "stacked"),
        },
        {
          name: "legend",
          id: "legend",
          type: "switch",
          value: true,
          label: "legend",
          visible: true,
          onChange: onChange("switch", "legend"),
        },
      ],
    },
  ];
};

export const pieChartConfig = (formData, onChange) => {
  return [
    {
      title: "Display",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "data",
          id: "data",
          type: "autocomplete",
          value: "",
          label: "Data",
          visible: true,
          onChange: onChange("autocomplete", "data"),
        },
        {
          name: "displayName",
          id: "displayName",
          type: "autocomplete",
          value: "",
          label: "Display Name",
          visible: true,
          onChange: onChange("autocomplete", "displayName"),
        },
      ],
    },
    {
      title: "Legend",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "legend",
          id: "legend",
          type: "switch",
          value: true,
          label: "Show",
          visible: true,
          onChange: onChange("switch", "legend"),
        },
      ],
    },
  ];
};

export const donutChartConfig = (onChange) => {
  return [
    {
      title: "Display",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "data",
          id: "data",
          type: "autocomplete",
          value: "",
          label: "Data",
          visible: true,
          onChange: onChange("autocomplete", "data"),
        },
        {
          name: "displayName",
          id: "displayName",
          type: "autocomplete",
          value: "",
          label: "Display Name",
          visible: true,
          onChange: onChange("autocomplete", "displayName"),
        },
      ],
    },
    {
      title: "Legend",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "legend",
          id: "legend",
          type: "switch",
          value: true,
          label: "Show",
          visible: true,
          onChange: onChange("switch", "legend"),
        },
      ],
    },
  ];
};

export const circularGaugeChartConfig = (formData, onChange) => {
  return [
    {
      title: "Display",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "data",
          id: "data",
          type: "autocomplete",
          value: "",
          label: "Data",
          visible: true,
          onChange: onChange("autocomplete", "data"),
        },
        {
          name: "displayName",
          id: "displayName",
          type: "autocomplete",
          value: "",
          label: "Display Name",
          visible: true,
          onChange: onChange("autocomplete", "displayName"),
        },
      ],
    },
    {
      title: "Legend",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "legend",
          id: "legend",
          type: "switch",
          value: true,
          label: "Show",
          visible: true,
          onChange: onChange("switch", "legend"),
        },
      ],
    },
  ];
};

export const MultiYAxisChartConfig = (formData, onChange) => {
  return [
    {
      title: "Axes",
      type: "accordian",
      visible: true,
      groups: [
        {
          title: "X-Axis",
          type: "withHeading",
          visible: true,
          items: [
            {
              name: "xAxis",
              id: "xAxis",
              type: "switch",
              value: true,
              label: "Show",
              visible: true,
              onChange: onChange("switch", "xAxis"),
            },
            {
              name: "xAxisDisplayName",
              id: "xAxisDisplayName",
              type: "text",
              value: "",
              label: "X-axis Name",
              visible: formData?.["xAxis"] ? formData?.["xAxis"]?.value : true,
              onChange: onChange("text", "xAxisDisplayName"),
            },
            {
              name: "xAxisData",
              id: "xAxisData",
              type: "autocomplete",
              value: "count",
              label: "X-axis",
              visible: true,
              onChange: onChange("autocomplete", "xAxisData"),
            },
            {
              name: "chartType",
              id: "chartType",
              type: "autocomplete",
              value: "",
              label: "Chart Type",
              visible: true,
              onChange: onChange("autocomplete", "chartType"),
            },
          ],
        },
        {
          title: "Left Y",
          type: "withHeading",
          visible: true,
          items: [
            {
              name: "yAxis",
              id: "yAxis",
              type: "switch",
              value: true,
              label: "Show",
              visible: true,
              onChange: onChange("switch", "yAxis"),
            },
            {
              name: "yAxisDisplayName",
              id: "yAxisDisplayName",
              type: "text",
              value: "",
              label: "Y-axis Name",
              visible: formData?.["yAxis"] ? formData?.["yAxis"]?.value : true,
              onChange: onChange("text", "yAxisDisplayName"),
            },
            {
              name: "yAxisData",
              id: "yAxisData",
              type: "autocomplete",
              value: "date_part",
              label: "Y-axis",
              visible: true,
              onChange: onChange("autocomplete", "yAxisData"),
            },
            {
              name: "chartType",
              id: "chartType",
              type: "autocomplete",
              value: "line",
              label: "Chart Type",
              visible: true,
              onChange: onChange("autocomplete", "chartType"),
            },
            {
              name: "yAxisMinValue",
              id: "yAxisMinValue",
              type: "text",
              value: "0",
              label: "Y-Min",
              visible: true,
              onChange: onChange("text", "yAxisMinValue"),
            },
            {
              name: "yAxisMaxValue",
              id: "yAxisMaxValue",
              type: "text",
              value: "100",
              label: "Y-Max",
              visible: true,
              onChange: onChange("text", "yAxisMaxValue"),
            },
          ],
        },
        {
          title: "Right Z",
          type: "withHeading",
          visible: true,
          items: [
            {
              name: "zAxis",
              id: "zAxis",
              type: "switch",
              value: true,
              label: "Show",
              visible: true,
              onChange: onChange("switch", "zAxis"),
            },
            {
              name: "zAxisDisplayName",
              id: "zAxisDisplayName",
              type: "text",
              value: "",
              label: "Z-axis Name",
              visible: formData?.["zAxis"] ? formData?.["zAxis"]?.value : true,
              onChange: onChange("text", "zAxisDisplayName"),
            },
            {
              name: "zAxisData",
              id: "zAxisData",
              type: "autocomplete",
              value: "date_part",
              label: "Z-axis",
              visible: true,
              onChange: onChange("autocomplete", "zAxisData"),
            },
            {
              name: "chartType",
              id: "chartType",
              type: "autocomplete",
              value: "line",
              label: "Chart Type",
              visible: true,
              onChange: onChange("autocomplete", "chartType"),
            },
            {
              name: "zAxisMinValue",
              id: "zAxisMinValue",
              type: "text",
              value: "0",
              label: "Z-Min",
              visible: true,
              onChange: onChange("text", "zAxisMinValue"),
            },
            {
              name: "zAxisMaxValue",
              id: "zAxisMaxValue",
              type: "text",
              value: "100",
              label: "Z-Max",
              visible: true,
              onChange: onChange("text", "zAxisMaxValue"),
            },
          ],
        },
      ],
    },
    {
      title: "Others",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "orientation",
          id: "orientation",
          type: "autocomplete",
          value: "",
          label: "Type",
          visible: true,
          onChange: onChange("autocomplete", "orientation"),
        },
        {
          name: "stacked",
          id: "stacked",
          type: "switch",
          value: false,
          label: "Stacked",
          visible: true,
          onChange: onChange("switch", "stacked"),
        },
        {
          name: "legend",
          id: "legend",
          type: "switch",
          value: true,
          label: "legend",
          visible: true,
          onChange: onChange("switch", "legend"),
        },
      ],
    },
  ];
};

export const singleStatConfig = (formData, onChange) => {
  return [
    {
      title: "Display",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "statData",
          id: "statData",
          type: "autocomplete",
          value: "",
          label: "Data",
          visible: true,
          onChange: onChange("autocomplete", "statData"),
        },
        {
          name: "prefix",
          id: "prefix",
          type: "text",
          value: "",
          label: "Prefix",
          visible: true,
          onChange: onChange("text", "prefix"),
        },
        {
          name: "postfix",
          id: "postfix",
          type: "text",
          value: "",
          label: "Postfix",
          visible: true,
          onChange: onChange("text", "postfix"),
        },
        {
          name: "fontSize",
          id: "fontSize",
          type: "number",
          value: "",
          label: "Font Size",
          visible: true,
          onChange: onChange("number", "fontSize"),
        },
      ],
    },
  ];
};

export const tableConfig = ({ formData, onChange }) => {
  return [
    {
      title: "Row Styles",
      type: "accordian",
      visible: true,
      items: [
        {
          name: "padding",
          id: "padding",
          type: "switch",
          value: false,
          label: "Dense padding",
          visible: true,
          onChange: onChange("switch", "padding"),
        },
      ],
    },
  ];
};
