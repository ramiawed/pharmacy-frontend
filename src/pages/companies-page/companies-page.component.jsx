import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";

// components
import CompaniesSearchEngine from "../../components/companies-search-engine/companies-search-engine.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import CenterContainer from "../../components/center-container/center-container.component";
import CompaniesActions from "../../components/companies-actions/companies-actions.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ResultsCount from "../../components/results-count/results-count.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import CompanyCard from "../../components/company-card/comany-card.component";
import NoContent from "../../components/no-content/no-content.component";

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

// constants and utils
import { CitiesName } from "../../utils/constants";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  // select from redux store
  // select logged user and it's token from authSlice
  const { token, user } = useSelector(selectUserData);
  const { companies, status } = useSelector(selectCompanies);
  const { searchName, searchCity } = useSelector(selectCompaniesPageState);

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
  }, []);

  return user ? (
    <>
      <MainContentContainer>
        <CompaniesSearchEngine />

        <CompaniesActions refreshHandler={refreshHandler} />

        {filteredCompanies.length > 0 && (
          <ResultsCount
            label={t("companies count")}
            count={filteredCompanies.length}
          />
        )}

        <CenterContainer>
          {filteredCompanies.map((company) => (
            <CompanyCard partner={company} key={company._id} />
          ))}
        </CenterContainer>

        {filteredCompanies.length === 0 &&
          status !== "loading" &&
          searchName.length === 0 &&
          searchCity === CitiesName.ALL && (
            <NoContent msg={t("no companies")} />
          )}

        {filteredCompanies.length === 0 &&
          status !== "loading" &&
          (searchName.length !== 0 || searchCity !== CitiesName.ALL) && (
            <NoContent msg={t("no result found")} />
          )}

        {status === "loading" && <CylonLoader />}

        {status !== "loading" && filteredCompanies.length > 0 && (
          <NoMoreResult msg={t("no more")} />
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
