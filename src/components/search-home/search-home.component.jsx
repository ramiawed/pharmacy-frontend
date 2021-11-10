import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
import axios from "axios";

import { useSelector } from "react-redux";
import { selectToken, selectUserData } from "../../redux/auth/authSlice";

// react icons
import { FiSearch } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { RiCloseLine } from "react-icons/ri";

// components
import Button from "../button/button.component";
import ItemRow from "../item-row/item-row.component";
import PartnerRow from "../partner-row/partner-row.component";

// styles
import styles from "./search-home.module.scss";

// constants
import { Colors, BASEURL, UserTypeConstants } from "../../utils/constants";

let CancelToken;
let source;

function SearchHome() {
  const { t } = useTranslation();
  const { user, token } = useSelector(selectUserData);
  const [searchName, setSearchName] = useState("");
  const [option, setOption] = useState("medicines");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const searchHandler = async () => {
    if (searchName.trim().length === 0) {
      return;
    }

    CancelToken = axios.CancelToken;
    source = CancelToken.source;

    setShowResult(true);
    setLoading(true);

    let buildUrl = `${BASEURL}`;

    if (option === "medicines") {
      buildUrl =
        buildUrl +
        `/items?page=1&limit=25&isActive=true&itemName=${searchName}`;
    }

    if (option === "companies") {
      buildUrl =
        buildUrl +
        `/users?type=company&page=1&limit=25&isActive=true&name=${searchName}`;
    }

    if (option === "warehouses") {
      let queryString = `/users?type=warehouse&page=1&limit=25&isActive=true&name=${searchName}`;
      if (
        user.type === UserTypeConstants.WAREHOUSE ||
        user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.GUEST
      ) {
        queryString = queryString + `&city=${user.city}`;
      }
      buildUrl = buildUrl + queryString;
    }

    try {
      const response = await axios.get(buildUrl, {
        timeout: 10000,
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      CancelToken = null;
      source = null;

      const {
        data: { data, status },
      } = response;

      if (status === "success") {
        if (option === "medicines") {
          setData(data.items);
        } else {
          setData(data.users);
        }
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const changeOptionHandler = (opt) => {
    if (!loading) {
      setData([]);
      setOption(opt);
    }
  };

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      searchHandler(option);
    }
  };

  const clearResultHandler = () => {
    if (source) {
      source().cancel("operation canceled by user");
    }

    setSearchName("");

    setShowResult(false);
  };

  useEffect(() => {
    if (searchName.length > 0) {
      if (source) {
        source().cancel("operation canceled by user");
      }

      searchHandler();
    }

    return () => {
      if (source) {
        source().cancel("operation canceled by user");
      }
    };
  }, [option]);

  return (
    <div className={styles.container}>
      <h3>{t("app-name")}</h3>
      <div className={styles.options}>
        <div
          className={[
            styles.option,
            option === "medicines" ? styles.selected : "",
          ].join(" ")}
          onClick={() => changeOptionHandler("medicines")}
        >
          {option === "medicines" && <TiTick size={16} />}

          <label
            style={{
              margin: "0 5px",
            }}
          >
            {t("nav-medicines")}
          </label>
        </div>
        <div
          className={[
            styles.option,
            option === "companies" ? styles.selected : "",
          ].join(" ")}
          onClick={() => changeOptionHandler("companies")}
        >
          {option === "companies" && <TiTick size={16} />}

          <label
            style={{
              margin: "0 5px",
            }}
          >
            {t("nav-company")}
          </label>
        </div>

        <div
          className={[
            styles.option,
            option === "warehouses" ? styles.selected : "",
          ].join(" ")}
          onClick={() => changeOptionHandler("warehouses")}
        >
          {option === "warehouses" && <TiTick size={16} />}

          <label
            style={{
              margin: "0 5px",
            }}
          >
            {t("nav-warehouse")}
          </label>
        </div>
      </div>

      <div
        className={[styles.search_div, showResult ? styles.has_value : ""].join(
          " "
        )}
      >
        <FiSearch size={24} color={Colors.SECONDARY_COLOR} />
        <input
          className={styles.input}
          type="text"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          placeholder={
            option === "medicines"
              ? t("search-by-item-name")
              : option === "companies"
              ? t("search-by-company-name")
              : t("search-by-warehouse-name")
          }
          onKeyDown={keyDownHandler}
        />
        <Button
          text={t("search")}
          bgColor={Colors.FAILED_COLOR}
          action={() => searchHandler(option)}
        />

        {showResult && (
          <RiCloseLine
            size={20}
            color={Colors.FAILED_COLOR}
            style={{
              marginInline: "5px",
              cursor: "pointer",
            }}
            onClick={clearResultHandler}
          />
        )}
      </div>
      {showResult && (
        <div className={styles.result_div}>
          {loading ? (
            <ReactLoading
              type="bars"
              height={75}
              width={75}
              color={Colors.SECONDARY_COLOR}
            />
          ) : data.length > 0 ? (
            data.map((d) =>
              option === "medicines" ? (
                <ItemRow key={d._id} companyItem={d} isSearch={true} />
              ) : (
                <PartnerRow
                  key={d._id}
                  user={d}
                  isSearch={true}
                  type={option === "companies" ? "company" : "warehouse"}
                />
              )
            )
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: Colors.SECONDARY_COLOR,
              }}
            >
              <p>{t("no-data-found")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchHome;
