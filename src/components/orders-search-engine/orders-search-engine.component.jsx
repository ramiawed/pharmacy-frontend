import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import SearchRowContainer from "../search-row-container/search-row-container.component";
import ChooserContainer from "../chooser-container/chooser-container.component";
import SearchContainer from "../search-container/search-container.component";
import ChooseValue from "../choose-value/choose-value.component";
import SearchInput from "../search-input/search-input.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import {
  setDateOption,
  setOrderStatus,
  setSearchDate,
  setSearchPharmacyName,
  setSearchWarehouseName,
} from "../../redux/orders/ordersSlice";

// constants and utils
import {
  DateOptions,
  OrdersStatusOptions,
  UserTypeConstants,
} from "../../utils/constants";

function OrdersSearchEngine({ pageState, search, type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const user = useSelector(selectUser);
  const [showChooseOrderStatus, setShowChooseOrderStatus] = useState(false);
  const [showChooseDatesOption, setShowChooseDatesOption] = useState(false);

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
    dispatch(setDateOption(val));
  };

  const orderStatusOptions = [
    {
      value: OrdersStatusOptions.ALL,
      label: t("all"),
    },
    {
      value: OrdersStatusOptions.SENT_BY_PHARMACY,
      label: t("sent-by-pharmacy-label"),
    },
    {
      value: OrdersStatusOptions.CONFIRM,
      label: t("confirm-label"),
    },
    {
      value: OrdersStatusOptions.DELIVERY,
      label: t("delivery-label"),
    },
    {
      value: OrdersStatusOptions.SHIPPING,
      label: t("shipping-label"),
    },
    {
      value: OrdersStatusOptions.WILL_DONT_SERVER,
      label: t("dont-serve-label"),
    },
  ];

  const handleOrderStatusOption = (val) => {
    dispatch(setOrderStatus(val));
  };

  const isThereSearch =
    pageState.searchPharmacyName.trim().length > 0 ||
    pageState.searchWarehouseName.trim().length > 0 ||
    pageState.orderStatus !== OrdersStatusOptions.ALL ||
    (pageState.dateOption !== "" && pageState.date !== "");

  return (
    <>
      <SearchContainer searchAction={search} searchEngineAlert={isThereSearch}>
        {user.type !== UserTypeConstants.PHARMACY && (
          <SearchInput
            label="pharmacy-name"
            id="pharmacy-name"
            type="text"
            value={pageState.searchPharmacyName}
            onchange={(e) => dispatch(setSearchPharmacyName(e.target.value))}
            placeholder="enter pharmacy name-placeholder"
            onEnterPress={search}
            resetField={() => {
              dispatch(setSearchPharmacyName(""));
            }}
          />
        )}

        {user.type !== UserTypeConstants.WAREHOUSE && (
          <SearchInput
            label="warehouse-name"
            id="warehouse-name"
            type="text"
            value={pageState.searchWarehouseName}
            onchange={(e) => dispatch(setSearchWarehouseName(e.target.value))}
            placeholder="enter warehouse name-placeholder"
            onEnterPress={search}
            resetField={() => {
              dispatch(setSearchWarehouseName(""));
            }}
          />
        )}

        <ChooserContainer
          onclick={() => {
            setShowChooseOrderStatus(true);
          }}
          selectedValue={
            orderStatusOptions.filter(
              (option) => option.value === pageState.orderStatus
            )[0].label
          }
          label="order-status-label"
          styleForSearch={true}
          withoutBorder={true}
        />

        <ChooserContainer
          onclick={() => {
            setShowChooseDatesOption(true);
          }}
          selectedValue={
            dateOptions.filter((d) => d.value === pageState.dateOption)[0].label
          }
          label="dates-within"
          styleForSearch={true}
          withoutBorder={true}
        />

        <SearchRowContainer>
          <label>{t("date-label")}</label>
          <input
            type="date"
            value={pageState.date}
            onChange={(e) => {
              dispatch(setSearchDate(e.target.value));
            }}
          />
        </SearchRowContainer>
      </SearchContainer>

      {showChooseOrderStatus && (
        <ChooseValue
          headerTitle="order-status-label"
          close={() => {
            setShowChooseOrderStatus(false);
          }}
          values={orderStatusOptions}
          defaultValue={pageState.orderStatus}
          chooseHandler={(value) => {
            handleOrderStatusOption(value);
          }}
        />
      )}

      {showChooseDatesOption && (
        <ChooseValue
          headerTitle="dates-within"
          close={() => {
            setShowChooseDatesOption(false);
          }}
          values={dateOptions}
          defaultValue={pageState.dateOption}
          chooseHandler={(value) => {
            handleDateOptions(value);
          }}
        />
      )}
    </>
  );
}

export default OrdersSearchEngine;
