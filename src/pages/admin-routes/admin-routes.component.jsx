import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { SideNavLinks, TopNavLinks } from "../../utils/constants";

import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";

const CartPage = lazy(() => import("../cart-page/cart-page.component"));
const AdminUsersPage = lazy(() =>
  import("../admin-users-page/admin-users-page.component")
);
const FavoritesPage = lazy(() =>
  import("../favorites-page/favorites-page.component")
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
const WarehousesPage = lazy(() =>
  import("../../pages/warehouses-page/warehouses-page.component")
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
const OrdersPage = lazy(() => import("../orders-page/orders-page.component"));
const OrderDetailsPage = lazy(() =>
  import("../order-details-page/order-details-page.component")
);
const NotFound = lazy(() => import("../not-found/not-found.component"));
const BackupRestorePage = lazy(() =>
  import("../backup-restore-page/backup-restore-page.component")
);
const OffersPage = lazy(() => import("../offers-page/offers-page.component"));

function AdminRoutes({ changeOptionHandler }) {
  return (
    <>
      <Suspense fallback={<HomePageLoader />}></Suspense>
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

        <Route exact path="/offers">
          <OffersPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: TopNavLinks.OFFERS,
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

        <Route exact path="/items-from-excel">
          <ItemExcelPage />
        </Route>

        <Route exact path="/cart">
          <CartPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: TopNavLinks.CART,
                collapsedSideNavOption: true,
                selectedSideNavOption: "",
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

        <Route exact path="/admin/advertisements">
          <AdvertisementsPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.ADVERTISEMENTS,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/admin/partners">
          <AdminUsersPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.PARTNERS,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/admin/settings">
          <SettingsPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.SETTINGS,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/admin/statistics">
          <StatisticsOptionsPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.STATISTICS,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/admin/statistics/option">
          <StatisticsPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.STATISTICS,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/admin/notifications">
          <AdminNotificationPage
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

        <Route exact path="/admin/backup-restore">
          <BackupRestorePage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.BACKUP_RESTORE,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default AdminRoutes;
