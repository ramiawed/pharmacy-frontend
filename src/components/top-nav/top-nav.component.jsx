import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// style
import styles from "./top-nav.module.scss";

function TopNav() {
  const { t } = useTranslation();

  return (
    <div className={styles.nav}>
      <div className={styles.start}>
        <p>start 1</p>
      </div>
      <div className={styles.center}>
        <Link className={styles.link}>{t("nav-main-page")}</Link>
        <Link className={styles.link}>{t("nav-company")}</Link>
        <Link className={styles.link}>{t("nav-warehouse")}</Link>
      </div>
      <div className={styles.end}>
        <Link className={styles.link}>{t("nav-cart")}</Link>
        <Link className={styles.link}>{t("nav-profile")}</Link>
        <p className={styles.link}>{t("nav-sign-out")}</p>
      </div>
    </div>
  );
}

export default TopNav;
