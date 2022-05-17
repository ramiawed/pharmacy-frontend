import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

// components
import Icon from "../action-icon/action-icon.component";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  addFavorite,
  selectFavoritesPartners,
  removeFavorite,
  selectFavoritesError,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import {
  resetMedicines,
  setSearchCompanyId,
  setSearchCompanyName,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";
import { setSelectedWarehouse } from "../../redux/warehouse/warehousesSlice";

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";

function PartnerRow({ partner, isSearch, withoutBoxShadow, onSelectAction }) {
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
  const addPartnerToFavorite = (e) => {
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
  const removePartnerFromFavoriteHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(removeFavorite({ obj: { favoriteId: partner._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeFavoriteLoading(false);
      })
      .catch(() => setChangeFavoriteLoading(false));
  };

  const partnerRowClickHandler = () => {
    if (onSelectAction) {
      onSelectAction();
    }

    if (
      partner.type === UserTypeConstants.WAREHOUSE &&
      (user.type === UserTypeConstants.WAREHOUSE ||
        user.type === UserTypeConstants.COMPANY ||
        user.type === UserTypeConstants.GUEST)
    ) {
      return;
    }

    if (allowShowingWarehouseMedicines) {
      // if the partner type is pharmacy or normal, change the selectedCount
      // and selectedDates for this company
      if (user.type === UserTypeConstants.PHARMACY) {
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
        dispatch(setSearchCompanyId(partner._id));
      }

      if (partner.type === UserTypeConstants.WAREHOUSE) {
        dispatch(setSearchWarehouseId(partner._id));
      }

      // if (
      //   partner.type === UserTypeConstants.WAREHOUSE &&
      //   user.type === UserTypeConstants.PHARMACY
      // ) {
      //   dispatch(setSelectedWarehouse(partner._id));
      // } else {
      //   dispatch(setSelectedWarehouse(null));
      // }
      history.push("/medicines");
    }
  };

  return (
    <>
      <div
        className={[
          isSearch ? rowStyles.search_container : rowStyles.container,
          withoutBoxShadow ? rowStyles.without_box_shadow : "",
        ].join(" ")}
        style={{
          cursor: "pointer",
        }}
        onClick={partnerRowClickHandler}
      >
        <label
          className={[rowStyles.hover_underline, rowStyles.padding_start].join(
            " "
          )}
          style={{
            fontSize: "16px",
          }}
        >
          {partner.name}
        </label>

        {changeFavoriteLoading ? (
          <div className={[rowStyles.padding_end].join(" ")}>
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={20} />
              )}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
            />
          </div>
        ) : (
          <div className={[rowStyles.padding_end].join(" ")}>
            {favoritesError === "" ? (
              favorites &&
              favorites
                .map((favorite) => favorite._id)
                .includes(partner._id) ? (
                <Icon
                  icon={() => <AiFillStar size={20} />}
                  onclick={removePartnerFromFavoriteHandler}
                  foreColor={Colors.YELLOW_COLOR}
                  tooltip={t("remove-from-favorite-tooltip")}
                />
              ) : (
                <Icon
                  icon={() => <AiOutlineStar size={20} />}
                  onclick={addPartnerToFavorite}
                  foreColor={Colors.YELLOW_COLOR}
                  tooltip={t("add-to-favorite-tooltip")}
                />
              )
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default PartnerRow;
