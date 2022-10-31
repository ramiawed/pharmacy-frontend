import React from "react";
import { useTranslation } from "react-i18next";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import SearchRowContainer from "../search-row-container/search-row-container.component";
import SelectSearch from "../select-search/select-search.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import {
  setAdminOrderStatus,
  setDateOption,
  setPharmacyOrderStatus,
  setSearchDate,
  setSearchPharmacyName,
  setSearchWarehouseName,
  setWarehouseOrderStatus,
} from "../../redux/orders/ordersSlice";

import {
  setAdminOrderStatus as basketSetAdminOrderStatus,
  setDateOption as basketSetDateOption,
  setPharmacyOrderStatus as basketSetPharmacyOrderStatus,
  setSearchDate as basketSetSearchDate,
  setSearchPharmacyName as basketSetSearchPharmacyName,
  setSearchWarehouseName as basketSetSearchWarehouseName,
  setWarehouseOrderStatus as basketSetWarehouseOrderStatus,
} from "../../redux/basketOrdersSlice/basketOrdersSlice";

// constants and utils
import {
  AdminOrderStatus,
  DateOptions,
  PharmacyOrderStatus,
  UserTypeConstants,
  WarehouseOrderStatus,
} from "../../utils/constants";

function OrdersSearchEngine({ pageState, search, type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const user = useSelector(selectUser);

  const dateOptions = [
    { value: "", label: t("choose-date") },
    { value: DateOptions.ONE_DAY, label: t("one-day") },
    { value: DateOptions.THREE_DAY, label: t("three-days") },
    { value: DateOptions.ONE_WEEK, label: t("one-week") },
    { value: DateOptions.TWO_WEEK, label: t("two-weeks") },
    { value: DateOptions.ONE_MONTH, label: t("one-month") },
    { value: DateOptions.TWO_MONTH, label: t("two-months") },
    { value: DateOptions.SIX_MONTH, label: t("six-months") },
    { value: DateOptions.ONE_YEAR, label: t("one-year") },
  ];

  const handleDateOptions = (val) => {
    dispatch(type === "order" ? setDateOption(val) : basketSetDateOption(val));
  };

  const warehouseOrderStatusOptions = [
    {
      value: WarehouseOrderStatus.ALL,
      label: t("all"),
    },
    {
      value: WarehouseOrderStatus.UNREAD,
      label: t("unread"),
    },
    {
      value: WarehouseOrderStatus.RECEIVED,
      label: t("received"),
    },
    {
      value: WarehouseOrderStatus.SENT,
      label: t("shipped"),
    },
    {
      value: WarehouseOrderStatus.WILL_DONT_SERVER,
      label: t("will-dont-serve"),
    },
  ];

  const handleWarehouseOrderStatusOption = (val) => {
    dispatch(
      type === "order"
        ? setWarehouseOrderStatus(val)
        : basketSetWarehouseOrderStatus(val)
    );
  };

  const pharmacyOrderStatusOptions = [
    {
      value: PharmacyOrderStatus.ALL,
      label: t("all"),
    },

    {
      value: PharmacyOrderStatus.RECEIVED,
      label: t("received"),
    },
    {
      value: PharmacyOrderStatus.SENT,
      label: t("sent"),
    },
  ];

  const handlePharmacyOrderStatusOption = (val) => {
    dispatch(
      type === "order"
        ? setPharmacyOrderStatus(val)
        : basketSetPharmacyOrderStatus(val)
    );
  };

  const adminOrderStatusOptions = [
    {
      value: AdminOrderStatus.ALL,
      label: t("all"),
    },

    {
      value: AdminOrderStatus.SEEN,
      label: t("seen"),
    },
    {
      value: AdminOrderStatus.NOT_SEEN,
      label: t("not-seen"),
    },
  ];

  const handleAdminOrderStatusOption = (val) => {
    dispatch(
      type === "order"
        ? setAdminOrderStatus(val)
        : basketSetAdminOrderStatus(val)
    );
  };

  return (
    <>
      <SearchContainer searchAction={search}>
        {user.type !== UserTypeConstants.PHARMACY && (
          <SearchInput
            label="pharmacy-name"
            id="pharmacy-name"
            type="text"
            value={pageState.searchPharmacyName}
            onchange={(e) =>
              dispatch(
                type === "order"
                  ? setSearchPharmacyName(e.target.value)
                  : basketSetSearchPharmacyName(e.target.value)
              )
            }
            placeholder="enter-pharmacy-name-placeholder"
            onEnterPress={search}
            resetField={() => {
              dispatch(
                type === "order"
                  ? setSearchPharmacyName("")
                  : basketSetSearchPharmacyName("")
              );
            }}
          />
        )}

        {user.type !== UserTypeConstants.WAREHOUSE && (
          <SearchInput
            label="warehouse-name"
            id="warehouse-name"
            type="text"
            value={pageState.searchWarehouseName}
            onchange={(e) =>
              dispatch(
                type === "order"
                  ? setSearchWarehouseName(e.target.value)
                  : basketSetSearchWarehouseName(e.target.value)
              )
            }
            placeholder="enter-warehouse-name-placeholder"
            onEnterPress={search}
            resetField={() => {
              dispatch(
                type === "order"
                  ? setSearchWarehouseName("")
                  : basketSetSearchWarehouseName("")
              );
            }}
          />
        )}

        {user.type === UserTypeConstants.ADMIN && (
          <SelectSearch
            text="admin-order-status"
            options={adminOrderStatusOptions}
            changeHandler={handleAdminOrderStatusOption}
            defaultOption={{
              value: pageState.adminOrderStatus,
              label: t(pageState.adminOrderStatus),
            }}
          />
        )}

        <SelectSearch
          text="warehouse-order-status"
          options={warehouseOrderStatusOptions}
          changeHandler={handleWarehouseOrderStatusOption}
          defaultOption={{
            value: pageState.warehouseOrderStatus,
            label: t(pageState.warehouseOrderStatus),
          }}
        />

        <SelectSearch
          text="pharmacy-order-status"
          options={pharmacyOrderStatusOptions}
          changeHandler={handlePharmacyOrderStatusOption}
          defaultOption={{
            value: pageState.pharmacyOrderStatus,
            label: t(pageState.pharmacyOrderStatus),
          }}
        />

        <SelectSearch
          text="dates-within"
          options={dateOptions}
          changeHandler={handleDateOptions}
          defaultOption={{
            value: pageState.dateOption,
            label: t(
              `${
                dateOptions.find((o) => o.value === pageState.dateOption).label
              }`
            ),
          }}
        />

        <SearchRowContainer>
          <label>{t("date-label")}</label>
          <input
            type="date"
            value={pageState.date}
            onChange={(e) => {
              dispatch(
                type === "order"
                  ? setSearchDate(e.target.value)
                  : basketSetSearchDate(e.target.value)
              );
            }}
          />
        </SearchRowContainer>
      </SearchContainer>
    </>
  );
}

export default OrdersSearchEngine;
