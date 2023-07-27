import React from "react";
import { useTranslation } from "react-i18next";

// component
import Button from "../../components/button/button.component";

// styles
import styles from "./error-fall-back.module.scss";

function ErrorFallback({ error, resetErrorBoundary }) {
  const { t } = useTranslation();

  return (
    <div className={[styles.container, "flex_center_container"].join(" ")}>
      <div className={[styles.info, "flex_center_container"].join(" ")}>
        <p>{t("believed partner")}</p>
        <p className={styles.strong}>{t("error-msg")}</p>
        <div
          style={{
            zIndex: 10,
          }}
        >
          <Button
            text={t("home")}
            classStyle="bg_red"
            action={() => {
              resetErrorBoundary();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
