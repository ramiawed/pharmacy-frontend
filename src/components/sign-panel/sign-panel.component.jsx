import React from "react";

import styles from "./sign-panel.module.scss";

function SignPanel({ children, swipe }) {
  return (
    <div className={`${styles.sign_panel} ${!swipe ? styles.swipe_right : ""}`}>
      {children}
    </div>
  );
}

export default SignPanel;
