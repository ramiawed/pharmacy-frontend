import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./home-page-loader.module.scss";

function HomePageLoader() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t("app name")}</h1>
    </div>
  );
}

export default HomePageLoader;
