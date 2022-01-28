import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";

// redux stuff
import { resetStatus, selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavorites,
  selectFavorites,
} from "../../redux/favorites/favoritesSlice";
import { getUnreadNotification } from "../../redux/userNotifications/userNotificationsSlice";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import SideNav from "../../components/side-nav/side-nav.component";
import MedicinesPage from "../medicines-page/medicines-page.component";
import OrdersPage from "../orders-page/orders-page.component";
import OrderDetailsPage from "../order-details-page/order-details-page.component";
import Footer from "../../components/footer/footer.component";
import NotFound from "../not-found/not-found.component";
import ErrorFallback from "../../components/error-fall-back/error-fall-back.component";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";

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
import WarehouseItemsPage from "../warehouse-items-page/warehouse-items-page.component";
import ItemPage from "../item-page/item-page.component";
import ItemExcelPage from "../item-excel-page/item-excel-page.component";
import StatisticsOptionsPage from "../statistics-options-page/statistics-options-page.component";
import StatisticsPage from "../statistics-page/statistics-page.component";
import UserProfilePage from "../user-profile-page/user-profile-page.component";
import AdvertisementsPage from "../advertisements-page/advertisements-page.component";
import AdminNotificationPage from "../admin-notification-page/admin-notification-page.component";
import UserNotificationPage from "../user-notification-page/user-notification-page.component";
import NotificationPage from "../notification-page/notification-page.component";
import HomePage from "../home-page/home-page.component";
import SettingsPage from "../settings-page/settings-page.component";

// style
import styles from "./main-page.module.scss";

// constants
import {
  Colors,
  SERVER_URL,
  SideNavLinks,
  TopNavLinks,
} from "../../utils/constants";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { selectOrders, setUnreadMsg } from "../../redux/orders/ordersSlice";
import Toast from "../../components/toast/toast.component";

// MainPage
// you have to sign in first
function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  // get the user and the token from redux-store-auth
  const { user, token } = useSelector(selectUserData);
  const { status: settingsStatus } = useSelector(selectSettings);
  const { unreadCountDiff, unreadMsg } = useSelector(selectOrders);

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

  // for first render reset the auth status and error
  // get the favorite for login user
  useEffect(() => {
    if (user) {
      dispatch(resetStatus());
      dispatch(getFavorites({ token }));
      dispatch(getUnreadNotification({ token }));
    }

    // show toTop button after scroll more than 500
    const toggleToTopVisible = () => {
      if (window.pageYOffset > 500) {
        setToTopVisible(true);
      } else {
        setToTopVisible(false);
      }
    };

    const timer = setInterval(() => {
      dispatch(getUnreadNotification({ token }));
    }, 60000);

    window.addEventListener("scroll", toggleToTopVisible);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("scroll", toggleToTopVisible);
      clearInterval(timer);
    };
  }, [user]);

  return user ? (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      {settingsStatus === "loading" ? (
        <HomePageLoader />
      ) : (
        <div
          className={styles.container}
          onClick={() => {
            if (!collapsedSideNavOption) setCollapsedSideNavOption(true);
          }}
        >
          <div
            className={styles.background_div}
            style={{
              backgroundImage: `url("${SERVER_URL}/background.png")`,
            }}
          ></div>
          <div className={styles.hamburger_menu}>
            <p className={styles.selectedOption}>
              {t(selectedTopNavOption)}
              {t(selectedSideNavOption)}
            </p>
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
            <Switch>
              <Route exact path="/">
                <HomePage
                  onSelectedChange={() => {
                    setSelectedTopNavOption(TopNavLinks.HOME);
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption("");
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/companies">
                <CompaniesPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption(TopNavLinks.COMPANIES);
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption("");
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/medicines">
                <MedicinesPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption(TopNavLinks.MEDICINES);
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption("");
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route path="/warehouse/items">
                <WarehouseItemsPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption(TopNavLinks.MEDICINES);
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption("");
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/warehouses">
                <WarehousePage
                  onSelectedChange={() => {
                    setSelectedTopNavOption(TopNavLinks.WAREHOUSES);
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption("");
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/item">
                <ItemPage />
              </Route>

              <Route exact path="/items-from-excel">
                <ItemExcelPage />
              </Route>

              <Route exact path="/cart">
                <CartPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption(TopNavLinks.CART);
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption("");
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/orders">
                <OrdersPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.ORDERS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/order-details">
                <OrderDetailsPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.ORDERS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/profile">
                <UserProfilePage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.PROFILE);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/favorites">
                <FavoritesPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption(TopNavLinks.FAVORITES);
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption("");
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/items">
                <ItemsPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.ITEMS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/notifications">
                <UserNotificationPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.NOTIFICATIONS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/notification/:notificationId">
                <NotificationPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.NOTIFICATIONS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/admin/advertisements">
                <AdvertisementsPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.ADVERTISEMENTS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/admin/partners">
                <AdminUsersPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.PARTNERS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/admin/settings">
                <SettingsPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.SETTINGS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/admin/statistics">
                <StatisticsOptionsPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.STATISTICS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/admin/statistics/option">
                <StatisticsPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.STATISTICS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route exact path="/admin/notifications">
                <AdminNotificationPage
                  onSelectedChange={() => {
                    setSelectedTopNavOption("");
                    setCollapsedSideNavOption(true);
                    setSelectedSideNavOption(SideNavLinks.NOTIFICATIONS);
                    setShowTopNav(false);
                  }}
                />
              </Route>

              <Route component={NotFound} />
            </Switch>
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
      )}

      {unreadMsg && (
        <Toast
          bgColor={Colors.BLUE_COLOR}
          foreColor="#fff"
          toastText={`${t("you-have")} ${unreadCountDiff} ${t("orders-msg")}`}
          actionAfterTimeout={() => dispatch(setUnreadMsg())}
        />
      )}
    </ErrorBoundary>
  ) : (
    // direct access to this page without sign in
    // redirect the use to sign in first
    <Redirect to="/signin" />
  );
}

export default MainPage;
