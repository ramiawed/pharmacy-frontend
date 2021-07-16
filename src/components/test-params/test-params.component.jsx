import React from "react";
import { useLocation } from "react-router-dom";

function TestParams() {
  const location = useLocation();

  return (
    <div>
      <p>Test Params</p>
    </div>
  );
}

export default TestParams;
