import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { selectCartItemCount } from "../../redux/cart/cartSlice";
import { selectUserNotifications } from "../../redux/userNotifications/userNotificationsSlice";
import { selectNavigationSlice } from "../../redux/navs/navigationSlice";
import {
  resetMedicines,
  resetMedicinesArray,
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";

// components
import IconWithNumber from "../icon-with-number/icon-with-number.component";
import SearchInTopNav from "../search-in-top-nav/search-in-top-nav.component";
import Icon from "../action-icon/action-icon.component";

// icons
import { GiShoppingCart } from "react-icons/gi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  IoMdArrowRoundBack,
  IoMdNotifications,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BsFillBookmarksFill } from "react-icons/bs";

// style
import styles from "./top-nav.module.scss";

// constants
import {
  Colors,
  TopNavLinks,
  UserTypeConstants,
} from "../../utils/constants.js";
import { selectSavedItems } from "../../redux/savedItems/savedItemsSlice";

function TopNav({ onSelectedChange }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { unReadNotificationCount } = useSelector(selectUserNotifications);
  const {
    setting: { showTopNav },
  } = useSelector(selectNavigationSlice);
  const allFavorites = useSelector(selectFavorites);
  const user = useSelector(selectUser);
  const total = useSelector(selectCartItemCount);
  const { count: savedItemsCount } = useSelector(selectSavedItems);

  // own state
  const [showTopSearchBar, setShowTopSearchBar] = useState(false);

  return (
    <>
      <div
        className={[styles.nav, showTopNav ? styles.show : styles.hide].join(
          " "
        )}
      >
        <div className={styles.center}>
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
          )}
        </div>

        <div className={styles.end}>
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
            <IconWithNumber
              value={
                allFavorites.favorites_partners.length +
                allFavorites.favorites_items.length
              }
              fillIcon={<AiFillStar size={24} />}
              noFillIcon={<AiOutlineStar size={24} />}
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
              <IconWithNumber
                value={unReadNotificationCount}
                fillIcon={<IoMdNotifications size={24} />}
                noFillIcon={<IoMdNotificationsOutline size={24} />}
              />
            </Link>
          )}

          {user.type === UserTypeConstants.PHARMACY && (
            <Link
              to="/saved-items"
              className={[
                styles.link,
                history.location.pathname === "/saved-items"
                  ? styles.selected
                  : null,
              ].join(" ")}
              onClick={() => {
                onSelectedChange(TopNavLinks.SAVEDITEMS);
                dispatch(setSearchWarehouseId(null));
                dispatch(setSearchCompanyId(null));
              }}
            >
              <IconWithNumber
                value={savedItemsCount}
                fillIcon={<BsFillBookmarksFill size={24} />}
                noFillIcon={<BsFillBookmarksFill size={24} />}
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
              <IconWithNumber
                value={total}
                fillIcon={<GiShoppingCart size={24} />}
                noFillIcon={<GiShoppingCart size={24} />}
              />
            </Link>
          )}
        </div>
      </div>

      <div className={styles.float_div}>
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
            history.location.pathname === "/favorites" ? styles.selected : null,
          ].join(" ")}
          onClick={() => {
            onSelectedChange(TopNavLinks.FAVORITES);
            dispatch(setSearchWarehouseId(null));
            dispatch(setSearchCompanyId(null));
          }}
        >
          <IconWithNumber
            value={
              allFavorites.favorites_partners.length +
              allFavorites.favorites_items.length
            }
            fillIcon={<AiFillStar size={24} />}
            noFillIcon={<AiOutlineStar size={24} />}
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
            <IconWithNumber
              value={unReadNotificationCount}
              fillIcon={<IoMdNotifications size={24} />}
              noFillIcon={<IoMdNotificationsOutline size={24} />}
            />
          </Link>
        )}

        {user.type === UserTypeConstants.PHARMACY && (
          <Link
            to="/saved-items"
            className={[
              styles.link,
              history.location.pathname === "/saved-items"
                ? styles.selected
                : null,
            ].join(" ")}
            onClick={() => {
              onSelectedChange(TopNavLinks.SAVEDITEMS);
              dispatch(setSearchWarehouseId(null));
              dispatch(setSearchCompanyId(null));
            }}
          >
            <IconWithNumber
              value={savedItemsCount}
              fillIcon={<BsFillBookmarksFill size={24} />}
              noFillIcon={<BsFillBookmarksFill size={24} />}
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
            <IconWithNumber
              value={total}
              fillIcon={<GiShoppingCart size={24} />}
              noFillIcon={<GiShoppingCart size={24} />}
            />
          </Link>
        )}
      </div>

      {showTopSearchBar && (
        <div className={styles.search_container_fixed}>
          <SearchInTopNav />
          <div className={styles.back}>
            <Icon
              onclick={() => {
                setShowTopSearchBar(false);
              }}
              icon={() => <IoMdArrowRoundBack />}
              foreColor={Colors.WHITE_COLOR}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TopNav;
