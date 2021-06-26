import React, { useState } from "react";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import { changeItemActiveState } from "../../redux/items/itemsSlices";
import Modal from "../modal/modal.component";
import { useTranslation } from "react-i18next";

// components
import ActionButton from "../action-button/action-button.component";

// react-icons
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

// styles
import tableStyles from "../table.module.scss";

// constants
import { Colors } from "../../utils/constants";

function CompanyItemRow({ item, index, onSelect }) {
  const { t } = useTranslation();
  const [modalObj, setModalObj] = useState({});

  const [showModal, setShowModal] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className={tableStyles.row}>
        <label
          className={[
            tableStyles.hover_underline,
            tableStyles.label_medium,
          ].join(" ")}
          onClick={() => onSelect(item)}
        >
          {item.name}
        </label>
        <label className={tableStyles.label_small}>
          {item.isActive ? (
            <ActionButton
              color={Colors.SUCCEEDED_COLOR}
              tooltip="tooltip-item-delete"
              icon={() => <AiFillUnlock />}
              action={() => actionButtonPress("delete")}
            />
          ) : (
            <ActionButton
              color={Colors.FAILED_COLOR}
              tooltip="tooltip-item-undo-delete"
              icon={() => <AiFillLock />}
              action={() => actionButtonPress("undo-delete")}
            />
          )}
        </label>
        <label className={tableStyles.label_small}>{item.formula}</label>
        <label className={tableStyles.label_small}>{item.caliber}</label>
        <label className={tableStyles.label_small}>{item.packing}</label>
        <label className={tableStyles.label_small}>{item.price}</label>
        <label className={tableStyles.label_small}>{item.customer_price}</label>
        <label className={tableStyles.label_large}>{item.composition}</label>
      </div>
      {showModal && (
        <Modal
          header={t(modalObj.header)}
          cancelLabel={t("cancel-label")}
          okLabel={t("ok-label")}
          okModal={() => handlePressOkOnModal()}
          closeModal={() => setShowModal(false)}
        >
          {<p>{t(modalObj.body)}</p>}
        </Modal>
      )}
    </>
  );
}

export default CompanyItemRow;
