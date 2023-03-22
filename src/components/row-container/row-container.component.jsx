import React from "react";

import styles from "./row-container.module.scss";

const RowContainer = ({ children, isHeader, isOffer, isPoints }) => {
  return (
    <div
      className={[
        styles.outer_container,
        isHeader ? styles.header_container : "",
        isOffer ? "offer_container" : "",
        isPoints ? "points_container" : "",
        isOffer && isPoints ? "offer_points_container" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default RowContainer;
