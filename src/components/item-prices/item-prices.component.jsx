import React from "react";
import { formatNumber } from "../../utils/constants";

import styles from "./item-prices.module.scss";

const ItemPrices = ({ showPrice, price, customerPrice, showCustomerPrice }) => {
  return (
    // <div className={styles.price_container}>
    <>
      {showPrice && (
        <label className={[styles.label, styles.item_price].join(" ")}>
          {formatNumber(price)}
        </label>
      )}
      {showCustomerPrice && (
        <label className={[styles.label, styles.item_customer_price].join(" ")}>
          {formatNumber(customerPrice)}
        </label>
      )}
    </>
    // </div>
  );
};

export default ItemPrices;
