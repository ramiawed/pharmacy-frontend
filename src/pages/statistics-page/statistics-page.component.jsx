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
      <Header>
        <h2>{title}</h2>
        <div className={generalStyles.actions}>
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
          </SearchContainer>
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
        <button
          onClick={handleMoreResult}
          className={[
            generalStyles.button,
            generalStyles.bg_secondary,
            generalStyles.fc_white,
            generalStyles.margin_h_auto,
            generalStyles.block,
            generalStyles.padding_v_10,
            generalStyles.padding_h_12,
          ].join(" ")}
        >
          {t("more")}
        </button>
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
