import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory, useLocation } from "react-router";
import ReactLoading from "react-loading";

// components
import Header from "../../components/header/header.component";
import ItemCard from "../../components/item-card/item-card.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import ItemRow from "../../components/item-row/item-row.component";
import MedicinesTableHeader from "../../components/medicines-table-header/medicines-table-header.component";
import NoContent from "../../components/no-content/no-content.component";
import Button from "../../components/button/button.component";
import Icon from "../../components/action-icon/action-icon.component";

// react-icons
import { FaSearch, FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectFavoritesItems } from "../../redux/favorites/favoritesSlice.js";
import {
  getMedicines,
  resetMedicines,
  selectMedicines,
} from "../../redux/medicines/medicinesSlices";

// styles
import generalStyles from "../../style.module.scss";
import searchContainerStyles from "../../components/search-container/search-container.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function MedicinesPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { companyId, warehouseId } = location.state;

  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { medicines, count, status } = useSelector(selectMedicines);
  const favoritesItems = useSelector(selectFavoritesItems);

  // own state
  // expanded state for expandable container
  const [searchName, setSearchName] = useState("");
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const [searchWarehouseName, setSearchWarehouseName] = useState("");
  const [displayType, setDisplayType] = useState("list");
  const [showFavorites, setShowFavorites] = useState(false);
  const [isInWarehouse, setIsInWarehouse] = useState(
    user.type === UserTypeConstants.PHARMACY
  );
  const [isOutWarehouse, setIsOutWarehouse] = useState(false);

  // if companies doesn't contains any info set the page to 1
  // if companies have an info set the page to the next page
  const [page, setPage] = useState(
    medicines.length === 0 ? 1 : Math.ceil(medicines.length / 9) + 1
  );

  // handle search
  const handleSearch = (page, reset) => {
    // build the query string
    const queryString = {};

    if (companyId) {
      queryString.companyId = companyId;
    }

    if (warehouseId) {
      queryString.warehouseId = warehouseId;
    }

    // queryString.companyId = companyId;
    queryString.page = page;

    if (searchName.trim().length !== 0) {
      queryString.name = searchName;
    }

    if (searchCompanyName.trim().length !== 0) {
      queryString.searchCompanyName = searchCompanyName;
    }

    if (searchWarehouseName.trim().length !== 0) {
      queryString.searchWarehouseName = searchWarehouseName;
    }

    if (isInWarehouse) {
      queryString.searchInWarehouse = isInWarehouse;
    }

    if (isOutWarehouse) {
      queryString.searchOutWarehouse = isOutWarehouse;
    }

    if (user.type === UserTypeConstants.PHARMACY) {
      queryString.city = user.city;
    }

    dispatch(getMedicines({ queryString, token }));
    setPage(reset ? 1 : page + 1);
    setPage(page + 1);
  };

  const handleMoreResult = () => {
    handleSearch(page, false);
  };

  const handleEnterPress = () => {
    dispatch(resetMedicines());
    handleSearch(1, true);
  };

  useEffect(() => {
    if (medicines.length === 0) {
      handleSearch(1);
    }

    onSelectedChange();

    window.scrollTo(0, 0);
  }, []);

  return user ? (
    <div className={generalStyles.container}>
      <Header>
        <h2>
          {t("nav-medicines")} <span>{count}</span>
        </h2>

        <div style={{ position: "relative", height: "50px" }}>
          <SearchContainer searchAction={handleEnterPress}>
            <SearchInput
              label="user-name"
              id="search-name"
              type="text"
              value={searchName}
              onchange={(e) => {
                setSearchName(e.target.value);
              }}
              icon={<FaSearch />}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => {
                setSearchName("");
              }}
            />
            {user.type !== UserTypeConstants.GUEST && companyId === null && (
              <SearchInput
                label="item-company"
                id="item-company"
                type="text"
                value={searchCompanyName}
                onchange={(e) => {
                  setSearchCompanyName(e.target.value);
                }}
                icon={<FaSearch />}
                placeholder="search"
                onEnterPress={handleEnterPress}
                resetField={() => {
                  setSearchCompanyName("");
                }}
              />
            )}

            {user.type !== UserTypeConstants.GUEST && warehouseId === null && (
              <SearchInput
                label="item-warehouse"
                id="item-warehouse"
                type="text"
                value={searchWarehouseName}
                onchange={(e) => {
                  setSearchWarehouseName(e.target.value);
                }}
                icon={<FaSearch />}
                placeholder="search"
                onEnterPress={handleEnterPress}
                resetField={() => {
                  setSearchWarehouseName("");
                }}
              />
            )}

            {user.type !== UserTypeConstants.GUEST && warehouseId === null && (
              <div className={searchContainerStyles.checkbox_div}>
                <input
                  type="checkbox"
                  value={isInWarehouse}
                  checked={isInWarehouse}
                  onChange={() => {
                    setIsInWarehouse(!isInWarehouse);
                    setIsOutWarehouse(false);
                  }}
                />
                {user.type === UserTypeConstants.WAREHOUSE && (
                  <label>{t("warehouse-in-warehouse")}</label>
                )}
                {user.type !== UserTypeConstants.WAREHOUSE && (
                  <label>{t("pharmacy-in-warehouse")}</label>
                )}
              </div>
            )}

            {user.type !== UserTypeConstants.GUEST && warehouseId === null && (
              <div className={searchContainerStyles.checkbox_div}>
                <input
                  type="checkbox"
                  value={isOutWarehouse}
                  checked={isOutWarehouse}
                  onChange={() => {
                    setIsOutWarehouse(!isOutWarehouse);
                    setIsInWarehouse(false);
                  }}
                />
                {user.type === UserTypeConstants.WAREHOUSE && (
                  <label>{t("warehouse-out-warehouse")}</label>
                )}
                {user.type !== UserTypeConstants.WAREHOUSE && (
                  <label>{t("pharmacy-out-warehouse")}</label>
                )}
              </div>
            )}
          </SearchContainer>
        </div>

        <div className={generalStyles.actions}>
          <Icon
            icon={() => <RiRefreshLine />}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={handleEnterPress}
          />

          <div className={generalStyles.relative}>
            <Icon
              icon={() => <AiFillStar />}
              foreColor={
                showFavorites ? Colors.SUCCEEDED_COLOR : Colors.SECONDARY_COLOR
              }
              tooltip={t("show-favorite-tooltip")}
              onclick={() => setShowFavorites(!showFavorites)}
            />

            {showFavorites && (
              <div
                className={[
                  generalStyles.favorites_content,
                  generalStyles.favorites_content_wider,
                  generalStyles.bg_white,
                ].join(" ")}
              >
                {showFavorites &&
                  favoritesItems.map((item) => (
                    <ItemRow
                      key={item._id}
                      item={item}
                      isFavorite={true}
                      isSmallFavorite={true}
                    />
                  ))}
              </div>
            )}
          </div>

          <Icon
            icon={() => <AiFillAppstore />}
            foreColor={
              displayType === "card"
                ? Colors.SUCCEEDED_COLOR
                : Colors.SECONDARY_COLOR
            }
            tooltip={t("show-item-as-card-tooltip")}
            onclick={() => setDisplayType("card")}
          />

          <Icon
            icon={() => <FaListUl />}
            foreColor={
              displayType === "list"
                ? Colors.SUCCEEDED_COLOR
                : Colors.SECONDARY_COLOR
            }
            tooltip={t("show-item-as-row-tooltip")}
            onclick={() => setDisplayType("list")}
          />
        </div>
      </Header>

      {count > 0 && displayType === "list" && (
        <MedicinesTableHeader user={user} />
      )}

      {displayType === "list" &&
        medicines.map((medicine) => (
          <ItemRow key={medicine._id} item={medicine} />
        ))}

      {displayType === "card" && (
        <div
          className={[
            generalStyles.flex_container,
            generalStyles.margin_top_10,
          ].join(" ")}
        >
          {medicines.map((medicine) => (
            <ItemCard key={medicine._id} companyItem={medicine} />
          ))}
        </div>
      )}

      {count === 0 && status !== "loading" && (
        <NoContent msg={t("no-medicines")} />
      )}

      {status === "loading" && (
        <div className={generalStyles.flex_container}>
          <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
        </div>
      )}

      {medicines.length < count && status !== "loading" && (
        <Button
          text={t("more")}
          action={handleMoreResult}
          bgColor={Colors.SECONDARY_COLOR}
        />
      )}

      {medicines.length === count && status !== "loading" && count !== 0 && (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-more")}
        </p>
      )}

      {/* {status === "loading" && <Loader allowCancel={false} />} */}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default MedicinesPage;
