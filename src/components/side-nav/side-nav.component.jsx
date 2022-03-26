import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// react-icons
import { VscClose } from "react-icons/vsc";
import { GoSignOut } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";

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
import { changeNavSettings } from "../../redux/navs/navigationSlice";

// styles
import styles from "./side-nav.module.scss";
import linkStyles from "../side-nav.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { SERVER_URL, UserTypeConstants } from "../../utils/constants";

const SideNavAdmin = lazy(() =>
  import("../side-nav-admin/side-nav-admin.component")
);
const SideNavCompany = lazy(() =>
  import("../side-nav-company/side-nav-company.component")
);
const SideNavGuest = lazy(() =>
  import("../side-nav-guest/side-nav-guest.component")
);
const SideNavPharmacy = lazy(() =>
  import("../side-nav-pharmacy/side-nav-pharmacy.component")
);
const SideNavWarehouse = lazy(() =>
  import("../side-nav-warehouse/side-nav-warehouse.component")
);

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
    localStorage.removeItem("token");
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
              <img
                src={`${SERVER_URL}/profiles/${user.logo_url}`}
                alt="thumb"
              />
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
          <Suspense fallback={<></>}>
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
          </Suspense>

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
    </>
  );
}

export default SideNav;
