import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";
import { SideNavLinks, TopNavLinks } from "../../utils/constants";

const CompaniesPage = lazy(() =>
  import("../companies-page/companies-page.component")
);
const FavoritesPage = lazy(() =>
  import("../favorites-page/favorites-page.component")
);
const HomePage = lazy(() => import("../home-page/home-page.component"));
const ItemPage = lazy(() => import("../item-page/item-page.component"));
const ItemsPage = lazy(() => import("../items-page/items-page.component"));
const MedicinesPage = lazy(() =>
  import("../medicines-page/medicines-page.component")
);
const NotFound = lazy(() => import("../not-found/not-found.component"));
const NotificationPage = lazy(() =>
  import("../notification-page/notification-page.component")
);
const UserNotificationPage = lazy(() =>
  import("../user-notification-page/user-notification-page.component")
);
const UserProfilePage = lazy(() =>
  import("../user-profile-page/user-profile-page.component")
);
const WarehousesPage = lazy(() =>
  import("../warehouses-page/warehouses-page.component")
);
const OrdersPage = lazy(() => import("../orders-page/orders-page.component"));
const OrderDetailsPage = lazy(() =>
  import("../order-details-page/order-details-page.component")
);

function PharmacyRoutes({ changeOptionHandler }) {
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

          <Route exact path="/warehouses">
            <WarehousesPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: TopNavLinks.WAREHOUSES,
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

          <Route exact path="/orders">
            <OrdersPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: "",
                  collapsedSideNavOption: true,
                  selectedSideNavOption: SideNavLinks.ORDERS,
                  showTopNav: false,
                  showSearchBar: false,
                });
              }}
            />
          </Route>

          <Route exact path="/order-details">
            <OrderDetailsPage
              onSelectedChange={() => {
                changeOptionHandler({
                  selectedTopNavOption: "",
                  collapsedSideNavOption: true,
                  selectedSideNavOption: SideNavLinks.ORDERS,
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

export default PharmacyRoutes;
