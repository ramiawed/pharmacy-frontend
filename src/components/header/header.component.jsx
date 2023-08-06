import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import CustomButton from "../custom-button/custom-button.component";

// icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";

// context
import { useTheme } from "../../contexts/themeContext";

function Header({ refreshHandler, title, count }) {
  const { theme } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-gray-50 border-b-[1px] border-light_grey text-dark"
          : "d-mixed300-primary300 "
      }
    flex flex-row justify-center items-center sticky p-2 top-[74px] z-10 gap-1`}
    >
      <p className="flex-1 bold text-center text-xl">
        {t(title)}
        {count ? <span>{count}</span> : ""}
      </p>

      {refreshHandler && (
        <CustomButton
          icon={() => <RiRefreshLine />}
          onClickHandler={refreshHandler}
          classname={`${
            theme === "light" ? "bg-dark text-white" : "d-primary500-mixed300"
          }`}
          tooltip={t("refresh")}
        />
      )}

      <CustomButton
        icon={() => <IoMdArrowRoundBack />}
        onClickHandler={() => {
          history.goBack();
        }}
        classname={`${
          theme === "light" ? "bg-dark text-white" : "d-primary500-mixed300"
        }`}
      />
    </div>
  );
}

export default Header;
