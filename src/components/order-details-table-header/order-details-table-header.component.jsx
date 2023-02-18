import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./order-details-table-header.module.scss";

const OrderDetailsTableHeader = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.header_container}>
      <div className={styles.first_row}>
        <label style={{ width: "30px" }}></label>
        <label style={{ flex: 1 }}></label>
      </div>

      <div className={styles.additional_container}>
        <label style={{ width: "32px" }}></label>
        <label className={styles.label}>{t("quantity-label")}</label>
        <label style={{ width: "32px" }}></label>
        <label className={styles.label}>{t("offer-label")}</label>
        <label className={styles.label}>{t("price")}</label>
        <label className={styles.label}>{t("total-price-small")}</label>
      </div>
    </div>
  );
};

export default OrderDetailsTableHeader;
