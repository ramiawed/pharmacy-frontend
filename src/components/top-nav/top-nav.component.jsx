import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

// components
import FilterItemsModal from "../../modals/filter-items-modal/filter-items-modal.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { selectCartItemCount } from "../../redux/cart/cartSlice";
import { selectUserNotifications } from "../../redux/userNotifications/userNotificationsSlice";
import {
  changeNavSettings,
  selectNavigationSlice,
} from "../../redux/navs/navigationSlice";
import {
  resetMedicines,
  resetMedicinesArray,
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";

// components
import Icon from "../icon/icon.component";

// icons
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

// style
import styles from "./top-nav.module.scss";

// constants
import { TopNavLinks, UserTypeConstants } from "../../utils/constants.js";

function TopNav({ onSelectedChange }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { unReadNotificationCount } = useSelector(selectUserNotifications);
  const {
    setting: { showTopNav, selectedTopNavOption, selectedSideNavOption },
  } = useSelector(selectNavigationSlice);
  const allFavorites = useSelector(selectFavorites);
  const user = useSelector(selectUser);
  const total = useSelector(selectCartItemCount);

  const changeNavigationSettingHandler = (obj) => {
    dispatch(changeNavSettings(obj));
  };

  // own state
  const [showTopSearchBar, setShowTopSearchBar] = useState(false);

  return (
    <>
      <div className={[styles.nav].join(" ")}>
        <div className={styles.left}>
          <p className={styles.selectedOption}>
            {t(selectedTopNavOption)}
            {t(selectedSideNavOption)}
          </p>

          <FiSearch
            className={styles.search_icon}
            size={24}
            onClick={() => {
              setShowTopSearchBar(true);
            }}
          />

          <Link
            to="/favorites"
            className={[
              styles.link,
              history.location.pathname === "/favorites"
                ? styles.selected
                : null,
            ].join(" ")}
            onClick={() => {
              onSelectedChange(TopNavLinks.FAVORITES);
              dispatch(setSearchWarehouseId(null));
              dispatch(setSearchCompanyId(null));
            }}
          >
            <Icon
              icon={() => <AiFillStar size={24} />}
              tooltip={t("favorites")}
              withAlertIcon={
                allFavorites.favorites_partners.length +
                  allFavorites.favorites_items.length >
                0
              }
              closeToIcon={true}
            />
          </Link>

          {user.type !== UserTypeConstants.ADMIN && (
            <Link
              to="/notifications"
              className={[
                styles.link,
                history.location.pathname === "/notifications"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => {
                onSelectedChange(TopNavLinks.NOTIFICATIONS);
                dispatch(setSearchWarehouseId(null));
                dispatch(setSearchCompanyId(null));
              }}
            >
              <Icon
                icon={() => <IoMdNotifications size={24} />}
                tooltip={t("nav-notifications")}
                withAlertIcon={unReadNotificationCount > 0}
                closeToIcon={true}
              />
            </Link>
          )}

          {user.type === UserTypeConstants.PHARMACY && (
            <Link
              to="/cart"
              className={[
                styles.link,
                history.location.pathname === "/cart" ? styles.selected : null,
              ].join(" ")}
              onClick={() => {
                onSelectedChange(TopNavLinks.CART);
                dispatch(setSearchWarehouseId(null));
                dispatch(setSearchCompanyId(null));
              }}
            >
              <Icon
                icon={() => <GiShoppingCart size={24} />}
                tooltip={t("cart")}
                withAlertIcon={total > 0}
                closeToIcon={true}
              />
            </Link>
          )}

          <GiHamburgerMenu
            color="white"
            size={24}
            onClick={(e) => {
              changeNavigationSettingHandler({
                collapsedSideNavOption: true,
                showTopNav: !showTopNav,
                showSearchBar: false,
              });

              e.stopPropagation();
            }}
            className={styles.hamburger_menu_icon}
          />
        </div>

        <div
          className={[styles.center, !showTopNav ? styles.hide : ""].join(" ")}
        >
          <Link
            to="/"
            className={[
              styles.link,
              history.location.pathname === "/" ? styles.selected : null,
            ].join(" ")}
            onClick={() => {
              onSelectedChange(TopNavLinks.HOME);
              dispatch(setSearchWarehouseId(null));
              dispatch(setSearchCompanyId(null));
            }}
          >
            {t("nav-main-page")}
          </Link>

          <Link
            to="/companies"
            className={[
              styles.link,
              history.location.pathname === "/companies"
                ? styles.selected
                : null,
            ].join(" ")}
            onClick={() => {
              onSelectedChange(TopNavLinks.COMPANIES);
              dispatch(setSearchWarehouseId(null));
              dispatch(setSearchCompanyId(null));
            }}
          >
            {t("nav-company")}
          </Link>

          {(user.type === UserTypeConstants.ADMIN ||
            user.type === UserTypeConstants.PHARMACY) && (
            <Link
              to="/warehouses"
              className={[
                styles.link,
                history.location.pathname === "/warehouses"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => {
                onSelectedChange(TopNavLinks.WAREHOUSES);
                dispatch(setSearchWarehouseId(null));
                dispatch(setSearchCompanyId(null));
              }}
            >
              {t("nav-warehouse")}
            </Link>
          )}

          <Link
            to={{
              pathname: "/medicines",
              state: {
                myCompanies: [],
              },
            }}
            className={[
              styles.link,
              history.location.pathname === "/medicines"
                ? styles.selected
                : null,
            ].join(" ")}
            onClick={() => {
              onSelectedChange(TopNavLinks.MEDICINES);
              dispatch(setSearchWarehouseId(null));
              dispatch(setSearchCompanyId(null));

              if (history.location.pathname !== "/medicines") {
                dispatch(resetMedicinesArray());
                dispatch(resetMedicines());
              }
            }}
          >
            {t("nav-medicines")}
          </Link>

          {(user.type === UserTypeConstants.ADMIN ||
            user.type === UserTypeConstants.PHARMACY) && (
            <>
              <Link
                to="/offers"
                className={[
                  styles.link,
                  history.location.pathname === "/offers"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => {
                  onSelectedChange(TopNavLinks.OFFERS);
                  dispatch(setSearchWarehouseId(null));
                  dispatch(setSearchCompanyId(null));
                }}
              >
                {t("nav-offers")}
              </Link>

              <Link
                to="/items-with-points"
                className={[
                  styles.link,
                  history.location.pathname === "/items-with-points"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => {
                  onSelectedChange(TopNavLinks.ITEMS_WITH_POINTS);
                  dispatch(setSearchWarehouseId(null));
                  dispatch(setSearchCompanyId(null));
                }}
              >
                {t("items-with-points")}
              </Link>
            </>
          )}

          {user.type === UserTypeConstants.PHARMACY && (
            <Link
              to="/special-offers"
              className={[
                styles.link,
                history.location.pathname === "/special-offers"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => {
                onSelectedChange(TopNavLinks.SPEACIAL_OFFERS);
                dispatch(setSearchWarehouseId(null));
                dispatch(setSearchCompanyId(null));
              }}
            >
              {t("nav-special-offers")}
            </Link>
          )}
        </div>
      </div>

      {showTopSearchBar && (
        <FilterItemsModal close={() => setShowTopSearchBar(false)} />
      )}
    </>
  );
}

export default TopNav;
