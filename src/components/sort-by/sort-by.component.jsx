import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./sort-by.module.scss";

function SortBy({ arr, orderBy, orderChange, valueChanged }) {
  const { t } = useTranslation();
  return (
    <>
      {arr.map((a, index) => (
        <div key={index} id={a.value} className={styles.order_div}>
          <input
            type="checkbox"
            checked={orderBy[a.value] ? true : false}
            onChange={() => orderChange(a.value)}
          />
          <label className={styles.label}>{a.label}</label>

          <div className={styles.order_option}>
            <div>
              <input
                type="checkbox"
                checked={orderBy[a.value] === -1}
                onChange={() => valueChanged(a.value, -1)}
              />
              <label>{t("order-descending")}</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={orderBy[a.value] === 1}
                onChange={() => valueChanged(a.value, 1)}
              />
              <label>{t("order-ascending")}</label>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SortBy;
