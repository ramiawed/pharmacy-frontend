import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseCompanyModal from "../choose-company-modal/choose-company-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  selectAdvertisements,
  changeFavoriteCompanyStatus,
} from "../../redux/advertisements/advertisementsSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function FavoritesCompanies() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const { favoritesCompanies } = useSelector(selectAdvertisements);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const dispatchFavoriteCompanyStatus = (id) => {
    dispatch(changeFavoriteCompanyStatus({ userId: id, option: true, token }));
  };

  return (
    <>
      <CardInfo headerTitle={t("favorites-companies")}>
        {favoritesCompanies?.length}
        <div
          className={[
            generalStyles.flex_center_container,
            generalStyles.padding_v_6,
          ].join(" ")}
        >
          <Button
            text="add-label"
            action={() => {
              setShowChooseModal(true);
            }}
            bgColor={Colors.SUCCEEDED_COLOR}
          />
        </div>
      </CardInfo>

      {showChooseModal && (
        <ChooseCompanyModal
          close={() => setShowChooseModal(false)}
          chooseAction={dispatchFavoriteCompanyStatus}
          url={`${BASEURL}/users?limit=40&page=1&isActive=true&type=company&isFavorite=false`}
        />
      )}
    </>
  );
}

export default FavoritesCompanies;
