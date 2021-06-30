import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { selectUser } from "../../redux/auth/authSlice";
import { selectCartWarehouse } from "../../redux/cart/cartSlice";
import { Colors, UserTypeConstants } from "../../utils/constants";

import Header from "../../components/header/header.component";

import { GiShoppingCart } from "react-icons/gi";

// styles
import styles from "./cart-page.module.scss";
import { useTranslation } from "react-i18next";
import CartWarehouse from "../../components/cart-warehouse/cart-warehouse.compnent";

function CartPage() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const cartWarehouse = useSelector(selectCartWarehouse);

  return user.type === UserTypeConstants.PHARMACY ? (
    <>
      <Header>
        <h2>{t("nav-cart")}</h2>
      </Header>

      {cartWarehouse.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: Colors.SECONDARY_COLOR,
          }}
        >
          <GiShoppingCart size={300} />
          <p>{t("empty-cart")}</p>
        </div>
      )}

      <div>
        {cartWarehouse.map((w, index) => (
          <CartWarehouse warehouse={w} key={index} />
        ))}
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default CartPage;
