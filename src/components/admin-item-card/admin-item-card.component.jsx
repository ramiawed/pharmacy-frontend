import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  changeItemActiveState,
  changeItemWarehouseMaxQty,
  removeItemFromWarehouse,
} from "../../redux/items/itemsSlices";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import ItemAdditionalInfo from "../item-additional-info/item-additional-info.component";
import ChangeQuantityModal from "../../modals/change-quantity-modal/change-quantity-modal.component";
import ButtonWithIcon from "../button-with-icon/button-with-icon.component";
import FullWidthLabel from "../full-width-label/full-width-label.component";
import OffersModal from "../../modals/offers-modal/offers-modal.component";
import CustomCheckbox from "../custom-checkbox/custom-checkbox.component";
import LabelValueRow from "../label-value-row/label-value-row.component";
import RowContainer from "../row-container/row-container.component";
import ItemPrices from "../item-prices/item-prices.component";
import ItemNames from "../item-names/item-names.component";
import Separator from "../separator/separator.component";
import Modal from "../../modals/modal/modal.component";

// react-icons
import { AiFillEdit } from "react-icons/ai";
import { MdLocalOffer, MdExpandLess, MdExpandMore } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { VscActivateBreakpoints } from "react-icons/vsc";

// styles
import styles from "./admin-item-card.module.scss";

// constants
import {
  Colors,
  toEnglishNumber,
  UserTypeConstants,
} from "../../utils/constants";
import PointsModal from "../../modals/points-modal/points-modal.component";

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

function AdminItemCard({ item, user, warehouse, role, index, searchString }) {
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
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showDeleteFromWarehouseModal, setShowDeleteFromWarehouseModal] =
    useState(false);
  const [maxQty, setMaxQty] = useState(
    warehouse
      ? item.warehouses.find((w) => w.warehouse._id === warehouse._id)?.maxQty
      : 0
  );
  const [prevMaxQty, setPrevMaxQty] = useState(0);
  const [expanded, setExpanded] = useState(false);

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

    dispatch(
      removeItemFromWarehouse({
        obj: {
          itemId: item._id,
          warehouseId: warehouse._id,
        },
        token,
      })
    );

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

  const rowClickHandler = () => {
    history.push("/item", {
      from: user.type,
      type: "info",
      allowAction:
        user.type === UserTypeConstants.COMPANY ||
        (user.type === UserTypeConstants.ADMIN && item.company.allowAdmin),
      itemId: item._id,
      companyId: item.company._id,
      warehouseId: warehouse?._id,
    });
  };

  const changeAvailability = () => {
    if (item.isActive) {
      deleteItemHandler();
    } else {
      undoDeleteItemHandler();
    }
  };

  return (
    <>
      <RowContainer isEven={index % 2} isOffer={checkOffer(item, user)}>
        <div className={styles.item_row}>
          <div className={styles.first_row}>
            <div className={[styles.item_names_container].join(" ")}>
              <label
                className={styles.icon}
                onClick={(e) => {
                  setExpanded(!expanded);
                  e.stopPropagation();
                }}
              >
                {expanded ? (
                  <MdExpandLess size={24} />
                ) : (
                  <MdExpandMore size={24} />
                )}
              </label>
              <ItemNames
                on_click={rowClickHandler}
                forAdmin={true}
                item={item}
                searchString={searchString}
              />
            </div>
          </div>

          <div className={styles.second_row}>
            <FullWidthLabel
              value={item.company.name}
              color={Colors.SUCCEEDED_COLOR}
            />

            <ItemPrices
              showCustomerPrice={true}
              showPrice={user.type !== UserTypeConstants.GUEST}
              price={item.price}
              customerPrice={item.customer_price}
            />
          </div>

          {((user.type === UserTypeConstants.ADMIN &&
            role === UserTypeConstants.ADMIN) ||
            (user.type === UserTypeConstants.ADMIN &&
              role === UserTypeConstants.COMPANY) ||
            user.type === UserTypeConstants.COMPANY) && (
            <div className={styles.second_row}>
              <CustomCheckbox
                label={t("item-available")}
                value={item.isActive}
                changeHandler={changeAvailability}
              />
            </div>
          )}

          {((user.type === UserTypeConstants.ADMIN &&
            role === UserTypeConstants.WAREHOUSE) ||
            user.type === UserTypeConstants.WAREHOUSE) && (
            <div className={styles.second_row}>
              <LabelValueRow label="item-max-qty" value={maxQty} />
            </div>
          )}

          {expanded && (
            <>
              <Separator />
              <ItemAdditionalInfo item={item} searchString={searchString} />
            </>
          )}

          {((user.type === UserTypeConstants.ADMIN &&
            role === UserTypeConstants.WAREHOUSE) ||
            user.type === UserTypeConstants.WAREHOUSE) && (
            <div className={styles.actions_row}>
              <ButtonWithIcon
                icon={() => <AiFillEdit />}
                action={() => {
                  setShowChangeMaxQtyModal(true);
                  setPrevMaxQty(maxQty);
                }}
                text={t("change-max-qty-header")}
                bgColor={Colors.MAIN_COLOR}
                smallText={true}
              />

              <ButtonWithIcon
                icon={() => <MdLocalOffer />}
                text={t("nav-offers")}
                action={() => {
                  setShowOfferModal(true);
                }}
                bgColor={Colors.SUCCEEDED_COLOR}
                smallText={true}
              />

              <ButtonWithIcon
                icon={() => <VscActivateBreakpoints />}
                text={t("points")}
                action={() => {
                  setShowPointsModal(true);
                }}
                bgColor={Colors.SUCCEEDED_COLOR}
                smallText={true}
              />
              <ButtonWithIcon
                icon={() => <RiDeleteBin5Fill />}
                action={deleteFromWarehouseHandler}
                bgColor={Colors.FAILED_COLOR}
                text={t("remove-from-warehouse")}
                smallText={true}
              />
            </div>
          )}
        </div>
      </RowContainer>

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
        />
      )}

      {showPointsModal && (
        <PointsModal
          token={token}
          item={item}
          warehouseId={warehouse._id}
          close={() => setShowPointsModal(false)}
          allowEdit={
            user.type === UserTypeConstants.WAREHOUSE ||
            (user.type === UserTypeConstants.ADMIN &&
              role === UserTypeConstants.WAREHOUSE &&
              warehouse.allowAdmin)
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
          }}
          closeModal={() => {
            setShowDeleteFromWarehouseModal(false);
          }}
          small={true}
        >
          {<p>{t("item-delete-from-warehouse")}</p>}
        </Modal>
      )}

      {showChangeMaxQtyModal && (
        <ChangeQuantityModal
          closeModal={() => {
            setShowChangeMaxQtyModal(false);
            setMaxQty(prevMaxQty);
            setPrevMaxQty(0);
          }}
          value={prevMaxQty}
          min={0}
          max={1000}
          step={1}
          okModal={(value) => {
            dispatch(
              changeItemWarehouseMaxQty({
                obj: {
                  itemId: item._id,
                  warehouseId: warehouse._id,
                  qty: (value + "").length === 0 ? 0 : Number.parseInt(value),
                },
                token,
              })
            );

            setShowChangeMaxQtyModal(false);
          }}
        />
      )}
    </>
  );
}

export default AdminItemCard;
