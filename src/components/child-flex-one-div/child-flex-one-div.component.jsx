import React from "react";

const ChildFlexOneDiv = ({ children }) => {
  return <div style={{ flex: 1, display: "flex", gap: "5px" }}>{children}</div>;
};

export default ChildFlexOneDiv;
