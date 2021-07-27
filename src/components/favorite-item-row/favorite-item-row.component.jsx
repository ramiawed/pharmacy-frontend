import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";

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
        <label
          className={[
            rowStyles.hover_underline,
            rowStyles.padding_start,
            tableStyles.label_medium,
            rowStyles.align_start,
          ].join(" ")}
        >
          <Link
            className={[
              generalStyles.fc_secondary,
              rowStyles.hover_underline,
            ].join(" ")}
            to={{
              pathname: "/item",
              state: {
                from: user.type,
                type: "info",
                allowAction: false,

                itemId: item._id,
                companyId: item.company._id,
                warehouseId:
                  user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
              },
            }}
          >
            {item.name}
          </Link>
        </label>

        <label className={tableStyles.label_small}>{item.caliber}</label>
        <label className={tableStyles.label_small}>{item.formula}</label>
        <label className={tableStyles.label_small}>{item.packing}</label>

        {item.warehouses.length > 0 ? (
          user.type === UserTypeConstants.PHARMACY && (
            <div
              className={[generalStyles.icon, generalStyles.fc_green].join(" ")}
            >
              <TiShoppingCart
                onClick={() => {
                  setShowModal(true);
                }}
                size={20}
              />
            </div>
          )
        ) : (
          <div className={tableStyles.label_xsmall}></div>
        )}
        <div className={rowStyles.padding_end}>
          {favorites.map((favorite) => favorite._id).includes(item._id) ? (
            <div
              className={[generalStyles.icon, generalStyles.fc_yellow].join(
                " "
              )}
            >
              <AiFillStar size={20} onClick={removeItemFromFavorite} />
            </div>
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
