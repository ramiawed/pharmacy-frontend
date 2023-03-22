import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/transparent_logo.png";

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
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import AddToCartModal from "../../modals/add-to-cart-modal/add-to-cart-modal.component";
import Loader from "../../components/action-loader/action-loader.component";
import OffersModal from "../../modals/offers-modal/offers-modal.component";
import Separator from "../../components/separator/separator.component";
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";
import Input from "../../components/input/input.component";
import Toast from "../../components/toast/toast.component";
import Icon from "../../components/icon/icon.component";
import Modal from "../../modals/modal/modal.component";

// constants and utils
import {
  Colors,
  UserTypeConstants,
  BASEURL,
  SERVER_URL,
  toEnglishNumber,
  checkItemExistsInWarehouse,
} from "../../utils/constants";

// icons
import { MdAddCircle, MdLocalOffer } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import { BsImageAlt } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

// styles
import rowStyles from "../../components/row.module.scss";
import styles from "./item-page.module.scss";

function ItemPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const { from, allowAction, type, itemId, companyId, warehouseId } =
    location.state;

  const inputFileRef = React.useRef(null);
  const handleClick = () => {
    inputFileRef.current.click();
  };

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
  const [imageSizeWarningMsg, setImageSizeWarningMsg] = useState("");

  const [item, setItem] = useState({
    name: "",
    caliber: "",
    formula: "",
    indication: "",
    barcode: "",
    barcodeTwo: "",
    composition: "",
    packing: "",
    warehouses: [],
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

  const fileSelectedHandler = (event) => {
    if (event.target.files[0]) {
      if (parseFloat(event.target.files[0].size / 1024).toFixed(2) < 512) {
        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .post(`${BASEURL}/items/upload/${item._id}`, formData, config)
          .then((res) => {
            getItemFromDB();
          });
      } else {
        setImageSizeWarningMsg("image-size-must-be-less-than");
      }
    }
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
      <Header
        title={item?.name.length !== 0 ? item.name : "اسم المنتج"}
        refreshHandler={() => {
          if (type === "info" && itemId) {
            getItemFromDB();
            window.scrollTo(0, 0);
          }
        }}
      />
      <MainContentContainer>
        <div className={styles.content}>
          <div
            className={["flex_center_container", "flex_column"].join(" ")}
            style={{
              padding: "6px 12px",
            }}
          >
            {changeLogoStatus === "succeeded" || changeLogoStatus === "idle" ? (
              <div className={styles.logo}>
                <img
                  src={
                    item.logo_url && item.logo_url !== ""
                      ? `${SERVER_URL}/items/${item.logo_url}`
                      : Logo
                  }
                  alt="thumb"
                />
              </div>
            ) : null}

            {allowAction && itemId && (
              <>
                <div style={{ display: "none" }}>
                  <form encType="multipart/form-data">
                    <div>
                      <input
                        type="file"
                        name="file"
                        onChange={fileSelectedHandler}
                        ref={inputFileRef}
                        stye={{ display: "none" }}
                      />
                    </div>
                  </form>
                </div>

                <div>
                  <ButtonWithIcon
                    text={t("change-logo")}
                    action={handleClick}
                    bgColor={Colors.MAIN_COLOR}
                    icon={() => <BsImageAlt />}
                  />
                </div>
              </>
            )}
            {allowAction &&
              (from === UserTypeConstants.COMPANY ||
                from === UserTypeConstants.ADMIN) && (
                <div style={{ margin: "4px 0" }}>
                  <ButtonWithIcon
                    text={type === "info" ? t("update-item") : t("add-item")}
                    action={() => setShowUpdateConfirmModal(true)}
                    bgColor={Colors.SUCCEEDED_COLOR}
                    icon={() => <AiFillEdit />}
                  />
                </div>
              )}

            {/* show add-to-cart button, if the user's type is PHARMACY and the item is exist in any warehouse */}
            {user.type === UserTypeConstants.PHARMACY &&
              item !== null &&
              checkItemExistsInWarehouse(item, user) && (
                <div style={{ margin: "4px 0" }}>
                  <ButtonWithIcon
                    text={t("add-to-cart")}
                    action={() => setShowAddToCartModal(true)}
                    bgColor={Colors.SUCCEEDED_COLOR}
                    icon={() => <GiShoppingCart />}
                  />
                </div>
              )}

            {user.type === UserTypeConstants.WAREHOUSE &&
              (item.warehouses
                ?.map((w) => w.warehouse._id)
                .includes(user._id) ? (
                <div style={{ margin: "4px 0" }}>
                  <ButtonWithIcon
                    text={t("remove-from-warehouse")}
                    action={removeItemFromWarehouseHandler}
                    bgColor={Colors.FAILED_COLOR}
                    icon={() => <RiDeleteBin5Fill />}
                  />
                </div>
              ) : (
                <div style={{ margin: "4px 0" }}>
                  <ButtonWithIcon
                    text={t("add-to-warehouse")}
                    action={addItemToWarehouseHandler}
                    bgColor={Colors.SUCCEEDED_COLOR}
                    icon={() => <MdAddCircle />}
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
                onchange={handleInputChange}
                error={itemError.name?.length > 0}
                readOnly={!allowAction}
              />
              {/* <div className={styles.horizontal_div}></div> */}
              <Separator />

              <Input
                label="item-trade-name-ar"
                id="nameAr"
                type="text"
                value={item.nameAr}
                bordered={false}
                onchange={handleInputChange}
                error={itemError.nameAr?.length > 0}
                readOnly={!allowAction}
              />

              <div className={styles.horizontal_div}></div>

              <Input
                label="item-formula"
                id="formula"
                type="text"
                value={item.formula}
                bordered={false}
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
                onchange={handleInputChange}
                error={itemError.packing?.length > 0}
                readOnly={!allowAction}
              />

              {user.type === UserTypeConstants.ADMIN && (
                <>
                  <div className={styles.horizontal_div}></div>
                  <Input
                    label="item-barcode"
                    id="barcode"
                    type="text"
                    value={item.barcode}
                    bordered={false}
                    // icon={getIcon("medicine")}
                    onchange={handleInputChange}
                    readOnly={!allowAction}
                  />
                  <div className={styles.horizontal_div}></div>
                  <Input
                    label="item-barcode"
                    id="barcodeTwo"
                    type="text"
                    value={item.barcodeTwo}
                    bordered={false}
                    // icon={getIcon("medicine")}
                    onchange={handleInputChange}
                    readOnly={!allowAction}
                  />
                </>
              )}
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
                  onchange={handleInputChange}
                  error={itemError.customer_price?.length > 0}
                  readOnly={!allowAction}
                />
              </div>
            </CardInfo>

            <CardInfo headerTitle={t("item-composition")}>
              {/* <div> */}
              <textarea
                className={styles.textarea}
                placeholder={t("enter-composition")}
                id="composition"
                value={item.composition}
                onChange={handleInputChange}
                disabled={!allowAction}
              />
              {/* </div> */}
            </CardInfo>

            <CardInfo headerTitle={t("item-indication")}>
              {/* <div> */}
              <textarea
                className={styles.textarea}
                placeholder={t("enter-indication")}
                id="indication"
                value={item.indication}
                onChange={handleInputChange}
                disabled={!allowAction}
              />
              {/* </div> */}
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
                      ].join(" ")}
                      style={{
                        padding: "0 6px",
                      }}
                      key={index}
                    >
                      <label style={{ padding: "6px 0" }}>
                        {w.warehouse.name}
                      </label>

                      <Icon
                        icon={() => <MdLocalOffer size={24} />}
                        onclick={() => {
                          setSelectedWarehouseId(w.warehouse._id);
                          setAllowEdit(
                            (user.type === UserTypeConstants.WAREHOUSE &&
                              user._id === w.warehouse._id) ||
                              (user.type === UserTypeConstants.ADMIN &&
                                w.warehouse.allowAdmin)
                          );
                          setShowOfferModal(true);
                        }}
                        tooltip={t("nav-offers")}
                      />
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
                    .filter((w) => {
                      return (
                        w.warehouse.city === user.city &&
                        w.warehouse.isActive === true
                      );
                    })
                    .map((w, index) => (
                      <div
                        className={[
                          rowStyles.container,
                          rowStyles.without_box_shadow,
                        ].join(" ")}
                        style={{
                          padding: "0 6px",
                        }}
                        key={index}
                      >
                        <label style={{ padding: "6px 0" }}>
                          {w.warehouse.name}
                        </label>

                        <Icon
                          icon={() => <MdLocalOffer size={24} />}
                          onclick={() => {
                            setSelectedWarehouseId(w.warehouse._id);
                            setAllowEdit(
                              (user.type === UserTypeConstants.WAREHOUSE &&
                                user._id === w.warehouse._id) ||
                                (user.type === UserTypeConstants.ADMIN &&
                                  w.warehouse.allowAdmin)
                            );
                            setShowOfferModal(true);
                          }}
                          tooltip={t("nav-offers")}
                        />
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
      </MainContentContainer>
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

      {imageSizeWarningMsg && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setImageSizeWarningMsg("");
          }}
        >
          <p>{t("image-size-must-be-less-than")}</p>
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
          cancelLabel="cancel"
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
