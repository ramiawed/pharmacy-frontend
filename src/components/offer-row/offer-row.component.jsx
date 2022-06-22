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

// components
import AddToCartOfferModal from "../add-to-cart-offer-modal/add-to-cart-offer-modal.component";
import Icon from "../action-icon/action-icon.component";
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

// styles
import styles from "./offer-row.module.scss";

// constants and utils
import { Colors, OfferTypes, UserTypeConstants } from "../../utils/constants";

function OfferRow({ item }) {
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

  const rowClickHandler = () => {
    if (user.type === UserTypeConstants.PHARMACY) {
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

          {user.type === UserTypeConstants.PHARMACY && (
            <Icon
              text={t("add-to-cart")}
              onclick={() => setShowModal(true)}
              foreColor={Colors.SUCCEEDED_COLOR}
              icon={() => <GiShoppingCart size={24} />}
            />
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
          <label className={styles.item_company}>
            {item.company[0].name} - {item.warehouses.warehouse[0].name}
          </label>
          <label className={styles.item_price}>{item.price}</label>
          <label className={styles.item_customer_price}>
            {item.customer_price}
          </label>
        </div>

        {expanded && (
          <>
            <div className={styles.separator}></div>
            {item.warehouses.offer.offers.map((o, index) => (
              <div className={styles.offer} key={index}>
                <p>
                  <label>{t("quantity-label")}</label>
                  <label
                    className={[styles.value, styles.with_padding].join(" ")}
                  >
                    {o.qty}
                  </label>
                  <label className={styles.left_padding}>
                    {t("after-quantity-label")}
                  </label>
                </p>
                <p>
                  <label>
                    {item.warehouses.offer.mode === OfferTypes.PIECES
                      ? t("bonus-quantity-label")
                      : t("bonus-percentage-label")}
                  </label>
                  <label className={styles.value}>{o.bonus}</label>
                  <label>
                    {item.warehouses.offer.mode === OfferTypes.PIECES
                      ? t("after-bonus-quantity-label")
                      : t("after-bonus-percentage-label")}
                  </label>
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {showModal && (
        <AddToCartOfferModal
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

export default OfferRow;
