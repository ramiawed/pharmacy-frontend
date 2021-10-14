import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// react-redux stuff
import { statisticsItemFavorites } from "../../redux/statistics/statisticsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
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
import Icon from "../action-icon/action-icon.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

const checkOffer = (item) => {
  let result = false;

  item.warehouses.forEach((w) => {
    if (w.offer.offers.length > 0) {
      result = true;
    }
  });

  return result;
};

function ItemRow({ companyItem, isSearch }) {
  const { t } = useTranslation();

  const isOnline = useSelector(selectOnlineStatus);
  // get the logged user and it's token
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const favoritesItems = useSelector(selectFavoritesItems);

  // own state
  const [showModal, setShowModal] = useState(false);
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);
  const [changeAddToWarehouseLoading, setChangeAddToWarehouseLoading] =
    useState(false);

  const [hasOffer, setHasOffer] = useState(checkOffer(companyItem));

  // method to handle add company to user's favorite
  const addItemToFavoriteItems = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(
      addFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(
          statisticsItemFavorites({ obj: { itemId: companyItem._id }, token })
        );
        setChangeFavoriteLoading(false);
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });
  };

  // method to handle remove company from user's favorite
  const removeItemFromFavoritesItems = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(
      removeFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeFavoriteLoading(false);
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });
  };

  // method to handle add item to warehouse
  const addItemToWarehouseHandler = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeAddToWarehouseLoading(true);

    dispatch(
      addItemToWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeAddToWarehouseLoading(false);
      })
      .catch(() => {
        setChangeAddToWarehouseLoading(false);
      });
  };

  // method to handle remove item from warehouse
  const removeItemFromWarehouseHandler = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeAddToWarehouseLoading(true);

    dispatch(
      removeItemFromWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeAddToWarehouseLoading(false);
      })
      .catch(() => {
        setChangeAddToWarehouseLoading(false);
      });
  };

  const dispatchStatisticsHandler = () => {
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
  };
  // render method
  return (
    <>
      <div
        style={{
          backgroundColor: hasOffer ? "#0f04" : " #fff",
        }}
        className={isSearch ? rowStyles.search_container : rowStyles.container}
      >
        <label
          // style={{ textAlign: "center" }}
          className={[
            tableStyles.label_medium,
            tableStyles.center,
            tableStyles.underline,
          ].join(" ")}
        >
          <Link
            onClick={dispatchStatisticsHandler}
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

        {user.type !== UserTypeConstants.GUEST && (
          <label
            className={[tableStyles.label_small, tableStyles.center].join(" ")}
          >
            {companyItem.price}
          </label>
        )}

        <label
          className={[tableStyles.label_small, tableStyles.center].join(" ")}
        >
          {companyItem.customer_price}
        </label>

        <label
          className={[tableStyles.label_xsmall, tableStyles.center].join(" ")}
        >
          {changeAddToWarehouseLoading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={20} />
              )}
              onclick={() => {}}
              foreColor={Colors.SECONDARY_COLOR}
            />
          ) : (
            user.type === UserTypeConstants.WAREHOUSE &&
            (companyItem.warehouses
              .map((w) => w.warehouse._id)
              .includes(user._id) ? (
              <Icon
                icon={() => <MdDelete size={24} />}
                onclick={removeItemFromWarehouseHandler}
                tooltip={t("remove-from-warehouse-tooltip")}
                foreColor={Colors.FAILED_COLOR}
              />
            ) : (
              <Icon
                icon={() => <MdAddCircle size={24} />}
                onclick={addItemToWarehouseHandler}
                tooltip={t("add-to-warehouse-tooltip")}
                foreColor={Colors.SUCCEEDED_COLOR}
              />
            ))
          )}

          {user.type === UserTypeConstants.PHARMACY &&
          companyItem.warehouses.length > 0 ? (
            <Icon
              icon={() => <TiShoppingCart size={20} />}
              onclick={() => {
                setShowModal(true);
              }}
              foreColor={Colors.SUCCEEDED_COLOR}
            />
          ) : (
            <div style={{ width: "24px" }}></div>
          )}
        </label>

        <label
          className={[tableStyles.label_xsmall, tableStyles.center].join(" ")}
        >
          {changeFavoriteLoading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={20} />
              )}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : favoritesItems
              .map((favorite) => favorite._id)
              .includes(companyItem._id) ? (
            <Icon
              icon={() => <AiFillStar size={20} />}
              onclick={removeItemFromFavoritesItems}
              tooltip={t("remove-from-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : (
            <Icon
              icon={() => <AiOutlineStar size={20} />}
              onclick={addItemToFavoriteItems}
              tooltip={t("add-to-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          )}
        </label>
      </div>

      {showModal && (
        <AddToCartModal item={companyItem} close={() => setShowModal(false)} />
      )}
    </>
  );
}

export default ItemRow;
