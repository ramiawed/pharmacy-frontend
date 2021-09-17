import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { useTranslation } from "react-i18next";

// redux stuff
import { resetStatus, selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorites/favoritesSlice";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import SideNav from "../../components/side-nav/side-nav.component";

// react-icons
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowAltCircleUp } from "react-icons/fa";

// pages
import CompaniesPage from "../companies-page/companies-page.component";
import CartPage from "../cart-page/cart-page.component";
import AdminUsersPage from "../admin-users-page/admin-users-page.component";
import FavoritesPage from "../favorites-page/favorites-page.component";
import WarehousePage from "../warehouses-page/warehouses-page.component";
import ItemsPage from "../items-page/items-page.component";
import ItemsByCompanyPage from "../items-by-company-page/items-by-company-page.component";
import WarehouseItemsPage from "../warehouse-items-page/warehouse-items-page.component";
import ItemPage from "../item-page/item-page.component";
import ItemExcelPage from "../item-excel-page/item-excel-page.component";
import StatisticsOptionsPage from "../statistics-options-page/statistics-options-page.component";
import StatisticsPage from "../statistics-page/statistics-page.component";
import UserProfilePage from "../user-profile-page/user-profile-page.component";
import Footer from "../../components/footer/footer.component";

// style
import styles from "./main-page.module.scss";

// constants
import { TopNavLinks } from "../../utils/constants";
import HomePage from "../home-page/home-page.component";
import SettingsPage from "../settings-page/settings-page.component";

// MainPage
// you have to sign in first
function MainPage() {
  const { t } = useTranslation();

  // state uses in the TopNav component
  const [selectedTopNavOption, setSelectedTopNavOption] = useState(
    TopNavLinks.HOME
  );

  const [toTopVisible, setToTopVisible] = useState(false);
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

    // show toTop button after scroll more than 500
    const toggleToTopVisible = () => {
      if (window.pageYOffset > 500) {
        setToTopVisible(true);
      } else {
        setToTopVisible(false);
      }
    };

    window.addEventListener("scroll", toggleToTopVisible);

    return () => window.removeEventListener("scroll", toggleToTopVisible);
  }, [user]);

  return user ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
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
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/companies">
          <CompaniesPage />
        </Route>

        <Route path="/companies/:companyId">
          <ItemsByCompanyPage />
        </Route>

        <Route path="/warehouse/items">
          <WarehouseItemsPage />
        </Route>

        <Route exact path="/warehouses">
          <WarehousePage />
        </Route>

        <Route exact path="/item">
          <ItemPage />
        </Route>

        <Route exact path="/items-from-excel">
          <ItemExcelPage />
        </Route>

        <Route exact path="/cart">
          <CartPage />
        </Route>

        <Route exact path="/profile">
          <UserProfilePage />
        </Route>

        <Route exact path="/favorites">
          <FavoritesPage />
        </Route>

        <Route exact path="/items">
          <ItemsPage />
        </Route>

        <Route exact path="/admin/partners">
          <AdminUsersPage />
        </Route>

        <Route exact path="/admin/settings">
          <SettingsPage />
        </Route>

        <Route exact path="/admin/statistics">
          <StatisticsOptionsPage />
        </Route>

        <Route exact path="/admin/statistics/option">
          <StatisticsPage />
        </Route>
      </div>

      <Footer />

      {toTopVisible && (
        <FaArrowAltCircleUp
          className={styles.toTop}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      )}
    </div>
  ) : (
    // direct access to this page without sign in
    // redirect the use to sign in first
    <Redirect to="/signin" />
  );
}

export default MainPage;
