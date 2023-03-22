import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import Loader from "../../components/action-loader/action-loader.component";
import Header from "../../components/header/header.component";

// styles
import styles from "./notification-page.module.scss";

// constants
import { BASEURL, SERVER_URL } from "../../utils/constants";

function NotificationPage({ onSelectedChange }) {
  const { notificationId } = useParams();

  // selectors
  const token = useSelector(selectToken);

  const [notification, setNotification] = useState(null);

  const getNotification = async () => {
    setNotification(null);
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
  }, [notificationId]);

  return (
    <>
      {notification ? (
        <>
          <Header title="notification label" refreshHandler={getNotification} />

          <MainContentContainer>
            <div className={styles.content_div}>
              <div className={styles.row}>
                <p className={styles.header} style={{ flex: 1 }}>
                  {notification.header}
                </p>
                <p className={styles.date}>{notification.date.split("T")[0]}</p>
              </div>

              <div>
                {notification.logo_url !== "" && (
                  <img
                    className={styles.image}
                    src={`${SERVER_URL}/notifications/${notification.logo_url}`}
                    alt="thumb"
                  />
                )}
                <p className={styles.body}>{notification.body}</p>
              </div>
            </div>
          </MainContentContainer>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default NotificationPage;
