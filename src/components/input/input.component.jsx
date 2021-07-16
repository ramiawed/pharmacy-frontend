import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineExclamationCircle, AiFillCloseCircle } from "react-icons/ai";

import styles from "./input.module.scss";

function Input({
  icon,
  type,
  label,
  id,
  error,
  bordered,
  value,
  onchange,
  placeholder,
  onEnterPress,
  resetField,
  readOnly,
}) {
  const { t } = useTranslation();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (onEnterPress) {
        onEnterPress();
      }
    }
  };

  return (
    <div
      className={[styles.input_div, bordered ? styles.bordered : ""].join(" ")}
    >
      {icon}
      {label && <label htmlFor={id}>{t(label)}</label>}

      <input
        placeholder={placeholder ? t(`${placeholder}`) : ""}
        id={id}
        type={type}
        value={value}
        onChange={onchange}
        onKeyPress={handleKeyPress}
        disabled={readOnly}
      />
      {resetField && value && (
        <AiFillCloseCircle
          onClick={() => resetField(id)}
          className={styles.icon_close}
        />
      )}
      {error && <AiOutlineExclamationCircle className={styles.icon_error} />}
    </div>
  );
}

export default Input;
