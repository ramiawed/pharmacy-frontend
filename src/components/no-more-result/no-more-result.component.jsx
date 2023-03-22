import React from "react";

// styles
import styles from "./no-more-result.module.scss";

const NoMoreResult = ({ msg }) => {
  return <p className={[styles.text, "fc_main"].join(" ")}>{msg}</p>;
};

export default NoMoreResult;
