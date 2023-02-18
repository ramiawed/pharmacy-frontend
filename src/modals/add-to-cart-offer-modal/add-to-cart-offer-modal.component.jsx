// Modal that show the item with it's warehouse to allow pharmacy to buy an item
// you should select a quantity greater than zero an less than the selected warehouse max quantity

// Props
// item: the item that the pharmacy will buy
// close: action to close the modal
// setAddItemToCartMsg: method to set the add item to cart message
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
import { OfferTypes, toEnglishNumber } from "../../utils/constants";

// styles
import styles from "./add-to-cart-offer-modal.module.scss";
import OfferDetailsRow from "../../components/offer-details-row/offer-details-row.component";
import SearchInput from "../../components/search-input/search-input.component";

// recursive method to calculate the bonus for the entered quantity
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
        invoiceMinTotal: item.warehouses.warehouse[0].invoiceMinTotal,
        costOfDeliver: item.warehouses.warehouse[0].costOfDeliver,
        fastDeliver: item.warehouses.warehouse[0].fastDeliver,
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

  const quantityChangeHandler = (e) => {
    const value = Number.parseInt(toEnglishNumber(e.target.value));
    setQty(isNaN(value) ? "" : value);
    setQtyError(false);
  };

  const addItemToCartHandler = () => {
    // check that the entered quantity is not zero
    if (qty.length === 0) {
      setQtyError(true);
      return;
    }

    // check if the entered quantity is larger that the allowed quantity in selected warehouse
    if (
      addToCartItem.warehouses.maxQty !== 0 &&
      qty > addToCartItem.warehouses.maxQty
    ) {
      setQtyError(true);
      return;
    }

    // calculate the bonus
    const bonusQty = checkOfferQty(addToCartItem.warehouses, qty);

    // add item to cart
    dispatch(
      addItemToCart({
        item: addToCartItem,
        warehouse: addToCartItem.warehouses,
        qty: qty,
        bonus: bonusQty > 0 ? bonusQty : null,
        bonusType: bonusQty > 0 ? addToCartItem.warehouses.offer.mode : null,
      })
    );

    // add a statistic
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

    // close the modal
    close();

    // inform the user that the item is added to cart
    setAddItemToCartMsg("add-item-to-cart");
  };

  return (
    <>
      <Modal
        header="add-to-cart"
        cancelLabel="cancel-label"
        okLabel="add-label"
        closeModal={close}
        okModal={addItemToCartHandler}
        small={true}
      >
        <div className={styles.container}>
          <label>{t("item-warehouse")}</label>
          <label>{addToCartItem.warehouses.warehouse.name}</label>
        </div>

        <div className={styles.container}>
          <label>{t("item-max-qty")}</label>
          <label>
            {addToCartItem.warehouses.maxQty === 0
              ? "-"
              : addToCartItem.warehouses.maxQty}
          </label>
        </div>

        <SearchInput
          label="selected-qty"
          id="selected-qty"
          type="text"
          value={qty}
          onchange={(e) => {
            quantityChangeHandler(e);
          }}
          withBorder={true}
          hasFocus={true}
        />

        {qtyError && <label className={styles.error}>{t("enter-qty")}</label>}

        {addToCartItem.warehouses.offer.offers.map((o, index) => (
          <OfferDetailsRow
            key={index}
            offer={o}
            offerMode={addToCartItem.warehouses.offer.mode}
          />
        ))}
      </Modal>
    </>
  );
}

export default AddToCartOfferModal;
