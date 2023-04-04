// YOU HAVE TO BE A PHARMACY USER TO SHOW THIS COMPONENT

// this component page display the items you buy divided by warehouse name
// if the cart is empty display an empty icon

// this component page depends on the cartSlice that contains
// 1- cartWarehouse: all warehouse that user buy medicine from it
// 2- cartItems: all the item that user buy it

import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";

// redux-stuff
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectCartWarehouse } from "../../redux/cart/cartSlice";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import CartWarehouse from "../../components/cart-warehouse/cart-warehouse.component";
import NoContent from "../../components/no-content/no-content.component";
import Header from "../../components/header/header.component";

// constants and colors
import { UserTypeConstants } from "../../utils/constants";

function CartPage({ onSelectedChange }) {
  const { t } = useTranslation();

  // selectors
  // get the logged user from redux store
  const user = useSelector(selectUser);
  // get the cart warehouses from redux store
  const cartWarehouse = useSelector(selectCartWarehouse);

  useEffect(() => {
    onSelectedChange();

    window.scrollTo(0, 0);
  }, []);

  // if there is no logged user or user type is not pharmacy
  // redirect to the main page
  return user && user.type === UserTypeConstants.PHARMACY ? (
    <>
      <Header title="cart" />

      <MainContentContainer>
        {/* if cart contains an item or more */}
        {cartWarehouse.length > 0 && (
          <div>
            <div>
              {cartWarehouse?.length > 0 && (
                <p className="point_note">
                  {t("you have")} {user.points} {t("point")} {t("equals to")}{" "}
                  {user.points * 100}{" "}
                  {t(
                    "you can replace your points after sending the order by contact us"
                  )}
                </p>
              )}
            </div>
            {cartWarehouse.map((w, index) => (
              <CartWarehouse warehouse={w} key={index} wIndex={index} />
            ))}
          </div>
        )}

        {/* if the cart is empty */}
        {cartWarehouse.length === 0 && (
          <>
            <NoContent msg={t("empty-cart")} />
          </>
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CartPage;
