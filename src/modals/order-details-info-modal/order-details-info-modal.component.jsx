import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// components
import LabelValueRow from "../../components/label-value-row/label-value-row.component";
import Separator from "../../components/separator/separator.component";
import { formatDate, formatNumber } from "../../utils/constants";
import Modal from "../modal/modal.component";

const OrderDetailsInfoModal = ({ orderDetails, computeTotalPrice, close }) => {
  const { t } = useTranslation();
  return (
    <Modal
      header={t("order-details")}
      closeModal={close}
      cancelLabel="cancel-label"
      small={true}
    >
      <LabelValueRow label="pharmacy-name" value={orderDetails.pharmacy.name} />
      <Separator />
      <LabelValueRow
        label="user-certificate-name"
        value={orderDetails.pharmacy.certificateName}
      />
      <Separator />
      <LabelValueRow
        label="user-address-details"
        value={orderDetails.pharmacy.addressDetails}
      />
      <Separator />
      <LabelValueRow label="user-mobile" value={orderDetails.pharmacy.mobile} />
      <Separator />
      <LabelValueRow
        label="warehouse-name"
        value={orderDetails.warehouse.name}
      />
      <Separator />
      <LabelValueRow
        label="date-label"
        value={formatDate(new Date(orderDetails.createdAt))}
      />
      {computeTotalPrice && (
        <>
          <Separator />
          <LabelValueRow
            label="total-invoice-price"
            value={formatNumber(computeTotalPrice())}
          />
        </>
      )}
    </Modal>
  );
};

export default memo(OrderDetailsInfoModal);
