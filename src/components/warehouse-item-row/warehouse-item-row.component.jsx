import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import { selectUser, selectUserData } from "../../redux/auth/authSlice";

// components
import ActionButton from "../action-button/action-button.component";
import Modal from "../modal/modal.component";
import OffersModal from "../offers-modal/offers-modal.component";

// react-icons
import { MdDelete, MdLocalOffer } from "react-icons/md";

// styles
// import styles from "./warehouse-item-row.module.scss";
import tableStyles from "../table.module.scss";
import rowStyles from "../row.module.scss";

// constants
import { Colors } from "../../utils/constants";

function WarehouseItemRow({ item, onSelect, deleteItem, changeItemMaxQty }) {
  const { t } = useTranslation();
  const { user, token } = useSelector(selectUserData);

  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  const actionButtonPress = () => {
    setShowModal(true);
  };

  const handlePressOkOnModal = () => {
    deleteItem({ itemId: item._id, warehouseId: user._id });

    setShowModal(false);
  };

  return (
    <>
      <div className={[rowStyles.container].join(" ")}>
        <label
          className={[
            tableStyles.hover_underline,
            tableStyles.label_medium,
          ].join(" ")}
          onClick={() => onSelect(item)}
        >
          {item.name}
        </label>
        <label className={tableStyles.label_medium}>{item.company.name}</label>
        <label className={tableStyles.label_small}>{item.formula}</label>
        <label className={tableStyles.label_small}>{item.caliber}</label>
        <label className={tableStyles.label_small}>{item.packing}</label>
        <label className={tableStyles.label_small}>{item.price}</label>
        <label className={tableStyles.label_small}>{item.customer_price}</label>
        <label className={tableStyles.label_small}>
          <input
            type="number"
            className={rowStyles.input}
            min={0}
            defaultValue={
              item.warehouses.find((w) => w.warehouse._id === user._id).maxQty
            }
            onBlur={(e) =>
              changeItemMaxQty({
                itemId: item._id,
                warehouseId: user._id,
                qty: e.target.value,
              })
            }
          />
        </label>
        {/* <label className={tableStyles.label_large}>{item.composition}</label> */}
        <label className={tableStyles.label_xsmall}>
          <ActionButton
            color={Colors.FAILED_COLOR}
            tooltip="tooltip-item-delete"
            icon={() => <MdDelete />}
            action={() => actionButtonPress()}
          />
        </label>
        <label className={tableStyles.label_xsmall}>
          <ActionButton
            color={Colors.SECONDARY_COLOR}
            tooltip="tooltip-offers"
            icon={() => <MdLocalOffer />}
            action={() => setShowOfferModal(true)}
          />
        </label>
      </div>
      {showModal && (
        <Modal
          header={t("item-delete-header")}
          cancelLabel={t("cancel-label")}
          okLabel={t("ok-label")}
          okModal={() => handlePressOkOnModal()}
          closeModal={() => setShowModal(false)}
        >
          {<p>{t("item-delete-from-warehouse")}</p>}
        </Modal>
      )}

      {showOfferModal && (
        <OffersModal
          token={token}
          item={item}
          warehouseId={user._id}
          close={() => setShowOfferModal(false)}
        />
      )}
    </>
  );
}

export default WarehouseItemRow;
