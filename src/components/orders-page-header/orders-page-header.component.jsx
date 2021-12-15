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
  setDateOption,
  setSearchDate,
  setSearchPharmacyName,
  setSearchWarehouseName,
} from "../../redux/orders/ordersSlice";

// icons
import { RiRefreshLine } from "react-icons/ri";

// constants and utils
import { Colors, DateOptions, UserTypeConstants } from "../../utils/constants";

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

  return (
    <Header>
      <>
        <h2>
          {t("nav-orders")} <span>{count}</span>
        </h2>
      </>

      <div style={{ position: "relative", height: "50px" }}>
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

          <div
            className={[
              generalStyles.flex_container,
              generalStyles.padding_v_6,
            ].join(" ")}
          >
            <label style={{ fontSize: "0.7rem" }}>{t("dates-within")}</label>
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
            className={[
              generalStyles.flex_container,
              generalStyles.padding_v_6,
            ].join(" ")}
          >
            <label style={{ fontSize: "0.7rem" }}>{t("date-label")}</label>
            <input
              type="date"
              value={pageState.date}
              onChange={(e) => {
                dispatch(setSearchDate(e.target.value));
              }}
            />
          </div>
        </SearchContainer>
      </div>
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
    </Header>
  );
}

export default OrderPageHeader;
