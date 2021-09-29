import React from "react";
import { Redirect } from "react-router-dom";

// components
import Introduction from "../../components/introduction/introduction.component";

// redux stuff
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import {
  getFavoritesItems,
  selectFavoritesItems,
} from "../../redux/advertisements/favoritesItemsSlice";
import {
  getNewestItems,
  selectNewestItems,
} from "../../redux/advertisements/newestItemsSlice";
import {
  getMostOrderedItems,
  selectMostOrderedItems,
} from "../../redux/advertisements/mostOrderedItemsSlice";
import { selectFavoritesCompanies } from "../../redux/advertisements/favoritesCompaniesSlice";
import { selectNewestCompanies } from "../../redux/advertisements/newestCompaniesSlice";
import SectionHomePage from "../../components/section-home-page/section-home-page.component";

function HomePage() {
  const { user } = useSelector(selectUserData);
  const { favoritesCompanies } = useSelector(selectFavoritesCompanies);
  const { newestCompanies } = useSelector(selectNewestCompanies);
  const { favoritesItems } = useSelector(selectFavoritesItems);
  const { newestItems } = useSelector(selectNewestItems);
  const { mostOrderedItems } = useSelector(selectMostOrderedItems);
  const { settings } = useSelector(selectSettings);

  return user ? (
    <div>
      <Introduction />

      {settings.showFavoritesCompanies && favoritesCompanies.length > 0 && (
        <SectionHomePage
          data={favoritesCompanies}
          containerBackground="#1a535c"
          headerFlex={1}
          headerBackground="#083137"
          sliderFlex={2}
          header="favorites-companies"
        />
      )}

      {settings.showNewestCompanies && newestCompanies.length > 0 && (
        <SectionHomePage
          data={newestCompanies}
          containerBackground="#6D597A"
          headerFlex={2}
          headerBackground="#5A4E63"
          sliderFlex={1}
          header="newest-companies"
        />
      )}

      {settings.showFavoritesItems && favoritesItems.length > 0 && (
        <SectionHomePage
          data={favoritesItems}
          containerBackground="#3D5A80"
          headerFlex={1}
          headerBackground="#374569"
          sliderFlex={2}
          header="favorites-items"
          description="favorites-items-paragraph"
          dispatchAction={getFavoritesItems}
          type="item"
        />
      )}

      {settings.showNewestItems && newestItems.length > 0 && (
        <SectionHomePage
          data={newestItems}
          containerBackground="#E56B6F"
          headerFlex={2}
          headerBackground="#B54A58"
          sliderFlex={1}
          header="newest-items"
          description="newest-items-paragraph"
          dispatchAction={getNewestItems}
          type="item"
        />
      )}

      {settings.showMostOrderedItems && mostOrderedItems.length > 0 && (
        <SectionHomePage
          data={mostOrderedItems}
          containerBackground="#ffe66d"
          headerFlex={1}
          headerBackground="#baa437"
          sliderFlex={2}
          header="most-ordered-items"
          description="most-ordered-items-paragraph"
          dispatchAction={getMostOrderedItems}
          type="item"
        />
      )}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default HomePage;
