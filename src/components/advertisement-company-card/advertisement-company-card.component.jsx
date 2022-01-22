import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// components

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

// redux-stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  selectFavoritesPartners,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  statisticsCompanySelected,
  statisticsUserFavorites,
} from "../../redux/statistics/statisticsSlice";
import {
  resetMedicines,
  setSearchCompanyName,
  setSearchWarehouseName,
} from "../../redux/medicines/medicinesSlices";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./advertisement-company-card.module.scss";

// constants and utils
import { SERVER_URL, UserTypeConstants } from "../../utils/constants.js";

function AdvertisementCompanyCard({ user, contentColor }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const isOnline = useSelector(selectOnlineStatus);
  const favorites = useSelector(selectFavoritesPartners);
  const token = useSelector(selectToken);
  const loggedUser = useSelector(selectUser);

  // state to display a loader icon when user dispatch addToFavorite or removeFromFavorite
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);

  // method to handle add company to user's favorite
  const addCompanyToFavorite = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(addFavorite({ obj: { favoriteId: user._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeFavoriteLoading(false);
        dispatch(statisticsUserFavorites({ obj: { userId: user._id }, token }));
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });

    e.stopPropagation();
  };

  // method to handle remove company from user's favorite
  const removeCompanyFromFavorite = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(removeFavorite({ obj: { favoriteId: user._id }, token }))
      .then(unwrapResult)
      .then(() => {
        changeFavoriteLoading(false);
      })
      .catch(() => setChangeFavoriteLoading(false));
    e.stopPropagation();
  };

  // dispatch companySelected statistics and go to medicine page
  const displayMedicinesHandler = () => {
    if (
      loggedUser.type === UserTypeConstants.PHARMACY ||
      loggedUser.type === UserTypeConstants.GUEST
    ) {
      dispatch(
        statisticsCompanySelected({
          obj: { companyId: user._id },
          token,
        })
      );
    }

    history.push(`/companies/${user._id}`);
  };

  const dispatchCompanySelectedHandler = () => {
    // if the user type is pharmacy or normal, change the selectedCount
    // and selectedDates for this company
    if (
      loggedUser.type === UserTypeConstants.PHARMACY ||
      loggedUser.type === UserTypeConstants.GUEST
    ) {
      dispatch(
        statisticsCompanySelected({
          obj: { companyId: user._id },
          token,
        })
      );
    }
    dispatch(resetMedicines());
    if (user.type === UserTypeConstants.COMPANY) {
      dispatch(setSearchCompanyName(user.name));
    }

    if (user.type === UserTypeConstants.WAREHOUSE) {
      dispatch(setSearchWarehouseName(user.name));
    }
  };

  return (
    <div className={styles.partner_container}>
      <div>
        {changeFavoriteLoading ? (
          <div
            className={[generalStyles.icon, generalStyles.fc_yellow].join(" ")}
          >
            <VscLoading className={generalStyles.loading} size={20} />
          </div>
        ) : (
          <div
            className={[generalStyles.icon, generalStyles.fc_yellow].join(" ")}
          >
            {favorites &&
            favorites.map((favorite) => favorite._id).includes(user._id) ? (
              <AiFillStar size={24} onClick={removeCompanyFromFavorite} />
            ) : (
              <AiOutlineStar size={24} onClick={addCompanyToFavorite} />
            )}
          </div>
        )}
      </div>

      <div
        className={styles.logo_div}
        style={{
          backgroundImage:
            user.logo_url.length > 0
              ? `url("${SERVER_URL}/${user.logo_url}")`
              : `url("${SERVER_URL}/default-logo.png")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <Link
        className={styles.content}
        style={{
          color: contentColor,
        }}
        onClick={dispatchCompanySelectedHandler}
        to={{
          pathname: `/medicines`,
          state: {
            companyId:
              user.type === UserTypeConstants.COMPANY ? user._id : null,
            warehouseId:
              user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
          },
        }}
      >
        {user.name}
      </Link>
    </div>
  );
}

export default AdvertisementCompanyCard;
