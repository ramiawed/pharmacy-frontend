import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import OrderDetailsInfoModal from "../../modals/order-details-info-modal/order-details-info-modal.component";
import ChooseDateModal from "../../modals/choose-date-modal/choose-date-modal.component";
import { ExportCSV } from "../export-csv/export-csv.component";
import Icon from "../icon/icon.component";
import Modal from "../../modals/modal/modal.component";

// icons
import { AiTwotoneEdit } from "react-icons/ai";
import { BsCheck, BsStopCircle } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { GrMoreVertical } from "react-icons/gr";
import { MdDeliveryDining } from "react-icons/md";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

// redux stuff
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import ActionBar from "../action-bar/action-bar.component";

const OrderDetailsActions = ({
  orderDetails,
  computeTotalPrice,
  warehouseDontServeHanlder,
  devlierHandler,
  confirmOrderHanlder,
  shippedHandler,
  withSaveOption,
}) => {
  const { t } = useTranslation();

  const user = useSelector(selectUser);

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showDevliverDateModal, setShowDeliverDateModal] = useState(false);
  const [showConfirmDontServerModal, setShowConfirmDontServeModal] =
    useState(false);
  const [showConfirmDateModal, setShowConfirmDateModal] = useState(false);
  const [showShippedDateModal, setShowShippedDateModal] = useState(false);

  return (
    <ActionBar>
      <Icon
        icon={() => <GrMoreVertical color={Colors.MAIN_COLOR} />}
        onclick={() => {
          setShowOrderDetails(true);
        }}
        foreColor={Colors.LIGHT_COLOR}
        withBackground={true}
        tooltip={t("order-details")}
        text={t("order-details")}
      />
      {(user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.WAREHOUSE) && (
        <>
          <Icon
            icon={() => <BsStopCircle color={Colors.MAIN_COLOR} />}
            onclick={() => {
              setShowConfirmDontServeModal(true);
            }}
            foreColor={Colors.LIGHT_COLOR}
            withBackground={true}
            tooltip={t("will-dont-serve-label")}
            text={t("will-dont-serve-label")}
          />
          <Icon
            icon={() => <GiConfirmed color={Colors.MAIN_COLOR} />}
            onclick={() => {
              setShowConfirmDateModal(true);
            }}
            foreColor={Colors.LIGHT_COLOR}
            withBackground={true}
            tooltip={t("confirm-order-label")}
            text={t("confirm-order-label")}
          />
          <Icon
            icon={() => <BsCheck color={Colors.MAIN_COLOR} />}
            onclick={() => {
              setShowDeliverDateModal(true);
            }}
            foreColor={Colors.LIGHT_COLOR}
            withBackground={true}
            tooltip={t("deliver-order-label")}
            text={t("deliver-order-label")}
          />
          <Icon
            icon={() => <MdDeliveryDining color={Colors.MAIN_COLOR} />}
            onclick={() => {
              setShowShippedDateModal(true);
            }}
            foreColor={Colors.LIGHT_COLOR}
            withBackground={true}
            tooltip={t("shipped-order-label")}
            text={t("shipped-order-label")}
          />
        </>
      )}

      {withSaveOption && (
        <ExportCSV
          csvData={orderDetails?.items}
          fileName={
            orderDetails.pharmacy.name +
            "_" +
            orderDetails.warehouse.name +
            "_" +
            new Date(orderDetails.createdAt).toLocaleDateString()
          }
        />
      )}

      {showOrderDetails && (
        <OrderDetailsInfoModal
          orderDetails={orderDetails}
          close={() => setShowOrderDetails(false)}
        />
      )}

      {showDevliverDateModal && (
        <ChooseDateModal
          header="deliver-order-label"
          msg="deliver-confirm-msg"
          closeModal={() => setShowDeliverDateModal(false)}
          handler={devlierHandler}
          withTime={true}
        />
      )}

      {showShippedDateModal && (
        <ChooseDateModal
          header="shipped-order-label"
          msg="shipped-confirm-msg"
          closeModal={() => setShowShippedDateModal(false)}
          handler={shippedHandler}
          withTime={true}
        />
      )}

      {showConfirmDateModal && (
        <ChooseDateModal
          header="confirm-order-label"
          msg="confirm-order-confirm-msg"
          closeModal={() => setShowConfirmDateModal(false)}
          handler={confirmOrderHanlder}
        />
      )}

      {showConfirmDontServerModal && (
        <Modal
          header={t("will-dont-serve-label")}
          closeModal={() => setShowConfirmDontServeModal(false)}
          small={true}
          cancelLabel="cancel-label"
          okLabel="ok-label"
          okModal={() => {
            warehouseDontServeHanlder();
            setShowConfirmDontServeModal(false);
          }}
        >
          <p>{t("dont-serve-confirm-msg")}</p>
        </Modal>
      )}
    </ActionBar>
  );
};

export default OrderDetailsActions;
