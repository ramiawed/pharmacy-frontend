import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/usersSlice";
import { CitiesName, UserTypeConstants } from "../../utils/constants";

import styles from "./admin-users-search-string.module.scss";

function AdminUsersSearchString() {
  const { t } = useTranslation();
  const { pageState } = useSelector(selectUsers);
  return (
    <div className={styles.div_search_str}>
      {pageState.searchName && (
        <>
          <label className={styles.label}>{t("user-name")}:</label>{" "}
          <label className={styles.value}>{pageState.searchName}</label>
        </>
      )}

      {pageState.searchCity !== CitiesName.ALL && (
        <>
          <label className={styles.label}>{t("user-city")}:</label>{" "}
          <label className={styles.value}>{t(pageState.searchCity)}</label>
        </>
      )}

      {pageState.searchEmployeeName && (
        <>
          <label className={styles.label}>{t("user-employee-name")}:</label>{" "}
          <label className={styles.value}>{pageState.searchEmployeeName}</label>
        </>
      )}

      {pageState.searchCertificateName && (
        <>
          <label className={styles.label}>{t("user-certificate-name")}:</label>{" "}
          <label className={styles.value}>
            {pageState.searchCertificateName}
          </label>
        </>
      )}

      {pageState.searchCompanyName && (
        <>
          <label className={styles.label}>{t("user-company-name")}:</label>{" "}
          <label className={styles.value}>{pageState.searchCompanyName}</label>
        </>
      )}

      {pageState.searchJobTitle && (
        <>
          <label className={styles.label}>{t("user-job-title")}:</label>{" "}
          <label className={styles.value}>{pageState.searchJobTitle}</label>
        </>
      )}
    </div>
  );
}

export default AdminUsersSearchString;
