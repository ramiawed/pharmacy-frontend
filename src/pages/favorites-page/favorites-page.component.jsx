import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import {
  selectFavoritesPartners,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";

// components
import FavoriteRow from "../../components/favorite-row/favorite-row.component";

// constants
import { UserTypeConstants } from "../../utils/constants.js";
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";
import FavoriteItemRow from "../../components/favorite-item-row/favorite-item-row.component";

function FavoritesPage() {
  const { t } = useTranslation();
  const favorites = useSelector(selectFavoritesPartners);
  const favoritesItems = useSelector(selectFavoritesItems);

  return (
    <div>
      <Header>
        <h2>{t("favorites")}</h2>
      </Header>

      <CardInfo headerTitle={t("companies")}>
        {favorites
          .filter((favorite) => favorite.type === UserTypeConstants.COMPANY)
          .map((favorite) => (
            <FavoriteRow key={favorite._id} user={favorite} />
          ))}
      </CardInfo>

      <CardInfo headerTitle={t("warehouses")}>
        {favorites
          .filter((favorite) => favorite.type === UserTypeConstants.WAREHOUSE)
          .map((favorite) => (
            <FavoriteRow key={favorite._id} user={favorite} />
          ))}
      </CardInfo>

      <CardInfo headerTitle={t("nav-items")}>
        {favoritesItems.map((item) => (
          <FavoriteItemRow key={item._id} item={item} />
        ))}
      </CardInfo>
    </div>
  );
}

export default FavoritesPage;
