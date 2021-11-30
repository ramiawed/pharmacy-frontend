import React from "react";
import { useHistory } from "react-router";

// styles
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";
import generalStyles from "../../style.module.scss";

function OrderRow({ order }) {
  const history = useHistory();

  return (
    <div
      className={[rowStyles.container, generalStyles.padding_v_6].join(" ")}
      onClick={() => {
        history.push(`/order-details?${order._id}`);
      }}
    >
      <label className={tableStyles.label_medium}>{order.pharmacy.name}</label>
      <label className={tableStyles.label_medium}>{order.warehouse.name}</label>
      <label className={tableStyles.label_medium}>
        {order.orderDate.split("T")[0]}
      </label>
    </div>
  );
}

export default OrderRow;
