import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineExclamationCircle, AiFillCloseCircle } from "react-icons/ai";
import { onKeyPressForNumberInput } from "../../utils/constants";

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
  errorMsg,
}) {
  const { t } = useTranslation();

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      if (onEnterPress) {
        onEnterPress();
      }
    }

    if (event.code !== "Escape") event.stopPropagation();
  };

  // const onKeyPress = (event) => {
  //   return event.charCode >= 48 && event.charCode <= 57;
  // };

  return (
    <div className={styles.container}>
      <div
        className={[styles.input_div, bordered ? styles.bordered : ""].join(
          " "
        )}
      >
        {icon && icon}
        {label && <label htmlFor={id}>{t(label)}</label>}

        <input
          placeholder={placeholder ? t(`${placeholder}`) : ""}
          id={id}
          type={type === "password" ? "password" : "text"}
          value={value}
          onChange={onchange}
          onKeyDown={keyDownHandler}
          onKeyPress={(event) => {
            if (type === "number") {
              onKeyPressForNumberInput(event);
            }
          }}
          disabled={readOnly}
          className={[styles.input].join(" ")}
        />

        {resetField && value && (
          <AiFillCloseCircle
            onClick={() => resetField(id)}
            className={styles.icon_close}
          />
        )}
        {error && (
          <AiOutlineExclamationCircle className={styles.icon_error} size={24} />
        )}
      </div>
      {error && <label className={styles.error_label}>{errorMsg}</label>}
    </div>
  );
}

export default Input;
