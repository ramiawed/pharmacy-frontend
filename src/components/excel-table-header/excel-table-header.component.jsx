import React from "react";
import { useTranslation } from "react-i18next";

// react icons
import { AiFillDelete } from "react-icons/ai";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
} from "react-icons/md";

import TableHeader from "../table-header/table-header.component";

import tableStyles from "../table.module.scss";
import generalStyles from "../../style.module.scss";
import { Colors } from "../../utils/constants";

function ExcelTableHeader({
  deleteAllItem,
  selectValue,
  itemsSelectionChange,
}) {
  const { t } = useTranslation();
  return (
    <TableHeader>
      <label className={tableStyles.label_xsmall}>
        <div onClick={itemsSelectionChange}>
          {selectValue === "all" && (
            <MdOutlineCheckBox size={20} color={Colors.WHITE_COLOR} />
          )}
          {selectValue === "none" && (
            <MdOutlineCheckBoxOutlineBlank size={20} />
          )}
          {selectValue === "some" && (
            <MdOutlineIndeterminateCheckBox size={20} />
          )}
        </div>
      </label>
      <label className={tableStyles.label_medium}>{t("item-trade-name")}</label>
      <label className={tableStyles.label_medium}>{t("item-formula")}</label>
      <label className={tableStyles.label_small}>{t("item-caliber")}</label>
      <label className={tableStyles.label_small}>{t("item-packing")}</label>
      <label className={tableStyles.label_medium}>{t("item-price")}</label>
      <label className={tableStyles.label_medium}>
        {t("item-customer-price")}
      </label>
      <label className={tableStyles.label_medium}>{t("item-barcode")}</label>
      <label className={tableStyles.label_large}>{t("item-indication")}</label>
      <label className={tableStyles.label_large}>{t("item-composition")}</label>
      <label className={tableStyles.label_xsmall}>
        <div
          className={[
            generalStyles.icon,
            generalStyles.fc_red,
            generalStyles.margin_h_auto,
          ].join(" ")}
          onClick={deleteAllItem}
        >
          <AiFillDelete size={16} />
          <div className={generalStyles.tooltip}>{t("delete-all-rows")}</div>
        </div>
      </label>
    </TableHeader>
  );
}

export default ExcelTableHeader;
