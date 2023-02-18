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
import { useHistory } from "react-router-dom";

import { CgMoreVertical } from "react-icons/cg";

// components
import CompaniesSearchEngine from "../../components/companies-search-engine/companies-search-engine.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import CompaniesActions from "../../components/companies-actions/companies-actions.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ResultsCount from "../../components/results-count/results-count.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import NoContent from "../../components/no-content/no-content.component";
import ActionBar from "../../components/action-bar/action-bar.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getCompanies,
  resetCompanies,
  selectCompanies,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";
import {
  getFavorites,
  resetFavorites,
} from "../../redux/favorites/favoritesSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

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

function CompaniesPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  // select from redux store
  // select logged user and it's token from authSlice
  const { token, user } = useSelector(selectUserData);
  const { companies, count, status } = useSelector(selectCompanies);
  const { searchName, searchCity, displayType } = useSelector(
    selectCompaniesPageState
  );
  const isOnline = useSelector(selectOnlineStatus);

  let filteredCompanies = companies.filter((company) => {
    if (searchName.trim().length > 0) {
      return company.name.includes(searchName.trim());
    }
    return true;
  });

  filteredCompanies = filteredCompanies.filter((company) => {
    if (searchCity !== CitiesName.ALL) {
      return company.city === searchCity;
    }
    return true;
  });

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

  const refreshHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
    dispatch(resetCompanies());
    searchHandler();
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    onSelectedChange();
  }, []);

  return user ? (
    <>
      <CompaniesSearchEngine />
      <MainContentContainer>
        <CompaniesActions refreshHandler={refreshHandler} />
        {filteredCompanies.length > 0 && (
          <ResultsCount
            label={t("companies-count")}
            count={filteredCompanies.length}
          />
        )}

        {/* display partner as list */}
        {displayType === "list" && (
          <div
            className={[
              generalStyles.flex_container,
              generalStyles.margin_top_10,
            ].join(" ")}
          >
            {filteredCompanies.map((company) => (
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
            style={{
              alignItems: "stretch",
            }}
          >
            {filteredCompanies.map((company) => (
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

        {/* {count > 0 && status !== "loading" && (
          <ResultsCount count={`${companies.length} / ${count}`} />
        )} */}

        {filteredCompanies.length === 0 &&
          status !== "loading" &&
          searchName.length === 0 &&
          searchCity === CitiesName.ALL && (
            <NoContent msg={t("no-companies")} />
          )}

        {filteredCompanies.length === 0 &&
          status !== "loading" &&
          (searchName.length !== 0 || searchCity !== CitiesName.ALL) && (
            <NoContent msg={t("no-result-found")} />
          )}

        {status === "loading" && <CylonLoader />}

        {filteredCompanies.length < count && (
          <ActionBar>
            <ButtonWithIcon
              text={t("more")}
              action={searchHandler}
              bgColor={Colors.SUCCEEDED_COLOR}
              icon={() => <CgMoreVertical />}
            />
          </ActionBar>
        )}

        {filteredCompanies.length === count &&
          status !== "loading" &&
          count !== 0 && <NoMoreResult msg={t("no-more")} />}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
