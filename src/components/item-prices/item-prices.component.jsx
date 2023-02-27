import React from "react";
import { formatNumber } from "../../utils/constants";

import gs from "../../style.module.scss";

const ItemPrices = ({ showPrice, price, customerPrice, showCustomerPrice }) => {
  return (
    <div>
      {showPrice && (
        <label
          className={[
            gs.strong,
            gs.padding_h_6,
            gs.bg_green,
            gs.fc_white,
            gs.price_label,
            gs.rounded_left,
          ].join(" ")}
        >
          {formatNumber(price)}
        </label>
      )}
      {showCustomerPrice && (
        <label
          className={[
            gs.strong,
            gs.padding_h_6,
            gs.bg_red,
            gs.fc_white,
            gs.price_label,
            gs.rounded_right,
          ].join(" ")}
        >
          {formatNumber(customerPrice)}
        </label>
      )}
    </div>
  );
};

export default ItemPrices;
