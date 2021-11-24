import React from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

// react-stuff
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "../../redux/notifications/notificationsSlice";
import { selectUserData } from "../../redux/auth/authSlice";

// icons
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiImage } from "react-icons/bi";
import { BsCheck, BsFillCircleFill } from "react-icons/bs";

// styles
import styles from "./notification-row.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";
import { setNotificationRead } from "../../redux/userNotifications/userNotificationsSlice";

function NotificationRow({ notification, index }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { token, user } = useSelector(selectUserData);

  const showNotificationDetails = () => {
    if (
      user.type !== UserTypeConstants.ADMIN &&
      !notification.users.includes(user._id)
    ) {
      dispatch(
        setNotificationRead({ token, notificationId: notification._id })
      );
    }

    history.push(`/notification/${notification._id}`);
  };

  return (
    <div
      className={styles.row_container}
      style={{
        animationDuration: (0.3 * index) / 10 + "s",
      }}
      onClick={showNotificationDetails}
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

      {user.type === UserTypeConstants.ADMIN && (
        <div className={styles.delete}>
          <RiDeleteBin5Fill
            size={24}
            onClick={() => {
              dispatch(deleteNotification({ id: notification._id, token }));
            }}
          />
        </div>
      )}

      {user.type !== UserTypeConstants.ADMIN && (
        <div className={styles.unread}>
          {notification.users.includes(user._id) ? (
            <BsCheck color={Colors.SUCCEEDED_COLOR} size={24} />
          ) : (
            <BsFillCircleFill color={Colors.SECONDARY_COLOR} size={24} />
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationRow;
