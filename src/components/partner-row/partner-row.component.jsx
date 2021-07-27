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
  addFavorite,
  selectFavoritesPartners,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { selectToken, selectUser } from "../../redux/auth/authSlice";

// rowStyles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import {
  statisticsCompanySelected,
  statisticsUserFavorites,
} from "../../redux/statistics/statisticsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function PartnerRow({ user, type }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const favorites = useSelector(selectFavoritesPartners);
  const token = useSelector(selectToken);
  const loggedUser = useSelector(selectUser);

  const [connectionError, setConnectionError] = useState("");

  // method to handle add company to user's favorite
  const addCompanyToFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(addFavorite({ obj: { favoriteId: user._id }, token }))
      .then(unwrapResult)
      .then((result) => {
        dispatch(statisticsUserFavorites({ obj: { userId: user._id }, token }));
      });
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
      <div className={rowStyles.container}>
        {user.type === UserTypeConstants.COMPANY && (
          <Link
            onClick={() => {
              // if the user type is pharmacy or normal, change the selectedCount
              // and selectedDates for this company
              if (
                loggedUser.type === UserTypeConstants.PHARMACY ||
                loggedUser.type === UserTypeConstants.NORMAL
              ) {
                dispatch(
                  statisticsCompanySelected({
                    obj: { companyId: user._id },
                    token,
                  })
                );
              }
            }}
            to={`/companies/${user._id}`}
            className={[
              rowStyles.hover_underline,
              rowStyles.padding_start,
            ].join(" ")}
          >
            {user.name}
          </Link>
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
          ) : (
            <div
              className={[generalStyles.icon, generalStyles.fc_yellow].join(
                " "
              )}
            >
              <AiOutlineStar size={20} onClick={addCompanyToFavorite} />
              <div className={generalStyles.tooltip}>
                {t("add-to-favorite-tooltip")}
              </div>
            </div>
          )}
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

export default PartnerRow;
