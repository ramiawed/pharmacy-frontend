import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// components
import LabelValueRow from "../../components/label-value-row/label-value-row.component";
import Separator from "../../components/separator/separator.component";
import Modal from "../modal/modal.component";

// utils
import { formatDate, formatNumber } from "../../utils/constants";

const OrderDetailsInfoModal = ({ orderDetails, close }) => {
  const { t } = useTranslation();
  return (
    <Modal
      header={t("order details")}
      closeModal={close}
      cancelLabel="close"
      small={true}
    >
      <LabelValueRow label="pharmacy" value={orderDetails.pharmacy.name} />
      <Separator />
      <LabelValueRow
        label="certificate name"
        value={orderDetails.pharmacy.certificateName}
      />
      <Separator />
      <LabelValueRow
        label="address"
        value={orderDetails.pharmacy.addressDetails}
      />
      <Separator />
      <LabelValueRow label="mobile" value={orderDetails.pharmacy.mobile} />
      <Separator />
      <LabelValueRow label="warehouse" value={orderDetails.warehouse.name} />
      <Separator />
      <LabelValueRow
        label="date"
        value={formatDate(new Date(orderDetails.createdAt))}
      />

      {orderDetails.totalInvoicePrice && (
        <>
          <Separator />
          <LabelValueRow
            label="total price"
            value={formatNumber(orderDetails.totalInvoicePrice)}
          />
        </>
      )}

      {/* {orderDetails.totalInvoicePoints && (
        <>
          <Separator />
          <LabelValueRow
            label="points"
            value={formatNumber(orderDetails.totalInvoicePoints)}
          />
        </>
      )} */}
    </Modal>
  );
};

export default memo(OrderDetailsInfoModal);
