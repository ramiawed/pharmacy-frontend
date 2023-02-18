import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatistics,
  setDateOption,
  setSearchDate,
  setSearchName,
} from "../../redux/statistics/statisticsSlice";
import { DateOptions } from "../../utils/constants";

// components
import ChooseValue from "../choose-value/choose-value.component";
import ChooserContainer from "../chooser-container/chooser-container.component";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import SearchRowContainer from "../search-row-container/search-row-container.component";

const StatisticsSearchEngine = ({ handleEnterPress }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pageState } = useSelector(selectStatistics);

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

  return (
    <>
      {" "}
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
              dispatch(dispatch(setSearchDate(e.target.value)));
            }}
          />
        </SearchRowContainer>
      </SearchContainer>
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
};

export default StatisticsSearchEngine;
