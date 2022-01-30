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
import { Colors, UserTypeConstants } from "../../utils/constants";
import { RiDeleteBin5Fill, RiSave3Fill } from "react-icons/ri";
import Icon from "../action-icon/action-icon.component";
import { useTranslation } from "react-i18next";

function OrderRow({ order, deleteAction }) {
  const { t } = useTranslation();
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
        <Icon
          icon={() => <RiDeleteBin5Fill />}
          onclick={(e) => {
            deleteAction(order._id);
            e.stopPropagation();
          }}
          tooltip={t("delete-order-tooltip")}
          foreColor={Colors.FAILED_COLOR}
        />
      </label>

      <label className={tableStyles.label_xsmall}>
        <Icon
          icon={() => <RiSave3Fill />}
          onclick={() => {}}
          tooltip={t("save-order-tooltip")}
          foreColor={Colors.SECONDARY_COLOR}
        />
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
