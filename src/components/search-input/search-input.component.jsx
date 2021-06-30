import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./search-input.module.scss";

function SearchInput({
  type,
  label,
  id,
  value,
  onchange,
  placeholder,
  onEnterPress,
  resetField,
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
    <div className={styles.input_div}>
      {label && <label htmlFor={id}>{t(label)}</label>}

      <input
        placeholder={placeholder ? t(`${placeholder}`) : ""}
        id={id}
        type={type}
        value={value}
        onChange={onchange}
        onKeyPress={handleKeyPress}
      />
      {resetField && value && (
        <AiFillCloseCircle
          onClick={() => resetField(id)}
          className={styles.icon_close}
        />
      )}
    </div>
  );
}

export default SearchInput;
