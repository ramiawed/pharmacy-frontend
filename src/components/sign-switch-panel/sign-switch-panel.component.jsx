import React from "react";

import styles from "./sign-switch-panel.module.scss";

function SignSwitchPanel({ children }) {
  return <div className={styles.sign_switch_panel}>{children}</div>;
}

export default SignSwitchPanel;
