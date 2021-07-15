import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/cart/cartSlice";

import TableHeader from "../table-header/table-header.component";
import CartRow from "../cart-row/cart-row.component";

import tableStyles from "../table.module.scss";
import styles from "./cart-warehouse.module.scss";
import { OfferTypes } from "../../utils/constants";

function CartWarehouse({ warehouse }) {
  const { t } = useTranslation();

  const cartItems = useSelector(selectCartItems);

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

  return (
    <>
      <h4 className={styles.header}>{warehouse}</h4>
      <TableHeader>
        <label className={tableStyles.label_medium}>
          {t("item-trade-name")}
        </label>
        <label className={tableStyles.label_small}>
          {t("user-company-name")}
        </label>
        <label className={tableStyles.label_small}>{t("item-formula")}</label>
        <label className={tableStyles.label_small}>
          {t("item-caliber")}/{t("item-packing")}
        </label>
        <label className={tableStyles.label_small}>{t("price")}</label>
        <label className={tableStyles.label_small}>{t("item-max-qty")}</label>
        <label className={tableStyles.label_small}>{t("selected-qty")}</label>
        <label className={tableStyles.label_xsmall}>{t("offer-label")}</label>
        <label className={tableStyles.label_small}>{t("total-price")}</label>
        <label className={tableStyles.label_xsmall}></label>
      </TableHeader>

      {cartItems
        .filter((item) => item.warehouse.warehouse.name === warehouse)
        .map((item, index) => (
          <CartRow cartItem={item} key={index} />
        ))}

      <p className={styles.total_price}>
        {t("total-invoice-price")} {computeTotalPrice()}
      </p>
    </>
  );
}

export default CartWarehouse;
