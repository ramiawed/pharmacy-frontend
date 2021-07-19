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

// react-icons
import { FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { SiAtAndT } from "react-icons/si";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getWarehouses,
  resetWarehouse,
  selectWarehouses,
} from "../../redux/warehouse/warehousesSlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";

// constants and utils
import { UserTypeConstants } from "../../utils/constants.js";

// styles
import generalStyles from "../../style.module.scss";

function WarehousePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { token, user } = useSelector(selectUserData);
  const { warehouses, count, status } = useSelector(selectWarehouses);
  const favorites = useSelector(selectFavoritesPartners);

  // own state
  // expanded state for expandable container
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [displayType, setDisplayType] = useState("list");
  const [showFavorites, setShowFavorites] = useState(false);

  // if companies doesn't contains any info set the page to 1
  // if companies have an info set the page to the next page
  const [page, setPage] = useState(
    warehouses.length === 0 ? 1 : Math.ceil(warehouses.length / 9) + 1
  );

  // handle search
  const handleSearch = (page, reset) => {
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

    dispatch(getWarehouses({ queryString, token }));
    setPage(reset ? 1 : page + 1);
    setPage(page + 1);
  };

  const handleMoreResult = () => {
    handleSearch(page, false);
  };

  const handleEnterPress = () => {
    dispatch(resetWarehouse());
    handleSearch(1, true);
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
        <div className={generalStyles.actions}>
          {/* refresh */}
          <div
            className={[generalStyles.icon, generalStyles.fc_secondary].join(
              " "
            )}
            onClick={handleEnterPress}
          >
            <RiRefreshLine />
            <div className={generalStyles.tooltip}>{t("refresh-tooltip")}</div>
          </div>

          {/* show favorites */}
          <div className={generalStyles.relative}>
            <div
              className={[generalStyles.icon, generalStyles.fc_secondary].join(
                " "
              )}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              <AiFillStar />
              <div className={generalStyles.tooltip}>
                {t("show-favorite-tooltip")}
              </div>
            </div>

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
          <div
            className={[
              generalStyles.icon,
              displayType === "card"
                ? generalStyles.fc_green
                : generalStyles.fc_secondary,
            ].join(" ")}
            onClick={() => {
              setDisplayType("card");
              setShowFavorites(false);
            }}
          >
            <AiFillAppstore />
            <div className={generalStyles.tooltip}>
              {t("show-item-as-card-tooltip")}
            </div>
          </div>

          {/* display list option */}
          <div
            className={[
              generalStyles.icon,
              displayType === "list"
                ? generalStyles.fc_green
                : generalStyles.fc_secondary,
            ].join(" ")}
            onClick={() => {
              setDisplayType("list");
              setShowFavorites(false);
            }}
          >
            <FaListUl />
            <div className={generalStyles.tooltip}>
              {t("show-item-as-row-tooltip")}
            </div>
          </div>

          <SearchContainer searchAction={handleEnterPress}>
            <SearchInput
              label="user-name"
              id="search-name"
              type="text"
              value={searchName}
              onchange={(e) => {
                setSearchName(e.target.value);
              }}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => setSearchName("")}
            />

            <SearchInput
              label="user-city"
              id="search-city"
              type="text"
              value={searchCity}
              onchange={(e) => {
                setSearchCity(e.target.value);
              }}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => setSearchCity("")}
            />
          </SearchContainer>
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
      {status === "loading" && (
        <ReactLoading type="bubbles" height={50} width={50} />
      )}

      {warehouses.length === 0 ? (
        <div className={generalStyles.no_content_div}>
          <SiAtAndT className={generalStyles.no_content_icon} />
          <p className={generalStyles.fc_white}>{t("no-warehouses")}</p>
        </div>
      ) : warehouses.length < count ? (
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

export default WarehousePage;
