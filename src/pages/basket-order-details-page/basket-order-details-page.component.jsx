import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import axios from "axios";

// components
import OrderDetailsActions from "../../components/order-details-actions/order-details-actions.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import Loader from "../../components/action-loader/action-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import Header from "../../components/header/header.component";
import Basket from "../../components/basket/basket.component";
import Toast from "../../components/toast/toast.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { updateBasketOrder } from "../../redux/orders/ordersSlice";

// constants and utils
import { BASEURL, Colors, OrdersStatusOptions } from "../../utils/constants";

const BasketOrderDetailsPage = ({ onSelectedChange }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const orderId = location?.search.slice(1);

  const dispatch = useDispatch();

  // selectors
  const { token } = useSelector(selectUserData);
  // const { status } = useSelector(selectBasketOrders);

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
      .get(`${BASEURL}/ordered-baskets/details?id=${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.data.order === null) {
          setEmptyMsg("order-deleted");
        } else {
          setOrderDetails(response.data.data.basketOrder);
        }
      })
      .catch((err) => {
        setEmptyMsg("order-details-error");
      });

    setLoading(false);
  };

  const warehouseDontServeHanlder = () => {
    dispatch(
      updateBasketOrder({
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
        getOrderDetails();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  const confirmOrderHanlder = (date) => {
    const confirmDate = date ? new Date(date) : new Date();

    dispatch(
      updateBasketOrder({
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
        getOrderDetails();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  const devlierHandler = (date, time) => {
    const deliverDate = date ? new Date(date) : new Date();
    const deliverTime = time ? time : "";

    dispatch(
      updateBasketOrder({
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
        getOrderDetails();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  const shippedHandler = (date, time) => {
    const shippedDate = date ? new Date(date) : null;
    const shippedTime = time ? time : "";

    dispatch(
      updateBasketOrder({
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
        getOrderDetails();
      })
      .catch(() => {
        setChangeStatusFailedMsg("change-order-status-failed");
      });
  };

  useEffect(() => {
    getOrderDetails();

    window.scrollTo(0, 0);

    onSelectedChange();
  }, []);

  return (
    <>
      {loading ? (
        <Loader allowCancel={false} />
      ) : (
        <>
          {orderDetails ? (
            <>
              <Header
                title="special-order-details-header"
                refreshHandler={getOrderDetails}
              />

              {orderDetails && (
                <OrderDetailsActions
                  orderDetails={orderDetails}
                  warehouseDontServeHanlder={warehouseDontServeHanlder}
                  devlierHandler={devlierHandler}
                  confirmOrderHanlder={confirmOrderHanlder}
                  shippedHandler={shippedHandler}
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

              <MainContentContainer>
                {orderDetails ? (
                  <>
                    <Basket
                      basket={orderDetails.basket}
                      editable={false}
                      forRead={true}
                    />
                  </>
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
      {/* {status === "loading" && <Loader allowCancel={false} />} */}

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
};

export default BasketOrderDetailsPage;
