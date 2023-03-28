import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/transparent_logo.png";

// components
import AddToCartModal from "../../modals/add-to-cart-modal/add-to-cart-modal.component";
import ThreeStateIcon from "../three-state-icon/three-state-icon.component";
import ItemPrices from "../item-prices/item-prices.component";
import ItemNames from "../item-names/item-names.component";
import Icon from "../icon/icon.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";

// redux-stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/medicines/medicinesSlices";
import {
  addSavedItem,
  removeSavedItem,
  selectSavedItems,
} from "../../redux/savedItems/savedItemsSlice";
import {
  addFavoriteItem,
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";

// styles
import styles from "./medicine-card.module.scss";

// constants and utils
import {
  checkItemExistsInWarehouse,
  checkOffer,
  Colors,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants.js";

function MedicineCard({ item, searchString }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isOnline = useSelector(selectOnlineStatus);
  const { user, token } = useSelector(selectUserData);
  const favorites = useSelector(selectFavoritesItems);
  const { savedItems } = useSelector(selectSavedItems);

  const [showModal, setShowModal] = useState(false);
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);
  const [changeSaveItemLoading, setChangeSaveItemLoading] = useState(false);
  const [changeAddToWarehouseLoading, setChangeAddToWarehouseLoading] =
    useState(false);

  // method to handle add company to user's favorite
  const addItemToFavoriteItems = (e) => {
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
          })
        );
        setChangeFavoriteLoading(false);
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });
  };

  // method to handle remove company from user's favorite
  const removeItemFromFavoritesItems = (e) => {
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

  return (
    <div className={[styles.partner_container].join(" ")}>
      {checkOffer(item, user) && (
        <div className={[styles.ribbon_2].join(" ")}>
          <span>{t("offer")}</span>
        </div>
      )}
      <div
        className={styles.company_name}
        style={{
          fontSize: item.company.name.length > 30 ? "13px" : "16px",
        }}
      >
        {item.company.name}
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <div className={styles.icons_div}>
          {user.type === UserTypeConstants.WAREHOUSE && (
            <ThreeStateIcon
              loading={changeAddToWarehouseLoading}
              array={item.warehouses.map((w) => w.warehouse._id)}
              id={user._id}
              removeHandler={removeItemFromWarehouseHandler}
              addHandler={addItemToWarehouseHandler}
              removeTooltip="remove from warehouse"
              addTooltip="add to warehouse"
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
                tooltip={t("add to cart")}
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
                removeTooltip="remove item from saved items"
                addTooltip="add item to saved items"
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
            array={favorites.map((favorite) => favorite._id)}
            id={item._id}
            removeHandler={removeItemFromFavoritesItems}
            addHandler={addItemToFavoriteItems}
            removeTooltip="remove from favorites"
            addTooltip="add to favorites"
            removeIcon={() => (
              <AiFillStar size={24} color={Colors.YELLOW_COLOR} />
            )}
            addIcon={() => (
              <AiOutlineStar size={24} color={Colors.YELLOW_COLOR} />
            )}
          />
        </div>

        <div className={styles.logo_div}>
          {item.logo_url && item.logo_url !== "" ? (
            <img
              src={`${SERVER_URL}/items/${item.logo_url}`}
              className={styles.logo}
              alt="thumb"
            />
          ) : (
            <img src={Logo} className={styles.logo} alt="thumb" />
          )}
        </div>

        <div className={styles.content}>
          <div className={[styles.showed_content].join(" ")}>
            <div className={styles.main_details}>
              <ItemNames
                on_click={() => {
                  dispatchStatisticsHandler();
                }}
                flexDirection="column"
                item={item}
                searchString={searchString}
              />
              <div
                style={{
                  alignSelf: "flex-end",
                }}
              >
                <ItemPrices
                  showCustomerPrice={true}
                  showPrice={user.type !== UserTypeConstants.GUEST}
                  price={item.price}
                  customerPrice={item.customer_price}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddToCartModal item={item} close={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default MedicineCard;
