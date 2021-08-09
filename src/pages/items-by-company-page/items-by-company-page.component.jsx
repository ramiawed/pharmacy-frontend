import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { useParams } from "react-router";
import axios from "../../api/pharmacy";

// components
import Header from "../../components/header/header.component";
import FavoriteItemRow from "../../components/favorite-item-row/favorite-item-row.component";
import ItemCard from "../../components/item-card/item-card.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import ItemRow from "../../components/item-row/item-row.component";
import ItemsByCompanyTableHeader from "../../components/items-by-company-table-header/items-by-company-table-header.component";
import NoContent from "../../components/no-content/no-content.component";
import Button from "../../components/button/button.component";
import Icon from "../../components/action-icon/action-icon.component";
import Loader from "../../components/action-loader/action-loader.component";

// react-icons
import { FaSearch, FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import { selectFavoritesItems } from "../../redux/favorites/favoritesSlice.js";
import {
  getCompanyItems,
  resetCompanyItems,
  selectCompanyItems,
} from "../../redux/companyItems/companyItemsSlices";

// styles
import generalStyles from "../../style.module.scss";
import searchContainerStyles from "../../components/search-container/search-container.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function ItemsByCompanyPage() {
  const { companyId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // select from redux store
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const { companyItems, count, status } = useSelector(selectCompanyItems);
  const favoritesItems = useSelector(selectFavoritesItems);

  // own state
  // expanded state for expandable container
  const [searchName, setSearchName] = useState("");
  const [displayType, setDisplayType] = useState("list");
  const [showFavorites, setShowFavorites] = useState(false);
  const [company, setCompany] = useState(null);
  const [isInWarehouse, setIsInWarehouse] = useState(
    user.type === UserTypeConstants.PHARMACY
  );
  const [isOutWarehouse, setIsOutWarehouse] = useState(false);

  // if companies doesn't contains any info set the page to 1
  // if companies have an info set the page to the next page
  const [page, setPage] = useState(
    companyItems.length === 0 ? 1 : Math.ceil(companyItems.length / 9) + 1
  );

  // handle search
  const handleSearch = (page, reset) => {
    // build the query string
    const queryString = {};

    queryString.companyId = companyId;
    queryString.page = page;

    if (searchName.trim().length !== 0) {
      queryString.name = searchName;
    }

    if (isInWarehouse) {
      queryString.inWarehouse = isInWarehouse;
    }

    if (isOutWarehouse) {
      queryString.outWarehouse = isOutWarehouse;
    }

    dispatch(getCompanyItems({ queryString, token }));
    setPage(reset ? 1 : page + 1);
    setPage(page + 1);
  };

  const handleMoreResult = () => {
    handleSearch(page, false);
  };

  const handleEnterPress = () => {
    dispatch(resetCompanyItems());
    handleSearch(1, true);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setCompany(response.data.data.user));

      dispatch(resetCompanyItems());

      handleSearch(1);
    }

    window.scrollTo(0, 0);
  }, [companyId]);

  return user ? (
    <>
      <Header>
        <h2>
          {t("medicines-in-company")} {company?.name} <span>{count}</span>
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
                    <FavoriteItemRow
                      key={item._id}
                      item={item}
                      withoutBoxShadow={true}
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

      {count > 0 && displayType === "list" && <ItemsByCompanyTableHeader />}

      {displayType === "list" &&
        companyItems.map((companyItem) => (
          <ItemRow key={companyItem._id} companyItem={companyItem} />
        ))}

      {displayType === "card" && (
        <div
          className={[
            generalStyles.flex_container,
            generalStyles.margin_top_10,
          ].join(" ")}
        >
          {companyItems.map((companyItem) => (
            <ItemCard key={companyItem._id} companyItem={companyItem} />
          ))}
        </div>
      )}

      {count === 0 && status !== "loading" && (
        <NoContent msg={t("no-medicines")} />
      )}

      {companyItems.length < count && status !== "loading" && (
        <Button
          text={t("more")}
          action={handleMoreResult}
          bgColor={Colors.SECONDARY_COLOR}
        />
      )}

      {companyItems.length === count && status !== "loading" && count !== 0 && (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-more")}
        </p>
      )}

      {status === "loading" && <Loader allowCancel={false} />}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemsByCompanyPage;
