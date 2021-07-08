import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react-redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  addFavoriteItem,
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/companyItems/companyItemsSlices";

// components
import ActionButton from "../action-button/action-button.component";
import Toast from "../toast/toast.component";
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";

// styles
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ItemRow({ companyItem }) {
  const history = useHistory();
  const { t } = useTranslation();

  // get the logged user and it's token
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const favoritesItems = useSelector(selectFavoritesItems);

  // own state
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

  // method to handle add item to warehouse
  const addItemToWarehouseHandler = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

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

  // method to handle remove item from warehouse
  const removeItemFromWarehouseHandler = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

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

  // render method
  return (
    <>
      <div className={rowStyles.container}>
        <label
          // style={{ textAlign: "center" }}
          className={[
            tableStyles.label_medium,
            tableStyles.center,
            tableStyles.underline,
          ].join(" ")}
          onClick={() => {
            history.push(`/item/user/${companyItem._id}`);
          }}
        >
          {companyItem.name}
        </label>

        <label
          className={[tableStyles.label_small, tableStyles.center].join(" ")}
        >
          {companyItem.caliber}
        </label>

        <label
          className={[tableStyles.label_small, tableStyles.center].join(" ")}
        >
          {companyItem.formula}
        </label>

        <label
          className={[tableStyles.label_small, tableStyles.center].join(" ")}
        >
          {companyItem.price}
        </label>

        <label
          className={[tableStyles.label_small, tableStyles.center].join(" ")}
        >
          {companyItem.customer_price}
        </label>

        <label
          className={[
            user.type === UserTypeConstants.WAREHOUSE
              ? tableStyles.label_small
              : tableStyles.label_xsmall,
            tableStyles.center,
          ].join(" ")}
        >
          {user.type === UserTypeConstants.WAREHOUSE &&
            (companyItem.warehouses
              .map((w) => w.warehouse._id)
              .includes(user._id) ? (
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
              className={rowStyles.cart_icon}
              onClick={() => {
                setShowModal(true);
              }}
              size={24}
            />
          ) : (
            <div style={{ width: "24px" }}></div>
          )}
        </label>

        <label
          className={[tableStyles.label_xsmall, tableStyles.center].join(" ")}
        >
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
        </label>
      </div>

      {showModal && (
        <AddToCartModal item={companyItem} close={() => setShowModal(false)} />
      )}

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
    </>
  );
}

export default ItemRow;
