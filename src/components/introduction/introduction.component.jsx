import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./introduction.module.scss";

function Introduction() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{t("app-name")}</h1>
        <p>{t("app-description")}</p>
        <p>{t("all-companies")}</p>
        <p>{t("all-medicines")}</p>
      </div>
      <div className={styles.image}></div>
    </div>
  );
}

export default Introduction;
