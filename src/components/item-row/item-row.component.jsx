import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// react-redux stuff
import { addStatistics } from "../../redux/statistics/statisticsSlice";
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
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./item-row.module.scss";

// constants and utils
import {
  checkItemExistsInWarehouse,
  Colors,
  UserTypeConstants,
} from "../../utils/constants";
import {
  addSavedItem,
  removeSavedItem,
  selectSavedItems,
} from "../../redux/savedItems/savedItemsSlice";

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

function ItemRow({ item, onSelectAction, small }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { user, token } = useSelector(selectUserData);
  const favoritesItems = useSelector(selectFavoritesItems);
  const { savedItems } = useSelector(selectSavedItems);

  // own state
  const [showModal, setShowModal] = useState(false);
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);
  const [changeSaveItemLoading, setChangeSaveItemLoading] = useState(false);
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
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetItem: item._id,
              action: "item-added-to-favorite",
            },
            token,
          })
        );
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
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetItem: item._id,
            action: "choose-item",
          },
          token,
        })
      );
    }
  };

  const addItemToSavedItemsHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeSaveItemLoading(true);

    dispatch(addSavedItem({ obj: { savedItemId: item._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeSaveItemLoading(false);
      })
      .catch(() => {
        setChangeSaveItemLoading(false);
      });
  };

  const removeItemFromSavedItemsHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeSaveItemLoading(true);

    dispatch(removeSavedItem({ obj: { savedItemId: item._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeSaveItemLoading(false);
      })
      .catch(() => {
        setChangeSaveItemLoading(false);
      });
  };

  // render method
  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          if (onSelectAction) {
            onSelectAction();
          }
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
        <div className={styles.details}>
          <label
            className={[styles.name].join(
              " "
            )}
          >
            {item.name}
          </label>

          
          <label
            className={[styles.name].join(
              " "
            )}
          >
            {item.nameAr}
          </label>
          
          
          <label className={[styles.companyName].join(" ")}>
            {item.company.name}
          </label>
          <label className={[styles.caliber].join(" ")}>
            {item.caliber}
          </label>
          <label className={[styles.composition].join(" ")}>
            {item.composition}
          </label>
        </div>
        <div className={styles.actions}>
          {changeAddToWarehouseLoading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={24} />
              )}
              onclick={() => {}}
              foreColor={Colors.SECONDARY_COLOR}
            />
          ) : (
            user.type === UserTypeConstants.WAREHOUSE &&
            (item.warehouses.map((w) => w.warehouse._id).includes(user._id) ? (
              <Icon
                icon={() => <RiDeleteBin5Fill size={24} />}
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

          {user.type === UserTypeConstants.PHARMACY ? (
            checkItemExistsInWarehouse(item, user) ? (
              <Icon
                icon={() => <GiShoppingCart size={24} />}
                onclick={() => {
                  setShowModal(true);
                }}
                foreColor={Colors.SUCCEEDED_COLOR}
              />
            ) : changeSaveItemLoading ? (
              <Icon
                text={t("")}
                onclick={() => {}}
                foreColor={Colors.YELLOW_COLOR}
                icon={() => <VscLoading className={styles.loading} />}
              />
            ) : savedItems.map((si) => si._id).includes(item._id) ? (
              <Icon
                tooltip={t("remove-item-from-saved-items-tooltip")}
                onclick={removeItemFromSavedItemsHandler}
                foreColor={Colors.FAILED_COLOR}
                icon={() => <BsFillBookmarkDashFill size={24} />}
              />
            ) : (
              <Icon
                tooltip={t("add-item-to-saved-items-tooltip")}
                onclick={addItemToSavedItemsHandler}
                foreColor={Colors.SUCCEEDED_COLOR}
                icon={() => <BsFillBookmarkPlusFill size={24} />}
              />
            )
          ) : (
            <></>
          )}

          {changeFavoriteLoading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={24} />
              )}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : favoritesItems
              .map((favorite) => favorite._id)
              .includes(item._id) ? (
            <Icon
              icon={() => <AiFillStar size={24} />}
              onclick={removeItemFromFavoritesItemsHandler}
              tooltip={t("remove-from-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : (
            <Icon
              icon={() => <AiOutlineStar size={24} />}
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

export default ItemRow;
