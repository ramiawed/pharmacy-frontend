import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// components
import Input from "../input/input.component";
import CardInfo from "../card-info/card-info.component";
import Toast from "../toast/toast.component";

// constants and utils
import { getIcon } from "../../utils/icons";
import { Colors } from "../../utils/constants";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  addItem,
  resetAddStatus,
  resetUpdateStatus,
  selectItems,
  updateItem,
} from "../../redux/items/itemsSlices";
import { unwrapResult } from "@reduxjs/toolkit";

// styles
import styles from "./item.module.scss";

function Item({ selectedItem }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectUserData);
  const { addStatus, updateStatus } = useSelector(selectItems);

  // state to hold the item field
  const [item, setItem] = useState(
    selectedItem
      ? selectedItem
      : {
          name: "",
          company: user._id,
          caliber: "",
          formula: "",
          indication: "",
          composition: "",
          packing: "",
          price: 0,
          customer_price: 0,
        }
  );

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

      if (!selectedItem) {
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
            resetItem();
          })
          .catch((rejectedValueOrSerializedError) => {});
      }
    } else {
      setItemError({
        ...errorObj,
      });
    }
  };

  // Render
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
          {selectedItem ? t("update-item") : t("add-item")}
        </motion.button>
      </div>

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
    </>
  );
}

export default Item;
