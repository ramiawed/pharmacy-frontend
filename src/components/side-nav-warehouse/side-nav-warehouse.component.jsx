import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import {
  resetPageState,
  setCompany,
  setRole,
  setSearchWarehouseName,
  setWarehouse,
} from "../../redux/items/itemsSlices";
import { selectOrders } from "../../redux/orders/ordersSlice";
import { BsBasket2Fill, BsFillEnvelopeFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiMedicines } from "react-icons/gi";
import { setSelectedWarehouse } from "../../redux/warehouse/warehousesSlice";
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";

function SideNavWarehouse({ selectedOption, onSelectedChange, collapsed }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  return (
    <>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ITEMS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ITEMS);
          dispatch(resetPageState());
          dispatch(setCompany(null));
          dispatch(setWarehouse(user));
          dispatch(setSearchWarehouseName(""));
          dispatch(setRole(UserTypeConstants.WAREHOUSE));
          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
          // dispatch(setSelectedWarehouse(null));
        }}
        to={{
          pathname: "/items",
        }}
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <GiMedicines size={24} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-items")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-items")}</div>
          )}
        </div>
      </Link>

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.BASKETS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.BASKETS);
          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
        }}
        to="/baskets"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-baskets")}</label>
            )}
            <BsBasket2Fill size={24} />
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-baskets")}</div>
          )}
        </div>
      </Link>

      {saveOrders && (
        <Link
          className={[
            styles.link,
            selectedOption === SideNavLinks.ORDERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            onSelectedChange(SideNavLinks.ORDERS);
            dispatch(setSearchWarehouseId(null));
            dispatch(setSearchCompanyId(null));
            // dispatch(setSelectedWarehouse(null));
          }}
          to="/orders"
        >
          <div className={styles.nav}>
            <div className={styles.nav_icon}>
              <BsFillEnvelopeFill size={24} />
              {collapsed && (
                <label className={styles.tooltip}>{t("nav-orders")}</label>
              )}
            </div>
            {!collapsed && (
              <div className={styles.nav_label}>{t("nav-orders")} </div>
            )}
          </div>
          {/* {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )} */}
        </Link>
      )}

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.PROFILE ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.PROFILE);
          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
          // dispatch(setSelectedWarehouse(null));
        }}
        to="/profile"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <CgProfile size={24} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-profile")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-profile")}</div>
          )}
        </div>
      </Link>
    </>
  );
}

export default SideNavWarehouse;
