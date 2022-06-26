import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  getStatistics,
  resetStatistics,
  resetStatisticsError,
  selectStatistics,
  setDateOption,
  setPage,
  setSearchDate,
  setSearchName,
} from "../../redux/statistics/statisticsSlice";
import { selectUser } from "../../redux/auth/authSlice.js";

// icons
import { IoMdMore } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";

// components
import Header from "../../components/header/header.component";
import TableHeader from "../../components/table-header/table-header.component";
import SelectCustom from "../../components/select/select.component";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import NoContent from "../../components/no-content/no-content.component";
import Loader from "../../components/action-loader/action-loader.component";
import Toast from "../../components/toast/toast.component";
import Icon from "../../components/action-icon/action-icon.component";

// styles
import tableStyles from "../../components/table.module.scss";
import rowStyles from "../../components/row.module.scss";
import generalStyles from "../../style.module.scss";

// constants and utils
import { Colors, DateOptions, UserTypeConstants } from "../../utils/constants";

function StatisticsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { field, type, title } = location.state
    ? location.state
    : { field: null, type: null, title: null };

  // selectors
  const { statistics, count, pageState, error, status } =
    useSelector(selectStatistics);
  const user = useSelector(selectUser);

  // own state
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedStatistics, setSelectedStatistics] = useState(null);

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

  // handle search
  const handleSearch = (p) => {
    let obj = {
      field,
      type,
      page: p,
      limit: 15,
    };

    // build the query string

    if (pageState.searchName.trim().length !== 0) {
      obj = {
        ...obj,
        name: pageState.searchName,
      };
    }

    // One Day
    if (pageState.dateOption === DateOptions.ONE_DAY) {
      let nextDay = new Date(pageState.date);
      nextDay.setDate(nextDay.getDate() + 1);
      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextDay,
      };
    }

    // Three Days
    if (pageState.dateOption === DateOptions.THREE_DAY) {
      let nextThreeDays = new Date(pageState.date);
      nextThreeDays.setDate(nextThreeDays.getDate() + 3);
      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextThreeDays,
      };
    }

    // One Week
    if (pageState.dateOption === DateOptions.ONE_WEEK) {
      let nextWeek = new Date(pageState.date);
      nextWeek.setDate(nextWeek.getDate() + 7);
      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextWeek,
      };
    }

    // Two Week
    if (pageState.dateOption === DateOptions.TWO_WEEK) {
      let nextTwoWeek = new Date(pageState.date);
      nextTwoWeek.setDate(nextTwoWeek.getDate() + 14);
      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextTwoWeek,
      };
    }

    // One Month
    if (pageState.dateOption === DateOptions.ONE_MONTH) {
      let nextMonth = new Date(pageState.date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextMonth,
      };
    }

    // Two Month
    if (pageState.dateOption === DateOptions.TWO_MONTH) {
      let nextTwoMonth = new Date(pageState.date);
      nextTwoMonth.setMonth(nextTwoMonth.getMonth() + 2);

      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextTwoMonth,
      };
    }

    // Six Month
    if (pageState.dateOption === DateOptions.SIX_MONTH) {
      let nextSixMonth = new Date(pageState.date);
      nextSixMonth.setMonth(nextSixMonth.getMonth() + 6);

      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextSixMonth,
      };
    }

    // One Year
    if (pageState.dateOption === DateOptions.ONE_YEAR) {
      let nextYear = new Date(pageState.date);
      nextYear.setFullYear(nextYear.getFullYear() + 1);

      obj = {
        ...obj,
        date: new Date(pageState.date),
        date1: nextYear,
      };
    }

    dispatch(getStatistics({ obj }))
      .then(unwrapResult)
      .then(() => {
        dispatch(setPage(p + 1));
      });
  };

  const handleEnterPress = () => {
    dispatch(resetStatistics());
    dispatch(setPage(1));
    handleSearch(1);
  };

  const handleMoreResult = () => {
    handleSearch(pageState.page);
  };

  useEffect(() => {
    if (statistics.length === 0) handleSearch(1);
    onSelectedChange();
  }, []);

  return user &&
    user.type === UserTypeConstants.ADMIN &&
    title &&
    type &&
    field ? (
    <div className={generalStyles.container}>
      <Header>
        <h2 className={generalStyles.header_title}>{title}</h2>
        <div style={{ position: "relative", height: "50px" }}>
          <SearchContainer searchAction={handleEnterPress}>
            <SearchInput
              label="statistics-name"
              id="item-name"
              type="text"
              value={pageState.searchName}
              onchange={(e) => dispatch(setSearchName(e.target.value))}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => {
                dispatch(setSearchName(""));
              }}
            />
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

        <div className={generalStyles.refresh_icon}>
          {/* refresh */}
          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={() => {
              handleEnterPress();
            }}
            icon={() => <RiRefreshLine />}
          />
        </div>
      </Header>

      {statistics.length > 0 && (
        <>
          <TableHeader>
            <label className={[tableStyles.label_medium].join(" ")}>
              {t("statistics-name")}
            </label>
            <label className={[tableStyles.label_medium].join(" ")}>
              {t("statistics-count")}
            </label>
            <label className={[tableStyles.label_xsmall].join(" ")}></label>
          </TableHeader>

          {statistics.map((stat) => (
            <div key={stat._id} className={rowStyles.container}>
              <label className={tableStyles.label_medium}>{stat.name}</label>
              <label className={tableStyles.label_medium}>{stat.count}</label>
              <label className={tableStyles.label_xsmall}>
                <Icon
                  selected={false}
                  icon={() => <IoMdMore size={24} />}
                  tooltip={t("statistics-dates")}
                  onclick={() => {
                    setSelectedStatistics(stat);
                    setShowMoreInfo(true);
                  }}
                />
              </label>
            </div>
          ))}
        </>
      )}

      {statistics.length === 0 && status !== "loading" && (
        <NoContent msg={t("no-statistics")} />
      )}

      {statistics.length < count && (
        <Button
          text={t("more")}
          action={handleMoreResult}
          bgColor={Colors.SECONDARY_COLOR}
        />
      )}

      {statistics.length === count && status !== "loading" && count !== 0 && (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-more")}
        </p>
      )}

      {status === "loading" && <Loader allowCancel={false} />}

      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetStatisticsError());
          }}
        >
          {t(error)}
        </Toast>
      )}

      {showMoreInfo && (
        <Modal
          header="statistics-dates"
          cancelLabel="close-label"
          closeModal={() => {
            setShowMoreInfo(false);
            setSelectedStatistics(null);
          }}
          small
        >
          <div style={{ maxHeight: "200px", overflow: "auto" }}>
            {selectedStatistics.dates.map((date) => (
              <div
                className={[
                  rowStyles.container,
                  rowStyles.without_box_shadow,
                  generalStyles.center,
                ].join(" ")}
                key={date}
              >
                {date.split("T")[0]}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default StatisticsPage;
