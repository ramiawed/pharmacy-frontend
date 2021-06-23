import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { VscLoading } from "react-icons/vsc";

// styles
import styles from "./action-button.module.scss";

function ActionButton({
  icon,
  tooltip,
  action,
  color,
  text,
  loading,
  fontSize,
}) {
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
        fontSize: fontSize ? fontSize : "0.7rem",
      }}
      className={styles.action_button}
      onClick={action}
      disabled={loading}
    >
      {icon && icon()}
      {text ? t(text) : null}
      {tooltip && <div>{t(tooltip)}</div>}

      {loading && <VscLoading className={styles.loading} />}
    </motion.button>
  );
}

export default ActionButton;
