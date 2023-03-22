// component to display approve message to client

import React from "react";
import { useTranslation } from "react-i18next";

// styles
import styles from "./approve-page.module.scss";

function ApprovePage() {
  const { t } = useTranslation();

  return (
    <div className={[styles.container, "flex_center_container"].join(" ")}>
      <div className={[styles.info, "flex_center_container"].join(" ")}>
        <p>{t("believed partner")}</p>
        <p className={styles.strong}>{t("thank message")}</p>
        <p>{t("approve message")}</p>
        <p>{t("hour serving")}</p>
      </div>
    </div>
  );
}

export default ApprovePage;
