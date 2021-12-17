import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// styles
import styles from "./error-fall-back.module.scss";
import generalStyles from "../../style.module.scss";

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
    <div
      className={[styles.container, generalStyles.flex_center_container].join(
        " "
      )}
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className={[styles.info, generalStyles.flex_center_container].join(" ")}
      >
        <p>{t("believed-partner")}</p>
        <p className={styles.strong}>{t("error-msg")}</p>
        <p>{t("approve-message")}</p>
        <p>{t("hour-serving")}</p>
      </motion.div>
    </div>
  );
}

export default ErrorFallback;
