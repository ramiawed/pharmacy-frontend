import React from "react";

import styles from "./row-with-four-children.module.scss";

function RowWith4Children({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default RowWith4Children;
