import React from "react";

const CenterContainer = ({ children, style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: "6px 0",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CenterContainer;
