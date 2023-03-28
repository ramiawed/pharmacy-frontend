import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./point-details-row.module.scss";

const PointDetailsRow = ({ point }) => {
  const { t } = useTranslation();
  return (
    <div className={[styles.offer, "points_container"].join(" ")}>
      <p>
        <label>{t("quantity")}</label>
        <label className={[styles.value].join(" ")}>{point.qty}</label>
      </p>
      <p>
        <label>{t("piece")}</label>
        <label className={styles.value}>{point.bonus}</label>
        <label>{t("point")}</label>
      </p>
    </div>
  );
};

export default PointDetailsRow;
