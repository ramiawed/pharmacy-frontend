import React from "react";

import styles from "./row-container.module.scss";
import generalStyles from "../../style.module.scss";

const RowContainer = ({ children, isHeader, isOffer, isPoints }) => {
  return (
    <div
      className={[
        styles.outer_container,
        isHeader ? styles.header_container : "",
        isOffer ? generalStyles.offer_container : "",
        isPoints ? generalStyles.points_container : "",
        isOffer && isPoints ? generalStyles.offer_points_container : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default RowContainer;
