import React, { useState } from "react";
import { useSelector } from "react-redux";
import ItemInfoModal from "../../modals/item-info-modal/item-info-modal.component";
import { selectUserData } from "../../redux/auth/authSlice";
import { UserTypeConstants } from "../../utils/constants";

import styles from "./item-names.module.scss";

const ItemNames = ({ on_click, flexDirection, item, forAdmin }) => {
  const [showItemDetails, setShowItemDetails] = useState(false);
  const { user } = useSelector(selectUserData);

  return (
    <>
      <div
        className={styles.nameDiv}
        style={{ flexDirection: flexDirection }}
        onClick={() => {
          if (!forAdmin) setShowItemDetails(true);
          if (on_click) on_click();
        }}
      >
        <label className={styles.item_name}>{item.name}</label>
        {item.nameAr && <label className={styles.nameAr}>{item.nameAr}</label>}
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
