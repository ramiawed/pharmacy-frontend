import React from "react";

import styles from "./item-names.module.scss";

const ItemNames = ({ name, arName }) => {
  return (
    <div className={styles.nameDiv}>
      <label className={styles.item_name}>{name}</label>
      {arName && <label className={styles.nameAr}>{arName}</label>}
    </div>
  );
};

export default ItemNames;
