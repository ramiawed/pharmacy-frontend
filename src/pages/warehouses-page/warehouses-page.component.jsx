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
import ReactLoading from "react-loading";
import ActionIcon from "../../components/action-icon/action-icon.component";
import Button from "../../components/button/button.component";
import Toast from "../../components/toast/toast.component";
import ActionLoader from "../../components/action-loader/action-loader.component";

// react-icons
import { FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { SiAtAndT } from "react-icons/si";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getWarehouses,
  resetWarehouse,
  selectWarehouses,
  changeDisplayType,
  changePage,
  changeSearchCity,
  changeSearchName,
  resetSearchCity,
  resetSearchName,
  selectWarehousesPageState,
  resetStatus,
} from "../../redux/warehouse/warehousesSlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";

// styles
import generalStyles from "../../style.module.scss";
import NoContent from "../../components/no-content/no-content.component";

function WarehousePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { token, user } = useSelector(selectUserData);
  const { warehouses, count, status, error } = useSelector(selectWarehouses);
  const { searchName, searchCity, displayType, page } = useSelector(
    selectWarehousesPageState
  );

  // select favorites from favoriteSlice
  const favorites = useSelector(selectFavoritesPartners);

  // own state
  // expanded state for expandable container
  const [showFavorites, setShowFavorites] = useState(false);

  // handle search
  const handleSearch = (page) => {
    // build the query string
    const queryString = {};

    queryString.page = page;

    // warehouse approve and active must be true
    queryString.approve = true;
    queryString.active = true;

    if (searchName.trim().length !== 0) {
      queryString.name = searchName;
    }

    if (searchCity.trim().length !== 0) {
      queryString.city = searchCity;
    }

    dispatch(getWarehouses({ queryString, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(changePage(page + 1));
      });
  };

  const handleMoreResult = () => {
    handleSearch(page);
  };

  const handleEnterPress = () => {
    dispatch(resetWarehouse());
    handleSearch(1);
  };

  useEffect(() => {
    if (user) {
      if (warehouses.length === 0) handleSearch(1);
    }

    window.scrollTo(0, 0);
  }, []);

  return user ? (
    <>
      <Header>
        <h2>
          {t("warehouses")} <span>{count}</span>
        </h2>

        <SearchContainer searchAction={handleEnterPress}>
          <SearchInput
            label="user-name"
            id="search-name"
            type="text"
            value={searchName}
            onchange={(e) => {
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
                      (favorite) =>
                        favorite.type === UserTypeConstants.WAREHOUSE
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

      {/* display as list */}
      {displayType === "list" &&
        warehouses.map((warehouse) => (
          <PartnerRow key={warehouse._id} user={warehouse} />
        ))}

      {/* display as card */}
      {displayType === "card" && (
        <div
          className={[
            generalStyles.flex_container,
            generalStyles.margin_top_10,
          ].join(" ")}
        >
          {warehouses.map((warehouse) => (
            <PartnerCard key={warehouse._id} user={warehouse} />
          ))}
        </div>
      )}

      {/* show loading indicator when data loading from db */}
      {status === "loading" && <ActionLoader allowCancel={false} />}

      {warehouses.length === 0 ? (
        <>
          <NoContent msg={t("no-warehouses")} />
        </>
      ) : warehouses.length < count ? (
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

export default WarehousePage;
