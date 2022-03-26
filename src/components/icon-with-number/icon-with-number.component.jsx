import React from "react";

import styles from "./icon-with-number.module.scss";

function IconWithNumber({
  fillIcon,
  noFillIcon,
  value,
  small,
  tooltip,
  withBackground,
}) {
  return (
    <div
      className={styles.container}
      style={{
        background: withBackground ? "#e3e3e3" : "transparent",
        borderRadius: "3px",
        marginInline: withBackground ? "2px" : "0",
        marginLeft: withBackground ? "2px" : "0",
        marginRight: withBackground ? "2px" : "0",
      }}
    >
      {value > 0 ? fillIcon : noFillIcon}
      {value > 0 ? <p className={small ? styles.small : ""}>{value}</p> : null}
      {tooltip && <p className={styles.tooltip}>{tooltip}</p>}
    </div>
  );
}

export default IconWithNumber;
