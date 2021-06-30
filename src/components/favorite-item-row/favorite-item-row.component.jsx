import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import { selectToken, selectUser } from "../../redux/auth/authSlice";

// rowStyles
import rowStyles from "../row.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";

function FavoriteItemRow({ item, withoutBoxShadow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesItems);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [showModal, setShowModal] = useState(false);

  const [connectionError, setConnectionError] = useState("");

  // method to handle remove company from user's favorite
  const removeItemFromFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(removeFavoriteItem({ obj: { favoriteItemId: item._id }, token }));
  };

  return (
    <>
      <div
        className={[
          rowStyles.container,
          withoutBoxShadow ? rowStyles.without_box_shadow : "",
        ].join(" ")}
      >
        <p className={rowStyles.name}>{item.name}</p>
        {item.warehouses.length > 0 &&
          user.type === UserTypeConstants.PHARMACY && (
            <TiShoppingCart
              className={rowStyles.cart_icon}
              onClick={() => {
                setShowModal(true);
              }}
              size={24}
            />
          )}
        <div>
          {favorites.map((favorite) => favorite._id).includes(item._id) ? (
            <AiFillStar
              className={[rowStyles.icon, rowStyles.fill_star].join(" ")}
              size={24}
              onClick={removeItemFromFavorite}
            />
          ) : null}
        </div>
      </div>
      {connectionError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setConnectionError("");
          }}
        >
          <p>{t(connectionError)}</p>
        </Toast>
      )}

      {showModal && (
        <AddToCartModal item={item} close={() => setShowModal(false)} />
      )}
    </>
  );
}

export default FavoriteItemRow;
