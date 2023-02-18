import React from "react";

import styles from "./search-row-container.module.scss";
const SearchRowContainer = ({ children, withBorder }) => {
  return (
    <div
      className={[styles.container, withBorder ? styles.border : ""].join(" ")}
    >
      {children}
    </div>
  );
};

export default SearchRowContainer;
