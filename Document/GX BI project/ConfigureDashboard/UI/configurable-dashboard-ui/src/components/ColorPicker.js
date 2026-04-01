import React from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ selectedColor, onChange }) => {
  return (
    <div style={{ position: "absolute", zIndex: 999 }}>
      <ChromePicker
        color={selectedColor}
        onChange={(color) => onChange(color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
