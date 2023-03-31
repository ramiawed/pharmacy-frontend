import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { authSliceSignOut, selectUserData } from "../../redux/auth/authSlice";
import {
  orderDeletedSocket,
  orderSliceSignOut,
  orderInsertedSocket,
  orderUpdatedSocket,
  basketOrderInsertedSocket,
  basketOrderUpdatedSocket,
  basketOrderDeletedSocket,
  selectOrders,
  resetSocketMsg,
} from "../../redux/orders/ordersSlice";
import {
  addAdvertisementSocket,
  advertisementsSignOut,
  deleteAdvertisementSocket,
  // setForceRefresh as advertisementForceRefresh,
} from "../../redux/advertisements/advertisementsSlice";
import {
  getUnreadNotification,
  setForceRefresh as notificationForceRefresh,
  usersNotificationsSignOut,
} from "../../redux/userNotifications/userNotificationsSlice";
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
import { usersSliceSignOut, setRefresh } from "../../redux/users/usersSlice";
import { warehouseSliceSignOut } from "../../redux/warehouse/warehousesSlice";
import {
  medicinesSliceSignOut,
  resetMedicines,
} from "../../redux/medicines/medicinesSlices";
import {
  addCompanyToSectionOneSocket,
  companiesSectionOneSignOut,
  removeCompanyFromSectionOneSocket,
} from "../../redux/advertisements/companiesSectionOneSlice";
import {
  addCompanyToSectionTwoSocket,
  companiesSectionTwoSignOut,
  removeCompanyFromSectionTwoSocket,
} from "../../redux/advertisements/companiesSectionTwoSlice";
import {
  addItemToSectionOneSocket,
  itemsSectionOneSignOut,
  removeItemFromSectionOneSocket,
} from "../../redux/advertisements/itemsSectionOneSlice";
import {
  addItemToSectionThreeSocket,
  itemsSectionThreeSignOut,
  removeItemFromSectionThreeSocket,
} from "../../redux/advertisements/itemsSectionThreeSlice";
import {
  addItemToSectionTwoSocket,
  itemsSectionTwoSignOut,
  removeItemFromSectionTwoSocket,
} from "../../redux/advertisements/itemsSectionTwoSlice";
import {
  addWarehouseToSectionOneSocket,
  removeWarehouseToSectionOneSocket,
  warehousesSectionOneSignOut,
} from "../../redux/advertisements/warehousesSectionOneSlice";
import { notificationsSignOut } from "../../redux/notifications/notificationsSlice";

// constants
import { Colors, SERVER_URL, UserTypeConstants } from "../../utils/constants";

// socket
import socketIoClient from "socket.io-client";
import { savedItemsSliceSignOut } from "../../redux/savedItems/savedItemsSlice";
import { basketsSliceSignOut } from "../../redux/baskets/basketsSlice";
import { useLocation } from "react-router-dom";
import { itemsWithPointsSliceSignOut } from "../../redux/itemsWithPoints/itemsWithPointsSlices";

const socket = socketIoClient(`${SERVER_URL}`, { autoConnect: false });

function SocketObserver() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  // selectors
  const { user, token } = useSelector(selectUserData);
  const { socketMsg } = useSelector(selectOrders);

  // own state
  const [orderStateMsg, setOrderStateMsg] = useState("");
  const [notificationData, setNotificationData] = useState(null);
  const [userAddedMsg, setUserAddedMsg] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignOut = () => {
    dispatch(authSliceSignOut());
    dispatch(cartSliceSignOut());
    dispatch(companySliceSignOut());
    dispatch(favoritesSliceSignOut());
    dispatch(itemsSliceSignOut());
    dispatch(statisticsSliceSignOut());
    dispatch(usersSliceSignOut());
    dispatch(warehouseSliceSignOut());
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
    dispatch(savedItemsSliceSignOut());
    dispatch(basketsSliceSignOut());
    dispatch(itemsWithPointsSliceSignOut());
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // orders observer
    socket.on("order-inserted", (data) => {
      if (
        user.type === UserTypeConstants.ADMIN ||
        (user.type === UserTypeConstants.WAREHOUSE &&
          data.warehouse._id === user._id)
      ) {
        if (location.pathname === "/orders") {
          dispatch(orderInsertedSocket(data));
        }
        setMsg("order inserted from socket");
      }
    });

    socket.on("order-updated", (data) => {
      if (
        user.type === UserTypeConstants.ADMIN ||
        (user.type === UserTypeConstants.PHARMACY &&
          user._id === data.pharmacy._id) ||
        (user.type === UserTypeConstants.WAREHOUSE &&
          user._id === data.warehouse._id)
      ) {
        dispatch(orderUpdatedSocket(data));
        setMsg("order updated from socket");
      }
    });

    socket.on("order-deleted", (data) => {
      if (
        user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.WAREHOUSE
      ) {
        dispatch(orderDeletedSocket(data));
        setMsg("order deleted from socket");
      }
    });

    socket.on("basket-order-inserted", (data) => {
      if (
        user.type === UserTypeConstants.ADMIN ||
        (user.type === UserTypeConstants.WAREHOUSE &&
          data.warehouse._id === user._id)
      ) {
        if (location.pathname === "/orders") {
          dispatch(basketOrderInsertedSocket(data));
        }
        setMsg("basket order inserted from socket");
      }
    });

    socket.on("basket-order-updated", (data) => {
      if (
        user.type === UserTypeConstants.ADMIN ||
        (user.type === UserTypeConstants.PHARMACY &&
          user._id === data.pharmacy._id) ||
        (user.type === UserTypeConstants.WAREHOUSE &&
          user._id === data.warehouse._id)
      ) {
        dispatch(basketOrderUpdatedSocket(data));
        setMsg("basket order updated from socket");
      }
    });

    socket.on("basket-order-deleted", (data) => {
      if (
        user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.WAREHOUSE
      ) {
        dispatch(basketOrderDeletedSocket(data));
      }
    });

    // advertisements observer
    socket.on("new-advertisement", (data) => {
      dispatch(addAdvertisementSocket({ data }));
    });

    socket.on("delete-advertisement", (data) => {
      dispatch(deleteAdvertisementSocket({ data }));
    });

    // notifications observer
    if (user.type !== UserTypeConstants.ADMIN) {
      socket.on("notification-changed", (data) => {
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
        dispatch(socketUpdateSettings(data.updateDescription.updatedFields));
      });
    }

    // sign out observer
    socket.on("user-sign-out", (data) => {
      if (user._id === data) {
        handleSignOut();
      }
    });

    // new user
    if (user.type === UserTypeConstants.ADMIN) {
      socket.on("user-added", (data) => {
        setUserAddedMsg("new user added");
        dispatch(setRefresh(true));
      });
    }

    // user section one and two observer
    if (user.type !== UserTypeConstants.ADMIN) {
      socket.on("user-added-to-section-one", (data) => {
        dispatch(addCompanyToSectionOneSocket(data));
      });

      socket.on("user-added-to-section-two", (data) => {
        dispatch(addCompanyToSectionTwoSocket(data));
      });

      socket.on("warehouse-added-to-section-one", (data) => {
        dispatch(addWarehouseToSectionOneSocket(data));
      });

      socket.on("user-removed-from-section-one", (data) => {
        dispatch(removeCompanyFromSectionOneSocket(data));
      });

      socket.on("user-removed-from-section-two", (data) => {
        dispatch(removeCompanyFromSectionTwoSocket(data));
      });

      socket.on("warehouse-removed-from-section-one", (data) => {
        dispatch(removeWarehouseToSectionOneSocket(data));
      });

      socket.on("item-added-to-section-one", (data) => {
        dispatch(addItemToSectionOneSocket(data));
      });

      socket.on("item-removed-from-section-one", (data) => {
        dispatch(removeItemFromSectionOneSocket(data));
      });

      socket.on("item-added-to-section-two", (data) => {
        dispatch(addItemToSectionTwoSocket(data));
      });

      socket.on("item-removed-from-section-two", (data) => {
        dispatch(removeItemFromSectionTwoSocket(data));
      });

      socket.on("item-added-to-section-three", (data) => {
        dispatch(addItemToSectionThreeSocket(data));
      });

      socket.on("item-removed-from-section-three", (data) => {
        dispatch(removeItemFromSectionThreeSocket(data));
      });
    }

    // item bonus change, or item added or removed from warehouse
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.ADMIN
    ) {
      // socket.on("warehouse-add-bonus", (data) => {
      //   dispatch(warehouseAddBonusSocket(data));
      //   if (user.type === UserTypeConstants.ADMIN) {
      //     dispatch(warehouseAddBonusSocketItemsSlice(data));
      //   }
      // });
      // socket.on("warehouse-add-or-delete-item", (data) => {
      //   dispatch(warehouseAddOrRemoveItemSocket(data));
      //   if (user.type === UserTypeConstants.ADMIN) {
      //     dispatch(warehouseAddOrRemoveItemSocketItemsSlice(data));
      //   }
      // });
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
          bgColor={Colors.LIGHT_COLOR}
          foreColor="#fff"
          toastText={t(orderStateMsg)}
          actionAfterTimeout={() => setOrderStateMsg("")}
        />
      )}

      {msg.length > 0 && (
        <Toast
          bgColor={Colors.LIGHT_COLOR}
          foreColor={Colors.WHITE_COLOR}
          toastText={t(msg)}
          actionAfterTimeout={() => setMsg("")}
        />
      )}

      {socketMsg.length > 0 && (
        <Toast
          bgColor={Colors.LIGHT_COLOR}
          foreColor={Colors.WHITE_COLOR}
          toastText={t(`${socketMsg}`)}
          actionAfterTimeout={() => dispatch(resetSocketMsg())}
        />
      )}

      {userAddedMsg.length > 0 && (
        <Toast
          bgColor={Colors.LIGHT_COLOR}
          foreColor="#fff"
          toastText={t(userAddedMsg)}
          actionAfterTimeout={() => setUserAddedMsg("")}
        />
      )}

      {notificationData !== null && (
        <NotificationToast
          bgColor={Colors.LIGHT_COLOR}
          foreColor={Colors.LIGHT_COLOR}
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
