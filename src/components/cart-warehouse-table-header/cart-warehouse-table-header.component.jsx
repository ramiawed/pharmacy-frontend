import React from "react";
import { useTranslation } from "react-i18next";

import TableHeader from "../table-header/table-header.component";

import tableStyles from "../table.module.scss";

function CartWarehouseTableHeader() {
  const { t } = useTranslation();

  return (
    <TableHeader>
      <label className={tableStyles.label_medium}>{t("item-trade-name")}</label>
      <label className={tableStyles.label_small}>
        {t("user-company-name")}
      </label>
      <label className={tableStyles.label_small}>{t("item-formula")}</label>
      <label className={tableStyles.label_small}>
        {t("item-caliber")}/{t("item-packing")}
      </label>
      <label className={tableStyles.label_small}>{t("price")}</label>
      <label className={tableStyles.label_small}>{t("item-max-qty")}</label>
      <label className={tableStyles.label_small}>{t("selected-qty")}</label>
      <label className={tableStyles.label_xsmall}>{t("offer-label")}</label>
      <label className={tableStyles.label_small}>{t("total-price")}</label>
      <label className={tableStyles.label_xsmall}></label>
    </TableHeader>
  );
}

export default CartWarehouseTableHeader;
