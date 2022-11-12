import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import ReactPaginate from "react-paginate";
import OrderRow from "../../components/order-row/order-row.component";
import NoContent from "../../components/no-content/no-content.component";
import Loader from "../../components/action-loader/action-loader.component";
import Toast from "../../components/toast/toast.component";
import Icon from "../../components/action-icon/action-icon.component";
import ResultModal from "../../components/result-modal/result-modal.component";
import OrdersSearchEngine from "../../components/orders-search-engine/orders-search-engine.component";

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
import {
  changeAllOrdersSelection as basketChangeAllOrdersSelection,
  deleteOrder as basketDeleteOrder,
  getOrders as basketGetOrders,
  getUnreadOrders as basketGetUnreadOrders,
  resetStatus as basketResetStatus,
  selectBasketOrders as basketSelectOrders,
  setPage as basketSetPage,
  updateOrders as basketUpdateOrders,
} from "../../redux/basketOrdersSlice/basketOrdersSlice";
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
import {
  RiMailUnreadLine,
  RiRefreshLine,
  RiSendPlaneFill,
} from "react-icons/ri";

// styles
import styles from "./orders-page.module.scss";
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

import { IoMdArrowRoundBack } from "react-icons/io";

// return the count of selected orders
const calculateSelectedOrdersCount = (orders) => {
  let count = 0;
  orders.forEach((o) => {
    count += o.selected ? 1 : 0;
  });
  return count;
};

function OrdersPage({ onSelectedChange, type }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { status, error, count, orders, refresh, pageState, forceRefresh } =
    useSelector(type === "order" ? selectOrders : basketSelectOrders);
  const isOnline = useSelector(selectOnlineStatus);

  const selectedOrdersCount = calculateSelectedOrdersCount(orders);

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultModalParams, setResultModalParams] = useState({});

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
        type === "order"
          ? updateOrders({
              obj: {
                ids,
                body,
              },
              token,
            })
          : basketUpdateOrders({
              obj: {
                ids,
                body,
              },
              token,
            })
      )
        .then(unwrapResult)
        .then(() => {
          dispatch(
            type === "order"
              ? getUnreadOrders({ token })
              : basketGetUnreadOrders({ token })
          );
        });
    }
  };

  // search handler
  const handleSearch = (page) => {
    dispatch(type === "order" ? setPage(page) : basketSetPage(page));

    dispatch(
      type === "order"
        ? getOrders({
            obj: {
              page,
            },
            token,
          })
        : basketGetOrders({
            obj: {
              page,
            },
            token,
          })
    );
  };

  const deleteOrderHandler = (orderId) => {
    dispatch(
      type === "order"
        ? deleteOrder({
            token,
            orderId,
          })
        : basketDeleteOrder({
            token,
            orderId,
          })
    )
      .then(unwrapResult)
      .then(() => {
        setResultModalParams({
          msg: "order-deleted-successfully-msg",
          type: "success",
          closeModal: () => {
            setResultModalParams(null);
            setShowResultModal(false);
          },
        });
        setShowResultModal(true);
      })
      .catch((err) => {
        setResultModalParams({
          msg: "order-deleted-failed-msg",
          type: "failed",
          closeModal: () => {
            setResultModalParams(null);
            setShowResultModal(false);
          },
        });
        setShowResultModal(true);
      });
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
        ? type === "order"
          ? changeAllOrdersSelection(false)
          : basketChangeAllOrdersSelection(false)
        : type === "order"
        ? changeAllOrdersSelection(true)
        : basketChangeAllOrdersSelection(true)
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
      <OrdersSearchEngine
        pageState={pageState}
        search={handleEnterPress}
        type={type}
      />
      <div className={generalStyles.container_with_header}>
        <div className={generalStyles.actions}>
          <Icon
            foreColor={Colors.MAIN_COLOR}
            selected={false}
            icon={() => <RiRefreshLine />}
            tooltip={t("refresh-tooltip")}
            onclick={handleEnterPress}
            withBackground={true}
          />

          <Icon
            onclick={() => {
              history.goBack();
            }}
            icon={() => <IoMdArrowRoundBack />}
            foreColor={Colors.MAIN_COLOR}
            withBackground={true}
          />
        </div>
        <div>
          {orders.length > 0 && (
            <div className={styles.action_highlight_container}>
              <div className={styles.highlight}>
                <RiMailUnreadLine color={Colors.SECONDARY_COLOR} />
                <label>{t("unread")}</label>
                <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
                <label>{t("received")}</label>
                <MdOutlineLocalShipping color={Colors.SUCCEEDED_COLOR} />
                <label>{t("shipped")}</label>
                <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
                <label>{t("sent")}</label>
                <MdRemoveDone color={Colors.FAILED_COLOR} />
                <label>{t("will-dont-serve")}</label>
              </div>
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
            </div>
          )}

          {orders.length > 0 && (
            <div>
              {user.type !== UserTypeConstants.ADMIN && (
                <div
                  onClick={changeOrdersSelection}
                  className={styles.selection}
                >
                  {selectedOrdersCount === orders.length && (
                    <MdOutlineCheckBox size={24} color={Colors.MAIN_COLOR} />
                  )}
                  {selectedOrdersCount === 0 && (
                    <MdOutlineCheckBoxOutlineBlank
                      size={24}
                      color={Colors.MAIN_COLOR}
                    />
                  )}
                  {selectedOrdersCount < orders.length &&
                    selectedOrdersCount !== 0 && (
                      <MdOutlineIndeterminateCheckBox
                        size={24}
                        color={Colors.MAIN_COLOR}
                      />
                    )}
                  <label
                    style={{
                      marginRight: "5px",
                      fontSize: "16px",
                      color: Colors.MAIN_COLOR,
                    }}
                  >
                    {t("selection")}
                  </label>
                </div>
              )}
            </div>
          )}

          {orders?.map((order) => (
            <OrderRow
              order={order}
              key={order._id}
              deleteAction={deleteOrderHandler}
              type={type}
            />
          ))}

          {orders.length > 0 && isOnline && (
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
            <>
              <NoContent
                msg={t(
                  type === "order"
                    ? "no-orders-found"
                    : "no-basket-orders-found"
                )}
              />
            </>
          )}

          {status === "loading" && <Loader allowCancel={false} />}

          {error && (
            <Toast
              bgColor={Colors.FAILED_COLOR}
              foreColor="#fff"
              toastText={t(error)}
              actionAfterTimeout={() =>
                dispatch(type === "order" ? resetStatus() : basketResetStatus())
              }
            />
          )}
        </div>
        {showResultModal && (
          <ResultModal
            msg={resultModalParams.msg}
            closeModal={resultModalParams.closeModal}
            type={resultModalParams.type}
          />
        )}
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default OrdersPage;
