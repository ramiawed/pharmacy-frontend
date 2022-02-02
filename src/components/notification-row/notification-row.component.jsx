import React, { useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

// react-stuff
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "../../redux/notifications/notificationsSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  decreaseUnreadNotificationsCount,
  setNotificationRead,
} from "../../redux/userNotifications/userNotificationsSlice";

// components
import Modal from "../modal/modal.component";

// icons
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiImage } from "react-icons/bi";
import { BsCheck, BsFillCircleFill } from "react-icons/bs";

// styles
import styles from "./notification-row.module.scss";

// constants
import { Colors, SERVER_URL, UserTypeConstants } from "../../utils/constants";
import { unwrapResult } from "@reduxjs/toolkit";

function NotificationRow({ notification, index, setSuccessDeletingMsg }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showNotificationDetails = () => {
    if (
      user.type !== UserTypeConstants.ADMIN &&
      !notification.users.includes(user._id)
    ) {
      dispatch(
        setNotificationRead({ token, notificationId: notification._id })
      );
      dispatch(decreaseUnreadNotificationsCount());
    }

    history.push(`/notification/${notification._id}`);
  };

  const deleteNotificationHandler = () => {
    setShowDeleteModal(false);
    dispatch(deleteNotification({ id: notification._id, token }))
      .then(unwrapResult)
      .then(() => {
        setSuccessDeletingMsg("delete-notification-msg");
      });
  };

  return (
    <div
      className={[
        styles.row_container,
        !notification.users.includes(user._id) &&
        user.type !== UserTypeConstants.ADMIN
          ? styles.row_unread
          : "",
      ].join(" ")}
      style={{
        animationDuration: (0.3 * index) / 10 + "s",
      }}
    >
      <div className={styles.img}>
        {notification.logo_url !== "" ? (
          <img
            className={styles.image}
            src={`${SERVER_URL}/${notification.logo_url}`}
            alt="thumb"
          />
        ) : (
          <>
            <BiImage size={64} color={Colors.SECONDARY_COLOR} />
          </>
        )}
      </div>

      <div className={styles.inner_container} onClick={showNotificationDetails}>
        <div className={styles.row}>
          <label>{t("header")}</label>
          <p className={styles.header}>{notification.header}</p>
        </div>
        <div className={styles.row}>
          <label>{t("body")}</label>
          <p className={styles.body}>{notification.body}</p>
        </div>
      </div>

      {user.type === UserTypeConstants.ADMIN && (
        <div
          className={styles.delete}
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          <RiDeleteBin5Fill size={24} />
        </div>
      )}

      {showDeleteModal && (
        <Modal
          header="delete-notification"
          cancelLabel="close-label"
          okLabel="ok-label"
          closeModal={() => {
            setShowDeleteModal(false);
          }}
          small={true}
          okModal={deleteNotificationHandler}
          color={Colors.FAILED_COLOR}
        >
          <p>{t("delete-notification-confirm-msg")}</p>
        </Modal>
      )}
    </div>
  );
}

export default NotificationRow;

// {user.type !== UserTypeConstants.ADMIN && (
//   <div className={styles.unread}>
//     {notification.users.includes(user._id) ? (
//       <BsCheck color={Colors.SUCCEEDED_COLOR} size={24} />
//     ) : (
//       <BsFillCircleFill color={Colors.SECONDARY_COLOR} size={24} />
//     )}
//   </div>
// )}
