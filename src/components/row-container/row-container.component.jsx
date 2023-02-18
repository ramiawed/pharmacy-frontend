import React from "react";

import styles from "./row-container.module.scss";

const RowContainer = ({ children, isHeader, isOffer }) => {
  return (
    <div
      className={[
        styles.outer_container,
        isHeader ? styles.header_container : "",
        isOffer ? styles.offer_container : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default RowContainer;
