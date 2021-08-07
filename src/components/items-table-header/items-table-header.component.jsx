import React from "react";
import { useTranslation } from "react-i18next";

import TableHeader from "../table-header/table-header.component";

// react icons
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import { TiArrowUnsorted } from "react-icons/ti";

import tableStyles from "../table.module.scss";
import generalStyles from "../../style.module.scss";
import { UserTypeConstants } from "../../utils/constants";

function ItemsTableHeader({
  user,
  role,
  sortByName,
  sortNameField,
  sortByCaliber,
  sortCaliberField,
  sortByPrice,
  sortPriceField,
  sortByCustomerPrice,
  sortCustomerPriceField,
}) {
  const { t } = useTranslation();

  return (
    <TableHeader>
      <label
        className={[
          tableStyles.label_medium,
          generalStyles.flex_center_container,
        ].join(" ")}
        onClick={sortByName}
      >
        {t("item-trade-name")}
        {sortNameField === 1 && (
          <AiOutlineSortAscending style={{ marginRight: "4px" }} />
        )}
        {sortNameField === -1 && (
          <AiOutlineSortDescending style={{ marginRight: "4px" }} />
        )}
        {sortNameField === 0 && (
          <TiArrowUnsorted style={{ marginRight: "4px" }} />
        )}
      </label>

      {((user.type === UserTypeConstants.ADMIN &&
        role === UserTypeConstants.ADMIN) ||
        (user.type === UserTypeConstants.ADMIN &&
          role === UserTypeConstants.WAREHOUSE) ||
        user.type === UserTypeConstants.WAREHOUSE) && (
        <label className={tableStyles.label_medium}>
          {t("user-company-name")}
        </label>
      )}
      <label className={tableStyles.label_small}>{t("item-status")}</label>

      <label className={tableStyles.label_small}>{t("item-formula")}</label>

      <label
        className={[
          tableStyles.label_small,
          generalStyles.flex_center_container,
        ].join(" ")}
        onClick={sortByCaliber}
      >
        {t("item-caliber")}
        {sortCaliberField === 1 && (
          <AiOutlineSortAscending style={{ marginRight: "4px" }} />
        )}
        {sortCaliberField === -1 && (
          <AiOutlineSortDescending style={{ marginRight: "4px" }} />
        )}
        {sortCaliberField === 0 && (
          <TiArrowUnsorted style={{ marginRight: "4px" }} />
        )}
      </label>

      <label className={tableStyles.label_small}>{t("item-packing")}</label>

      <label
        className={[
          tableStyles.label_small,
          generalStyles.flex_center_container,
        ].join(" ")}
        onClick={sortByPrice}
      >
        {t("item-price")}
        {sortPriceField === 1 && (
          <AiOutlineSortAscending style={{ marginRight: "4px" }} />
        )}
        {sortPriceField === -1 && (
          <AiOutlineSortDescending style={{ marginRight: "4px" }} />
        )}
        {sortPriceField === 0 && (
          <TiArrowUnsorted style={{ marginRight: "4px" }} />
        )}
      </label>

      <label
        className={[
          tableStyles.label_small,
          generalStyles.flex_center_container,
        ].join(" ")}
        onClick={sortByCustomerPrice}
      >
        {t("item-customer-price")}
        {sortCustomerPriceField === 1 && (
          <AiOutlineSortAscending style={{ marginRight: "4px" }} />
        )}
        {sortCustomerPriceField === -1 && (
          <AiOutlineSortDescending style={{ marginRight: "4px" }} />
        )}
        {sortCustomerPriceField === 0 && (
          <TiArrowUnsorted style={{ marginRight: "4px" }} />
        )}
      </label>

      {((user.type === UserTypeConstants.ADMIN &&
        role === UserTypeConstants.WAREHOUSE) ||
        user.type === UserTypeConstants.WAREHOUSE) && (
        <>
          <label className={tableStyles.label_small}>{t("item-max-qty")}</label>
          <label className={tableStyles.label_xsmall}></label>
          <label className={tableStyles.label_xsmall}></label>
        </>
      )}
    </TableHeader>
  );
}

export default ItemsTableHeader;
