// THIS COMPONENT PAGE CAN BE DISPLAYED BY ALL THE USERS

// this component display
// 1- header
// 2- actions(refresh, favorites companies, list display, card display, search)
// 3- if the companies is empty or doesn't match the search engines display an empty icon
// 4- if the companies is not empty display the companies as list or card.

// this component depends on the companySlice

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";

// components
import PartnerRow from "../../components/partner-row/partner-row.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import Button from "../../components/button/button.component";
import Toast from "../../components/toast/toast.component";
import NoContent from "../../components/no-content/no-content.component";
import Loader from "../../components/action-loader/action-loader.component";
import CompaniesHeader from "../../components/companies-header/companies-header.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  cancelOperation,
  changePage,
  changeShowFavorites,
  getCompanies,
  resetCompanies,
  resetStatus,
  selectCompanies,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";
import {
  getFavorites,
  resetFavorites,
} from "../../redux/favorites/favoritesSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// styles
import generalStyles from "../../style.module.scss";

// constants and utils
import { Colors } from "../../utils/constants";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  // select from redux store
  // select logged user and it's token from authSlice
  const { token, user } = useSelector(selectUserData);
  // select companies from companySlice
  const { companies, count, status, error } = useSelector(selectCompanies);
  const { displayType, page } = useSelector(selectCompaniesPageState);
  const isOnline = useSelector(selectOnlineStatus);

  // search handler
  // /users?type=company&page=page&limit=9
  // this method take 2 params
  // 1- page: determine which page you want to get its rows from DB
  // 2- reset: boolean param, determine if you have to reset the page to 1 or not.
  //
  // build the query string that contains the required info like page and limit
  // if any of the search state (searchName, searchCity) is not empty, add it to query string
  // get the companies from DB
  // depends on the reset field, add one to page, or reset to 1
  const handleSearch = (page) => {
    dispatch(changeShowFavorites(false));

    dispatch(getCompanies({ token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(changePage(page + 1));
      });
  };

  // get the next 9 companies from DB
  // and add one to page
  const handleMoreResult = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    handleSearch(page);
  };

  // when press enter in search input field
  // 1- reset the companies in the companySlice redux
  // 2- search based on the new search engines
  // 3- reset the page to 1
  const handleEnterPress = () => {
    dispatch(resetCompanies());
    dispatch(changePage(1));
    handleSearch(1);
  };

  const refreshHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
    dispatch(resetCompanies());
    dispatch(changePage(1));
    handleSearch(1);
  };

  useEffect(() => {
    if (companies.length === 0) handleSearch(1);

    window.scrollTo(0, 0);

    return () => {
      if (status === "loading") {
        cancelOperation();
      }
    };
  }, []);

  return user ? (
    <div className={generalStyles.container}>
      <CompaniesHeader
        search={handleEnterPress}
        refreshHandler={refreshHandler}
        count={count}
      />

      {/* display partner as list */}
      {displayType === "list" &&
        companies.map((company) => (
          <PartnerRow key={company._id} user={company} type="company" />
        ))}

      {/* display partner as a card */}
      {displayType === "card" && (
        <div
          className={[
            generalStyles.flex_container,
            generalStyles.margin_top_10,
          ].join(" ")}
        >
          {companies.map((company) => (
            <PartnerCard key={company._id} user={company} />
          ))}
        </div>
      )}

      {companies.length === 0 && status !== "loading" && (
        <NoContent msg={t("no-companies")} />
      )}

      {companies.length < count && (
        <Button
          text={t("more")}
          action={handleMoreResult}
          bgColor={Colors.SECONDARY_COLOR}
        />
      )}

      {companies.length === count && status !== "loading" && count !== 0 && (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-more")}
        </p>
      )}

      {/* show loading animation when data is loading */}
      {status === "loading" && <Loader allowCancel={false} />}

      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetStatus());
          }}
        >
          {t(error)}
        </Toast>
      )}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
