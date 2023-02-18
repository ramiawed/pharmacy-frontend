import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import OrdersSearchEngine from "../../components/orders-search-engine/orders-search-engine.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ResultsCount from "../../components/results-count/results-count.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import ResultModal from "../../components/result-modal/result-modal.component";
import NoContent from "../../components/no-content/no-content.component";
import ActionBar from "../../components/action-bar/action-bar.component";
import OrderRow from "../../components/order-row/order-row.component";
import Toast from "../../components/toast/toast.component";
import Icon from "../../components/icon/icon.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  deleteOrder,
  deleteBasketOrder,
  getBasketsOrders,
  getOrders,
  resetBasketOrders,
  resetOrders,
  resetStatus,
  selectOrders,
  setOrderType,
  clearFilter,
} from "../../redux/orders/ordersSlice";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgMoreVertical } from "react-icons/cg";

// styles
import styles from "./orders-page.module.scss";

// constants and utils
import {
  Colors,
  OrdersStatusOptions,
  UserTypeConstants,
} from "../../utils/constants";
import { VscClearAll } from "react-icons/vsc";

function OrdersPage({ onSelectedChange, type }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const {
    status,
    error,
    count,
    orders,
    basketOrdersCount,
    basketOrders,
    pageState,
  } = useSelector(selectOrders);

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultModalParams, setResultModalParams] = useState({});

  // search handler
  const handleSearch = (type) => {
    if (type === "normal") {
      dispatch(getOrders({ token }));
    }

    if (type === "special") {
      dispatch(getBasketsOrders({ token }));
    }
  };

  const handleMoreResult = () => {
    handleSearch(pageState.type);
  };

  const deleteOrderHandler = (orderId) => {
    dispatch(
      pageState.type === "normal"
        ? deleteOrder({
            token,
            orderId,
          })
        : deleteBasketOrder({
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
      .catch(() => {
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

  const handleEnterPress = () => {
    if (pageState.type === "normal") dispatch(resetOrders());
    if (pageState.type === "special") dispatch(resetBasketOrders());
    handleSearch(pageState.type);
  };

  const clearFilterHandler = () => {
    dispatch(clearFilter());
    handleEnterPress();
  };

  const changeOrderTypeHandler = (type) => {
    dispatch(setOrderType(type));
    if (type === "normal" && orders.length === 0) handleSearch(type);
    if (type === "special" && basketOrders.length === 0) handleSearch(type);
  };

  useEffect(() => {
    if (pageState.type === "normal" && orders.length === 0) {
      handleSearch("normal");
    }

    if (pageState.type === "special" && basketOrders.length === 0) {
      handleSearch("special");
    }

    onSelectedChange();

    window.scrollTo(0, 0);
  }, []);

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
      <MainContentContainer>
        <ActionBar>
          <button
            className={[
              styles.btn,
              pageState.type === "normal" ? styles.selected : "",
            ].join(" ")}
            onClick={() => changeOrderTypeHandler("normal")}
          >
            {t("normal-order")}
          </button>

          <button
            className={[
              styles.btn,
              pageState.type === "special" ? styles.selected : "",
            ].join(" ")}
            onClick={() => changeOrderTypeHandler("special")}
          >
            {t("special-order")}
          </button>

          {(pageState.searchPharmacyName.trim().length > 0 ||
            pageState.searchWarehouseName.trim().length > 0 ||
            pageState.orderStatus !== OrdersStatusOptions.ALL ||
            (pageState.dateOption !== "" && pageState.date !== "")) && (
            <Icon
              withBackground={true}
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("clear-filter-tooltip")}
              onclick={clearFilterHandler}
              icon={() => <VscClearAll />}
            />
          )}

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
        </ActionBar>

        {pageState.type === "normal" && count > 0 && (
          <ResultsCount label={t("normal-orders-count")} count={count} />
        )}

        {pageState.type === "special" && basketOrdersCount > 0 && (
          <ResultsCount
            label={t("special-orders-count")}
            count={basketOrdersCount}
          />
        )}

        <div>
          {pageState.type === "normal" &&
            orders?.map((order, index) => (
              <OrderRow
                order={order}
                key={order._id}
                deleteAction={deleteOrderHandler}
                type="normal"
                index={index}
              />
            ))}

          {pageState.type === "special" &&
            basketOrders?.map((order, index) => (
              <OrderRow
                order={order}
                key={order._id}
                deleteAction={deleteOrderHandler}
                type="special"
                index={index}
              />
            ))}

          {pageState.type === "normal" && count > 0 && status !== "loading" && (
            <ResultsCount count={`${orders.length} / ${count}`} />
          )}

          {pageState.type === "special" &&
            basketOrdersCount > 0 &&
            status !== "loading" && (
              <ResultsCount
                count={`${basketOrders.length} / ${basketOrdersCount}`}
              />
            )}

          {pageState.type === "normal" &&
            count === 0 &&
            status !== "loading" && <NoContent msg={t("no-orders-found")} />}

          {pageState.type === "special" &&
            basketOrdersCount === 0 &&
            status !== "loading" && (
              <NoContent msg={t("no-basket-orders-found")} />
            )}

          {status === "loading" && <CylonLoader />}

          {pageState.type === "normal" &&
            orders.length < count &&
            status !== "loading" && (
              <ActionBar>
                <ButtonWithIcon
                  text={t("more")}
                  action={handleMoreResult}
                  bgColor={Colors.SUCCEEDED_COLOR}
                  icon={() => <CgMoreVertical />}
                />
              </ActionBar>
            )}

          {pageState.type === "normal" &&
            orders.length === count &&
            status !== "loading" &&
            count !== 0 && <NoMoreResult msg={t("no-more")} />}

          {pageState.type === "special" &&
            basketOrders.length < basketOrdersCount &&
            status !== "loading" && (
              <ActionBar>
                <ButtonWithIcon
                  text={t("more")}
                  action={handleMoreResult}
                  bgColor={Colors.SUCCEEDED_COLOR}
                  icon={() => <CgMoreVertical />}
                />
              </ActionBar>
            )}

          {pageState.type === "special" &&
            basketOrders.length === basketOrdersCount &&
            status !== "loading" &&
            basketOrdersCount !== 0 && <NoMoreResult msg={t("no-more")} />}

          {error && (
            <Toast
              bgColor={Colors.FAILED_COLOR}
              foreColor="#fff"
              toastText={t(error)}
              actionAfterTimeout={() => dispatch(resetStatus())}
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
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default OrdersPage;
