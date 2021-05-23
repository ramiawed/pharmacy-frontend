import React from "react";
import { useTranslation } from "react-i18next";

// styles
import styles from "./action-button.module.scss";

function ActionButton({ icon, tooltip, action }) {
  const { t } = useTranslation();

  return (
    <button className={styles.action_button} onClick={action}>
      {icon()}
      <div>{t(tooltip)}</div>
    </button>
  );
}

export default ActionButton;
