import React from "react";
import { useTranslation } from "react-i18next";

// context
import { useTheme } from "../../contexts/themeContext";
import CustomButton from "../custom-button/custom-button.component";

const SignupStagesActions = ({ stage, prevHandler, nextHandler }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center justify-center gap-5 p-4">
      {stage > 1 && (
        <CustomButton
          text={t("previous")}
          onClickHandler={prevHandler}
          classname={`${
            theme === "light" ? "bg-green text-white" : "d-primary500-mixed300"
          }`}
        />
        // <button
        //   onClick={prevHandler}
        //   className={`${
        //     theme === "light"
        //       ? "bg-green text-white"
        //       : "bg-color-primary-300 text-color-surface-300"
        //   } rounded-full px-4 py-2 hover:px-5 transition-all`}
        // >
        //   {t("previous")}
        // </button>
      )}

      {stage <= 4 && (
        <CustomButton
          text={t("next")}
          onClickHandler={nextHandler}
          classname={`${
            theme === "light" ? "bg-green text-white" : "d-primary500-mixed300"
          }`}
        />
      )}
    </div>
  );
};

export default SignupStagesActions;
