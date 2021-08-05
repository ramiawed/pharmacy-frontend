// YOU HAVE TO BE A PHARMACY USER TO SHOW THIS COMPONENT

// this component page display the items you buy divided by warehouse name
// if the cart is empty display an empty icon

// this component page depends on the cartSlice that contains
// 1- cartWarehouse: all warehouse that user buy medicine from it
// 2- cartItems: all the item that user buy it

import React, { useState } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import axios from "../../api/pharmacy";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  resetCartItems,
  selectCartItems,
  selectCartWarehouse,
} from "../../redux/cart/cartSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import Header from "../../components/header/header.component";
import CartWarehouse from "../../components/cart-warehouse/cart-warehouse.component";
import Modal from "../../components/modal/modal.component";

// react-icons
import { GiShoppingCart } from "react-icons/gi";

// styles
import generalStyles from "../../style.module.scss";

// constants and colors
import { Colors, OfferTypes, UserTypeConstants } from "../../utils/constants";
import { statisticsOrders } from "../../redux/statistics/statisticsSlice";
import ActionButton from "../../components/action-button/action-button.component";
import Button from "../../components/button/button.component";

function CartPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  // get the logged user from redux store
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  // get the cart warehouses from redux store
  const cartWarehouse = useSelector(selectCartWarehouse);

  const cartItems = useSelector(selectCartItems);

  const computeTotalPrice = () => {
    let total = 0;

    cartItems.forEach((item) => {
      total =
        total +
        item.qty * item.item.price -
        (item.bonus && item.bonusType === OfferTypes.PERCENTAGE
          ? (item.qty * item.item.price * item.bonus) / 100
          : 0);
    });

    return total;
  };

  const handleSendOrder = () => {
    // check internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setShowLoadingModal(true);
    let cartItemsToSend = cartItems.map((e) => {
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

    cartItemsToSend = cartItemsToSend.sort((a, b) => {
      if (a.warehouseName > b.warehouseName) return 1;
      if (a.warehouseName < b.warehouseName) return -1;
      return 0;
    });

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
        "/users/sendemail",
        { cartItems: cartItemsToSend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(statisticsOrders({ token }));
        setShowLoadingModal(false);
        setShowSuccessModal(true);
      })
      .catch(() => {
        setShowLoadingModal(false);
        setShowFailedModal(true);
      });
  };

  // if there is no logged user or user type is not pharmacy
  // redirect to the main page
  return user && user.type === UserTypeConstants.PHARMACY ? (
    <>
      {/* if cart contains an item or more */}
      {cartWarehouse.length > 0 && (
        <>
          <Header>
            <h2>{t("cart")}</h2>
          </Header>

          <div>
            {cartWarehouse.map((w, index) => (
              <CartWarehouse warehouse={w} key={index} />
            ))}
          </div>

          {/* <ActionButton
            text={t("send-order")}
            action={handleSendOrder}
            color={Colors.SECONDARY_COLOR}
          /> */}
          <Button
            text={t("send-order")}
            bgColor={Colors.SECONDARY_COLOR}
            action={handleSendOrder}
          />
          <button
            className={[
              generalStyles.button,
              generalStyles.bg_secondary,
              generalStyles.fc_white,
              generalStyles.block,
              generalStyles.margin_h_auto,
              generalStyles.padding_v_6,
              generalStyles.padding_h_12,
            ].join(" ")}
            onClick={() => handleSendOrder()}
          >
            {t("send-order")}
          </button>
        </>
      )}

      {/* if the cart is empty */}
      {cartWarehouse.length === 0 && (
        <div
          className={[
            generalStyles.empty,
            generalStyles.margin_h_auto,
            generalStyles.bg_secondary,
            generalStyles.fc_white,
          ].join(" ")}
        >
          <GiShoppingCart size={250} />
          <p>{t("empty-cart")}</p>
        </div>
      )}

      {showSuccessModal && (
        <Modal
          closeModal={() => {
            setShowSuccessModal(false);
            dispatch(resetCartItems());
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

      {showLoadingModal && (
        <Modal
          closeModal={() => {
            setShowLoadingModal(false);
          }}
          header={t("send-order")}
          cancelLabel={t("cancel-label")}
          small={true}
        >
          {t("send-order-loading")}
        </Modal>
      )}
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default CartPage;
