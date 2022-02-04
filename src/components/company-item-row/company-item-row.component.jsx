import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
import { AiFillUnlock, AiFillLock } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

// styles
import generalStyles from "../../style.module.scss";
import tableStyles from "../table.module.scss";
import rowStyles from "../row.module.scss";

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

function CompanyItemRow({
  item,
  user,
  company,
  warehouse,
  role,
  changeItemMaxQty,
  deleteItemFromWarehouse,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token } = useSelector(selectUserData);

  // own state
  const [modalObj, setModalObj] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showDeleteFromWarehouseModal, setShowDeleteFromWarehouseModal] =
    useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [maxQty, setMaxQty] = useState(
    warehouse
      ? item.warehouses.find((w) => w.warehouse._id === warehouse._id).maxQty
      : 0
  );

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

    // e.stopPropagation();
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

    // e.stopPropagation();
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

    // e.stopPropagation();
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

    // e.stopPropagation();
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
      <div
        className={rowStyles.container}
        style={{
          backgroundColor: checkOffer(item, user) ? "#0f04" : "#fff",
        }}
        // onClick={() => {
        //   history.push("item", {
        //     from: user.type,
        //     type: "info",
        //     allowAction:
        //       user.type === UserTypeConstants.COMPANY ||
        //       (user.type === UserTypeConstants.ADMIN &&
        //         item.company.allowAdmin),
        //     itemId: item._id,
        //     companyId: item.company._id,
        //     warehouseId: warehouse?._id,
        //   });
        // }}
      >
        <label
          className={[rowStyles.hover_underline, tableStyles.label_medium].join(
            " "
          )}
        >
          <Link
            className={rowStyles.hover_underline}
            to={{
              pathname: "/item",
              state: {
                from: user.type,
                type: "info",
                allowAction:
                  user.type === UserTypeConstants.COMPANY ||
                  (user.type === UserTypeConstants.ADMIN &&
                    item.company.allowAdmin),
                itemId: item._id,
                companyId: item.company._id,
                warehouseId: warehouse?._id,
              },
            }}
          >
            {item.name}
          </Link>
        </label>

        {((user.type === UserTypeConstants.ADMIN &&
          role === UserTypeConstants.ADMIN) ||
          (user.type === UserTypeConstants.ADMIN &&
            role === UserTypeConstants.WAREHOUSE) ||
          user.type === UserTypeConstants.WAREHOUSE) && (
          <label className={tableStyles.label_medium}>
            {item.company.name}
          </label>
        )}

        <label
          className={[
            tableStyles.label_small,
            generalStyles.flex_center_container,
          ].join(" ")}
        >
          {item.isActive ? (
            <Icon
              icon={() => <AiFillUnlock />}
              foreColor={Colors.SUCCEEDED_COLOR}
              onclick={deleteItemHandler}
            />
          ) : (
            <Icon
              icon={() => <AiFillLock />}
              foreColor={Colors.FAILED_COLOR}
              onclick={undoDeleteItemHandler}
            />
          )}
        </label>

        <label className={tableStyles.label_small}>{item.formula}</label>
        <label className={tableStyles.label_small}>{item.caliber}</label>
        <label className={tableStyles.label_small}>{item.packing}</label>
        <label className={tableStyles.label_small}>{item.price}</label>

        <label className={tableStyles.label_small}>{item.customer_price}</label>
        {((user.type === UserTypeConstants.ADMIN &&
          role === UserTypeConstants.WAREHOUSE) ||
          user.type === UserTypeConstants.WAREHOUSE) && (
          <>
            <label className={tableStyles.label_small}>
              <input
                // type="number"
                className={rowStyles.input}
                // min={0}
                onKeyPress={onKeyPressForNumberInput}
                value={maxQty}
                onChange={maxQtyChangeHandler}
                onBlur={(e) =>
                  changeItemMaxQty({
                    itemId: item._id,
                    warehouseId: warehouse._id,
                    qty: Number.parseInt(maxQty),
                  })
                }
                disabled={
                  (user.type === UserTypeConstants.ADMIN &&
                    role === UserTypeConstants.WAREHOUSE &&
                    !warehouse?.allowAdmin) ||
                  !isOnline
                }
              />
            </label>

            <label
              className={[
                tableStyles.label_xsmall,
                generalStyles.flex_center_container,
              ].join(" ")}
            >
              {deleteLoading ? (
                <Icon
                  icon={() => (
                    <VscLoading className={generalStyles.loading} size={24} />
                  )}
                  onclick={() => {}}
                  foreColor={Colors.FAILED_COLOR}
                />
              ) : (
                <Icon
                  icon={() => <RiDeleteBin5Fill size={20} />}
                  onclick={deleteFromWarehouseHandler}
                  foreColor={Colors.FAILED_COLOR}
                />
              )}
            </label>

            <label className={tableStyles.label_xsmall}>
              <Icon
                icon={() => <MdLocalOffer size={20} />}
                tooltip={t("nav-offers")}
                foreColor={
                  checkOffer(item, user)
                    ? Colors.SUCCEEDED_COLOR
                    : Colors.SECONDARY_COLOR
                }
                onclick={() => {
                  setShowOfferModal(true);
                }}
              />
            </label>
          </>
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
    </>
  );
}

export default CompanyItemRow;
