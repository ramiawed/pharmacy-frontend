import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

// components
import Icon from "../icon/icon.component";
import Modal from "../../modals/modal/modal.component";
import Toast from "../toast/toast.component";

// react-redux
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// icons
import { RiDeleteBin5Fill } from "react-icons/ri";

// styles
import styles from "./order-row.module.scss";

// constants
import {
  Colors,
  OrdersStatusOptions,
  UserTypeConstants,
} from "../../utils/constants";

function OrderRow({ order, deleteAction, type, index }) {
  const { t } = useTranslation();
  const history = useHistory();

  const { user } = useSelector(selectUserData);

  // own state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");

  const rowClickHandler = (id) => {
    if (type === "normal") {
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
    <>
      <div
        className={[
          styles.outer_container,
          index % 2 === 0 ? styles.grey_div : "",
        ].join(" ")}
      >
        <div className={styles.container}>
          <div className={[styles.details].join(" ")}>
            {(user.type === UserTypeConstants.ADMIN ||
              user.type === UserTypeConstants.WAREHOUSE) && (
              <div
                className={styles.pharmacy_info_div}
                onClick={() => {
                  rowClickHandler(order._id);
                }}
              >
                <label className={styles.name}>{order.pharmacy.name}</label>{" "}
                <label className={styles.address}>
                  {order.pharmacy.addressDetails}
                </label>
              </div>
            )}

            {(user.type === UserTypeConstants.ADMIN ||
              user.type === UserTypeConstants.PHARMACY) && (
              <div
                className={styles.warehouse_info_div}
                onClick={() => {
                  rowClickHandler(order._id);
                }}
              >
                <label className={styles.name}>{order.warehouse.name}</label>
              </div>
            )}

            <div
              className={styles.date_div}
              onClick={() => {
                rowClickHandler(order._id);
              }}
            >
              <label>{order.createdAt?.split("T")[0]}</label>
            </div>
          </div>

          {user.type !== UserTypeConstants.WAREHOUSE ? (
            <div className={styles.actions}>
              <Icon
                icon={() => <RiDeleteBin5Fill size={24} />}
                onclick={() => {
                  setShowDeleteModal(true);
                }}
                tooltip={t("delete-order-tooltip")}
                foreColor={Colors.FAILED_COLOR}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div
          className={styles.status_div}
          onClick={() => {
            rowClickHandler(order._id);
          }}
        >
          <label style={{ textAlign: "center" }}>
            {t(order.status)}
            {order.status === OrdersStatusOptions.WILL_DONT_SERVER && (
              <label>{order.couldNotDeliverDate.split("T")[0]}</label>
            )}
            {order.status === OrdersStatusOptions.CONFIRM && (
              <label>{order.confirmDate.split("T")[0]}</label>
            )}
            {order.status === OrdersStatusOptions.DELIVERY && (
              <label>
                {order.deliverDate?.split("T")[0]}{" "}
                {order.deliverTime
                  ? `---${t("time-label")}: ${order.deliverTime}`
                  : ""}
              </label>
            )}
            {order.status === OrdersStatusOptions.SHIPPING && (
              <label>
                {order.shippedDate
                  ? order.shippedDate.split("T")[0]
                  : t("shipped-done")}
                {order.shippedTime
                  ? `---${t("time-label")}: ${order.shippedTime}`
                  : ""}
              </label>
            )}
          </label>
        </div>
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
    </>
  );
}

export default OrderRow;
