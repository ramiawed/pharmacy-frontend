// card component that can collapsed or expanded by pressing on the header

// props
// headerTitle: text to show in the header section
// children: array of component to show in the body of the card
// type: warning or normal to change to background color of the card

import React, { useState } from "react";

// react icon
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

// styles
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
