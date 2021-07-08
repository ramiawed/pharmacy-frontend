import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import TableHeader from "../table-header/table-header.component";
import ReactPaginate from "react-paginate";
import paginationStyles from "../pagination.module.scss";
import CompanyItemRow from "../company-item-row/company-item-row.component";
import Toast from "../toast/toast.component";
import SearchContainer from "../search-container/search-container.component";

// react-icons
import { GiMedicines } from "react-icons/gi";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { RiAddCircleFill } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  resetActiveStatus,
  selectItems,
} from "../../redux/items/itemsSlices";
import { selectToken, selectUser } from "../../redux/auth/authSlice";

// constants
import { Colors } from "../../utils/constants";

// styles
import styles from "./company-items.module.scss";
import tableStyles from "../table.module.scss";
import SearchInput from "../search-input/search-input.component";
import searchContainerStyles from "../search-container/search-container.module.scss";

function CompanyItems() {
  const history = useHistory();
  const { t } = useTranslation();

  const [searchName, setSearchName] = useState("");
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

  const dispatch = useDispatch();
  const { count, items, activeStatus } = useSelector(selectItems);
  const [initialPage, setInitialPage] = useState(0);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  // handle for page change in the paginate component
  const handlePageClick = (e) => {
    const { selected } = e;
    handleSearch(selected + 1);
    setInitialPage(selected);
    window.scrollTo(0, 0);
  };

  const handleEnterPress = () => {
    handleSearch(1);
  };

  const handleSearch = (page) => {
    const queryString = {};

    queryString.page = page;

    queryString.companyId = user._id;

    if (searchName.trim().length !== 0) {
      queryString.name = searchName.trim();
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

  useEffect(() => {
    handleSearch(1);
  }, [sortField]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          color: Colors.SECONDARY_COLOR,
        }}
      >
        <RiAddCircleFill
          className={styles.icon}
          onClick={() => {
            history.push("/item/admin");
          }}
        />
        <SiMicrosoftexcel
          className={styles.icon}
          onClick={() => {
            history.push("/items-from-excel");
          }}
        />
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

      {count > 0 ? (
        <>
          <TableHeader>
            <label className={tableStyles.label_medium} onClick={sortByName}>
              {t("item-trade-name")}
              {sortNameField === 1 && (
                <AiOutlineSortAscending style={{ marginRight: "4px" }} />
              )}
              {sortNameField === -1 && (
                <AiOutlineSortDescending style={{ marginRight: "4px" }} />
              )}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-status")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-formula")}
            </label>
            <label className={tableStyles.label_small} onClick={sortByCaliber}>
              {t("item-caliber")}
              {sortCaliberField === 1 && (
                <AiOutlineSortAscending style={{ marginRight: "4px" }} />
              )}
              {sortCaliberField === -1 && (
                <AiOutlineSortDescending style={{ marginRight: "4px" }} />
              )}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-packing")}
            </label>
            <label className={tableStyles.label_small} onClick={sortByPrice}>
              {t("item-price")}
              {sortPriceField === 1 && (
                <AiOutlineSortAscending style={{ marginRight: "4px" }} />
              )}
              {sortPriceField === -1 && (
                <AiOutlineSortDescending style={{ marginRight: "4px" }} />
              )}
            </label>
            <label
              className={tableStyles.label_small}
              onClick={sortByCustomerPrice}
            >
              {t("item-customer-price")}
              {sortCustomerPriceField === 1 && (
                <AiOutlineSortAscending style={{ marginRight: "4px" }} />
              )}
              {sortCustomerPriceField === -1 && (
                <AiOutlineSortDescending style={{ marginRight: "4px" }} />
              )}
            </label>
            <label className={tableStyles.label_large}>
              {t("item-composition")}
            </label>
            {/* <label className={tableStyles.label_xsmall}></label> */}
          </TableHeader>

          {items.map((item) => (
            <CompanyItemRow key={item._id} item={item} />
          ))}

          <div style={{ height: "10px" }}></div>

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
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              padding: "16px",
              color: Colors.SECONDARY_COLOR,
            }}
          >
            <GiMedicines size={200} style={{ opacity: "0.4" }} />
            <p>{t("no-items-found")}</p>
          </div>
        </>
      )}

      {activeStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-operation-complete")}
          actionAfterTimeout={() => dispatch(resetActiveStatus())}
        />
      )}
    </>
  );
}

export default CompanyItems;
