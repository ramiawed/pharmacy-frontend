import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// styles
import styles from "./action-button.module.scss";

function ActionButton({ icon, tooltip, action, color }) {
  const { t } = useTranslation();

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.4)",
      }}
      style={{
        background: color,
      }}
      className={styles.action_button}
      onClick={action}
    >
      {icon()}
      <div>{t(tooltip)}</div>
    </motion.button>
  );
}

export default ActionButton;
