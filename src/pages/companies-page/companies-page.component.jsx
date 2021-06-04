import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Redirect } from "react-router";

// components
import ExpandableContainer from "../../components/expandable-container/expandable-container.component";
import Header from "../../components/header/header.component";
import RowWith2Children from "../../components/row-with-two-children/row-with-two-children.component";
import Input from "../../components/input/input.component";
import Company from "../../components/company/company.component";
import ReactLoading from "react-loading";

// react-icons
import { FaSearch } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  getCompanies,
  resetCompanies,
  selectCompanies,
} from "../../redux/company/companySlice";

// styles
import styles from "./companies-page.module.scss";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const { companies, count, status } = useSelector(selectCompanies);

  // own state
  // expanded state for expandable container
  const [searchContainerExpanded, setSearchContainerExpanded] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
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
      <div className={styles.refresh_icon} onClick={handleEnterPress}>
        <RiRefreshLine size="2rem" />
      </div>
      <Header>
        <h2>
          {t("companies")} ({companies.length})
        </h2>
      </Header>
      <ExpandableContainer
        labelText={t("search-engines")}
        expanded={searchContainerExpanded}
        changeExpanded={() =>
          setSearchContainerExpanded(!searchContainerExpanded)
        }
      >
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
            />
          </div>
        </RowWith2Children>
      </ExpandableContainer>
      <div className={styles.content_container}>
        {companies.map((company) => (
          <Company key={company._id} company={company} />
        ))}
      </div>
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
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompaniesPage;
