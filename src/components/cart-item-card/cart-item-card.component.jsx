// component contains information about the item in the cart

// Props
// cartItem: object
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react icons
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

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

function CartItemCard({ cartItem, inOrderDetails, withoutMaxQty }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <label
            className={styles.icon}
            onClick={(e) => {
              setExpanded(!expanded);
              e.stopPropagation();
            }}
          >
            {expanded ? <MdExpandLess /> : <MdExpandMore />}
          </label>
          <div className={[styles.name, styles.ellipsis].join(" ")}>
            <label>{cartItem.item.name}</label>
            <label>{cartItem.item.nameAr}</label>
          </div>
          {!inOrderDetails && (
            <div
              className={styles.delete_icon}
              onClick={() => dispatch(removeItemFromCart(cartItem))}
            >
              <RiDeleteBin5Fill size={20} color={Colors.FAILED_COLOR} />
            </div>
          )}
        </div>

        <div className={styles.details}>
          {expanded && (
            <>
              <div className={[styles.row].join(" ")}>
                <div>
                  <label className={[styles.label, styles.first].join(" ")}>
                    {t("item-company")}:
                  </label>
                  <label className={styles.value}>
                    {cartItem.item.company.name}
                  </label>
                </div>
              </div>

              <div className={styles.row}>
                <div>
                  <label className={[styles.label, styles.first].join(" ")}>
                    {t("item-formula")}:
                  </label>
                  <label className={styles.value}>
                    {cartItem.item.formula}
                  </label>
                </div>
                <div>
                  <label className={styles.label}>{t("item-caliber")}:</label>
                  <label className={styles.value}>
                    {cartItem.item.caliber}
                  </label>
                </div>
              </div>
              <div className={styles.row}>
                <div>
                  <label className={[styles.label, styles.first].join(" ")}>
                    {t("item-packing")}:
                  </label>
                  <label className={styles.value}>
                    {cartItem.item.packing}
                  </label>
                </div>
              </div>
            </>
          )}

          <div className={styles.row}>
            <div>
              <label className={[styles.label, styles.first].join(" ")}>
                {t("item-price")}:
              </label>
              <label className={[styles.value, styles.price].join(" ")}>
                {cartItem.item.price}
              </label>
            </div>
            <div>
              <label className={styles.label}>
                {t("item-customer-price")}:
              </label>
              <label
                className={[styles.value, styles.customer_price].join(" ")}
              >
                {cartItem.item.customer_price}
              </label>
            </div>
          </div>

          {expanded &&
            (withoutMaxQty === "without" ? (
              <></>
            ) : (
              <>
                <div className={[styles.row, styles.first].join(" ")}>
                  <div>
                    <label className={styles.label}>{t("item-max-qty")}:</label>
                    <label className={styles.value}>
                      {cartItem.warehouse.maxQty
                        ? cartItem.warehouse.maxQty
                        : ""}
                    </label>
                  </div>
                </div>
              </>
            ))}

          <div className={styles.row}>
            <div>
              <label className={[styles.label, styles.first].join(" ")}>
                {t("quantity-label")}:
              </label>
              {!cartItem.bonus && !inOrderDetails && (
                <label
                  onClick={() => {
                    if (cartItem.qty > 0) dispatch(decreaseItemQty(cartItem));
                  }}
                  className={styles.minus}
                >
                  <AiFillMinusCircle
                    color={Colors.FAILED_COLOR}
                    style={{
                      position: "relative",
                      top: "5px",
                    }}
                  />
                </label>
              )}

              <label className={styles.qty}>{cartItem.qty}</label>

              {!cartItem.bonus && !inOrderDetails && (
                <label
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
                  className={styles.plus}
                >
                  <AiFillPlusCircle
                    color={Colors.SUCCEEDED_COLOR}
                    style={{
                      position: "relative",
                      top: "5px",
                    }}
                  />
                </label>
              )}
            </div>
            <div>
              <label className={[styles.label].join(" ")}>
                {t("offer-label")}:
              </label>
              <label className={styles.value}>
                {cartItem.bonus && cartItem.bonus}
                {cartItem.bonus
                  ? cartItem.bonusType === OfferTypes.PERCENTAGE
                    ? t("after-bonus-percentage-label")
                    : t("after-quantity-label")
                  : "-"}
              </label>
            </div>
          </div>

          <div className={[styles.sum_row].join(" ")}>
            <label className={styles.total_price}>
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
      </div>
    </>
  );
}

export default CartItemCard;
