import { useTranslation } from "react-i18next";
import React from "react";

import styles from "./point-details-row.module.scss";
import gs from "../../style.module.scss";

const PointDetailsRow = ({ point }) => {
  const { t } = useTranslation();
  return (
    <div className={[styles.offer, gs.points_container].join(" ")}>
      <p>
        <label>{t("quantity-label")}</label>
        <label className={[styles.value].join(" ")}>{point.qty}</label>
      </p>
      <p>
        <label>{t("after-quantity-label")}</label>
        <label className={styles.value}>{point.bonus}</label>
        <label>{t("point")}</label>
      </p>
    </div>
  );
};

export default PointDetailsRow;
