import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  selectFavorites,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import styles from "./favorite-row.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors } from "../../utils/constants.js";

function FavoriteRow({ user }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const token = useSelector(selectToken);

  const [connectionError, setConnectionError] = useState("");

  // method to handle add company to user's favorite
  const addCompanyToFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(addFavorite({ obj: { favoriteId: user._id }, token }));
  };

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
      <div className={styles.company_container}>
        <p className={styles.company_name}>{user.name}</p>
        <div>
          {favorites.map((favorite) => favorite._id).includes(user._id) ? (
            <AiFillStar
              className={[styles.icon, styles.fill_star].join(" ")}
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
