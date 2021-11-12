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
import { selectUserData } from "../../redux/auth/authSlice";
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

function PartnerCard({ partner, fullWidth }) {
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const {
    settings: { showWarehouseItem },
  } = useSelector(selectSettings);

  const isOnline = useSelector(selectOnlineStatus);
  const favorites = useSelector(selectFavoritesPartners);
  const { token, user } = useSelector(selectUserData);

  // own state
  // state to display a loader icon when partner dispatch addToFavorite or removeFromFavorite
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);

  // determine if the partner can see the medicines in specific warehouse
  const allowShowingWarehouseMedicines =
    user.type === UserTypeConstants.ADMIN ||
    partner.type === UserTypeConstants.COMPANY ||
    (partner.type === UserTypeConstants.WAREHOUSE &&
      showWarehouseItem &&
      partner.allowShowingMedicines);

  // method to handle add company to partner's favorite
  const addPartnerToFavoriteHandler = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(addFavorite({ obj: { favoriteId: partner._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeFavoriteLoading(false);
        dispatch(
          statisticsUserFavorites({ obj: { partnerId: partner._id }, token })
        );
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });
  };

  // method to handle remove company from partner's favorite
  const removePartnerFromFavoriteHandler = () => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(removeFavorite({ obj: { favoriteId: partner._id }, token }))
      .then(unwrapResult)
      .then(() => {
        changeFavoriteLoading(false);
      })
      .catch(() => setChangeFavoriteLoading(false));
  };

  // dispatch companySelected statistics and go to medicine page
  const displayMedicinesHandler = () => {
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.NORMAL
    ) {
      dispatch(
        statisticsCompanySelected({
          obj: { companyId: partner._id },
          token,
        })
      );
    }

    dispatch(resetMedicines());

    history.push({
      pathname: "medicines",
      state: {
        companyId:
          partner.type === UserTypeConstants.COMPANY ? partner._id : null,
        warehouseId:
          partner.type === UserTypeConstants.WAREHOUSE ? partner._id : null,
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
      <p className={styles.partner_name}>{partner.name}</p>

      {partner.logo_url?.length > 0 ? (
        <p
          style={{
            backgroundImage: `url("http://localhost:8000/${partner.logo_url}")`,
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
            favorites.map((favorite) => favorite._id).includes(partner._id) ? (
              <AiFillStar
                size={24}
                onClick={removePartnerFromFavoriteHandler}
              />
            ) : (
              <AiOutlineStar size={24} onClick={addPartnerToFavoriteHandler} />
            )}
          </div>
        )}

        {allowShowingWarehouseMedicines && (
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
