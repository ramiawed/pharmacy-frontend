import React from "react";
import { useTranslation } from "react-i18next";

// components
import SignupStagesActions from "../signup-stages-actions/signup-stages-actions.component";
import StageContainer from "../stage-container/stage-container.component";

// styles
import styles from "./create-account-stage-one.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

const CreateAccountStageOne = ({
  next,
  type,
  changeType,
  setStage,
  setPrevStage,
  resetStageFourInfo,
}) => {
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
      <div className={styles.container}>
        <p className={["center", "fc_white", "big"].join(" ")}>
          {t("choose user type")}
        </p>
        <label
          className={[
            type === UserTypeConstants.COMPANY
              ? "bg_offer fc_main"
              : "bg_dark fc_white",
            "center",
          ].join(" ")}
          onClick={() => changeUserTypeHanlder(UserTypeConstants.COMPANY)}
        >
          {t("company")}
        </label>
        <label
          className={[
            type === UserTypeConstants.WAREHOUSE
              ? "bg_offer fc_main"
              : "bg_dark fc_white",
            "center",
          ].join(" ")}
          onClick={() => changeUserTypeHanlder(UserTypeConstants.WAREHOUSE)}
        >
          {t("warehouse")}
        </label>
        <label
          className={[
            type === UserTypeConstants.PHARMACY
              ? "bg_offer fc_main"
              : "bg_dark fc_white",
            "center",
          ].join(" ")}
          onClick={() => changeUserTypeHanlder(UserTypeConstants.PHARMACY)}
        >
          {t("pharmacy")}
        </label>
        <label
          className={[
            type === UserTypeConstants.GUEST
              ? "bg_offer fc_main"
              : "bg_dark fc_white",
            "center",
          ].join(" ")}
          onClick={() => changeUserTypeHanlder(UserTypeConstants.GUEST)}
        >
          {t("guest")}
        </label>
        <SignupStagesActions stage={1} nextHandler={nextStageHandler} />
      </div>
    </StageContainer>
  );
};

export default CreateAccountStageOne;
