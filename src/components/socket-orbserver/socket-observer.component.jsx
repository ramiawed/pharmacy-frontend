import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  setForceRefresh,
  selectOrders,
  getUnreadOrders,
  updateOrderStatus,
  deleteOrderSocket,
} from "../../redux/orders/ordersSlice";
import { setForceRefresh as advertisementForceRefresh } from "../../redux/advertisements/advertisementsSlice";
import {
  getUnreadNotification,
  setForceRefresh as notificationForceRefresh,
} from "../../redux/userNotifications/userNotificationsSlice";

// constants
import { Colors, SERVER_URL, UserTypeConstants } from "../../utils/constants";

// socket
import socketIoClient from "socket.io-client";
import NotificationToast from "../notification-toast/notification-toast.component";
const socket = socketIoClient(`${SERVER_URL}`, { autoConnect: false });

function SocketObserver() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);
  const { orders } = useSelector(selectOrders);

  // own state
  const [orderStateMsg, setOrderStateMsg] = useState("");
  const [notificationData, setNotificationData] = useState(null);
  const [advertisementStateMsg, setAdvertisementStateMsg] = useState("");
  useState("");

  useEffect(() => {
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
          dispatch(getUnreadOrders({ token }));
        }
      }

      if (data.operationType === "delete") {
        dispatch(deleteOrderSocket({ id: data.documentKey._id }));
        setOrderStateMsg("delete-order");
      }

      if (data.operationType === "update") {
        console.log("update");
        dispatch(
          updateOrderStatus({
            id: data.documentKey._id,
            fields: data.updateDescription.updatedFields,
          })
        );
      }
    });

    socket.on("advertisement-changed", (data) => {
      console.log(data);
      if (data.operationType === "insert") {
        dispatch(advertisementForceRefresh(true));
        setAdvertisementStateMsg("add-advertisement");
      }
    });

    if (user.type !== UserTypeConstants.ADMIN) {
      socket.on("notification-changed", (data) => {
        console.log(data);
        if (data.operationType === "insert") {
          dispatch(notificationForceRefresh(true));
          dispatch(getUnreadNotification({ token }));
          setNotificationData(data.fullDocument);
        }

        if (data.operationType === "delete") {
          dispatch(notificationForceRefresh(true));
          dispatch(getUnreadNotification({ token }));
        }
      });
    }

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

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

      {notificationData !== null && (
        <NotificationToast
          bgColor={Colors.SECONDARY_COLOR}
          foreColor={Colors.SECONDARY_COLOR}
          actionAfterTimeout={() => {
            setNotificationData(null);
          }}
          close={() => setNotificationData(null)}
          data={notificationData}
        />
      )}
    </>
  );
}

export default SocketObserver;
