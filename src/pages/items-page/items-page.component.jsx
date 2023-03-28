import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import ItemsSearchEngine from "../../components/items-search-engine/items-search-engine.component";
import ItemsPageActions from "../../components/items-page-actions/items-page-actions.component";
import AdminItemCard from "../../components/admin-item-card/admin-item-card.component";
import ResultsCount from "../../components/results-count/results-count.component";
import Loader from "../../components/action-loader/action-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import Toast from "../../components/toast/toast.component";
import ReactPaginate from "react-paginate";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  resetActiveStatus,
  resetItems,
  selectItems,
  setPage,
  resetChangeOfferStatus,
  cancelOperation,
  clearFilter,
} from "../../redux/items/itemsSlices";

import { selectToken, selectUser } from "../../redux/auth/authSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// constant
import { Colors } from "../../utils/constants";

// styles
import paginationStyles from "../../components/pagination.module.scss";

let timer;

function ItemsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  // selector
  const isOnline = useSelector(selectOnlineStatus);
  const dispatch = useDispatch();
  const {
    status,
    count,
    items,
    activeStatus,
    activeError,
    pageState,
    changeOfferStatus,
    removeFromWarehouseStatus,
    updateStatus,
  } = useSelector(selectItems);
  // const { changeOfferStatus: warehouseOfferStatus } =
  //   useSelector(selectWarehouseItems);
  const token = useSelector(selectToken);

  // handle for page change in the paginate component
  const handlePageClick = (e) => {
    const { selected } = e;

    dispatch(setPage(selected + 1));
    handleSearch();
    window.scrollTo(0, 0);
  };

  // enter pressed handler
  const handleEnterPress = () => {
    dispatch(resetItems());
    dispatch(setPage(1));
    handleSearch();
  };

  const clearFilterHandler = () => {
    dispatch(clearFilter());
    handleEnterPress();
  };

  // search handler
  const handleSearch = () => {
    dispatch(getItems({ token }));
  };

  const changeItemMaxQty = (obj) => {};

  const keyUpHandler = () => {
    cancelOperation();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      handleSearch();
    }, 200);
  };

  useEffect(() => {
    handleSearch();

    onSelectedChange();

    window.scrollTo(0, 0);

    return () => {
      dispatch(resetItems());
    };
  }, [pageState.warehouse, pageState.role]);

  return user ? (
    <>
      <ItemsSearchEngine
        user={user}
        pageState={pageState}
        search={handleEnterPress}
        keyUpHandler={keyUpHandler}
      />
      <MainContentContainer>
        <ItemsPageActions
          user={user}
          warehouse={pageState.warehouse}
          company={pageState.company}
          search={handleEnterPress}
          pageState={pageState}
          filterAction={clearFilterHandler}
        />
        {count > 0 && <ResultsCount count={count} label={t("items count")} />}

        {/* display items */}
        {items?.map((item, index) => (
          <AdminItemCard
            key={index}
            item={item}
            user={user}
            warehouse={pageState.warehouse}
            role={pageState.role}
            // deleteItemFromWarehouse={deleteItemFromWarehouse}
            changeItemMaxQty={changeItemMaxQty}
            index={index}
            searchString={pageState.searchName}
          />
        ))}

        {/* show the pagination option when the items in not empty and the internet connection is well */}
        {count > 0 && isOnline && (
          <ReactPaginate
            previousLabel={t("previous")}
            nextLabel={t("next")}
            pageCount={Math.ceil(count / 15)}
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
          <NoContent msg={t("no items")} />
        )}

        {status === "loading" && <Loader allowCancel={false} />}

        {(activeStatus === "loading" ||
          changeOfferStatus === "loading" ||
          removeFromWarehouseStatus === "loading" ||
          updateStatus === "loading") && <Loader allowCancel={false} />}

        {activeStatus === "succeeded" && (
          <Toast
            bgColor={Colors.SUCCEEDED_COLOR}
            foreColor="#fff"
            toastText={t("update succeeded")}
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
            toastText={t("update succeeded")}
            actionAfterTimeout={() => dispatch(resetChangeOfferStatus())}
          />
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemsPage;
