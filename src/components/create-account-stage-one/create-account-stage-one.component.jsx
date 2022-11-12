import React from "react";
import { useTranslation } from "react-i18next";

// components
import StageContainer from "../stage-container/stage-container.component";

// styles
import styles from "./create-account-stage-one.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";
import SignupStagesActions from "../signup-stages-actions/signup-stages-actions.component";

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
        <p>{t("choose-user-type")}</p>
        <label
          className={type === UserTypeConstants.COMPANY ? styles.selected : ""}
          onClick={() => changeUserTypeHanlder(UserTypeConstants.COMPANY)}
        >
          {t("company")}
        </label>
        <label
          className={
            type === UserTypeConstants.WAREHOUSE ? styles.selected : ""
          }
          onClick={() => changeUserTypeHanlder(UserTypeConstants.WAREHOUSE)}
        >
          {t("warehouse")}
        </label>
        <label
          className={type === UserTypeConstants.PHARMACY ? styles.selected : ""}
          onClick={() => changeUserTypeHanlder(UserTypeConstants.PHARMACY)}
        >
          {t("pharmacy")}
        </label>
        <label
          className={type === UserTypeConstants.GUEST ? styles.selected : ""}
          onClick={() => changeUserTypeHanlder(UserTypeConstants.GUEST)}
        >
          {t("normal")}
        </label>
        <SignupStagesActions stage={1} nextHandler={nextStageHandler} />
      </div>
    </StageContainer>
  );
};

export default CreateAccountStageOne;
