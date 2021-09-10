import React from "react";
import { useTranslation } from "react-i18next";

// components
import TableHeader from "../table-header/table-header.component";

// redux stuff
import { useDispatch } from "react-redux";
import {
  setSortCaliberField,
  setSortCustomerPriceField,
  setSortFields,
  setSortNameField,
  setSortPriceField,
} from "../../redux/items/itemsSlices";

// react icons
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";

// styles
import tableStyles from "../table.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

function ItemsTableHeader({
  user,
  role,
  sortNameField,
  sortCaliberField,
  sortPriceField,
  sortCustomerPriceField,
  pageState,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // sort by item's name
  const sortByName = () => {
    if (pageState.sortNameField === 0) {
      dispatch(setSortNameField(1));
      dispatch(setSortFields("name"));
    } else if (pageState.sortNameField === 1) {
      dispatch(setSortNameField(-1));
      dispatch(setSortFields("-name"));
    } else {
      dispatch(setSortNameField(0));
      dispatch(setSortFields(""));
    }
    dispatch(setSortCaliberField(0));
    dispatch(setSortPriceField(0));
    dispatch(setSortCustomerPriceField(0));
  };

  // sort by item's caliber
  const sortByCaliber = () => {
    if (pageState.sortCaliberField === 0) {
      dispatch(setSortCaliberField(1));
      dispatch(setSortFields("caliber"));
    } else if (pageState.sortCaliberField === 1) {
      dispatch(setSortCaliberField(-1));
      dispatch(setSortFields("-caliber"));
    } else {
      dispatch(setSortCaliberField(0));
      dispatch(setSortFields(""));
    }
    dispatch(setSortNameField(0));
    dispatch(setSortPriceField(0));
    dispatch(setSortCustomerPriceField(0));
  };

  // sort by item's price
  const sortByPrice = () => {
    if (pageState.sortPriceField === 0) {
      dispatch(setSortPriceField(1));
      dispatch(setSortFields("price"));
    } else if (pageState.sortPriceField === 1) {
      dispatch(setSortPriceField(-1));
      dispatch(setSortFields("-price"));
    } else {
      dispatch(setSortPriceField(0));
      dispatch(setSortFields(""));
    }
    dispatch(setSortNameField(0));
    dispatch(setSortCaliberField(0));
    dispatch(setSortCustomerPriceField(0));
  };

  // sort by items' customer price
  const sortByCustomerPrice = () => {
    if (pageState.sortCustomerPriceField === 0) {
      dispatch(setSortCustomerPriceField(1));
      dispatch(setSortFields("customer_price"));
    } else if (pageState.sortCustomerPriceField === 1) {
      dispatch(setSortCustomerPriceField(-1));
      dispatch(setSortFields("-customer_price"));
    } else {
      dispatch(setSortCustomerPriceField(0));
      dispatch(setSortFields(""));
    }
    dispatch(setSortNameField(0));
    dispatch(setSortCaliberField(0));
    dispatch(setSortPriceField(0));
  };

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
