import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// components
import Header from "../header/header.component";
import Search from "../search/search.component";
import UserRow from "../user-row/user-row.component";
import SelectCustom from "../select/select.component";
import Checkbox from "../checkbox/checkbox.component";
import Toast from "../toast/toast.component";

// 3-party library (loading, paginate)
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";

// redux stuff
import { getUsers, selectUsers } from "../../redux/users/usersSlice";
import { selectToken } from "../../redux/auth/authSlice";
import {
  selectActivationDeleteStatus,
  selectActivationDeleteMsg,
  resetActivationDeleteStatus,
} from "../../redux/users/usersSlice";

// styles
import styles from "./admin-users.module.scss";

// AdminUsers component
function AdminUsers() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("All");
  // own state
  const [searchName, setSearchName] = useState("");
  const [initialPage, setInitialPage] = useState(0);

  // own state for user state (approved, notApproved, active, notActive)
  const [userState, setUserState] = useState({
    approved: false,
    notApproved: false,
    active: false,
    notActive: false,
  });

  const activationDeleteStatus = useSelector(selectActivationDeleteStatus);
  const activationDeleteMessage = useSelector(selectActivationDeleteMsg);

  // handle user state changed
  const handleUserStateChange = (state) => {
    if (state === "approved") {
      setUserState({
        ...userState,
        approved: !userState.approved,
        notApproved: false,
      });
    } else if (state === "notApproved") {
      setUserState({
        ...userState,
        approved: false,
        notApproved: !userState.notApproved,
      });
    } else if (state === "active") {
      setUserState({
        ...userState,
        active: !userState.active,
        notActive: false,
      });
    } else if (state === "notActive") {
      setUserState({
        ...userState,
        active: false,
        notActive: !userState.notActive,
      });
    }
  };

  const typeOptions = [
    { value: "Company", label: t("company") },
    { value: "Warehouse", label: t("warehouse") },
    { value: "Normal", label: t("normal") },
    { value: "Pharmacy", label: t("pharmacy") },
    { value: "Admin", label: t("admin") },
    { value: "All", label: t("all") },
  ];

  const handleSearchTypeChange = (val) => {
    setUserType(val);
  };

  // selectors
  const { users, status, count } = useSelector(selectUsers);
  const token = useSelector(selectToken);

  // handle search
  const handleSearch = (page) => {
    const queryString = {};

    queryString.page = page;

    if (userType !== "All") {
      queryString.type = userType;
    }

    if (searchName.trim().length !== 0) {
      queryString.name = searchName.trim();
    }

    if (userState.approved) {
      queryString.approve = true;
    }

    if (userState.notApproved) {
      queryString.approve = false;
    }

    if (userState.active) {
      queryString.active = true;
    }

    if (userState.notActive) {
      queryString.active = false;
    }

    // console.log(queryString);

    dispatch(getUsers({ queryString, token }));
    setInitialPage(page - 1);
  };

  useEffect(() => {
    handleSearch(1);
  }, []);

  // handle to the page change
  const handlePageClick = (e) => {
    const { selected } = e;
    handleSearch(selected + 1);
    setInitialPage(selected);
  };

  // handle will pass to Input Component
  // fire when the enter key presses
  // start search
  const enterPress = () => {
    handleSearch(1);
    setInitialPage(0);
  };

  return (
    <>
      <div className={styles.fixed_position}>
        <div className={styles.header_div}>
          <Header>
            <h2>{t("partners")}</h2>
          </Header>
        </div>

        <div className={styles.search_engines}>
          <div className={styles.search_div}>
            <Search
              value={searchName}
              onchange={(e) => {
                setSearchName(e.target.value);
              }}
              onEnterPress={enterPress}
            />
          </div>

          <div className={styles.search_div}>
            <SelectCustom
              bgColor="#6172ac"
              foreColor="#fff"
              orderOptions={typeOptions}
              onchange={handleSearchTypeChange}
              defaultOption={{
                value: userType,
                label: t(userType.toLowerCase()),
              }}
              caption="user-type"
            />
          </div>

          <div className={styles.search_div}>
            <div>
              <label style={{ marginLeft: 10 }}>
                <span style={{ margin: 2 }}>مفعل</span>
                <Checkbox
                  checked={userState.approved}
                  onChange={() => handleUserStateChange("approved")}
                />
              </label>

              <label style={{ marginLeft: 10 }}>
                <span style={{ margin: 2 }}>غير مفعل</span>
                <Checkbox
                  checked={userState.notApproved}
                  onChange={() => handleUserStateChange("notApproved")}
                />
              </label>
            </div>
          </div>
          <div className={styles.search_div}>
            <div>
              <label style={{ marginLeft: 10 }}>
                <span style={{ margin: 2 }}>غير محذوف</span>
                <Checkbox
                  checked={userState.active}
                  onChange={() => handleUserStateChange("active")}
                />
              </label>

              <label style={{ marginLeft: 10 }}>
                <span style={{ margin: 2 }}>محذوف</span>
                <Checkbox
                  checked={userState.notActive}
                  onChange={() => handleUserStateChange("notActive")}
                />
              </label>
            </div>
          </div>
          <button
            onClick={() => handleSearch(1)}
            className={styles.search_button}
          >
            {t("search")}
          </button>
        </div>

        <div className={styles.table_header_div}>
          <label className={styles.label_large}>{t("user-name")}</label>
          {/* <label>{t("user-username")}</label> */}
          <label className={styles.label_small}>{t("user-approve")}</label>
          <label className={styles.label_small}>{t("user-delete")}</label>
          <label className={styles.label_large}>{t("user-email")}</label>
          <label className={styles.label_medium}>{t("user-phone")}</label>
          <label className={styles.label_medium}>{t("user-mobile")}</label>
          <label className={styles.label_xsmall}>{t("user-action")}</label>
        </div>
      </div>

      <div className={styles.behind_fixed_position}></div>

      {/* loading components when retrieve the result from DB */}
      {status === "loading" && (
        <div className={styles.loading}>
          <ReactLoading color="#6172ac" type="bubbles" height={50} width={50} />
        </div>
      )}

      {/* Results */}
      <div className={styles.rows}>
        {users?.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </div>

      {count > 0 ? (
        <ReactPaginate
          previousLabel={"→ السابق"}
          nextLabel={"التالي ←"}
          pageCount={Math.ceil(count / 4)}
          forcePage={initialPage}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          previousLinkClassName={styles.pagination_link}
          nextLinkClassName={styles.pagination_link}
          disabledClassName={styles.pagination_link_disabled}
          activeClassName={styles.pagination_link_active}
        />
      ) : (
        <p style={{ textAlign: "center", padding: "16px" }}>
          {t("no-partners-found-message")}
        </p>
      )}

      {activationDeleteStatus === "success" ? (
        <Toast
          bgColor="rgb(100, 175, 100)"
          foreColor="#fff"
          toastText={t(activationDeleteMessage)}
          actionAfterTimeout={() => {
            dispatch(resetActivationDeleteStatus());
            handleSearch(initialPage + 1);
          }}
        />
      ) : activationDeleteStatus === "failed" ? (
        <Toast
          bgColor="rgb(255, 100, 100)"
          foreColor="#000"
          toastText={t(activationDeleteMessage)}
          actionAfterTimeout={() => dispatch(resetActivationDeleteStatus())}
        />
      ) : null}
    </>
  );
}

export default AdminUsers;
