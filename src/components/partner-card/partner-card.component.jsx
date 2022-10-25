import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../logo.png";

// components
import Button from "../button/button.component";
import ButtonWithIcon from "../button-with-icon/button-with-icon.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";

// redux-stuff
import { useSelector } from "react-redux";
import {
  selectFavoritesPartners,
  selectFavoritesError,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";

import { selectSettings } from "../../redux/settings/settingsSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./partner-card.module.scss";

// constants and utils
import {
  Colors,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants.js";

function PartnerCard({
  partner,
  addPartnerToFavoriteHandler,
  addCompanyToOurCompaniesHandler,
  removePartnerFromFavoriteHandler,
  removeCompanyFromOurCompaniesHandler,
  partnerRowClickHandler,
}) {
  const { t } = useTranslation();

  // selectors
  const {
    settings: { showWarehouseItem },
  } = useSelector(selectSettings);
  const favorites = useSelector(selectFavoritesPartners);
  const favoritesError = useSelector(selectFavoritesError);
  const { user } = useSelector(selectUserData);

  // determine if the partner can see the medicines in specific warehouse
  const allowShowingWarehouseMedicines =
    user.type === UserTypeConstants.ADMIN ||
    partner.type === UserTypeConstants.COMPANY ||
    (partner.type === UserTypeConstants.WAREHOUSE &&
      showWarehouseItem &&
      partner.allowShowingMedicines);

  return (
    <div className={[styles.partner_container].join(" ")}>
      <p className={[styles.partner_name, styles.section].join(" ")}>
        {partner.name}
      </p>

      <div className={styles.section}>
        {partner.logo_url?.length > 0 ? (
          <img
            src={`${SERVER_URL}/profiles/${partner.logo_url}`}
            className={[styles.partner_logo, styles.section].join(" ")}
            alt="thumb"
          />
        ) : (
          <img
            src={Logo}
            className={[styles.partner_logo, styles.section].join(" ")}
            alt="thumb"
          />
        )}
      </div>

      <div className={styles.from_top}>
        {favoritesError === "" ? (
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
        ) : null}

        {user.type === UserTypeConstants.WAREHOUSE &&
        partner.type === UserTypeConstants.COMPANY ? (
          <div>
            {user.ourCompanies.includes(partner._id) ? (
              <ButtonWithIcon
                text={t("remove-company-from-warehouse-tooltip")}
                action={removeCompanyFromOurCompaniesHandler}
                bgColor={Colors.FAILED_COLOR}
                icon={() => <FaHandshakeSlash size={24} />}
              />
            ) : (
              <ButtonWithIcon
                text={t("add-company-to-warehouse-tooltip")}
                action={addCompanyToOurCompaniesHandler}
                bgColor={Colors.SUCCEEDED_COLOR}
                icon={() => <FaHandshake size={24} />}
              />
            )}
          </div>
        ) : (
          <></>
        )}

        {(partner.type === UserTypeConstants.COMPANY ||
          (partner.type === UserTypeConstants.WAREHOUSE &&
            user.type !== UserTypeConstants.WAREHOUSE)) && (
          <div>
            <Button
              action={() =>
                partnerRowClickHandler(allowShowingWarehouseMedicines)
              }
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
