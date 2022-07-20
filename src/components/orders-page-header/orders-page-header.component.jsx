import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
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

import {
  setAdminOrderStatus as basketSetAdminOrderStatus,
  setDateOption as basketSetDateOption,
  setPharmacyOrderStatus as basketSetPharmacyOrderStatus,
  setSearchDate as basketSetSearchDate,
  setSearchPharmacyName as basketSetSearchPharmacyName,
  setSearchWarehouseName as basketSetSearchWarehouseName,
  setWarehouseOrderStatus as basketSetWarehouseOrderStatus,
} from "../../redux/basketOrdersSlice/basketOrdersSlice";

// icons
import { RiRefreshLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

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
import styles from "./orders-page-header.module.scss";

function OrderPageHeader({ pageState, search, type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

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
          <div className={styles.selectDiv}>
            <label>{t("admin-order-status")}</label>
            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={adminOrderStatusOptions}
              onchange={handleAdminOrderStatusOption}
              defaultOption={{
                value: pageState.adminOrderStatus,
                label: t(pageState.adminOrderStatus),
              }}
            />
          </div>
        )}

        <div className={styles.selectDiv}>
          <label>{t("warehouse-order-status")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={warehouseOrderStatusOptions}
            onchange={handleWarehouseOrderStatusOption}
            defaultOption={{
              value: pageState.warehouseOrderStatus,
              label: t(pageState.warehouseOrderStatus),
            }}
          />
        </div>

        <div className={styles.selectDiv}>
          <label>{t("pharmacy-order-status")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={pharmacyOrderStatusOptions}
            onchange={handlePharmacyOrderStatusOption}
            defaultOption={{
              value: pageState.pharmacyOrderStatus,
              label: t(pageState.pharmacyOrderStatus),
            }}
          />
        </div>

        <div className={styles.selectDiv}>
          <label>{t("dates-within")}</label>
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
              dispatch(
                type === "order"
                  ? setSearchDate(e.target.value)
                  : basketSetSearchDate(e.target.value)
              );
            }}
          />
        </div>
      </SearchContainer>
      <div className={generalStyles.actions}>
        <Icon
          foreColor={Colors.MAIN_COLOR}
          selected={false}
          icon={() => <RiRefreshLine />}
          tooltip={t("refresh-tooltip")}
          onclick={search}
          withBackground={true}
        />

        <Icon
          onclick={() => {
            history.goBack();
          }}
          icon={() => <IoMdArrowRoundBack />}
          foreColor={Colors.MAIN_COLOR}
          withBackground={true}
        />
      </div>
    </>
  );
}

export default OrderPageHeader;
