import React from "react";
import { useTranslation } from "react-i18next";

// components
import SignupStagesActions from "../signup-stages-actions/signup-stages-actions.component";
import StageContainer from "../stage-container/stage-container.component";

// constants
import { UserTypeConstants } from "../../utils/constants";
import { useTheme } from "../../contexts/themeContext";

const CreateAccountStageOne = ({
  next,
  type,
  changeType,
  setStage,
  setPrevStage,
  resetStageFourInfo,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const nextStageHandler = () => {
    setPrevStage(1);
    setStage(2);
  };

  const changeUserTypeHanlder = (userType) => {
    changeType(userType);
    resetStageFourInfo();
  };

  return (
    <StageContainer next={next}>
      <div className="w-full flex flex-col justify-evenly p-3">
        <p
          className={`${
            theme === "light" ? "text-white" : "text-color-primary-400"
          } text-center bold underline  mb-2`}
        >
          {t("choose user type")}
        </p>
        <Label
          selected={type === UserTypeConstants.COMPANY}
          theme={theme}
          text={t("company")}
          action={() => changeUserTypeHanlder(UserTypeConstants.COMPANY)}
        />

        <Label
          selected={type === UserTypeConstants.WAREHOUSE}
          theme={theme}
          text={t("warehouse")}
          action={() => changeUserTypeHanlder(UserTypeConstants.WAREHOUSE)}
        />

        <Label
          selected={type === UserTypeConstants.PHARMACY}
          theme={theme}
          text={t("pharmacy")}
          action={() => changeUserTypeHanlder(UserTypeConstants.PHARMACY)}
        />

        <Label
          selected={type === UserTypeConstants.GUEST}
          theme={theme}
          text={t("guest")}
          action={() => changeUserTypeHanlder(UserTypeConstants.GUEST)}
        />

        <SignupStagesActions stage={1} nextHandler={nextStageHandler} />
      </div>
    </StageContainer>
  );
};

export default CreateAccountStageOne;

function Label({ selected, theme, text, action }) {
  return (
    <label
      className={[
        selected
          ? theme === "light"
            ? "bg-green text-white"
            : "d-primary300-mixed300"
          : theme === "light"
          ? "bg-dark text-white"
          : "d-mixed200-primary300 hover:d-primary500-mixed300",
        "p-2 rounded-lg cursor-pointer mb-2 text-center",
      ].join(" ")}
      onClick={action}
    >
      {text}
    </label>
  );
}
