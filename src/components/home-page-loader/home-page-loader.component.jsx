import React from "react";

import styles from "./home-page-loader.module.scss";

function HomePageLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <span></span>
      </div>
    </div>
  );
}

export default HomePageLoader;
