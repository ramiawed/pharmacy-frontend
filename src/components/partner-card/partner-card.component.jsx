import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Logo from "../../logo01.png";

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
  selectFavoritesError,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  addStatistics,
  statisticsCompanySelected,
  statisticsUserFavorites,
} from "../../redux/statistics/statisticsSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import {
  resetMedicines,
  setSearchCompanyName,
  setSearchWarehouseName,
} from "../../redux/medicines/medicinesSlices";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./partner-card.module.scss";

// constants and utils
import {
  Colors,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants.js";

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
  const favoritesError = useSelector(selectFavoritesError);
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
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetUser: partner._id,
              action: "user-added-to-favorite",
            },
            token,
          })
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

  const partnerCardClickHandler = () => {
    if (
      partner.type === UserTypeConstants.WAREHOUSE &&
      user.type === UserTypeConstants.WAREHOUSE
    ) {
      return;
    }

    if (allowShowingWarehouseMedicines) {
      // if the partner type is pharmacy or normal, change the selectedCount
      // and selectedDates for this company
      if (
        user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.GUEST
      ) {
        dispatch(
          statisticsCompanySelected({
            obj: { companyId: partner._id },
            token,
          })
        );
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetUser: partner._id,
              action: "choose-company",
            },
            token,
          })
        );
      }
      dispatch(resetMedicines());

      if (partner.type === UserTypeConstants.COMPANY) {
        dispatch(setSearchCompanyName(partner.name));
      }

      if (partner.type === UserTypeConstants.WAREHOUSE) {
        dispatch(setSearchWarehouseName(partner.name));
      }
      history.push("/medicines");
    }
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
        <img
          src={`${SERVER_URL}/${partner.logo_url}`}
          className={styles.partner_logo}
          alt="thumb"
        />
      ) : (
        <img src={Logo} className={styles.partner_logo} alt="thumb" />
      )}

      <div className={styles.from_top}>
        {favoritesError === "" ? (
          changeFavoriteLoading ? (
            <div
              className={[generalStyles.icon, generalStyles.fc_yellow].join(
                " "
              )}
            >
              <VscLoading className={generalStyles.loading} size={20} />
            </div>
          ) : (
            <div
              className={[generalStyles.icon, generalStyles.fc_yellow].join(
                " "
              )}
            >
              {favorites &&
              favorites
                .map((favorite) => favorite._id)
                .includes(partner._id) ? (
                <AiFillStar
                  size={24}
                  onClick={removePartnerFromFavoriteHandler}
                />
              ) : (
                <AiOutlineStar
                  size={24}
                  onClick={addPartnerToFavoriteHandler}
                />
              )}
            </div>
          )
        ) : null}

        {(partner.type === UserTypeConstants.COMPANY ||
          (partner.type === UserTypeConstants.WAREHOUSE &&
            user.type !== UserTypeConstants.WAREHOUSE)) && (
          <div>
            <Button
              action={partnerCardClickHandler}
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
