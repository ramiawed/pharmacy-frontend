import React from "react";
import { useTranslation } from "react-i18next";
import { Colors } from "../../utils/constants";
import TableHeader from "../table-header/table-header.component";

import tableStyles from "../table.module.scss";
import styles from "./excel-file-criteria.module.scss";

function ExcelFileCriteria({ action }) {
  const { t } = useTranslation();
  return (
    <>
      <p className={styles.header}>
        {t("excel-file-should-contains-this-columns")}
      </p>
      <TableHeader>
        {action === "update" && (
          <label className={tableStyles.label_medium}>_id</label>
        )}
        <label className={tableStyles.label_medium}>name</label>
        <label className={tableStyles.label_medium}>formula</label>
        <label className={tableStyles.label_medium}>caliber</label>
        <label className={tableStyles.label_medium}>packing</label>
        <label className={tableStyles.label_medium}>price</label>
        <label className={tableStyles.label_medium}>customer_price</label>
        <label className={tableStyles.label_medium}>barcode</label>
        <label className={tableStyles.label_medium}>indication</label>
        <label className={tableStyles.label_medium}>composition</label>
      </TableHeader>
      <p>{t("excel-file-warning")}</p>
      <p
        style={{
          color: Colors.SUCCEEDED_COLOR,
          fontSize: "1.2rem",
        }}
      >
        {t("required-criteria")}
      </p>
      <ul
        style={{
          marginInlineStart: "30px",
        }}
      >
        {action === "update" && <li>{t("required-id-criteria")}</li>}
        <li>{t("required-name-criteria")}</li>
        <li>{t("required-price-criteria")}</li>
        <li>{t("required-customer-price-criteria")}</li>
      </ul>
    </>
  );
}

export default ExcelFileCriteria;
