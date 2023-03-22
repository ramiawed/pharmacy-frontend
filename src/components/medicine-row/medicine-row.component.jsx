import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
import {
  addSavedItem,
  removeSavedItem,
  selectSavedItems,
} from "../../redux/savedItems/savedItemsSlice";

// components
import AddToCartModal from "../../modals/add-to-cart-modal/add-to-cart-modal.component";
import FullWidthLabel from "../full-width-label/full-width-label.component";
import ThreeStateIcon from "../three-state-icon/three-state-icon.component";
import LabelValueRow from "../label-value-row/label-value-row.component";
import RowContainer from "../row-container/row-container.component";
import ItemPrices from "../item-prices/item-prices.component";
import ItemNames from "../item-names/item-names.component";
import Toast from "../toast/toast.component";
import Icon from "../icon/icon.component";

// react icons
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";
import { MdAddCircle, MdFileDownloadDone } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

// styles
import styles from "./medicine-row.module.scss";

// constants and utils
import {
  checkItemExistsInWarehouse,
  checkOffer,
  checkPoints,
  Colors,
  UserTypeConstants,
} from "../../utils/constants";

function MedicineRow({
  item,
  index,
  showComposition,
  selectedAction,
  searchString,
}) {
  const { t } = useTranslation();
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

  // method to handle add item to user's savedItem
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

  // render method
  return (
    <>
      <RowContainer
        isEven={index % 2}
        isOffer={checkOffer(item, user)}
        isPoints={checkPoints(item, user)}
      >
        <div className={styles.item_row}>
          <div className={styles.first_row}>
            <div className={[styles.item_names_container].join(" ")}>
              <ItemNames
                on_click={() => {
                  dispatchStatisticsHandler();
                }}
                item={item}
                searchString={searchString}
              />
            </div>

            {selectedAction ? (
              <>
                <Icon
                  tooltip={t("add to items section")}
                  onclick={() => selectedAction(item)}
                  foreColor={Colors.SUCCEEDED_COLOR}
                  icon={() => <MdFileDownloadDone size={24} />}
                />
              </>
            ) : (
              <>
                {user.type === UserTypeConstants.WAREHOUSE && (
                  <ThreeStateIcon
                    loading={changeAddToWarehouseLoading}
                    array={item.warehouses.map((w) => w.warehouse._id)}
                    id={user._id}
                    removeHandler={removeItemFromWarehouseHandler}
                    addHandler={addItemToWarehouseHandler}
                    removeTooltip="remove-from-warehouse-tooltip"
                    addTooltip="add-to-warehouse-tooltip"
                    removeIcon={() => (
                      <RiDeleteBin5Fill color={Colors.FAILED_COLOR} size={24} />
                    )}
                    addIcon={() => (
                      <MdAddCircle color={Colors.SUCCEEDED_COLOR} size={24} />
                    )}
                  />
                )}

                {user.type === UserTypeConstants.PHARMACY ? (
                  checkItemExistsInWarehouse(item, user) ? (
                    <Icon
                      tooltip={t("add-to-cart")}
                      onclick={() => setShowModal(true)}
                      foreColor={Colors.SUCCEEDED_COLOR}
                      icon={() => <GiShoppingCart size={24} />}
                    />
                  ) : (
                    <ThreeStateIcon
                      loading={changeSaveItemLoading}
                      array={savedItems.map((si) => si._id)}
                      id={item._id}
                      removeHandler={removeItemFromSavedItemsHandler}
                      addHandler={addItemToSavedItemsHandler}
                      removeTooltip="remove-item-from-saved-items-tooltip"
                      addTooltip="add-item-to-saved-items-tooltip"
                      removeIcon={() => (
                        <BsFillBookmarkDashFill
                          color={Colors.FAILED_COLOR}
                          size={24}
                        />
                      )}
                      addIcon={() => (
                        <BsFillBookmarkPlusFill
                          color={Colors.SUCCEEDED_COLOR}
                          size={24}
                        />
                      )}
                    />
                  )
                ) : (
                  <></>
                )}

                <ThreeStateIcon
                  loading={changeFavoriteLoading}
                  array={favoritesItems.map((favorite) => favorite._id)}
                  id={item._id}
                  removeHandler={removeItemFromFavoritesItemsHandler}
                  addHandler={addItemToFavoriteItemsHandler}
                  removeTooltip="remove-from-favorite-tooltip"
                  addTooltip="add-to-favorite-tooltip"
                  removeIcon={() => (
                    <AiFillStar size={24} color={Colors.YELLOW_COLOR} />
                  )}
                  addIcon={() => (
                    <AiOutlineStar size={24} color={Colors.YELLOW_COLOR} />
                  )}
                />
              </>
            )}
          </div>

          <div className={styles.second_row}>
            <FullWidthLabel
              value={item.company.name}
              color={Colors.SUCCEEDED_COLOR}
            />
            <ItemPrices
              showCustomerPrice={true}
              showPrice={user.type !== UserTypeConstants.GUEST}
              price={item.price}
              customerPrice={item.customer_price}
            />
          </div>

          {showComposition && (
            <div className={styles.second_row}>
              <LabelValueRow
                label="item-composition"
                value={item.composition}
                searchString={searchString}
              />
            </div>
          )}
        </div>
      </RowContainer>

      {showModal && (
        <AddToCartModal
          item={item}
          close={() => setShowModal(false)}
          setAddItemToCartMsg={setAddItemToCart}
          fromSavedItems={true}
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

export default MedicineRow;
