import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

// components
import Loader from "../../components/action-loader/action-loader.component";
import Header from "../../components/header/header.component";
import Icon from "../../components/action-icon/action-icon.component";

// icons
import { RiRefreshLine } from "react-icons/ri";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./notification-page.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function NotificationPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const { notificationId } = useParams();
  const history = useHistory();

  // selectors
  const token = useSelector(selectToken);

  const [notification, setNotification] = useState(null);

  const getNotification = async () => {
    const response = await axios.get(
      `${BASEURL}/notifications/${notificationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotification(response.data.data.notification);
  };

  useEffect(() => {
    getNotification();
    onSelectedChange();
  }, []);

  return (
    <div className={generalStyles.container}>
      {notification ? (
        <>
          <Header>
            <h2>{t("notification-label")}</h2>
            <div
              className={[generalStyles.actions, generalStyles.margin_v_4].join(
                " "
              )}
            >
              <Icon
                selected={false}
                foreColor={Colors.SECONDARY_COLOR}
                tooltip={t("refresh-tooltip")}
                icon={() => <RiRefreshLine />}
                onclick={getNotification}
              />
            </div>
          </Header>

          <div className={styles.content_div}>
            <div className={styles.row}>
              <label>{t("header")}</label>
              <p className={styles.header}>{notification.header}</p>
            </div>

            <div className={styles.row}>
              <label>{t("body")}</label>
              <p className={styles.body}>{notification.body}</p>
            </div>

            {notification.logo_url !== "" && (
              <div
                className={[
                  styles.img,
                  generalStyles.flex_center_container,
                ].join(" ")}
              >
                <img
                  className={styles.image}
                  src={`http://localhost:8000/${notification.logo_url}`}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default NotificationPage;
