import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

// react-redux stuff
import { statisticsItemFavorites } from "../../redux/statistics/statisticsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
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
} from "../../redux/medicines/medicinesSlices";

// components
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";
import Icon from "../action-icon/action-icon.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import styles from "./item-row.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

// if logged user is
// 1- ADMIN: highlight the row by green color if the medicine has an offer.
// 2- COMPANY: don't highlight the row never.
// 3- GUEST: don't highlight the row never.
// 4- WAREHOUSE: highlight the row by green if the medicine has an offer by logging warehouse.
// 5- PHARMACY: highlight the row by green if the medicine has an offer by any warehouse
// in the same city with the logging user
const checkOffer = (item, user) => {
  // don't show the offer if the logged user is GUEST or COMPANY
  if (
    user.type === UserTypeConstants.GUEST ||
    user.type === UserTypeConstants.COMPANY
  ) {
    return false;
  }

  let result = false;

  if (user.type === UserTypeConstants.ADMIN) {
    item.warehouses.forEach((w) => {
      if (w.offer.offers.length > 0) {
        result = true;
      }
    });
  }

  if (user.type === UserTypeConstants.WAREHOUSE) {
    item.warehouses
      .filter((w) => w.warehouse._id === user._id)
      .forEach((w) => {
        if (w.offer.offers.length > 0) {
          result = true;
        }
      });
  }

  if (user.type === UserTypeConstants.PHARMACY) {
    item.warehouses.forEach((w) => {
      if (w.warehouse.city === user.city && w.offer.offers.length > 0) {
        result = true;
      }
    });
  }

  return result;
};

function ItemRow({ item, isSearch, isFavorite, isSmallFavorite }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { user, token } = useSelector(selectUserData);
  const favoritesItems = useSelector(selectFavoritesItems);

  // own state
  const [showModal, setShowModal] = useState(false);
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);
  const [changeAddToWarehouseLoading, setChangeAddToWarehouseLoading] =
    useState(false);

  // method to handle add company to user's favorite
  const addItemToFavoriteItemsHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(addFavoriteItem({ obj: { favoriteItemId: item._id }, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(statisticsItemFavorites({ obj: { itemId: item._id }, token }));
        setChangeFavoriteLoading(false);
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });

    e.stopPropagation();
  };

  // method to handle remove company from user's favorite
  const removeItemFromFavoritesItemsHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(removeFavoriteItem({ obj: { favoriteItemId: item._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeFavoriteLoading(false);
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });

    e.stopPropagation();
  };

  // method to handle add item to warehouse
  const addItemToWarehouseHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeAddToWarehouseLoading(true);

    dispatch(
      addItemToWarehouse({
        obj: {
          itemId: item._id,
          warehouseId: user._id,
          city: user.city,
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

    e.stopPropagation();
  };

  // method to handle remove item from warehouse
  const removeItemFromWarehouseHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeAddToWarehouseLoading(true);

    dispatch(
      removeItemFromWarehouse({
        obj: {
          itemId: item._id,
          warehouseId: user._id,
          city: user.city,
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

    e.stopPropagation();
  };

  const dispatchStatisticsHandler = () => {
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.NORMAL
    ) {
      dispatch(
        statisticsItemFavorites({
          obj: { itemId: item._id },
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
          backgroundColor: checkOffer(item, user)
            ? Colors.OFFER_COLOR
            : Colors.WHITE_COLOR,
          cursor: "pointer",
        }}
        className={[
          isSearch || isFavorite
            ? rowStyles.search_container
            : rowStyles.container,
        ].join(" ")}
        onClick={() => {
          dispatchStatisticsHandler();

          history.push("/item", {
            from: user.type,
            type: "info",
            allowAction: false,
            itemId: item._id,
            companyId: item.company._id,
            warehouseId:
              user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
          });
        }}
      >
        <label
          className={[
            styles.name,
            !isFavorite ? styles.align_center : "",
            isFavorite ? styles.align_start : "",
            isSmallFavorite ? styles.small_font : "",
          ].join(" ")}
        >
          {/* <Link
            onClick={dispatchStatisticsHandler}
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
            className={rowStyles.hover_underline}
          >
          </Link> */}
          {item.name}
        </label>

        <label
          className={[
            styles.details,
            styles.center,
            isSmallFavorite ? styles.small_font : "",
          ].join(" ")}
        >
          {item.company.name}
        </label>

        <label
          className={[
            styles.details,
            styles.center,
            isSmallFavorite ? styles.small_font : "",
          ].join(" ")}
        >
          {item.caliber}
        </label>

        <label
          className={[
            styles.details,
            styles.center,
            isSmallFavorite ? styles.small_font : "",
          ].join(" ")}
        >
          {item.packing}
        </label>

        <label
          className={[
            styles.details,
            styles.center,
            isSmallFavorite ? styles.small_font : "",
          ].join(" ")}
        >
          {item.formula}
        </label>

        {user.type !== UserTypeConstants.GUEST && !isFavorite && (
          <label className={[styles.details, styles.center].join(" ")}>
            {item.price}
          </label>
        )}

        {!isFavorite && (
          <label className={[styles.details, styles.center].join(" ")}>
            {item.customer_price}
          </label>
        )}

        <label className={[styles.center, styles.icon].join(" ")}>
          {changeAddToWarehouseLoading ? (
            <Icon
              icon={() => <VscLoading className={generalStyles.loading} />}
              onclick={() => {}}
              foreColor={Colors.SECONDARY_COLOR}
            />
          ) : (
            user.type === UserTypeConstants.WAREHOUSE &&
            (item.warehouses.map((w) => w.warehouse._id).includes(user._id) ? (
              <Icon
                icon={() => <RiDeleteBin5Fill />}
                onclick={removeItemFromWarehouseHandler}
                tooltip={t("remove-from-warehouse-tooltip")}
                foreColor={Colors.FAILED_COLOR}
              />
            ) : (
              <Icon
                icon={() => <MdAddCircle />}
                onclick={addItemToWarehouseHandler}
                tooltip={t("add-to-warehouse-tooltip")}
                foreColor={Colors.SUCCEEDED_COLOR}
              />
            ))
          )}

          {user.type === UserTypeConstants.PHARMACY &&
          item.existing_place[user.city] > 0 ? (
            <Icon
              icon={() => <GiShoppingCart />}
              onclick={(e) => {
                setShowModal(true);
                e.stopPropagation();
              }}
              foreColor={Colors.SUCCEEDED_COLOR}
            />
          ) : (
            <div style={{ width: "24px" }}></div>
          )}
        </label>

        <label className={[styles.icon, styles.align_center].join(" ")}>
          {changeFavoriteLoading ? (
            <Icon
              icon={() => <VscLoading className={generalStyles.loading} />}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : favoritesItems
              .map((favorite) => favorite._id)
              .includes(item._id) ? (
            <Icon
              icon={() => <AiFillStar />}
              onclick={removeItemFromFavoritesItemsHandler}
              tooltip={t("remove-from-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : (
            <Icon
              icon={() => <AiOutlineStar />}
              onclick={addItemToFavoriteItemsHandler}
              tooltip={t("add-to-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          )}
        </label>
      </div>

      {showModal && (
        <AddToCartModal item={item} close={() => setShowModal(false)} />
      )}
    </>
  );
}

export default ItemRow;
