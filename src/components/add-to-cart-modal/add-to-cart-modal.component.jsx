import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../modal/modal.component";
import SelectCustom from "../select/select.component";
import InfoRow from "../info-row/info-row.component";

import { addItemToCart } from "../../redux/cart/cartSlice";
import { selectToken } from "../../redux/auth/authSlice";

import { Colors, OfferTypes } from "../../utils/constants";

// styles
import styles from "./add-to-cart-modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { statisticsItemAddedToCart } from "../../redux/statistics/statisticsSlice";

// check if there is an offer for entered quantity in a specific warehouse
// const checkOffer = (selectedWarehouse, qty) => {
//   // check if the specified warehouse has an offer
//   if (selectedWarehouse.offer.offers.length > 0) {
//     // through all the offers, check if the entered quantity has an offer
//     for (let i = 0; i < selectedWarehouse.offer.offers.length; i++) {
//       // check if the entered quantity has an offer
//       if (qty >= selectedWarehouse.offer.offers[i].qty) {
//         // if it has return:
//         // 1- mode of the offer (pieces, percentage)
//         // 2- bonus
//         // 2-1: if the mode is pieces return the bonus * (entered qty / bonus qty)
//         // 2-2: if the mode is percentage return the bonus
//         return {
//           bonusType: selectedWarehouse.offer.mode,
//           bonus:
//             selectedWarehouse.offer.mode === OfferTypes.PIECES
//               ? selectedWarehouse.offer.offers[i].bonus *
//                 Math.floor(qty / selectedWarehouse.offer.offers[i].qty)
//               : selectedWarehouse.offer.offers[i].bonus,
//         };
//       }
//     }
//   }

//   // if the specified warehouse doesn't have any offer
//   // or the entered quantity doesn't have a match offer
//   return null;
// };

// check if there is an offer for entered quantity in a specific warehouse
const checkOfferQty = (selectedWarehouse, qty) => {
  // check if the specified warehouse has an offer
  if (selectedWarehouse.offer.offers.length > 0) {
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

function AddToCartModal({ item, close }) {
  const { t } = useTranslation();

  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const itemWarehousesOption = item.warehouses.map((w) => {
    const asterisk = w.offer.offers.length > 0 ? "*" : "";
    return {
      label: `${w.warehouse.name} ${asterisk}`,
      value: w.warehouse._id,
    };
  });
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    item.warehouses[0]
  );
  const [offer, setOffer] = useState(item.warehouses[0].offer);

  const [qty, setQty] = useState(0);
  const [qtyError, setQtyError] = useState(false);

  const handleWarehouseChange = (val) => {
    setSelectedWarehouse(item.warehouses.find((w) => w.warehouse._id == val));
    setOffer(item.warehouses.find((w) => w.warehouse._id == val).offer);
  };

  const quantityChange = (e) => {
    setQty(e.target.value * 1);
    setQtyError(false);
  };

  const handleAddItemToCart = () => {
    if (qty === 0) {
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

    dispatch(statisticsItemAddedToCart({ obj: { itemId: item._id }, token }));

    close();
  };

  return (
    <Modal
      header="add-to-cart"
      cancelLabel="cancel-label"
      okLabel="add-label"
      closeModal={close}
      okModal={handleAddItemToCart}
      small={true}
    >
      <InfoRow
        editable={false}
        field="item-name"
        labelText={t("item-name")}
        value={item.name}
        onInputChange={() => {}}
        action={() => {}}
      />

      <InfoRow
        editable={false}
        field="item-caliber"
        labelText={t("item-caliber")}
        value={item.caliber}
        onInputChange={() => {}}
        action={() => {}}
      />

      <InfoRow
        editable={false}
        field="item-formula"
        labelText={t("item-formula")}
        value={item.formula}
        onInputChange={() => {}}
        action={() => {}}
      />

      <InfoRow
        editable={false}
        field="item-price"
        labelText={t("item-price")}
        value={item.price}
        onInputChange={() => {}}
        action={() => {}}
      />

      <InfoRow
        editable={false}
        field="item-customer-price"
        labelText={t("item-customer-price")}
        value={item.customer_price}
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
            onChange={quantityChange}
          />
        </div>
      </div>

      {offer.offers.length > 0 &&
        offer.offers.map((o, index) => (
          <div className={styles.offer} key={index}>
            <p>
              <label>{t("quantity-label")}</label>
              <label className={styles.value} style={{ padding: "0 6px" }}>
                {o.qty}
              </label>
              <label style={{ paddingLeft: "20px" }}>
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
  );
}

export default AddToCartModal;
