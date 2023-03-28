import React from "react";
import LabelValueRow from "../label-value-row/label-value-row.component";

const ItemAdditionalInfo = ({ item, searchString }) => {
  return (
    <>
      <LabelValueRow label="packing" value={item.packing} />
      <LabelValueRow label="caliber" value={item.caliber} />
      <LabelValueRow
        label="composition"
        value={item.composition}
        searchString={searchString}
      />
    </>
  );
};

export default ItemAdditionalInfo;
