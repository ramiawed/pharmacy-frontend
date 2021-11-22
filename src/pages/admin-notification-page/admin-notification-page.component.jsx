import React, { useEffect, useState } from "react";

// 3-party library (loading, paginate)
import ReactPaginate from "react-paginate";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  selectNotifications,
  setPage,
} from "../../redux/notifications/notificationsSlice";
import { selectToken } from "../../redux/auth/authSlice";

// components
import AdminNotificationsHeader from "../../components/admin-notifications-header/admin-notifications-header.component";
import NewNotification from "../../components/new-notification/new-notification.component";
import Notifications from "../../components/notifications/notificatioins.component";
import Loader from "../../components/action-loader/action-loader.component";

// styles
import styles from "./admin-notification-page.module.scss";
import paginationStyles from "../../components/pagination.module.scss";
import generalStyles from "../../style.module.scss";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { useTranslation } from "react-i18next";

function AdminNotificationPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const { status, error, page, count } = useSelector(selectNotifications);
  const isOnline = useSelector(selectOnlineStatus);
  const [isNew, setIsNew] = useState(false);

  const handleSearch = (page) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    dispatch(setPage(page));
    dispatch(getAllNotifications({ token }));
  };

  const handlePageClick = (e) => {
    const { selected } = e;

    handleSearch(selected + 1);

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    handleSearch(page);
  }, []);

  return (
    <div className={generalStyles.container}>
      <AdminNotificationsHeader isNew={isNew} setIsNew={setIsNew} />

      {isNew ? (
        <NewNotification setIsNew={setIsNew} />
      ) : (
        <>
          <Notifications />
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
        </>
      )}
      {status === "loading" && <Loader />}
    </div>
  );
}

export default AdminNotificationPage;
