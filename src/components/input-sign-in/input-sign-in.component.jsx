import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { AiFillCloseCircle } from "react-icons/ai";

// constants
import { onKeyPressForNumberInput } from "../../utils/constants";
import { useTheme } from "../../contexts/themeContext";

function InputSignIn({
  icon,
  type,
  label,
  id,
  error,
  value,
  onchange,
  placeholder,
  onEnterPress,
  resetField,
  readOnly,
  errorMsg,
  forSearch,
}) {
  const { theme } = useTheme();
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
    <div className="flex flex-col min-w-full">
      <div
        // [styles.input_div, bordered ? styles.bordered : ""].join(" ")
        className={`${
          theme === "light" ? "bg-white" : "d-mixed100-primary300"
        } ${error ? "border border-red" : ""} ${
          forSearch ? (theme === "light" ? "border border-light_grey" : "") : ""
        } my-1 flex items-stretch justify-start gap-1 min-w-full rounded-md h-9 overflow-hidden`}
      >
        {icon && (
          <div
            className={`${
              theme === "light" ? "bg-dark text-white" : "d-mixed200-primary300"
            } w-9 h-9  flex items-center justify-center`}
          >
            {icon}
          </div>
        )}

        {label && (
          <label
            className={`${
              theme === "light" ? "bg-dark text-white" : "d-mixed200-primary300"
            }  w-28 h-9  flex items-center justify-center text-xs text-center`}
            htmlFor={id}
          >
            {t(label)}
          </label>
        )}

        <input
          placeholder={placeholder ? t(`${placeholder}`) : ""}
          id={id}
          type={type}
          value={value}
          onChange={onchange}
          onKeyDown={keyDownHandler}
          onKeyPress={(event) => {
            if (type === "number") {
              onKeyPressForNumberInput(event);
            }
          }}
          disabled={readOnly}
          className={`flex-1 text-md border-none outline-none ps-1 placeholder:text-xs placeholder:text-color-primary-500 ${
            theme === "light" ? "text-dark bg-white" : "d-mixed100-primary300"
          } `}
        />
        {resetField && value && (
          <div
            className={`${
              theme === "light" ? "bg-dark text-white" : "d-mixed200-primary300"
            } w-9 h-9  flex items-center justify-center`}
            onClick={() => resetField(id)}
          >
            <AiFillCloseCircle size={18} />
          </div>
        )}
      </div>
      {errorMsg && (
        <label className="text-center text-red text-xs">{errorMsg}</label>
      )}
    </div>
  );
}

export default InputSignIn;
