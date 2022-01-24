import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import SideNavAdmin from "../side-nav-admin/side-nav-admin.component";
import SideNavCompany from "../side-nav-company/side-nav-company.component";
import SideNavGuest from "../side-nav-guest/side-nav-guest.component";
import SideNavPharmacy from "../side-nav-pharmacy/side-nav-pharmacy.component";
import SideNavWarehouse from "../side-nav-warehouse/side-nav-warehouse.component";

// react-icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";

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
import {
  getUnreadOrders,
  orderSliceSignOut,
} from "../../redux/orders/ordersSlice";
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

// constants
import { SERVER_URL, UserTypeConstants } from "../../utils/constants";

function SideNav({
  collapsed,
  onCollapsedChange,
  selectedOption,
  onSelectedChange,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);

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

  useEffect(() => {
    let timer;
    if (
      user.type === UserTypeConstants.ADMIN ||
      user.type === UserTypeConstants.WAREHOUSE
    ) {
      timer = setInterval(() => {
        dispatch(getUnreadOrders({ token }));
      }, 10000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <div
      className={[
        styles.side_nav_container,
        `${collapsed ? styles.collapsed : styles.showed}`,
      ].join(" ")}
    >
      <div className={styles.close_icon} onClick={onCollapsedChange}>
        <VscClose size={32} />
      </div>
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
      <div className={styles.links}>
        {user.type === UserTypeConstants.ADMIN && (
          <SideNavAdmin
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.COMPANY && (
          <SideNavCompany
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.WAREHOUSE && (
          <SideNavWarehouse
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.PHARMACY && (
          <SideNavPharmacy
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.GUEST && (
          <SideNavGuest
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        <Link
          className={linkStyles.link}
          to={{
            pathname: "/",
          }}
          onClick={handleSignOut}
        >
          {t("nav-sign-out")}
        </Link>
      </div>
      <button onClick={() => onCollapsedChange()}>
        {collapsed ? (
          <FaChevronLeft
            className={[
              styles.icon,
              `${collapsed ? styles.icon_collapsed : styles.icon_showed}`,
            ].join(" ")}
          />
        ) : (
          <FaChevronRight
            className={[
              styles.icon,
              `${collapsed ? styles.icon_collapsed : styles.icon_showed}`,
            ].join(" ")}
          />
        )}
      </button>
    </div>
  );
}

export default SideNav;

// pharmacy-frontend
