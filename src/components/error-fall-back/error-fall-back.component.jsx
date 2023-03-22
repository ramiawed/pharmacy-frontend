import React from "react";
import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";

// component
import Button from "../../components/button/button.component";

// styles
import styles from "./error-fall-back.module.scss";

// constants

const containerVariant = {
  hidden: {
    opacity: 0,
    left: "100vw",
  },
  visible: {
    opacity: 1,
    left: "0",
    transition: {
      type: "spring",
      delay: 0.5,
    },
  },
};

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
