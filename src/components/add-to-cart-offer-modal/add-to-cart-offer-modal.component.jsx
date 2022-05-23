// Modal that show the item with it's warehouse to allow pharmacy to buy an item
// you should select a quantity greater than zero an less than the selected warehouse max quantity

// Props
// item: the item that the pharmacy will buy
// close: action to close the modal
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Modal from "../modal/modal.component";

// redux stuff
import { addItemToCart } from "../../redux/cart/cartSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// constants and utils
import {
  Colors,
  OfferTypes,
  onKeyPressForNumberInput,
  toEnglishNumber,
} from "../../utils/constants";

// styles
import styles from "./add-to-cart-offer-modal.module.scss";

// check if there is an offer for entered quantity in a specific warehouse
const checkOfferQty = (selectedWarehouse, qty) => {
  // check if the specified warehouse has an offer
  if (selectedWarehouse?.offer.offers.length > 0) {
    // through all the offers, check if the entered quantity has an offer
    for (let i = 0; i < selectedWarehouse.offer.offers.length; i++) {
      // check if the entered quantity has an offer
      if (qty >= selectedWarehouse.offer.offers[i].qty) {
        // if it has return:
        // 1- mode of the offer (pieces, percentage)
        // 2- bonus
        // 2-1: if the mode is pieces return the bonus * (entered qty / bonus qty)
        // 2-2: if the mode is percentage return the bonus
        if (selectedWarehouse.offer.mode === OfferTypes.PERCENTAGE) {
          return selectedWarehouse.offer.offers[i].bonus;
        } else {
          return (
            selectedWarehouse.offer.offers[i].bonus +
            checkOfferQty(
              selectedWarehouse,
              qty - selectedWarehouse.offer.offers[i].qty
            )
          );
        }
      }
    }
  }

  return 0;
};

function AddToCartOfferModal({ item, close, setAddItemToCartMsg }) {
  const addToCartItem = {
    ...item,
    company: {
      _id: item.company[0]._id,
      name: item.company[0].name,
    },
    warehouses: {
      ...item.warehouses,
      warehouse: {
        _id: item.warehouses.warehouse[0]._id,
        name: item.warehouses.warehouse[0].name,
        city: item.warehouses.warehouse[0].city,
        isActive: item.warehouses.warehouse[0].isActive,
        isApproved: item.warehouses.warehouse[0].isApproved,
      },
    },
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const isOnline = useSelector(selectOnlineStatus);

  const [qty, setQty] = useState("");
  const [qtyError, setQtyError] = useState(false);

  const quantityChange = (e) => {
    const value = Number.parseInt(toEnglishNumber(e.target.value));
    setQty(isNaN(value) ? "" : value);
    setQtyError(false);
  };

  const handleAddItemToCart = () => {
    if (qty.length === 0) {
      setQtyError(true);
      return;
    }

    if (
      addToCartItem.warehouses.maxQty !== 0 &&
      qty > addToCartItem.warehouses.maxQty
    ) {
      setQtyError(true);
      return;
    }

    const bonusQty = checkOfferQty(addToCartItem.warehouses, qty);

    dispatch(
      addItemToCart({
        item: addToCartItem,
        warehouse: addToCartItem.warehouses,
        qty: qty,
        bonus: bonusQty > 0 ? bonusQty : null,
        bonusType: bonusQty > 0 ? addToCartItem.warehouses.offer.mode : null,
      })
    );

    if (isOnline) {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetItem: addToCartItem._id,
            action: "item-added-to-cart",
          },
          token,
        })
      );
    }

    close();
    setAddItemToCartMsg("add-item-to-cart");
  };

  return (
    <>
      <Modal
        header="add-to-cart"
        cancelLabel="cancel-label"
        okLabel="add-label"
        closeModal={close}
        okModal={handleAddItemToCart}
        small={true}
      >
        {/* <div className={styles.warehouse_row}> */}
        <div className={styles.select_warehouse}>
          <label className={styles.label}>{t("item-warehouse")}</label>
          <label className={styles.value}>
            {addToCartItem.warehouses.warehouse.name}
          </label>
        </div>

        <div className={styles.max_qty_div}>
          <label className={styles.label}>{t("item-max-qty")}</label>
          <p>
            {addToCartItem.warehouses.maxQty === 0
              ? t("no-limit-qty")
              : addToCartItem.warehouses.maxQty}
          </p>
        </div>
        <div className={styles.selected_qty}>
          <label className={styles.label}>{t("selected-qty")}</label>
          <input
            className={[qtyError ? styles.error : "", styles.input].join(" ")}
            value={qty}
            onKeyPress={onKeyPressForNumberInput}
            onChange={quantityChange}
          />
        </div>
        {/* </div> */}

        <div className={styles.separator}></div>

        {addToCartItem.warehouses.offer.offers.map((o, index) => (
          <div className={styles.offer} key={index}>
            <p>
              <label>{t("quantity-label")}</label>
              <label className={[styles.value, styles.with_padding].join(" ")}>
                {o.qty}
              </label>
              <label className={styles.left_padding}>
                {t("after-quantity-label")}
              </label>
            </p>
            <p>
              <label>
                {addToCartItem.warehouses.offer.mode === OfferTypes.PIECES
                  ? t("bonus-quantity-label")
                  : t("bonus-percentage-label")}
              </label>
              <label className={styles.value}>{o.bonus}</label>
              <label>
                {addToCartItem.warehouses.offer.mode === OfferTypes.PIECES
                  ? t("after-bonus-quantity-label")
                  : t("after-bonus-percentage-label")}
              </label>
            </p>
          </div>
        ))}
      </Modal>
    </>
  );
}

export default AddToCartOfferModal;
