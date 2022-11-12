import React from "react";

import styles from "./signup-stages-number.module.scss";

const SignupStagesNumber = ({ stage, prevStage, stagesArray }) => {
  return (
    <div className={styles.container}>
      {stagesArray.map((element) => (
        <>
          <div
            className={[
              styles.stage,
              stage === element ? styles.active : "",
              stage > element ? styles.done : "",
            ].join(" ")}
          >
            <div
              className={[
                styles.animation_div,
                stage === element && prevStage === element - 1
                  ? styles.active_slide_left
                  : "",
                stage === element && prevStage > element
                  ? styles.done_slide_right
                  : "",
                stage > element ? styles.done_slide_left : "",
              ].join(" ")}
            >
              <div className={styles.done_div}></div>
              <div className={styles.active_div}></div>
            </div>

            <label>{element}</label>
          </div>
          {element !== stagesArray.length && (
            <div
              className={[
                styles.separator,
                stage > element ? styles.separator_done : "",
              ].join(" ")}
            ></div>
          )}
        </>
      ))}
    </div>
  );
};

export default SignupStagesNumber;
