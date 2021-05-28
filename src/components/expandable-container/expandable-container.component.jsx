import React from "react";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import styles from "./expandable-container.module.scss";

function ExpandableContainer({
  children,
  labelText,
  expanded,
  changeExpanded,
}) {
  return (
    <div className={styles.expanded_div}>
      <label
        className={styles.header_label}
        style={{}}
        onClick={changeExpanded}
      >
        {expanded ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        {labelText}
      </label>
      <div
        className={[
          styles.info_container,
          expanded ? styles.expanded : styles.collapsed,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

export default ExpandableContainer;
