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
import { Colors } from "../../utils/constants";

function CartRow({ cartItem }) {
  const dispatch = useDispatch();

  return (
    <div className={rowStyles.container}>
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
        <AiFillCaretRight
          onClick={() => {
            if (cartItem.qty > 0) dispatch(decreaseItemQty(cartItem));
          }}
        />
        {cartItem.qty}
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
      </div>
      <label className={tableStyles.label_small}>
        {cartItem.qty * cartItem.item.price}
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
