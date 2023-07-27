import React from "react";

import { useTheme } from "../../contexts/themeContext";

const ResultsCount = ({ label, count }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`mt-3 flex items-center justify-center text-base gap-2 bold ${
        theme === "light" ? "text-dark" : "text-color-primary-500"
      }`}
    >
      {label && <label>{label}</label>}
      <label>{count}</label>
    </div>
  );
};

export default ResultsCount;
