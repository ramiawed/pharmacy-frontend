import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Redirect, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// components
import ReactPaginate from "react-paginate";
import CompanyItemRow from "../../components/company-item-row/company-item-row.component";
import Toast from "../../components/toast/toast.component";
import SearchContainer from "../../components/search-container/search-container.component";
import Header from "../../components/header/header.component";
import SearchInput from "../../components/search-input/search-input.component";
import NoContent from "../../components/no-content/no-content.component";
import ItemsTableHeader from "../../components/items-table-header/items-table-header.component";

// react-icons
import { RiAddCircleFill } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  resetActiveStatus,
  resetStatus,
  resetItems,
  selectItems,
} from "../../redux/items/itemsSlices";
import {
  changeItemWarehouseMaxQty,
  removeItemFromWarehouse,
} from "../../redux/warehouseItems/warehouseItemsSlices";
import { selectToken } from "../../redux/auth/authSlice";

// constant
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
import paginationStyles from "../../components/pagination.module.scss";
import searchContainerStyles from "../../components/search-container/search-container.module.scss";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import Loader from "../../components/action-loader/action-loader.component";

function ItemsPage() {
  const { t } = useTranslation();

  const location = useLocation();
  const { user, company, warehouse, role } = location.state;

  const isOnline = useSelector(selectOnlineStatus);

  // search state
  const [searchName, setSearchName] = useState("");
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const [searchWarehouse, setSearchWarehouse] = useState("");
  const [deletedItemsCheck, setDeletedItemsCheck] = useState(false);
  const [activeItemsCheck, setActiveItemsCheck] = useState(false);
  const [inWarehouseCheck, setInWarehouseCheck] = useState(false);
  const [outWarehouseCheck, setOutWarehouseCheck] = useState(false);

  // sort option state
  const [sortNameField, setSortNameField] = useState(0);
  const [sortCaliberField, setSortCaliberField] = useState(0);
  const [sortPriceField, setSortPriceField] = useState(0);
  const [sortCustomerPriceField, setSortCustomerPriceField] = useState(0);
  const [sortField, setSortField] = useState("");

  // initial page state
  const [initialPage, setInitialPage] = useState(0);

  const dispatch = useDispatch();
  const { status, error, count, items, activeStatus, activeError } =
    useSelector(selectItems);
  const token = useSelector(selectToken);

  // handle for page change in the paginate component
  const handlePageClick = (e) => {
    const { selected } = e;
    handleSearch(selected + 1);
    setInitialPage(selected);
    window.scrollTo(0, 0);
  };

  // enter pressed handler
  const handleEnterPress = () => {
    handleSearch(1);
  };

  // search handler
  const handleSearch = (page) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    const queryString = {};

    queryString.page = page;

    // the user is company or admin and have permission to update the company items
    if (
      user.type === UserTypeConstants.COMPANY ||
      (user.type === UserTypeConstants.ADMIN && company !== null)
    ) {
      queryString.companyId = company._id;
    }

    if (
      user.type === UserTypeConstants.WAREHOUSE ||
      (user.type === UserTypeConstants.ADMIN && warehouse !== null)
    ) {
      queryString.warehouseId = warehouse._id;
    }

    if (searchName.trim().length !== 0) {
      queryString.name = searchName.trim();
    }

    if (searchCompanyName.trim().length !== 0) {
      queryString.companyName = searchCompanyName.trim();
    }

    if (searchWarehouse.trim().length !== 0) {
      queryString.warehouseName = searchWarehouse;
    }

    if (deletedItemsCheck) {
      queryString.isActive = false;
    }

    if (activeItemsCheck) {
      queryString.isActive = true;
    }

    if (inWarehouseCheck) {
      queryString.inWarehouse = true;
    }

    if (outWarehouseCheck) {
      queryString.outWarehouse = true;
    }

    if (sortField.length > 0) {
      queryString.sort = sortField;
    }

    dispatch(getItems({ queryString, token }));
    setInitialPage(page - 1);
  };

  // sort by item's name
  const sortByName = () => {
    if (sortNameField === 0) {
      setSortNameField(1);
      setSortField("name");
    } else if (sortNameField === 1) {
      setSortNameField(-1);
      setSortField("-name");
    } else {
      setSortNameField(0);
      setSortField("");
    }
    setSortCaliberField(0);
    setSortPriceField(0);
    setSortCustomerPriceField(0);
  };

  // sort by item's caliber
  const sortByCaliber = () => {
    if (sortCaliberField === 0) {
      setSortCaliberField(1);
      setSortField("caliber");
    } else if (sortCaliberField === 1) {
      setSortCaliberField(-1);
      setSortField("-caliber");
    } else {
      setSortCaliberField(0);
      setSortField("");
    }
    setSortNameField(0);
    setSortPriceField(0);
    setSortCustomerPriceField(0);
  };

  // sort by item's price
  const sortByPrice = () => {
    if (sortPriceField === 0) {
      setSortPriceField(1);
      setSortField("price");
    } else if (sortPriceField === 1) {
      setSortPriceField(-1);
      setSortField("-price");
    } else {
      setSortPriceField(0);
      setSortField("");
    }
    setSortNameField(0);
    setSortCaliberField(0);
    setSortCustomerPriceField(0);
  };

  // sort by items' customer price
  const sortByCustomerPrice = () => {
    if (sortCustomerPriceField === 0) {
      setSortCustomerPriceField(1);
      setSortField("customer_price");
    } else if (sortCustomerPriceField === 1) {
      setSortCustomerPriceField(-1);
      setSortField("-customer_price");
    } else {
      setSortCustomerPriceField(0);
      setSortField("");
    }
    setSortNameField(0);
    setSortCaliberField(0);
    setSortPriceField(0);
  };

  const deleteItemFromWarehouse = (obj) => {
    dispatch(removeItemFromWarehouse({ obj, token }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        handleSearch(initialPage + 1);
      })
      .catch((rejectedValueOrSerializedError) => {});
  };

  const changeItemMaxQty = (obj) => {
    dispatch(changeItemWarehouseMaxQty({ obj, token }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        handleSearch(initialPage + 1);
      })
      .catch((rejectedValueOrSerializedError) => {});
  };

  useEffect(() => {
    handleSearch(1);

    return () => {
      dispatch(resetItems());
    };
  }, [sortField, warehouse, role]);

  return user ? (
    <>
      <Header>
        {user.type === UserTypeConstants.WAREHOUSE ||
        (user.type === UserTypeConstants.ADMIN &&
          role === UserTypeConstants.WAREHOUSE) ? (
          <>
            <h2>
              {t("medicines")} <span>{count}</span>
            </h2>
            <p
              className={[
                generalStyles.center,
                generalStyles.fc_yellow,
                generalStyles.margin_v_4,
              ].join(" ")}
            >
              {t("medicines-in-warehouse")} {warehouse.name}
            </p>
          </>
        ) : null}

        {user.type === UserTypeConstants.COMPANY ||
        (user.type === UserTypeConstants.ADMIN &&
          role === UserTypeConstants.COMPANY) ? (
          <>
            <h2>
              {t("medicines")} <span>{count}</span>
            </h2>
            <p
              className={[
                generalStyles.center,
                generalStyles.fc_yellow,
                generalStyles.margin_v_4,
              ].join(" ")}
            >
              {t("medicines-in-company")} {company.name}
            </p>
          </>
        ) : null}

        {user.type === UserTypeConstants.ADMIN &&
        role === UserTypeConstants.ADMIN ? (
          <h2>
            {t("medicines")} <span>{count}</span>
          </h2>
        ) : null}

        <div style={{ position: "relative", height: "50px" }}>
          <SearchContainer searchAction={handleEnterPress}>
            <SearchInput
              label="item-name"
              id="item-name"
              type="text"
              value={searchName}
              onchange={(e) => setSearchName(e.target.value)}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => {
                setSearchName("");
              }}
            />

            {user.type === UserTypeConstants.ADMIN && (
              <SearchInput
                label="item-company"
                id="item-company"
                type="text"
                value={searchCompanyName}
                onchange={(e) => setSearchCompanyName(e.target.value)}
                placeholder="search"
                onEnterPress={handleEnterPress}
                resetField={() => {
                  setSearchCompanyName("");
                }}
              />
            )}

            <SearchInput
              label="item-warehouse"
              id="item-warehouse"
              type="text"
              value={searchWarehouse}
              onchange={(e) => setSearchWarehouse(e.target.value)}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => {
                setSearchWarehouse("");
              }}
            />
            <div className={searchContainerStyles.checkbox_div}>
              <input
                type="checkbox"
                checked={deletedItemsCheck}
                onChange={() => {
                  setDeletedItemsCheck(!deletedItemsCheck);
                  setActiveItemsCheck(false);
                }}
              />
              <label>{t("deleted-items")}</label>
            </div>
            <div className={searchContainerStyles.checkbox_div}>
              <input
                type="checkbox"
                checked={activeItemsCheck}
                onChange={() => {
                  setDeletedItemsCheck(false);
                  setActiveItemsCheck(!activeItemsCheck);
                }}
              />
              <label>{t("active-items")}</label>
            </div>
            <div className={searchContainerStyles.checkbox_div}>
              <input
                type="checkbox"
                checked={inWarehouseCheck}
                onChange={() => {
                  setInWarehouseCheck(!inWarehouseCheck);
                  setOutWarehouseCheck(false);
                }}
              />
              <label>{t("warehouse-in-warehouse")}</label>
            </div>
            <div className={searchContainerStyles.checkbox_div}>
              <input
                type="checkbox"
                checked={outWarehouseCheck}
                onChange={() => {
                  setInWarehouseCheck(false);
                  setOutWarehouseCheck(!outWarehouseCheck);
                }}
              />
              <label>{t("warehouse-out-warehouse")}</label>
            </div>
          </SearchContainer>
        </div>
        <div className={generalStyles.actions}>
          {user.type === UserTypeConstants.COMPANY ||
          (user.type === UserTypeConstants.ADMIN &&
            company !== null &&
            company.allowAdmin) ? (
            <>
              <div
                className={[
                  generalStyles.icon,
                  generalStyles.fc_secondary,
                ].join(" ")}
              >
                <Link
                  style={{
                    paddingTop: "3px",
                  }}
                  className={[generalStyles.fc_secondary].join(" ")}
                  to={{
                    pathname: "/item",
                    state: {
                      from: user.type,
                      type: "new",
                      allowAction: true,
                      itemId: null,
                      companyId:
                        user.type === UserTypeConstants.COMPANY
                          ? user._id
                          : company._id,
                      warehouseId: null,
                    },
                  }}
                >
                  <RiAddCircleFill size={20} />
                </Link>

                <div className={generalStyles.tooltip}>{t("add-item")}</div>
              </div>

              <div
                className={[
                  generalStyles.icon,
                  generalStyles.fc_secondary,
                ].join(" ")}
              >
                <Link
                  style={{ paddingTop: "3px" }}
                  className={generalStyles.fc_secondary}
                  to={{
                    pathname: "/items-from-excel",
                    state: {
                      companyId:
                        user.type === UserTypeConstants.COMPANY
                          ? user._id
                          : company._id,
                    },
                  }}
                >
                  <SiMicrosoftexcel size={20} />
                  <div className={generalStyles.tooltip}>
                    {t("items-from-excel")}
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Header>

      {count > 0 && (
        <ItemsTableHeader
          user={user}
          role={role}
          sortByName={sortByName}
          sortNameField={sortNameField}
          sortByCaliber={sortByCaliber}
          sortCaliberField={sortCaliberField}
          sortByPrice={sortByPrice}
          sortPriceField={sortPriceField}
          sortByCustomerPrice={sortByCustomerPrice}
          sortCustomerPriceField={sortCustomerPriceField}
        />
      )}

      {/* display items */}
      {items?.map((item) => (
        <CompanyItemRow
          key={uuidv4()}
          item={item}
          user={user}
          company={company}
          warehouse={warehouse}
          role={role}
          deleteItemFromWarehouse={deleteItemFromWarehouse}
          changeItemMaxQty={changeItemMaxQty}
        />
      ))}

      {/* show the pagination option when the items in not empty and the internet connection is well */}
      {count > 0 && isOnline && (
        <ReactPaginate
          previousLabel={t("previous")}
          nextLabel={t("next")}
          pageCount={Math.ceil(count / 9)}
          forcePage={initialPage}
          onPageChange={handlePageClick}
          containerClassName={paginationStyles.pagination}
          previousLinkClassName={paginationStyles.pagination_link}
          nextLinkClassName={paginationStyles.pagination_link}
          disabledClassName={paginationStyles.pagination_link_disabled}
          activeClassName={paginationStyles.pagination_link_active}
        />
      )}

      {count === 0 && status !== "loading" && (
        <>
          <NoContent msg={t("no-items-found")} />
        </>
      )}

      {status === "loading" && <Loader allowCancel={false} />}

      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(error)}
          actionAfterTimeout={() => dispatch(resetStatus())}
        />
      )}

      {activeStatus === "loading" && <Loader allowCancel={false} />}

      {activeStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("update-succeeded")}
          actionAfterTimeout={() => dispatch(resetActiveStatus())}
        />
      )}

      {activeError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(activeError)}
          actionAfterTimeout={() => dispatch(resetActiveStatus())}
        />
      )}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemsPage;
