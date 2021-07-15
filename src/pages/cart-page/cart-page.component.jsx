import React from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";

// redux-stuff
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectCartWarehouse } from "../../redux/cart/cartSlice";

// components
import Header from "../../components/header/header.component";
import CartWarehouse from "../../components/cart-warehouse/cart-warehouse.component";

// react-icons
import { GiShoppingCart } from "react-icons/gi";

// styles
import generalStyles from "../../style.module.scss";

// constants and colors
import { UserTypeConstants } from "../../utils/constants";

function CartPage() {
  const { t } = useTranslation();

  // get the logged user from redux store
  const user = useSelector(selectUser);
  // get the cart warehouses from redux store
  const cartWarehouse = useSelector(selectCartWarehouse);

  // if there is no logged user or user type is not pharmacy
  // redirect to the main page
  return user && user.type === UserTypeConstants.PHARMACY ? (
    <>
      {/* if cart contains an item or more */}
      {cartWarehouse.length > 0 && (
        <>
          <Header>
            <h2>{t("cart")}</h2>
          </Header>

          <div>
            {cartWarehouse.map((w, index) => (
              <CartWarehouse warehouse={w} key={index} />
            ))}
          </div>
        </>
      )}

      {/* if the cart is empty */}
      {cartWarehouse.length === 0 && (
        <div
          className={[
            generalStyles.empty,
            generalStyles.margin_h_auto,
            generalStyles.bg_secondary,
            generalStyles.fc_white,
          ].join(" ")}
        >
          <GiShoppingCart size={250} />
          <p>{t("empty-cart")}</p>
        </div>
      )}
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default CartPage;
