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
import { changeMyPoints, selectUserData } from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { saveOrder, setRefresh } from "../../redux/orders/ordersSlice";

// components
import Modal from "../../modals/modal/modal.component";
import Loader from "../action-loader/action-loader.component";
import ButtonWithIcon from "../button-with-icon/button-with-icon.component";
import CartItemCard from "../cart-item-card/cart-item-card.component";

// icon
import { MdExpandMore, MdExpandLess } from "react-icons/md";

// styles
import styles from "./cart-warehouse.module.scss";

// constants
import {
  Colors,
  formatNumber,
  OfferTypes,
  OrdersStatusOptions,
} from "../../utils/constants";

function CartWarehouse({ warehouse, wIndex }) {
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
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const computeTotalPrice = (() => {
    let invoiceTotal = 0;
    let itemsPoints = 0;

    cartItems
      .filter((ci) => ci.warehouse.name === warehouse.name)
      .forEach((ci) => {
        invoiceTotal =
          invoiceTotal +
          ci.qty * ci.item.price -
          (ci.bonus && ci.bonusType === OfferTypes.PERCENTAGE
            ? (ci.qty * ci.item.price * ci.bonus) / 100
            : 0);

        itemsPoints = itemsPoints + ci.point;
      });

    return { invoiceTotal, itemsPoints };
  })();

  const numbersOfPoint =
    warehouse.includeInPointSystem &&
    warehouse.pointForAmount &&
    warehouse.amountToGetPoint
      ? Math.floor(
          computeTotalPrice.invoiceTotal / warehouse.amountToGetPoint
        ) * warehouse.pointForAmount
      : 0;

  const checkOrderHandler = () => {
    if (
      warehouse.invoiceMinTotal > 0 &&
      computeTotalPrice.invoiceTotal < warehouse.invoiceMinTotal
    ) {
      setShowWarningMsg(true);
      return;
    }

    setShowConfirmSaveOrder(true);
  };

  const sendOrderHandler = () => {
    // check internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setShowConfirmSaveOrder(false);
    setShowLoadingModal(true);

    let obj = {
      pharmacy: user._id,
      warehouse: warehouse._id,
      items: cartItems
        .filter((ci) => ci.warehouse.name === warehouse.name)
        .map((ci) => {
          return {
            item: ci.item._id,
            qty: ci.qty,
            bonus: ci.bonus,
            bonusType: ci.bonusType,
            price: ci.item.price,
            points: ci.point,
          };
        }),
      totalInvoicePrice: computeTotalPrice.invoiceTotal,
      totalInvoicePoints: numbersOfPoint + computeTotalPrice.itemsPoints,
      status: OrdersStatusOptions.SENT_BY_PHARMACY,
    };

    dispatch(saveOrder({ obj, token }))
      .then(unwrapResult)
      .then(async () => {
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

        if (numbersOfPoint + computeTotalPrice.itemsPoints > 0) {
          try {
            dispatch(
              changeMyPoints({
                token,
                obj: {
                  id: user._id,
                  amount: numbersOfPoint + computeTotalPrice.itemsPoints,
                },
              })
            );
          } catch (err) {}
        }

        setShowLoadingModal(false);
        setShowSuccessModal(true);
      })
      .catch(() => {
        setShowLoadingModal(false);
        setShowFailedModal(true);
      });
    dispatch(setRefresh(true));
  };

  return (
    <div
      className={[
        styles.container,
        wIndex % 2 === 0 ? styles.grey_bg : "",
      ].join(" ")}
    >
      <div className={styles.header}>
        <div className={styles.name} onClick={() => setExpanded(!expanded)}>
          <label className={styles.icon}>
            {expanded ? <MdExpandMore /> : <MdExpandLess />}
          </label>
          <label>{warehouse.name}</label>
        </div>
        <label>
          <ButtonWithIcon
            text={t("send order")}
            bgColor={Colors.MAIN_COLOR}
            action={checkOrderHandler}
          />
        </label>
      </div>

      {expanded && (
        <>
          {cartItems
            .filter((ci) => ci.warehouse.name === warehouse.name)
            .map((ci, index) => (
              <CartItemCard
                key={index}
                cartItem={ci}
                inOrderDetails={false}
                index={index}
                iconColor={
                  wIndex % 2 === 0 ? Colors.WHITE_COLOR : Colors.MAIN_COLOR
                }
              />
            ))}
        </>
      )}

      <div className={styles.additional_warehouse_info_div}>
        <label>
          {t("total invoice price")}:{" "}
          {formatNumber(computeTotalPrice.invoiceTotal)}
        </label>

        {numbersOfPoint > 0 && (
          <label>
            {t("number of points that you get")}:{" "}
            {numbersOfPoint + computeTotalPrice.itemsPoints}
          </label>
        )}

        {warehouse.costOfDeliver > 0 && (
          <label>
            {t("deliver cost")}: {warehouse.costOfDeliver} %
          </label>
        )}

        {warehouse.invoiceMinTotal > 0 && (
          <label>
            {t("minimum invoice cost")}:{" "}
            {formatNumber(warehouse.invoiceMinTotal)}
          </label>
        )}

        {warehouse.fastDeliver && <label>{t("fast deliver")}</label>}
        {warehouse.payAtDeliver && (
          <label className={styles.pay_label}>
            {t("dear partner pay when deliver")}
          </label>
        )}
      </div>

      {showLoadingModal && <Loader allowCancel={false} />}

      {showSuccessModal && (
        <Modal
          closeModal={() => {
            setShowSuccessModal(false);
            dispatch(resetCartItems(warehouse));
          }}
          header={t("send order")}
          cancelLabel={t("close")}
          small={true}
          green={true}
        >
          {t("send order succeeded")}
        </Modal>
      )}

      {showFailedModal && (
        <Modal
          closeModal={() => {
            setShowFailedModal(false);
          }}
          header={t("send order")}
          cancelLabel={t("close")}
          small={true}
        >
          {t("send order failed")}
        </Modal>
      )}

      {showConfirmSaveOrder && (
        <Modal
          closeModal={() => {
            setShowConfirmSaveOrder(false);
          }}
          header={t("send order")}
          cancelLabel={t("cancel")}
          okLabel={t("send order")}
          okModal={sendOrderHandler}
          small={true}
        >
          {t("confirm save order")}
        </Modal>
      )}

      {showWarningMsg && (
        <Modal
          closeModal={() => {
            setShowWarningMsg(false);
          }}
          header={t("minimum invoice cost")}
          cancelLabel={t("cancel")}
          small={true}
        >
          {t("minimum invoice cost error")}
        </Modal>
      )}
    </div>
  );
}

export default CartWarehouse;
