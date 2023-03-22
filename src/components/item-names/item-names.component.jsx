import React, { useState } from "react";

// components
import ItemInfoModal from "../../modals/item-info-modal/item-info-modal.component";

// redux stuff
import { selectUserData } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

// constants
import { UserTypeConstants } from "../../utils/constants";

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
        className={["row_col_flex", "highlight_underline"].join(" ")}
        style={{ flexDirection: flexDirection }}
        onClick={() => {
          if (!forAdmin) setShowItemDetails(true);
          if (on_click) on_click();
        }}
      >
        {itemNameArraySplit.length > 0 ? (
          <label className={["bold", "big", "fc_dark"].join(" ")}>
            {itemNameArraySplit[0].toUpperCase()}
            <strong className="filter_highlight">
              {searchString.toUpperCase()}
            </strong>
            {itemNameArraySplit[1].toUpperCase}
          </label>
        ) : (
          <label className={["bold", "big", "fc_dark"].join(" ")}>
            {item.name.toUpperCase()}
          </label>
        )}

        <div style={{ width: "10px" }}></div>

        {item.nameAr && itemNameArArraySplit.length > 0 ? (
          <label className={["big", "fc_main"].join(" ")}>
            {itemNameArArraySplit[0]}
            <strong className="filter_highlight">{searchString}</strong>
            {itemNameArArraySplit[1]}
          </label>
        ) : (
          <label className={["big", "fc_main"].join(" ")}>{item.nameAr}</label>
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
