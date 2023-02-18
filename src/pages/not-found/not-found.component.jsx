import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import MainContentContainer from "../../components/main-content-container/main-content-container.component";

import styles from "./not-found.module.scss";

function NotFound() {
  const { t } = useTranslation();

  return (
    <MainContentContainer>
      <p className={styles.msg}>{t("not-found-page")}</p>
      <Link className={styles.link} to="/">
        {t("home")}
      </Link>
    </MainContentContainer>
  );
}

export default NotFound;
