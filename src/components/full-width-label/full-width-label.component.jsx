import React from "react";

import styles from "./full-width-label.module.scss";

const FullWidthLabel = ({ value, color }) => {
  return (
    <label
      className={styles.label}
      style={{
        color,
      }}
    >
      {value}
    </label>
  );
};

export default FullWidthLabel;
