import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getWarehouseItems,
  removeItemFromWarehouse,
  selectWarehouseItems,
  resetRemoveFromWarehouseStatus,
  changeItemWarehouseMaxQty,
} from "../../redux/warehouseItems/warehouseItemsSlices";

// components
import TableHeader from "../../components/table-header/table-header.component";
import ReactPaginate from "react-paginate";
import paginationStyles from "../../components/pagination.module.scss";
import WarehouseItemRow from "../../components/warehouse-item-row/warehouse-item-row.component";
import Toast from "../../components/toast/toast.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";

// react-icons
import { FaSearch } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";

// styles
import generalStyles from "../../style.module.scss";
import tableStyles from "../../components/table.module.scss";
import { Colors, UserTypeConstants } from "../../utils/constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { Redirect } from "react-router-dom";

function WarehouseItemsPage({ onSelectedChange }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { token, user } = useSelector(selectUserData);
  const { warehouseItems, count, removeFromWarehouseStatus } =
    useSelector(selectWarehouseItems);

  const [searchCompanyName, setSearchCompanyName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [initialPage, setInitialPage] = useState(0);

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

    if (searchCompanyName.trim().length !== 0) {
      queryString.companyName = searchCompanyName.trim();
    }

    dispatch(getWarehouseItems({ queryString, token }));
    setInitialPage(page - 1);
  };

  const deleteItem = (obj) => {
    dispatch(removeItemFromWarehouse({ obj, token }))
      .then(unwrapResult)
      .then(() => {
        handleSearch(initialPage + 1);
      })
      .catch(() => {});
  };

  const changeItemMaxQty = (obj) => {
    dispatch(changeItemWarehouseMaxQty({ obj, token }))
      .then(unwrapResult)
      .then(() => {
        handleSearch(initialPage + 1);
      })
      .catch(() => {});
  };

  useEffect(() => {
    handleSearch(1);

    onSelectedChange();
  }, []);

  return user ? (
    user.type === UserTypeConstants.WAREHOUSE ? (
      <>
        <div className={generalStyles.actions}>
          <SearchContainer searchAction={handleEnterPress}>
            <SearchInput
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
            <SearchInput
              label="user-company-name"
              id="search-company-name"
              type="text"
              value={searchCompanyName}
              onchange={(e) => {
                setSearchCompanyName(e.target.value);
              }}
              icon={<FaSearch />}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => setSearchCompanyName("")}
            />
          </SearchContainer>
        </div>

        {count > 0 ? (
          <>
            <TableHeader>
              <label className={tableStyles.label_medium}>
                {t("item-trade-name")}
              </label>

              <label className={tableStyles.label_medium}>
                {t("user-company-name")}
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
              <label className={tableStyles.label_small}>
                {t("item-price")}
              </label>
              <label className={tableStyles.label_small}>
                {t("item-customer-price")}
              </label>
              <label className={tableStyles.label_small}>
                {t("item-max-qty")}
              </label>
              <label className={tableStyles.label_xsmall}></label>
              <label className={tableStyles.label_xsmall}></label>
              {/* <label className={tableStyles.label_xsmall}></label> */}
            </TableHeader>

            {warehouseItems.map((item, index) => (
              <WarehouseItemRow
                key={item._id}
                item={item}
                index={index}
                // onSelect={onSelect}
                deleteItem={deleteItem}
                changeItemMaxQty={changeItemMaxQty}
              />
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
            <div className={generalStyles.no_content_div}>
              <GiMedicines className={generalStyles.no_content_icon} />
              <p className={generalStyles.fc_white}>{t("no-items-found")}</p>
            </div>
          </>
        )}

        {removeFromWarehouseStatus === "succeeded" && (
          <Toast
            bgColor={Colors.SUCCEEDED_COLOR}
            foreColor="#fff"
            toastText={t("item-operation-complete")}
            actionAfterTimeout={() =>
              dispatch(resetRemoveFromWarehouseStatus())
            }
          />
        )}
      </>
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <Redirect to="/signin" />
  );
}

export default WarehouseItemsPage;
