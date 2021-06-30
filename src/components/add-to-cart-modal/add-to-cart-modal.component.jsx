import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../modal/modal.component";
import SelectCustom from "../select/select.component";
import InfoRow from "../info-row/info-row.component";

import { addItemToCart } from "../../redux/cart/cartSlice";

import { Colors } from "../../utils/constants";

// styles
import styles from "./add-to-cart-modal.module.scss";
import { useDispatch } from "react-redux";

function AddToCartModal({ item, close }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const [itemWarehousesOption, setItemWarehousesOption] = useState(
  //   item.warehouses.map((w) => {
  //     return { label: w.warehouse.name, value: w.warehouse._id };
  //   })
  // );
  const itemWarehousesOption = item.warehouses.map((w) => {
    return { label: w.warehouse.name, value: w.warehouse._id };
  });
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    item.warehouses[0]
  );
  const [qty, setQty] = useState(0);
  const [qtyError, setQtyError] = useState(false);

  const handleWarehouseChange = (val) => {
    setSelectedWarehouse(item.warehouses.find((w) => w.warehouse._id == val));
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
    dispatch(
      addItemToCart({
        item: item,
        warehouse: selectedWarehouse,
        qty: qty,
      })
    );
    close();
  };

  return (
    <Modal
      header="add-to-cart"
      cancelLabel="cancel-label"
      okLabel="add-label"
      closeModal={close}
      okModal={handleAddItemToCart}
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
            onChange={(e) => {
              setQty(e.target.value * 1);
              setQtyError(false);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddToCartModal;
