import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseCompanyModal from "../choose-company-modal/choose-company-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";
import {
  removeFromFavoritesCompanies,
  selectFavoritesCompanies,
} from "../../redux/advertisements/favoritesCompaniesSlice";
import AdvertisementFavoriteRow from "../advertisement-favorite-row/advertisement-favorite-row.component";

function FavoritesCompanies() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const { favoritesCompanies } = useSelector(selectFavoritesCompanies);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const dispatchFavoriteCompanyStatus = (id) => {
    dispatch(removeFromFavoritesCompanies({ userId: id, token }));
  };

  return (
    <>
      <CardInfo headerTitle={t("favorites-companies")}>
        <div>
          {favoritesCompanies.map((company) => (
            <AdvertisementFavoriteRow
              data={company}
              key={company._id}
              tooltip="remove-company-from-favorites-advertisement"
              action={dispatchFavoriteCompanyStatus}
            />
          ))}

          <div className={generalStyles.padding_v_6}>
            <Button
              text="add-label"
              action={() => {
                setShowChooseModal(true);
              }}
              bgColor={Colors.SUCCEEDED_COLOR}
            />
          </div>
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
