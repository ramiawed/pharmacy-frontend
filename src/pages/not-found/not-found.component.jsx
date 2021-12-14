import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "./not-found.module.scss";

function NotFound() {
  const { t } = useTranslation();

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginBlock: "10px",
        }}
      >
        {t("not-found-page")}
      </h2>
      <Link className={styles.link} to="/">
        {t("home")}
      </Link>
    </div>
  );
}

export default NotFound;
