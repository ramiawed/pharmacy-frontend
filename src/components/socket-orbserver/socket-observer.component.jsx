import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { authSliceSignOut, selectUserData } from "../../redux/auth/authSlice";
import {
  setForceRefresh,
  selectOrders,
  getUnreadOrders,
  updateOrderStatus,
  deleteOrderSocket,
  orderSliceSignOut,
} from "../../redux/orders/ordersSlice";
import {
  advertisementsSignOut,
  setForceRefresh as advertisementForceRefresh,
} from "../../redux/advertisements/advertisementsSlice";
import {
  getUnreadNotification,
  setForceRefresh as notificationForceRefresh,
  usersNotificationsSignOut,
} from "../../redux/userNotifications/userNotificationsSlice";

// constants
import { Colors, SERVER_URL, UserTypeConstants } from "../../utils/constants";

// socket
import socketIoClient from "socket.io-client";
import NotificationToast from "../notification-toast/notification-toast.component";
import {
  settingsSignOut,
  socketUpdateSettings,
} from "../../redux/settings/settingsSlice";
import { cartSliceSignOut } from "../../redux/cart/cartSlice";
import { companySliceSignOut } from "../../redux/company/companySlice";
import { favoritesSliceSignOut } from "../../redux/favorites/favoritesSlice";
import { itemsSliceSignOut } from "../../redux/items/itemsSlices";
import { statisticsSliceSignOut } from "../../redux/statistics/statisticsSlice";
import { usersSliceSignOut } from "../../redux/users/usersSlice";
import { warehouseSliceSignOut } from "../../redux/warehouse/warehousesSlice";
import { warehouseItemsSliceSignOut } from "../../redux/warehouseItems/warehouseItemsSlices";
import {
  medicinesSliceSignOut,
  resetMedicines,
} from "../../redux/medicines/medicinesSlices";
import { companiesSectionOneSignOut } from "../../redux/advertisements/companiesSectionOneSlice";
import { companiesSectionTwoSignOut } from "../../redux/advertisements/companiesSectionTwoSlice";
import { itemsSectionOneSignOut } from "../../redux/advertisements/itemsSectionOneSlice";
import { itemsSectionThreeSignOut } from "../../redux/advertisements/itemsSectionThreeSlice";
import { itemsSectionTwoSignOut } from "../../redux/advertisements/itemsSectionTwoSlice";
import { warehousesSectionOneSignOut } from "../../redux/advertisements/warehousesSectionOneSlice";
import { notificationsSignOut } from "../../redux/notifications/notificationsSlice";
const socket = socketIoClient(`${SERVER_URL}`, { autoConnect: false });

function SocketObserver() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);

  // own state
  const [orderStateMsg, setOrderStateMsg] = useState("");
  const [notificationData, setNotificationData] = useState(null);
  const [advertisementStateMsg, setAdvertisementStateMsg] = useState("");
  useState("");

  const handleSignOut = () => {
    dispatch(authSliceSignOut());
    dispatch(cartSliceSignOut());
    dispatch(companySliceSignOut());
    dispatch(favoritesSliceSignOut());
    dispatch(itemsSliceSignOut());
    dispatch(statisticsSliceSignOut());
    dispatch(usersSliceSignOut());
    dispatch(warehouseSliceSignOut());
    dispatch(warehouseItemsSliceSignOut());
    dispatch(orderSliceSignOut());
    dispatch(resetMedicines());
    dispatch(advertisementsSignOut());
    dispatch(companiesSectionOneSignOut());
    dispatch(companiesSectionTwoSignOut());
    dispatch(itemsSectionOneSignOut());
    dispatch(itemsSectionThreeSignOut());
    dispatch(itemsSectionTwoSignOut());
    dispatch(warehousesSectionOneSignOut());
    dispatch(medicinesSliceSignOut());
    dispatch(notificationsSignOut());
    dispatch(settingsSignOut());
    dispatch(usersNotificationsSignOut());
  };

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

    // settings change observer
    if (user.type !== UserTypeConstants.ADMIN) {
      socket.on("settings-changed", (data) => {
        console.log(data);
        dispatch(socketUpdateSettings(data.updateDescription.updatedFields));
      });
    }

    // sign out observer
    socket.on("user-sign-out", (data) => {
      if (user._id === data) {
        handleSignOut();
      }
    });

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
