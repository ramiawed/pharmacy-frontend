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
import {
  decrementUnreadOrder as basketDecrementUnreadOrder,
  selectedChange as basketSelectedChange,
  updateOrder as basketUpdateOrder,
} from "../../redux/basketOrdersSlice/basketOrdersSlice";

// icons
import {
  RiDeleteBin5Fill,
  RiMailUnreadLine,
  RiSendPlaneFill,
} from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";
import { MdOutlineLocalShipping, MdRemoveDone } from "react-icons/md";

// styles
import styles from "./order-row.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function OrderRow({ order, deleteAction, type }) {
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
        dispatch(
          type === "order"
            ? updateOrder({ id, obj, token })
            : basketUpdateOrder({ id, obj, token })
        )
          .then(unwrapResult)
          .then(() => {
            dispatch(
              type === "order"
                ? decrementUnreadOrder({ token })
                : basketDecrementUnreadOrder({ token })
            );
          });
      }
    }

    if (type === "order") {
      history.push(`/order-details?${id}`);
    } else {
      history.push(`/basket-order-details?${id}`);
    }
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
    <div className={styles.container}>
      {user.type !== UserTypeConstants.ADMIN && (
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            value={order.selected}
            checked={order.selected}
            onChange={() => {
              dispatch(
                type === "order"
                  ? selectedChange(order._id)
                  : basketSelectedChange(order._id)
              );
            }}
          />
        </div>
      )}

      <div
        className={[
          styles.details,
          user.type !== UserTypeConstants.ADMIN ? styles.withBorder : null,
        ].join(" ")}
      >
        {(user.type === UserTypeConstants.ADMIN ||
          user.type === UserTypeConstants.WAREHOUSE) && (
          <div
            className={styles.row}
            onClick={() => {
              rowClickHandler(order._id);
            }}
          >
            {order.pharmacyStatus === "received" && (
              <BsCheckAll size={24} color={Colors.SUCCEEDED_COLOR} />
            )}
            {order.pharmacyStatus === "sent" && (
              <RiSendPlaneFill size={24} color={Colors.SUCCEEDED_COLOR} />
            )}
            <label className={styles.name}>{order.pharmacy.name}</label>
            <label className={styles.address}>
              {order.pharmacy.addressDetails}
            </label>
          </div>
        )}

        {(user.type === UserTypeConstants.ADMIN ||
          user.type === UserTypeConstants.PHARMACY) && (
          <div
            className={styles.row}
            onClick={() => {
              rowClickHandler(order._id);
            }}
          >
            {order.warehouseStatus === "unread" && (
              <RiMailUnreadLine size={24} color={Colors.MAIN_COLOR} />
            )}
            {order.warehouseStatus === "received" && (
              <BsCheckAll size={24} color={Colors.SUCCEEDED_COLOR} />
            )}
            {order.warehouseStatus === "sent" && (
              <MdOutlineLocalShipping
                size={24}
                color={Colors.SUCCEEDED_COLOR}
              />
            )}
            {order.warehouseStatus === "dontServe" && (
              <MdRemoveDone size={24} color={Colors.FAILED_COLOR} />
            )}
            <label className={styles.name}>{order.warehouse.name}</label>
          </div>
        )}

        <div
          className={[styles.row, styles.date].join(" ")}
          onClick={() => {
            rowClickHandler(order._id);
          }}
        >
          <label>{order.createdAt?.split("T")[0]}</label>
        </div>
      </div>

      <div className={styles.actions}>
        {user.type === UserTypeConstants.ADMIN && !order.seenByAdmin && (
          <RiMailUnreadLine size={24} color={Colors.MAIN_COLOR} />
        )}
        {user.type === UserTypeConstants.WAREHOUSE &&
          order.warehouseStatus === "sent" && (
            <MdOutlineLocalShipping size={24} color={Colors.SUCCEEDED_COLOR} />
          )}
        {user.type === UserTypeConstants.WAREHOUSE &&
          order.warehouseStatus === "unread" && (
            <RiMailUnreadLine size={24} color={Colors.MAIN_COLOR} />
          )}
        {user.type === UserTypeConstants.WAREHOUSE &&
          order.warehouseStatus === "received" && (
            <BsCheckAll size={24} color={Colors.SUCCEEDED_COLOR} />
          )}
        {user.type === UserTypeConstants.WAREHOUSE &&
          order.warehouseStatus === "dontServe" && (
            <MdRemoveDone size={24} color={Colors.FAILED_COLOR} />
          )}

        {user.type === UserTypeConstants.PHARMACY &&
          order.pharmacyStatus === "sent" && (
            <RiSendPlaneFill size={24} color={Colors.SUCCEEDED_COLOR} />
          )}

        {user.type === UserTypeConstants.PHARMACY &&
          order.pharmacyStatus === "received" && (
            <BsCheckAll size={24} color={Colors.SUCCEEDED_COLOR} />
          )}

        {user.type !== UserTypeConstants.WAREHOUSE ? (
          <Icon
            icon={() => <RiDeleteBin5Fill size={24} />}
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
