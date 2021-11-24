import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReactLoading from "react-loading";

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
  resetNotifications,
  selectUserNotifications,
  setPage,
} from "../../redux/userNotifications/userNotificationsSlice";

// icons
import { RiRefreshLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

// styles
import generalStyles from "../../style.module.scss";
import Icon from "../../components/action-icon/action-icon.component";
import { Colors } from "../../utils/constants";
import Button from "../../components/button/button.component";
import NoContent from "../../components/no-content/no-content.component";
import NotificationRow from "../../components/notification-row/notification-row.component";

function UserNotificationPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const { status, error, page, count, userNotifications } = useSelector(
    selectUserNotifications
  );
  const isOnline = useSelector(selectOnlineStatus);

  const handleSearch = (page) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
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
    dispatch(resetNotifications());
    dispatch(getAllNotifications({ token }));
  };

  const handlePageClick = (e) => {
    const { selected } = e;

    handleSearch(selected + 1);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (userNotifications.length === 0) {
      handleSearch(page);
    }
  }, []);

  return (
    <div className={generalStyles.container}>
      <Header>
        <h2>{t("nav-notifications")}</h2>

        <div
          className={[generalStyles.actions, generalStyles.margin_v_4].join(
            " "
          )}
        >
          {/* Refresh */}
          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={() => {
              refreshHandler();
            }}
            icon={() => <RiRefreshLine />}
          />

          {/* go back */}
          <Icon
            tooltip={t("go-back")}
            onclick={() => {
              history.goBack();
            }}
            icon={() => <IoMdArrowRoundBack size={20} />}
            foreColor={Colors.SECONDARY_COLOR}
          />
        </div>
      </Header>

      {/* <Notifications /> */}

      <div>
        {userNotifications.map((note, index) => (
          <NotificationRow key={note._id} notification={note} index={index} />
        ))}
      </div>

      {userNotifications.length === 0 && status !== "loading" && (
        <NoContent msg={t("no-notifications")} />
      )}

      {status === "loading" && (
        <div className={generalStyles.flex_container}>
          <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
        </div>
      )}

      {userNotifications.length < count && (
        <Button
          text={t("more")}
          action={handleMoreResult}
          bgColor={Colors.SECONDARY_COLOR}
        />
      )}

      {userNotifications.length === count &&
        status !== "loading" &&
        count !== 0 && (
          <p
            className={[generalStyles.center, generalStyles.fc_secondary].join(
              " "
            )}
          >
            {t("no-more")}
          </p>
        )}
    </div>
  );
}

export default UserNotificationPage;
