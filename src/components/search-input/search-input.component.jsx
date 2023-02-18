import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiFillCloseCircle } from "react-icons/ai";

// components
import SearchRowContainer from "../search-row-container/search-row-container.component";

function SearchInput({
  type,
  label,
  id,
  value,
  onchange,
  placeholder,
  onEnterPress,
  resetField,
  onkeyup,
  withBorder,
  hasFocus,
}) {
  const { t } = useTranslation();
  const inputRef = useRef();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (onEnterPress) {
        onEnterPress();
      }
    }
  };

  useEffect(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  });

  return (
    <SearchRowContainer withBorder={withBorder}>
      {label && <label htmlFor={id}>{t(label)}</label>}

      <input
        placeholder={placeholder ? t(`${placeholder}`) : ""}
        id={id}
        type={type}
        value={value}
        onChange={onchange}
        onKeyPress={handleKeyPress}
        onKeyUp={onkeyup && onkeyup}
        ref={inputRef}
      />
      {resetField && value && (
        <span>
          <AiFillCloseCircle onClick={() => resetField(id)} size="24" />
        </span>
      )}
    </SearchRowContainer>
  );
}

export default SearchInput;
