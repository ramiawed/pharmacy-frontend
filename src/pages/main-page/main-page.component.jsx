import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";

// redux stuff
import { resetStatus, selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorites/favoritesSlice";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import SideNav from "../../components/side-nav/side-nav.component";

// react-icons
import { GiHamburgerMenu } from "react-icons/gi";

// pages
import CompaniesPage from "../companies-page/companies-page.component";
import CartPage from "../cart-page/cart-page.component";
import AdminUsers from "../../components/admin-users/admin-users.component";
import UserProfile from "../../components/user-profile/user-profile.component";

// style
import styles from "./main-page.module.scss";

// constants
import { TopNavLinks, UserTypeConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import WarehousePage from "../warehouses-page/warehouses-page.component";
import FavoritesPage from "../favorites-page/favorites-page.component";

// MainPage
// you have to sign in first
function MainPage() {
  const { t } = useTranslation();

  // state uses in the TopNav component
  const [selectedTopNavOption, setSelectedTopNavOption] = useState(
    TopNavLinks.HOME
  );
  // state to toggle show, hide TopNav
  const [showTopNav, setShowTopNav] = useState(false);

  // state uses in the SideNav component
  const [selectedSideNavOption, setSelectedSideNavOption] = useState("");
  const [collapsedSideNavOption, setCollapsedSideNavOption] = useState(true);

  // get the user and the token from redux-store-auth
  const { user, token } = useSelector(selectUserData);

  const dispatch = useDispatch();

  // for first render reset the auth status and error
  // get the favorite for login user
  useEffect(() => {
    if (user) {
      dispatch(resetStatus());
      dispatch(getFavorites({ token }));
    }
  }, []);

  return user ? (
    <div>
      <div className={styles.hamburger_menu}>
        <p className={styles.selectedOption}>{t(selectedTopNavOption)}</p>
        <GiHamburgerMenu
          color="white"
          size={32}
          style={{
            padding: "4px",
          }}
          onClick={() => {
            setShowTopNav(!showTopNav);
            setCollapsedSideNavOption(true);
          }}
        />
      </div>

      <TopNav
        selectedOption={selectedTopNavOption}
        onSelectedChange={(val) => {
          setSelectedTopNavOption(val);
          setCollapsedSideNavOption(true);
          setSelectedSideNavOption("");
          setShowTopNav(false);
        }}
        showTopNav={showTopNav}
      />
      <SideNav
        collapsed={collapsedSideNavOption}
        onCollapsedChange={() => {
          setCollapsedSideNavOption(!collapsedSideNavOption);
          setShowTopNav(false);
        }}
        selectedOption={selectedSideNavOption}
        onSelectedChange={(val) => {
          setSelectedSideNavOption(val);
          setSelectedTopNavOption("");
          setCollapsedSideNavOption(true);
        }}
      />

      <div className={styles.content_area}>
        <Route path="/companies">
          <CompaniesPage />
        </Route>

        <Route path="/warehouses">
          <WarehousePage />
        </Route>

        <Route path="/cart">
          <CartPage />
        </Route>

        <Route path="/profile">
          <UserProfile />
        </Route>

        <Route path="/favorites">
          <FavoritesPage />
        </Route>

        <Route path="/admin/partners">
          <AdminUsers />
        </Route>
      </div>
    </div>
  ) : (
    // direct access to this page without sign in
    // redirect the use to sign in first
    <Redirect to="/signin" />
  );
}

export default MainPage;
