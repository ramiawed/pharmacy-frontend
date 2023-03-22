import React from "react";

// constants
import { formatNumber } from "../../utils/constants";

import styles from "./item-prices.module.scss";

const ItemPrices = ({ showPrice, price, customerPrice, showCustomerPrice }) => {
  return (
    <div className={styles.container}>
      {showPrice && (
        <label
          className={[
            "bold",
            "medium",
            "inline_block",
            "center",
            "bg_green",
            "fc_white",
            styles.price,
            styles.label,
          ].join(" ")}
        >
          {formatNumber(price)}
        </label>
      )}
      {showCustomerPrice && (
        <label
          className={[
            "bold",
            "medium",
            "inline_block",
            "center",
            "bg_red",
            "fc_white",
            styles.custom_price,
            styles.label,
          ].join(" ")}
        >
          {formatNumber(customerPrice)}
        </label>
      )}
    </div>
  );
};

export default ItemPrices;
