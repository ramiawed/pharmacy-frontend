import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

// components
import Header from "../header/header.component";
import Input from "../input/input.component";
import MultiValue from "../multi-value/multi-value.component";
import SelectCustom from "../select/select.component";
import CardInfo from "../card-info/card-info.component";

// react icons
import { AiOutlineExclamationCircle } from "react-icons/ai";

// constants and utils
import { getIcon } from "../../utils/icons";
import { Colors } from "../../utils/constants";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/categories/categoriesSlice";
import { selectItemTypes } from "../../redux/itemTypes/itemTypesSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { addItem } from "../../redux/items/itemsSlices";

// styles
import styles from "./item.module.scss";
import { unwrapResult } from "@reduxjs/toolkit";

function Item() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectUserData);

  // category options
  const categories = useSelector(selectCategories);
  const categoriesOptions = [{ value: "", label: t("choose-category") }];
  categories.forEach((category) =>
    categoriesOptions.push({ value: category._id, label: category.name })
  );

  // item type options
  const itemTypes = useSelector(selectItemTypes);
  const itemTypesOptions = [{ value: "", label: t("choose-item-type") }];
  itemTypes.forEach((itemType) =>
    itemTypesOptions.push({ value: itemType._id, label: itemType.name })
  );

  // caliber state
  const [calibers, setCalibers] = useState([]);
  const handleChangeCaliber = (e) => {
    let arr = calibers.map((caliber, index) => {
      if (e.target.id === caliber.key) {
        return {
          ...caliber,
          value: e.target.value,
        };
      } else {
        return caliber;
      }
    });

    setCalibers(arr);
  };
  const handleDeleteCaliber = (key) => {
    let arr = calibers.filter((caliber) => caliber.key !== key);
    setCalibers(arr);
  };

  // pharmacological_composition state
  const [compositions, setCompositions] = useState([]);
  const handleChangeComposition = (e) => {
    let arr = compositions.map((composition, index) => {
      if (e.target.id === composition.key) {
        return {
          ...composition,
          value: e.target.value,
        };
      } else {
        return composition;
      }
    });

    setCompositions(arr);
  };
  const handleDeleteComposition = (key) => {
    let arr = compositions.filter((composition) => composition.key !== key);
    setCompositions(arr);
  };

  // state to hold the item field
  const [item, setItem] = useState({
    name: "",
    trade_name: "",
    caliber: "",
    price: 0,
    description: "",
    pharmacological_composition: "",
    type: "",
    tags: "",
    category: "",
    company: user._id,
  });

  const [itemError, setItemError] = useState({});

  // reset handler
  const resetItem = () => {
    setItem({
      name: "",
      trade_name: "",
      caliber: "",
      price: 0,
      description: "",
      pharmacological_composition: "",
      tags: "",
      company: user._id,
    });
    setItemError({});
    setCompositions([]);
    setCalibers([]);
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

  const handleCategoryChange = (val) => {
    setItem({
      ...item,
      category: val,
    });
    setItemError({
      ...itemError,
      category: "",
    });
  };

  const handleItemTypeChange = (val) => {
    setItem({
      ...item,
      type: val,
    });
    setItemError({
      ...itemError,
      type: "",
    });
  };

  // handle to add item
  // check the item name
  // check the item trade name
  // check the item caliber
  // check the item category
  // check the item type
  const handleAddItem = () => {
    const errorObj = {};

    // item name must be not empty
    if (item.name.length === 0) {
      errorObj["name"] = "enter-item-name";
    }

    // item trade name must be not empty
    if (item.trade_name.length === 0) {
      errorObj["trade_name"] = "enter-item-trade-name";
    }

    // item must have a category
    if (item.category === "") {
      errorObj["category"] = "choose-category";
    }

    // item must have a type
    if (item.type === "") {
      errorObj["type"] = "choose-type";
    }

    // convert the composition to array and check if it have a value
    const compositionArr = [];
    compositions.forEach((com) => {
      if (com.value !== "") compositionArr.push(com.value);
    });

    // convert the caliber to array and check if it have a value
    const calibersArr = [];
    calibers.forEach((cal) => {
      if (cal.value !== "") calibersArr.push({ value: cal.value });
    });
    if (calibersArr.length === 0) {
      errorObj["caliber"] = "enter-caliber";
    }

    // check if there is an error
    if (Object.entries(errorObj).length === 0) {
      const obj = {
        ...item,
        pharmacological_composition: compositionArr,
        caliber: calibersArr,
      };

      dispatch(addItem({ obj, token }))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          resetItem();
        })
        .catch((rejectedValueOrSerializedError) => {});
    } else {
      setItemError({
        ...errorObj,
      });
    }
  };

  return (
    <div>
      <Header>
        <h2>{t("add-item")}</h2>
      </Header>

      <div className={styles.content}>
        <CardInfo headerTitle={t("item-main-info")}>
          <Input
            label="item-name"
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
            label="item-trade-name"
            id="trade_name"
            type="text"
            value={item.trade_name}
            bordered={false}
            icon={getIcon("medicine")}
            onchange={handleInputChange}
            error={itemError.trade_name?.length > 0}
          />

          <div className={styles.horizontal_div}></div>
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

          <div className={styles.select_div}>
            <div
              style={{
                width: "220px",
              }}
            >
              <SelectCustom
                bgColor={Colors.SECONDARY_COLOR}
                foreColor="#fff"
                caption="type"
                options={itemTypesOptions}
                onchange={handleItemTypeChange}
                defaultOption={{
                  value: item.type,
                  label: t("choose-item-type"),
                }}
              />
            </div>

            {itemError.type?.length > 0 && (
              <AiOutlineExclamationCircle className={styles.error_icon} />
            )}
          </div>

          <div className={styles.horizontal_div}></div>

          <div className={styles.select_div}>
            <div
              style={{
                width: "220px",
              }}
            >
              <SelectCustom
                bgColor={Colors.SECONDARY_COLOR}
                foreColor="#fff"
                caption="category"
                options={categoriesOptions}
                onchange={handleCategoryChange}
                defaultOption={{
                  value: item.category,
                  label: t("choose-item-category"),
                }}
              />
            </div>
            {itemError.category?.length > 0 && (
              <AiOutlineExclamationCircle className={styles.error_icon} />
            )}
          </div>
        </CardInfo>

        <CardInfo headerTitle={t("description")}>
          <div>
            <textarea
              placeholder={t("enter-description")}
              id="description"
              value={item.description}
              onChange={handleInputChange}
            />
          </div>
        </CardInfo>

        <CardInfo headerTitle={t("item-caliber")}>
          <MultiValue
            header={t("item-caliber")}
            addHandler={() => {
              setCalibers([...calibers, { key: uuidv4(), value: "" }]);
              setItemError({
                ...itemError,
                caliber: "",
              });
            }}
            values={calibers}
            deleteHandler={(key) => handleDeleteCaliber(key)}
            changeHandler={(e) => handleChangeCaliber(e)}
            placeholder={t("enter-item-caliber")}
          />
        </CardInfo>

        <CardInfo headerTitle={t("pharmacological_composition")}>
          <MultiValue
            header={t("pharmacological_composition")}
            addHandler={() =>
              setCompositions([...compositions, { key: uuidv4(), value: "" }])
            }
            values={compositions}
            deleteHandler={(key) => handleDeleteComposition(key)}
            changeHandler={(e) => handleChangeComposition(e)}
            placeholder={t("pharmacological_composition")}
          />
        </CardInfo>

        {Object.entries(itemError).length > 0 && (
          <ul>
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
          onClick={handleAddItem}
        >
          {t("add-item")}
        </motion.button>
      </div>
    </div>
  );
}

export default Item;
