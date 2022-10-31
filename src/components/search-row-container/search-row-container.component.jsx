import React from "react";

import styles from "./search-row-container.module.scss";
const SearchRowContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default SearchRowContainer;
