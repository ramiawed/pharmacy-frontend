import React from "react";
import { useTheme } from "../../contexts/themeContext";

const NoMoreResult = ({ msg }) => {
  const { theme } = useTheme();
  return (
    <p
      className={`bold text-lg text-center my-2 ${
        theme === "light" ? "text-dark" : "text-color-primary-500"
      }`}
    >
      {msg}
    </p>
  );
};

export default NoMoreResult;
