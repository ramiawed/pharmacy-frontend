import React from "react";

import styles from "./main-content-container.module.scss";

const MainContentContainer = ({ children }) => {
  return <div className={styles.main_content_container}>{children}</div>;
};

export default MainContentContainer;
