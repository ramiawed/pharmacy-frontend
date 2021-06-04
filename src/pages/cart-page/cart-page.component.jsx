import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { selectUser } from "../../redux/auth/authSlice";
import { UserTypeConstants } from "../../utils/constants";

// styles
import styles from "./cart-page.module.scss";

function CartPage() {
  const user = useSelector(selectUser);

  return user.type === UserTypeConstants.PHARMACY ? (
    <div>Cart Page</div>
  ) : (
    <Redirect to="/" />
  );
}

export default CartPage;
