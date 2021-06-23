import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

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
import styles from "./item-card.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants.js";

function ItemCard({ companyItem }) {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesItems);
  const token = useSelector(selectToken);

  const [connectionError, setConnectionError] = useState("");

  // method to handle add company to user's favorite
  const addItemToFavoriteItems = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(
      addFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    );
  };

  // method to handle remove company from user's favorite
  const removeItemFromFavoritesItems = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(
      removeFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    );
  };

  const addItemToWarehouseHandler = () => {
    dispatch(
      addItemToWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    );
  };

  const removeItemFromWarehouseHandler = () => {
    dispatch(
      removeItemFromWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    );
  };

  return (
    <div className={styles.partner_container}>
      <div>
        {favorites.map((favorite) => favorite._id).includes(companyItem._id) ? (
          <AiFillStar
            className={[styles.icon, styles.fill_star].join(" ")}
            color="yellow"
            size={32}
            onClick={removeItemFromFavoritesItems}
          />
        ) : (
          <AiOutlineStar
            className={styles.icon}
            color="yellow"
            size={32}
            onClick={addItemToFavoriteItems}
          />
        )}
      </div>

      <div>
        {user.type === UserTypeConstants.WAREHOUSE &&
          (companyItem.warehouses.map((w) => w.warehouse).includes(user._id) ? (
            <p
              className={[styles.add_from_container, styles.remove].join(" ")}
              onClick={removeItemFromWarehouseHandler}
            >
              <label className={styles.label}>
                {t("remove-from-warehouse")}
              </label>
              <MdDelete className={styles.remove_icon} size="26" />
            </p>
          ) : (
            <p
              className={[styles.add_from_container, styles.add].join(" ")}
              onClick={addItemToWarehouseHandler}
            >
              <label className={styles.label}>{t("add-to-warehouse")}</label>
              <IoMdAdd className={styles.remove_icon} size="26" />
            </p>
          ))}
      </div>

      <div className={styles.logo}>
        {user.logo_url?.length > 0 ? (
          <></>
        ) : (
          <p className={styles.partner_logo}>
            <GiMedicines color={Colors.SECONDARY_COLOR} size="100" />
          </p>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.showed_content}>
          <p className={styles.partner_name}>{companyItem.name}</p>
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

      {connectionError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setConnectionError("");
          }}
        >
          <p>{t(connectionError)}</p>
        </Toast>
      )}
    </div>
  );
}

export default ItemCard;
