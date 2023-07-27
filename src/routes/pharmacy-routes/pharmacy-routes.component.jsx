import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";
import { SideNavLinks, TopNavLinks } from "../../utils/constants";
import CartPage from "../../pages/cart-page/cart-page.component";

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
const WarehousesPage = lazy(() =>
  import("../../pages/warehouses-page/warehouses-page.component")
);
const OrdersPage = lazy(() =>
  import("../../pages/orders-page/orders-page.component")
);
const OrderDetailsPage = lazy(() =>
  import("../../pages/order-details-page/order-details-page.component")
);
const OffersPage = lazy(() =>
  import("../../pages/offers-page/offers-page.component")
);
const SavedItemsPage = lazy(() =>
  import("../../pages/saved-items-page/saved-items-page.component")
);
const BasketOrderDetailsPage = lazy(() =>
  import(
    "../../pages/basket-order-details-page/basket-order-details-page.component"
  )
);
const SpecialOffersPage = lazy(() =>
  import("../../pages/special-offers-page/special-offers-page.component")
);
const MyPointPage = lazy(() =>
  import("../../pages/my-point-page/my-point-page.component")
);

const ItemsWithPointsPage = lazy(() =>
  import("../../pages/items-with-points-page/items-with-points-page.component")
);

function PharmacyRoutes({ changeOptionHandler }) {
  return (
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

        <Route excat path="/special-offers">
          <SpecialOffersPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: TopNavLinks.SPEACIAL_OFFERS,
                collapsedSideNavOption: true,
                selectedSideNavOption: "",
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/ordered-baskets">
          <OrdersPage
            type="basket"
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.BASKETS,
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

        <Route exact path="/items-with-points">
          <ItemsWithPointsPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: TopNavLinks.ITEMS_WITH_POINTS,
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

        <Route exact path="/my-points">
          <MyPointPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.MY_POINTS,
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

        <Route exact path="/basket-order-details">
          <BasketOrderDetailsPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: SideNavLinks.BASKETS,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/cart">
          <CartPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: TopNavLinks.CART,
                showTopNav: false,
                showSearchBar: false,
              });
            }}
          />
        </Route>

        <Route exact path="/saved-items">
          <SavedItemsPage
            onSelectedChange={() => {
              changeOptionHandler({
                selectedTopNavOption: "",
                collapsedSideNavOption: true,
                selectedSideNavOption: TopNavLinks.SAVEDITEMS,
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
            type="order"
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
  );
}

export default PharmacyRoutes;
