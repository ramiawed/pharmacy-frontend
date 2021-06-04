import React from "react";

import styles from "./icon-with-number.module.scss";

function IconWithNumber({ fillIcon, noFillIcon, value }) {
  return (
    <div className={styles.container}>
      {value > 0 ? fillIcon : noFillIcon}
      {value > 0 ? <p>{value}</p> : null}
    </div>
  );
}

export default IconWithNumber;
