// Modal that show the item with it's warehouse to allow pharmacy to buy an item
// you should select a quantity greater than zero and less than the selected warehouse max quantity

// Props
// item: the item that the pharmacy will buy
// close: action to close the modal
// fromSavedItems: to determine that is the item was in the saveItems
// setAddItemToCartMsg: method to set the add item to cart message

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Modal from "../modal/modal.component";

// redux stuff
import { addItemToCart } from "../../redux/cart/cartSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";
import { selectMedicines } from "../../redux/medicines/medicinesSlices";
import { removeSavedItem } from "../../redux/savedItems/savedItemsSlice";

// constants and utils
import { OfferTypes, toEnglishNumber } from "../../utils/constants";

// styles
import styles from "./add-to-cart-modal.module.scss";
import OfferDetailsRow from "../../components/offer-details-row/offer-details-row.component";
import ChooserContainer from "../../components/chooser-container/chooser-container.component";
import ChooseValue from "../../components/choose-value/choose-value.component";
import SearchInput from "../../components/search-input/search-input.component";
import PointDetailsRow from "../../components/point-details-row/point-details-row.component";
import Separator from "../../components/separator/separator.component";

function AddToCartModal({ item, close, setAddItemToCartMsg, fromSavedItems }) {
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
    .filter((w) => w.warehouse.city === user.city && w.warehouse.isActive)
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
          .filter((w) => w.warehouse.city === user.city && w.warehouse.isActive)
          .find((w) => w.warehouse._id === sWarehouse)
      : item.warehouses.filter((w) => w.warehouse.city === user.city)[0]
  );

  const [offer, setOffer] = useState(
    sWarehouse !== null
      ? item.warehouses
          .filter((w) => w.warehouse.city === user.city)
          .find((w) => w.warehouse._id === sWarehouse).offer
      : item.warehouses.filter((w) => w.warehouse.city === user.city)[0].offer
  );

  const [points, setPoints] = useState(
    sWarehouse !== null
      ? item.warehouses
          .filter((w) => w.warehouse.city === user.city)
          .find((w) => w.warehouse._id === sWarehouse).points
      : item.warehouses.filter((w) => w.warehouse.city === user.city)[0].points
  );

  // choosen quantity must be great than zero and less than the max size in that warehouse
  const [qty, setQty] = useState("");

  // true: the entered quantity is acceptable
  // false: the entered quantity is not acceptable because it is zero, or greater that
  // maximum allowed value in that warehouse
  const [qtyError, setQtyError] = useState(false);

  const [showWarehousesOptions, setShowWarehousesOptions] = useState(false);

  const warehouseChangeHandler = (val) => {
    setSelectedWarehouse(item.warehouses.find((w) => w.warehouse._id == val));
    setOffer(item.warehouses.find((w) => w.warehouse._id == val).offer);
    setPoints(item.warehouses.find((w) => w.warehouse._id == val).points);
  };

  const quantityChangeHandler = (e) => {
    const value = Number.parseInt(toEnglishNumber(e.target.value));
    setQty(isNaN(value) ? "" : value);
    setQtyError(false);
  };

  // 1- check the quantity
  // 1-1- if the quantity is zero, set quantity error to true
  // 1-2- if the quantity is greater than the allowed quantity in selected warehouse
  // set the quantity error to true
  // 2- check if there is a bouns in the selected warehouse with the entered quantity
  // 3- add the item to the selected warehouse in cart
  // 4- add statistic that this item added to cart
  // 5- close the modal
  const addItemToCartHandler = () => {
    // check that the entered quantity is not zero
    if (qty.length === 0) {
      setQtyError(true);
      return;
    }

    // check if the entered quantity is larger than the allowed quantity in the selected warehouse
    if (selectedWarehouse.maxQty !== 0 && qty > selectedWarehouse.maxQty) {
      setQtyError(true);
      return;
    }

    // add item to cart
    dispatch(
      addItemToCart({
        item: item,
        warehouse: selectedWarehouse,
        qty: qty,
      })
    );

    // add a statistic
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

    // close the modal
    close();

    // infrom the user that the item is added to cart
    setAddItemToCartMsg("add-item-to-cart");

    // if the item saved in the savedItem, remove it
    if (fromSavedItems) {
      dispatch(removeSavedItem({ obj: { savedItemId: item._id }, token }));
    }
  };

  return (
    <>
      <Modal
        header="add-to-cart"
        cancelLabel="cancel-label"
        okLabel="add-label"
        closeModal={close}
        okModal={addItemToCartHandler}
        small={true}
      >
        <div>
          <ChooserContainer
            onclick={() => setShowWarehousesOptions(true)}
            selectedValue={selectedWarehouse.warehouse.name}
            label="item-warehouse"
            styleForSearch={true}
            // withoutBorder={true}
          />

          <div className={styles.max_qty_div}>
            <label>{t("item-max-qty")}</label>
            <label>
              {selectedWarehouse.maxQty === 0 ? "-" : selectedWarehouse.maxQty}
            </label>
          </div>

          <SearchInput
            label="selected-qty"
            id="selected-qty"
            type="text"
            value={qty}
            onchange={(e) => {
              quantityChangeHandler(e);
            }}
            withBorder={true}
            hasFocus={true}
          />

          {qtyError && <label className={styles.error}>{t("enter-qty")}</label>}

          {offer?.offers.length > 0 &&
            offer.offers.map((o, index) => (
              <OfferDetailsRow key={index} offer={o} offerMode={offer.mode} />
            ))}

          {points?.length > 0 && <Separator />}

          {points?.length > 0 &&
            points.map((o, index) => <PointDetailsRow key={index} point={o} />)}
        </div>
      </Modal>

      {showWarehousesOptions && (
        <ChooseValue
          headerTitle="warehouses"
          close={() => {
            setShowWarehousesOptions(false);
          }}
          values={itemWarehousesOption}
          defaultValue={selectedWarehouse.warehouse._id}
          chooseHandler={warehouseChangeHandler}
        />
      )}
    </>
  );
}

export default AddToCartModal;
