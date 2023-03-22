import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { resetPageState, setPageState } from "../../redux/items/itemsSlices";
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";
import { orderSliceSignOut } from "../../redux/orders/ordersSlice";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";

// icons
import { BsBasket2Fill, BsFillEnvelopeFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiMedicines } from "react-icons/gi";

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
          dispatch(
            setPageState({
              company: null,
              warehouse: user,
              role: UserTypeConstants.WAREHOUSE,
            })
          );

          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
        }}
        to={{
          pathname: "/items",
        }}
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <GiMedicines size={24} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav items")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav items")}</div>
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
            dispatch(orderSliceSignOut());
            dispatch(setSearchWarehouseId(null));
            dispatch(setSearchCompanyId(null));
          }}
          to="/orders"
        >
          <div className={styles.nav}>
            <div className={styles.nav_icon}>
              <BsFillEnvelopeFill size={24} />
              {collapsed && (
                <label className={styles.tooltip}>{t("nav orders")}</label>
              )}
            </div>
            {!collapsed && (
              <div className={styles.nav_label}>{t("nav orders")} </div>
            )}
          </div>
        </Link>
      )}

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
              <label className={styles.tooltip}>{t("nav baskets")}</label>
            )}
            <BsBasket2Fill size={24} />
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav baskets")}</div>
          )}
        </div>
      </Link>

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.PROFILE ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.PROFILE);
          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
        }}
        to="/profile"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <CgProfile size={24} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav profile")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav profile")}</div>
          )}
        </div>
      </Link>
    </>
  );
}

export default SideNavWarehouse;
