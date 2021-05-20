import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// styles
import styles from "./approve-page.module.scss";

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

function ApprovePage() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className={styles.info}
      >
        <p>{t("believed-partner")}</p>
        <p className={styles.strong}>{t("thank-message")}</p>
        <p>{t("approve-message")}</p>
        <p>{t("hour-serving")}</p>
        {/* <ContactUs /> */}
      </motion.div>
    </div>
  );
}

export default ApprovePage;
