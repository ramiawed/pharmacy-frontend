// this page display the favorite companies, warehouses, items
// depends on the favoritesSlice

// favoritesSlice contains
// 1- favorites
// 2- favorites_items

import React from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";
import {
  selectFavoritesPartners,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import { selectUser } from "../../redux/auth/authSlice";

// components
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";
import FavoriteRow from "../../components/favorite-row/favorite-row.component";
import FavoriteItemRow from "../../components/favorite-item-row/favorite-item-row.component";

// constants
import { UserTypeConstants } from "../../utils/constants.js";

function FavoritesPage() {
  const { t } = useTranslation();

  // get the logged user
  const user = useSelector(selectUser);

  // get the favorites partners and favorites items from favoritesSlice
  const favoritesPartners = useSelector(selectFavoritesPartners);
  const favoritesItems = useSelector(selectFavoritesItems);

  return user ? (
    <>
      <Header>
        <h2>{t("favorites")}</h2>
      </Header>

      {/* favorite companies */}
      <CardInfo headerTitle={t("companies")}>
        {favoritesPartners
          .filter((favorite) => favorite.type === UserTypeConstants.COMPANY)
          .map((favorite) => (
            <FavoriteRow
              key={favorite._id}
              user={favorite}
              withoutBoxShadow={true}
            />
          ))}
      </CardInfo>

      {/* favorites warehouses */}
      <CardInfo headerTitle={t("warehouses")}>
        {favoritesPartners
          .filter((favorite) => favorite.type === UserTypeConstants.WAREHOUSE)
          .map((favorite) => (
            <FavoriteRow
              key={favorite._id}
              user={favorite}
              withoutBoxShadow={true}
            />
          ))}
      </CardInfo>

      {/* favorites items */}
      <CardInfo headerTitle={t("nav-items")}>
        {favoritesItems.map((item) => (
          <FavoriteItemRow key={item._id} item={item} withoutBoxShadow={true} />
        ))}
      </CardInfo>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default FavoritesPage;
