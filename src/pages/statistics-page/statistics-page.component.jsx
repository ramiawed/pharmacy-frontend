import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { IoMdMore } from "react-icons/io";
import { SiAtAndT } from "react-icons/si";

import Header from "../../components/header/header.component";
import TableHeader from "../../components/table-header/table-header.component";
import {
  getStatistics,
  resetStatistics,
  selectStatistics,
} from "../../redux/statistics/statisticsSlice";

import tableStyles from "../../components/table.module.scss";
import rowStyles from "../../components/row.module.scss";
import generalStyles from "../../style.module.scss";
import Modal from "../../components/modal/modal.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import { Colors, DateOptions } from "../../utils/constants";
import SelectCustom from "../../components/select/select.component";
import Button from "../../components/button/button.component";

function StatisticsPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const { field, type, title } = location.state;

  const dispatch = useDispatch();
  const { statistics, count } = useSelector(selectStatistics);

  const [page, setPage] = useState(
    statistics.length === 0 ? 1 : Math.ceil(statistics.length / 1) + 1
  );
  const [searchName, setSearchName] = useState("");
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedStatistics, setSelectedStatistics] = useState(null);
  const [date, setDate] = useState("");

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

  const [dateOption, setDateOption] = useState(dateOptions[0]);

  const handleDateOptions = (val) => {
    console.log(val);
    setDateOption(val);
  };

  // handle search
  const handleSearch = (p, reset) => {
    let obj = {
      field,
      type,
      page: p,
      limit: 1,
    };

    // build the query string

    if (searchName.trim().length !== 0) {
      obj = {
        ...obj,
        name: searchName,
      };
    }

    // One Day
    if (dateOption === DateOptions.ONE_DAY) {
      let nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      obj = {
        ...obj,
        date: new Date(date),
        date1: nextDay,
      };
    }

    // Three Days
    if (dateOption === DateOptions.THREE_DAY) {
      let nextThreeDays = new Date(date);
      nextThreeDays.setDate(nextThreeDays.getDate() + 3);
      obj = {
        ...obj,
        date: new Date(date),
        date1: nextThreeDays,
      };
    }

    // One Week
    if (dateOption === DateOptions.ONE_WEEK) {
      let nextWeek = new Date(date);
      nextWeek.setDate(nextWeek.getDate() + 7);
      obj = {
        ...obj,
        date: new Date(date),
        date1: nextWeek,
      };
    }

    // Two Week
    if (dateOption === DateOptions.TWO_WEEK) {
      let nextTwoWeek = new Date(date);
      nextTwoWeek.setDate(nextTwoWeek.getDate() + 14);
      obj = {
        ...obj,
        date: new Date(date),
        date1: nextTwoWeek,
      };
    }

    // One Month
    if (dateOption === DateOptions.ONE_MONTH) {
      let nextMonth = new Date(date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      obj = {
        ...obj,
        date: new Date(date),
        date1: nextMonth,
      };
    }

    // Two Month
    if (dateOption === DateOptions.TWO_MONTH) {
      let nextTwoMonth = new Date(date);
      nextTwoMonth.setMonth(nextTwoMonth.getMonth() + 2);

      obj = {
        ...obj,
        date: new Date(date),
        date1: nextTwoMonth,
      };
    }

    // Six Month
    if (dateOption === DateOptions.SIX_MONTH) {
      let nextSixMonth = new Date(date);
      nextSixMonth.setMonth(nextSixMonth.getMonth() + 6);

      obj = {
        ...obj,
        date: new Date(date),
        date1: nextSixMonth,
      };
    }

    // One Year
    if (dateOption === DateOptions.ONE_YEAR) {
      let nextYear = new Date(date);
      nextYear.setFullYear(nextYear.getFullYear() + 1);

      obj = {
        ...obj,
        date: new Date(date),
        date1: nextYear,
      };
    }

    dispatch(getStatistics({ obj }));
    setPage(reset ? 1 : p + 1);
    setPage(p + 1);
  };

  const handleEnterPress = () => {
    dispatch(resetStatistics());
    handleSearch(1, true);
  };

  const handleMoreResult = () => {
    handleSearch(page, false);
  };

  useEffect(() => {
    if (statistics.length === 0) handleSearch(1);

    return () => {
      dispatch(resetStatistics());
    };
  }, []);

  return (
    <>
      <SearchContainer searchAction={handleEnterPress}>
        <SearchInput
          label="statistics-name"
          id="item-name"
          type="text"
          value={searchName}
          onchange={(e) => setSearchName(e.target.value)}
          placeholder="search"
          onEnterPress={handleEnterPress}
          resetField={() => {
            setSearchName("");
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
            defaultOption={dateOptions[0]}
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
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </SearchContainer>
      <Header>
        <h2>{title}</h2>
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
                <div
                  className={[
                    generalStyles.icon,
                    generalStyles.margin_h_auto,
                  ].join(" ")}
                  onClick={() => {
                    setSelectedStatistics(stat);
                    setShowMoreInfo(true);
                  }}
                >
                  <IoMdMore size={20} />
                  <div className={generalStyles.tooltip}>
                    {t("statistics-dates")}
                  </div>
                </div>
              </label>
            </div>
          ))}
        </>
      )}

      {statistics.length === 0 ? (
        <div className={generalStyles.no_content_div}>
          <SiAtAndT className={generalStyles.no_content_icon} />
          <p className={generalStyles.fc_white}>{t("no-warehouses")}</p>
        </div>
      ) : statistics.length < count ? (
        <Button
          text={t("more")}
          action={handleMoreResult}
          bgColor={Colors.SECONDARY_COLOR}
        />
      ) : (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-more")}
        </p>
      )}

      {showMoreInfo && (
        <Modal
          header="statistics-dates"
          cancelLabel="cancel-label"
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
    </>
  );
}

export default StatisticsPage;
