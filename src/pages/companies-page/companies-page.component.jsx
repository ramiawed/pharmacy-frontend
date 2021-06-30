import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Redirect } from "react-router";

// components
import Header from "../../components/header/header.component";
import SearchInput from "../../components/search-input/search-input.component";
import FavoriteRow from "../../components/favorite-row/favorite-row.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import ReactLoading from "react-loading";

// react-icons
import { FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { IoAlbumsOutline } from "react-icons/io5";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  getCompanies,
  resetCompanies,
  selectCompanies,
} from "../../redux/company/companySlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import styles from "./companies-page.module.scss";
import SearchContainer from "../../components/search-container/search-container.component";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // select from redux store
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const { companies, count, status } = useSelector(selectCompanies);
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
    companies.length === 0 ? 1 : Math.ceil(companies.length / 9) + 1
  );

  // handle search
  const handleSearch = (page, reset) => {
    // build the query string
    const queryString = {};

    queryString.page = page;
    queryString.approve = true;
    queryString.active = true;

    if (searchName.trim().length !== 0) {
      queryString.name = searchName;
    }

    if (searchCity.trim().length !== 0) {
      queryString.city = searchCity;
    }

    dispatch(getCompanies({ queryString, token }));
    setPage(reset ? 1 : page + 1);
    setPage(page + 1);
  };

  const handleMoreResult = () => {
    handleSearch(page, false);
  };

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
      <div className={styles.actions}>
        <RiRefreshLine className={styles.icon} onClick={handleEnterPress} />
        <div className={styles.favorite_div}>
          <AiFillStar
            className={styles.icon}
            onClick={() => setShowFavorites(!showFavorites)}
          />
          {showFavorites && (
            <div className={styles.favorites_content}>
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
        <AiFillAppstore
          className={[
            styles.icon,
            displayType === "card" ? styles.selected : "",
          ].join(" ")}
          onClick={() => {
            setDisplayType("card");
            setShowFavorites(false);
          }}
        />

        <FaListUl
          className={[
            styles.icon,
            displayType === "list" ? styles.selected : "",
          ].join(" ")}
          onClick={() => {
            setDisplayType("list");
            setShowFavorites(false);
          }}
        />

        <SearchContainer>
          <SearchInput
            label="user-name"
            id="search-name"
            type="text"
            value={searchName}
            onchange={(e) => {
              setSearchName(e.target.value);
            }}
            // bordered={true}
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
            // bordered={true}
            placeholder="search"
            onEnterPress={handleEnterPress}
            resetField={() => setSearchCity("")}
          />
        </SearchContainer>
      </div>

      <Header>
        <h2>
          {t("companies")}{" "}
          <span style={{ color: Colors.SUCCEEDED_COLOR }}>({count})</span>
        </h2>
      </Header>

      {displayType === "list" &&
        companies.map((company) => (
          <PartnerRow key={company._id} user={company} />
        ))}

      {displayType === "card" && (
        <div className={styles.content_container}>
          {companies.map((company) => (
            <PartnerCard key={company._id} user={company} />
          ))}
        </div>
      )}

      {status === "loading" && (
        <ReactLoading type="bubbles" height={50} width={50} />
      )}
      <div
        style={{
          textAlign: "center",
          color: Colors.SECONDARY_COLOR,
        }}
      >
        {companies.length === 0 ? (
          <div>
            <IoAlbumsOutline className={styles.no_content} />
            <p>{t("no-companies")}</p>
          </div>
        ) : companies.length < count ? (
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
          <p className={styles.no_more}>{t("no-more")}</p>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
