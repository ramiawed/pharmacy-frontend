import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import axios from "axios";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import OrderDetailsActions from "../../components/order-details-actions/order-details-actions.component";
import Loader from "../../components/action-loader/action-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import Header from "../../components/header/header.component";
import Toast from "../../components/toast/toast.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectOrders, updateOrder } from "../../redux/orders/ordersSlice";

// constants
import {
  BASEURL,
  Colors,
  formatNumber,
  OfferTypes,
  OrdersStatusOptions,
} from "../../utils/constants";

import styles from "./order-details-page.module.scss";
import ItemNames from "../../components/item-names/item-names.component";

function OrderDetailsPage({ location, onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const orderId = location?.search.slice(1);

  // selectors
  const { token } = useSelector(selectUserData);
  const { status } = useSelector(selectOrders);

  // own states
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emptyMsg, setEmptyMsg] = useState("");
  const [changeStatusSuccessMsg, setChangeStatusSuccessMsg] = useState("");
  const [changeStatusFailedMsg, setChangeStatusFailedMsg] = useState("");

  const getOrderDetails = async () => {
    setEmptyMsg("");
    setLoading(true);
    axios
      .get(`${BASEURL}/orders/details?id=${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.data.order === null) {
          setEmptyMsg("order-deleted");
        } else {
          setOrderDetails(response.data.data.order);
        }
      })
      .catch((err) => {
        setEmptyMsg("order-details-error");
      });

    setLoading(false);
  };

  const refreshHandler = () => {
    setOrderDetails(null);
    getOrderDetails();
  };

  const computeTotalPrice = () => {
    let total = 0;

    orderDetails.items.forEach((item) => {
      total =
        total +
        item.qty * item.price -
        (item.bonus && item.bonusType === OfferTypes.PERCENTAGE
          ? (item.qty * item.price * item.bonus) / 100
          : 0);
    });

    return total;
  };

  const warehouseDontServeHanlder = () => {
    dispatch(
      updateOrder({
        obj: {
          status: OrdersStatusOptions.WILL_DONT_SERVER,
          couldNotDeliverDate: Date.now(),
        },
        id: orderId,
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeStatusSuccessMsg("change-order-status-success");
        refreshHandler();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  const confirmOrderHanlder = (date) => {
    const confirmDate = date ? new Date(date) : new Date();

    dispatch(
      updateOrder({
        obj: {
          status: OrdersStatusOptions.CONFIRM,
          confirmDate: confirmDate,
        },
        id: orderId,
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeStatusSuccessMsg("change-order-status-success");
        refreshHandler();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  const devlierHandler = (date, time) => {
    const deliverDate = date ? new Date(date) : new Date();
    const deliverTime = time ? time : "";

    dispatch(
      updateOrder({
        obj: {
          status: OrdersStatusOptions.DELIVERY,
          deliverDate,
          deliverTime,
        },
        id: orderId,
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeStatusSuccessMsg("change-order-status-success");
        refreshHandler();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  const shippedHandler = (date, time) => {
    const shippedDate = date ? new Date(date) : null;
    const shippedTime = time ? time : "";

    dispatch(
      updateOrder({
        obj: {
          status: OrdersStatusOptions.SHIPPING,
          shippedDate,
          shippedTime,
        },
        id: orderId,
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeStatusSuccessMsg("change-order-status-success");
        refreshHandler();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  useEffect(() => {
    getOrderDetails();

    onSelectedChange();

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <Loader allowCancel={false} />
      ) : (
        <>
          {orderDetails ? (
            <>
              <Header title="order-details" refreshHandler={refreshHandler} />

              {orderDetails && (
                <OrderDetailsActions
                  orderDetails={orderDetails}
                  computeTotalPrice={computeTotalPrice}
                  warehouseDontServeHanlder={warehouseDontServeHanlder}
                  devlierHandler={devlierHandler}
                  confirmOrderHanlder={confirmOrderHanlder}
                  shippedHandler={shippedHandler}
                  withSaveOption={true}
                />
              )}
              <p
                style={{
                  textAlign: "center",
                  color: Colors.SUCCEEDED_COLOR,
                  textDecoration: "underline",
                }}
              >
                <label>{t(orderDetails.status)}</label>
                {orderDetails.status ===
                  OrdersStatusOptions.WILL_DONT_SERVER && (
                  <label>
                    {orderDetails.couldNotDeliverDate.split("T")[0]}
                  </label>
                )}
                {orderDetails.status === OrdersStatusOptions.CONFIRM && (
                  <label>{orderDetails.confirmDate.split("T")[0]}</label>
                )}
                {orderDetails.status === OrdersStatusOptions.DELIVERY && (
                  <label>
                    {orderDetails.deliverDate?.split("T")[0]}{" "}
                    {orderDetails.deliverTime
                      ? `---${t("time-label")}: ${orderDetails.deliverTime}`
                      : ""}
                  </label>
                )}
                {orderDetails.status === OrdersStatusOptions.SHIPPING && (
                  <label>
                    {orderDetails.shippedDate
                      ? orderDetails.shippedDate.split("T")[0]
                      : t("shipped-done")}
                    {orderDetails.shippedTime
                      ? `---${t("time-label")}: ${orderDetails.shippedTime}`
                      : ""}
                  </label>
                )}
              </p>

              {/* <OrderDetailsTableHeader /> */}
              <MainContentContainer>
                {orderDetails ? (
                  <div className={styles.table}>
                    <div className={[styles.row, styles.header].join(" ")}>
                      <div
                        className={[styles.cell, styles.names_container].join(
                          " "
                        )}
                      >
                        {t("item-name")}
                      </div>
                      <div className={[styles.cell].join(" ")}>
                        {t("quantity-label")}
                      </div>
                      <div className={[styles.cell].join(" ")}>
                        {t("offer-label")}
                      </div>
                      <div className={[styles.cell].join(" ")}>
                        {t("price")}
                      </div>
                      <div className={[styles.cell].join(" ")}>
                        {t("total-price-small")}
                      </div>
                    </div>

                    {orderDetails.items.map((item, index) => (
                      <div
                        className={[styles.row, styles.body].join(" ")}
                        key={index}
                      >
                        <div
                          className={[styles.cell, styles.names_container].join(
                            " "
                          )}
                        >
                          <div className={styles.item_names_cell}>
                            <ItemNames
                              flexDirection="column"
                              item={item.item}
                            />
                          </div>
                        </div>
                        <div className={[styles.cell].join(" ")}>
                          {formatNumber(item.qty)}
                        </div>
                        <div className={[styles.cell].join(" ")}>
                          {formatNumber(item.bonus)}
                        </div>
                        <div className={[styles.cell].join(" ")}>
                          {formatNumber(item.item.price)}
                        </div>
                        <div className={[styles.cell].join(" ")}>
                          {formatNumber(
                            item.qty * item.item.price -
                              (item.bonus &&
                              item.bonusType === OfferTypes.PERCENTAGE
                                ? (item.qty * item.item.price * item.bonus) /
                                  100
                                : 0)
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <NoContent msg={t(emptyMsg)} />
                )}
              </MainContentContainer>
            </>
          ) : (
            <></>
          )}
        </>
      )}
      {status === "loading" && <Loader allowCancel={false} />}

      {changeStatusSuccessMsg && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t(changeStatusSuccessMsg)}
          actionAfterTimeout={() => setChangeStatusSuccessMsg("")}
        />
      )}

      {changeStatusFailedMsg && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(changeStatusFailedMsg)}
          actionAfterTimeout={() => setChangeStatusFailedMsg("")}
        />
      )}
    </>
  );
}

export default withRouter(OrderDetailsPage);
