import React from "react";
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
import { authSliceSignOut, selectUser } from "../../redux/auth/authSlice";
import { usersSliceSignOut } from "../../redux/users/usersSlice";
import { favoritesSliceSignOut } from "../../redux/favorites/favoritesSlice";
import { cartSliceSignOut } from "../../redux/cart/cartSlice";
import { companySliceSignOut } from "../../redux/company/companySlice";
import { itemsSliceSignOut } from "../../redux/items/itemsSlices";
import { statisticsSliceSignOut } from "../../redux/statistics/statisticsSlice";
import { warehouseSliceSignOut } from "../../redux/warehouse/warehousesSlice";
import { warehouseItemsSliceSignOut } from "../../redux/warehouseItems/warehouseItemsSlices";

// styles
import styles from "./side-nav.module.scss";
import linkStyles from "../side-nav.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";
import { orderSliceSignout } from "../../redux/orders/ordersSlice";
import { resetMedicines } from "../../redux/medicines/medicinesSlices";

function SideNav({
  collapsed,
  onCollapsedChange,
  selectedOption,
  onSelectedChange,
}) {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
    dispatch(orderSliceSignout());
    dispatch(resetMedicines());
  };

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
        style={{
          backgroundImage:
            user.logo_url !== ""
              ? `url('http://localhost:8000/${user.logo_url}')`
              : 'url("http://localhost:8000/avatar01.png',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        className={styles.profile_img}
      ></div>
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
        <Link className={linkStyles.link} onClick={handleSignOut}>
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
