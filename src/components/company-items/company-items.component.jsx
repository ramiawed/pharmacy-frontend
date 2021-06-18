import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import CardInfo from "../card-info/card-info.component";
import Input from "../input/input.component";
import TableHeader from "../table-header/table-header.component";
import ReactPaginate from "react-paginate";

// react-icons
import { FaSearch } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { IoAddCircle } from "react-icons/io5";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  resetActiveStatus,
  selectItems,
} from "../../redux/items/itemsSlices";
import { selectToken } from "../../redux/auth/authSlice";

// constants
import { Colors } from "../../utils/constants";

// styles
import styles from "./company-items.module.scss";
import tableStyles from "../table.module.scss";
import paginationStyles from "../pagination.module.scss";
import CompanyItemRow from "../company-item-row/company-item-row.component";
import Toast from "../toast/toast.component";
import RowWith2Children from "../row-with-two-children/row-with-two-children.component";
import ActionButton from "../action-button/action-button.component";

function CompanyItems() {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [deletedItemsCheck, setDeletedItemsCheck] = useState(false);
  const [activeItemsCheck, setActiveItemsCheck] = useState(false);
  const dispatch = useDispatch();

  const { status, count, items, activeStatus } = useSelector(selectItems);
  const [initialPage, setInitialPage] = useState(0);
  const token = useSelector(selectToken);

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

    if (searchName.trim().length !== 0) {
      queryString.name = searchName.trim();
    }

    if (deletedItemsCheck) {
      queryString.isActive = false;
    }

    if (activeItemsCheck) {
      queryString.isActive = true;
    }

    dispatch(getItems({ queryString, token }));
    setInitialPage(page - 1);
  };

  useEffect(() => {
    handleSearch(1);
  }, []);

  return (
    <>
      <CardInfo headerTitle={t("search-engines")}>
        <RowWith2Children>
          <div>
            <Input
              label="item-name"
              id="search-name"
              type="text"
              value={searchName}
              onchange={(e) => {
                setSearchName(e.target.value);
              }}
              icon={<FaSearch />}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => setSearchName("")}
            />
          </div>

          <div className={styles.items_active}>
            <input
              type="checkbox"
              checked={deletedItemsCheck}
              onChange={() => {
                setDeletedItemsCheck(!deletedItemsCheck);
                setActiveItemsCheck(false);
              }}
            />
            <label>{t("deleted-items")}</label>
            <input
              type="checkbox"
              checked={activeItemsCheck}
              onChange={() => {
                setDeletedItemsCheck(false);
                setActiveItemsCheck(!activeItemsCheck);
              }}
            />
            <label>{t("active-items")}</label>
            <div style={{ marginRight: "auto" }}>
              <ActionButton
                text="search"
                color={Colors.SECONDARY_COLOR}
                action={() => handleSearch(1)}
              />
            </div>
          </div>
        </RowWith2Children>
      </CardInfo>

      {count > 0 ? (
        <>
          <TableHeader>
            <label className={tableStyles.label_medium}>
              {t("item-trade-name")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-status")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-formula")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-caliber")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-packing")}
            </label>
            <label className={tableStyles.label_small}>{t("item-price")}</label>
            <label className={tableStyles.label_small}>
              {t("item-customer-price")}
            </label>
            <label className={tableStyles.label_large}>
              {t("item-composition")}
            </label>
            {/* <label className={tableStyles.label_xsmall}></label> */}
          </TableHeader>
          {items.map((item, index) => (
            <CompanyItemRow key={item._id} item={item} index={index} />
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
