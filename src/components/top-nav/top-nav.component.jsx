import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

// components
import FilterItemsModal from "../../modals/filter-items-modal/filter-items-modal.component";

// redux stuff
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { selectCartItemCount } from "../../redux/cart/cartSlice";
import { selectUserNotifications } from "../../redux/userNotifications/userNotificationsSlice";

import Logo from "../../assets/transparent_logo.png";
import SmallLogo from "../../assets/small_logo.png";

// components
import Icon from "../icon/icon.component";
import SideNav from "../side-nav/side-nav.component";

// icons
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

// style
import styles from "./top-nav.module.scss";

// constants
import { Colors } from "../../utils/constants.js";

function TopNav() {
  const history = useHistory();
  const { t } = useTranslation();

  // selectors
  const { unReadNotificationCount } = useSelector(selectUserNotifications);
  const allFavorites = useSelector(selectFavorites);
  const total = useSelector(selectCartItemCount);

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navRef = useRef(null);

  // own state
  const [showTopSearchBar, setShowTopSearchBar] = useState(false);

  function hideMenu() {
    setShowMenu(false);
    setShowProfileOptions(false);
  }

  return (
    <>
      <nav className={styles.nav} ref={navRef}>
        <div className={styles.main_nav}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className={styles.title_with_logo_container}>
              <img src={SmallLogo} width={64} height={64} alt="logo" />
              <p>{t("app name in arabic")}</p>
            </div>
          </Link>

          <div className={styles.end_container}>
            <div className={styles.links}>
              <Link
                to="/companies"
                className={[
                  styles.link,
                  history.location.pathname === "/companies"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
              >
                {t("companies")}
              </Link>

              <Link
                to="/warehouses"
                className={[
                  styles.link,
                  history.location.pathname === "/warehouses"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
              >
                {t("warehouses")}
              </Link>

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
                onClick={() => hideMenu()}
              >
                {t("items")}
              </Link>

              <Link
                to="/offers"
                className={[
                  styles.link,
                  history.location.pathname === "/offers"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
              >
                {t("offers")}
              </Link>

              <Link
                to="/items-with-points"
                className={[
                  styles.link,
                  history.location.pathname === "/items-with-points"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
              >
                {t("points offer")}
              </Link>

              <Link
                to="/special-offers"
                className={[
                  styles.link,
                  history.location.pathname === "/special-offers"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
              >
                {t("baskets")}
              </Link>
            </div>

            <div className={styles.icons}>
              <FiSearch
                className={styles.icon}
                size={24}
                onClick={() => {
                  setShowTopSearchBar(true);
                  hideMenu();
                }}
                color={Colors.DARK_COLOR}
              />

              <Link
                to="/favorites"
                className={[
                  styles.icon,
                  history.location.pathname === "/favorites"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
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
                  onClick={() => hideMenu()}
                />
              </Link>

              <Link
                to="/notifications"
                className={[
                  styles.icon,
                  history.location.pathname === "/notifications"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
              >
                <Icon
                  icon={() => <IoMdNotifications size={24} />}
                  tooltip={t("notifications")}
                  withAlertIcon={unReadNotificationCount > 0}
                  closeToIcon={true}
                />
              </Link>

              <Link
                to="/cart"
                className={[
                  styles.icon,
                  history.location.pathname === "/cart"
                    ? styles.selected
                    : null,
                ].join(" ")}
                onClick={() => hideMenu()}
              >
                <Icon
                  icon={() => <GiShoppingCart size={24} />}
                  tooltip={t("cart")}
                  withAlertIcon={total > 0}
                  closeToIcon={true}
                />
              </Link>

              <img
                src={Logo}
                className={styles.profile_img}
                alt="profile"
                onClick={() => {
                  setShowProfileOptions(!showProfileOptions);
                  setShowMenu(false);
                }}
              />
              <GiHamburgerMenu
                size={24}
                onClick={(e) => {
                  setShowMenu(!showMenu);
                  setShowProfileOptions(false);
                  e.stopPropagation();
                }}
                className={styles.hamburger_menu_icon}
              />
            </div>
          </div>
        </div>

        {showProfileOptions && (
          <div className={styles.sub_nav}>
            <SideNav hideMenu={hideMenu} />
          </div>
        )}

        {showMenu && (
          <div className={styles.links_in_small}>
            <Link
              to="/companies"
              className={[
                styles.link,
                history.location.pathname === "/companies"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => hideMenu()}
            >
              {t("companies")}
            </Link>

            <Link
              to="/warehouses"
              className={[
                styles.link,
                history.location.pathname === "/warehouses"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => hideMenu()}
            >
              {t("warehouses")}
            </Link>

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
              onClick={() => hideMenu()}
            >
              {t("items")}
            </Link>

            <Link
              to="/offers"
              className={[
                styles.link,
                history.location.pathname === "/offers"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => hideMenu()}
            >
              {t("offers")}
            </Link>

            <Link
              to="/items-with-points"
              className={[
                styles.link,
                history.location.pathname === "/items-with-points"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => hideMenu()}
            >
              {t("points offer")}
            </Link>

            <Link
              to="/special-offers"
              className={[
                styles.link,
                history.location.pathname === "/special-offers"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => hideMenu()}
            >
              {t("baskets")}
            </Link>
          </div>
        )}
      </nav>

      {showTopSearchBar && (
        <FilterItemsModal close={() => setShowTopSearchBar(false)} />
      )}
    </>
  );
}

export default TopNav;
