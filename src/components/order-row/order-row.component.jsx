import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

// components
import Icon from "../action-icon/action-icon.component";
import Modal from "../modal/modal.component";

// react-redux
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { updateOrder } from "../../redux/orders/ordersSlice";

// icons
import { FaCircle } from "react-icons/fa";
import { RiDeleteBin5Fill, RiSave3Fill, RiSendPlaneFill } from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";

// styles
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function OrderRow({ order, deleteAction }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, token } = useSelector(selectUserData);

  const rowClickHandler = (id) => {
    if (user.type !== UserTypeConstants.PHARMACY) {
      let obj = {};

      if (user.type === UserTypeConstants.ADMIN && !order.seenByAdmin) {
        obj = {
          seenByAdmin: true,
        };
      }

      if (
        user.type === UserTypeConstants.WAREHOUSE &&
        order.warehouseStatus === "unread"
      ) {
        obj = {
          warehouseStatus: "received",
        };
      }

      if (Object.keys(obj).length > 0) {
        dispatch(updateOrder({ id, obj, token }));
      }
    }

    history.push(`/order-details?${id}`);
  };

  // own state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div
      className={[rowStyles.container, generalStyles.padding_v_6].join(" ")}
      onClick={() => {
        rowClickHandler(order._id);
      }}
    >
      {(user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.WAREHOUSE) && (
        <label className={tableStyles.label_medium}>
          {order.pharmacy.name} -{" "}
          {order.pharmacyStatus === "received" && (
            <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
          )}
          {order.pharmacyStatus === "sent" && (
            <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
          )}
        </label>
      )}

      {(user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.PHARMACY) && (
        <label className={tableStyles.label_medium}>
          {order.warehouse.name} -{" "}
          {order.warehouseStatus === "unread" && <FaCircle />}
          {order.warehouseStatus === "received" && (
            <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
          )}
          {order.warehouseStatus === "sent" && (
            <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
          )}
        </label>
      )}

      <label className={tableStyles.label_small}>
        {order.orderDate.split("T")[0]}
      </label>

      <label className={tableStyles.label_small}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user.type === UserTypeConstants.ADMIN && !order.seenByAdmin && (
            <FaCircle size={10} />
          )}
          {user.type === UserTypeConstants.WAREHOUSE &&
            order.warehouseStatus === "sent" && (
              <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
            )}
          {user.type === UserTypeConstants.WAREHOUSE &&
            order.warehouseStatus === "unread" && <FaCircle />}
          {user.type === UserTypeConstants.WAREHOUSE &&
            order.warehouseStatus === "received" && (
              <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
            )}

          {user.type === UserTypeConstants.PHARMACY &&
            order.pharmacyStatus === "sent" && (
              <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
            )}

          {user.type === UserTypeConstants.PHARMACY &&
            order.pharmacyStatus === "received" && (
              <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
            )}

          <Icon
            icon={() => <RiDeleteBin5Fill />}
            onclick={() => {
              setShowDeleteModal(true);
            }}
            tooltip={t("delete-order-tooltip")}
            foreColor={Colors.FAILED_COLOR}
          />
        </div>
      </label>

      {showDeleteModal && (
        <Modal
          header="delete-order-confirm-header"
          cancelLabel="close-label"
          okLabel="ok-label"
          closeModal={() => {
            setShowDeleteModal(false);
          }}
          small={true}
          okModal={() => {
            deleteAction(order._id);
            setShowDeleteModal(false);
          }}
          color={Colors.FAILED_COLOR}
        >
          <p>{t("delete-order-confirm-msg")}</p>
        </Modal>
      )}
    </div>
  );
}

export default OrderRow;
