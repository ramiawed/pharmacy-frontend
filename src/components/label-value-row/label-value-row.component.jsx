import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./label-value-row.module.scss";

const LabelValueRow = ({ label, value, withLargeLabel, searchString }) => {
  const { t } = useTranslation();

  const spliterValues = searchString
    ? value.toLowerCase().includes(searchString.toLowerCase())
      ? value
          ?.toString()
          .replaceAll("+", " + ")
          .replaceAll(".", " ")
          .toLowerCase()
          .split(searchString.toLowerCase())
      : []
    : [];

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
      {spliterValues.length > 0 ? (
        <label className={styles.value}>
          {spliterValues[0]}
          <strong className={styles.filter_result}>{searchString}</strong>
          {spliterValues[1]}
        </label>
      ) : (
        <label className={styles.value}>
          {value
            ? value?.toString().replaceAll("+", " + ").replaceAll(".", " ")
            : "-"}
        </label>
      )}
    </div>
  );
};

export default LabelValueRow;
