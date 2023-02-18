import React from "react";
import { Colors } from "../../utils/constants";

import styles from "./no-more-result.module.scss";

const NoMoreResult = ({ msg }) => {
  return (
    <p className={styles.text} style={{ color: Colors.MAIN_COLOR }}>
      {msg}
    </p>
  );
};

export default NoMoreResult;
