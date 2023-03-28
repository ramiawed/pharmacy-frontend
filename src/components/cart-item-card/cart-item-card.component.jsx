import React from "react";
import { useTranslation } from "react-i18next";

// components
import ItemNames from "../item-names/item-names.component";
import Icon from "../icon/icon.component";

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
import { Colors, formatNumber, OfferTypes } from "../../utils/constants";

function CartItemCard({ cartItem, inOrderDetails, index, iconColor }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const increaseHandler = () => {
    if (
      cartItem.warehouse.maxQty !== 0 &&
      cartItem.qty < cartItem.warehouse.maxQty
    )
      dispatch(increaseItemQty(cartItem.key));
    else if (cartItem.warehouse.maxQty === 0) {
      dispatch(increaseItemQty(cartItem.key));
    }
  };

  const decreaseHandler = () => {
    if (cartItem.qty > 1) dispatch(decreaseItemQty(cartItem.key));
  };

  return (
    <>
      <div
        className={[
          styles.item_row,
          index % 2 === 0 ? styles.grey_bg : "",
        ].join(" ")}
      >
        <div className={styles.row}>
          <div style={{ flex: 1 }}>
            <ItemNames flexDirection="column" item={cartItem.item} />
          </div>

          <div className={styles.additional_container}>
            {!inOrderDetails ? (
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

            {!inOrderDetails ? (
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
                  ? t("percentage")
                  : t("piece")
                : ""}
            </label>

            <label className={styles.label}>
              {cartItem.point} {t("point")}
            </label>

            <label className={styles.label}>
              {formatNumber(cartItem.item.price)}
            </label>

            <label className={styles.label}>
              {formatNumber(
                cartItem.qty *
                  (inOrderDetails ? cartItem.price : cartItem.item.price) -
                  (cartItem.bonus &&
                  cartItem.bonusType === OfferTypes.PERCENTAGE
                    ? (cartItem.qty *
                        (inOrderDetails
                          ? cartItem.price
                          : cartItem.item.price) *
                        cartItem.bonus) /
                      100
                    : 0)
              )}
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
