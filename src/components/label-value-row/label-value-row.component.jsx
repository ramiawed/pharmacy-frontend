import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./label-value-row.module.scss";

const LabelValueRow = ({ label, value, withLargeLabel }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.details_row}>
      <label
        className={[
          styles.label,
          withLargeLabel ? styles.large_width : "",
        ].join(" ")}
      >
        {t(label)}:
      </label>
      <label className={styles.value}>
        {value
          ? value?.toString().replaceAll("+", " + ").replaceAll(".", " ")
          : "-"}
      </label>
    </div>
  );
};

export default LabelValueRow;
