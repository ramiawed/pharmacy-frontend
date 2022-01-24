import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { resetCartItems, selectCartItems } from "../../redux/cart/cartSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { statisticsOrders } from "../../redux/statistics/statisticsSlice";

// components
import CartRow from "../cart-row/cart-row.component";
import Button from "../button/button.component";
import CartWarehouseTableHeader from "../cart-warehouse-table-header/cart-warehouse-table-header.component";
import Modal from "../modal/modal.component";
import Loader from "../action-loader/action-loader.component";

// styles
import styles from "./cart-warehouse.module.scss";

// constants
import { BASEURL, Colors, OfferTypes } from "../../utils/constants";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { saveOrder, setRefresh } from "../../redux/orders/ordersSlice";

function CartWarehouse({ warehouse }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token, user } = useSelector(selectUserData);
  const cartItems = useSelector(selectCartItems);
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  // own state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

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

    let cartItemsToSend = cartItems
      .filter((item) => item.warehouse.warehouse.name === warehouse)
      .map((e) => {
        return {
          itemName: e.item.name,
          companyName: e.item.company.name,
          warehouseName: e.warehouse.warehouse.name,
          formula: e.item.formula,
          caliber: e.item.caliber,
          packing: e.item.packing,
          price: e.item.price,
          customerPrice: e.item.customer_price,
          quantity: e.qty,
          bonus: e.bonusType
            ? `${e.bonus} ${e.bonusType === "pieces" ? "قطع" : "%"}`
            : "",
          totalPrice:
            e.qty * e.item.price -
            (e.bonus && e.bonusType === "percentage"
              ? (e.qty * e.item.price * e.bonus) / 100
              : 0),
        };
      });

    // if (saveOrders) {
    //   let obj = {
    //     pharmacy: user._id,
    //     warehouse: cartItems.filter(
    //       (item) => item.warehouse.warehouse.name === warehouse
    //     )[0].warehouse.warehouse._id,
    //     items: cartItems
    //       .filter((item) => item.warehouse.warehouse.name === warehouse)
    //       .map((e) => {
    //         return {
    //           item: e.item._id,
    //           qty: e.qty,
    //           bonus: e.bonus,
    //           bonusType: e.bonusType,
    //           price: e.item.price,
    //           customer_price: e.item.customer_price,
    //         };
    //       }),
    //   };

    //   dispatch(saveOrder({ obj, token }));
    //   dispatch(setRefresh(true));
    // }

    cartItemsToSend = [
      ...cartItemsToSend,
      {
        itemName: "",
        companyName: "",
        warehouseName: "",
        formula: "",
        caliber: "",
        packing: "",
        price: "",
        customerPrice: "",
        quantity: "",
        bonus: "",
        totalPrice: computeTotalPrice(),
      },
    ];

    axios
      .post(
        `${BASEURL}/users/sendemail`,
        { cartItems: cartItemsToSend },
        {
          timeout: 25000,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(statisticsOrders({ token }));
        setShowLoadingModal(false);
        setShowSuccessModal(true);
        if (saveOrders) {
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

          dispatch(saveOrder({ obj, token }));
          dispatch(setRefresh(true));
        }
      })
      .catch((err) => {
        setShowLoadingModal(false);
        setShowFailedModal(true);
      });
  };

  return (
    <>
      <h4 className={styles.header}>{warehouse}</h4>
      <CartWarehouseTableHeader />
      {cartItems
        .filter((item) => item.warehouse.warehouse.name === warehouse)
        .map((item, index) => (
          <CartRow cartItem={item} key={index} />
        ))}

      <p className={styles.total_price}>
        {t("total-invoice-price")} {computeTotalPrice()}
      </p>

      <Button
        text={t("send-order")}
        bgColor={Colors.SUCCEEDED_COLOR}
        action={sendOrderHandler}
      />

      {showLoadingModal && <Loader allowCancel={false} />}

      {showSuccessModal && (
        <Modal
          closeModal={() => {
            setShowSuccessModal(false);
            dispatch(resetCartItems(warehouse));
          }}
          header={t("send-order")}
          cancelLabel={t("cancel-label")}
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
          cancelLabel={t("cancel-label")}
          small={true}
        >
          {t("send-order-failed")}
        </Modal>
      )}
    </>
  );
}

export default CartWarehouse;
