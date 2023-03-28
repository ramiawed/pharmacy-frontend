// Modal that show the item with it's warehouse to allow pharmacy to buy an item
// you should select a quantity greater than zero an less than the selected warehouse max quantity

// Props
// item: the item that the pharmacy will buy
// close: action to close the modal
// setAddItemToCartMsg: method to set the add item to cart message
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

// components
import Modal from "../modal/modal.component";
import PointDetailsRow from "../../components/point-details-row/point-details-row.component";
import Separator from "../../components/separator/separator.component";

// redux stuff
import { addItemToCart } from "../../redux/cart/cartSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// constants and utils
import { toEnglishNumber } from "../../utils/constants";

// styles
import styles from "./add-to-cart-offer-modal.module.scss";
import OfferDetailsRow from "../../components/offer-details-row/offer-details-row.component";
import SearchInput from "../../components/search-input/search-input.component";

function AddToCartOfferModal({ item, close, setAddItemToCartMsg }) {
  const addToCartItem = {
    ...item,
    company: {
      _id: item.company[0]._id,
      name: item.company[0].name,
    },
    warehouses: [
      {
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
    ],
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

    const { warehouses, ...item } = addToCartItem;

    const w = {
      maxQty: warehouses[0].maxQty,
      offerMode: warehouses[0].offer?.mode ? warehouses[0].offer?.mode : "",
      offers: warehouses[0].offer?.offers ? warehouses[0].offer?.offers : [],
      points: warehouses[0].points,
      ...warehouses[0].warehouse,
    };

    // add item to cart
    dispatch(
      addItemToCart({
        key: uuidv4(),
        item,
        warehouse: w,
        qty: qty,
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
    setAddItemToCartMsg("add item to cart");
  };

  return (
    <>
      <Modal
        header="add to cart"
        cancelLabel="cancel"
        okLabel="add"
        closeModal={close}
        okModal={addItemToCartHandler}
        small={true}
      >
        <div className={styles.container}>
          <label>{t("warehouse")}</label>
          <label>{addToCartItem.warehouses[0].warehouse.name}</label>
        </div>

        <div className={styles.container}>
          <label>{t("max quantity")}</label>
          <label>
            {addToCartItem.warehouses[0].maxQty === 0
              ? "-"
              : addToCartItem.warehouses.maxQty}
          </label>
        </div>

        <SearchInput
          label="quantity"
          id="selected-qty"
          type="text"
          value={qty}
          onchange={(e) => {
            quantityChangeHandler(e);
          }}
          withBorder={true}
          hasFocus={true}
        />

        {qtyError && (
          <label className={styles.error}>{t("enter qty error")}</label>
        )}

        {addToCartItem.warehouses[0].offer.offers.map((o, index) => (
          <OfferDetailsRow
            key={index}
            offer={o}
            offerMode={addToCartItem.warehouses[0].offer.mode}
          />
        ))}

        {addToCartItem.warehouses[0].points?.length > 0 && <Separator />}

        {addToCartItem.warehouses[0].points?.map((o, index) => (
          <PointDetailsRow key={index} point={o} />
        ))}
      </Modal>
    </>
  );
}

export default AddToCartOfferModal;
