import React from "react";

import styles from "./icon-with-number.module.scss";

function IconWithNumber({ fillIcon, noFillIcon, value, small }) {
  return (
    <div className={styles.container}>
      {value > 0 ? fillIcon : noFillIcon}
      {value > 0 ? <p className={small ? styles.small : ""}>{value}</p> : null}
    </div>
  );
}

export default IconWithNumber;
