import React from "react";

import styles from "./card-info.module.scss";

function CardInfo({ headerTitle, children, type }) {
  return (
    <div
      className={[styles.card, type === "warning" ? styles.warning : null].join(
        " "
      )}
    >
      <div
        className={[
          styles.header,
          type === "warning" ? styles.warning : null,
        ].join(" ")}
      >
        <p>{headerTitle}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default CardInfo;
