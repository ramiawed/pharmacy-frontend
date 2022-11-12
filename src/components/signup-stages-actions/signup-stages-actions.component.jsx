import React from "react";
import { Colors } from "../../utils/constants";
import Button from "../button/button.component";

import styles from "./signup-stages-actions.module.scss";

const SignupStagesActions = ({ stage, prevHandler, nextHandler }) => {
  return (
    <div className={styles.container}>
      {stage > 1 && (
        <Button
          text="السابق"
          action={prevHandler}
          bgColor={Colors.SUCCEEDED_COLOR}
        />
      )}
      <div style={{ width: "10px" }}></div>
      {stage <= 4 && (
        <Button
          text="التالي"
          action={nextHandler}
          bgColor={Colors.SUCCEEDED_COLOR}
        />
      )}
    </div>
  );
};

export default SignupStagesActions;
