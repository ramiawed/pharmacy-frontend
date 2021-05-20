import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import styles from "./input.module.scss";

function Input({ icon, type, label, id, error, bordered, value, onchange }) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div
        className={[styles.input_div, bordered ? styles.bordered : ""].join(
          " "
        )}
      >
        {icon(id)}
        <label htmlFor={id}>{t(label)}</label>
        <input id={id} type={type} value={value} onChange={onchange} />
        {error && <AiOutlineExclamationCircle className={styles.icon_error} />}
      </div>
    </div>
  );
}

export default Input;
