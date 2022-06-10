import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Logo from "../../logo.png";

// components
import Button from "../button/button.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";

// redux-stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  selectFavoritesPartners,
  removeFavorite,
  selectFavoritesError,
} from "../../redux/favorites/favoritesSlice";
import {
  addCompanyToOurCompanies,
  removeCompanyFromOurCompanies,
  selectUserData,
} from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import {
  resetMedicines,
  setSearchCompanyName,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";
import { setSelectedWarehouse } from "../../redux/warehouse/warehousesSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./partner-card.module.scss";

// constants and utils
import {
  Colors,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants.js";
import Icon from "../action-icon/action-icon.component";
import ButtonWithIcon from "../button-with-icon/button-with-icon.component";

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
  const [changeLinkCompanyToWarehouse, setChangeLinkCompanyToWarehouse] =
    useState(false);

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

  const addCompanyToOurCompaniesHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeLinkCompanyToWarehouse(true);

    dispatch(addCompanyToOurCompanies({ companyId: partner._id, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeLinkCompanyToWarehouse(false);
      })
      .catch(() => {
        setChangeLinkCompanyToWarehouse(false);
      });
  };

  const removeCompanyFromOurCompaniesHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeLinkCompanyToWarehouse(true);

    dispatch(removeCompanyFromOurCompanies({ companyId: partner._id, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeLinkCompanyToWarehouse(false);
      })
      .catch(() => {
        setChangeLinkCompanyToWarehouse(false);
      });
  };

  const partnerCardClickHandler = () => {
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
        dispatch(setSearchCompanyName(partner.name));
      }

      if (partner.type === UserTypeConstants.WAREHOUSE) {
        dispatch(setSearchWarehouseId(partner._id));
      }

      history.push({
        pathname: "/medicines",
        state: { myCompanies: partner.ourCompanies },
      });
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
          src={`${SERVER_URL}/profiles/${partner.logo_url}`}
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

        {user.type === UserTypeConstants.WAREHOUSE &&
        partner.type === UserTypeConstants.COMPANY ? (
          changeLinkCompanyToWarehouse ? (
            <div>
              <Icon
                icon={() => (
                  <VscLoading className={generalStyles.loading} size={20} />
                )}
                onclick={() => {}}
                foreColor={Colors.YELLOW_COLOR}
              />
            </div>
          ) : (
            <div>
              {user.ourCompanies.includes(partner._id) ? (
                <ButtonWithIcon
                  text={t("remove-company-from-warehouse-tooltip")}
                  action={removeCompanyFromOurCompaniesHandler}
                  bgColor={Colors.FAILED_COLOR}
                  icon={() => <FaHandshakeSlash size={20} />}
                />
              ) : (
                <ButtonWithIcon
                  text={t("add-company-to-warehouse-tooltip")}
                  action={addCompanyToOurCompaniesHandler}
                  bgColor={Colors.SUCCEEDED_COLOR}
                  icon={() => <FaHandshake size={20} />}
                />
              )}
            </div>
          )
        ) : (
          <></>
        )}

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
