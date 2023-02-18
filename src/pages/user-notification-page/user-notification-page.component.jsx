import React, { useEffect } from "react";
import ReactLoading from "react-loading";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import NotificationRow from "../../components/notification-row/notification-row.component";
import NoContent from "../../components/no-content/no-content.component";
import Button from "../../components/button/button.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { useTranslation } from "react-i18next";
import Header from "../../components/header/header.component";
import {
  getAllNotifications,
  getUnreadNotification,
  resetNotificationsData,
  selectUserNotifications,
  setPage,
  setRefresh,
} from "../../redux/userNotifications/userNotificationsSlice";

// icons

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function UserNotificationPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const isOnline = useSelector(selectOnlineStatus);
  const { status, page, count, userNotifications, refresh, forceRefresh } =
    useSelector(selectUserNotifications);

  const handleSearch = (page) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    if (page === 1) {
      dispatch(resetNotificationsData());
    }
    dispatch(setPage(page));
    dispatch(getAllNotifications({ token }));
  };

  const handleMoreResult = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    handleSearch(page + 1);
  };

  const refreshHandler = () => {
    dispatch(setRefresh(true));
    dispatch(getUnreadNotification({ token }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    onSelectedChange();

    if (refresh || forceRefresh) {
      handleSearch(1);
    }
  }, [refresh, forceRefresh]);

  return (
    <>
      <Header title="nav-notifications" refreshHandler={refreshHandler} />

      <MainContentContainer>
        {userNotifications.map((note, index) => (
          <NotificationRow key={note._id} notification={note} index={index} />
        ))}

        {userNotifications.length === 0 && status !== "loading" && (
          <NoContent msg={t("no-notifications")} />
        )}

        {status === "loading" && (
          <div className={generalStyles.flex_container}>
            <ReactLoading color={Colors.LIGHT_COLOR} type="cylon" />
          </div>
        )}

        {userNotifications.length < count && (
          <Button
            text={t("more")}
            action={handleMoreResult}
            bgColor={Colors.LIGHT_COLOR}
          />
        )}

        {userNotifications.length === count &&
          status !== "loading" &&
          count !== 0 && (
            <p
              className={[
                generalStyles.center,
                generalStyles.fc_secondary,
              ].join(" ")}
            >
              {t("no-more")}
            </p>
          )}
      </MainContentContainer>
    </>
  );
}

export default UserNotificationPage;
