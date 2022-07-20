import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { resetCartItems, selectCartItems } from "../../redux/cart/cartSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { saveOrder, setRefresh } from "../../redux/orders/ordersSlice";

// components
import Modal from "../modal/modal.component";
import Loader from "../action-loader/action-loader.component";
import ButtonWithIcon from "../button-with-icon/button-with-icon.component";
import CartItemCard from "../cart-item-card/cart-item-card.component";

// icon
import { MdExpandMore, MdExpandLess } from "react-icons/md";

// styles
import styles from "./cart-warehouse.module.scss";

// constants
import { Colors, OfferTypes } from "../../utils/constants";

function CartWarehouse({ warehouse }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token, user } = useSelector(selectUserData);
  const cartItems = useSelector(selectCartItems);

  // own state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showConfirmSaveOrder, setShowConfirmSaveOrder] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const computeTotalPrice = () => {
    let total = 0;

    cartItems
      .filter((item) => item.warehouse.warehouse.name === warehouse)
      .forEach((item) => {
        total =
          total +
          item.qty * item.item.price -
          (item.bonus && item.bonusType === OfferTypes.PERCENTAGE
            ? (item.qty * item.item.price * item.bonus) / 100
            : 0);
      });

    return total;
  };

  const sendOrderHandler = () => {
    // check internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setShowLoadingModal(true);

    let obj = {
      pharmacy: user._id,
      warehouse: cartItems.filter(
        (item) => item.warehouse.warehouse.name === warehouse
      )[0].warehouse.warehouse._id,
      items: cartItems
        .filter((item) => item.warehouse.warehouse.name === warehouse)
        .map((e) => {
          return {
            item: e.item._id,
            qty: e.qty,
            bonus: e.bonus,
            bonusType: e.bonusType,
            price: e.item.price,
            customer_price: e.item.customer_price,
          };
        }),
    };

    dispatch(saveOrder({ obj, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetUser: null,
              action: "user-made-an-order",
            },
            token,
          })
        );
        setShowLoadingModal(false);
        setShowSuccessModal(true);
      })
      .catch((err) => {
        setShowLoadingModal(false);
        setShowFailedModal(true);
      });
    dispatch(setRefresh(true));
  };

  return (
    <div className={[styles.container]}>
      <div className={styles.header}>
        <div className={styles.name} onClick={() => setExpanded(!expanded)}>
          <label className={styles.icon}>
            {expanded ? <MdExpandMore /> : <MdExpandLess />}
          </label>
          <label>{warehouse}</label>
        </div>
        <label>
          <ButtonWithIcon
            text={t("send-order")}
            bgColor={Colors.SUCCEEDED_COLOR}
            action={() => setShowConfirmSaveOrder(true)}
          />
        </label>
        <label className={styles.total_price}>{computeTotalPrice()}</label>
      </div>

      {expanded && (
        <>
          {cartItems
            .filter((item) => item.warehouse.warehouse.name === warehouse)
            .map((item, index) => (
              <div key={index}>
                <CartItemCard cartItem={item} inOrderDetails={false} />
              </div>
            ))}
        </>
      )}

      {showLoadingModal && <Loader allowCancel={false} />}

      {showSuccessModal && (
        <Modal
          closeModal={() => {
            setShowSuccessModal(false);
            dispatch(resetCartItems(warehouse));
          }}
          header={t("send-order")}
          cancelLabel={t("close-label")}
          small={true}
          green={true}
        >
          {t("send-order-succeeded")}
        </Modal>
      )}

      {showFailedModal && (
        <Modal
          closeModal={() => {
            setShowFailedModal(false);
          }}
          header={t("send-order")}
          cancelLabel={t("close-label")}
          small={true}
        >
          {t("send-order-failed")}
        </Modal>
      )}

      {showConfirmSaveOrder && (
        <Modal
          closeModal={() => {
            setShowConfirmSaveOrder(false);
          }}
          header={t("send-order")}
          cancelLabel={t("cancel-label")}
          okLabel={t("send-order")}
          okModal={sendOrderHandler}
          small={true}
        >
          {t("confirm-save-order")}
        </Modal>
      )}
    </div>
  );
}

export default CartWarehouse;
