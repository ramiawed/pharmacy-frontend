// THIS COMPONENT PAGE CAN BE DISPLAYED BY ALL THE USERS

// this component display
// 1- header
// 2- actions(refresh, favorites companies, list display, card display, search)
// 3- if the companies is empty or doesn't match the search engines display an empty icon
// 4- if the companies is not empty display the companies as list or card.

// this component depends on the companySlice

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";

// components
import Header from "../../components/header/header.component";
import SearchInput from "../../components/search-input/search-input.component";
import FavoriteRow from "../../components/favorite-row/favorite-row.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import SearchContainer from "../../components/search-container/search-container.component";
import ActionIcon from "../../components/action-icon/action-icon.component";
import ReactLoading from "react-loading";

// react-icons
import { FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { SiAtAndT } from "react-icons/si";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  changeDisplayType,
  changePage,
  changeSearchCity,
  changeSearchName,
  getCompanies,
  resetCompanies,
  resetPage,
  resetSearchCity,
  resetSearchName,
  selectCompanies,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";
import { UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
// import styles from "./companies-page.module.scss";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // select from redux store
  // select logged user and it's token from authSlice
  const { token, user } = useSelector(selectUserData);
  // select companies from companySlice
  const { companies, count, status } = useSelector(selectCompanies);
  const { searchName, searchCity, displayType, page } = useSelector(
    selectCompaniesPageState
  );
  // select favorites from favoriteSlice
  const favorites = useSelector(selectFavoritesPartners);

  // own state
  // expanded state for expandable container
  // const [searchName, setSearchName] = useState(companiesPageState.searchName);
  // const [searchCity, setSearchCity] = useState(companiesPageState.searchCity);

  // const [displayType, setDisplayType] = useState(
  //   companiesPageState.displayType
  // );

  const [showFavorites, setShowFavorites] = useState(false);

  // if companies doesn't contains any info set the page to 1
  // if companies have an info set the page to the next page
  // const [page, setPage] = useState(
  //   companies.length === 0 ? 1 : Math.ceil(companies.length / 9) + 1
  // );

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
  const handleSearch = (page, reset) => {
    // build the query string
    const queryString = {};

    queryString.page = page;

    // company approve and active must be true
    queryString.approve = true;
    queryString.active = true;

    if (searchName.trim().length !== 0) {
      queryString.name = searchName;
    }

    if (searchCity.trim().length !== 0) {
      queryString.city = searchCity;
    }

    dispatch(getCompanies({ queryString, token }));
    if (reset) {
      resetPage();
    } else {
      changePage();
    }
    // setPage(reset ? 1 : page + 1);
    // setPage(page + 1);
  };

  // get the next 9 companies from DB
  // and add one to page
  const handleMoreResult = () => {
    handleSearch(page, false);
  };

  // when press enter in search input field
  // 1- reset the companies in the companySlice redux
  // 2- search based on the new search engines
  // 3- reset the page to 1
  const handleEnterPress = () => {
    dispatch(resetCompanies());
    handleSearch(1, true);
  };

  useEffect(() => {
    if (user) {
      if (companies.length === 0) handleSearch(1);
    }

    window.scrollTo(0, 0);
  }, []);

  return user ? (
    <>
      <Header>
        <h2>
          {t("companies")} <span>{count}</span>
        </h2>

        <SearchContainer searchAction={handleEnterPress}>
          <SearchInput
            label="user-name"
            id="search-name"
            type="text"
            value={searchName}
            onchange={(e) => {
              // setSearchName(e.target.value);
              dispatch(changeSearchName(e.target.value));
            }}
            placeholder="search"
            onEnterPress={handleEnterPress}
            resetField={() => dispatch(resetSearchName())}
          />

          <SearchInput
            label="user-city"
            id="search-city"
            type="text"
            value={searchCity}
            onchange={(e) => {
              dispatch(changeSearchCity(e.target.value));
            }}
            placeholder="search"
            onEnterPress={handleEnterPress}
            resetField={() => dispatch(resetSearchCity())}
          />
        </SearchContainer>

        <div className={generalStyles.actions}>
          {/* refresh */}
          <ActionIcon
            selected={false}
            tooltip={t("refresh-tooltip")}
            onclick={handleEnterPress}
            icon={() => <RiRefreshLine />}
          />

          {/* show favorites */}
          <div className={generalStyles.relative}>
            <ActionIcon
              selected={showFavorites}
              tooltip={t("show-favorite-tooltip")}
              onclick={() => setShowFavorites(!showFavorites)}
              icon={() => <AiFillStar />}
            />

            {showFavorites && (
              <div
                className={[
                  generalStyles.favorites_content,
                  generalStyles.bg_white,
                ].join(" ")}
              >
                {showFavorites &&
                  favorites
                    .filter(
                      (favorite) => favorite.type === UserTypeConstants.COMPANY
                    )
                    .map((favorite) => (
                      <FavoriteRow
                        key={favorite._id}
                        user={favorite}
                        withoutBoxShadow={true}
                      />
                    ))}
              </div>
            )}
          </div>

          {/* display card option */}
          <ActionIcon
            selected={displayType === "card"}
            tooltip={t("show-item-as-card-tooltip")}
            onclick={() => {
              dispatch(changeDisplayType("card"));
              setShowFavorites(false);
            }}
            icon={() => <AiFillAppstore />}
          />

          {/* display list option */}
          <ActionIcon
            selected={displayType === "list"}
            tooltip={t("show-item-as-row-tooltip")}
            onclick={() => {
              dispatch(changeDisplayType("list"));
              setShowFavorites(false);
            }}
            icon={() => <FaListUl />}
          />
        </div>
      </Header>

      {/* display partner as list */}
      {displayType === "list" &&
        companies.map((company) => (
          <PartnerRow key={company._id} user={company} />
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

      {/* show loading animation when data is loading */}
      {status === "loading" && (
        <ReactLoading type="bubbles" height={50} width={50} />
      )}

      {companies.length === 0 ? (
        <div className={generalStyles.no_content_div}>
          <SiAtAndT className={generalStyles.no_content_icon} />
          <p className={generalStyles.fc_white}>{t("no-companies")}</p>
        </div>
      ) : companies.length < count ? (
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
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
