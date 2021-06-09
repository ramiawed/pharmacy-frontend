import React, { useState } from "react";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import styles from "./card-info.module.scss";

function CardInfo({ headerTitle, children, type }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className={[styles.card, type === "warning" ? styles.warning : null].join(
        " "
      )}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className={[
          styles.header,
          type === "warning" ? styles.warning : null,
        ].join(" ")}
      >
        <p>{headerTitle}</p>
        <label
          className={styles.header_label}
          style={{}}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        </label>
      </div>
      {expanded && <div>{children}</div>}
    </div>
  );
}

export default CardInfo;
