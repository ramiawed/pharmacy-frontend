import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Logo from "../../logo.png";

// components
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";
import Icon from "../action-icon/action-icon.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { VscLoading } from "react-icons/vsc";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/medicines/medicinesSlices";

import {
  addFavoriteItem,
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import { selectToken, selectUser } from "../../redux/auth/authSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./item-card.module.scss";

// constants and utils
import {
  Colors,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants.js";

// if logged user is
// 1- ADMIN: highlight the row by green color if the medicine has an offer.
// 2- COMPANY: don't highlight the row never.
// 3- GUEST: don't highlight the row never.
// 4- WAREHOUSE: highlight the row by green if the medicine has an offer by logging warehouse.
// 5- PHARMACY: highlight the row by green if the medicine has an offer by any warehouse
// in the same city with the logging user
const checkOffer = (item, user) => {
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

function ItemCard({ companyItem }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isOnline = useSelector(selectOnlineStatus);
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavoritesItems);
  const token = useSelector(selectToken);
  const [showModal, setShowModal] = useState(false);

  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);
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

    dispatch(
      addFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetItem: companyItem._id,
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

    // e.stopPropagation();
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
            targetItem: companyItem._id,
            action: "choose-item",
          },
          token,
        })
      );
    }
  };

  return (
    <div
      className={[styles.partner_container].join(" ")}
      onClick={() => {
        dispatchStatisticsHandler();

        history.push("item", {
          from: user.type,
          type: "info",
          allowAction: false,
          itemId: companyItem._id,
          companyId: companyItem.company._id,
          warehouseId:
            user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
        });
      }}
    >
      {checkOffer(companyItem, user) && (
        <div className={[styles.ribbon_2].join(" ")}>
          <span>{t("offer")}</span>
        </div>
      )}
      <div className={styles.company_name}>{companyItem.company.name}</div>
      <div
        style={{
          flex: 1,
        }}
      >
        <div className={styles.icons_div}>
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

          {user.type === UserTypeConstants.PHARMACY &&
            companyItem.existing_place[user.city] > 0 && (
              <Icon
                icon={() => <GiShoppingCart size={24} />}
                onclick={() => setShowModal(true)}
                foreColor={Colors.SUCCEEDED_COLOR}
              />
            )}

          {changeFavoriteLoading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={24} />
              )}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : favorites
              .map((favorite) => favorite._id)
              .includes(companyItem._id) ? (
            <Icon
              icon={() => <AiFillStar size={24} />}
              onclick={removeItemFromFavoritesItems}
              tooltip={t("remove-from-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : (
            <Icon
              icon={() => <AiOutlineStar size={24} />}
              onclick={addItemToFavoriteItems}
              tooltip={t("add-to-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          )}
        </div>

        <div className={styles.logo_div}>
          {companyItem.logo_url && companyItem.logo_url !== "" ? (
            <img
              src={`${SERVER_URL}/items/${companyItem.logo_url}`}
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
              <div className={styles.name_details}>
                <label className={styles.name}>{companyItem.name}</label>
                <label className={styles.composition}>
                  {companyItem.composition}
                </label>
              </div>

              {user.type !== UserTypeConstants.GUEST && (
                <div className={styles.price}>
                  <label>{companyItem.price}</label>
                </div>
              )}
              <div className={styles.price}>
                <label className={styles.customer_price}>
                  {companyItem.customer_price}
                </label>
              </div>
            </div>

            <div className={styles.info}>
              <label className={styles.label}>{t("item-formula")}:</label>
              <label className={styles.value}>{companyItem.formula}</label>
            </div>

            <div className={styles.info}>
              <label className={styles.label}>{t("item-packing")}:</label>
              <label className={styles.value}>{companyItem.packing}</label>
            </div>

            <div className={styles.info}>
              <label className={styles.label}>{t("item-caliber")}:</label>
              <label className={styles.value}>{companyItem.caliber}</label>
            </div>
          </div>

          <div className={styles.behind_content}></div>
        </div>
      </div>

      {showModal && (
        <AddToCartModal item={companyItem} close={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default ItemCard;
