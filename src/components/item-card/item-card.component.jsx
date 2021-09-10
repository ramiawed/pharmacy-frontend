import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { VscLoading } from "react-icons/vsc";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/companyItems/companyItemsSlices";
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
    <div className={styles.partner_container}>
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
              <TiShoppingCart size={24} />
            </div>
          )}

        {changeFavoriteLoading ? (
          <Icon
            icon={() => (
              <VscLoading className={generalStyles.loading} size={20} />
            )}
            onclick={() => {}}
            foreColor={Colors.YELLOW_COLOR}
          />
        ) : favorites
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
      </div>

      <div className={styles.logo_div}>
        {companyItem.logo_url?.length > 0 ? (
          <p
            style={{
              backgroundImage: `url("http://localhost:8000/${companyItem.logo_url}`,
            }}
            className={styles.logo}
          ></p>
        ) : (
          <p className={styles.logo}>
            <GiMedicines color={Colors.SECONDARY_COLOR} size="100" />
          </p>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.showed_content}>
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
          {/* <p className={styles.item_name}>{companyItem.name}</p> */}
          <div className={styles.info}>
            <label>{t("item-price")}:</label>
            <label className={styles.bigger}>{companyItem.price}</label>
          </div>

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
