import React from "react";

import styles from "./header-with-slogn.module.scss";

const HeaderWithSlogn = ({ bgColor }) => {
  return (
    <div style={{ backgroundColor: bgColor }} className={styles.app_name}>
      {/* <h2>Smart Pharma</h2>
      <p>be smart work smart</p> */}
    </div>
  );
};

export default HeaderWithSlogn;
