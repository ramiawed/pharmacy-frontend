import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import SideNavAdmin from "../side-nav-admin/side-nav-admin.component";
import SideNavCompany from "../side-nav-company/side-nav-company.component";
import SideNavGuest from "../side-nav-guest/side-nav-guest.component";
import SideNavPharmacy from "../side-nav-pharmacy/side-nav-pharmacy.component";
import SideNavWarehouse from "../side-nav-warehouse/side-nav-warehouse.component";

// react-icons
import { FaSearch } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { GoSignOut } from "react-icons/go";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { authSliceSignOut, selectUserData } from "../../redux/auth/authSlice";
import { usersSliceSignOut } from "../../redux/users/usersSlice";
import { favoritesSliceSignOut } from "../../redux/favorites/favoritesSlice";
import { cartSliceSignOut } from "../../redux/cart/cartSlice";
import { companySliceSignOut } from "../../redux/company/companySlice";
import { itemsSliceSignOut } from "../../redux/items/itemsSlices";
import { statisticsSliceSignOut } from "../../redux/statistics/statisticsSlice";
import { warehouseSliceSignOut } from "../../redux/warehouse/warehousesSlice";
import { warehouseItemsSliceSignOut } from "../../redux/warehouseItems/warehouseItemsSlices";
import { orderSliceSignOut } from "../../redux/orders/ordersSlice";
import { advertisementsSignOut } from "../../redux/advertisements/advertisementsSlice";
import { companiesSectionOneSignOut } from "../../redux/advertisements/companiesSectionOneSlice";
import { companiesSectionTwoSignOut } from "../../redux/advertisements/companiesSectionTwoSlice";
import { itemsSectionOneSignOut } from "../../redux/advertisements/itemsSectionOneSlice";
import { itemsSectionThreeSignOut } from "../../redux/advertisements/itemsSectionThreeSlice";
import { itemsSectionTwoSignOut } from "../../redux/advertisements/itemsSectionTwoSlice";
import { warehousesSectionOneSignOut } from "../../redux/advertisements/warehousesSectionOneSlice";
import { notificationsSignOut } from "../../redux/notifications/notificationsSlice";
import { settingsSignOut } from "../../redux/settings/settingsSlice";
import { usersNotificationsSignOut } from "../../redux/userNotifications/userNotificationsSlice";
import {
  medicinesSliceSignOut,
  resetMedicines,
} from "../../redux/medicines/medicinesSlices";

// styles
import styles from "./side-nav.module.scss";
import linkStyles from "../side-nav.module.scss";
import generalStyles from "../../style.module.scss";
import navStyles from "./../side-nav.module.scss";

// constants
import { SERVER_URL, UserTypeConstants } from "../../utils/constants";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchHome from "../search-home/search-home.component";
import {
  changeNavSettings,
  selectNavigationSlice,
} from "../../redux/navs/navigationSlice";

function SideNav({
  collapsed,
  onCollapsedChange,
  selectedOption,
  onSelectedChange,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { user } = useSelector(selectUserData);
  const {
    setting: { showSearchBar },
  } = useSelector(selectNavigationSlice);

  const handleSignOut = () => {
    dispatch(authSliceSignOut());
    dispatch(cartSliceSignOut());
    dispatch(companySliceSignOut());
    dispatch(favoritesSliceSignOut());
    dispatch(itemsSliceSignOut());
    dispatch(statisticsSliceSignOut());
    dispatch(usersSliceSignOut());
    dispatch(warehouseSliceSignOut());
    dispatch(warehouseItemsSliceSignOut());
    dispatch(orderSliceSignOut());
    dispatch(resetMedicines());
    dispatch(advertisementsSignOut());
    dispatch(companiesSectionOneSignOut());
    dispatch(companiesSectionTwoSignOut());
    dispatch(itemsSectionOneSignOut());
    dispatch(itemsSectionThreeSignOut());
    dispatch(itemsSectionTwoSignOut());
    dispatch(warehousesSectionOneSignOut());
    dispatch(medicinesSliceSignOut());
    dispatch(notificationsSignOut());
    dispatch(settingsSignOut());
    dispatch(usersNotificationsSignOut());
  };

  return (
    <>
      <div
        className={[
          styles.side_nav_container,
          `${collapsed ? styles.collapsed : styles.showed}`,
        ].join(" ")}
      >
        {!collapsed && (
          <div className={styles.close_icon} onClick={onCollapsedChange}>
            <VscClose size={32} />
          </div>
        )}

        {!collapsed ? (
          <div
            className={[
              styles.profile_img,
              generalStyles.flex_center_container,
            ].join(" ")}
            style={{
              flexDirection: "column",
            }}
          >
            {user.logo_url.length > 0 && (
              <img src={`${SERVER_URL}/${user.logo_url}`} alt="thumb" />
            )}

            <h3>{user.name}</h3>
            <p>{t(user.type)}</p>
          </div>
        ) : (
          <GiHamburgerMenu
            size={24}
            color="white"
            onClick={(e) => {
              dispatch(
                changeNavSettings({
                  showTopNav: false,
                  collapsedSideNavOption: false,
                  showSearchBar: false,
                })
              );
              e.stopPropagation();
            }}
          />
        )}
        <div className={styles.links}>
          <div className={[navStyles.link].join(" ")}>
            <div
              className={navStyles.nav}
              onClick={(e) => {
                dispatch(
                  changeNavSettings({
                    showSearchBar: !showSearchBar,
                    collapsedSideNavOption: true,
                  })
                );
                e.stopPropagation();
              }}
            >
              <div className={navStyles.nav_icon}>
                <FaSearch size={20} />
              </div>
              {!collapsed && (
                <div className={navStyles.nav_label}>{t("search")}</div>
              )}
            </div>
          </div>
          {user.type === UserTypeConstants.ADMIN && (
            <SideNavAdmin
              selectedOption={selectedOption}
              onSelectedChange={onSelectedChange}
              collapsed={collapsed}
            />
          )}
          {user.type === UserTypeConstants.COMPANY && (
            <SideNavCompany
              selectedOption={selectedOption}
              onSelectedChange={onSelectedChange}
              collapsed={collapsed}
            />
          )}
          {user.type === UserTypeConstants.WAREHOUSE && (
            <SideNavWarehouse
              selectedOption={selectedOption}
              onSelectedChange={onSelectedChange}
              collapsed={collapsed}
            />
          )}
          {user.type === UserTypeConstants.PHARMACY && (
            <SideNavPharmacy
              selectedOption={selectedOption}
              onSelectedChange={onSelectedChange}
              collapsed={collapsed}
            />
          )}
          {user.type === UserTypeConstants.GUEST && (
            <SideNavGuest
              selectedOption={selectedOption}
              onSelectedChange={onSelectedChange}
              collapsed={collapsed}
            />
          )}
          <Link
            className={linkStyles.link}
            to={{
              pathname: "/",
            }}
            onClick={handleSignOut}
          >
            <div className={styles.nav}>
              <div className={styles.nav_icon}>
                <GoSignOut size={20} />
                {collapsed && (
                  <label className={styles.tooltip}>{t("nav-sign-out")}</label>
                )}
              </div>
              {!collapsed && (
                <div className={styles.nav_label}>{t("nav-sign-out")}</div>
              )}
            </div>
          </Link>
        </div>
      </div>

      {showSearchBar && <SearchHome />}
    </>
  );
}

export default SideNav;
