import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// react-redux stuff
import {
  statisticsItemFavorites,
  statisticsItemSelected,
} from "../../redux/statistics/statisticsSlice";
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
import Toast from "../toast/toast.component";

// react icons
import { BsBookmarkPlusFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

// styles
import styles from "./item-row-new.module.scss";

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

function ItemRowNew({ item }) {
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
  const [addItemToCart, setAddItemToCart] = useState("");

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
  };

  const dispatchStatisticsHandler = () => {
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.GUEST
    ) {
      dispatch(
        statisticsItemSelected({
          obj: { itemId: item._id },
          token,
        })
      );
    }
  };

  // render method
  return (
    <>
      <div className={styles.container}>
        {checkOffer(item, user) && (
          <div className={styles.offer_icon}>
            <BsBookmarkPlusFill size={36} />
          </div>
        )}

        <div
          className={styles.name}
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
          {item.name}
        </div>
        <div className={styles.details}>
          <div className={[styles.row].join(" ")}>
            <div>
              <label className={styles.label}>{t("item-company")}:</label>
              <label className={styles.value}>{item.company.name}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label className={styles.label}>{t("item-formula")}:</label>
              <label className={styles.value}>{item.formula}</label>
            </div>
            <div>
              <label className={styles.label}>{t("item-caliber")}:</label>
              <label className={styles.value}>{item.caliber}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label className={styles.label}>{t("item-packing")}:</label>
              <label className={styles.value}>{item.packing}</label>
            </div>
          </div>
          <div className={styles.row}>
            {user.type !== UserTypeConstants.GUEST && (
              <div>
                <label className={styles.label}>{t("item-price")}:</label>
                <label className={styles.value}>{item.price}</label>
              </div>
            )}
            <div>
              <label className={styles.label}>
                {t("item-customer-price")}:
              </label>
              <label className={styles.value}>{item.customer_price}</label>
            </div>
          </div>
          <div className={[styles.row, styles.last_row].join(" ")}>
            <div>
              <label className={styles.label}>{t("item-composition")}:</label>
              <label className={styles.value}>{item.composition}</label>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          {changeAddToWarehouseLoading ? (
            <Icon
              icon={() => <VscLoading className={styles.loading} />}
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
              }}
              foreColor={Colors.SUCCEEDED_COLOR}
            />
          ) : (
            <div style={{ width: "24px" }}></div>
          )}

          {changeFavoriteLoading ? (
            <Icon
              icon={() => <VscLoading className={styles.loading} />}
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
        </div>
      </div>

      {showModal && (
        <AddToCartModal
          item={item}
          close={() => setShowModal(false)}
          setAddItemToCartMsg={setAddItemToCart}
        />
      )}

      {addItemToCart.length > 0 && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t(addItemToCart)}
          actionAfterTimeout={() => setAddItemToCart("")}
        />
      )}
    </>
  );
}

export default ItemRowNew;
