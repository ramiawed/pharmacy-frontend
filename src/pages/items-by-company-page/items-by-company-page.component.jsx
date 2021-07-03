import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Redirect } from "react-router";
import { useParams } from "react-router";
import axios from "../../api/pharmacy";

// components
import Header from "../../components/header/header.component";
import FavoriteItemRow from "../../components/favorite-item-row/favorite-item-row.component";
import ReactLoading from "react-loading";
import ItemCard from "../../components/item-card/item-card.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import ItemRow from "../../components/item-row/item-row.component";
import TableHeader from "../../components/table-header/table-header.component";

// react-icons
import { FaSearch, FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { SiAtAndT } from "react-icons/si";

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
// import styles from "./items-by-company-page.module.scss";
import styles from "../companies-page/companies-page.module.scss";
import tableStyles from "../../components/table.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

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
  const [isInWarehouse, setIsInWarehouse] = useState(false);
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
  }, []);

  return user ? (
    <>
      <Header>
        <h2>
          {company?.name} <span>({count})</span>
        </h2>
        <div className={styles.actions}>
          <RiRefreshLine
            className={styles.icon}
            size="2rem"
            onClick={handleEnterPress}
          />

          <div className={styles.favorite_div}>
            <AiFillStar
              className={styles.icon}
              onClick={() => setShowFavorites(!showFavorites)}
            />
            {showFavorites && (
              <div className={styles.favorites_content}>
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
          <AiFillAppstore
            className={[
              styles.icon,
              displayType === "card" ? styles.selected : "",
            ].join(" ")}
            size="1.5rem"
            onClick={() => setDisplayType("card")}
          />

          <FaListUl
            className={[
              styles.icon,
              displayType === "list" ? styles.selected : "",
            ].join(" ")}
            size="1.5rem"
            onClick={() => setDisplayType("list")}
          />

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
            <div>
              <div className={styles.checkbox_div}>
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
                {user.type === UserTypeConstants.PHARMACY && (
                  <label>{t("pharmacy-in-warehouse")}</label>
                )}
              </div>

              <div className={styles.checkbox_div}>
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
                {user.type === UserTypeConstants.PHARMACY && (
                  <label>{t("pharmacy-out-warehouse")}</label>
                )}
              </div>
            </div>
          </SearchContainer>
        </div>
      </Header>

      {count > 0 && displayType === "list" && (
        <TableHeader>
          <label className={tableStyles.label_medium}>
            {t("item-trade-name")}
          </label>
          <label className={tableStyles.label_small}>{t("item-caliber")}</label>
          <label className={tableStyles.label_small}>{t("item-formula")}</label>
          <label className={tableStyles.label_small}>{t("item-price")}</label>
          <label className={tableStyles.label_small}>
            {t("item-customer-price")}
          </label>
          <label
            className={
              user.type === UserTypeConstants.WAREHOUSE
                ? tableStyles.label_small
                : tableStyles.label_xsmall
            }
          ></label>
          <label className={tableStyles.label_xsmall}></label>
        </TableHeader>
      )}

      {displayType === "list" &&
        companyItems.map((companyItem) => (
          <ItemRow key={companyItem._id} companyItem={companyItem} />
        ))}

      {displayType === "card" && (
        <div className={styles.content_container}>
          {companyItems.map((companyItem) => (
            <ItemCard key={companyItem._id} companyItem={companyItem} />
          ))}
        </div>
      )}

      {status === "loading" && (
        <ReactLoading type="bubbles" height={50} width={50} />
      )}
      <div
        style={{
          textAlign: "center",
        }}
      >
        {count === 0 ? (
          <div className={styles.no_content_div}>
            <SiAtAndT className={styles.no_content_icon} />
            <p>{t("no-medicines")}</p>
          </div>
        ) : companyItems.length < count ? (
          <motion.button
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255, 255, 255)",
              boxShadow: "0px 0px 8px rgb(0, 0, 0, 0.3)",
            }}
            onClick={handleMoreResult}
            className={styles.more_button}
          >
            {t("more")}
          </motion.button>
        ) : (
          <p>{t("no-more")}</p>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemsByCompanyPage;
