import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./label-value-row.module.scss";

const LabelValueRow = ({ label, value }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.details_row}>
      <label className={styles.label}>{t(label)}:</label>
      <label className={styles.value}>{value}</label>
    </div>
  );
};

export default LabelValueRow;
