import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "../../redux/notifications/notificationsSlice";
import { selectToken } from "../../redux/auth/authSlice";

import { useTranslation } from "react-i18next";
import { RiDeleteBin5Fill } from "react-icons/ri";

import styles from "./notification-row.module.scss";
import { Colors } from "../../utils/constants";
import { BiImage } from "react-icons/bi";

function NotificationRow({ notification, index }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  return (
    <div
      className={styles.row_container}
      style={{
        animationDuration: (0.3 * index) / 2 + "s",
      }}
    >
      <div className={styles.img}>
        {notification.logo_url !== "" ? (
          <img
            className={styles.image}
            src={`http://localhost:8000/${notification.logo_url}`}
          />
        ) : (
          <>
            <BiImage size={64} color={Colors.SECONDARY_COLOR} />
          </>
        )}
      </div>
      <div className={styles.inner_container}>
        <div className={styles.row}>
          <label>{t("header")}</label>
          <p>{notification.header}</p>
        </div>
        <div className={styles.row}>
          <label>{t("body")}</label>
          <p className={styles.body}>{notification.body}</p>
        </div>
      </div>
      <div className={styles.delete}>
        <RiDeleteBin5Fill
          size={24}
          onClick={() => {
            dispatch(deleteNotification({ id: notification._id, token }));
          }}
        />
      </div>
    </div>
  );
}

export default NotificationRow;
