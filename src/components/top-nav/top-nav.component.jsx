import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth/authSlice";

// style
import styles from "./top-nav.module.scss";

function TopNav() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <div className={styles.nav}>
      <div className={styles.start}>
        <p>start 1</p>
      </div>
      <div className={styles.center}>
        <Link to="/" className={styles.link}>
          {t("nav-main-page")}
        </Link>
        <Link to="/companies" className={styles.link}>
          {t("nav-company")}
        </Link>
        <Link to="/warehouses" className={styles.link}>
          {t("nav-warehouse")}
        </Link>
      </div>
      <div className={styles.end}>
        <Link to="/cart" className={styles.link}>
          {t("nav-cart")}
        </Link>
        <Link className={styles.link}>{t("nav-profile")}</Link>
        <p className={styles.link} onClick={() => dispatch(signOut())}>
          {t("nav-sign-out")}
        </p>
      </div>
    </div>
  );
}

export default TopNav;
