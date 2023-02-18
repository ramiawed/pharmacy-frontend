import React from "react";

import styles from "./fixed-size-div.module.scss";

const FixedSizeDiv = ({ children, size }) => {
  return (
    <div
      className={[
        size === "small" ? styles.small : "",
        size === "medium" ? styles.medium : "",
        size === "large" ? styles.large : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default FixedSizeDiv;
