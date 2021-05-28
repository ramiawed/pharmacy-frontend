import React from "react";

import styles from "./row-with-two-children.module.scss";

function RowWith2Children({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default RowWith2Children;
