import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// components
import ReactPaginate from "react-paginate";
import CompanyItemRow from "../../components/company-item-row/company-item-row.component";
import Toast from "../../components/toast/toast.component";
import NoContent from "../../components/no-content/no-content.component";
import ItemsTableHeader from "../../components/items-table-header/items-table-header.component";
import Loader from "../../components/action-loader/action-loader.component";
import ItemsPageHeader from "../../components/items-page-header/items-page-header.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  resetActiveStatus,
  resetStatus,
  resetItems,
  selectItems,
  setPage,
  resetChangeOfferStatus,
} from "../../redux/items/itemsSlices";
import {
  changeItemWarehouseMaxQty,
  removeItemFromWarehouse,
  selectWarehouseItems,
} from "../../redux/warehouseItems/warehouseItemsSlices";
import { selectToken } from "../../redux/auth/authSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// constant
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";

function ItemsPage({ onSelectedChange }) {
  const { t } = useTranslation();

  const location = useLocation();
  const { user, company, warehouse, role } = location.state;

  // selector
  const isOnline = useSelector(selectOnlineStatus);
  const dispatch = useDispatch();
  const {
    status,
    error,
    count,
    items,
    activeStatus,
    activeError,
    pageState,
    changeOfferStatus,
  } = useSelector(selectItems);
  const { changeOfferStatus: warehouseOfferStatus } =
    useSelector(selectWarehouseItems);
  const token = useSelector(selectToken);

  // handle for page change in the paginate component
  const handlePageClick = (e) => {
    const { selected } = e;

    handleSearch(selected + 1);
    // setInitialPage(selected);
    window.scrollTo(0, 0);
  };

  // enter pressed handler
  const handleEnterPress = () => {
    handleSearch(1);
  };

  // search handler
  const handleSearch = (page) => {
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

    dispatch(setPage(page));

    dispatch(getItems({ queryString, token }));
    // setInitialPage(page - 1);
  };

  const deleteItemFromWarehouse = (obj) => {
    dispatch(removeItemFromWarehouse({ obj, token }))
      .then(unwrapResult)
      .then(() => {
        handleSearch(pageState.page);
      })
      .catch(() => {});
  };

  const changeItemMaxQty = (obj) => {
    dispatch(changeItemWarehouseMaxQty({ obj, token }))
      .then(unwrapResult)
      .then(() => {
        handleSearch(pageState.page);
      })
      .catch(() => {});
  };

  useEffect(() => {
    handleSearch(1);

    onSelectedChange();

    return () => {
      dispatch(resetItems());
    };
  }, [pageState.sortFields, warehouse, role]);

  return user ? (
    <div className={generalStyles.container}>
      <ItemsPageHeader
        user={user}
        role={role}
        warehouse={warehouse}
        count={count}
        company={company}
        pageState={pageState}
        search={handleEnterPress}
      />

      {count > 0 && (
        <ItemsTableHeader
          user={user}
          role={role}
          pageState={pageState}
          sortNameField={pageState.sortNameField}
          sortCaliberField={pageState.sortCaliberField}
          sortPriceField={pageState.sortPriceField}
          sortCustomerPriceField={pageState.sortCustomerPriceField}
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
          forcePage={pageState.page - 1}
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

      {(activeStatus === "loading" ||
        changeOfferStatus === "loading" ||
        warehouseOfferStatus === "loading") && <Loader allowCancel={false} />}

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

      {changeOfferStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("update-succeeded")}
          actionAfterTimeout={() => dispatch(resetChangeOfferStatus())}
        />
      )}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemsPage;
