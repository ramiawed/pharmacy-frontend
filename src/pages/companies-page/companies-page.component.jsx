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
import Button from "../../components/button/button.component";
import Toast from "../../components/toast/toast.component";
import ActionLoader from "../../components/action-loader/action-loader.component";
import NoContent from "../../components/no-content/no-content.component";

// react-icons
import { FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  cancelOperation,
  changeDisplayType,
  changePage,
  changeSearchCity,
  changeSearchName,
  getCompanies,
  resetCompanies,
  resetSearchCity,
  resetSearchName,
  resetStatus,
  selectCompanies,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";

// constants and uitls
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // select from redux store
  // select logged user and it's token from authSlice
  const { token, user } = useSelector(selectUserData);

  // select companies from companySlice
  const { companies, count, status, error } = useSelector(selectCompanies);
  const { searchName, searchCity, displayType, page } = useSelector(
    selectCompaniesPageState
  );

  // select favorites from favoriteSlice
  const favorites = useSelector(selectFavoritesPartners);

  const [showFavorites, setShowFavorites] = useState(false);

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

    dispatch(getCompanies({ queryString, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(changePage(page + 1));
      });
  };

  // get the next 9 companies from DB
  // and add one to page
  const handleMoreResult = () => {
    handleSearch(page);
  };

  // when press enter in search input field
  // 1- reset the companies in the companySlice redux
  // 2- search based on the new search engines
  // 3- reset the page to 1
  const handleEnterPress = () => {
    dispatch(resetCompanies());
    handleSearch(1);
  };

  useEffect(() => {
    if (user) {
      if (companies.length === 0) handleSearch(1);
    }

    window.scrollTo(0, 0);

    return () => {
      if (status === "loading") {
        cancelOperation();
      }
    };
  }, []);

  return user ? (
    <>
      <Header>
        <h2>
          {t("companies")} <span>{count}</span>
        </h2>

        <div style={{ position: "relative", height: "50px" }}>
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
        </div>

        <div
          className={[generalStyles.actions, generalStyles.margin_v_4].join(
            " "
          )}
        >
          {/* refresh */}
          <ActionIcon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={handleEnterPress}
            icon={() => <RiRefreshLine />}
          />

          {/* show favorites */}
          <div className={generalStyles.relative}>
            <ActionIcon
              foreColor={
                showFavorites ? Colors.SUCCEEDED_COLOR : Colors.SECONDARY_COLOR
              }
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
                  favorites &&
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
            foreColor={
              displayType === "card"
                ? Colors.SUCCEEDED_COLOR
                : Colors.SECONDARY_COLOR
            }
            tooltip={t("show-item-as-card-tooltip")}
            onclick={() => {
              dispatch(changeDisplayType("card"));
              setShowFavorites(false);
            }}
            icon={() => <AiFillAppstore />}
          />

          {/* display list option */}
          <ActionIcon
            foreColor={
              displayType === "list"
                ? Colors.SUCCEEDED_COLOR
                : Colors.SECONDARY_COLOR
            }
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
      {status === "loading" && <ActionLoader allowCancel={false} />}

      {companies.length === 0 ? (
        <NoContent msg={t("no-companies")} />
      ) : companies.length < count ? (
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
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
