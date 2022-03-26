import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

// components
import Icon from "../action-icon/action-icon.component";
import Modal from "../modal/modal.component";
import Toast from "../toast/toast.component";

// react-redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  decrementUnreadOrder,
  selectedChange,
  updateOrder,
} from "../../redux/orders/ordersSlice";

// icons
import {
  RiDeleteBin5Fill,
  RiMailUnreadLine,
  RiSendPlaneFill,
} from "react-icons/ri";
import { BsCheckAll, BsCheck } from "react-icons/bs";
import { MdOutlineLocalShipping, MdRemoveDone } from "react-icons/md";

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

  // own state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");

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
        dispatch(updateOrder({ id, obj, token }))
          .then(unwrapResult)
          .then(() => {
            dispatch(decrementUnreadOrder({ token }));
          });
      }
    }

    history.push(`/order-details?${id}`);
  };

  const modalOkHandler = (id, warehouseStatus) => {
    if (
      user.type === UserTypeConstants.ADMIN ||
      (user.type === UserTypeConstants.PHARMACY && warehouseStatus !== "sent")
    ) {
      deleteAction(id);
      setShowDeleteModal(false);
    } else {
      setShowDeleteModal(false);
      setDeleteErrorMsg("cant-delete-order");
    }
  };

  return (
    <div className={[rowStyles.container, generalStyles.padding_v_6].join(" ")}>
      {user.type !== UserTypeConstants.ADMIN && (
        <div
          className={generalStyles.flex_container}
          style={{
            width: "40px",
          }}
        >
          <input
            type="checkbox"
            value={order.selected}
            checked={order.selected}
            onChange={() => {
              dispatch(selectedChange(order._id));
            }}
          />
        </div>
      )}

      {(user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.WAREHOUSE) && (
        <>
          <label
            className={tableStyles.label_medium}
            onClick={() => {
              rowClickHandler(order._id);
            }}
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                borderLeft: `1px solid ${Colors.SECONDARY_COLOR}`,
                marginInline: "10px",
                padding: "5px",
              }}
            >
              {order.pharmacyStatus === "received" && (
                <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
              )}
              {order.pharmacyStatus === "sent" && (
                <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
              )}
            </div>
            <label>{order.pharmacy.name}</label>
            <label
              style={{
                paddingInlineStart: "10px",
              }}
            >
              {order.pharmacy.addressDetails}
            </label>
          </label>
        </>
      )}

      {(user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.PHARMACY) && (
        <label
          className={tableStyles.label_medium}
          onClick={() => {
            rowClickHandler(order._id);
          }}
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              borderLeft: `1px solid ${Colors.SECONDARY_COLOR}`,
              marginInline: "10px",
              padding: "5px",
            }}
          >
            {order.warehouseStatus === "unread" && <RiMailUnreadLine />}
            {order.warehouseStatus === "received" && (
              <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
            )}
            {order.warehouseStatus === "sent" && (
              <MdOutlineLocalShipping color={Colors.SUCCEEDED_COLOR} />
            )}
            {order.warehouseStatus === "dontServe" && (
              <MdRemoveDone color={Colors.FAILED_COLOR} />
            )}
          </div>
          {order.warehouse.name}
        </label>
      )}

      <label
        className={tableStyles.label_small}
        onClick={() => {
          rowClickHandler(order._id);
        }}
      >
        {order.orderDate.split("T")[0]}
      </label>

      <label className={tableStyles.label_xsmall}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user.type === UserTypeConstants.ADMIN && !order.seenByAdmin && (
            <RiMailUnreadLine />
          )}
          {user.type === UserTypeConstants.WAREHOUSE &&
            order.warehouseStatus === "sent" && (
              <MdOutlineLocalShipping color={Colors.SUCCEEDED_COLOR} />
            )}
          {user.type === UserTypeConstants.WAREHOUSE &&
            order.warehouseStatus === "unread" && <RiMailUnreadLine />}
          {user.type === UserTypeConstants.WAREHOUSE &&
            order.warehouseStatus === "received" && (
              <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
            )}
          {user.type === UserTypeConstants.WAREHOUSE &&
            order.warehouseStatus === "dontServe" && (
              <MdRemoveDone color={Colors.FAILED_COLOR} />
            )}

          {user.type === UserTypeConstants.PHARMACY &&
            order.pharmacyStatus === "sent" && (
              <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
            )}

          {user.type === UserTypeConstants.PHARMACY &&
            order.pharmacyStatus === "received" && (
              <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
            )}

          {user.type !== UserTypeConstants.WAREHOUSE ? (
            <Icon
              icon={() => <RiDeleteBin5Fill />}
              onclick={() => {
                setShowDeleteModal(true);
              }}
              tooltip={t("delete-order-tooltip")}
              foreColor={Colors.FAILED_COLOR}
            />
          ) : (
            <div></div>
          )}
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
            modalOkHandler(order._id, order.warehouseStatus);
          }}
          color={Colors.FAILED_COLOR}
        >
          <p>{t("delete-order-confirm-msg")}</p>
        </Modal>
      )}

      {deleteErrorMsg !== "" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(deleteErrorMsg)}
          actionAfterTimeout={() => {
            setDeleteErrorMsg("");
          }}
        />
      )}
    </div>
  );
}

export default OrderRow;
