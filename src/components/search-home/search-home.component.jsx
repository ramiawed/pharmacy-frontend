import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// react icons
import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

// components
import Button from "../button/button.component";
import ItemRow from "../item-row/item-row.component";
import PartnerRow from "../partner-row/partner-row.component";
import ReactLoading from "react-loading";

// styles
import styles from "./search-home.module.scss";

// constants
import { Colors, BASEURL, UserTypeConstants } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";
import { changeNavSettings } from "../../redux/navs/navigationSlice";

let CancelToken = null;
let source = null;

function SearchHome() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);

  // own states
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [data, setData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  const [warehousesData, setWarehousesData] = useState([]);

  const searchHandler = async () => {
    if (searchName.trim().length === 0) {
      setLoading(false);
      setShowResult(false);
      return;
    }

    CancelToken = axios.CancelToken;
    source = CancelToken.source();

    setShowResult(true);
    setLoading(true);

    let buildUrl = `${BASEURL}`;
    let companiesBuildUrl = `${BASEURL}`;
    let warehousesBuildUrl = `${BASEURL}`;

    buildUrl =
      buildUrl + `/items?page=1&limit=25&isActive=true&itemName=${searchName}`;

    companiesBuildUrl =
      companiesBuildUrl +
      `/users?type=company&page=1&limit=25&isActive=true&name=${searchName}`;

    let queryString = `/users?type=warehouse&page=1&limit=25&isActive=true&name=${searchName}`;
    if (
      user.type === UserTypeConstants.WAREHOUSE ||
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.GUEST
    ) {
      queryString = queryString + `&city=${user.city}`;
    }
    warehousesBuildUrl = warehousesBuildUrl + queryString;

    try {
      const response = await axios.get(buildUrl, {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const companiesResponse = await axios.get(companiesBuildUrl, {
        cancelToken: source.token,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (user.type !== UserTypeConstants.GUEST) {
        const warehousesResponse = await axios.get(warehousesBuildUrl, {
          cancelToken: source.token,
          headers: { Authorization: `Bearer ${token}` },
        });

        const {
          data: {
            data: warehousesResponseData,
            status: warehousesResponseStatus,
          },
        } = warehousesResponse;

        if (warehousesResponseStatus === "success") {
          setWarehousesData(warehousesResponseData.users);
        }
      }

      CancelToken = null;
      source = null;

      const {
        data: { data, status },
      } = response;

      const {
        data: { data: companiesResponseData, status: companiesResponseStatus },
      } = companiesResponse;

      if (status === "success") {
        setData(data.items);
      }

      if (companiesResponseStatus === "success") {
        setCompaniesData(companiesResponseData.users);
      }

      setLoading(false);
    } catch (err) {
      setData([]);
      setCompaniesData([]);
      setWarehousesData([]);
    }
  };

  const resetSearch = () => {
    setShowResult(false);
    setData([]);
    dispatch(changeNavSettings({ showSearchBar: false }));
  };

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      searchHandler();
    }
  };

  const keyUpHandler = (event) => {
    if (source !== null) {
      source.cancel("cancel");
    }
    searchHandler();
  };

  const clearResultHandler = () => {
    if (source) {
      source.cancel("operation canceled by user");
    }

    setSearchName("");

    setShowResult(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.close_icon}>
        <Icon
          icon={() => <RiCloseLine />}
          onclick={() => {
            dispatch(
              changeNavSettings({
                showSearchBar: false,
              })
            );
          }}
        />
      </div>
      <div className={styles.search_container}>
        <div
          className={[
            styles.search_div,
            showResult ? styles.has_value : "",
          ].join(" ")}
        >
          <div className={styles.icon}>
            <FiSearch color={Colors.SECONDARY_COLOR} />
          </div>
          <input
            className={styles.input}
            type="text"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            placeholder={t("search-home-placeholder")}
            onKeyDown={keyDownHandler}
            onKeyUp={keyUpHandler}
          />
          <Button
            text={t("search")}
            bgColor={Colors.FAILED_COLOR}
            action={() => searchHandler()}
          />

          {showResult && (
            <div className={styles.icon}>
              <RiCloseLine
                color={Colors.FAILED_COLOR}
                onClick={clearResultHandler}
              />
            </div>
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
            ) : data.length > 0 ||
              companiesData.length > 0 ||
              warehousesData.length > 0 ? (
              <>
                {data.length > 0 && (
                  <div className={styles.header}>{t("items")}</div>
                )}
                {data.map((d) => (
                  <ItemRow
                    key={d._id}
                    item={d}
                    isSearch={true}
                    onSelectAction={resetSearch}
                  />
                ))}
                {companiesData.length > 0 && (
                  <div className={styles.header}>{t("companies")}</div>
                )}
                {companiesData.map((company) => (
                  <PartnerRow
                    key={company._id}
                    partner={company}
                    isSearch={true}
                    type="company"
                    onSelectAction={resetSearch}
                  />
                ))}

                {warehousesData.length > 0 && (
                  <div className={styles.header}>{t("warehouses")}</div>
                )}
                {warehousesData.map((warehouse) => (
                  <PartnerRow
                    key={warehouse._id}
                    partner={warehouse}
                    isSearch={true}
                    type="warehouse"
                    onSelectAction={resetSearch}
                  />
                ))}
              </>
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
    </div>
  );
}

export default SearchHome;
