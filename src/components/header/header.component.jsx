import React from "react";

// style
import styles from "./header.module.scss";

function Header({ children }) {
  return <div className={styles.header}>{children}</div>;
}

export default Header;
