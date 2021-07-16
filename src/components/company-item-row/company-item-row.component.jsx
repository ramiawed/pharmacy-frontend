import React, { useState } from "react";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { changeItemActiveState } from "../../redux/items/itemsSlices";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import Modal from "../modal/modal.component";

// react-icons
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

// styles
import generalStyles from "../../style.module.scss";
import tableStyles from "../table.module.scss";
import rowStyles from "../row.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

function CompanyItemRow({ item }) {
  const { t } = useTranslation();
  const [modalObj, setModalObj] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const { token, user } = useSelector(selectUserData);
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
      <div className={rowStyles.container}>
        {/* <label
          className={[rowStyles.hover_underline, tableStyles.label_medium].join(
            " "
          )}
          onClick={() => {
            const admin =
              user.type === UserTypeConstants.COMPANY ||
              (user.type === UserTypeConstants.ADMIN && item.company.allowAdmin)
                ? "admin"
                : "user";
            history.push(`/item/${admin}/info/${item._id}`);
          }}
        >
          {item.name}
        </label> */}
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
                warehouseId: null,
              },
            }}
          >
            {item.name}
          </Link>
        </label>

        {user.type === UserTypeConstants.ADMIN && (
          <label className={tableStyles.label_medium}>
            {item.company.name}
          </label>
        )}
        <label className={tableStyles.label_small}>
          {item.isActive ? (
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_green,
                generalStyles.margin_h_auto,
              ].join(" ")}
              onClick={() => {
                if (
                  (user.type === UserTypeConstants.ADMIN &&
                    item.company.allowAdmin) ||
                  user.type === UserTypeConstants.COMPANY
                ) {
                  actionButtonPress("delete");
                } else {
                  setShowWarningModal(true);
                }
              }}
            >
              <AiFillUnlock />
            </div>
          ) : (
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_red,
                generalStyles.margin_h_auto,
              ].join(" ")}
              onClick={() => {
                if (
                  (user.type === UserTypeConstants.ADMIN &&
                    item.company.allowAdmin) ||
                  user.type === UserTypeConstants.COMPANY
                ) {
                  actionButtonPress("undo-delete");
                } else {
                  setShowWarningModal(true);
                }
              }}
            >
              <AiFillLock />
            </div>
          )}
        </label>
        <label className={tableStyles.label_small}>{item.formula}</label>
        <label className={tableStyles.label_small}>{item.caliber}</label>
        <label className={tableStyles.label_small}>{item.packing}</label>
        <label className={tableStyles.label_small}>{item.price}</label>
        <label className={tableStyles.label_small}>{item.customer_price}</label>
        {user.type === UserTypeConstants.COMPANY && (
          <label className={tableStyles.label_large}>{item.composition}</label>
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
    </>
  );
}

export default CompanyItemRow;
