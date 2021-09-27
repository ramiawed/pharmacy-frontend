import React from "react";

import styles from "./background.module.scss";

function Background() {
  return (
    <div className={styles.container}>
      <div className={styles.circle_1}></div>
      <div className={styles.circle_2}></div>
      <div className={styles.circle_3}></div>
      <div className={styles.circle_4}></div>
    </div>
  );
}

export default Background;
