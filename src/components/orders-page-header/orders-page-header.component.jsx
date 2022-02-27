import React from "react";
import { useTranslation } from "react-i18next";

// components
import Header from "../header/header.component";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import SelectCustom from "../select/select.component";
import Icon from "../action-icon/action-icon.component";

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

// icons
import { RiRefreshLine } from "react-icons/ri";

// constants and utils
import {
  AdminOrderStatus,
  Colors,
  DateOptions,
  PharmacyOrderStatus,
  UserTypeConstants,
  WarehouseOrderStatus,
} from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";

function OrderPageHeader({ count, pageState, search }) {
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
    dispatch(setDateOption(val));
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
      label: t("sent"),
    },
    {
      value: WarehouseOrderStatus.WILL_DONT_SERVER,
      label: t("will-dont-serve"),
    },
  ];

  const handleWarehouseOrderStatusOption = (val) => {
    dispatch(setWarehouseOrderStatus(val));
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
    dispatch(setPharmacyOrderStatus(val));
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
    dispatch(setAdminOrderStatus(val));
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
            onchange={(e) => dispatch(setSearchPharmacyName(e.target.value))}
            placeholder="search"
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
            placeholder="search"
            onEnterPress={search}
            resetField={() => {
              dispatch(setSearchWarehouseName(""));
            }}
          />
        )}

        {user.type === UserTypeConstants.ADMIN && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              backgroundColor: Colors.WHITE_COLOR,
              borderRadius: "6px",
              marginBottom: "4px",
            }}
          >
            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={adminOrderStatusOptions}
              onchange={handleAdminOrderStatusOption}
              defaultOption={{
                value: pageState.adminOrderStatus,
                label: t(pageState.adminOrderStatus),
              }}
              caption={t("admin-order-status")}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: Colors.WHITE_COLOR,
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        >
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={warehouseOrderStatusOptions}
            onchange={handleWarehouseOrderStatusOption}
            defaultOption={{
              value: pageState.warehouseOrderStatus,
              label: t(pageState.warehouseOrderStatus),
            }}
            caption={t("warehouse-order-status")}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: Colors.WHITE_COLOR,
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        >
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={pharmacyOrderStatusOptions}
            onchange={handlePharmacyOrderStatusOption}
            defaultOption={{
              value: pageState.pharmacyOrderStatus,
              label: t(pageState.pharmacyOrderStatus),
            }}
            caption={t("pharmacy-order-status")}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: Colors.WHITE_COLOR,
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        >
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={dateOptions}
            onchange={handleDateOptions}
            defaultOption={{
              value: pageState.dateOption,
              label: t(
                `${
                  dateOptions.find((o) => o.value === pageState.dateOption)
                    .label
                }`
              ),
            }}
            caption={t("dates-within")}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: Colors.WHITE_COLOR,
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        >
          <label
            style={{
              fontSize: "0.7rem",
              color: Colors.SECONDARY_COLOR,
              minWidth: "100px",
              paddingInlineStart: "10px",
            }}
          >
            {t("date-label")}
          </label>
          <input
            type="date"
            value={pageState.date}
            onChange={(e) => {
              dispatch(setSearchDate(e.target.value));
            }}
          />
        </div>
      </SearchContainer>
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "46px",
        }}
      >
        <Icon
          foreColor={Colors.SECONDARY_COLOR}
          selected={false}
          icon={() => <RiRefreshLine />}
          tooltip={t("refresh-tooltip")}
          onclick={search}
        />
      </div>
    </>
  );
}

export default OrderPageHeader;
