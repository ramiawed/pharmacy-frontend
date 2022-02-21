import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { Redirect, Route } from "react-router";
import { Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";

// redux stuff
import { resetStatus, selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorites/favoritesSlice";
import { getUnreadNotification } from "../../redux/userNotifications/userNotificationsSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import SideNav from "../../components/side-nav/side-nav.component";

import OrdersPage from "../orders-page/orders-page.component";
import OrderDetailsPage from "../order-details-page/order-details-page.component";
import Footer from "../../components/footer/footer.component";
import NotFound from "../not-found/not-found.component";
import ErrorFallback from "../../components/error-fall-back/error-fall-back.component";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";
import SocketObserver from "../../components/socket-orbserver/socket-observer.component";

// react-icons
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowAltCircleUp } from "react-icons/fa";

// style
import styles from "./main-page.module.scss";

// constants
import {
  SERVER_URL,
  SideNavLinks,
  TopNavLinks,
  UserTypeConstants,
} from "../../utils/constants";
import { getUnreadOrders } from "../../redux/orders/ordersSlice";

// pages
const CartPage = lazy(() => import("../cart-page/cart-page.component"));
const AdminUsersPage = lazy(() =>
  import("../admin-users-page/admin-users-page.component")
);
const FavoritesPage = lazy(() =>
  import("../favorites-page/favorites-page.component")
);
const WarehousePage = lazy(() =>
  import("../warehouses-page/warehouses-page.component")
);
const ItemsPage = lazy(() => import("../items-page/items-page.component"));

const ItemPage = lazy(() => import("../item-page/item-page.component"));
const ItemExcelPage = lazy(() =>
  import("../item-excel-page/item-excel-page.component")
);
const StatisticsOptionsPage = lazy(() =>
  import("../statistics-options-page/statistics-options-page.component")
);
const StatisticsPage = lazy(() =>
  import("../statistics-page/statistics-page.component")
);
const UserProfilePage = lazy(() =>
  import("../user-profile-page/user-profile-page.component")
);
const AdvertisementsPage = lazy(() =>
  import("../advertisements-page/advertisements-page.component")
);
const AdminNotificationPage = lazy(() =>
  import("../admin-notification-page/admin-notification-page.component")
);
const UserNotificationPage = lazy(() =>
  import("../user-notification-page/user-notification-page.component")
);

const HomePage = lazy(() => import("../home-page/home-page.component"));
const CompaniesPage = lazy(() =>
  import("../companies-page/companies-page.component")
);
const MedicinesPage = lazy(() =>
  import("../medicines-page/medicines-page.component")
);
const NotificationPage = lazy(() =>
  import("../notification-page/notification-page.component")
);
const SettingsPage = lazy(() =>
  import("../settings-page/settings-page.component")
);
// MainPage
// you have to sign in first
function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  // get the user and the token from redux-store-auth
  const { user, token } = useSelector(selectUserData);
  const { status: settingsStatus } = useSelector(selectSettings);
  const [loading, setLoading] = useState(true);

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

  const dispatchProperties = useCallback(() => {
    if (user) {
      dispatch(resetStatus());
      dispatch(getFavorites({ token }));
      dispatch(getUnreadNotification({ token }));
      if (
        user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.WAREHOUSE
      ) {
        dispatch(getUnreadOrders({ token }));
      }
    }
  }, [dispatch, token, user]);

  // for first render reset the auth status and error
  // get the favorite for login user
  useEffect(() => {
    dispatchProperties();

    // show toTop button after scroll more than 500
    const toggleToTopVisible = () => {
      if (window.pageYOffset > 500) {
        setToTopVisible(true);
      } else {
        setToTopVisible(false);
      }
    };

    setTimeout(() => {
      setLoading(false);
    }, 4000);

    window.addEventListener("scroll", toggleToTopVisible);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("scroll", toggleToTopVisible);
    };
  }, [dispatchProperties]);

  return user ? (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      {settingsStatus === "loading" || loading ? (
        <HomePageLoader />
      ) : (
        <>
          <SocketObserver />
          <div
            className={styles.container}
            onClick={() => {
              if (!collapsedSideNavOption) setCollapsedSideNavOption(true);
            }}
          >
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
              <Suspense fallback={<div>...loading</div>}>
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
              </Suspense>
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
        </>
      )}
    </ErrorBoundary>
  ) : (
    // direct access to this page without sign in
    // redirect the use to sign in first
    <Redirect to="/signin" />
  );
}

export default MainPage;
