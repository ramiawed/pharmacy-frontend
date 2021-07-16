import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// components
import Modal from "../modal/modal.component";
import OffersModal from "../offers-modal/offers-modal.component";

// react-icons
import { MdDelete, MdLocalOffer } from "react-icons/md";

// styles
// import styles from "./warehouse-item-row.module.scss";
import generalStyles from "../../style.module.scss";
import tableStyles from "../table.module.scss";
import rowStyles from "../row.module.scss";
import { Link } from "react-router-dom";

function WarehouseItemRow({ item, deleteItem, changeItemMaxQty }) {
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
        >
          <Link
            className={rowStyles.hover_underline}
            to={{
              pathname: "/item",
              state: {
                from: user.type,
                type: "info",
                allowAction: false,
                itemId: item._id,
                companyId: null,
                warehouseId: user._id,
              },
            }}
          >
            {item.name}
          </Link>
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
          <div
            className={[
              generalStyles.icon,
              generalStyles.fc_red,
              generalStyles.margin_h_auto,
            ].join(" ")}
          >
            <MdDelete onClick={() => actionButtonPress()} size={20} />
          </div>
        </label>
        <label className={tableStyles.label_xsmall}>
          <div
            className={[generalStyles.icon, generalStyles.margin_h_auto].join(
              " "
            )}
          >
            <MdLocalOffer onClick={() => setShowOfferModal(true)} size={20} />
            <div className={generalStyles.tooltip}>{t("nav-offers")}</div>
          </div>
        </label>
      </div>
      {showModal && (
        <Modal
          header={t("item-delete-header")}
          cancelLabel={t("cancel-label")}
          okLabel={t("ok-label")}
          okModal={() => handlePressOkOnModal()}
          closeModal={() => setShowModal(false)}
          small={true}
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
          allowEdit={true}
        />
      )}
    </>
  );
}

export default WarehouseItemRow;
