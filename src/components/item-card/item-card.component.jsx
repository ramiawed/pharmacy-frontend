import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { VscLoading } from "react-icons/vsc";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";

import {
  addFavoriteItem,
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import { selectToken, selectUser } from "../../redux/auth/authSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./item-card.module.scss";
import rowStyles from "../row.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import { Link } from "react-router-dom";
import { statisticsItemFavorites } from "../../redux/statistics/statisticsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import Icon from "../action-icon/action-icon.component";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/medicines/medicinesSlices";

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
      .then((result) => {
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
  return (
    <div
      className={[
        styles.partner_container,
        checkOffer(companyItem, user) ? styles.partner_container_has_offer : "",
      ].join(" ")}
    >
      <div
        className={[
          generalStyles.actions,
          generalStyles.padding_v_4,
          generalStyles.padding_h_6,
        ].join(" ")}
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
          companyItem.warehouses.length > 0 && (
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_green,
                generalStyles.position_top_5_left_40,
              ].join(" ")}
              onClick={() => {
                setShowModal(true);
              }}
            >
              <GiShoppingCart size={24} />
            </div>
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
            src={`http://localhost:8000/${companyItem.logo_url}`}
            className={styles.logo}
            alt="thumb"
          />
        ) : (
          <img
            src={`http://localhost:8000/default-medicine.png`}
            className={styles.logo}
            alt="thumb"
          />
        )}
        {/* <p
          style={{
            backgroundImage:
              companyItem.logo_url && companyItem.logo_url !== ""
                ? `url("http://localhost:8000/${companyItem.logo_url}")`
                : `url("http://localhost:8000/default-medicine.png")`,
          }}
          className={styles.logo}
        ></p> */}
      </div>

      <div className={styles.content}>
        <div
          className={[
            styles.showed_content,
            checkOffer(companyItem, user) ? styles.has_offer : "",
          ].join(" ")}
        >
          <label
            className={[
              generalStyles.fc_white,
              generalStyles.center,
              generalStyles.block,
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
              className={[
                rowStyles.hover_underline,
                generalStyles.fc_white,
              ].join(" ")}
            >
              {companyItem.name}
            </Link>
          </label>

          {user.type !== UserTypeConstants.GUEST && (
            <div className={styles.info}>
              <label>{t("item-price")}:</label>
              <label className={styles.bigger}>{companyItem.price}</label>
            </div>
          )}

          <div className={styles.info}>
            <label>{t("item-customer-price")}:</label>
            <label className={styles.bigger}>
              {companyItem.customer_price}
            </label>
          </div>

          <div className={styles.info}>
            <label>{t("item-formula")}:</label>
            <label className={styles.bigger}>{companyItem.formula}</label>
          </div>

          <div className={styles.more_info}>
            <div className={styles.info}>
              <label>{t("item-packing")}</label>
              <label className={styles.bigger}>{companyItem.packing}</label>
            </div>

            <div className={styles.info}>
              <label>{t("item-caliber")}</label>
              <label className={styles.bigger}>{companyItem.caliber}</label>
            </div>
          </div>
        </div>

        <div className={styles.behind_content}></div>
      </div>

      {showModal && (
        <AddToCartModal item={companyItem} close={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default ItemCard;
