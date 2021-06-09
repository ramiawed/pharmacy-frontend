import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Redirect } from "react-router";

// components
import Header from "../../components/header/header.component";
import RowWith2Children from "../../components/row-with-two-children/row-with-two-children.component";
import Input from "../../components/input/input.component";
import CardInfo from "../../components/card-info/card-info.component";
import FavoriteRow from "../../components/favorite-row/favorite-row.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import ReactLoading from "react-loading";

// react-icons
import { FaSearch, FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  getCompanies,
  resetCompanies,
  selectCompanies,
} from "../../redux/company/companySlice";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { UserTypeConstants } from "../../utils/constants";

// styles
import styles from "./companies-page.module.scss";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // select from redux store
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const { companies, count, status } = useSelector(selectCompanies);
  const favorites = useSelector(selectFavorites);

  // own state
  // expanded state for expandable container
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [displayType, setDisplayType] = useState("list");

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

    // searchNameInputRef.current.focus();
  }, []);

  return user ? (
    <div>
      <div className={styles.refresh_icon} onClick={handleEnterPress}>
        <RiRefreshLine className={styles.icon} size="2rem" />
        <p>{t("refresh")}</p>
      </div>

      <Header>
        <h2>
          {t("companies")} ({count})
        </h2>
      </Header>

      <CardInfo headerTitle={t("favorites")}>
        {favorites
          .filter((favorite) => favorite.type === UserTypeConstants.COMPANY)
          .map((favorite) => (
            <FavoriteRow key={favorite._id} user={favorite} />
          ))}
      </CardInfo>

      <CardInfo headerTitle={t("search-engines")}>
        <RowWith2Children>
          <div>
            <Input
              label="user-name"
              id="search-name"
              type="text"
              value={searchName}
              onchange={(e) => {
                setSearchName(e.target.value);
              }}
              bordered={true}
              icon={<FaSearch />}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => {
                setSearchName("");
              }}
            />
          </div>
          <div>
            <Input
              label="user-city"
              id="search-city"
              type="text"
              value={searchCity}
              onchange={(e) => {
                setSearchCity(e.target.value);
              }}
              bordered={true}
              icon={<FaSearch />}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => setSearchCity("")}
            />
          </div>
        </RowWith2Children>
      </CardInfo>

      <div className={styles.display_type}>
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
      </div>

      {displayType === "list" && (
        <CardInfo headerTitle={t("results")}>
          {companies.map((company) => (
            <PartnerRow key={company._id} user={company} />
          ))}
        </CardInfo>
      )}

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
        }}
      >
        {companies.length < count ? (
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
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
