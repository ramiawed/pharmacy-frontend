import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";

// components
import OrderPageHeader from "../../components/orders-page-header/orders-page-header.component";
import ReactPaginate from "react-paginate";
import OrderRow from "../../components/order-row/order-row.component";
import NoContent from "../../components/no-content/no-content.component";
import Loader from "../../components/action-loader/action-loader.component";
import Toast from "../../components/toast/toast.component";
import TableHeader from "../../components/table-header/table-header.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  deleteOrder,
  getOrders,
  resetStatus,
  selectOrders,
  setPage,
} from "../../redux/orders/ordersSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// styles
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";
import tableStyles from "../../components/table.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";
import { BsCheckAll } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

function OrdersPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { status, error, count, orders, refresh, pageState, forceRefresh } =
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

  const deleteOrderHandler = (orderId) => {
    dispatch(
      deleteOrder({
        token,
        orderId,
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
    if (refresh || forceRefresh) {
      handleSearch(1);
    }

    onSelectedChange();
  }, [forceRefresh]);

  return user ? (
    <div className={generalStyles.container}>
      <OrderPageHeader
        pageState={pageState}
        count={count}
        search={handleEnterPress}
      />
      <div
        className={generalStyles.flex_container}
        style={{
          width: "250px",
        }}
      >
        <FaCircle size={10} color={Colors.SECONDARY_COLOR} />
        <label
          style={{
            fontSize: "0.7rem",
            color: Colors.SECONDARY_COLOR,
          }}
        >
          {t("unread")}
        </label>
        <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
        <label
          style={{
            fontSize: "0.7rem",
            color: Colors.SECONDARY_COLOR,
          }}
        >
          {t("received")}
        </label>
        <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
        <label
          style={{
            fontSize: "0.7rem",
            color: Colors.SECONDARY_COLOR,
          }}
        >
          {t("sent")}
        </label>
      </div>

      {count > 0 && (
        <TableHeader>
          {(user.type === UserTypeConstants.ADMIN ||
            user.type === UserTypeConstants.WAREHOUSE) && (
            <label className={tableStyles.label_medium}>
              {t("pharmacy-name")}
            </label>
          )}

          {(user.type === UserTypeConstants.ADMIN ||
            user.type === UserTypeConstants.PHARMACY) && (
            <label className={tableStyles.label_medium}>
              {t("warehouse-name")}
            </label>
          )}

          <label className={tableStyles.label_small}>{t("date-label")}</label>
          <label className={tableStyles.label_small}></label>
        </TableHeader>
      )}

      {orders?.map((order) => (
        <OrderRow
          order={order}
          key={order._id}
          deleteAction={deleteOrderHandler}
        />
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
