import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// components
import ExpandableContainer from "../../components/expandable-container/expandable-container.component";
import Header from "../../components/header/header.component";
import RowWith2Children from "../../components/row-with-two-children/row-with-two-children.component";
import Input from "../../components/input/input.component";
import Company from "../../components/company/company.component";
import ReactLoading from "react-loading";

// react-icons
import { FaSearch } from "react-icons/fa";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import {
  getCompanies,
  resetInitialState,
  selectCompanies,
} from "../../redux/company/companySlice";

// constants
import { Colors } from "../../utils/constants";

// styles
import styles from "./companies.module.scss";

function CompaniesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { companies, count, status } = useSelector(selectCompanies);

  // own state
  // expanded state for expandable container
  const [searchContainerExpanded, setSearchContainerExpanded] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [page, setPage] = useState(1);

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
    dispatch(resetInitialState());
    handleSearch(1, true);
  };

  useEffect(() => {
    handleSearch(1);
  }, []);

  return (
    <>
      <Header>
        <h2>{t("companies")}</h2>
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
              icon={() => <FaSearch />}
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
              icon={() => <FaSearch />}
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
  );
}

export default CompaniesPage;
