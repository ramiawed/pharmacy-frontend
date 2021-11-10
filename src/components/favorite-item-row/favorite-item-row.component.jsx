import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  selectOnlineStatus,
  changeOnlineMsg,
} from "../../redux/online/onlineSlice";

// rowStyles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import AddToCartModal from "../add-to-cart-modal/add-to-cart-modal.component";
import Icon from "../action-icon/action-icon.component";
import { VscLoading } from "react-icons/vsc";

function FavoriteItemRow({ item, withoutBoxShadow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  const favorites = useSelector(selectFavoritesItems);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [connectionError, setConnectionError] = useState("");

  // method to handle remove company from user's favorite
  const removeItemFromFavorite = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
    }
    setLoading(true);

    dispatch(removeFavoriteItem({ obj: { favoriteItemId: item._id }, token }));
  };

  return (
    <>
      <div
        className={[
          rowStyles.container,
          withoutBoxShadow ? rowStyles.without_box_shadow : "",
        ].join(" ")}
      >
        <label
          className={[
            rowStyles.hover_underline,
            rowStyles.padding_start,
            tableStyles.label_medium,
            rowStyles.align_start,
          ].join(" ")}
        >
          <Link
            className={[
              generalStyles.fc_secondary,
              rowStyles.hover_underline,
            ].join(" ")}
            to={{
              pathname: "/item",
              state: {
                from: user.type,
                type: "info",
                allowAction: false,

                itemId: item._id,
                companyId: item.company._id,
                warehouseId:
                  user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
              },
            }}
          >
            {item.name}
          </Link>
        </label>

        <label className={tableStyles.label_small}>{item.caliber}</label>
        <label className={tableStyles.label_small}>{item.formula}</label>
        <label className={tableStyles.label_small}>{item.packing}</label>

        {item.warehouses.length > 0 ? (
          user.type === UserTypeConstants.PHARMACY ? (
            <Icon
              icon={() => <GiShoppingCart size={20} />}
              onclick={() => setShowModal(true)}
              // tooltip={t("remove-from-warehouse-tooltip")}
              foreColor={Colors.SUCCEEDED_COLOR}
            />
          ) : (
            <div className={tableStyles.label_xsmall}></div>
          )
        ) : (
          <div className={tableStyles.label_xsmall}></div>
        )}
        <div className={rowStyles.padding_end}>
          {favorites.map((favorite) => favorite._id).includes(item._id) ? (
            loading ? (
              <Icon
                icon={() => (
                  <VscLoading className={generalStyles.loading} size={24} />
                )}
                onclick={() => {}}
                foreColor={Colors.YELLOW_COLOR}
              />
            ) : (
              <Icon
                icon={() => <AiFillStar size={20} />}
                onclick={removeItemFromFavorite}
                tooltip={t("remove-from-favorite-tooltip")}
                foreColor={Colors.YELLOW_COLOR}
              />
            )
          ) : null}
        </div>
      </div>

      {connectionError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setConnectionError("");
          }}
        >
          <p>{t(connectionError)}</p>
        </Toast>
      )}

      {showModal && (
        <AddToCartModal item={item} close={() => setShowModal(false)} />
      )}
    </>
  );
}

export default FavoriteItemRow;
