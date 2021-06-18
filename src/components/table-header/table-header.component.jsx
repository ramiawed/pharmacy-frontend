import React from "react";

import styles from "./table-header.module.scss";

function TableHeader({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export default TableHeader;
