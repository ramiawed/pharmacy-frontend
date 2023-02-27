import React from "react";

const FullWidthLabel = ({ value, color }) => {
  return (
    <label
      style={{
        color,
        flex: 1,
      }}
    >
      {value}
    </label>
  );
};

export default FullWidthLabel;
