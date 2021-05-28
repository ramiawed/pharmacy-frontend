import React from "react";

import styles from "./row-with-three-children.module.scss";

function RowWith3Children({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default RowWith3Children;
