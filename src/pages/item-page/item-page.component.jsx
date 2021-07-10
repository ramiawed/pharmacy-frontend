import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  addItem,
  resetAddStatus,
  resetUpdateStatus,
  selectItems,
  updateItem,
} from "../../redux/items/itemsSlices";

import axios from "../../api/pharmacy";

import styles from "./item-page.module.scss";
import rowStyles from "../../components/row.module.scss";

import CardInfo from "../../components/card-info/card-info.component";
import Input from "../../components/input/input.component";
import { getIcon } from "../../utils/icons";
import { useTranslation } from "react-i18next";
import Toast from "../../components/toast/toast.component";
import { Colors, UserTypeConstants } from "../../utils/constants";
import AddToCartModal from "../../components/add-to-cart-modal/add-to-cart-modal.component";
import { checkConnection } from "../../utils/checkInternet";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/companyItems/companyItemsSlices";
import MultiValue from "../../components/multi-value/multi-value.component";

function ItemPage() {
  const { t } = useTranslation();
  const { readOnly, itemId } = useParams();
  const { user, token } = useSelector(selectUserData);
  const { addStatus, updateStatus } = useSelector(selectItems);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [connectionError, setConnectionError] = useState("");

  const [item, setItem] = useState({
    name: "",
    company: user._id,
    caliber: "",
    formula: "",
    indication: "",
    composition: "",
    packing: "",
    price: 0,
    customer_price: 0,
  });

  const [itemError, setItemError] = useState({});

  // reset handler
  const resetItem = () => {
    setItem({
      name: "",
      company: user._id,
      caliber: "",
      formula: "",
      indication: "",
      composition: "",
      packing: "",
      price: "",
      customer_price: "",
    });
    setItemError({});
  };

  const handleInputChange = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value,
    });

    setItemError({
      ...itemError,
      [e.target.id]: "",
    });
  };

  // handle to add item
  // check the item name
  // check the item trade name
  // check the item caliber
  // check the item category
  // check the item type
  const handleAddUpdateItem = () => {
    const errorObj = {};

    // item trade name must be not empty
    if (item.name.length === 0) {
      errorObj["name"] = "enter-item-trade-name";
    }

    // item price must be not empty
    if (item.price === 0 || !item.price) {
      errorObj["price"] = "enter-price";
    }

    // item customer price must be not empty
    if (item.customer_price === 0 || !item.customer_price) {
      errorObj["customer_price"] = "enter-customer-price";
    }

    if (Object.entries(errorObj).length === 0) {
      // check if there is an error
      const obj = {
        ...item,
      };

      if (!itemId) {
        dispatch(addItem({ obj, token }))
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            resetItem();
          })
          .catch((rejectedValueOrSerializedError) => {});
      } else {
        // dispatch update item
        dispatch(updateItem({ obj, token }))
          .then((originalPromiseResult) => {
            // resetItem();
          })
          .catch((rejectedValueOrSerializedError) => {});
      }
    } else {
      setItemError({
        ...errorObj,
      });
    }
  };

  // method to handle add item to warehouse
  const addItemToWarehouseHandler = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(
      addItemToWarehouse({
        obj: {
          itemId: item._id,
          warehouseId: user._id,
        },
        token,
      })
    )
      .then(unwrapResult)
      .then((result) => getItemFromDB())
      .catch((err) => {});
  };

  // method to handle remove item from warehouse
  const removeItemFromWarehouseHandler = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(
      removeItemFromWarehouse({
        obj: {
          itemId: item._id,
          warehouseId: user._id,
        },
        token,
      })
    )
      .then(unwrapResult)
      .then((result) => getItemFromDB())
      .catch((err) => {});
  };

  const getItemFromDB = () => {
    axios
      .get(`/items/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setItem(response.data.data.item));
  };

  useEffect(() => {
    if (itemId) {
      // axios
      //   .get(`/items/item/${itemId}`, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then((response) => setItem(response.data.data.item));
      getItemFromDB();
    }
  }, [itemId, token]);

  return (
    <>
      <div className={styles.content}>
        <CardInfo headerTitle={t("item-main-info")}>
          <Input
            label="item-trade-name"
            id="name"
            type="text"
            value={item.name}
            bordered={false}
            icon={getIcon("medicine")}
            onchange={handleInputChange}
            error={itemError.name?.length > 0}
          />

          <div className={styles.horizontal_div}></div>

          <Input
            label="item-formula"
            id="formula"
            type="text"
            value={item.formula}
            bordered={false}
            icon={getIcon("medicine")}
            onchange={handleInputChange}
            error={itemError.formula?.length > 0}
          />

          <div className={styles.horizontal_div}></div>

          <Input
            label="item-caliber"
            id="caliber"
            type="text"
            value={item.caliber}
            bordered={false}
            icon={getIcon("medicine")}
            onchange={handleInputChange}
            error={itemError.caliber?.length > 0}
          />

          <div className={styles.horizontal_div}></div>

          <Input
            label="item-packing"
            id="packing"
            type="text"
            value={item.packing}
            bordered={false}
            icon={getIcon("medicine")}
            onchange={handleInputChange}
            error={itemError.packing?.length > 0}
          />
        </CardInfo>

        <CardInfo headerTitle={t("item-price")}>
          <div
            style={{
              width: "300px",
            }}
          >
            <Input
              label="item-price"
              id="price"
              type="number"
              value={item.price}
              bordered={false}
              icon={getIcon("price")}
              onchange={handleInputChange}
              error={itemError.price?.length > 0}
            />
          </div>
          <div className={styles.horizontal_div}></div>
          <div
            style={{
              width: "300px",
            }}
          >
            <Input
              label="item-customer-price"
              id="customer_price"
              type="number"
              value={item.customer_price}
              bordered={false}
              icon={getIcon("price")}
              onchange={handleInputChange}
              error={itemError.customer_price?.length > 0}
            />
          </div>
        </CardInfo>

        <CardInfo headerTitle={t("item-composition")}>
          <div>
            <textarea
              placeholder={t("enter-composition")}
              id="composition"
              value={item.composition}
              onChange={handleInputChange}
            />
          </div>
        </CardInfo>

        <CardInfo headerTitle={t("item-indication")}>
          <div>
            <textarea
              placeholder={t("enter-indication")}
              id="indication"
              value={item.indication}
              onChange={handleInputChange}
            />
          </div>
        </CardInfo>

        <CardInfo headerTitle={t("nav-offers")}></CardInfo>

        {readOnly === "admin" &&
          (user.type === UserTypeConstants.COMPANY ||
            user.type === UserTypeConstants.ADMIN) &&
          item.warehouses?.length > 0 && (
            <CardInfo headerTitle={t("warehouses")}>
              {item.warehouses.map((w, index) => (
                <div
                  className={[
                    rowStyles.container,
                    rowStyles.without_box_shadow,
                    rowStyles.padding_all,
                  ].join(" ")}
                >
                  <label>{w.warehouse.name}</label>
                </div>
              ))}
            </CardInfo>
          )}

        {Object.entries(itemError).length > 0 && (
          <ul className={styles.error_ul}>
            {Object.keys(itemError).map((key) =>
              itemError[key].length > 0 ? (
                <li key={key}>{t(itemError[key])}</li>
              ) : null
            )}
          </ul>
        )}
      </div>

      {readOnly === "admin" && (
        <div className={styles.action_div}>
          <motion.button
            className={styles.add_button}
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255, 255, 255)",
              boxShadow: "0px 0px 8px rgb(255, 255, 255)",
            }}
            onClick={handleAddUpdateItem}
          >
            {itemId ? t("update-item") : t("add-item")}
          </motion.button>
        </div>
      )}

      {readOnly === "user" && user.type === UserTypeConstants.PHARMACY && (
        <div className={styles.action_div}>
          <motion.button
            className={[styles.add_button, styles.green].join(" ")}
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255, 255, 255)",
              boxShadow: "0px 0px 8px rgb(255, 255, 255)",
            }}
            onClick={() => setShowModal(true)}
          >
            {t("add-to-cart")}
          </motion.button>
        </div>
      )}

      {readOnly === "user" &&
        user.type === UserTypeConstants.WAREHOUSE &&
        (item.warehouses?.map((w) => w.warehouse._id).includes(user._id) ? (
          <div className={styles.action_div}>
            <motion.button
              className={[styles.add_button, styles.red].join(" ")}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={removeItemFromWarehouseHandler}
            >
              {t("remove-from-warehouse")}
            </motion.button>
          </div>
        ) : (
          <div className={styles.action_div}>
            <motion.button
              className={[styles.add_button, styles.green].join(" ")}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              onClick={addItemToWarehouseHandler}
            >
              {t("add-to-warehouse")}
            </motion.button>
          </div>
        ))}

      {showModal && (
        <AddToCartModal item={item} close={() => setShowModal(false)} />
      )}

      {addStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetAddStatus());
          }}
        >
          <p>{t("add-item-succeeded")}</p>
        </Toast>
      )}

      {updateStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetUpdateStatus());
          }}
        >
          <p>{t("update-item-succeeded")}</p>
        </Toast>
      )}

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
    </>
  );
}

export default ItemPage;
