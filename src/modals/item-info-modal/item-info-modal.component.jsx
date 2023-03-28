import React from "react";
import LabelValueRow from "../../components/label-value-row/label-value-row.component";
import Separator from "../../components/separator/separator.component";

import Modal from "../modal/modal.component";

const ItemInfoModal = ({ item, on_close, showPrice }) => {
  return (
    <Modal
      cancelLabel="close"
      header={item.name}
      small={true}
      closeModal={on_close}
    >
      <LabelValueRow label="item name" value={item.name} />
      <LabelValueRow label="item name ar" value={item.nameAr} />
      <LabelValueRow
        label="company"
        value={item.company.name ? item.company.name : item.company[0].name}
      />
      <Separator />
      {showPrice && <LabelValueRow label="price" value={item.price} />}
      <LabelValueRow label="customer price" value={item.customer_price} />
      <Separator />
      <LabelValueRow label="formula" value={item.formula} />
      <LabelValueRow label="packing" value={item.packing} />
      <LabelValueRow label="caliber" value={item.caliber} />
      <Separator />
      <LabelValueRow label="composition" value={item.composition} />
    </Modal>
  );
};

export default ItemInfoModal;
