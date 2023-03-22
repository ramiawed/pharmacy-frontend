import React from "react";

// components
import Button from "../button/button.component";

// styles
import styles from "./signup-stages-actions.module.scss";

const SignupStagesActions = ({ stage, prevHandler, nextHandler }) => {
  return (
    <div className={styles.container}>
      {stage > 1 && (
        <Button text="السابق" action={prevHandler} classStyle="bg_green" />
      )}
      <div style={{ width: "10px" }}></div>
      {stage <= 4 && (
        <Button text="التالي" action={nextHandler} classStyle="bg_green" />
      )}
    </div>
  );
};

export default SignupStagesActions;
