// Modal that show the item with it's warehouse to allow pharmacy to buy an item
// you should select a quantity greater than zero an less than the selected warehouse max quantity

// Props
// item: the item that the pharmacy will buy
// close: action to close the modal
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Modal from "../modal/modal.component";
import SelectCustom from "../select/select.component";

// redux stuff
import { addItemToCart } from "../../redux/cart/cartSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";
import { selectWarehouses } from "../../redux/warehouse/warehousesSlice";

// constants and utils
import {
  Colors,
  OfferTypes,
  onKeyPressForNumberInput,
  toEnglishNumber,
} from "../../utils/constants";

// styles
import styles from "./add-to-cart-modal.module.scss";
import { selectMedicines } from "../../redux/medicines/medicinesSlices";

// check if there is an offer for entered quantity in a specific warehouse
const checkOfferQty = (selectedWarehouse, qty) => {
  // check if the specified warehouse has an offer
  if (selectedWarehouse?.offer.offers.length > 0) {
    // through all the offers, check if the entered quantity has an offer
    for (let i = 0; i < selectedWarehouse.offer.offers.length; i++) {
      // check if the entered quantity has an offer
      if (qty >= selectedWarehouse.offer.offers[i].qty) {
        // if it has return:
        // 1- mode of the offer (pieces, percentage)
        // 2- bonus
        // 2-1: if the mode is pieces return the bonus * (entered qty / bonus qty)
        // 2-2: if the mode is percentage return the bonus
        if (selectedWarehouse.offer.mode === OfferTypes.PERCENTAGE) {
          return selectedWarehouse.offer.offers[i].bonus;
        } else {
          return (
            selectedWarehouse.offer.offers[i].bonus +
            checkOfferQty(
              selectedWarehouse,
              qty - selectedWarehouse.offer.offers[i].qty
            )
          );
        }
      }
    }
  }

  return 0;
};

function AddToCartModal({ item, close, setAddItemToCartMsg }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const isOnline = useSelector(selectOnlineStatus);
  const {
    pageState: { searchWarehouseId: sWarehouse },
  } = useSelector(selectMedicines);

  // build the warehouse option array that contains this item
  // get all the warehouse that contains this item
  // put asterisk after warehouse name if the warehouse has an offer
  const itemWarehousesOption = item.warehouses
    .filter(
      (w) =>
        w.warehouse.city === user.city &&
        w.warehouse.isActive &&
        w.warehouse.isApproved
    )
    .map((w) => {
      const asterisk = w.offer.offers.length > 0 ? "*" : "";

      return {
        label: `${w.warehouse.name} ${asterisk}`,
        value: w.warehouse._id,
      };
    });

  // select the first warehouse in the list
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    sWarehouse !== null
      ? item.warehouses
          .filter((w) => w.warehouse.city === user.city)
          .find((w) => w.warehouse._id === sWarehouse)
      : item.warehouses.filter((w) => w.warehouse.city === user.city)[0]
  );

  const [offer, setOffer] = useState(
    sWarehouse !== null
      ? item.warehouses
          .filter((w) => w.warehouse.city === user.city)
          .find((w) => w.warehouse._id == sWarehouse).offer
      : item.warehouses.filter((w) => w.warehouse.city === user.city)[0].offer
  );
  const [qty, setQty] = useState("");
  const [qtyError, setQtyError] = useState(false);

  const handleWarehouseChange = (val) => {
    setSelectedWarehouse(item.warehouses.find((w) => w.warehouse._id == val));
    setOffer(item.warehouses.find((w) => w.warehouse._id == val).offer);
  };

  const quantityChange = (e) => {
    const value = Number.parseInt(toEnglishNumber(e.target.value));
    setQty(isNaN(value) ? "" : value);
    setQtyError(false);
  };

  const handleAddItemToCart = () => {
    if (qty.length === 0) {
      setQtyError(true);
      return;
    }

    if (selectedWarehouse.maxQty !== 0 && qty > selectedWarehouse.maxQty) {
      setQtyError(true);
      return;
    }

    const bonusQty = checkOfferQty(selectedWarehouse, qty);

    dispatch(
      addItemToCart({
        item: item,
        warehouse: selectedWarehouse,
        qty: qty,
        bonus: bonusQty > 0 ? bonusQty : null,
        bonusType: bonusQty > 0 ? selectedWarehouse.offer.mode : null,
      })
    );

    if (isOnline) {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetItem: item._id,
            action: "item-added-to-cart",
          },
          token,
        })
      );
    }

    close();
    setAddItemToCartMsg("add-item-to-cart");
  };

  return (
    <>
      <Modal
        header="add-to-cart"
        cancelLabel="cancel-label"
        okLabel="add-label"
        closeModal={close}
        okModal={handleAddItemToCart}
        small={true}
      >
        {/* <div className={styles.warehouse_row}> */}
        <div className={styles.select_warehouse}>
          <label>{t("item-warehouse")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={itemWarehousesOption}
            onchange={handleWarehouseChange}
            defaultOption={{
              label: selectedWarehouse.warehouse.name,
              value: selectedWarehouse.warehouse._id,
            }}
          />
        </div>

        <div className={styles.max_qty_div}>
          <label>{t("item-max-qty")}</label>
          <p>
            {selectedWarehouse.maxQty === 0
              ? t("no-limit-qty")
              : selectedWarehouse.maxQty}
          </p>
        </div>
        <div className={styles.max_qty_div}>
          <label>{t("selected-qty")}</label>
          <input
            className={qtyError ? styles.error : ""}
            value={qty}
            onKeyPress={onKeyPressForNumberInput}
            onChange={quantityChange}
          />
        </div>
        {/* </div> */}

        {offer?.offers.length > 0 &&
          offer.offers.map((o, index) => (
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
                  {offer.mode === OfferTypes.PIECES
                    ? t("bonus-quantity-label")
                    : t("bonus-percentage-label")}
                </label>
                <label className={styles.value}>{o.bonus}</label>
                <label>
                  {offer.mode === OfferTypes.PIECES
                    ? t("after-bonus-quantity-label")
                    : t("after-bonus-percentage-label")}
                </label>
              </p>
            </div>
          ))}
      </Modal>
    </>
  );
}

export default AddToCartModal;
