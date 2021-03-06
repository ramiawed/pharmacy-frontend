import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasket,
  removeBasket,
  removeBasketFromState,
  updateBasket,
} from "../../redux/baskets/basketsSlice";
import { saveOrder } from "../../redux/basketOrdersSlice/basketOrdersSlice";

// components
import Modal from "../modal/modal.component";
import Button from "../button/button.component";
import Icon from "../action-icon/action-icon.component";
import ChooseItemModal from "../choose-item-modal/choose-item-modal.component";
import BasketItemRow from "../basket-item-row/basket-item-row.component";
import SelectPartnerModal from "../select-partner-modal/select-partner-modal.component";
import ResultModal from "../result-modal/result-modal.component";

// icons
import { MdAddCircle, MdExpandLess, MdExpandMore } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

// styles
import styles from "./basket.module.scss";

// constants
import { BASEURL, Colors, UserTypeConstants } from "../../utils/constants";

function Basket({ setIsNew, basket, editable, forRead }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);

  // own states
  const [basketItems, setBaskItems] = useState(basket ? basket.items : []);
  const [gift, setGift] = useState(basket ? basket.gift : "");
  const [note, setNote] = useState(basket ? basket.note : "");
  const [totalDiscount, setTotalDiscount] = useState(
    basket ? basket.discount : 0
  );
  const [allowEdit, setAllowEdit] = useState(setIsNew ? true : false);
  const [expanded, setExpanded] = useState(editable ? true : false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [checkBasket, setCheckBasket] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(
    basket ? basket.warehouse : null
  );
  const [showSelectWarehouseModal, setShowSelectWarehouseModal] =
    useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultModalParams, setResultModalParams] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalParams, setModalParams] = useState(null);
  const [errorAfterCheckBasket, setErrorAfterCheckBasket] = useState(false);

  const calculateBasketTotalPrice = () => {
    let total = 0;
    basketItems.forEach((i) => {
      if (i.item !== null) {
        if (!i.isFree) {
          total += i.qty * i.item.price;
        }
      }
    });
    return total;
  };

  const selectWarehouseHandler = (data) => {
    setSelectedWarehouse(data);
  };

  const resetState = () => {
    if (setIsNew) {
      setIsNew(false);
    } else {
      setAllowEdit(false);
      setBaskItems(basket.items);
      setGift(basket.gift);
      setNote(basket.note);
      setTotalDiscount(basket.discount);
      setSelectedWarehouse(basket.warehouse);
    }
  };

  const orderBasketHandler = () => {
    const data = {
      obj: {
        warehouseId: basket.warehouse._id,
        basketId: basket._id,
      },
      token,
    };

    dispatch(saveOrder(data))
      .then(unwrapResult)
      .then(() => {
        setResultModalParams({
          msg: "basket-ordered-successfully-msg",
          type: "success",
          closeModal: () => {
            setResultModalParams(null);
            setShowResultModal(false);
          },
        });
        setShowModal(false);
        setShowResultModal(true);
      })
      .catch((err) => {
        setResultModalParams({
          msg: "basket-ordered-failed-msg",
          type: "failed",
          closeModal: () => {
            setResultModalParams(null);
            setShowResultModal(false);
          },
        });
        setShowModal(false);
        setShowResultModal(true);
      });
  };

  const addItem = () => {
    setBaskItems([
      ...basketItems,
      {
        item: null,
        qty: 0,
        bonus: 0,
        isFree: false,
      },
    ]);
    setErrorAfterCheckBasket(false);
    setCheckBasket(false);
  };

  const deleteItem = (index) => {
    setBaskItems(basketItems.filter((item, ind) => ind !== index));
  };

  const changeQty = (e, index) => {
    setBaskItems(
      basketItems.map((i, ind) => {
        if (ind === index) {
          return {
            ...i,
            qty: e.target.value,
          };
        } else {
          return i;
        }
      })
    );
    setErrorAfterCheckBasket(false);
    setCheckBasket(false);
  };

  const changeBonus = (e, index) => {
    setBaskItems(
      basketItems.map((i, ind) => {
        if (ind === index) {
          return {
            ...i,
            bonus: e.target.value,
          };
        } else {
          return i;
        }
      })
    );
    setErrorAfterCheckBasket(false);
    setCheckBasket(false);
  };

  const changeIsFree = (e, index) => {
    setBaskItems(
      basketItems.map((i, ind) => {
        if (ind === index) {
          return {
            ...i,
            isFree: !i.isFree,
          };
        } else {
          return i;
        }
      })
    );
    setErrorAfterCheckBasket(false);
    setCheckBasket(false);
  };

  const checkBasketHandler = () => {
    const filteredBasketItems = basketItems.filter(
      (i) => i.item !== null && i.qty > 0
    );

    setBaskItems(filteredBasketItems);
    if (
      filteredBasketItems.length === 0 ||
      (user.type === UserTypeConstants.ADMIN && selectedWarehouse === null)
    ) {
      setErrorAfterCheckBasket(true);
      setCheckBasket(false);
    } else {
      setErrorAfterCheckBasket(false);
      setCheckBasket(true);
    }
    setShowModal(false);
  };

  const addBasketHandler = () => {
    const body = {
      warehouse:
        user.type === UserTypeConstants.WAREHOUSE
          ? user._id
          : selectedWarehouse._id,
      items: basketItems.map((i) => {
        return {
          ...i,
          item: i.item._id,
          bonus: i.bonus * 1,
          qty: i.qty * 1,
        };
      }),
      discount: totalDiscount,
      gift,
      note,
    };

    if (setIsNew) {
      dispatch(addBasket({ data: body, token }))
        .then(unwrapResult)
        .then(() => {
          setResultModalParams({
            msg: "basket-added-successfully-msg",
            type: "success",
            closeModal: () => {
              setResultModalParams(null);
              setShowResultModal(false);
              setIsNew(false);
            },
          });
          setShowModal(false);
          setShowResultModal(true);
        })
        .catch(() => {
          setResultModalParams({
            msg: "basket-added-failed-msg",
            type: "failed",
            closeModal: () => {
              setResultModalParams(null);
              setShowResultModal(false);
            },
          });
          // setIsNew(false);
          setShowResultModal(true);
          setShowModal(false);
        });
    } else {
      dispatch(
        updateBasket({
          data: {
            basketId: basket._id,
            data: body,
          },
          token,
        })
      )
        .then(unwrapResult)
        .then(() => {
          setResultModalParams({
            msg: "basket-updated-successfully-msg",
            type: "success",
            closeModal: () => {
              setResultModalParams(null);
              setShowResultModal(false);
            },
          });
          setAllowEdit(false);
          setShowModal(false);
          setShowResultModal(true);
        });
    }
  };

  const removeBasketHandler = () => {
    dispatch(removeBasket({ basketId: basket._id, token }))
      .then(unwrapResult)
      .then(() => {
        setResultModalParams({
          msg: "basket-removed-successfully-msg",
          type: "success",
          closeModal: () => {
            setResultModalParams(null);
            setShowResultModal(false);
            dispatch(removeBasketFromState({ basketId: basket._id }));
          },
        });
        setShowModal(false);
        setShowResultModal(true);
      })
      .catch(() => {
        setResultModalParams({
          msg: "basket-removed-failed-msg",
          type: "failed",
          closeModal: () => {
            setResultModalParams(null);
            setShowResultModal(false);
          },
        });
        setShowResultModal(true);
        setShowModal(false);
      });
  };

  const checkBasketAction = () => {
    setModalParams({
      closeModal: () => {
        setShowModal(false);
      },
      header: "check-basket-header",
      cancelLabel: "close-label",
      okLabel: "ok-label",
      okModal: checkBasketHandler,
      small: true,
      msg: "check-basket-msg",
    });
    setShowModal(true);
  };

  const orderBasketAction = () => {
    setModalParams({
      closeModal: () => {
        setShowModal(false);
      },
      header: "order-basket-header",
      cancelLabel: "close-label",
      okLabel: "ok-label",
      okModal: orderBasketHandler,
      small: true,
      msg: "order-basket-confirm-msg",
    });
    setShowModal(true);
  };

  const addOrUpdateBasketAction = () => {
    setModalParams({
      closeModal: () => {
        setShowModal(false);
      },
      header: "add-basket-header",
      cancelLabel: "close-label",
      okLabel: "ok-label",
      okModal: addBasketHandler,
      small: true,
      msg: setIsNew ? "add-basket-msg" : "update-basket-msg",
    });
    setShowModal(true);
  };

  const removeBasketAction = () => {
    setModalParams({
      closeModal: () => {
        setShowModal(false);
      },
      header: "remove-basket-header",
      cancelLabel: "close-label",
      okLabel: "ok-label",
      okModal: removeBasketHandler,
      small: true,
      msg: "remove-basket-confirm-msg",
    });
    setShowModal(true);
  };

  return (
    <>
      <div
        className={styles.basket_div}
        style={{
          backgroundColor: errorAfterCheckBasket ? "rgb(255, 132, 123)" : "",
        }}
      >
        {!editable && (
          <div
            className={styles.expanded_div}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <MdExpandLess size={16} /> : <MdExpandMore size={16} />}
          </div>
        )}

        <div className={styles.content}>
          {user.type !== UserTypeConstants.WAREHOUSE && !forRead && (
            <div
              className={styles.row}
              style={{
                backgroundColor: Colors.WHITE_COLOR,
                padding: "5px",
                borderRadius: "6px",
                alignItems: "center",
              }}
            >
              <label>{t("warehouse")}:</label>
              {selectedWarehouse === null ? (
                allowEdit && (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    onclick={() => {
                      setShowSelectWarehouseModal(true);
                      setErrorAfterCheckBasket(false);
                    }}
                    icon={() => <MdAddCircle size={24} />}
                  />
                )
              ) : (
                <>
                  <p>{selectedWarehouse.name}</p>
                  {allowEdit && (
                    <Icon
                      selected={false}
                      foreColor={Colors.FAILED_COLOR}
                      onclick={() => {
                        setSelectedWarehouse(null);
                        setCheckBasket(false);
                      }}
                      icon={() => <RiDeleteBin5Fill size={24} />}
                    />
                  )}
                </>
              )}
            </div>
          )}

          {editable && allowEdit && (
            <div className={styles.row} style={{ justifyContent: "center" }}>
              <Icon
                selected={false}
                foreColor={Colors.SUCCEEDED_COLOR}
                tooltip={t("new-item")}
                onclick={addItem}
                icon={() => <MdAddCircle size={24} />}
                withBackground={true}
              />
            </div>
          )}

          {expanded ? (
            basketItems.map((i, index) => (
              <BasketItemRow
                changeBonus={changeBonus}
                changeIsFree={changeIsFree}
                changeQty={changeQty}
                deleteItem={deleteItem}
                index={index}
                item={i}
                setSelectedIndex={setSelectedIndex}
                setShowChooseModal={setShowChooseModal}
                key={index}
                editable={editable}
                allowEdit={allowEdit}
              />
            ))
          ) : (
            <div className={styles.row}>
              <label>{t("basket-total-items")}</label>
              <input value={basketItems.length} disabled={true} />
            </div>
          )}

          <div className={styles.content}>
            <div className={styles.row}>
              <label>{t("basket-total-price")}</label>
              <input value={calculateBasketTotalPrice()} disabled={true} />
            </div>
            <div className={styles.row}>
              <label>{t("basket-total-discount")}</label>
              <input
                value={totalDiscount}
                onChange={(e) => setTotalDiscount(e.target.value)}
                type="number"
                min={0}
                max={100}
                disabled={!editable || !allowEdit}
              />
            </div>

            <div className={styles.row}>
              <label>{t("basket-total-price-after-discount")}</label>
              <input
                value={
                  totalDiscount !== 0
                    ? calculateBasketTotalPrice() -
                      (calculateBasketTotalPrice() * totalDiscount) / 100
                    : calculateBasketTotalPrice()
                }
                disabled={true}
              />
            </div>

            <div className={styles.row}>
              <label>{t("basket-gift-label")}</label>
              <input
                value={gift}
                onChange={(e) => setGift(e.target.value)}
                disabled={!editable || !allowEdit}
              />
            </div>
            <div className={styles.row}>
              <label>{t("basket-note-label")}</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={!editable || !allowEdit}
              />
            </div>
          </div>
        </div>

        {editable ? (
          <div className={styles.actions}>
            {!checkBasket && allowEdit && (
              <div style={{ margin: "0 5px" }}>
                <Button
                  action={checkBasketAction}
                  text={t("check-basket-label")}
                  bgColor={Colors.MAIN_COLOR}
                />
              </div>
            )}

            {checkBasket && allowEdit && (
              <div style={{ margin: "0 5px" }}>
                <Button
                  action={addOrUpdateBasketAction}
                  text={setIsNew ? t("add-label") : t("update-label")}
                  bgColor={Colors.SUCCEEDED_COLOR}
                />
              </div>
            )}
            {allowEdit ? (
              <Button
                action={resetState}
                text={t("cancel-label")}
                bgColor={Colors.FAILED_COLOR}
              />
            ) : (
              <>
                <Button
                  action={() => {
                    setAllowEdit(true);
                  }}
                  text={t("edit-basket-label")}
                  bgColor={Colors.MAIN_COLOR}
                />
                <div style={{ width: "10px" }}></div>
                <Button
                  action={removeBasketAction}
                  text={t("remove-basket-label")}
                  bgColor={Colors.FAILED_COLOR}
                />
              </>
            )}
          </div>
        ) : forRead ? (
          <></>
        ) : (
          <div className={styles.actions}>
            <Button
              action={orderBasketAction}
              text={t("order-basket-label")}
              bgColor={Colors.SUCCEEDED_COLOR}
            />
          </div>
        )}
      </div>

      {showChooseModal && (
        <ChooseItemModal
          close={() => {
            setShowChooseModal(false);
            setSelectedIndex(0);
            setCheckBasket(false);
          }}
          setBaskItems={setBaskItems}
          basketItems={basketItems}
          index={selectedIndex}
          url={`${BASEURL}/items?limit=15&isActive=true&warehouseId=${
            user.type === UserTypeConstants.WAREHOUSE
              ? user._id
              : selectedWarehouse
              ? selectedWarehouse._id
              : ""
          }`}
        />
      )}

      {showSelectWarehouseModal && (
        <SelectPartnerModal
          header="choose-warehouse"
          close={() => setShowSelectWarehouseModal(false)}
          chooseAction={(data) => selectWarehouseHandler(data)}
          url={`${BASEURL}/users?limit=15&isActive=true&isApproved=true&type=warehouse`}
          placeholder="enter-warehouse-name"
        />
      )}

      {showModal && (
        <Modal
          closeModal={modalParams.closeModal}
          header={t(modalParams.header)}
          cancelLabel={t(modalParams.cancelLabel)}
          okLabel={t(modalParams.okLabel)}
          okModal={modalParams.okModal}
          small={modalParams.small}
        >
          <p>{t(modalParams.msg)}</p>
        </Modal>
      )}

      {showResultModal && (
        <ResultModal
          msg={resultModalParams.msg}
          closeModal={resultModalParams.closeModal}
          type={resultModalParams.type}
        />
      )}
    </>
  );
}

export default Basket;
