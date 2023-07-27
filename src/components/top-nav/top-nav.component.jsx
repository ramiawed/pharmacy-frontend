import React, { useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../assets/transparent_logo.png";
import SmallLogo from "../../assets/small_logo.png";

// redux stuff
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { selectCartItemCount } from "../../redux/cart/cartSlice";
import { selectUserNotifications } from "../../redux/userNotifications/userNotificationsSlice";

// components
import CustomLink from "../custom-link/custom-link.component";
import SideNav from "../side-nav/side-nav.component";
import Icon from "../icon/icon.component";

// icons
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

// constants
import { UserTypeConstants } from "../../utils/constants.js";

// context
import { useTheme } from "../../contexts/themeContext";

function TopNav({ userType, showSearchHandler }) {
  const { theme } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();

  // selectors
  const { unReadNotificationCount } = useSelector(selectUserNotifications);
  const allFavorites = useSelector(selectFavorites);
  const cartItemsCount = useSelector(selectCartItemCount);

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navRef = useRef(null);

  const hideMenu = useCallback(() => {
    setShowMenu(false);
    setShowProfileOptions(false);
  }, []);

  return (
    <>
      <nav
        className={`${
          theme === "light" ? "bg-gray-50 text-dark" : "d-mixed300-primary300"
        } sticky top-0 px-[20px] py-[5px] z-20 flex flex-col`}
        ref={navRef}
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex flex-row items-center">
              <img src={SmallLogo} width={64} height={64} alt="logo" />
              <p className="hidden text-2xl md:inline-block  hover:underline font-bold">
                {t("app name in arabic")}
              </p>
            </div>
          </Link>

          <div className="flex items-center justify-self-end gap-[10px]">
            <div className="hidden md:inline-block">
              <Link
                to="/companies"
                className={`top-nav-link ${
                  history.location.pathname === "/companies" ? "!text-red" : ""
                }`}
                onClick={() => hideMenu()}
              >
                {t("companies")}
              </Link>

              {(userType === UserTypeConstants.PHARMACY ||
                userType === UserTypeConstants.ADMIN) && (
                <Link
                  to="/warehouses"
                  className={`top-nav-link ${
                    history.location.pathname === "/warehouses"
                      ? "!text-red"
                      : ""
                  }`}
                  onClick={() => hideMenu()}
                >
                  {t("warehouses")}
                </Link>
              )}

              <Link
                to={{
                  pathname: "/medicines",
                  state: {
                    myCompanies: [],
                  },
                }}
                className={`top-nav-link ${
                  history.location.pathname === "/medicines" ? "!text-red" : ""
                }`}
                onClick={() => hideMenu()}
              >
                {t("items")}
              </Link>

              {(userType === UserTypeConstants.ADMIN ||
                userType === UserTypeConstants.PHARMACY) && (
                <>
                  <Link
                    to="/offers"
                    className={`top-nav-link ${
                      history.location.pathname === "/offers" ? "!text-red" : ""
                    }`}
                    onClick={() => hideMenu()}
                  >
                    {t("offers")}
                  </Link>

                  <Link
                    to="/items-with-points"
                    className={`top-nav-link ${
                      history.location.pathname === "/items-with-points"
                        ? "!text-red"
                        : ""
                    }`}
                    onClick={() => hideMenu()}
                  >
                    {t("points offer")}
                  </Link>
                </>
              )}

              {userType === UserTypeConstants.PHARMACY && (
                <Link
                  to="/special-offers"
                  className={`top-nav-link ${
                    history.location.pathname === "/special-offers"
                      ? "!text-red"
                      : ""
                  }`}
                  onClick={() => hideMenu()}
                >
                  {t("baskets")}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-[8px]">
              <FiSearch
                className={`top-nav-icon`}
                onClick={() => {
                  showSearchHandler(true);
                  hideMenu();
                }}
              />

              <Link
                to="/favorites"
                className={`top-nav-icon ${
                  history.location.pathname === "/favorites" ? "!text-red" : ""
                }`}
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
                  withBackground={false}
                />
              </Link>

              {userType !== UserTypeConstants.ADMIN && (
                <Link
                  to="/notifications"
                  className={`top-nav-icon ${
                    history.location.pathname === "/notifications"
                      ? "!text-red"
                      : ""
                  }`}
                  onClick={() => hideMenu()}
                >
                  <Icon
                    icon={() => <IoMdNotifications size={24} />}
                    tooltip={t("notifications")}
                    withAlertIcon={unReadNotificationCount > 0}
                    closeToIcon={true}
                  />
                </Link>
              )}

              {userType === UserTypeConstants.PHARMACY && (
                <Link
                  to="/cart"
                  className={`top-nav-icon ${
                    history.location.pathname === "/cart" ? "!text-red" : ""
                  }`}
                  onClick={() => hideMenu()}
                >
                  <Icon
                    icon={() => <GiShoppingCart size={24} />}
                    tooltip={t("cart")}
                    withAlertIcon={cartItemsCount > 0}
                    closeToIcon={true}
                  />
                </Link>
              )}

              <img
                src={Logo}
                className="w-[32px] h-[32px] object-fill rounded-full cursor-pointer border-x border-y border-light_grey bg-white"
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
                className="cursor-pointer hover:text-red md:hidden"
              />
            </div>
          </div>
        </div>

        {showProfileOptions && (
          <div className="flex flex-col md:flex-row flex-wrap gap-[5px]">
            <SideNav hideMenu={hideMenu} />
          </div>
        )}

        {showMenu && (
          <div className="md:hidden flex flex-col sm:flex-row gap-[5px]">
            <CustomLink
              to="/companies"
              text={t("companies")}
              onClickHandler={() => hideMenu()}
            />
            {(userType === UserTypeConstants.ADMIN ||
              userType === UserTypeConstants.PHARMACY) && (
              <CustomLink
                to="/warehouses"
                text={t("warehouses")}
                onClickHandler={() => hideMenu()}
              />
            )}

            <CustomLink
              to="/medicines"
              text={t("items")}
              onClickHandler={() => hideMenu()}
            />

            {(userType === UserTypeConstants.ADMIN ||
              userType === UserTypeConstants.PHARMACY) && (
              <>
                <CustomLink
                  to="/offers"
                  text={t("offers")}
                  onClickHandler={() => hideMenu()}
                />
                <CustomLink
                  to="/items-with-points"
                  text={t("points offer")}
                  onClickHandler={() => hideMenu()}
                />

                <CustomLink
                  to="/special-offers"
                  text={t("baskets")}
                  onClickHandler={() => hideMenu()}
                />
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default TopNav;
