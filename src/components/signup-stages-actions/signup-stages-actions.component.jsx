import React from "react";
import { useTranslation } from "react-i18next";

// components
import Button from "../button/button.component";

// styles
import styles from "./signup-stages-actions.module.scss";

const SignupStagesActions = ({ stage, prevHandler, nextHandler }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {stage > 1 && (
        <Button
          text={t("previous")}
          action={prevHandler}
          classStyle="bg_green"
        />
      )}
      <div style={{ width: "10px" }}></div>
      {stage <= 4 && (
        <Button text={t("next")} action={nextHandler} classStyle="bg_green" />
      )}
    </div>
  );
};

export default SignupStagesActions;
