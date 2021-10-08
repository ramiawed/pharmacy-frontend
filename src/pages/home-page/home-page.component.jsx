import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// components
import Introduction from "../../components/introduction/introduction.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getAllSettings,
  selectSettings,
} from "../../redux/settings/settingsSlice";
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
import {
  getFavoritesCompanies,
  selectFavoritesCompanies,
} from "../../redux/advertisements/favoritesCompaniesSlice";
import {
  getNewestCompanies,
  selectNewestCompanies,
} from "../../redux/advertisements/newestCompaniesSlice";
import SectionHomePage from "../../components/section-home-page/section-home-page.component";

function HomePage() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectUserData);
  const { favoritesCompanies } = useSelector(selectFavoritesCompanies);
  const { newestCompanies } = useSelector(selectNewestCompanies);
  const { favoritesItems } = useSelector(selectFavoritesItems);
  const { newestItems } = useSelector(selectNewestItems);
  const { mostOrderedItems } = useSelector(selectMostOrderedItems);
  const { settings } = useSelector(selectSettings);

  useEffect(() => {
    dispatch(getAllSettings({ token }));
    dispatch(getFavoritesCompanies({ token }));
    dispatch(getNewestCompanies({ token }));
    dispatch(getFavoritesItems({ token }));
    dispatch(getNewestItems({ token }));
    dispatch(getMostOrderedItems({ token }));
  }, []);

  return user ? (
    <div>
      <Introduction />

      {settings.showFavoritesCompanies && (
        <SectionHomePage
          data={favoritesCompanies}
          containerBackground="#1a535c"
          headerFlex={1}
          headerBackground="#083137"
          sliderFlex={2}
          header="favorites-companies"
        />
      )}

      {settings.showNewestCompanies && (
        <SectionHomePage
          data={newestCompanies}
          containerBackground="#6D597A"
          headerFlex={2}
          headerBackground="#5A4E63"
          sliderFlex={1}
          header="newest-companies"
        />
      )}

      {settings.showFavoritesItems && (
        <SectionHomePage
          data={favoritesItems}
          containerBackground="#3D5A80"
          headerFlex={1}
          headerBackground="#374569"
          sliderFlex={2}
          header="favorites-items"
          description="favorites-items-paragraph"
          type="item"
        />
      )}

      {settings.showNewestItems && (
        <SectionHomePage
          data={newestItems}
          containerBackground="#E56B6F"
          headerFlex={2}
          headerBackground="#B54A58"
          sliderFlex={1}
          header="newest-items"
          description="newest-items-paragraph"
          type="item"
        />
      )}

      {settings.showMostOrderedItems && (
        <SectionHomePage
          data={mostOrderedItems}
          containerBackground="#ffe66d"
          headerFlex={1}
          headerBackground="#baa437"
          sliderFlex={2}
          header="most-ordered-items"
          description="most-ordered-items-paragraph"
          type="item"
        />
      )}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default HomePage;
