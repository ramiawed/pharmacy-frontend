import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./footer.module.scss";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.footer_container}>
      <p>{t("app-name")}</p>
      <p>{t("contact-us")}</p>
      <div>
        <div className={styles.row}>
          <div className={styles.label}>{t("name")}</div>
          <div className={styles.value}>سيما مرجانة</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>{t("phone")}</div>
          <div className={styles.value}>٠٩٤٣٧٢٨٨٤٧٨</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>{t("email")}</div>
          <div className={styles.value}>sima@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
