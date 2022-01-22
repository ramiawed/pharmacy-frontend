import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
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
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// constant
import { Colors } from "../../utils/constants";

// styles
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";

function ItemsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  // const location = useLocation();
  // const { user, company, warehouse, role } = location.state;

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

    dispatch(setPage(selected + 1));
    handleSearch();
    // setInitialPage(selected);
    window.scrollTo(0, 0);
  };

  // enter pressed handler
  const handleEnterPress = () => {
    dispatch(resetItems());
    dispatch(setPage(1));
    handleSearch();
  };

  // search handler
  const handleSearch = () => {
    dispatch(getItems({ token }));
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
    if (obj.qty) {
      dispatch(changeItemWarehouseMaxQty({ obj, token }))
        .then(unwrapResult)
        .then(() => {
          handleSearch(pageState.page);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    handleSearch();

    onSelectedChange();

    return () => {
      dispatch(resetItems());
    };
  }, [pageState.sortFields, pageState.warehouse, pageState.role]);

  return user ? (
    <div className={generalStyles.container}>
      <ItemsPageHeader
        user={user}
        role={pageState.role}
        warehouse={pageState.warehouse}
        count={count}
        company={pageState.company}
        pageState={pageState}
        search={handleEnterPress}
      />

      {count > 0 && (
        <ItemsTableHeader
          user={user}
          role={pageState.role}
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
          company={pageState.company}
          warehouse={pageState.warehouse}
          role={pageState.role}
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
          <NoContent msg={t("no-medicines")} />
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
