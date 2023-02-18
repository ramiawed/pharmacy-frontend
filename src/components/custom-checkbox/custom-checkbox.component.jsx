import React from "react";

import styles from "./custom-checkbox.module.scss";

const CustomCheckbox = ({ label, value, changeHandler }) => {
  return (
    <div className={styles.container} onClick={changeHandler}>
      <input
        type="checkbox"
        checked={value}
        value={value}
        onChange={() => {
          changeHandler();
        }}
      />
      <span className={styles.checkmark}></span>
      <label>{label}</label>
    </div>
  );
};

export default CustomCheckbox;
