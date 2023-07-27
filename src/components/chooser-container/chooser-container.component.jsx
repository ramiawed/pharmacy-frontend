import React from "react";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../contexts/themeContext";

const ChooserContainer = ({
  selectedValue,
  onclick,
  label,
  error,
  styleForSearch,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <div className="flex flex-col min-w-full">
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-color-surface-mixed-100"
        } ${error ? "border border-red" : ""} ${
          styleForSearch
            ? theme === "light"
              ? "border border-light_grey"
              : ""
            : ""
        } my-1 flex items-stretch justify-start gap-1 min-w-full rounded-md h-9 overflow-hidden`}
        onClick={onclick}
      >
        {label && (
          <label
            className={`${
              theme === "light"
                ? "bg-dark text-white"
                : "bg-color-surface-mixed-200 text-color-primary-300"
            } w-28 h-9  flex items-center justify-center text-xs text-center`}
          >
            {t(label)}
          </label>
        )}
        <label
          className={`flex-1 flex items-center justify-start text-md ps-1 placeholder:text-xs placeholder:text-color-primary-500 ${
            theme === "light"
              ? "text-dark bg-white"
              : "text-color-primary-300 bg-color-surface-mixed-100"
          } `}
        >
          {selectedValue ? t(selectedValue) : t("mandatory placeholder")}
        </label>
      </div>

      {error && (
        <label className="text-center text-red text-xs">{t(error)}</label>
      )}
    </div>
  );
};

export default ChooserContainer;
