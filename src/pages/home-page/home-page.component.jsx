import React from "react";
import { Redirect } from "react-router-dom";

// components
import Introduction from "../../components/introduction/introduction.component";
import FavoritesCompanies from "../../components/favorites-companies/favorites-companies.component";

// redux stuff
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice.js";
import { selectSettings } from "../../redux/settings/settingsSlice";
import NewestCompanies from "../../components/newest-companies/newest-companies.component";

function HomePage() {
  const user = useSelector(selectUser);
  const { settings } = useSelector(selectSettings);

  return user ? (
    <div>
      <Introduction />
      {settings.showFavoritesCompanies && <FavoritesCompanies />}
      {settings.showNewestCompanies && <NewestCompanies />}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default HomePage;
