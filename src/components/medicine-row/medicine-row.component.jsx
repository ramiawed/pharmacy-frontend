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
import {
  addSavedItem,
  removeSavedItem,
  selectSavedItems,
} from "../../redux/savedItems/savedItemsSlice";

// components
import AddToCartModal from "../../modals/add-to-cart-modal/add-to-cart-modal.component";
import Icon from "../action-icon/action-icon.component";
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle, MdExpandLess, MdExpandMore } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";

// styles
import styles from "./medicine-row.module.scss";

// constants and utils
import {
  checkItemExistsInWarehouse,
  checkOffer,
  Colors,
  UserTypeConstants,
} from "../../utils/constants";

function MedicineRow({ item }) {
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
  const [expanded, setExpanded] = useState(false);

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

  const rowClickHandler = () => {
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
    history.push("/item", {
      from: user.type,
      type: "info",
      allowAction: false,
      itemId: item._id,
      companyId: item.company._id,
      warehouseId: user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
    });
  };

  // render method
  return (
    <>
      <div className={styles.item_row} onClick={rowClickHandler}>
        {checkOffer(item, user) && <div className={styles.offer_div}></div>}
        <div className={styles.first_row}>
          <label className={[styles.item_name].join(" ")}>
            <label
              className={styles.icon}
              onClick={(e) => {
                setExpanded(!expanded);
                e.stopPropagation();
              }}
            >
              {expanded ? <MdExpandLess /> : <MdExpandMore />}
            </label>
            <div className={styles.nameDiv}>
              <label>{item.name}</label>
              <label className={styles.nameAr}>{item.nameAr}</label>
            </div>
          </label>

          {changeAddToWarehouseLoading ? (
            <Icon
              text={t("")}
              onclick={() => {}}
              foreColor={Colors.SECONDARY_COLOR}
              icon={() => <VscLoading className={styles.loading} />}
            />
          ) : (
            user.type === UserTypeConstants.WAREHOUSE &&
            (item.warehouses.map((w) => w.warehouse._id).includes(user._id) ? (
              <Icon
                text={t("remove-from-warehouse-tooltip")}
                onclick={removeItemFromWarehouseHandler}
                foreColor={Colors.FAILED_COLOR}
                icon={() => <RiDeleteBin5Fill size={24} />}
              />
            ) : (
              <Icon
                text={t("add-to-warehouse-tooltip")}
                onclick={addItemToWarehouseHandler}
                foreColor={Colors.SUCCEEDED_COLOR}
                icon={() => <MdAddCircle size={24} />}
              />
            ))
          )}

          {user.type === UserTypeConstants.PHARMACY ? (
            checkItemExistsInWarehouse(item, user) ? (
              <Icon
                text={t("add-to-cart")}
                onclick={() => setShowModal(true)}
                foreColor={Colors.SUCCEEDED_COLOR}
                icon={() => <GiShoppingCart size={24} />}
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
              text={t("")}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
              icon={() => <VscLoading className={styles.loading} />}
            />
          ) : favoritesItems
              .map((favorite) => favorite._id)
              .includes(item._id) ? (
            <Icon
              text={t("remove-from-favorite-tooltip")}
              onclick={removeItemFromFavoritesItemsHandler}
              foreColor={Colors.YELLOW_COLOR}
              icon={() => <AiFillStar size={24} />}
            />
          ) : (
            <Icon
              text={t("add-to-favorite-tooltip")}
              onclick={addItemToFavoriteItemsHandler}
              foreColor={Colors.YELLOW_COLOR}
              icon={() => <AiOutlineStar size={24} />}
            />
          )}
        </div>

        <div className={styles.second_row}>
          <label className={styles.item_company}>{item.company.name}</label>
          {user.type !== UserTypeConstants.GUEST && (
            <label className={styles.item_price}>{item.price}</label>
          )}
          <label className={styles.item_customer_price}>
            {item.customer_price}
          </label>
        </div>

        {expanded && (
          <>
            <div className={styles.separator}></div>
            <div className={styles.details_row}>
              <label className={styles.label}>{t("item-packing")}:</label>
              <label className={styles.value}>{item.packing}</label>
            </div>
            <div className={styles.details_row}>
              <label className={styles.label}>{t("item-caliber")}:</label>
              <label className={styles.value}>{item.caliber}</label>
            </div>
            <div className={styles.details_row}>
              <label className={styles.label}>{t("item-composition")}:</label>
              <label className={styles.value}>{item.composition}</label>
            </div>
          </>
        )}
      </div>

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
