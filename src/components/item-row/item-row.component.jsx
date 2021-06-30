import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  addFavoriteItem,
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";

import ActionButton from "../action-button/action-button.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";

// styles
import styles from "./item-row.module.scss";
import rowStyles from "../row.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/companyItems/companyItemsSlices";
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";

function ItemRow({ companyItem }) {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favoritesItems = useSelector(selectFavoritesItems);
  const token = useSelector(selectToken);
  const [showModal, setShowModal] = useState(false);

  const [connectionError, setConnectionError] = useState("");

  // method to handle add company to user's favorite
  const addItemToFavoriteItems = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(
      addFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    );
  };

  // method to handle remove company from user's favorite
  const removeItemFromFavoritesItems = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(
      removeFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    );
  };

  const addItemToWarehouseHandler = () => {
    dispatch(
      addItemToWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    );
  };

  const removeItemFromWarehouseHandler = () => {
    dispatch(
      removeItemFromWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    );
  };

  return (
    <>
      <div className={rowStyles.container}>
        <p className={styles.name}>{companyItem.name}</p>
        <div className={styles.info}>
          <p>{t("item-caliber")}:</p>
          <p>{companyItem.caliber}</p>
        </div>

        <div className={styles.info}>
          <p>{t("item-formula")}:</p>
          <p>{companyItem.formula}</p>
        </div>

        <div className={styles.info}>
          <p>{t("item-price")}:</p>
          <p>{companyItem.price}</p>
        </div>

        <div className={styles.info}>
          <p>{t("item-customer-price")}:</p>
          <p>{companyItem.customer_price}</p>
        </div>

        {user.type === UserTypeConstants.WAREHOUSE &&
          (companyItem.warehouses.map((w) => w.warehouse).includes(user._id) ? (
            <ActionButton
              text="remove-from-warehouse"
              fontSize="0.6rem"
              action={removeItemFromWarehouseHandler}
              color={Colors.FAILED_COLOR}
            />
          ) : (
            <ActionButton
              text="add-to-warehouse"
              fontSize="0.6rem"
              action={addItemToWarehouseHandler}
              color={Colors.SUCCEEDED_COLOR}
            />
          ))}

        {user.type === UserTypeConstants.PHARMACY &&
        companyItem.warehouses.length > 0 ? (
          <TiShoppingCart
            className={styles.icon}
            onClick={() => {
              setShowModal(true);
            }}
            size={24}
          />
        ) : (
          <div style={{ width: "24px" }}></div>
        )}

        <div>
          {favoritesItems
            .map((favorite) => favorite._id)
            .includes(companyItem._id) ? (
            <AiFillStar
              className={[rowStyles.icon, rowStyles.fill_star].join(" ")}
              size={24}
              onClick={removeItemFromFavoritesItems}
            />
          ) : (
            <AiOutlineStar
              className={rowStyles.icon}
              size={24}
              onClick={addItemToFavoriteItems}
            />
          )}
        </div>
      </div>
      {showModal && (
        <AddToCartModal item={companyItem} close={() => setShowModal(false)} />
      )}
    </>
  );
}

export default ItemRow;
