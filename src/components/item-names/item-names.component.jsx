import React, { useState } from "react";
import { useSelector } from "react-redux";
import ItemInfoModal from "../../modals/item-info-modal/item-info-modal.component";
import { selectUserData } from "../../redux/auth/authSlice";
import { UserTypeConstants } from "../../utils/constants";

import gs from "../../style.module.scss";

const ItemNames = ({
  on_click,
  flexDirection,
  item,
  forAdmin,
  searchString,
}) => {
  const [showItemDetails, setShowItemDetails] = useState(false);
  const { user } = useSelector(selectUserData);

  const itemNameArraySplit = searchString
    ? item.name.toLowerCase().includes(searchString.toLowerCase())
      ? item.name.toLowerCase().split(searchString.toLowerCase())
      : []
    : [];

  const itemNameArArraySplit = searchString
    ? item.nameAr.toLowerCase().includes(searchString.toLowerCase())
      ? item.nameAr.toLowerCase().split(searchString.toLowerCase())
      : []
    : [];

  return (
    <>
      <div
        className={[gs.row_col_flex, gs.highlight_underline].join(" ")}
        style={{ flexDirection: flexDirection }}
        onClick={() => {
          if (!forAdmin) setShowItemDetails(true);
          if (on_click) on_click();
        }}
      >
        {itemNameArraySplit.length > 0 ? (
          <label className={[gs.name, gs.fc_dark].join(" ")}>
            {itemNameArraySplit[0]}
            <strong className={gs.filter_highlight}>{searchString}</strong>
            {itemNameArraySplit[1]}
          </label>
        ) : (
          <label className={[gs.name, gs.fc_dark].join(" ")}>{item.name}</label>
        )}

        <div style={{ width: "10px" }}></div>

        {item.nameAr && itemNameArArraySplit.length > 0 ? (
          <label className={[gs.sub_name, gs.fc_main].join(" ")}>
            {itemNameArArraySplit[0]}
            <strong className={gs.filter_highlight}>{searchString}</strong>
            {itemNameArArraySplit[1]}
          </label>
        ) : (
          <label className={[gs.sub_name, gs.fc_main].join(" ")}>
            {item.nameAr}
          </label>
        )}
      </div>

      {showItemDetails && (
        <ItemInfoModal
          item={item}
          on_close={() => setShowItemDetails(false)}
          showPrice={user.type !== UserTypeConstants.GUEST}
        />
      )}
    </>
  );
};

export default ItemNames;
