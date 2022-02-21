import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";

// 3-party library (loading, paginate)
import ReactPaginate from "react-paginate";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  resetError,
  selectNotifications,
  setPage,
} from "../../redux/notifications/notificationsSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import AdminNotificationsHeader from "../../components/admin-notifications-header/admin-notifications-header.component";
import NewNotification from "../../components/new-notification/new-notification.component";
import Loader from "../../components/action-loader/action-loader.component";
import NotificationRow from "../../components/notification-row/notification-row.component";
import NoContent from "../../components/no-content/no-content.component";

// styles
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";
import Toast from "../../components/toast/toast.component";

function AdminNotificationPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { status, error, page, count, notifications } =
    useSelector(selectNotifications);
  const isOnline = useSelector(selectOnlineStatus);

  // own state
  const [isNew, setIsNew] = useState(false);
  const [successAddingNewNotificationMsg, setSuccessAddingNewNotificationMsg] =
    useState("");
  const [successDeletingNotificationMsg, setSuccessDeletingNotificationMsg] =
    useState("");

  const handleSearch = (page) => {
    dispatch(setPage(page));
    dispatch(getAllNotifications({ token }));
  };

  const handlePageClick = (e) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    const { selected } = e;

    handleSearch(selected + 1);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    onSelectedChange();

    handleSearch(page);
  }, []);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <div className={generalStyles.container}>
      <AdminNotificationsHeader isNew={isNew} setIsNew={setIsNew} />

      {isNew ? (
        <NewNotification
          setIsNew={setIsNew}
          setSuccessAddingMsg={setSuccessAddingNewNotificationMsg}
          setSuccessDeletingMsg={setSuccessDeletingNotificationMsg}
        />
      ) : (
        <>
          {notifications.map((note, index) => (
            <NotificationRow
              key={note._id}
              notification={note}
              index={index}
              setSuccessDeletingMsg={setSuccessDeletingNotificationMsg}
            />
          ))}

          {count > 0 && isOnline && (
            <ReactPaginate
              previousLabel={t("previous")}
              nextLabel={t("next")}
              pageCount={Math.ceil(count / 9)}
              forcePage={page - 1}
              onPageChange={handlePageClick}
              containerClassName={paginationStyles.pagination}
              previousLinkClassName={paginationStyles.pagination_link}
              nextLinkClassName={paginationStyles.pagination_link}
              disabledClassName={paginationStyles.pagination_link_disabled}
              activeClassName={paginationStyles.pagination_link_active}
            />
          )}

          {notifications.length === 0 && status !== "loading" && (
            <NoContent msg={t("no-notifications")} />
          )}

          {error && (
            <Toast
              bgColor={Colors.FAILED_COLOR}
              foreColor="#fff"
              toastText={t(error)}
              actionAfterTimeout={() => dispatch(resetError())}
            />
          )}
        </>
      )}

      {status === "loading" && <Loader />}

      {successAddingNewNotificationMsg && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t(successAddingNewNotificationMsg)}
          actionAfterTimeout={() => setSuccessAddingNewNotificationMsg("")}
        />
      )}

      {successDeletingNotificationMsg && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t(successDeletingNotificationMsg)}
          actionAfterTimeout={() => setSuccessDeletingNotificationMsg("")}
        />
      )}
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default AdminNotificationPage;
