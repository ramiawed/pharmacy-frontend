import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory, useLocation } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  getStatistics,
  resetStatistics,
  resetStatisticsArray,
  resetStatisticsError,
  selectStatistics,
  setDateOption,
  setPage,
  setSearchDate,
  setSearchDate1,
  setSearchName,
} from "../../redux/statistics/statisticsSlice";
import { selectUserData } from "../../redux/auth/authSlice.js";

// icons
import { IoMdMore, IoMdArrowRoundBack } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";
import { CgMoreVertical } from "react-icons/cg";

// components
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import TableHeader from "../../components/table-header/table-header.component";
import SelectCustom from "../../components/select/select.component";
import Modal from "../../modals/modal/modal.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import NoContent from "../../components/no-content/no-content.component";
import Loader from "../../components/action-loader/action-loader.component";
import Toast from "../../components/toast/toast.component";
import Icon from "../../components/action-icon/action-icon.component";

// styles
import rowStyles from "../../components/row.module.scss";
import generalStyles from "../../style.module.scss";
import styles from "./statistics-page.module.scss";

// constants and utils
import { Colors, DateOptions, UserTypeConstants } from "../../utils/constants";

function StatisticsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { title } = location.state ? location.state : { title: null };

  // selectors
  const { statistics, count, pageState, error, status } =
    useSelector(selectStatistics);
  const { user, token } = useSelector(selectUserData);
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
    if (pageState.date !== "") {
      if (val === DateOptions.ONE_DAY) {
        let nextDay = new Date(pageState.date);
        nextDay.setDate(nextDay.getDate() + 1);
        dispatch(setSearchDate1(nextDay.toISOString().split("T")[0]));
      }

      if (val === DateOptions.THREE_DAY) {
        let nextThreeDays = new Date(pageState.date);
        nextThreeDays.setDate(nextThreeDays.getDate() + 3);
        dispatch(setSearchDate1(nextThreeDays.toISOString().split("T")[0]));
      }

      if (val === DateOptions.ONE_WEEK) {
        let nextWeek = new Date(pageState.date);
        nextWeek.setDate(nextWeek.getDate() + 7);
        dispatch(setSearchDate1(nextWeek.toISOString().split("T")[0]));
      }

      if (val === DateOptions.TWO_WEEK) {
        let nextTwoWeek = new Date(pageState.date);
        nextTwoWeek.setDate(nextTwoWeek.getDate() + 14);
        dispatch(setSearchDate1(nextTwoWeek.toISOString().split("T")[0]));
      }

      if (val === DateOptions.ONE_MONTH) {
        let nextMonth = new Date(pageState.date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        dispatch(setSearchDate1(nextMonth.toISOString().split("T")[0]));
      }

      if (val === DateOptions.TWO_MONTH) {
        let nextTwoMonth = new Date(pageState.date);
        nextTwoMonth.setMonth(nextTwoMonth.getMonth() + 2);
        dispatch(setSearchDate1(nextTwoMonth.toISOString().split("T")[0]));
      }

      if (val === DateOptions.SIX_MONTH) {
        let nextSixMonth = new Date(pageState.date);
        nextSixMonth.setMonth(nextSixMonth.getMonth() + 6);
        dispatch(setSearchDate1(nextSixMonth.toISOString().split("T")[0]));
      }

      if (val === DateOptions.ONE_YEAR) {
        let nextYear = new Date(pageState.date);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        dispatch(setSearchDate1(nextYear.toISOString().split("T")[0]));
      }
    }
  };

  // handle search
  const handleSearch = () => {
    dispatch(getStatistics({ token }))
      .then(unwrapResult)
      .then(() => {});
  };

  const handleEnterPress = () => {
    dispatch(resetStatistics());
    dispatch(setPage(1));
    handleSearch();
  };

  const handleMoreResult = () => {
    handleSearch();
  };

  useEffect(() => {
    if (statistics.length === 0) handleSearch();
    onSelectedChange();

    return () => {
      dispatch(resetStatisticsArray());
      dispatch(setPage(1));
    };
  }, []);

  return user &&
    user.type === UserTypeConstants.ADMIN &&
    pageState.actionType !== "" ? (
    <div className={generalStyles.container}>
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
              dispatch(dispatch(setSearchDate(e.target.value)));
            }}
          />
        </div>
      </SearchContainer>

      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {/* refresh */}
        <Icon
          withBackground={true}
          selected={false}
          foreColor={Colors.MAIN_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={() => {
            handleEnterPress();
          }}
          icon={() => <RiRefreshLine />}
        />

        <Icon
          withBackground={true}
          tooltip={t("go-back")}
          onclick={() => {
            history.goBack();
          }}
          icon={() => <IoMdArrowRoundBack />}
          foreColor={Colors.MAIN_COLOR}
        />
      </div>

      {title && <p className={styles.title}>{title}</p>}

      {statistics.length > 0 && (
        <>
          <TableHeader>
            <label className={[styles.header_label, styles.name].join(" ")}>
              {t("statistics-name")}
            </label>
            <label className={[styles.header_label, styles.count].join(" ")}>
              {t("statistics-count")}
            </label>
            <label
              className={[styles.header_table, styles.action_div].join(" ")}
            ></label>
          </TableHeader>

          {statistics.map((stat, index) => (
            <div key={index} className={rowStyles.container}>
              <label className={[styles.name, styles.value_label].join(" ")}>
                {stat.data.name}
              </label>
              <label className={[styles.count, styles.value_label].join(" ")}>
                {stat.count}
              </label>
              <label className={styles.action_div}>
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

      {count > 0 && status !== "loading" && (
        <div className={generalStyles.count}>
          {statistics.length} / {count}
        </div>
      )}

      {statistics.length < count && statistics.length !== 0 && (
        <div className={generalStyles.flex_container}>
          <ButtonWithIcon
            text={t("more")}
            action={handleMoreResult}
            bgColor={Colors.SECONDARY_COLOR}
            icon={() => <CgMoreVertical />}
          />
        </div>
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
