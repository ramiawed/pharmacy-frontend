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
  setPage,
} from "../../redux/statistics/statisticsSlice";
import { selectUserData } from "../../redux/auth/authSlice.js";

// icons
import { IoMdMore, IoMdArrowRoundBack } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";
import { CgMoreVertical } from "react-icons/cg";

// components
import StatisticsSearchEngine from "../../components/statistics-search-engine/statistics-search-engine.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ResultsCount from "../../components/results-count/results-count.component";
import TableHeader from "../../components/table-header/table-header.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import ActionBar from "../../components/action-bar/action-bar.component";
import Toast from "../../components/toast/toast.component";
import Icon from "../../components/icon/icon.component";
import Modal from "../../modals/modal/modal.component";

// styles
import rowStyles from "../../components/row.module.scss";
import generalStyles from "../../style.module.scss";
import styles from "./statistics-page.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

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
    <>
      <StatisticsSearchEngine handleEnterPress={handleEnterPress} />

      <MainContentContainer>
        <ActionBar>
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
        </ActionBar>

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
          <ResultsCount count={`${statistics.length} / ${count}`} />
        )}

        {statistics.length < count && status !== "loading" && (
          <ActionBar>
            <ButtonWithIcon
              text={t("more")}
              action={handleMoreResult}
              bgColor={Colors.LIGHT_COLOR}
              icon={() => <CgMoreVertical />}
            />
          </ActionBar>
        )}

        {statistics.length === count && status !== "loading" && count !== 0 && (
          <NoMoreResult msg={t("no-more")} />
        )}

        {status === "loading" && <CylonLoader />}

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
                    "center",
                  ].join(" ")}
                  key={date}
                >
                  {date.split("T")[0]}
                </div>
              ))}
            </div>
          </Modal>
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default StatisticsPage;
