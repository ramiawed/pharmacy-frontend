import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

// components

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
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

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import Icon from "../action-icon/action-icon.component";

function PartnerRow({ user }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const {
    settings: { showWarehouseItem },
  } = useSelector(selectSettings);

  const isOnline = useSelector(selectOnlineStatus);
  const favorites = useSelector(selectFavoritesPartners);
  const token = useSelector(selectToken);
  const loggedUser = useSelector(selectUser);
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
        setChangeFavoriteLoading(false);
      })
      .catch(() => setChangeFavoriteLoading(false));
  };

  const dispatchCompanySelectedHandler = () => {
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
  };

  return (
    <>
      <div className={rowStyles.container}>
        {user.type === UserTypeConstants.COMPANY ||
        (user.type === UserTypeConstants.WAREHOUSE && showWarehouseItem) ? (
          <Link
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
            className={[
              rowStyles.hover_underline,
              rowStyles.padding_start,
            ].join(" ")}
          >
            {user.name}
          </Link>
        ) : (
          <label
            className={[
              rowStyles.hover_underline,
              rowStyles.padding_start,
            ].join(" ")}
          >
            {user.name}
          </label>
        )}

        {changeFavoriteLoading ? (
          <div className={rowStyles.padding_end}>
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={20} />
              )}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
            />
          </div>
        ) : (
          <div className={rowStyles.padding_end}>
            {favorites &&
            favorites.map((favorite) => favorite._id).includes(user._id) ? (
              <Icon
                icon={() => <AiFillStar size={20} />}
                onclick={removeCompanyFromFavorite}
                foreColor={Colors.YELLOW_COLOR}
                tooltip={t("remove-from-favorite-tooltip")}
              />
            ) : (
              <Icon
                icon={() => <AiOutlineStar size={20} />}
                onclick={addCompanyToFavorite}
                foreColor={Colors.YELLOW_COLOR}
                tooltip={t("add-to-favorite-tooltip")}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default PartnerRow;
