import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { setForceRefresh, selectOrders } from "../../redux/orders/ordersSlice";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

// socket
import socketIoClient from "socket.io-client";
const socket = socketIoClient("http://localhost:8000/", { autoConnect: false });

function SocketObserver() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const user = useSelector(selectUser);
  const { orders } = useSelector(selectOrders);

  // own state
  const [orderStateMsg, setOrderStateMsg] = useState("");

  useEffect(() => {
    console.log(orders);

    // order observer
    socket.on("order-changed", (data) => {
      console.log(data);
      if (data.operationType === "insert") {
        if (
          user.type === UserTypeConstants.ADMIN ||
          (user.type === UserTypeConstants.WAREHOUSE &&
            user._id === data.fullDocument.warehouse)
        ) {
          dispatch(setForceRefresh(true));
          setOrderStateMsg("add-order");
        }
      }

      if (data.operationType === "delete") {
        if (orders.length > 0) {
          const deletedOrder = orders.filter((o) => {
            return o._id == data.documentKey._id;
          });

          // console.log(deletedOrder);
          if (deletedOrder.length > 0) {
            dispatch(setForceRefresh(true));
            setOrderStateMsg("delete-order");
          }
        }
      }

      if (data.operationType === "update") {
      }
    });

    socket.connect();
  }, [orders]);
  return (
    <>
      {orderStateMsg.length > 0 && (
        <Toast
          bgColor={Colors.SECONDARY_COLOR}
          foreColor="#fff"
          toastText={t(orderStateMsg)}
          actionAfterTimeout={() => setOrderStateMsg("")}
        />
      )}
    </>
  );
}

export default SocketObserver;
