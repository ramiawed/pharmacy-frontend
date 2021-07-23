import React from "react";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import styles from "./cart-row.module.scss";
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";
import { useDispatch } from "react-redux";
import {
  decreaseItemQty,
  increaseItemQty,
  removeItemFromCart,
} from "../../redux/cart/cartSlice";
import ActionButton from "../action-button/action-button.component";
import { Colors, OfferTypes } from "../../utils/constants";
import { useTranslation } from "react-i18next";

function CartRow({ cartItem }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div
      className={[
        rowStyles.container,
        cartItem.bonus ? styles.bonus_row : "",
      ].join(" ")}
    >
      <label className={tableStyles.label_medium}>{cartItem.item.name}</label>
      <label className={tableStyles.label_small}>
        {cartItem.item.company.name}
      </label>
      <label className={tableStyles.label_small}>{cartItem.item.formula}</label>
      <label className={tableStyles.label_small}>
        {cartItem.item.caliber} / {cartItem.item.packing}
      </label>
      <label className={tableStyles.label_small}>
        {cartItem.item.price} / {cartItem.item.customer_price}
      </label>
      <label className={tableStyles.label_small}>
        {cartItem.warehouse.maxQty ? cartItem.warehouse.maxQty : ""}
      </label>
      <div className={[tableStyles.label_small, styles.qty].join(" ")}>
        {!cartItem.bonus && (
          <AiFillCaretRight
            onClick={() => {
              if (cartItem.qty > 0) dispatch(decreaseItemQty(cartItem));
            }}
          />
        )}
        {cartItem.qty}
        {!cartItem.bonus && (
          <AiFillCaretLeft
            onClick={() => {
              if (
                cartItem.warehouse.maxQty !== 0 &&
                cartItem.qty < cartItem.warehouse.maxQty
              )
                dispatch(increaseItemQty(cartItem));
              else if (cartItem.warehouse.maxQty === 0) {
                dispatch(increaseItemQty(cartItem));
              }
            }}
          />
        )}
      </div>

      <label className={tableStyles.label_xsmall}>
        {cartItem.bonus && cartItem.bonus}{" "}
        {cartItem.bonus
          ? cartItem.bonusType === OfferTypes.PERCENTAGE
            ? t("after-bonus-percentage-label")
            : t("after-quantity-label")
          : "-"}
      </label>
      <label className={tableStyles.label_small}>
        {cartItem.qty * cartItem.item.price -
          (cartItem.bonus && cartItem.bonusType === OfferTypes.PERCENTAGE
            ? (cartItem.qty * cartItem.item.price * cartItem.bonus) / 100
            : 0)}
      </label>
      <label className={tableStyles.label_xsmall}>
        <ActionButton
          icon={() => <MdDelete />}
          color={Colors.FAILED_COLOR}
          tooltip="delete-cart-row"
          action={() => dispatch(removeItemFromCart(cartItem))}
        />
      </label>
    </div>
  );
}

export default CartRow;