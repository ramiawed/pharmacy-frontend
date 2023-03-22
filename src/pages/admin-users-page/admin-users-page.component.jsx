import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";

// components
import AdminUsersNotifications from "../../components/admin-users-notifications/admin-users-notification.component";
import AdminUserTableHeader from "../../components/admin-users-table-header/admin-users-table-header.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import AdminUsersActions from "../../components/admin-users-actions/admin-users-actions.component";
import AdminUsersSearchModal from "../../modals/admin-search-modal/admin-search-modal.component";
import AdminUsersOrderModal from "../../modals/admin-order-modal/admin-order-modal.component";
import NoContent from "../../components/no-content/no-content.component";
import UserRow from "../../components/user-row/user-row.component";
import Header from "../../components/header/header.component";

// 3-party library (loading, paginate)
import ReactPaginate from "react-paginate";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { getUsers, selectUsers, setPage } from "../../redux/users/usersSlice";
import { selectUserData } from "../../redux/auth/authSlice";

// styles
import paginationStyles from "../../components/pagination.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

// AdminUsers component
function AdminUsersPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { users, status, count, pageState, refresh } = useSelector(selectUsers);
  const { token, user } = useSelector(selectUserData);

  // modal state
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showOrderModal, setShowOrderModel] = useState(false);

  // handle search
  const handleSearch = (page) => {
    // if (!isOnline) {
    //   dispatch(changeOnlineMsg());
    //   return;
    // }

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
    // if (!isOnline) {
    //   dispatch(changeOnlineMsg());
    //   return;
    // }

    handleSearch(1);
    setShowSearchModal(false);
  };

  const refreshHandler = () => {
    // if (!isOnline) {
    //   dispatch(changeOnlineMsg());
    //   return;
    // }

    handleSearch(pageState.page);
    setShowSearchModal(false);
  };

  const searchModalOkHandler = () => {
    setShowSearchModal(false);
    handleSearch(1);
  };

  // dispatch a getUsers after component render for the first time
  useEffect(() => {
    if (refresh === true) {
      handleSearch(1);
    }

    window.scrollTo(0, 0);

    onSelectedChange();
  }, [refresh]);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <>
      <Header title="partners" count={count} />

      <MainContentContainer>
        <AdminUsersActions
          refreshHandler={refreshHandler}
          pageState={pageState}
          showSearchModalHandler={() => setShowSearchModal(true)}
          showOrderModalHandler={() => setShowOrderModel(true)}
        />

        {count > 0 && <AdminUserTableHeader />}

        {/* Results */}
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <UserRow key={user._id} user={user} index={index} />
          ))}

        {count > 0 && (
          <ReactPaginate
            previousLabel={t("previous")}
            nextLabel={t("next")}
            pageCount={Math.ceil(count / 15)}
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
          <NoContent msg={t("no-partners-found-message")} />
        )}

        {/* loading and notifications */}
        <AdminUsersNotifications refreshHandler={refreshHandler} />

        {/* search modal */}
        {showSearchModal && (
          <AdminUsersSearchModal
            close={() => setShowSearchModal(false)}
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
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default AdminUsersPage;
