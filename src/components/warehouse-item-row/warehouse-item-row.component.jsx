import React, { useState } from "react";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import Modal from "../modal/modal.component";
import { useTranslation } from "react-i18next";

// components
import ActionButton from "../action-button/action-button.component";

// react-icons
import { MdDelete } from "react-icons/md";

// styles
import styles from "./warehouse-item-row.module.scss";
import tableStyles from "../table.module.scss";

// constants
import { Colors } from "../../utils/constants";

function WarehouseItemRow({ item, index, onSelect, deleteItem }) {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  const [showModal, setShowModal] = useState(false);

  const actionButtonPress = () => {
    setShowModal(true);
  };

  const handlePressOkOnModal = () => {
    deleteItem({ itemId: item._id, warehouseId: user._id });

    setShowModal(false);
  };

  return (
    <>
      <div
        className={[
          styles.row,
          index % 2 === 0 ? styles.even : styles.odd,
        ].join(" ")}
      >
        <label
          className={[styles.name, tableStyles.label_medium].join(" ")}
          onClick={() => onSelect(item)}
        >
          {item.name}
        </label>
        <label className={tableStyles.label_medium}>
          {item.company_name[0].name}
        </label>
        <label className={tableStyles.label_small}>{item.formula}</label>
        <label className={tableStyles.label_small}>{item.caliber}</label>
        <label className={tableStyles.label_small}>{item.packing}</label>
        <label className={tableStyles.label_small}>{item.price}</label>
        <label className={tableStyles.label_small}>{item.customer_price}</label>
        {/* <label className={tableStyles.label_large}>{item.composition}</label> */}
        <label className={tableStyles.label_small}>
          <ActionButton
            color={Colors.FAILED_COLOR}
            tooltip="tooltip-item-delete"
            icon={() => <MdDelete />}
            action={() => actionButtonPress()}
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
    </>
  );
}

export default WarehouseItemRow;
