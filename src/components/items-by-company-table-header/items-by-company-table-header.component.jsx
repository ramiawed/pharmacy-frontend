import React from "react";
import { useTranslation } from "react-i18next";

import TableHeader from "../table-header/table-header.component";

import tableStyles from "../table.module.scss";

function ItemsByCompanyTableHeader() {
  const { t } = useTranslation();

  return (
    <TableHeader>
      <label className={tableStyles.label_medium}>{t("item-trade-name")}</label>
      <label className={tableStyles.label_small}>{t("item-caliber")}</label>
      <label className={tableStyles.label_small}>{t("item-formula")}</label>
      <label className={tableStyles.label_small}>{t("item-price")}</label>
      <label className={tableStyles.label_small}>
        {t("item-customer-price")}
      </label>
      <label className={tableStyles.label_xsmall}></label>
      <label className={tableStyles.label_xsmall}></label>
    </TableHeader>
  );
}

export default ItemsByCompanyTableHeader;
