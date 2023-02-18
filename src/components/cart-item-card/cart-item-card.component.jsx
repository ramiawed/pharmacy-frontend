import React from "react";
import { useTranslation } from "react-i18next";

// react icons
import {
  RiArrowDropLeftFill,
  RiArrowDropRightFill,
  RiDeleteBin5Fill,
} from "react-icons/ri";

// redux stuff
import { useDispatch } from "react-redux";
import {
  decreaseItemQty,
  increaseItemQty,
  removeItemFromCart,
} from "../../redux/cart/cartSlice";

// styles
import styles from "./cart-item-card.module.scss";

// constants
import { Colors, OfferTypes } from "../../utils/constants";
import Icon from "../icon/icon.component";
import ItemNames from "../item-names/item-names.component";

function CartItemCard({
  cartItem,
  inOrderDetails,
  withoutMaxQty,
  index,
  iconColor,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const increaseHandler = () => {
    if (
      cartItem.warehouse.maxQty !== 0 &&
      cartItem.qty < cartItem.warehouse.maxQty
    )
      dispatch(increaseItemQty(cartItem));
    else if (cartItem.warehouse.maxQty === 0) {
      dispatch(increaseItemQty(cartItem));
    }
  };

  const decreaseHandler = () => {
    if (cartItem.qty > 1) dispatch(decreaseItemQty(cartItem));
  };

  return (
    <>
      <div
        className={[
          styles.item_row,
          index % 2 === 0 ? styles.grey_bg : "",
        ].join(" ")}
      >
        <div className={styles.first_row}>
          <label className={styles.small_label}>{index + 1}</label>
          <ItemNames flexDirection="column" item={cartItem.item} />

          <div className={styles.additional_container}>
            {!cartItem.bonus && !inOrderDetails ? (
              <Icon
                onclick={decreaseHandler}
                icon={() => (
                  <RiArrowDropRightFill
                    color={iconColor ? iconColor : Colors.MAIN_COLOR}
                    size={32}
                  />
                )}
              />
            ) : (
              <label style={{ width: "32px" }}></label>
            )}

            <label className={styles.label}>{cartItem.qty}</label>

            {!cartItem.bonus && !inOrderDetails ? (
              <Icon
                onclick={increaseHandler}
                icon={() => (
                  <RiArrowDropLeftFill
                    color={iconColor ? iconColor : Colors.MAIN_COLOR}
                    size={32}
                  />
                )}
              />
            ) : (
              <label style={{ width: "32px" }}></label>
            )}

            <label className={styles.label}>
              {cartItem.bonus && cartItem.bonus}{" "}
              {cartItem.bonus
                ? cartItem.bonusType === OfferTypes.PERCENTAGE
                  ? t("after-bonus-percentage-label")
                  : t("after-quantity-label")
                : "-"}
            </label>

            <label className={styles.label}>{cartItem.item.price}</label>

            <label className={styles.label}>
              {cartItem.qty *
                (inOrderDetails ? cartItem.price : cartItem.item.price) -
                (cartItem.bonus && cartItem.bonusType === OfferTypes.PERCENTAGE
                  ? (cartItem.qty *
                      (inOrderDetails ? cartItem.price : cartItem.item.price) *
                      cartItem.bonus) /
                    100
                  : 0)}
            </label>
          </div>
        </div>
        {!inOrderDetails && (
          <Icon
            foreColor={Colors.MAIN_COLOR}
            icon={() => (
              <RiDeleteBin5Fill size={24} color={Colors.FAILED_COLOR} />
            )}
            onclick={() => dispatch(removeItemFromCart(cartItem))}
          />
        )}
      </div>
    </>
  );
}

export default CartItemCard;
