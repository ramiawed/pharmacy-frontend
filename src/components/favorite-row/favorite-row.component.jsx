import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoritesPartners,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import rowStyles from "../row.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants.js";

function FavoriteRow({ user }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesPartners);
  const token = useSelector(selectToken);

  const [connectionError, setConnectionError] = useState("");

  // method to handle remove company from user's favorite
  const removeCompanyFromFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(removeFavorite({ obj: { favoriteId: user._id }, token }));
  };

  return (
    <>
      <div className={rowStyles.container}>
        {user.type === UserTypeConstants.COMPANY && (
          <Link to={`/companies/${user._id}`} className={rowStyles.name}>
            {user.name}
          </Link>
        )}

        {user.type === UserTypeConstants.WAREHOUSE && (
          <Link to={`/warehouses/${user._id}`} className={rowStyles.name}>
            {user.name}
          </Link>
        )}

        {/* <p className={rowStyles.company_name}>{user.name}</p> */}
        <div>
          {favorites.map((favorite) => favorite._id).includes(user._id) ? (
            <AiFillStar
              className={[rowStyles.icon, rowStyles.fill_star].join(" ")}
              size={24}
              onClick={removeCompanyFromFavorite}
            />
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
    </>
  );
}

export default FavoriteRow;
