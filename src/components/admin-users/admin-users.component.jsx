import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CompanyRow from "../user-row/user-row.component";
import Header from "../header/header.component";
import Search from "../search/search.component";
// loading
import ReactLoading from "react-loading";

import { getUsers, selectUsers } from "../../redux/users/usersSlice";
import { selectToken } from "../../redux/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

// styles
import styles from "./admin-users.module.scss";
import ReactPaginate from "react-paginate";
import UserRow from "../user-row/user-row.component";

// const companies = [
//   {
//     name: "رامي",
//     username: "رامي",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "ميلا",
//     username: "ميلا",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "سيما",
//     username: "سيما",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: false,
//   },
//   {
//     name: "جورج",
//     username: "جورج",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "عبدالله",
//     username: "عبدالله",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: false,
//     isActive: true,
//   },
//   {
//     name: "جلال",
//     username: "جلال",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: false,
//   },
//   {
//     name: "انعام",
//     username: "انعام",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: false,
//     isActive: false,
//   },
//   {
//     name: "رامي",
//     username: "رامي",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "ميلا",
//     username: "ميلا",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "سيما",
//     username: "سيما",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: false,
//   },
//   {
//     name: "جورج",
//     username: "جورج",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "عبدالله",
//     username: "عبدالله",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: false,
//     isActive: true,
//   },
//   {
//     name: "جلال",
//     username: "جلال",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: false,
//   },
//   {
//     name: "انعام",
//     username: "انعام",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: false,
//     isActive: false,
//   },
//   {
//     name: "رامي",
//     username: "رامي",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "ميلا",
//     username: "ميلا",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "سيما",
//     username: "سيما",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: false,
//   },
//   {
//     name: "جورج",
//     username: "جورج",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: true,
//   },
//   {
//     name: "عبدالله",
//     username: "عبدالله",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: false,
//     isActive: true,
//   },
//   {
//     name: "جلال",
//     username: "جلال",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: true,
//     isActive: false,
//   },
//   {
//     name: "انعام",
//     username: "انعام",
//     email: "ramiawed@gmail.com",
//     phone: "٠٢١١٢٣",
//     mobile: "٠٩٣٢١٢٣١٢٣",
//     isApprove: false,
//     isActive: false,
//   },
// ];

function AdminUsers({ type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, status, count } = useSelector(selectUsers);
  const token = useSelector(selectToken);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        getUsers({
          type: type,
          token: token,
          page: 1,
          name: searchValue,
        })
      );
    };

    fetchData();
  }, [dispatch, token]);

  // handle to the page change
  const handlePageClick = (e) => {
    const { selected } = e;

    dispatch(
      getUsers({
        type: "Company",
        token: token,
        page: selected + 1,
        name: searchValue,
      })
    );
  };

  // handle will pass to Input Component
  // fire when the enter key presses
  // start search
  const enterPress = () => {
    dispatch(
      getUsers({
        type: "Company",
        token: token,
        page: 1,
        name: searchValue,
      })
    );
  };

  return (
    <>
      <div className={styles.fixed_position}>
        <div className={styles.header_div}>
          <Header>
            <h2>{t("nav-company")}</h2>
          </Header>

          <div className={styles.search_div}>
            <Search
              value={searchValue}
              onchange={(e) => {
                setSearchValue(e.target.value);
              }}
              onEnterPress={enterPress}
            />
          </div>
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

      {status === "loading" && (
        <div className={styles.loading}>
          <ReactLoading color="#6172ac" type="bubbles" height={50} width={50} />
        </div>
      )}

      <div className={styles.rows}>
        {users?.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </div>

      {count && (
        <ReactPaginate
          previousLabel={"→ السابق"}
          nextLabel={"التالي ←"}
          pageCount={Math.ceil(count / 4)}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          previousLinkClassName={styles.pagination_link}
          nextLinkClassName={styles.pagination_link}
          disabledClassName={styles.pagination_link_disabled}
          activeClassName={styles.pagination_link_active}
        />
      )}
    </>
  );
}

export default AdminUsers;
