import React from "react";
import { useTranslation } from "react-i18next";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";

// components
import Icon from "../action-icon/action-icon.component";

// redux-stuff
import { useSelector } from "react-redux";
import {
  selectFavoritesPartners,
  selectFavoritesError,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";

import { selectSettings } from "../../redux/settings/settingsSlice";

// styles
import rowStyles from "../row.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";

function PartnerRow({
  partner,
  isSearch,
  withoutBoxShadow,
  onSelectAction,
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
    <>
      <div
        className={[
          isSearch ? rowStyles.search_container : rowStyles.container,
          withoutBoxShadow ? rowStyles.without_box_shadow : "",
        ].join(" ")}
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          if (onSelectAction) onSelectAction();
          partnerRowClickHandler(allowShowingWarehouseMedicines);
        }}
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {user.type === UserTypeConstants.WAREHOUSE &&
          partner.type === UserTypeConstants.COMPANY ? (
            <div>
              {user.ourCompanies.includes(partner._id) ? (
                <Icon
                  icon={() => <FaHandshakeSlash size={24} />}
                  onclick={removeCompanyFromOurCompaniesHandler}
                  foreColor={Colors.FAILED_COLOR}
                  tooltip={t("remove-company-from-warehouse-tooltip")}
                />
              ) : (
                <Icon
                  icon={() => <FaHandshake size={24} />}
                  onclick={addCompanyToOurCompaniesHandler}
                  foreColor={Colors.SUCCEEDED_COLOR}
                  tooltip={t("add-company-to-warehouse-tooltip")}
                />
              )}
            </div>
          ) : (
            <></>
          )}

          <div>
            {favoritesError === "" ? (
              favorites &&
              favorites
                .map((favorite) => favorite._id)
                .includes(partner._id) ? (
                <Icon
                  icon={() => <AiFillStar size={24} />}
                  onclick={removePartnerFromFavoriteHandler}
                  foreColor={Colors.YELLOW_COLOR}
                  tooltip={t("remove-from-favorite-tooltip")}
                />
              ) : (
                <Icon
                  icon={() => <AiOutlineStar size={24} />}
                  onclick={addPartnerToFavoriteHandler}
                  foreColor={Colors.YELLOW_COLOR}
                  tooltip={t("add-to-favorite-tooltip")}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default PartnerRow;
