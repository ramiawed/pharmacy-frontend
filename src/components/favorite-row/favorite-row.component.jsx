import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// react icons
import { AiFillStar } from "react-icons/ai";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoritesPartners,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

function FavoriteRow({ user, withoutBoxShadow }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const favorites = useSelector(selectFavoritesPartners);
  const token = useSelector(selectToken);
  const isOnline = useSelector(selectOnlineStatus);

  const [connectionError, setConnectionError] = useState("");

  // method to handle remove company from user's favorite
  const removeCompanyFromFavorite = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    dispatch(removeFavorite({ obj: { favoriteId: user._id }, token }));
  };

  return (
    <>
      <div
        className={[
          rowStyles.container,
          withoutBoxShadow ? rowStyles.without_box_shadow : "",
        ].join(" ")}
      >
        {user.type === UserTypeConstants.COMPANY && (
          <label>
            <Link
              to={`/companies/${user._id}`}
              className={[
                rowStyles.hover_underline,
                rowStyles.padding_start,
              ].join(" ")}
            >
              {user.name}
            </Link>
          </label>
        )}

        {user.type === UserTypeConstants.WAREHOUSE && (
          <label
            className={[
              rowStyles.hover_underline,
              rowStyles.padding_start,
            ].join(" ")}
          >
            {user.name}
          </label>
        )}

        {/* <p className={rowStyles.company_name}>{user.name}</p> */}
        <div className={rowStyles.padding_end}>
          {favorites.map((favorite) => favorite._id).includes(user._id) ? (
            <div
              className={[generalStyles.icon, generalStyles.fc_yellow].join(
                " "
              )}
            >
              <AiFillStar size={20} onClick={removeCompanyFromFavorite} />
              <div className={generalStyles.tooltip}>
                {t("remove-from-favorite-tooltip")}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default FavoriteRow;
