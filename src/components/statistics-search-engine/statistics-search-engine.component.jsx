import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatistics,
  setDateOption,
  setSearchDate,
  setSearchDate1,
  setSearchName,
} from "../../redux/statistics/statisticsSlice";
import { Colors, DateOptions } from "../../utils/constants";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import SearchRowContainer from "../search-row-container/search-row-container.component";
import SelectCustom from "../select/select.component";

const StatisticsSearchEngine = ({ handleEnterPress }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pageState } = useSelector(selectStatistics);

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

  return (
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
      <SearchRowContainer>
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
                dateOptions.find((o) => o.value === pageState.dateOption).label
              }`
            ),
          }}
        />
      </SearchRowContainer>

      <SearchRowContainer>
        <label>{t("date-label")}</label>
        <input
          type="date"
          value={pageState.date}
          onChange={(e) => {
            dispatch(dispatch(setSearchDate(e.target.value)));
          }}
        />
      </SearchRowContainer>
    </SearchContainer>
  );
};

export default StatisticsSearchEngine;
