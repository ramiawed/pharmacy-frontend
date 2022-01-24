import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";

// components
import OrderPageHeader from "../../components/orders-page-header/orders-page-header.component";
import ReactPaginate from "react-paginate";
import OrderRow from "../../components/order-row/order-row.component";
import NoContent from "../../components/no-content/no-content.component";
import Loader from "../../components/action-loader/action-loader.component";
import Toast from "../../components/toast/toast.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getOrders,
  resetStatus,
  selectOrders,
  setPage,
  setRefresh,
} from "../../redux/orders/ordersSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// styles
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";
import tableStyles from "../../components/table.module.scss";

// constants and utils
import { Colors } from "../../utils/constants";
import TableHeader from "../../components/table-header/table-header.component";

function OrdersPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { status, error, count, orders, refresh, pageState } =
    useSelector(selectOrders);
  const isOnline = useSelector(selectOnlineStatus);

  // search handler
  const handleSearch = (page) => {
    dispatch(setPage(page));

    dispatch(
      getOrders({
        obj: {
          page,
        },
        token,
      })
    );
  };

  const handlePageClick = (e) => {
    const { selected } = e;

    handleSearch(selected + 1);
    // setInitialPage(selected);
    window.scrollTo(0, 0);
  };

  const handleEnterPress = () => {
    handleSearch(1);
  };

  useEffect(() => {
    if (refresh) {
      handleSearch(1);
      dispatch(setRefresh(false));
    }

    onSelectedChange();
  }, []);

  return user ? (
    <div className={generalStyles.container}>
      <OrderPageHeader
        pageState={pageState}
        count={count}
        search={handleEnterPress}
      />

      {count > 0 && (
        <TableHeader>
          <label className={tableStyles.label_medium}>
            {t("pharmacy-name")}
          </label>
          <label className={tableStyles.label_medium}>
            {t("warehouse-name")}
          </label>
          <label className={tableStyles.label_medium}>{t("date-label")}</label>
          <label className={tableStyles.label_xsmall}></label>
        </TableHeader>
      )}

      {orders?.map((order) => (
        <OrderRow order={order} key={order._id} />
      ))}

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
          <NoContent msg={t("no-orders-found")} />
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
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default OrdersPage;
