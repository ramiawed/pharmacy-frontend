import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router-dom";
import axios from "../../api/pharmacy";
import ReactLoading from "react-loading";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  addItem,
  resetAddStatus,
  resetChangeLogoStatus,
  resetUpdateStatus,
  selectItems,
  updateItem,
} from "../../redux/items/itemsSlices";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/companyItems/companyItemsSlices";

// components
import CardInfo from "../../components/card-info/card-info.component";
import Input from "../../components/input/input.component";
import Toast from "../../components/toast/toast.component";
import AddToCartModal from "../../components/add-to-cart-modal/add-to-cart-modal.component";

// constants and utile
import { getIcon } from "../../utils/icons";
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants";
import { MdLocalOffer } from "react-icons/md";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./item-page.module.scss";
import rowStyles from "../../components/row.module.scss";
import OffersModal from "../../components/offers-modal/offers-modal.component";
import InputFileImage from "../../components/input-file-image/input-file-image.component";

function ItemPage() {
  const { t } = useTranslation();

  const location = useLocation();

  const { from, allowAction, type, itemId, companyId, warehouseId } =
    location.state;

  const dispatch = useDispatch();
  const { user, token } = useSelector(selectUserData);
  const { addStatus, updateStatus, changeLogoStatus, changeLogoError } =
    useSelector(selectItems);

  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");
  const [allowEdit, setAllowEdit] = useState(false);

  const [itemError, setItemError] = useState({});
  const [connectionError, setConnectionError] = useState("");

  const [item, setItem] = useState({
    name: "",
    caliber: "",
    formula: "",
    indication: "",
    composition: "",
    packing: "",
    price: 0,
    customer_price: 0,
  });

  // reset handler
  const resetItem = () => {
    setItem({
      name: "",
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
      if (!checkConnection()) {
        setConnectionError("no-internet-connection");
      }

      // check if there is an error
      let obj = {
        ...item,
      };

      if (type === "new") {
        // add a new item
        obj = {
          ...obj,
          company: companyId,
        };

        dispatch(addItem({ obj, token }))
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            resetItem();
          })
          .catch((rejectedValueOrSerializedError) => {});
      } else if (type === "info") {
        // update an existing item
        obj = {
          ...obj,
          _id: itemId,
        };
        // dispatch update item
        dispatch(updateItem({ obj, token }))
          .then((originalPromiseResult) => {})
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
          itemId: itemId,
          warehouseId: warehouseId,
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
          itemId: itemId,
          warehouseId: warehouseId,
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
    if (type === "info" && itemId) {
      getItemFromDB();
    }
  }, [itemId, type, changeLogoStatus]);

  return user ? (
    <>
      <div className={styles.content}>
        <div
          className={[
            generalStyles.flex_center_container,
            generalStyles.flex_column,
            generalStyles.padding_v_6,
            generalStyles.padding_h_12,
          ].join(" ")}
        >
          {changeLogoStatus === "loading" && (
            <ReactLoading color="#fff" type="bars" height={100} width={100} />
          )}

          {changeLogoStatus === "succeeded" || changeLogoStatus === "idle" ? (
            <div
              className={styles.logo}
              style={{
                backgroundImage:
                  item.logo_url && item.logo_url !== ""
                    ? `url("http://localhost:8000/${item.logo_url}`
                    : `url("http://localhost:8000/avatar01.png`,
              }}
            ></div>
          ) : null}

          <div>
            <InputFileImage type="item" item={item} />
          </div>
        </div>

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
            readOnly={!allowAction}
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
            readOnly={!allowAction}
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
            readOnly={!allowAction}
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
            readOnly={!allowAction}
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
              readOnly={!allowAction}
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
              readOnly={!allowAction}
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
              disabled={!allowAction}
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
              disabled={!allowAction}
            />
          </div>
        </CardInfo>

        {item.warehouses?.length > 0 && (
          <CardInfo headerTitle={t("warehouses")}>
            {item.warehouses.map((w, index) => (
              <div
                className={[
                  rowStyles.container,
                  rowStyles.without_box_shadow,
                  generalStyles.padding_h_6,
                ].join(" ")}
              >
                <label className={generalStyles.padding_v_6}>
                  {w.warehouse.name}
                </label>

                <div
                  className={generalStyles.icon}
                  onClick={() => {
                    setSelectedWarehouseId(w.warehouse._id);
                    setAllowEdit(
                      (user.type === UserTypeConstants.WAREHOUSE &&
                        user._id === w.warehouse._id) ||
                        (user.type === UserTypeConstants.ADMIN &&
                          w.warehouse.allowAdmin)
                    );
                    setShowOfferModal(true);
                  }}
                >
                  <MdLocalOffer />
                  <div className={generalStyles.tooltip}>{t("nav-offers")}</div>
                </div>
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

      {allowAction &&
        (from === UserTypeConstants.COMPANY ||
          from === UserTypeConstants.ADMIN) && (
          <>
            <button
              className={[
                generalStyles.button,
                generalStyles.bg_green,
                generalStyles.fc_white,
                generalStyles.padding_v_6,
                generalStyles.padding_h_10,
                generalStyles.margin_h_auto,
                generalStyles.block,
              ].join(" ")}
              onClick={handleAddUpdateItem}
            >
              {type === "info" ? t("update-item") : t("add-item")}
            </button>
          </>
        )}

      {/* show add-to-cart button, if the user's type is PHARMACY and the item is exist in any warehouse */}
      {user.type === UserTypeConstants.PHARMACY && item.warehouses?.length > 0 && (
        <>
          <button
            className={[
              generalStyles.button,
              generalStyles.bg_green,
              generalStyles.fc_white,
              generalStyles.padding_v_6,
              generalStyles.padding_h_10,
              generalStyles.margin_h_auto,
              generalStyles.block,
            ].join(" ")}
            onClick={() => setShowModal(true)}
          >
            {t("add-to-cart")}
          </button>
        </>
      )}

      {user.type === UserTypeConstants.WAREHOUSE &&
        (item.warehouses?.map((w) => w.warehouse._id).includes(user._id) ? (
          <button
            onClick={removeItemFromWarehouseHandler}
            className={[
              generalStyles.button,
              generalStyles.bg_red,
              generalStyles.fc_white,
              generalStyles.margin_h_auto,
              generalStyles.block,
              generalStyles.padding_v_6,
              generalStyles.padding_h_10,
            ].join(" ")}
          >
            {t("remove-from-warehouse")}
          </button>
        ) : (
          <button
            onClick={addItemToWarehouseHandler}
            className={[
              generalStyles.button,
              generalStyles.bg_green,
              generalStyles.fc_white,
              generalStyles.margin_h_auto,
              generalStyles.block,
              generalStyles.padding_v_6,
              generalStyles.padding_h_10,
            ].join(" ")}
          >
            {t("add-to-warehouse")}
          </button>
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

      {showOfferModal && (
        <OffersModal
          token={token}
          item={item}
          warehouseId={selectedWarehouseId}
          allowEdit={allowEdit}
          close={() => {
            setShowOfferModal(false);
            setSelectedWarehouseId("");
            setAllowEdit(false);
          }}
          afterUpdateOffer={getItemFromDB}
        />
      )}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemPage;
