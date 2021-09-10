import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";

// components
import UserRow from "../../components/user-row/user-row.component";
import NoContent from "../../components/no-content/no-content.component";
import AdminUsersHeader from "../../components/admin-users-header/admin-users-header.component";
import AdminUserTableHeader from "../../components/admin-users-table-header/admin-users-table-header.component";
import AdminUsersNotifications from "../../components/admin-users-notifications/admin-users-notification.component";
import AdminUsersSearchModal from "../../components/admin-search-modal/admin-search-modal.component";
import AdminUsersOrderModal from "../../components/admin-order-modal/admin-order-modal.component";

// 3-party library (loading, paginate)
import ReactPaginate from "react-paginate";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  selectUsers,
  setPage,
  setRefresh,
} from "../../redux/users/usersSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// styles
import paginationStyles from "../../components/pagination.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

// AdminUsers component
function AdminUsersPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { users, status, count, pageState, refresh } = useSelector(selectUsers);
  const { token, user } = useSelector(selectUserData);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModel] = useState(false);

  // handle search
  const handleSearch = (page) => {
    dispatch(setPage(page));
    dispatch(getUsers({ token }));
  };

  // handle for page change in the paginate component
  const handlePageClick = (e) => {
    const { selected } = e;

    handleSearch(selected + 1);

    window.scrollTo(0, 0);
  };

  // handle will pass to Input Component
  // fire when the enter key press
  // start search
  const enterPress = () => {
    handleSearch(1);
    setShowModal(false);
  };

  const searchModalOkHandler = () => {
    setShowModal(false);
    handleSearch(1);
  };

  // dispatch a getUsers after component render for the first time
  useEffect(() => {
    if (refresh) {
      handleSearch(pageState.page);
      dispatch(setRefresh(false));
    }
  }, []);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <>
      <AdminUsersHeader
        count={count}
        pageState={pageState}
        showSearchModalHandler={() => setShowModal(true)}
        showOrderModalHandler={() => setShowOrderModel(true)}
      />

      {count > 0 && <AdminUserTableHeader />}

      {/* Results */}
      {users &&
        users.length > 0 &&
        users.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}

      {count > 0 && isOnline && (
        <ReactPaginate
          previousLabel={t("previous")}
          nextLabel={t("next")}
          pageCount={Math.ceil(count / 9)}
          forcePage={pageState.page - 1}
          onPageChange={handlePageClick}
          containerClassName={paginationStyles.pagination}
          previousLinkClassName={paginationStyles.pagination_link}
          nextLinkClassName={paginationStyles.pagination_link}
          disabledClassName={paginationStyles.pagination_link_disabled}
          activeClassName={paginationStyles.pagination_link_active}
        />
      )}

      {/* show no content div when no user found */}
      {count === 0 && status !== "loading" && (
        <>
          <NoContent msg={t("no-partners-found-message")} />
        </>
      )}

      {/* loading and notifications */}
      <AdminUsersNotifications />

      {/* search modal */}
      {showModal && (
        <AdminUsersSearchModal
          close={() => setShowModal(false)}
          search={searchModalOkHandler}
          enterPress={enterPress}
        />
      )}

      {/* order modal */}
      {showOrderModal && (
        <AdminUsersOrderModal
          close={() => setShowOrderModel(false)}
          okHandler={() => {
            setShowOrderModel(false);
            handleSearch(1);
          }}
        />
      )}
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default AdminUsersPage;
