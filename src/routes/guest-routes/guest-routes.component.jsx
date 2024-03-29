import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// components
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";

//constants
import { SideNavLinks, TopNavLinks } from "../../utils/constants";

// lazy components
const CompaniesPage = lazy(() =>
  import("../../pages/companies-page/companies-page.component")
);
const FavoritesPage = lazy(() =>
  import("../../pages/favorites-page/favorites-page.component")
);
const HomePage = lazy(() =>
  import("../../pages/home-page/home-page.component")
);
const ItemPage = lazy(() =>
  import("../../pages/item-page/item-page.component")
);
const ItemsPage = lazy(() =>
  import("../../pages/items-page/items-page.component")
);
const MedicinesPage = lazy(() =>
  import("../../pages/medicines-page/medicines-page.component")
);
const NotFound = lazy(() =>
  import("../../pages/not-found/not-found.component")
);
const NotificationPage = lazy(() =>
  import("../../pages/notification-page/notification-page.component")
);
const UserNotificationPage = lazy(() =>
  import("../../pages/user-notification-page/user-notification-page.component")
);
const UserProfilePage = lazy(() =>
  import("../../pages/user-profile-page/user-profile-page.component")
);

function GuestRoutes({ changeOptionHandler }) {
  return (
    <>
      <Suspense fallback={<HomePageLoader />}>
        <Switch>
          <Route exact path="/">
            <HomePage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: TopNavLinks.HOME,
                  collapsedSideNavOption: true,
                  selectedSideNavOption: "",
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/companies">
            <CompaniesPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: TopNavLinks.COMPANIES,
                  collapsedSideNavOption: true,
                  selectedSideNavOption: "",
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/medicines">
            <MedicinesPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: TopNavLinks.MEDICINES,
                  collapsedSideNavOption: true,
                  selectedSideNavOption: "",
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/item">
            <ItemPage />
          </Route>

          <Route exact path="/profile">
            <UserProfilePage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: "",
                  collapsedSideNavOption: true,
                  selectedSideNavOption: SideNavLinks.PROFILE,
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/favorites">
            <FavoritesPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: TopNavLinks.FAVORITES,
                  collapsedSideNavOption: true,
                  selectedSideNavOption: "",
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/items">
            <ItemsPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: "",
                  collapsedSideNavOption: true,
                  selectedSideNavOption: SideNavLinks.ITEMS,
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/notifications">
            <UserNotificationPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: "",
                  collapsedSideNavOption: true,
                  selectedSideNavOption: SideNavLinks.NOTIFICATIONS,
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/notification/:notificationId">
            <NotificationPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: "",
                  collapsedSideNavOption: true,
                  selectedSideNavOption: SideNavLinks.NOTIFICATIONS,
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default GuestRoutes;
