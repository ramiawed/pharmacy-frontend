import React from "react";
import { UserTypeConstants } from "../../utils/constants";

import styles from "./item-prices.module.scss";

const ItemPrices = ({ userType, price, customerPrice }) => {
  return (
    <div className={styles.price_container}>
      {userType !== UserTypeConstants.GUEST && (
        <label className={styles.item_price}>{price}</label>
      )}
      <label className={styles.item_customer_price}>{customerPrice}</label>
    </div>
  );
};

export default ItemPrices;
