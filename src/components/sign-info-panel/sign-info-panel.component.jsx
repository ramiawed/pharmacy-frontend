import React from "react";

import styles from "./sign-info-panel.module.scss";

function SignInfoPanel({ children }) {
  return <div className={styles.info}>{children}</div>;
}

export default SignInfoPanel;
