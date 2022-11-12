import React from "react";

import styles from "./stage-container.module.scss";

const StageContainer = ({ next, children }) => {
  return (
    <div
      className={[
        styles.container,
        next ? styles.slide_left : styles.slide_right,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default StageContainer;
