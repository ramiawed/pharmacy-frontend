import React from "react";
import { useTranslation } from "react-i18next";
import CardInfo from "../card-info/card-info.component";

function FavoritesItems() {
  const { t } = useTranslation();

  return <CardInfo headerTitle={t("favorites-items")} />;
}

export default FavoritesItems;
