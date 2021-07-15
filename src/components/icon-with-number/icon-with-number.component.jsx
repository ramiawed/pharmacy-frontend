import React from "react";

import styles from "./icon-with-number.module.scss";

function IconWithNumber({ fillIcon, noFillIcon, value, small, tooltip }) {
  return (
    <div className={styles.container}>
      {value > 0 ? fillIcon : noFillIcon}
      {value > 0 ? <p className={small ? styles.small : ""}>{value}</p> : null}
      {tooltip && <p className={styles.tooltip}>{tooltip}</p>}
    </div>
  );
}

export default IconWithNumber;
