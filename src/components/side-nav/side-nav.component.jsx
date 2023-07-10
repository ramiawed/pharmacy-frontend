import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// react-icons
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
import { savedItemsSliceSignOut } from "../../redux/savedItems/savedItemsSlice";
import { basketsSliceSignOut } from "../../redux/baskets/basketsSlice";
import { itemsWithPointsSliceSignOut } from "../../redux/itemsWithPoints/itemsWithPointsSlices";

// styles
import styles from "../side-nav.module.scss";
import linkStyles from "../side-nav.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

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

function SideNav({ hideMenu }) {
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
    dispatch(savedItemsSliceSignOut());
    dispatch(basketsSliceSignOut());
    dispatch(itemsWithPointsSliceSignOut());
    localStorage.removeItem("token");
  };

  return (
    <>
      <>
        <Suspense fallback={<></>}>
          {user.type === UserTypeConstants.ADMIN && (
            <SideNavAdmin hideMenu={hideMenu} />
          )}
          {user.type === UserTypeConstants.COMPANY && (
            <SideNavCompany hideMenu={hideMenu} />
          )}
          {user.type === UserTypeConstants.WAREHOUSE && (
            <SideNavWarehouse hideMenu={hideMenu} />
          )}
          {user.type === UserTypeConstants.PHARMACY && (
            <SideNavPharmacy hideMenu={hideMenu} />
          )}
          {user.type === UserTypeConstants.GUEST && (
            <SideNavGuest hideMenu={hideMenu} />
          )}
        </Suspense>

        <Link
          className={styles.link}
          to={{
            pathname: "/",
          }}
          onClick={handleSignOut}
        >
          <GoSignOut size={24} />
          <label className={linkStyles.tooltip}>{t("sign out")}</label>
        </Link>
      </>
    </>
  );
}

export default SideNav;
