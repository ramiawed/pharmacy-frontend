import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { selectUser } from "../../redux/auth/authSlice";
import {
  selectCartItems,
  selectCartWarehouse,
} from "../../redux/cart/cartSlice";
import { UserTypeConstants } from "../../utils/constants";

import Header from "../../components/header/header.component";
import TableHeader from "../../components/table-header/table-header.component";

// styles
import styles from "./cart-page.module.scss";
import tableStyles from "../../components/table.module.scss";
import { useTranslation } from "react-i18next";
import CartRow from "../../components/cart-row/cart-row.component";
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
