import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import Button from "../button/button.component";

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
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { resetMedicines } from "../../redux/medicines/medicinesSlices";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./partner-card.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";

function PartnerCard({ user, fullWidth }) {
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();

  const {
    settings: { showWarehouseItem },
  } = useSelector(selectSettings);

  const isOnline = useSelector(selectOnlineStatus);
  const favorites = useSelector(selectFavoritesPartners);
  const token = useSelector(selectToken);
  const loggedUser = useSelector(selectUser);

  // state to display a loader icon when user dispatch addToFavorite or removeFromFavorite
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);

  // method to handle add company to user's favorite
  const addCompanyToFavorite = () => {
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
  };

  // method to handle remove company from user's favorite
  const removeCompanyFromFavorite = () => {
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
  };

  // dispatch companySelected statistics and go to medicine page
  const displayMedicinesHandler = () => {
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

    dispatch(resetMedicines());

    history.push({
      pathname: "medicines",
      state: {
        companyId: user.type === UserTypeConstants.COMPANY ? user._id : null,
        warehouseId:
          user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
      },
    });
  };

  return (
    <div
      className={[
        styles.partner_container,
        fullWidth ? styles.full_width : "",
      ].join(" ")}
    >
      <p className={styles.partner_name}>{user.name}</p>

      {user.logo_url?.length > 0 ? (
        <p
          style={{
            backgroundImage: `url("http://localhost:8000/${user.logo_url}")`,
          }}
          className={styles.partner_logo}
        ></p>
      ) : (
        <p
          style={{
            backgroundImage: 'url("http://localhost:8000/default-logo.jpg")',
          }}
          className={styles.partner_logo}
        ></p>
      )}

      <div className={styles.from_top}>
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

        {(loggedUser.type === UserTypeConstants.ADMIN ||
          user.type === UserTypeConstants.COMPANY ||
          (user.type === UserTypeConstants.WAREHOUSE &&
            showWarehouseItem &&
            user.allowShowingMedicines)) && (
          <div>
            <Button
              action={displayMedicinesHandler}
              text={t("medicines")}
              bgColor={Colors.FAILED_COLOR}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PartnerCard;
