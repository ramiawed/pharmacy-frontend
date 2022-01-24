import React from "react";
import { useHistory } from "react-router";

// react-redux
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";

import { FaCircle } from "react-icons/fa";

// styles
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";
import generalStyles from "../../style.module.scss";
import { UserTypeConstants } from "../../utils/constants";

function OrderRow({ order }) {
  const history = useHistory();

  const user = useSelector(selectUser);

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

      <label className={tableStyles.label_xsmall}>
        {user.type === UserTypeConstants.ADMIN && !order.seenByAdmin && (
          <FaCircle size={12} />
        )}
        {user.type === UserTypeConstants.WAREHOUSE &&
          !order.seenByWarehouse && <FaCircle size={12} />}
      </label>
    </div>
  );
}

export default OrderRow;
