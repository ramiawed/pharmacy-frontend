import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import OfferImage from "../../offer-image.jpg";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  changeItemActiveState,
  changeItemOffer,
} from "../../redux/items/itemsSlices";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import Modal from "../modal/modal.component";
import OffersModal from "../offers-modal/offers-modal.component";
import Icon from "../action-icon/action-icon.component";

// react-icons
import { AiFillEdit } from "react-icons/ai";
import { MdLocalOffer, MdClose } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";

// styles
import generalStyles from "../../style.module.scss";
import tableStyles from "../table.module.scss";
import styles from "./admin-item-card.module.scss";

// constants
import {
  Colors,
  onKeyPressForNumberInput,
  toEnglishNumber,
  UserTypeConstants,
} from "../../utils/constants";
import { VscLoading } from "react-icons/vsc";

const checkOffer = (item, user) => {
  if (user.type === UserTypeConstants.COMPANY) {
    return false;
  }

  let result = false;

  if (user.type === UserTypeConstants.WAREHOUSE) {
    item.warehouses
      .filter((w) => w.warehouse._id === user._id)
      .forEach((w) => {
        if (w.offer.offers.length > 0) {
          result = true;
        }
      });
  }

  if (user.type === UserTypeConstants.ADMIN) {
    item.warehouses.forEach((w) => {
      if (w.offer.offers.length > 0) {
        result = true;
      }
    });
  }

  return result;
};

function AdminItemCard({
  item,
  user,
  warehouse,
  role,
  changeItemMaxQty,
  deleteItemFromWarehouse,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token } = useSelector(selectUserData);

  // own state
  const [modalObj, setModalObj] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showChangeMaxQtyModal, setShowChangeMaxQtyModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showDeleteFromWarehouseModal, setShowDeleteFromWarehouseModal] =
    useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [maxQty, setMaxQty] = useState(
    warehouse
      ? item.warehouses.find((w) => w.warehouse._id === warehouse._id)?.maxQty
      : 0
  );
  const [prevMaxQty, setPrevMaxQty] = useState(0);

  const actionButtonPress = (action) => {
    if (action === "delete") {
      setModalObj({
        header: "item-delete-header",
        body: "item-delete-confirm-message",
        action: "delete",
      });
    } else {
      setModalObj({
        header: "item-undo-delete-header",
        body: "item-undo-delete-confirm-message",
        action: "undo-delete",
      });
    }

    setShowModal(true);
  };

  const handlePressOkOnModal = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    dispatch(
      changeItemActiveState({
        obj: {
          itemId: item._id,
          action: modalObj.action,
        },
        token,
      })
    );
    setShowModal(false);
    setModalObj({});
  };

  const handleDeleteItemFromWarehouse = (e) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }
    deleteItemFromWarehouse({
      itemId: item._id,
      warehouseId: warehouse._id,
      city: warehouse.city,
    });

    setShowDeleteFromWarehouseModal(false);
  };

  const deleteItemHandler = (e) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    if (
      (user.type === UserTypeConstants.ADMIN && item.company.allowAdmin) ||
      user.type === UserTypeConstants.COMPANY
    ) {
      actionButtonPress("delete");
    } else {
      setShowWarningModal(true);
    }
  };

  const undoDeleteItemHandler = (e) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    if (
      (user.type === UserTypeConstants.ADMIN && item.company.allowAdmin) ||
      user.type === UserTypeConstants.COMPANY
    ) {
      actionButtonPress("undo-delete");
    } else {
      setShowWarningModal(true);
    }
  };

  const deleteFromWarehouseHandler = (e) => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    if (
      (user.type === UserTypeConstants.ADMIN &&
        role === UserTypeConstants.WAREHOUSE &&
        warehouse.allowAdmin) ||
      user.type === UserTypeConstants.WAREHOUSE
    ) {
      setShowDeleteFromWarehouseModal(true);
    } else {
      setShowWarningModal(true);
    }
  };

  // const onKeyPress = (event) => {
  //   return event.charCode >= 48 && event.charCode <= 57;
  // };

  const maxQtyChangeHandler = (event) => {
    const value = Number.parseInt(toEnglishNumber(event.target.value));
    setMaxQty(isNaN(value) ? "" : value);
  };

  return (
    <>
      <div className={styles.container}>
        {checkOffer(item, user) && (
          <div className={[styles.ribbon_2].join(" ")}>
            <span>{t("offer")}</span>
          </div>
        )}
        <div
          className={styles.name}
          onClick={() => {
            history.push("/item", {
              from: user.type,
              type: "info",
              allowAction:
                user.type === UserTypeConstants.COMPANY ||
                (user.type === UserTypeConstants.ADMIN &&
                  item.company.allowAdmin),
              itemId: item._id,
              companyId: item.company._id,
              warehouseId: warehouse?._id,
            });
          }}
        >
          {item.name}
        </div>

        <div className={styles.details}>
          <div className={[styles.row].join(" ")}>
            {((user.type === UserTypeConstants.ADMIN &&
              role === UserTypeConstants.ADMIN) ||
              (user.type === UserTypeConstants.ADMIN &&
                role === UserTypeConstants.WAREHOUSE) ||
              user.type === UserTypeConstants.WAREHOUSE) && (
              <div>
                <label className={styles.label}>{t("item-company")}:</label>
                <label className={styles.value}>{item.company.name}</label>
              </div>
            )}
          </div>
          <div className={[styles.row].join(" ")}>
            <div>
              <label className={styles.label}>{t("item-available")}:</label>
              <label
                className={styles.value}
                style={{
                  display: "inline-block",
                }}
              >
                {item.isActive ? (
                  <Icon
                    icon={() => <BsCheck />}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    onclick={deleteItemHandler}
                    tooltip={t("item-available")}
                  />
                ) : (
                  <Icon
                    icon={() => <MdClose color={Colors.FAILED_COLOR} />}
                    foreColor={Colors.FAILED_COLOR}
                    onclick={undoDeleteItemHandler}
                    tooltip={t("item-not-available")}
                  />
                )}
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label className={styles.label}>{t("item-formula")}:</label>
              <label className={styles.value}>{item.formula}</label>
            </div>
            <div>
              <label className={styles.label}>{t("item-caliber")}:</label>
              <label className={styles.value}>{item.caliber}</label>
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label className={styles.label}>{t("item-packing")}:</label>
              <label className={styles.value}>{item.packing}</label>
            </div>
          </div>
          <div className={styles.row}>
            {user.type !== UserTypeConstants.GUEST && (
              <div>
                <label className={styles.label}>{t("item-price")}:</label>
                <label className={styles.value}>{item.price}</label>
              </div>
            )}
            <div>
              <label className={styles.label}>
                {t("item-customer-price")}:
              </label>
              <label className={styles.value}>{item.customer_price}</label>
            </div>
          </div>
          {((user.type === UserTypeConstants.ADMIN &&
            role === UserTypeConstants.WAREHOUSE) ||
            user.type === UserTypeConstants.WAREHOUSE) && (
            <div className={styles.row}>
              <div>
                <label className={styles.label}>{t("item-max-qty")}:</label>
                <label className={styles.value}>{maxQty}</label>
              </div>
            </div>
          )}
          <div className={[styles.row, styles.last_row].join(" ")}>
            <div>
              <label className={styles.label}>{t("item-composition")}:</label>
              <label className={styles.value}>{item.composition}</label>
            </div>
          </div>
        </div>

        {((user.type === UserTypeConstants.ADMIN &&
          role === UserTypeConstants.WAREHOUSE) ||
          user.type === UserTypeConstants.WAREHOUSE) && (
          <div className={styles.actions}>
            <Icon
              icon={() => <AiFillEdit />}
              onclick={() => {
                setShowChangeMaxQtyModal(true);
                setPrevMaxQty(maxQty);
              }}
              tooltip={t("change-max-qty-header")}
            />

            <Icon
              icon={() => <MdLocalOffer />}
              tooltip={t("nav-offers")}
              onclick={() => {
                setShowOfferModal(true);
              }}
            />

            {deleteLoading ? (
              <Icon
                icon={() => <VscLoading className={generalStyles.loading} />}
                onclick={() => {}}
                foreColor={Colors.FAILED_COLOR}
              />
            ) : (
              <Icon
                icon={() => <RiDeleteBin5Fill />}
                onclick={deleteFromWarehouseHandler}
                foreColor={Colors.FAILED_COLOR}
              />
            )}
          </div>
        )}
      </div>

      {showModal && (
        <Modal
          header={t(modalObj.header)}
          cancelLabel={t("cancel-label")}
          okLabel={t("ok-label")}
          okModal={() => handlePressOkOnModal()}
          closeModal={() => setShowModal(false)}
          small={true}
        >
          {<p>{t(modalObj.body)}</p>}
        </Modal>
      )}

      {showWarningModal && (
        <Modal
          header={t("warning")}
          cancelLabel={t("cancel-label")}
          closeModal={() => setShowWarningModal(false)}
          small={true}
          warning={true}
        >
          {<p>{t("dont-have-permission")}</p>}
        </Modal>
      )}

      {showOfferModal && (
        <OffersModal
          token={token}
          item={item}
          warehouseId={warehouse._id}
          close={() => setShowOfferModal(false)}
          allowEdit={
            user.type === UserTypeConstants.WAREHOUSE ||
            (user.type === UserTypeConstants.ADMIN &&
              role === UserTypeConstants.WAREHOUSE &&
              warehouse.allowAdmin)
          }
          afterUpdateOffer={() =>
            dispatch(changeItemOffer({ _id: item._id, token }))
          }
        />
      )}

      {showDeleteFromWarehouseModal && (
        <Modal
          header={t("item-delete-header")}
          cancelLabel={t("cancel-label")}
          okLabel={t("ok-label")}
          okModal={() => {
            handleDeleteItemFromWarehouse();
            setDeleteLoading(true);
          }}
          closeModal={() => {
            setShowDeleteFromWarehouseModal(false);
            setDeleteLoading(false);
          }}
          small={true}
        >
          {<p>{t("item-delete-from-warehouse")}</p>}
        </Modal>
      )}

      {showChangeMaxQtyModal && (
        <Modal
          header={t("change-max-qty-header")}
          cancelLabel={t("cancel-label")}
          closeModal={() => {
            setShowChangeMaxQtyModal(false);
            setMaxQty(prevMaxQty);
            setPrevMaxQty(0);
          }}
          okLabel={t("ok-label")}
          okModal={() => {
            changeItemMaxQty({
              itemId: item._id,
              warehouseId: warehouse._id,
              qty: Number.parseInt(maxQty),
            });
            setShowChangeMaxQtyModal(false);
          }}
          small={true}
        >
          <input
            className={styles.input}
            onKeyPress={onKeyPressForNumberInput}
            value={maxQty}
            onChange={maxQtyChangeHandler}
            disabled={
              (user.type === UserTypeConstants.ADMIN &&
                role === UserTypeConstants.WAREHOUSE &&
                !warehouse?.allowAdmin) ||
              !isOnline
            }
          />
        </Modal>
      )}
    </>
  );
}

export default AdminItemCard;
