import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import axios from "axios";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  addItem,
  resetAddStatus,
  resetUpdateStatus,
  selectItems,
  updateItem,
} from "../../redux/items/itemsSlices";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
  selectMedicines,
} from "../../redux/medicines/medicinesSlices";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import CardInfo from "../../components/card-info/card-info.component";
import Input from "../../components/input/input.component";
import Toast from "../../components/toast/toast.component";
import AddToCartModal from "../../components/add-to-cart-modal/add-to-cart-modal.component";
import OffersModal from "../../components/offers-modal/offers-modal.component";
import InputFileImage from "../../components/input-file-image/input-file-image.component";
import Button from "../../components/button/button.component";
import Loader from "../../components/action-loader/action-loader.component";
import Icon from "../../components/action-icon/action-icon.component";
import Header from "../../components/header/header.component";
import Modal from "../../components/modal/modal.component";

// constants and utils
import { getIcon } from "../../utils/icons";
import {
  Colors,
  UserTypeConstants,
  BASEURL,
  SERVER_URL,
  toEnglishNumber,
} from "../../utils/constants";

// icons
import { MdLocalOffer } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./item-page.module.scss";
import rowStyles from "../../components/row.module.scss";

function ItemPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const { from, allowAction, type, itemId, companyId, warehouseId } =
    location.state;

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { user, token } = useSelector(selectUserData);
  const { addStatus, updateStatus, changeLogoStatus } =
    useSelector(selectItems);
  const { addToWarehouseStatus, removeFromWarehouseStatus } =
    useSelector(selectMedicines);

  // own state
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");
  const [allowEdit, setAllowEdit] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [loadingItem, setLoadingItem] = useState("idle");
  const [itemError, setItemError] = useState({});

  const [item, setItem] = useState({
    name: "",
    caliber: "",
    formula: "",
    indication: "",
    barcode: "",
    composition: "",
    packing: "",
    price: 0,
    customer_price: 0,
  });

  const handleInputChange = (e) => {
    setItem({
      ...item,
      [e.target.id]:
        e.target.id === "price" || e.target.id === "customer_price"
          ? toEnglishNumber(e.target.value)
          : e.target.value,
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
      if (!isOnline) {
        dispatch(changeOnlineMsg());
        return;
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
          .then((response) => {
            history.push({
              pathname: "/item",
              state: {
                from,
                type: "info",
                allowAction,
                itemId: response.data.item._id,
                companyId,
                warehouseId,
              },
            });
          })
          .catch(() => {});
      } else if (type === "info") {
        // update an existing item
        obj = {
          ...obj,
          _id: itemId,
        };
        // dispatch update item
        dispatch(updateItem({ obj, token }))
          .then(() => {
            setShowUpdateConfirmModal(false);
          })
          .catch(() => {
            setShowUpdateConfirmModal(false);
          });
      }
    } else {
      setItemError({
        ...errorObj,
      });
      setShowUpdateConfirmModal(false);
    }
  };

  // method to handle add item to warehouse
  const addItemToWarehouseHandler = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
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
      .then(() => getItemFromDB())
      .catch(() => {});
  };

  // method to handle remove item from warehouse
  const removeItemFromWarehouseHandler = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
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
      .then(() => getItemFromDB())
      .catch(() => {});
  };

  const getItemFromDB = useCallback(() => {
    setLoadingItem("loading");
    axios
      .get(`${BASEURL}/items/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItem(response.data.data.item);
        setLoadingItem("idle");
      })
      .catch((err) => {
        setLoadingItem("idle");
      });
  });

  useEffect(() => {
    if (type === "info" && itemId) {
      getItemFromDB();
      window.scrollTo(0, 0);
    }
  }, [itemId, type]);

  return user ? (
    <>
      <div className={generalStyles.container}>
        <Header>
          <h2>{item.name}</h2>
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "46px",
            }}
          >
            <Icon
              selected={false}
              foreColor={Colors.SECONDARY_COLOR}
              tooltip={t("refresh-tooltip")}
              icon={() => <RiRefreshLine />}
              onclick={() => {
                if (type === "info" && itemId) {
                  getItemFromDB();
                  window.scrollTo(0, 0);
                }
              }}
            />
          </div>
        </Header>

        <div className={styles.content}>
          <div
            className={[
              generalStyles.flex_center_container,
              generalStyles.flex_column,
              generalStyles.padding_v_6,
              generalStyles.padding_h_12,
            ].join(" ")}
          >
            {changeLogoStatus === "succeeded" || changeLogoStatus === "idle" ? (
              <div className={styles.logo}>
                <img
                  src={
                    item.logo_url && item.logo_url !== ""
                      ? `${SERVER_URL}/${item.logo_url}`
                      : `${SERVER_URL}/medicine.jpeg`
                  }
                  alt="thumb"
                />
              </div>
            ) : null}

            {allowAction && itemId && (
              <div>
                <InputFileImage
                  type="item"
                  item={item}
                  onchange={() => {
                    getItemFromDB();
                  }}
                />
              </div>
            )}
            {allowAction &&
              (from === UserTypeConstants.COMPANY ||
                from === UserTypeConstants.ADMIN) && (
                <div className={generalStyles.margin_v_4}>
                  <Button
                    text={type === "info" ? t("update-item") : t("add-item")}
                    bgColor={Colors.SUCCEEDED_COLOR}
                    action={() => setShowUpdateConfirmModal(true)}
                  />
                </div>
              )}

            {/* show add-to-cart button, if the user's type is PHARMACY and the item is exist in any warehouse */}
            {user.type === UserTypeConstants.PHARMACY &&
              item.warehouses?.length > 0 && (
                <div className={generalStyles.margin_v_4}>
                  <Button
                    text={t("add-to-cart")}
                    action={() => setShowAddToCartModal(true)}
                    bgColor={Colors.SUCCEEDED_COLOR}
                  />
                </div>
              )}

            {user.type === UserTypeConstants.WAREHOUSE &&
              (item.warehouses
                ?.map((w) => w.warehouse._id)
                .includes(user._id) ? (
                <div className={generalStyles.margin_v_4}>
                  <Button
                    text={t("remove-from-warehouse")}
                    action={removeItemFromWarehouseHandler}
                    bgColor={Colors.FAILED_COLOR}
                  />
                </div>
              ) : (
                <div className={generalStyles.margin_v_4}>
                  <Button
                    text={t("add-to-warehouse")}
                    action={addItemToWarehouseHandler}
                    bgColor={Colors.SUCCEEDED_COLOR}
                  />
                </div>
              ))}
          </div>
          <div className={styles.info}>
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

              <div className={styles.horizontal_div}></div>

              <Input
                label="item-barcode"
                id="barcode"
                type="text"
                value={item.barcode}
                bordered={false}
                icon={getIcon("medicine")}
                onchange={handleInputChange}
                readOnly={!allowAction}
              />
            </CardInfo>

            <CardInfo headerTitle={t("item-price")}>
              {user.type !== UserTypeConstants.GUEST && (
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
              )}

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
                  className={styles.textarea}
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
                  className={styles.textarea}
                  placeholder={t("enter-indication")}
                  id="indication"
                  value={item.indication}
                  onChange={handleInputChange}
                  disabled={!allowAction}
                />
              </div>
            </CardInfo>

            {/* IF THE USER TYPE IS ADMIN */}
            {/* show each warehouses */}
            {item.warehouses?.length > 0 &&
              user.type === UserTypeConstants.ADMIN && (
                <CardInfo headerTitle={t("warehouses")}>
                  {item.warehouses.map((w, index) => (
                    <div
                      className={[
                        rowStyles.container,
                        rowStyles.without_box_shadow,
                        generalStyles.padding_h_6,
                      ].join(" ")}
                      key={index}
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
                        <div className={generalStyles.tooltip}>
                          {t("nav-offers")}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardInfo>
              )}

            {/* IF USER TYPE IS PHARMACY */}
            {/* show warehouses which are in the same city with user */}
            {item.warehouses?.length > 0 &&
              user.type === UserTypeConstants.PHARMACY && (
                <CardInfo headerTitle={t("warehouses")}>
                  {item.warehouses
                    .filter((w) => w.warehouse.city === user.city)
                    .map((w, index) => (
                      <div
                        className={[
                          rowStyles.container,
                          rowStyles.without_box_shadow,
                          generalStyles.padding_h_6,
                        ].join(" ")}
                        key={index}
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
                          <div className={generalStyles.tooltip}>
                            {t("nav-offers")}
                          </div>
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
        </div>
      </div>
      {changeLogoStatus === "loading" && <Loader allowCancel={false} />}

      {addToWarehouseStatus === "loading" && <Loader allowCancel={false} />}
      {removeFromWarehouseStatus === "loading" && (
        <Loader allowCancel={false} />
      )}
      {(updateStatus === "loading" || loadingItem === "loading") && (
        <Loader allowCancel={false} />
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

      {showAddToCartModal && (
        <AddToCartModal
          item={item}
          close={() => setShowAddToCartModal(false)}
        />
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

      {showUpdateConfirmModal && (
        <Modal
          header={type === "info" ? "update-item" : "add-item"}
          cancelLabel="cancel-label"
          okLabel="ok-label"
          closeModal={() => {
            setShowUpdateConfirmModal(false);
          }}
          small={true}
          okModal={handleAddUpdateItem}
        >
          {type === "info" ? (
            <p>{t("update-item-confirm-msg")}</p>
          ) : (
            <p>{t("add-item-confirm-msg")}</p>
          )}
        </Modal>
      )}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemPage;
