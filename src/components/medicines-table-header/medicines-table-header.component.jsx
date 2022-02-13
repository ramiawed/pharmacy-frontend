import React from "react";
import { useTranslation } from "react-i18next";
import { UserTypeConstants } from "../../utils/constants";

import TableHeader from "../table-header/table-header.component";

import styles from "./medicines-table-header.module.scss";

function MedicinesTableHeader({ user }) {
  const { t } = useTranslation();

  return (
    <TableHeader>
      <label
        className={styles.normal}
        style={{
          flex: 3,
        }}
      >
        {t("item-trade-name")}
      </label>

      {/* company name */}
      <label
        className={styles.large}
        style={{
          flex: 1,
        }}
      >
        {t("user-company-name")}
      </label>
      <label
        className={styles.small}
        style={{
          flex: 1,
        }}
      >
        {t("user-company-name-small")}
      </label>

      {/* caliber */}
      <label
        className={styles.large}
        style={{
          width: "40px",
        }}
      >
        {t("item-caliber")}
      </label>
      <label
        className={styles.small}
        style={{
          width: "25px",
        }}
      >
        {t("item-caliber-small")}
      </label>

      {/* packing */}
      <label
        className={styles.large}
        style={{
          width: "40px",
        }}
      >
        {t("item-packing")}
      </label>

      <label
        className={styles.small}
        style={{
          width: "25px",
        }}
      >
        {t("item-packing-small")}
      </label>

      {/* formula */}
      <label
        className={styles.large}
        style={{
          flex: 1,
        }}
      >
        {t("item-formula")}
      </label>

      <label
        className={styles.small}
        style={{
          flex: 1,
        }}
      >
        {t("item-formula-small")}
      </label>

      {/* price */}
      {user.type !== UserTypeConstants.GUEST && (
        <>
          <label
            className={styles.large}
            style={{
              width: "65px",
            }}
          >
            {t("item-price")}
          </label>
          <label
            className={styles.small}
            style={{
              width: "30px",
            }}
          >
            {t("item-price-small")}
          </label>
        </>
      )}

      {/* customer price */}
      <label
        className={styles.large}
        style={{
          width: "65px",
        }}
      >
        {t("item-customer-price")}
      </label>
      <label
        className={styles.small}
        style={{
          width: "30px",
        }}
      >
        {t("item-customer-price-small")}
      </label>

      <label
        className={styles.large}
        style={{
          flex: 1,
        }}
      >
        {t("item-barcode")}
      </label>
      <label
        className={styles.small}
        style={{
          flex: 1,
        }}
      >
        {t("item-barcode-small")}
      </label>

      <label className={styles.icon}></label>
      <label className={styles.icon}></label>
    </TableHeader>
  );
}

export default MedicinesTableHeader;
