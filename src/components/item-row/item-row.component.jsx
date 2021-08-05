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
import Toast from "../toast/toast.component";
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { MdDelete, MdAddCircle } from "react-icons/md";

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants";
import { Link } from "react-router-dom";
import { statisticsItemFavorites } from "../../redux/statistics/statisticsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function ItemRow({ companyItem }) {
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
    )
      .then(unwrapResult)
      .then((result) => {
        dispatch(
          statisticsItemFavorites({ obj: { itemId: companyItem._id }, token })
        );
      });
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
        >
          <Link
            onClick={() => {
              if (
                user.type === UserTypeConstants.PHARMACY ||
                user.type === UserTypeConstants.NORMAL
              ) {
                dispatch(
                  statisticsItemFavorites({
                    obj: { itemId: companyItem._id },
                    token,
                  })
                );
              }
            }}
            to={{
              pathname: "/item",
              state: {
                from: user.type,
                type: "info",
                allowAction: false,

                itemId: companyItem._id,
                companyId: companyItem.company._id,
                warehouseId:
                  user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
              },
            }}
            className={rowStyles.hover_underline}
          >
            {companyItem.name}
          </Link>
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
          className={[tableStyles.label_xsmall, tableStyles.center].join(" ")}
        >
          {user.type === UserTypeConstants.WAREHOUSE &&
            (companyItem.warehouses
              .map((w) => w.warehouse._id)
              .includes(user._id) ? (
              <div
                className={[
                  generalStyles.icon,
                  generalStyles.fc_red,
                  generalStyles.margin_h_auto,
                ].join(" ")}
                onClick={removeItemFromWarehouseHandler}
              >
                <MdDelete size={24} />
                <div className={generalStyles.tooltip}>
                  {t("remove-from-warehouse-tooltip")}
                </div>
              </div>
            ) : (
              <div
                className={[
                  generalStyles.icon,
                  generalStyles.fc_green,
                  generalStyles.margin_h_auto,
                ].join(" ")}
                onClick={addItemToWarehouseHandler}
              >
                <MdAddCircle size={24} />
                <div className={generalStyles.tooltip}>
                  {t("add-to-warehouse-tooltip")}
                </div>
              </div>
            ))}

          {user.type === UserTypeConstants.PHARMACY &&
          companyItem.warehouses.length > 0 ? (
            <div
              className={[generalStyles.icon, generalStyles.fc_green].join(" ")}
              onClick={() => {
                setShowModal(true);
              }}
            >
              <TiShoppingCart size={20} />
            </div>
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
            <div
              className={[generalStyles.icon, generalStyles.fc_yellow].join(
                " "
              )}
              onClick={removeItemFromFavoritesItems}
            >
              <AiFillStar size={20} />
              <div className={generalStyles.tooltip}>
                {t("remove-from-favorite-tooltip")}
              </div>
            </div>
          ) : (
            <div
              className={[generalStyles.icon, generalStyles.fc_yellow].join(
                " "
              )}
              onClick={addItemToFavoriteItems}
            >
              <AiOutlineStar size={20} />
              <div className={generalStyles.tooltip}>
                {t("add-to-favorite-tooltip")}
              </div>
            </div>
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
