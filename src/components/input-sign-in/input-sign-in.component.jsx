import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { AiOutlineExclamationCircle, AiFillCloseCircle } from "react-icons/ai";

// constants
import { onKeyPressForNumberInput } from "../../utils/constants";

import styles from "./input-sign-in.module.scss";

function InputSignIn({
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
    <div
      className={[styles.input_div, bordered ? styles.bordered : ""].join(" ")}
    >
      {icon && icon}
      {label && (
        <label
          style={{
            color: "#9d9d9d",
          }}
          htmlFor={id}
        >
          {t(label)}
        </label>
      )}

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
      />
      {resetField && value && (
        <AiFillCloseCircle
          onClick={() => resetField(id)}
          className={styles.icon_clear}
        />
      )}
      {error && <AiOutlineExclamationCircle className={styles.icon_error} />}
    </div>
  );
}

export default InputSignIn;
