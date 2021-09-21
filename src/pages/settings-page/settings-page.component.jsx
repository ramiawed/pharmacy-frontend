import React from "react";

// components
import FavoritesCompanies from "../../components/favorites-companies/favorites-companies.component";
import FavoritesItems from "../../components/favorites-items/favorites-items.component";
import MostOrderItems from "../../components/most-order-items/most-order-items.component";
import NewestCompanies from "../../components/newest-companies/newest-companies.component";
import NewestItems from "../../components/newest-items/newest-items.component";

function SettingsPage() {
  return (
    <>
      <FavoritesCompanies />
      <NewestCompanies />
      <FavoritesItems />
      <NewestItems />
      <MostOrderItems />
    </>
  );
}

export default SettingsPage;
