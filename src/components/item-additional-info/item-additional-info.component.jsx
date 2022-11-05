import React from "react";
import LabelValueRow from "../label-value-row/label-value-row.component";

const ItemAdditionalInfo = ({ item }) => {
  return (
    <>
      <LabelValueRow label="item-packing" value={item.packing} />
      <LabelValueRow label="item-caliber" value={item.caliber} />
      <LabelValueRow label="item-composition" value={item.composition} />
    </>
  );
};

export default ItemAdditionalInfo;
