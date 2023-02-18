import React from "react";

import styles from "./results-count.module.scss";

const ResultsCount = ({ label, count }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <label className={styles.count}>{count}</label>
    </div>
  );
};

export default ResultsCount;
