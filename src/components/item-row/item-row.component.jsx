import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  addFavoriteItem,
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";

import ActionButton from "../action-button/action-button.component";
import SelectCustom from "../select/select.component";
import InfoRow from "../info-row/info-row.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";

// styles
import styles from "./item-row.module.scss";
import rowStyles from "../row.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/companyItems/companyItemsSlices";
import Modal from "../modal/modal.component";
import { addItemToCart } from "../../redux/cart/cartSlice";

function ItemRow({ companyItem }) {
  // console.log(companyItem);

  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favoritesItems = useSelector(selectFavoritesItems);
  const token = useSelector(selectToken);
  const [showModal, setShowModal] = useState(false);
  const [itemWarehousesOption, setItemWarehousesOption] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [qty, setQty] = useState(0);
  const [qtyError, setQtyError] = useState(false);

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

  const buildWarehousesOption = () => {
    const warehousesOption = companyItem.warehouses.map((w) => {
      return { label: w.warehouse.name, value: w.warehouse._id };
    });

    setItemWarehousesOption(warehousesOption);
    setSelectedWarehouse(companyItem.warehouses[0]);
  };

  const handleWarehouseChange = (val) => {
    setSelectedWarehouse(
      companyItem.warehouses.find((w) => w.warehouse._id == val)
    );
  };

  const handleAddItemToCart = () => {
    if (selectedWarehouse.maxQty !== 0 && qty > selectedWarehouse.maxQty) {
      setQtyError(true);
      return;
    }
    dispatch(
      addItemToCart({
        item: companyItem,
        warehouse: selectedWarehouse,
        qty: qty,
      })
    );
    setShowModal(false);
  };

  return (
    <>
      <div className={rowStyles.container}>
        <p className={styles.name}>{companyItem.name}</p>
        <div className={styles.info}>
          <p>{t("item-caliber")}:</p>
          <p>{companyItem.caliber}</p>
        </div>

        <div className={styles.info}>
          <p>{t("item-formula")}:</p>
          <p>{companyItem.formula}</p>
        </div>

        <div className={styles.info}>
          <p>{t("item-price")}:</p>
          <p>{companyItem.price}</p>
        </div>

        <div className={styles.info}>
          <p>{t("item-customer-price")}:</p>
          <p>{companyItem.customer_price}</p>
        </div>

        {user.type === UserTypeConstants.WAREHOUSE &&
          (companyItem.warehouses.map((w) => w.warehouse).includes(user._id) ? (
            <ActionButton
              text="remove-from-warehouse"
              fontSize="0.6rem"
              action={removeItemFromWarehouseHandler}
              color={Colors.FAILED_COLOR}
            />
          ) : (
            <ActionButton
              text="add-to-warehouse"
              fontSize="0.6rem"
              action={addItemToWarehouseHandler}
              color={Colors.SUCCEEDED_COLOR}
            />
          ))}

        {user.type === UserTypeConstants.PHARMACY &&
          companyItem.warehouses.length > 0 && (
            <ActionButton
              icon={() => <TiShoppingCart />}
              // text="add-to-cart"
              // fontSize="0.6rem"
              action={() => {
                buildWarehousesOption();
                setShowModal(true);
              }}
              color={Colors.SUCCEEDED_COLOR}
            />
          )}

        <div>
          {favoritesItems
            .map((favorite) => favorite._id)
            .includes(companyItem._id) ? (
            <AiFillStar
              className={[rowStyles.icon, rowStyles.fill_star].join(" ")}
              size={24}
              onClick={removeItemFromFavoritesItems}
            />
          ) : (
            <AiOutlineStar
              className={rowStyles.icon}
              size={24}
              onClick={addItemToFavoriteItems}
            />
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          header="add-to-cart"
          cancelLabel="cancel-label"
          okLabel="add-label"
          closeModal={() => setShowModal(false)}
          okModal={handleAddItemToCart}
        >
          <InfoRow
            editable={false}
            field="item-name"
            labelText={t("item-name")}
            value={companyItem.name}
            onInputChange={() => {}}
            action={() => {}}
          />

          <InfoRow
            editable={false}
            field="item-caliber"
            labelText={t("item-caliber")}
            value={companyItem.caliber}
            onInputChange={() => {}}
            action={() => {}}
          />

          <InfoRow
            editable={false}
            field="item-formula"
            labelText={t("item-formula")}
            value={companyItem.formula}
            onInputChange={() => {}}
            action={() => {}}
          />

          <InfoRow
            editable={false}
            field="item-price"
            labelText={t("item-price")}
            value={companyItem.price}
            onInputChange={() => {}}
            action={() => {}}
          />

          <InfoRow
            editable={false}
            field="item-customer-price"
            labelText={t("item-customer-price")}
            value={companyItem.customer_price}
            onInputChange={() => {}}
            action={() => {}}
          />

          <div className={styles.warehouse_row}>
            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={itemWarehousesOption}
              onchange={handleWarehouseChange}
              defaultOption={itemWarehousesOption[0]}
              caption="item-warehouse"
            />
            <div className={styles.max_qty_div}>
              <p>{t("item-max-qty")}</p>
              <p>
                {selectedWarehouse.maxQty === 0
                  ? t("no-limit-qty")
                  : selectedWarehouse.maxQty}
              </p>
            </div>
            <div className={styles.max_qty_div}>
              <p>{t("selected-qty")}</p>
              <input
                className={qtyError ? styles.error : ""}
                type="number"
                min={0}
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value * 1);
                  setQtyError(false);
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ItemRow;
