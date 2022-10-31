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
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";

import { CgMoreVertical } from "react-icons/cg";

// components
import PartnerRow from "../../components/partner-row/partner-row.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import NoContent from "../../components/no-content/no-content.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import CompaniesActions from "../../components/companies-actions/companies-actions.component";
import CompaniesSearchEngine from "../../components/companies-search-engine/companies-search-engine.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  cancelOperation,
  getCompanies,
  resetCompanies,
  selectCompanies,
  selectCompaniesPageState,
  resetCompaniesArray,
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
import { CitiesName, Colors } from "../../utils/constants";

// handlers
import {
  addCompanyToOurCompaniesHandler,
  addPartnerToFavoriteHandler,
  partnerRowClickHandler,
  removeCompanyFromOurCompaniesHandler,
  removePartnerFromFavoriteHandler,
} from "../../utils/handlers";

let timer;

function CompaniesPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  // select from redux store
  // select logged user and it's token from authSlice
  const { token, user } = useSelector(selectUserData);
  // select companies from companySlice
  const { companies, count, status } = useSelector(selectCompanies);
  const { searchName, searchCity } = useSelector(selectCompaniesPageState);
  const { displayType } = useSelector(selectCompaniesPageState);
  const isOnline = useSelector(selectOnlineStatus);

  // search handler
  // /users?type=company&page=page&limit=15
  // this method take 2 params
  // 1- page: determine which page you want to get its rows from DB
  // 2- reset: boolean param, determine if you have to reset the page to 1 or not.
  //
  // build the query string that contains the required info like page and limit
  // if any of the search state (searchName, searchCity) is not empty, add it to query string
  // get the companies from DB
  // depends on the reset field, add one to page, or reset to 1
  const searchHandler = () => {
    dispatch(getCompanies({ token }));
  };

  // get the next 15 companies from DB
  // and add one to page
  const handleMoreResult = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    searchHandler();
  };

  // when press enter in search input field
  // 1- reset the companies in the companySlice redux
  // 2- search based on the new search engines
  // 3- reset the page to 1
  const handleEnterPress = () => {
    dispatch(resetCompaniesArray());
    searchHandler();
  };

  const refreshHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
    dispatch(resetCompanies());
    searchHandler();
  };

  const keyUpHandler = (event) => {
    if (event.keyCode === 13) return;
    cancelOperation();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      handleEnterPress();
    }, 200);
  };

  useEffect(() => {
    if (companies.length === 0) searchHandler(1);

    window.scrollTo(0, 0);

    onSelectedChange();

    return () => {
      cancelOperation();
    };
  }, []);

  return user ? (
    <>
      <CompaniesSearchEngine
        search={handleEnterPress}
        keyUpHandler={keyUpHandler}
      />
      <div className={generalStyles.container_with_header}>
        <CompaniesActions refreshHandler={refreshHandler} />
        {count > 0 && (
          <div className={generalStyles.count}>
            <span className={generalStyles.label}>{t("companies-count")}</span>
            <span className={generalStyles.count}>{count}</span>
          </div>
        )}

        {/* display partner as list */}
        {displayType === "list" && (
          <div
            className={[
              generalStyles.flex_container,
              generalStyles.margin_top_10,
            ].join(" ")}
          >
            {companies.map((company) => (
              <PartnerRow
                key={company._id}
                partner={company}
                addPartnerToFavoriteHandler={() =>
                  addPartnerToFavoriteHandler(
                    company,
                    isOnline,
                    dispatch,
                    token,
                    user
                  )
                }
                addCompanyToOurCompaniesHandler={() =>
                  addCompanyToOurCompaniesHandler(
                    company,
                    isOnline,
                    dispatch,
                    token
                  )
                }
                removeCompanyFromOurCompaniesHandler={() => {
                  removeCompanyFromOurCompaniesHandler(
                    company,
                    isOnline,
                    dispatch,
                    token
                  );
                }}
                removePartnerFromFavoriteHandler={() => {
                  removePartnerFromFavoriteHandler(
                    company,
                    isOnline,
                    dispatch,
                    token
                  );
                }}
                partnerRowClickHandler={(allowShowingWarehouseMedicines) =>
                  partnerRowClickHandler(
                    company,
                    allowShowingWarehouseMedicines,
                    user,
                    dispatch,
                    token,
                    history
                  )
                }
              />
            ))}
          </div>
        )}

        {/* display partner as a card */}
        {displayType === "card" && (
          <div
            className={[
              generalStyles.flex_container,
              generalStyles.margin_top_10,
            ].join(" ")}
          >
            {companies.map((company) => (
              <PartnerCard
                key={company._id}
                partner={company}
                addPartnerToFavoriteHandler={() =>
                  addPartnerToFavoriteHandler(
                    company,
                    isOnline,
                    dispatch,
                    token,
                    user
                  )
                }
                addCompanyToOurCompaniesHandler={() =>
                  addCompanyToOurCompaniesHandler(
                    company,
                    isOnline,
                    dispatch,
                    token
                  )
                }
                removeCompanyFromOurCompaniesHandler={() => {
                  removeCompanyFromOurCompaniesHandler(
                    company,
                    isOnline,
                    dispatch,
                    token
                  );
                }}
                removePartnerFromFavoriteHandler={() => {
                  removePartnerFromFavoriteHandler(
                    company,
                    isOnline,
                    dispatch,
                    token
                  );
                }}
                partnerRowClickHandler={(allowShowingWarehouseMedicines) =>
                  partnerRowClickHandler(
                    company,
                    allowShowingWarehouseMedicines,
                    user,
                    dispatch,
                    token,
                    history
                  )
                }
              />
            ))}
          </div>
        )}

        {count > 0 && status !== "loading" && (
          <div className={generalStyles.count}>
            {companies.length} / {count}
          </div>
        )}

        {companies.length === 0 &&
          status !== "loading" &&
          searchName.length === 0 &&
          searchCity === CitiesName.ALL && (
            <NoContent msg={t("no-companies")} />
          )}

        {companies.length === 0 &&
          status !== "loading" &&
          (searchName.length !== 0 || searchCity !== CitiesName.ALL) && (
            <NoContent msg={t("no-result-found")} />
          )}

        {status === "loading" && (
          <div className={generalStyles.flex_container}>
            <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
          </div>
        )}

        {companies.length < count && (
          <div className={generalStyles.flex_container}>
            <ButtonWithIcon
              text={t("more")}
              action={handleMoreResult}
              bgColor={Colors.SECONDARY_COLOR}
              icon={() => <CgMoreVertical />}
            />
          </div>
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
      </div>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
