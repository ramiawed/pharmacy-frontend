import React from "react";

import styles from "./action-bar.module.scss";
const ActionBar = ({ children }) => {
  return <div className={styles.actions}>{children}</div>;
};

export default ActionBar;
