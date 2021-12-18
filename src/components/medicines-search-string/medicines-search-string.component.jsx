import React from "react";
import { useTranslation } from "react-i18next";
import { UserTypeConstants } from "../../utils/constants";

import styles from "./medicines-search-string.module.scss";

function MedicinesSearchString({ pageState, user }) {
  const { t } = useTranslation();
  return (
    <div className={styles.div_search_str}>
      {pageState.searchName && (
        <>
          <label className={styles.label}>{t("item-name")}:</label>{" "}
          <label className={styles.value}>{pageState.searchName}</label>
        </>
      )}

      {pageState.searchCompanyName && (
        <>
          <label className={styles.label}>{t("item-company")}:</label>{" "}
          <label className={styles.value}>{pageState.searchCompanyName}</label>
        </>
      )}

      {pageState.searchWarehouseName && (
        <>
          <label className={styles.label}>{t("item-warehouse")}:</label>{" "}
          <label className={styles.value}>
            {pageState.searchWarehouseName}
          </label>
        </>
      )}

      {pageState.searchInWarehouse &&
        user.type === UserTypeConstants.WAREHOUSE && (
          <label className={styles.value}>{t("warehouse-in-warehouse")}</label>
        )}

      {pageState.searchInWarehouse &&
        user.type !== UserTypeConstants.WAREHOUSE && (
          <label className={styles.value}>{t("pharmacy-in-warehouse")}</label>
        )}

      {pageState.searchOutWarehouse &&
        user.type === UserTypeConstants.WAREHOUSE && (
          <label className={styles.value}>{t("warehouse-out-warehouse")}</label>
        )}

      {pageState.searchOutWarehouse &&
        user.type !== UserTypeConstants.WAREHOUSE && (
          <label className={styles.value}>{t("pharmacy-out-warehouse")}</label>
        )}
    </div>
  );
}

export default MedicinesSearchString;
