import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";

// components
import CompanyRow from "../../components/favorite-row/favorite-row.component";

// constants
import { UserTypeConstants } from "../../utils/constants.js";
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";

function FavoritesPage() {
  const { t } = useTranslation();
  const favorites = useSelector(selectFavorites);

  return (
    <div>
      <Header>
        <h2>{t("favorites")}</h2>
      </Header>
      <CardInfo headerTitle={t("companies")}>
        {favorites
          .filter((favorite) => favorite.type === UserTypeConstants.COMPANY)
          .map((favorite) => (
            <CompanyRow key={favorite._id} user={favorite} />
          ))}
      </CardInfo>
      <CardInfo headerTitle={t("warehouses")}>
        {favorites
          .filter((favorite) => favorite.type === UserTypeConstants.WAREHOUSE)
          .map((favorite) => (
            <CompanyRow key={favorite._id} user={favorite} />
          ))}
      </CardInfo>
    </div>
  );
}

export default FavoritesPage;
