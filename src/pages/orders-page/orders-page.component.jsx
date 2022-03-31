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
import TableHeader from "../../components/table-header/table-header.component";
import Icon from "../../components/action-icon/action-icon.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  changeAllOrdersSelection,
  deleteOrder,
  getOrders,
  getUnreadOrders,
  resetStatus,
  selectOrders,
  setPage,
  updateOrders,
} from "../../redux/orders/ordersSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// react icons
import { BsCheckAll } from "react-icons/bs";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineIndeterminateCheckBox,
  MdOutlineLocalShipping,
  MdRemoveDone,
} from "react-icons/md";
import { RiMailUnreadLine, RiSendPlaneFill } from "react-icons/ri";

// styles
import styles from "./orders-page.module.scss";
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";
import tableStyles from "../../components/table.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

// return the count of selected orders
const calculateSelectedOrdersCount = (orders) => {
  let count = 0;
  orders.forEach((o) => {
    count += o.selected ? 1 : 0;
  });
  return count;
};

function OrdersPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { status, error, count, orders, refresh, pageState, forceRefresh } =
    useSelector(selectOrders);
  const isOnline = useSelector(selectOnlineStatus);

  const selectedOrdersCount = calculateSelectedOrdersCount(orders);

  // handle to change the status of the order
  const markOrdersAs = (verb) => {
    const ids = orders
      .filter(
        (o) =>
          o.selected &&
          ((user.type === UserTypeConstants.PHARMACY &&
            o.pharmacyStatus !== verb) ||
            (user.type === UserTypeConstants.WAREHOUSE &&
              o.warehouseStatus !== verb))
      )
      .map((o) => o._id);

    if (ids.length > 0) {
      let body = {};
      if (user.type === UserTypeConstants.PHARMACY) {
        body = {
          pharmacyStatus: verb,
        };
      }
      if (user.type === UserTypeConstants.WAREHOUSE) {
        body = {
          warehouseStatus: verb,
        };
      }
      dispatch(
        updateOrders({
          obj: {
            ids,
            body,
          },
          token,
        })
      )
        .then(unwrapResult)
        .then(() => {
          dispatch(getUnreadOrders({ token }));
        });
    }
  };

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

    window.scrollTo(0, 0);
  };

  const handleEnterPress = () => {
    handleSearch(1);
  };

  const changeOrdersSelection = () => {
    dispatch(
      selectedOrdersCount === orders.length
        ? changeAllOrdersSelection(false)
        : changeAllOrdersSelection(true)
    );
  };

  useEffect(() => {
    if (refresh || forceRefresh) {
      handleSearch(1);
    }

    onSelectedChange();
  }, [forceRefresh]);

  return user &&
    (user.type === UserTypeConstants.ADMIN ||
      user.type === UserTypeConstants.WAREHOUSE ||
      user.type === UserTypeConstants.PHARMACY) ? (
    <>
      <OrderPageHeader
        pageState={pageState}
        count={count}
        search={handleEnterPress}
      />
      <div className={generalStyles.container}>
        {orders.length > 0 && (
          <div className={styles.action_highlight_container}>
            <div className={styles.actions_div}>
              {user.type === UserTypeConstants.PHARMACY &&
                selectedOrdersCount > 0 && (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    tooltip={t("mark-as-received")}
                    icon={() => <BsCheckAll />}
                    onclick={() => markOrdersAs("received")}
                    withBackground={true}
                  />
                )}

              {user.type === UserTypeConstants.PHARMACY &&
                selectedOrdersCount > 0 && (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    tooltip={t("mark-as-sent")}
                    icon={() => <RiSendPlaneFill />}
                    onclick={() => markOrdersAs("sent")}
                    withBackground={true}
                  />
                )}

              {user.type === UserTypeConstants.WAREHOUSE &&
                selectedOrdersCount > 0 && (
                  <>
                    <Icon
                      selected={false}
                      foreColor={Colors.SUCCEEDED_COLOR}
                      tooltip={t("mark-as-shipped")}
                      icon={() => <MdOutlineLocalShipping />}
                      onclick={() => markOrdersAs("sent")}
                      withBackground={true}
                    />

                    <Icon
                      selected={false}
                      foreColor={Colors.SUCCEEDED_COLOR}
                      tooltip={t("mark-as-received")}
                      icon={() => <BsCheckAll />}
                      onclick={() => markOrdersAs("received")}
                      withBackground={true}
                    />

                    <Icon
                      selected={false}
                      foreColor={Colors.FAILED_COLOR}
                      tooltip={t("mark-as-will-dont-server")}
                      icon={() => <MdRemoveDone />}
                      onclick={() => markOrdersAs("dontServe")}
                      withBackground={true}
                    />
                  </>
                )}
            </div>

            <div className={styles.highlight}>
              <RiMailUnreadLine color={Colors.SECONDARY_COLOR} />
              <label>{t("unread")}</label>
              <MdOutlineLocalShipping color={Colors.SUCCEEDED_COLOR} />
              <label>{t("shipped")}</label>
              <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
              <label>{t("received")}</label>
              <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
              <label>{t("sent")}</label>
              <MdRemoveDone color={Colors.FAILED_COLOR} />
              <label>{t("will-dont-serve")}</label>
            </div>
          </div>
        )}

        {count > 0 && (
          <TableHeader>
            {user.type !== UserTypeConstants.ADMIN && (
              <label
                style={{
                  width: "40px",
                }}
              >
                <div onClick={changeOrdersSelection}>
                  {selectedOrdersCount === orders.length && (
                    <MdOutlineCheckBox size={20} color={Colors.WHITE_COLOR} />
                  )}
                  {selectedOrdersCount === 0 && (
                    <MdOutlineCheckBoxOutlineBlank size={20} />
                  )}
                  {selectedOrdersCount < orders.length &&
                    selectedOrdersCount !== 0 && (
                      <MdOutlineIndeterminateCheckBox size={20} />
                    )}
                </div>
              </label>
            )}

            {(user.type === UserTypeConstants.ADMIN ||
              user.type === UserTypeConstants.WAREHOUSE) && (
              <label
                className={tableStyles.label_medium}
                style={{
                  display: "flex",
                  paddingInlineStart: "10px",
                  paddingRight: "10ppx",
                }}
              >
                {t("pharmacy-name")}
              </label>
            )}

            {(user.type === UserTypeConstants.ADMIN ||
              user.type === UserTypeConstants.PHARMACY) && (
              <label
                className={tableStyles.label_medium}
                style={{
                  display: "flex",
                  paddingInlineStart: "10px",
                  paddingRight: "10px",
                }}
              >
                {t("warehouse-name")}
              </label>
            )}

            <label className={tableStyles.label_small}>{t("date-label")}</label>
            <label className={tableStyles.label_xsmall}></label>
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
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default OrdersPage;
