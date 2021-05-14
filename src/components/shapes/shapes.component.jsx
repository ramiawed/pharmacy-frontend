import React from "react";
import styles from "./shapes.module.scss";

function Shapes() {
  return (
    <>
      <div className={styles.square_top}></div>
      <div className={styles.circle}></div>
      <div className={styles.square_bottom}></div>
    </>
  );
}

export default Shapes;
