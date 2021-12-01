import React from "react";

import styles from "./card-loader.module.scss";

function CardLoader() {
  return (
    <>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
      <div className={styles.card}></div>
    </>
  );
}

export default CardLoader;
